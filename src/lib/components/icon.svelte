<!-- Icon component based on HeroIcons -->
<script>
  /** @type {string} */
  export let path

  /** @type {number} */
  export let strokeWidth = 1.5

  /** @type {boolean} */
  export let shadow = false
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width={strokeWidth}
  stroke="currentColor"
  class="h-full aspect-square {shadow ? 'drop-shadow-md' : ''}"
>
  <path stroke-linecap="round" stroke-linejoin="round" d={path} />
</svg>
