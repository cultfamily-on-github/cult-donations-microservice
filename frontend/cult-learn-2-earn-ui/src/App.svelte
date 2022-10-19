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

  let learn2EarnAssets = [];
  let filteredLearn2EarnAssets = [];
  let showInviteForm = false;
  let searchTerm = "";
  let typingActive = false;
  let showValueCreatorForm = false;
  let publicWalletAddress = "";
  let web3;
  let host;

  onMount(async () => {
    getAssetsFromServer();
    setTimeout(() => { // optimizing speed for first meaningful content display ... https://pagespeed.web.dev/
      getInvites();
    }, 1000 * 1);
  });

  const getAssetsFromServer = async () => {
    const urlToGetLearn2EarnAssets = `${backendBaseURL}/api/v1/getLearn2EarnAssets`;
    console.log(
      `fetching learn 2 earn assets from ${urlToGetLearn2EarnAssets}`
    );
    const response = await fetch(urlToGetLearn2EarnAssets);

    learn2EarnAssets = await response.json();
    filteredLearn2EarnAssets = [...learn2EarnAssets];
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
    filteredLearn2EarnAssets = [...learn2EarnAssets];
    if (typingActive === false) {
      typingActive = true;

      setTimeout(() => {
        const currentFilterResult = [];
        for (const learn2EarnAsset of filteredLearn2EarnAssets) {
          const stringifiedLearn2EarnAsset = JSON.stringify(learn2EarnAsset);
          if (stringifiedLearn2EarnAsset.indexOf(searchTerm) !== -1) {
            currentFilterResult.push(learn2EarnAsset);
          }
        }

        filteredLearn2EarnAssets = [...currentFilterResult];
        typingActive = false;
      }, 1000 * 1);
    }
  };

  const isWalletInvited = (walletAddress) => {
    const stringifiedInvitationTree = JSON.stringify(host);
    if (
      stringifiedInvitationTree.indexOf(walletAddress) === -1 && host.length !== undefined
    ) {
      return false;
    }
    return true;
  };
</script>

<Seo
  title="CULT Learn 2 Earn"
  description="We are a network of cultdao.io fans promoting freedom, fairness, education and love."
/>

<main class="container">
  <div class="text-center">
    <h1>CULT Assets Explorer</h1>
    <!-- <h2>CULT Learn 2 Earn</h2> -->
    <p><br /><br /></p>

    Here you can find and
    <a
      href="#addEducationAsset"
      class="whiteLink"
      on:click={changeShowValueCreatorForm}
    >
      add
    </a>
    CULT assets like videos, memes, pages & diagrams. <br />

    You can donate directly to those who added the asset.
    <p><br /><br /></p>

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
    Number of Results: {learn2EarnAssets.length}
    <p><br /></p>

    {#each filteredLearn2EarnAssets as learn2EarnAsset}
      <Asset {learn2EarnAsset} />
    {/each}

    <p><br /></p>

    <section id="addEducationAsset">
      <button on:click={() => changeShowValueCreatorForm()}>
        Add Your Education Asset
      </button>
      <p><br /></p>
      {#if showValueCreatorForm}
        <Metamask
          on:walletConnected={handleWalletConnected}
          showConnectedWallet={false}
        />
        <p><br /></p>
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
  .whiteLink {
    color: #efdcb3;
  }
  h1 {
    color: #d7c69d;
  }
</style>
