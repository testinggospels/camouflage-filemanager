<script>
	import Breadcrumb from './Breadcrumb.svelte';
	import { browser } from '$app/env';
	import { clipboard } from '$lib/stores';
	import Clipboard from '$lib/components/Clipboard.svelte';
	let WRITE_PROTECTED;
	if (browser) {
		WRITE_PROTECTED = JSON.parse(localStorage.getItem('env'))['WRITE_PROTECTED'];
	}
	export let files;
	export let sub = '/';
	$: {
		files = files.sort((a, b) => a.isDirectory < b.isDirectory);
	}

	const handleDelete = async (target) => {
		while (target.tagName.toLowerCase() !== 'a') {
			target = target.parentElement;
		}
		const filePath = target.getAttribute('href');
		const confirmation = confirm(
			`This will delete the file/folder ${filePath}. This actions is not reversible. Are you sure?`
		);
		if (confirmation) {
			const res = await fetch(`/api/fs/${filePath}`, {
				method: 'DELETE'
			});
			const resJson = await res.json();
			if (resJson.response.error) {
				alert(resJson.response.message);
			} else {
				files = resJson.response;
			}
		}
	};
	const handleCopy = (target) => {
		while (target.tagName.toLowerCase() !== 'a') {
			target = target.parentElement;
		}
		const filePath = target.getAttribute('href');
		clipboard.update((value) => [...value, { action: 'copy', source: filePath }]);
	};
	const handleCut = (target) => {
		while (target.tagName.toLowerCase() !== 'a') {
			target = target.parentElement;
		}
		const filePath = target.getAttribute('href');
		clipboard.update((value) => [...value, { action: 'cut', source: filePath }]);
	};
</script>

<Breadcrumb {sub} />
{#if browser}
	<Clipboard />
{/if}
<div class="overflow-x-auto">
	<table class="table w-full table-zebra table-compact">
		<thead>
			<tr>
				<th class="text-center">Name</th>
				<th class="text-center">Created Time</th>
				<th class="text-center">Modified Time</th>
				{#if WRITE_PROTECTED === 'false'}
					<th>Delete</th>
					<th>Copy</th>
					<th>Cut</th>
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
							<a
								href="{sub}{file}"
								on:click|preventDefault={(e) => handleDelete(e.target)}
								target="_self"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									/>
								</svg>
							</a>
						</td>
						<td>
							<a
								href="{sub}{file}"
								on:click|preventDefault={(e) => handleCopy(e.target)}
								target="_self"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
									/>
								</svg>
							</a>
						</td>
						<td>
							<a
								href="{sub}{file}"
								on:click|preventDefault={(e) => handleCut(e.target)}
								target="_self"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"
									/>
								</svg>
							</a>
						</td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
