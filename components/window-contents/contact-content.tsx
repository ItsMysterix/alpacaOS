"use client"
import React from "react"
import { useForm, ValidationError } from "@formspree/react"
import { Send, ShieldCheck, Zap } from "lucide-react"

export default function ContactContent() {
  const [state, handleSubmit] = useForm("xgoookzr")

  if (state.succeeded) {
    return (
      <div className="flex h-full p-4 items-center justify-center">
        <div className="bg-green-100 border-2 border-green-500 p-8 shadow-[8px_8px_0px_rgba(0,0,0,0.2)] text-center max-w-lg">
          <ShieldCheck className="w-16 h-16 mx-auto mb-4 text-green-600" />
          <h2 className="font-vt323 text-3xl font-bold text-green-800 mb-2">MESSAGE SENT!</h2>
          <p className="font-vt323 text-xl text-green-700">
            Thanks for reaching out. I&apos;ll get back to you soon.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 px-6 py-2 bg-white border-2 border-green-600 font-vt323 text-lg hover:bg-green-50"
          >
            SEND ANOTHER
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full p-4 overflow-y-auto">
      <div className="max-w-xl mx-auto w-full py-4">
        {/* Standardized Window Title Header */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#FF7676] border-2 border-black px-8 py-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] text-center">
            <h2 className="font-vt323 text-3xl font-bold text-white uppercase tracking-wider">Contact Me</h2>
          </div>
        </div>

        {/* Form container */}
        <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.2)]">
          {state.errors && (
            <div className="bg-red-100 border-2 border-red-500 p-3 mb-4 text-red-700 font-vt323 text-xl flex items-center gap-2">
              <Zap className="w-6 h-6" /> There was an error sending your message.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="name" className="font-vt323 text-lg text-black font-bold uppercase">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="w-full p-2 bg-[#F8F1E7] border-2 border-black text-black font-vt323 text-xl focus:outline-none focus:bg-white"
                  required
                  placeholder="Your Name"
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 font-vt323" />
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="font-vt323 text-lg text-black font-bold uppercase">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="w-full p-2 bg-[#F8F1E7] border-2 border-black text-black font-vt323 text-xl focus:outline-none focus:bg-white"
                  required
                  placeholder="Your Email"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 font-vt323" />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="message" className="font-vt323 text-lg text-black font-bold uppercase">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full p-2 bg-[#F8F1E7] border-2 border-black text-black font-vt323 text-xl focus:outline-none focus:bg-white resize-none"
                required
                placeholder="What's on your mind?"
              ></textarea>
              <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 font-vt323" />
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={state.submitting}
                className={`
                  flex items-center gap-2 px-10 py-3 bg-[#FFCD4B] border-2 border-black text-black font-vt323 text-2xl font-bold uppercase shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all
                  ${state.submitting ? "opacity-50 cursor-wait" : "hover:bg-[#FFD700] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:scale-95"}
                `}
              >
                {state.submitting ? "SENDING..." : "SEND MESSAGE"} <Send className="w-6 h-6" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
