import { HoverCard, HoverCardContent, HoverCardTrigger } from "@app/components/ui/hover-card"
import ShareLinkDialogContent from "@app/components/shareLink/dialogContent"
import { getTextColorByHexcolorLuminosity } from "@app/lib/utils"
import { Dialog, DialogTrigger } from "@app/components/ui/dialog"
import type { LinkOrGroup } from "@app/types/api/linkGroupTree"
import { MainButton } from "@app/components/common/mainButton"
import { getLinkByIdClient } from "@app/bin/endpoints/link"
import type { GetLinkReturn } from "@app/types/api/link"
import type { CustomCellProps } from "@app/types/props"
import GroupIcon from "@app/components/icons/group"
import LinkIcon from "@app/components/icons/link"
import Link from "next/link"
import CopyIcon from "@app/components/icons/copy"
import { useEffect, useState } from "react"
import { dataIsApiCallError } from "@app/lib/api"

type TagCellProps<T = unknown> = CustomCellProps<LinkOrGroup, T>

export function ShowLinksTableCellName({ context, searchName }: TagCellProps<string> & { searchName: string }) {
  const isGroup = context.row.original.type === "group"
  const iconClassName = "size-6 mr-2 text-cinza-fumaca-main"
  if(isGroup) {
    const url = `?${searchName}=${context.row.original.id}`
    return (
      <Link className="underline inline-flex items-center" href={url}>
        <GroupIcon className={iconClassName} />
        {context.getValue()}
      </Link>
    )
  }
  return(
    <div className="inline-flex items-center">
      <LinkIcon className={iconClassName} />
      {context.getValue()}
    </div>
  )
}

export function ShowLinksTableCellUrl({ context }: TagCellProps) {
  const isLink = context.row.original.type === "link"
  return(
    <div>
      {isLink ? context.row.original.linkInfo?.url : "-" }
    </div>
  )
}

export function ShowLinksTableCellExpires({ context }: TagCellProps<string | undefined | null>) {
  const isLink = context.row.original.type === "link"
  return(
    <div>
      {isLink ? (context.getValue() ? "Sim" : "Não") : "-" }
    </div>
  )
}

export function ShowLinksTableCellCode({ context }: TagCellProps<string | undefined>) {
  const link = context.row.original.linkInfo
  if(!link) return(<div> - </div>)
  return(
    <div className="space-x-2 flex items-center">
      <span>{link.code}</span>
      <Dialog>
        <DialogTrigger asChild>
          <MainButton variant="icon" size="icon">
            <CopyIcon className="size-5 text-secondary-main" />
          </MainButton>
        </DialogTrigger>
        <ShareLinkDialogContent
          code={link.code}
          name={link.name}
          expiresAt={link.expiresAt}
        />
      </Dialog>
    </div>
  )
}

export function ShowLinksTableCellTags({ context }: TagCellProps) {
  const isGroup = context.row.original.type === "group"
  const linkId = context.row.original.id
  const [deepLinkInfo, setDeepLinkInfo] = useState<GetLinkReturn>()

  useEffect(() => {
    if(!isGroup) {
      getLinkByIdClient(linkId)
      .then((link) => {
        if(dataIsApiCallError(link)) setDeepLinkInfo({} as GetLinkReturn)
        else setDeepLinkInfo(link)
      })
    }
  }, [isGroup, linkId])

  if(isGroup) return null;

  return(
    <HoverCard>
      <HoverCardTrigger asChild>
        <MainButton variant="link" className="normal-case" loading={!deepLinkInfo}>
          {deepLinkInfo?.linkTags?.length} tags atribuídas
        </MainButton>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4">
        <div className="w-full flex flex-wrap items-center justify-center gap-2">
          {!deepLinkInfo?.linkTags.length && <span>Nenhuma tag atribuída.</span> }
          {deepLinkInfo?.linkTags.map((tag) => (
            <div
              className="h-fit w-max break-words rounded px-2 font-medium"
              key={tag.id}
              style={{
                backgroundColor: tag.color,
                color: getTextColorByHexcolorLuminosity(tag.color)
              }}
            >
              {tag.name}
            </div>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
// hover-card

// export function ShowLinksTableCellActions({ context }: TagCellProps) { }
