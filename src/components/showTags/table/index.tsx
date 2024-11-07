"use client"
import { createColumnHelper, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { ShowTagsTableCellActions, ShowTagsTableCellColor, ShowTagsTableCellCreatedAt } from "./cell"
import { ReactTable, ReactTableBody, ReactTableHeader } from "@app/components/tables/ReactTable"
import ReactTablePaginator from "@app/components/tables/ReactTablePaginator"
import { ReactTableHeadBase } from "@app/components/tables/ReactTableHeads"
import type { GetTagsReturn } from "@app/types/api/tag"
import { ReactTableCellBase } from "@app/components/tables/ReactTableCells"

const helper = createColumnHelper<GetTagsReturn>()

interface Props {
  tags: GetTagsReturn[]
}
export default function ShowTagsTable({ tags }: Props) {
  const table = useReactTable({
    data: tags,
    columns: [
      helper.accessor("id", {
        header: (c) => <ReactTableHeadBase context={c} title="ID" />,
        cell: (c) => <ReactTableCellBase isID context={c} />,
        meta: { className: "w-20 text-right" }
      }),
      helper.accessor("name", {
        header: (c) => <ReactTableHeadBase context={c} title="Nome" />
      }),
      helper.accessor("color", {
        header: "Cor da Tag",
        cell: (c) => <ShowTagsTableCellColor context={c} />,
        meta: { className: "w-32" }
      }),
      helper.accessor("createdAt", {
        header: "Criado em",
        cell: (c) => <ShowTagsTableCellCreatedAt context={c} />,
        meta: { className: "w-44 text-right" }
      }),
      helper.accessor("links", {
        header: "Nº de links",
        cell: (c) => <ReactTableCellBase context={c} inCenter />,
        meta: { className: "w-28 text-center" }
      }),
      helper.display({
        header: "Ações",
        cell: (c) => <ShowTagsTableCellActions context={c} />,
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
        <ReactTablePaginator linesLabel="Tags encontradas: " />
      </ReactTable>
    </div>
  )
}