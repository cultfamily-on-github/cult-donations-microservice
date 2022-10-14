<script>
  import ValueCreatorForm from "./components/ValueCreatorForm.svelte";
  import Asset from "./components/Asset.svelte";
  import Seo from "./Seo.svelte";
  import { onMount } from "svelte";
  import { backendBaseURL } from "./stores";

  // import { fade, scale } from "svelte/transition";

  let assetInfoCollection = [];
  let filteredAssetInfoCollection = [];
  let showDetails = false;
  let searchTerm = "";
  let typingActive = false;
  let showValueCreatorForm = false;

  onMount(async () => getAssetInfoCollection());

  const getAssetInfoCollection = async () => {
    const urlToGetAssetInfoCollection = `${backendBaseURL}/api/v1/getAssetInfoCollection`;
    console.log(`fetching assetInfoCollection from ${urlToGetAssetInfoCollection}`)
    const response = await fetch(urlToGetAssetInfoCollection);

    assetInfoCollection = await response.json();
    filteredAssetInfoCollection = [...assetInfoCollection]
  };

  const handleNewAsset = () => {
    getAssetInfoCollection();
  };

  const changeShowValueCreatorForm = () => {
    showValueCreatorForm = !showValueCreatorForm;
    if (showValueCreatorForm) {
      showDetails = false;
    }
  };

  const setShowValueCreatorForm = () => {
    showValueCreatorForm = true;
  };

  const onKeyDown = () => {
    filteredAssetInfoCollection = [...assetInfoCollection]
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
      }, 1000 * 1.7);
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
    <!-- svelte-ignore a11y-missing-attribute -->
    <a
      href="#addEducationAsset"
      class="whiteLink"
      on:click={setShowValueCreatorForm}
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

    hallo {filteredAssetInfoCollection.length}
    {#each filteredAssetInfoCollection as assetInfo}
      <Asset {assetInfo} />
    {/each}

    <!-- <button on:click={() => changeShowDetails()}> Show Details </button>
      {#if showDetails}
        <HowItWorks />
      {/if} -->

    <p><br /></p>

    <section id="addEducationAsset">
      <button on:click={() => changeShowValueCreatorForm()}>
        Add Your Education Asset
      </button>
      {#if showValueCreatorForm}
        <ValueCreatorForm on:newAsset={handleNewAsset} />
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
