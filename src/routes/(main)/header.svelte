<script>
  import Icon from "$lib/components/icon.svelte"
  import { navIsOpen, navSelection } from "$lib/stores/navStore"

  function toggleNav() {
    $navIsOpen = !$navIsOpen
    //Possbile animation
  }
</script>

<header class="flex items-center justify-between bg-sky-800 text-slate-50">
  <logo class="px-3 py-1 font-logo text-[38px]">SM</logo>
  <button
    type="button"
    class="flex h-full items-center gap-2 rounded-none text-[18px] font-light drop-shadow-none"
    on:click={toggleNav}
    on:keypress={toggleNav}
  >
    {$navSelection}
    <div class="h-10">
      <Icon path="M3.75 9h16.5m-16.5 6.75h16.5" />
    </div>
  </button>
</header>
