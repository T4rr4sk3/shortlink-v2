import { MainButton } from "@app/components/common/mainButton";
import EditIcon from "@app/components/icons/edit";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@app/components/ui/dialog";
import UpdateTagForm from "@app/components/updateTag/form";
import { useActions } from "@app/hooks/use-actions";
import type { GetTagsReturn } from "@app/types/api/tag";
import { useState } from "react";

export default function ShowTagsEditTagDialog({ tag }: { tag: Pick<GetTagsReturn, "id" | "name" | "color">}) {
  const [isOpen, setOpen] = useState(false)
  const { callAction } = useActions()
  function handleClose() { setOpen(false) }
  function handleDone() {
    setOpen(false)
    callAction("searchTags")
  }
  return(
    <Dialog onOpenChange={setOpen} open={isOpen}>
      <DialogTrigger asChild>
        <MainButton variant="icon" size="icon">
          <EditIcon className="size-5" />
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