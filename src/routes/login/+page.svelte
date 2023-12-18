<script>
  import dayjs from "dayjs"
  import "dayjs/locale/sv"
  import advancedFormat from "dayjs/plugin/advancedFormat"
  import Stage0 from "./stage0.svelte"
  import Stage1 from "./stage1.svelte"
  import Stage2 from "./stage2.svelte"
  import { joinStage } from "./joinStore"
  import { fly } from "svelte/transition"

  const meetingIsActive = true
  const nextMeetingName = "Student Division Meeting LP1"

  //dayjs.locale("sv")
  dayjs.extend(advancedFormat)
  const nextMeetingDate = dayjs("2023-10-06T17:30:00")
</script>

<main class="flex h-screen flex-col items-center gap-12 p-6 text-center">
  <div>
    <div class="h-[0.9em] font-logo text-[120px] leading-[1em] mt-[15vh]">SM</div>
    <div>sm.chalmers.it</div>
  </div>

  {#if $joinStage === 0}
    <div out:fly={{ delay: 0, duration: 300, x: -100, opacity: 0 }}>
      <Stage0 />
    </div>
  {:else if $joinStage === 1}
    <div
      in:fly={{ delay: 300, duration: 300, x: 100, opacity: 0 }}
      out:fly={{ delay: 0, duration: 300, x: -100, opacity: 0 }}
    >
      <Stage1 />
    </div>
  {:else if $joinStage === 2}
    <div in:fly={{ delay: 300, duration: 300, x: 100, opacity: 0 }}>
      <Stage2 />
    </div>
  {:else}
    <div>Something went wrong in the joining process</div>
  {/if}
</main>
