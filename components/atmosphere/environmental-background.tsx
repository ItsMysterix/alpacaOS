"use client"
import React, { useMemo } from "react"
import { useAtmosphere, Season, TimeOfDay } from "@/hooks/use-atmosphere"

const THEMES: Record<Season, Record<TimeOfDay, string>> = {
  spring: {
    dawn: "from-[#4169E1] to-[#6A5ACD]",
    day: "from-[#4169E1] to-[#87CEEB]",
    dusk: "from-[#4169E1] to-[#FFB6C1]",
    night: "from-[#191970] to-[#4169E1]",
  },
  summer: {
    dawn: "from-[#4169E1] to-[#FFD700]",
    day: "from-[#4169E1] to-[#00BFFF]",
    dusk: "from-[#4169E1] to-[#FF4500]",
    night: "from-[#000080] to-[#4169E1]",
  },
  autumn: {
    dawn: "from-[#4169E1] to-[#D2691E]",
    day: "from-[#4169E1] to-[#CD853F]",
    dusk: "from-[#4169E1] to-[#8B4513]",
    night: "from-[#2F4F4F] to-[#4169E1]",
  },
  winter: {
    dawn: "from-[#4169E1] to-[#B0C4DE]",
    day: "from-[#4169E1] to-[#E0FFFF]",
    dusk: "from-[#4169E1] to-[#778899]",
    night: "from-[#191970] to-[#4169E1]",
  },
}

const PARTICLES: Record<Season, string[]> = {
  spring: ["🌸", "🌱"],
  summer: ["✨", "☀"],
  autumn: ["🍁", "🍂"],
  winter: ["❄", "❅"],
}

export default function EnvironmentalBackground({ children }: { children: React.ReactNode }) {
  const { season, timeOfDay } = useAtmosphere()

  const themeClass = THEMES[season][timeOfDay]
  
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      char: PARTICLES[season][Math.floor(Math.random() * PARTICLES[season].length)],
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${10 + Math.random() * 20}s`,
      size: `${1 + Math.random() * 1.5}rem`,
    }))
  }, [season])

  return (
    <div className={`relative w-full h-full min-h-screen bg-[#4169E1] transition-colors duration-1000 overflow-hidden`}>
      {/* Base Gradient Layer */}
      <div className={`absolute inset-0 bg-gradient-to-br ${themeClass} transition-all duration-[3000ms] opacity-40`} />

      {/* Softer Tactical Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: '80px 80px' 
        }}
      />

      {/* Gentle Central Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_80%)] pointer-events-none" />
      
      {/* CRT Texture Backdrop */}
      <div className="absolute inset-0 bg-crt opacity-40 pointer-events-none z-0" />

      {/* Seasonal Particle Layer */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {particles.map((p) => (
          <span
            key={p.id}
            className="particle animate-fall opacity-0"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              fontSize: p.size,
              filter: "blur(1px) drop-shadow(0 0 5px currentColor)",
            }}
          >
            {p.char}
          </span>
        ))}
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  )
}
