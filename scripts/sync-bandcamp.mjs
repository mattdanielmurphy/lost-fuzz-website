import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RELEASES_JSON_PATH = path.join(__dirname, '../src/data/releases.json');
const IMAGES_DIR = path.join(__dirname, '../public/images');
const BANDCAMP_URL = 'https://lostfuzz.bandcamp.com';

function slugify(name) {
  return name
    .trim()
    .replace(/[\n\r\t]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/[/\\?%*:|"<>]/g, '') // remove illegal filename chars
    .replace(/\s+/g, '_');         // spaces -> underscores
}

function getHash(buffer) {
  return crypto.createHash('md5').update(buffer).digest('hex').substring(0, 8);
}

async function syncReleases() {
  console.log('Fetching Bandcamp page...');
  // Add a cachebuster to ensure we get the latest page content
  const response = await fetch(BANDCAMP_URL + '?cb=' + Date.now());
  const html = await response.text();
  const $ = cheerio.load(html);

  if (!fs.existsSync(RELEASES_JSON_PATH)) {
    console.error('Releases JSON not found at:', RELEASES_JSON_PATH);
    return;
  }

  const existingReleases = JSON.parse(fs.readFileSync(RELEASES_JSON_PATH, 'utf8'));
  const updatedReleases = [];
  const processedNames = new Set();
  const processedLinks = new Set();

  // Bandcamp music grid items
  const items = $('ol#music-grid > li').get();
  
  for (const li of items) {
    const $li = $(li);
    const $a = $li.find('a').first();
    
    let name = $li.find('.title').text().trim();
    if (!name) {
        name = $a.text().trim().split('\n')[0].trim();
    }

    const href = $a.attr('href') || '';
    if (!href) continue;

    const releaseUrl = href.startsWith('http')
      ? href
      : BANDCAMP_URL.replace(/\/$/, '') + '/' + href.replace(/^\//, '');

    // Check if we already have this release in existing data
    const existing = existingReleases.find(r => r.link === releaseUrl || r.name === name);

    const $img = $li.find('img');
    let imgUrl = $img.attr('data-original') || $img.attr('src');
    
    if (!imgUrl) {
      console.warn(`No image found for ${name}, skipping.`);
      continue;
    }

    // Try to get the high-res version of the image (_10.jpg is usually the original/large version)
    // instead of the thumbnail (_2.jpg) which might be stale or low quality.
    imgUrl = imgUrl.replace(/_2\.jpg$/, '_10.jpg');

    const fileName = slugify(name) + '.jpg';
    const localImagePath = path.join(__dirname, '../public/images', fileName);

    // Always attempt to download image to ensure it is up to date
    try {
        const imgRes = await fetch(imgUrl);
        if (!imgRes.ok) throw new Error(`Failed to fetch image: ${imgRes.statusText}`);
        const buffer = Buffer.from(await imgRes.arrayBuffer());
        const newHash = getHash(buffer);
        
        // Check if we already have this release in existing data to keep any extra metadata if it exists
        const existing = existingReleases.find(r => r.link === releaseUrl || r.name === name);
        
        let shouldWrite = true;
        let currentImageString = `/images/${fileName}?v=${newHash}`;

        if (fs.existsSync(localImagePath)) {
            const existingBuffer = fs.readFileSync(localImagePath);
            const existingHash = getHash(existingBuffer);
            
            if (existingHash === newHash) {
                console.log(`Image for ${name} is already up to date (hash matches).`);
                shouldWrite = false;
                // If the hash matches, try to preserve the existing image string from JSON 
                // if it already uses the same hash format to avoid changing the JSON.
                if (existing && existing.image && existing.image.includes(`?v=${newHash}`)) {
                    currentImageString = existing.image;
                }
            }
        }

        if (shouldWrite) {
            console.log(`Syncing image for ${name} from ${imgUrl}...`);
            fs.writeFileSync(localImagePath, buffer);
        }

        updatedReleases.push({
          ...(existing || {}),
          name,
          link: releaseUrl,
          image: currentImageString
        });
        processedNames.add(name);
        processedLinks.add(releaseUrl);
    } catch (err) {
        console.error(`Error downloading image for ${name}:`, err.message);
        // If download fails but we have an existing entry, keep it.
        const existing = existingReleases.find(r => r.link === releaseUrl || r.name === name);
        if (existing) {
            updatedReleases.push(existing);
            processedNames.add(name);
            processedLinks.add(releaseUrl);
        }
    }
  }

  // Removed manual entries preservation as it was causing stale releases to persist
  // that are no longer on the main Bandcamp page.

  fs.writeFileSync(RELEASES_JSON_PATH, JSON.stringify(updatedReleases, null, 2));
  console.log(`Sync complete. Total releases: ${updatedReleases.length}`);
}

syncReleases().catch(console.error);
