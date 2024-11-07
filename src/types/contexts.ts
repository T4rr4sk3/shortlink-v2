export type ActionContextData = {
  /** Calls an action by its registered name */
  callAction: (actionName: string, ...args: unknown[]) => void,
  /** Register an action with a name */
  registerAction: (actionName: string, action: ((...args: unknown[]) => void)) => void
}
