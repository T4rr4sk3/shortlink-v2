import type { SimpleGroup } from "./group";
import type { SimpleLink, SimpleLinkWithTags } from "./link";

export interface GetLinkGroupTreeReturn {
  parentGroup: SimpleGroup | null,
  childrenGroup: SimpleGroup[],
  childrenLink: SimpleLinkWithTags[],
}

export interface GetLinkGroupTreeGroupPathReturn {
  group: SimpleGroup,
  path: string,
  groupsOnPath: SimpleGroup[]
}

export interface GetLinkGroupTreeLinkPathReturn {
  link: SimpleLink,
  path: string,
  groupsOnPath: SimpleGroup[]
}

export interface LinkOrGroup {
  id: number,
  name: string,
  createdAt: string,
  type: "link" | "group",
  linkInfo?: SimpleLinkWithTags,
  groupInfo?: SimpleGroup,
}

export interface GetLinkGroupTreeInternalReturn {
  linksOrGroups: LinkOrGroup[],
  parentGroup: SimpleGroup | null,
  groupsPath: SimpleGroup[],
  path: string,
}