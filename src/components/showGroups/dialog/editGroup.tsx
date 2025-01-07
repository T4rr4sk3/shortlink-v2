import { useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@app/components/ui/dialog";
import { MainButton } from "@app/components/common/mainButton";
import UpdateGroupForm from "@app/components/updateGroup/form";
import type { GetGroupsReturn } from "@app/types/api/group";
import { useActions } from "@app/hooks/use-actions";
import EditIcon from "@app/components/icons/edit";

export default function ShowGroupsEditGroupDialog({ group }: { group: Pick<GetGroupsReturn, "id" | "name" | "parentGroupId">}) {
  const [isOpen, setOpen] = useState(false)
  const { callAction } = useActions()
  function handleClose() { setOpen(false) }
  function handleDone() {
    setOpen(false)
    callAction("searchGroups")
  }
  const label = `Editar grupo ${group.name}`
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
          <DialogTitle>Editar grupo</DialogTitle>
          <DialogDescription>Editar grupo #{group.id}</DialogDescription>
        </DialogHeader>
        <UpdateGroupForm
          onDone={handleDone}
          onCancel={handleClose}
          defaultValues={group}
          groupId={group.id}
        />
      </DialogContent>
    </Dialog>
  )
}