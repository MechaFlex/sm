# SM
SM is an all-encompassing solution for student division meetings.
Made with Teknologsektionen Informationsteknik in mind.

## Tech stack
This project uses the following:
- Svelte
- Bun
- Elysia (cool bun framework with end-to-end typesafety!)
- Drizzle along with SQLite/libSQL
- Tailwind

## Known issues

- Elysia version is fixed at 0.7.21, because imports of plugins does not work otherwise?
- Drizzle-typebox types are not compatible with elysias schema types, which is unfortunate, because if they worked, there could have been a single source of truth.

## TODO

- Implement leave function, attendee should unregistered when leaving the website.

## I'm stuck
Updated elysia and everything broke. 
Also can't pass headers from the SvelteKit hooks for some reason.
Will try switching to Hono or someting.