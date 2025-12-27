import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#7c70da] p-4 sm:p-8 font-[family-name:var(--font-press-start-2p)]">
      <div className="w-full max-w-4xl aspect-[4/3] bg-[#3528be] border-[32px] sm:border-[64px] border-[#7c70da] flex flex-col p-4 sm:p-8 text-[#7c70da] text-xs sm:text-lg uppercase leading-loose shadow-2xl">
        <div className="text-center mb-8">
          **** IAN DAOUST ****
          <br />
          MUSICIAN LIVING IN BEAUMONT, ALBERTA
        </div>

        <div className="mb-4">READY.</div>

        <div className="flex flex-col gap-4">
          <Link href="/portfolio" className="hover:bg-[#7c70da] hover:text-[#3528be] transition-colors inline-block w-fit">
            10 PRINT "PORTFOLIO"
          </Link>
          <Link href="/studios" className="hover:bg-[#7c70da] hover:text-[#3528be] transition-colors inline-block w-fit">
            20 PRINT "LOST FUZZ STUDIOS"
          </Link>
          <Link href="/about" className="hover:bg-[#7c70da] hover:text-[#3528be] transition-colors inline-block w-fit">
            30 PRINT "ABOUT ME"
          </Link>
          <Link href="/contact" className="hover:bg-[#7c70da] hover:text-[#3528be] transition-colors inline-block w-fit">
            40 PRINT "CONTACT ME"
          </Link>
          <div className="animate-pulse">50 RUN _</div>
        </div>
      </div>
    </main>
  );
}