import { writable } from "svelte/store"
import en, { type LocaleStrings } from "$lib/i18n/en"

export const i18n = writable<LocaleStrings>(en)

//should probably use svelte-i18n, since it is better implemented i would guess
