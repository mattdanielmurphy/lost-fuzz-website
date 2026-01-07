import { Ghost, Instagram, Music, Youtube } from "lucide-react"

import Link from "next/link"

export default function Home() {
	const socials = [
		{ name: "YouTube", href: "https://www.youtube.com/channel/UCASXSRk-C6fO9uCzMT98LJw", icon: Youtube },

		{ name: "Instagram", href: "https://www.instagram.com/lostfuzzmusic/", icon: Instagram },

		{ name: "Bandcamp", href: "https://lostfuzz.bandcamp.com/", icon: Music },
	]

	return (
		<main className='flex min-h-screen items-center justify-center bg-[#7c70da] p-2 sm:p-4 font-[family-name:var(--font-press-start-2p)] overflow-y-auto'>
			<div className='w-full max-w-4xl min-h-[70vh] bg-[#3528be] border-8 sm:border-[32px] md:border-[64px] border-[#7c70da] flex flex-col p-4 sm:p-8 text-[#7c70da] text-[9px] sm:text-base md:text-lg uppercase leading-loose shadow-2xl'>
				<div className='text-center mb-6 sm:mb-8 break-words'>
					**** LOST FUZZ BASIC V2 ****
					<br />
					64K RAM SYSTEM 38911 BASIC BYTES FREE
					<br />
					MUSICIAN LIVING IN ALBERTA CANADA
				</div>

				<div className='mb-4'>READY.</div>

				<div className='flex flex-col gap-4 mb-12'>
					<Link href='/portfolio' className='hover:bg-[#7c70da] hover:text-[#3528be] transition-colors inline-block w-fit'>
						10 PRINT &quot;PORTFOLIO&quot;
					</Link>

					<Link href='/studios' className='hover:bg-[#7c70da] hover:text-[#3528be] transition-colors inline-block w-fit'>
						20 PRINT &quot;LOST FUZZ STUDIOS&quot;
					</Link>

					<Link href='/about' className='hover:bg-[#7c70da] hover:text-[#3528be] transition-colors inline-block w-fit'>
						30 PRINT &quot;ABOUT ME&quot;
					</Link>

					<Link href='/contact' className='hover:bg-[#7c70da] hover:text-[#3528be] transition-colors inline-block w-fit'>
						40 PRINT &quot;CONTACT ME&quot;
					</Link>

					<div className='animate-pulse'>50 RUN _</div>
				</div>

				<div className='mt-auto pt-8 border-t border-[#7c70da] flex flex-row gap-8 justify-center items-center pb-2'>
					{socials.map((social) => (
						<Link key={social.name} href={social.href} target='_blank' className='hover:text-white transition-colors p-1' title={social.name}>
							<social.icon size={40} />
						</Link>
					))}
				</div>
			</div>
		</main>
	)
}
