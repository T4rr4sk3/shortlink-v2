import { useContext } from "react";

import { ActionsContext } from "@app/context/actionsContext";

export function useActions() {
  return useContext(ActionsContext)
}