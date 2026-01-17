import { ExternalLink, Github } from "lucide-react"
import { PORTFOLIO_DATA } from "@/lib/portfolio-data"

export default function ProjectCard({ project }: { project: typeof PORTFOLIO_DATA.projects[0] }) {
  return (
    <div className="group border-2 border-black bg-[#E1F5FE] p-6 shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all duration-200">
      <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2">
        <h3 className="text-3xl font-bold text-black group-hover:text-[#335DA1] transition-colors uppercase">
          {project.name}
        </h3>
        <div className="flex gap-4">
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#FF4B91] transition-colors border-2 border-transparent hover:border-black p-1">
              <ExternalLink size={24} />
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#FF4B91] transition-colors border-2 border-transparent hover:border-black p-1">
              <Github size={24} />
            </a>
          )}
        </div>
      </div>
      <p className="text-black text-xl mb-6 font-vt323">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map(t => (
          <span key={t} className="text-lg font-bold text-black bg-[#87CEEB] px-2 py-1 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
