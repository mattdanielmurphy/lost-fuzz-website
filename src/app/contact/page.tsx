"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Terminal from "@/components/Terminal"

export default function Contact() {
	const router = useRouter()
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
		website_url: "", // Honeypot
	})
	const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
	const [errorMessage, setErrorMessage] = useState("")
	const [shellOpen, setShellOpen] = useState(false)
	const [shellPos, setShellPos] = useState({ x: 0, y: 0 })
	const [isDragging, setIsDragging] = useState(false)
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
	const shellRef = useRef<HTMLDivElement>(null)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setStatus("loading")
		setErrorMessage("")

		try {
			const response = await fetch("/api/send", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			})

			if (!response.ok) {
				const data = await response.json()
				throw new Error(data.error || "Something went wrong")
			}

			setStatus("success")
			setFormData({ name: "", email: "", message: "", website_url: "" })
		} catch (err) {
			setStatus("error")
			setErrorMessage(err instanceof Error ? err.message : "Failed to send message")
		}
	}

	const shellCommands = {
		help: (args: string[], execute?: (cmd: string) => void) => (
			<div className="flex flex-wrap gap-x-2 gap-y-1">
				<span>COMMANDS:</span>
				<button onClick={() => execute?.("AVAIL")} className="terminal-link">AVAIL</button>
				<button onClick={() => execute?.("LIST")} className="terminal-link">LIST</button>
				<button onClick={() => execute?.("INFO")} className="terminal-link">INFO</button>
				<button onClick={() => execute?.("SAY HELLO")} className="terminal-link">SAY</button>
				<button onClick={() => execute?.("PORTFOLIO")} className="terminal-link">PORTFOLIO</button>
				<button onClick={() => execute?.("STUDIOS")} className="terminal-link">STUDIOS</button>
				<button onClick={() => execute?.("HELP")} className="terminal-link">HELP</button>
				<button onClick={() => execute?.("CLEAR")} className="terminal-link">CLEAR</button>
				<button onClick={() => execute?.("CLOSE")} className="terminal-link">CLOSE</button>
			</div>
		),
		avail: () => "CHIP: 2048KB, FAST: 8192KB, TOTAL: 10240KB",
		list: () => "DF0: DISK, DH0: SYSTEM, DH1: WORK, RAM: RAMDISK",
		info: () => "AMIGA 1200 - MOTOROLA 68030 50MHZ - KICKSTART 3.1",
		say: (args: string[]) => args.join(" ").toUpperCase() || "HELLO FROM THE AMIGA",
		portfolio: () => { router.push("/portfolio") },
		studios: () => { router.push("/studios") },
		close: () => { setShellOpen(false) },
		guru: () => "SOFTWARE FAILURE. PRESS LEFT MOUSE BUTTON TO CONTINUE.\nERROR 80000004 TASK 00045670",
	}

	useEffect(() => {
		if (shellOpen && shellPos.x === 0 && shellPos.y === 0) {
			setShellPos({ x: window.innerWidth / 2 - 150, y: 150 })
		}
	}, [shellOpen, shellPos.x, shellPos.y])

	const onMouseDown = (e: React.MouseEvent) => {
		if (shellRef.current && e.target instanceof Node && shellRef.current.contains(e.target)) {
			setIsDragging(true)
			setDragOffset({
				x: e.clientX - shellPos.x,
				y: e.clientY - shellPos.y
			})
		}
	}

	useEffect(() => {
		const onMouseMove = (e: MouseEvent) => {
			if (isDragging) {
				setShellPos({
					x: e.clientX - dragOffset.x,
					y: e.clientY - dragOffset.y
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
		<main className='min-h-screen bg-[#0055aa] p-4 sm:p-12 font-[family-name:var(--font-press-start-2p)] text-white text-[10px] sm:text-xs relative'>
			<div className='max-w-3xl mx-auto bg-[#ffffff] border-2 border-black p-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
				{/* Amiga Window Frame */}
				<div className='bg-[#aaaaaa] border-b-2 border-black p-2 flex items-center justify-between text-black mb-1'>
					<div className='flex gap-2 flex-shrink-0'>
						<button onClick={() => setShellOpen(!shellOpen)} className='w-6 h-4 bg-white border border-black flex items-center justify-center hover:bg-black transition-colors'>
							<div className='w-4 h-0.5 bg-black hover:bg-white'></div>
						</button>
					</div>
					<div className='uppercase font-bold tracking-widest text-[8px] sm:text-[10px] px-2 truncate'>
						<Link href="/" className="hover:underline">Lost Fuzz</Link>: Contact Me
					</div>
					<div className='flex gap-2 flex-shrink-0'>
						<Link href="/" className='w-6 h-4 bg-white border border-black hover:bg-black'></Link>
					</div>
				</div>

				<div className='bg-[#0055aa] p-4 sm:p-10 border border-black space-y-6'>
					<div className='flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6'>
						<div className='w-12 h-12 sm:w-16 sm:h-16 bg-[#ff8800] border-2 border-white flex-shrink-0 flex items-center justify-center text-2xl sm:text-4xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
							!
						</div>
						<div className='space-y-2 text-center sm:text-left'>
							<h1 className='text-lg sm:text-2xl text-[#ff8800] underline uppercase'>COMMUNICATION LINK</h1>
							<p className='leading-relaxed'>INITIATING CONNECTION TO LOST FUZZ...</p>
						</div>
					</div>

					{status === "success" ? (
						<div className='bg-white text-black p-8 border-4 border-[#ff8800] space-y-4'>
							<h2 className='text-lg font-bold'>MESSAGE TRANSMITTED</h2>
							<p>THANK YOU FOR YOUR COMMUNICATION. A CONFIRMATION EMAIL HAS BEEN SENT TO YOUR INBOX.</p>
							<Link href='/' className='bg-[#aaaaaa] border-2 border-black px-4 py-2 text-black hover:bg-white transition-colors flex items-center gap-2'>
								<span className='w-4 h-4 bg-[#ff8800] rounded-full inline-block'></span>
								BACK
							</Link>
						</div>
					) : (
						<form onSubmit={handleSubmit} className='space-y-6'>
							{/* Honeypot field - hidden */}
							<div className='hidden'>
								<label htmlFor='website_url'>Website URL</label>
								<input type='text' id='website_url' name='website_url' value={formData.website_url} onChange={handleChange} autoComplete='off' />
							</div>

							<div className='space-y-2'>
								<label htmlFor='name' className='block text-[#ff8800]'>
									NAME:
								</label>
								<input
									type='text'
									id='name'
									name='name'
									required
									value={formData.name}
									onChange={handleChange}
									className='w-full bg-white text-black p-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#ff8800]'
								/>
							</div>

							<div className='space-y-2'>
								<label htmlFor='email' className='block text-[#ff8800]'>
									EMAIL:
								</label>
								<input
									type='email'
									id='email'
									name='email'
									required
									value={formData.email}
									onChange={handleChange}
									className='w-full bg-white text-black p-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#ff8800]'
								/>
							</div>

							<div className='space-y-2'>
								<label htmlFor='message' className='block text-[#ff8800]'>
									MESSAGE:
								</label>
								<textarea
									id='message'
									name='message'
									required
									rows={5}
									value={formData.message}
									onChange={handleChange}
									className='w-full bg-white text-black p-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#ff8800] resize-none'
								/>
							</div>

							{status === "error" && <div className='text-red-500 bg-white p-2 border border-red-500'>ERROR: {errorMessage.toUpperCase()}</div>}

							<div className='flex justify-between items-center pt-4'>
								<Link href='/' className='bg-[#aaaaaa] border-2 border-black px-4 py-2 text-black hover:bg-white transition-colors flex items-center gap-2'>
									<span className='w-4 h-4 bg-[#ff8800] rounded-full inline-block'></span>
									BACK
								</Link>

								<button
									type='submit'
									disabled={status === "loading"}
									className='bg-[#ff8800] border-2 border-black px-8 py-2 text-white font-bold hover:bg-white hover:text-[#ff8800] transition-colors disabled:opacity-50 flex items-center gap-2'
								>
									{status === "loading" ? "SENDING..." : "SEND MESSAGE"}
								</button>
							</div>
						</form>
					)}
				</div>
			</div>

			{/* Amiga Shell Window Overlay */}
			{shellOpen && (
				<div 
					ref={shellRef}
					onMouseDown={onMouseDown}
					style={{ 
						left: `${shellPos.x}px`, 
						top: `${shellPos.y}px`,
						position: 'fixed'
					}}
					className="w-[90%] max-w-2xl bg-[#aaaaaa] border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,0.5)] z-[100] cursor-default"
				>
					<div className="bg-white border-b-2 border-black p-1 flex items-center justify-between text-black cursor-move">
						<div className="text-[8px] font-bold uppercase px-2 pointer-events-none">AmigaShell</div>
						<button onClick={() => setShellOpen(false)} className="px-2 text-xs hover:bg-black hover:text-white transition-colors">X</button>
					</div>
					<div className="p-2 h-48 overflow-y-auto bg-black text-white font-mono text-[10px] leading-tight cursor-text" onClick={(e) => e.stopPropagation()}>
						<Terminal 
							commands={shellCommands}
							inputPrefix="1.SYS:>"
							className="min-h-full"
							onClear={() => {}}
							forceUppercase={true}
						/>
					</div>
				</div>
			)}

			{/* Amiga Checkmark icons at bottom */}
			<div className='mt-8 flex gap-4 opacity-50 justify-center'>
				<button onClick={() => setShellOpen(true)} className='w-8 h-8 border-2 border-white flex items-center justify-center italic font-bold hover:bg-white hover:text-[#0055aa] transition-colors'>A</button>
				<div className='w-8 h-8 border-2 border-white flex items-center justify-center italic font-bold'>V</div>
			</div>
		</main>
	)
}
