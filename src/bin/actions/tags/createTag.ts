"use server"
import { revalidateTag } from "next/cache"

import { tagGetLinkTags } from "@app/bin/endpoints/linkTag"
import type { CreateTagReturn } from "@app/types/api/tag"
import type { ApiCallError } from "@app/types/api"
import { callApi } from "@app/bin/http/callApi"

export async function doCreateTag(formData: FormData) {
  const name = formData.get("name")?.toString()
  const color = formData.get("color")?.toString()
  const response = await callApi("/tag", { method: "POST", data: { name, color } })
  const data = await response.json()
  if(!response.ok) return data as ApiCallError
  revalidateTag(tagGetLinkTags)
  return data as CreateTagReturn
}

export async function doCreateTagFake(formData: FormData, fakeError?: boolean) {
  if (fakeError) return {
    name: "FakeRequestError",
    message: "Fake error",
    status: 400,
  } as ApiCallError
  const name = formData.get("name")?.toString()
  const date = new Date().toISOString()
  return {
    id: 1,
    createdAt: date.replace("Z", "+00:00"),
    name,
  } as CreateTagReturn
}