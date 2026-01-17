"use client"
import React, { useRef } from "react"
import { useForm, ValidationError } from "@formspree/react"
import { Send, ShieldCheck, Zap } from "lucide-react"
import { motion } from "framer-motion"

export default function LetsTalk() {
  const [state, handleSubmit] = useForm("xgoookzr")
  const formRef = useRef<HTMLFormElement>(null)

  if (state.succeeded) {
    return (
      <motion.div 
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         className="bg-[#E1F5FE] border-2 border-black p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)] text-center text-black"
      >
        <ShieldCheck className="w-16 h-16 mx-auto mb-4 text-[#335DA1]" />
        <h2 className="font-vt323 text-3xl font-bold mb-2">MESSAGE RECEIVED!</h2>
        <p className="font-vt323 text-xl mb-6">
          I'll initiate a handshake with you shortly.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-6 py-2 bg-[#FEDA45] border-2 border-black font-vt323 text-lg hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all active:translate-y-1"
        >
          SEND ANOTHER
        </button>
      </motion.div>
    )
  }

  return (
    <div className="w-full">
      {/* Form container - Styled to match Landing Page Aesthetic */}
      <div className="bg-[#E1F5FE] border-2 border-black p-6 md:p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)] relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-black/10" />
        
        {state.errors && (
            <div className="bg-red-100 border-2 border-red-500 p-3 mb-6 text-red-700 font-vt323 text-xl flex items-center gap-2">
              <Zap className="w-6 h-6" /> Transmission Error. Try again.
            </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="font-vt323 text-xl text-black font-bold uppercase tracking-wide">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                className="w-full p-3 bg-white border-2 border-black text-black font-vt323 text-2xl focus:outline-none focus:bg-[#FEDA45]/20 focus:border-[#335DA1] transition-colors"
                required
                placeholder="YOUR NAME"
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 font-vt323" />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="font-vt323 text-xl text-black font-bold uppercase tracking-wide">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                className="w-full p-3 bg-white border-2 border-black text-black font-vt323 text-2xl focus:outline-none focus:bg-[#FEDA45]/20 focus:border-[#335DA1] transition-colors"
                required
                placeholder="YOUR@EMAIL.COM"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 font-vt323" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="font-vt323 text-xl text-black font-bold uppercase tracking-wide">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full p-3 bg-white border-2 border-black text-black font-vt323 text-2xl focus:outline-none focus:bg-[#FEDA45]/20 focus:border-[#335DA1] transition-colors resize-none"
              required
              placeholder="INITIATE COMMUNICATION SEQUENCES..."
            ></textarea>
            <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 font-vt323" />
          </div>

          <div className="pt-4 flex justify-start">
            <button
              type="submit"
              disabled={state.submitting}
              className={`
                group flex items-center gap-3 px-8 py-4 bg-[#FEDA45] border-2 border-black text-black font-vt323 text-2xl font-bold uppercase shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all
                ${state.submitting ? "opacity-50 cursor-wait" : "hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:scale-95"}
              `}
            >
              {state.submitting ? "TRANSMITTING..." : "SEND TRANSMISSION"} 
              <Send className={`w-6 h-6 ${state.submitting ? "animate-pulse" : "group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"}`} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
