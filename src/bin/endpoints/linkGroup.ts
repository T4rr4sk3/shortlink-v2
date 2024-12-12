import type { GetGroupsReturn } from "@app/types/api/group"
import { callInternalApi } from "../http/callInternalApi"
import type { ApiCallError } from "@app/types/api"
import { callApi } from "../http/callApi"

export const tagGetLinkGroups = "link-groups"

export const getLinkGroupsServer = async (name?: string) => {
  const response = await callApi("/groups", { params: { name }, tags: [tagGetLinkGroups], revalidate: 60 })
  const data = await response.json()
  if(response.ok) return data as GetGroupsReturn[]
  return data as ApiCallError
}

export const getLinkGroupsClient = async (name?: string) => {
  return callInternalApi<GetGroupsReturn[]>("/api/groups", { params: { name }, cache: "no-cache" })
}