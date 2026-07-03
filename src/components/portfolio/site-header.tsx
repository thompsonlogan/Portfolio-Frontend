import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { useActiveSection } from "@/hooks/use-active-section"
import { HEADER_LINKS, NAV_SECTIONS } from "@/data/portfolio"
import { cn } from "@/lib/utils"

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

export function SiteHeader() {
  const { theme, setTheme } = useTheme()
  const active = useActiveSection(NAV_SECTIONS.map((s) => s.id))
  const isDark = theme !== "light"

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center gap-3.5 border-b border-border bg-background/70 px-6 py-4 backdrop-blur-md">
      <button
        onClick={() => scrollToId("intro")}
        className="flex items-center gap-2.5 text-foreground"
        aria-label="Back to top"
      >
        <span className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-[9px] bg-foreground text-[13px] font-semibold tracking-tight text-background">
          LT
        </span>
        <span className="hidden text-[15px] font-semibold tracking-tight sm:inline">Logan Thompson</span>
      </button>

      <div className="flex-1" />

      <nav className="hidden items-center gap-1 sm:flex">
        {HEADER_LINKS.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollToId(link.id)}
            className={cn(
              "rounded-lg px-2.5 py-1.5 font-mono text-xs transition-colors hover:text-foreground",
              active === link.id ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {link.label}
          </button>
        ))}
      </nav>

      <Button
        variant="outline"
        size="icon"
        className="h-[34px] w-[34px] rounded-[9px]"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
    </header>
  )
}
