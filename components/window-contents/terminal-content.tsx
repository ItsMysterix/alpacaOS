"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

interface Command {
  input: string
  output: string | JSX.Element
}

export default function TerminalContent() {
  const [commands, setCommands] = useState<Command[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530) // Authentic terminal blink rate

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    // Focus the input when terminal opens
    if (inputRef.current) {
      inputRef.current.focus()
    }

    // Add welcome message
    setCommands([
      {
        input: "",
        output: (
          <div className="text-[#87CEEB] mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[#87CEEB]"></div>
              <p className="text-xl font-bold font-vt323">alpacaOS v1.0</p>
            </div>
            <p className="text-[#87CEEB] mb-3 font-vt323">
              Type <span className="text-[#ffcd4b] font-bold">'help'</span> to see available commands
            </p>
            <div className="w-full h-px bg-[#87CEEB] opacity-50 my-2"></div>
          </div>
        ),
      },
    ])
  }, [])

  useEffect(() => {
    // Scroll to bottom when commands change
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [commands])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentInput.trim()) return

    const input = currentInput.trim()
    let output: string | JSX.Element = ""

    // Add the command to history
    setCommands([...commands, { input, output: "" }])

    // Process commands - now opening apps instead of showing info
    switch (input.toLowerCase()) {
      case "help":
        output = (
          <div className="space-y-2 mb-3 font-vt323">
            <p className="text-[#87CEEB] mb-2">Available commands:</p>
            <div className="flex flex-col space-y-2">
              <div className="flex items-start">
                <span className="text-[#ffcd4b] font-bold w-24 inline-block">help</span>
                <span className="text-[#87CEEB]">Show this help message</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#ffcd4b] font-bold w-24 inline-block">about</span>
                <span className="text-[#87CEEB]">Open About Me window</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#ffcd4b] font-bold w-24 inline-block">skills</span>
                <span className="text-[#87CEEB]">Open Skills window</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#ffcd4b] font-bold w-24 inline-block">contact</span>
                <span className="text-[#87CEEB]">Open Contact window</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#ffcd4b] font-bold w-24 inline-block">projects</span>
                <span className="text-[#87CEEB]">Open Projects window</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#ffcd4b] font-bold w-24 inline-block">resume</span>
                <span className="text-[#87CEEB]">Open Resume window</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#ffcd4b] font-bold w-24 inline-block">music</span>
                <span className="text-[#87CEEB]">Open Music player</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#ffcd4b] font-bold w-24 inline-block">clear</span>
                <span className="text-[#87CEEB]">Clear terminal</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#ffcd4b] font-bold w-24 inline-block">date</span>
                <span className="text-[#87CEEB]">Show current date</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#ffcd4b] font-bold w-24 inline-block">time</span>
                <span className="text-[#87CEEB]">Show current time</span>
              </div>
            </div>
            <div className="w-full h-px bg-[#87CEEB] opacity-50 my-2"></div>
          </div>
        )
        setCommands([...commands, { input, output }])
        break
      case "about":
        output = (
          <div className="mb-3 font-vt323">
            <p className="text-[#87CEEB]">Opening About Me window...</p>
            <div className="w-full h-px bg-[#87CEEB] opacity-50 my-2"></div>
          </div>
        )
        setCommands([...commands, { input, output }])
        // Dispatch event to open About Me window
        window.dispatchEvent(new CustomEvent("open-about-me"))
        break
      case "skills":
        output = (
          <div className="mb-3 font-vt323">
            <p className="text-[#87CEEB]">Opening Skills window...</p>
            <div className="w-full h-px bg-[#87CEEB] opacity-50 my-2"></div>
          </div>
        )
        setCommands([...commands, { input, output }])
        // Dispatch event to open Skills window
        window.dispatchEvent(new CustomEvent("open-skills"))
        break
      case "projects":
        output = (
          <div className="mb-3 font-vt323">
            <p className="text-[#87CEEB]">Opening Projects window...</p>
            <div className="w-full h-px bg-[#87CEEB] opacity-50 my-2"></div>
          </div>
        )
        setCommands([...commands, { input, output }])
        // Dispatch event to open Projects window
        window.dispatchEvent(new CustomEvent("open-projects"))
        break
      case "contact":
        output = (
          <div className="mb-3 font-vt323">
            <p className="text-[#87CEEB]">Opening Contact window...</p>
            <div className="w-full h-px bg-[#87CEEB] opacity-50 my-2"></div>
          </div>
        )
        setCommands([...commands, { input, output }])
        // Dispatch event to open Contact window
        window.dispatchEvent(new CustomEvent("open-contact"))
        break
      case "resume":
        output = (
          <div className="mb-3 font-vt323">
            <p className="text-[#87CEEB]">Opening Resume window...</p>
            <div className="w-full h-px bg-[#87CEEB] opacity-50 my-2"></div>
          </div>
        )
        setCommands([...commands, { input, output }])
        // Dispatch event to open Resume window
        window.dispatchEvent(new CustomEvent("open-resume"))
        break
      case "music":
        output = (
          <div className="mb-3 font-vt323">
            <p className="text-[#87CEEB]">Opening Music player...</p>
            <div className="w-full h-px bg-[#87CEEB] opacity-50 my-2"></div>
          </div>
        )
        setCommands([...commands, { input, output }])
        // Dispatch event to open Music player
        window.dispatchEvent(new CustomEvent("open-spotify"))
        break
      case "date":
        const today = new Date()
        output = (
          <div className="mb-3 font-vt323">
            <p className="text-[#87CEEB]">
              Current date: <span className="text-[#ffcd4b]">{today.toLocaleDateString()}</span>
            </p>
            <div className="w-full h-px bg-[#87CEEB] opacity-50 my-2"></div>
          </div>
        )
        setCommands([...commands, { input, output }])
        break
      case "time":
        const now = new Date()
        output = (
          <div className="mb-3 font-vt323">
            <p className="text-[#87CEEB]">
              Current time: <span className="text-[#ffcd4b]">{now.toLocaleTimeString()}</span>
            </p>
            <div className="w-full h-px bg-[#87CEEB] opacity-50 my-2"></div>
          </div>
        )
        setCommands([...commands, { input, output }])
        break
      case "clear":
        setCommands([])
        break
      default:
        output = (
          <div className="mb-3 font-vt323">
            <p className="text-[#ff4b91]">Command not found: {input}. Type 'help' for available commands.</p>
            <div className="w-full h-px bg-[#87CEEB] opacity-50 my-2"></div>
          </div>
        )
        setCommands([...commands, { input, output }])
    }

    setCurrentInput("")
  }

  return (
    <div className="bg-black text-[#87CEEB] font-vt323 text-lg h-full relative overflow-hidden">
      <div ref={terminalRef} className="p-4 h-full overflow-y-auto">
        {commands.map((cmd, index) => (
          <div key={index} className="mb-2">
            {cmd.input && (
              <div className="flex items-start">
                <span className="text-[#ffcd4b] mr-2 font-bold">$</span>
                <span className="text-[#87CEEB]">{cmd.input}</span>
              </div>
            )}
            <div className="ml-6">{cmd.output}</div>
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center mt-2">
          <span className="text-[#ffcd4b] mr-2 font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[#87CEEB] font-vt323 text-lg"
            autoFocus
          />
          <span
            className={`h-5 w-2.5 bg-[#87CEEB] ml-0.5 ${
              cursorVisible ? "opacity-100" : "opacity-0"
            } transition-opacity duration-100`}
          ></span>
        </form>
      </div>
    </div>
  )
}
