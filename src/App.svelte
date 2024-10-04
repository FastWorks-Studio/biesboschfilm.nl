<script lang="ts">
  import { onMount } from "svelte";
  import Button from "./components/Button.svelte";
  import Home from './routes/Home.svelte';
  import Sources from './routes/Sources.svelte';
  import Viewings from "./routes/Viewings.svelte";

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
        <img id="logo" src="assets/images/logo.svg" alt="De Biesbosch: Natuur in beweging" />
      </a>

      {#if page!=="/vertoningen"}
      <div class="call-to-action">
        <Button fluid={true} center={true} primary={true} click="vertoningen">Vertoningen</Button>
      </div>
      <div class="intro-buttons">
        <Button fluid={true} center={true} click="https://www.facebook.com/biesboschfilm">Like ons op Facebook</Button>
        <Button fluid={true} center={true} click="https://www.instagram.com/biesboschfilm/">Volg ons op Instagram</Button>
      </div>
      {/if}
    </section>
    
    {#if page==="/bronnen"}
        <Sources />
    {:else if page==="/vertoningen"}
        <Viewings />
    {:else}
        <div class="video trailer">
          <iframe style="width:{width}px; height:{width*(9/16)}px;" src="https://www.youtube.com/embed/5kNowmTTiUM?si=nO8iVXg3t0QMH0tu" title="Trailer (on YouTube)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
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
    opacity: 0.5;
    z-index: -10;
    filter: blur(0.5rem);
  }

  .intro {
    padding-bottom: 3rem;
    display: flex;
    flex-direction: column;
  }

  /* .call-to-action {
    
  } */

  .intro-buttons {
    display: flex;
    justify-content: space-between;
    gap: 3rem;
  }

  @media screen and (max-width: 1000px) {
    .intro-buttons {
      flex-direction: column;
      gap: 0;
    }
  }

  .trailer {
    align-self: center;
    padding: 0;
  }

</style>
