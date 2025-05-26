"use client"
import { useState } from "react"
import { Folder, FileText, Code, ExternalLink, Github, ChevronRight, Menu, X } from "lucide-react"

export default function ProjectsContent() {
  const [selectedProject, setSelectedProject] = useState<string | null>("pulse")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const projects = [{ id: "pulse", name: "Pulse", icon: <Folder className="w-5 h-5 text-[#0802A3]" /> }]

  const renderProjectDetails = () => {
    switch (selectedProject) {
      case "pulse":
        return (
          <div className="space-y-4 p-4">
            <div className="bg-white p-3 rounded-none border-2 border-black">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <h3 className="font-vt323 text-xl font-bold text-[#FF4B91]">Pulse</h3>
                <p className="font-vt323 text-lg">Sept 2024 - Nov 2024</p>
              </div>
              <p className="font-vt323 text-lg mt-2">
                A microservices-based application with automated infrastructure and monitoring.
              </p>

              <ul className="list-disc list-inside space-y-2 mt-4">
                <li className="font-vt323 text-lg">
                  Automated infrastructure deployment using Docker and Jenkins, reducing manual setup time by 40% and
                  streamlining development pipelines.
                </li>
                <li className="font-vt323 text-lg">
                  Configured a CI/CD pipeline that facilitated 100% automated testing and integration, increasing
                  deployment efficiency by 35%.
                </li>
                <li className="font-vt323 text-lg">
                  Deployed microservices on AWS, scaling applications to handle 10,000+ concurrent users with load
                  balancers and auto-scaling.
                </li>
                <li className="font-vt323 text-lg">
                  Monitored application performance using Grafana and Prometheus, ensuring 99.9% uptime and improving
                  issue detection time by 20%.
                </li>
              </ul>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#0802A3]" />
                  <span className="font-vt323 text-lg">README.md</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-[#0802A3]" />
                  <span className="font-vt323 text-lg">docker-compose.yml</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-[#0802A3]" />
                  <span className="font-vt323 text-lg">Jenkinsfile</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-2 py-1 bg-[#FFCD4B] text-[#0802A3] text-xs font-medium rounded-none border-2 border-black">
                  Docker
                </span>
                <span className="px-2 py-1 bg-[#FFCD4B] text-[#0802A3] text-xs font-medium rounded-none border-2 border-black">
                  Jenkins
                </span>
                <span className="px-2 py-1 bg-[#FFCD4B] text-[#0802A3] text-xs font-medium rounded-none border-2 border-black">
                  AWS
                </span>
                <span className="px-2 py-1 bg-[#FFCD4B] text-[#0802A3] text-xs font-medium rounded-none border-2 border-black">
                  Grafana
                </span>
                <span className="px-2 py-1 bg-[#FFCD4B] text-[#0802A3] text-xs font-medium rounded-none border-2 border-black">
                  Prometheus
                </span>
                <span className="px-2 py-1 bg-[#FFCD4B] text-[#0802A3] text-xs font-medium rounded-none border-2 border-black">
                  CI/CD
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <a
                  href="#"
                  className="flex items-center justify-center gap-1 px-2 py-1 bg-[#FFCD4B] border-2 border-black text-[#0802A3]"
                >
                  <Github className="w-4 h-4" />
                  <span className="font-vt323 text-lg">Repository</span>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center gap-1 px-2 py-1 bg-[#FFCD4B] border-2 border-black text-[#0802A3]"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="font-vt323 text-lg">Live Demo</span>
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
