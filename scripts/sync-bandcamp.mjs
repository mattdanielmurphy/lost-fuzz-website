import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import { fileURLToPath } from 'url';

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
    console.log(`Syncing image for ${name} from ${imgUrl}...`);
    try {
        const imgRes = await fetch(imgUrl);
        if (!imgRes.ok) throw new Error(`Failed to fetch image: ${imgRes.statusText}`);
        const buffer = Buffer.from(await imgRes.arrayBuffer());
        fs.writeFileSync(localImagePath, buffer);

        // Check if we already have this release in existing data to keep any extra metadata if it exists
        const existing = existingReleases.find(r => r.link === releaseUrl || r.name === name);

        updatedReleases.push({
          ...(existing || {}),
          name,
          link: releaseUrl,
          image: `/images/${fileName}?v=${Date.now()}`
        });
        processedNames.add(name);
        processedLinks.add(releaseUrl);
    } catch (err) {
        console.error(`Error downloading image for ${name}:`, err.message);
        // If download fails but we have an existing entry, maybe keep it? 
        // For now, let's keep the existing one if we have it, otherwise skip.
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
