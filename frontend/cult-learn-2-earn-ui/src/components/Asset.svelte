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

  const clickValue = (valueClicked) => {
    asset.currentVisitorsVoteForAsset = valueClicked;
  };
</script>

<Card>
  <p><br /><br /></p>
  <p class="text-display">
    {@html replaceContentToShowClickableLinks(asset.description)}
  </p>
  <p><br /></p>
  {#if asset.previewURL.length - 4 === asset.previewURL.indexOf(".jpg") || asset.previewURL.length - 4 === asset.previewURL.indexOf(".png") || asset.previewURL.length - 4 === asset.previewURL.indexOf(".svg")}
    <a href={asset.assetURL} target="_blank">
      <img src={asset.previewURL} alt="" class="assetImg" />
    </a>
  {:else}
    <iframe
      width={iFrameWidth}
      height={iFrameHeight}
      title="Asset"
      src={asset.previewURL}
      allowfullscreen
    />
  {/if}
  <p><br /></p>
  <p class="text-display">
    {@html replaceContentToShowClickableLinks(asset.assetURL)}
  </p>

  <br />
  <button class="button-colors-on-Card" on:click={() => handleDonate()}
    >Donate to Provider</button
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
  <p><br /></p>
  <button class="button-colors-on-Card" on:click={() => handleRateContent()}
    >Rate Content</button
  >

  {#if showRatingSelect}
    <Metamask on:walletConnected={handleWalletConnected} />
    <p><br /></p>
    <ul class="rating">
      <li>
        <input type="radio" id="num1" on:change={() => clickValue(1)} />
        <label
          class={asset.currentVisitorsVoteForAsset === 1
            ? "labelActive"
            : "labelInActive"}
          for="num1">1</label
        >
      </li>
      <li>
        <input
          type="radio"
          id="num2"
          on:change={() => clickValue(2)}
          checked={asset.currentVisitorsVoteForAsset === 2}
        />
        <label
          class={asset.currentVisitorsVoteForAsset === 2
            ? "labelActive"
            : "labelInActive"}
          for="num2">2</label
        >
      </li>
      <li>
        <input
          type="radio"
          id="num3"
          on:change={() => clickValue(3)}
          checked={asset.currentVisitorsVoteForAsset === 3}
        />
        <label
          class={asset.currentVisitorsVoteForAsset === 3
            ? "labelActive"
            : "labelInActive"}
          for="num3">3</label
        >
      </li>
      <li>
        <input
          type="radio"
          id="num4"
          on:change={() => clickValue(4)}
          checked={asset.currentVisitorsVoteForAsset === 4}
        />
        <label
          class={asset.currentVisitorsVoteForAsset === 4
            ? "labelActive"
            : "labelInActive"}
          for="num4">4</label
        >
      </li>
      <li>
        <input
          type="radio"
          id="num5"
          on:change={() => clickValue(5)}
          checked={asset.currentVisitorsVoteForAsset === 5}
        />
        <label
          class={asset.currentVisitorsVoteForAsset === 5
            ? "labelActive"
            : "labelInActive"}
          for="num5">5</label
        >
      </li>
      <li>
        <input
          type="radio"
          id="num6"
          on:change={() => clickValue(6)}
          checked={asset.currentVisitorsVoteForAsset === 6}
        />
        <label
          class={asset.currentVisitorsVoteForAsset === 6
            ? "labelActive"
            : "labelInActive"}
          for="num6">6</label
        >
      </li>
      <li>
        <input
          type="radio"
          id="num7"
          on:change={() => clickValue(7)}
          checked={asset.currentVisitorsVoteForAsset === 7}
        />
        <label
          class={asset.currentVisitorsVoteForAsset === 7
            ? "labelActive"
            : "labelInActive"}
          for="num7">7</label
        >
      </li>
      <li>
        <input
          type="radio"
          id="num8"
          on:change={() => clickValue(8)}
          checked={asset.currentVisitorsVoteForAsset === 8}
        />
        <label
          class={asset.currentVisitorsVoteForAsset === 8
            ? "labelActive"
            : "labelInActive"}
          for="num8">8</label
        >
      </li>
      <li>
        <input
          type="radio"
          id="num9"
          on:change={() => clickValue(9)}
          checked={asset.currentVisitorsVoteForAsset === 9}
        />
        <label
          class={asset.currentVisitorsVoteForAsset === 9
            ? "labelActive"
            : "labelInActive"}
          for="num9">9</label
        >
      </li>
      <li>
        <input
          type="radio"
          id="num10"
          on:change={() => clickValue(10)}
          checked={asset.currentVisitorsVoteForAsset === 10}
        />
        <label
          class={asset.currentVisitorsVoteForAsset === 10
            ? "labelActive"
            : "labelInActive"}
          for="num10">10</label
        >
      </li>
    </ul>
    <p><br /></p>
  {/if}
</Card>

<style>

  .assetImg {
    max-width: 69vw;
  }
  .rating {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 30px 0;
  }

  .rating li {
    position: relative;
    /* background: #f4f4f4; */
    width: 50px;
    height: 50px;
    padding: 10px;
    text-align: center;
    border-radius: 50%;
    font-size: 19px;
    border: 1px #eee solid;
    transition: 0.3s;
    background: black;
    color: #efdcb3;
  }

  .rating li label {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    padding: 10px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }

  .rating li:hover {
    background: #ff6a95;
    color: #fff;
  }

  [type="radio"] {
    opacity: 0;
  }

  [type="radio"]:checked ~ label {
    background: #ff6a95;
    color: #fff;
  }
</style>
