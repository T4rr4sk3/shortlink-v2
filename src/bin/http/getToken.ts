"use server"
import { apiUrl, toJSON } from "@app/lib/api"
import { createHash } from "crypto"

export async function getToken() {
  const salt = process.env.APP_SALT
  const pass = process.env.APP_PASS
  const user = process.env.APP_USER
  if(!salt || !user) throw new Error("App don't have salt nor user")
  const timestamp = Date.now()
  const keys = [user, timestamp, salt, timestamp]
  if(pass) keys.push(pass)
  const hash = createHash("sha256").update(keys.join("-")).digest("hex")
  const response = await fetch(`${apiUrl}/auth`, {
    body: toJSON({ user, hash, timestamp }),
    headers: { "content-type": "application/json" },
    method: "POST"
  })
  const body = await response.json()
  if(!response.ok) throw new Error("Invalid authentication")
  if(!body.token) throw new Error("Token not retrieved")
  return body.token as string
}