<script lang="ts">
  import Button from "../components/Button.svelte";
</script>

<div class="original-music">
  <h2>Originele muziek uit de film, <em>Stromingen</em>, nu overal te streamen</h2>

  Het slotlied van de film, Stromingen, is nu overal te streamen.

  <div class="double-button-group">
    <Button fluid={true} center={true} click="https://open.spotify.com/track/2cUDH6iamun1Cli6IET0l3?si=4d56dbeab9b04eb0">Luister op Spotify</Button>
    <Button fluid={true} center={true} click="https://www.youtube.com/watch?v=6AK6iRN-jWk">Luister op YouTube</Button>
  </div>

  <p>Ook te luisteren op <a href="https://music.apple.com/nl/album/stromingen/1777660248?i=1777660309" target="_blank">Apple Music</a>.</p>

  <figure class="photo">
    <img src="assets/images/stromingen-cover.png" alt="Albumhoes van Stromingen, originele muziek voor de film van Coen Koopmans en Kevin van den Hoek" />
    <figcaption>Albumhoes van <em>Stromingen</em>.</figcaption>
  </figure>

</div>

<div class="synopsis">
  <h2>Over de film</h2>

  <p>In De Biesbosch: Natuur in beweging krijgt u een kijkje in het leven van de dieren die in de Biesbosch voorkomen. Ook krijgt u het verhaal en de geschiedenis van dit gebied te horen; er is in de loop der jaren veel veranderd.  De aangewezen persoon om ons te helpen dit in beeld te brengen is oud-boswachter Jacques van der Neut. Dankzij zijn tientallen jaren Biesbosch-ervaring en kennis weten we precies wat belangrijk is om te vertellen en te laten zien.</p>
  <p>De Biesbosch is een zoetwatergetijdengebied, dat is uniek op wereldschaal. Na honderden jaren gebruikt te zijn voor industriële doeleinden is het sinds 1994 een nationaal park geworden. Sindsdien is de natuur echt tot bloei gekomen. Als je in de Biesbosch bent voel je meteen de rust en ga je op in de natuur. Wij vinden dit een groot goed en laten mensen graag zien en voelen hoe mooi het is, zowel in de bioscoop als thuis.</p>

  <p>De film ging in première op 5 november 2024 op het <a target="_blank" href="https://wffr.nl/movies/de-biesbosch-natuur-in-beweging/">Wildlife Film Festival Rotterdam (WFFR)</a> in november 2024, en is <a target="_blank" href="https://wffr.nl/professionals-en/nominees-en/">daar genomineerd in de categorie beste onafhankelijke productie</a>.</p>

  <em>De Biesbosch: Natuur in beweging</em> heeft tussen november 2024 en maart 2025 gedraaid in bioscopen door het hele land.

  De film is nu te zien via <a href="https://www.pathe-thuis.nl/film/36989/de-biesbosch-natuur-in-beweging" target="_blank">Pathé Thuis</a>. We bieden Nederlandse en Engelse ondertiteling aan.

  <div class="double-button-group">
    <Button fluid={true} center={true} primary={false} click="vertoningen">Verleden vertoningen</Button>
  </div>
</div>

<section class="waarom">
  <h2>Waarom een film over de Biesbosch?</h2>

  <p>Na het maken van onze vorige film, <a href="https://www.dordtfilm.nl" target="_blank">Dordrecht door de jaren heen</a>, hebben we onze passie ontdekt voor het maken van documentaires en zijn onze ogen geopend voor de prachtige natuur van de Biesbosch. De aangewezen persoon om ons te helpen dit in beeld te brengen is oud-boswachter Jacques van der Neut. Dankzij zijn tientallen jaren Biesbosch-ervaring en kennis weten we precies wat belangrijk is om te vertellen en te laten zien.</p>

  <p>De Biesbosch is een zoetwatergetijdengebied, dat is uniek op wereldschaal. Na honderden jaren gebruikt te zijn voor industriële doeleinden is het sinds 1994 een nationaal park geworden. Sindsdien is de natuur echt tot bloei gekomen. Als je in de Biesbosch bent voel je meteen de rust en ga je op in de natuur. Wij vinden dit een groot goed en laten mensen graag zien en voelen hoe mooi het is, zowel in de bioscoop als thuis.</p>

  <figure class="photo">
    <img src="assets/images/filmen.jpg" alt="Bas en Jacques in de Biesbosch" />
    <figcaption>Van zonsopkomst tot zonsondergang: Bas en Jacques zijn op allerlei momenten in de Biesbosch te vinden.</figcaption>
  </figure>
</section>

<section class="wie-zijn-wij">
  <h2>Wie zijn wij?</h2>
  
  <p>Ons team bestaat uit:</p>

  <ul>
    <li>
      <a href="https://www.baskakes.nl" target="_blank">Bas Kakes</a>
      - filmregisseur, cameraman, en video-editor. Hij is een geboren Dordtenaar en ziet de Biesbosch als zijn verlengde achtertuin.
    </li>
    <li>
      <a href="https://www.fotoneut.nl" target="_blank">Jacques van der Neut</a>
      - gepensioneerd boswachter, Biesbosch-expert, auteur, en fotograaf. Hij heeft 38 jaar voor Staatsbosbeheer gewerkt in de Biesbosch als boswachter.
    </li>
    <li>
      <a href="https://www.linkedin.com/in/coen-koopmans-3b15519a/" target="_blank">Coen Koopmans</a>
      - presenteert en schrijft het script. Hij doet onderzoek om zeker te zijn dat wat er verteld wordt ook klopt.</li>
    <li>
      <a href="https://www.linkedin.com/in/kevin-van-den-hoek-9302b8145/" target="_blank">Kevin van den Hoek</a>
      - grafisch ontwerper. Hij maakt de visuals en zorgt dat alles mooi afgewerkt is.
    </li>
  </ul>

  <p>Samen zijn wij <em>FastWorks</em>.</p>

  <p>
    Daarnaast werken wij samen met <a target="_blank" href="https://www.linkedin.com/in/bas-bakker-1887b025/">Bas Bakker</a> van <a href="https://playbackimages.com" target="_blank">Playback Images</a>.
    Hij zorgt voor productie en distributie van de film.
    <a href="https://playbackimages.com" target="_blank"><img src="assets/images/playback-images-logo.png" alt="Logo van Playback Images" id="playback-images-logo" /></a>
  </p>

  <figure class="photo">
    <img src="assets/images/biesbosch-jacques.jpg" alt="Jacques wordt gefilmd." />
    <figcaption>Gepensioneerd boswachter Jacques van der Neut deelt zijn visie over de Biesbosch.</figcaption>
  </figure>

  <figure class="photo">
    <img src="assets/images/biesbosch-bever.png" alt="Een zwemmende bever in de Biesbosch." />
    <figcaption>Ook het icoon van de Biesbosch komt aan bod: de bever.</figcaption>
  </figure>

  <figure class="photo">
    <img src="assets/images/telelens.jpg" alt="Bas met een camera met een grote telelens." />
    <figcaption>Er moet in alle seizoenen en weersomstandigheden gefilmd worden.</figcaption>
  </figure>

</section>

<section>
  <h2>Tot op de bodem uitgezocht</h2>
  
  <p>Om er zeker van te zijn dat we het juiste verhaal vertellen hebben we alles grondig uitgezocht. Alle gemaakte claims worden onderbouwd met (wetenschappelijke) bronnen. Zo zorgen we ervoor dat we recht doen aan het verhaal.</p>

  <Button click="bronnen">Bekijk volledige bronnenlijst</Button>
</section>

<section>
  <h2>Crowdfunding</h2>

  <p>
    We hebben via voordekunst.nl
    <a href="https://www.voordekunst.nl/projecten/14768-natuurdocumentaire-over-de-biesbosch-1" target="_blank">een succesvolle crowfundingcampagne</a>
    afgerond. We zijn ontzettend blij met alle steun!
  </p>
</section>

<section>
  <h2>In de media</h2>

  <p>
    <span class="date">4 november 2024</span>
    RTV Dordrecht schrijft over onze besloten voorpremière.
    <a target="_blank" rel="noreferrer noopener" href="https://www.rtvdordrecht.nl/nieuws/stad/de-biesbosch-in-al-haar-glorie-als-documentaire-op-het-witte-doek">Lees het hier.</a>
  </p>

  <p>
    <span class="date">4 november 2024</span>
    Dordrecht.net schrijft over onze besloten voorpremière.
    <a target="_blank"rel="noreferrer noopener" href="https://www.dordrecht.net/nieuws/110898/sneaky-preview-van-de-documentaire-de-biesbosch-natuur-in-beweging-in-filmtheater-dewitt">Lees het hier.</a>
  </p>

  <p>
    <span class="date">7 oktober 2024</span>
    In het AD wordt aandacht besteed aan het af zijn van onze film en wat Bas en Jacques zoal gezien hebben.
    <a href="https://www.ad.nl/dordrecht/documentairefilm-over-de-biesbosch-na-vier-jaar-klaar-en-bijna-in-premiere-bevers-zwommen-om-onze-boot~a8656b47/" target="_blank" rel="noreferrer noopener">
      Lees het hier.
    </a>
  </p>

  <p>
    <span class="date">4 februari 2023</span>
    Op zaterdagochtend 4 februari 2023 waren Bas en Jacques te horen op Radio Rijnmond in het programma
    <em>Chris Natuurlijk</em>.
    <a href="https://www.rijnmond.nl/nieuws/1611636/chris-natuurlijk-van-4-februari-make-a-wish" target="_blank" rel="noreferrer noopener">Klik hier voor meer informatie.</a>
    Dit interview is in <a href="https://podcasts.apple.com/nl/podcast/chris-natuurlijk/id356338103?l=en" target="_blank" rel="noreferrer noopener">hun podcast terug te luisteren</a>.
  </p>
  <figure class="photo">
    <img src="assets/images/jacques-rijnmond.jpg" alt="Jacques wordt geïnterviewd." />
    <figcaption>Jacques in gesprek met Chris van Radio Rijnmond.</figcaption>
  </figure>

  <p>
    <span class="date">3 februari 2023</span>
    RTV Dordrecht ging met ons op pad en wilde meer weten over deze film.
    <a href="https://www.rtvdordrecht.nl/nieuws/natuur/crowdfundingsactie-gestart-voor-natuurdocumentaire-over-de-biesbosch" target="_blank" rel="noreferrer noopener">
      Bekijk het hier.
    </a>
  </p>

  <p>
    <span class="date">25 januari 2023</span>
    Het AD schreef over onze film en crowdfunding,
    <a href="https://www.ad.nl/dordrecht/bas-start-crowdfunding-om-natuurdocu-over-biesbosch-af-te-kunnen-maken-grootse-natuur-in-een-klein-land~a1e15a649/" target="_blank">klik hier om het terug te lezen</a>.
  </p>
</section>

<figure class="photo">
  <img src="assets/images/porseleinhoen.jpg" alt="Een porseleinhoen loopt door ondiep water." />
  <figcaption>Het porseleinhoen laat zich even zien.</figcaption>
</figure>

<figure class="photo">
  <img src="assets/images/zeearend.jpg" alt="Een zeearend." />
  <figcaption>De zeearend, ook wel bekend als "de vliegende deur".</figcaption>
</figure>

<figure class="photo">
  <img src="assets/images/drone.jpg" alt="De Biesbosch zoals gezien vanuit onze drone; water en een paar stukken groen." />
  <figcaption>Met een drone laten we de hele Biesbosch in vogelvlucht zien.</figcaption>
</figure>

<figure class="photo">
  <img src="assets/images/ijsvogel.jpg" alt="Een ijsvogel heeft een baby snoek gevangen." />
  <figcaption>Deze ijsvogel heeft een baby snoek gevangen.</figcaption>
</figure>

<figure class="photo">
  <img src="assets/images/water.jpg" alt="Hoog water in de Noordwaard." />
  <figcaption>Als het water in de rivier te hoog staat, stroomt het overtollige water de Noordwaard in.</figcaption>
</figure>

<section>
  <h2>Met dank aan</h2>

  <p>We zijn erg blij met al onze donateurs, waaronder:</p>

  <figure class="photo sponsor-logo">
    <img src="assets/images/stichting-mastboom-brosens-logo.png" alt="Logo van De Mastboom Brosens Stichting" />
    <figcaption><a href="https://mastboomhuis.nl/de-stichting/" target="_blank">De Mastboom Brosens Stichting</a></figcaption>
  </figure>

  <ul>
    <li><a
      href="https://www.staatsbosbeheer.nl"
      target="_blank"
    >
    Staatsbosbeheer
    </a></li>
    <li><a
      href="https://www.biesboschstreekfonds.nl"
      target="_blank"
    >
    Stichting Biesbosch Streekfonds
    </a></li>
    
    <li><a
      href="https://www.dordrecht.nl"
      target="_blank"
    >
    Gemeente Dordrecht
    </a></li>

    <li><a
      href="https://www.freenature.nl"
      target="_blank"
    >
    FREE Nature
    </a></li>

    <li><a
      href="https://zilvermeeuw.nl"
      target="_blank"
    >
    Rondvaartbedrijf Zilvermeeuw
    </a></li>

    <li><a
      href="https://www.cultuurfonds.nl"
      target="_blank"
    >
    Het Cultuurfonds
    </a></li>
    
    <li><a
      href="https://www.fysio-dubbeldam.nl"
      target="_blank"
    >
    Fysiotherapie Dubbeldam
    </a></li>

    <li><a
      href="https://www.vdkm-bv.nl"
      target="_blank"
    >
    van Dijk-Kuiper Medical B.V.
    </a></li>

    <li><a
      href="https://wilgenpaard.nl"
      target="_blank"
    >
    Het Wilgenpaard
    </a></li>

    <li><a
      href="https://drijfdordrecht.nl"
      target="_blank"
    >
    DRIJF Dordrecht
    </a></li>

    <li><a
      href="https://www.ontdekdordrecht.com"
      target="_blank"
    >
    Ontdek Dordrecht
    </a></li>
  </ul>
</section>

<section>
  <h2>Vragen, persaanvragen en filmdistributie</h2>
  <Button click="mailto:bas@playbackimages.com?subject=Biesbosch film"
    >Mail Playback Images</Button
  >
</section>

<style>
  h2 {
    padding-top: 0rem;
  }

  section {
    width: 100%;
    height: auto;
    margin: 0;
    padding: 0;
  }

  .photo {
    margin: 1rem -4rem 4rem -4rem;
    height: auto;
    width: calc(100% + 8rem);
    object-fit: cover;
  }

  .photo.sponsor-logo {
    width: auto;
    height: auto;
    margin: 1rem 0 4rem 0;
  }
  .photo.sponsor-logo > img {
    width: auto;
    height: 20rem;
  }
  .photo.sponsor-logo > figcaption {
    padding: 0;
  }

  .photo > img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .photo + .photo {
    margin-top: 0;
  }

  .photo > figcaption {
    padding-left: 4rem;
    padding-right: 4rem;
    font-style: italic;
  }

  #playback-images-logo {
    width: 20rem;
    height: auto;
    display: block;
    margin: 4rem 0 8rem 0;
  }

  .date {
    font-weight: bold;
    display: block;
  }

  @media screen and (max-width: 1000px) {
    .photo.sponsor-logo {
      width: 100%;
    }
    .photo.sponsor-logo > img {
      width: 100%;
      height: auto;
    }
  }

  .double-button-group {
    display: flex;
    justify-content: space-between;
    gap: 3rem;
    margin-top: 2rem;
  }

  @media screen and (max-width: 1000px) {
    .double-button-group {
      flex-direction: column;
      gap: 0;
    }
  }
</style>