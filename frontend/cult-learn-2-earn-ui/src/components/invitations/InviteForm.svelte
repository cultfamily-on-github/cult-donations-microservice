<script>
    import Metamask from "../Metamask.svelte";
    import { backendBaseURL } from "../../stores";
    import { isEthereumWalletAddress } from "../../helpers";

    // let walletToBeInvited = "";
    // let walletToBeInvited = "0x4396A292512AA418087645B56a3a76333Bd10e28";
    let walletToBeInvited = "0x414a6ace81a5336540506f852bCAb301891058fa";
    let signature = "";
    let publicWalletAddress = "";
    let web3;
    let infoMessageToBeSigned =
        "This signature is used to validate that you are the owner of this wallet.";

    let message = "";
    const invite = async () => {
        if (isEthereumWalletAddress(walletToBeInvited.toLowerCase())) {
            try {
                signature = await web3.eth.sign(
                    web3.utils.toHex(infoMessageToBeSigned),
                    publicWalletAddress
                );
            } catch (error) {
                console.log(error);
            }

            try {
                const inviteWalletURL = `${backendBaseURL}/api/v1/inviteWallet`;
                console.log(`register invite via ${inviteWalletURL}`);
                const inviteInfo = {
                    host: publicWalletAddress,
                    signature,
                    invitees: [{ host: walletToBeInvited, invitees: [] }],
                };
                await fetch(inviteWalletURL, {
                    method: "post",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(inviteInfo),
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

    const handleWalletConnected = async (event) => {
        publicWalletAddress = event.detail.publicWalletAddress;
        web3 = event.detail.web3;
    };
</script>

<h2>Invite Your Friends</h2>
<br />
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
    <Metamask
        on:walletConnected={handleWalletConnected}
        showConnectedWallet={true}
    />

    <p><br /></p>
    <div class="color-of-body">
        <button class="button-colors-on-Card" on:click={() => invite()}
            >Send</button
        >
    </div>
{/if}
