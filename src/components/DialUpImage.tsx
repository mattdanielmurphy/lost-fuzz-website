"use client"

import React, { useState, useEffect } from "react"
import Image, { ImageProps } from "next/image"

interface DialUpImageProps extends ImageProps {
	loadingSpeed?: number // seconds
}

export default function DialUpImage({ loadingSpeed = 3, ...props }: DialUpImageProps) {
	const [isLoaded, setIsLoaded] = useState(false)
	const [animationComplete, setAnimationComplete] = useState(false)

	useEffect(() => {
		if (isLoaded) {
			const timer = setTimeout(() => {
				setAnimationComplete(true)
			}, loadingSpeed * 1000)
			return () => clearTimeout(timer)
		}
	}, [isLoaded, loadingSpeed])

	return (
		<div className='relative w-full h-full overflow-hidden' style={props.style}>
			<Image
				{...props}
				onLoad={() => {
					setIsLoaded(true)
				}}
				// Using onLoadingComplete for extra safety in some Next.js versions
				onLoadingComplete={() => {
					setIsLoaded(true)
				}}
				className={`${props.className || ""} ${!isLoaded ? "opacity-0" : "opacity-100"}`}
				style={{
					...props.style,
					clipPath: isLoaded && !animationComplete ? "inset(0 0 100% 0)" : "inset(0 0 0 0)",
					animation: isLoaded && !animationComplete ? `dialUpReveal ${loadingSpeed}s linear forwards` : "none",
					background: 'none'
				}}
			/>
			{!isLoaded && (
				<div className='absolute inset-0 flex items-center justify-center bg-transparent'>
					<div className='text-[8px] animate-pulse text-inherit opacity-50'>CONNECTING...</div>
				</div>
			)}
			{isLoaded && !animationComplete && (
				<div
					className='absolute left-0 right-0 h-[2px] bg-white/60 z-20 pointer-events-none'
					style={{
						animation: `dialUpLine ${loadingSpeed}s linear forwards`,
					}}
				/>
			)}
		</div>
	)
}
