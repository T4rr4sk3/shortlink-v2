"use client"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

import { dataIsApiCallError, getApiCallErrorMessage, toFormData } from "@app/lib/api"
import { MainButton } from "@app/components/common/mainButton"
import InputControl from "@app/components/forms/inputControl"
import { updateTagSchema, type UpdateTagSchema } from "./yup"
import { doUpdateTag } from "@app/bin/actions/tags/updateTag"
import { useLoading } from "@app/hooks/use-loading"
import { useToast } from "@app/hooks/use-toast"
import { Form } from "@app/components/ui/form"

interface UpdateTagFormProps { tagId: number, defaultValues: UpdateTagSchema, onDone?: () => void, onCancel?: () => void }
export default function UpdateTagForm({ tagId, defaultValues, onDone, onCancel }: UpdateTagFormProps) {
  const { handleSubmit, watch, resetField, ...formMethods } = useForm({ resolver: yupResolver(updateTagSchema), defaultValues: defaultValues })
  const { loading, wrap } = useLoading()
  const { toast } = useToast()

  async function onSubmitTag(data: UpdateTagSchema) {
    const result = await doUpdateTag(toFormData({ tagId, ...data }))
    if(dataIsApiCallError(result)) {
      const message = getApiCallErrorMessage(result, "Erro na atualização")
      toast({ description: message, variant: "error" })
    } else {
      const message = `Tag #${result.id} "${defaultValues.name}" atualizada com sucesso!`
      toast({ description: message, variant: "success" })
      if(onDone) onDone()
    }
  }

  return(
    <Form {...formMethods} handleSubmit={handleSubmit} watch={watch} resetField={resetField}>
      <form className="space-y-4 w-full max-w-screen-sm" onSubmit={handleSubmit(wrap(onSubmitTag))}>
        <InputControl name="name" placeholder="Nome da Tag..." maxLength={100} />
        <label className="flex items-center">
          <span className="pr-2"> Cor: </span>
          <InputControl className="w-20 p-2 h-10" name="color" type="color" />
        </label>
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