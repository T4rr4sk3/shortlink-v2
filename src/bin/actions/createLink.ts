"use server"

import type { LinkCreatedReturn } from "@app/types/api/link"
import type { ApiCallError } from "@app/types/api"
import { callApi } from "../http/callApi"
import { revalidateTag } from "next/cache"

export async function doCreateLink(formData: FormData) {
  const name = formData.get("name")?.toString()
  const url = formData.get("url")?.toString()
  const expiresIn = formData.get("expiresAt")?.toString()
  const tags = getTags(formData)
  //const groupId = formData.get("groupId")?.toString()
  const response = await callApi("/link", { method: "POST", data: { name, url, expiresIn, tags } })
  const data = await response.json()
  if(!response.ok) return data as ApiCallError
  revalidateTag("links")
  revalidateTag("link-tags")
  revalidateTag("link-groups")
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
  const date = new Date().toISOString()
  console.log("Tags: ", getTags(formData))
  return {
    id: 1,
    code: "Dj0aQ",
    createdAt: date.replace("Z", "+00:00"),
    expiresAt,
    name,
    url,
  } as LinkCreatedReturn
}

function getTags(formData: FormData) {
  return formData.get("tags")?.toString()?.split(",").map((tid) => parseInt(tid))
}