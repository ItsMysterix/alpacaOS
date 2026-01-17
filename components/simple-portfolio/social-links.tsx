import { Github, Linkedin, Mail, FileText } from "lucide-react"

interface SocialLinksProps {
  github: string
  linkedin: string
  email: string
  resume?: string
}

export default function SocialLinks({ github, linkedin, email, resume }: SocialLinksProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-black/20 hover:bg-black/40 border border-white/20 px-3 py-1.5 rounded-lg transition-colors text-white">
        <Github size={18} /> <span className="text-lg">GitHub</span>
      </a>
      <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-black/20 hover:bg-black/40 border border-white/20 px-3 py-1.5 rounded-lg transition-colors text-white">
        <Linkedin size={18} /> <span className="text-lg">LinkedIn</span>
      </a>
      <a href={`mailto:${email}`} className="flex items-center gap-2 bg-black/20 hover:bg-black/40 border border-white/20 px-3 py-1.5 rounded-lg transition-colors text-white">
        <Mail size={18} /> <span className="text-lg">Email</span>
      </a>
      {resume && (
        <a href={resume} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-black/20 hover:bg-black/40 border border-white/20 px-3 py-1.5 rounded-lg transition-colors text-white">
           <FileText size={18} /> <span className="text-lg">Resume</span>
        </a>
      )}
    </div>
  )
}
