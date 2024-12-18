import type { GetGroupByIdReturn, GetGroupsReturn } from "@app/types/api/group"
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

export async function getGroupByIdServer(id: number | string) {
  const response = await callApi("/group/" + id, { tags: [tagGetLinkGroups, id.toString()] })
  const data = await response.json()
  if(response.ok) return data as GetGroupByIdReturn
  return data as ApiCallError
}

// export async function getGroupByIdClient(id: number | string) {
//   return callInternalApi<GetGroupByIdReturn>("/api/group/" + id, { tags: [id.toString()] })
// }