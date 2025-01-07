import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@app/components/ui/alert-dialog";
import { MainButton, mainButtonVariants } from "@app/components/common/mainButton";
import { getApiCallErrorMessage, toFormData } from "@app/lib/api";
import { doDeleteLink } from "@app/bin/actions/links/deleteLink";
import DeleteIcon from "@app/components/icons/delete";
import type { SimpleLink } from "@app/types/api/link";
import { useActions } from "@app/hooks/use-actions";
import { useToast } from "@app/hooks/use-toast";

export default function ShowLinksDeleteLinkDialog({ link }: { link: Pick<SimpleLink, "id" | "name">}) {
  const { callAction } = useActions()
  const { toast } = useToast()
  async function handleSubmit() {
    const error = await doDeleteLink(toFormData({ linkId: link.id }))
    if(error) {
      const message = getApiCallErrorMessage(error, "Erro ao deletar link")
      toast({ description: message, variant: "error" })
    } else {
      const message = `Link '${link.name}' deletado com sucesso!`
      toast({ description: message, variant: "success" })
      callAction("searchLinks")
    }
  }
  const label = `Deletar link ${link.name}`
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
          <AlertDialogTitle>Excluir Link</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza de que deseja excluir o link <b>{link.name}</b>?
            Esta ação é permanente e não poderá ser desfeita.
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