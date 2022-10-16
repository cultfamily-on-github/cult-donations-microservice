<script>
    import { backendBaseURL } from "../../stores";
    import Card from "../Card.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let walletToBeInvited = "";
    let message;

    // const getPreviewURFromAssetURL = async (assetURL) =>{
    //   const theHTML = await fetch(assetURL)
    //   alert(theHTML)
    //   const previewURL = theHTML.split("meta property=og:image content=")[1].split(">")
    //   alert(previewURL)
    //   return previewURL
    // }


    const isEthereumWalletAddress = (address) => {
        if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
            // check if it has the basic requirements of an address
            return false;
        } else if (
            /^(0x)?[0-9a-f]{40}$/.test(address) ||
            /^(0x)?[0-9A-F]{40}$/.test(address)
        ) {
            // If it's all small caps or all all caps, return true
            return true;
        } else {
            throw new Error(
                `I guess it's fine toLowerCase the input as a client`
            );
        }
    };
    const invite = async () => {
        // const previewURL = getPreviewURFromAssetURL(assetURL)

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

                dispatch("newAsset", {
                    text: "Hello!",
                });
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
    <!-- {#if message}
        <div class="message">
            {message}
            <p><br /></p>
        </div>
    {/if} -->
    <div class="input-group">
        <input
            type="text"
            bind:value={walletToBeInvited}
            placeholder="Please enter the wallet you would like to invite."
        />
    </div>

    <p><br /></p>
    {#if walletToBeInvited !== ""}
        <div class="color-of-body">
            <button class="button-colors-on-Card" on:click={() => invite()}
                >Send</button
            >
        </div>
    {/if}
</Card>

<p><br /></p>


<style>
</style>
