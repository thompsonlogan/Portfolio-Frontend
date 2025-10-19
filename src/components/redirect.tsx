import { useEffect, useMemo } from "react"
import { useAddGithubVisitMutation, useAddLinkedinVisitMutation } from "../mutations/analytics-mutations"

interface RedirectProps {
  platform: "github" | "linkedin"
  targetUrl: string
}

export function Redirect(props: RedirectProps) {
  const { platform, targetUrl } = props

  const githubMutation = useAddGithubVisitMutation()
  const linkedinMutation = useAddLinkedinVisitMutation()

  const mutation = useMemo(() => {
    return platform === "github" ? githubMutation : linkedinMutation
  }, [githubMutation, linkedinMutation, platform])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const source = params.get("source") ?? "unknown"

    mutation.mutate({ source })

    const timeout = setTimeout(() => {
      window.location.href = targetUrl
    }, 10)

    return () => clearTimeout(timeout)
  }, [mutation, targetUrl])

  return <div>Redirecting to {platform}...</div>
}
