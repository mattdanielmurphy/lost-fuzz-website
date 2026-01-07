import Image from "next/image"
import Link from "next/link"

export default function Studios() {
	return (
		<main className='min-h-screen bg-white p-4 sm:p-12 font-sans text-black' style={{ backgroundImage: "radial-gradient(#ccc 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
			<div className='max-w-2xl mx-auto bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
				{/* Title Bar */}
				<div className='border-b-2 border-black p-2 flex items-center justify-between bg-white'>
					<div className='flex gap-1'>
						<div className='w-4 h-4 border border-black'></div>
					</div>
					<div className='font-bold uppercase tracking-widest text-sm'>Lost Fuzz Studios</div>
					<div className='w-4 h-4'></div>
				</div>

				{/* Menu Bar (Internal) */}
				<div className='border-b border-black flex gap-4 px-4 py-1 text-xs font-bold uppercase'>
					<span>File</span>
					<span>Edit</span>
					<span>View</span>
					<span>Special</span>
				</div>

				{/* Content */}
				<div className='p-4 sm:p-8 space-y-8'>
					<div className='flex flex-col items-center'>
						<div className='w-32 h-32 sm:w-48 sm:h-48 mb-4 relative'>
							<Image src='/images/lost-fuzz-icon-500px.png' alt='Lost Fuzz Icon' fill className='object-contain' />
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

					<div className='mt-8 text-center border-t border-black pt-8'>
						<Link href='/' className='inline-block border-2 border-black px-6 py-2 font-bold hover:bg-black hover:text-white transition-all uppercase text-sm'>
							Close Window
						</Link>
					</div>
				</div>
			</div>
		</main>
	)
}
