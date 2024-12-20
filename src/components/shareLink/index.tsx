"use client"
import { useRef, useState } from "react"
import { saveAs } from "file-saver"

import { MainButton } from "../common/mainButton"
import QRCodeLinkImage from "./qrCodeLinkImage"
import { useToast } from "@app/hooks/use-toast"
import { apiUrl } from "@app/lib/api"
import { cn } from "@app/lib/utils"

interface ShareLinkProps {
  code: string,
  name: string,
  expiresAt?: string | null
}
export default function ShareLink({ name, code, expiresAt }: ShareLinkProps) {
  const [downloading, setIsDownloading] = useState<"png" | "svg">()
  const inputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const url = apiUrl + "/" + code

  function inputSelectAll() {
    inputRef.current?.select()
  }

  function selectAllToClipboard() {
    if(!navigator?.clipboard) return
    navigator.clipboard.writeText(url)
    inputSelectAll()
    toast({ description: "Link copiado com sucesso!", variant: "success" })
  }

  function downloadQR(extension: "png" | "svg") {
    return async () => {
      setIsDownloading(extension)
      return fetch(`${url}/qrcode?width=512&type=${extension}`)
        .then((response) => {
          if (response.ok) return response.blob()
        })
        .then((blob) => {
          if (blob) saveAs(blob, `link-qr-${name}.${extension}`)
        })
        .catch((r) => {
          toast({ description: `Ocorreu alguma falha ao fazer download! ${r}`, variant: "error" })
        })
        .finally(() => { setIsDownloading(undefined) })
    }
  }

  const expiresAtDate = new Date(expiresAt?.replace("+00:00", "") || "")
  const haveExpires = !isNaN(expiresAtDate.getTime())
  const expirationString = haveExpires ? expiresAtDate.toLocaleDateString() : undefined
  const isExpired = haveExpires ? false : expiresAtDate.getTime() < Date.now()
  const copyText = "Aperte CTRL + C para copiar o link selecionado ou selecione toda a caixa de texto para copiar."

  return(
    <div className="space-y-4">
      <div className="w-full py-2 px-4 flex justify-between border border-cinza-fumaca-main rounded space-x-2">
        <input className={cn("text-cinza-fumaca-main w-full", isExpired && "pointer-events-none cursor-not-allowed")} ref={inputRef} onFocus={inputSelectAll} defaultValue={url} readOnly disabled={isExpired} />
        <MainButton className="grow-0" type="button" onClick={selectAllToClipboard} variant="primary-stroke" disabled={isExpired}>
          Copiar
        </MainButton>
      </div>
      <p className="max-w-screen-sm">{copyText}</p>
      <div className="flex justify-center">
        {isExpired ?
          <span> Link is expired. </span> :
          <QRCodeLinkImage code={code} />
        }
      </div>
      <div className="space-x-4 text-center">
        <MainButton
          loading={downloading === "svg"}
          loadingText="Fazendo download..."
          disabled={!!downloading || isExpired}
          onClick={downloadQR("svg")}
          variant="secondary-stroke"
        > .svg
        </MainButton>
        <MainButton
          loading={downloading === "png"}
          loadingText="Fazendo download..."
          disabled={!!downloading || isExpired}
          onClick={downloadQR("png")}
          variant="secondary-stroke"
        > .png
        </MainButton>
      </div>
      {haveExpires && <p className="text-center"> Expira em: {expirationString} </p>}
    </div>
  )
}