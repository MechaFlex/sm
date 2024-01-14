import { sql, relations } from "drizzle-orm"
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
//import { createInsertSchema, createSelectSchema } from "drizzle-typebox" //I want to use drizzle-typebox, but does not work with elysia currently
import { t } from "elysia"
import { meetings } from "./meeting"

export const attendees = sqliteTable("attendees", {
  id: text("id")
    .primaryKey()
    .default(sql`(hex(randomblob(3)))`),
  firstName: text("firstName").notNull(),
  nickName: text("nickName").notNull(),
  lastName: text("lastName").notNull(),
  yearAdmitted: integer("yearAdmitted"),
  isMember: integer("isMember", { mode: "boolean" }).default(false),
  attendedOnlyMaster: integer("attendedOnlyMaster", { mode: "boolean" }).default(false),
  joinedAt: integer("joinedAt", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  leftAt: integer("leftAt", { mode: "timestamp" }),
  meetingId: text("meetingId")
    .notNull()
    .references(() => meetings.id),
})

export const Attendee = attendees.$inferSelect

//export const attendeesInsertSchema = createInsertSchema(attendees) //insert schema does not seem to work with drizzle currently?
/*export const otherType = t.Object({
  firstName: t.String(),
  nickName: t.String(),
  lastName: t.String(),
  yearAdmitted: t.Number(),
  isMember: t.Boolean(),
  attendedOnlyMaster: t.Boolean(),
})*/
