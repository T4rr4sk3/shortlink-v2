"use client"

import { toJSON } from "@app/lib/api"

/** used to call this website API */
export async function callInternalApi<ReturnData = unknown>(path: string, options?: ApiOptions) {
  let baseUrl = "/shortlink/" + path
  if(options?.params && objectHaveSomeVales(options.params)) {
    const qs = new URLSearchParams(Object.entries(options.params))
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
      return { status: response.status, data }
    } catch (error) {
      const data = await response.text()
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
  return Object.values(obj).some((value) =>
    typeof value !== "undefined" && value !== "undefined"
  )
}

type ApiOptions = {
  method?: string,
  data?: unknown,
  tags?: string[],
  revalidate?: number | false,
  cache?: RequestCache,
  params?: unknown,
}