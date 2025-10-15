import "./index.css"
import { StrictMode } from "react"
import { routeTree } from "./routeTree.gen"
import { createRoot } from "react-dom/client"
import { ThemeProvider } from "./components/theme-provider"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createServiceApis } from "./services/data"
import { ServiceContext } from "./services/context"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not defined. Please check your .env file.")
}

if (!FRONTEND_URL) {
  throw new Error("VITE_FRONTEND_URL is not defined. Please check your .env file.")
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
})

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const services = {
  apis: createServiceApis({
    basePath: API_BASE_URL,
  }),
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ServiceContext.Provider value={services}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </ServiceContext.Provider>
    </QueryClientProvider>
  </StrictMode>
)
