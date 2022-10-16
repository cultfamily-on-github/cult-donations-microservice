<script>
    import { backendBaseURL } from "../../stores";
    import Card from "../Card.svelte";
    import InvitationsTree from "./InvitationsTree.svelte";
    import { isEthereumWalletAddress } from "../../helpers";

    let walletToBeInvited = "";
    let message = "";

    const invite = async () => {
        if (isEthereumWalletAddress(walletToBeInvited.toLowerCase())) {
            try {
                const inviteWalletURL = `${backendBaseURL}/api/v1/inviteWallet`;
                console.log(`register invite via ${inviteWalletURL}`);
                const inviteToBeSent = {
                    walletToBeInvited,
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
            alert(
                `${walletToBeInvited} seems not to be a valid Ethereum Address`
            );
        }
    };
</script>

<Card>

    <h2>Invite Your Friends</h2>
    <br>
    Only invited wallets can add learn 2 earn assets here. <br>
    We do this to ensure high quality content right from the start. <br>
    Every wallet is allowed to invite two further wallets. <br>
    
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
        <div class="color-of-body">
            <button class="button-colors-on-Card" on:click={() => invite()}
                >Send</button
            >
        </div>
    {/if}

        <h2>Invitations Tree</h2>
        <p><br /></p>

        <InvitationsTree />
</Card>

<p><br /></p>

<style>

</style>
