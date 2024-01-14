import { Elysia, t } from "elysia"
import { cookie } from "@elysiajs/cookie"
import { jwt } from "@elysiajs/jwt"
import { attendeeJWTplugin } from "./attendeeJWT"

import { db, schema } from "./drizzle/db"
import { attendees } from "./drizzle/schema/attendee"
import { eq, and, isNotNull, lt, desc } from "drizzle-orm"

export async function getMemberCount() {
  const members = await db.query.attendees.findMany({
    where: and(eq(attendees.isMember, true), isNotNull(attendees.leftAt)),
  })
  return members
}

export const attendee = new Elysia({
  prefix: "/attendee",
})
  //.use(attendeeJWTplugin)
  /*.use(
    jwt({
      name: "attendeeToken",
      secret: "salt",
      exp: "1d",
      /*schema: t.Object({
      id: t.String(),
      firstName: t.String(),
      nickName: t.String(),
      lastName: t.String(),
    }),
    })
  )*/
  //.use(cookie())
  .post(
    "/register",
    async ({ body, set, attendeeToken, setCookie }) => {
      //There is some code duplication here, but I'm not sure how to reuse internal routes
      const currentMeeting = await db.query.meetings.findFirst({
        where: lt(schema.meetings.startDate, new Date()),
        orderBy: [desc(schema.meetings.startDate)],
      })

      if (!currentMeeting) {
        set.status = "Not Found"
        return "No current meeting"
      }

      const attendee = await db
        .insert(attendees)
        .values({
          firstName: body.firstName,
          nickName: body.nickName,
          lastName: body.lastName,
          meetingId: currentMeeting.id,
        })
        .returning()
        .get()

      const signedJWT = await attendeeToken.sign({ ...body, id: attendee.id })

      setCookie("attendeeJWT", signedJWT, {
        maxAge: 60 * 60 * 24,
        sameSite: "none",
        secure: true,
      })
    },
    {
      body: t.Object({
        firstName: t.String(),
        nickName: t.String(),
        lastName: t.String(),
      }),
    }
  )
  .get("/unregister", async ({ setCookie, cookie: { attendeeJWT }, attendeeToken, set }) => {
    const attendee = await attendeeToken.verify(attendeeJWT)

    setCookie("attendeeJWT", "", {
      maxAge: 0,
    })

    if (attendee) {
      //await db.delete(attendees).where(eq(attendees.id, attendee.id))
      await db.update(attendees).set({ leftAt: new Date() }).where(eq(attendees.id, attendee.id))
      set.status = "OK"
      return "JWT valid, cookie deleted, attendee leave time set"
    } else {
      set.status = "Unauthorized"
      return "JWT invalid, but cookie still deleted"
    }
  })
  .get("/me", async (set /*{ attendeeToken, cookie: { attendeeJWT } }*/) => {
    console.log(set)
    console.log(set.cookie.attendeeJWT)
    return await set.attendeeToken.verify(set.cookie.attendeeJWT)
  })
  .get("/all", async () => {
    return await db.query.attendees.findMany()
  })
