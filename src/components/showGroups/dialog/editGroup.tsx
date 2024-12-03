import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@app/components/ui/dialog";
import { MainButton } from "@app/components/common/mainButton";
import EditIcon from "@app/components/icons/edit";
import UpdateGroupForm from "@app/components/updateGroup/form";
import type { GetGroupsReturn } from "@app/types/api/group";
import { useActions } from "@app/hooks/use-actions";
import { useState } from "react";

export default function ShowGroupsEditGroupDialog({ group }: { group: Pick<GetGroupsReturn, "id" | "name" | "parentGroupId">}) {
  const [isOpen, setOpen] = useState(false)
  const { callAction } = useActions()
  function handleClose() { setOpen(false) }
  function handleDone() {
    setOpen(false)
    callAction("searchGroups")
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