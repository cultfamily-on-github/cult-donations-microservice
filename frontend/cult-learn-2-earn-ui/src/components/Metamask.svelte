<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import Web3 from "web3";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let showConnectedWallet = false
    let accounts = [];
    let signature = "";
    let infoMessageToBeSigned = "";

    onMount(() => connectBrowserWallet());

    const connectBrowserWallet = async () => {
        if (typeof window.ethereum === "undefined") {
            console.log(`You might install https://metamask.io`);
        } else {
            accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
        }

        web3 = new Web3(web3.currentProvider);

        dispatch("walletConnected", {
            publicWalletAddress: accounts[0],
            web3
        });
    };

    
</script>

{#if accounts[0] !== undefined && showConnectedWallet}
    You are connected with wallet: {accounts[0]}

    <!-- <button on:click={signIt}> Sign It </button>
    <p><br /></p>
    <button on:click={getPublicKeyFromSignedData}>
        Get Public Key From Signature
    </button> -->
{/if}
