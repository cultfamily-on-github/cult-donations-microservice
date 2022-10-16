<script>
	import Tree from "./Tree.svelte";
	import { onMount } from "svelte";
	import { backendBaseURL } from "../../stores";

	let data;

	onMount(async () => getInvitesFormatted());

	const getInvitesFormatted = async () => {
		const urlToGetInvitesFormatted = `${backendBaseURL}/api/v1/getInvitesFormatted`;
		console.log(
			`fetching invites formatted from ${urlToGetInvitesFormatted}`
		);
		const response = await fetch(urlToGetInvitesFormatted);

		data = await response.json();
	};
	// let name = 'world';
</script>

<div class="colors">
	{#if data}
		<Tree {data} />
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
