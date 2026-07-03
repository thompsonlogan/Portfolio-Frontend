import type { LucideIcon } from "lucide-react"
import { Cloud, Code2, Database, FlaskConical, Layout, Server } from "lucide-react"

export const ROLES = [
  "builds cloud-native applications",
  "ships full-stack features end to end",
  "works in React + .NET + AWS",
  "turns ideas into products",
]

export const GITHUB_HANDLE = "thompsonlogan"

export interface Job {
  year: string
  role: string
  company: string
  desc: string
  tech: string[]
}

export const JOBS: Job[] = [
  {
    year: "Mar 2024 — Present",
    role: "Software Engineer II",
    company: "Yahara Software",
    desc: "Set frontend architecture standards for a 25-engineer React/TypeScript codebase and built C#/.NET microservices across an 8-service public-health platform — shipping lab workflow features that cut sample-to-result turnaround from a full day to a few hours.",
    tech: ["TypeScript", "React", "C#", ".NET", "PostgreSQL", "AWS"],
  },
  {
    year: "May 2022 — Mar 2024",
    role: "Software Engineer",
    company: "Elutions",
    desc: "Built TypeScript/React and C# features for a SCADA platform industrial operators use to monitor and control remote systems — shipping six releases in six months and automating build pipelines to cut build times in half.",
    tech: ["TypeScript", "React", "C#", "Python", "Jenkins"],
  },
  {
    year: "May 2021 — May 2022",
    role: "Software Engineer Intern",
    company: "Emelar Consulting",
    desc: "Automated Salesforce workflows with Apex and Flows and built Lightning Web Components with REST/SOAP integrations, cutting manual processing time 40%.",
    tech: ["Salesforce", "Apex", "JavaScript"],
  },
]

export interface StackItem {
  name: string
  lvl: string
  pct: number
}

export interface StackGroup {
  title: string
  icon: LucideIcon
  items: StackItem[]
}

export const STACKS: StackGroup[] = [
  {
    title: "Languages",
    icon: Code2,
    items: [
      { name: "C#", lvl: "Expert", pct: 95 },
      { name: "TypeScript", lvl: "Expert", pct: 92 },
      { name: "JavaScript", lvl: "Advanced", pct: 88 },
      { name: "Python", lvl: "Proficient", pct: 70 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    items: [
      { name: ".NET Core", lvl: "Expert", pct: 93 },
      { name: "ASP.NET Web API", lvl: "Expert", pct: 90 },
      { name: "Entity Framework", lvl: "Advanced", pct: 85 },
    ],
  },
  {
    title: "Frontend",
    icon: Layout,
    items: [
      { name: "React", lvl: "Expert", pct: 94 },
      { name: "React Query", lvl: "Advanced", pct: 86 },
      { name: "Tailwind CSS", lvl: "Advanced", pct: 84 },
      { name: "Material UI", lvl: "Proficient", pct: 74 },
    ],
  },
  {
    title: "Testing",
    icon: FlaskConical,
    items: [
      { name: "Vitest", lvl: "Advanced", pct: 82 },
      { name: "Jest", lvl: "Advanced", pct: 80 },
      { name: "NSubstitute", lvl: "Proficient", pct: 72 },
      { name: "RTL", lvl: "Advanced", pct: 80 },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    items: [
      { name: "PostgreSQL", lvl: "Advanced", pct: 87 },
      { name: "DynamoDB", lvl: "Proficient", pct: 68 },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    items: [
      { name: "AWS (S3, Lambda, ECS)", lvl: "Advanced", pct: 82 },
      { name: "Docker", lvl: "Advanced", pct: 80 },
    ],
  },
]

export interface NavItem {
  id: string
  label: string
}

export const NAV_SECTIONS: NavItem[] = [
  { id: "intro", label: "Intro" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "fitlytics", label: "Fitlytics" },
  { id: "writing", label: "Writing" },
  { id: "stats", label: "Activity" },
  // { id: "stack", label: "Stack" }, // hidden — StackSection not rendered
  { id: "connect", label: "Connect" },
]

/** Header links (subset of the nav sections). */
export const HEADER_LINKS: NavItem[] = [
  { id: "work", label: "work" },
  { id: "fitlytics", label: "fitlytics" },
  { id: "writing", label: "writing" },
  // { id: "stack", label: "stack" }, // hidden — StackSection not rendered
  { id: "connect", label: "connect" },
]
