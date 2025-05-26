"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface AlpacaSpriteProps {
  isRunning: boolean
}

export default function AlpacaSprite({ isRunning }: AlpacaSpriteProps) {
  const runningVariants = {
    run: {
      y: [0, -15, 0],
      transition: {
        y: { repeat: Number.POSITIVE_INFINITY, duration: 0.6, ease: "easeInOut" },
      },
    },
    idle: {
      y: [0, -3, 0],
      transition: {
        y: { repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" },
      },
    },
  }

  return (
    <motion.div className="relative w-full h-full" variants={runningVariants} animate={isRunning ? "run" : "idle"}>
      <Image
        src="/images/alpaca.png"
        alt="Alpaca"
        fill
        className="object-contain pixel-effect"
        style={{ filter: "brightness(0) invert(1)" }} // Make it white
      />
    </motion.div>
  )
}
