<script lang="ts">
  import { onMount } from "svelte"
  import type { SpeakersList, SpeakerWebsocketMessage } from "../../../server/OLD/speakersWS"

  let speakersList = {
    new: [] as string[],
    returning: [] as string[],
  }

  let socket: WebSocket | null = null
  let eventSource: EventSource | null = null

  onMount(() => {
    socket = new WebSocket("ws://localhost:9001/speakers/ws")
    socket.onopen = (event) => {
      console.log("Socket opened connection: ", event)
    }
    socket.onmessage = (event) => {
      const data: SpeakersList = JSON.parse(event.data)
      speakersList = data
    }
    socket.onclose = (event) => {
      console.log("Socket closed connection: ", event)
    }

    eventSource = new EventSource("http://localhost:9001/readycounter/source")
    eventSource.onmessage = (event) => {
      readyCount = parseInt(event.data)
    }
  })

  let name = ""

  function sendMessage(message: SpeakerWebsocketMessage) {
    console.log("Sending message: ", message)
    socket?.send(JSON.stringify(message))
  }

  let readyId = ""

  function readyMe() {
    fetch("http://localhost:9001/readycounter/readyup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: readyId,
        token: "1234",
      }),
    })
  }

  // get readycount from an SSE eventsource
  let readyCount = 0
</script>

<!-- a text field and a submit button -->
<form>
  <input type="text" bind:value={name} />
  <button
    on:click={() =>
      sendMessage({
        action: "addSpeaker",
        name: name,
      })}>Add me to list</button
  >
  <button
    on:click={() => {
      sendMessage({
        action: "removeSpeaker",
        name: name,
      })
    }}>Remove me from list</button
  >
  <button
    on:click={() =>
      sendMessage({
        action: "nextSpeaker",
      })}>Next speaker</button
  >
  <button
    on:click={() => {
      sendMessage({
        action: "resetSpeakersList",
      })
    }}>Reset</button
  >
</form>

<div>
  <h2>First time speakers</h2>
  {#each speakersList.new as speaker}
    <p>{speaker}</p>
  {/each}
  <h2>Returning speakers</h2>
  {#each speakersList.returning as speaker}
    <p>{speaker}</p>
  {/each}
</div>

<div>
  <input type="text" bind:value={readyId} />
  <button on:click={readyMe}>Ready up</button>
  <div>{readyCount}</div>
</div>
