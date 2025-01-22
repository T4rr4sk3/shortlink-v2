import { useFieldArray, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import LinkGroupComboboxControl from "@app/components/forms/custom/linkGroupComboboxControl"
import { dataIsApiCallError, getApiCallErrorMessage, toFormData } from "@app/lib/api"
import CreateLinkFormTagInput from "@app/components/createLink/form/tagInput"
import CreateLinkFormTag from "@app/components/createLink/form/tag"
import { doUpdateLink } from "@app/bin/actions/links/updateLink"
import { updateLinkSchema, type UpdateLinkSchema } from "./yup"
import { MainButton } from "@app/components/common/mainButton"
import InputControl from "@app/components/forms/inputControl"
import { LINK_NAME_MAX_LENGTH } from "@app/lib/link"
import { useLoading } from "@app/hooks/use-loading"
import { useToast } from "@app/hooks/use-toast"
import { Form } from "@app/components/ui/form"

interface UpdateLinkFormProps {
  linkId: number,
  defaultValues: UpdateLinkSchema,
  onDone?: () => void,
  onCancel?: () => void
}
export default function UpdateLinkForm({ linkId, onDone, defaultValues, onCancel }: UpdateLinkFormProps) {
  const { handleSubmit, ...formMethods } = useForm({ resolver: yupResolver(updateLinkSchema), defaultValues })
  const { append, fields: fieldTags, remove } = useFieldArray({ control: formMethods.control, name: "tags", keyName: "key" })
  const { loading, wrap } = useLoading()
  const { toast } = useToast()

  async function onSubmitLink(data: UpdateLinkSchema) {
    const formData = toFormData({
      linkId, ...data,
      tags: data.tags.map(t => t.id),
    })
    const result = await doUpdateLink(formData)
    if(dataIsApiCallError(result)) {
      const message = getApiCallErrorMessage(result, "Erro na atualização")
      toast({ description: message, variant: "error" })
    } else {
      const message = `Link #${result.id} "${defaultValues.name}" atualizado com sucesso!`
      toast({ description: message, variant: "success" })
      if(onDone) onDone()
    }
  }

  const deleteTag = (id: number) => () => remove(id)
  const includeTag = (tag: { id: number, name: string, color: string }) => {
    const tagIncluded = fieldTags.find((t) => t.id === tag.id)
    if(tagIncluded) {
      const message = `Tag '${tagIncluded.name}' já incluída.`
      toast({ description: message, duration: 4000 })
      return
    }
    if(fieldTags.length < 5) append(tag)
  }

  return(
    <Form {...formMethods} handleSubmit={handleSubmit}>
      <form className="space-y-4 w-full max-w-screen-sm" onSubmit={handleSubmit(wrap(onSubmitLink))}>
        <InputControl name="name" required placeholder="Nome..." maxLength={LINK_NAME_MAX_LENGTH} />
        <LinkGroupComboboxControl name="groupId" />
        <InputControl name="expiresAt" type="date" />
        <CreateLinkFormTagInput onIncludeTag={includeTag} />
        <div className="w-full flex flex-wrap justify-center gap-2">
          {!fieldTags.length && <h2> Nenhuma tag adicionada. </h2>}
          {fieldTags.map((tag, index) => (
            <CreateLinkFormTag tag={tag} key={tag.key} onRemove={deleteTag(index)} />
          ))}
        </div>
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