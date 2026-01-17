"use client"

import { useState, useEffect } from "react"
import LoadingScreen from "@/components/loading-screen"
import DesktopLayout from "@/components/desktop-layout"
import Header from "@/components/header"
import EnvironmentalBackground from "@/components/atmosphere/environmental-background"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasVisited, setHasVisited] = useState(false)

  useEffect(() => {
    // Check if user has visited before
    const visited = localStorage.getItem("hasVisited")
    setHasVisited(!!visited)

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Set visited flag
      localStorage.setItem("hasVisited", "true")
    }, 3500) // Slightly longer than the loading animation (3s)

    return () => clearTimeout(timer)
  }, [])

  // Open About Me window by default
  useEffect(() => {
    if (!isLoading) {
      // Dispatch event to open About Me window
      window.dispatchEvent(new CustomEvent("open-about-me"))
    }
  }, [isLoading])

  return (
    <EnvironmentalBackground>
      <h1 className="sr-only">Arkaparna Gantait - Personal Portfolio</h1>
      {isLoading && <LoadingScreen />}
      {/* Only show header when not loading */}
      {!isLoading && <Header />}
      <div className={`flex-1 overflow-hidden ${isLoading ? "pt-0" : ""}`}>
        <DesktopLayout />
      </div>
    </EnvironmentalBackground>
  )
}
