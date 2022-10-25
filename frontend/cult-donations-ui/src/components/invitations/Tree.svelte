<script>
	import Node from "./Node.svelte";
	export let host;
	export let connectedWallet;
</script>

<p><br /></p>
<h2>Invitations Tree</h2>
<p><br /></p>
<ul>
	<Node bind:node={host} connectedWallet={connectedWallet} />	
</ul>

<style>
	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}
</style>