import Link from "next/link";

import ShowGroupsDeleteGroupDialog from "../dialog/deleteGroup";
import ShowGroupsEditGroupDialog from "../dialog/editGroup";
import type { GetGroupsReturn } from "@app/types/api/group";
import type { CustomCellProps } from "@app/types/props";
import GroupIcon from "@app/components/icons/group";

type GroupCellProps<T = unknown> = CustomCellProps<GetGroupsReturn, T>

export function ShowGroupsTableCellActions({ context }: GroupCellProps) {
  return(
    <div className="flex space-x-2">
      <ShowGroupsEditGroupDialog group={context.row.original} />
      <ShowGroupsDeleteGroupDialog group={context.row.original} />
    </div>
  )
}

export function ShowGroupsTableParentGroup({ context }: GroupCellProps) {
  const parentGroupName = context.row.original.parentGroup?.name
  return(
    <p className="max-w-44 truncate" title={parentGroupName}>
      {parentGroupName || "-"}
    </p>
  )
}

export function ShowGroupsTableCellName({ searchName, context}: GroupCellProps<string> & { searchName: string }) {
  const url = `/show-links?${searchName}=${context.row.original.id}`
  const groupName = context.getValue()
  return (
    <Link className="underline flex items-center" title={groupName} href={url}>
      <GroupIcon className="size-6 mr-2 text-cinza-fumaca-main" />
      {groupName}
    </Link>
  )
}

export function ShowGroupsTableCellCreatedAt({ context }: GroupCellProps<string>) {
  const formattedDate = new Date(context.getValue())
  return(
    <div className="text-center">
      {formattedDate.toLocaleString()}
    </div>
  )
}