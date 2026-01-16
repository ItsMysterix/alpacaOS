"use client"
import { useState } from "react"
import { Briefcase, Calendar } from "lucide-react"

export default function ExperienceContent() {
  const [selectedJob, setSelectedJob] = useState<string>("uta")

  const jobs = [
    { id: "uta", name: "TA Role", fullName: "Undergraduate Teaching Assistant", company: "Georgia State University", period: "Sep. 2023 – Mar. 2025" },
    { id: "tutor", name: "CS Tutor", fullName: "Computer Science Tutor", company: "Honors College", period: "Sept 2023 - Present" },
    { id: "assistant", name: "Asst. Role", fullName: "Student Assistant", company: "Patton Hall", period: "Aug 2023 - May 2024" },
  ]

  const renderJobDetails = () => {
    const job = jobs.find(j => j.id === selectedJob)
    if (!job) return null

    const content = {
      uta: (
        <div className="space-y-4">
          <div className="bg-white p-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center gap-3">
             <Calendar className="w-6 h-6 text-[#FF7676]" />
             <span className="font-vt323 text-xl">{job.period}</span>
          </div>
          <div className="bg-white p-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <h3 className="font-vt323 text-2xl font-bold underline mb-2 uppercase">Job Description</h3>
            <p className="font-vt323 text-xl text-black/80">
              Providing technical support and guidance to students in data structures and software engineering courses.
            </p>
          </div>
          <div className="bg-white p-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <h3 className="font-vt323 text-2xl font-bold underline mb-2 uppercase">Key Responsibilities</h3>
            <ul className="space-y-2">
               {[
                 "Assisted 100+ students with debugging, code reviews, and programming concepts.",
                 "Held weekly office hours for support on assignments and system design.",
                 "Graded assignments and provided feedback on code quality."
               ].map((item, i) => (
                 <li key={i} className="font-vt323 text-xl flex gap-3">
                    <span className="text-blue-500">{" >> "}</span> {item}
                 </li>
               ))}
            </ul>
          </div>
        </div>
      ),
      tutor: (
        <div className="space-y-4">
          <div className="bg-white p-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center gap-3">
             <Calendar className="w-6 h-6 text-[#FF7676]" />
             <span className="font-vt323 text-xl">{job.period}</span>
          </div>
          <div className="bg-white p-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <h3 className="font-vt323 text-2xl font-bold underline mb-2 uppercase">Core Mentorship</h3>
            <p className="font-vt323 text-xl text-black/80">
              Providing specialized academic support and technical guidance to honors students in Computer Science.
            </p>
          </div>
          <div className="bg-white p-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <h3 className="font-vt323 text-2xl font-bold underline mb-2 uppercase">Activities</h3>
            <ul className="space-y-2">
               {[
                 "Led peer tutoring sessions for core CS courses and advanced algorithms.",
                 "Assisted students in mastering system programming.",
                 "Facilitated study groups and provided individualized mentorship."
               ].map((item, i) => (
                 <li key={i} className="font-vt323 text-xl flex gap-3">
                    <span className="text-blue-500">{" >> "}</span> {item}
                 </li>
               ))}
            </ul>
          </div>
        </div>
      ),
      assistant: (
        <div className="space-y-4">
          <div className="bg-white p-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center gap-3">
             <Calendar className="w-6 h-6 text-[#FF7676]" />
             <span className="font-vt323 text-xl">{job.period}</span>
          </div>
          <div className="bg-white p-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <h3 className="font-vt323 text-2xl font-bold underline mb-2 uppercase">Operations Support</h3>
            <p className="font-vt323 text-xl text-black/80">
              Supporting administrative operations and student community engagement at GSU housing facilities.
            </p>
          </div>
          <div className="bg-white p-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <h3 className="font-vt323 text-2xl font-bold underline mb-2 uppercase">Responsibilities</h3>
            <ul className="space-y-2">
               {[
                 "Managed resident inquiries and administrative support.",
                 "Coordinated with housing staff for resident safety.",
                 "Handled resident documentation and community event planning."
               ].map((item, i) => (
                 <li key={i} className="font-vt323 text-xl flex gap-3">
                    <span className="text-blue-500">{" >> "}</span> {item}
                 </li>
               ))}
            </ul>
          </div>
        </div>
      )
    }

    return (
      <div className="p-6 overflow-y-auto h-full custom-scrollbar">
        <div className="mb-6">
           <h2 className="font-vt323 text-3xl font-bold text-black uppercase tracking-tight">{job.fullName}</h2>
           <p className="font-vt323 text-xl text-blue-600 font-bold">{job.company}</p>
        </div>
        {content[selectedJob as keyof typeof content]}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Navigation Arch-Tabs */}
      <div className="flex gap-2 p-2 bg-[#B3E5FC]/20 border-b-2 border-black shrink-0 overflow-x-auto no-scrollbar">
        {jobs.map((job) => (
          <button 
            key={job.id}
            onClick={() => setSelectedJob(job.id)}
            className={`
              px-6 py-2 font-vt323 text-xl border-2 border-black relative transition-all duration-150 uppercase tracking-tight whitespace-nowrap
              ${selectedJob === job.id 
                ? "bg-[#FEDA45] text-black shadow-[3px_3px_0px_rgba(0,0,0,1)] -translate-y-0.5 z-10 font-bold" 
                : "bg-[#88C8E1] text-black/60 hover:bg-white hover:text-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              }
            `}
          >
            {job.name}
            {selectedJob === job.id && (
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
          {renderJobDetails()}
        </div>
      </div>
    </div>
  )
}
