"use server"

import { tagGetLinkGroups } from "@app/bin/endpoints/linkGroup"
import { tagGetLinkGroupTree } from "@app/bin/endpoints/linkGroupTree"
import type { LinkCreatedReturn } from "@app/types/api/link"
import { tagGetLinkTags } from "@app/bin/endpoints/linkTag"
import type { ApiCallError } from "@app/types/api"
import { callApi } from "@app/bin/http/callApi"
import { revalidateTags } from "@app/lib/next"

export async function doUpdateLink(formData: FormData) {
  const linkId = formData.get("linkId")?.toString()
  const name = formData.get("name")?.toString()
  const expiresIn = formData.get("expiresAt")?.toString()
  const tags = getTags(formData)
  const groupId = getGroupId(formData)
  const response = await callApi("/link/" + linkId, { method: "PATCH", data: { name, expiresIn, tags, groupId } })
  const data = await response.json()
  if(!response.ok) return data as ApiCallError
  revalidateTags(tagGetLinkGroups, tagGetLinkTags, tagGetLinkGroupTree)
  return data as LinkCreatedReturn
}

function getTags(formData: FormData) {
  const tagsValue = formData.get("tags")?.toString()
  if(!tagsValue) return []
  return tagsValue.split(",").map((tagId) => parseInt(tagId))
}

function getGroupId(formData: FormData) {
  const groupId = formData.get("groupId")?.toString()
  if(groupId) return parseInt(groupId)
}