"use client"

import { useState, useEffect, useRef } from "react"

export default function InkCursor({ 
  containerRef,
  isHoveringBlue
}: { 
  containerRef: React.RefObject<HTMLDivElement | null>
  isHoveringBlue: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const lastPosition = useRef({ x: 0, y: 0 })
  const lastScrollY = useRef(0)

  // Initialize Canvas
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      
      const resize = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        // Re-setup context settings after resize reset
        if (context) {
          context.lineCap = 'round'
          context.lineJoin = 'round'
          context.strokeStyle = '#FEDA45'
          context.lineWidth = 2
        }
      }
      
      window.addEventListener('resize', resize)
      resize()
      setCtx(context)
      
      return () => window.removeEventListener('resize', resize)
    }
  }, [])

  // Handle Scroll "Rubbing" (Shift Effect)
  useEffect(() => {
    const handleScroll = (e: Event) => {
      // If we are scrolling a container, we need that container's scrollTop.
      // Assuming window scroll or container scroll. 
      // Based on landing-page.tsx, the container has 'overflow-y-auto', so we listen to the container?
      // Wait, the previous implementation used window 'scroll'.
      // If the containerRef is standard, clean it up.
      
      // Let's rely on the passed containerRef for scroll events if available, or window.
      // But InkCursor is inside the container in landing-page.tsx:37
    }
  }, [])

  // We need to attach the scroll listener to the specific scrollable element
  useEffect(() => {
    const element = containerRef.current || window
    
    // Initial scroll position
    lastScrollY.current = containerRef.current ? containerRef.current.scrollTop : window.scrollY

    const handleScrollEvent = () => {
      if (!ctx || !canvasRef.current) return
      
      const currentScrollY = containerRef.current ? containerRef.current.scrollTop : window.scrollY
      const dy = currentScrollY - lastScrollY.current
      
      // Shift the canvas content up/down opposite to scroll direction to mimic "attached to page"
      // content which then gets "erased" (clipped) when moving off fixed canvas.
      // Actually, user wants "rubbed when scrolled".
      // If we shift the image by -dy:
      // Scroll Down (dy > 0) -> shift image up (-y). Top gets clipped. Good.
      // Scroll Up (dy < 0) -> shift image down (+y). Top empty space appears. Good.
      
      ctx.globalCompositeOperation = 'copy'
      ctx.drawImage(canvasRef.current, 0, -dy)
      ctx.globalCompositeOperation = 'source-over'
      
      lastScrollY.current = currentScrollY
    }

    element.addEventListener('scroll', handleScrollEvent, { passive: true })
    return () => element.removeEventListener('scroll', handleScrollEvent)
  }, [ctx, containerRef])

  // Draw Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      if (!isHoveringBlue || !ctx) {
        lastPosition.current = { x: e.clientX, y: e.clientY }
        return
      }

      ctx.beginPath()
      ctx.moveTo(lastPosition.current.x, lastPosition.current.y)
      ctx.lineTo(e.clientX, e.clientY)
      ctx.stroke()
      
      lastPosition.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [ctx, isHoveringBlue])

  return (
    <>
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 hidden md:block"
      />
      {/* Leading Dot */}
      {isHoveringBlue && (
        <div 
          className="fixed w-2 h-2 rounded-full bg-[#FEDA45] pointer-events-none z-50 hidden md:block"
          style={{ 
            left: position.x, 
            top: position.y, 
            transform: 'translate(-50%, -50%)' 
          }}
        />
      )}
    </>
  )
}
