"use client"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"

import type { GetLinkGroupTreeInternalReturn } from "@app/types/api/linkGroupTree"
import { getLinkGroupTreeClient } from "@app/bin/endpoints/linkGroupTree"
import ShowLinksGroupsBreadcrumb from "./groupBreadcrumb"
import ActionsProvider from "../provider/ActionsProvider"
import { useLoading } from "@app/hooks/use-loading"
import ShowLinksSearchModal from "./searchModal"
import { apiRejectHandler } from "@app/lib/api"
import LoadingIcon from "../icons/loading"
import ShowLinksTable from "./table"
interface Props {
  /** @default "group-id" */
  groupIdParamName: string | undefined
}
export default function ShowLinksComponent({ groupIdParamName: searchName = "group-id" }: Props) {
  const [links, setLinks] = useState<GetLinkGroupTreeInternalReturn>()
  const { onLoading, offLoading, loading } = useLoading()
  const searchParams = useSearchParams()
  const searchValue = searchParams.get(searchName) || undefined

  const searchLinksAndGroups = useCallback(async () => {
    onLoading()
    return getLinkGroupTreeClient(searchValue).then(setLinks)
      .catch((reason) => {
        apiRejectHandler("Buscar links")(reason)
        setLinks({ groupsPath: [], linksOrGroups: [], parentGroup: null, path: "/" })
      })
      .finally(offLoading)
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

        <ShowLinksSearchModal searchName={searchName} />
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