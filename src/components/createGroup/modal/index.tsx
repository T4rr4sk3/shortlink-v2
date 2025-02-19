import { useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@app/components/ui/dialog";
import { MainButton } from "@app/components/common/mainButton";
import AddGroupIcon from "@app/components/icons/addGroup";
import CreateGroupForm from "../form";

interface CreateGroupModalProps {
  onClose?: () => void,
  onDone?: () => void,
  className?: string,
}
export default function CreateGroupModal({ className, onClose, onDone }: CreateGroupModalProps) {
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
          <AddGroupIcon className="size-5 mr-2" aria-label="Criar grupo" /> Novo Grupo
        </MainButton>
      </DialogTrigger>
      <DialogContent onClose={handleClose}>
        <DialogHeader>
          <DialogTitle>Criar tag</DialogTitle>
          <DialogDescription>Criar uma nova tag</DialogDescription>
        </DialogHeader>
        <CreateGroupForm onCancel={handleClose} onDone={handleDone} />
      </DialogContent>
    </Dialog>
  )
}