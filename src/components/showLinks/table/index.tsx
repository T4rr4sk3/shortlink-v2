import { createColumnHelper, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"

import { ShowLinksTableCellActions, ShowLinksTableCellCode, ShowLinksTableCellExpires, ShowLinksTableCellName, ShowLinksTableCellTags, ShowLinksTableCellUrl } from "./cell"
import { ReactTable, ReactTableBody, ReactTableHeader } from "@app/components/tables/ReactTable"
import { ReactTableCellBase, ReactTableCellDate } from "@app/components/tables/ReactTableCells"
import { ReactTableHeadBase } from "@app/components/tables/ReactTableHeads"
import ReactTablePaginator from "@app/components/tables/ReactTablePaginator"
import type { LinkOrGroup } from "@app/types/api/linkGroupTree"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

const helper = createColumnHelper<LinkOrGroup>()

interface Props {
  links: LinkOrGroup[],
  searchName: string,
}
export default function ShowLinksTable({ links, searchName }: Props) {
  const searchParams = useSearchParams()
  const table = useReactTable({
    data: links,
    columns: [
      helper.accessor("id", {
        header: (c) => <ReactTableHeadBase context={c} title="ID" />,
        cell: (c) => <ReactTableCellBase isID context={c} />,
        meta: { className: "w-20 text-right" }
      }),
      helper.accessor("name", {
        header: (c) => <ReactTableHeadBase context={c} title="Nome" />,
        cell: (c) => <ShowLinksTableCellName context={c} searchName={searchName} />
      }),
      helper.display({
        id: "url",
        header: "URL",
        cell: (c) => <ShowLinksTableCellUrl context={c} />,
        meta: { className: "w-80" }
      }),
      helper.accessor("linkInfo.expiresAt", {
        header: "Expira",
        cell: (c) => <ShowLinksTableCellExpires context={c} />,
        meta: { className: "w-24" }
      }),
      helper.accessor("linkInfo", {
        header: (c) => <ReactTableHeadBase context={c} title="Visitas" />,
        cell: (c) => <>{c.getValue()?.visits}</>,
        sortingFn: (a, b) => {
          const aVisits = a.original.linkInfo?.visits || 0
          const bVisits = b.original.linkInfo?.visits || 0
          return aVisits - bVisits
        },
        sortUndefined: "last",
        meta: { className: "w-32" }
      }),
      helper.accessor("linkInfo.code", {
        header: "Código",
        cell: (c) => <ShowLinksTableCellCode context={c} />,
        meta: { className: "w-36" }
      }),
      helper.accessor("createdAt", {
        header: (c) => <ReactTableHeadBase context={c} title="Criado em" />,
        cell: (c) => <ReactTableCellDate context={c} />,
        sortingFn: (a, b) => new Date(a.original.createdAt).getTime() - new Date(b.original.createdAt).getTime(),
        meta: { className: "w-52 text-center" }
      }),
      helper.display({
        id: "tags",
        header: "Tags",
        cell: (c) => <ShowLinksTableCellTags context={c} />,
        meta: { className: "text-center" }
      }),
      helper.display({
        header: "Ações",
        cell: (c) => <ShowLinksTableCellActions context={c} />,
        meta: { className: "w-40" }
      })
    ],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
    autoResetPageIndex: false,
  })

  const groupId = searchParams.get(searchName)

  useEffect(() => {
    setTimeout(() => table.resetPageIndex(), 500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId, table])
  return(
    <div className="w-full">
      <ReactTable table={table}>
        <ReactTableHeader />
        <ReactTableBody />
        <ReactTablePaginator linesLabel="Links/Grupos encontrados: " />
      </ReactTable>
    </div>
  )
}