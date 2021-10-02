<script context="module">
	export async function load({ fetch, page }) {
		const sub = page.params.sub;
		const res = await fetch(`/api/fs/${sub}`);
		const files = await res.json();
		return { props: { files, sub } };
	}
</script>

<script>
	import FileList from '../components/FileList.svelte';
	export let files;
	export let sub;
</script>

<svelte:head>
	<title>Camouflage UI</title>
</svelte:head>

<FileList {files} sub="/{sub}/" />
