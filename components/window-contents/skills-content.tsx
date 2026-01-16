"use client"
import { useState } from "react"
import { Code, Settings, Cpu, Database } from "lucide-react"

export default function SkillsContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>("programming")

  const categories = [
    { id: "programming", name: "Languages", icon: <Code className="w-5 h-5" /> },
    { id: "frameworks", name: "Frameworks", icon: <Settings className="w-5 h-5" /> },
    { id: "ai", name: "AI & ML", icon: <Cpu className="w-5 h-5" /> },
    { id: "devops", name: "Tools", icon: <Database className="w-5 h-5" /> },
  ]

  const skills = {
    programming: [
      { name: "Python", level: 95, color: "bg-[#FF4B91]" },
      { name: "SQL", level: 90, color: "bg-[#FF4B91]" },
      { name: "JavaScript/TypeScript", level: 90, color: "bg-[#FF4B91]" },
      { name: "C++", level: 85, color: "bg-[#FF4B91]" },
      { name: "Java", level: 85, color: "bg-[#FF4B91]" },
      { name: "Dart", level: 80, color: "bg-[#FF4B91]" },
    ],
    frameworks: [
      { name: "React / Next.js", level: 90, color: "bg-[#FF7676]" },
      { name: "Node.js", level: 85, color: "bg-[#FF7676]" },
      { name: "FastAPI", level: 90, color: "bg-[#FF7676]" },
      { name: "Flutter", level: 85, color: "bg-[#FF7676]" },
      { name: "Firebase", level: 90, color: "bg-[#FF7676]" },
      { name: "Supabase", level: 85, color: "bg-[#FF7676]" },
    ],
    ai: [
      { name: "PyTorch", level: 80, color: "bg-[#FFCD4B]" },
      { name: "HuggingFace", level: 85, color: "bg-[#FFCD4B]" },
      { name: "LLM Agents & RAG", level: 85, color: "bg-[#FFCD4B]" },
      { name: "API Integration", level: 90, color: "bg-[#FFCD4B]" },
      { name: "Computer Vision", level: 75, color: "bg-[#FFCD4B]" },
    ],
    devops: [
      { name: "Docker", level: 90, color: "bg-[#0C4A9C]" },
      { name: "AWS / GCP", level: 85, color: "bg-[#0C4A9C]" },
      { name: "Git", level: 95, color: "bg-[#0C4A9C]" },
      { name: "Jenkins", level: 80, color: "bg-[#0C4A9C]" },
      { name: "Linux Systems", level: 85, color: "bg-[#0C4A9C]" },
      { name: "MCP Protocol", level: 85, color: "bg-[#0C4A9C]" },
    ],
  }

  const renderSkills = () => {
    const categorySkills = skills[selectedCategory as keyof typeof skills] || []

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 overflow-y-auto h-full custom-scrollbar">
        {categorySkills.map((skill, index) => (
          <div key={index} className="bg-white p-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="font-vt323 text-xl font-bold uppercase tracking-tight">{skill.name}</span>
              <span className="font-vt323 text-lg text-black/50">{skill.level}%</span>
            </div>
            <div className="w-full bg-[#87CEEB]/20 border-2 border-black h-5 relative overflow-hidden">
              <div 
                className={`${skill.color} h-full transition-all duration-500 border-r-2 border-black`} 
                style={{ width: `${skill.level}%` }}
              />
              <div className="absolute inset-x-0 bottom-0 h-1 bg-white/30" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Navigation Arch-Tabs */}
      <div className="flex gap-2 p-2 bg-[#B3E5FC]/20 border-b-2 border-black shrink-0 overflow-x-auto no-scrollbar">
        {categories.map((category) => (
          <button 
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`
              px-6 py-2 font-vt323 text-xl border-2 border-black relative transition-all duration-150 uppercase tracking-tight whitespace-nowrap
              ${selectedCategory === category.id 
                ? "bg-[#FEDA45] text-black shadow-[3px_3px_0px_rgba(0,0,0,1)] -translate-y-0.5 z-10 font-bold" 
                : "bg-[#88C8E1] text-black/60 hover:bg-white hover:text-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              }
            `}
          >
            {category.name}
            {selectedCategory === category.id && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FEDA45] rotate-45 border-r-2 border-b-2 border-black" />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 m-3 border-4 border-black bg-white/5 relative overflow-hidden flex flex-col shadow-[inset_4px_4px_10px_rgba(0,0,0,0.3)]">
        <div className="absolute inset-0 border-2 border-[#B3E5FC]/30 pointer-events-none z-10" />
        <div className="flex-1 relative overflow-hidden flex flex-col">
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.05]" 
            style={{ backgroundImage: "repeating-linear-gradient(0deg, #000, #000 2px, transparent 2px, transparent 4px)" }}
          />
          {renderSkills()}
        </div>
      </div>
    </div>
  )
}
