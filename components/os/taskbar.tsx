import { Folder } from "lucide-react"
import Image from "next/image"

interface App {
  id: string
  name: string
  icon?: string
}

interface TaskbarProps {
  activeApps: string[]
  activeAppId: string | null
  apps: App[]
  onAppClick: (appId: string) => void
  onTerminalClick: () => void
  onToggleAtmosphere: () => void
  isPlaying: boolean
  onTogglePlay: () => void
  volume: number
  onVolumeChange: (newVol: number) => void
  currentBgName: string
  onShutdown: () => void
}

export default function Taskbar({ 
  activeApps, 
  activeAppId, 
  apps, 
  onAppClick, 
  onTerminalClick, 
  onToggleAtmosphere,
  isPlaying,
  onTogglePlay,
  volume,
  onVolumeChange,
  currentBgName,
  onShutdown
}: TaskbarProps) {
  
  return (
    <div className="absolute bottom-0 left-0 w-full h-14 bg-[#335DA1] border-t-2 border-black flex items-center px-2 z-[100] shadow-[0_-4px_10px_rgba(0,0,0,0.3)]">
      
      {/* Left Side: Dynamic App Tabs */}
      <div className="flex items-center gap-1 h-full py-1.5 overflow-x-auto no-scrollbar max-w-[40%]">
        {activeApps.map(appId => {
          const app = apps.find(a => a.id === appId) || { id: appId, name: appId.toUpperCase() }
          const isActive = activeAppId === appId
          
          return (
            <button 
              key={appId}
              onClick={() => onAppClick(appId)}
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
             onClick={onTerminalClick}
             className="w-11 h-full bg-[#85C3D5] border-2 border-black flex items-center justify-center hover:bg-white transition-colors shadow-[inset_-1px_-1px_0px_rgba(0,0,0,0.2)] active:scale-90"
           >
             <Image src="/terminal.png" alt="T" width={22} height={22} className="pixelated" />
           </button>
      </div>

      {/* Right Side: Long System Telemetry & Multimedia Bar */}
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

            {/* Multimedia Controls - Synchronized with Atmospheric Choice */}
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-3">
                   {/* High-Fidelity 8-Bit Play/Pause */}
                  <button 
                    onClick={onTogglePlay}
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
                          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
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

               <div className="flex items-center gap-4 border-l border-white/20 pl-6 ml-4">
                  <button 
                    onClick={onToggleAtmosphere}
                    className="h-10 px-4 bg-[#FEDA45] border-2 border-black flex items-center gap-3 hover:bg-white active:translate-y-1 active:shadow-none shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all group"
                    title="Change Atmosphere"
                  >
                     <div className="w-5 h-5 bg-black border border-white flex items-center justify-center group-hover:rotate-90 transition-transform">
                        <div className="w-1.5 h-1.5 bg-yellow-400" />
                     </div>
                     <div className="flex flex-col items-start leading-none">
                        <span className="font-vt323 text-black text-[10px] uppercase opacity-70">Atmosphere</span>
                        <span className="font-vt323 text-black text-lg font-bold uppercase tracking-tight">
                          {currentBgName}
                        </span>
                     </div>
                  </button>

                  <button 
                    onClick={onShutdown}
                    className="h-10 w-10 bg-red-500 border-2 border-black flex items-center justify-center hover:bg-red-400 active:translate-y-1 active:shadow-none shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all group"
                    title="System Shutdown"
                  >
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                        <line x1="12" y1="2" x2="12" y2="12" />
                     </svg>
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
