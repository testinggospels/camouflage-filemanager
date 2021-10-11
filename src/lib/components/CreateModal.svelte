<script>
	import { page } from '$app/stores';
	import { newFiles } from '$lib/stores.js';
	let modal;
	let type;
	let name;
	function toggleModal() {
		modal.classList.toggle('modal-open');
	}
	async function create() {
		const res = await fetch(`/api/fs/${name}?type=${type.toLowerCase()}`, {
			method: 'POST'
		});
		const json = await res.json();
		newFiles.update(() => {
			return json.response;
		});
		toggleModal();
		name = '';
		type = 'Select';
	}
</script>

<a href="/" on:click|preventDefault={toggleModal} class="btn btn-ghost btn-sm rounded-btn">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="inline-block w-5 mr-2 stroke-current"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
		/>
	</svg>
	Create File/Folder
</a>
<div bind:this={modal} class="modal">
	<div style="color: black;" class="modal-box">
		<div class="alert alert-info mb-2">
			<div class="flex-1 text-sm">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="w-6 h-6 mx-2 stroke-current"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label>Parent Directory (Relative to FS_ROOT): {$page.path}</label>
			</div>
		</div>
		<select bind:value={type} class="select select-bordered w-full">
			<option disabled="disabled" selected="selected">Select</option>
			<option>File</option>
			<option>Folder</option>
		</select>
		<div class="form-control">
			<label for="resource-name" class="label">
				<span class="label-text">File / Folder Name</span>
			</label>
			<input
				id="resource-name"
				type="text"
				placeholder="File / Folder Name"
				bind:value={name}
				class="input input-bordered"
			/>
		</div>
		<div class="modal-action">
			<button on:click={create} class="btn btn-primary">Create</button>
			<button on:click={toggleModal} class="btn">Close</button>
		</div>
	</div>
</div>
