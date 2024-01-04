import type { Handle } from "@sveltejs/kit"

export const handle: Handle = async ({ event, resolve }) => {
  const req: Request = event.request
  const url = new URL(req.url)

  console.log("request url", url.pathname)

  if (url.pathname.startsWith("/api")) {
    console.log("was api request, bypass redirect")
    return resolve(event)
  }

  const authResponse = await event.fetch("/api/attendee/me")
  const authJson = await authResponse.json()
  console.log("isAuthed", authJson)

  if (authJson) {
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
