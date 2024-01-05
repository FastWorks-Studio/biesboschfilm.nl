<script lang="ts">
  export let click: (() => void) | string;
  export let center: boolean = false;
  export let fluid: boolean = false;

  function onClick() {
    if (typeof click === "string") {
      const link = click as string;
      if (link.startsWith("http://") || link.startsWith("https://")) {
        window.open(link);
      } else {
        window.location.href = link;
      }
    } else {
      const action = click as () => void;
      action();
    }
  }
</script>

<button
  type="button"
  on:click={onClick}
  class={`${fluid ? "fluid" : ""} ${center ? "center" : ""}`}
>
  <slot />
</button>

<style>
  button {
    padding: 2pt 10pt 4pt 10pt;
    border-radius: 8pt;
    text-align: center;
    border: 2.5pt solid var(--color-primary);
    cursor: pointer;
    background: transparent;
    color: var(--color-primary);
    font-family: var(--font-body-bold);
    font-size: inherit;
  }

  button:hover,
  button:active {
    background-color: var(--color-primary);
  }

  button:hover,
  button:active {
    color: var(--color-white);
  }

  .fluid {
    width: 100%;
  }
  .center {
    margin: 0 auto 0 auto;
  }
</style>
