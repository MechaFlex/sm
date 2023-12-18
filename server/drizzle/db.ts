import { drizzle } from "drizzle-orm/libsql"
import { createClient } from "@libsql/client"
import * as attendee from "./schema/attendee"
import * as meeting from "./schema/meeting"

const client = createClient({ url: "file:./server/drizzle/db.sqlite" })
export const schema = { ...attendee, ...meeting }
export const db = drizzle(client, { schema, logger: true })
