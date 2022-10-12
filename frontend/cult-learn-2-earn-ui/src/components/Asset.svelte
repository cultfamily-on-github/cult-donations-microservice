<script>
  import Card from "./Card.svelte"
  import Countdown from "./archive-can-probably-be-deleted-soon/Countdown.svelte"
  import { getFirstLinkInText, replaceContentToShowClickableLinks } from "../helpers"
  export let item

  let showDonateInfo = false

  const handleDonate = (text) => {
    showDonateInfo = !showDonateInfo
    // const firstLinkInText = getFirstLinkInText(text)
    // if (text.indexOf("https://") === -1) {
    //   alert(`ok. just do it.`)
    // } else {
    //   window.open(firstLinkInText, "_blank")
    // }
  }
</script>

<Card>
  <!-- <div class="num-display">
    {item.publicWalletAddress}
  </div> -->
  <!-- <Countdown deadline={validOnUTCTime} /> -->

  <p><br /></p>

  <p class="text-display">
    {@html replaceContentToShowClickableLinks(item.assetInfo[0].linkToSocialMediaProfile)}
  </p>
  <p><br /></p>
  <p class="text-display">
    {@html replaceContentToShowClickableLinks(item.assetInfo[0].assetURL)}
  </p>
  <p><br /></p>
  <iframe width="420" height="315" title="Asset"
    src={item.assetInfo[0].previewURL}>
  </iframe>
  <p><br /></p>

  <button
    class="button-colors-on-Card"
    on:click={() => handleDonate(item.assetInfo[0].assetURL)}>Donate to Value Creator</button
  >

  <a href="https://cultmagazine.org" class="linkInText" style="display: none;">
    you might only understand this if you try to delete it :)
  </a>
</Card>

<style>

</style>
