import { useEffect } from "react"
import { useAddGithubVisitMutation, useAddLinkedinVisitMutation } from "../mutations/analytics-mutations"

interface RedirectProps {
  platform: "github" | "linkedin"
  targetUrl: string
}

export function Redirect(props: RedirectProps) {
  const { platform, targetUrl } = props

  const githubMutation = useAddGithubVisitMutation()
  const linkedinMutation = useAddLinkedinVisitMutation()

  const mutation = platform === "github" ? githubMutation : linkedinMutation

  useEffect(() => {
    console.log("run")
    const params = new URLSearchParams(window.location.search)
    const source = params.get("source") ?? "unknown"

    mutation.mutate({ source })

    const timeout = setTimeout(() => {
      window.location.href = targetUrl
    }, 10)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetUrl])

  return <div>Redirecting to {platform}...</div>
}
