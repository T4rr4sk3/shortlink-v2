import type { ApiCallError } from "@app/types/api"
import { callApi } from "../http/callApi"
import { callInternalApi } from "../http/callInternalApi"

export const getLinkGroupsServer = async (name?: string) => {
  const response = await callApi("/groups", { params: { name }, tags: ["groups"] })
  const data = await response.json()
  if(response.ok) return data as Array<object>
  return data as ApiCallError
}

export const getLinkGroupsClient = async (name?: string) => {
  return callInternalApi<object[]>("/api/groups", { params: { name }, cache: "no-cache" })
}