"use client"
import { useState, useEffect, useRef } from "react"
import { FileText, Briefcase, GraduationCap, Code, ChevronRight, Download, Menu, X, Terminal, Cpu, Globe, Database } from "lucide-react"
import gsap from "gsap"

export default function ResumeContent() {
  const [selectedSection, setSelectedSection] = useState<string>("education")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const sections = [
    { id: "education", name: "Education", icon: <GraduationCap className="w-5 h-5" /> },
    { id: "experience", name: "Experience", icon: <Briefcase className="w-5 h-5" /> },
    { id: "projects", name: "Projects", icon: <Code className="w-5 h-5" /> },
    { id: "skills", name: "Skills", icon: <FileText className="w-5 h-5" /> },
  ]

  useEffect(() => {
    if (contentRef.current) {
      const items = contentRef.current.querySelectorAll(".resume-card")
      gsap.fromTo(items, 
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.5, ease: "back.out(1.2)" }
      )
    }
  }, [selectedSection])

  const renderContent = () => {
    switch (selectedSection) {
      case "education":
        return (
          <div className="space-y-4 p-6" ref={contentRef}>
            <div className="resume-card bg-white p-6 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              <h3 className="font-vt323 text-3xl font-bold text-[#4169E1]">Georgia State University</h3>
              <p className="font-vt323 text-xl text-black">Bachelor of Science in Computer Science</p>
              <div className="flex justify-between items-center mt-3 border-t border-gray-200 pt-3">
                <p className="font-vt323 text-lg text-gray-500 italic">Aug. 2022 – Dec. 2025 | Atlanta, GA</p>
                <p className="font-vt323 text-xl font-bold text-black bg-[#FFCD4B] px-2 border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">GPA 3.58/4.0</p>
              </div>
              <p className="font-vt323 text-lg mt-2 text-gray-700">Honors College Student | Dean&apos;s List (5 Semesters)</p>
            </div>
          </div>
        )
      case "experience":
        return (
          <div className="space-y-4 p-6" ref={contentRef}>
            {[
              {
                title: "Undergraduate Teaching Assistant",
                org: "Georgia State University",
                date: "Sept 2023 - Mar 2025",
                bullets: [
                  "Assisted 100+ students with debugging and code reviews.",
                  "Held weekly office hours for APIs and system design support.",
                  "Provided critical feedback on code quality for software engineering courses."
                ]
              },
              {
                title: "CS Tutor",
                org: "Honors College",
                date: "Sept 2023 - Present",
                bullets: [
                  "Providing technical guidance to honors students in core CS subjects.",
                  "Peer tutoring for Algorithms and Data Structures."
                ]
              },
              {
                title: "Student Assistant",
                org: "Patton Hall",
                date: "Aug 2023 - May 2024",
                bullets: [
                  "Managed administrative tasks and student community engagement.",
                  "Handled documentation and facility operations."
                ]
              }
            ].map((exp, idx) => (
              <div key={idx} className="resume-card bg-white p-5 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h3 className="font-vt323 text-2xl font-bold text-[#FF7676]">{exp.title}</h3>
                  <p className="font-vt323 text-lg text-gray-400">{exp.date}</p>
                </div>
                <p className="font-vt323 text-xl font-bold text-[#4169E1] mb-2">{exp.org}</p>
                <ul className="list-disc list-inside space-y-1">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="font-vt323 text-lg text-black">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )
      case "projects":
        return (
          <div className="space-y-4 p-6" ref={contentRef}>
            {[
              {
                name: "Slurpy - AI Companion",
                link: "slurpy.life",
                date: "Apr 2025 - Present",
                bullets: [
                  "Multi-persona AI chatbot fine-tuned with DistilBERT (89% accuracy).",
                  "Implemented RAG with Qdrant and Model Context Protocol.",
                  "Backend built with FastAPI and Supabase RLS."
                ]
              },
              {
                name: "Sarge - DevOps Monitoring",
                link: "v0-sarge.vercel.app",
                date: "Mar 2025 - May 2025",
                bullets: [
                  "Built self-service platform for infrastructure management.",
                  "Cloud emulation with Docker, Prometheus, and Grafana.",
                  "Unified monitoring across 3 microservices."
                ]
              }
            ].map((proj, idx) => (
              <div key={idx} className="resume-card bg-white p-5 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <div className="flex justify-between items-start gap-4 mb-1">
                  <h3 className="font-vt323 text-2xl font-bold text-[#4169E1]">{proj.name}</h3>
                  <p className="font-vt323 text-lg text-gray-400">{proj.date}</p>
                </div>
                <div className="mb-2">
                  <a href={`https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="font-vt323 text-lg text-blue-500 hover:underline">
                    {proj.link}
                  </a>
                </div>
                <ul className="list-disc list-inside space-y-1">
                  {proj.bullets.map((bullet, i) => (
                    <li key={i} className="font-vt323 text-lg text-black">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )
      case "skills":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6" ref={contentRef}>
            {[
              { category: "Languages", items: ["Python", "JS", "TS", "Java", "C#"] },
              { category: "Backend", items: ["FastAPI", "Node", "REST", "JWT", "GraphQL"] },
              { category: "Cloud & Ops", items: ["AWS", "Docker", "CI/CD", "Prometheus"] },
              { category: "ML & AI", items: ["NLP", "PyTorch", "RAG", "VectorDB"] },
            ].map((skill, idx) => (
              <div key={idx} className="resume-card bg-white p-4 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                <h3 className="font-vt323 text-xl font-bold text-[#FF7676] mb-2">{skill.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map(item => (
                    <span key={item} className="font-vt323 bg-[#87CEEB] border border-black px-2 py-0.5 text-black text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-full bg-[#F5F5F5]">
      {/* Mobile control bar */}
      <div className="md:hidden flex items-center justify-between p-2 bg-[#F8F1E7] border-b-2 border-black">
        <span className="font-vt323 text-black font-bold uppercase">Resume Explorer</span>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 border-2 border-black bg-white">
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        fixed md:relative inset-0 md:inset-auto z-20 md:z-0
        w-full md:w-64 bg-[#E0E0E0] border-r-2 border-black transition-transform duration-300
        flex flex-col
      `}>
        <div className="p-4 border-b-2 border-black bg-white">
          <h2 className="text-xl font-vt323 font-bold text-black uppercase flex items-center gap-2">
            <FileText className="w-5 h-5" /> Directory
          </h2>
        </div>
        <div className="flex-1 p-3 space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setSelectedSection(section.id)
                setSidebarOpen(false)
              }}
              className={`
                w-full text-left p-3 flex items-center gap-3 transition-all border-2 font-vt323 text-lg
                ${selectedSection === section.id 
                  ? "bg-[#FFCD4B] text-black border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] translate-x-1" 
                  : "bg-[#87CEEB] text-black border-black hover:bg-[#B0C4DE] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                }
              `}
            >
              {section.icon}
              {section.name}
            </button>
          ))}
        </div>
        <div className="p-4 border-t-2 border-black">
          <a
            href="/Arkaparna_Gantait_Resume.pdf"
            download
            className="flex items-center justify-center gap-2 p-3 bg-red-400 border-2 border-black text-white font-vt323 text-xl font-bold shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-red-500 transition-colors"
          >
            <Download className="w-5 h-5" /> DOWNLOAD PDF
          </a>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="sticky top-0 z-10 p-2 bg-white/80 backdrop-blur-md border-b-2 border-gray-300 flex justify-center">
          <div className="px-4 py-0.5 border-2 border-black bg-[#E0E0E0] text-black font-vt323 font-bold uppercase overflow-hidden whitespace-nowrap text-ellipsis max-w-[90%]">
            {sections.find(s => s.id === selectedSection)?.name}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">{renderContent()}</div>
        
        {/* Footer info bar */}
        <div className="p-2 bg-[#F8F1E7] border-t-2 border-black">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-black font-vt323 italic">
            <span className="font-bold underline">ARKAPARNA GANTAIT</span>
            <span>Atlanta, GA • 4706523218 • arkaparna.gantait@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  )
}
