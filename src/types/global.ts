import type { RowData } from "@tanstack/react-table";

/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace NodeJS {
  interface ProcessEnv {
    APP_SALT?: string,
    APP_USER?: string,
    APP_PASS?: string,

    NEXT_PUBLIC_API_DOMAIN?: string,
  }
}


declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> extends
    //FilterableColumnMeta,
    IdentifiersColumnMeta,
    ClassNameColumnMeta
  {
    row?: TData,
    value?: TValue
  }
}

// export interface FilterableColumnMeta {
//   /** If the column is filterable, this will be the type of the input.
//   If `options` field is defined, this will be ignored. */
//   filterVariant?: HTMLInputTypeAttribute | "select",
//   /** If the column is filterable, this will be the options of the select.
//   This takes precedence over `filterVariant`, making input always a select. */
//   options?: {
//     label: string,
//     value: string,
//   } [], // array of options
// }

export interface IdentifiersColumnMeta {
  /** The declared name for this column, to be used whenever possible */
  name?: string
}

export interface ClassNameColumnMeta {
  className?: string
}