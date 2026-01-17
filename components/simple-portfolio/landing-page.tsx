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
    <div className="min-h-screen bg-[#050511] text-gray-200 font-mono selection:bg-[#FEDA45] selection:text-black">
      {/* Main Content Container */}
      <motion.div 
        className="max-w-3xl mx-auto px-6 py-20 pb-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header / Intro */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="w-24 h-24 bg-gray-800 rounded-lg mb-8 overflow-hidden border-2 border-gray-700">
             {/* Placeholder for profile pic if available, else initials */}
             <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-500">
               AG
             </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            Hi, I'm <span className="bg-white text-black px-2">Arkaparna Gantait</span>. <br />
            I'm a {PORTFOLIO_DATA.personal.role} building scalable web applications and AI solutions.
          </h1>
          
          <div className="p-6 border border-blue-500/30 rounded-lg bg-blue-900/10 backdrop-blur-sm relative">
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-blue-500 rounded-full" />
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-blue-500 rounded-full" />
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-blue-500 rounded-full" />
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-blue-500 rounded-full" />
            
            <p className="text-lg text-blue-100 leading-relaxed">
              {PORTFOLIO_DATA.personal.about}
            </p>
          </div>
        </motion.div>

        {/* What I do */}
        <motion.div variants={itemVariants} className="mb-20">
          <h2 className="text-xl font-bold text-white bg-white/10 inline-block px-2 py-1 mb-8">
            What I do
          </h2>
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>
              I help technical teams and startups build digital products from scratch or improve existing ones. 
              Whether you're building a <strong>SaaS platform</strong>, <strong>AI integration</strong>, or <strong>Developer Tool</strong>, 
              I write clean, maintainable code across the full stack.
            </p>
            <p>
              From architecting backend systems with <strong>FastAPI</strong> and <strong>Supabase</strong> to crafting responsive frontends with <strong>React</strong> and <strong>Next.js</strong>,
              I ensure your product is not just functional, but performant and user-friendly.
            </p>
          </div>
        </motion.div>

        {/* Projects */}
        <motion.div variants={itemVariants} className="mb-20">
          <h2 className="text-xl font-bold text-white bg-white/10 inline-block px-2 py-1 mb-8">
            Selected Work
          </h2>
          <div className="grid gap-8">
            {PORTFOLIO_DATA.projects.map((project) => (
              <div key={project.id} className="group border-l-2 border-gray-800 pl-6 hover:border-[#FEDA45] transition-colors duration-300">
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-2xl font-bold text-white group-hover:text-[#FEDA45] transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex gap-4 opacity-50 group-hover:opacity-100 transition-opacity">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        <ExternalLink size={18} />
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        <Github size={18} />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span key={t} className="text-xs font-bold text-blue-300 bg-blue-900/30 px-2 py-1 rounded">
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
           <h2 className="text-xl font-bold text-white bg-white/10 inline-block px-2 py-1 mb-6">
            Let's Talk
          </h2>
          <p className="text-gray-400 mb-6">
            I'm currently open to new opportunities. Feel free to reach out.
          </p>
          <a 
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            className="inline-flex items-center gap-2 text-xl font-bold text-white border-b-2 border-white hover:text-[#FEDA45] hover:border-[#FEDA45] transition-colors pb-1"
          >
            {PORTFOLIO_DATA.personal.email}
          </a>
        </motion.div>

      </motion.div>

      {/* Floating Action Bar */}
      <motion.div 
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[90vw]"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="flex flex-col items-center gap-4">
          
          {/* THE CREATIVE OS TRIGGER */}
          <button
            onClick={onEnterOS}
            className="group relative overflow-hidden bg-white text-black font-bold py-3 px-6 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(254,218,69,0.5)] transition-all duration-300 flex items-center gap-3 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#FEDA45] via-[#FF4B91] to-[#3A76D1] opacity-0 group-hover:opacity-20 transition-opacity" />
            <Cpu className="w-5 h-5 group-hover:animate-spin-slow" />
            <span className="uppercase tracking-tight">Looking for something more interactive?</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Social Pills */}
          <div className="flex items-center gap-2 bg-[#1a1a2e] border border-gray-700 p-1.5 rounded-full shadow-lg backdrop-blur-md">
            <a href={PORTFOLIO_DATA.socials.github} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
              <Github size={20} />
            </a>
            <div className="w-px h-4 bg-gray-700" />
            <a href={PORTFOLIO_DATA.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
              <Linkedin size={20} />
            </a>
            <div className="w-px h-4 bg-gray-700" />
            <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
              <Mail size={20} />
            </a>
          </div>

        </div>
      </motion.div>

    </div>
  )
}
