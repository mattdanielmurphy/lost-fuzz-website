"use client"

import Link from "next/link";
import DialUpImage from "@/components/DialUpImage";
import releasesData from "@/data/releases.json";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import Terminal from "@/components/Terminal";

interface Release {
  name: string;
  link: string;
  image: string;
  artist?: string;
}

const releases = releasesData as Release[];

export default function Portfolio() {
  const router = useRouter();
  const bandcampRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: (args: string[], execute?: (cmd: string) => void) => (
      <div className="flex flex-wrap gap-x-4 gap-y-1 my-1">
        <span>COMMANDS:</span>
        <button onClick={() => execute?.("CATALOG")} className="terminal-link">CATALOG</button>
        <button onClick={() => execute?.("RUN 1")} className="terminal-link">RUN [N]</button>
        <button onClick={() => execute?.("ABOUT")} className="terminal-link">ABOUT</button>
        <button onClick={() => execute?.("HOME")} className="terminal-link">HOME</button>
        <button onClick={() => execute?.("HELP")} className="terminal-link">HELP</button>
        <button onClick={() => execute?.("EXIT")} className="terminal-link">EXIT</button>
        <button onClick={() => execute?.("CONTACT")} className="terminal-link">CONTACT</button>
        <button onClick={() => execute?.("STUDIOS")} className="terminal-link">STUDIOS</button>
      </div>
    ),
    catalog: () => (
      <div className="grid grid-cols-1 gap-1 my-2">
        {releases.map((r, i) => (
          <div key={i}>{i + 1}. {r.name.toUpperCase()} - {r.artist?.toUpperCase() || "LOST FUZZ"}</div>
        ))}
      </div>
    ),
    run: (args: string[]) => {
      const index = parseInt(args[0]) - 1;
      if (releases[index]) {
        window.open(releases[index].link, "_blank");
        return `RUNNING ${releases[index].name.toUpperCase()}...`;
      }
      return "FILE NOT FOUND. USE CATALOG TO SEE LIST.";
    },
    home: () => {
      router.push("/");
    },
    about: () => {
      router.push("/about");
    },
    exit: () => { router.push("/") },
    contact: () => { router.push("/contact") },
    studios: () => { router.push("/studios") },
    apple: () => (
      <pre className="text-[10px] leading-none my-4">
{`          ,---._
        /    .-.  \\
       |    /   \\  |
       |    \\   /  |
        \\    &apos;---&apos; /
     &apos;--&apos;   .--&apos;
     /     /
    /     /
   /     /
  /     /
 &apos;-----&apos;`}
      </pre>
    ),
    matrix: () => "ERROR: SYSTEM OVERLOAD. SIMULATION TERMINATED."
  };

  const welcomeMessage = (
    <header className="mb-8 border-b-2 border-[#33ff33] pb-4">
      <h1 className="text-xl sm:text-3xl md:text-5xl mb-2">
        <Link href="/" className="hover:bg-[#33ff33] hover:text-black px-1 -ml-1">LOST FUZZ</Link>: PORTFOLIO
      </h1>
      <p className="text-xs sm:text-sm md:text-base">MUSIC RELEASES - (C) 1982-2025 LOST FUZZ</p>
      <p className="text-xs mt-4">TYPE &apos;HELP&apos; FOR SYSTEM COMMANDS</p>
    </header>
  );

  return (
    <main className="min-h-screen bg-black p-4 sm:p-8 font-[family-name:var(--font-vt323)] text-[#33ff33] text-xl uppercase overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <Terminal 
          commands={commands}
          welcomeMessage={welcomeMessage}
          inputPrefix="]"
          className="mb-12"
          forceUppercase={true}
          disableAutoScroll={true}
        />

        <section className="space-y-12">
          <div ref={bandcampRef} className="scroll-mt-8">
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
                    <DialUpImage
                      src={release.image}
                      alt={release.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100"
                      loadingSpeed={1.5 + Math.random() * 2}
                    />
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold truncate">{release.name}</div>
                    {release.artist && (
                      <div className="text-sm opacity-80">{release.artist}</div>
                    )}
                    <div className="text-xs mt-2 border-t border-current pt-1">
                      FILE: {index + 1}.EXE
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
              </div>
            </main>
          );
        }
        