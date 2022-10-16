<script>
  import ValueCreatorForm from "./components/ValueCreatorForm.svelte";
  import Asset from "./components/Asset.svelte";
  import Seo from "./Seo.svelte";
  import { onMount } from "svelte";
  import { backendBaseURL } from "./stores";
  import Invite from "./components/invitations/Invite.svelte";
  import Metamask from "./components/Metamask.svelte";
  import InvitationsTree from "./components/invitations/InvitationsTree.svelte";
  import { getInfoMessageToBeSigned } from "./helpers";

  // import Web3 from "web3";

  // import { fade, scale } from "svelte/transition";

  let learn2EarnAssets = [];
  let filteredLearn2EarnAssets = [];
  let showInviteForm = false;
  let searchTerm = "";
  let typingActive = false;
  let showValueCreatorForm = false;
  let showInvitationsTree = false;
  let publicWalletAddress = "";
  let web3;

  onMount(async () => getLearn2EarnAssets());

  const changeShowInvitationsTree = () => {
    showInvitationsTree = !showInvitationsTree;
  };
  const getLearn2EarnAssets = async () => {
    const urlToGetLearn2EarnAssets = `${backendBaseURL}/api/v1/getLearn2EarnAssets`;
    console.log(
      `fetching learn 2 earn assets from ${urlToGetLearn2EarnAssets}`
    );
    const response = await fetch(urlToGetLearn2EarnAssets);

    learn2EarnAssets = await response.json();
    filteredLearn2EarnAssets = [...learn2EarnAssets];
  };

  const handleNewAsset = () => {
    getLearn2EarnAssets();
    alert("Asset added successfully. Thank you for supporting the CULT.")
    showValueCreatorForm = false
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
    Number of Education Assets: {learn2EarnAssets.length}
    <p><br /></p>
    
    {#each filteredLearn2EarnAssets as learn2EarnAsset}
      <Asset {learn2EarnAsset} {web3}  />
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
