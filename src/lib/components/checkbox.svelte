<script>
  import Icon from "$lib/components/icon.svelte"

  /** @type {string} */
  export let name

  export let isChecked = false
</script>

<div class="h-full">
  <input type="checkbox" id={name} class="peer" hidden bind:checked={isChecked} />
  <label
    for={name}
    class="h-full aspect-square border
    border-black rounded-full peer-checked:bg-sky-800 peer-checked:border-none text-slate-50 block p-1.5
    hover:cursor-pointer drop-shadow-md [&>*]:opacity-0 peer-checked:[&>*]:opacity-100"
  >
    <Icon strokeWidth={4} path="M4.5 12.75l6 6 9-13.5" shadow />
  </label>
</div>
