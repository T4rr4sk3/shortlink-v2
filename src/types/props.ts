import type { PropsWithChildren } from "react";

export interface WithClassName {
  className?: string
}

export interface WrapperProps extends WithClassName, PropsWithChildren {

}

export interface WithParams<T> {
  params: T
}