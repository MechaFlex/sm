import { relations, sql } from "drizzle-orm"
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

export const meetings = sqliteTable("meetings", {
  id: text("id")
    .primaryKey()
    .default(sql`(hex(randomblob(3)))`),
  name: text("name").notNull(),
  location: text("location").notNull(),
  startDate: integer("startDate", { mode: "timestamp" }).notNull(),
  endDate: integer("endDate", { mode: "timestamp" }),
})

export const meetingsRelations = relations(meetings, ({ many }) => ({
  meetingsAgendaGroups: many(meetingAgendaGroups),
}))

export const agendaGroups = sqliteTable("agendaGroups", {
  id: text("id")
    .primaryKey()
    .default(sql`(hex(randomblob(3)))`),
  name: text("name").notNull(),
  startDate: integer("startDate", { mode: "timestamp" }),
  endDate: integer("endDate", { mode: "timestamp" }),
})

export const agendaGroupsRelations = relations(agendaGroups, ({ many }) => ({
  agendaGroupsAgendaItems: many(agendaGroupsAgendaItems),
}))

export const meetingAgendaGroups = sqliteTable("meetingAgendaGroups", {
  meetingId: text("meetingId")
    .notNull()
    .references(() => meetings.id),
  agendaGroupId: text("agendaGroupId")
    .notNull()
    .references(() => agendaGroups.id),
  orderInMeeting: integer("orderInMeeting").notNull(),
})

export const meetingAgendaGroupsRelations = relations(meetingAgendaGroups, ({ one }) => ({
  meeting: one(meetings, {
    fields: [meetingAgendaGroups.meetingId],
    references: [meetings.id],
  }),
  agendaGroup: one(agendaGroups, {
    fields: [meetingAgendaGroups.agendaGroupId],
    references: [agendaGroups.id],
  }),
}))

export const agendaItems = sqliteTable("agendaItems", {
  id: text("id")
    .primaryKey()
    .default(sql`(hex(randomblob(3)))`),
  name: text("name").notNull(),
  startDate: integer("startDate", { mode: "timestamp" }),
  endDate: integer("endDate", { mode: "timestamp" }),
})

export const meetingAgendaItems = sqliteTable("meetingAgendaItems", {
  meetingId: text("meetingId")
    .notNull()
    .references(() => meetings.id),
  agendaItemId: text("agendaItemId")
    .notNull()
    .references(() => agendaItems.id),
  orderInMeeting: integer("orderInMeeting").notNull(),
})

export const agendaGroupsAgendaItems = sqliteTable("agendaGroupsAgendaItems", {
  agendaGroupId: text("agendaGroupId")
    .notNull()
    .references(() => agendaGroups.id),
  agendaItemId: text("agendaItemId")
    .notNull()
    .references(() => agendaItems.id),
  orderInGroup: integer("orderInGroup").notNull(),
})

export const meetingPoints = sqliteTable("meetingPoints", {
  id: text("id")
    .primaryKey()
    .default(sql`(hex(randomblob(3)))`),
  name: text("name").notNull(),
  minutes: text("minutes"),
  startDate: integer("startDate", { mode: "timestamp" }),
  endDate: integer("endDate", { mode: "timestamp" }),
})

export const agendaItemsMeetingPoints = sqliteTable("agendaItemsMeetingPoints", {
  agendaItemId: text("agendaItemId")
    .notNull()
    .references(() => agendaItems.id),
  meetingPointId: text("meetingPointId")
    .notNull()
    .references(() => meetingPoints.id),
  orderInItem: integer("orderInItem").notNull(),
})
