<script lang="ts">

  export let click: (() => void) | string;
  export let center: boolean = false;
  export let fluid: boolean = false;

  function onClick() {
    if (typeof click === "string") {
      const link = click as string;
      window.open(link);
    } else {
      const action = click as () => void;
      action();
    }
  }
</script>

<button
  type="button"
  on:click={onClick}
  class="{fluid ? 'fluid' : ''}"
  style="margin: {center ? '0 auto 0 auto' : '0'}"
>
  <slot />
</button>

<style>
  button {
    padding: 1.4rem 3rem 2rem 3rem;
    border-radius: 1rem;
    text-align: center;
    border: 0.25rem solid var(--color-primary);
    cursor: pointer;
    margin: 0 auto 0 auto;
    min-width: 20rem;
    background: transparent;
    color: var(--color-primary);
    font-family: var(--font-body-bold);
    font-size: inherit;
    /* display: inline-block; */
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
</style>
