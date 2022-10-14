<script>
  import Card from "./Card.svelte";
  import { replaceContentToShowClickableLinks } from "../helpers";
  export let assetInfo;

  let showDonateInfo = false;
  let iFrameWidth = "100%";
  let iFrameHeight = "315";

  const handleDonate = (text) => {
    showDonateInfo = !showDonateInfo;
  };
</script>

<Card>
  <p><br /></p>

  <p class="text-display">
    {@html replaceContentToShowClickableLinks(
      assetInfo.linkToSocialMediaProfile
    )}
  </p>
  <p><br /></p>
  <p class="text-display">
    {@html replaceContentToShowClickableLinks(assetInfo.assetURL)}
  </p>
  <p><br /></p>
  <iframe
    width={iFrameWidth}
    height={iFrameHeight}
    title="Asset"
    src={assetInfo.previewURL}
    allowfullscreen
  />
  <br />
  <br />

  <button
    class="button-colors-on-Card"
    on:click={() => handleDonate(assetInfo.assetURL)}
    >Donate to Value Creator</button
  >

  {#if showDonateInfo}
    <p><br /></p>
    You can copy the following wallet address and transfer some CULT or RVLT to it:
    {assetInfo.publicWalletAddress}
    <p><br /></p>
  {/if}

  <!-- <a href="https://cultmagazine.org" class="linkInText" style="display: none;">
    you might only understand this if you try to delete it :)
  </a> -->
</Card>

<style>
</style>
