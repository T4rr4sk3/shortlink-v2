"use client"
import { dataIsApiCallError, getApiCallErrorMessage } from "@app/lib/api"
import { useCallback, useEffect, useMemo, useState } from "react"
import type { LinkOrGroup } from "@app/types/api/linkGroupTree"
import ActionsProvider from "../provider/ActionsProvider"
import { getLinksClient } from "@app/bin/endpoints/link"
import type { GetLinkReturn } from "@app/types/api/link"
import { useLoading } from "@app/hooks/use-loading"
import { useSearchParams } from "next/navigation"
import ShowLinksTable from "../showLinks/table"
import { toast } from "@app/hooks/use-toast"
import LoadingIcon from "../icons/loading"

export default function ShowLinksByTagComponent({ tagIdParamName: searchName }: { tagIdParamName: string }) {
  const [links, setLinks] = useState<GetLinkReturn[]>()
  const { onLoading, offLoading, loading } = useLoading()
  const searchParams = useSearchParams()
  const searchValue = searchParams.get(searchName) || undefined

  const searchLinksAndGroups = useCallback(async () => {
    onLoading()
    const data = await getLinksClient({ tag: searchValue })
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

  const linksOrGroups = links?.map<LinkOrGroup>((link) => ({
    id: link.id,
    name: link.name,
    createdAt: link.createdAt,
    linkInfo: link,
    type: "link",
  }))
  return(
    <div className="space-y-4">
      <div className="text-right">
        {loading && <LoadingIcon className="size-8" />}
      </div>

      <ActionsProvider initialActions={actions}>
        {linksOrGroups &&
          <ShowLinksTable
            links={linksOrGroups}
            searchName={searchName}
          />
        }
      </ActionsProvider>
    </div>
  )
}