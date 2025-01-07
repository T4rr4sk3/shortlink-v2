import Link from "next/link";

import type { WithClassName } from "@app/types/props";
import ButtonForLink from "./buttonForLink";
import AddLinkIcon from "../icons/addLink";
import GroupsIcon from "../icons/groups";
import LinkIcon from "../icons/link";
import TagsIcon from "../icons/tags";
import { cn } from "@app/lib/utils";

export default function NavLinks ({ className }: WithClassName) {
  return (
    <nav className={cn("w-fit grid grid-flow-col auto-cols-auto gap-x-4", "max-sm:flex max-sm:flex-wrap max-sm:gap-4 max-sm:justify-center", className)}>
      <Link href="/create-link">
        <ButtonForLink tabIndex={0}>
          <AddLinkIcon className="w-6 h-6" aria-label="Criar link" />
          criar link
        </ButtonForLink>
      </Link>

      <Link href="/show-links">
        <ButtonForLink tabIndex={0}>
          <LinkIcon className="w-6 h-6" aria-label="Ver links" />
          ver links
        </ButtonForLink>
      </Link>

      <Link href="/show-tags">
        <ButtonForLink tabIndex={0}>
          <TagsIcon className="w-6 h-6" aria-label="Ver tags" />
          tags
        </ButtonForLink>
      </Link>

      <Link href="/show-groups">
        <ButtonForLink tabIndex={0}>
          <GroupsIcon className="w-6 h-6" aria-label="Ver grupos" />
          grupos
        </ButtonForLink>
      </Link>
    </nav>
  )
}