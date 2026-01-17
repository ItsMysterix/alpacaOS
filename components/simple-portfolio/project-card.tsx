import { useRef, useEffect } from "react"
import { ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react"
import { PORTFOLIO_DATA } from "@/lib/portfolio-data"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface ProjectCardProps {
  project: typeof PORTFOLIO_DATA.projects[0]
  isExpanded: boolean
  onToggleExpand: () => void
}

export default function ProjectCard({ project, isExpanded, onToggleExpand }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Scroll to top when expanded
  useEffect(() => {
    if (isExpanded && cardRef.current) {
        // Small timeout to allow layout transition to start
        setTimeout(() => {
            cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
    }
  }, [isExpanded])

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
    <motion.div 
      ref={cardRef}
      layout
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`group border-2 border-black bg-[#E1F5FE] shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all duration-200 flex flex-col md:flex-row overflow-hidden ${
        isExpanded ? "h-auto bg-white scroll-mt-20" : "h-auto md:h-48 hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] scroll-mt-20"
      }`}
    >
      
      {/* LEFT: Preview Section - Hidden when Expanded */}
      <motion.div 
        layout="position"
        className={`relative shrink-0 overflow-hidden bg-black border-b-2 md:border-b-0 md:border-r-2 border-black transition-all duration-300 ${
          isExpanded ? "w-0 md:w-0 border-none" : "w-full md:w-56"
        }`}
      >
        {/* Browser Toolbar Decoration */}
        <div className="absolute top-0 left-0 w-full h-6 bg-[#E0E0E0]/90 backdrop-blur-sm border-b-2 border-black flex items-center px-2 gap-1.5 z-10">
           <div className="w-2 h-2 rounded-full bg-red-400 border border-black/50" />
           <div className="w-2 h-2 rounded-full bg-yellow-400 border border-black/50" />
           <div className="w-2 h-2 rounded-full bg-green-400 border border-black/50" />
        </div>

        {/* Live Preview using Thum.io */}
        <div className="w-full h-full relative pt-6 bg-white">
          {project.link ? (
               <Image 
                 src={`https://image.thum.io/get/width/400/crop/600/noanimate/${project.link}`}
                 alt={`${project.name} preview`}
                 fill
                 className={`object-cover object-top transition-transform duration-500 ${!isExpanded && "group-hover:scale-110"}`}
                 unoptimized
               />
          ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#335DA1] text-center p-4">
                 <div className="w-16 h-16 rounded-full bg-[#FEDA45] border-2 border-black flex items-center justify-center shadow-lg mb-2">
                   <span className="font-vt323 font-bold text-black text-xl uppercase">
                     {project.name.substring(0, 2)}
                   </span>
                </div>
                <span className="font-vt323 text-white text-sm">No Live Preview</span>
              </div>
          )}
        </div>
        
        {/* Only show External Link overlay if NOT expanded (since clicking opens it in expanded mode via title) */}
        {!isExpanded && project.link && (
           <a 
             href={project.link}
             target="_blank"
             rel="noopener noreferrer"
             className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pt-6 opacity-0 group-hover:opacity-100 z-20 cursor-pointer"
             title={`Visit ${project.name}`}
           >
               <ExternalLink className="text-white drop-shadow-md w-8 h-8" />
           </a>
        )}
      </motion.div>

      {/* RIGHT: Content Section */}
      <div 
        onClick={onToggleExpand}
        className="flex-1 p-5 flex flex-col cursor-pointer bg-inherit relative"
      >
         <motion.div layout="position" className="space-y-3">
             <div className="flex items-start justify-between">
                <div>
                  <h3 className={`font-bold text-black text-2xl uppercase leading-none transition-colors ${!isExpanded && "group-hover:text-[#335DA1]"}`}>
                    {project.name}
                  </h3>
                   <span className="text-sm font-vt323 text-gray-500 flex items-center gap-1 mt-1">
                     {getDomain(project.link)}
                   </span>
                </div>
                <div className="text-black/50">
                  {isExpanded ? <ChevronUp /> : <ChevronDown />}
                </div>
             </div>

             <p className="font-vt323 text-xl text-black leading-tight">
               {project.description}
             </p>
         </motion.div>

         {/* EXPANDED CONTENT: Features Points & Full Links */}
         <AnimatePresence>
            {isExpanded && (
               <motion.div 
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: "auto" }}
                 exit={{ opacity: 0, height: 0 }}
                 className="overflow-hidden"
               >
                  <div className="pt-6 border-t-2 border-black/10 mt-6 space-y-4">
                      
                      {/* Key Features Section */}
                      <div>
                        <h4 className="font-bold text-lg uppercase font-vt323 mb-2 bg-[#FEDA45] inline-block px-2 border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">Key Features</h4>
                        <ul className="space-y-2 list-none">
                            {project.features?.map((feature, idx) => (
                                <li key={idx} className="font-vt323 text-xl text-black/80 flex items-start gap-2">
                                   <span className="text-[#335DA1] font-bold text-2xl leading-none">&rsaquo;</span> 
                                   <span className="leading-snug">{feature}</span>
                                </li>
                            )) || (
                                <li className="font-vt323 text-lg text-gray-500 italic">No detailed features listed.</li>
                            )}
                        </ul>
                      </div>

                      {/* Links Section */}
                      <div className="flex gap-4 pt-4">
                          {project.link && (
                             <a 
                               href={project.link} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               onClick={(e) => e.stopPropagation()} // Prevent collapse
                               className="flex items-center gap-2 px-6 py-3 bg-[#335DA1] text-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all font-vt323 text-xl uppercase"
                             >
                                <ExternalLink size={20} /> Visit Deployment
                             </a>
                          )}
                      </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

         {/* Tech Tags */}
         <motion.div layout="position" className="flex items-center justify-between pt-4 mt-auto">
            <div className={`flex flex-wrap ${isExpanded ? "gap-2" : "gap-1.5"}`}>
               {project.tech.slice(0, isExpanded ? undefined : 3).map(t => (
                 <span key={t} className={`font-bold text-black bg-[#87CEEB] border border-black ${isExpanded ? "text-sm px-3 py-1" : "text-xs px-2 py-0.5"}`}>
                   {t}
                 </span>
               ))}
               {!isExpanded && project.tech.length > 3 && (
                 <span className="text-xs font-bold text-black px-1 py-0.5 self-center">...</span>
               )}
            </div>
            
            {!isExpanded && (
                <span className="text-xs font-bold font-vt323 uppercase border-b border-black text-black">
                   Read More &rarr;
                </span>
            )}
         </motion.div>
      </div>
    </motion.div>
  )
}
