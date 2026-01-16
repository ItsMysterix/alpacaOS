"use client"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Instagram } from "lucide-react"

export default function Header() {
  const [isNameHovered, setIsNameHovered] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleNameClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleTerminalClick = () => {
    window.dispatchEvent(new CustomEvent("open-terminal"))
    setIsDropdownOpen(false)
  }

  const handleMusicClick = () => {
    window.dispatchEvent(new CustomEvent("open-spotify"))
    setIsDropdownOpen(false)
  }

  return (
    <>
      <header className="w-full bg-[#F8F1E7] border-b-2 border-black flex items-center justify-between px-4 py-1 h-12 relative z-[1000]">
        <div className="flex items-center gap-3">
          <div ref={dropdownRef} className="relative">
            <div
              className={`flex items-center gap-2 cursor-pointer ${
                isNameHovered ? "bg-[#B0C4DE] border border-black shadow-[2px_2px_0px_rgba(0,0,0,0.3)]" : ""
              } px-2 py-1 transition-all`}
              onClick={handleNameClick}
              onMouseEnter={() => setIsNameHovered(true)}
              onMouseLeave={() => setIsNameHovered(false)}
            >
              <div className="relative w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden border border-[#F8F1E7]">
                <Image src="/images/alpaca.png" alt="AlpacaOS" fill className="object-contain p-0.5" />
              </div>
              <div
                className="font-bold text-[#0C4A9C] font-press-start text-sm tracking-tighter leading-tight"
                style={{ letterSpacing: "-0.1em", transform: "scaleY(1.2)" }}
              >
                Arka Gantait
              </div>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.3)] z-50">
                <div
                  className="flex items-center gap-3 p-3 hover:bg-[#B0C4DE] cursor-pointer border-b-2 border-gray-200"
                  onClick={handleTerminalClick}
                >
                  <div className="w-8 h-8 relative">
                    <Image src="/terminal.png" alt="Terminal" width={32} height={32} className="pixel-effect" />
                  </div>
                  <span className="font-vt323 text-lg font-bold">Terminal</span>
                </div>
                <div
                  className="flex items-center gap-3 p-3 hover:bg-[#B0C4DE] cursor-pointer"
                  onClick={handleMusicClick}
                >
                  <div className="w-8 h-8 relative">
                    <Image src="/soundcloud-icon.png" alt="Music" width={32} height={32} className="pixel-effect" />
                  </div>
                  <span className="font-vt323 text-lg font-bold">Music</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="https://github.com/ItsMysterix" target="_blank" aria-label="GitHub">
            <Github className="w-5 h-5 text-[#0C4A9C] hover:text-[#0802A3]" />
          </Link>
          <Link href="https://www.linkedin.com/in/arkaparna-gantait/" target="_blank" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5 text-[#0C4A9C] hover:text-[#0802A3]" />
          </Link>
          <Link href="https://www.instagram.com/xo.arka00/" target="_blank" aria-label="Instagram">
            <Instagram className="w-5 h-5 text-[#0C4A9C] hover:text-[#0802A3]" />
          </Link>
        </div>
      </header>
    </>
  )
}
