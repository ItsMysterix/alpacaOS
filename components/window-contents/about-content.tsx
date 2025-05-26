"use client"
import { useState } from "react"
import { FileText, ChevronRight, Info, User, Calendar, MapPin, Mail, Menu, X } from "lucide-react"

export default function AboutContent() {
  const [selectedFolder, setSelectedFolder] = useState<string | null>("personal")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const folders = [
    { id: "personal", name: "Personal Info", icon: <User className="w-5 h-5 text-[#0802A3]" /> },
    { id: "education", name: "Education", icon: <FileText className="w-5 h-5 text-[#0802A3]" /> },
    { id: "interests", name: "Interests", icon: <Info className="w-5 h-5 text-[#0802A3]" /> },
  ]

  const renderContent = () => {
    switch (selectedFolder) {
      case "personal":
        return (
          <div className="space-y-3 p-4">
            <div className="flex items-center gap-3 p-2 bg-white border-2 border-black">
              <User className="w-5 h-5 text-[#FF4B91]" />
              <span className="font-vt323 text-lg">Name: Arka Gantait</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-white border-2 border-black">
              <Mail className="w-5 h-5 text-[#FF4B91]" />
              <span className="font-vt323 text-lg">Email: arkaparna.90@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-white border-2 border-black">
              <MapPin className="w-5 h-5 text-[#FF4B91]" />
              <span className="font-vt323 text-lg">Location: Atlanta, GA, US</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-white border-2 border-black">
              <Calendar className="w-5 h-5 text-[#FF4B91]" />
              <span className="font-vt323 text-lg">Senior Year Student at Georgia State University</span>
            </div>
          </div>
        )
      case "education":
        return (
          <div className="space-y-3 p-4">
            <div className="flex items-start gap-3 p-2 bg-white border-2 border-black">
              <FileText className="w-5 h-5 mt-1 text-[#FF4B91]" />
              <div>
                <span className="font-vt323 text-lg font-bold block">Bachelor of Science in Computer Science</span>
                <span className="font-vt323 text-lg block">Georgia State University 2022 - 2025</span>
                <span className="font-vt323 text-lg block text-gray-600">GSU HONORS PROGRAM GPA 3.66/4</span>
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
          <div className="space-y-3 p-4">
            <div className="flex items-center gap-3 p-2 bg-white border-2 border-black">
              <Info className="w-5 h-5 text-[#FF4B91]" />
              <span className="font-vt323 text-lg">Web Development</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-white border-2 border-black">
              <Info className="w-5 h-5 text-[#FF4B91]" />
              <span className="font-vt323 text-lg">UI/UX Design</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-white border-2 border-black">
              <Info className="w-5 h-5 text-[#FF4B91]" />
              <span className="font-vt323 text-lg">Cloud Computing</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-white border-2 border-black">
              <Info className="w-5 h-5 text-[#FF4B91]" />
              <span className="font-vt323 text-lg">Gaming</span>
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
        w-full md:w-1/4 bg-[#87CEEB] border-r-2 border-black p-2
        ${sidebarOpen ? "absolute inset-x-0 top-12 bottom-0 z-10" : ""}
        overflow-y-auto
      `}
      >
        {/* Desktop heading */}
        <div className="hidden md:block relative mb-4 px-2">
          <div className="absolute top-1 left-1 bg-black px-3 py-1 uppercase font-vt323 text-xl font-extrabold">
            FAVOURITES
          </div>
          <div className="relative z-10 bg-[#FFCD4B] border-2 border-black px-3 py-1 uppercase font-vt323 text-xl font-extrabold text-[#0802A3]">
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
            className={`flex items-center gap-2 p-2 cursor-pointer rounded border-2 mb-2 ${
              selectedFolder === folder.id ? "bg-[#FFCD4B] border-black" : "border-transparent hover:border-black"
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
      <div className="flex-1 overflow-auto">
        <div className="p-2 bg-[#87CEEB] border-b-2 border-black font-vt323 text-lg font-bold flex justify-center">
          <span className="bg-[#FFCD4B] px-4 py-0.5 border-2 border-black uppercase">
            {folders.find((f) => f.id === selectedFolder)?.name || "About Me"}
          </span>
        </div>
        <div className="bg-white min-h-0 overflow-y-auto">{renderContent()}</div>
      </div>
    </div>
  )
}
