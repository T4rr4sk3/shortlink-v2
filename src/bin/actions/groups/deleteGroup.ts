"use server"

import { revalidateTag } from "next/cache"

import type { ApiCallError } from "@app/types/api"
import { callApi } from "@app/bin/http/callApi"
import { tagGetLinkGroups } from "@app/bin/endpoints/linkGroup"

export async function doDeleteGroup(formData: FormData) {
  const groupId = formData.get("groupId")?.toString()
  const response = await callApi("/group/" + groupId, { method: "DELETE" })
  if(!response.ok) return response.json() as Promise<ApiCallError>
  revalidateTag(tagGetLinkGroups)
}