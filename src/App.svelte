<script lang="ts">
  import { onMount } from "svelte";
  import Button from "./components/Button.svelte";
  import Home from './routes/Home.svelte';
  import Sources from './routes/Sources.svelte';

  $: innerWidth = 0;
  $: width = Math.min(
    Math.max(window.innerWidth, window.innerHeight) * 0.5,
    Math.max(innerWidth, 300)
  );

  $: videoUrl = getVideoUrl();
  onMount(onResize);

  function onResize() {
    const newVideoUrl = getVideoUrl();
    if (newVideoUrl == videoUrl) return;
    videoUrl = newVideoUrl;
  }

  function getVideoUrl() {
    const orientation =
      window.innerHeight > window.innerWidth ? "portrait" : "landscape";
    return `./assets/video/bg_${orientation}.mp4`;
  }

  let page = document.location.pathname;
  window.onpopstate = function() {
    page = document.location.pathname;
  };
</script>

<main style="width:{width}px">
  <video preload="none" src={videoUrl} autoplay muted loop playsinline />
  <content>

    <section class="intro">
      <a id="escape-hatch" href="/">
        <img id="logo" src="assets/images/logo.svg" alt="De Biesbosch: Grootse natuur in een klein land" />
      </a>
      <Button fluid={true} center={true} click="https://www.facebook.com/biesboschfilm">Like ons op Facebook</Button>
    </section>
    
    {#if page==="/bronnen"}
        <Sources />
    {:else}
        <Home />
    {/if}

  </content>
</main>
<svelte:window on:resize={onResize} bind:innerWidth />

<style>
  main {
    margin: auto;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: stretch;
    padding: 4rem;
    width: 100vw;
    justify-content: center;
  }

  content {
    padding-top: 2rem;
    position: relative;
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 2rem;
  }

  video {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    opacity: 0.2;
    z-index: -10;
    filter: blur(1rem);
  }

  .intro {
    padding-bottom: 6rem;
  }
</style>
