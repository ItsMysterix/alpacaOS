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
    <div className="min-h-screen bg-[#335DA1] text-white font-vt323 selection:bg-[#FEDA45] selection:text-black">
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

      {/* Floating Action Bar - Mobile Optimized */}
      <motion.div 
        className="fixed bottom-6 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="flex flex-col items-center gap-3 w-full max-w-md pointer-events-auto">
          
          {/* THE CREATIVE OS TRIGGER */}
          <button
            onClick={onEnterOS}
            className="group relative overflow-hidden bg-[#E1F5FE] text-black font-bold py-3 px-6 rounded-xl border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all duration-200 flex items-center justify-center gap-3 w-full active:scale-95"
          >
            <div className="absolute inset-0 bg-[#FEDA45] opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            <Cpu className="w-6 h-6 shrink-0" />
            <span className="uppercase tracking-tight text-lg font-vt323 leading-none pt-1">Explore Interactive OS</span>
            <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Social Pills */}
          <div className="flex items-center justify-center gap-2 bg-black/90 border-2 border-[#FEDA45] p-2 rounded-xl shadow-lg backdrop-blur-md">
            <a href={PORTFOLIO_DATA.socials.github} target="_blank" rel="noopener noreferrer" className="p-2 text-[#FEDA45] hover:text-black hover:bg-[#FEDA45] rounded-lg transition-colors">
              <Github size={20} />
            </a>
            <div className="w-0.5 h-4 bg-[#FEDA45]/30" />
            <a href={PORTFOLIO_DATA.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-[#FEDA45] hover:text-black hover:bg-[#FEDA45] rounded-lg transition-colors">
              <Linkedin size={20} />
            </a>
            <div className="w-0.5 h-4 bg-[#FEDA45]/30" />
            <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="p-2 text-[#FEDA45] hover:text-black hover:bg-[#FEDA45] rounded-lg transition-colors">
              <Mail size={20} />
            </a>
          </div>

        </div>
      </motion.div>

    </div>
  )
}
