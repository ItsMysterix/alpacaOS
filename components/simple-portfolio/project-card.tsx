import { ExternalLink, Github, GitBranch, Globe, Circle } from "lucide-react"
import { PORTFOLIO_DATA } from "@/lib/portfolio-data"

export default function ProjectCard({ project }: { project: typeof PORTFOLIO_DATA.projects[0] }) {
  // Helper to extract domain from URL
  const getDomain = (url: string | null) => {
    if (!url) return "n/a"
    try {
      return new URL(url).hostname
    } catch {
      return url
    }
  }

  return (
    <div className="group border-2 border-black bg-[#111] p-0 shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all duration-200 flex flex-col md:flex-row overflow-hidden max-w-4xl w-full">
      {/* Visual Preview Section (Left/Top) */}
      <div className="w-full md:w-[280px] h-[200px] md:h-auto bg-[#335DA1] relative border-b-2 md:border-b-0 md:border-r-2 border-black flex items-center justify-center shrink-0 group-hover:bg-[#3d6bb3] transition-colors">
         {/* Placeholder Circle - Mimicking the user reference image */}
         <div className="w-24 h-24 rounded-full bg-[#E88B66] shadow-inner" />
         
         {/* Live Indicator (Vercel Style) */}
         <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
            <div className="w-2 h-2 rounded-full bg-[#50E3C2] animate-pulse" />
         </div>
      </div>

      {/* Info Section (Right/Bottom) - Vercel Dashboard Style */}
      <div className="flex-1 p-5 md:p-6 flex flex-col justify-between bg-[#0A0A0A] text-gray-300">
         
         <div className="space-y-6">
            <div className="flex justify-between items-start">
               <div>
                 <h3 className="font-bold text-white text-xl md:text-2xl mb-1 flex items-center gap-2 group-hover:text-[#FEDA45] transition-colors">
                   {project.name}
                 </h3>
                 <a 
                   href={project.link || "#"} 
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-sm font-vt323 text-gray-400 hover:text-white hover:underline decoration-1 underline-offset-4 flex items-center gap-1"
                 >
                   {getDomain(project.link)} <ExternalLink size={12} />
                 </a>
               </div>
               
               <div className="flex gap-2">
                 {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/10 rounded-md transition-colors text-white border border-white/10" title="View Source">
                       <Github size={18} />
                    </a>
                 )}
               </div>
            </div>

            {/* Simulated Deployment Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm font-vt323">
               <div>
                  <span className="text-gray-500 uppercase text-xs tracking-wider block mb-1">Status</span>
                  <div className="flex items-center gap-2 text-white">
                     <span className="w-2 h-2 rounded-full bg-[#50E3C2] inline-block shadow-[0_0_8px_#50E3C2]" />
                     Please Deployed
                  </div>
               </div>
               <div>
                  <span className="text-gray-500 uppercase text-xs tracking-wider block mb-1">Created</span>
                  <div className="text-white">
                     2m ago by <span className="flex items-center gap-1 inline-flex align-middle"><img src="/images/pixel-alpaca.png" className="w-4 h-4 rounded-full border border-gray-600" /> ItsMysterix</span>
                  </div>
               </div>
               <div className="col-span-1 sm:col-span-2">
                  <span className="text-gray-500 uppercase text-xs tracking-wider block mb-1">Source</span>
                   <div className="flex items-center gap-2 text-white font-mono text-xs">
                     <GitBranch size={14} />
                     <span>main</span>
                     <span className="text-gray-600 mx-1">-</span>
                     <span className="truncate max-w-[200px] text-gray-400">{project.description}</span>
                   </div>
               </div>
            </div>
         </div>

         {/* Tech Stack Pills at Bottom */}
         <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-2">
           {project.tech.map(t => (
             <span key={t} className="text-xs font-bold text-[#335DA1] bg-[#335DA1]/10 px-2 py-1 rounded border border-[#335DA1]/30">
               {t}
             </span>
           ))}
         </div>

      </div>
    </div>
  )
}
