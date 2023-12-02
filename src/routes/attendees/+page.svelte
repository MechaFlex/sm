<script lang="ts">
  import { eden, isDark } from "$lib"

  async function getAttendees() {
    return (await eden.attendee.all.get()).data || []
  }
</script>

<main class="flex flex-col items-center mt-6">
  <div class="flex flex-col gap-2">
    {#await getAttendees() then attendees}
      {#each attendees as attendee}
        <div
          style="background-color: #{attendee.id};"
          class="rounded px-4 py-2 {isDark(attendee.id) ? 'text-white' : 'text-black'}"
        >
          {attendee.firstName}
          {attendee.nickName}
          {attendee.lastName}
        </div>
      {:else}
        <p>No attendees registered</p>
      {/each}
    {/await}
  </div>
</main>
