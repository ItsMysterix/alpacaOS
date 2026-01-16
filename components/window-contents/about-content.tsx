"use client"
import { useState, useEffect, useRef } from "react"
import { FileText, ChevronRight, Info, User, Calendar, MapPin, Mail, Menu, X } from "lucide-react"
import gsap from "gsap"

export default function AboutContent() {
  const [selectedFolder, setSelectedFolder] = useState<string | null>("personal")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const folders = [
    { id: "personal", name: "Personal Info", icon: <User className="w-5 h-5 text-[#0802A3]" /> },
    { id: "education", name: "Education", icon: <FileText className="w-5 h-5 text-[#0802A3]" /> },
    { id: "interests", name: "Interests", icon: <Info className="w-5 h-5 text-[#0802A3]" /> },
  ]

  useEffect(() => {
    if (contentRef.current) {
      const items = contentRef.current.querySelectorAll(".about-item")
      gsap.fromTo(items, 
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" }
      )
    }
  }, [selectedFolder])

  const renderContent = () => {
    switch (selectedFolder) {
      case "personal":
        return (
          <div className="space-y-3 p-4" ref={contentRef}>
            <div className="about-item flex items-center gap-3 p-2 bg-white border-2 border-black retro-shadow-sm">
              <User className="w-5 h-5 text-[#FF4B91]" />
              <span className="font-vt323 text-lg">Name: Arka Gantait</span>
            </div>
            <div className="about-item flex items-center gap-3 p-2 bg-white border-2 border-black retro-shadow-sm">
              <Mail className="w-5 h-5 text-[#FF4B91]" />
              <span className="font-vt323 text-lg">Email: arkaparna.gantait@gmail.com</span>
            </div>
            <div className="about-item flex items-center gap-3 p-2 bg-white border-2 border-black retro-shadow-sm">
              <MapPin className="w-5 h-5 text-[#FF4B91]" />
              <span className="font-vt323 text-lg">Location: Atlanta, GA, US</span>
            </div>
            <div className="about-item flex items-center gap-3 p-2 bg-white border-2 border-black retro-shadow-sm">
              <Calendar className="w-5 h-5 text-[#FF4B91]" />
              <span className="font-vt323 text-lg">Senior Year Student at Georgia State University</span>
            </div>
          </div>
        )
      case "education":
        return (
          <div className="space-y-3 p-4" ref={contentRef}>
            <div className="about-item flex items-start gap-3 p-2 bg-white border-2 border-black retro-shadow-sm">
              <FileText className="w-5 h-5 mt-1 text-[#FF4B91]" />
              <div>
                <span className="font-vt323 text-lg font-bold block">Bachelor of Science in Computer Science</span>
                <span className="font-vt323 text-lg block">Georgia State University Aug. 2022 - Dec. 2025</span>
                <span className="font-vt323 text-lg block text-gray-600 font-bold">GSU HONORS PROGRAM GPA 3.58/4.0</span>
                <span className="font-vt323 text-lg block text-gray-600 mt-2">
                  Relevant Coursework: Principles of Computer Science, Theoretical Foundation of Computer Science, Data
                  Structures, System-Level Programming, Designs and Analysis: Algorithms, Computer Org and Programming,
                  Big Data Programming, Software Development.
                </span>
              </div>
            </div>
          </div>
        )
      case "interests":
        return (
          <div className="space-y-3 p-4" ref={contentRef}>
            <div className="about-item flex items-center gap-3 p-2 bg-white border-2 border-black retro-shadow-sm">
              <Info className="w-5 h-5 text-[#FF4B91]" />
              <span className="font-vt323 text-lg">Deep Learning & AI</span>
            </div>
            <div className="about-item flex items-center gap-3 p-2 bg-white border-2 border-black retro-shadow-sm">
              <Info className="w-5 h-5 text-[#FF4B91]" />
              <span className="font-vt323 text-lg">DevOps & Cloud Computing</span>
            </div>
            <div className="about-item flex items-center gap-3 p-2 bg-white border-2 border-black retro-shadow-sm">
              <Info className="w-5 h-5 text-[#FF4B91]" />
              <span className="font-vt323 text-lg">Web Development</span>
            </div>
            <div className="about-item flex items-center gap-3 p-2 bg-white border-2 border-black retro-shadow-sm">
              <Info className="w-5 h-5 text-[#FF4B91]" />
              <span className="font-vt323 text-lg">UI/UX Design</span>
            </div>
          </div>
        )
      default:
        return <div className="p-4 font-vt323 text-lg">Select a folder to view contents</div>
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Mobile header with menu button */}
      <div className="md:hidden bg-[#87CEEB] border-b-2 border-black p-2 flex items-center justify-between">
        <div className="relative px-2">
          <div className="absolute top-0.5 left-1.5 bg-black px-2 py-0.5 uppercase font-vt323 text-lg font-extrabold">
            FAVS
          </div>
          <div className="relative z-10 bg-[#FFCD4B] border-2 border-black px-2 py-0.5 uppercase font-vt323 text-lg font-extrabold text-[#0802A3]">
            FAVS
          </div>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 bg-[#FFCD4B] border-2 border-black">
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar - responsive */}
      <div
        className={`
        ${sidebarOpen ? "block" : "hidden"} md:block
        w-full md:w-1/4 bg-[#87CEEB]/80 border-r-2 border-black p-2
        ${sidebarOpen ? "absolute inset-x-0 top-12 bottom-0 z-10" : ""}
        overflow-y-auto backdrop-blur-sm
      `}
      >
        {/* Desktop heading */}
        <div className="hidden md:block relative mb-4 px-2">
          <div className="absolute top-1 left-1 bg-black px-3 py-1 uppercase font-vt323 text-xl font-extrabold">
            FAVOURITES
          </div>
          <div className="relative z-10 bg-[#FFCD4B] border-2 border-black px-3 py-1 uppercase font-vt323 text-xl font-extrabold text-[#0802A3] retro-shadow-sm">
            FAVOURITES
          </div>
        </div>

        {/* Mobile heading */}
        <div className="md:hidden relative mb-4 px-2">
          <div className="absolute top-0.5 left-1.5 bg-black px-2 py-0.5 uppercase font-vt323 text-lg font-extrabold">
            FAVOURITES
          </div>
          <div className="relative z-10 bg-[#FFCD4B] border-2 border-black px-2 py-0.5 uppercase font-vt323 text-lg font-extrabold text-[#0802A3]">
            FAVOURITES
          </div>
        </div>

        {folders.map((folder) => (
          <div
            key={folder.id}
            className={`flex items-center gap-2 p-2 cursor-pointer transition-all border-2 mb-2 ${
              selectedFolder === folder.id 
                ? "bg-[#FFCD4B] border-black retro-shadow-sm translate-x-[2px] translate-y-[2px]" 
                : "bg-white/50 border-black/20 hover:border-black hover:bg-white retro-shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px]"
            }`}
            onClick={() => {
              setSelectedFolder(folder.id)
              setSidebarOpen(false) // Close sidebar on mobile after selection
            }}
          >
            {folder.icon}
            <span className="font-vt323 text-lg">{folder.name}</span>
            {selectedFolder === folder.id && <ChevronRight className="w-4 h-4 ml-auto" />}
          </div>
        ))}
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-auto bg-white/30 backdrop-blur-md">
        <div className="p-2 bg-[#87CEEB]/50 border-b-2 border-black font-vt323 text-lg font-bold flex justify-center sticky top-0 z-10 backdrop-blur-sm">
          <span className="bg-[#FFCD4B] px-4 py-0.5 border-2 border-black uppercase retro-shadow-sm">
            {folders.find((f) => f.id === selectedFolder)?.name || "About Me"}
          </span>
        </div>
        <div className="min-h-0 overflow-y-auto">{renderContent()}</div>
      </div>
    </div>
  )
}
