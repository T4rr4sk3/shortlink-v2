"use server"
import { revalidateTag } from "next/cache"

import { tagGetLinkTags } from "@app/bin/endpoints/linkTag"
import type { ApiCallError } from "@app/types/api"
import { callApi } from "@app/bin/http/callApi"

export async function doDeleteTag(formData: FormData) {
  const tagId = formData.get("tagId")?.toString()
  const response = await callApi("/tag/" + tagId, { method: "DELETE" })
  if(!response.ok) return response.json() as Promise<ApiCallError>
  revalidateTag(tagGetLinkTags)
}