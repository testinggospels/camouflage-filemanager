<script>
	export let sub;
	export let file;
	import { clipboard } from '$lib/stores';
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

<div class="dropdown dropdown-end">
	<div tabindex="0" class="btn btn-circle btn-ghost btn-xs text-info">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="inline w-5 h-5 stroke-current"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
			/>
		</svg>
	</div>
	<ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
		<li>
			<a href="{sub}{file}" on:click|preventDefault={(e) => handleDelete(e.target)} target="_self">
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
				Delete
			</a>
		</li>
		<li>
			<a href="{sub}{file}" on:click|preventDefault={(e) => handleCopy(e.target)} target="_self">
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
				Copy
			</a>
		</li>
		<li>
			<a href="{sub}{file}" on:click|preventDefault={(e) => handleCut(e.target)} target="_self">
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
				Cut
			</a>
		</li>
		<li>
			<a href="{sub}{file}" on:click|preventDefault>
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
						d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
					/>
				</svg>
				Rename
			</a>
		</li>
	</ul>
</div>
