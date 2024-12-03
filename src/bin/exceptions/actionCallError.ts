/** Error to call an action */
export class ActionCallError extends Error {
  readonly action: string
  constructor(actionName: string, message?: string) {
    super(
      message || `Action not found. It was registered? (Action: "${actionName}")`,
      {
        cause: `Action called: ${actionName}`
      }
    )
    this.action = actionName
  }
}