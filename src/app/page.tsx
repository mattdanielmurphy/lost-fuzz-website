"use client"

import { Instagram, Music, Youtube } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import Link from "next/link"
import Terminal from "@/components/Terminal"
import { useRouter } from "next/navigation"

export default function Home() {
	const router = useRouter()
	const [bgColor, setBgColor] = useState("#3528be")
	const [borderColor, setBorderColor] = useState("#7c70da")
	const isFirstList = useRef(true)

	const lightColors = ["#FFFFFF", "#AAFFEE", "#EEEE77", "#AAFF66", "#BBBBBB", "#777777"]
	const isLightBg = lightColors.includes(bgColor.toUpperCase())
	const textColor = isLightBg ? "#000000" : (borderColor === "#7c70da" ? "#7c70da" : "#ffffff")

	const DancingGuy = () => {
		const [frame, setFrame] = useState(0)
		useEffect(() => {
			const interval = setInterval(() => {
				setFrame((f) => (f + 1) % 2)
			}, 500)
			return () => clearInterval(interval)
		}, [])

		const frames = [
			`   (•_•)
   <)   )ゞ
    /    \\`,
			`   ( •_•)
    (   (>
    /    \\`,
		]

		return (
			<div className='my-4 font-mono leading-tight whitespace-pre'>
				{frames[frame]}
				<div className='animate-bounce mt-2 text-center'>DANCING TO THE FUZZ!</div>
			</div>
		)
	}

	const socials = [
		{ name: "YouTube", href: "https://www.youtube.com/channel/UCASXSRk-C6fO9uCzMT98LJw", icon: Youtube },
		{ name: "Instagram", href: "https://www.instagram.com/lostfuzzmusic/", icon: Instagram },
		{ name: "Bandcamp", href: "https://lostfuzz.bandcamp.com/", icon: Music },
	]

	const playChiptune = () => {
		const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext

		const ctx = new AudioContextClass()

		const notes: Record<string, number> = {
			E5: 659.25,
			"D#5": 622.25,
			B4: 493.88,
			D5: 587.33,
			C5: 523.25,
			A4: 440,

			C4: 261.63,
			E4: 329.63,
			G4: 392.0,
			B3: 246.94,
			"G#4": 415.3,
			F5: 698.46,
			G5: 783.99,
		}

		const melody = [
			// Part A

			["E5", 0.15],
			["D#5", 0.15],
			["E5", 0.15],
			["D#5", 0.15],
			["E5", 0.15],
			["B4", 0.15],
			["D5", 0.15],
			["C5", 0.15],
			["A4", 0.45],

			["C4", 0.15],
			["E4", 0.15],
			["A4", 0.15],
			["B4", 0.45],

			["E4", 0.15],
			["G#4", 0.15],
			["B4", 0.15],
			["C5", 0.45],

			["E4", 0.15],
			["E5", 0.15],
			["D#5", 0.15],
			["E5", 0.15],
			["D#5", 0.15],
			["E5", 0.15],
			["B4", 0.15],
			["D5", 0.15],
			["C5", 0.15],
			["A4", 0.45],

			["C4", 0.15],
			["E4", 0.15],
			["A4", 0.15],
			["B4", 0.45],

			["E4", 0.15],
			["C5", 0.15],
			["B4", 0.15],
			["A4", 0.45],

			// Part B

			["B4", 0.15],
			["C5", 0.15],
			["D5", 0.15],
			["E5", 0.45],

			["G4", 0.15],
			["F5", 0.15],
			["E5", 0.15],
			["D5", 0.45],

			["F4", 0.15],
			["E5", 0.15],
			["D5", 0.15],
			["C5", 0.45],

			["E4", 0.15],
			["D5", 0.15],
			["C5", 0.15],
			["B4", 0.45],

			// Repeat Part A (End)

			["E5", 0.15],
			["D#5", 0.15],
			["E5", 0.15],
			["D#5", 0.15],
			["E5", 0.15],
			["B4", 0.15],
			["D5", 0.15],
			["C5", 0.15],
			["A4", 0.45],

			["C4", 0.15],
			["E4", 0.15],
			["A4", 0.15],
			["B4", 0.45],

			["E4", 0.15],
			["G#4", 0.15],
			["B4", 0.15],
			["C5", 0.45],

			["E4", 0.15],
			["E5", 0.15],
			["D#5", 0.15],
			["E5", 0.15],
			["D#5", 0.15],
			["E5", 0.15],
			["B4", 0.15],
			["D5", 0.15],
			["C5", 0.15],
			["A4", 0.45],
		]

		let time = ctx.currentTime

		melody.forEach(([note, duration]) => {
			const freq = notes[note as string] || 0

			if (freq > 0) {
				const osc = ctx.createOscillator()

				const gain = ctx.createGain()

				osc.type = "square"

				osc.frequency.setValueAtTime(freq, time)

				gain.gain.setValueAtTime(0.08, time)

				gain.gain.exponentialRampToValueAtTime(0.0001, time + (duration as number) * 0.9)

				osc.connect(gain)

				gain.connect(ctx.destination)

				osc.start(time)

				osc.stop(time + (duration as number))
			}

			time += duration as number
		})
	}

	const commands = {
				help: () => (
					<div className='flex flex-col gap-1'>
						<div>AVAILABLE COMMANDS:</div>
		
						<div>LIST - SHOW PROGRAMS</div>
		
						<div>COLOR - CHANGE SYSTEM COLORS (E.G. COLOR BORDER RED)</div>
		
						<div>MUSIC - PLAY A SID TUNE</div>
		
						<div>DANCE - PARTY TIME</div>
		
						<div>CLS - CLEAR SCREEN</div>
		
						<div>PORTFOLIO, STUDIOS, CONTACT - NAVIGATE</div>
					</div>
				),
		
				list: () => {
					const showTips = isFirstList.current
					isFirstList.current = false
					return (
						<div className='flex flex-col gap-2 my-2'>
							<div className='flex gap-4'>
								<span className='w-12 flex-shrink-0 text-right'>10</span>
		
								<Link href='/portfolio' className='terminal-link inline-block'>
									PRINT &quot;PORTFOLIO&quot;
								</Link>
							</div>
		
							<div className='flex gap-4'>
								<span className='w-12 flex-shrink-0 text-right'>20</span>
		
								<Link href='/studios' className='terminal-link inline-block'>
									PRINT &quot;LOST FUZZ STUDIOS&quot;
								</Link>
							</div>
		
							<div className='flex gap-4'>
								<span className='w-12 flex-shrink-0 text-right'>30</span>
		
								<Link href='/contact' className='terminal-link inline-block'>
									PRINT &quot;CONTACT ME&quot;
								</Link>
							</div>
		
							{showTips && <div className='mt-2 text-[0.7em] opacity-70'>TIP: TYPE &apos;HELP&apos; OR &apos;MUSIC&apos;</div>}
						</div>
					)
				},
		
				color: (args: string[]) => {
					const colors: Record<string, string> = {
						BLACK: "#000000",
						WHITE: "#FFFFFF",
						RED: "#880000",
						CYAN: "#AAFFEE",
		
						PURPLE: "#CC44CC",
						GREEN: "#00CC55",
						BLUE: "#0000AA",
						YELLOW: "#EEEE77",
		
						ORANGE: "#DD8855",
						BROWN: "#664400",
						PINK: "#FF7777",
						GREY: "#333333",
		
						LIGHTGREY: "#BBBBBB",
						LIGHTGREEN: "#AAFF66",
						LIGHTBLUE: "#0088FF",
						MEDGREY: "#777777",
					}
		
					if (args.length < 2) return "USAGE: COLOR [BORDER|BG] [COLOR_NAME]"
		
					const target = args[0].toUpperCase()
		
					const colorName = args[1].toUpperCase()
		
					const hex = colors[colorName]
		
					if (!hex) return `?INVALID COLOR. TRY: ${Object.keys(colors).join(", ")}`
		
					if (target === "BORDER") {
						setBorderColor(hex)
		
						return "OK"
					}
		
					if (target === "BG" || target === "BACKGROUND") {
						setBgColor(hex)
		
						return "OK"
					}
		
					return "USAGE: COLOR [BORDER|BG] [COLOR_NAME]"
				},
		
				poke: (args: string[]) => {
					if (args.length < 2) {
						if (args[0]?.includes(",")) {
							const parts = args[0].split(",")
		
							return commands.poke([parts[0], parts[1]])
						}
		
						return "?SYNTAX ERROR"
					}
		
					const addr = args[0].replace(",", "")
		
					const val = parseInt(args[1])
		
					const colors = ["#000000", "#FFFFFF", "#880000", "#AAFFEE", "#CC44CC", "#00CC55", "#0000AA", "#EEEE77", "#DD8855", "#664400", "#FF7777", "#333333", "#BBBBBB", "#AAFF66", "#0088FF", "#777777"]
		
					if (addr === "53280") {
						setBorderColor(colors[val % 16] || colors[0])
		
						return "OK"
					}
		
					if (addr === "53281") {
						setBgColor(colors[val % 16] || colors[0])
		
						return "OK"
					}
		
					if (addr === "646") {
						return "COLOR RAM UPDATED (OK)"
					}
		
					return "OK"
				},
		
				load: async (args: string[]) => {			const target = args[0] ? args[0].replace(/['"]/g, "") : "LOST FUZZ"
			return (
				<div className='flex flex-col gap-1'>
					<div>PRESS PLAY ON TAPE</div>
					<div>OK</div>
					<div>SEARCHING FOR {target}</div>
					<div className='flex items-center gap-1'>
						LOADING [
						<div className='w-20 overflow-hidden'>
							<div className='animate-loading whitespace-nowrap'>==========</div>
						</div>
						]
					</div>
					<div>READY.</div>
				</div>
			)
		},
		poke: (args: string[]) => {
			if (args.length < 2) {
				if (args[0]?.includes(",")) {
					const parts = args[0].split(",")
					return commands.poke([parts[0], parts[1]])
				}
				return "?SYNTAX ERROR"
			}
			const addr = args[0].replace(",", "")
			const val = parseInt(args[1])
			const colors = ["#000000", "#FFFFFF", "#880000", "#AAFFEE", "#CC44CC", "#00CC55", "#0000AA", "#EEEE77", "#DD8855", "#664400", "#FF7777", "#333333", "#777777", "#AAFF66", "#0088FF", "#BBBBBB"]

			if (addr === "53280") {
				setBorderColor(colors[val % 16] || colors[0])
				return "OK"
			}
			if (addr === "53281") {
				setBgColor(colors[val % 16] || colors[0])
				return "OK"
			}
			if (addr === "646") {
				// Text color? Harder to implement globally without more state
				return "COLOR RAM UPDATED (OK)"
			}
			return "OK"
		},
		music: () => {
			playChiptune()
			return "PLAYING SID TUNE..."
		},
		dance: () => <DancingGuy />,
		portfolio: () => {
			router.push("/portfolio")
		},
		studios: () => {
			router.push("/studios")
		},
		contact: () => {
			router.push("/contact")
		},
		"10": () => {
			router.push("/portfolio")
		},
		"20": () => {
			router.push("/studios")
		},
		"30": () => {
			router.push("/contact")
		},
	}

	const welcomeMessage = (
		<div className='text-center mb-6 sm:mb-8 break-words'>
			**** LOST FUZZ BASIC V2 ****
			<br />
			64K RAM SYSTEM 38911 BASIC BYTES FREE
			<br />
			MUSICIAN LIVING IN ALBERTA CANADA
		</div>
	)

	return (
		<main className='flex min-h-screen items-center justify-center p-2 sm:p-4 font-[family-name:var(--font-press-start-2p)] overflow-y-auto' style={{ backgroundColor: borderColor }}>
			<div
				className='w-full max-w-4xl min-h-[70vh] border-8 sm:border-[32px] md:border-[64px] flex flex-col p-4 sm:p-8 text-[9px] sm:text-base md:text-lg uppercase leading-loose shadow-2xl transition-colors duration-500'
				style={{ 
					backgroundColor: bgColor, 
					borderColor: borderColor, 
					color: textColor,
					'--terminal-text': textColor,
					'--terminal-bg': bgColor
				} as React.CSSProperties}
			>
				<Terminal 
					commands={commands} 
					welcomeMessage={welcomeMessage} 
					className='flex-1' 
					initialCommand='LIST' 
					forceUppercase={true} 
					cursorHighlightColor={bgColor} 
					textColor={textColor}
				/>
				<div className='mt-auto pt-8 border-t border-[#7c70da] flex flex-row gap-8 justify-center items-center pb-2' style={{ borderColor: textColor }}>
					{socials.map((social) => (
						<Link
							key={social.name}
							href={social.href}
							target='_blank'
							className='terminal-link p-2'
							title={social.name}
						>
							<social.icon size={40} />
						</Link>
					))}
				</div>
			</div>
		</main>
	)
}
