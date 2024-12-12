import type { HeaderContext, Table as TanStackTable } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table";
import { useReactTableContext } from "@app/hooks/use-react-table";
import ReactTableProvider from "../provider/ReactTableProvider";
import type { ClassNameColumnMeta } from "@app/types/global";
import type { ComponentProps } from "react";
import { cn } from "@app/lib/utils";

interface ReactTableProps<T = unknown> extends ComponentProps<typeof Table>{
  table: TanStackTable<T>
}
export function ReactTable<T = unknown>({ table, ...props }: ReactTableProps<T>) {
  return(
    <ReactTableProvider value={table}>
      <Table {...props} />
    </ReactTableProvider>
  )
}

export function ReactTableHeader({ children, ...props }: ComponentProps<typeof TableHeader>) {
  const { getHeaderGroups } = useReactTableContext()

  return(
    <TableHeader {...props}>
      {getHeaderGroups().map(headerGroup => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map(header => (
            <ReactTableHead context={header.getContext()} key={header.id} colSpan={header.colSpan}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </ReactTableHead>
          ))}
        </TableRow>
      ))}
      {children}
    </TableHeader>
  )
}

interface ReactTableHeadProps extends ComponentProps<"th"> {
  context: HeaderContext<unknown, unknown>
}
function ReactTableHead({ context, className, ...props }: ReactTableHeadProps) {
  const meta: ClassNameColumnMeta | undefined = context.column.columnDef.meta
  const title = context.column.columnDef.meta?.name
  return <TableHead className={cn(meta?.className, className)} title={title} aria-label={title} {...props} />
}

interface ReactTableBodyProps extends ComponentProps<typeof TableBody> {
  emptyMessage?: string,
}
export function ReactTableBody({ children, emptyMessage = "Sem resultados.", ...props }: ReactTableBodyProps) {
  const { getRowModel, getAllColumns } = useReactTableContext()
  const currentRows = getRowModel().rows
  return(
    <TableBody {...props}>
      {!currentRows.length &&
        <TableRow>
          <TableCell colSpan={getAllColumns().length}>
            {emptyMessage}
          </TableCell>
        </TableRow>
      }
      {currentRows.map(row => (
        <TableRow key={row.id}>
          {row.getVisibleCells().map(cell => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
      {children}
    </TableBody>
  )
}

export function ReactTableFooter({ children, ...props }: ComponentProps<typeof TableFooter>) {
  const { getFooterGroups } = useReactTableContext()

  return(
    <TableFooter {...props}>
      {getFooterGroups().map(footerGroup => (
        <TableRow key={footerGroup.id}>
          {footerGroup.headers.map(footer => (
            <TableCell key={footer.id} colSpan={footer.colSpan}>
              {flexRender(footer.column.columnDef.footer, footer.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
      {children}
    </TableFooter>
  )
}