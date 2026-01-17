"use client"

import { useState, useEffect } from "react"

export default function InkCursor({ 
  containerRef,
  isHoveringBlue
}: { 
  containerRef: React.RefObject<HTMLDivElement | null>
  isHoveringBlue: boolean
}) {
  const [points, setPoints] = useState<{x: number, y: number, id: number}[]>([])
  
  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Only draw if hovering the blue section
      if (isHoveringBlue) {
        setPoints(prev => {
          const newPoints = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }]
          // Keep a reasonable history length to effectively manage "motion history"
          return newPoints.slice(-100) 
        })
      }
    }
    
    // "erased at the top with every scroll" -> Clear trail on scroll
    const handleScroll = () => {
       if (points.length > 0) {
         setPoints([])
       }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isHoveringBlue, points.length])

  // Fade out / cleanup old points logic
  useEffect(() => {
    // 60FPS update to clean old points creating the trailing erase effect
    const interval = setInterval(() => {
       setPoints(prev => {
         if (prev.length === 0) return prev
         const now = Date.now()
         // Points live for 1 second max
         return prev.filter(p => now - p.id < 1000) 
       }) 
    }, 16)
    return () => clearInterval(interval)
  }, [])

  if (points.length < 2) return null

  // Create smooth path data
  // Using simple L commands relative to viewport (since positions are clientX/Y)
  const pathData = `M ${points.map(p => `${p.x} ${p.y}`).join(' L ')}`

  // The latest point (The "Dot" to the left/ahead of the line)
  const latest = points[points.length - 1]

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
       <svg className="w-full h-full overflow-visible">
          {/* The Thin Trail Line */}
          <path 
            d={pathData} 
            fill="none" 
            stroke="#FEDA45" 
            strokeWidth="1.5"
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="transition-all duration-75"
          />
          
          {/* The Leading/Trailing Dot */}
          {latest && (
             <circle 
               cx={latest.x} 
               cy={latest.y} 
               r="3" 
               fill="#FEDA45" 
             />
          )}
       </svg>
    </div>
  )
}
