<script lang="ts">
  import Icon from "$lib/components/icon.svelte"
  import { fade } from "svelte/transition"
  import { joinStage, names } from "./joinStore"

  let formErrorMessage = "no error"
  let showError = false
</script>

<form
  on:submit={() => {
    if ($names.firstName || $names.nickName || $names.lastName) {
      $joinStage = 2
    } else {
      formErrorMessage = "You need to enter at least one name"
      showError = true
    }
  }}
  on:input={() => (showError = false)}
  class="flex flex-col items-center gap-4"
>
  Names in order?

  <em class="text-subbody">You are required to fill in at least one of these fields</em>

  <input type="text" placeholder="First name" class="text-center" bind:value={$names.firstName} />
  <input type="text" placeholder="Nick" class="text-center" bind:value={$names.nickName} />
  <input type="text" placeholder="Last name" class="text-center" bind:value={$names.lastName} />
  <p
    class={`text-red-700 text-subbody transition-opacity ${
      showError ? "opacity-100" : "opacity-0"
    }`}
  >
    {formErrorMessage}
    <!--This part is quite ugly-->
  </p>
  <button type="submit" title="Continue" class="h-10">
    <Icon strokeWidth={3} path="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </button>
</form>
