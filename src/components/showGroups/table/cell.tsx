import ShowGroupsDeleteGroupDialog from "../dialog/deleteGroup";
import ShowGroupsEditGroupDialog from "../dialog/editGroup";
import type { GetGroupsReturn } from "@app/types/api/group";
import type { CustomCellProps } from "@app/types/props";

type TagCellProps<T = unknown> = CustomCellProps<GetGroupsReturn, T>

export function ShowGroupsTableCellActions({ context }: TagCellProps) {
  return(
    <div className="flex space-x-2">
      <ShowGroupsEditGroupDialog group={context.row.original} />
      <ShowGroupsDeleteGroupDialog group={context.row.original} />
    </div>
  )
}

export function ShowGroupsTableParentGroup({ context }: TagCellProps) {
  const parentGroupName = context.row.original.parentGroup?.name
  return(
    <p className="max-w-44 truncate" title={parentGroupName}>
      {parentGroupName || "-"}
    </p>
  )
}

export function ShowGroupsTableCellCreatedAt({ context }: TagCellProps<string>) {
  const formattedDate = new Date(context.getValue())
  return(
    <div className="text-center">
      {formattedDate.toLocaleString()}
    </div>
  )
}