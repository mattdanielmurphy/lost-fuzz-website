"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"

interface TerminalProps {
	welcomeMessage?: React.ReactNode
	commands: Record<string, (args: string[]) => string | React.ReactNode | void | Promise<string | React.ReactNode | void>>
	className?: string
	inputPrefix?: string
	autoFocus?: boolean
	onClear?: () => void
	initialCommand?: string
	onCommandExecuted?: (command: string) => void
	forceUppercase?: boolean
	disableAutoScroll?: boolean
	cursorHighlightColor?: string
	textColor?: string
}

export default function Terminal({
	welcomeMessage,
	commands,
	className = "",
	inputPrefix = "",
	autoFocus = true,
	onClear,
	initialCommand,
	onCommandExecuted,
	forceUppercase = false,
	disableAutoScroll = false,
	cursorHighlightColor = "#3528be",
	textColor,
}: TerminalProps) {
	const [history, setHistory] = useState<(string | React.ReactNode)[]>([])
	const [input, setInput] = useState("")
	const [historyIndex, setHistoryIndex] = useState(-1)
	const [commandHistory, setCommandHistory] = useState<string[]>([])
	const [cursorPos, setCursorPos] = useState(0)
	const inputRef = useRef<HTMLInputElement>(null)
	const endOfMessagesRef = useRef<HTMLDivElement>(null)
	const isFirstRender = useRef(true)
	const initialCommandExecuted = useRef(false)

	const updateCursorPos = () => {
		if (inputRef.current) {
			setCursorPos(inputRef.current.selectionStart || 0)
		}
	}

	const executeCommand = useCallback(async (fullCommand: string) => {
		const displayCommand = forceUppercase ? fullCommand.toUpperCase() : fullCommand
		setHistory((prev) => [...prev, `${inputPrefix}${displayCommand}`])
		setCommandHistory((prev) => [fullCommand, ...prev])
		setHistoryIndex(-1)

		const [cmd, ...args] = fullCommand.toLowerCase().split(/\s+/)

		if (cmd === "clear" || cmd === "cls") {
			setHistory([])
			onClear?.()
		} else if (commands[cmd]) {
			const result = await commands[cmd](args)
			if (result) {
				setHistory((prev) => [...prev, result])
			}
		} else {
			setHistory((prev) => [...prev, `?SYNTAX ERROR IN ${fullCommand.toUpperCase()}`])
		}
		
		onCommandExecuted?.(fullCommand)
	}, [forceUppercase, inputPrefix, commands, onClear, onCommandExecuted])

	useEffect(() => {
		const handleGlobalClick = () => {
			inputRef.current?.focus()
		}
		window.addEventListener("click", handleGlobalClick)
		
		if (autoFocus) {
			const timeout = setTimeout(() => {
				inputRef.current?.focus()
			}, 100)
			
			if (initialCommand && !initialCommandExecuted.current) {
				initialCommandExecuted.current = true
				Promise.resolve().then(() => executeCommand(initialCommand))
			}

			return () => {
				window.removeEventListener("click", handleGlobalClick)
				clearTimeout(timeout)
			}
		}

		if (initialCommand && !initialCommandExecuted.current) {
			initialCommandExecuted.current = true
			Promise.resolve().then(() => executeCommand(initialCommand))
		}

		return () => window.removeEventListener("click", handleGlobalClick)
	}, [initialCommand, autoFocus, executeCommand])

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
			return
		}
		if (history.length > 0 && !disableAutoScroll) {
			endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" })
		}
	}, [history, disableAutoScroll])

	const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		// Update cursor pos on next tick to catch arrow key movements
		setTimeout(updateCursorPos, 0)

		if (e.key === "Enter") {
			const fullCommand = input.trim()
			if (!fullCommand) {
				setHistory((prev) => [...prev, `${inputPrefix}${input}`])
				setInput("")
				setCursorPos(0)
				return
			}

			await executeCommand(fullCommand)
			setInput("")
			setCursorPos(0)
		} else if (e.key === "ArrowUp") {
			e.preventDefault()
			if (historyIndex < commandHistory.length - 1) {
				const newIndex = historyIndex + 1
				setHistoryIndex(newIndex)
				setInput(commandHistory[newIndex])
				// Set cursor to end of historical command
				setTimeout(() => {
					if (inputRef.current) {
						const len = commandHistory[newIndex].length
						inputRef.current.setSelectionRange(len, len)
						updateCursorPos()
					}
				}, 0)
			}
		} else if (e.key === "ArrowDown") {
			e.preventDefault()
			if (historyIndex > 0) {
				const newIndex = historyIndex - 1
				setHistoryIndex(newIndex)
				setInput(commandHistory[newIndex])
				setTimeout(() => {
					if (inputRef.current) {
						const len = commandHistory[newIndex].length
						inputRef.current.setSelectionRange(len, len)
						updateCursorPos()
					}
				}, 0)
			} else if (historyIndex === 0) {
				setHistoryIndex(-1)
				setInput("")
				setCursorPos(0)
			}
		}
	}

	    return (
	        <div className={`flex flex-col font-inherit ${className}`} style={{ color: textColor }} onClick={() => inputRef.current?.focus()}>
	            {welcomeMessage && <div className='mb-4'>{welcomeMessage}</div>}
	            <div className='flex flex-col gap-1'>
	                {history.map((line, i) => (
	                    <div key={i} className='break-words' style={{ color: textColor }}>
	                        {line}
	                    </div>
	                ))}
	            </div>
	            <div className='flex items-center gap-2 mt-1 relative'>
	                <span style={{ color: textColor }}>{inputPrefix}</span>
	                <div className="relative flex-1 flex items-center min-h-[1.2em]">
	                    <input
	                        ref={inputRef}
	                        type='text'
	                        value={input}
	                        onChange={(e) => {
	                            setInput(e.target.value)
	                            updateCursorPos()
	                        }}
	                        onKeyDown={handleKeyDown}
	                        onSelect={updateCursorPos}
	                        onMouseDown={() => setTimeout(updateCursorPos, 0)}
	                        className='absolute inset-0 bg-transparent border-none outline-none p-0 m-0 uppercase font-inherit text-inherit caret-transparent z-10 w-full'
	                        autoComplete='off'
	                        autoCorrect='off'
	                        spellCheck='false'
	                        style={{ color: textColor }}
	                    />
	                    <div className="uppercase font-inherit text-inherit pointer-events-none flex items-center whitespace-pre wrap break-all" style={{ color: textColor }}>
	                        <span>{input.slice(0, cursorPos)}</span>
	                        <span className="relative inline-flex items-center justify-center w-[1ch] h-[1.2em]">
	                            <span className="absolute inset-0 bg-current animate-cursor" style={{ backgroundColor: textColor }}></span>
	                            <span className="relative z-10" style={{ color: cursorHighlightColor }}>
	                                {input[cursorPos] || ""}
	                            </span>
	                        </span>
	                        <span>{input.slice(cursorPos + 1)}</span>
	                    </div>
	                </div>
	            </div>
	            <div ref={endOfMessagesRef} />
	        </div>
	    )
	}
