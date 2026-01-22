<script lang="ts">
  import FuncButton from "./FuncButton.svelte";
  import { func } from "./stores";
  import functions, { actualFunctions, twoParams } from "./calculations";
  import NumberFormatter from "./NumberFormatter.svelte";

  let xVal = 0.5;
  let aVal = 2;

  // function formatNumber(num: number): string {
  //   const str = num.toString();

  //   if (!str.includes("e")) return str;
  // }

  $: approx = functions[$func](xVal, aVal);
  $: actual = actualFunctions[$func](xVal, aVal);
  $: percentError = Math.abs((approx - actual) / actual) * 100;
</script>

<div style="margin: 0 auto; width: fit-content;">
  <p class="section"><a href="explanations.pdf" target="_blank">See explanations</a></p>

  <div class="groups-container section">
    <div class="card">
      <p class="card-title">Trig</p>
      <FuncButton action="sin" />
      <FuncButton action="cos" />
      <FuncButton action="tan" />
      <FuncButton action="csc" />
      <FuncButton action="sec" />
      <FuncButton action="cot" />
      <FuncButton action="arctan" />
    </div>

    <div class="card">
      <p class="card-title">Other</p>
      <FuncButton action="ln" />
      <FuncButton action="logBase" />
      <FuncButton action="exp" />
      <FuncButton action="naturalExp" />
    </div>
  </div>

  <div class="inputs-container section">
    <div class="input-group">
      <p class="label">Value for x</p>
      <input type="number" step="0.1" bind:value={xVal} />
    </div>

    <div class="input-group" style={!twoParams[$func] ? "opacity: 40%;" : ""}>
      <p class="label">Value for b</p>
      <input type="number" bind:value={aVal} disabled={!twoParams[$func]} />
    </div>
  </div>

  <div class="card section" style="width: 100%;">
    <p class="num-label">Calculating</p>
    <p class="num">
      {#if $func === "exp"}
        b<sup>x</sup>
      {:else if $func === "logBase"}
        log<sub>b</sub>(x)
      {:else if $func == "naturalExp"}
        e<sup>x</sup>
      {:else}
        {$func}(x)
      {/if}
    </p>

    <p class="num-label">Approximated value</p>
    <p class="num">{approx}</p>

    <p class="num-label">Actual value</p>
    <p class="num">{actual}</p>

    <p class="num-label">Percent errorr</p>
    <p class="num">
      <!-- <NumberFormatter num={percentError} />% -->
      {percentError}%
    </p>
  </div>

  <div class="card" style="display: none;">
    <p class="card-title">Zoe's pictures</p>
    <img src="cherry.jpeg" height="350" alt="Mr. Cherry" />
    <img src="cherry_sad.jpeg" height="350" alt="Mr. Cherry" />
    <img src="christian_values.jpg" height="350" alt="Integrating Christian Values" />
  </div>
</div>

<style>
  .card {
    border: 1px solid gray;
    border-radius: 1rem;
    padding: 0.75rem;
    width: max-content;
  }

  .card-title {
    margin-bottom: 0.5em;
  }

  .groups-container {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  input[type="number"] {
    font-size: 1.5rem;
    border-radius: 1rem;
    border: 1px solid gray;
    padding: 0.35em 0.5em;
    background-color: rgb(59, 59, 59);
  }
  input[type="number"]:disabled {
    color: unset;
  }

  .label {
    margin-bottom: 0.25rem;
  }

  .inputs-container {
    display: grid;
    gap: 1rem;
    grid-auto-flow: column;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .section {
    margin-bottom: 2rem;
  }

  .num-label {
    margin-bottom: 0.05rem;
  }

  .num {
    font-family: 'Courier New', Courier, monospace;
    font-size: 3rem;
    font-weight: bold;
  }

  .num:not(:last-child) {
    margin-bottom: 0.3rem;
  }
</style>
