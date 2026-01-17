import { ExternalLink, Github } from "lucide-react"
import { PORTFOLIO_DATA } from "@/lib/portfolio-data"
import Image from "next/image"

interface ProjectCardProps {
  project: typeof PORTFOLIO_DATA.projects[0]
  onOpenDetails: (project: typeof PORTFOLIO_DATA.projects[0]) => void
}

export default function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
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
      
      {/* LEFT: Preview Section - Actual Preview Link */}
      {project.link ? (
         <a 
           href={project.link} 
           target="_blank" 
           rel="noopener noreferrer"
           className="w-full md:w-56 bg-black border-b-2 md:border-b-0 md:border-r-2 border-black relative shrink-0 overflow-hidden group/preview cursor-pointer"
           title={`Visit ${project.name}`}
         >
           {/* Browser Toolbar Decoration */}
           <div className="absolute top-0 left-0 w-full h-6 bg-[#E0E0E0]/90 backdrop-blur-sm border-b-2 border-black flex items-center px-2 gap-1.5 z-10">
              <div className="w-2 h-2 rounded-full bg-red-400 border border-black/50" />
              <div className="w-2 h-2 rounded-full bg-yellow-400 border border-black/50" />
              <div className="w-2 h-2 rounded-full bg-green-400 border border-black/50" />
           </div>

           {/* Live Preview using Thum.io */}
           <div className="w-full h-full relative pt-6 bg-white">
              <Image 
                src={`https://image.thum.io/get/width/400/crop/600/noanimate/${project.link}`}
                alt={`${project.name} preview`}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover/preview:scale-110"
                unoptimized
              />
           </div>
           
           {/* Hover Overlay Icon */}
           <div className="absolute inset-0 bg-black/0 group-hover/preview:bg-black/20 transition-colors flex items-center justify-center pt-6 opacity-0 group-hover/preview:opacity-100">
               <ExternalLink className="text-white drop-shadow-md w-8 h-8" />
           </div>
         </a>
      ) : (
         /* Fallback for projects without links (e.g. CLI tools) */
         <div className="w-full md:w-56 bg-[#335DA1] border-b-2 md:border-b-0 md:border-r-2 border-black relative shrink-0 overflow-hidden flex flex-col items-center justify-center text-center p-4">
             <div className="w-16 h-16 rounded-full bg-[#FEDA45] border-2 border-black flex items-center justify-center shadow-lg mb-2">
               <span className="font-vt323 font-bold text-black text-xl uppercase">
                 {project.name.substring(0, 2)}
               </span>
            </div>
            <span className="font-vt323 text-white text-sm">No Live Preview</span>
         </div>
      )}

      {/* RIGHT: Content Section - Triggers Details Modal */}
      <div 
        onClick={() => onOpenDetails(project)}
        className="flex-1 p-5 flex flex-col justify-between cursor-pointer hover:bg-white/50 transition-colors"
      >
         <div className="space-y-3">
             <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-black text-2xl uppercase leading-none group-hover:text-[#335DA1] transition-colors">
                    {project.name}
                  </h3>
                   <span className="text-sm font-vt323 text-gray-500 flex items-center gap-1 mt-1">
                     {getDomain(project.link)}
                   </span>
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
            
            <span className="text-xs font-bold font-vt323 uppercase border-b border-black text-black">
               Read More &rarr;
            </span>
         </div>
      </div>
    </div>
  )
}
