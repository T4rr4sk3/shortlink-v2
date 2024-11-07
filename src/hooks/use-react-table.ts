import { ReactTableContext } from "@app/context/reactTableContext";
import type { Table } from "@tanstack/react-table";
import { useContext } from "react";

export function useReactTableContext<T = unknown>() {
  return useContext(ReactTableContext) as Table<T>
}