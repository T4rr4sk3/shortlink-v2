"use client"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

import LinkGroupComboboxControl from "@app/components/forms/custom/linkGroupComboboxControl"
import { dataIsApiCallError, getApiCallErrorMessage, toFormData } from "@app/lib/api"
import { doCreateGroup } from "@app/bin/actions/groups/createGroup"
import { MainButton } from "@app/components/common/mainButton"
import InputControl from "@app/components/forms/inputControl"
import { useLoading } from "@app/hooks/use-loading"
import { Form } from "@app/components/ui/form"
import type { CreateGroupSchema} from "./yup"
import { toast } from "@app/hooks/use-toast"
import { createGroupSchema } from "./yup"

interface CreateGroupFormProps { onDone?: () => void, onCancel?: () => void }
export default function CreateGroupForm({ onDone, onCancel }: CreateGroupFormProps) {
  const { handleSubmit, ...formMethods } = useForm({ resolver: yupResolver(createGroupSchema) })
  const { loading, wrap } = useLoading()

  async function onSubmitGroup(data: CreateGroupSchema) {
    const result = await doCreateGroup(toFormData(data))
    if(dataIsApiCallError(result)) {
      const message = getApiCallErrorMessage(result, "Erro na criação")
      toast({ description: message, variant: "error" })
    } else {
      const message = `Grupo #${result.id} "${result.name}" criado com sucesso!`
      toast({ description: message, variant: "success" })
      if(onDone) onDone()
    }
  }

  return(
    <Form {...formMethods} handleSubmit={handleSubmit}>
      <form className="space-y-4 w-full max-w-screen-sm" onSubmit={handleSubmit(wrap(onSubmitGroup))}>
        <InputControl name="name" placeholder="Nome do Grupo..." maxLength={100} />
        <LinkGroupComboboxControl name="parentGroupId" />
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