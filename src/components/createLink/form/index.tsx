"use client"
import ShareLinkDialogContent from "@app/components/shareLink/dialogContent"
import CheckboxControl from "@app/components/forms/checkboxControl"
import { MainButton } from "@app/components/common/mainButton"
import InputControl from "@app/components/forms/inputControl"
import { dataIsApiCallError, getApiCallErrorMessage, toFormData } from "@app/lib/api"
import type { LinkCreatedReturn } from "@app/types/api/link"
import { doCreateLink } from "@app/bin/actions/createLink"
import { yupResolver } from "@hookform/resolvers/yup"
import { Dialog } from "@app/components/ui/dialog"
import { Form } from "@app/components/ui/form"
import type { CreateLinkSchema} from "./yup";
import { useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { createLinkSchema } from "./yup"
import Link from "next/link"
import { toast } from "@app/hooks/use-toast"
import { useLoading } from "@app/hooks/use-loading"
import CreateLinkFormTagInput from "./tagInput"
import type { GetTagsReturn } from "@app/types/api/tag"
import CreateLinkFormTag from "./tag"

export default function CreateLinkForm() {
  const { handleSubmit, control, reset, resetField, watch, ...formMethods } = useForm({ resolver: yupResolver(createLinkSchema) })
  const { append, fields: fieldTags, remove } = useFieldArray({ control, name: "tags", keyName: "key" })
  const [linkCreated, setLinkCreated] = useState<LinkCreatedReturn>()
  const { loading, wrap } = useLoading()

  const expires = watch("expires")

  useEffect(() => {
    if(linkCreated) {
      reset()
      remove()
    }
  }, [linkCreated, reset, remove])

  useEffect(() => {
    if(!expires) resetField("expiresAt")
  }, [expires, resetField])

  async function onSubmitLink(data: CreateLinkSchema) {
    const formData = toFormData({
      ...data,
      tags: data.tags.map(t => t.id),
    })
    const result = await doCreateLink(formData)
    if(dataIsApiCallError(result)) {
      const message = getApiCallErrorMessage(result, "Erro na criação")
      toast({ description: message, variant: "error" })
    } else setLinkCreated(result)
  }

  const clearLink = () => setLinkCreated(undefined)
  const deleteTag = (id: number) => () => remove(id)
  const includeTag = (tag: GetTagsReturn) => {
    const tagIncluded = fieldTags.find((t) => t.id === tag.id)
    if(tagIncluded) {
      const message = `Tag '${tagIncluded.name}' já incluída.`
      toast({ description: message, variant: "destructive", duration: 4000 })
      return
    }
    if(fieldTags.length < 5) append(tag)
  }

  return (
    <Form {...formMethods} handleSubmit={handleSubmit} reset={reset} watch={watch} resetField={resetField} control={control}>
      <form className="space-y-4 w-full max-w-screen-xs mx-auto" onSubmit={handleSubmit(wrap(onSubmitLink))}>
        <InputControl className="w-full" name="url" control={control} required placeholder="Url..." type="url" />
        <InputControl className="w-full" name="name" control={control} required placeholder="Nome..." />
        <div className="w-full">
          <CheckboxControl label="Este link expira?" name="expires" control={control} />
          {expires && <InputControl name="expiresAt" control={control} type="date" />}
        </div>
        <CreateLinkFormTagInput onIncludeTag={includeTag} disabled={fieldTags.length > 4} />
        <div className="w-full flex flex-wrap justify-center gap-2">
          {fieldTags.map((tag, index) => (
            <CreateLinkFormTag tag={tag} key={tag.key} onRemove={deleteTag(index)} />
          ))}
        </div>
        <div className="inline-flex space-x-4">
          <MainButton loading={loading} loadingText="Criando...">Criar link</MainButton>
          <Link href="/">
            <MainButton disabled={loading} type="button" variant="primary-stroke">Voltar</MainButton>
          </Link>
        </div>
      </form>
      <Dialog open={!!linkCreated}>
        {linkCreated &&
          <ShareLinkDialogContent
            code={linkCreated.code}
            name={linkCreated.name}
            expiresAt={linkCreated.expiresAt}
            onClose={clearLink}
          />
        }
      </Dialog>
    </Form>
  )
}