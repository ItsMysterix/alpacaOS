"use client"

import { useState, useEffect } from "react"
import { motion, useMotionValue } from "framer-motion"

export default function InkCursor({ 
  containerRef,
  isHoveringBlue
}: { 
  containerRef: React.RefObject<HTMLDivElement | null>
  isHoveringBlue: boolean
}) {
  const [trail, setTrail] = useState<{x: number, y: number, id: number}[]>([])
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      
      if (isHoveringBlue) {
        const id = Date.now()
        setTrail(prev => [...prev, { x: e.clientX, y: e.clientY, id }].slice(-20)) // Keep last 20 points
      }
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isHoveringBlue, x, y])

  // Cleanup old trail points
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => prev.filter(p => Date.now() - p.id < 500))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {trail.map(point => (
        <div 
          key={point.id}
          className="fixed w-4 h-4 rounded-full bg-[#000080] pointer-events-none z-[9998] opacity-50"
          style={{ left: point.x, top: point.y, transform: "translate(-50%, -50%)" }}
        />
      ))}
    </>
  )
}
