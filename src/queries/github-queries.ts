import { useQuery } from "@tanstack/react-query"
import { useServices } from "../services/context"

const STALE_TIME = 1000 * 60 * 10 // 10 minutes

export const useGithubProfile = () => {
  const { githubApi } = useServices()

  return useQuery({
    queryKey: ["github", "profile"],
    queryFn: () => githubApi.githubProfileGet(),
    staleTime: STALE_TIME,
  })
}

export const useGithubRepos = () => {
  const { githubApi } = useServices()

  return useQuery({
    queryKey: ["github", "repos"],
    queryFn: () => githubApi.githubReposGet(),
    staleTime: STALE_TIME,
  })
}

export const useGithubPinned = () => {
  const { githubApi } = useServices()

  return useQuery({
    queryKey: ["github", "pinned"],
    queryFn: () => githubApi.githubPinnedGet(),
    staleTime: STALE_TIME,
  })
}

export const useGithubLanguages = () => {
  const { githubApi } = useServices()

  return useQuery({
    queryKey: ["github", "languages"],
    queryFn: () => githubApi.githubLanguagesGet(),
    staleTime: STALE_TIME,
  })
}

export const useGithubContributions = () => {
  const { githubApi } = useServices()

  return useQuery({
    queryKey: ["github", "contributions"],
    queryFn: () => githubApi.githubContributionsGet(),
    staleTime: STALE_TIME,
  })
}
