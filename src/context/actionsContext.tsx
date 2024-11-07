import type { ActionContextData } from "@app/types/contexts";
import { createContext } from "react";

export const ActionsContext = createContext<ActionContextData>({
  callAction: () => undefined,
  registerAction: () => undefined,
})