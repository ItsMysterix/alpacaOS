"use client"
import { useState } from "react"
import { Folder, FileText, Code, ExternalLink, Github, ChevronRight, Menu, X } from "lucide-react"

export default function ProjectsContent() {
  const [selectedProject, setSelectedProject] = useState<string | null>("slurpy")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const projects = [
    { id: "slurpy", name: "Slurpy", icon: <Folder className="w-5 h-5 text-[#0802A3]" /> },
    { id: "sarge", name: "Sarge", icon: <Folder className="w-5 h-5 text-[#0802A3]" /> },
    { id: "notoria", name: "Notoria", icon: <Folder className="w-5 h-5 text-[#0802A3]" /> },
  ]

  const renderProjectDetails = () => {
    switch (selectedProject) {
      case "slurpy":
        return (
          <div className="space-y-4 p-4">
            <div className="bg-white p-3 rounded-none border-2 border-black">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <h3 className="font-vt323 text-xl font-bold text-[#FF4B91]">Slurpy - AI Mental Health Companion</h3>
                <p className="font-vt323 text-lg">Apr 2025 - Present</p>
              </div>
              <p className="font-vt323 text-lg mt-2">
                A multi-persona AI chatbot designed to provide mental health support and companionship.
              </p>

              <ul className="list-disc list-inside space-y-2 mt-4">
                <li className="font-vt323 text-lg">Deployed a multi-persona AI chatbot for 50+ users.</li>
                <li className="font-vt323 text-lg">Fine-tuned DistilBERT for 89% emotion detection accuracy.</li>
                <li className="font-vt323 text-lg">
                  Implemented RAG using Qdrant and Model Context Protocol for reduced latency.
                </li>
                <li className="font-vt323 text-lg">Developed backend using FastAPI and Supabase with JWT and RLS.</li>
              </ul>

              <div className="flex flex-wrap gap-2 mt-4">
                {["FastAPI", "Supabase", "DistilBERT", "Qdrant", "RAG", "Python"].map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-[#FFCD4B] text-[#0802A3] text-xs font-medium rounded-none border-2 border-black"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t-2 border-black border-dashed flex gap-4">
                <a
                  href="https://slurpy.life"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-vt323 text-lg hover:text-[#FF4B91] transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          </div>
        )
      case "sarge":
        return (
          <div className="space-y-4 p-4">
            <div className="bg-white p-3 rounded-none border-2 border-black">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <h3 className="font-vt323 text-xl font-bold text-[#FF4B91]">Sarge - DevOps Monitoring Platform</h3>
                <p className="font-vt323 text-lg">Mar 2025 - May 2025</p>
              </div>
              <p className="font-vt323 text-lg mt-2">
                A self-service platform for infrastructure management and real-time CI/CD monitoring.
              </p>

              <ul className="list-disc list-inside space-y-2 mt-4">
                <li className="font-vt323 text-lg">
                  Built a self-service platform for infrastructure management from GitHub repositories.
                </li>
                <li className="font-vt323 text-lg">
                  Implemented AWS-like cloud emulation and CI/CD monitoring with Docker, Prometheus, and Grafana.
                </li>
                <li className="font-vt323 text-lg">Unified management and monitoring across 3 Dockerized microservices.</li>
              </ul>

              <div className="flex flex-wrap gap-2 mt-4">
                {["Docker", "Prometheus", "Grafana", "AWS", "CI/CD", "Nginx"].map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-[#FFCD4B] text-[#0802A3] text-xs font-medium rounded-none border-2 border-black"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t-2 border-black border-dashed flex gap-4">
                <a
                  href="https://v0-sarge.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-vt323 text-lg hover:text-[#FF4B91] transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          </div>
        )
      case "notoria":
        return (
          <div className="space-y-4 p-4">
            <div className="bg-white p-3 rounded-none border-2 border-black">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <h3 className="font-vt323 text-xl font-bold text-[#FF4B91]">Notoria - Academic Collaboration App</h3>
                <p className="font-vt323 text-lg">Jan 2024 - Apr 2025</p>
              </div>
              <p className="font-vt323 text-lg mt-2">
                A mobile application for academic collaboration and real-time communication.
              </p>

              <ul className="list-disc list-inside space-y-2 mt-4">
                <li className="font-vt323 text-lg">
                  Developed a Flutter and Firebase mobile app with role-based access control.
                </li>
                <li className="font-vt323 text-lg">
                  Enabled real-time collaboration through shared notes and Discord-style communication.
                </li>
              </ul>

              <div className="flex flex-wrap gap-2 mt-4">
                {["Flutter", "Firebase", "Real-time", "Mobile", "Academic"].map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-[#FFCD4B] text-[#0802A3] text-xs font-medium rounded-none border-2 border-black"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t-2 border-black border-dashed flex gap-4">
                <a
                  href="https://github.com/ItsMysterix/notoria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-vt323 text-lg hover:text-[#FF4B91] transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>View GitHub</span>
                </a>
              </div>
            </div>
          </div>
        )
      default:
        return <div className="p-4 font-vt323 text-lg">Select a project to view details</div>
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

        {projects.map((project) => (
          <div
            key={project.id}
            className={`flex items-center gap-2 p-2 cursor-pointer rounded border-2 mb-2 ${
              selectedProject === project.id ? "bg-[#FFCD4B] border-black" : "border-transparent hover:border-black"
            }`}
            onClick={() => {
              setSelectedProject(project.id)
              setSidebarOpen(false)
            }}
          >
            {project.icon}
            <span className="font-vt323 text-lg">{project.name}</span>
            {selectedProject === project.id && <ChevronRight className="w-4 h-4 ml-auto" />}
          </div>
        ))}
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-auto">
        <div className="p-2 bg-[#87CEEB] border-b-2 border-black font-vt323 text-lg font-bold flex justify-center">
          <span className="bg-[#FFCD4B] px-4 py-0.5 border-2 border-black uppercase">
            {projects.find((p) => p.id === selectedProject)?.name || "Projects"}
          </span>
        </div>
        <div className="bg-white min-h-0 overflow-y-auto">{renderProjectDetails()}</div>
      </div>
    </div>
  )
}
