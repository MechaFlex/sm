import Elysia, { t } from "elysia"
import { Stream } from "@elysiajs/stream"
import { attendeeJWTplugin } from "./attendeeJWT"
import cookie from "@elysiajs/cookie"
import { getMemberCount } from "./attendee"

export type ReadyCounter = {
  readyCount: number
  memberCount: number
}

let readyIds = new Set<string>()

export const readyCounter = new Elysia({
  prefix: "/readycounter",
})
  .use(attendeeJWTplugin)
  .use(cookie())
  .get(
    "/stream",
    () =>
      new Stream((stream) => {
        let currentReadyState = new Set<string>()
        let currentMemberCount = 0

        const interval = setInterval(async () => {
          const members = await getMemberCount()

          if (currentReadyState.size !== readyIds.size || currentMemberCount !== members.length) {
            currentReadyState = new Set(readyIds)
            currentMemberCount = members.length
            stream.send({
              readyCount: readyIds.size,
              memberCount: members.length,
            } as ReadyCounter)
          }
        }, 100)
      })
  )
  .post("/ready", async ({ cookie: { attendeeJWT }, attendeeToken, set }) => {
    const user = await attendeeToken.verify(attendeeJWT)
    if (!user) {
      set.status = "Unauthorized"
      return "User not registered"
    }
    console.log("Received readyup request for id", user.id)
    readyIds.add(user.id)
    console.log("Current readyIds", readyIds)
    set.status = "OK"
    return "ID " + user.id + " set ready"
  })
  .post("/unready", async ({ cookie: { attendeeJWT }, attendeeToken, set }) => {
    const user = await attendeeToken.verify(attendeeJWT)
    if (!user) {
      set.status = "Unauthorized"
      return "User not registered"
    }
    console.log("Received unready request for id", user.id)
    readyIds.delete(user.id)
    console.log("Current readyIds", readyIds)
    set.status = "OK"
    return "ID " + user.id + " set unready"
  })
