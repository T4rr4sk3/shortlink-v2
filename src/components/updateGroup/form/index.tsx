"use client"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

import { dataIsApiCallError, getApiCallErrorMessage, toFormData } from "@app/lib/api"
import LinkGroupComboboxControl from "@app/components/forms/custom/linkGroupComboboxControl"
import { doUpdateGroup } from "@app/bin/actions/groups/updateGroup"
import { updateGroupSchema, type UpdateGroupSchema } from "./yup"
import { MainButton } from "@app/components/common/mainButton"
import InputControl from "@app/components/forms/inputControl"
import { useLoading } from "@app/hooks/use-loading"
import { useToast } from "@app/hooks/use-toast"
import { Form } from "@app/components/ui/form"

interface UpdateGroupFormProps {
  groupId: number,
  defaultValues: UpdateGroupSchema,
  onDone?: () => void,
  onCancel?: () => void
}
export default function UpdateGroupForm({ groupId, defaultValues, onDone, onCancel }: UpdateGroupFormProps) {
  const { handleSubmit, watch, resetField, ...formMethods } = useForm({ resolver: yupResolver(updateGroupSchema), defaultValues })
  const { loading, wrap } = useLoading()
  const { toast } = useToast()

  async function onSubmitGroup(data: UpdateGroupSchema) {
    const result = await doUpdateGroup(toFormData({ groupId, ...data }))
    if(dataIsApiCallError(result)) {
      const message = getApiCallErrorMessage(result, "Erro na atualização")
      toast({ description: message, variant: "error" })
    } else {
      const message = `Grupo #${result.id} "${defaultValues.name}" atualizado com sucesso!`
      toast({ description: message, variant: "success" })
      if(onDone) onDone()
    }
  }

  return(
    <Form {...formMethods} handleSubmit={handleSubmit} watch={watch} resetField={resetField}>
      <form className="space-y-4 w-full max-w-screen-sm" onSubmit={handleSubmit(wrap(onSubmitGroup))}>
        <InputControl name="name" placeholder="Nome do grupo..." maxLength={100} />
        <LinkGroupComboboxControl name="parentGroupId" />
        <div className="inline-block space-x-4">
          <MainButton loading={loading}>
            Atualizar
          </MainButton>
          {onCancel &&
            <MainButton variant="primary-stroke" type="button" onClick={onCancel} disabled={loading}>
              Cancelar
            </MainButton>
          }
        </div>
      </form>
    </Form>
  )
}