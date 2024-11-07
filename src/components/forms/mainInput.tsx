import * as React from "react"

import { cn } from "@app/lib/utils"

export type MainInputProps = React.InputHTMLAttributes<HTMLInputElement>

const MainInput = React.forwardRef<HTMLInputElement, MainInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-cinza-fumaca-light bg-white px-3 py-2 text-cinza-fumaca-dark text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-cinza-fumaca-dark placeholder:text-cinza-fumaca-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:file:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
MainInput.displayName = "MainInput"

export { MainInput }