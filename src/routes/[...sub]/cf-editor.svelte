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
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';
	import { onMount } from 'svelte';
	let CodeMirror;
	import 'codemirror/lib/codemirror.css';
	import 'codemirror/theme/monokai.css';
	export let fileContent;
	export let sub;
	let editor;
	let codeEditor;
	let WRITE_PROTECTED;
	if (browser) {
		WRITE_PROTECTED = JSON.parse(localStorage.getItem('env'))['WRITE_PROTECTED'];
	}
	onMount(async () => {
		if (browser) {
			CodeMirror = (await import('codemirror')).default;
			codeEditor = CodeMirror.fromTextArea(editor, {
				lineNumbers: true,
				theme: 'monokai'
			});
		}
	});
	const saveFile = async () => {
		const data = JSON.stringify({
			content: codeEditor.getValue()
		});
		const res = await fetch(`/api/fs/${sub}/cf-file`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: data
		});
		const { response } = await res.json();
		alert(response);
	};
	const cancel = () => {
		const breadCrumb = sub.split('/');
		if (breadCrumb.length == 1) {
			goto('/');
		} else {
			breadCrumb.splice(-1);
			goto('/' + breadCrumb.join('/'));
		}
	};
</script>

<Breadcrumb sub="/{sub}" />
<div class="p-6 h-96">
	<textarea
		class="textarea h-full w-full textarea-bordered textarea-primary"
		placeholder="Mock File Content"
		bind:value={fileContent}
		bind:this={editor}
	/>
	{#if WRITE_PROTECTED === 'false'}
		<div class="btn-group fluid justify-center">
			<button class="btn btn-neutral w-1/3 m-6" on:click={cancel}>Cancel</button>
			<button class="btn btn-primary w-1/3 m-6" on:click={saveFile}>Save</button>
		</div>
	{/if}
</div>
