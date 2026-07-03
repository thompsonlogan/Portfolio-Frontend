import { useMemo } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { useGithubContributions } from "@/queries/github-queries"
import type { GithubContributionDayResponse } from "@/services/generated"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

// Level 0 (no contributions) → faint; 1–4 ramp up the brand accent.
function levelBg(level: number): string {
  switch (level) {
    case 1:
      return "color-mix(in srgb, var(--brand) 28%, transparent)"
    case 2:
      return "color-mix(in srgb, var(--brand) 50%, transparent)"
    case 3:
      return "color-mix(in srgb, var(--brand) 74%, transparent)"
    case 4:
      return "var(--brand)"
    default:
      return "color-mix(in srgb, var(--muted-foreground) 14%, transparent)"
  }
}

type Cell = GithubContributionDayResponse | null

export function ContributionGraph() {
  const { data, isLoading } = useGithubContributions()

  const { weeks, total } = useMemo(() => {
    const days = data?.days ?? []
    if (days.length === 0) return { weeks: [] as Cell[][], total: data?.totalContributions ?? 0 }

    // Pad the first (partial) week so day cells land on the correct weekday row.
    const lead = new Date(days[0].date ?? "").getUTCDay()
    const cells: Cell[] = [...Array<Cell>(lead).fill(null), ...days]
    const weeks: Cell[][] = []
    for (let i = 0; i < cells.length; i += 7) {
      const week = cells.slice(i, i + 7)
      while (week.length < 7) week.push(null)
      weeks.push(week)
    }
    return { weeks, total: data?.totalContributions ?? 0 }
  }, [data])

  const monthLabels = useMemo(() => {
    let last = -1
    return weeks.map((week) => {
      const firstReal = week.find((d): d is GithubContributionDayResponse => d != null)
      if (!firstReal?.date) return ""
      const m = new Date(firstReal.date).getUTCMonth()
      if (m !== last) {
        last = m
        return MONTHS[m]
      }
      return ""
    })
  }, [weeks])

  return (
    <div className="rounded-2xl border border-border bg-[color-mix(in_srgb,var(--card)_55%,transparent)] p-5.5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[13px] text-muted-foreground">
          {isLoading ? (
            <Skeleton className="h-4 w-40" />
          ) : (
            <>
              <span className="text-foreground">{total.toLocaleString()}</span> contributions in the last year
            </>
          )}
        </span>
        <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">contribution activity</span>
      </div>

      {isLoading ? (
        <Skeleton className="h-[120px] w-full rounded-xl" />
      ) : weeks.length > 0 ? (
        <div className="overflow-x-auto pb-1">
          <div className="inline-flex min-w-full flex-col gap-1.5">
            {/* month labels */}
            <div className="flex gap-[3px] pl-0">
              {monthLabels.map((label, i) => (
                <div
                  key={i}
                  className="w-[11px] shrink-0 overflow-visible whitespace-nowrap font-mono text-[9px] text-muted-foreground"
                >
                  {label}
                </div>
              ))}
            </div>

            {/* week columns */}
            <div className="flex gap-[3px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex shrink-0 flex-col gap-[3px]">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      title={day?.date ? `${day.count ?? 0} on ${day.date}` : undefined}
                      className="h-[11px] w-[11px] rounded-[2px]"
                      style={{ background: day ? levelBg(day.level ?? 0) : "transparent" }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-[13px] text-muted-foreground">
          Contribution data appears once a token-authenticated sync has run.
        </p>
      )}

      {/* legend */}
      {weeks.length > 0 && !isLoading && (
        <div className="mt-4 flex items-center justify-end gap-1.5 font-mono text-[10px] text-muted-foreground">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <span key={l} className="h-[11px] w-[11px] rounded-[2px]" style={{ background: levelBg(l) }} />
          ))}
          <span>More</span>
        </div>
      )}
    </div>
  )
}
