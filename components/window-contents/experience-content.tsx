"use client"
import { useState } from "react"
import { Briefcase, Calendar, ChevronRight, Menu, X } from "lucide-react"

export default function ExperienceContent() {
  const [selectedJob, setSelectedJob] = useState<string | null>("uta")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const jobs = [
    {
      id: "uta",
      name: "Undergraduate Teaching Assistant",
      company: "Georgia State University",
      period: "Sep. 2023 – Mar. 2025",
      icon: <Briefcase className="w-5 h-5 text-[#FF7676]" />,
    },
    {
      id: "tutor",
      name: "CS Tutor",
      company: "Honors College",
      period: "Sept 2023 - Present",
      icon: <Briefcase className="w-5 h-5 text-[#FF7676]" />,
    },
    {
      id: "assistant",
      name: "Student Assistant",
      company: "Patton Hall",
      period: "Aug 2023 - May 2024",
      icon: <Briefcase className="w-5 h-5 text-[#FF7676]" />,
    },
  ]

  const renderJobDetails = () => {
    switch (selectedJob) {
      case "uta":
        return (
          <div className="space-y-4 p-4">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5 text-[#FF7676]" />
              <span className="font-vt323 text-lg">Sep. 2023 – Mar. 2025</span>
            </div>

            <div className="bg-white p-3 rounded-none border-2 border-black">
              <h3 className="font-vt323 text-xl font-bold">Job Description</h3>
              <p className="font-vt323 text-lg mt-2">
                Providing technical support and guidance to students in data structures and software engineering courses.
              </p>
            </div>

            <div className="bg-white p-3 rounded-none border-2 border-black">
              <h3 className="font-vt323 text-xl font-bold">Key Responsibilities</h3>
              <ul className="list-disc list-inside space-y-1 mt-2">
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

            <div className="bg-white p-3 rounded-none border-2 border-black">
              <h3 className="font-vt323 text-xl font-bold">Skills Shared</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Debugging", "Code Review", "Data Structures", "Software Engineering", "System Design", "APIs"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-[#FFCD4B] text-[#0802A3] text-xs font-medium rounded-none border-black border-2"
                    >
                      {skill}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        )
      case "tutor":
        return (
          <div className="space-y-4 p-4">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5 text-[#FF7676]" />
              <span className="font-vt323 text-lg">Sep. 2023 – Present</span>
            </div>

            <div className="bg-white p-3 rounded-none border-2 border-black">
              <h3 className="font-vt323 text-xl font-bold">Job Description</h3>
              <p className="font-vt323 text-lg mt-2">
                Providing specialized academic support and technical guidance to honors students in Computer Science.
              </p>
            </div>

            <div className="bg-white p-3 rounded-none border-2 border-black">
              <h3 className="font-vt323 text-xl font-bold">Key Responsibilities</h3>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li className="font-vt323 text-lg">
                  Led peer tutoring sessions for core CS courses, focusing on advanced algorithms and data structures.
                </li>
                <li className="font-vt323 text-lg">
                  Assisted students in mastering system programming and theoretical foundations of computer science.
                </li>
                <li className="font-vt323 text-lg">
                  Facilitated study groups and provided individualized mentorship for project development.
                </li>
              </ul>
            </div>

            <div className="bg-white p-3 rounded-none border-2 border-black">
              <h3 className="font-vt323 text-xl font-bold">Skills Shared</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Mentorship", "Algorithms", "Data Structures", "Peer Education", "Problem Solving"].map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-[#FFCD4B] text-[#0802A3] text-xs font-medium rounded-none border-black border-2"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )
      case "assistant":
        return (
          <div className="space-y-4 p-4">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5 text-[#FF7676]" />
              <span className="font-vt323 text-lg">Aug. 2023 – May 2024</span>
            </div>

            <div className="bg-white p-3 rounded-none border-2 border-black">
              <h3 className="font-vt323 text-xl font-bold">Job Description</h3>
              <p className="font-vt323 text-lg mt-2">
                Supporting administrative operations and student community engagement at GSU housing facilities.
              </p>
            </div>

            <div className="bg-white p-3 rounded-none border-2 border-black">
              <h3 className="font-vt323 text-xl font-bold">Key Responsibilities</h3>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li className="font-vt323 text-lg">
                  Managed resident inquiries and provided administrative support for facility management.
                </li>
                <li className="font-vt323 text-lg">
                  Coordinated with housing staff to ensure a safe and supportive living environment for students.
                </li>
                <li className="font-vt323 text-lg">
                  Leveraging organizational skills to handle resident documentation and community event planning.
                </li>
              </ul>
            </div>

            <div className="bg-white p-3 rounded-none border-2 border-black">
              <h3 className="font-vt323 text-xl font-bold">Skills Shared</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Administration", "Communication", "Conflict Resolution", "Organization", "Support"].map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-[#FFCD4B] text-[#0802A3] text-xs font-medium rounded-none border-black border-2"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )
      default:
        return <div className="p-4 font-vt323 text-lg">Select a job to view details</div>
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

        {jobs.map((job) => (
          <div
            key={job.id}
            className={`flex items-center gap-2 p-2 cursor-pointer rounded border-2 mb-2 ${
              selectedJob === job.id ? "bg-[#FFCD4B] border-black" : "border-transparent hover:border-black"
            }`}
            onClick={() => {
              setSelectedJob(job.id)
              setSidebarOpen(false)
            }}
          >
            {job.icon}
            <div className="flex-1 overflow-hidden">
              <span className="font-vt323 text-lg block truncate">{job.name}</span>
              <span className="font-vt323 text-sm block truncate text-gray-600">{job.company}</span>
            </div>
            {selectedJob === job.id && <ChevronRight className="w-4 h-4 ml-auto" />}
          </div>
        ))}
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-auto">
        <div className="p-2 bg-[#87CEEB] border-b-2 border-black font-vt323 text-lg font-bold flex justify-center">
          <span className="bg-[#FFCD4B] px-4 py-0.5 border-2 border-black uppercase">
            {jobs.find((j) => j.id === selectedJob)?.name || "Experience"}
            {selectedJob && <span className="text-gray-600"> @ {jobs.find((j) => j.id === selectedJob)?.company}</span>}
          </span>
        </div>
        <div className="bg-white min-h-0 overflow-y-auto">{renderJobDetails()}</div>
      </div>
    </div>
  )
}
