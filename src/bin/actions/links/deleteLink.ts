"use server"

import type { ApiCallError } from "@app/types/api"
import { callApi } from "@app/bin/http/callApi"
import { tagGetLinkGroupTree } from "@app/bin/endpoints/linkGroupTree"
import { revalidateTags } from "@app/lib/next"
import { tagGetLinkGroups } from "@app/bin/endpoints/linkGroup"
import { tagGetLinkTags } from "@app/bin/endpoints/linkTag"

export async function doDeleteLink(formData: FormData) {
  const linkId = formData.get("linkId")?.toString()
  const response = await callApi("/link/" + linkId, { method: "DELETE" })
  if(!response.ok) return response.json() as Promise<ApiCallError>
  revalidateTags(tagGetLinkGroups, tagGetLinkTags, tagGetLinkGroupTree)
}