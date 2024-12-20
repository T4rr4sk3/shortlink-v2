import { useState, type ChangeEventHandler } from "react"

import { dataIsApiCallError, getApiCallErrorMessage } from "@app/lib/api"
import { SearchInput } from "@app/components/forms/searchInput"
import { MainButton } from "@app/components/common/mainButton"
import type { GetLinkReturn } from "@app/types/api/link"
import { getLinksClient } from "@app/bin/endpoints/link"
import { useLoading } from "@app/hooks/use-loading"
import ShowLinksSearchModalResult from "./result"
import { toast } from "@app/hooks/use-toast"

interface Props { searchName: string }
export default function ShowLinksSearchModalContent({ searchName }: Props) {
  const [links, setLinks] = useState<GetLinkReturn[]>([])
  const [searchValue, setSearchValue] = useState("")
  const { loading, wrap } = useLoading()

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.target.value)
  }

  async function searchLinks(e: Event) {
    e.preventDefault()
    const data = await getLinksClient({ name: searchValue })
    if(dataIsApiCallError(data)) {
      const message = getApiCallErrorMessage(data, "Buscar links")
      toast({ description: message, variant: "error" })
    } else setLinks(data)
  }

  return(
    <div className="w-full space-y-4">
      <form onSubmit={wrap(searchLinks)}>
        <div className="w-full border border-zinc-200 p-2 rounded-md inline-flex gap-2">
          <SearchInput name="link-name" placeholder="Buscar link..." value={searchValue} onChange={handleChange} />
          <MainButton className="shrink-0" variant="primary-stroke" loading={loading} loadingText="Buscando...">
            Buscar
          </MainButton>
        </div>
      </form>

      <div className="overflow-auto max-h-[50vh] w-[460px]">
        <ShowLinksSearchModalResult result={links} searchName={searchName} />
      </div>
    </div>
  )
}