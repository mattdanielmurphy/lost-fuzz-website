"use client"

import { useEffect, useRef, useState } from "react"

import DialUpImage from "@/components/DialUpImage"
import Link from "next/link"
import Terminal from "@/components/Terminal"
import { useRouter } from "next/navigation"

export default function Studios() {
	const [activeMenu, setActiveMenu] = useState<string | null>(null)
	const [terminalOpen, setTerminalOpen] = useState(false)
	const [terminalPos, setTerminalPos] = useState({ x: 0, y: 0 })
	const [isDragging, setIsDragging] = useState(false)
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

	const router = useRouter()
	const terminalRef = useRef<HTMLDivElement>(null)

	const terminalCommands = {
		help: (args: string[], execute?: (cmd: string) => void) => (
			<div className="flex flex-wrap gap-x-2 gap-y-1">
				<span>COMMANDS:</span>
				<button onClick={() => execute?.("HELP")} className="terminal-link">HELP</button>
				<button onClick={() => execute?.("CLEAR")} className="terminal-link">CLEAR</button>
				<button onClick={() => execute?.("HOME")} className="terminal-link">HOME</button>
				<button onClick={() => execute?.("ABOUT")} className="terminal-link">ABOUT</button>
				<button onClick={() => execute?.("PORTFOLIO")} className="terminal-link">PORTFOLIO</button>
				<button onClick={() => execute?.("CONTACT")} className="terminal-link">CONTACT</button>
				<button onClick={() => execute?.("HELLO")} className="terminal-link">HELLO</button>
				<button onClick={() => execute?.("DATE")} className="terminal-link">DATE</button>
				<button onClick={() => execute?.("BOOK")} className="terminal-link">BOOK</button>
			</div>
		),
		home: () => {
			router.push("/")
		},
		about: () => {
			router.push("/about")
		},
		portfolio: () => {
			router.push("/portfolio")
		},
		contact: () => {
			router.push("/contact")
		},
		hello: () => "WELCOME TO THE MACHINE. ENJOY YOUR STAY.",
		date: () => new Date().toLocaleString().toUpperCase(),
		book: () => {
			window.open("https://forms.gle/1SD6c81jgTA6dpg16", "_blank")
			return "OPENING BOOKING FORM..."
		},
	}

	const menuItems = {
		File: [
			{ label: "New", action: () => alert("Cannot create new reality yet.") },
			{ label: "Open", action: () => alert("Opening the vault...") },
			{ label: "Print", action: () => window.print() },
			{ label: "Close", action: () => router.push("/") },
		],
		Edit: [
			{ label: "Undo", action: () => alert("Time travel not implemented.") },
			{
				label: "Cut",
				action: () => {
					const selectedText = window.getSelection()?.toString()
					if (selectedText) {
						navigator.clipboard.writeText(selectedText)
						alert("Cut to clipboard")
					}
				},
			},
			{
				label: "Copy",
				action: () => {
					const selectedText = window.getSelection()?.toString()
					if (selectedText) {
						navigator.clipboard.writeText(selectedText)
						alert("Copied to clipboard")
					} else {
						navigator.clipboard.writeText("Lost Fuzz Studios: lostfuzz.bandcamp.com")
						alert("Copied studio link to clipboard")
					}
				},
			},
			{ label: "Paste", action: () => alert("Nowhere to paste!") },
		],
		Special: [
			{ label: "Terminal", action: () => setTerminalOpen(!terminalOpen) },
			{ label: "Clean Up", action: () => alert("Everything is tidy.") },
			{ label: "Restart", action: () => window.location.reload() },
			{ label: "Shut Down", action: () => router.push("/") },
		],
	}

	useEffect(() => {
		if (terminalOpen) {
			// Center terminal initially if at 0,0
			if (terminalPos.x === 0 && terminalPos.y === 0) {
				Promise.resolve().then(() => {
					setTerminalPos({ x: window.innerWidth / 2 - 150, y: 150 })
				})
			}
		}
	}, [terminalOpen, terminalPos.x, terminalPos.y])

	const onMouseDown = (e: React.MouseEvent) => {
		if (terminalRef.current && e.target instanceof Node && terminalRef.current.contains(e.target)) {
			setIsDragging(true)
			setDragOffset({
				x: e.clientX - terminalPos.x,
				y: e.clientY - terminalPos.y,
			})
		}
	}

	useEffect(() => {
		const onMouseMove = (e: MouseEvent) => {
			if (isDragging) {
				setTerminalPos({
					x: e.clientX - dragOffset.x,
					y: e.clientY - dragOffset.y,
				})
			}
		}
		const onMouseUp = () => setIsDragging(false)

		if (isDragging) {
			window.addEventListener("mousemove", onMouseMove)
			window.addEventListener("mouseup", onMouseUp)
		}
		return () => {
			window.removeEventListener("mousemove", onMouseMove)
			window.removeEventListener("mouseup", onMouseUp)
		}
	}, [isDragging, dragOffset])

	return (
		<main className='min-h-screen bg-white p-4 sm:p-12 font-sans text-black print:p-0' style={{ backgroundImage: "radial-gradient(#ccc 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
			<div className='max-w-2xl mx-auto bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative print:shadow-none print:border-none'>
				{/* Title Bar */}
				<div className='border-b-2 border-black p-2 flex items-center justify-between bg-white print:hidden'>
					<div className='flex gap-1'>
						<button onClick={() => router.push("/")} className='w-4 h-4 border border-black hover:bg-black transition-colors'></button>
					</div>
					<div className="font-bold uppercase tracking-widest text-sm">
						<Link href="/" className="hover:underline">Lost Fuzz</Link> Studios
					</div>
					<div className='w-4 h-4'></div>
				</div>

				{/* Menu Bar (Internal) */}
				<div className='border-b border-black flex gap-4 px-4 py-1 text-xs font-bold uppercase relative print:hidden'>
					{Object.keys(menuItems).map((menu) => (
						<div key={menu} className='relative'>
							<button
								onClick={() => setActiveMenu(activeMenu === menu ? null : menu)}
								className={`hover:bg-black hover:text-white px-2 py-0.5 transition-colors ${activeMenu === menu ? "bg-black text-white" : ""}`}
							>
								{menu}
							</button>
							{activeMenu === menu && (
								<div className='absolute top-full left-0 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50 min-w-[120px]'>
									{menuItems[menu as keyof typeof menuItems].map((item) => (
										<button
											key={item.label}
											onClick={() => {
												item.action()
												setActiveMenu(null)
											}}
											className='w-full text-left px-4 py-1 hover:bg-black hover:text-white transition-colors border-b border-gray-200 last:border-b-0'
										>
											{item.label}
										</button>
									))}
								</div>
							)}
						</div>
					))}
				</div>

				{/* Content */}
				<div className='p-4 sm:p-8 space-y-8 print:p-0'>
					<div className='flex flex-col items-center'>
						<div className='w-32 h-32 sm:w-48 sm:h-48 mb-4 relative'>
							<DialUpImage src='/images/lost-fuzz-icon-500px.png' alt='Lost Fuzz Icon' fill className='object-contain' loadingSpeed={2} style={{ background: 'none' }} />
						</div>
						<h1 className='text-xl sm:text-3xl font-bold uppercase tracking-tighter italic text-center'>Lost Fuzz Studios</h1>
					</div>

					<div className='space-y-6 text-xs sm:text-sm leading-relaxed'>
						<p className='border-t border-b border-black py-4 text-center font-bold'>
							A few other artists and I are starting LOST FUZZ Studios. We&apos;re an amateur home recording studio open to musicians, songwriters, and artists who want help recording and producing
							music, beats, mixing, lyric writing, and instrumentation. We also offer rehearsal space with recording support.
						</p>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
							<div className='space-y-4'>
								<section>
									<h2 className='font-bold underline uppercase mb-2'>The Vibe</h2>
									<p>We aren&apos;t &quot;super duper&quot; high-end—just a few artists looking to help the community and build our own skills. Any genre is welcome!</p>
								</section>

								<section>
									<h2 className='font-bold underline uppercase mb-2'>Capabilities</h2>
									<ul className='list-disc pl-4 space-y-1'>
										<li>Vocal and instrument recording</li>
										<li>Mixing and production</li>
										<li>Sampling and sound effects</li>
										<li>Arrangement and conceptual help</li>
										<li>Rap beats and production</li>
									</ul>
								</section>

								<section>
									<h2 className='font-bold underline uppercase mb-2'>Specialties</h2>
									<p>I specialize in soundtrack-style music for video games or movies. I also use vintage 64-bit computers as instruments—they are SICK.</p>
								</section>
							</div>

							<div className='space-y-4'>
								<section>
									<h2 className='font-bold underline uppercase mb-2'>Equipment & Space</h2>
									<p>
										We have a decent amount of physical gear, instruments, and VSTs available. You&apos;re welcome to bring your own gear if we have the space (keep in mind we are up a flight of
										stairs!).
									</p>
									<p className='mt-2 italic'>Better quality than home recordings, or intentional lo-fi—I have a tape machine for cool analog effects.</p>
								</section>

								<section>
									<h2 className='font-bold underline uppercase mb-2'>No Noise Limits</h2>
									<p>We can be loud! Tube amps, drums, etc. are all welcome here.</p>
								</section>

								<section>
									<h2 className='font-bold underline uppercase mb-2'>The Team</h2>
									<ul className='list-disc pl-4 space-y-1'>
										<li>
											<span className='font-bold'>Ian:</span> Guitar/bass (10+ years), stringed instruments, synths/drum machines (7 years), basic piano.
										</li>
										<li>
											<span className='font-bold'>Matt:</span> Percussion, piano, and acoustic instruments (14+ years).
										</li>
										<li>
											<span className='font-bold'>Jay:</span> Visuals, paintings, drawings, band posters, and 4K GoPro studio session recordings.
										</li>
									</ul>
								</section>
							</div>
						</div>

						<section className='bg-black text-white p-4 space-y-2'>
							<h2 className='font-bold uppercase text-center border-b border-white pb-2 mb-2'>Rates & Booking</h2>
							<p>$30/hour base rate + royalties if we help with producing, writing, or arranging. We require credits on all worked-on projects.</p>
							<p>Visual art and video services are an additional fee—she&apos;s especially strong with cartoony, wacky styles and band posters.</p>
							<p className='italic underline text-center'>Price is negotiable depending on the project. If we vibe, we can strike a great deal!</p>
							<p className='text-center font-bold'>First basic recording is FREE to get you in the door.</p>

							<div className='pt-4 flex flex-col items-center gap-4'>
								<Link
									href='https://forms.gle/1SD6c81jgTA6dpg16'
									target='_blank'
									className='bg-white text-black border-2 border-white px-6 py-3 font-bold hover:bg-black hover:text-white transition-all uppercase text-sm'
								>
									Book Studio Time
								</Link>
								<div className='text-[10px] opacity-70'>Recordings can be stored on our Cloud/Drives for a small fee.</div>
							</div>
						</section>
					</div>

					<div className='mt-8 text-center border-t border-black pt-8 print:hidden'>
						<Link href='/' className='inline-block border-2 border-black px-6 py-2 font-bold hover:bg-black hover:text-white transition-all uppercase text-sm'>
							Close Window
						</Link>
					</div>
				</div>

				{/* Macintosh Terminal Window Overlay */}
				{terminalOpen && (
					<div
						ref={terminalRef}
						onMouseDown={onMouseDown}
						style={{
							left: `${terminalPos.x}px`,
							top: `${terminalPos.y}px`,
							position: "fixed",
						}}
						className='w-[90%] max-w-[400px] bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-[100] cursor-default print:hidden'
					>
						<div className='border-b-2 border-black p-1 flex items-center justify-between bg-black text-white cursor-move'>
							<div className='text-[10px] font-bold uppercase px-2 pointer-events-none'>Terminal</div>
							<button onClick={() => setTerminalOpen(false)} className='px-2 text-xs hover:bg-white hover:text-black transition-colors'>
								X
							</button>
						</div>
						<div className='p-2 h-48 overflow-y-auto font-mono text-[10px] leading-tight cursor-text' onClick={(e) => e.stopPropagation()}>
							<Terminal commands={terminalCommands} welcomeMessage='SYSTEM READY. TYPE HELP FOR COMMANDS.' inputPrefix='>' className='min-h-full' forceUppercase={true} />
						</div>
					</div>
				)}
			</div>

			{/* Background click to close menu */}
			{activeMenu && <div className='fixed inset-0 z-40' onClick={() => setActiveMenu(null)} />}
		</main>
	)
}
