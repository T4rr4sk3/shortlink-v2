"use client"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"

import { dataIsApiCallError, getApiCallErrorMessage } from "@app/lib/api"
import { getLinkTagsClient } from "@app/bin/endpoints/linkTag"
import ActionsProvider from "../provider/ActionsProvider"
import type { GetTagsReturn } from "@app/types/api/tag"
import { useLoading } from "@app/hooks/use-loading"
import { MainButton } from "../common/mainButton"
import CreateTagModal from "../createTag/modal"
import { toast } from "@app/hooks/use-toast"
import LoadingIcon from "../icons/loading"
import ShowTagsTable from "./table"

interface Props {
  /** @default "tag-name" */
  tagNameParamName: string | undefined
}
export default function ShowTagsComponent({ tagNameParamName: searchName = "tag-name" }: Props) {
  const { onLoading, offLoading, loading } = useLoading()
  const [tags, setTags] = useState<GetTagsReturn[]>([])
  const searchParams = useSearchParams()
  const searchValue = searchParams.get(searchName) || undefined

  const searchTags = useCallback(async () => {
    onLoading()
    const data = await getLinkTagsClient(searchValue)
    if(dataIsApiCallError(data)) {
      const message = getApiCallErrorMessage(data, "Buscar tags")
      toast({ description: message, variant: "error" })
    } else setTags(data)
    offLoading()
  }, [onLoading, offLoading, searchValue])

  useEffect(() => { searchTags() }, [searchTags])
  const actions = useMemo(() => {
    return {searchTags}
  }, [searchTags])

  return (
    <div className="space-y-4">
      <form className="max-w-screen-md p-2 mx-auto">
        <div className="w-full border border-zinc-200 p-2 rounded-md inline-flex gap-2">
          <input name={searchName} defaultValue={searchValue} className="px-2 py-1 w-full rounded-md bg-white text-sm ring-offset-white gap-4 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Buscar tag..." />
          <MainButton className="shrink-0" variant="primary-stroke"> Buscar </MainButton>
        </div>
      </form>

      <div className="text-right">
        {loading && <LoadingIcon className="size-8 inline mr-4" />}
        <CreateTagModal onDone={searchTags} />
      </div>

      <ActionsProvider initialActions={actions}>
        <ShowTagsTable tags={tags} />
      </ActionsProvider>
    </div>
  )
}