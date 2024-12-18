import type { GetTagsReturn } from "@app/types/api/tag";
import type { CustomCellProps } from "@app/types/props";
import ShowTagsDeleteTagDialog from "../dialog/deleteTag";
import ShowTagsEditTagDialog from "../dialog/editTag";
import Link from "next/link";
import TagIcon from "@app/components/icons/tag";

type TagCellProps<T = unknown> = CustomCellProps<GetTagsReturn, T>

export function ShowTagsTableCellActions({ context }: TagCellProps) {
  return(
    <div className="flex space-x-2">
      <ShowTagsEditTagDialog tag={context.row.original} />
      <ShowTagsDeleteTagDialog tag={context.row.original} />
    </div>
  )
}

export function ShowTagsTableCellName({ context, searchName }: TagCellProps<string> & { searchName:  string }) {
  const url = `/show-links-by-tag?${searchName}=${context.row.original.id}`
  const tagName = context.getValue()
  const color = context.row.original.color
  return (
    <Link className="underline flex items-center" title={tagName} href={url}>
      <TagIcon className="size-5 mr-2 text-cinza-fumaca-main opacity-80" style={{ color }} />
      {tagName}
    </Link>
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