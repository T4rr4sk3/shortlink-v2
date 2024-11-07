import type { GetTagsReturn } from "@app/types/api/tag"
import type { ApiCallError } from "@app/types/api"
import { callApi } from "../http/callApi"
import { callInternalApi } from "../http/callInternalApi"

export const getLinkTags = async (name?: string) => {
  const response = await callApi("/tags", {
    params: { name },
    tags: ["link-tags"],
    revalidate: 60
  })
  const data = await response.json()
  if(response.ok) return data as GetTagsReturn[]
  return data as ApiCallError
}

export const getLinkTagsInternal = async (name?: string) => {
  return callInternalApi<GetTagsReturn[]>("/api/tags", { params: { name }, cache: "no-cache" })
}