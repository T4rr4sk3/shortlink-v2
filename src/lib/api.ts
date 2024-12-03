import type { ApiCallError } from "@app/types/api"

export function toFormData(data: object) {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    const isArray = Array.isArray(value)
    formData.append(key, isArray ? value.join() : typeof value === "boolean" ? value : value || null)
  })
  return formData
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
    : err.message // only the message
  return `${name || err.name}: ${message} (${err.status})`
}

export function getApiErrorMessage(err: { field: string, message: string }) {
  return `${err.field}{${err.message}}`
}

export const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN || "http://localhost:3334"
