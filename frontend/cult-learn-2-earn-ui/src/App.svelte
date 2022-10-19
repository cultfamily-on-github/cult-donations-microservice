<script>
  import ValueCreatorForm from "./components/ValueCreatorForm.svelte";
  import Asset from "./components/Asset.svelte";
  import Seo from "./Seo.svelte";
  import { onMount } from "svelte";
  import { backendBaseURL } from "./stores";
  import Metamask from "./components/Metamask.svelte";
  import Invite from "./components/invitations/Invite.svelte";
  // import Invite from "./components/invitations/Invite.svelte";
  // import Web3 from "web3";

  let assets = [];
  let filteredassets = [];
  let showInviteForm = false;
  let searchTerm = "";
  let typingActive = false;
  let showValueCreatorForm = false;
  let publicWalletAddress = "";
  let web3;
  let host;

  onMount(async () => {
    getAssetsFromServer();
    setTimeout(() => {
      // optimizing speed for first meaningful content display ... https://pagespeed.web.dev/
      getInvites();
    }, 1000 * 1);
  });

  const getAssetsFromServer = async () => {
    const urlToGetassets = `${backendBaseURL}/api/v1/getAssets`;
    console.log(`fetching assets from ${urlToGetassets}`);
    const response = await fetch(urlToGetassets);

    assets = await response.json();
    filteredassets = [...assets];
  };

  const getInvites = async () => {
    const urlToGetInvitesFormatted = `${backendBaseURL}/api/v1/getInvites`;
    console.log(`fetching invites from ${urlToGetInvitesFormatted}`);
    const response = await fetch(urlToGetInvitesFormatted);

    host = await response.json();
  };

  const handleNewAsset = () => {
    getAssetsFromServer();
    alert("Asset added successfully. Thank you for supporting the CULT.");
    showValueCreatorForm = false;
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

  const onKeyDown = () => {
    filteredassets = [...assets];
    if (typingActive === false) {
      typingActive = true;

      setTimeout(() => {
        const currentFilterResult = [];
        for (const asset of filteredassets) {
          const stringifiedasset = JSON.stringify(asset);
          if (stringifiedasset.indexOf(searchTerm) !== -1) {
            currentFilterResult.push(asset);
          }
        }

        filteredassets = [...currentFilterResult];
        typingActive = false;
      }, 1000 * 1);
    }
  };

  const isWalletInvited = (walletAddress) => {
    const stringifiedInvitationTree = JSON.stringify(host);
    if (
      stringifiedInvitationTree.indexOf(walletAddress) === -1 &&
      host.length !== undefined
    ) {
      return false;
    }
    return true;
  };
</script>

<Seo
  title="CULT Donations"
  description="We are a network of cultdao.io fans promoting freedom, fairness, education and love."
/>

<main class="container">
  <div class="text-center">
    <!-- <h1>CULT Assets Explorer</h1> -->
    <h1>CULT Donations</h1>

    <p><br /><br /></p>

    Here you can find and
    <a
      href="#addEducationAsset"
      class="whiteLink"
      on:click={changeShowValueCreatorForm}
    >
      add
    </a>
    CULT links to videos, memes, pages & diagrams. <br />

    You can receive donations for collecting and adding those links.
    <p><br /><br /></p>

    <div class="input-group">
      <!-- svelte-ignore a11y-autofocus -->
      <input
        type="searchTerm"
        bind:value={searchTerm}
        placeholder="... start typing to become a cult explorer"
        on:keydown={onKeyDown}
        autofocus
      />
    </div>

    <p><br /></p>
    Number of Results: {filteredassets.length}
    <p><br /></p>

    <div class="assetsArea">
      {#each filteredassets as asset}
        <Asset {asset} />
      {/each}
    </div>

    <p><br /></p>

    <section id="addEducationAsset">
      <button on:click={() => changeShowValueCreatorForm()}> Add Link </button>
      {#if showValueCreatorForm}
        <Metamask
          on:walletConnected={handleWalletConnected}
          showConnectedWallet={false}
        />

        {#if isWalletInvited(publicWalletAddress)}
          <ValueCreatorForm
            on:newAsset={handleNewAsset}
            {web3}
            {publicWalletAddress}
          />
        {:else}
          <Invite
            showExplanation={true}
            showInvitationsTree={true}
            connectedWallet={publicWalletAddress}
            {host}
          />
        {/if}
      {/if}
    </section>

    <p><br /></p>

    <section id="invitations">
      <button on:click={() => changeShowInviteForm()}> Invite Friends </button>
      {#if showInviteForm}
        <Metamask
          on:walletConnected={handleWalletConnected}
          showConnectedWallet={false}
        />

        {#if isWalletInvited(publicWalletAddress)}
          <Invite
            showInviteForm={true}
            showInvitationsTree={true}
            connectedWallet={publicWalletAddress}
            {host}
          />
        {:else}
          <Invite
            showExplanation={true}
            showInvitationsTree={true}
            connectedWallet={publicWalletAddress}
            {host}
          />
        {/if}
      {/if}
      <p><br /></p>
    </section>
    <p><br /></p>
  </div>
</main>

<style>
  .assetsArea {
    max-height: 100vh;
    overflow-y: scroll;
  }

  ::-webkit-scrollbar {
    display: none;
  }
  .whiteLink {
    color: #efdcb3;
  }
  h1 {
    color: #d7c69d;
  }
</style>
