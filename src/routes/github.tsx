import { createFileRoute } from "@tanstack/react-router"
import { Redirect } from "../components/redirect"

export const Route = createFileRoute("/github")({
  component: () => <Redirect platform="github" targetUrl={import.meta.env.VITE_GITHUB_URL} />,
})
