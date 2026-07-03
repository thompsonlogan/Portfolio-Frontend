import { AnalyticsApi, GithubApi, Configuration, type ConfigurationParameters } from "./generated"

export interface ServiceApis {
  analyticsApi: AnalyticsApi
  githubApi: GithubApi
}

export function createServiceApis(configParams?: ConfigurationParameters): ServiceApis {
  const config = new Configuration(configParams)

  return {
    analyticsApi: new AnalyticsApi(config),
    githubApi: new GithubApi(config),
  }
}
