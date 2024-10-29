import type { ApiCallError } from "@app/types/api";

export class ApiCallException extends Error {
  readonly status: number
  constructor(message?: string | ApiCallError, status?: number) {
    const messageIsString = typeof message === "string"
    super(messageIsString ? message : undefined)
    const messageIsDefined = typeof message !== "undefined"
    if(messageIsDefined && !messageIsString) {
      this.message = message.message
      this.status = message.status
      this.name = message.name
    } else {
      this.status = status || 500
    }
  }
}