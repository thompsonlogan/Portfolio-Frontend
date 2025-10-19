import { useEffect, useMemo } from "react"
import { useAddGithubVisitMutation, useAddLinkedinVisitMutation } from "../mutations/analytics-mutations"

interface RedirectProps {
  platform: "github" | "linkedin"
  targetUrl: string
}

export function Redirect(props: RedirectProps) {
  const { platform, targetUrl } = props

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
    }, 10)

    return () => clearTimeout(timeout)
  }, [mutation, targetUrl])

  return <div>Redirecting to {platform}...</div>
}
