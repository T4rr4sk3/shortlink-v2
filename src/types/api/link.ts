
// create link
export interface LinkCreatedReturn {
  id: number,
  url: string,
  name: string,
  code: string,
  createdAt: string,
  expiresAt: string | null,
  linkGroup: LinkGroup | null,
}

// get link
export interface GetLinkReturn {
  id: number,
  url: string,
  name: string,
  code: string,
  visits: number,
  createdAt: string,
  expiresAt: string | null,
  linkGroup: LinkGroup | null,
  linkTags: LinkTag[],
}

interface LinkGroup {
  id: number,
  name: string,
  createdAt: string,
  parentGroupId: number | null
}

interface LinkTag {
  id: number,
  name: string,
  color: string,
  createdAt: string,
}