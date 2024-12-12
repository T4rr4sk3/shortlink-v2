"use client"
import { createColumnHelper, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { ReactTable, ReactTableBody, ReactTableHeader } from "@app/components/tables/ReactTable"
import ReactTablePaginator from "@app/components/tables/ReactTablePaginator"
import { ReactTableHeadBase } from "@app/components/tables/ReactTableHeads"
import { ReactTableCellBase } from "@app/components/tables/ReactTableCells"
import type { GetGroupsReturn } from "@app/types/api/group"
import { ShowGroupsTableCellActions, ShowGroupsTableCellCreatedAt, ShowGroupsTableParentGroup } from "./cell"

const helper = createColumnHelper<GetGroupsReturn>()

interface Props {
  groups: GetGroupsReturn[]
}
export default function ShowGroupsTable({ groups }: Props) {
  const table = useReactTable({
    data: groups,
    columns: [
      helper.accessor("id", {
        header: (c) => <ReactTableHeadBase context={c} title="ID" />,
        cell: (c) => <ReactTableCellBase isID context={c} />,
        meta: { className: "w-20 text-right" }
      }),
      helper.accessor("name", {
        header: (c) => <ReactTableHeadBase context={c} title="Nome" />
      }),
      helper.accessor("createdAt", {
        header: "Criado em",
        cell: (c) => <ShowGroupsTableCellCreatedAt context={c} />,
        meta: { className: "w-44 text-center" }
      }),
      helper.display({
        header: "Grupo pai",
        cell: (c) => <ShowGroupsTableParentGroup context={c} />,
        meta: { className: "w-44" }
      }),
      helper.accessor("links", {
        header: "Nº de links",
        cell: (c) => <ReactTableCellBase context={c} inCenter />,
        meta: { className: "w-28 text-center" }
      }),
      helper.display({
        header: "Ações",
        cell: (c) => <ShowGroupsTableCellActions context={c} />,
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
        <ReactTablePaginator linesLabel="Grupos encontrados: " />
      </ReactTable>
    </div>
  )
}