<script context="module">
	export async function load({ fetch, page }) {
		const sub = page.params.sub;
		const res = await fetch(`/api/fs/${sub}/cf-file`);
		const { fileContent } = await res.json();
		return { props: { fileContent, sub } };
	}
</script>

<script>
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import { onMount } from 'svelte';
	export let fileContent;
	export let sub;
	let editor;
	onMount(() => {
		let codeEditor = CodeMirror.fromTextArea(editor, {
			lineNumbers: true,
			theme: 'monokai'
		});
	});
</script>

<svelte:head>
	<title>Camouflage - Editor</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.3/codemirror.min.js"></script>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.3/codemirror.min.css"
	/>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.3/theme/monokai.min.css"
	/>
</svelte:head>
<Breadcrumb sub="/{sub}" />
<div class="p-6 h-96">
	<textarea
		class="textarea h-full w-full textarea-bordered textarea-primary"
		placeholder="Mock File Content"
		bind:value={fileContent}
		bind:this={editor}
	/>
	<div class="btn-group fluid justify-center">
		<button class="btn btn-neutral w-1/3 m-6">Cancel</button>
		<button class="btn btn-primary w-1/3 m-6">Save</button>
	</div>
</div>
