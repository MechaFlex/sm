import type { Config } from "drizzle-kit"

export default {
  schema: "./server/drizzle/schema",
  out: "./drizzle",
  driver: "turso",
  dbCredentials: {
    url: "file:./server/drizzle/db.sqlite",
  },
} satisfies Config
