import { useEffect, useMemo } from "react"
import { useAddGithubVisitMutation, useAddLinkedinVisitMutation } from "../mutations/analytics-mutations"

interface RedirectProps {
  platform: "github" | "linkedin"
  targetUrl: string
}

export function Redirect({ platform, targetUrl }: RedirectProps) {
  const { mutate: addGithubVisit } = useAddGithubVisitMutation()
  const { mutate: addLinkedinVisit } = useAddLinkedinVisitMutation()

  const mutation = useMemo(() => {
    return platform === "github" ? addGithubVisit : addLinkedinVisit
  }, [platform, addGithubVisit, addLinkedinVisit])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const source = params.get("source") ?? "unknown"

    mutation({ source })

    const timeout = setTimeout(() => {
      window.location.href = targetUrl
    }, 1000)

    return () => clearTimeout(timeout)
  }, [mutation, targetUrl])

  const platformName = platform === "github" ? "GitHub" : "LinkedIn"

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h2 className="text-2xl font-semibold mb-2">Redirecting to {platformName}...</h2>
      <p className="text-sm">
        If you’re not redirected automatically,{" "}
        <a
          href={targetUrl}
          className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          click here
        </a>
        .
      </p>
    </div>
  )
}
