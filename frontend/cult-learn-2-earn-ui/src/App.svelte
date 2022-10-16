<script>
  import ValueCreatorForm from "./components/ValueCreatorForm.svelte";
  import Asset from "./components/Asset.svelte";
  import Seo from "./Seo.svelte";
  import { onMount } from "svelte";
  import { backendBaseURL } from "./stores";
  import Invite from "./components/invitations/Invite.svelte";
  import Metamask from "./components/Metamask.svelte";
  import InvitationsTree from "./components/invitations/InvitationsTree.svelte";
  // import Web3 from "web3";

  // import { fade, scale } from "svelte/transition";

  let assetInfoCollection = [];
  let filteredAssetInfoCollection = [];
  let showInviteForm = false;
  let searchTerm = "";
  let typingActive = false;
  let showValueCreatorForm = false;
  let showInvitationsTree = false;
  let publicWalletAddress = "";
  let web3;

  onMount(async () => getAssetInfoCollection());

  const changeShowInvitationsTree = () => {
    showInvitationsTree = !showInvitationsTree;
  };
  const getAssetInfoCollection = async () => {
    const urlToGetAssetInfoCollection = `${backendBaseURL}/api/v1/getAssetInfoCollection`;
    console.log(
      `fetching assetInfoCollection from ${urlToGetAssetInfoCollection}`
    );
    const response = await fetch(urlToGetAssetInfoCollection);

    assetInfoCollection = await response.json();
    filteredAssetInfoCollection = [...assetInfoCollection];
  };

  const handleNewAsset = () => {
    getAssetInfoCollection();
  };

  const handleSignatureReceived = () => {
    alert("signature received");
  };

  const handleWalletConnected = async (event) => {
    publicWalletAddress = event.detail.publicWalletAddress;
    web3 = event.detail.web3;

  };

  const changeShowValueCreatorForm = () => {
    showValueCreatorForm = !showValueCreatorForm;
    if (showValueCreatorForm) {
      showInviteForm = false;
    }
  };

  const changeShowInviteForm = () => {
    showInviteForm = !showInviteForm;
    if (showInviteForm) {
      showValueCreatorForm = false;
    }
  };

  // const setShowValueCreatorForm = () => {
  //   showValueCreatorForm = true;
  // };

  const onKeyDown = () => {
    filteredAssetInfoCollection = [...assetInfoCollection];
    if (typingActive === false) {
      typingActive = true;

      setTimeout(() => {
        const currentFilterResult = [];
        for (const assetInfo of filteredAssetInfoCollection) {
          const stringifiedAssetInfo = JSON.stringify(assetInfo);
          if (stringifiedAssetInfo.indexOf(searchTerm) !== -1) {
            currentFilterResult.push(assetInfo);
          }
        }

        filteredAssetInfoCollection = [...currentFilterResult];
        typingActive = false;
      }, 1000 * 1);
    }
  };
</script>

<Seo
  title="CULT Learn 2 Earn"
  description="We are a network of cultdao.io fans promoting freedom, fairness, education and love."
/>

<main class="container">
  <div class="text-center">
    <h2>CULT Learn 2 Earn</h2>
    <p><br /></p>

    Here you can find and
    <a
      href="#addEducationAsset"
      class="whiteLink"
      on:click={changeShowValueCreatorForm}
    >
      add
    </a>
    education assets around the CULT. <br />

    You can donate directly to the value creators.
    <p><br /></p>

    <div class="input-group">
      <!-- svelte-ignore a11y-autofocus -->
      <input
        type="searchTerm"
        bind:value={searchTerm}
        placeholder="... start typing to filter assets"
        on:keydown={onKeyDown}
        autofocus
      />
    </div>

    <p><br /></p>
    Number of Education Assets: {filteredAssetInfoCollection.length}
    <p><br /></p>
    
    {#each filteredAssetInfoCollection as assetInfo}
      <Asset {assetInfo} />
    {/each}

    <p><br /></p>

    <section id="addEducationAsset">
      <button on:click={() => changeShowValueCreatorForm()}>
        Add Your Education Asset
      </button>

      <!-- <p><br></p>
      <Jwt></Jwt> -->
      <p><br /></p>

      {#if showValueCreatorForm}
        <Metamask
          on:signatureReceived={handleSignatureReceived}
          on:walletConnected={handleWalletConnected}
        />
        <p><br /></p>

        <ValueCreatorForm on:newAsset={handleNewAsset} web3={web3} publicWalletAddress={publicWalletAddress}/>
      {/if}
    </section>

    <section id="invitations">
      <button on:click={() => changeShowInviteForm()}>
        Invite Trusted Wallets
      </button>
      {#if showInviteForm}
        <Invite />
      {/if}
      <p><br /></p>

      <button on:click={() => changeShowInvitationsTree()}>
        Show Invitation Tree
      </button>

      {#if showInvitationsTree}
        <h2>Invitations Tree</h2>
        <p><br /></p>

        <InvitationsTree />
      {/if}
    </section>
    <p><br /></p>
  </div>
</main>

<style>
  .whiteLink {
    color: white;
  }
</style>
