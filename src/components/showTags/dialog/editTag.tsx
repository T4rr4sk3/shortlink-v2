import { useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@app/components/ui/dialog";
import { MainButton } from "@app/components/common/mainButton";
import UpdateTagForm from "@app/components/updateTag/form";
import type { GetTagsReturn } from "@app/types/api/tag";
import { useActions } from "@app/hooks/use-actions";
import EditIcon from "@app/components/icons/edit";

export default function ShowTagsEditTagDialog({ tag }: { tag: Pick<GetTagsReturn, "id" | "name" | "color">}) {
  const [isOpen, setOpen] = useState(false)
  const { callAction } = useActions()
  function handleClose() { setOpen(false) }
  function handleDone() {
    setOpen(false)
    callAction("searchTags")
  }
  const label = `Editar tag ${tag.name}`
  return(
    <Dialog onOpenChange={setOpen} open={isOpen}>
      <DialogTrigger asChild>
        <MainButton variant="icon" size="icon" aria-label={label} title={label}>
          <EditIcon className="size-5" />
          <span className="sr-only">{label}</span>
        </MainButton>
      </DialogTrigger>
      <DialogContent onClose={handleClose}>
        <DialogHeader>
          <DialogTitle>Editar tag</DialogTitle>
          <DialogDescription>Editar tag #{tag.id}</DialogDescription>
        </DialogHeader>
        <UpdateTagForm
          onDone={handleDone}
          onCancel={handleClose}
          defaultValues={tag}
          tagId={tag.id}
        />
      </DialogContent>
    </Dialog>
  )
}