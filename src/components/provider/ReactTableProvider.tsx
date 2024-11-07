import { ReactTableContext } from "@app/context/reactTableContext";
import type { Table } from "@tanstack/react-table";
import type { ProviderProps } from "react";

export default function ReactTableProvider<T = unknown>({ value, children }: ProviderProps<Table<T>>) {
  return(
    <ReactTableContext.Provider value={value as Table<unknown>}>
      {children}
    </ReactTableContext.Provider>
  )
}