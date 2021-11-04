import { writable } from 'svelte/store';
import { browser } from '$app/env'
let clipboard;
if (browser) {
    clipboard = window.localStorage.getItem("clipboard") ? writable(JSON.parse(window.localStorage.getItem("clipboard"))) : writable([]);
    clipboard.subscribe((val) => window.localStorage.setItem("clipboard", JSON.stringify(val)))
}
export { clipboard }
