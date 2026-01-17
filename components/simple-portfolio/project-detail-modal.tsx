"use client"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Github, Terminal } from "lucide-react"
import type { PORTFOLIO_DATA } from "@/lib/portfolio-data"
import Image from "next/image"

interface ProjectDetailModalProps {
  project: typeof PORTFOLIO_DATA.projects[0] | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
           {/* Backdrop */}
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={onClose}
             className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
           />

           {/* Modal Card */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.9, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.9, y: 20 }}
             className="relative w-full max-w-2xl bg-[#E1F5FE] border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] z-10 flex flex-col max-h-[90vh] overflow-hidden"
           >
              {/* Header */}
              <div className="bg-[#335DA1] p-3 border-b-4 border-black flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                   <Terminal className="text-white w-6 h-6" />
                   <span className="text-white font-vt323 text-2xl uppercase tracking-wider">{project.name}.EXE</span>
                </div>
                <button 
                  onClick={onClose}
                  className="bg-red-500 hover:bg-red-600 text-white border-2 border-black p-1 transition-colors active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

               {/* Large Preview Image (If Link Exists) */}
               {project.link && (
                 <div className="w-full h-48 sm:h-64 bg-black border-b-4 border-black relative overflow-hidden group">
                    {/* Live Preview using Thum.io */}
                     <Image 
                       src={`https://image.thum.io/get/width/1200/crop/800/noanimate/${project.link}`}
                       alt={project.name}
                       fill
                       className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                       unoptimized // External URL
                     />
                     <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                 </div>
               )}

              {/* Content */}
              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar bg-white">
                 <div className="flex justify-between items-start mb-6">
                    <h2 className="text-4xl font-bold font-vt323 text-black uppercase">{project.name}</h2>
                    <div className="flex gap-3">
                       {project.github && (
                         <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-black bg-[#E0E0E0] hover:bg-white hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all" title="Source Code">
                            <Github className="w-6 h-6" />
                         </a>
                       )}
                       {project.link && (
                         <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-black bg-[#FEDA45] hover:bg-[#ffe585] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all" title="Visit Site">
                            <ExternalLink className="w-6 h-6" />
                         </a>
                       )}
                    </div>
                 </div>

                 <p className="font-vt323 text-2xl text-black leading-relaxed mb-8">
                   {project.description}
                 </p>

                 <div>
                    <h3 className="font-bold text-xl uppercase mb-3 font-vt323 border-b-2 border-black inline-block">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map(t => (
                        <span key={t} className="text-lg font-bold text-black bg-[#87CEEB] px-3 py-1 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                          {t}
                        </span>
                      ))}
                    </div>
                 </div>
              </div>
           </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
