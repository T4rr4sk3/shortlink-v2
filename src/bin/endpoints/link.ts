import type { GetLinkReturn } from "@app/types/api/link";
import type { ApiCallError } from "@app/types/api";
import { callApi } from "../http/callApi";

export async function getLinkById(id: number) {
  const response = await callApi("/link/" + id, { tags: ["link", id.toString()] })
  const data = await response.json()
  if(response.ok) return data as GetLinkReturn
  return data as ApiCallError
}