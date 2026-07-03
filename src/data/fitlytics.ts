import type { LucideIcon } from "lucide-react"
import {
  Activity,
  Bed,
  Dumbbell,
  Footprints,
  Flame,
  HeartPulse,
  LayoutDashboard,
  Settings,
  TrendingUp,
} from "lucide-react"

export interface Metric {
  label: string
  value: string
  unit: string
  delta: string
  up: boolean
  spark: number[]
}

export interface DashView {
  id: string
  title: string
  sub: string
  seed: number
  base: number
  amp: number
  yMin: number
  yMax: number
  gridVals: number[]
  chartTitle: string
  chartSub: string
  metrics: Metric[]
}

export const VIEWS: Record<string, DashView> = {
  dashboard: {
    id: "dashboard",
    title: "Good morning, Jordan",
    sub: "Here's your last 7 days at a glance.",
    seed: 7,
    base: 56,
    amp: 3,
    yMin: 48,
    yMax: 64,
    gridVals: [48, 52, 56, 60, 64],
    chartTitle: "Resting heart rate",
    chartSub: "Trailing average 56 bpm",
    metrics: [
      { label: "Resting HR", value: "58", unit: "bpm", delta: "3 bpm vs last week", up: true, spark: [62, 60, 61, 59, 58, 60, 58, 57] },
      { label: "Sleep", value: "7.4", unit: "h", delta: "+12 min vs avg", up: true, spark: [6.8, 7.1, 7.0, 7.2, 7.4, 7.3, 7.5, 7.4] },
      { label: "Active min", value: "284", unit: "", delta: "8% vs last week", up: false, spark: [310, 290, 300, 280, 275, 290, 285, 284] },
      { label: "VO2 max", value: "48.2", unit: "", delta: "+0.4", up: true, spark: [47.5, 47.6, 47.8, 47.9, 48, 48.1, 48, 48.2] },
    ],
  },
  activity: {
    id: "activity",
    title: "Activity",
    sub: "Movement and energy across the week.",
    seed: 14,
    base: 300,
    amp: 50,
    yMin: 200,
    yMax: 380,
    gridVals: [200, 245, 290, 335, 380],
    chartTitle: "Daily active minutes",
    chartSub: "Avg 296 min",
    metrics: [
      { label: "Steps", value: "9,842", unit: "", delta: "+1.2k vs avg", up: true, spark: [7, 8, 9, 10, 9, 11, 10, 9.8] },
      { label: "Active min", value: "312", unit: "", delta: "+6%", up: true, spark: [280, 290, 300, 310, 305, 315, 310, 312] },
      { label: "Calories", value: "2,480", unit: "", delta: "+140", up: true, spark: [2300, 2350, 2400, 2450, 2420, 2500, 2460, 2480] },
      { label: "Distance", value: "6.7", unit: "km", delta: "+0.4 km", up: true, spark: [5.8, 6, 6.3, 6.5, 6.4, 6.8, 6.6, 6.7] },
    ],
  },
  sleep: {
    id: "sleep",
    title: "Sleep",
    sub: "Recovery and sleep quality.",
    seed: 21,
    base: 7.3,
    amp: 0.7,
    yMin: 5.5,
    yMax: 9,
    gridVals: [5.5, 6.5, 7.5, 8.5],
    chartTitle: "Sleep duration",
    chartSub: "Avg 7.3 h",
    metrics: [
      { label: "Time asleep", value: "7.4", unit: "h", delta: "+12 min", up: true, spark: [7, 7.2, 7.1, 7.4, 7.3, 7.5, 7.4, 7.4] },
      { label: "Deep", value: "1.6", unit: "h", delta: "+8 min", up: true, spark: [1.4, 1.5, 1.5, 1.6, 1.5, 1.7, 1.6, 1.6] },
      { label: "REM", value: "1.9", unit: "h", delta: "4 min", up: false, spark: [2, 1.9, 2, 1.8, 1.9, 1.9, 1.8, 1.9] },
      { label: "Efficiency", value: "92", unit: "%", delta: "+1%", up: true, spark: [89, 90, 91, 92, 91, 93, 92, 92] },
    ],
  },
  workouts: {
    id: "workouts",
    title: "Workouts",
    sub: "Training volume and load.",
    seed: 33,
    base: 62,
    amp: 24,
    yMin: 20,
    yMax: 100,
    gridVals: [20, 40, 60, 80, 100],
    chartTitle: "Training load",
    chartSub: "Balanced",
    metrics: [
      { label: "Sessions", value: "5", unit: "", delta: "+1 vs last week", up: true, spark: [3, 4, 4, 5, 4, 5, 5, 5] },
      { label: "Volume", value: "18.2", unit: "k", delta: "+2.1k", up: true, spark: [15, 16, 17, 18, 17, 19, 18, 18.2] },
      { label: "Avg HR", value: "142", unit: "bpm", delta: "3 bpm", up: true, spark: [148, 146, 145, 143, 144, 142, 143, 142] },
      { label: "Streak", value: "12", unit: "d", delta: "personal best", up: true, spark: [6, 7, 8, 9, 10, 11, 12, 12] },
    ],
  },
}

export interface NavGroup {
  group: string
  items: { id: string; label: string; icon: LucideIcon }[]
}

export const NAV_GROUPS: NavGroup[] = [
  {
    group: "Overview",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "activity", label: "Activity", icon: Activity },
      { id: "trends", label: "Trends", icon: TrendingUp },
    ],
  },
  {
    group: "Body",
    items: [
      { id: "heart", label: "Heart rate", icon: HeartPulse },
      { id: "sleep", label: "Sleep", icon: Bed },
      { id: "workouts", label: "Workouts", icon: Dumbbell },
    ],
  },
  {
    group: "Account",
    items: [{ id: "settings", label: "Settings", icon: Settings }],
  },
]

/** Maps a sidebar nav id onto the dashboard view it shows. */
export const NAV_MAP: Record<string, string> = {
  dashboard: "dashboard",
  activity: "activity",
  trends: "activity",
  heart: "dashboard",
  sleep: "sleep",
  workouts: "workouts",
  settings: "dashboard",
}

export interface ActivityRow {
  when: string
  type: string
  icon: LucideIcon
  min: number
}

export const ACTIVITY_ROWS: ActivityRow[] = [
  { when: "Today", type: "Walk", icon: Footprints, min: 42 },
  { when: "Today", type: "Strength", icon: Dumbbell, min: 38 },
  { when: "Yesterday", type: "Run", icon: Activity, min: 52 },
  { when: "Yesterday", type: "Sleep", icon: Bed, min: 444 },
  { when: "Mon", type: "Walk", icon: Footprints, min: 26 },
  { when: "Sun", type: "HIIT", icon: Flame, min: 24 },
]

export const RANGES = ["1W", "1M", "3M", "1Y"] as const
export type Range = (typeof RANGES)[number]

/** Deterministic pseudo-random walk used to synthesize the chart line. */
export function series(v: DashView, range: Range): number[] {
  const n = { "1W": 7, "1M": 30, "3M": 40, "1Y": 52 }[range]
  let seed = v.seed + n * 13
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  const arr: number[] = []
  let cur = v.base
  for (let i = 0; i < n; i++) {
    cur += (rnd() - 0.5) * v.amp
    cur = v.base + (cur - v.base) * 0.82
    arr.push(cur)
  }
  return arr
}

export function sparkPoints(arr: number[]): string {
  const w = 104
  const h = 30
  const mn = Math.min(...arr)
  const mx = Math.max(...arr)
  return arr
    .map((v, i) => `${((i / (arr.length - 1)) * w).toFixed(1)},${(h - ((v - mn) / (mx - mn || 1)) * h).toFixed(1)}`)
    .join(" ")
}
