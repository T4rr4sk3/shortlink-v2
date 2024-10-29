"use server"

import { apiUrl } from "@app/lib/api"
import { getToken } from "./getToken"

export async function callApi(path: string, options?: ApiOptions) {
  const token = await getToken()
  let baseUrl = apiUrl + path
  if(options?.params) {
    const qs = new URLSearchParams(Object.entries(options.params))
    baseUrl += "?" + qs.toString()
  }
  return fetch(baseUrl, {
    method: options?.method,
    headers: {
      "authorization": "Bearer " + token,
      "content-type": "application/json",
    },
    body: options?.data ? JSON.stringify(options.data) : null,
    cache: options?.cache,
    next: {
      tags: options?.tags,
      revalidate: options?.revalidate
    },
  })
}

type ApiOptions = {
  method?: string,
  data?: unknown,
  tags?: string[],
  revalidate?: number | false,
  cache?: RequestCache,
  params?: unknown,
}