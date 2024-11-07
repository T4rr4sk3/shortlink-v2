export function getPageOptionsByCurrentPage(current: number, allPages: number[]) {
  const pagesToShow = 9
  const middle = Math.ceil(pagesToShow / 2)
  const numPages = allPages.length

  if(numPages < pagesToShow) return allPages

  if(current < middle) return allPages.slice(0, pagesToShow)

  const start = (current > (numPages - middle)) ? // current is in the end ?
    numPages - pagesToShow // the last numbers
    : current - middle // just the previous numbers
  const end = current + middle

  //console.log({middle, numPages, start, end})

  return allPages.slice(start, end)
}

export function getLinesLabel(rows: number, label: string | ((rows: number) => string)) {
  if(typeof label === "string")
    return label + rows

  return label(rows)
}