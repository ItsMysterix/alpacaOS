"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import Window from "@/components/window"
import { Terminal, Folder, ExternalLink, Github, Mail, Linkedin, Music, User, Code, Briefcase, FileText } from "lucide-react"

// Define specific window sizes and positions for each app type
// ... (rest of the file until the return)
const WINDOW_CONFIGS = {
  about: { width: 800, height: 500, x: 150, y: 80 },
  experience: { width: 820, height: 580, x: 250, y: 120 },
  projects: { width: 850, height: 600, x: 200, y: 100 },
  skills: { width: 780, height: 550, x: 300, y: 140 },
  resume: { width: 900, height: 800, x: 100, y: 50 },
  contact: { width: 600, height: 520, x: 350, y: 160 },
  terminal: { width: 700, height: 450, x: 400, y: 180 },
  spotify: { width: 900, height: 650, x: 180, y: 90 },
}

export default function DesktopLayout() {
  const [activeApps, setActiveApps] = useState<string[]>([])
  const [activeAppId, setActiveAppId] = useState<string | null>(null)
  const [zIndexCounter, setZIndexCounter] = useState(100) // Start z-index at 100
  const [appZIndices, setAppZIndices] = useState<Record<string, number>>({})
  const [appPositions, setAppPositions] = useState<Record<string, { x: number; y: number }>>({})
  const [appSizes, setAppSizes] = useState<Record<string, { width: number; height: number }>>({})
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Hydration fix
  useEffect(() => {
    setMounted(true)
  }, [])

  // Atmospheric Sync System - Combining high-fidelity assets with curated audio
  const BACKGROUNDS = [
    { 
      id: 'meadow', 
      name: 'MEADOW_LUSH', 
      path: '/images/Meadow.png', 
      saturation: '1.3', 
      brightness: '1.1',
      trackName: 'Beautiful Fairy Piano',
      trackUrl: '/beautiful-fairy-piano.mp3'
    },
    { 
      id: 'sunrise', 
      name: 'SOLAR_RISE', 
      path: '/images/Sunrise.png', 
      saturation: '1.5', 
      brightness: '1.2',
      trackName: 'Calm Chill Piano',
      trackUrl: '/calm%20chill%20piano.mp3'
    },
    { 
      id: 'ramen', 
      name: 'NEON_RAMEN', 
      path: '/images/Ramen-shop.png', 
      saturation: '1.4', 
      brightness: '1.0',
      trackName: 'Relaxing Piano Music',
      trackUrl: '/relaxing-piano-music.mp3'
    },
    { 
      id: 'skyline', 
      name: 'CITY_SKYLINE', 
      path: '/images/Skyline.png', 
      saturation: '1.2', 
      brightness: '0.9',
      trackName: 'Relaxing Piano Jazz',
      trackUrl: '/relaxing-piano-jazz.mp3'
    },
  ]
  const [currentBgIdx, setCurrentBgIdx] = useState(0)

  // System State
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Synchronized Background & Music Toggle
  const toggleAtmosphere = () => {
    setCurrentBgIdx((prev) => (prev + 1) % BACKGROUNDS.length)
  }

  // Environmental Autocycle - Automatically transition atmosphere every 60s
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      toggleAtmosphere()
    }, 60000) // 1 minute cycle
    return () => clearInterval(cycleInterval)
  }, [currentBgIdx]) // Re-run if manually changed to reset timer

  const containerRef = useRef<HTMLDivElement>(null)
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 })
  const [iconErrors, setIconErrors] = useState<Record<string, boolean>>({})

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Define the apps
  const leftSideApps = [
    { id: "about", name: "About Me", icon: "/images/about-me-icon.png" },
    { id: "experience", name: "Experience", icon: "/images/experience.png" },
    { id: "projects", name: "Projects", icon: "/images/projects.png" },
    { id: "skills", name: "Skills", icon: "/images/skills.png" },
  ]

  const rightSideApps = [
    { id: "resume", name: "Resume", icon: "/images/resume.png" },
    { id: "contact", name: "Contact Me", icon: "/images/contact.png" },
  ]

  // Function to bring a window to the front
  const bringToFront = (appId: string) => {
    setActiveAppId(appId)
    const newZIndex = zIndexCounter + 1
    setZIndexCounter(newZIndex)
    setAppZIndices((prev) => ({
      ...prev,
      [appId]: newZIndex,
    }))
  }

  // Calculate safe window position and size
  const calculateSafeWindowConfig = (appId: string) => {
    const headerHeight = 48 // Height of the header
    const config = WINDOW_CONFIGS[appId as keyof typeof WINDOW_CONFIGS] || { width: 700, height: 500, x: 100, y: 100 }

    // Calculate available viewport dimensions
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight - headerHeight

    // Ensure window fits within viewport
    const width = Math.min(config.width, viewportWidth - 40)
    const height = Math.min(config.height, viewportHeight - 40)

    // Calculate position to ensure window is fully visible
    // Make sure x and y are never negative and the window is always fully visible
    const x = Math.max(20, Math.min(config.x, viewportWidth - width - 20))
    const y = Math.max(headerHeight + 10, Math.min(config.y, viewportHeight - height - 20))

    return { width, height, x, y }
  }

  // Function to reset window position to original
  const resetWindowPosition = (appId: string) => {
    if (isMobile) return // No position reset on mobile

    const { width, height, x, y } = calculateSafeWindowConfig(appId)

    // Update the position and size
    setAppPositions((prev) => ({
      ...prev,
      [appId]: { x, y },
    }))

    setAppSizes((prev) => ({
      ...prev,
      [appId]: { width, height },
    }))

    // Dispatch a custom event to notify the window component
    window.dispatchEvent(
      new CustomEvent("reset-window-position", {
        detail: { appId, position: { x, y }, size: { width, height } },
      }),
    )
  }

  // Function to add a new app and set it as active
  const addApp = (appId: string) => {
    if (isMobile) {
      // On mobile, close all existing windows and open only the new one
      setActiveApps([appId])
      bringToFront(appId)

      // Mobile windows are always full screen, so no need to set position/size
      return
    }

    // Desktop behavior (existing logic)
    if (!activeApps.includes(appId)) {
      setActiveApps((prev) => [...prev, appId])
      bringToFront(appId)

      // Calculate safe position and size for new app
      const { width, height, x, y } = calculateSafeWindowConfig(appId)

      // Store the initial position and size
      setAppPositions((prev) => ({
        ...prev,
        [appId]: { x, y },
      }))

      setAppSizes((prev) => ({
        ...prev,
        [appId]: { width, height },
      }))
    } else {
      // If app is already open, reset position and bring to front
      resetWindowPosition(appId)
      bringToFront(appId)
    }
  }

  // Listen for terminal open event
  useEffect(() => {
    const handleOpenTerminal = () => {
      addApp("terminal")
    }

    window.addEventListener("open-terminal", handleOpenTerminal)
    return () => window.removeEventListener("open-terminal", handleOpenTerminal)
  }, [activeApps, zIndexCounter, isMobile])

  // Listen for music player open event
  useEffect(() => {
    const handleOpenMusic = () => {
      addApp("spotify")
    }

    window.addEventListener("open-spotify", handleOpenMusic)
    return () => window.removeEventListener("open-spotify", handleOpenMusic)
  }, [activeApps, zIndexCounter, isMobile])

  // Listen for about-me open event
  useEffect(() => {
    const handleOpenAboutMe = () => {
      addApp("about")
    }

    window.addEventListener("open-about-me", handleOpenAboutMe)
    return () => window.removeEventListener("open-about-me", handleOpenAboutMe)
  }, [activeApps, zIndexCounter, isMobile])

  // Listen for skills open event
  useEffect(() => {
    const handleOpenSkills = () => {
      addApp("skills")
    }

    window.addEventListener("open-skills", handleOpenSkills)
    return () => window.removeEventListener("open-skills", handleOpenSkills)
  }, [activeApps, zIndexCounter, isMobile])

  // Listen for projects open event
  useEffect(() => {
    const handleOpenProjects = () => {
      addApp("projects")
    }

    window.addEventListener("open-projects", handleOpenProjects)
    return () => window.removeEventListener("open-projects", handleOpenProjects)
  }, [activeApps, zIndexCounter, isMobile])

  // Listen for experience open event
  useEffect(() => {
    const handleOpenExperience = () => {
      addApp("experience")
    }

    window.addEventListener("open-experience", handleOpenExperience)
    return () => window.removeEventListener("open-experience", handleOpenExperience)
  }, [activeApps, zIndexCounter, isMobile])

  // Listen for contact open event
  useEffect(() => {
    const handleOpenContact = () => {
      addApp("contact")
    }

    window.addEventListener("open-contact", handleOpenContact)
    return () => window.removeEventListener("open-contact", handleOpenContact)
  }, [activeApps, zIndexCounter, isMobile])

  // Listen for resume open event - now just opens the PDF directly
  useEffect(() => {
    const handleOpenResume = () => {
      addApp("resume")
    }

    window.addEventListener("open-resume", handleOpenResume)
    return () => window.removeEventListener("open-resume", handleOpenResume)
  }, [])

  // Update container dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  const handleIconClick = useCallback((app: any) => {
    // Changed to single-click
    if (app.isExternal && app.url) {
      // Open external link in new tab (for all devices)
      window.open(app.url, "_blank")
    } else {
      // Open internal window if not already open, or bring to front if already open
      addApp(app.id)
    }
  }, [activeApps, zIndexCounter, appZIndices, appPositions, appSizes, isMobile])

  const handleCloseWindow = useCallback((appId: string) => {
    setActiveApps((prev) => {
      const newApps = prev.filter((id) => id !== appId)
      return newApps
    })
    
    // Logic to set next active app moved to effect or simplified here to avoid stale state issues in callback
    // For now, simpler close logic to ensure stability
    if (appId === activeAppId) {
       setActiveAppId(null)
    }
  }, [activeAppId])

  const handleImageError = useCallback((id: string) => {
    // console.error(`Failed to load image for ${id}`) // Suppress log to avoid spam
    setIconErrors((prev) => {
      if (prev[id]) return prev // Prevent updating if already set
      return { ...prev, [id]: true }
    })
  }, [])

  // Track window position updates
  const handleWindowPositionChange = (appId: string, position: { x: number; y: number }) => {
    if (isMobile) return // No position tracking on mobile

    // Only update if position has actually changed
    if (appPositions[appId]?.x !== position.x || appPositions[appId]?.y !== position.y) {
      setAppPositions((prev) => ({
        ...prev,
        [appId]: position,
      }))
    }
  }

  // Track window size updates
  const handleWindowSizeChange = (appId: string, size: { width: number; height: number }) => {
    if (isMobile) return // No size tracking on mobile

    // Only update if size has actually changed
    if (appSizes[appId]?.width !== size.width || appSizes[appId]?.height !== size.height) {
      setAppSizes((prev) => ({
        ...prev,
        [appId]: size,
      }))
    }
  }

  // Function to get current time

  // Function to get current time
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Handle music control via events
  useEffect(() => {
    const handleMusicChange = (e: any) => {
      const { action } = e.detail
      if (action === 'play') {
        setIsPlaying(true)
        if (audioRef.current) audioRef.current.play()
      } else if (action === 'pause') {
        setIsPlaying(false)
        if (audioRef.current) audioRef.current.pause()
      } else if (action === 'change') {
        // Now synchronized with backgrounds
        setIsPlaying(true)
      }
    }
    window.addEventListener('alpaca-music-control', handleMusicChange)
    return () => window.removeEventListener('alpaca-music-control', handleMusicChange)
  }, [])

  // Autoplay attempt on first interaction or load
  useEffect(() => {
    const startAudio = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => console.log("Autoplay blocked. Waiting for interaction."))
      }
    }
    
    // Try to play on load (often blocked)
    startAudio()
    
    // Also try on first click to bypass browser policy
    window.addEventListener('click', startAudio, { once: true })
    return () => window.removeEventListener('click', startAudio)
  }, [])

  return (
    <div className="flex-1 relative overflow-hidden crt-effect w-full h-full bg-black flex flex-col" ref={containerRef}>
      {/* Dynamic Environmental Background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#0A192F]">
        {BACKGROUNDS.map((bg, idx) => (
          <div 
            key={bg.id}
            className={`absolute inset-0 transform scale-110 animate-slow-zoom transition-opacity duration-1000 pointer-events-none ${
              idx === currentBgIdx ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image 
              src={bg.path} 
              alt={bg.name} 
              fill 
              className="object-cover"
              style={{ filter: `saturate(${bg.saturation}) brightness(${bg.brightness})` }}
              priority
            />
          </div>
        ))}

        {/* Tactical Grid & Vignette Overlay - Softened to let colors pop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />
        <div className="absolute inset-0 backdrop-blur-[0.5px] pointer-events-none" />
      </div>

      {/* Background Audio - Synchronized with Environment (Desktop Only) */}
      <audio 
        key={BACKGROUNDS[currentBgIdx].trackUrl} // Force re-render on source change to trigger autoplay
        ref={audioRef}
        src={BACKGROUNDS[currentBgIdx].trackUrl}
        loop
        autoPlay={!isMobile && isPlaying}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {/* Desktop Centerpiece - Simple & Peaceful (Hide on Mobile) */}
      {!isMobile && (
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 transition-all duration-1000 pointer-events-none
            ${activeApps.length > 0 ? "opacity-5 scale-95 blur-md" : "opacity-80 scale-100"}`}
        >
          {mounted && (
            <>
              <div className="font-vt323 text-[180px] leading-none text-white drop-shadow-[8px_8px_0px_rgba(0,0,0,1)] animate-pulse-slow">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
              </div>
              <div className="font-vt323 text-4xl text-white/70 uppercase tracking-[0.2em] bg-black/40 px-6 py-2 rounded-full backdrop-blur-sm border-2 border-white/20">
                {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
              </div>
            </>
          )}
        </div>
      )}

      {/* Mobile Retro OS Layout */}
      {isMobile && !activeApps.length && (
        <div className="absolute inset-0 z-20 flex flex-col">
          {/* Retro Status Bar */}
          <div className="h-8 bg-black/80 text-[#87CEEB] font-vt323 flex items-center justify-between px-4 text-lg border-b-2 border-[#87CEEB]/20">
             <div className="flex items-center gap-2">
               <span>ALPACA-CELL</span>
               <div className="flex gap-0.5">
                 <div className="w-1 h-2 bg-[#87CEEB]" />
                 <div className="w-1 h-3 bg-[#87CEEB]" />
                 <div className="w-1 h-4 bg-[#87CEEB]" />
               </div>
             </div>
             <div className="flex items-center gap-4">
               <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
               <div className="flex items-center gap-1">
                 <span>100%</span>
                 <div className="w-6 h-3 border border-[#87CEEB] p-0.5"><div className="w-full h-full bg-[#87CEEB]" /></div>
               </div>
             </div>
          </div>
          
          {/* Mobile Home Screen Grid */}
          <div className="flex-1 p-6 grid grid-cols-3 gap-6 overflow-y-auto content-start">
             {[...leftSideApps, ...rightSideApps, {id: 'terminal', name: 'Terminal', icon: '/terminal.png'}, {id: 'spotify', name: 'Music', icon: '/images/pixel-alpaca.png'}].map((app) => (
                <button
                  key={app.id}
                  className="flex flex-col items-center gap-2"
                  onClick={() => handleIconClick(app)}
                >
                   <div className="w-16 h-16 bg-white/10 rounded-xl border-2 border-white/20 flex items-center justify-center backdrop-blur-sm shadow-lg active:scale-95 transition-transform">
                      <Image 
                        src={iconErrors[app.id] ? "/placeholder.svg" : (app.icon || "/placeholder.svg")} 
                        alt={app.name}
                        width={48}
                        height={48}
                        className="pixel-effect"
                        onError={() => handleImageError(app.id)}
                      />
                   </div>
                   <span className="text-white font-vt323 text-lg drop-shadow shadow-black">{app.name}</span>
                </button>
             ))}
          </div>
        </div>
      )}

      {/* Grid Layout Container - visible only on desktop */}
      {!isMobile && (
        <div className="grid-layout w-full h-full relative z-10">
          {/* Left Side Apps */}
          <div className="left-apps absolute left-16 top-0 h-full pt-6 flex flex-col justify-start gap-8">
            {leftSideApps.map((app, index) => (
              <button
                key={app.id}
                className="icon-container flex flex-col items-center cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#FFCD4B] focus:ring-offset-2 focus:ring-offset-black rounded-lg"
                onClick={() => handleIconClick(app)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleIconClick(app)
                  }
                }}
              >
                <div className="w-20 h-20 flex items-center justify-center transition-transform hover:scale-110 active:scale-95">
                  <Image
                    src={iconErrors[app.id] ? "/placeholder.svg" : (app.icon || "/placeholder.svg")}
                    alt={app.name}
                    width={84}
                    height={84}
                    className="pixel-effect no-borders"
                    style={{
                      imageRendering: "pixelated",
                      objectFit: "contain",
                    }}
                    onError={() => handleImageError(app.id)}
                  />
                </div>
                <div
                  className={`mt-2 ${activeApps.includes(app.id) ? "bg-[#FFCD4B]" : "bg-[#87CEEB]"} px-2 py-1 text-center border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.5)] transition-all group-hover:translate-y-[-2px] group-hover:shadow-[5px_5px_0px_rgba(0,0,0,0.5)]`}
                  style={{ width: "calc(100% - 10px)", marginLeft: "5px", marginRight: "5px" }}
                >
                  <span className="text-black text-center text-lg font-vt323 font-bold block w-full uppercase">{app.name}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Right Side Apps */}
          <div className="right-apps absolute right-16 top-0 h-full pt-6 flex flex-col justify-start gap-8">
            {rightSideApps.map((app, index) => (
              <button
                key={app.id}
                className="icon-container flex flex-col items-center cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#FFCD4B] focus:ring-offset-2 focus:ring-offset-black rounded-lg"
                onClick={() => handleIconClick(app)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleIconClick(app)
                  }
                }}
              >
                <div className="w-20 h-20 flex items-center justify-center transition-transform hover:scale-110 active:scale-95">
                  <Image
                    src={iconErrors[app.id] ? "/placeholder.svg" : (app.icon || "/placeholder.svg")}
                    alt={app.name}
                    width={84}
                    height={84}
                    className="pixel-effect no-borders"
                    style={{
                      imageRendering: "pixelated",
                      objectFit: "contain",
                    }}
                    onError={() => handleImageError(app.id)}
                  />
                </div>
                <div
                  className={`mt-2 ${activeApps.includes(app.id) ? "bg-[#FFCD4B]" : "bg-[#87CEEB]"} px-2 py-1 text-center border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.5)] transition-all group-hover:translate-y-[-2px] group-hover:shadow-[5px_5px_0px_rgba(0,0,0,0.5)]`}
                  style={{ width: "calc(100% - 10px)", marginLeft: "5px", marginRight: "5px" }}
                >
                  <span className="text-black text-center text-lg font-vt323 font-bold block w-full uppercase">{app.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Taskbar - System v5 High-Fidelity Layout - Hidden on Mobile */}
      {!isMobile && (
      <div className="absolute bottom-0 left-0 w-full h-14 bg-[#335DA1] border-t-2 border-black flex items-center px-2 z-[100] shadow-[0_-4px_10px_rgba(0,0,0,0.3)]">
        
        {/* Left Side: Dynamic App Tabs */}
        <div className="flex items-center gap-1 h-full py-1.5 overflow-x-auto no-scrollbar max-w-[40%]">
          {activeApps.map(appId => {
            const app = [...leftSideApps, ...rightSideApps].find(a => a.id === appId) || { id: appId, name: appId.toUpperCase() }
            const isActive = activeAppId === appId
            
            return (
              <button 
                key={appId}
                onClick={() => bringToFront(appId)}
                className={`h-full px-4 border-2 border-black flex items-center gap-3 transition-all relative ${
                  isActive 
                    ? "bg-[#FEDA45] shadow-[2px_2px_0px_rgba(0,0,0,1)] z-10 translate-y-[-1px]" 
                    : "bg-[#85C3D5] opacity-80 hover:opacity-100"
                }`}
              >
                <Folder className={`w-5 h-5 ${isActive ? "text-black fill-black/20" : "text-black/60"}`} />
                <span className={`font-vt323 text-xl font-bold uppercase tracking-tight whitespace-nowrap ${isActive ? "text-black" : "text-black/60"}`}>
                  {app.name}
                </span>
                {isActive && <div className="absolute -top-1 left-0 w-full h-0.5 bg-white/40" />}
              </button>
            )
          })}
        </div>

        {/* Middle: Terminal Icon Only */}
        <div className="flex items-center gap-1 h-full py-1.5 ml-4">
             <button 
               onClick={() => handleIconClick({ id: 'terminal', name: 'Terminal' })}
               className="w-11 h-full bg-[#85C3D5] border-2 border-black flex items-center justify-center hover:bg-white transition-colors shadow-[inset_-1px_-1px_0px_rgba(0,0,0,0.2)] active:scale-90"
             >
               <Image src="/terminal.png" alt="T" width={22} height={22} className="pixelated" />
             </button>
        </div>

        {/* Right Side: Long System Telemetry & Multimedia Bar (No Time) */}
        <div className="flex-1 h-full py-1.5 ml-4 flex items-center">
           <div className="w-full h-full bg-[#0C4A9C] border-2 border-black relative flex items-center justify-between px-4 overflow-hidden">
              {/* Reference Style: Dashed top highlight */}
              <div className="absolute top-0 left-0 w-full h-[1px] border-t border-dashed border-white/30" />
              
              <div className="flex items-center gap-3">
                 <div className="relative">
                   <Folder className="w-4 h-4 text-orange-400 fill-orange-400 animate-pulse" />
                   <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-green-500 rounded-full border border-black" />
                 </div>
                 <span className="font-vt323 text-[#FFCD4B] text-lg uppercase tracking-[0.1em] drop-shadow-[1px_1px_0px_rgba(0,0,0,0.5)]">
                    Active Process: {activeAppId ? activeAppId.replace(/-/g, '_').toUpperCase() : "OS_CORE"}
                 </span>
              </div>

              {/* Multimedia Controls - 8-Bit Pixel-Art Design */}
              {/* Multimedia Controls - Synchronized with Atmospheric Choice */}
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-3">
                     {/* High-Fidelity 8-Bit Play/Pause */}
                    <button 
                      onClick={() => {
                        if (isPlaying) {
                          audioRef.current?.pause();
                          setIsPlaying(false);
                        } else {
                          audioRef.current?.play();
                          setIsPlaying(true);
                        }
                      }}
                      className="w-14 h-14 bg-[#FEDA45] border-[4px] border-black flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 transition-all relative group"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-white/40" />
                      <div className="absolute top-0 left-0 w-1 h-full bg-white/40" />
                      {isPlaying ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="black" className="drop-shadow-[2px_2px_0px_rgba(255,255,255,0.3)]"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="black" className="ml-1 drop-shadow-[2px_2px_0px_rgba(255,255,255,0.3)]"><path d="M8 5v14l11-7z"/></svg>
                      )}
                    </button>

                    {/* Retro Volume Slider */}
                    <div className="flex items-center gap-2 bg-[#85C3D5] p-2 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="black"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                       <div className="relative w-24 h-6 flex items-center">
                          <input 
                            type="range" 
                            min="0" 
                            max="1" 
                            step="0.05" 
                            value={volume} 
                            onChange={(e) => {
                               const newVol = parseFloat(e.target.value);
                               setVolume(newVol);
                               if(audioRef.current) audioRef.current.volume = newVol;
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          {/* 8-Bit Segmented Visualization */}
                          <div className="w-full h-4 bg-[#0C4A9C] border-2 border-black flex items-center p-0.5 gap-0.5">
                             {[...Array(10)].map((_, i) => (
                                <div 
                                  key={i} 
                                  className={`flex-1 h-full border-r border-black/10 last:border-r-0 ${i / 10 < volume ? "bg-[#FEDA45]" : "bg-[#1a3b5c]"}`}
                                />
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="flex items-center gap-6 border-l border-white/20 pl-6 ml-4">
                    <button 
                      onClick={toggleAtmosphere}
                      className="h-10 px-4 bg-[#FEDA45] border-2 border-black flex items-center gap-3 hover:bg-white active:translate-y-1 active:shadow-none shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all group"
                    >
                       <div className="w-5 h-5 bg-black border border-white flex items-center justify-center group-hover:rotate-90 transition-transform">
                          <div className="w-1.5 h-1.5 bg-yellow-400" />
                       </div>
                       <div className="flex flex-col items-start leading-none">
                          <span className="font-vt323 text-black text-[10px] uppercase opacity-70">Atmosphere</span>
                          <span className="font-vt323 text-black text-lg font-bold uppercase tracking-tight">
                            {BACKGROUNDS[currentBgIdx].name}
                          </span>
                       </div>
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>

      )}
      {/* Active Windows */}
      {activeApps.map((appId) => {
        // For special windows, use custom titles
        if (appId === "terminal") {
          return (
            <Window
              key={appId}
              title="Terminal"
              onClose={() => handleCloseWindow(appId)}
              appId={appId}
              isActive={appId === activeAppId}
              onFocus={() => bringToFront(appId)}
              zIndex={appZIndices[appId] || 100}
              initialPosition={appPositions[appId]}
              initialSize={appSizes[appId]}
              onPositionChange={(position) => handleWindowPositionChange(appId, position)}
              onSizeChange={(size) => handleWindowSizeChange(appId, size)}
            />
          )
        }

        if (appId === "spotify") {
          return (
            <Window
              key={appId}
              title="Music"
              onClose={() => handleCloseWindow(appId)}
              appId={appId}
              isActive={appId === activeAppId}
              onFocus={() => bringToFront(appId)}
              zIndex={appZIndices[appId] || 100}
              initialPosition={appPositions[appId]}
              initialSize={appSizes[appId]}
              onPositionChange={(position) => handleWindowPositionChange(appId, position)}
              onSizeChange={(size) => handleWindowSizeChange(appId, size)}
            />
          )
        }

        // For other apps, find the app object and use its name as title
        const app = [...leftSideApps, ...rightSideApps].find((a) => a.id === appId)
        if (!app) return null

        return (
          <Window
            key={appId}
            title={app.name}
            onClose={() => handleCloseWindow(appId)}
            appId={appId}
            isActive={appId === activeAppId}
            onFocus={() => bringToFront(appId)}
            zIndex={appZIndices[appId] || 100}
            initialPosition={appPositions[appId]}
            initialSize={appSizes[appId]}
            onPositionChange={(position) => handleWindowPositionChange(appId, position)}
            onSizeChange={(size) => handleWindowSizeChange(appId, size)}
          />
        )
      })}
    </div>
  )
}
