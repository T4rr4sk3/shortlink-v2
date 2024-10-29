"use client"

import { doCreateLink } from "@app/bin/actions/createLink"
import { MainButton } from "@app/components/common/mainButton"
import InputControl from "@app/components/forms/inputControl"
import { dataIsApiCallError, toFormData } from "@app/lib/api"
import type { LinkCreatedReturn } from "@app/types/api/link"
import { yupResolver } from "@hookform/resolvers/yup"
import type { ApiCallError } from "@app/types/api"
import { Form } from "@app/components/ui/form"
import type { CreateLinkSchema} from "./yup";
import { useForm } from "react-hook-form"
import { createLinkSchema } from "./yup"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Dialog } from "@app/components/ui/dialog"
import ShareLinkDialogContent from "@app/components/shareLink/dialogContent"
import { Input } from "@app/components/ui/input"

export default function CreateLinkForm() {
  const { handleSubmit, control, reset, resetField, ...formMethods } = useForm({ resolver: yupResolver(createLinkSchema) })
  const [linkCreated, setLinkCreated] = useState<LinkCreatedReturn>()
  const [expires, setExpires] = useState(false)
  const [error, setError] = useState<ApiCallError>()

  useEffect(() => {
    if(linkCreated) {
      reset()
    }
  }, [linkCreated, reset])

  useEffect(() => {
    if(!expires) resetField("expiresAt")
  }, [expires, resetField])

  async function onSubmitLink(data: CreateLinkSchema) {
    const debug = true

    if(debug) {
      return setLinkCreated(
        { code: "Dj0aQ", name: data.name, expiresAt: "2024-11-30T18:53:00.000+00:00" } as LinkCreatedReturn
      )
    }
    const result = await doCreateLink(toFormData(data))
    if(dataIsApiCallError(result)) return setError(result)
    setLinkCreated(result)
  }

  const clearLink = () => {
    setLinkCreated(undefined)
    setExpires(false)
  }

  return (
    <Form {...formMethods} handleSubmit={handleSubmit} reset={reset} resetField={resetField} control={control}>
      <form className="space-y-4 w-full max-w-screen-sm" onSubmit={handleSubmit(onSubmitLink)}>
        <InputControl name="url" control={control} required placeholder="Url..." type="url" />
        <InputControl name="name" control={control} required placeholder="Nome..." />
        <div> {/* Transformar esse checkbox em checkbox do hook-form e usar na validação */}
          <label className="inline-flex w-full items-center">
            <Input className="h-4 w-4 mr-2" type="checkbox" checked={expires} onChange={(e) => setExpires(e.target.checked)} />
            <span> Expira? {expires ? "Sim" : "Não"} </span>
          </label>
          {expires && <InputControl name="expiresAt" control={control} type="date" />}
        </div>
        <div className="inline-flex space-x-4">
          <MainButton>Criar link</MainButton>
          <Link href="/">
            <MainButton type="button" variant="primary-stroke">Voltar</MainButton>
          </Link>
        </div>
      </form>
      {error?.message}
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