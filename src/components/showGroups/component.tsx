"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { dataIsApiCallError, getApiCallErrorMessage } from "@app/lib/api"
import { useLoading } from "@app/hooks/use-loading"
import { toast } from "@app/hooks/use-toast"
import LoadingIcon from "../icons/loading"
import { MainButton } from "../common/mainButton"
import { getLinkGroupsClient } from "@app/bin/endpoints/linkGroup"
import ActionsProvider from "../provider/ActionsProvider"
import type { GetGroupsReturn } from "@app/types/api/group"
import CreateGroupModal from "../createGroup/modal"
import ShowGroupsTable from "./table"

export default function ShowGroupsComponent({ groupNameParamName: searchName }: { groupNameParamName: string }) {
  const { onLoading, offLoading, loading } = useLoading()
  const [groups, setGroups] = useState<GetGroupsReturn[]>([])
  const searchValue = useSearchParams().get(searchName) || undefined

  const searchGroups = useCallback(async () => {
    onLoading()
    const data = await getLinkGroupsClient(searchValue)
    if(dataIsApiCallError(data)) {
      const message = getApiCallErrorMessage(data, "Buscar grupos")
      toast({ description: message, variant: "error" })
    } else setGroups(data)
    offLoading()
  }, [onLoading, offLoading, searchValue])

  useEffect(() => { searchGroups() }, [searchGroups])
  const actions = useMemo(() => {
    return {searchGroups}
  }, [searchGroups])

  return (
    <div className="space-y-4">
      <form className="max-w-screen-md p-2 mx-auto">
        <div className="w-full border border-zinc-200 p-2 rounded-md inline-flex gap-2">
          <input name="group-name" defaultValue={searchValue} className="px-2 py-1 w-full rounded-md bg-white text-sm ring-offset-white gap-4 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Buscar grupo..." />
          <MainButton className="shrink-0" variant="primary-stroke"> Buscar </MainButton>
        </div>
      </form>

      <div className="text-right">
        {loading && <LoadingIcon className="size-8 inline mr-4" />}
        <CreateGroupModal onDone={searchGroups} />
      </div>

      <ActionsProvider initialActions={actions}>
        <ShowGroupsTable groups={groups} />
      </ActionsProvider>
    </div>
  )
}