import { createContext, useContext } from "react"
import type { ServiceApis } from "./data"

interface Services {
  apis: ServiceApis
}

export const ServiceContext = createContext<Services>(null!)

export function useServices() {
  return useContext(ServiceContext).apis
}
