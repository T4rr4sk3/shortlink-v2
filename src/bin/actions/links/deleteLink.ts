"use server"
import { tagGetLinkGroupTree } from "@app/bin/endpoints/linkGroupTree"
import { tagGetLinkGroups } from "@app/bin/endpoints/linkGroup"
import { tagGetLinkTags } from "@app/bin/endpoints/linkTag"
import type { ApiCallError } from "@app/types/api"
import { callApi } from "@app/bin/http/callApi"
import { revalidateTags } from "@app/lib/next"

export async function doDeleteLink(formData: FormData) {
  const linkId = formData.get("linkId")?.toString()
  const response = await callApi("/link/" + linkId, { method: "DELETE" })
  if(!response.ok) return response.json() as Promise<ApiCallError>
  revalidateTags(tagGetLinkGroups, tagGetLinkTags, tagGetLinkGroupTree)
}