<script>
	import Node from "./Node.svelte";
	export let data;
</script>

<ul>
	<Node bind:node={data} />	
</ul>

<style>
	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}
</style>