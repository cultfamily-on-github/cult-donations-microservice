<script>
  import Levels from "./components/texts/Levels.svelte";
  import Philosophy from "./components/texts/Philosophy.svelte";
  import HowItWorks from "./components/texts/HowItWorks.svelte";
  import ValueCreatorForm from "./components/ValueCreatorForm.svelte";
  import GameOfTheDayItem from "./components/GameOfTheDayItem.svelte";
  import GameProposalItem from "./components/archive-can-probably-be-deleted-soon/GameProposalItem.svelte";
  import GameOfThePastItem from "./components/archive-can-probably-be-deleted-soon/GameOfThePastItem.svelte";
  import Seo from "./Seo.svelte";
  import { fade, scale } from "svelte/transition";
  import { onMount } from "svelte";
  import { getLastMomentOfTodayFromDate, getDateFromString } from "./helpers";
  import { backendBaseURL } from "./stores";

  // import { CultGames } from "./stores";

  let learn2EarnAssets = [];
  let currentGameOfTheDay;
  let lastMomentOfToday;
  let showDetails = false;
  let showPhilosophy = false;
  let showMasterMode = false;
  let showProposalsMode = false;
  let showValueCreatorForm = false;
  let underConstructionMode = true;
  let visitorAlreadyProvedFancy = false;
  let todayIsTheDate = "";

  onMount(async () => {
    const response = await fetch(`${backendBaseURL}/api/v1/getLearn2EarnAssets`);

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

  const myThing = {
id: 12,
text: "Ensure the following hashtags are trending on Twitter today: #BanklessIsCULT #RumbleIsCULT #CULTDAO. You might want to do so by retweeting: https://twitter.com/Peer2peerE/status/1575232469774651392?s=20&t=29KAdI7wbOWaaw0XtLt6sw",
proposalDateUTC: "2022-10-07 08:30:15",
expiryDateUTC: "2022-10-08 00:00:00",
rating: 10,
proposedBy: "https://twitter.com/Peer2PeerE",
currentVisitorsVoteForItem: 0
}
</script>

<Seo
  title="CULT Learn 2 Earn"
  description="We are a network of cultdao.io fans promoting freedom, fairness, education and love."
/>

<main class="container">
  <div class="text-center">
    <h2>CULT Learn 2 Earn</h2>
    <p><br></p>

    Here you can find education assets around the CULT. <br>

    You can donate directly to the value creators. <p><br></p>
   
    {#each learn2EarnAssets as learn2EarnAsset}
      <GameOfTheDayItem item={myThing}></GameOfTheDayItem>
    {/each}

      <button on:click={() => changeShowDetails()}> Show Details </button>
      {#if showDetails}
        <HowItWorks />
      {/if}

      <p><br /></p>

      <button on:click={() => changeShowValueCreatorForm()}> Add Your Education Asset </button>
      {#if showValueCreatorForm}
        <ValueCreatorForm />
      {/if}

      <p><br /></p>

    
  </div>
</main>

<style>
</style>
