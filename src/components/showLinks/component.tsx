"use client"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"

import type { GetLinkGroupTreeInternalReturn } from "@app/types/api/linkGroupTree"
import { getLinkGroupTreeClient } from "@app/bin/endpoints/linkGroupTree"
import { dataIsApiCallError, getApiCallErrorMessage } from "@app/lib/api"
import ShowLinksGroupsBreadcrumb from "./groupBreadcrumb"
import ActionsProvider from "../provider/ActionsProvider"
import { useLoading } from "@app/hooks/use-loading"
import { MainButton } from "../common/mainButton"
import { toast } from "@app/hooks/use-toast"
import LoadingIcon from "../icons/loading"
import ShowLinksTable from "./table"

export default function ShowLinksComponent({ groupIdParamName: searchName }: { groupIdParamName: string }) {
  const [links, setLinks] = useState<GetLinkGroupTreeInternalReturn>()
  const { onLoading, offLoading, loading } = useLoading()
  const searchParams = useSearchParams()
  const searchValue = searchParams.get(searchName) || undefined

  const searchLinksAndGroups = useCallback(async () => {
    onLoading()
    const data = await getLinkGroupTreeClient(searchValue)
    if(dataIsApiCallError(data)) {
      const message = getApiCallErrorMessage(data, "Buscar links")
      toast({ description: message, variant: "error" })
    } else setLinks(data)
    offLoading()
  }, [offLoading, onLoading, searchValue])
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