import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@app/components/ui/alert-dialog";
import { MainButton, mainButtonVariants } from "@app/components/common/mainButton";
import { doDeleteGroup } from "@app/bin/actions/groups/deleteGroup";
import { getApiCallErrorMessage, toFormData } from "@app/lib/api";
import type { GetGroupsReturn } from "@app/types/api/group";
import DeleteIcon from "@app/components/icons/delete";
import { useActions } from "@app/hooks/use-actions";
import { useToast } from "@app/hooks/use-toast";

export default function ShowGroupsDeleteGroupDialog({ group }: { group: Pick<GetGroupsReturn, "id" | "name">}) {
  const { callAction } = useActions()
  const { toast } = useToast()
  async function handleSubmit() {
    const error = await doDeleteGroup(toFormData({ groupId: group.id }))
    if(error) {
      const message = getApiCallErrorMessage(error, "Erro ao deletar grupo")
      toast({ description: message, variant: "error" })
    } else {
      const message = `Tag '${group.name}' deletada com sucesso!`
      toast({ description: message, variant: "success" })
      callAction("searchGroups")
    }
  }
  return(
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <MainButton variant="icon" size="icon">
          <DeleteIcon className="size-5" />
        </MainButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. O
            grupo <b>{group.name}</b> será excluído para sempre.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className={mainButtonVariants({ variant: "primary-stroke" })}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit} className={mainButtonVariants()}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}