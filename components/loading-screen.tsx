"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingScreen() {
  const [isComplete, setIsComplete] = useState(false)
  const [commandLines, setCommandLines] = useState<string[]>([])
  const terminalRef = useRef<HTMLDivElement>(null)
  const commandsProcessedRef = useRef(false)

  // Terminal commands to display
  const commands = [
    "$ loading kernel...",
    "$ mounting file systems...",
    "$ starting system services...",
    "$ checking hardware compatibility...",
    "$ loading user interface...",
    "$ establishing network connection...",
    "$ initializing desktop environment...",
    "$ system ready. starting...",
  ]

  // Process commands only once on component mount
  useEffect(() => {
    // Skip if we've already processed commands or if the component is unmounting
    if (commandsProcessedRef.current) return

    // Mark that we've started processing commands
    commandsProcessedRef.current = true

    let currentCommandIndex = 0
    const timeoutIds: NodeJS.Timeout[] = []

    const addNextCommand = () => {
      if (currentCommandIndex < commands.length) {
        setCommandLines((prev) => [...prev, commands[currentCommandIndex]])
        currentCommandIndex++

        // If we've reached the last command, set complete after a delay
        if (currentCommandIndex === commands.length) {
          const timeoutId = setTimeout(() => {
            setIsComplete(true)
          }, 1000)
          timeoutIds.push(timeoutId)
        } else {
          // Schedule the next command with a random delay
          const timeoutId = setTimeout(addNextCommand, Math.random() * 500 + 300)
          timeoutIds.push(timeoutId)
        }
      }
    }

    // Start adding commands after a short delay
    const initialTimeoutId = setTimeout(addNextCommand, 500)
    timeoutIds.push(initialTimeoutId)

    // Clean up all timeouts if the component unmounts
    return () => {
      timeoutIds.forEach((id) => clearTimeout(id))
    }
  }, []) // Empty dependency array ensures this only runs once on mount

  // Scroll to bottom when new commands are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [commandLines])

  // Container animation
  const containerVariants = {
    initial: {
      y: 0,
      height: "100vh",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 9999, // Ensure it's above everything else
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  }

  return (
    <AnimatePresence>
      {!isComplete ? (
        <motion.div
          className="bg-black text-[#87CEEB] font-vt323 flex flex-col"
          variants={containerVariants}
          initial="initial"
          exit="exit"
        >
          {/* Terminal content */}
          <div className="flex-1 p-4" ref={terminalRef}>
            {commandLines.map((line, index) => (
              <div key={index} className="mb-2 font-vt323 text-xl">
                <span className="text-[#87CEEB]">{line}</span>
              </div>
            ))}

            {/* Blinking cursor */}
            <div className="flex items-center mt-4">
              <span className="text-[#ffcd4b] mr-2">$</span>
              <motion.div
                className="w-2.5 h-5 bg-[#87CEEB]"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              ></motion.div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
