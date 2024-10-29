import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@app/lib/utils";
import { forwardRef } from "react";

const mainButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        "primary-fill": "bg-primary-main text-common-branco tracking-wide active:bg-primary-dark",
        "primary-stroke": "border border-primary-main text-primary-main hover:bg-primary-main hover:text-common-branco active:text-common-branco active:bg-primary-dark",
        "secondary-fill": "bg-secondary-main text-common-branco tracking-wide active:bg-secondary-dark",
        "secondary-stroke": "border border-secondary-main text-secondary-main hover:bg-secondary-main hover:text-common-branco active:text-common-branco active:bg-secondary-dark",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary-fill",
      size: "default",
    },
  }
)

interface MainButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof mainButtonVariants> {
  asChild?: boolean,
  //loading?: boolean,
}
const MainButton = forwardRef<HTMLButtonElement, MainButtonProps>(
  ({ asChild, variant, size, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(mainButtonVariants({ className, variant, size }))}
      {...props}
      ref={ref}
    />
  )
})
MainButton.displayName = "MainButton"

export { MainButton, mainButtonVariants }