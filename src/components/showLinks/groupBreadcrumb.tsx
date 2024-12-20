import { Fragment } from "react"
import Link from "next/link"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb"
import type { SimpleGroup } from "@app/types/api/group"
import { linkGroupHref } from "@app/lib/link"

interface Props {
  currentGroup?: SimpleGroup | null,
  groups: SimpleGroup[],
  searchName: string
}
export default function ShowLinksGroupsBreadcrumb({ currentGroup, groups, searchName }: Props) {
  return(
    <Breadcrumb className="w-fit">
      <BreadcrumbList className="text-lg">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/show-links"> ROOT </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {groups.map((group) => (
          <BreadcrumbLinkGroup
            key={group.id}
            group={group}
            searchName={searchName}
          />
        ))}
        {currentGroup &&
          <BreadcrumbLinkGroup
            group={currentGroup}
            searchName={searchName}
          />
        }
      </BreadcrumbList>
    </Breadcrumb>
  )
}

interface LinkGroupProps { group: SimpleGroup, searchName: string }
function BreadcrumbLinkGroup({ group, searchName }: LinkGroupProps) {
  return(
    <Fragment>
      <BreadcrumbSeparator className="[&>svg]:size-6" />
      <BreadcrumbItem key={group.id}>
        <BreadcrumbLink asChild>
          <Link href={linkGroupHref(group.id, searchName)}>
            {group.name}
          </Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Fragment>
  )
}