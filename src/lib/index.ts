export function isDark(hex: string): boolean {
  const [r, , g, , b] = hex.split("").map((c) => parseInt(c, 16))

  const threshold = 12

  return r < threshold && g < threshold // && b < threshold + 3
}

export function getNameFromUser(user: {
  firstName: string
  lastName: string
  nickName: string
}): string {
  if (user.nickName) {
    return user.nickName
  } else {
    return (user.firstName + " " + user.lastName).trim()
  }
}

export const apiUrl = "http://localhost:5173/graphql"

import { edenTreaty } from "@elysiajs/eden"
import type { App } from "../../server"
export const eden = edenTreaty<App>("/api")
