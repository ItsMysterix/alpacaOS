"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Music, Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react"

export default function CustomMusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true) // Initialized to true to match desktop logic

  const tracks = [
    { name: "Peaceful Piano 1", artist: "Classical Dreams", color: "#FFCD4B" },
    { name: "Peaceful Piano 2", artist: "Misty Mornings", color: "#87CEEB" },
    { name: "Peaceful Piano 3", artist: "Starlight Beats", color: "#FF7676" },
  ]

  const sendControl = (action: string, index?: number) => {
    window.dispatchEvent(new CustomEvent('alpaca-music-control', { 
      detail: { action, index: index !== undefined ? index : currentTrack }
    }))
  }

  const handlePlayPause = () => {
    const newState = !isPlaying
    setIsPlaying(newState)
    sendControl(newState ? 'play' : 'pause')
  }

  const handleNext = () => {
    const next = (currentTrack + 1) % tracks.length
    setCurrentTrack(next)
    sendControl('change', next)
    setIsPlaying(true)
  }

  const handlePrev = () => {
    const prev = (currentTrack - 1 + tracks.length) % tracks.length
    setCurrentTrack(prev)
    sendControl('change', prev)
    setIsPlaying(true)
  }

  const selectTrack = (index: number) => {
    setCurrentTrack(index)
    sendControl('change', index)
    setIsPlaying(true)
  }

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5] relative overflow-hidden">
      {/* Visualizer Header */}
      <div className="h-40 bg-[#0802A3] relative flex items-center justify-center overflow-hidden border-b-4 border-black">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="w-full h-full" style={{ 
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', 
            backgroundSize: '20px 20px' 
          }} />
        </div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 mb-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] border-2 border-black bg-white p-2">
            <Image
              src="/soundcloud-icon.png"
              alt="Music"
              width={80}
              height={80}
              className={`pixel-effect ${isPlaying ? 'animate-pulse' : ''}`}
            />
          </div>
        </div>

        {/* Fake Bars Visualizer */}
        <div className="absolute bottom-0 left-0 w-full flex items-end justify-center gap-1 px-4 h-12">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="w-full bg-white/40" 
              style={{ 
                height: isPlaying ? `${Math.random() * 100}%` : '10%',
                transition: 'height 0.2s ease-in-out'
              }}
            />
          ))}
        </div>
      </div>

      {/* Controls & Track Info */}
      <div className="flex-1 p-6 flex flex-col gap-6">
        <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_rgba(0,0,0,1)]">
          <h2 className="text-3xl font-vt323 font-bold text-black uppercase">{tracks[currentTrack].name}</h2>
          <p className="text-xl font-vt323 text-gray-500 uppercase">{tracks[currentTrack].artist}</p>
          
          <div className="mt-4 h-2 bg-gray-200 border-2 border-black relative">
            <div className={`h-full bg-[#FFCD4B] ${isPlaying ? 'w-1/3' : 'w-0'} transition-all duration-500`} />
          </div>
        </div>

        {/* Interaction Buttons */}
        <div className="flex justify-center items-center gap-4">
          <button onClick={handlePrev} className="p-3 bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-gray-100 active:translate-y-1 active:shadow-none">
            <SkipBack className="w-6 h-6" />
          </button>
          
          <button 
            onClick={handlePlayPause}
            className="p-5 bg-[#FFCD4B] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-[#FFD700] active:translate-y-1 active:shadow-none"
          >
            {isPlaying ? <Pause className="w-8 h-8 font-bold" /> : <Play className="w-8 h-8 font-bold" />}
          </button>

          <button onClick={handleNext} className="p-3 bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-gray-100 active:translate-y-1 active:shadow-none">
            <SkipForward className="w-6 h-6" />
          </button>
        </div>

        {/* Playlist */}
        <div className="flex-1 overflow-y-auto border-4 border-black bg-[#E0E0E0] p-2 space-y-1">
          {tracks.map((track, i) => (
            <div 
              key={i}
              onClick={() => selectTrack(i)}
              className={`flex items-center gap-3 p-2 cursor-pointer border-2 border-transparent hover:border-black transition-all
                ${currentTrack === i ? 'bg-[#FFCD4B] border-black' : 'bg-white'}`}
            >
              <div className="w-8 h-8 flex items-center justify-center bg-black text-white font-vt323 text-lg">
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="font-vt323 text-lg font-bold leading-none">{track.name}</div>
                <div className="font-vt323 text-sm text-gray-500">{track.artist}</div>
              </div>
              {currentTrack === i && isPlaying && <Volume2 className="w-4 h-4 animate-bounce" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
