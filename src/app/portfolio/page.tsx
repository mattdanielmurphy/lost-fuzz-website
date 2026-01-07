import Link from "next/link";
import Image from "next/image";
import releasesData from "@/data/releases.json";

interface Release {
  name: string;
  link: string;
  image: string;
  artist?: string;
}

const releases = releasesData as Release[];

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-black p-4 sm:p-8 font-[family-name:var(--font-vt323)] text-[#33ff33] text-xl uppercase overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 sm:mb-12 border-b-2 border-[#33ff33] pb-4">
          <h1 className="text-xl sm:text-3xl md:text-5xl mb-2">LOST FUZZ: PORTFOLIO</h1>
          <p className="text-xs sm:text-sm md:text-base">MUSIC RELEASES - (C) 1982-2025 LOST FUZZ</p>
        </header>

        <section className="space-y-12">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 gap-4">
              <h2 className="text-3xl underline">BANDCAMP RELEASES</h2>
              <a 
                href="#after-bandcamp" 
                className="text-sm border border-[#33ff33] px-2 py-1 hover:bg-[#33ff33] hover:text-black transition-colors inline-block w-fit cursor-pointer"
              >
                [ SKIP_TO_BOTTOM ]
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {releases.map((release, index) => (
                <Link 
                  key={index} 
                  href={release.link} 
                  target="_blank" 
                  className="group block border border-[#33ff33] p-4 hover:bg-[#33ff33] hover:text-black transition-all"
                >
                  <div className="aspect-square relative mb-4 border border-[#33ff33] overflow-hidden">
                    <Image
                      src={release.image}
                      alt={release.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100"
                    />
                    {/* Scanline overlay for image */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold truncate">{release.name}</div>
                    {release.artist && (
                      <div className="text-sm opacity-80">{release.artist}</div>
                    )}
                    <div className="text-xs mt-2 border-t border-current pt-1">
                      LINK: BANDCAMP.EXE
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div id="after-bandcamp" className="scroll-mt-24"></div>
          </div>

          <div className="mt-12">
            <Link href="/" className="hover:bg-[#33ff33] hover:text-black p-2 border border-[#33ff33] transition-colors">
              &lt; RETURN TO MAIN
            </Link>
          </div>
        </section>

        <footer className="mt-20 opacity-50 pb-8">
          ] _
        </footer>
      </div>
    </main>
  );
}