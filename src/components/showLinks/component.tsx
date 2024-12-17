"use client"
import type { GetLinkGroupTreeInternalReturn } from "@app/types/api/linkGroupTree"
import { getLinkGroupTreeClient } from "@app/bin/endpoints/linkGroupTree"
import { dataIsApiCallError, getApiCallErrorMessage } from "@app/lib/api"
import { useLoading } from "@app/hooks/use-loading"
import { MainButton } from "../common/mainButton"
import { toast } from "@app/hooks/use-toast"
import LoadingIcon from "../icons/loading"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import ShowLinksGroupsBreadcrumb from "./groupBreadcrumb"
import ShowLinksTable from "./table"
import ActionsProvider from "../provider/ActionsProvider"

export default function ShowLinksComponent() {
  const [links, setLinks] = useState<GetLinkGroupTreeInternalReturn>()
  const { onLoading, offLoading, loading } = useLoading()
  const searchParams = useSearchParams()
  const searchName = "group-id"

  const searchLinksAndGroups = useCallback(async () => {
    onLoading()
    const group = searchParams.get(searchName) || undefined
    const data = await getLinkGroupTreeClient(group)
    if(dataIsApiCallError(data)) {
      const message = getApiCallErrorMessage(data, "Buscar grupos")
      toast({ description: message, variant: "error" })
    } else setLinks(data)
    offLoading()
  }, [offLoading, onLoading, searchParams])
  useEffect(() => { searchLinksAndGroups() }, [searchLinksAndGroups])
    const actions = useMemo(() => {
      return {searchLinks: searchLinksAndGroups}
    }, [searchLinksAndGroups])

  return(
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <div className="flex wrap gap-2 shrink text-lg text-cinza-fumaca-dark items-end">
          {links &&
            <ShowLinksGroupsBreadcrumb
              currentGroup={links.parentGroup}
              groups={links.groupsPath}
              searchName={searchName}
            />
          }
          {loading && <LoadingIcon className="size-8" />}
        </div>
        <MainButton>
          Buscar Link
        </MainButton>
      </div>

      <ActionsProvider initialActions={actions}>
        {links &&
          <ShowLinksTable
            links={links?.linksOrGroups}
            searchName={searchName}
          />
        }
      </ActionsProvider>
    </div>
  )
}