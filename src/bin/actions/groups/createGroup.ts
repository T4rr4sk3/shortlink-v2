"use server"
import { revalidateTag } from "next/cache"

import { tagGetLinkGroups } from "@app/bin/endpoints/linkGroup"
import type { CreateGroupReturn } from "@app/types/api/group"
import type { ApiCallError } from "@app/types/api"
import { callApi } from "@app/bin/http/callApi"

export async function doCreateGroup(formData: FormData) {
  const name = formData.get("name")?.toString()
  const parentGroupId = getParentGroupId(formData)
  const response = await callApi("/group", { method: "POST", data: { name, parentGroupId } })
  const data = await response.json()
  if(!response.ok) return data as ApiCallError
  revalidateTag(tagGetLinkGroups)
  return data as CreateGroupReturn
}

export async function doCreateTagFake(formData: FormData, fakeError?: boolean) {
  if (fakeError) return {
    name: "FakeRequestError",
    message: "Fake error",
    status: 400,
  } as ApiCallError
  const name = formData.get("name")?.toString()
  const parentGroupId = getParentGroupId(formData)
  const date = new Date().toISOString()
  return {
    id: 1,
    createdAt: date.replace("Z", "+00:00"),
    name,
    parentGroupId,
  } as CreateGroupReturn
}

function getParentGroupId(formData: FormData) {
  const id = formData.get("parentGroupId")?.toString()
  if(id) return parseInt(id)
}