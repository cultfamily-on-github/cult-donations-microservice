<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    // import {personalSign} from "@metamask/eth-sig-util"
    // onMount(async () => connectBrowserWallet());
    import Web3 from "web3";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

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

    const signIt = async () => {
        web3 = new Web3(web3.currentProvider);

        infoMessageToBeSigned = `This signature is used to validate that you are the owner of ${accounts[0]}. This ensures only invited people can upload content to foster a high quality of our content right from the start.`;
        signature = await web3.eth.sign(
            web3.utils.toHex(infoMessageToBeSigned),
            accounts[0]
        );

        alert(signature);
        dispatch("signatureReceived", {
            signature
        });
    };

    const getPublicKeyFromSignedData = async () => {
        web3 = new Web3(web3.currentProvider);
        const dataThatWasSigned = infoMessageToBeSigned;
        const publicWalletAddress = await web3.eth.personal.ecRecover(
            dataThatWasSigned,
            signature
        );

        alert(publicWalletAddress);


    };
</script>

{#if accounts[0] !== undefined}
    You are connected with wallet: {accounts[0]}

    <!-- <button on:click={signIt}> Sign It </button>
    <p><br /></p>
    <button on:click={getPublicKeyFromSignedData}>
        Get Public Key From Signature
    </button> -->
{/if}
