import { useState } from "react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@app/components/ui/dialog"
import { MainButton } from "@app/components/common/mainButton"
import type { SimpleLinkWithTags } from "@app/types/api/link"
import UpdateLinkForm from "@app/components/updateLink/form"
import { useActions } from "@app/hooks/use-actions"
import EditIcon from "@app/components/icons/edit"

type LinkToEdit = Pick<SimpleLinkWithTags, "id" | "name" | "expiresAt" | "groupId" | "linkTags">
export default function ShowLinksEditLinkDialog({ link }: { link: LinkToEdit }) {
  const [isOpen, setOpen] = useState(false)
  const { callAction } = useActions()
  function handleClose() { setOpen(false) }
  function handleDone() {
    setOpen(false)
    callAction("searchLinks")
  }
  const expires = link.expiresAt ? new Date(link.expiresAt).toISOString().substring(0,10) : null
  return(
    <Dialog onOpenChange={setOpen} open={isOpen}>
      <DialogTrigger asChild>
        <MainButton variant="icon" size="icon">
          <EditIcon className="size-5" />
        </MainButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar link</DialogTitle>
          <DialogDescription>Editar link {link.name}</DialogDescription>
        </DialogHeader>
        <UpdateLinkForm
          onDone={handleDone}
          onCancel={handleClose}
          defaultValues={{
            name: link.name,
            tags: link.linkTags,
            groupId: link.groupId,
            expiresAt: expires,
          }}
          linkId={link.id}
        />
      </DialogContent>
    </Dialog>
  )
}