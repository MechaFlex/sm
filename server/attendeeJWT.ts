import { Elysia, t } from "elysia"
import jwt from "@elysiajs/jwt"

const salt = Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString("hex")

export const attendeeJWTplugin = new Elysia().use(
  jwt({
    name: "attendeeToken",
    secret: salt,
    exp: "1d",
    schema: t.Object({
      id: t.String(),
      firstName: t.String(),
      nickName: t.String(),
      lastName: t.String(),
    }),
  })
)
