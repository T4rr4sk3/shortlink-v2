import type { ComponentProps } from "react";

export default function GroupIcon (props: ComponentProps<"svg">) {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M10 4H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8z"/>
    </svg>
  )
}