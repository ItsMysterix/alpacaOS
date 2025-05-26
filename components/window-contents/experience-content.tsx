"use client"
import { useState } from "react"
import { Briefcase, Calendar, ChevronRight, Menu, X } from "lucide-react"

export default function ExperienceContent() {
  const [selectedJob, setSelectedJob] = useState<string | null>("tutor")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const jobs = [
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
      case "tutor":
        return (
          <div className="space-y-4 p-4">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5 text-[#FF7676]" />
              <span className="font-vt323 text-lg">Sept 2023 - Present</span>
            </div>

            <div className="bg-white p-3 rounded-none border-2 border-black">
              <h3 className="font-vt323 text-xl font-bold">Job Description</h3>
              <p className="font-vt323 text-lg mt-2">
                Provided tutoring and academic support to students in computer science courses.
              </p>
            </div>

            <div className="bg-white p-3 rounded-none border-2 border-black">
              <h3 className="font-vt323 text-xl font-bold">Key Achievements</h3>
              <ul className="list-disc list-inside space-y-1 mt-2">
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

            <div className="bg-white p-3 rounded-none border-2 border-black">
              <h3 className="font-vt323 text-xl font-bold">Technologies Used</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 bg-[#FFCD4B] text-[#0802A3] text-xs font-medium rounded-none border-black border-2">
                  Python
                </span>
                <span className="px-2 py-1 bg-[#FFCD4B] text-[#0802A3] text-xs font-medium rounded-none border-black border-2">
                  Java
                </span>
                <span className="px-2 py-1 bg-[#FFCD4B] text-[#0802A3] text-xs font-medium rounded-none border-black border-2">
                  C++
                </span>
                <span className="px-2 py-1 bg-[#FFCD4B] text-[#0802A3] text-xs font-medium rounded-none border-black border-2">
                  Data Structures
                </span>
                <span className="px-2 py-1 bg-[#FFCD4B] text-[#0802A3] text-xs font-medium rounded-none border-black border-2">
                  Algorithms
                </span>
              </div>
            </div>
          </div>
        )
      case "assistant":
        return (
          <div className="space-y-4 p-4">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5 text-[#FF7676]" />
              <span className="font-vt323 text-lg">Aug 2023 - May 2024</span>
            </div>

            <div className="bg-white p-3 rounded-none border-2 border-black">
              <h3 className="font-vt323 text-xl font-bold">Job Description</h3>
              <p className="font-vt323 text-lg mt-2">Provided administrative and research support at Patton Hall.</p>
            </div>

            <div className="bg-white p-3 rounded-none border-2 border-black">
              <h3 className="font-vt323 text-xl font-bold">Key Achievements</h3>
              <ul className="list-disc list-inside space-y-1 mt-2">
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

            <div className="bg-white p-3 rounded-none border-2 border-black">
              <h3 className="font-vt323 text-xl font-bold">Skills Developed</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 bg-[#FFCD4B] text-[#0802A3] text-xs font-medium rounded-none border-black border-2">
                  Research
                </span>
                <span className="px-2 py-1 bg-[#FFCD4B] text-[#0802A3] text-xs font-medium rounded-none border-black border-2">
                  Communication
                </span>
                <span className="px-2 py-1 bg-[#FFCD4B] text-[#0802A3] text-xs font-medium rounded-none border-black border-2">
                  Teamwork
                </span>
                <span className="px-2 py-1 bg-[#FFCD4B] text-[#0802A3] text-xs font-medium rounded-none border-black border-2">
                  Problem Solving
                </span>
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
