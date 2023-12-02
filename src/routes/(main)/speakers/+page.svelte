<script lang="ts">
  import { onMount } from "svelte"
  import { id } from "$lib/stores/userStore"
  import { eden, getNameFromUser } from "$lib"
  import type { SpeakersListStreamInterface } from "../../../../server/speakers"
  import { i18n } from "$lib/stores/i18nStore"

  let speakersList: SpeakersListStreamInterface = {
    new: [],
    returning: [],
  }

  onMount(() => {
    const eventSource = new EventSource("api/speakers/stream")
    eventSource.onmessage = (event) => {
      speakersList = JSON.parse(event.data)
    }
    return () => {
      eventSource.close()
    }
  })

  $: imOnTheList = Boolean(
    speakersList.new.find((x) => x.id === $id) || speakersList.returning.find((x) => x.id === $id)
  )
</script>

<div class="grid w-fit grid-cols-[2fr_3fr]">
  <div class="col-span-2">
    {$i18n.speakerslist.currently_speaking}
    <p class="text-[40px] font-bold">
      {speakersList.new[0] ? getNameFromUser(speakersList.new[0]) : ""}
    </p>
  </div>

  <div>
    {#each speakersList.new.slice(1).map(getNameFromUser) as newSpeaker}
      <p>{newSpeaker}</p>
    {/each}
  </div>

  <div class="pl-4 pt-4 font-bold">
    Returning speakers
    {#each speakersList.returning.map(getNameFromUser) as returningSpeaker}
      <p class="font-normal text-slate-400">{returningSpeaker}</p>
    {/each}
  </div>

  <div class="flex justify-center col-span-2 mt-4">
    <button
      on:click={() => {
        if (imOnTheList) {
          eden.speakers["remove-me"].post()
        } else {
          eden.speakers["add-me"].post()
        }
      }}
    >
      {#if imOnTheList}
        Remove me!
      {:else}
        Add me!
      {/if}
    </button>
  </div>
</div>
