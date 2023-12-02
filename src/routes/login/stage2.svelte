<script lang="ts">
  import { eden } from "$lib"
  import Checkbox from "$lib/components/checkbox.svelte"
  import Icon from "$lib/components/icon.svelte"
  import dayjs from "dayjs"
  import { names } from "./joinStore"

  const years = Array.from({ length: 10 }, (_, i) => dayjs().subtract(i, "year").year())
</script>

<form class="flex flex-col gap-4 items-center">
  <div class="grid grid-cols-[1fr_1fr] justify-items-start items-center gap-y-4 gap-x-4">
    <div class="right">I started IT in</div>
    <select class="h-8 rounded-full px-2 border border-black bg-slate-50 outline-none">
      {#each years as year}
        <option value={year}>{year}</option>
      {/each}
    </select>
    <div class="right">I'm a member of the student division</div>
    <div class="h-8">
      <Checkbox name="isMember" isChecked />
    </div>
    <div class="right">I have only attended IT during the master</div>
    <div class="h-8">
      <Checkbox name="masterOnly" />
    </div>
  </div>
  <button
    type="submit"
    on:click={() => {
      eden.attendee.register
        .post({
          firstName: $names.firstName,
          nickName: $names.nickName,
          lastName: $names.lastName,
        })
        .then(() => {
          location.pathname = "/agenda"
        })
    }}
  >
    <div class="flex gap-2 h-full">
      Join <Icon strokeWidth={3} path="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" shadow={true} />
    </div>
  </button>

  or

  <button
    class="bg-orange-600 hover:bg-orange-500 active:bg-orange-400"
    type="submit"
    on:click={() => {
      eden.attendee.register
        .post({
          firstName: $names.firstName,
          nickName: $names.nickName,
          lastName: $names.lastName,
        })
        .then(() => {
          location.pathname = "/agenda"
        })
    }}
  >
    <div class="flex gap-2 h-full">
      I'm not an IT student <Icon
        strokeWidth={3}
        path="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
        shadow={true}
      />
    </div>
  </button>
</form>

<style>
  .right {
    text-align: right;
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
</style>
