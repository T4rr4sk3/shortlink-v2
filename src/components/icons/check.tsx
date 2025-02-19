import type { ComponentProps } from "react";

export default function CheckIcon (props: ComponentProps<"svg">) {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59z" />
    </svg>
  )
}