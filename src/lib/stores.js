import { writable } from 'svelte/store';

export let clipboard = window.localStorage.getItem("clipboard") ? writable(JSON.parse(window.localStorage.getItem("clipboard"))) : writable([]);

clipboard.subscribe((val) => window.localStorage.setItem("clipboard", JSON.stringify(val)))