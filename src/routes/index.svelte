<script context="module">
	import { browser } from '$app/env';
	import { newFiles } from '$lib/stores.js';
	export async function load({ fetch }) {
		const res = await fetch('/api/fs');
		let files = await res.json();
		if (browser) {
			const env_res = await fetch('/api/env');
			let env = await env_res.json();
			localStorage.setItem('env', JSON.stringify(env));
		}
		newFiles.update(() => {
			return files;
		});
		return { props: { files } };
	}
</script>

<script>
	import FileList from '$lib/components/FileList.svelte';
	export let files;
	newFiles.subscribe((value) => {
		files = value;
	});
</script>

<svelte:head>
	<title>Camouflage Filemanager</title>
</svelte:head>

<FileList {files} />
