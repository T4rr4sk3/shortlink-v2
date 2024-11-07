import { useCallback, useEffect, useState } from "react";
import { ActionsContext } from "@app/context/actionsContext";
import type { PropsWithChildren} from "react";

interface ActionsProviderProps extends PropsWithChildren {
  initialActions?: {
    [name: string]: (...args: unknown[]) => void
  }
}

export default function ActionsProvider({ initialActions, children }: ActionsProviderProps) {
  const [functionMap, setFunctionMap] = useState(new Map<string, (...args: unknown[]) => void>())

  useEffect(() => {
    if(initialActions)
      setFunctionMap((oldMap) => {
        Object.entries(initialActions).forEach(([name, callback]) => {
          oldMap.set(name, callback)
        })
        return new Map(oldMap)
      })
  }, [initialActions])

  const callAction = useCallback((name: string, ...args: unknown[]) => {
    const existingFunction = functionMap.get(name)
    if(!existingFunction) throw new Error("Action not founded. It was registered?")
    return existingFunction(...args)
  }, [functionMap])

  const registerAction = useCallback((name: string, action: (...args: unknown[]) => void) => {
    functionMap.set(name, action)
  }, [functionMap])

  return(
    <ActionsContext.Provider value={{ callAction, registerAction }}>
      {children}
    </ActionsContext.Provider>
  )
}