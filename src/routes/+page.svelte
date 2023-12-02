<script lang="ts">
  import { enhance } from "$app/forms"
  import { isDark } from "$lib"
  import { onMount } from "svelte"
  import type { PageData } from "./$types"
  import { invalidate, invalidateAll } from "$app/navigation"
  import { apiUrl } from "$lib"

  export let data: PageData

  //const getRandomHex = () => Math.floor(Math.random() * 16777215).toString(16)
  //const tenRandomColors = Array.from({ length: 10 }, getRandomHex)
</script>

<form action="?/create" method="POST" use:enhance>
  <input type="text" name="firstName" placeholder="first" />
  <input type="text" name="nick" placeholder="nick" />
  <input type="text" name="lastName" placeholder="last" />
  <button type="submit">Submit!</button>
</form>
<!-- 
{#await data.props.users}
  <p>loading...</p>
{:then users}
  <ul>
    {#each users as user}
      <li
        class="p-2 rounded {isDark(user.id) ? 'text-white' : 'text-black'}"
        style="background-color: #{user.id};"
      >
        {user.nameWithNick}
        <form action="?/delete" method="post" use:enhance>
          <input type="hidden" name="id" value={user.id} />
          <button type="submit">Delete</button>
        </form>
      </li>
    {/each}
  </ul>
{:catch error}
  <p>{error.message}</p>
{/await} -->
