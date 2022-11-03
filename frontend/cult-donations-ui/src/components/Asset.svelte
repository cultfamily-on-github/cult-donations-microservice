<script>
  import Card from "./Card.svelte";
  import {
    replaceContentToShowClickableLinks,
    getPublicWalletAddressFromSignature,
    getInfoMessageToBeSigned,
  } from "../helpers";
  import Metamask from "./Metamask.svelte";

  export let asset;

  let publicWalletAddressOfAssetCreatorFromSignature = "";
  let showDonateInfo = false;
  let showRatingSelect = false;
  let iFrameWidth = "100%";
  let iFrameHeight = "315";

  const handleDonate = () => {
    showRatingSelect = false;
    showDonateInfo = !showDonateInfo;
  };

  const handleRateContent = () => {
    showDonateInfo = false;
    showRatingSelect = !showRatingSelect;
  };

  const handleWalletConnected = async (event) => {
    const web3 = event.detail.web3;
    const infoMessageWhichWasSigned = getInfoMessageToBeSigned(
      asset.assetURL,
      asset.description
    );
    publicWalletAddressOfAssetCreatorFromSignature =
      await getPublicWalletAddressFromSignature(
        asset.signature,
        infoMessageWhichWasSigned,
        web3
      );
  };
</script>

<Card>
  <p><br /><br /></p>
  <p class="text-display">
    {@html replaceContentToShowClickableLinks(asset.description)}
  </p>
  <p><br /></p>

  {#if asset.ipfsContentIdentifierCID === "not-applicable-yet-for-external-links"}
    {#if asset.previewURL.length - 4 === asset.previewURL.indexOf(".jpg") || asset.previewURL.length - 4 === asset.previewURL.indexOf(".png") || asset.previewURL.length - 4 === asset.previewURL.indexOf(".svg")}
      <img src={asset.previewURL} alt="" class="assetImg" />
    {:else}
      <iframe
        width={iFrameWidth}
        height={iFrameHeight}
        title="Asset"
        src={asset.previewURL}
        allowfullscreen
      />
    {/if}
  {:else if asset.ipfsContentIdentifierCID === "IPFS CID Link Coming Soon"}
    <img src={asset.previewURL} alt="" class="assetImg" />
  {/if}

  <p><br /></p>
  <!-- <p class="text-display">
    {@html replaceContentToShowClickableLinks(asset.assetURL)}
  </p>

  <br /> -->
  <button class="button-colors-on-Card" on:click={() => handleDonate()}
    >Donate to Provider</button
  >

  {#if showDonateInfo}
    <Metamask on:walletConnected={handleWalletConnected} />
    <p><br /></p>
    {#if publicWalletAddressOfAssetCreatorFromSignature !== ""}
      You can copy the following wallet address and transfer some CULT or RVLT
      to it: <br />
      {publicWalletAddressOfAssetCreatorFromSignature} <br />

      In the future we might utilize a CULT donations smart contract to make
      this process more convenient.
    {/if}
    <p><br /></p>
  {/if}
</Card>

<style>
  .assetImg {
    width: 100%;
    /* max-width: 69vw; */
  }
</style>
