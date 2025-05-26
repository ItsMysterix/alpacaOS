"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Window from "@/components/window"

// Define specific window sizes and positions for each app type
const WINDOW_CONFIGS = {
  about: { width: 800, height: 500, x: 150, y: 80 },
  experience: { width: 820, height: 580, x: 250, y: 120 },
  projects: { width: 850, height: 600, x: 200, y: 100 },
  skills: { width: 780, height: 550, x: 300, y: 140 },
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
    { id: "resume", name: "Resume", icon: "/images/resume.png", isExternal: true, url: "/resume.pdf" },
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
      window.open("/resume.pdf", "_blank")
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

  const handleIconClick = (app: any) => {
    // Changed to single-click
    if (app.isExternal && app.url) {
      // Open external link in new tab (for all devices)
      window.open(app.url, "_blank")
    } else {
      // Open internal window if not already open, or bring to front if already open
      addApp(app.id)
    }
  }

  const handleCloseWindow = (appId: string) => {
    setActiveApps(activeApps.filter((id) => id !== appId))

    // If we're closing the active window, set the next highest z-index window as active
    if (appId === activeAppId) {
      const remainingApps = activeApps.filter((id) => id !== appId)
      if (remainingApps.length > 0) {
        // Find the app with the highest z-index
        let highestZIndex = 0
        let highestApp = remainingApps[0]

        remainingApps.forEach((id) => {
          if (appZIndices[id] > highestZIndex) {
            highestZIndex = appZIndices[id]
            highestApp = id
          }
        })

        setActiveAppId(highestApp)
      } else {
        setActiveAppId(null)
      }
    }
  }

  const handleImageError = (id: string) => {
    console.error(`Failed to load image for ${id}`)
    setIconErrors((prev) => ({ ...prev, [id]: true }))
  }

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

  return (
    <div className="flex-1 bg-[#4169E1] relative overflow-hidden crt-effect w-full h-full" ref={containerRef}>
      {/* Grid Layout Container - hide on mobile when window is open */}
      <div className={`grid-layout w-full h-full ${isMobile && activeApps.length > 0 ? "hidden" : ""}`}>
        {/* Left Side Apps */}
        <div className="left-apps absolute left-16 top-0 h-full pt-6 flex flex-col justify-start gap-8">
          {leftSideApps.map((app, index) => (
            <div
              key={app.id}
              className="icon-container flex flex-col items-center cursor-pointer"
              onClick={() => handleIconClick(app)}
            >
              <div className="w-20 h-20 flex items-center justify-center">
                <Image
                  src={app.icon || "/placeholder.svg"}
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
                className={`mt-2 ${activeApps.includes(app.id) ? "bg-[#FFCD4B]" : "bg-[#87CEEB]"} px-2 py-1 text-center border border-black`}
                style={{ width: "calc(100% - 10px)", marginLeft: "5px", marginRight: "5px" }}
              >
                <span className="text-black text-center text-lg font-vt323 font-bold block w-full">{app.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side Apps */}
        <div className="right-apps absolute right-16 top-0 h-full pt-6 flex flex-col justify-start gap-8">
          {rightSideApps.map((app, index) => (
            <div
              key={app.id}
              className="icon-container flex flex-col items-center cursor-pointer"
              onClick={() => handleIconClick(app)}
            >
              <div className="w-20 h-20 flex items-center justify-center">
                <Image
                  src={app.icon || "/placeholder.svg"}
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
                className={`mt-2 ${activeApps.includes(app.id) ? "bg-[#FFCD4B]" : "bg-[#87CEEB]"} px-2 py-1 text-center border border-black`}
                style={{ width: "calc(100% - 10px)", marginLeft: "5px", marginRight: "5px" }}
              >
                <span className="text-black text-center text-lg font-vt323 font-bold block w-full">{app.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

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
