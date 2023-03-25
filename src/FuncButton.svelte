<script lang="ts">
  import { func } from "./stores";
  import type { FuncType } from "./types";

  export let action: FuncType;

  const names: Record<string, string> = {
    sin: "sin(x)",
    cos: "",
    tan: "",
    csc: "",
    sec: "",
    cot: "",
    ln: "",
    exp: "",
    logbase: "",
    arctan: ""
  }
</script>

<style>
  button {
    border-radius: 0.5rem;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #131313;
    cursor: pointer;
    transition: all 0.25s;
    color: var(--text-color);
  }

  .selected {
    background-color: hsl(237, 100%, 60%);
  }

  button:hover {
    border-color: #646cff;
  }
  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
</style>

<button class:selected={$func === action} on:click={() => $func = action}>{action}</button>
