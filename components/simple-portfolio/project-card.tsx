import { ExternalLink, Github } from "lucide-react"
import { PORTFOLIO_DATA } from "@/lib/portfolio-data"

export default function ProjectCard({ project }: { project: typeof PORTFOLIO_DATA.projects[0] }) {
  // Extract domain for display
  const getDomain = (url: string | null) => {
    if (!url) return "Deployment"
    try {
      return new URL(url).hostname
    } catch {
      return "External Link"
    }
  }

  return (
    <div className="group border-2 border-black bg-[#E1F5FE] shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all duration-200 flex flex-col md:flex-row overflow-hidden h-auto md:h-48">
      
      {/* LEFT: Preview Section (Mock Browser Window) */}
      <div className="w-full md:w-56 bg-[#335DA1] border-b-2 md:border-b-0 md:border-r-2 border-black relative shrink-0 overflow-hidden flex flex-col group-hover:bg-[#3d6cae] transition-colors">
         {/* Browser Toolbar */}
         <div className="h-6 bg-[#E0E0E0] border-b-2 border-black flex items-center px-2 gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-400 border border-black/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-400 border border-black/50" />
            <div className="w-2 h-2 rounded-full bg-green-400 border border-black/50" />
         </div>
         {/* Content Preview Placeholder */}
         <div className="flex-1 p-3 flex items-center justify-center relative">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:8px_8px]" />
            <div className="w-16 h-16 rounded-full bg-[#FEDA45] border-2 border-black flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
               <span className="font-vt323 font-bold text-black text-xl uppercase">
                 {project.name.substring(0, 2)}
               </span>
            </div>
         </div>
      </div>

      {/* RIGHT: Content Section */}
      <div className="flex-1 p-5 flex flex-col justify-between">
         <div className="space-y-3">
             <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-black text-2xl uppercase leading-none group-hover:text-[#335DA1] transition-colors">
                    {project.name}
                  </h3>
                   <a 
                     href={project.link || "#"} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-sm font-vt323 text-gray-600 hover:underline flex items-center gap-1 mt-1"
                   >
                     {getDomain(project.link)} <ExternalLink size={12} />
                   </a>
                </div>
             </div>

             <p className="font-vt323 text-xl text-black leading-tight line-clamp-3">
               {project.description}
             </p>
         </div>

         <div className="flex items-center justify-between pt-auto mt-2">
            <div className="flex flex-wrap gap-1.5">
               {project.tech.slice(0, 3).map(t => (
                 <span key={t} className="text-xs font-bold text-black bg-[#87CEEB] px-2 py-0.5 border border-black">
                   {t}
                 </span>
               ))}
               {project.tech.length > 3 && (
                 <span className="text-xs font-bold text-black px-1 py-0.5 self-center">...</span>
               )}
            </div>
            
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-black hover:text-[#FF4B91] transition-colors p-1"
                title="View Source"
              >
                <Github size={20} />
              </a>
            )}
         </div>
      </div>
    </div>
  )
}
