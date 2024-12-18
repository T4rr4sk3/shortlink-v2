import type { Table } from "@tanstack/react-table";
import { useContext } from "react";

import { ReactTableContext } from "@app/context/reactTableContext";

export function useReactTableContext<T = unknown>() {
  return useContext(ReactTableContext) as Table<T>
}