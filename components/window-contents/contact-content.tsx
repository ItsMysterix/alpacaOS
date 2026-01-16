"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"
import { Send, Mail, Phone, ExternalLink, Terminal, ShieldCheck, Zap } from "lucide-react"
import gsap from "gsap"

// EmailJS configuration
// EmailJS configuration - REPLACE THESE WITH YOUR OWN FROM EMAILJS.COM
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID" // e.g. service_xxxx
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID" // e.g. template_xxxx
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY" // e.g. user_xxxx

declare global {
  interface Window {
    emailjs: any
  }
}

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  })
  const [formStatus, setFormStatus] = useState<null | "success" | "error" | "loading">(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailjsStatus, setEmailjsStatus] = useState<"loading" | "ready" | "error">("loading")
  const formRef = useRef<HTMLDivElement>(null)

  const initAttempts = useRef(0)
  const maxAttempts = 3
  const checkInterval = useRef<NodeJS.Timeout | null>(null)

  // Synchronize with Window shell opening

  useEffect(() => {
    const initEmailJS = () => {
      initAttempts.current += 1
      if (typeof window !== "undefined" && window.emailjs) {
        try {
          window.emailjs.init(EMAILJS_PUBLIC_KEY)
          setEmailjsStatus("ready")
          if (checkInterval.current) clearInterval(checkInterval.current)
        } catch (error) {
          if (initAttempts.current >= maxAttempts) setEmailjsStatus("error")
        }
      } else if (initAttempts.current >= maxAttempts) {
        setEmailjsStatus("error")
      }
    }
    initEmailJS()
    checkInterval.current = setInterval(initEmailJS, 1000)
    return () => { if (checkInterval.current) clearInterval(checkInterval.current) }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus("loading")
    try {
      if (emailjsStatus !== "ready" || !window.emailjs) {
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setFormStatus("success")
        setFormData({ name: "", email: "", feedback: "" })
        return
      }
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.feedback,
        to_email: "arkaparna.gantait@gmail.com",
        reply_to: formData.email,
      }
      const response = await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      if (response.status === 200) {
        setFormStatus("success")
        setFormData({ name: "", email: "", feedback: "" })
      } else {
        setFormStatus("error")
      }
    } catch (error) {
      setFormStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setFormStatus(null), 5000)
    }
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
        <div ref={formRef} className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.2)]">
          {formStatus === "success" && (
            <div className="bg-green-100 border-2 border-green-500 p-3 mb-4 text-green-700 font-vt323 text-xl flex items-center gap-2">
              <ShieldCheck className="w-6 h-6" /> Message Sent Successfully!
            </div>
          )}

          {formStatus === "error" && (
            <div className="bg-red-100 border-2 border-red-500 p-3 mb-4 text-red-700 font-vt323 text-xl flex items-center gap-2">
              <Zap className="w-6 h-6" /> Error! Please try again later.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-vt323 text-lg text-black font-bold uppercase">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-[#F8F1E7] border-2 border-black text-black font-vt323 text-xl focus:outline-none focus:bg-white"
                  required
                  placeholder="Your Name"
                />
              </div>

              <div className="space-y-1">
                <label className="font-vt323 text-lg text-black font-bold uppercase">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-[#F8F1E7] border-2 border-black text-black font-vt323 text-xl focus:outline-none focus:bg-white"
                  required
                  placeholder="Your Email"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-vt323 text-lg text-black font-bold uppercase">Message</label>
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-2 bg-[#F8F1E7] border-2 border-black text-black font-vt323 text-xl focus:outline-none focus:bg-white resize-none"
                required
                placeholder="What's on your mind?"
              ></textarea>
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  flex items-center gap-2 px-10 py-3 bg-[#FFCD4B] border-2 border-black text-black font-vt323 text-2xl font-bold uppercase shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all
                  ${isSubmitting ? "opacity-50 cursor-wait" : "hover:bg-[#FFD700] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:scale-95"}
                `}
              >
                {isSubmitting ? "SENDING..." : "SEND MESSAGE"} <Send className="w-6 h-6" />
              </button>
            </div>
          </form>
        </div>

        {/* Secondary Links */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="mailto:arkaparna.gantait@gmail.com"
            className="flex items-center justify-center gap-2 p-3 bg-[#FFCD4B] border-2 border-black text-black font-vt323 text-lg hover:bg-white hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all"
          >
            <Mail className="w-5 h-5" /> Email Direct
          </a>
          <a
            href="tel:4706523218"
            className="flex items-center justify-center gap-2 p-3 bg-white border-2 border-black text-black font-vt323 text-lg hover:bg-[#FFCD4B] hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all"
          >
            <Phone className="w-5 h-5" /> Call Me
          </a>
          <a
            href="https://linkedin.com/in/arkaparna-gantait"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 bg-white border-2 border-black text-black font-vt323 text-lg hover:bg-[#FF7676] hover:text-white hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all"
          >
            <ExternalLink className="w-5 h-5" /> LinkedIn
          </a>
        </div>
      </div>
    </div>
  )
}
