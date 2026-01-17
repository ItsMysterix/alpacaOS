"use client"
import { useState, useRef } from "react"
import { User, FileText, Info, MapPin, Mail, Calendar, Github, Linkedin, Terminal, GraduationCap } from "lucide-react"

export default function AboutContent() {
  const [selectedFolder, setSelectedFolder] = useState<string>("personal")
  const contentRef = useRef<HTMLDivElement>(null)

  const folders = [
    { id: "personal", name: "Overview", icon: <User className="w-5 h-5" /> },
    { id: "interests", name: "Interests", icon: <Info className="w-5 h-5" /> },
    { id: "education", name: "Education", icon: <FileText className="w-5 h-5" /> },
  ]

  const renderContent = () => {
    switch (selectedFolder) {
      case "personal":
        return (
          <div className="space-y-4 p-6 overflow-y-auto h-full custom-scrollbar" ref={contentRef}>
            <div className="about-item flex items-center gap-4 p-4 bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              <User className="w-6 h-6 text-[#FF7676]" />
              <div>
                <span className="font-vt323 text-gray-500 text-sm uppercase block leading-none">Name</span>
                <span className="font-vt323 text-xl text-black uppercase">Arkaparna Gantait</span>
              </div>
            </div>
            <div className="about-item flex items-center gap-4 p-4 bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              <Mail className="w-6 h-6 text-[#4169E1]" />
              <div>
                <span className="font-vt323 text-gray-500 text-sm uppercase block leading-none">Email</span>
                <span className="font-vt323 text-xl text-black">arkaparna.gantait@gmail.com</span>
              </div>
            </div>
            <div className="about-item flex items-center gap-4 p-4 bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              <MapPin className="w-6 h-6 text-green-500" />
              <div>
                <span className="font-vt323 text-gray-500 text-sm uppercase block leading-none">Location</span>
                <span className="font-vt323 text-xl text-black">Atlanta, GA, US</span>
              </div>
            </div>
            <div className="about-item flex items-center gap-4 p-4 bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              <Calendar className="w-6 h-6 text-[#FFCD4B]" />
              <div>
                <span className="font-vt323 text-gray-500 text-sm uppercase block leading-none">Education Status</span>
                <span className="font-vt323 text-xl text-black uppercase">Senior @ Georgia State University</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="https://github.com/ItsMysterix" target="_blank" rel="noopener noreferrer" className="about-item flex items-center gap-4 p-4 bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-gray-50 transition-all cursor-pointer">
                <Github className="w-6 h-6 text-black" />
                <div>
                  <span className="font-vt323 text-gray-500 text-sm uppercase block leading-none">GitHub</span>
                  <span className="font-vt323 text-xl text-black">ItsMysterix</span>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/arkaparna-gantait/" target="_blank" rel="noopener noreferrer" className="about-item flex items-center gap-4 p-4 bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-gray-50 transition-all cursor-pointer">
                <Linkedin className="w-6 h-6 text-[#0077B5]" />
                <div>
                  <span className="font-vt323 text-gray-500 text-sm uppercase block leading-none">LinkedIn</span>
                  <span className="font-vt323 text-xl text-black">Arkaparna Gantait</span>
                </div>
              </a>
            </div>
          </div>
        )
      case "interests":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 overflow-y-auto h-full custom-scrollbar" ref={contentRef}>
            {[
              { label: "Deep Learning & AI", icon: <Terminal className="w-5 h-5" /> },
              { label: "DevOps & Cloud", icon: <Terminal className="w-5 h-5" /> },
              { label: "Web Development", icon: <Terminal className="w-5 h-5" /> },
              { label: "UI/UX Design", icon: <Terminal className="w-5 h-5" /> },
            ].map((interest) => (
              <div key={interest.label} className="about-item flex items-center gap-3 p-4 bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-gray-50 transition-all">
                <div className="w-8 h-8 rounded-none border border-black bg-black/5 flex items-center justify-center text-[#FF7676]">
                  {interest.icon}
                </div>
                <span className="font-vt323 text-xl text-black uppercase">{interest.label}</span>
              </div>
            ))}
          </div>
        )
      case "education":
        return (
          <div className="space-y-4 p-6 overflow-y-auto h-full custom-scrollbar" ref={contentRef}>
            <div className="about-item p-4 bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-8 h-8 text-[#4169E1]" />
                <h3 className="font-vt323 text-3xl text-black underline uppercase">Bachelor of Science</h3>
              </div>
              <div className="space-y-2 pl-11">
                <p className="font-vt323 text-2xl text-black italic uppercase">Computer Science</p>
                <p className="font-vt323 text-xl text-gray-600">Georgia State University • 2022 - 2025</p>
                <div className="mt-4 bg-[#FEDA45] p-3 border-2 border-black inline-block shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                  <span className="font-vt323 text-xl text-black font-bold uppercase">GSU HONORS PROGRAM | GPA: 3.58/4.0</span>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Navigation Arch-Tabs - Perfectly matched to reference */}
      <div className="flex gap-2 p-2 bg-[#B3E5FC]/20 border-b-2 border-black shrink-0 overflow-x-auto no-scrollbar">
        {folders.map((folder) => (
          <button 
            key={folder.id}
            onClick={() => setSelectedFolder(folder.id)}
            className={`
              px-6 py-2 font-vt323 text-xl border-2 border-black relative transition-all duration-150 uppercase tracking-tight
              ${selectedFolder === folder.id 
                ? "bg-[#FEDA45] text-black shadow-[3px_3px_0px_rgba(0,0,0,1)] -translate-y-0.5 z-10 font-bold" 
                : "bg-[#88C8E1] text-black/60 hover:bg-white hover:text-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              }
            `}
          >
            {folder.name}
            {selectedFolder === folder.id && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FEDA45] rotate-45 border-r-2 border-b-2 border-black" />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 m-3 border-4 border-black bg-white/5 relative overflow-hidden flex flex-col shadow-[inset_4px_4px_10px_rgba(0,0,0,0.3)]">
        <div className="absolute inset-0 border-2 border-[#B3E5FC]/30 pointer-events-none z-10" />
        <div className="flex-1 relative overflow-hidden flex flex-col">
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.05]" 
            style={{ backgroundImage: "repeating-linear-gradient(0deg, #000, #000 2px, transparent 2px, transparent 4px)" }}
          />
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
