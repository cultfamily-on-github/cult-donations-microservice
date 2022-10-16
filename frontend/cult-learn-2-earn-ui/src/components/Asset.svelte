<script>
  import Card from "./Card.svelte";
  import {
    replaceContentToShowClickableLinks,
    getPublicWalletAddressFromSignature,
    getInfoMessageToBeSigned,
  } from "../helpers";
  import Metamask from "./Metamask.svelte";

  export let learn2EarnAsset;

  let publicWalletAddressOfAssetCreatorFromSignature = "";
  let showDonateInfo = false;
  let iFrameWidth = "100%";
  let iFrameHeight = "315";

  const handleDonate = () => {
    showDonateInfo = !showDonateInfo;
  };

  const handleWalletConnected = async (event) => {
    const web3 = event.detail.web3;
    const infoMessageWhichWasSigned = getInfoMessageToBeSigned(
      learn2EarnAsset.assetURL,
      learn2EarnAsset.description
    );
    publicWalletAddressOfAssetCreatorFromSignature =
      await getPublicWalletAddressFromSignature(
        learn2EarnAsset.signature,
        infoMessageWhichWasSigned,
        web3
      );
  };

</script>

<Card>
  <p><br /><br></p>
  <p class="text-display">
    {@html replaceContentToShowClickableLinks(learn2EarnAsset.description)}
  </p>
  <p><br /></p>
  <iframe
    width={iFrameWidth}
    height={iFrameHeight}
    title="Asset"
    src={learn2EarnAsset.previewURL}
    allowfullscreen
  />
  <p><br /></p>
  <p class="text-display">
    {@html replaceContentToShowClickableLinks(learn2EarnAsset.assetURL)}
  </p>

  <br />
  <button class="button-colors-on-Card" on:click={() => handleDonate()}
    >Donate to Value Creator</button
  >

  {#if showDonateInfo}
    <Metamask on:walletConnected={handleWalletConnected} />
    <p><br /></p>
    <p><br /></p>
    {#if publicWalletAddressOfAssetCreatorFromSignature !== ""}
      You can copy the following wallet address and transfer some CULT or RVLT
      to it:
      {publicWalletAddressOfAssetCreatorFromSignature}
    {/if}
    <p><br /></p>
  {/if}

</Card>

<style>
</style>
