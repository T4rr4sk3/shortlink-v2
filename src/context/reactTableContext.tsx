import type { Table } from "@tanstack/react-table";
import { createContext } from "react";

export const ReactTableContext = createContext({} as Table<unknown>)