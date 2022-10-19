<script>
  // @ts-nocheck

  import { backendBaseURL } from "../stores";
  import Card from "./Card.svelte";
  import { createEventDispatcher } from "svelte";
  import { getInfoMessageToBeSigned, getPublicWalletAddressFromSignature } from "../helpers";

  export let web3;
  export let publicWalletAddress;

  const dispatch = createEventDispatcher();

  // let assetURL = "https://rumble.com/v1lf51r-cultdao-in-100-seconds-michael-saylor-talks-about-cult.html";
  let assetURL = "";
  let message;
  let description = "";

  // const getPreviewURFromAssetURL = async (assetURL) =>{
  //   const theHTML = await fetch(assetURL)
  //   alert(theHTML)
  //   const previewURL = theHTML.split("meta property=og:image content=")[1].split(">")
  //   alert(previewURL)
  //   return previewURL
  // }

  const isSignatureValid = async (signature) => {
    const publicWalletAddressFromSignature = 
      await getPublicWalletAddressFromSignature(signature, getInfoMessageToBeSigned(assetURL, description), web3)

      alert(`checking if ${signature} by comparing ${publicWalletAddressFromSignature} with ${publicWalletAddress}`)

    if ( publicWalletAddressFromSignature === publicWalletAddress) {
      return true
    }
    return false
  }
  const sendLearn2EarnAsset = async () => {
    // const previewURL = getPreviewURFromAssetURL(assetURL)

    let infoMessageToBeSigned = getInfoMessageToBeSigned(assetURL, description)
    let signature = "";

    try {
      signature = await web3.eth.sign(
        web3.utils.toHex(infoMessageToBeSigned),
        publicWalletAddress
      );
    } catch (error) {
      console.log(error);
    }

    if (isSignatureValid(signature)){

      try {
        const addAssetURL = `${backendBaseURL}/api/v1/addAsset`;
        console.log(`sending asset to ${addAssetURL}`);
        
        const learnToEarnAssetToBeSent = {
          signature,
          assetURL,
          previewURL: "will be enriched by backend",
          description,
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
        assetURL = "";
        description = "";
        // signature = "";
      } catch (error) {
        alert(`an error occurred: ${error.message}`);
      }
    } else {
      alert("It seems you clicked cancel.")
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
      bind:value={signature}
      placeholder="Please enter your Value Creator Key."
    />
  </div> -->

  <div class="input-group">
    <input
      type="text"
      bind:value={assetURL}
      placeholder="... paste link to education asset ..."
    />
  </div>
  <div class="textareacontainer">
    <div class="comment">
      <textarea
        bind:value={description}
        class="textinput"
        placeholder="... enter a description to help people find your work results quickly ..."
      />
    </div>
  </div>
  <p><br /></p>

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
