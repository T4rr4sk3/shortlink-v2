"use client"

import { useCallback, useState } from "react"

/* eslint-disable @typescript-eslint/no-explicit-any */
type UseLoadingReturn = {
  loading: boolean,
  offLoading: () => void,
  onLoading: () => void,
  wrap: (callback: ((...args: any[]) => Promise<any>)) => (...args: unknown[]) => any
}

export function useLoading(initialState?: boolean): UseLoadingReturn {
  const [isLoading, setLoading] = useState(initialState || false)

  const startLoading = useCallback(() => setLoading(true), [])
  const endLoading = useCallback(() => setLoading(false), [])
  const wrapLoading = useCallback((callback: (...args: any[]) => Promise<unknown>) => {
    return (...args: any[]) => {
      startLoading()
      callback(...args)
      .finally(endLoading)
    }
  }, [startLoading, endLoading])

  return {
    offLoading: endLoading,
    onLoading: startLoading,
    loading: isLoading,
    wrap: wrapLoading
  }
}