"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Music, Construction } from "lucide-react"

export default function CustomMusicPlayer() {
  const [showDetails, setShowDetails] = useState(false)

  // Toggle details visibility
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDetails(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col h-full bg-[#F8F1E7] relative overflow-hidden">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(#0802A3 1px, transparent 1px),
            linear-gradient(90deg, #0802A3 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Coming Soon Content */}
      <div className="flex flex-col items-center justify-center h-full z-10 p-8">
        <div className="w-32 h-32 relative mb-6">
          <Image
            src="/soundcloud-icon.png"
            alt="Music"
            width={128}
            height={128}
            className="pixel-effect animate-pulse"
          />
        </div>

        <h2 className="text-4xl font-bold text-[#0802A3] font-vt323 mb-4 text-center">Music</h2>

        <div className="bg-[#87CEEB] border-2 border-black p-6 max-w-md w-full mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Construction className="w-6 h-6 text-[#FF4B91]" />
            <h3 className="text-2xl font-bold text-black font-vt323">Coming Soon!</h3>
            <Construction className="w-6 h-6 text-[#FF4B91]" />
          </div>

          <p className="text-center font-vt323 text-lg mb-4">Our awesome music player is under construction.</p>

          {showDetails && (
            <div className="flex justify-center mt-4">
              <button className="bg-[#FFCD4B] border-2 border-black px-4 py-2 font-vt323 text-lg font-bold flex items-center gap-2">
                <Music className="w-5 h-5" />
                Check Back Later
              </button>
            </div>
          )}
        </div>

        {/* Pixelated music notes decoration */}
        <div className="absolute bottom-10 left-10 w-8 h-8 text-[#FF4B91] opacity-50">
          <div className="w-4 h-4 border-r-2 border-b-2 border-[#FF4B91] rounded-br-sm absolute top-0 left-0"></div>
          <div className="w-2 h-6 bg-[#FF4B91] absolute bottom-0 left-1"></div>
        </div>

        <div className="absolute top-20 right-12 w-8 h-8 text-[#FFCD4B] opacity-50">
          <div className="w-4 h-4 border-r-2 border-b-2 border-[#FFCD4B] rounded-br-sm absolute top-0 left-0"></div>
          <div className="w-2 h-6 bg-[#FFCD4B] absolute bottom-0 left-1"></div>
        </div>

        <div className="absolute bottom-32 right-20 w-6 h-6 text-[#0802A3] opacity-50">
          <div className="w-3 h-3 border-r-2 border-b-2 border-[#0802A3] rounded-br-sm absolute top-0 left-0"></div>
          <div className="w-1.5 h-5 bg-[#0802A3] absolute bottom-0 left-0.5"></div>
        </div>
      </div>
    </div>
  )
}
