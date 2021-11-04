<script>
	import { clipboard } from '$lib/stores';
	import { page } from '$app/stores';
	let CLIPBOARD_EMPTY = true;
	let clipboard_items = [];
	clipboard.subscribe((value) => {
		if (value.length > 0) {
			CLIPBOARD_EMPTY = false;
			clipboard_items = value;
		}
	});
	const clearClipboard = () => {
		clipboard_items = [];
		clipboard.update(() => []);
		CLIPBOARD_EMPTY = true;
	};
	const handlePaste = async (target) => {
		while (target.tagName.toLowerCase() !== 'a') {
			target = target.parentElement;
		}
		const [source, action] = target.getAttribute('href').split('#');
		const res = await fetch('/api/fs/cf-paste', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				source,
				action,
				destination: $page.path
			})
		});
		if (!res.ok) {
			const { err } = await res.json();
			alert(err);
		} else {
			window.location.reload();
		}
	};
</script>

{#if !CLIPBOARD_EMPTY}
	<label
		for="clipboard-modal-checkbox"
		class="btn btn-primary modal-button p-0 w-14 h-14 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none fixed bottom-5 right-5 h-16 w-16 z-50"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6 inline-block text-white"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
			/>
		</svg>
	</label>
	<input type="checkbox" id="clipboard-modal-checkbox" class="modal-toggle" />
	<div class="modal">
		<div class="modal-box max-w-screen-lg h-96 overflow-scroll">
			<table class="table w-full table-zebra table-compact">
				<thead>
					<tr>
						<th>Source</th>
						<th>Action</th>
						<th>Paste Here</th>
					</tr>
				</thead>
				<tbody>
					{#each clipboard_items as { action, source }}
						<tr class="hover">
							<td>{source}</td>
							<td>{action}</td>
							<td>
								<a
									href="{source}#{action}"
									on:click|preventDefault={(e) => handlePaste(e.target)}
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
											d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
										/>
									</svg>
								</a>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
			<div class="modal-action">
				<button on:click={clearClipboard} class="btn btn-error">Clear Clipboard</button>
				<label for="clipboard-modal-checkbox" class="btn">Close</label>
			</div>
		</div>
	</div>
{/if}
