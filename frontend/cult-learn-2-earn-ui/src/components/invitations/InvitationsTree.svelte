<script>
	import Tree from "./Tree.svelte";

	export let host;
</script>

<div class="colors">
	{#if host}
		<Tree {host} />
	{/if}
</div>

<style>
	:global(body) {
		margin: 0 0;
	}

	.colors {
		color: black;
	}
</style>
