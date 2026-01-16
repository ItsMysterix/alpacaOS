"use client"
import { useState } from "react"
import { Code, Database, Users, ChevronRight, Menu, X, Cpu, Settings } from "lucide-react"

export default function SkillsContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>("programming")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const categories = [
    { id: "programming", name: "Languages", icon: <Code className="w-5 h-5 text-[#FF4B91]" /> },
    { id: "frameworks", name: "Frameworks & Libs", icon: <Settings className="w-5 h-5 text-[#FF7676]" /> },
    { id: "ai", name: "Deep Learning & AI", icon: <Cpu className="w-5 h-5 text-[#FFCD4B]" /> },
    { id: "devops", name: "DevOps & Tools", icon: <Database className="w-5 h-5 text-[#0C4A9C]" /> },
  ]

  const skills = {
    programming: [
      { name: "Python", level: 95 },
      { name: "SQL", level: 90 },
      { name: "C++", level: 85 },
      { name: "Java", level: 85 },
      { name: "Dart", level: 80 },
      { name: "JavaScript/TypeScript", level: 90 },
      { name: "Swift", level: 75 },
    ],
    frameworks: [
      { name: "FastAPI", level: 90 },
      { name: "Flutter", level: 85 },
      { name: "Node.js", level: 85 },
      { name: "Firebase", level: 90 },
      { name: "Supabase", level: 85 },
      { name: "React / Next.js", level: 90 },
    ],
    ai: [
      { name: "PyTorch", level: 80 },
      { name: "HuggingFace", level: 85 },
      { name: "OpenAI / Anthropic APIs", level: 90 },
      { name: "GCP AI", level: 80 },
      { name: "RAG & LLM Agents", level: 85 },
    ],
    devops: [
      { name: "Docker", level: 90 },
      { name: "AWS / GCP", level: 85 },
      { name: "Jenkins", level: 80 },
      { name: "Nginx / Linux", level: 85 },
      { name: "Git", level: 95 },
      { name: "Grafana / Prometheus", level: 80 },
      { name: "MCP (Model Context Protocol)", level: 85 },
    ],
  }

  const getSkillColor = (category: string) => {
    switch (category) {
      case "programming":
        return "bg-[#FF4B91]"
      case "frameworks":
        return "bg-[#FF7676]"
      case "ai":
        return "bg-[#FFCD4B]"
      case "devops":
        return "bg-[#0C4A9C]"
      default:
        return "bg-gray-400"
    }
  }

  const renderSkills = () => {
    if (!selectedCategory) return <div className="p-4 font-vt323 text-lg">Select a category to view skills</div>

    const categorySkills = skills[selectedCategory as keyof typeof skills] || []
    const skillColor = getSkillColor(selectedCategory)

    return (
      <div className="p-4 space-y-4">
        {categorySkills.map((skill, index) => (
          <div key={index} className="bg-white p-3 rounded-none border-2 border-black">
            <div className="flex justify-between items-center mb-1">
              <span className="font-vt323 text-lg font-bold">{skill.name}</span>
              <span className="font-vt323 text-sm">{skill.level}%</span>
            </div>
            <div className="w-full bg-[#87CEEB] rounded-none h-4 border-2 border-black">
              <div className={`${skillColor} h-full`} style={{ width: `${skill.level}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Mobile header with menu button */}
      <div className="md:hidden bg-[#87CEEB] border-b-2 border-black p-2 flex items-center justify-between">
        <div className="relative px-2">
          <div className="absolute top-0.5 left-1.5 bg-black px-2 py-0.5 uppercase font-vt323 text-lg font-extrabold">
            FAVS
          </div>
          <div className="relative z-10 bg-[#FFCD4B] border-2 border-black px-2 py-0.5 uppercase font-vt323 text-lg font-extrabold text-[#0802A3]">
            FAVS
          </div>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 bg-[#FFCD4B] border-2 border-black">
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar - responsive */}
      <div
        className={`
        ${sidebarOpen ? "block" : "hidden"} md:block
        w-full md:w-1/4 bg-[#87CEEB] border-r-2 border-black p-2
        ${sidebarOpen ? "absolute inset-x-0 top-12 bottom-0 z-10" : ""}
        overflow-y-auto
      `}
      >
        {/* Desktop heading */}
        <div className="hidden md:block relative mb-4 px-2">
          <div className="absolute top-1 left-1 bg-black px-3 py-1 uppercase font-vt323 text-xl font-extrabold">
            FAVOURITES
          </div>
          <div className="relative z-10 bg-[#FFCD4B] border-2 border-black px-3 py-1 uppercase font-vt323 text-xl font-extrabold text-[#0802A3]">
            FAVOURITES
          </div>
        </div>

        {/* Mobile heading */}
        <div className="md:hidden relative mb-4 px-2">
          <div className="absolute top-0.5 left-1.5 bg-black px-2 py-0.5 uppercase font-vt323 text-lg font-extrabold">
            FAVOURITES
          </div>
          <div className="relative z-10 bg-[#FFCD4B] border-2 border-black px-2 py-0.5 uppercase font-vt323 text-lg font-extrabold text-[#0802A3]">
            FAVOURITES
          </div>
        </div>

        {categories.map((category) => (
          <div
            key={category.id}
            className={`flex items-center gap-2 p-2 cursor-pointer rounded border-2 mb-2 ${
              selectedCategory === category.id ? "bg-[#FFCD4B] border-black" : "border-transparent hover:border-black"
            }`}
            onClick={() => {
              setSelectedCategory(category.id)
              setSidebarOpen(false)
            }}
          >
            {category.icon}
            <span className="font-vt323 text-lg">{category.name}</span>
            {selectedCategory === category.id && <ChevronRight className="w-4 h-4 ml-auto" />}
          </div>
        ))}
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-auto">
        <div className="p-2 bg-[#87CEEB] border-b-2 border-black font-vt323 text-lg font-bold flex justify-center">
          <span className="bg-[#FFCD4B] px-4 py-0.5 border-2 border-black uppercase">
            {categories.find((c) => c.id === selectedCategory)?.name || "Skills"}
          </span>
        </div>
        <div className="bg-white min-h-0 overflow-y-auto">{renderSkills()}</div>
      </div>
    </div>
  )
}
