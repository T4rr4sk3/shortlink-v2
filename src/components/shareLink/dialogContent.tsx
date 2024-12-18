import type { ComponentProps } from "react";

import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { MainButton } from "../common/mainButton";
import ShareLink from ".";

interface ShareLinkDialogContentProps extends ComponentProps<typeof ShareLink> {
  onClose?: () => void
}
export default function ShareLinkDialogContent({ onClose, ...shareLinkProps }: ShareLinkDialogContentProps) {
  const linkName = shareLinkProps.name
  return (
    <DialogContent onClose={onClose}>
      <DialogHeader>
        <DialogTitle>Copiar link</DialogTitle>
        <DialogDescription>Compartilhar link &quot;{linkName}&quot;</DialogDescription>
      </DialogHeader>
      <ShareLink {...shareLinkProps} />
      <DialogFooter>
        <DialogClose asChild>
          <MainButton type="button" onClick={onClose} variant="primary-fill">
            Fechar
          </MainButton>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}