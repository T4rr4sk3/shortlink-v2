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
import { useForm } from "react-hook-form"
import { createLinkSchema } from "./yup"
import Link from "next/link"
import { useToast } from "@app/hooks/use-toast"
import { useLoading } from "@app/hooks/use-loading"

export default function CreateLinkForm() {
  const { handleSubmit, control, reset, resetField, watch, ...formMethods } = useForm({ resolver: yupResolver(createLinkSchema) })
  const [linkCreated, setLinkCreated] = useState<LinkCreatedReturn>()
  const { loading, wrap } = useLoading()
  const { toast } = useToast()

  const expires = watch("expires")

  useEffect(() => {
    if(linkCreated) reset()
  }, [linkCreated, reset])

  useEffect(() => {
    if(!expires) resetField("expiresAt")
  }, [expires, resetField])

  async function onSubmitLink(data: CreateLinkSchema) {
    const result = await doCreateLink(toFormData(data))
    if(dataIsApiCallError(result)) {
      const message = getApiCallErrorMessage(result, "Erro na criação")
      toast({ description: message, variant: "error" })
    } else setLinkCreated(result)
  }

  const clearLink = () => setLinkCreated(undefined)

  return (
    <Form {...formMethods} handleSubmit={handleSubmit} reset={reset} watch={watch} resetField={resetField} control={control}>
      <form className="space-y-4 w-full max-w-screen-sm" onSubmit={handleSubmit(wrap(onSubmitLink))}>
        <InputControl name="url" control={control} required placeholder="Url..." type="url" />
        <InputControl name="name" control={control} required placeholder="Nome..." />
        <div> {/* Transformar esse checkbox em checkbox do hook-form e usar na validação */}
          <CheckboxControl label="Este link expira?" name="expires" control={control} />
          {expires && <InputControl name="expiresAt" control={control} type="date" />}
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