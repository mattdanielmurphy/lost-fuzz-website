import Link from "next/link"

export default function About() {
	return (
		<main className='min-h-screen bg-black p-4 sm:p-6 font-[family-name:var(--font-vt323)] text-[#cccccc] text-lg sm:text-2xl uppercase'>
			<div className='max-w-4xl mx-auto space-y-4'>
				<div>FS-DOS VERSION 6.22</div>
				<div>(C) COPYRIGHT FUZZISOFT CORP 1981-1994.</div>

				<div className='pt-4'>C:\&gt;DIR /W</div>
				<div className='grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 border-b border-[#cccccc] pb-2 text-base sm:text-2xl'>
					<span>[.]</span>
					<span>[..]</span>
					<span>README.TXT</span>
					<span>AUTOEXEC.BAT</span>
					<span>CONFIG.SYS</span>
					<span>COMMAND.COM</span>
				</div>

				<div className='pt-4'>C:\&gt;TYPE README.TXT</div>

				<div className='bg-[#cccccc] text-black p-4 space-y-4'>
					<h1 className='text-xl sm:text-3xl font-bold underline'>LOST FUZZ: ABOUT ME</h1>
					<p className='text-base sm:text-xl'>DEVELOPER, ARTIST, AND RETRO-FUTURIST.</p>
					<p>I BUILD EXPERIENCES THAT BRIDGE THE GAP BETWEEN THE GOLDEN AGE OF COMPUTING AND THE MODERN WEB.</p>
					<p>CURRENTLY EXPLORING THE INTERSECTION OF ANALOG HARDWARE AND DIGITAL INTERFACES.</p>
				</div>

				<div className='pt-8'>
					C:\&gt;
					<Link href='/' className='hover:bg-[#cccccc] hover:text-black transition-colors px-2'>
						CD ..
					</Link>
				</div>

				<div className='pt-4 animate-pulse'>C:\&gt;_</div>
			</div>
		</main>
	)
}
