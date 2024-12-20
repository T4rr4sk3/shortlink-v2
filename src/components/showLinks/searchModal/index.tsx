import { useCallback, useMemo, useState } from "react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@app/components/ui/dialog"
import { MainButton } from "@app/components/common/mainButton"
import SearchWebIcon from "@app/components/icons/searchWeb"
import ShowLinksSearchModalContent from "./content"
import ActionsProvider from "@app/components/provider/ActionsProvider"

interface ShowLinksSearchProps {
  className?: string,
  searchName: string,
}
export default function ShowLinksSearchModal({ className, searchName }: ShowLinksSearchProps) {
  const [isOpen, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const actions = useMemo(() => ({close}), [close])
  return(
    <Dialog onOpenChange={setOpen} open={isOpen}>
      <DialogTrigger asChild>
        <MainButton className={className}>
          <SearchWebIcon className="size-6 mr-2" /> Buscar Link
        </MainButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buscar link</DialogTitle>
          <DialogDescription>Busque um link pelo nome</DialogDescription>
        </DialogHeader>
        {/* Input, buscar e resultado */}
        <ActionsProvider initialActions={actions}>
          <ShowLinksSearchModalContent searchName={searchName} />
        </ActionsProvider>
      </DialogContent>
    </Dialog>
  )
}