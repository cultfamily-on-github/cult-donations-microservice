<script>
// @ts-nocheck

  import { backendBaseURL } from "../stores";
  import Card from "./Card.svelte";
  import { createEventDispatcher } from "svelte";

  export let web3;
  export let publicWalletAddress;

  const dispatch = createEventDispatcher();

  let assetURL = "";
  // let assetURL =
  //   "https://rumble.com/v1lf51r-cultdao-in-100-seconds-michael-saylor-talks-about-cult.html";
  let linkToSocialMediaProfile = "https://twitter.com/Peer2peerE";
  let valueCreatorKey = "publicdemokey";
  let message;
  let numberOfColsTextArea = window.screen.availWidth / 35;
  let numberOfRowsTextArea = 10;
  let description = "";

  // const getPreviewURFromAssetURL = async (assetURL) =>{
  //   const theHTML = await fetch(assetURL)
  //   alert(theHTML)
  //   const previewURL = theHTML.split("meta property=og:image content=")[1].split(">")
  //   alert(previewURL)
  //   return previewURL
  // }

  const sendLearn2EarnAsset = async () => {
    // const previewURL = getPreviewURFromAssetURL(assetURL)

    const infoMessageToBeSigned = `This signature is used to validate that you are the owner of ${publicWalletAddress}`;

    const signature = await web3.eth.sign(
      web3.utils.toHex(infoMessageToBeSigned),
      publicWalletAddress
    );

    alert(signature);

    try {
      const addAssetURL = `${backendBaseURL}/api/v1/addAsset`;
      console.log(`sending asset to ${addAssetURL}`);

      const learnToEarnAssetToBeSent = {
        valueCreatorKey,
        assetInfo: [
          {
            assetURL,
            previewURL: "will be enriched by backend",
            publicWalletAddress,
            linkToSocialMediaProfile,
          },
        ],
      };

      await fetch(addAssetURL, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify(learnToEarnAssetToBeSent),
      });

      message = "Submission Successful. Thank You.";

      dispatch("newAsset", {
        text: "Hello!",
      });
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
      <p><br /></p>
    </div>
  {/if}
  <!-- <div class="input-group">
    <input
      type="text"
      bind:value={valueCreatorKey}
      placeholder="Please enter your Value Creator Key."
    />
  </div> -->

  <div class="input-group">
    <input
      type="text"
      bind:value={assetURL}
      placeholder="Please enter a link to your education asset."
    />
  </div>
  <div class="textareacontainer">
    <div class="comment">
      <textarea bind:value={description} class="textinput" placeholder="Please enter a description. A good description helps people to find your work results quickly."></textarea>
    </div>
  </div>
  <p><br /></p>
  <!-- <input
      type="text"
      bind:value={linkToSocialMediaProfile}
      placeholder="Please enter a link to your education asset."
    /> -->
  <!-- <div class="input-group">
    <input
      type="text"
      bind:value={publicWalletAddress}
      placeholder="Please enter a link to your education asset."
    />
  </div> -->
  <p><br /></p>
  {#if publicWalletAddress !== "" && assetURL !== "" && description !== ""}
    <div class="color-of-body">
      <button
        class="button-colors-on-Card"
        on:click={() => sendLearn2EarnAsset()}>Send</button
      >
    </div>
  {/if}
</Card>

<style>
  .textareacontainer {
    max-width: 820px;
    margin: 0px auto;
    margin-top: 10px;
    padding-top: 10px;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
  .comment {
    float: left;
    width: 100%;
    height: auto;
  }

  .textinput {
    float: left;
    width: 100%;
    min-height: 75px;
    outline: none;
    resize: none;
    border: 1px solid grey;
  }
</style>
