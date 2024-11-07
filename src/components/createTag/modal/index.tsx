import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@app/components/ui/dialog";
import CreateTagForm from "../form";
import { MainButton } from "@app/components/common/mainButton";
import { useState } from "react";
import AddTagIcon from "@app/components/icons/addTag";

interface CreateTagModalProps {
  onClose?: () => void,
  onDone?: () => void,
  className?: string,
}
export default function CreateTagModal({ className, onClose, onDone }: CreateTagModalProps) {
  const [isOpen, setOpen] = useState(false)
  function handleClose() {
    setOpen(false)
    if(onClose) onClose()
  }
  function handleDone() {
    setOpen(false)
    if(onDone) onDone()
  }
  return(
    <Dialog onOpenChange={setOpen} open={isOpen}>
      <DialogTrigger asChild>
        <MainButton className={className}>
          <AddTagIcon className="size-5 mr-2" /> Nova Tag
        </MainButton>
      </DialogTrigger>
      <DialogContent onClose={handleClose}>
        <DialogHeader>
          <DialogTitle>Criar tag</DialogTitle>
          <DialogDescription>Criar uma nova tag</DialogDescription>
        </DialogHeader>
        <CreateTagForm onCancel={handleClose} onDone={handleDone} />
      </DialogContent>
    </Dialog>
  )
}