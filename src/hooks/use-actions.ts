import { ActionsContext } from "@app/context/actionsContext";
import { useContext } from "react";

export function useActions() {
  return useContext(ActionsContext)
}