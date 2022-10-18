<script>
	import Tree from "./Tree.svelte";
	import { onMount } from "svelte";
	import { backendBaseURL } from "../../stores";

	let host;

	onMount(async () => getInvitesFormatted());

	const getInvitesFormatted = async () => {
		const urlToGetInvitesFormatted = `${backendBaseURL}/api/v1/getInvites`;
		console.log(
			`fetching invites formatted from ${urlToGetInvitesFormatted}`
		);
		const response = await fetch(urlToGetInvitesFormatted);

		host = await response.json();
	};

	// let name = 'world';
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
