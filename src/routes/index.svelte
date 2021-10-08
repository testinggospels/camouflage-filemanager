<script context="module">
	export async function load({ fetch }) {
		const res = await fetch('/api/fs');
		let files = await res.json();
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
