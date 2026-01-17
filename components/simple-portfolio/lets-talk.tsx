"use client"
import React, { useRef, useState } from "react"
import { useForm, ValidationError } from "@formspree/react"
import { Send, ShieldCheck, Zap, Mail, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function LetsTalk() {
  const [isOpen, setIsOpen] = useState(false)
  const [state, handleSubmit] = useForm("xgoookzr")
  const formRef = useRef<HTMLFormElement>(null)

  // Reset form state when closing/opening if needed, but Formspree hook manages its own state usually.
  
  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-3 px-8 py-3 bg-[#FF4B91] border-2 border-black text-white font-vt323 text-2xl font-bold uppercase shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-[#ff6bfa] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all"
      >
        <Mail className="w-6 h-6" />
        Let's Talk
      </button>

      <AnimatePresence>
        {isOpen && (
          <div key="lets-talk-modal" className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Window */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#E1F5FE] border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,0.5)] z-10 flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="bg-[#335DA1] p-3 border-b-4 border-black flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                   <Mail className="text-white w-6 h-6" />
                   <span className="text-white font-vt323 text-2xl uppercase tracking-wider">Compose Message</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="bg-red-500 hover:bg-red-600 text-white border-2 border-black p-1 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                {state.succeeded ? (
                  <div className="text-center py-10">
                    <ShieldCheck className="w-20 h-20 mx-auto mb-6 text-[#335DA1]" />
                    <h2 className="font-vt323 text-4xl font-bold mb-4">MESSAGE RECEIVED!</h2>
                    <p className="font-vt323 text-2xl mb-8">
                      I'll initiate a handshake with you shortly.
                    </p>
                    <button 
                      onClick={() => {
                        window.location.reload()
                      }}
                      className="px-8 py-3 bg-[#FEDA45] border-2 border-black font-vt323 text-xl uppercase hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all active:translate-y-1"
                    >
                      Close & Refresh
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-6 bg-[#FEDA45] border-2 border-black p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
                      <p className="font-vt323 text-lg text-black">
                        &gt; INITIATING SECURE TRANSMISSION CHANNEL...<br/>
                        &gt; PLEASE ENTER YOUR CREDENTIALS BELOW.
                      </p>
                    </div>

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

                      <div className="pt-4 flex justify-end">
                        <button
                          type="submit"
                          disabled={state.submitting}
                          className={`
                            group flex items-center gap-3 px-8 py-3 bg-[#FEDA45] border-2 border-black text-black font-vt323 text-2xl font-bold uppercase shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all
                            ${state.submitting ? "opacity-50 cursor-wait" : "hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:scale-95"}
                          `}
                        >
                          {state.submitting ? "TRANSMITTING..." : "SEND TRANSMISSION"} 
                          <Send className={`w-6 h-6 ${state.submitting ? "animate-pulse" : "group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"}`} />
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
