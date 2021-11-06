<script>
	import Breadcrumb from './Breadcrumb.svelte';
	import { browser } from '$app/env';
	import Clipboard from '$lib/components/Clipboard.svelte';
	import Actions from '$lib/components/Actions.svelte';
	let WRITE_PROTECTED;
	if (browser) {
		WRITE_PROTECTED = JSON.parse(localStorage.getItem('env'))['WRITE_PROTECTED'];
	}
	export let files;
	export let sub = '/';
	$: {
		files = files.sort((a, b) => a.isDirectory < b.isDirectory);
	}
</script>

<Breadcrumb {sub} />
{#if browser}
	<Clipboard />
{/if}
<div class="overflow-x-auto h-screen">
	<table class="table w-full table-zebra table-compact">
		<thead>
			<tr>
				<th class="text-center">Name</th>
				<th class="text-center">Created Time</th>
				<th class="text-center">Modified Time</th>
				{#if WRITE_PROTECTED === 'false'}
					<th>Actions</th>
				{/if}
			</tr>
		</thead>
		<tbody>
			{#each files as { file, createdTime, modifiedTime, isDirectory }}
				<tr class="hover">
					{#if isDirectory}
						<td>
							<a href="{sub}{file}">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									class="inline-block w-5 h-5 mr-2 stroke-current"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
									/>
								</svg>
								{file}
							</a>
						</td>
					{:else}
						<td>
							<a href="{sub}{file}/cf-editor">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="inline-block w-5 h-5 mr-2 stroke-current"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									/>
								</svg>
								{file}
							</a>
						</td>
					{/if}
					<td class="text-center">{createdTime}</td>
					<td class="text-center">{modifiedTime}</td>
					{#if WRITE_PROTECTED === 'false'}
						<td>
							<Actions {sub} {file} />
						</td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
