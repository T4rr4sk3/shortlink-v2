"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { dataIsApiCallError, getApiCallErrorMessage } from "@app/lib/api"
import { useLoading } from "@app/hooks/use-loading"
import { toast } from "@app/hooks/use-toast"
import { MainButton } from "../common/mainButton"
import { useSearchParams } from "next/navigation"
import LoadingIcon from "../icons/loading"
import ActionsProvider from "../provider/ActionsProvider"
import { getLinkGroupsClient } from "@app/bin/endpoints/linkGroup"

export default function ShowGroupsComponent() {
  const { onLoading, offLoading, loading } = useLoading()
  const [groups, setGroups] = useState<unknown[]>([])
  const searchParams = useSearchParams()

  const searchGroups = useCallback(async () => {
    onLoading()
    const search = searchParams.get("group-name") || undefined
    const data = await getLinkGroupsClient(search)
    if(dataIsApiCallError(data)) {
      const message = getApiCallErrorMessage(data, "Buscar grupos")
      toast({ description: message, variant: "error" })
    } else setGroups(data)
    offLoading()
  }, [onLoading, offLoading, searchParams])

  useEffect(() => { searchGroups() }, [searchGroups])
  const actions = useMemo(() => {
    return {searchGroups}
  }, [searchGroups])

  return (
    <div className="space-y-4">
      <form className="max-w-screen-md p-2 mx-auto">
        <div className="w-full border border-zinc-200 p-2 rounded-md inline-flex gap-2">
          <input name="group-name" defaultValue={searchParams.get("group-name") || undefined} className="px-2 py-1 w-full rounded-md bg-white text-sm ring-offset-white gap-4 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Buscar grupo..." />
          <MainButton className="shrink-0" variant="primary-stroke"> Buscar </MainButton>
        </div>
      </form>

      <div className="text-right">
        {loading && <LoadingIcon className="size-8 inline mr-4" />}
        {/* <CreateTagModal onDone={searchTags} /> */}
      </div>

      <ActionsProvider initialActions={actions}>
        {JSON.stringify(groups)}
        {/* <ShowTagsTable tags={tags} /> */}
      </ActionsProvider>
    </div>
  )
}