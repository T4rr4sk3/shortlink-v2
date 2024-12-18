import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

import { cn } from "@app/lib/utils";

const className = ""
const headingVariants = cva(className, {
  variants: {
    variant: {
      h1: "text-5xl font-bold",
      h2: "text-4xl font-semibold",
      h3: "text-3xl font-semibold",
      h4: "text-2xl font-semibold",
      h5: "text-xl font-medium",
      h6: "text-lg font-medium"
    }
  },
  defaultVariants: {
    variant: "h4"
  }
})

interface HeadingProps extends React.ComponentPropsWithoutRef<"h1">,
    VariantProps <typeof headingVariants> {
  asChild?: boolean
}
const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ asChild, variant, className, ...props }, ref) => {
  const Comp = asChild ? Slot : (variant || "h4")
  return (
    <Comp
      className={cn(headingVariants({ className, variant }))}
      {...props}
      ref={ref}
    />
  )
})
Heading.displayName = "Heading"

export { Heading, headingVariants }