import type { ApiCallError } from "@app/types/api"
import { toast } from "@app/hooks/use-toast"

export function toFormData(data: object) {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if(value === null || value === undefined) return
    const isArray = Array.isArray(value)
    formData.append(key, isArray && value.length ? value.join() : typeof value === "boolean" ? value : value || null)
  })
  return formData
}

export function toJSON(data: unknown) {
  return JSON.stringify(data)
}

export function fromJSON<T = unknown>(json: string) {
  return JSON.parse(json) as T
}

export function dataIsApiCallError(data: unknown): data is ApiCallError {
  if (!data) return false
  return(
    typeof (data as ApiCallError).message === "string"
    && typeof (data as ApiCallError).status === "number"
    && typeof (data as ApiCallError).name === "string"
  )
}

export function getApiCallErrorMessage(err: ApiCallError, name?: string) {
  const message = err.messages ?
    err.messages.map(getApiErrorMessage).join(", ")
    : (err.name === "DatabaseError" ?
      "Erro interno no banco de dados"
      : err.message // only the message
    )

  if(process.env.NODE_ENV !== "production")
    console.error("Error: %s (code %d)", err.message, err.status)

  return `${name || err.name}: ${message} (${err.status})`
}

export function getApiErrorMessage(err: { field: string, message: string }) {
  return `${err.field}{${err.message}}`
}

export const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN || "http://localhost:3334"

export function apiRejectHandler(title?: string) {
  return (reason: unknown) => {
    let message: string = (reason as Error)?.message || String(reason)
    if(dataIsApiCallError(reason))
      message = getApiCallErrorMessage(reason, title || "Erro genérico")

    toast({ description: message, variant: "error" })
  }
}
