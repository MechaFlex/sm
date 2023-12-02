<script>
  import Header from "./header.svelte"
  import HeaderOptions from "./header-options.svelte"
  import { navIsOpen } from "$lib/stores/navStore"
</script>

<div
  class="absolute flex h-screen w-screen flex-col transition-[margin] {$navIsOpen ? '-ml-40' : ''}"
>
  <Header />
  <main class="flex flex-1 flex-col items-center bg-slate-50 px-[5%] pt-6">
    <slot />
  </main>
</div>

<nav class="absolute right-0 -z-10 h-screen w-40">
  <HeaderOptions />
</nav>
