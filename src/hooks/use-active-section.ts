import { useEffect, useState } from "react"

/**
 * Tracks which section id is currently centered in the viewport, for
 * highlighting nav links / dots.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "")

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0.001, rootMargin: "-45% 0px -45% 0px" }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [ids])

  return active
}
