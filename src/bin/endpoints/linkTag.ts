import type { GetTagByIdReturn, GetTagsReturn } from "@app/types/api/tag"
import { callInternalApi } from "../http/callInternalApi"
import type { ApiCallError } from "@app/types/api"
import { callApi } from "../http/callApi"

export const tagGetLinkTags = "link-tags"

export const getLinkTagsServer = async (name?: string) => {
  const response = await callApi("/tags", {
    params: { name },
    tags: [tagGetLinkTags],
    revalidate: 60
  })
  const data = await response.json()
  if(response.ok) return data as GetTagsReturn[]
  return data as ApiCallError
}

export const getLinkTagsClient = async (name?: string) => {
  return callInternalApi<GetTagsReturn[]>("/api/tags", { params: { name }, cache: "no-cache" })
}

export const getLinkTagsFake = async (name?: string, fakeError?: boolean) => {
  if(fakeError) {
    return {
      message: "Fake Error",
      name: "FakeRequestError",
      status: 400
    } as ApiCallError
  }
  const createdAt = new Date().toISOString()
  const links = 0
  let id: number = 1
  const tags: GetTagsReturn[] = [
    { id: id++, name: "Tag 1", color: "#DD00FF", createdAt, links },
    { id: id++, name: "Tag 2", color: "#FFFF00", createdAt, links },
    { id: id++, name: "Tag 3", color: "#53F074", createdAt, links },
    { id: id++, name: "Tag 4", color: "#42DF83", createdAt, links },
    { id: id++, name: "Tag 5", color: "#00FF00", createdAt, links },
    { id: id++, name: "Novamente", color: "#0000FF", createdAt, links },
    { id: id++, name: "Especial", color: "#215F71", createdAt, links },
  ]
  if(!name) return tags
  return tags.filter((t) => t.name.includes(name))
}

export async function getTagByIdServer(id: number | string) {
  const response = await callApi("/tag/" + id, { tags: [tagGetLinkTags, id.toString()] })
  const data = await response.json()
  if(response.ok) return data as GetTagByIdReturn
  return data as ApiCallError
}