import type { GetTagsReturn } from "@app/types/api/tag";
import type { CustomCellProps } from "@app/types/props";
import ShowTagsDeleteTagDialog from "../dialog/deleteTag";
import ShowTagsEditTagDialog from "../dialog/editTag";

type TagCellProps<T = unknown> = CustomCellProps<GetTagsReturn, T>

export function ShowTagsTableCellActions({ context }: TagCellProps) {
  return(
    <div className="flex space-x-2">
      <ShowTagsEditTagDialog tag={context.row.original} />
      <ShowTagsDeleteTagDialog tag={context.row.original} />
    </div>
  )
}

export function ShowTagsTableCellColor({ context }: TagCellProps<string>) {
  const color = context.getValue()
  return (
    <div className="w-16 h-full text-transparent rounded-lg" style={{ backgroundColor: color }}>
      {color}
    </div>
  )
}

export function ShowTagsTableCellCreatedAt({ context }: TagCellProps<string>) {
  const formattedDate = new Date(context.getValue())
  return(
    <div className="text-right">
      {formattedDate.toLocaleString()}
    </div>
  )
}