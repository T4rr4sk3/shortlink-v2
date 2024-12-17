"use server"

import { tagGetLinkGroupTree } from "../../endpoints/linkGroupTree"
import type { LinkCreatedReturn } from "@app/types/api/link"
import { tagGetLinkGroups } from "../../endpoints/linkGroup"
import { tagGetLinkTags } from "../../endpoints/linkTag"
import type { ApiCallError } from "@app/types/api"
import { revalidateTags } from "@app/lib/next"
import { callApi } from "../../http/callApi"

export async function doCreateLink(formData: FormData) {
  const name = formData.get("name")?.toString()
  const url = formData.get("url")?.toString()
  const expiresIn = formData.get("expiresAt")?.toString()
  const tags = getTags(formData)
  const groupId = getGroupId(formData)
  const response = await callApi("/link", { method: "POST", data: { name, url, expiresIn, tags, groupId } })
  const data = await response.json()
  if(!response.ok) return data as ApiCallError
  revalidateTags(tagGetLinkGroups, tagGetLinkTags, tagGetLinkGroupTree)
  return data as LinkCreatedReturn
}

export async function doCreateLinkFake(formData: FormData, fakeError?: boolean) {
  if (fakeError) return {
    name: "FakeRequestError",
    message: "Fake error",
    status: 400,
  } as ApiCallError
  const name = formData.get("name")?.toString()
  const url = formData.get("url")?.toString()
  const expiresAt = formData.get("expiresAt")?.toString() || null
  const createdAt = new Date().toISOString().replace("Z", "+00:00")
  const groupId = getGroupId(formData)
  console.log("Tags: ", getTags(formData))
  return {
    id: 1,
    code: "Dj0aQ",
    createdAt,
    expiresAt,
    name,
    url,
    linkGroup: groupId ? {
      id: groupId,
      name: "fake",
      createdAt,
      parentGroupId: null
    } : null,
  } as LinkCreatedReturn
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