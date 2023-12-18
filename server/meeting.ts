import { Elysia, t } from "elysia"
import { db, schema } from "./drizzle/db"
import { desc, eq, lt, gt } from "drizzle-orm"

export const meeting = new Elysia({
  prefix: "/meeting",
})
  .get("/current", async ({ set }) => {
    const currentMeeting = await db.query.meetings.findFirst({
      where: lt(schema.meetings.startDate, new Date()),
      orderBy: [desc(schema.meetings.startDate)],
    })

    return currentMeeting
  })
  .get("/upcoming", async ({ set }) => {
    const upcomingMeetings = await db.query.meetings.findMany({
      where: gt(schema.meetings.startDate, new Date()),
      orderBy: [desc(schema.meetings.startDate)],
    })

    return upcomingMeetings
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
  .get("/:meetingId", async ({ params: { meetingId }, set }) => {
    const meeting = db.query.meetings.findFirst({
      where: eq(schema.meetings.id, meetingId),
      with: {
        meetingsAgendaItems: {
          columns: {
            orderInMeeting: true,
          },
          with: {
            agendaItem: true,
          },
        },
        meetingsAgendaGroups: {
          columns: {
            orderInMeeting: true,
          },
          with: {
            agendaGroup: {
              with: {
                agendaGroupsAgendaItems: {
                  columns: {
                    orderInGroup: true,
                  },
                  with: {
                    agendaItem: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    return meeting
  })
