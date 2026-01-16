"use client"
import { useState, useRef, useEffect, useCallback } from "react"
import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import AboutContent from "./window-contents/about-content"
import ProjectsContent from "./window-contents/projects-content"
import ExperienceContent from "./window-contents/experience-content"
import SkillsContent from "./window-contents/skills-content"
import ContactContent from "./window-contents/contact-content"
import TerminalContent from "./window-contents/terminal-content"
import MusicContent from "./window-contents/spotify-content"
import ResumeContent from "./window-contents/resume-content"
import { X, Maximize2, Minimize2 } from "lucide-react"
import gsap from "gsap"

interface WindowProps {
  title: string
  onClose: () => void
  appId: string
  isActive: boolean
  onFocus: () => void
  zIndex: number
  initialPosition?: { x: number; y: number }
  initialSize?: { width: number; height: number }
  onPositionChange?: (position: { x: number; y: number }) => void
  onSizeChange?: (size: { width: number; height: number }) => void
}

// Default window dimensions
const DEFAULT_SIZE = { width: 700, height: 500 }
const DEFAULT_POSITION = { x: 100, y: 100 }

export default function Window({
  title,
  onClose,
  appId,
  isActive,
  onFocus,
  zIndex,
  initialPosition,
  initialSize,
  onPositionChange,
  onSizeChange,
}: WindowProps) {
  // Use refs to track the current position and size
  const positionRef = useRef(initialPosition || DEFAULT_POSITION)
  const sizeRef = useRef(initialSize || DEFAULT_SIZE)

  // State for UI rendering
  const [windowSize, setWindowSize] = useState(initialSize || DEFAULT_SIZE)
  const [windowPosition, setWindowPosition] = useState(initialPosition || DEFAULT_POSITION)
  const [isMaximized, setIsMaximized] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Refs for tracking previous state and resize operations
  const windowRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const prevSizeRef = useRef(initialSize || DEFAULT_SIZE)
  const prevPositionRef = useRef(initialPosition || DEFAULT_POSITION)
  const resizeStartRef = useRef({ x: 0, y: 0, width: 0, height: 0, windowX: 0, windowY: 0 })

  // Flag to prevent initial update loops
  const initializedRef = useRef(false)

  // GSAP Opening Animation
  useEffect(() => {
    if (windowRef.current && headerRef.current && contentRef.current) {
      const tl = gsap.timeline({ defaults: { ease: "elastic.out(1, 0.75)", duration: 0.8 } })
      
      tl.fromTo(windowRef.current, 
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
      )
      .fromTo(headerRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.3"
      )
      .fromTo(contentRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.5"
      )
    }
  }, [])

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 // md breakpoint
      setIsMobile(mobile)

      if (mobile) {
        // On mobile, always go full screen
        const headerHeight = 48 // Height of the header
        const fullScreenSize = {
          width: window.innerWidth,
          height: window.innerHeight - headerHeight,
        }
        const fullScreenPosition = { x: 0, y: headerHeight }

        setWindowSize(fullScreenSize)
        setWindowPosition(fullScreenPosition)
        sizeRef.current = fullScreenSize
        positionRef.current = fullScreenPosition
        setIsMaximized(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Initialize window size and position once
  useEffect(() => {
    if (!initializedRef.current && !isMobile) {
      if (initialSize) {
        setWindowSize(initialSize)
        sizeRef.current = initialSize
        prevSizeRef.current = initialSize
      }

      if (initialPosition) {
        setWindowPosition(initialPosition)
        positionRef.current = initialPosition
        prevPositionRef.current = initialPosition
      }

      initializedRef.current = true
    }
  }, [initialSize, initialPosition, isMobile])

  // Listen for reset position event
  useEffect(() => {
    const handleResetPosition = (e: CustomEvent) => {
      if (e.detail.appId === appId && !isMobile) {
        // Reset position and size (only on desktop)
        const newPosition = e.detail.position
        const newSize = e.detail.size

        setWindowPosition(newPosition)
        setWindowSize(newSize)

        // Update refs
        positionRef.current = newPosition
        sizeRef.current = newSize

        // If maximized, restore to normal
        if (isMaximized) {
          setIsMaximized(false)
        }
      }
    }

    window.addEventListener("reset-window-position", handleResetPosition as EventListener)
    return () => {
      window.removeEventListener("reset-window-position", handleResetPosition as EventListener)
    }
  }, [appId, isMaximized, isMobile])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (isMobile) {
        // Always full screen on mobile
        const headerHeight = 48
        const newSize = {
          width: window.innerWidth,
          height: window.innerHeight - headerHeight,
        }
        const newPosition = { x: 0, y: headerHeight }

        setWindowSize(newSize)
        setWindowPosition(newPosition)
        sizeRef.current = newSize
        positionRef.current = newPosition
      } else if (isMaximized && windowRef.current) {
        const headerHeight = 48 // Height of the header
        const newSize = {
          width: window.innerWidth - 10, // Subtract a small amount to prevent overflow
          height: window.innerHeight - headerHeight - 10,
        }
        const newPosition = { x: 5, y: 5 } // Small offset from edges

        setWindowSize(newSize)
        setWindowPosition(newPosition)

        // Update refs
        sizeRef.current = newSize
        positionRef.current = newPosition
      } else {
        // Ensure window stays within viewport when browser is resized
        ensureWindowInViewport()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMaximized, isMobile])

  // Notify parent of position changes - only when dragging ends
  const notifyPositionChange = useCallback(() => {
    if (onPositionChange && !isMobile) {
      onPositionChange(positionRef.current)
    }
  }, [onPositionChange, isMobile])

  // Notify parent of size changes - only when resizing ends
  const notifySizeChange = useCallback(() => {
    if (onSizeChange && !isMobile) {
      onSizeChange(sizeRef.current)
    }
  }, [onSizeChange, isMobile])

  // Ensure window stays within viewport
  const ensureWindowInViewport = useCallback(() => {
    if (!windowRef.current || isMaximized || isMobile) return

    const headerHeight = 48 // Height of the header
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight - headerHeight
    const windowWidth = windowRef.current.offsetWidth
    const windowHeight = windowRef.current.offsetHeight

    // Calculate boundaries to keep window fully visible
    let newX = windowPosition.x
    let newY = windowPosition.y

    // Ensure window doesn't go off the right or bottom edge
    if (newX + windowWidth > viewportWidth) {
      newX = viewportWidth - windowWidth
    }

    if (newY + windowHeight > viewportHeight) {
      newY = viewportHeight - windowHeight
    }

    // Ensure window doesn't go off the left or top edge
    if (newX < 0) newX = 0
    if (newY < headerHeight) newY = headerHeight

    // Update position if changed
    if (newX !== windowPosition.x || newY !== windowPosition.y) {
      setWindowPosition({ x: newX, y: newY })
      positionRef.current = { x: newX, y: newY }
    }
  }, [windowPosition, isMaximized, isMobile])

  const toggleMaximize = useCallback(() => {
    if (isMobile) return // No maximize/minimize on mobile

    if (isMaximized) {
      // Restore previous size and position
      setWindowSize(prevSizeRef.current)
      setWindowPosition(prevPositionRef.current)

      // Update refs
      sizeRef.current = prevSizeRef.current
      positionRef.current = prevPositionRef.current

      setIsMaximized(false)

      // Notify parent
      notifySizeChange()
      notifyPositionChange()
    } else {
      // Save current size and position before maximizing
      prevSizeRef.current = windowSize
      prevPositionRef.current = windowPosition

      // Calculate new size (1.5x current size)
      const newWidth = windowSize.width * 1.5
      const newHeight = windowSize.height * 1.5

      // Ensure the new size doesn't exceed viewport boundaries
      const headerHeight = 48 // Height of the header
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight - headerHeight

      const constrainedWidth = Math.min(newWidth, viewportWidth - 40)
      const constrainedHeight = Math.min(newHeight, viewportHeight - 40)

      // Calculate new position to keep window centered
      const newX = Math.max(
        20,
        Math.min(windowPosition.x - (constrainedWidth - windowSize.width) / 2, viewportWidth - constrainedWidth - 20),
      )

      const newY = Math.max(
        20,
        Math.min(
          windowPosition.y - (constrainedHeight - windowSize.height) / 2,
          viewportHeight - constrainedHeight - 20,
        ),
      )

      const newPosition = { x: newX, y: newY }
      const newSize = {
        width: constrainedWidth,
        height: constrainedHeight,
      }

      setWindowSize(newSize)
      setWindowPosition(newPosition)

      // Update refs
      sizeRef.current = newSize
      positionRef.current = newPosition

      setIsMaximized(true)

      // Notify parent
      notifySizeChange()
      notifyPositionChange()
    }
  }, [isMaximized, windowSize, windowPosition, notifySizeChange, notifyPositionChange, isMobile])

  const renderContent = () => {
    switch (appId) {
      case "about":
        return <AboutContent />
      case "projects":
        return <ProjectsContent />
      case "experience":
        return <ExperienceContent />
      case "skills":
        return <SkillsContent />
      case "contact":
        return <ContactContent />
      case "terminal":
        return <TerminalContent />
      case "spotify":
        return <MusicContent onClose={onClose} />
      case "resume":
        return <ResumeContent />
      default:
        return <div className="p-4 font-vt323">Content for {title} is coming soon!</div>
    }
  }

  // Handle window click to bring to front
  const handleWindowClick = useCallback(() => {
    if (!isActive) {
      onFocus()
    }
  }, [isActive, onFocus])

  // Handle drag
  const handleDrag = useCallback(
    (e: any, info: any) => {
      if (isMobile) return // No dragging on mobile

      // Update position in real-time during drag for smoother movement
      const headerHeight = 48 // Height of the header
      const windowWidth = windowRef.current?.offsetWidth || 0
      const windowHeight = windowRef.current?.offsetHeight || 0
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight - headerHeight

      // Calculate new position
      let newX = positionRef.current.x + info.delta.x
      let newY = positionRef.current.y + info.delta.y

      // Apply strict constraints to keep window fully within viewport
      // Left constraint - don't allow window to go beyond left edge
      newX = Math.max(0, newX)

      // Top constraint - don't allow window to go beyond header
      newY = Math.max(headerHeight, newY)

      // Right constraint - don't allow window to go beyond right edge
      newX = Math.min(newX, viewportWidth - windowWidth)

      // Bottom constraint - don't allow window to go beyond bottom edge
      newY = Math.min(newY, viewportHeight)

      const newPosition = { x: newX, y: newY }
      setWindowPosition(newPosition)
      positionRef.current = newPosition
    },
    [isMobile],
  )

  // Ensure window stays within screen boundaries during drag
  const handleDragEnd = useCallback(() => {
    if (isMobile) return

    setIsDragging(false)
    // Final check to ensure window is within viewport
    ensureWindowInViewport()
    // Notify parent of position change
    notifyPositionChange()
  }, [ensureWindowInViewport, notifyPositionChange, isMobile])

  // Handle resize start
  const handleResizeStart = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, direction: string) => {
      if (isMobile) return // No resizing on mobile

      e.preventDefault()
      e.stopPropagation()

      if (isMaximized) return // Don't allow resizing when maximized

      setIsResizing(true)
      setResizeDirection(direction)

      // Store initial mouse position, window size and position
      resizeStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        width: windowRef.current?.offsetWidth || 0,
        height: windowRef.current?.offsetHeight || 0,
        windowX: windowPosition.x,
        windowY: windowPosition.y,
      }

      // Add event listeners for resize
      document.addEventListener("mousemove", handleResizeMove)
      document.addEventListener("mouseup", handleResizeEnd)
    },
    [isMaximized, windowPosition, isMobile],
  )

  // Handle resize move
  const handleResizeMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !windowRef.current || isMobile) return

      const deltaX = e.clientX - resizeStartRef.current.x
      const deltaY = e.clientY - resizeStartRef.current.y

      // Calculate new width and height
      const headerHeight = 48 // Height of the header
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight - headerHeight

      let newWidth = resizeStartRef.current.width
      let newHeight = resizeStartRef.current.height

      // Adjust dimensions based on resize direction
      if (resizeDirection === "se") {
        // Southeast (bottom-right) resize
        newWidth = Math.max(300, resizeStartRef.current.width + deltaX)
        newHeight = Math.max(200, resizeStartRef.current.height + deltaY)
      }

      // Ensure window doesn't exceed viewport
      const maxWidth = viewportWidth - windowPosition.x - 20
      const maxHeight = viewportHeight - windowPosition.y - 20

      newWidth = Math.min(newWidth, maxWidth)
      newHeight = Math.min(newHeight, maxHeight)

      // Update window size
      const newSize = {
        width: newWidth,
        height: newHeight,
      }

      setWindowSize(newSize)
      sizeRef.current = newSize
    },
    [isResizing, resizeDirection, windowPosition, isMobile],
  )

  // Handle resize end
  const handleResizeEnd = useCallback(() => {
    if (isMobile) return

    setIsResizing(false)
    setResizeDirection(null)
    document.removeEventListener("mousemove", handleResizeMove)
    document.removeEventListener("mouseup", handleResizeEnd)

    // Final check to ensure window is within viewport
    ensureWindowInViewport()
    // Notify parent of size change
    notifySizeChange()
  }, [ensureWindowInViewport, handleResizeMove, notifySizeChange, isMobile])

  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: isMobile ? 1 : 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{ opacity: 0, scale: isMobile ? 1 : 0.9 }}
      drag={!isMaximized && !isMobile}
      dragMomentum={false} // Remove momentum effect
      dragElastic={0} // Remove elastic effect
      onDragStart={() => !isMobile && setIsDragging(true)}
      onDrag={handleDrag} // Add real-time drag handling for smoother movement
      onDragEnd={handleDragEnd}
      onClick={handleWindowClick}
      className={`
        ${isMobile ? "fixed" : "absolute"} z-50 
        flex flex-col shadow-2xl 
        ${!isMobile ? "drag-effect" : ""} 
        overflow-hidden border-2 
        ${isActive ? "border-black shadow-[rgba(0,0,0,0.5)_5px_5px_0px_0px]" : "border-gray-400 opacity-90"}
        backdrop-blur-md bg-white/90
      `}
      style={{
        width: `${windowSize.width}px`,
        height: `${windowSize.height}px`,
        left: windowPosition.x,
        top: windowPosition.y,
        zIndex: zIndex,
      }}
    >
      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none z-[60] opacity-[0.03] overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        <div className="absolute inset-0 animate-scanline bg-[linear-gradient(rgba(18,16,16,0)_0%,rgba(18,16,16,0.1)_50%,rgba(18,16,16,0)_100%)] h-[100px]" />
      </div>

      {/* Window Header - Top Bar */}
      <div
        ref={headerRef}
        className={`${isActive ? "bg-[#FF7676]" : "bg-gray-400"} text-white p-1 flex items-center ${!isMobile ? "cursor-move" : ""} relative overflow-hidden border-b-2 border-black`}
        onMouseDown={!isMobile ? handleWindowClick : undefined} // Ensure clicking header also brings window to front
      >
        {/* Slanted line pattern overlay - dark black with 8px spacing */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgb(0,0,0), rgb(0,0,0) 2.5px, transparent 2.5px, transparent 8px)",
            zIndex: 1,
            opacity: 0.2
          }}
        ></div>

        <div className="flex items-center ml-2 relative z-10 gap-2">
          <button
            className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center border-2 border-black hover:bg-red-600 transition-transform active:scale-95"
            onClick={(e) => {
              if (!isDragging) {
                onClose()
              }
              e.stopPropagation()
            }}
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {!isMobile && (
            <button
              className="w-6 h-6 bg-[#FFCD4B] rounded-full flex items-center justify-center border-2 border-black hover:bg-yellow-400 transition-transform active:scale-95"
              onClick={(e) => {
                if (!isDragging) {
                  toggleMaximize()
                }
                e.stopPropagation()
              }}
            >
              {isMaximized ? (
                <Minimize2 className="w-4 h-4 text-black" />
              ) : (
                <Maximize2 className="w-4 h-4 text-black" />
              )}
            </button>
          )}
        </div>

        <div className="flex-1 flex justify-center relative z-10">
          {appId !== "terminal" && appId !== "contact" && (
            <div className="bg-[#FFCD4B] px-8 py-1 uppercase font-bold text-black font-vt323 text-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              {title}
            </div>
          )}
        </div>

        <div className="w-14 relative z-10">{/* Spacer to balance the header */}</div>
      </div>

      {/* Window Content */}
      <div ref={contentRef} className="flex-1 overflow-hidden bg-white/50 backdrop-blur-sm">
        {renderContent()}
      </div>

      {/* Resize handle - only show on desktop */}
      {!isMobile && !isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-[#87CEEB] border-l-2 border-t-2 border-black flex items-center justify-center z-[70]"
          onMouseDown={(e) => handleResizeStart(e, "se")}
        >
          {/* Three slanted lines */}
          <div className="flex flex-col gap-0.5 transform rotate-45">
            <div className="w-2 h-0.5 bg-black"></div>
            <div className="w-2 h-0.5 bg-black"></div>
            <div className="w-2 h-0.5 bg-black"></div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
