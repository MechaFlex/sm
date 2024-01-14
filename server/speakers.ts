import { Elysia, t } from "elysia"
import Stream from "@elysiajs/stream"
import { SpeakersList } from "./classes/SpeakersList"
import { Attendee } from "./drizzle/schema/attendee"
import { attendeeJWTplugin } from "./attendeeJWT"
import cookie from "@elysiajs/cookie"
import { db } from "./drizzle/db"
import { attendees } from "./drizzle/schema/attendee"
import { eq } from "drizzle-orm"

export type SpeakersListStreamInterface = {
  new: (typeof Attendee)[]
  returning: (typeof Attendee)[]
}

const speakersList = new SpeakersList()

export const speakers = new Elysia({
  prefix: "/speakers",
})
  .use(attendeeJWTplugin)
  .use(cookie())
  .get("/", () => {
    return {
      new: speakersList.new.map((x) => `(${x.id}) ${x.firstName} ${x.nickName} ${x.lastName}`),
      returning: speakersList.returning.map(
        (x) => `(${x.id}) ${x.firstName} ${x.nickName} ${x.lastName}`
      ),
    }
  })
  .get(
    "/stream",
    () =>
      new Stream((stream) => {
        let currentSpeakersList = {
          new: [],
          returning: [],
        } as SpeakersListStreamInterface

        const interval = setInterval(async () => {
          if (
            currentSpeakersList.new.length !== speakersList.new.length ||
            currentSpeakersList.returning.length !== speakersList.returning.length
          ) {
            currentSpeakersList = {
              new: [...speakersList.new],
              returning: [...speakersList.returning],
            }
            stream.send({
              new: speakersList.new,
              returning: speakersList.returning,
            } as SpeakersListStreamInterface)
          }
        }, 100)
      })
  )
  .post("/add-me", async ({ set, cookie: { attendeeJWT }, attendeeToken }) => {
    const authedUser = await attendeeToken.verify(attendeeJWT)

    if (!authedUser) {
      set.status = "Unauthorized"
      return
    }

    db.query.attendees
      .findFirst({
        where: eq(attendees.id, authedUser.id),
      })
      .then((attendee) => {
        if (!attendee) {
          set.status = "Not Found"
          return
        }
        speakersList.add(attendee)
      })
  })
  .post("/remove-me", async ({ set, cookie: { attendeeJWT }, attendeeToken }) => {
    const authedUser = await attendeeToken.verify(attendeeJWT)

    if (!authedUser) {
      set.status = "Unauthorized"
      return
    }

    db.query.attendees
      .findFirst({
        where: eq(attendees.id, authedUser.id),
      })
      .then((attendee) => {
        if (!attendee) {
          set.status = "Not Found"
          return
        }
        speakersList.remove(attendee)
      })
  })
  .post("next-speaker", ({ set }) => {
    //verify admin status
    const admin = true
    if (!admin) {
      set.status = "Unauthorized"
      return
    }
    speakersList.next()
  })
  .post("reset-speakers-list", ({ set }) => {
    //verify admin status
    const admin = true
    if (!admin) {
      set.status = "Unauthorized"
      return
    }
    speakersList.reset()
  })
