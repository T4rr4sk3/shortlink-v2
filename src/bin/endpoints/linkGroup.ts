import type { ApiCallError } from "@app/types/api"
import { callApi } from "../http/callApi"

export const getLinkGroups = async (name?: string) => {
  const response = await callApi("/groups", { params: { name }, tags: ["groups"] })
  const data = await response.json()
  if(response.ok) return data as Array<object>
  return data as ApiCallError
}
