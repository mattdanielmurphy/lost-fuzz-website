"use client"

import { Instagram, Music, Youtube } from "lucide-react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import Link from "next/link"
import Terminal from "@/components/Terminal"
import { useRouter } from "next/navigation"

// This variable persists across internal navigations but resets on page refresh
let hasVisitedThisSession = false

const SpotifyIcon = ({ size = 24 }: { size?: number }) => (
	<svg width={size} height={size} viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
		<path d='M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z' />
	</svg>
)

const AppleMusicIcon = ({ size = 24 }: { size?: number }) => (
	<svg width={size} height={size} viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
		<path d='M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.106 1.596-.35 2.295-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.045-1.773-.6-1.943-1.536a1.88 1.88 0 011.038-2.022c.323-.16.67-.25 1.018-.324.378-.082.758-.153 1.134-.24.274-.063.457-.23.51-.516a.904.904 0 00.02-.193c0-1.815 0-3.63-.002-5.443a.725.725 0 00-.026-.185c-.04-.15-.15-.243-.304-.234-.16.01-.318.035-.475.066-.76.15-1.52.303-2.28.456l-2.325.47-1.374.278c-.016.003-.032.01-.048.013-.277.077-.377.203-.39.49-.002.042 0 .086 0 .13-.002 2.602 0 5.204-.003 7.805 0 .42-.047.836-.215 1.227-.278.64-.77 1.04-1.434 1.233-.35.1-.71.16-1.075.172-.96.036-1.755-.6-1.92-1.544-.14-.812.23-1.685 1.154-2.075.357-.15.73-.232 1.108-.31.287-.06.575-.116.86-.177.383-.083.583-.323.6-.714v-.15c0-2.96 0-5.922.002-8.882 0-.123.013-.25.042-.37.07-.285.273-.448.546-.518.255-.066.515-.112.774-.165.733-.15 1.466-.296 2.2-.444l2.27-.46c.67-.134 1.34-.27 2.01-.403.22-.043.442-.088.663-.106.31-.025.523.17.554.482.008.073.012.148.012.223.002 1.91.002 3.822 0 5.732z' />
	</svg>
)

const PixelArrow = ({ size = 16 }: { size?: number }) => (
	<svg width={size} height={size} viewBox='0 0 10 10' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
		<path d='M2 0h8v8h-2V4H6v2H4v2H2v2H0V8h2V6h2V4h2V2H2V0z' />
	</svg>
)

const socials = [
	{ name: "YouTube", href: "https://www.youtube.com/channel/UCASXSRk-C6fO9uCzMT98LJw", icon: Youtube },
	{ name: "Instagram", href: "https://www.instagram.com/lostfuzzmusic/", icon: Instagram },
	{ name: "Spotify", href: "https://open.spotify.com/artist/3Re7kFD4ofekyvC7fxG4A1", icon: SpotifyIcon },
	{ name: "Apple Music", href: "https://geo.music.apple.com/artist/lost-fuzz/1636398740", icon: AppleMusicIcon },
]

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

export default function Home() {
	const router = useRouter()
	const [bgColor, setBgColor] = useState("#3528be")
	const [borderColor, setBorderColor] = useState("#7c70da")
	const isFirstList = useRef(true)
	const [isReturning, setIsReturning] = useState(false)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		if (hasVisitedThisSession) {
			setIsReturning(true)
		} else {
			hasVisitedThisSession = true
			setIsReturning(false)
		}
		setIsLoaded(true)
	}, [])

	const lightColors = ["#FFFFFF", "#AAFFEE", "#EEEE77", "#AAFF66", "#BBBBBB", "#777777"]
	const isLightBg = lightColors.includes(bgColor.toUpperCase())
	const textColor = isLightBg ? "#000000" : borderColor === "#7c70da" ? "#7c70da" : "#ffffff"

	const playChiptune = useCallback(() => {
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
	}, [])

	const commands = useMemo(
		() => ({
			help: (args: string[], execute?: (cmd: string) => void) => (
				<div className='flex flex-col gap-1'>
					<div>AVAILABLE COMMANDS:</div>

					<button onClick={() => execute?.("LIST")} className='terminal-link text-left w-fit'>
						LIST - SHOW PROGRAMS
					</button>

					<button onClick={() => execute?.("COLOR BORDER RED")} className='terminal-link text-left w-fit'>
						COLOR - CHANGE SYSTEM COLORS
					</button>

					<button onClick={() => execute?.("MUSIC")} className='terminal-link text-left w-fit'>
						MUSIC - PLAY A SID TUNE
					</button>

					<button onClick={() => execute?.("DANCE")} className='terminal-link text-left w-fit'>
						DANCE - PARTY TIME
					</button>

					<button onClick={() => execute?.("CLS")} className='terminal-link text-left w-fit'>
						CLS - CLEAR SCREEN
					</button>

					<div className='flex flex-wrap gap-x-4'>
						<button onClick={() => execute?.("ABOUT")} className='terminal-link text-left w-fit'>
							ABOUT
						</button>
						<button onClick={() => execute?.("PORTFOLIO")} className='terminal-link text-left w-fit'>
							PORTFOLIO
						</button>
						<button onClick={() => execute?.("CONTACT")} className='terminal-link text-left w-fit'>
							CONTACT
						</button>
						<button onClick={() => execute?.("SPOTIFY")} className='terminal-link text-left w-fit'>
							SPOTIFY
						</button>
						<button onClick={() => execute?.("APPLE")} className='terminal-link text-left w-fit'>
							APPLE
						</button>
					</div>
				</div>
			),

			list: (args: string[], execute?: (cmd: string) => void) => {
				const showTips = isFirstList.current
				isFirstList.current = false
				return (
					<div className='flex flex-col gap-2 my-2'>
						<div className='flex gap-2 sm:gap-4'>
							<span className='w-10 sm:w-12 flex-shrink-0 text-right'>10</span>

							<Link href='/portfolio' className='terminal-link inline-block'>
								PRINT &quot;PORTFOLIO&quot;
							</Link>
						</div>

						<div className='flex gap-2 sm:gap-4'>
							<span className='w-10 sm:w-12 flex-shrink-0 text-right'>20</span>

							<Link href='/contact' className='terminal-link inline-block'>
								PRINT &quot;CONTACT ME&quot;
							</Link>
						</div>

						<div className='flex gap-2 sm:gap-4'>
							<span className='w-10 sm:w-12 flex-shrink-0 text-right'>30</span>

							<Link href='/about' className='terminal-link inline-block'>
								PRINT &quot;ABOUT ME&quot;
							</Link>
						</div>

						<div className='flex gap-2 sm:gap-4'>
							<span className='w-10 sm:w-12 flex-shrink-0 text-right'>40</span>

							<a href='https://open.spotify.com/artist/3Re7kFD4ofekyvC7fxG4A1' target='_blank' className='terminal-link flex items-center gap-2'>
								PRINT &quot;SPOTIFY&quot; <PixelArrow size={18} />
							</a>
						</div>

						<div className='flex gap-2 sm:gap-4'>
							<span className='w-10 sm:w-12 flex-shrink-0 text-right'>50</span>

							<a
								href='https://geo.music.apple.com/artist/lost-fuzz/1636398740'
								target='_blank'
								className='terminal-link flex items-center gap-2'
								suppressHydrationWarning
							>
								PRINT &quot;APPLE MUSIC&quot; <PixelArrow size={18} />
							</a>
						</div>

						{showTips && (
							<div className='mt-2 text-[0.8em] sm:text-[0.7em] opacity-70'>
								TIP: TYPE{" "}
								<button onClick={() => execute?.("HELP")} className='terminal-link'>
									&apos;HELP&apos;
								</button>{" "}
								OR{" "}
								<button onClick={() => execute?.("MUSIC")} className='terminal-link'>
									&apos;MUSIC&apos;
								</button>
							</div>
						)}
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

			poke: (args: string[]): string | React.ReactNode | void => {
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

			load: async (args: string[]) => {
				const target = args[0] ? args[0].replace(/['"]/g, "") : "LOST FUZZ"
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
			music: () => {
				playChiptune()
				return "PLAYING SID TUNE..."
			},
			dance: () => <DancingGuy />,
			about: () => {
				router.push("/about")
			},
			portfolio: () => {
				router.push("/portfolio")
			},
			contact: () => {
				router.push("/contact")
			},
			"10": () => {
				router.push("/portfolio")
			},
			"20": () => {
				router.push("/contact")
			},
			"30": () => {
				router.push("/about")
			},
			spotify: () => {
				window.open("https://open.spotify.com/artist/3Re7kFD4ofekyvC7fxG4A1", "_blank")
			},
			apple: () => {
				window.open("https://geo.music.apple.com/artist/lost-fuzz/1636398740", "_blank")
			},
			"40": () => {
				window.open("https://open.spotify.com/artist/3Re7kFD4ofekyvC7fxG4A1", "_blank")
			},
			"50": () => {
				window.open("https://geo.music.apple.com/artist/lost-fuzz/1636398740", "_blank")
			},
		}),
		[router, playChiptune]
	)

	const welcomeMessage = (
		<div className='text-center mb-6 sm:mb-8 break-words'>
			**** LOST FUZZ BASIC V2 ****
			<br />
			64K RAM SYSTEM
			<span className='hidden sm:inline'> 38911 BASIC BYTES FREE</span>
			<br />
			MUSICIAN IN AB, CANADA
		</div>
	)

	return (
		<main className='flex h-dvh flex-col items-center justify-center p-2 sm:p-4 font-[family-name:var(--font-press-start-2p)] overflow-hidden' style={{ backgroundColor: borderColor }}>
			<div
				className='w-full max-w-4xl h-full sm:h-[85%] border-8 sm:border-[32px] md:border-[64px] flex flex-col p-4 sm:p-8 text-[12px] sm:text-base md:text-lg uppercase leading-loose shadow-2xl transition-colors duration-500 overflow-hidden'
				style={
					{
						backgroundColor: bgColor,
						borderColor: borderColor,
						color: textColor,
						"--terminal-text": textColor,
						"--terminal-bg": bgColor,
					} as React.CSSProperties
				}
			>
				{isLoaded && (
					<Terminal
						commands={commands}
						welcomeMessage={welcomeMessage}
						className='flex-1'
						autoTypeCommand='LIST'
						autoTypeDelay={isReturning ? 300 : 800}
						typingSpeed={isReturning ? 75 : 200}
						forceUppercase={true}
						cursorHighlightColor={bgColor}
						textColor={textColor}
					/>
				)}
				<div className='mt-auto pt-8 border-t border-[#7c70da] flex flex-row gap-8 justify-center items-center pb-2' style={{ borderColor: textColor }}>
					{socials.map((social) => (
						<Link key={social.name} href={social.href} target='_blank' className='terminal-link p-2' title={social.name} suppressHydrationWarning={social.name === "Apple Music"}>
							<social.icon size={40} />
						</Link>
					))}
				</div>
			</div>
		</main>
	)
}
