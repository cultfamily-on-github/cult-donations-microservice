<script>
  import Card from "./Card.svelte";
  import {
    getFirstLinkInText,
    replaceContentToShowClickableLinks,
  } from "../helpers";
  export let item;

  let showDonateInfo = false;
  let iFrameWidth = "100%";
  let iFrameHeight = "315";
  let inFullScreenMode = false;
  let iFrameActive = false;

  const handleDonate = (text) => {
    showDonateInfo = !showDonateInfo;
    // const firstLinkInText = getFirstLinkInText(text)
    // if (text.indexOf("https://") === -1) {
    //   alert(`ok. just do it.`)
    // } else {
    //   window.open(firstLinkInText, "_blank")
    // }
  };

  // var elem = document.documentElement;
  // function openFullscreen() {
  //   if (elem.requestFullscreen) {
  //     elem.requestFullscreen();
  //     // @ts-ignore
  //   } else if (elem.webkitRequestFullscreen) {
  //     /* Safari */
  //     // @ts-ignore
  //     elem.webkitRequestFullscreen();
  //     // @ts-ignore
  //   } else if (elem.msRequestFullscreen) {
  //     /* IE11 */
  //     // @ts-ignore
  //     elem.msRequestFullscreen();
  //   }
  // }

  //   function closeFullscreen() {
  //   if (document.exitFullscreen) {
  //     document.exitFullscreen();
  //   // @ts-ignore
  //   } else if (document.webkitExitFullscreen) { /* Safari */
  //     // @ts-ignore
  //     document.webkitExitFullscreen();
  //   // @ts-ignore
  //   } else if (document.msExitFullscreen) { /* IE11 */
  //     // @ts-ignore
  //     document.msExitFullscreen();
  //   }
  // }
</script>

<Card>
  <p><br /></p>

  <p class="text-display">
    {@html replaceContentToShowClickableLinks(
      item.assetInfo[0].linkToSocialMediaProfile
    )}
  </p>
  <p><br /></p>
  <p class="text-display">
    {@html replaceContentToShowClickableLinks(item.assetInfo[0].assetURL)}
  </p>
  <p><br /></p>
  <iframe
    width={iFrameWidth}
    height={iFrameHeight}
    title="Asset"
    src={item.assetInfo[0].previewURL}
    allowfullscreen
  />
  <br />
  <br />

  <button
    class="button-colors-on-Card"
    on:click={() => handleDonate(item.assetInfo[0].assetURL)}
    >Donate to Value Creator</button
  >

  <a href="https://cultmagazine.org" class="linkInText" style="display: none;">
    you might only understand this if you try to delete it :)
  </a>
</Card>

<style>
</style>
