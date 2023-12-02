import { writable } from "svelte/store"

export const joinStage = writable(0)
export const names = writable({
  firstName: "",
  nickName: "",
  lastName: "",
})
