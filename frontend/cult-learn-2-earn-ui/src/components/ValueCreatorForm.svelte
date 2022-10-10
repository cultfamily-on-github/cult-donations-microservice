<script>
  import { backendBaseURL } from "../stores";
  import Card from "./Card.svelte";

  let assetURL = "https://rumble.com/v1lf51r-cultdao-in-100-seconds-michael-saylor-talks-about-cult.html";
  let publicWalletAddress = "0x9E972a43B3B8D68cD70930697E16429E47E88151";
  let linkToSocialMediaProfile = "https://twitter.com/Peer2peerE";
  let valueCreatorKey = "publicdemokey";
  let message;

  const sendLearn2EarnAsset = async () => {
    try {
      const addAssetURL = `${backendBaseURL}/api/v1/addAsset`
      alert(`sending asset to ${addAssetURL}`)
      await fetch(addAssetURL, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          assetURL,
          publicWalletAddress,
          linkToSocialMediaProfile,
          valueCreatorKey,
        }),
      });

      message = "Submission Successful. Thank You.";

      publicWalletAddress = "";
      valueCreatorKey = "";
      assetURL = "";
      linkToSocialMediaProfile = "";

    } catch (error) {
      alert(`an error occurred: ${error.message}`);
    }
  };
</script>

<Card>
  <!-- <RatingSelect on:rating-select={handleSelect} /> -->
  {#if message}
    <div class="message">
      {message}
      <p><br></p>
    </div>
  {/if}
  <div class="input-group">
    <input
      type="text"
      bind:value={valueCreatorKey}
      placeholder="Please enter your Value Creator Key."
    />
  </div>

  <div class="input-group">
    <input
      type="text"
      bind:value={assetURL}
      placeholder="Please enter a link to your education asset."
    />
  </div>
  <div class="input-group">
    <input
      type="text"
      bind:value={linkToSocialMediaProfile}
      placeholder="Please enter a link to your education asset."
    />
  </div>
  <div class="input-group">
    <input
      type="text"
      bind:value={publicWalletAddress}
      placeholder="Please enter a link to your education asset."
    />
  </div>
  <p><br /></p>
  {#if publicWalletAddress !== "" && valueCreatorKey !== "" && assetURL !== "" && linkToSocialMediaProfile !== ""}
    <div class="color-of-body">
      <button class="button-colors-on-Card" on:click={() => sendLearn2EarnAsset()}>Send</button>
    </div>
  {/if}
</Card>

<style>

</style>
