"use client"
import { useState } from "react"
import { FileText, Briefcase, GraduationCap, Code, ChevronRight, Download, Menu, X } from "lucide-react"

export default function ResumeContent() {
  const [selectedSection, setSelectedSection] = useState<string>("education")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const sections = [
    { id: "education", name: "Education", icon: <GraduationCap className="w-5 h-5 text-[#0802A3]" /> },
    { id: "experience", name: "Experience", icon: <Briefcase className="w-5 h-5 text-[#0802A3]" /> },
    { id: "projects", name: "Projects", icon: <Code className="w-5 h-5 text-[#0802A3]" /> },
    { id: "skills", name: "Skills", icon: <FileText className="w-5 h-5 text-[#0802A3]" /> },
  ]

  const renderContent = () => {
    switch (selectedSection) {
      case "education":
        return (
          <div className="space-y-4 p-4">
            <div className="bg-white p-4 border-2 border-black">
              <h3 className="font-vt323 text-xl font-bold text-[#FF4B91]">Georgia State University</h3>
              <p className="font-vt323 text-lg">Bachelor of Science in Computer Science</p>
              <p className="font-vt323 text-lg">Aug. 2022 – Dec. 2025</p>
              <p className="font-vt323 text-lg">Atlanta, GA</p>
              <p className="font-vt323 text-lg font-bold mt-2">GPA 3.58/4.0</p>
              <p className="font-vt323 text-lg mt-1 italic">Honors: Honors College Student, Dean's List (5 of 9 semesters)</p>

              <div className="mt-4">
                <p className="font-vt323 text-lg font-bold">Relevant Coursework:</p>
                <p className="font-vt323 text-lg">
                  Principles of Computer Science, Theoretical Foundation of Computer Science, Data Structures,
                  System-Level Programming, Designs and Analysis: Algorithms, Computer Org and Programming, Big Data
                  Programming, Software Development.
                </p>
              </div>
            </div>
          </div>
        )
      case "experience":
        return (
          <div className="space-y-4 p-4">
            <div className="bg-white p-4 border-2 border-black">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <h3 className="font-vt323 text-xl font-bold text-[#FF4B91]">Undergraduate Teaching Assistant</h3>
                <p className="font-vt323 text-lg">Sept 2023 - Mar 2025</p>
              </div>
              <p className="font-vt323 text-lg font-bold">Georgia State University</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li className="font-vt323 text-lg">
                  Assisted 100+ students with debugging, code reviews, and programming concepts in data structures and
                  software engineering.
                </li>
                <li className="font-vt323 text-lg">
                  Held weekly office hours for support on assignments, backend concepts, APIs, and system design.
                </li>
                <li className="font-vt323 text-lg">Graded assignments and provided feedback on code quality.</li>
              </ul>
            </div>

            <div className="bg-white p-4 border-2 border-black">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <h3 className="font-vt323 text-xl font-bold text-[#FF4B91]">CS Tutor</h3>
                <p className="font-vt323 text-lg">Sept 2023 - Present</p>
              </div>
              <p className="font-vt323 text-lg font-bold">Honors College</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li className="font-vt323 text-lg">
                  Providing academic support and technical guidance to honors students in Computer Science.
                </li>
                <li className="font-vt323 text-lg">
                  Peer tutoring for core courses like Algorithms, Data Structures, and Theoretical Foundations.
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 border-2 border-black">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <h3 className="font-vt323 text-xl font-bold text-[#FF4B91]">Student Assistant</h3>
                <p className="font-vt323 text-lg">Aug 2023 - May 2024</p>
              </div>
              <p className="font-vt323 text-lg font-bold">Patton Hall</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li className="font-vt323 text-lg">
                  Assisted with administrative tasks and student community engagement at GSU housing facilities.
                </li>
                <li className="font-vt323 text-lg">
                  Managed resident inquiries and documentation to ensure efficient facility operation.
                </li>
              </ul>
            </div>
          </div>
        )
      case "projects":
        return (
          <div className="space-y-4 p-4">
            <div className="bg-white p-4 border-2 border-black">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <h3 className="font-vt323 text-xl font-bold text-[#FF4B91]">Slurpy - AI Mental Health Companion</h3>
                <p className="font-vt323 text-lg">Apr 2025 - Present</p>
              </div>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li className="font-vt323 text-lg">Deployed a multi-persona AI chatbot for 50+ users.</li>
                <li className="font-vt323 text-lg">Fine-tuned DistilBERT for 89% emotion detection accuracy.</li>
                <li className="font-vt323 text-lg">
                  Implemented RAG using Qdrant and Model Context Protocol for reduced latency.
                </li>
                <li className="font-vt323 text-lg">Developed backend using FastAPI and Supabase with JWT and RLS.</li>
              </ul>
            </div>

            <div className="bg-white p-4 border-2 border-black">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <h3 className="font-vt323 text-xl font-bold text-[#FF4B91]">Sarge - DevOps Monitoring Platform</h3>
                <p className="font-vt323 text-lg">Mar 2025 - May 2025</p>
              </div>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li className="font-vt323 text-lg">
                  Built a self-service platform for infrastructure management from GitHub repositories.
                </li>
                <li className="font-vt323 text-lg">
                  Implemented AWS-like cloud emulation and CI/CD monitoring with Docker, Prometheus, and Grafana.
                </li>
                <li className="font-vt323 text-lg">Unified management and monitoring across 3 Dockerized microservices.</li>
              </ul>
            </div>

            <div className="bg-white p-4 border-2 border-black">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <h3 className="font-vt323 text-xl font-bold text-[#FF4B91]">Notoria - Academic Mobile App</h3>
                <p className="font-vt323 text-lg">Jan 2024 - Apr 2025</p>
              </div>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li className="font-vt323 text-lg">
                  Developed a Flutter and Firebase mobile app with role-based access control.
                </li>
                <li className="font-vt323 text-lg">
                  Enabled real-time collaboration through shared notes and Discord-style communication.
                </li>
              </ul>
            </div>
          </div>
        )
      case "skills":
        return (
          <div className="space-y-4 p-4">
            <div className="bg-white p-4 border-2 border-black">
              <h3 className="font-vt323 text-xl font-bold text-[#FF4B91] mb-2">Programming Languages</h3>
              <p className="font-vt323 text-lg">Python, JavaScript, TypeScript, Java, C#</p>
            </div>

            <div className="bg-white p-4 border-2 border-black">
              <h3 className="font-vt323 text-xl font-bold text-[#FF4B91] mb-2">Backend & APIs</h3>
              <p className="font-vt323 text-lg">FastAPI, Node.js, Express.js, REST, WebSockets, JWT, GraphQL, tRPC</p>
            </div>

            <div className="bg-white p-4 border-2 border-black">
              <h3 className="font-vt323 text-xl font-bold text-[#FF4B91] mb-2">Frontend & Mobile</h3>
              <p className="font-vt323 text-lg">React, Next.js, Vue.js, Flutter</p>
            </div>

            <div className="bg-white p-4 border-2 border-black">
              <h3 className="font-vt323 text-xl font-bold text-[#FF4B91] mb-2">AI & Machine Learning</h3>
              <p className="font-vt323 text-lg">NLP, LLMs, DistilBERT, PyTorch, HuggingFace, RAG, Vector Databases</p>
            </div>

            <div className="bg-white p-4 border-2 border-black">
              <h3 className="font-vt323 text-xl font-bold text-[#FF4B91] mb-2">DevOps & Cloud</h3>
              <p className="font-vt323 text-lg">
                AWS (EC2, S3, Lambda), Docker, GitHub Actions, CI/CD, Prometheus, Grafana, Nginx
              </p>
            </div>

            <div className="bg-white p-4 border-2 border-black">
              <h3 className="font-vt323 text-xl font-bold text-[#FF4B91] mb-2">Databases & Storage</h3>
              <p className="font-vt323 text-lg">PostgreSQL, MongoDB, Supabase, NeonDB, Firebase, Qdrant, Redis</p>
            </div>

            <div className="bg-white p-4 border-2 border-black">
              <h3 className="font-vt323 text-xl font-bold text-[#FF4B91] mb-2">Testing & Tools</h3>
              <p className="font-vt323 text-lg">Jest, Playwright, PyTest, TDD, Git, Linux, VS Code</p>
            </div>
          </div>
        )
      default:
        return <div className="p-4 font-vt323 text-lg">Select a section to view details</div>
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

        {sections.map((section) => (
          <div
            key={section.id}
            className={`flex items-center gap-2 p-2 cursor-pointer rounded border-2 mb-2 ${
              selectedSection === section.id ? "bg-[#FFCD4B] border-black" : "border-transparent hover:border-black"
            }`}
            onClick={() => {
              setSelectedSection(section.id)
              setSidebarOpen(false)
            }}
          >
            {section.icon}
            <span className="font-vt323 text-lg">{section.name}</span>
            {selectedSection === section.id && <ChevronRight className="w-4 h-4 ml-auto" />}
          </div>
        ))}

        <div className="mt-6">
          <a
            href="/Arkaparna_Gantait_Resume.pdf"
            download
            className="flex items-center gap-2 p-2 bg-[#FFCD4B] border-2 border-black rounded-none cursor-pointer"
          >
            <Download className="w-5 h-5 text-[#0802A3]" />
            <span className="font-vt323 text-lg font-bold">Download PDF</span>
          </a>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-auto">
        <div className="p-2 bg-[#87CEEB] border-b-2 border-black font-vt323 text-lg font-bold flex justify-center">
          <span className="bg-[#FFCD4B] px-4 py-0.5 border-2 border-black uppercase">
            {sections.find((s) => s.id === selectedSection)?.name || "Resume"}
          </span>
        </div>
        <div className="bg-white min-h-0 overflow-y-auto">{renderContent()}</div>

        {/* Contact info footer */}
        <div className="p-3 bg-[#87CEEB] border-t-2 border-black">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <p className="font-vt323 text-lg">
              <span className="font-bold">Arkaparna Gantait</span>
            </p>
            <p className="font-vt323 text-lg">Atlanta, GA • 4706523218 • arkaparna.90@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
