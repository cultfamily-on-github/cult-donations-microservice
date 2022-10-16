<script>
  import Card from "./Card.svelte";
  import { replaceContentToShowClickableLinks } from "../helpers";
  import { getInfoMessageToBeSigned } from "../helpers";


  export let learn2EarnAsset;
  export let web3

  let showDonateInfo = false;
  let iFrameWidth = "100%";
  let iFrameHeight = "315";

  const handleDonate = () => {
    showDonateInfo = !showDonateInfo;
  };

  const getPublicWalletAddressFromSignature = async (signature, learn2EarnAsset, web3) => {

        const dataThatWasSigned = getInfoMessageToBeSigned(learn2EarnAsset.assetURL, learn2EarnAsset.description)
        const publicWalletAddress = await web3.eth.personal.ecRecover(
            dataThatWasSigned,
            signature
        );

        alert(publicWalletAddress);
        return publicWalletAddress
}
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

  <br>
  <button
    class="button-colors-on-Card"
    on:click={() => handleDonate()}
    >Donate to Value Creator</button
  >

  {#if showDonateInfo}
    <p><br /></p>
    You can copy the following wallet address and transfer some CULT or RVLT to it:
    {getPublicWalletAddressFromSignature(learn2EarnAsset.signature, learn2EarnAsset, web3)}
    <p><br /></p>
  {/if}

  <!-- <a href="https://cultmagazine.org" class="linkInText" style="display: none;">
    you might only understand this if you try to delete it :)
  </a> -->
</Card>

<style>
</style>
