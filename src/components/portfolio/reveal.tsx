import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

/** Fades + slides its children in the first time they scroll into view. */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn("transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform", className)}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(30px)",
      }}
    >
      {children}
    </div>
  )
}
