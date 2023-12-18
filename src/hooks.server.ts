import type { Handle } from "@sveltejs/kit"
import type { eden } from "./lib"

export const handle: Handle = async ({ event, resolve }) => {
  const req: Request = event.request
  const url = new URL(req.url)

  console.log("request url", url.pathname)

  if (url.pathname.startsWith("/api")) {
    console.log("was api request, bypass redirect")
    return resolve(event)
  }

  type MaybeUserPromise = ReturnType<typeof eden.attendee.me.get>
  const isAuthedResponse = await event.fetch("/api/attendee/me")
  const isAuthedDataPromise: MaybeUserPromise = isAuthedResponse.json()
  const isAuthed = await isAuthedDataPromise

  if (isAuthed.data) {
    console.log("attendee is authenticated")
    return resolve(event)
  }
  console.log("attendee is not authenticated")

  if (!url.pathname.startsWith("/login")) {
    console.log("redirecting to login")
    return Response.redirect(url.origin + "/login")
  }

  console.log("was regular request, but no handling needed")
  return resolve(event)
}
