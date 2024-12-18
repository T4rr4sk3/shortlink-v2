import type { CellContext } from "@tanstack/react-table";
import type { PropsWithChildren } from "react";

export interface WithClassName {
  className?: string
}

export interface WrapperProps extends WithClassName, PropsWithChildren {

}

/** Props to a next component that will receive the `params` props */
export interface WithParams<T> {
  params: T
}

/** Props to a next component that will receive the `searchParams` props */
export interface WithSearchParams<T> {
  searchParams: T
}

// tables
export interface CustomCellProps<T, TData> {
  context: CellContext<T, TData>
}

/** The side that the paginator will be, top or bottom */
export type PaginatorSide = "top" | "bottom"

export interface PaginatorProps {
  side?: PaginatorSide,
  showLines?: boolean,
  linesLabel?: string | ((rows: number) => string)
}