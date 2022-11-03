<script>
  import ValueCreatorForm from "./components/ValueCreatorForm.svelte";
  import Asset from "./components/Asset.svelte";
  import UploadForm from "./components/UploadForm.svelte";
  // import FileUploadForm from "./components/FileUploadForm.svelte";
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
  let showQualifyForBeingInvitedInstructions = false;
  let showHome = true;
  let showPhilosophy = false;
  let showUploadFileToIPFS = false;
  let publicWalletAddress;
  let web3;
  let host;

  onMount(async () => {
    getAssetsFromServer();
    setTimeout(() => {
      // optimizing speed for first meaningful content display ... https://pagespeed.web.dev/
      getInvites();
    }, 1000 * 1);
  });

  let topNavClass = "topnav";

  function toggleTopNavCSSClass() {
    if (topNavClass === "topnav responsive") {
      topNavClass = "topnav";
    } else {
      topNavClass = "topnav responsive";
    }
  }

  const getAssetsFromServer = async () => {
    const urlToGetassets = `${backendBaseURL}/api/v1/getAssets`;
    console.log(`fetching assets from ${urlToGetassets}`);
    const response = await fetch(urlToGetassets);

    assets = await response.json();
    filteredassets = [...assets];
    filteredassets = shuffle(filteredassets);
  };

  const getInvites = async () => {
    const urlToGetInvitesFormatted = `${backendBaseURL}/api/v1/getInvites`;
    console.log(`fetching invites from ${urlToGetInvitesFormatted}`);
    const response = await fetch(urlToGetInvitesFormatted);

    host = await response.json();
  };

  const handleNewAsset = () => {
    getAssetsFromServer();
    alert("Link added successfully. Thank you for supporting the CULT.");
    showValueCreatorForm = false;
  };

  // const handleNewFile = () => {
  //   alert("File uploaded successfully. Thank you for supporting the CULT. Your added file will be visible once you reload this page.");
  //   showUploadFileToIPFS = false;
  // };

  const handleWalletConnected = async (event) => {
    // alert(`in handleWalletConnected`)
    publicWalletAddress = event.detail.publicWalletAddress;
    web3 = event.detail.web3;
  };

  const changeShowHome = () => {
    showHome = !showHome;
    if (showHome) {
      showQualifyForBeingInvitedInstructions = false;
      showInviteForm = false;
      showValueCreatorForm = false;
      showPhilosophy = false;
      showUploadFileToIPFS = false;
      
    }
  };

  const changeShowQualifyForBeingInvitedInstructions = () => {
    showQualifyForBeingInvitedInstructions =
      !showQualifyForBeingInvitedInstructions;
    if (showQualifyForBeingInvitedInstructions) {
      showHome = false;
      showInviteForm = false;
      showValueCreatorForm = false;
      showPhilosophy = false;
      showUploadFileToIPFS = false;
    }
  };

  const changeShowValueCreatorForm = () => {
    showValueCreatorForm = !showValueCreatorForm;
    if (showValueCreatorForm) {
      showHome = false;
      showInviteForm = false;
      showQualifyForBeingInvitedInstructions = false;
      showPhilosophy = false;
      showUploadFileToIPFS = false;
    }
    toggleTopNavCSSClass()
  };

  const changeShowInviteForm = () => {
    showInviteForm = !showInviteForm;
    if (showInviteForm) {
      showHome = false;
      showValueCreatorForm = false;
      showQualifyForBeingInvitedInstructions = false;
      showPhilosophy = false;
      showUploadFileToIPFS = false;
    }
    toggleTopNavCSSClass()
  };

  const changeShowPhilosophy = () => {
    showPhilosophy = !showPhilosophy;
    if (showPhilosophy) {
      showHome = false;
      showValueCreatorForm = false;
      showQualifyForBeingInvitedInstructions = false;
      showInviteForm = false;
      showUploadFileToIPFS = false;
    }
    toggleTopNavCSSClass()
  };

  const changeShowUploadFileToIPFS = () => {
    showUploadFileToIPFS = !showUploadFileToIPFS;
    if (showUploadFileToIPFS) {

      showHome = false;
      showValueCreatorForm = false;
      showQualifyForBeingInvitedInstructions = false;
      showInviteForm = false;
      showPhilosophy = false;
    }
    toggleTopNavCSSClass()
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

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
  // function getRandomArbitrary(min, max) {
  //   return Math.random() * (max - min) + min;
  // }

  const isWalletInvited = (walletAddress) => {
    const stringifiedInvitationTree = JSON.stringify(host);
    if (
      stringifiedInvitationTree !== undefined &&
      stringifiedInvitationTree.indexOf(walletAddress) === -1
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

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

<div class={topNavClass} id="myTopnav">
  <!-- svelte-ignore a11y-missing-attribute -->
  <a on:click={changeShowHome} class="active">Home</a>
  <!-- svelte-ignore a11y-missing-attribute -->
  <a on:click={changeShowValueCreatorForm}>Add Link</a>
  <!-- svelte-ignore a11y-missing-attribute -->
  <a on:click={changeShowInviteForm}>Invite Friends</a>
  <!-- svelte-ignore a11y-missing-attribute -->
  <a on:click={changeShowQualifyForBeingInvitedInstructions}
    >Qualify For Being Invited</a
  >
  <!-- svelte-ignore a11y-missing-attribute -->
  <a on:click={changeShowUploadFileToIPFS}>Upload File To IPFS</a>
  <!-- svelte-ignore a11y-missing-attribute -->
  <a on:click={changeShowPhilosophy}>Philosophy</a>
  <a
    href="https://github.com/cultfamily-on-github/cult-donations-microservice/issues/new"
    target="_blank"
    class="linkChampagne">Give Feedback</a
  >
  <!-- svelte-ignore a11y-missing-attribute -->
  <a class="icon" on:click={toggleTopNavCSSClass}>
    <i class="fa fa-bars" />
  </a>
</div>

<main class="container">
  <div class="text-center">
    {#if showHome}
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
    {/if}

    <p><br /></p>

    <section id="addEducationAsset">
      {#if showValueCreatorForm}
        <Metamask
          on:walletConnected={handleWalletConnected}
          showConnectedWallet={false}
        />

        {#if publicWalletAddress !== "" && publicWalletAddress !== undefined && isWalletInvited(publicWalletAddress)}
          <ValueCreatorForm
            on:newAsset={handleNewAsset}
            on:walletConnected={handleWalletConnected}
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
    </section>

    <p><br /></p>

    <section id="qualifyForBeingInvited">
      {#if showQualifyForBeingInvitedInstructions}
        <p><br /></p>
        Every wallet can invite maximum 5 further wallets.<br />
        If you are not invited yet, you might consider quote tweeting:
        <a
          href="https://twitter.com/Peer2peerE/status/1582845604329582593?s=20&t=uwn0dTKHXYbjVx2ZxzR5Jg"
          target="_blank"
          class="linkChampagne"
        >
          this tweet</a
        >
        and adding a public wallet address which you would like to use to receive
        donations -
        <a
          href="https://twitter.com/Peer2peerE/status/1582863692403593216?s=20&t=uwn0dTKHXYbjVx2ZxzR5Jg"
          target="_blank"
          class="linkChampagne">example</a
        >.
        <p><br /></p>
      {/if}
    </section>

    <p><br /></p>

    <section id="philosophy">
      {#if showUploadFileToIPFS}
        <Metamask
          on:walletConnected={handleWalletConnected}
          showConnectedWallet={false}
        />

        <p><br /></p>
        <UploadForm
          on:newAsset={handleNewAsset}
          {assets}
          {web3}
          {publicWalletAddress}
        />

        <p><br /></p>
        <p><br /></p>
      {/if}
    </section>

    <p><br /></p>

    <section id="philosophy">
      {#if showPhilosophy}
        <p><br /></p>
        Nobody can prevent us humans from giving something to someone for free.<br
        />
        Let's create a system where people donate valuable things to each other.
        <br />
        There will be a mechanism to reward those who donate - leveraging quadratic
        donations (inspired by quadratic funding) and or recursive donations along
        the invitation tree-branch.
        <p><br /></p>
      {/if}
    </section>

    <p><br /></p>

  </div>
</main>

<style>
  .assetsArea {
    max-height: 140vh;
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

  .topnav {
    overflow: hidden;
    background-color: black;
  }

  .topnav a {
    float: left;
    display: block;
    color: #efdcb3;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
  }

  .topnav a:hover {
    background-color: #efdcb3;
    color: black;
  }

  .topnav a.active {
    background-color: #efdcb3;
    color: black;
  }

  .topnav .icon {
    display: none;
  }

  @media screen and (max-width: 600px) {
    .topnav a:not(:first-child) {
      display: none;
    }
    .topnav a.icon {
      float: right;
      display: block;
    }
  }

  @media screen and (max-width: 600px) {
    .topnav.responsive {
      position: relative;
    }
    .topnav.responsive .icon {
      position: absolute;
      right: 0;
      top: 0;
    }
    .topnav.responsive a {
      float: none;
      display: block;
      text-align: left;
    }
  }
</style>
