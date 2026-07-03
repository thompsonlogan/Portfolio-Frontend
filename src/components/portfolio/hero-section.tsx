import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { ROLES } from "@/data/portfolio"
import { Terminal } from "./terminal"

interface HeroSectionProps {
  onNavigate: (id: string) => void
  onToggleTheme: () => void
  onGithub: () => void
  onLinkedin: () => void
  onResume: () => void
}

export function HeroSection({ onNavigate, onToggleTheme, onGithub, onLinkedin, onResume }: HeroSectionProps) {
  const [roleIdx, setRoleIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % ROLES.length)
        setVisible(true)
      }, 200)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="intro"
      className="flex min-h-screen flex-col items-center justify-center px-1 pb-10 pt-24 text-center"
    >
      <div className="mb-5 font-mono text-[12.5px] tracking-[0.18em] text-muted-foreground">
        PORTFOLIO — 2026 · MADISON, WISCONSIN
      </div>

      <h1 className="m-0 whitespace-nowrap text-[clamp(38px,8vw,98px)] font-light leading-[0.9] tracking-[-0.045em]">
        Logan <span className="text-muted-foreground">Thompson</span>
      </h1>

      <div className="mt-9 flex w-full flex-col items-center">
        <div className="flex flex-wrap items-center justify-center gap-2.5 text-[clamp(17px,2.2vw,22px)] font-light text-muted-foreground">
          <span>Full-stack engineer who</span>
          <span className="border-b border-brand pb-px text-foreground">
            <span className="transition-opacity duration-200" style={{ opacity: visible ? 1 : 0 }}>
              {ROLES[roleIdx]}
            </span>
            <span className="ml-0.5 inline-block h-[1em] w-px animate-blink bg-brand align-[-2px]" />
          </span>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <button
            onClick={() => onNavigate("fitlytics")}
            className="inline-flex items-center gap-2.5 rounded-xl bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-transform hover:scale-[1.03]"
          >
            See what I'm building <ArrowRight className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
            <span className="h-2 w-2 animate-pulse-dot rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.22)]" />
            Available for work
          </div>
        </div>
      </div>

      <Terminal
        onNavigate={onNavigate}
        onToggleTheme={onToggleTheme}
        onGithub={onGithub}
        onLinkedin={onLinkedin}
        onResume={onResume}
      />
    </section>
  )
}
