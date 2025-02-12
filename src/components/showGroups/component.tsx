"use client"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"

import { getLinkGroupsClient } from "@app/bin/endpoints/linkGroup"
import type { GetGroupsReturn } from "@app/types/api/group"
import ActionsProvider from "../provider/ActionsProvider"
import { useLoading } from "@app/hooks/use-loading"
import CreateGroupModal from "../createGroup/modal"
import { MainButton } from "../common/mainButton"
import { apiRejectHandler } from "@app/lib/api"
import LoadingIcon from "../icons/loading"
import ShowGroupsTable from "./table"

interface Props {
  /** @default "group-name" */
  groupNameParamName: string | undefined
}
export default function ShowGroupsComponent({ groupNameParamName: searchName = "group-name" }: Props) {
  const { onLoading, offLoading, loading } = useLoading()
  const [groups, setGroups] = useState<GetGroupsReturn[]>([])
  const searchValue = useSearchParams().get(searchName) || undefined

  const searchGroups = useCallback(async () => {
    onLoading()
    return getLinkGroupsClient(searchValue)
      .then(setGroups)
      .catch(apiRejectHandler("Buscar grupos"))
      .finally(offLoading)
  }, [onLoading, offLoading, searchValue])

  useEffect(() => { searchGroups() }, [searchGroups])
  const actions = useMemo(() => {
    return {searchGroups}
  }, [searchGroups])

  return (
    <div className="space-y-4">
      <form className="max-w-screen-md p-2 mx-auto">
        <div className="w-full border border-zinc-200 p-2 rounded-md inline-flex gap-2">
          <input name={searchName} defaultValue={searchValue} className="px-2 py-1 w-full rounded-md bg-white text-sm ring-offset-white gap-4 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Buscar grupo..." />
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