import { callInternalApi } from "../http/callInternalApi";
import type { GetLinkReturn } from "@app/types/api/link";
import type { ApiCallError } from "@app/types/api";
import { callApi } from "../http/callApi";

export const tagGetLink = "link"

export async function getLinkByIdServer(id: number | string) {
  const response = await callApi("/link/" + id, { tags: [tagGetLink, id.toString()], revalidate: 60 })
  const data = await response.json()
  if(response.ok) return data as GetLinkReturn
  return data as ApiCallError
}

export async function getLinkByIdClient(id: number | string) {
  return callInternalApi<GetLinkReturn>("/api/link/" + id, { tags: [tagGetLink, id.toString()] })
}

export async function getLinksServer(options?: GetLinksParams) {
  const response = await callApi("/links", { params: options, tags: [tagGetLink], revalidate: 60 })
  const data = await response.json()
  if(response.ok) return data as GetLinkReturn[]
  return data as ApiCallError
}

export async function getLinksClient(options?: GetLinksParams) {
  return callInternalApi<GetLinkReturn[]>("/api/links", { params: options, tags: [tagGetLink] })
}

type GetLinksParams = {
  name?: string,
  tag?: number | string
}