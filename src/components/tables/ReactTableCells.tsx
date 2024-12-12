import type { CellContext } from "@tanstack/react-table"
import { cn } from "@app/lib/utils"

interface CellProps<T, TData> {
  context: CellContext<T, TData>
  isID?: boolean,
  inCenter?: boolean,
  className?: string,
  value?: string,
  decimalDigits?: number,
  boolValue?: { truthy: string, falsy: string }
}
export function ReactTableCellBase<T = unknown, TData = unknown>(
  { context: { getValue }, value, className, isID, inCenter, decimalDigits, boolValue }: CellProps<T, TData>
) {
  const normalText = boolValue ?
    (getValue() ? boolValue.truthy : boolValue.falsy)
  : value || getValue() as string | undefined

  const decimalText = !decimalDigits ?
    undefined // if don't have decimal digits
  : parseFloat(String(normalText)).toFixed(decimalDigits)

  const visibleValue = decimalText || normalText

  return(
    <div title={visibleValue} className={cn(inCenter && "text-center", isID && "text-right font-medium", className)}>
      {visibleValue}
    </div>
  )
}

interface CellDateProps<T = unknown, TData = unknown> {
  className?: string,
  context: CellContext<T, TData>,
  dateType?: "datetime" | "date" | "time"
}
export function ReactTableCellDate<T = unknown, TData = unknown>({ context, dateType = "datetime", className = "text-right" }: CellDateProps<T, TData>) {
  const formattedDate = new Date(context.getValue() as string)
  return(
    <div className={className}>
      {dateType === "datetime" ?
        formattedDate.toLocaleString()
        : dateType === "date" ?
          formattedDate.toLocaleDateString()
          : formattedDate.toLocaleTimeString()
      }
    </div>
  )
}