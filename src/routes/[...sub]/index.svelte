<script context="module">
	import { newFiles } from '$lib/stores.js';
	export async function load({ fetch, page }) {
		const sub = page.params.sub;
		const res = await fetch(`/api/fs/${sub}`);
		const files = await res.json();
		newFiles.update(() => {
			return files;
		});
		return { props: { files, sub } };
	}
</script>

<script>
	import FileList from '$lib/components/FileList.svelte';
	export let files;
	export let sub;
	newFiles.subscribe((value) => {
		files = value;
	});
</script>

<svelte:head>
	<title>Camouflage Filemanager</title>
</svelte:head>

<FileList {files} sub="/{sub}/" />
