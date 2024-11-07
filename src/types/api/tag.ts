export interface CreateTagReturn {
  id: number,
  name: string,
  color: string,
  createdAt: string,
}

export interface GetTagsReturn {
  id: number,
  name: string,
  color: string,
  createdAt: string,
  links: number,
}