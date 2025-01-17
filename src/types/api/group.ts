import type { SimpleLink } from "./link"

export interface GetGroupByIdReturn {
  id: number,
  name: string,
  createdAt: string,
  parentGroupId: number | null,
  parentGroup: SimpleGroup | null,
  links: SimpleLink[]
}

export interface CreateGroupReturn {
  id: number,
  name: string,
  createdAt: string,
  parentGroupId: number | null,
  parentGroup: SimpleGroup | null
}

export interface SimpleGroup {
  id: number,
  name: string,
  createdAt: string,
  parentGroupId: number | null,
}

export interface GetGroupsReturn {
  id: number,
  name: string,
  createdAt: string,
  parentGroupId: number | null,
  parentGroup: SimpleGroup | null,
  links: number,
}