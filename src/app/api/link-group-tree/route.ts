import type { GetLinkGroupTreeInternalReturn, GetLinkGroupTreeReturn, LinkOrGroup } from "@app/types/api/linkGroupTree";
import { getLinkGroupTreeGroupPathServer, getLinkGroupTreeServer } from "@app/bin/endpoints/linkGroupTree";
import type { SimpleGroup } from "@app/types/api/group";
import { dataIsApiCallError } from "@app/lib/api";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const groupId = request.nextUrl.searchParams.get("groupId") || undefined
  const linkGroupTreeOrError = await getLinkGroupTreeServer(groupId)
  if(dataIsApiCallError(linkGroupTreeOrError))
    return NextResponse.json(linkGroupTreeOrError, { status: linkGroupTreeOrError.status })
  let path = "/"
  const groupsPath: SimpleGroup[] = []
  if(groupId) {
    const groupPathOrError = await getLinkGroupTreeGroupPathServer(groupId)
    if(dataIsApiCallError(groupPathOrError))
      return NextResponse.json(groupPathOrError, { status: groupPathOrError.status })
    path = groupPathOrError.path
    groupsPath.push(...groupPathOrError.groupsOnPath)
  }
  const linksOrGroups = convertLinkGroupTreeToOutput(linkGroupTreeOrError)
  const result: GetLinkGroupTreeInternalReturn = { linksOrGroups, path, groupsPath, parentGroup: linkGroupTreeOrError.parentGroup }
  return NextResponse.json(result)
}

function convertLinkGroupTreeToOutput({ childrenLink: links, childrenGroup: groups }: GetLinkGroupTreeReturn): LinkOrGroup[] {
  const output: LinkOrGroup[] = []
  groups.forEach((group) => {
    output.push({
      id: group.id,
      name: group.name,
      createdAt: group.createdAt,
      type: "group",
      groupInfo: group
    })
  })
  links.forEach((link) => {
    output.push({
      id: link.id,
      name: link.name,
      createdAt: link.createdAt,
      type: "link",
      linkInfo: link
    })
  })
  return output
}
