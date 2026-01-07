import "./globals.css"

import { Press_Start_2P, VT323 } from "next/font/google"

import type { Metadata, Viewport } from "next"

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
	title: "Lost Fuzz - Musician",
	description: "Personal website of Lost Fuzz",
}

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${vt323.variable} ${pressStart2P.variable} antialiased min-h-dvh bg-black`}>
				<div className='crt relative min-h-dvh w-full'>
					<div className='scanline'></div>
					{children}
				</div>
			</body>
		</html>
	)
}
