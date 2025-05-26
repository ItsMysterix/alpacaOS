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
              <p className="font-vt323 text-lg">Expected Graduation 2025</p>
              <p className="font-vt323 text-lg">Atlanta, GA</p>
              <p className="font-vt323 text-lg font-bold mt-2">GSU HONORS PROGRAM GPA 3.66/4</p>

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
                <h3 className="font-vt323 text-xl font-bold text-[#FF4B91]">Pulse</h3>
                <p className="font-vt323 text-lg">Sept 2024 - Nov 2024</p>
              </div>
              <ul className="list-disc list-inside space-y-2 mt-2">
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
            </div>

            <div className="bg-white p-4 border-2 border-black">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <h3 className="font-vt323 text-xl font-bold text-[#FF4B91]">CS Tutor, Honors College</h3>
                <p className="font-vt323 text-lg">Sept 2023 - Present</p>
              </div>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li className="font-vt323 text-lg">
                  Guided over 10 students in foundational computer science concepts, including algorithms, data
                  structures, and problem-solving, leading to improved academic performance.
                </li>
                <li className="font-vt323 text-lg">
                  Created personalized study plans and explained tricky concepts in a way that was easy to understand,
                  showing strong communication and mentoring skills.
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 border-2 border-black">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <h3 className="font-vt323 text-xl font-bold text-[#FF4B91]">Student Assistant, Patton Hall</h3>
                <p className="font-vt323 text-lg">Aug 2023 - May 2024</p>
              </div>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li className="font-vt323 text-lg">
                  Assisted students and parents with research resources and answered their questions, making the support
                  experience smoother and more effective.
                </li>
                <li className="font-vt323 text-lg">
                  Worked closely with a team to achieve and exceed goals for student services, demonstrating strong
                  collaboration and communication skills.
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
                <h3 className="font-vt323 text-xl font-bold text-[#FF4B91]">Portfolio Website</h3>
                <p className="font-vt323 text-lg">Jan 2024 - Apr 2024</p>
              </div>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li className="font-vt323 text-lg">
                  Built a portfolio website using TypeScript, Tailwind CSS, and Next.js, generating 50+ visitors monthly
                  to showcase personal projects.
                </li>
                <li className="font-vt323 text-lg">
                  Improved user engagement by 30% by integrating Framer Motion animations, delivering a smooth and
                  interactive experience.
                </li>
                <li className="font-vt323 text-lg">
                  Ensured cross-device compatibility with responsive design principles, achieving a seamless user
                  experience on desktops, tablets, and mobile devices.
                </li>
              </ul>
            </div>
          </div>
        )
      case "skills":
        return (
          <div className="space-y-4 p-4">
            <div className="bg-white p-4 border-2 border-black">
              <h3 className="font-vt323 text-xl font-bold text-[#FF4B91] mb-2">Languages</h3>
              <p className="font-vt323 text-lg">
                Python, HTML5, CSS3, Java, C/C++, JavaScript/TypeScript, PowerShell, Assembly, SQL, Scala
              </p>
            </div>

            <div className="bg-white p-4 border-2 border-black">
              <h3 className="font-vt323 text-xl font-bold text-[#FF4B91] mb-2">Frameworks & Libraries</h3>
              <p className="font-vt323 text-lg">Next.js, Node.js, Tailwind CSS, Framer Motion</p>
            </div>

            <div className="bg-white p-4 border-2 border-black">
              <h3 className="font-vt323 text-xl font-bold text-[#FF4B91] mb-2">Databases</h3>
              <p className="font-vt323 text-lg">MySQL, Firebase</p>
            </div>

            <div className="bg-white p-4 border-2 border-black">
              <h3 className="font-vt323 text-xl font-bold text-[#FF4B91] mb-2">Developer Tools</h3>
              <p className="font-vt323 text-lg">
                Wireshark, Jupyter Notebook, Git/GitHub, Figma, Visual Studio Code, Docker, Prometheus, Grafana
              </p>
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
            href="/resume.pdf"
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
