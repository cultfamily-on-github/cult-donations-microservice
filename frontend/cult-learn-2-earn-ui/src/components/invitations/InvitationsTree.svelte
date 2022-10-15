<script>
	import Tree from './Tree.svelte'
	// let name = 'world';
	let data = {
		data: '0x9E972a43B3B8D68cD70930697E16429E47E88151',
		expanded: true,
		invitees: [
			{data: '1 1', expanded: true, invitees: [{data: '1 1 1'}]},
			{data: '1 2', expanded: false, invitees: [{data: '1 2 1'}]},
			{data: '1 3'}
		]
	}
</script>

<div class="colors" >

    <Tree {data} />
</div>

<style>
	:global(body) {
	margin: 0 0;
	}

    .colors {
        color: black;
    }
    
</style>