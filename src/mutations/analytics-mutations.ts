import { useMutation } from "@tanstack/react-query"
import { useServices } from "../services/context"
import type {
  VisitGithubPostRequest,
  VisitLinkedinPostRequest,
  VisitPostRequest,
  VisitResumePostRequest,
} from "../services/generated/apis/AnalyticsApi"
import type { HandlersAddVisitRequest } from "../services/generated/models"

export const useAddVisitMutation = () => {
  const { analyticsApi } = useServices()

  return useMutation({
    mutationFn: async (request: HandlersAddVisitRequest) => {
      const requestParameters: VisitPostRequest = {
        visit: request,
      }

      return await analyticsApi.visitPost(requestParameters)
    },
    onError: (error: unknown) => {
      console.log(error)
    },
  })
}

export const useAddGithubVisitMutation = () => {
  const { analyticsApi } = useServices()

  return useMutation({
    mutationFn: async (request: HandlersAddVisitRequest) => {
      const requestParameters: VisitGithubPostRequest = {
        visit: request,
      }

      return await analyticsApi.visitGithubPost(requestParameters)
    },
    onError: (error: unknown) => {
      console.log(error)
    },
  })
}

export const useAddLinkedinVisitMutation = () => {
  const { analyticsApi } = useServices()

  return useMutation({
    mutationFn: async (request: HandlersAddVisitRequest) => {
      const requestParameters: VisitLinkedinPostRequest = {
        visit: request,
      }

      return await analyticsApi.visitLinkedinPost(requestParameters)
    },
    onError: (error: unknown) => {
      console.log(error)
    },
  })
}

export const useAddResumeDownloadMutation = () => {
  const { analyticsApi } = useServices()

  return useMutation({
    mutationFn: async (request: HandlersAddVisitRequest) => {
      const requestParameters: VisitResumePostRequest = {
        visit: request,
      }

      return await analyticsApi.visitResumePost(requestParameters)
    },
    onError: (error: unknown) => {
      console.log(error)
    },
  })
}
