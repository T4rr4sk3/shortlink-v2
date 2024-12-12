import type { GetLinkReturn } from "@app/types/api/link";
import type { ApiCallError } from "@app/types/api";
import { callApi } from "../http/callApi";
import { callInternalApi } from "../http/callInternalApi";

export const tagGetLink = "link"

export async function getLinkByIdServer(id: number | string) {
  const response = await callApi("/link/" + id, { tags: [tagGetLink, id.toString()] })
  const data = await response.json()
  if(response.ok) return data as GetLinkReturn
  return data as ApiCallError
}

export async function getLinkByIdClient(id: number | string) {
  return callInternalApi<GetLinkReturn>("/api/link/" + id, { tags: [id.toString()] })
}