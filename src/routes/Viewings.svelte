<script lang="ts">
  import Button from "../components/Button.svelte";
</script>

<h1>Vertoningen</h1>

<p><em>De Biesbosch: Natuur in beweging</em> is vanaf 5 november te zien in verschillende bioscopen. De lijst met bioscopen en data zal nog verder groeien, dus houd onze site en socials in de gaten.</p>

<p><strong>Wijzigingen voorbehouden</strong></p>

<ul class="viewings">
  <li class="viewing">
    <div class="date-and-location">
      <span class="date">di 5 november 2024 19:30</span>
      <span class="location">Cinerama Rotterdam, Wildlife Film Festival Rotterdam</span>
    </div>
    <div class="buy">
      <Button noMargin primary click="https://wffr.nl/movies/de-biesbosch-natuur-in-beweging/">Bestel kaarten</Button>
    </div>
  </li>

  <li class="viewing">
    <div class="date-and-location">
      <span class="date">do 7 november 2024 13:00</span>
      <span class="location">Cinerama Rotterdam, Wildlife Film Festival Rotterdam</span>
    </div>
    <div class="buy">
      <Button noMargin primary click="https://wffr.nl/movies/de-biesbosch-natuur-in-beweging/">Bestel kaarten</Button>
    </div>
  </li>

  <li class="viewing">
    <div class="date-and-location">
      <span class="date">vr 8 november 2024 20:30</span>
      <span class="location">Cinerama Rotterdam, Wildlife Film Festival Rotterdam</span>
    </div>
    <div class="buy">
      <Button noMargin primary click="https://wffr.nl/movies/de-biesbosch-natuur-in-beweging/">Bestel kaarten</Button>
    </div>
  </li>

  <li class="viewing">
    <div class="date-and-location">
      <span class="date">di 12 november 2024</span>
      <span class="location">De Witt Dordrecht</span>
    </div>
    <div class="buy">
      <div class="not-available">Nog niet beschikbaar</div>
    </div>
  </li>

  <li class="viewing">
    <div class="date-and-location">
      <span class="date">wo 13 november 2024</span>
      <span class="location">Chassé Theater Breda</span>
    </div>
    <div class="buy">
      <div class="not-available">Nog niet beschikbaar</div>
    </div>
  </li>

  <li class="viewing">
    <div class="date-and-location">
      <span class="date">do 14 november 2024</span>
      <span class="location">Heerenstraat Theater Wageningen</span>
    </div>
    <div class="buy">
      <div class="not-available">Nog niet beschikbaar</div>
    </div>
  </li>

  <li class="viewing">
    <div class="date-and-location">
      <span class="date">vr 15 november 2024</span>
      <span class="location">Heerenstraat Theater Wageningen</span>
    </div>
    <div class="buy">
      <div class="not-available">Nog niet beschikbaar</div>
    </div>
  </li>

  <li class="viewing">
    <div class="date-and-location">
      <span class="date">za 16 november 2024</span>
      <span class="location">De Witt Dordrecht</span>
    </div>
    <div class="buy">
      <div class="not-available">Nog niet beschikbaar</div>
    </div>
  </li>

  <li class="viewing">
    <div class="date-and-location">
      <span class="date">zo 17 november 2024</span>
      <span class="location">Heerenstraat Theater Wageningen</span>
    </div>
    <div class="buy">
      <div class="not-available">Nog niet beschikbaar</div>
    </div>
  </li>

  <li class="viewing">
    <div class="date-and-location">
      <span class="date">zo 17 november 2024</span>
      <span class="location">Chassé Theater Breda</span>
    </div>
    <div class="buy">
      <div class="not-available">Nog niet beschikbaar</div>
    </div>
  </li>

  <li class="viewing">
    <div class="date-and-location">
      <span class="date">ma 18 november 2024</span>
      <span class="location">Focus Arnhem</span>
    </div>
    <div class="buy">
      <div class="not-available">Nog niet beschikbaar</div>
    </div>
  </li>

  <li class="viewing">
    <div class="date-and-location">
      <span class="date">di 19 november 2024</span>
      <span class="location">De Witt Dordrecht</span>
    </div>
    <div class="buy">
      <div class="not-available">Nog niet beschikbaar</div>
    </div>
  </li>

  <li class="viewing">
    <div class="date-and-location">
      <span class="date">di 19 november 2024</span>
      <span class="location">Chassé Theater Breda</span>
    </div>
    <div class="buy">
      <div class="not-available">Nog niet beschikbaar</div>
    </div>
  </li>

  <li class="viewing">
    <div class="date-and-location">
      <span class="date">di 26 november 2024</span>
      <span class="location">Louis Hartlooper Complex Utrecht</span>
    </div>
    <div class="buy">
      <div class="not-available">Nog niet beschikbaar</div>
    </div>
  </li>
</ul>

<p>Ook de volgende bioscopen zullen de film vertonen. De datums voor deze bioscopen volgen nog.</p>
<ul>
  <li>Filmhuis Cine7 • Zevenbergen</li>
  <li>Filmtheater Lingefilm • Geldermalsen</li>
  <li>Cinecitta • Tilburg</li>
  <li><a href="https://www.landvast.nl/movies/2821/17/de_biesbosch_natuur_in_beweging" target="_blank">Landvast • Alblasserdam</a></li>
</ul>

<style>
  .viewings {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
  }

  .viewing {
    list-style: none;
    display: flex;
    flex-direction: row;
    margin: 0 0 5rem 0;
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
</style>