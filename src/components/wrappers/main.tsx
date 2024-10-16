import type { WrapperProps } from "@app/types/props";
import { cn } from "@app/lib/utils";
import Logo from "../common/logo";

export default function MainWrapper({ children, className }: WrapperProps) {
  return(
    <div className={cn("px-4 space-y-8", className)}>
      <Logo className="mx-auto" />

      {children}
    </div>
  )
}