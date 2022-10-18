<script>
    import Card from "../Card.svelte";
    import InvitationsTree from "./InvitationsTree.svelte";
    import Explanation from "./Explanation.svelte";
    import InviteForm from "./InviteForm.svelte";

    export let showExplanation = false
    export let showInviteForm = false
    export let showInvitationsTree = false
    export let connectedWallet = ""

</script>

<Card>
    {#if showExplanation}
    <Explanation connectedWallet={connectedWallet} />
    {/if}
    {#if showInviteForm}
    <InviteForm></InviteForm>
    {/if}
    {#if showInvitationsTree}
    <InvitationsTree />
    {/if}
</Card>

<p><br /></p>

<style>
</style>
