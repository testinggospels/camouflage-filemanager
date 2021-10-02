<script>
	export let sub;
	let breadCrumbs = [];
	$: {
		breadCrumbs = [];
		let folders = sub.substr(1, sub.length - 1).split('/');
		folders
			.filter((element) => element !== '')
			.forEach((folder, index) => {
				breadCrumbs.push({
					folder,
					path: `${folders.slice(0, index).join('/')}/${folder}`
				});
			});
	}
</script>

<div class="text-sm breadcrumbs m-6">
	<ul>
		<li>
			<a href="/">Home</a>
		</li>
		{#each breadCrumbs as { folder, path }, i}
			{#if i == 0}
				<li>
					<a href={path}>{folder}</a>
				</li>
			{:else if i === breadCrumbs.length - 1}
				<li>
					<span>{folder}</span>
				</li>
			{:else}
				<li>
					<a href="/{path}">{folder}</a>
				</li>
			{/if}
		{/each}
	</ul>
</div>
