"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Cpu } from "lucide-react"
import { PORTFOLIO_DATA } from "@/lib/portfolio-data"
import Image from "next/image"
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
  
  // New States for Logo and Footer
  const [isScrolled, setIsScrolled] = useState(false)
  const [footerDiscovered, setFooterDiscovered] = useState(false)
  const [sessionTime, setSessionTime] = useState(0)

  useEffect(() => {
    setMounted(true)
    // Timer for session duration (High precision)
    const startTime = Date.now()
    const timerInterval = setInterval(() => {
       setSessionTime((Date.now() - startTime) / 1000)
    }, 50) // Update every 50ms implies 20fps for text, roughly. 10ms is overkill.

    return () => clearInterval(timerInterval)
  }, [])

  // Handle Scroll Logic for Logo and Footer Discovery
  useEffect(() => {
    const handleScrollEvent = () => {
       const container = containerRef.current
       // Check container scroll OR window scroll (robustness)
       const scrollTop = container ? container.scrollTop : 0
       const windowScroll = window.scrollY
       const effectiveScroll = scrollTop > 0 ? scrollTop : windowScroll
       
       const scrollHeight = container ? container.scrollHeight : document.documentElement.scrollHeight
       const clientHeight = container ? container.clientHeight : window.innerHeight
       
       // Logo Animation Trigger (Low threshold for responsiveness)
       setIsScrolled(effectiveScroll > 50)

       // Footer Discovery Trigger
       if (!footerDiscovered && (scrollHeight - effectiveScroll - clientHeight < 50)) {
          setFooterDiscovered(true)
       }
    }

    // Attach to both container and window to cover all bases
    const container = containerRef.current
    if (container) {
       container.addEventListener("scroll", handleScrollEvent, { passive: true })
    }
    window.addEventListener("scroll", handleScrollEvent, { passive: true })
    
    // Initial check
    handleScrollEvent()
    
    return () => {
       if (container) container.removeEventListener("scroll", handleScrollEvent)
       window.removeEventListener("scroll", handleScrollEvent)
    }
  }, [footerDiscovered])

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
      className="h-screen w-full bg-[#335DA1] text-white font-vt323 selection:bg-[#FEDA45] selection:text-black overflow-y-auto overflow-x-hidden cursor-none relative"
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
      
      {/* Animated Fixed Logo */}
      <motion.div
         layout
         className={`z-50 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center justify-center bg-[#FEDA45] ${
             isScrolled 
             ? "fixed top-6 left-6 w-14 h-14 border-2" 
             : "absolute top-[48px] md:top-[80px] left-6 md:left-[calc(50%-384px+24px)] w-24 h-24 border-4 hidden" 
             // We start hidden in 'absolute' mode because the main render loop handles the static one 
             // actually, better to have ONE element that switches.
         }`}
         initial={false}
         animate={{
             width: isScrolled ? 56 : 96,
             height: isScrolled ? 56 : 96,
             borderWidth: isScrolled ? 2 : 4,
             x: isScrolled ? 0 : 0, // In flow vs Fixed logic needs AnimatePresence or conditional positioning
         }}
      >
          <span className={`font-bold text-black font-vt323 ${isScrolled ? "text-xl" : "text-4xl"}`}>AG</span>
      </motion.div>
      {/* 
         The above motion.div approach for FLIP animation between fixed and static/absolute is complex.
         Simplified approach: Two variants. One fixed (always visible if scrolled). One static (visible if NOT scrolled).
         Crossfade or MatchLayout.
      */}

      {/* Main Content Container */}
      <motion.div 
        className="max-w-3xl mx-auto px-6 py-12 md:py-20 pb-40 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header / Intro */}
        <motion.div variants={itemVariants} className="mb-16 md:mb-20">
          
          {/* Logo Placeholder to preserve layout flow - Increased Size */}
          <div className="w-32 h-32 mb-8">
             {!isScrolled && (
                 <motion.div 
                    layoutId="ag-logo"
                    className="w-32 h-32 bg-[#FEDA45] border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] relative overflow-hidden"
                 >
                     <Image 
                       src="/images/Arkaparna Gantait 8bit.jpeg"
                       alt="Arkaparna Gantait 8bit"
                       fill
                       className="object-cover"
                     />
                 </motion.div>
             )}
          </div>
          
          {/* Fixed Logo (When Scrolled) renders outside the flow but we use layoutId to connect them */}
          {isScrolled && (
             <motion.div 
                layoutId="ag-logo"
                className="fixed top-6 left-6 z-50 w-16 h-16 bg-[#FEDA45] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] relative overflow-hidden"
             >
                 <Image 
                   src="/images/Arkaparna Gantait 8bit.jpeg"
                   alt="Arkaparna Gantait 8bit"
                   fill
                   className="object-cover"
                 />
             </motion.div>
          )}
          
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

      {/* Sticky Footer (Discovered State) */}
      <AnimatePresence>
        {footerDiscovered && (
            <motion.div 
               initial={{ y: 100 }}
               animate={{ y: 0 }}
               className="fixed bottom-0 left-0 w-full bg-black border-t-4 border-[#FEDA45] py-2 px-6 z-[100] flex justify-between items-center overflow-hidden"
            >
                <div className="text-[#FEDA45] font-vt323 text-xl md:text-2xl tracking-widest flex items-center gap-2">
                    <span>uptime:</span>
                    <span className="w-24">{sessionTime.toFixed(4)}s</span>
                </div>
                
                <div className="text-white/60 font-vt323 text-lg md:text-xl">
                    &copy; {new Date().getFullYear()} Arkaparna Gantait. All rights reserved.
                </div>
            </motion.div>
        )}
      </AnimatePresence>
      <div className={`${footerDiscovered ? "h-16" : "h-0"}`} /> {/* Spacer if needed */}
    </div>
  )
}
