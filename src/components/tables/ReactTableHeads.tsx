import type { HeaderContext, SortDirection } from "@tanstack/react-table";

import ChevronUpDownIcon from "../icons/chevronUpDown";
import ChevronDownIcon from "../icons/chevronDown";
import ChevronUpIcon from "../icons/chevronUp";
import { cn } from "@app/lib/utils";

interface HeadProps<T, TData> {
  context: HeaderContext<T, TData>
  className?: string,
  title?: string,
}
export function ReactTableHeadBase<T = unknown, TData = unknown>(
  { context: { column }, title: titleProp, className }: HeadProps<T, TData>
) {
  //const isFilterable = column.getCanFilter()
  const isFiltered = column.getIsFiltered()
  const isSortable = column.getCanSort()
  const sorting = column.getIsSorted() || undefined
  const handleSort = column.getToggleSortingHandler()
  const title = titleProp || column.columnDef.meta?.name || column.id

  return(
    <div className={cn("group", className)}>
      <div
        className={cn("text-center inline-flex items-center space-x-2", isSortable && "cursor-pointer select-none")}
        title={title}
        aria-label={title}
        onClick={handleSort}
        role={isSortable? "button" : undefined}
      >
        <span className={cn(isFiltered && "font-bold")}> {title} </span>

        {isSortable &&
          <IconBySorting sorting={sorting} />
        }

        {/* {isFilterable &&
          <TanStackThFilter name={title} column={column} />
        } */}
      </div>
    </div>
  )
}

function IconBySorting({ sorting }: { sorting?: SortDirection }) {
  const className = "size-5"

  if(sorting === "asc") return <ChevronUpIcon className={className} />

  if(sorting === "desc") return <ChevronDownIcon className={className} />

  return <ChevronUpDownIcon className={cn("text-gray-400", className)} />
}