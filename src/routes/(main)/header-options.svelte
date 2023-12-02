<script lang="ts">
  import { onMount } from "svelte"
  import { eden, getNameFromUser } from "$lib"
  import { navIsOpen, navSelection } from "$lib/stores/navStore"
  import { name, id } from "$lib/stores/userStore"
  import { i18n } from "$lib/stores/i18nStore"
  import sv from "$lib/i18n/sv"
  import en from "$lib/i18n/en"

  const links = [
    { title: "Agenda", href: "./agenda" },
    { title: "Speaker's list", href: "./speakers" },
    { title: "Voting", href: "./voting" },
  ] as const

  onMount(async () => {
    const url = new URL(document.URL)
    $navSelection =
      links.find((x) => x.href === "./" + url.pathname.split("/").pop())?.title ?? "couldnt find it"

    const res = await eden.attendee.me.get()
    if (res.data) {
      $id = res.data.id
      $name = getNameFromUser(res.data)
    }
  })

  function navigate(title: string) {
    $navIsOpen = false
    $navSelection = title
  }
</script>

<ul class="h-full bg-sky-900 text-slate-50">
  <div class="p-4">My name is {$name}</div>

  {#each links as link}
    <li class="cursor-pointer transition-colors hover:bg-sky-800">
      <a class="block p-4" href={link.href} on:click={() => navigate(link.title)}>{link.title}</a>
    </li>
  {/each}

  <button class="ml-2 mt-2" on:click={() => ($i18n = sv)}>Svenska</button>
  <button class="ml-2 mt-2" on:click={() => ($i18n = en)}>English</button>

  <button
    class="ml-2 mt-2 bg-rose-800 hover:bg-rose-700 active:bg-rose-600"
    on:click={() => {
      eden.attendee.unregister.get().then(() => {
        location.reload()
      })
    }}>Leave</button
  >
</ul>

<!-- Dark mode toggle -->
