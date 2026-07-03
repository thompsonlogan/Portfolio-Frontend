import { Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { JOBS } from "@/data/portfolio"
import { Reveal } from "./reveal"

interface WorkSectionProps {
  onResume: () => void
}

export function WorkSection({ onResume }: WorkSectionProps) {
  return (
    <section id="work" className="pb-28 pt-16">
      <Reveal className="mb-12 flex items-end justify-between gap-4">
        <div>
          <div className="font-mono text-xs tracking-[0.14em] text-muted-foreground">02 — EXPERIENCE</div>
          <h2 className="mt-3.5 text-[clamp(34px,4.4vw,52px)] font-light tracking-[-0.03em]">Where I've worked</h2>
        </div>
        <div className="flex flex-col items-end gap-3">
          <button
            type="button"
            onClick={onResume}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-[13px] text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong"
          >
            <Download className="h-4 w-4" />
            Download resume
          </button>
          <div className="font-mono text-xs text-muted-foreground">2021 — 2026</div>
        </div>
      </Reveal>

      <div>
        {JOBS.map((job) => (
          <Reveal key={`${job.company}-${job.year}`}>
            <div className="group grid grid-cols-[minmax(0,1fr)_auto] gap-6 border-t border-border py-8 transition-[padding] duration-400 hover:pl-3.5">
              <div>
                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className="m-0 text-[22px] font-medium tracking-[-0.01em]">{job.role}</h3>
                  <span className="text-[15px] text-brand">{job.company}</span>
                </div>
                <p className="mt-2.5 max-w-[62ch] text-[15px] leading-relaxed text-muted-foreground">{job.desc}</p>
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {job.tech.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="rounded-md border-border px-2.5 py-1 font-mono text-[11.5px] font-normal text-muted-foreground"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="whitespace-nowrap text-right font-mono text-[12.5px] text-muted-foreground">
                {job.year}
              </div>
            </div>
          </Reveal>
        ))}
        <div className="border-t border-border" />
      </div>
    </section>
  )
}
