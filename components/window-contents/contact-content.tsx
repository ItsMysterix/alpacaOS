"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"
import { Send, Mail, Phone, ExternalLink, ShieldCheck, Zap } from "lucide-react"
import emailjs from "@emailjs/browser"

// EmailJS configuration
const EMAILJS_SERVICE_ID = "service_7jupnol"
const EMAILJS_TEMPLATE_ID = "template_440psag"
const EMAILJS_PUBLIC_KEY = "v7Euxj9XIHYlgGpry"

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  })
  const [formStatus, setFormStatus] = useState<null | "success" | "error" | "loading">(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus("loading")
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.feedback,
      }
      
      console.log("Attempting to send email with:", {
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID,
        publicKey: EMAILJS_PUBLIC_KEY,
        params: templateParams
      })
      
      // Pass public key as 4th argument for stateless execution
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID, 
        EMAILJS_TEMPLATE_ID, 
        templateParams,
        EMAILJS_PUBLIC_KEY
      )
      
      if (response.status === 200) {
        setFormStatus("success")
        setFormData({ name: "", email: "", feedback: "" })
      } else {
        console.error("EmailJS Response:", response)
        setFormStatus("error")
      }
    } catch (error) {
      console.error("EmailJS Error:", error)
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

      </div>
    </div>
  )
}
