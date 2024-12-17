export const LINK_NAME_MAX_LENGTH = 255

export function verifyIfIsExpiredByExpiresAt(expires: string) {
  const expiresMs = new Date(expires).getTime()
  if(isNaN(expiresMs)) throw new Error("Link expires is invalid!")
  return Date.now() > expiresMs
}
