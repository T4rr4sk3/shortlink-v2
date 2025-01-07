import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@app/components/ui/alert-dialog";
import { MainButton, mainButtonVariants } from "@app/components/common/mainButton";
import { getApiCallErrorMessage, toFormData } from "@app/lib/api";
import { doDeleteTag } from "@app/bin/actions/tags/deleteTag";
import type { GetTagsReturn } from "@app/types/api/tag";
import DeleteIcon from "@app/components/icons/delete";
import { useActions } from "@app/hooks/use-actions";
import { useToast } from "@app/hooks/use-toast";

export default function ShowTagsDeleteTagDialog({ tag }: { tag: Pick<GetTagsReturn, "id" | "name">}) {
  const { callAction } = useActions()
  const { toast } = useToast()
  async function handleSubmit() {
    const error = await doDeleteTag(toFormData({ tagId: tag.id }))
    if(error) {
      const message = getApiCallErrorMessage(error, "Erro ao deletar tag")
      toast({ description: message, variant: "error" })
    } else {
      const message = `Tag '${tag.name}' deletada com sucesso!`
      toast({ description: message, variant: "success" })
      callAction("searchTags")
    }
  }
  const label = `Deletar tag ${tag.name}`
  return(
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <MainButton variant="icon" size="icon" aria-label={label} title={label}>
          <DeleteIcon className="size-5" />
          <span className="sr-only">{label}</span>
        </MainButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. A
            tag <b>{tag.name}</b> será excluída para sempre.
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