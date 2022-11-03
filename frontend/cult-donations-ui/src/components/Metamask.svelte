<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import Web3 from "web3";
    import { createEventDispatcher } from "svelte";

    export let showConnectedWallet = false;
    let accounts = [];
    let connectedWallet = "";


    onMount(() => connectBrowserWallet());

    const dispatch = createEventDispatcher();

    const connectBrowserWallet = async () => {
        if (typeof window.ethereum === "undefined") {
            console.log(
                `You might install https://metamask.io or use https://brave.com with its integrated browserwallet`
            );
        } else {
            await updateAccountsList();
        }
        web3 = new Web3(web3.currentProvider);
        ethereum.on("accountsChanged", async (accounts) => {
            // alert(`in accountsChanged`);
            await updateAccountsList();
            dispatchWalletConnected();
        });

        dispatchWalletConnected();
    };

    const updateAccountsList = async () => {
        accounts = await ethereum.request({
            method: "eth_requestAccounts",
        });
        connectedWallet = accounts[0].toLowerCase();
    };

    const dispatchWalletConnected = () => {
        dispatch("walletConnected", {
            publicWalletAddress: connectedWallet,
            web3,
        });
    };

    const isVisitorOnMobileDevice = () => {
        alert("hier")
        alert(!!navigator.userAgent.match(/iphone|android|blackberry/ig) || false)
        return !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;
    };
</script>

{#if connectedWallet !== undefined && showConnectedWallet}
    You are connected with wallet: {connectedWallet}
{:else if connectedWallet === undefined && isVisitorOnMobileDevice()}
You seem to use a mobile device. In this case we recommend you to use the 
<a href="https://metamask.zendesk.com/hc/en-us/articles/6356387482523-How-to-use-the-MetaMask-Mobile-Browser" target="_blank">
    Metamask Mobile Browser
</a>
{/if}
