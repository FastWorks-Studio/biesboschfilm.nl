<script lang="ts">
  import Button from "../components/Button.svelte";
  import cinemas from "../shared/viewings";

  const dateFormatOptions = {
    weekday: 'short', // "di" for "Dinsdag"
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // 24-hour format
  };

  const now = new Date();

  // Separate future and past viewings
  const futureCinemas = cinemas.map(cinema => ({
    ...cinema,
    viewings: cinema.viewings
      .map(viewing => {
        if (!(viewing.datetime instanceof Date)) {
          viewing.datetime = new Date(viewing.datetime);
        }
        return viewing;
      })
      .filter(viewing => viewing.datetime > now)
  })).filter(cinema => cinema.viewings.length > 0);

  const pastCinemas = cinemas.map(cinema => ({
    ...cinema,
    viewings: cinema.viewings
      .map(viewing => {
        if (!(viewing.datetime instanceof Date)) {
          viewing.datetime = new Date(viewing.datetime);
        }
        return viewing;
      })
      .filter(viewing => viewing.datetime <= now)
  })).filter(cinema => cinema.viewings.length > 0);
</script>

<h1>Vertoningen</h1>

<p><em>De Biesbosch: Natuur in beweging</em> is nu te zien in verschillende bioscopen. De lijst met bioscopen en data zal nog verder groeien, dus houd onze site en socials in de gaten.</p>

<p><strong>Wijzigingen voorbehouden</strong></p>

<div class="cinema-list">
  <p>Snel naar een bioscoop:</p>
  {#each futureCinemas as cinema, index}
    <a href="#{cinema.id}">{cinema.location} • {cinema.name}</a>
    {#if index < (futureCinemas.length-1)} |&nbsp;{/if}
  {/each}
</div>

{#each futureCinemas as cinema}
  <div class="cinema">
    <h3 id="{cinema.id}">{cinema.location} • {cinema.name}</h3>

    <ul class="viewings">
      {#each cinema.viewings as viewing}
        <li class="viewing">
          <div class="date-and-location">
            <span class="date">{Intl.DateTimeFormat('nl-NL', dateFormatOptions).format(viewing.datetime)}</span>
          </div>
          <div class="buy">
            {#if viewing.type === 'Available'}
              <Button fixedWidth noMargin primary click="{viewing.url}">Bestel kaarten</Button>
            {:else if viewing.type === 'LastTickets'}
              <Button fixedWidth noMargin contrast click="{viewing.url}">Laatste kaarten</Button>
            {:else if viewing.type === 'SoldOut'}
              <div class="not-available sold-out">Uitverkocht</div>
            {:else if viewing.type === 'NotYetAvailable'}
              <div class="not-available">Nog niet beschikbaar</div>
            {/if}
          </div>
        </li>
      {/each}
    </ul>
  </div>
{/each}

<p>Ook de volgende bioscopen zullen de film vertonen. De datums voor deze bioscopen volgen nog.</p>
<ul>
  <li>Geldermalsen • Filmtheater Lingefilm</li>
</ul>

{#if pastCinemas.length > 0}
<h2>Verleden vertoningen</h2>

<p>De volgende vertoningen zijn al geweest.</p>

{#each pastCinemas as cinema}
  <div class="cinema">
    <h3>{cinema.location} • {cinema.name}</h3>

    <ul class="viewings">
      {#each cinema.viewings as viewing}
        <li class="viewing">
          <div class="date-and-location">
            <span class="date">{Intl.DateTimeFormat('nl-NL', dateFormatOptions).format(viewing.datetime)}</span>
          </div>
        </li>
      {/each}
    </ul>
  </div>
{/each}
{/if}

<style>
  .cinema:first-of-type {
    margin-top: 3rem;
  }

  .cinema > h3 {
    margin-bottom: 2rem;
  }

  .viewings {
    display: flex;
    flex-direction: column;
    margin: 0 0 4rem 0;
    padding: 0;
  }

  .viewing {
    list-style: none;
    display: flex;
    flex-direction: row;
    margin: 0 0 2rem 0;
    justify-content: center;
  }

  .date-and-location {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }

  .date {
    font-weight: bold;
  }

  .buy {
    flex-shrink: 0;
    display: flex;
    height: 10rem;
    justify-content: center;
    align-items: center;
    width: 26rem;
  }

  .sold-out {
    padding: 2.5rem 3rem;
    border-radius: 1rem;
    text-align: center;
    background-color: var(--color-disabled);
    cursor: pointer;
    min-width: 20rem;
    color: var(--color-white);
    font-family: var(--font-body-bold);
    font-size: inherit;
    width: 23rem !important;
  }

  .cinema-list {
    margin-bottom: 3rem;
  }

  .cinema-list > p {
    margin-bottom: 0;
  }

  @media screen and (max-width: 1000px) {
    .viewings {
      border-bottom: 1px solid var(--color-white);
    }
    .viewing {
      flex-direction: column;
      padding-bottom: 2rem;
      margin-bottom: 4rem;
    }
    .buy {
      margin-top: 2rem;
      justify-content: left;
      align-items: flex-start;
      height: auto;
    }
  }
</style>