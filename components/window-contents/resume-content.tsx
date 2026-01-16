"use client"
import { Download, ExternalLink } from "lucide-react"

export default function ResumeContent() {
  return (
    <div className="flex flex-col h-full bg-[#E0E0E0]">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 bg-white border-b-2 border-black">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 border border-black"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 border border-black"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 border border-black"></div>
          <span className="ml-2 font-vt323 text-xl text-black uppercase">Resume Viewer</span>
        </div>
        
        <div className="flex gap-2">
          <a
            href="/Arkaparna_Gantait_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1 bg-[#87CEEB] border-2 border-black text-black font-vt323 text-lg hover:bg-[#B0C4DE] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all active:translate-y-0.5 active:shadow-none"
          >
            <ExternalLink className="w-4 h-4" /> Open New Tab
          </a>
          <a
            href="/Arkaparna_Gantait_Resume.pdf"
            download
            className="flex items-center gap-2 px-3 py-1 bg-[#FFCD4B] border-2 border-black text-black font-vt323 text-lg hover:bg-[#FFD700] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all active:translate-y-0.5 active:shadow-none"
          >
            <Download className="w-4 h-4" /> Download PDF
          </a>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 w-full bg-gray-500 p-4 overflow-hidden relative">
        <div className="w-full h-full bg-white shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]">
          <iframe
            src="/Arkaparna_Gantait_Resume.pdf"
            className="w-full h-full border-none"
            title="Resume PDF"
          />
        </div>
      </div>
    </div>
  )
}
