import Image from "next/image";

import type { WithClassName } from "@app/types/props";

export default function Logo ({ className }: WithClassName) {
  return (
    <Image
      className={className}
      alt="shortlink-logo"
      src="/shortlink/logo.svg"
      width={325}
      height={80}
      priority
    />
  )
}