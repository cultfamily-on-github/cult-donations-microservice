<script>
  import Card from "./Card.svelte";
  import {
    replaceContentToShowClickableLinks,
    getPublicWalletAddressFromSignature,
    getInfoMessageToBeSigned,
  } from "../helpers";

  import Metamask from "./Metamask.svelte";

  import { onMount } from "svelte";

  export let learn2EarnAsset;
  // export let web3;

  let publicWalletAddressOfAssetCreatorFromSignature = "";
  let showDonateInfo = false;
  let iFrameWidth = "100%";
  let iFrameHeight = "315";

  // onMount(async () =>
  // );

  const handleDonate = () => {
    showDonateInfo = !showDonateInfo;
  };

  const handleWalletConnected = async (event) => {
    alert(event.detail);
    const infoMessageWhichWasSigned = getInfoMessageToBeSigned(
      learn2EarnAsset.assetURL,
      learn2EarnAsset.description
    );

    const web3 = event.detail.web3;

    publicWalletAddressOfAssetCreatorFromSignature =
      await getPublicWalletAddressFromSignature(
        learn2EarnAsset.signature,
        infoMessageWhichWasSigned,
        web3
      );
  };

  // const getPublicWalletAddressFromSignature = async (learn2EarnAsset, web3) => {
  //   const dataThatWasSigned = getInfoMessageToBeSigned(
  //     learn2EarnAsset.assetURL,
  //     learn2EarnAsset.description
  //   );
  //   publicWalletAddress = await web3.eth.personal.ecRecover(
  //     dataThatWasSigned,
  //     learn2EarnAsset.signature
  //   );

  //   alert(publicWalletAddress);
  //   return publicWalletAddress;
  // };
</script>

<Card>
  <p><br /></p>

  <p><br /></p>
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

  <!-- <a href="https://cultmagazine.org" class="linkInText" style="display: none;">
    you might only understand this if you try to delete it :)
  </a> -->
</Card>

<style>
</style>
