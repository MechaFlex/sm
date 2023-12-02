<script lang="ts">
  import { eden } from "$lib"
  import { onMount } from "svelte"
  import type { ReadyCounter } from "../../../server/readycounter"

  let isReady = false

  let readyState: ReadyCounter = {
    readyCount: 0,
    memberCount: 0,
  }

  onMount(() => {
    const eventSource = new EventSource("api/readycounter/stream")
    eventSource.onmessage = (event) => {
      readyState = JSON.parse(event.data)
    }
    return () => {
      eventSource.close()
    }
  })

  function toggleReadyState() {
    if (isReady) {
      eden.readycounter.unready.post().then(() => {
        isReady = false
        readyState.readyCount -= 1
        if (readyState.readyCount < 0) readyState.readyCount = 0
      })
    } else {
      eden.readycounter.ready.post().then(() => {
        isReady = true
        readyState.readyCount += 1
        if (readyState.readyCount > readyState.memberCount)
          readyState.readyCount = readyState.memberCount
      })
    }

    isReady = !isReady
  }
</script>

<div class="flex flex-col gap-2">
  <div class="flex items-center gap-8 px-6">
    <div class="flex flex-col items-center">
      <div class="text-heading leading-[1em]">{readyState.readyCount}/{readyState.memberCount}</div>
      <div class="text-body">ready to vote</div>
    </div>

    <button
      class={`${
        isReady
          ? "bg-rose-700 hover:bg-rose-600 active:bg-rose-500"
          : "bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-400"
      }`}
      type="button"
      on:click={toggleReadyState}
    >
      {#if isReady}
        I'm not ready
      {:else}
        I'm ready
      {/if}
    </button>
  </div>
  <div class="bg-sky-900 rounded-full h-0.5 w-full" />
</div>
