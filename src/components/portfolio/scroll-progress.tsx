import { useEffect, useState } from "react"

export function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return <div className="fixed left-0 top-0 z-[60] h-0.5 bg-brand transition-[width]" style={{ width: `${pct}%` }} />
}
