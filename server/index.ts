import Elysia from "elysia"
import { html } from "@elysiajs/html"
import { speakers } from "./speakers"
import { readyCounter } from "./readycounter"
import { attendee } from "./attendee"
import { meeting } from "./meeting"

export const app = new Elysia()
  .use(html()) //stream has not worked without html // version .21 seems to work
  .get("/", () => "Hello, this is the root of the Elysia server.")
  .use(speakers)
  .use(readyCounter)
  .use(attendee)
  .use(meeting)
  .get("getName", () => {})
  .listen(9001)

export type App = typeof app

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
