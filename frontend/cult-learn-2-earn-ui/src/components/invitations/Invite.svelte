<script>
    import { backendBaseURL } from "../../stores";
    import Card from "../Card.svelte";
    import InvitationsTree from "./InvitationsTree.svelte";
    import Metamask from "../Metamask.svelte";
    import { getPublicWalletAddressFromSignature, isEthereumWalletAddress } from "../../helpers";

    // let walletToBeInvited = "";
    let walletToBeInvited = "0x4396A292512AA418087645B56a3a76333Bd10e28";
    let message = "";
    let signature = "";
    let publicWalletAddress = "";
    let web3;
    let infoMessageToBeSigned = "This signature is used to validate that you are the owner of this wallet.";

    const isSignatureValid = async (signature) => {
        const publicWalletAddressFromSignature =
            await getPublicWalletAddressFromSignature(
                signature,
                infoMessageToBeSigned,
                web3
            );

        alert(
            `checking if ${signature} by comparing ${publicWalletAddressFromSignature} with ${publicWalletAddress}`
        );

        if (publicWalletAddressFromSignature === publicWalletAddress) {
            return true;
        }
        return false;
    };

    const invite = async () => {
        if (isEthereumWalletAddress(walletToBeInvited.toLowerCase())) {
            alert(walletToBeInvited)
            alert(infoMessageToBeSigned)
            alert(web3)
            try {
                signature = await web3.eth.sign(
                    web3.utils.toHex(infoMessageToBeSigned),
                    publicWalletAddress
                );
                alert(signature)
            } catch (error) {
                console.log(error);
            }

            if (isSignatureValid(signature)) {
                try {
                    const inviteWalletURL = `${backendBaseURL}/api/v1/inviteWallet`;
                    console.log(`register invite via ${inviteWalletURL}`);
                    const inviteToBeSent = {
                        signature,
                        invitee: walletToBeInvited,
                        dateString: "will be enriched by backend",
                    };
                    await fetch(inviteWalletURL, {
                        method: "post",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(inviteToBeSent),
                    });
                    message = "Invite Registered Successfully. Thank You.";
                    walletToBeInvited = "";
                } catch (error) {
                    alert(`an error occurred: ${error.message}`);
                }
            } else {
            }
        } else {
            alert(
                `${walletToBeInvited} seems not to be a valid Ethereum Address`
            );
        }
    };

    const handleWalletConnected = async (event) => {
        publicWalletAddress = event.detail.publicWalletAddress
        web3 = event.detail.web3;
    };
</script>

<Card>
    <br />
    <h2>Invite Your Friends</h2>
    <br />
    Only invited wallets can add learn 2 earn assets here. <br /><br />
    We do this to ensure high quality content right from the start and to establish
    a network of trust for decentralized content moderation. <br /><br />
    Every wallet is allowed to invite two further wallets. <br /><br />

    {#if message !== ""}
        <div class="message">
            {message}
            <p><br /></p>
        </div>
    {/if}
    {#if message === ""}
        <div class="input-group">
            <input
                type="text"
                bind:value={walletToBeInvited}
                placeholder="... paste invitee wallet ..."
            />
        </div>
        <p><br /></p>
    {/if}
    {#if walletToBeInvited !== ""}
        <Metamask on:walletConnected={handleWalletConnected} />

        <div class="color-of-body">
            <button class="button-colors-on-Card" on:click={() => invite()}
                >Send</button
            >
        </div>
    {/if}

    <p><br /></p>
    <h2>Invitations Tree</h2>
    <p><br /></p>

    <InvitationsTree />
</Card>

<p><br /></p>

<style>
</style>
