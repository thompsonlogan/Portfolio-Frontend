import { useActiveSection } from "@/hooks/use-active-section"
import { NAV_SECTIONS } from "@/data/portfolio"
import { cn } from "@/lib/utils"

export function LeftNav() {
  const active = useActiveSection(NAV_SECTIONS.map((s) => s.id))

  return (
    <nav className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3.5 lg:flex">
      {NAV_SECTIONS.map((section) => (
        <button
          key={section.id}
          title={section.label}
          aria-label={`Go to ${section.label}`}
          onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })}
          className={cn(
            "w-[9px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            active === section.id ? "h-7 bg-foreground" : "h-[9px] bg-muted-foreground/50 hover:bg-muted-foreground"
          )}
        />
      ))}
    </nav>
  )
}
