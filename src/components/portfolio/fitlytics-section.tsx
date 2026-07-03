import { useMemo, useState } from "react"
import { ArrowRight, Calendar, ChevronRight, Loader, Plus, TrendingDown, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  ACTIVITY_ROWS,
  NAV_GROUPS,
  NAV_MAP,
  RANGES,
  VIEWS,
  series,
  sparkPoints,
  type Range,
} from "@/data/fitlytics"
import { cn } from "@/lib/utils"
import { Reveal } from "./reveal"

const CHIPS = ["React 19", ".NET API", "PostgreSQL"]

function FitlyticsMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="2" y="13" width="3.4" height="9" rx="1" />
      <rect x="7.4" y="8" width="3.4" height="14" rx="1" />
      <rect x="12.8" y="3" width="3.4" height="19" rx="1" />
      <rect x="18.2" y="9" width="3.4" height="13" rx="1" />
    </svg>
  )
}

export function FitlyticsSection() {
  const [navId, setNavId] = useState("dashboard")
  const [range, setRange] = useState<Range>("1M")

  const view = VIEWS[NAV_MAP[navId] ?? "dashboard"]

  const chart = useMemo(() => {
    const data = series(view, range)
    const W = 620
    const H = 210
    const pad = 26
    const X = (i: number) => pad + (i / (data.length - 1)) * (W - pad * 2)
    const Y = (val: number) => pad + (1 - (val - view.yMin) / (view.yMax - view.yMin)) * (H - pad * 2)
    const line = data.map((val, i) => `${i ? "L" : "M"} ${X(i).toFixed(1)} ${Y(val).toFixed(1)}`).join(" ")
    const area = `${line} L ${X(data.length - 1).toFixed(1)} ${H - pad} L ${X(0).toFixed(1)} ${H - pad} Z`
    const grid = view.gridVals.map((g) => ({ y: Y(g).toFixed(1), ty: (Y(g) + 3).toFixed(1), label: String(g) }))
    return { line, area, grid, dotX: X(data.length - 1).toFixed(1), dotY: Y(data[data.length - 1]).toFixed(1) }
  }, [view, range])

  return (
    <section
      id="fitlytics"
      className="border-t border-border bg-[color-mix(in_srgb,var(--card)_35%,var(--background))] py-28"
    >
      <div className="mx-auto max-w-[1120px] px-7">
        <Reveal className="mb-9 flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-[620px]">
            <div className="font-mono text-xs tracking-[0.14em] text-muted-foreground">03 — PRODUCT</div>
            <div className="mt-4 flex items-center gap-3">
              <span className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-[11px] bg-foreground">
                <FitlyticsMark className="h-[22px] w-[22px] text-background" />
              </span>
              <h2 className="m-0 text-[clamp(34px,4.4vw,52px)] font-light tracking-[-0.03em]">Fitlytics</h2>
            </div>
            <p className="mt-4.5 text-[17px] leading-relaxed text-muted-foreground text-pretty">
              A fitness analytics platform I'm building — turning raw activity, sleep and heart-rate data into trends
              you can actually act on. Below is the real dashboard UI, running live. <span className="text-foreground">Click around it.</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {CHIPS.map((chip) => (
              <Badge key={chip} variant="outline" className="rounded-full border-border px-2.75 py-1.25 font-mono text-[11px] font-normal text-muted-foreground">
                {chip}
              </Badge>
            ))}
            <Badge variant="outline" className="gap-1.5 rounded-full border-brand px-2.75 py-1.25 font-mono text-[11px] font-normal text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Live demo
            </Badge>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="overflow-hidden rounded-2xl border border-border-strong bg-background shadow-[0_40px_90px_-40px_rgba(0,0,0,0.55)]">
            {/* window chrome */}
            <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-3">
              <span className="h-2.75 w-2.75 rounded-full bg-[#ff5f57]" />
              <span className="h-2.75 w-2.75 rounded-full bg-[#febc2e]" />
              <span className="h-2.75 w-2.75 rounded-full bg-[#28c840]" />
              <div className="flex flex-1 justify-center">
                <span className="rounded-md border border-border bg-background px-4 py-1 font-mono text-[11.5px] text-muted-foreground">
                  app.fitlytics.io
                </span>
              </div>
            </div>

            <div className="flex min-h-[560px]">
              {/* sidebar */}
              <aside className="hidden w-[212px] shrink-0 flex-col border-r border-border bg-card p-2.5 md:flex">
                <div className="flex items-center gap-2 px-2 pb-4 pt-1.5 font-semibold tracking-[-0.01em]">
                  <FitlyticsMark className="h-[17px] w-[17px] text-foreground" />
                  fitlytics
                </div>
                {NAV_GROUPS.map((group) => (
                  <div key={group.group}>
                    <div className="px-2 pb-1.5 pt-3.5 text-[10.5px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
                      {group.group}
                    </div>
                    {group.items.map((item) => {
                      const Icon = item.icon
                      const active = navId === item.id
                      return (
                        <button
                          key={item.id}
                          onClick={() => setNavId(item.id)}
                          className={cn(
                            "flex w-full items-center gap-2.5 rounded-lg px-2.25 py-1.75 text-[13px] transition-colors",
                            active ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </button>
                      )
                    })}
                  </div>
                ))}
                <div className="flex-1" />
                <div className="mt-2 flex items-center gap-2 border-t border-border p-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[11px] font-semibold">
                    J
                  </span>
                  <span className="text-[13px]">Jordan Hall</span>
                  <span className="flex-1" />
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </aside>

              {/* main */}
              <div className="min-w-0 flex-1 p-6">
                <div className="mb-5 flex flex-wrap items-baseline gap-3">
                  <div>
                    <div className="text-[21px] font-semibold tracking-[-0.02em]">{view.title}</div>
                    <div className="mt-0.5 text-[13px] text-muted-foreground">{view.sub}</div>
                  </div>
                  <div className="flex-1" />
                  <div className="inline-flex items-center gap-1.5 rounded-[9px] border border-border px-2.75 py-1.75 text-[13px] font-medium">
                    <Calendar className="h-3.5 w-3.5" />
                    Last 7 days
                  </div>
                  <div className="inline-flex cursor-pointer items-center gap-1.5 rounded-[9px] bg-foreground px-3 py-1.75 text-[13px] font-medium text-background">
                    <Plus className="h-3.5 w-3.5" />
                    Log workout
                  </div>
                </div>

                {/* metrics */}
                <div className="mb-4.5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {view.metrics.map((m) => (
                    <div key={m.label} className="rounded-xl border border-border bg-card p-3.5">
                      <div className="text-[10.5px] font-medium uppercase tracking-[0.05em] text-muted-foreground">
                        {m.label}
                      </div>
                      <div className="mt-1 text-[25px] font-semibold leading-tight tracking-[-0.02em]">
                        {m.value}
                        {m.unit && <span className="ml-1 text-[13px] font-normal text-muted-foreground">{m.unit}</span>}
                      </div>
                      <div className={cn("mt-1.5 flex items-center gap-1 text-[11.5px]", m.up ? "text-foreground" : "text-muted-foreground")}>
                        {m.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {m.delta}
                      </div>
                      <svg viewBox="0 0 104 30" preserveAspectRatio="none" className="mt-2.5 block h-[30px] w-full">
                        <polyline
                          points={sparkPoints(m.spark)}
                          fill="none"
                          stroke="var(--brand)"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity={0.9}
                        />
                      </svg>
                    </div>
                  ))}
                </div>

                {/* chart + table */}
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-[2fr_1fr]">
                  <div className="rounded-xl border border-border bg-card p-4">
                    <div className="mb-1.5 flex items-center">
                      <div className="text-sm font-semibold">{view.chartTitle}</div>
                      <div className="flex-1" />
                      <div className="flex gap-1">
                        {RANGES.map((r) => (
                          <button
                            key={r}
                            onClick={() => setRange(r)}
                            className={cn(
                              "rounded-md px-2.25 py-1 text-xs font-medium transition-colors",
                              range === r ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50"
                            )}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-2 text-xs text-muted-foreground">{view.chartSub}</div>
                    <svg viewBox="0 0 620 210" preserveAspectRatio="none" className="h-[230px] w-full">
                      {chart.grid.map((g, i) => (
                        <g key={i}>
                          <line x1={26} y1={g.y} x2={594} y2={g.y} stroke="var(--border)" strokeWidth={1} />
                          <text x={2} y={g.ty} fontSize={10} fill="var(--muted-foreground)" fontFamily="JetBrains Mono">
                            {g.label}
                          </text>
                        </g>
                      ))}
                      <path d={chart.area} fill="var(--brand)" fillOpacity={0.12} />
                      <path d={chart.line} fill="none" stroke="var(--foreground)" strokeWidth={1.75} strokeLinejoin="round" strokeLinecap="round" />
                      <circle cx={chart.dotX} cy={chart.dotY} r={7} fill="var(--brand)" fillOpacity={0.2} />
                      <circle cx={chart.dotX} cy={chart.dotY} r={3.5} fill="var(--brand)" />
                    </svg>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-4">
                    <div className="mb-2.5 text-sm font-semibold">Recent activity</div>
                    <table className="w-full border-collapse text-[13px]">
                      <thead>
                        <tr className="text-[11.5px] font-medium text-muted-foreground">
                          <th className="border-b border-border px-2 py-1.75 text-left font-medium">When</th>
                          <th className="border-b border-border px-2 py-1.75 text-left font-medium">Type</th>
                          <th className="border-b border-border px-2 py-1.75 text-right font-medium">Min</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ACTIVITY_ROWS.map((row, i) => {
                          const Icon = row.icon
                          return (
                            <tr key={i}>
                              <td className="border-b border-border px-2 py-1.75 text-muted-foreground">{row.when}</td>
                              <td className="border-b border-border px-2 py-1.75">
                                <span className="inline-flex items-center gap-1.5">
                                  <Icon className="h-3.5 w-3.5" />
                                  {row.type}
                                </span>
                              </td>
                              <td className="border-b border-border px-2 py-1.75 text-right">{row.min}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                    <div className="my-3 h-px bg-border" />
                    <div className="flex items-center justify-center gap-1.5 text-[13px] text-muted-foreground">
                      View all <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>

                <div className="mt-3.5 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-foreground px-2.25 py-0.5 text-[11px] font-medium text-background">Pro</span>
                  <span className="rounded-full border border-border px-2.25 py-0.5 text-[11px] font-medium">v0.0.1</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.25 py-0.5 text-[11px] font-medium text-muted-foreground">
                    <Loader className="h-2.75 w-2.75 animate-spin-slow" />
                    Syncing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
