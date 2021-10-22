<script>
	import { browser } from '$app/env';
	import { page } from '$app/stores';
	import CreateModal from '$lib/components/CreateModal.svelte';
	let FS_ROOT;
	let WRITE_PROTECTED;
	if (browser) {
		FS_ROOT = JSON.parse(localStorage.getItem('env'))['FS_ROOT'];
		WRITE_PROTECTED = JSON.parse(localStorage.getItem('env'))['WRITE_PROTECTED'];
	}
</script>

<div class="navbar mb-2 shadow-lg bg-green-500 text-neutral-content">
	<div class="flex-1 px-2 mx-2">
		<span class="text-lg font-bold">
			<a href="/">Camouflage UI</a>
		</span>
	</div>
	<div class="flex-none hidden px-2 mx-2 lg:flex">
		<div class="flex items-stretch">
			<span style="font-size: x-small">
				FS_ROOT: {FS_ROOT} <br />
				WRITE_PROTECTED: {WRITE_PROTECTED}
			</span>
			{#if WRITE_PROTECTED === 'false' && !$page.path.includes('cf-editor')}
				<CreateModal />
			{/if}
		</div>
	</div>
</div>
