import { createFileRoute } from "@tanstack/react-router"
import { useCallback, useEffect } from "react"
import { useTheme } from "@/components/theme-provider"
import {
  useAddGithubVisitMutation,
  useAddLinkedinVisitMutation,
  useAddResumeDownloadMutation,
  useAddVisitMutation,
} from "@/mutations/analytics-mutations"
import { ScrollProgress } from "@/components/portfolio/scroll-progress"
import { SiteHeader } from "@/components/portfolio/site-header"
import { LeftNav } from "@/components/portfolio/left-nav"
import { HeroSection } from "@/components/portfolio/hero-section"
import { AboutSection } from "@/components/portfolio/about-section"
import { WorkSection } from "@/components/portfolio/work-section"
import { FitlyticsSection } from "@/components/portfolio/fitlytics-section"
import { WritingSection } from "@/components/portfolio/writing-section"
// import { StackSection } from "@/components/portfolio/stack-section" // hidden — see below
import { GithubSection } from "@/components/portfolio/github-section"
import { ConnectSection } from "@/components/portfolio/connect-section"
import { SiteFooter } from "@/components/portfolio/site-footer"

export const Route = createFileRoute("/")({
  component: Index,
})

function Index() {
  const { theme, setTheme } = useTheme()

  const githubURL = import.meta.env.VITE_GITHUB_URL ?? "https://github.com/thompsonlogan"
  const linkedinURL = import.meta.env.VITE_LINKEDIN_URL ?? "https://www.linkedin.com/in/loganothompson"
  const resumeDownloadURL = import.meta.env.VITE_RESUME_DOWNLOAD_URL

  const source = new URLSearchParams(window.location.search).get("source") ?? "unknown"

  const { mutate: addVisit } = useAddVisitMutation()
  const { mutate: addGithubVisit } = useAddGithubVisitMutation()
  const { mutate: addLinkedinVisit } = useAddLinkedinVisitMutation()
  const { mutate: addResumeDownload } = useAddResumeDownloadMutation()

  useEffect(() => {
    addVisit({ source })
  }, [source, addVisit])

  const navigate = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light")
  }, [theme, setTheme])

  const handleGithub = useCallback(() => addGithubVisit({ source }), [addGithubVisit, source])
  const handleLinkedin = useCallback(() => addLinkedinVisit({ source }), [addLinkedinVisit, source])
  const handleResume = useCallback(() => {
    addResumeDownload({ source })
    if (!resumeDownloadURL) return
    // Trigger a file download. Note: the download filename is only honored for
    // same-origin URLs; for the cross-origin Google export the file is named
    // after the Google Doc's title (name the doc "LoganThompsonResume").
    const link = document.createElement("a")
    link.href = resumeDownloadURL
    link.download = "LoganThompsonResume.pdf"
    link.rel = "noopener"
    document.body.appendChild(link)
    link.click()
    link.remove()
  }, [addResumeDownload, source, resumeDownloadURL])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="bg-dot-grid pointer-events-none fixed inset-0 z-0" />
      <ScrollProgress />
      <SiteHeader />
      <LeftNav />

      <div className="relative z-[3] mx-auto max-w-[1120px] px-7">
        <HeroSection
          onNavigate={navigate}
          onToggleTheme={toggleTheme}
          onGithub={handleGithub}
          onLinkedin={handleLinkedin}
          onResume={handleResume}
        />
      </div>

      <div className="relative z-[3] mx-auto max-w-[1120px] px-7">
        <AboutSection />
        <WorkSection onResume={handleResume} />
      </div>

      <FitlyticsSection />

      <div className="relative z-[3] mx-auto max-w-[1120px] px-7">
        <WritingSection />
        <GithubSection onGithub={handleGithub} />
        {/* StackSection hidden (kept in src/components/portfolio/stack-section.tsx) */}
        <ConnectSection
          githubUrl={githubURL}
          linkedinUrl={linkedinURL}
          onGithub={handleGithub}
          onLinkedin={handleLinkedin}
          onResume={handleResume}
        />
        <SiteFooter />
      </div>
    </div>
  )
}
