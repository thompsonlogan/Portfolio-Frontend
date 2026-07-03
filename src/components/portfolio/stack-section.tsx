import { useEffect, useRef, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { STACKS } from "@/data/portfolio"
import { Reveal } from "./reveal"

function StackBar({ pct, animate }: { pct: number; animate: boolean }) {
  return (
    <Progress
      value={animate ? pct : 0}
      className="[&_[data-slot=progress-indicator]]:bg-brand [&_[data-slot=progress-indicator]]:duration-1000 [&_[data-slot=progress-indicator]]:ease-[cubic-bezier(0.16,1,0.3,1)]"
    />
  )
}

export function StackSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="stack" ref={ref} className="py-28">
      <Reveal className="mb-12">
        <div className="font-mono text-xs tracking-[0.14em] text-muted-foreground">06 — TOOLKIT</div>
        <h2 className="mt-3.5 text-[clamp(34px,4.4vw,52px)] font-light tracking-[-0.03em]">Skills &amp; tools</h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {STACKS.map((group) => {
          const Icon = group.icon
          return (
            <Reveal key={group.title}>
              <div className="h-full rounded-2xl border border-border bg-[color-mix(in_srgb,var(--card)_55%,transparent)] p-5.5">
                <div className="mb-4.5 flex items-center gap-2.5">
                  <Icon className="h-[18px] w-[18px] text-brand" />
                  <h3 className="m-0 text-[15px] font-semibold">{group.title}</h3>
                </div>
                {group.items.map((item) => (
                  <div key={item.name} className="mb-3.5">
                    <div className="mb-1.5 flex justify-between text-[13px]">
                      <span>{item.name}</span>
                      <span className="font-mono text-[11px] text-muted-foreground">{item.lvl}</span>
                    </div>
                    <StackBar pct={item.pct} animate={animate} />
                  </div>
                ))}
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
