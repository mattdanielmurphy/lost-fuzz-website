"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import Terminal from "@/components/Terminal"

export default function About() {
	const router = useRouter()

	const commands = {
		help: () => "AVAILABLE COMMANDS: DIR, TYPE, CD, CLS, VER, HELP, ECHO, ABOUT, PORTFOLIO, STUDIOS, CONTACT",
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
					<div className='bg-[#cccccc] text-black p-4 space-y-4 my-2'>
						<h1 className='text-xl sm:text-3xl font-bold underline'>LOST FUZZ: ABOUT ME</h1>
						<p className='text-base sm:text-xl'>DEVELOPER, ARTIST, AND RETRO-FUTURIST.</p>
						<p>I BUILD EXPERIENCES THAT BRIDGE THE GAP BETWEEN THE GOLDEN AGE OF COMPUTING AND THE MODERN WEB.</p>
						<p>CURRENTLY EXPLORING THE INTERSECTION OF ANALOG HARDWARE AND DIGITAL INTERFACES.</p>
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
		about: () => { router.push("/about") },
		portfolio: () => { router.push("/portfolio") },
		studios: () => { router.push("/studios") },
		contact: () => { router.push("/contact") },
		"portfolio.exe": () => { router.push("/portfolio") },
		"studios.exe": () => { router.push("/studios") },
		"contact.exe": () => { router.push("/contact") },
		win: () => "LOADING WINDOWS 3.1...\nERROR: INSUFFICIENT MEMORY TO RUN WINDOWS.",
		"format": () => "CRITICAL ERROR: ACCESS DENIED. YOU DO NOT HAVE PERMISSION TO FORMAT DRIVE C:.",
		"del": () => "ACCESS DENIED.",
	}

	const welcomeMessage = (
		<div className="space-y-4">
			<div>FS-DOS VERSION 6.22</div>
			<div>(C) COPYRIGHT FUZZISOFT CORP 1981-1994.</div>
		</div>
	)

	return (
		<main className='min-h-screen bg-black p-4 sm:p-6 font-[family-name:var(--font-vt323)] text-[#cccccc] text-lg sm:text-2xl uppercase'>
			<div className='max-w-4xl mx-auto'>
				<Terminal 
					commands={commands}
					welcomeMessage={welcomeMessage}
					inputPrefix="C:\>"
					className="min-h-[50vh]"
				/>

				<div className='pt-8 border-t border-[#333] mt-8'>
					<Link href='/' className='hover:bg-[#cccccc] hover:text-black transition-colors px-2'>
						[ BACK TO MAIN MENU ]
					</Link>
				</div>
			</div>
		</main>
	)
}
