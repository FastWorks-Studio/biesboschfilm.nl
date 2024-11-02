<script lang="ts">

  import { onMount } from 'svelte';

  export let click: (() => void) | string;
  export let center: boolean = false;
  export let fluid: boolean = false;
  export let primary: boolean = false;
  export let noMargin: boolean = false;
  export let contrast: boolean = false;
  export let fixedWidth: boolean = false;
  let dataLink: string;

  onMount(() => {
    if (typeof click === "string" && (click.startsWith('http://') || click.startsWith('https://'))) {
      dataLink = click;
    }
  });

  $: if (typeof click === "string" && (click.startsWith('http://') || click.startsWith('https://'))) {
    dataLink = click;
  }

  function onClick() {
    if (typeof click === "string") {
      const link = click as string;
      if (link.startsWith('http://') || link.startsWith('https://')) {
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
  class:fluid
  class:primary
  class:contrast
  class:noMargin
  class:center
  class:fixedWidth
  data-link="{dataLink}"
>
  <slot />
</button>

<style>
  button {
    padding: 2rem 3rem 2rem 3rem;
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
    margin: 0 0 3rem 0;
  }

  button.center {
    margin: 0 auto 3rem auto;
  }

  button.noMargin {
    margin: 0!important;
  }

  button.fixedWidth {
    width: 23rem!important;
  }

  button:hover,
  button:active {
    background-color: var(--color-primary);
    color: var(--color-white);
  }

  .fluid {
    width: 100%;
  }

  .primary {
    background-color: var(--color-primary);
    color: var(--color-white);
  }

  .contrast {
    background-color: var(--color-contrast);
    border-color: var(--color-contrast);
    color: var(--color-white);
  }
  button.contrast:hover,
  button.contrast:active {
    background-color: var(--color-contrast);
    color: var(--color-white);
  }
</style>
