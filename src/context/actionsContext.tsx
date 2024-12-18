import { createContext } from "react";

import type { ActionContextData } from "@app/types/contexts";

export const ActionsContext = createContext<ActionContextData>({
  callAction: () => undefined,
  registerAction: () => undefined,
})