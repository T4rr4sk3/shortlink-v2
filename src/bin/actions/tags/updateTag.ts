"use server"

import { revalidateTag } from "next/cache"

import type { CreateTagReturn } from "@app/types/api/tag"
import type { ApiCallError } from "@app/types/api"
import { callApi } from "@app/bin/http/callApi"

export async function doUpdateTag(formData: FormData) {
  const tagId = formData.get("tagId")?.toString()
  const name = formData.get("name")?.toString()
  const color = formData.get("color")?.toString()
  const response = await callApi("/tag/" + tagId, { method: "PATCH", data: { name, color } })
  const data = await response.json()
  if(!response.ok) return data as ApiCallError
  revalidateTag("link-tags")
  return data as CreateTagReturn
}

export async function dooUpdateTagFake(formData: FormData, fakeError?: boolean) {
  if (fakeError) return {
    name: "FakeRequestError",
    message: "Fake error",
    status: 400,
  } as ApiCallError
  const tagId = formData.get("tagId")?.toString() || ''
  const name = formData.get("name")?.toString()
  const color = formData.get("color")?.toString()
  const date = new Date().toISOString()
  return {
    id: parseInt(tagId),
    createdAt: date.replace("Z", "+00:00"),
    color,
    name,
  } as CreateTagReturn
}