<script lang="ts">
  import Icon from "$lib/components/icon.svelte"
  import dayjs from "dayjs"
  import { fade } from "svelte/transition"
  import { joinStage, names } from "./joinStore"

  const meetingIsActive = true
  const nextMeetingName = "Student Division Meeting LP1"

  const nextMeetingDate = dayjs("2023-10-06T17:30:00")

  let name = ""

  let formError = ""
</script>

<div class="flex flex-col items-center gap-6">
  {#if meetingIsActive}
    <p>{nextMeetingName} is currently in session</p>

    <form
      on:submit={() => {
        const inputNames = name
          .trim()
          .split(" ")
          .filter((n) => n.length > 0)
        console.log(inputNames)

        if (inputNames.length === 0) {
          formError = "You need to enter a name"
        } else if (inputNames.length === 1) {
          $names.nickName = inputNames[0]
          $joinStage = 1
        } else if (inputNames.length === 2) {
          $names.firstName = inputNames[0]
          $names.lastName = inputNames[1]
          $joinStage = 1
        } else if (inputNames.length === 3) {
          $names.firstName = inputNames[0]
          $names.nickName = inputNames[1]
          $names.lastName = inputNames[2]
          $joinStage = 2
        } else {
          $names.firstName = inputNames[0]
          $names.nickName = inputNames[1]
          $names.lastName = inputNames.slice(2).join(" ")
          $joinStage = 1
        }
      }}
      class="flex gap-2"
    >
      <div class="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Your name"
          class="text-center"
          bind:value={name}
          on:input={() => (formError = "")}
        />
        {#if formError}
          <p class="text-red-700 text-subbody" transition:fade={{ duration: 200 }}>{formError}</p>
        {/if}
      </div>
      <button type="submit" title="Continue" class="h-10">
        <Icon strokeWidth={3} path="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </button>
    </form>
  {:else}
    <p>No division meeting is currently in session.</p>
    {#if nextMeetingDate}
      <p>
        The next meeting is on {nextMeetingDate.format("MMMM Do")} at {nextMeetingDate.format(
          "H:mm"
        )}
      </p>
    {/if}
  {/if}
</div>
