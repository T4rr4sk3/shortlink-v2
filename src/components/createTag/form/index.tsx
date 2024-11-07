"use client"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useEffect } from "react"

import { dataIsApiCallError, getApiCallErrorMessage, toFormData } from "@app/lib/api"
import CheckboxControl from "@app/components/forms/checkboxControl"
import { MainButton } from "@app/components/common/mainButton"
import InputControl from "@app/components/forms/inputControl"
import { createTagSchema, type CreateTagSchema } from "./yup"
import { doCreateTag } from "@app/bin/actions/tags/createTag"
import { useLoading } from "@app/hooks/use-loading"
import { useToast } from "@app/hooks/use-toast"
import { Form } from "@app/components/ui/form"

interface CreateTagFormProps { onDone?: () => void, onCancel?: () => void }
export default function CreateTagForm({ onDone, onCancel }: CreateTagFormProps) {
  const { handleSubmit, watch, resetField, ...formMethods } = useForm({ resolver: yupResolver(createTagSchema) })
  const { loading, wrap } = useLoading()
  const { toast } = useToast()

  const haveColor = watch("haveColor")

  useEffect(() => {
    if(!haveColor) resetField("color")
  }, [haveColor, resetField])

  async function onSubmitTag(data: CreateTagSchema) {
    const result = await doCreateTag(toFormData(data))
    if(dataIsApiCallError(result)) {
      const message = getApiCallErrorMessage(result, "Erro na criação")
      toast({ description: message, variant: "error" })
    } else {
      const message = `Tag #${result.id} "${result.name}" criada com sucesso!`
      toast({ description: message, variant: "success" })
      if(onDone) onDone()
    }
  }

  return(
    <Form {...formMethods} handleSubmit={handleSubmit} watch={watch} resetField={resetField}>
      <form className="space-y-4 w-full max-w-screen-sm" onSubmit={handleSubmit(wrap(onSubmitTag))}>
        <InputControl name="name" placeholder="Nome da Tag..." maxLength={100} />
        <div className="flex items-center h-8">
          <CheckboxControl className="mr-2" label="Especificar cor?" name="haveColor" />
          {haveColor &&
            <InputControl className="w-20 p-2" name="color" type="color" />
          }
        </div>

        <div className="inline-block space-x-4">
          <MainButton loading={loading}>
            Adicionar
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