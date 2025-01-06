import Link from "next/link"

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@app/components/ui/hover-card"
import ShareLinkDialogContent from "@app/components/shareLink/dialogContent"
import { cn, getTextColorByHexcolorLuminosity } from "@app/lib/utils"
import { Dialog, DialogTrigger } from "@app/components/ui/dialog"
import type { LinkOrGroup } from "@app/types/api/linkGroupTree"
import { MainButton } from "@app/components/common/mainButton"
import { verifyIfIsExpiredByExpiresAt } from "@app/lib/link"
import ShowLinksDeleteLinkDialog from "../dialog/deleteLink"
import ShowLinksEditLinkDialog from "../dialog/editLink"
import type { CustomCellProps } from "@app/types/props"
import GroupIcon from "@app/components/icons/group"
import CopyIcon from "@app/components/icons/copy"
import LinkIcon from "@app/components/icons/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@app/components/ui/tooltip"

type TagCellProps<T = unknown> = CustomCellProps<LinkOrGroup, T>

export function ShowLinksTableCellName({ context, searchName }: TagCellProps<string> & { searchName: string }) {
  const isGroup = context.row.original.type === "group"
  const iconClassName = "size-6 mr-2 text-cinza-fumaca-main"
  if(isGroup) {
    const url = `?${searchName}=${context.row.original.id}`
    return (
      <Link className="underline inline-flex items-center" href={url}>
        <GroupIcon className={iconClassName} />
        <p className="max-3xl:max-w-40 truncate"> {context.getValue()} </p>
      </Link>
    )
  }
  const expiresAt = context.row.original.linkInfo?.expiresAt
  const isExpired = !!expiresAt && verifyIfIsExpiredByExpiresAt(expiresAt)
  return(
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div title={context.getValue()} className={cn("flex items-center", isExpired && "text-alert-red-main")}>
            <LinkIcon className={cn(iconClassName, isExpired && "text-alert-red-main")} />
            <p className="max-3xl:max-w-40 truncate"> {context.getValue()} </p>
          </div>
        </TooltipTrigger>
        <TooltipContent sideOffset={4} className="max-w-96 break-all">
          {context.getValue()}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function ShowLinksTableCellUrl({ context }: TagCellProps) {
  const linkUrl = context.row.original.linkInfo?.url
  const expiresAt = context.row.original.linkInfo?.expiresAt
  const isExpired = !!expiresAt && verifyIfIsExpiredByExpiresAt(expiresAt)
  return(
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div title={linkUrl} className={cn("whitespace-nowrap truncate max-3xl:max-w-96", isExpired && "text-alert-red-main")}>
            {linkUrl || "-"}
          </div>
        </TooltipTrigger>
        <TooltipContent sideOffset={4} className="max-w-96 break-all">
          {linkUrl}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function ShowLinksTableCellExpires({ context }: TagCellProps<string | undefined | null>) {
  const isLink = context.row.original.type === "link"
  const expiresAt = context.row.original.linkInfo?.expiresAt
  const isExpired = !!expiresAt && verifyIfIsExpiredByExpiresAt(expiresAt)
  return(
    <div className={isExpired ? "text-alert-red-main" : undefined}>
      {isLink ? (context.getValue() ? "Sim" : "Não") : "-" }
    </div>
  )
}

export function ShowLinksTableCellCode({ context }: TagCellProps<string | undefined>) {
  const link = context.row.original.linkInfo
  if(!link) return(<div> - </div>)
  const isExpired = !!link?.expiresAt && verifyIfIsExpiredByExpiresAt(link.expiresAt)
  return(
    <div className={cn("space-x-2 flex items-center", isExpired && "text-alert-red-main")}>
      <span>{link.code}</span>
      <Dialog>
        <DialogTrigger asChild>
          <MainButton variant="icon" size="icon" disabled={isExpired}>
            <CopyIcon className={cn("size-5 text-secondary-main", isExpired && "text-alert-red-main")} />
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
  if(isGroup) return null;
  const linkInfo = context.row.original.linkInfo
  return(
    <HoverCard>
      <HoverCardTrigger asChild>
        <MainButton variant="link" className="normal-case">
          {linkInfo?.linkTags?.length} tags atribuídas
        </MainButton>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4">
        <div className="w-full flex flex-wrap items-center justify-center gap-2">
          {!linkInfo?.linkTags.length && <span>Nenhuma tag atribuída.</span> }
          {linkInfo?.linkTags.map((tag) => (
            <div
              className="h-fit w-max break-words rounded px-2 font-medium"
              key={tag.id}
              style={{
                backgroundColor: tag.color,
                color: getTextColorByHexcolorLuminosity(tag.color)
              }}
            >
              <Link href={"/show-links-by-tag?tag-id=" + tag.id}>
                {tag.name}
              </Link>
            </div>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export function ShowLinksTableCellActions({ context }: TagCellProps) {
  const simpleLink = context.row.original.linkInfo
  if(!simpleLink) return null;
  return(
    <div className="flex space-x-2">
      <ShowLinksEditLinkDialog link={simpleLink} />
      <ShowLinksDeleteLinkDialog link={simpleLink} />
    </div>
  )
}
