import { Elysia, t } from "elysia"
import { db, schema } from "./drizzle/db"
import { desc, lt } from "drizzle-orm"

export const meeting = new Elysia({
  prefix: "/meeting",
})
  .get("/", async () => {
    return "check!"
  })
  .get("/current", async ({ set }) => {
    set.status = "OK"
    return "Current Meeting"
  })
  .post(
    "/new",
    async ({ body, set }) => {
      const newMeeting = await db
        .insert(schema.meetings)
        .values({
          name: body.name,
          location: body.location,
          startDate: body.startDate,
        })
        .returning()
        .get()

      set.status = "OK"
      return "Meeting " + newMeeting.id + " created"
    },
    {
      body: t.Object({
        name: t.String(),
        location: t.String(),
        startDate: t.Date(),
      }),
    }
  )
  .get("/all", async ({ set }) => {
    return await db.query.meetings.findMany({
      orderBy: [desc(schema.meetings.startDate)],
    })
  })
  .get("/agenda", async ({ set }) => {
    const meeting = db.query.meetings.findFirst({
      where: lt(schema.meetings.startDate, new Date()),
      orderBy: [desc(schema.meetings.startDate)],
      with: {
        meetingsAgendaGroups: {
          columns: {
            orderInMeeting: true,
          },
          with: {
            agendaGroup: true,
          },
        },
      },
    })
    return meeting
  })
