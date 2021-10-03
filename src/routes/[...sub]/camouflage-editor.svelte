<script context="module">
	export async function load({ fetch, page }) {
		const sub = page.params.sub;
		const res = await fetch(`/api/fs/${sub}/file`);
		const { fileContent } = await res.json();
		return { props: { fileContent, sub } };
	}
</script>

<script>
	import Breadcrumb from '../components/Breadcrumb.svelte';
	export let fileContent;
	export let sub;
</script>

<Breadcrumb sub="/{sub}" />
<div class="p-6 h-96">
	<textarea
		class="textarea h-full w-full textarea-bordered textarea-primary"
		placeholder="Mock File Content"
		bind:value={fileContent}
	/>
	<div class="btn-group fluid justify-center">
		<button class="btn btn-neutral w-1/3 m-6">Cancel</button>
		<button class="btn btn-primary w-1/3 m-6">Save</button>
	</div>
</div>
