"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Cpu } from "lucide-react"
import { PORTFOLIO_DATA } from "@/lib/portfolio-data"
import InkCursor from "./ink-cursor"
import SocialLinks from "./social-links"
import ProjectCard from "./project-card"
import LetsTalk from "./lets-talk"

interface SimpleLandingProps {
  onEnterOS: () => void
}

export default function SimpleLanding({ onEnterOS }: SimpleLandingProps) {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHoveringBlue, setIsHoveringBlue] = useState(false)
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div 
      ref={containerRef}
      className="h-screen w-full bg-[#335DA1] text-white font-vt323 selection:bg-[#FEDA45] selection:text-black overflow-y-auto overflow-x-hidden cursor-none"
      onMouseEnter={() => setIsHoveringBlue(true)}
      onMouseLeave={() => setIsHoveringBlue(false)}
    >
      <InkCursor containerRef={containerRef} isHoveringBlue={isHoveringBlue} />

      {/* OS Trigger - Top Right */}
      <motion.button
        onClick={onEnterOS}
        className="fixed top-4 right-4 z-50 group bg-[#E1F5FE] text-black border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all duration-200 py-2 px-4 flex items-center gap-2 rounded-lg active:scale-95"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Cpu className="w-5 h-5" />
        <span className="hidden md:inline font-bold uppercase tracking-tight">Enter Interactive OS</span>
        <span className="md:hidden font-bold uppercase tracking-tight">OS Mode</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </motion.button>

      {/* Main Content Container */}
      <motion.div 
        className="max-w-3xl mx-auto px-6 py-12 md:py-20 pb-40 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header / Intro */}
        <motion.div variants={itemVariants} className="mb-16 md:mb-20">
          <div className="w-24 h-24 bg-[#FEDA45] border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] mb-8 flex items-center justify-center">
             {/* Initials with VT323 font */}
             <div className="text-4xl font-bold text-black font-vt323">
               AG
             </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">
            Hi, I'm <span className="bg-[#FEDA45] text-black px-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] inline-block transform -rotate-1">Arkaparna Gantait</span>. <br />
            I'm a {PORTFOLIO_DATA.personal.role} building scalable web applications and AI solutions.
          </h1>

          {/* Social Links - Static Header */}
          <SocialLinks 
            github={PORTFOLIO_DATA.socials.github} 
            linkedin={PORTFOLIO_DATA.socials.linkedin} 
            email={PORTFOLIO_DATA.personal.email} 
            resume="/resume.pdf"
          />
          
          <div className="p-6 border-2 border-black bg-[#E1F5FE] shadow-[6px_6px_0px_rgba(0,0,0,1)] relative mt-8">
            <p className="text-xl md:text-2xl text-black leading-relaxed font-vt323">
              {PORTFOLIO_DATA.personal.about}
            </p>
          </div>
        </motion.div>


        {/* Projects */}
        <motion.div variants={itemVariants} className="mb-16 md:mb-20">
          <h2 className="text-3xl font-bold text-[#FEDA45] bg-black inline-block px-3 py-1 mb-8 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
            PROJECTS
          </h2>
          <div className="grid gap-8">
            {PORTFOLIO_DATA.projects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                isExpanded={expandedProjectId === project.id}
                onToggleExpand={() => setExpandedProjectId(curr => curr === project.id ? null : project.id)}
              />
            ))}
          </div>
        </motion.div>

        {/* Footer / Contact */}
        <motion.div variants={itemVariants} className="mb-12">
           <h2 className="text-3xl font-bold text-[#FEDA45] bg-black inline-block px-3 py-1 mb-6 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
            LET'S TALK
          </h2>
          <p className="text-xl text-white/90 mb-6 font-vt323">
            I'm currently open to new opportunities. Feel free to reach out.
          </p>
          <LetsTalk />
        </motion.div>

      </motion.div>
    </div>
  )
}
