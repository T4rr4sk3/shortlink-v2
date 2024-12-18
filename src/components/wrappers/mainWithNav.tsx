import Link from "next/link";

import type { WrapperProps } from "@app/types/props";
import NavLinks from "../common/navLinks";
import { cn } from "@app/lib/utils";
import Logo from "../common/logo";

export default function MainWrapperWithNav({ children, className }: WrapperProps) {
  return(
    <main className={cn("px-4 space-y-8 pt-8 pb-4", className)}>
      <div className="w-full inline-flex justify-between flex-wrap gap-4">
        <Link className="min-w-48" href="/">
          <Logo />
        </Link>
        <NavLinks />
      </div>
      <div className="flex flex-col justify-center items-center">
        {children}
      </div>
    </main>
  )
}