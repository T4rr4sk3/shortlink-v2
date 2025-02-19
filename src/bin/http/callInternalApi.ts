"use client"
import { dataIsApiCallError, toJSON } from "@app/lib/api"

/** used to call this website API */
export async function callInternalApi<ReturnData = unknown>(path: string, options?: ApiOptions) {
  let baseUrl = "/shortlink/" + path
  if(options?.params && objectHaveSomeVales(options.params)) {
    const qs = new URLSearchParams(getObjectEntries(options.params))
    baseUrl += "?" + qs.toString()
  }
  return fetch(baseUrl, {
    method: options?.method,
    headers: { "content-type": "application/json" },
    body: options?.data ? toJSON(options.data) : null,
    cache: options?.cache,
    next: {
      tags: options?.tags,
      revalidate: options?.revalidate
    },
  })
  .then(async (response) => {
    try {
      const data = await response.json()
      if(dataIsApiCallError(data)) return Promise.reject(data)
      return { status: response.status, data }
    } catch (error) {
      const data = await (response.bodyUsed ? undefined : response.text())

      return { status: 500, data: toJSON({ error, data }) }
    }
  })
  .then(({ data, status }) => {
    if([200, 201, 204].includes(status)) {
      return data as ReturnData
    }
    return Promise.reject(data)
  })
}

function objectHaveSomeVales(obj: object) {
  return Object.values(obj).some(isNotUndefined)
}

function getObjectEntries(obj: object) {
  return Object.entries(obj).filter(([, value]) => isNotUndefined(value))
}

function isNotUndefined(value: unknown) {
  return typeof value !== "undefined" && value !== "undefined"
}

type ApiOptions = {
  method?: string,
  data?: unknown,
  tags?: string[],
  revalidate?: number | false,
  cache?: RequestCache,
  params?: unknown,
}