<script>
    export let connectedWallet;
</script>

<br />

<h2>Invited Wallets Only</h2>
<br />
If you use a mobile device, please use the 
<a href="https://metamask.zendesk.com/hc/en-us/articles/6356387482523-How-to-use-the-MetaMask-Mobile-Browser">
    Metamask Mobile Browser</a> to interact with this page. <br> <br>
Only invited wallets can add assets and invite further wallets.
<br /><br />
We do this to ensure high quality content right from the start and to establish a
network of trust and fairness. <br /><br />

{#if connectedWallet === undefined || connectedWallet === ""}
If you are already invited, you need to login to your Browserwallet.
{:else}
Your wallet {connectedWallet} seems not to be invited yet. Feel free to check the Invitations Tree below.
{/if}

<br /><br />
You qualify for being invited by retweeting
<a href="tbd" target="_blank"> this tweet</a>.

