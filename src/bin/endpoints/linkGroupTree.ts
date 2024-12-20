import { type GetLinkGroupTreeGroupPathReturn, type GetLinkGroupTreeLinkPathReturn, type GetLinkGroupTreeReturn } from "@app/types/api/linkGroupTree"
import type { GetLinkGroupTreeInternalReturn} from "@app/types/api/linkGroupTree";
import { callInternalApi } from "../http/callInternalApi"
import type { ApiCallError } from "@app/types/api"
import { callApi } from "../http/callApi"

export const tagGetLinkGroupTree = "link-group-tree"

export const getLinkGroupTreeServer = async (groupId?: number | string) => {
  const response = await callApi("/link-group-tree/all", { tags: [tagGetLinkGroupTree], params: { groupId }, revalidate: 60 })
  const data = await response.json()
  if(response.ok) return data as GetLinkGroupTreeReturn
  return data as ApiCallError
}

export const getLinkGroupTreeClient = async (groupId?: number | string) => {
  return callInternalApi<GetLinkGroupTreeInternalReturn>("/api/link-group-tree", { params: { groupId }, cache: "no-cache" })
}

export const getLinkGroupTreeGroupPathServer = async (groupId: number | string) => {
  const response = await callApi("/link-group-tree/group-path/" + groupId, { tags: [tagGetLinkGroupTree], revalidate: 60 })
  const data = await response.json()
  if(response.ok) return data as GetLinkGroupTreeGroupPathReturn
  return data as ApiCallError
}

export const getLinkGroupTreeLinkPathServer = async (linkId: number | string) => {
  const response = await callApi("/link-group-tree/link-path/" + linkId, { tags: [tagGetLinkGroupTree], revalidate: 60 })
  const data = await response.json()
  if(response.ok) return data as GetLinkGroupTreeLinkPathReturn
  return data as ApiCallError
}
