import { Pagination, PaginationButton, PaginationButtonNext, PaginationButtonPrevious, PaginationContent, PaginationItem } from "../ui/pagination"
import { TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table"
import { getLinesLabel, getPageOptionsByCurrentPage } from "@app/lib/pagination"
import type { PaginatorProps, PaginatorSide } from "@app/types/props"
import { useReactTableContext } from "@app/hooks/use-react-table"
import type { PropsWithChildren } from "react"
import { cn } from "@app/lib/utils"

export default function ReactTablePaginator({ side = "bottom", showLines = true, linesLabel = "Total de linhas: " }: PaginatorProps) {
  const { getState, getPageOptions, getRowCount, setPageIndex } = useReactTableContext()
  const currentPage = getState().pagination.pageIndex
  const rowsPerPage = getState().pagination.pageSize
  const currentPageOptions = getPageOptionsByCurrentPage(currentPage, getPageOptions())
  const lines = getLinesLabel(getRowCount(), linesLabel)
  const onPageClick = (page: number) => () => setPageIndex(page)

  return(
    <ReactTablePaginatorWrapper side={side}>
      {showLines &&
        <ReactTablePaginatorLinesLabel label={lines} rowsPerPage={rowsPerPage} />
      }

      <Pagination className="w-full flex justify-center">
        <PaginationContent className="w-fit flex flex-wrap space-x-2">
          {/* <TanStackPaginatorFirstPageButton /> */}
          <PaginationItem>
            <ReactTablePaginatorPrevPageButton />
          </PaginationItem>

          {currentPageOptions.map((page) => (
            <PaginationItem key={page}>
              <PaginationButton
                isActive={currentPage === page}
                title={"Ir para página " + (page + 1)}
                aria-label={"Ir para página " + (page + 1)}
                onClick={onPageClick(page)}
              >
                {page+1}
              </PaginationButton>
            </PaginationItem>
          ))}

          <PaginationItem>
            <ReactTablePaginatorNextPageButton />
          </PaginationItem>
          {/* <TanStackPaginatorLastPageButton /> */}
        </PaginationContent>
      </Pagination>
    </ReactTablePaginatorWrapper>
  )
}

function ReactTablePaginatorNextPageButton() {
  const { nextPage, getCanNextPage } = useReactTableContext()
  const nextPageLabel = "Próxima página"
  return (
    <PaginationButtonNext
      onClick={nextPage}
      disabled={!getCanNextPage()}
      aria-label={nextPageLabel}
      title={nextPageLabel}
    />
  )
}

function ReactTablePaginatorPrevPageButton() {
  const { previousPage, getCanPreviousPage } = useReactTableContext()
  const prevPageLabel = "Página anterior"
  return (
    <PaginationButtonPrevious
      onClick={previousPage}
      disabled={!getCanPreviousPage()}
      aria-label={prevPageLabel}
      title={prevPageLabel}
    />
  )
}

function ReactTablePaginatorLinesLabel({ label, rowsPerPage }: { label: string, rowsPerPage: number }) {
  return(
    <div className="text-center truncate font-semibold text-sm" title={label} aria-label={label}>
      <p>
        {/* Mostrando <TanStackPaginatorPageSizeSelect className="border-gray-400" /> linhas */}
        Mostrando {rowsPerPage} por página - {label}
        {/* por página - {lines} <TanStackRowSelectionSelectedQuantity /> */}
      </p>
    </div>
  )
}

function ReactTablePaginatorWrapper({ side, children }: { side: PaginatorSide } & PropsWithChildren) {
  const { getAllColumns } = useReactTableContext()
  const isBottom = side === "bottom"
  const Wrapper = isBottom ? TableFooter : TableHeader
  const WrapperCell = isBottom ? TableCell : TableHead
  return(
    <Wrapper>
      <TableRow>
        <WrapperCell colSpan={getAllColumns().length} className="p-2">
          <div className={cn("w-full flex flex-col gap-1", isBottom && "flex-col-reverse")}>
            {children}
          </div>
        </WrapperCell>
      </TableRow>
    </Wrapper>
  )
}