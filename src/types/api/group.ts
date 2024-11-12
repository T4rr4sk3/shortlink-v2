// export interface CreateGroupReturn {
//   id: number,
//   name: string,
//   createdAt: string,
// }

export interface GetGroupsReturn {
  id: number,
  name: string,
  parentGroupId: number | null,
  parentGroup: GetGroupsReturn | null,
  createdAt: string,
  links: number,
}