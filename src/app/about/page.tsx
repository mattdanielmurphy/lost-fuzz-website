"use client"

import Link from "next/link"
import Terminal from "@/components/Terminal"
import { useRouter } from "next/navigation"
import { useState, useEffect, useMemo } from "react"

export default function About() {
	const router = useRouter()
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		setIsLoaded(true)
	}, [])

	const commands = useMemo(() => ({
		help: () => "AVAILABLE COMMANDS: DIR, TYPE, CD, CLS, VER, HELP, ECHO, HOME, ABOUT, PORTFOLIO, STUDIOS, CONTACT",
		dir: () => (
			<div className='grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 my-2 text-base sm:text-2xl'>
				<span>[.]</span>
				<span>[..]</span>
				<span>README.TXT</span>
				<span>PORTFOLIO.EXE</span>
				<span>STUDIOS.EXE</span>
				<span>CONTACT.EXE</span>
				<span>AUTOEXEC.BAT</span>
				<span>CONFIG.SYS</span>
				<span>COMMAND.COM</span>
			</div>
		),
		type: (args: string[]) => {
			const file = args[0]?.toUpperCase()
			if (file === "README.TXT") {
				return (
					<div className='bg-[#cccccc] text-black p-4 sm:p-8 space-y-6 my-2 normal-case font-sans'>
						<h1 className='text-2xl sm:text-4xl font-bold underline uppercase font-[family-name:var(--font-vt323)]'>LOST FUZZ: ABOUT ME</h1>
						<p className='text-lg sm:text-2xl leading-relaxed'>
							HELLO. I AM LOST FUZZ. I create dark, synth-driven alternative rock that blends electric guitar, electronic textures, and emotionally powered vocals. I draw heavily from industrial and
							post-alternative influences; my long-term project focuses on melody, atmosphere, and tension-driven songwriting. Soundtrack-esque, really—I feel a lot of my material would be right at
							home next to equally dark media: video games, movies, and TV shows.
						</p>
						<p className='text-lg sm:text-2xl leading-relaxed'>
							Current material spans late 2025 into 2026 and represents a body of work that balances raw guitar with fucked synthesizers and modern and old-school production ideas. The sound is heavy
							without being abrasive, and cinematic without sacrificing song structure. My songwriting goes back to when I was a teenager—over 10 years now, with 3 finished* albums/demo tapes—and I
							have been developing my unique style since I began my music journey back in late 2014.
						</p>
						<p className='text-lg sm:text-2xl leading-relaxed'>
							I am currently developing a full-length album and am seeking label or distribution partners aligned with alternative, electronic, and forward-thinking rock music.
						</p>
					</div>
				)
			}
			if (file === "AUTOEXEC.BAT") return "PATH C:\\DOS;C:\\WINDOWS\nPROMPT $P$G\nSET TEMP=C:\\TEMP"
			if (file === "CONFIG.SYS") return "DEVICE=C:\\DOS\\HIMEM.SYS\nDOS=HIGH,UMB\nFILES=30\nBUFFERS=20"
			return `FILE NOT FOUND - ${file}`
		},
		cd: (args: string[]) => {
			const dir = args[0]
			if (dir === "..") router.push("/")
			else return "INVALID DIRECTORY"
		},
		ver: () => "FS-DOS VERSION 6.22",
		echo: (args: string[]) => args.join(" "),
		home: () => {
			router.push("/")
		},
		about: () => {
			router.push("/about")
		},
		portfolio: () => {
			router.push("/portfolio")
		},
		studios: () => {
			router.push("/studios")
		},
		contact: () => {
			router.push("/contact")
		},
		"portfolio.exe": () => {
			router.push("/portfolio")
		},
		"studios.exe": () => {
			router.push("/studios")
		},
		"contact.exe": () => {
			router.push("/contact")
		},
		win: () => "LOADING WINDOWS 3.1...\nERROR: INSUFFICIENT MEMORY TO RUN WINDOWS.",
		format: () => "CRITICAL ERROR: ACCESS DENIED. YOU DO NOT HAVE PERMISSION TO FORMAT DRIVE C:.",
		del: () => "ACCESS DENIED.",
	}), [router])

	const welcomeMessage = (
		<div className='space-y-4'>
			<div>FS-DOS VERSION 6.22</div>
			<div>(C) COPYRIGHT FUZZISOFT CORP 1981-1994.</div>
		</div>
	)

	return (
		<main className='min-h-screen bg-black p-4 sm:p-6 font-[family-name:var(--font-vt323)] text-[#cccccc] text-lg sm:text-2xl uppercase'>
			<div className='max-w-4xl mx-auto'>
				{isLoaded && (
					<Terminal
						commands={commands}
						welcomeMessage={welcomeMessage}
						inputPrefix='C:\>'
						className='min-h-[50vh]'
						autoTypeCommand='TYPE README.TXT'
						autoTypeDelay={500}
						typingSpeed={50}
						forceUppercase={true}
					/>
				)}

				<div className='pt-8 border-t border-[#333] mt-8'>
					<Link href='/' className='hover:bg-[#cccccc] hover:text-black transition-colors px-2'>
						[ BACK TO MAIN MENU ]
					</Link>
				</div>
			</div>
		</main>
	)
}
