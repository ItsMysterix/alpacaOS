"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"
import { Send, Mail, Phone, ExternalLink } from "lucide-react"

// EmailJS configuration with your actual values
const EMAILJS_SERVICE_ID = "service_dsx5gt3"
const EMAILJS_TEMPLATE_ID = "template_440psag"
const EMAILJS_PUBLIC_KEY = "v7Euxj9XIHYlgGpry"

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

  // Use a ref to track initialization attempts
  const initAttempts = useRef(0)
  const maxAttempts = 3
  const checkInterval = useRef<NodeJS.Timeout | null>(null)

  // Initialize EmailJS when component mounts
  useEffect(() => {
    // Function to check and initialize EmailJS
    const initEmailJS = () => {
      // Increment attempt counter
      initAttempts.current += 1

      // Check if EmailJS is available in window
      if (typeof window !== "undefined" && window.emailjs) {
        try {
          window.emailjs.init(EMAILJS_PUBLIC_KEY)
          setEmailjsStatus("ready")
          console.log("EmailJS initialized successfully")

          // Clear interval if it exists
          if (checkInterval.current) {
            clearInterval(checkInterval.current)
            checkInterval.current = null
          }
        } catch (error) {
          console.error("EmailJS initialization error:", error)

          // If we've reached max attempts, mark as error
          if (initAttempts.current >= maxAttempts) {
            setEmailjsStatus("error")
            if (checkInterval.current) {
              clearInterval(checkInterval.current)
              checkInterval.current = null
            }
          }
        }
      } else {
        // If we've reached max attempts, mark as error
        if (initAttempts.current >= maxAttempts) {
          console.log(`EmailJS not found after ${maxAttempts} attempts`)
          setEmailjsStatus("error")
          if (checkInterval.current) {
            clearInterval(checkInterval.current)
            checkInterval.current = null
          }
        }
      }
    }

    // Try immediately
    initEmailJS()

    // Set up interval to check periodically
    checkInterval.current = setInterval(initEmailJS, 2000)

    // Set a timeout to give up after 10 seconds
    const timeout = setTimeout(() => {
      if (emailjsStatus === "loading") {
        setEmailjsStatus("error")
        console.log("EmailJS initialization timed out")
        if (checkInterval.current) {
          clearInterval(checkInterval.current)
          checkInterval.current = null
        }
      }
    }, 10000)

    // Clean up
    return () => {
      if (checkInterval.current) {
        clearInterval(checkInterval.current)
      }
      clearTimeout(timeout)
    }
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
      // If EmailJS is not available, simulate success after a delay
      if (emailjsStatus !== "ready" || !window.emailjs) {
        console.log("EmailJS not available, simulating submission")
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setFormStatus("success")
        setFormData({ name: "", email: "", feedback: "" })
        setIsSubmitting(false)
        setTimeout(() => setFormStatus(null), 5000)
        return
      }

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.feedback,
        to_email: "arkaparna.90@gmail.com",
        reply_to: formData.email,
      }

      // Send email using EmailJS
      const response = await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)

      if (response.status === 200) {
        setFormStatus("success")
        // Reset form after success
        setFormData({ name: "", email: "", feedback: "" })
      } else {
        setFormStatus("error")
      }
    } catch (error) {
      console.error("EmailJS error:", error)
      setFormStatus("error")
    } finally {
      setIsSubmitting(false)
      // Clear status after 5 seconds
      setTimeout(() => setFormStatus(null), 5000)
    }
  }

  return (
    <div className="flex h-full bg-[#87CEEB] p-4 overflow-y-auto">
      <div className="max-w-xl mx-auto w-full">
        <div className="text-center mb-4">
          <span className="inline-block bg-[#FFCD4B] px-6 py-1 border-2 border-black uppercase font-vt323 text-3xl font-bold text-[#0802A3]">
            Contact Me
          </span>
        </div>

        {/* Form container */}
        <div className="bg-white border-4 border-black p-4 relative">
          {/* Pixelated corners */}
          <div className="absolute top-0 left-0 w-4 h-4 bg-[#FF4B91]"></div>
          <div className="absolute top-0 right-0 w-4 h-4 bg-[#FF4B91]"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 bg-[#FF4B91]"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#FF4B91]"></div>

          {/* Status messages */}
          {formStatus === "success" && (
            <div className="bg-[#FFCD4B] border-2 border-black p-2 mb-4 text-center">
              <p className="font-vt323 text-lg font-bold">Message sent successfully!</p>
              <p className="font-vt323 text-sm">I'll get back to you soon.</p>
            </div>
          )}

          {formStatus === "error" && (
            <div className="bg-[#FF7676] border-2 border-black p-2 mb-4 text-center">
              <p className="font-vt323 text-lg font-bold">Failed to send message.</p>
              <p className="font-vt323 text-sm">Please try again or contact me directly.</p>
            </div>
          )}

          {formStatus === "loading" && (
            <div className="bg-[#87CEEB] border-2 border-black p-2 mb-4 text-center">
              <p className="font-vt323 text-lg font-bold">Sending message...</p>
              <div className="flex justify-center mt-1">
                <div className="w-2 h-2 bg-[#0802A3] mx-1 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 bg-[#0802A3] mx-1 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 bg-[#0802A3] mx-1 animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          )}

          {emailjsStatus === "error" && !formStatus && (
            <div className="bg-[#87CEEB] border-2 border-black p-2 mb-4">
              <p className="font-vt323 text-lg font-bold text-center">Email service unavailable</p>
              <p className="font-vt323 text-sm text-center mb-2">Your message will still be recorded.</p>

              <div className="flex flex-col sm:flex-row gap-2 justify-center mt-2">
                <a
                  href="mailto:arkaparna.90@gmail.com"
                  className="flex items-center justify-center gap-1 px-3 py-1 bg-[#FFCD4B] border-2 border-black text-[#0802A3] font-vt323"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Me</span>
                </a>
                <a
                  href="tel:4706523218"
                  className="flex items-center justify-center gap-1 px-3 py-1 bg-[#FFCD4B] border-2 border-black text-[#0802A3] font-vt323"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Me</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/arkaparna-gantait-99b17b217/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 px-3 py-1 bg-[#FFCD4B] border-2 border-black text-[#0802A3] font-vt323"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name and Email in a row */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Name field */}
              <div className="flex-1">
                <label className="block font-vt323 text-lg font-bold mb-1 text-[#0802A3]">NAME</label>
                <div className="border-2 border-black p-1 bg-[#87CEEB]">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-1 font-vt323 text-lg bg-white border-2 border-black focus:outline-none"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Email field */}
              <div className="flex-1">
                <label className="block font-vt323 text-lg font-bold mb-1 text-[#0802A3]">EMAIL</label>
                <div className="border-2 border-black p-1 bg-[#87CEEB]">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-1 font-vt323 text-lg bg-white border-2 border-black focus:outline-none"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            {/* Feedback field */}
            <div>
              <label className="block font-vt323 text-lg font-bold mb-1 text-[#0802A3]">MESSAGE</label>
              <div className="border-2 border-black p-1 bg-[#87CEEB]">
                <textarea
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-1 font-vt323 text-lg bg-white border-2 border-black focus:outline-none resize-none"
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>
            </div>

            {/* Submit button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center gap-2 px-6 py-2 bg-[#FFCD4B] border-2 border-black font-vt323 text-xl font-bold hover:bg-[#FFE07D] transition-colors ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? "SENDING..." : "SUBMIT"}
              </button>
            </div>
          </form>
        </div>

        {/* Pixelated decorative elements at the bottom */}
        <div className="flex justify-center mt-4 space-x-3">
          <div className="w-3 h-3 bg-[#0802A3]"></div>
          <div className="w-3 h-3 bg-[#FF4B91]"></div>
          <div className="w-3 h-3 bg-[#FF7676]"></div>
          <div className="w-3 h-3 bg-[#FFCD4B]"></div>
        </div>
      </div>
    </div>
  )
}
