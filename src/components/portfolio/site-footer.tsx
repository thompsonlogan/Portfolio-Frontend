import { ArrowUp } from "lucide-react"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-border py-9">
      <div className="text-[13px] text-muted-foreground">
        © {year} Logan Thompson. Built with the Fitlytics design system.
      </div>
      <button
        onClick={() => document.getElementById("intro")?.scrollIntoView({ behavior: "smooth" })}
        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        back to top <ArrowUp className="h-3.5 w-3.5" />
      </button>
    </footer>
  )
}
