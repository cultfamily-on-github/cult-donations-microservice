<script>
    import { onMount } from "svelte";

    export let connectedWallet;
    let metamaskMobileBrowserRecommendationNeeded = false

    onMount(() => isVisitorOnMobileDevice());


    const isVisitorOnMobileDevice = () => {
        // alert("hier")
        // alert(!!navigator.userAgent.match(/iphone|android|blackberry/ig) || false)
        const hasEthereum = window.ethereum == undefined ? false : true;
		const isMobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;
        metamaskMobileBrowserRecommendationNeeded = !hasEthereum && isMobile;
    };

</script>

<br />

<h2>Invited Wallets Only</h2>
<br />
{#if metamaskMobileBrowserRecommendationNeeded}
You seem to use a mobile device. In this case we recommend to use the 
<a href="https://metamask.zendesk.com/hc/en-us/articles/6356387482523-How-to-use-the-MetaMask-Mobile-Browser" target="_blank">
    Metamask Mobile Browser
</a>
<br><br>
{/if}
Only invited wallets can add content and invite further wallets.
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

