import { forwardRef, type ComponentProps } from "react";
import { cn } from "@app/lib/utils";

const ButtonForLink = forwardRef<HTMLButtonElement, ComponentProps<"button">>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={cn(
          "flex flex-col items-center justify-center p-2 rounded h-full w-28",
          "border border-primary-main text-primary-main bg-common-branco uppercase duration-200",
          "hover:bg-primary-main hover:text-common-branco active:bg-primary-dark active:text-common-branco",
          className
        )}
        tabIndex={-1}
        {...props}
        ref={ref}
      />
    )
  }
)
ButtonForLink.displayName = "ButtonForLink"

export default ButtonForLink