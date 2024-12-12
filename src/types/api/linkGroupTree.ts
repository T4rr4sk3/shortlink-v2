import type { SimpleGroup } from "./group";
import type { SimpleLink } from "./link";

export interface GetLinkGroupTreeReturn {
  parentGroup: SimpleGroup | null,
  childrenGroup: SimpleGroup[],
  childrenLink: SimpleLink[],
}

export interface GetLinkGroupTreeGroupPathReturn {
  group: SimpleGroup,
  path: string,
  groupsOnPath: SimpleGroup[]
}

export interface GetLinkGroupTreeLinkPathReturn {
  link: SimpleLink,
  path: string
}

export interface LinkOrGroup {
  id: number,
  name: string,
  createdAt: string,
  type: "link" | "group",
  linkInfo?: SimpleLink,
  groupInfo?: SimpleGroup,
}

export interface GetLinkGroupTreeInternalReturn {
  linksOrGroups: LinkOrGroup[],
  parentGroup: SimpleGroup | null,
  groupsPath: SimpleGroup[],
  path: string,
}