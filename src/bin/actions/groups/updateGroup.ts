"use server"

import { revalidateTag } from "next/cache"

import type { CreateGroupReturn } from "@app/types/api/group"
import type { ApiCallError } from "@app/types/api"
import { callApi } from "@app/bin/http/callApi"

export async function doUpdateGroup(formData: FormData) {
  const groupId = formData.get("groupId")?.toString()
  const name = formData.get("name")?.toString()
  const parentGroupId = getParentGroupId(formData)
  const response = await callApi("/group/" + groupId, { method: "PATCH", data: { name, parentGroupId } })
  const data = await response.json()
  if(!response.ok) return data as ApiCallError
  revalidateTag("link-groups")
  return data as CreateGroupReturn
}

export async function doUpdateGroupFake(formData: FormData, fakeError?: boolean) {
  if (fakeError) return {
    name: "FakeRequestError",
    message: "Fake error",
    status: 400,
  } as ApiCallError
  const groupId = formData.get("groupId")?.toString() || ""
  const name = formData.get("name")?.toString()
  const parentGroupId = getParentGroupId(formData)
  const date = new Date().toISOString()
  return {
    id: parseInt(groupId),
    createdAt: date.replace("Z", "+00:00"),
    name,
    parentGroupId,
    parentGroup: null,
  } as CreateGroupReturn
}

function getParentGroupId(formData: FormData) {
  const id = formData.get("parentGroupId")?.toString()
  if(id) return parseInt(id)
  return null
}