import "./globals.css"

import { Press_Start_2P, VT323 } from "next/font/google"

import type { Metadata } from "next"

const vt323 = VT323({
	weight: "400",
	variable: "--font-vt323",
	subsets: ["latin"],
})

const pressStart2P = Press_Start_2P({
	weight: "400",
	variable: "--font-press-start-2p",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Ian Daoust / Lost Fuzz - Musician",
	description: "Personal website of Ian Daoust / Lost Fuzz",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${vt323.variable} ${pressStart2P.variable} antialiased min-h-screen bg-black`}>
				<div className='crt relative min-h-screen w-full'>
					<div className='scanline'></div>
					{children}
				</div>
			</body>
		</html>
	)
}
