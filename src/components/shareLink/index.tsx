"use client"

import { apiUrl } from "@app/lib/api"
import { MainButton } from "../common/mainButton"
import { useRef, useState } from "react"
import QRCodeLinkImage from "./qrCodeLinkImage"
import { saveAs } from "file-saver"

interface ShareLinkProps {
  code: string,
  name: string,
  expiresAt?: string | null
}
export default function ShareLink({ name, code, expiresAt }: ShareLinkProps) {
  const [downloading, setIsDownloading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const url = apiUrl + "/" + code

  function inputSelectAll() {
    inputRef.current?.select()
  }

  function selectAllToClipboard() {
    if(!navigator?.clipboard) return
    navigator.clipboard.writeText(url)
    inputSelectAll()
  }

  function downloadQR(extension: "png" | "svg") {
    return async () => {
      setIsDownloading(true)
      return fetch(`${url}/qrcode?width=512&type=${extension}`)
        .then((response) => {
          if (response.ok) return response.blob()
        })
        .then((blob) => {
          if (blob) saveAs(blob, `link-qr-${name}.${extension}`)
        })
        .finally(() => { setIsDownloading(false) })
    }
  }

  const haveExpires = Boolean(expiresAt)
  const expirationDate = haveExpires ? new Date(expiresAt!).toLocaleDateString() : undefined
  const copyText = "Aperte CTRL + C para copiar o link selecionado ou selecione toda a caixa de texto para copiar."

  return(
    <div className="space-y-4">
      <div className="w-full py-2 px-4 flex justify-between border border-cinza-fumaca-main rounded space-x-2">
        <input className="text-cinza-fumaca-main w-full" ref={inputRef} onFocus={inputSelectAll} defaultValue={url} readOnly />
        <MainButton className="grow-0" type="button" onClick={selectAllToClipboard} variant="primary-stroke">
          Copiar
        </MainButton>
      </div>
      <p className="max-w-screen-sm">{copyText}</p>
      <div className="flex justify-center">
        <QRCodeLinkImage code={code} />
      </div>
      <div className="space-x-4 text-center">
        <MainButton
          disabled={downloading}
          onClick={downloadQR("svg")}
          variant="secondary-stroke"
        > .svg
        </MainButton>
        <MainButton
          disabled={downloading}
          onClick={downloadQR("png")}
          variant="secondary-stroke"
        > .png
        </MainButton>
      </div>
      {haveExpires && <p className="text-center"> Expira em: {expirationDate} </p>}
    </div>
  )
}