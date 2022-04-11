# Hemsedal-happenings-project

#####  Integreted Development Environment:Visual Studio Code  
 <img width="96" alt="VS2019" src="https://user-images.githubusercontent.com/48107744/162344825-4cefecd0-11cd-4e22-828f-c5527841e1bc.jpg">
 
 ### Om prosjektet
 
Det er en web-applikasjon som viser hva slags muligheter eller aktiviteter det finnes rundt omkring i nærområde f.eks annonseringer fra restaurant, hotell, og diverse til de som eier/leier hytte som ligger i Hemsedal. Applikasjonen har to forskjellige sider.En side for de som har hytta i Hemsedal der de får sett tilbud og aktiviteter i Hemsedal, og en annen type bruker (admin) som får lov til å legge til muligheter og aktiviteter til applikasjonen.   

 ### Implementerte funksjoner i applikasjonen
 
 #### Admin page
<ul>
<li> Form-Validering er integrert i applikasjonen.</li>
<li>Advarsels- eller bekreftelsesmeldinger gis for obligatoriske felt i tilfelle brukeren fyller ut eller lar de obligatoriske feltene stå tomme.</li>
<li> I tilfelle brukeren fyller ut de obligatoriske feltene, får brukeren mulighet til å legge til nye hendelser.</li>
<li> Suksess- eller feilmeldinger gis til brukeren som et resultat av innsendingsoperasjonen.</li>
<li>Aktivitetene som skal legges til av brukeren vises på brukersiden i henhold til betalingskategorien.</li>
  <li>Det ble laget en knapp for å gå til brukersiden fra admin-siden</li> 
<li>Responsive web-design er utført på admin-side</li>
  </ul>
  
   #### User page
<ul>
  <li> Dataene til aktivitetene som er lagt til (tittel, startdato og klokkeslett, sluttdato og klokkeslett og bilde) vises dynamisk.</li>
  <li>Ved å opprette en les mer-knapp, vises aktivitetsdetaljer som en forklaring i en modal form med et klikk fra brukeren.</li>
  <li>Aktivitetene som er lagt til av admin-brukeren er delt inn etter betalingstype, ekstra betalte aktiviteter er oppført øverst, og andre gratis og betalte           aktiviteter er listet nederst.</li>
  <li>En annen utforming av extrabetalte-aktivitetene er laget og et ikon er plassert for å indikere at disse aktivitetene er kunngjøringer.</li>
  <li>Hver aktivitet er dynamisk oppført med sitt ikon i henhold til sin kategori.</li>
  <li>Hvis admin-brukeren ikke legger til et bilde, legges et bilde til tilfeldig i henhold til kategorien.</li>
  <li>Filtre, datovelger, veksle-kategoriliste og filtreringsknapper er opprettet for gratise og betalte-aktiviteter, det ble skaffet der brukeren kan se de aktivitetene de kommende 1 måned, 1 uke eller 1 dag  eller i henhold til hvilken som helst spesifikk dato  de ønsker.</li>
  <li>Alle aktiviteter kommer i form av neste 1-måneders periode når siden åpnes for første gang.</li>
  <li> når en av filtreringsknappene klikkes av brukeren, en annen bakgrunnsfarge og kantlinje er brukt for å vise at den klikkede knappen er aktiv.</li>
  <li>Mens kategorilisten åpnes når du klikker på ikonet, kan den lukkes enten ved å klikke på ikonet igjen eller ved å klikke hvor som helst på siden.</li>
  <li>Responsive web-design er utført på bruker-side</li>
  <li>Det ble laget en knapp for å gå fra brukersiden til admin-siden</li>
  </ul>
  
## Built With

<ul>
<li>Html-Css-Sass</li>
<li>Javascript-Modal-View-Controller</li>
</ul>

![mvc-js](https://user-images.githubusercontent.com/48107744/162412170-4582f81e-9944-4cf3-9102-daf9b6b43914.jpg) ![sass-css](https://user-images.githubusercontent.com/48107744/162412248-68298de7-7b10-4be7-8143-ed912e7222bd.jpg)


