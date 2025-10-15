import { AnalyticsApi, Configuration, type ConfigurationParameters } from "./generated"

export interface ServiceApis {
  analyticsApi: AnalyticsApi
}

export function createServiceApis(configParams?: ConfigurationParameters): ServiceApis {
  const config = new Configuration(configParams)

  return {
    analyticsApi: new AnalyticsApi(config),
  }
}
