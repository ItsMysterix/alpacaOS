"use client"
import { useState } from "react"
import { ExternalLink, Github } from "lucide-react"

export default function ProjectsContent() {
  const [selectedProject, setSelectedProject] = useState<string>("slurpy")

  const projects = [
    { id: "slurpy", name: "Slurpy AI", fullName: "Slurpy - AI Mental Health Companion" },
    { id: "sarge", name: "Sarge Ops", fullName: "Sarge - DevOps Monitoring Platform" },
    { id: "notoria", name: "Notoria", fullName: "Notoria - Academic Collaboration" },
  ]

  const renderProjectDetails = () => {
    const project = projects.find(p => p.id === selectedProject)
    if (!project) return null

    const content = {
      slurpy: (
        <div className="space-y-4">
           <div className="bg-white p-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
             <div className="flex justify-between items-start mb-2">
               <h3 className="font-vt323 text-2xl font-bold text-[#FF4B91] uppercase tracking-tight">{project.fullName}</h3>
               <span className="font-vt323 text-lg text-gray-500">APR 2025</span>
             </div>
             <p className="font-vt323 text-xl text-black/80">
               A multi-persona AI chatbot designed to provide mental health support and companionship.
             </p>
             <ul className="mt-4 space-y-2">
                {[
                  "Deployed a multi-persona AI chatbot for 50+ users.",
                  "Fine-tuned DistilBERT for 89% emotion detection accuracy.",
                  "Implemented RAG using Qdrant and Model Context Protocol.",
                  "Developed backend using FastAPI and Supabase with JWT."
                ].map((li, i) => (
                  <li key={i} className="font-vt323 text-lg flex gap-2">
                    <span className="text-blue-500 font-bold">{" > "}</span> {li}
                  </li>
                ))}
             </ul>
             <div className="flex flex-wrap gap-2 mt-4">
               {["FastAPI", "Supabase", "DistilBERT", "Qdrant", "RAG", "Python"].map(t => (
                 <span key={t} className="px-2 py-0.5 bg-[#FEDA45] border-2 border-black font-vt323 text-sm uppercase">{t}</span>
               ))}
             </div>
             <div className="mt-4 pt-4 border-t-2 border-black border-dashed">
                <a href="https://slurpy.life" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#3A76D1] text-white font-vt323 text-xl px-4 py-1 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-none transition-all">
                  <ExternalLink className="w-5 h-5" />
                  LIVE DEMO
                </a>
             </div>
           </div>
        </div>
      ),
      sarge: (
        <div className="space-y-4">
           <div className="bg-white p-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
             <div className="flex justify-between items-start mb-2">
               <h3 className="font-vt323 text-2xl font-bold text-[#FF4B91] uppercase tracking-tight">{project.fullName}</h3>
               <span className="font-vt323 text-lg text-gray-500">MAR 2025</span>
             </div>
             <p className="font-vt323 text-xl text-black/80">
               A self-service platform for infrastructure management and real-time CI/CD monitoring.
             </p>
             <ul className="mt-4 space-y-2">
                {[
                  "Built a platform for infrastructure management from GitHub repositories.",
                  "Implemented monitoring with Docker, Prometheus, and Grafana.",
                  "Unified management across 3 Dockerized microservices."
                ].map((li, i) => (
                  <li key={i} className="font-vt323 text-lg flex gap-2">
                    <span className="text-blue-500 font-bold">{" > "}</span> {li}
                  </li>
                ))}
             </ul>
             <div className="flex flex-wrap gap-2 mt-4">
               {["Docker", "Prometheus", "Grafana", "AWS", "CI/CD", "Nginx"].map(t => (
                 <span key={t} className="px-2 py-0.5 bg-[#FEDA45] border-2 border-black font-vt323 text-sm uppercase">{t}</span>
               ))}
             </div>
             <div className="mt-4 pt-4 border-t-2 border-black border-dashed">
                <a href="https://v0-sarge.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#3A76D1] text-white font-vt323 text-xl px-4 py-1 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-none transition-all">
                  <ExternalLink className="w-5 h-5" />
                  LIVE DEMO
                </a>
             </div>
           </div>
        </div>
      ),
      notoria: (
        <div className="space-y-4">
           <div className="bg-white p-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
             <div className="flex justify-between items-start mb-2">
               <h3 className="font-vt323 text-2xl font-bold text-[#FF4B91] uppercase tracking-tight">{project.fullName}</h3>
               <span className="font-vt323 text-lg text-gray-500">JAN 2024</span>
             </div>
             <p className="font-vt323 text-xl text-black/80">
               A mobile application for academic collaboration and real-time communication.
             </p>
             <ul className="mt-4 space-y-2">
                {[
                  "Developed a Flutter and Firebase mobile app with RBAC.",
                  "Enabled real-time collaboration through shared notes.",
                  "Discord-style communication system implementation."
                ].map((li, i) => (
                  <li key={i} className="font-vt323 text-lg flex gap-2">
                    <span className="text-blue-500 font-bold">{" > "}</span> {li}
                  </li>
                ))}
             </ul>
             <div className="flex flex-wrap gap-2 mt-4">
               {["Flutter", "Firebase", "Real-time", "Mobile", "Academic"].map(t => (
                 <span key={t} className="px-2 py-0.5 bg-[#FEDA45] border-2 border-black font-vt323 text-sm uppercase">{t}</span>
               ))}
             </div>
             <div className="mt-4 pt-4 border-t-2 border-black border-dashed">
                <a href="https://github.com/ItsMysterix/notoria" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#3A76D1] text-white font-vt323 text-xl px-4 py-1 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-none transition-all">
                  <Github className="w-5 h-5" />
                  VIEW GITHUB
                </a>
             </div>
           </div>
        </div>
      )
    }

    return (
      <div className="p-6 overflow-y-auto h-full custom-scrollbar">
        {content[selectedProject as keyof typeof content]}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Navigation Arch-Tabs */}
      <div className="flex gap-2 p-2 bg-[#B3E5FC]/20 border-b-2 border-black shrink-0 overflow-x-auto no-scrollbar">
        {projects.map((project) => (
          <button 
            key={project.id}
            onClick={() => setSelectedProject(project.id)}
            className={`
              px-6 py-2 font-vt323 text-xl border-2 border-black relative transition-all duration-150 uppercase tracking-tight whitespace-nowrap
              ${selectedProject === project.id 
                ? "bg-[#FEDA45] text-black shadow-[3px_3px_0px_rgba(0,0,0,1)] -translate-y-0.5 z-10 font-bold" 
                : "bg-[#88C8E1] text-black/60 hover:bg-white hover:text-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              }
            `}
          >
            {project.name}
            {selectedProject === project.id && (
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
          {renderProjectDetails()}
        </div>
      </div>
    </div>
  )
}
