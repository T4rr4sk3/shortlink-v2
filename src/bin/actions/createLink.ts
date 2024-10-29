"use server"

import type { GetLinkReturn } from "@app/types/api/link"
import type { ApiCallError } from "@app/types/api"
import { callApi } from "../http/callApi"
import { revalidateTag } from "next/cache"

export async function doCreateLink(formData: FormData) {
  const name = formData.get("name")?.toString()
  const url = formData.get("url")?.toString()
  const response = await callApi("/link", { method: "POST", data: { name, url } })
  const data = await response.json()
  if(!response.ok) return data as ApiCallError
  revalidateTag("links")
  return data as GetLinkReturn
}