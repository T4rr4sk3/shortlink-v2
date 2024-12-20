import { forwardRef, type InputHTMLAttributes } from "react"

import { cn } from "@app/lib/utils"

export type SearchInputProps = InputHTMLAttributes<HTMLInputElement>

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "px-2 py-1 w-full rounded-md text-sm bg-white ring-offset-white gap-4",
          "placeholder:text-cinza-fumaca-main disabled:cursor-not-allowed disabled:opacity-50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
SearchInput.displayName = "SearchInput"

export { SearchInput }