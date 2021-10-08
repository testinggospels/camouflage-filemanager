<script context="module">
	import { browser } from '$app/env';
	export async function load({ fetch }) {
		const res = await fetch('/api/fs');
		let files = await res.json();
		if (browser) {
			const env_res = await fetch('/api/env');
			let env = await env_res.json();
			localStorage.setItem('env', JSON.stringify(env));
		}
		return { props: { files } };
	}
</script>

<script>
	import FileList from '$lib/components/FileList.svelte';
	export let files;
</script>

<svelte:head>
	<title>Camouflage Filemanager</title>
</svelte:head>

<FileList {files} />
