import { createColumnHelper, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"

import { ShowLinksTableCellActions, ShowLinksTableCellCode, ShowLinksTableCellExpires, ShowLinksTableCellName, ShowLinksTableCellTags, ShowLinksTableCellUrl } from "./cell"
import { ReactTable, ReactTableBody, ReactTableHeader } from "@app/components/tables/ReactTable"
import { ReactTableCellBase, ReactTableCellDate } from "@app/components/tables/ReactTableCells"
import { ReactTableHeadBase } from "@app/components/tables/ReactTableHeads"
import ReactTablePaginator from "@app/components/tables/ReactTablePaginator"
import type { LinkOrGroup } from "@app/types/api/linkGroupTree"

const helper = createColumnHelper<LinkOrGroup>()

interface Props {
  links: LinkOrGroup[],
  searchName: string,
}
export default function ShowLinksTable({ links, searchName }: Props) {
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
        cell: (c) => <ShowLinksTableCellUrl context={c} />
      }),
      helper.accessor("linkInfo.expiresAt", {
        header: "Expira",
        cell: (c) => <ShowLinksTableCellExpires context={c} />,
        meta: { className: "w-24" }
      }),
      helper.accessor("linkInfo", {
        header: "Visitas",
        cell: (c) => <>{c.getValue()?.visits}</>,
        meta: { className: "w-32" }
      }),
      helper.accessor("linkInfo.code", {
        header: "Código",
        cell: (c) => <ShowLinksTableCellCode context={c} />,
        meta: { className: "w-36" }
      }),
      helper.accessor("createdAt", {
        header: "Criado em",
        cell: (c) => <ReactTableCellDate context={c} />,
        meta: { className: "w-44 text-center" }
      }),
      helper.display({
        id: "tags",
        header: "Tags",
        cell: (c) => <ShowLinksTableCellTags context={c} />,
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