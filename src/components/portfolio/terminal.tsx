import { useEffect, useRef, useState, type KeyboardEvent } from "react"

interface TermLine {
  prompt?: boolean
  text: string
}

const INIT: TermLine[] = [
  { text: "logan-thompson — portfolio shell v1.0" },
  { text: "type 'help' to see what you can do." },
  { text: "" },
]

const GH_URL = "https://github.com/thompsonlogan"
const LI_URL = "https://www.linkedin.com/in/loganothompson"

interface TerminalProps {
  onNavigate: (id: string) => void
  onToggleTheme: () => void
  onGithub: () => void
  onLinkedin: () => void
  onResume: () => void
}

export function Terminal({ onNavigate, onToggleTheme, onGithub, onLinkedin, onResume }: TerminalProps) {
  const [lines, setLines] = useState<TermLine[]>(INIT)
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const history = useRef<string[]>([])
  const histIdx = useRef(0)

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [lines])

  const run = (raw: string) => {
    const cmd = raw.trim()
    const next: TermLine[] = [...lines, { prompt: true, text: cmd }]
    const push = (...t: string[]) => t.forEach((text) => next.push({ text }))
    const [name, ...parts] = cmd.split(/\s+/)
    let navTo: string | null = null

    switch (name.toLowerCase()) {
      case "":
        break
      case "help":
        push(
          "available commands:",
          "  about       a quick intro",
          "  whoami      identity & status",
          "  skills      tech I work with",
          "  projects    things I have built",
          "  work        jump to experience",
          "  fitlytics   launch the live demo",
          "  github      open my GitHub",
          "  linkedin    open my LinkedIn",
          "  resume      download my resume",
          "  email       how to reach me",
          "  theme       toggle light / dark",
          "  clear       reset the terminal"
        )
        break
      case "about":
        push(
          "Logan Thompson — full-stack engineer based in",
          "Madison, WI. 3+ years building cloud-native apps",
          "with React, C#, .NET and AWS. Currently building",
          "Fitlytics on the side."
        )
        break
      case "whoami":
        push(
          "logan-thompson",
          "  role     Software Engineer @ Yahara Software",
          "  stack    TypeScript · React · C# · .NET · AWS",
          "  status   available for work"
        )
        break
      case "skills":
      case "stack":
        push(
          "languages   C# · TypeScript · JavaScript · Python",
          "backend     .NET Core · ASP.NET · EF Core",
          "frontend    React · React Query · Tailwind",
          "cloud       AWS (S3, Lambda, ECS) · Docker"
        )
        break
      case "projects":
      case "ls":
        push(
          'fitlytics    fitness analytics platform  → type "fitlytics"',
          "moneybee     personal finance tracker",
          "battlepets   game project",
          '...and more on github → type "github"'
        )
        break
      case "work":
      case "experience":
        push("→ jumping to experience …")
        navTo = "work"
        break
      case "fitlytics":
        push("→ launching the Fitlytics demo …")
        navTo = "fitlytics"
        break
      case "email":
      case "contact":
        push("thompsonlogan78@gmail.com", "→ opening contact …")
        navTo = "connect"
        break
      case "github":
        push("→ opening github.com/thompsonlogan …")
        onGithub()
        window.open(GH_URL, "_blank", "noopener")
        break
      case "linkedin":
        push("→ opening linkedin.com/in/loganothompson …")
        onLinkedin()
        window.open(LI_URL, "_blank", "noopener")
        break
      case "resume":
      case "cv":
        push("→ downloading resume …")
        onResume()
        break
      case "theme":
        onToggleTheme()
        push("→ theme toggled.")
        break
      case "date":
        push(new Date().toString())
        break
      case "echo":
        push(parts.join(" "))
        break
      case "sudo":
        push("nice try — you don't have root here :)")
        break
      case "clear":
        setLines(INIT)
        return
      default:
        push("command not found: " + name, "type 'help' for a list.")
    }

    if (cmd) {
      history.current.push(cmd)
      histIdx.current = history.current.length
    }
    setLines(next)
    if (navTo) onNavigate(navTo)
  }

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    if (e.key === "Enter") {
      e.preventDefault()
      const v = input.value
      input.value = ""
      run(v)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (history.current.length) {
        histIdx.current = Math.max(0, histIdx.current - 1)
        input.value = history.current[histIdx.current] ?? ""
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (history.current.length) {
        histIdx.current = Math.min(history.current.length, histIdx.current + 1)
        input.value = history.current[histIdx.current] ?? ""
      }
    }
  }

  return (
    <div className="mt-12 hidden h-[360px] w-full flex-col overflow-hidden rounded-2xl border border-border bg-card/70 text-left sm:flex">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/50" />
        <span className="flex-1" />
        <span className="font-mono text-xs text-muted-foreground">visitor@logan.dev — bash</span>
      </div>
      <div
        ref={bodyRef}
        onClick={() => inputRef.current?.focus()}
        className="min-h-0 flex-1 cursor-text overflow-y-auto px-5 py-4 font-mono text-sm leading-relaxed text-muted-foreground"
      >
        {lines.map((ln, i) => (
          <div key={i} className="min-h-[1.1em] whitespace-pre-wrap break-words" style={{ color: ln.prompt ? "var(--foreground)" : undefined }}>
            {ln.prompt && <span className="text-brand">visitor@logan.dev:~$ </span>}
            {ln.text}
          </div>
        ))}
        <div className="mt-0.5 flex items-center gap-2">
          <span className="whitespace-nowrap text-brand">visitor@logan.dev:~$</span>
          <input
            ref={inputRef}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="help"
            onKeyDown={onKey}
            className="min-w-0 flex-1 border-none bg-transparent p-0 font-mono text-sm text-foreground caret-[var(--brand)] outline-none placeholder:text-muted-foreground/60"
          />
        </div>
      </div>
    </div>
  )
}
