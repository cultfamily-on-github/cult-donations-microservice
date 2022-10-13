<script>
  import HowItWorks from "./components/texts/HowItWorks.svelte";
  import ValueCreatorForm from "./components/ValueCreatorForm.svelte";
  import Asset from "./components/Asset.svelte";
  import Seo from "./Seo.svelte";
  import { onMount } from "svelte";
  import { backendBaseURL } from "./stores";

  // import { fade, scale } from "svelte/transition";

  let learn2EarnAssets = [];
  let showDetails = false;
  let showValueCreatorForm = false;

  onMount(async () => {
    const response = await fetch(
      `${backendBaseURL}/api/v1/getLearn2EarnAssets`
    );

    learn2EarnAssets = await response.json();
  });

  const changeShowDetails = () => {
    showDetails = !showDetails;
    if (showDetails) {
      showValueCreatorForm = false;
    }
  };

  const changeShowValueCreatorForm = () => {
    showValueCreatorForm = !showValueCreatorForm;
    if (showValueCreatorForm) {
      showDetails = false;
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
    <a href="#addEducationAsset" class="whiteLink"> add </a>
    education assets around the CULT. <br />

    You can donate directly to the value creators.
    <p><br /></p>

    {#each learn2EarnAssets as learn2EarnAsset}
      <Asset item={learn2EarnAsset} />
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
        <ValueCreatorForm />
      {/if}
    </section>

    <p><br /></p>
  </div>
</main>

<style>
  .whiteLink{
    color: white
  }
</style>
