<script>
// @ts-nocheck
    import { onMount } from "svelte";
    import Web3 from "web3";
    import { createEventDispatcher } from "svelte";

    export let showConnectedWallet = false;
    let accounts = [];

    onMount(() => connectBrowserWallet());

    const dispatch = createEventDispatcher();

    const connectBrowserWallet = async () => {
        if (typeof window.ethereum === "undefined") {
            console.log(`You might install https://metamask.io or use https://brave.com with its integrated browserwallet`);
        } else {
            await updateAccountsList()
        }
        web3 = new Web3(web3.currentProvider);
        ethereum.on("accountsChanged", async (accounts) => {
            await updateAccountsList()
            dispatchWalletConnected()
        });

        dispatchWalletConnected()
    };
    
    const updateAccountsList = async () =>{
        accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
    }

    const dispatchWalletConnected = () => {
        dispatch("walletConnected", {
                publicWalletAddress: accounts[0],
                web3,
            });
    }

    
</script>

{#if accounts[0] !== undefined && showConnectedWallet}
    You are connected with wallet: {accounts[0]}
{/if}
