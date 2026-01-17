"use client"

import { useState } from "react"
import LoadingScreen from "@/components/loading-screen"
import DesktopLayout from "@/components/desktop-layout"
import Header from "@/components/header"
import EnvironmentalBackground from "@/components/atmosphere/environmental-background"
import SimpleLanding from "@/components/simple-portfolio/landing-page"

export default function Home() {
  const [viewState, setViewState] = useState<'simple' | 'booting' | 'os'>('simple')

  const handleEnterOS = () => {
    setViewState('booting')
    // Simulate boot sequence
    setTimeout(() => {
      setViewState('os')
      // Dispatch event to open About Me window by default once OS loads
      setTimeout(() => {
         window.dispatchEvent(new CustomEvent("open-about-me"))
      }, 500)
    }, 3500)
  }

  // Simple Landing View (Recruiter Friendly)
  if (viewState === 'simple') {
    return <SimpleLanding onEnterOS={handleEnterOS} />
  }

  // OS View (Booting + Active)
  return (
    <EnvironmentalBackground>
      <h1 className="sr-only">Arkaparna Gantait - Personal Portfolio</h1>
      
      {viewState === 'booting' && <LoadingScreen />}
      
      {viewState === 'os' && (
        <>
          <Header />
            <div className="flex-1 overflow-hidden">
            <DesktopLayout />
          </div>
        </>
      )}
    </EnvironmentalBackground>
  )
}
