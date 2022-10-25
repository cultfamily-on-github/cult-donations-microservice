<script>
	import Tree from "./Tree.svelte";

	export let host;
	export let connectedWallet;

</script>

<div class="colors">
	<!-- {host} -->
	{#if host}
		<Tree {host} connectedWallet={connectedWallet} />
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
