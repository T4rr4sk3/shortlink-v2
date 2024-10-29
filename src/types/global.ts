/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace NodeJS {
  interface ProcessEnv {
    APP_SALT?: string,
    APP_USER?: string,
    APP_PASS?: string,

    NEXT_PUBLIC_API_DOMAIN?: string,
  }
}