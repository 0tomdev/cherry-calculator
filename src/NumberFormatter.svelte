<script lang="ts">
  export let num: number;

  $: str = num.toString();
</script>

{#if !str.includes("e")}
  <span>{num}</span>
{:else}
  {@const [base, exp] = str.split("e")}
  <span>{base}
    <span style="margin: 0 -0.2em;">
      &times;
    </span>
    10<sup>{exp}</sup>
  </span>
{/if}