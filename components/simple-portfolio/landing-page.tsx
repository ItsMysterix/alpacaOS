"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, Terminal, Cpu } from "lucide-react"
import { PORTFOLIO_DATA } from "@/lib/portfolio-data"

interface SimpleLandingProps {
  onEnterOS: () => void
}

export default function SimpleLanding({ onEnterOS }: SimpleLandingProps) {
  const [mounted, setMounted] = useState(false)

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
    <div className="h-screen w-full bg-[#335DA1] text-white font-vt323 selection:bg-[#FEDA45] selection:text-black overflow-y-auto overflow-x-hidden">
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
        className="max-w-3xl mx-auto px-6 py-12 md:py-20 pb-40"
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
          <div className="flex flex-wrap gap-3 mb-8">
            <a href={PORTFOLIO_DATA.socials.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-black/20 hover:bg-black/40 border border-white/20 px-3 py-1.5 rounded-lg transition-colors text-white">
              <Github size={18} /> <span className="text-lg">GitHub</span>
            </a>
            <a href={PORTFOLIO_DATA.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-black/20 hover:bg-black/40 border border-white/20 px-3 py-1.5 rounded-lg transition-colors text-white">
              <Linkedin size={18} /> <span className="text-lg">LinkedIn</span>
            </a>
            <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="flex items-center gap-2 bg-black/20 hover:bg-black/40 border border-white/20 px-3 py-1.5 rounded-lg transition-colors text-white">
              <Mail size={18} /> <span className="text-lg">Email</span>
            </a>
          </div>
          
          <div className="p-6 border-2 border-black bg-[#E1F5FE] shadow-[6px_6px_0px_rgba(0,0,0,1)] relative mt-8">
            <p className="text-xl md:text-2xl text-black leading-relaxed font-vt323">
              {PORTFOLIO_DATA.personal.about}
            </p>
          </div>
        </motion.div>

        {/* What I do */}
        <motion.div variants={itemVariants} className="mb-16 md:mb-20">
          <h2 className="text-3xl font-bold text-[#FEDA45] bg-black inline-block px-3 py-1 mb-8 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
            WHAT I DO
          </h2>
          <div className="space-y-6 text-white text-xl md:text-2xl leading-relaxed">
            <p>
              I help technical teams and startups build digital products from scratch or improve existing ones. 
              Whether you're building a <strong className="text-[#FEDA45]">SaaS platform</strong>, <strong className="text-[#FF4B91]">AI integration</strong>, or <strong className="text-[#87CEEB]">Developer Tool</strong>, 
              I write clean, maintainable code across the full stack.
            </p>
            <p>
              From architecting backend systems with <strong className="text-[#FEDA45]">FastAPI</strong> and <strong className="text-[#FEDA45]">Supabase</strong> to crafting responsive frontends with <strong className="text-[#87CEEB]">React</strong> and <strong className="text-[#87CEEB]">Next.js</strong>,
              I ensure your product is not just functional, but performant and user-friendly.
            </p>
          </div>
        </motion.div>

        {/* Projects */}
        <motion.div variants={itemVariants} className="mb-16 md:mb-20">
          <h2 className="text-3xl font-bold text-[#FEDA45] bg-black inline-block px-3 py-1 mb-8 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
            SELECTED WORK
          </h2>
          <div className="grid gap-8">
            {PORTFOLIO_DATA.projects.map((project) => (
              <div key={project.id} className="group border-2 border-black bg-[#E1F5FE] p-6 shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all duration-200">
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
          <a 
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            className="inline-flex items-center gap-2 text-2xl font-bold text-white border-b-4 border-[#FF4B91] hover:text-[#FEDA45] hover:border-[#FEDA45] transition-colors pb-1"
          >
            {PORTFOLIO_DATA.personal.email}
          </a>
        </motion.div>

      </motion.div>

    </div>
  )
}
