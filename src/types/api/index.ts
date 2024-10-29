export type ApiCallError = {
  message: string,
  status: number,
  name: string,
  messages?: ApiErrorMessage[]
}

type ApiErrorMessage = {
  message: string,
  rule: string,
  field: string,
}