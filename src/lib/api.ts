import type { ApiCallError } from "@app/types/api"

export function toFormData(data: object) {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    const isArray = Array.isArray(value)
    formData.append(key, isArray ? value.join() : value)
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

export const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN || "http://localhost:3334"