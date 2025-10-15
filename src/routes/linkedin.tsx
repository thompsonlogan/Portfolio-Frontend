import { createFileRoute } from "@tanstack/react-router"
import { Redirect } from "../components/redirect"

export const Route = createFileRoute("/linkedin")({
  component: () => <Redirect platform="linkedin" targetUrl={import.meta.env.VITE_LINKEDIN_URL} />,
})
