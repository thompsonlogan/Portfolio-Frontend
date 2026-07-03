import { PenLine } from "lucide-react"
import { Reveal } from "./reveal"

export function WritingSection() {
  return (
    <section id="writing" className="py-28">
      <Reveal className="mb-7 max-w-[640px]">
        <div className="font-mono text-xs tracking-[0.14em] text-muted-foreground">04 — WRITING</div>
        <h2 className="mt-3.5 text-[clamp(34px,4.4vw,52px)] font-light tracking-[-0.03em]">Building in public</h2>
        <p className="mt-4 max-w-[56ch] text-[17px] leading-relaxed text-muted-foreground text-pretty">
          Notes from the road to shipping Fitlytics and growing as an engineer — the decisions, the mistakes, and the
          things I'm figuring out in the open.
        </p>
      </Reveal>

      <Reveal>
        <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-border bg-[color-mix(in_srgb,var(--card)_55%,transparent)] px-6 py-20 text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border text-brand">
            <PenLine className="h-5 w-5" />
          </span>
          <div className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">DISPATCHES</div>
          <h3 className="m-0 text-2xl font-light tracking-[-0.02em]">Coming soon</h3>
          <p className="max-w-[42ch] text-[15px] leading-relaxed text-muted-foreground text-pretty">
            The first dispatches are in the works. Check back shortly — or reach out below if you'd like a heads up when
            they land.
          </p>
        </div>
      </Reveal>
    </section>
  )
}
