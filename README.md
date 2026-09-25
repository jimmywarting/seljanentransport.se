# Seljanen Transport AB – webbplats

Statisk informationssida för ett transportföretag med kranbil och specialtransporter.
Ren HTML, CSS och en liten JavaScript-modul. Ingen build, ingen backend. Sidan fungerar
direkt på GitHub Pages och går även att öppna lokalt.

## Struktur

```
index.html            Startsidan (allt innehåll)
404.html              Felsida för GitHub Pages
css/styles.css        All styling, färgtema överst i filen
js/main.js            Färgtema, mobilmeny, diskret intoning (ESM)
assets/images/        Hero-bild, galleribilder, delningsbild (og-image.png)
assets/icons/         Favicon och appikoner
site.webmanifest      Web App Manifest
robots.txt            Instruktioner för sökmotorer
sitemap.xml           Sitemap
.nojekyll             Gör att GitHub Pages serverar filerna som de är
```

Alla sökvägar i HTML/CSS är relativa, så sidan fungerar både på en egen domän och under
`https://användarnamn.github.io/repo-namn/`.

## 1. Företagsuppgifter

Följande uppgifter är inlagda i `index.html`, `404.html`, `site.webmanifest` och JSON-LD:

| Uppgift | Värde |
|---|---|
| Företagsnamn | Seljanen Transport AB |
| Ort (i texter och SEO) | Stockholm |
| Telefon (visning / länk) | 073-699 70 11 / `+46736997011` |
| E-post | andre@seljanentransport.se |
| Adress | Venusvägen 8c, 141 33 Huddinge |
| Org.nr | 559071-7756 |

Öppettider visas inte på sidan. Vill du lägga till dem igen: lägg till en rad i
`<dl class="contact-details">` och fältet `"openingHours"` (t.ex. `"Mo-Fr 07:00-17:00"`) i JSON-LD.

**Kvar att fylla i:** texten `[Kort beskrivning av företagets bakgrund …]` i sektionen *Om oss*.
Sök efter `[` i `index.html` för att hitta den.

Ändras en uppgift senare: gör sök-och-ersätt i hela projektet (t.ex. i VS Code:
`Cmd/Ctrl + Shift + H`). Telefonnumret finns i två format – visningsformat och `+46…` i
`tel:`-länkarna och JSON-LD.

Kontrollera också texterna i sektionerna *Tjänster* och *Om oss* så att de beskriver det ni
faktiskt gör. Punktlistorna under varje tjänst är exempel och kan ändras fritt.

### Domän (canonical, Open Graph, sitemap)

Sidan är förberedd för `https://seljanentransport.se/`. Om adressen blir en annan, sök och
ersätt `https://seljanentransport.se/` i:

- `index.html` (canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD)
- `robots.txt`
- `sitemap.xml` (uppdatera även `<lastmod>` när innehållet ändras)

Dessa adresser måste vara absoluta – det är så sökmotorer och sociala medier kräver det.

## 2. Byt bilder

Bilderna i `assets/images/` är tillfälliga illustrationer. Ersätt dem med egna foton:

| Fil | Används till | Rekommenderad storlek |
|---|---|---|
| `hero.svg` | Stora bilden överst | 1600 × 1200 px (4:3) |
| `galleri-1.svg` – `galleri-4.svg` | Bildsektionen "Från våra uppdrag" | 1200 × 800 px (3:2) |
| `og-image.png` | Förhandsbild när sidan delas i sociala medier | exakt 1200 × 630 px |

Så här gör du:

1. Spara bilderna som **WebP** (gärna även en JPG som reserv), max ca 200–300 kB styck.
   Verktyg: [Squoosh](https://squoosh.app).
2. Lägg dem i `assets/images/`, t.ex. `hero.webp` och `hero.jpg`.
3. Uppdatera `src`, `width`, `height` och **alt-texten** i `index.html`. Exempel för hero:

   ```html
   <picture>
     <source srcset="assets/images/hero.webp" type="image/webp">
     <img src="assets/images/hero.jpg" width="1600" height="1200"
          alt="Beskriv vad bilden faktiskt visar"
          fetchpriority="high" decoding="async">
   </picture>
   ```

   Uppdatera även `<link rel="preload" href="assets/images/hero.svg" as="image">` i `<head>`
   så att den pekar på den nya bilden.
4. Ta bort de gamla `.svg`-filerna.

Bilderna beskärs automatiskt (`object-fit: cover`), så andra format fungerar också – men
behåll ungefär samma proportioner för bästa resultat. Vill du ha fler galleribilder kopierar
du ett `<figure class="gallery-item">`-block.

`og-image.png` är en genererad delningsbild med företagsnamnet. Byt gärna mot ett eget foto
med logotyp (exakt 1200 × 630 px).

### Logotyp och ikoner

Symbolen i sidhuvudet ligger inline i `index.html` (`.brand-mark`). Har ni en egen logotyp,
ersätt `<svg class="brand-mark">…</svg>` med t.ex.
`<img src="assets/images/logo.svg" width="160" height="40" alt="">` (tom alt eftersom länken
redan har en `aria-label`).

Faviconen är gjord från `assets/icons/logo.png`:

- `favicon.svg` – vektoriserad version av logotypen. Den är svart i ljust läge och vit i mörkt
  läge via `@media (prefers-color-scheme: dark)` inuti SVG:n (Chrome, Edge, Firefox).
- `favicon-32.png` / `favicon-32-dark.png` – svart och vit PNG-reserv för webbläsare utan
  SVG-favicon, valda med `media`-attributet på `<link rel="icon">`.
- `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` – svart logotyp
  på gul platta, för hemskärmar och bokmärken (de har ingen mörk variant).

Faviconen följer webbläsarens/systemets färgläge, inte temaknappen på sidan – webbläsare låter
inte sidan styra flikikonens tema.

## 3. Ändra färger

Alla färger finns som CSS custom properties överst i `css/styles.css`:

- `:root { … }` – ljust läge
- `:root[data-theme="dark"] { … }` och blocket i `@media (prefers-color-scheme: dark)` –
  mörkt läge (håll de två mörka blocken identiska)

De viktigaste variablerna:

| Variabel | Betydelse |
|---|---|
| `--accent` | Profilfärgen som yta (knappar, ränder) |
| `--on-accent` | Textfärg ovanpå `--accent` |
| `--accent-text` | Profilfärgen som textfärg – måste vara tillräckligt mörk i ljust läge |
| `--bg`, `--bg-alt`, `--surface` | Bakgrunder |
| `--text`, `--text-muted` | Textfärger |

Kontrollera kontrasten när du byter färg, t.ex. med
[WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) (minst 4.5:1 för
brödtext). Uppdatera även `theme-color` i `index.html` och färgerna i `site.webmanifest`.

Typsnitt: sidan använder systemtypsnitt (inga externa fonter) för snabb laddning.
Rubrikerna använder `Bahnschrift` (Windows) och `DIN Alternate` (macOS/iOS) när de finns.

## 4. Publicera på GitHub Pages

1. Skapa ett repository på GitHub och ladda upp filerna:

   ```bash
   git init
   git add .
   git commit -m "Första versionen av webbplatsen"
   git branch -M main
   git remote add origin https://github.com/ANVÄNDARNAMN/REPO.git
   git push -u origin main
   ```

2. På GitHub: **Settings → Pages → Build and deployment**. Välj *Source: Deploy from a
   branch*, branch `main` och mapp `/ (root)`. Spara.
3. Efter någon minut finns sidan på `https://ANVÄNDARNAMN.github.io/REPO/`.

### Egen domän (t.ex. seljanentransport.se)

1. Under **Settings → Pages → Custom domain**, skriv in domänen och spara. GitHub skapar då
   en `CNAME`-fil i repot.
2. Hos domänleverantören: peka domänen mot GitHub Pages enligt
   [GitHubs instruktioner](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)
   (A-poster för apex-domänen och/eller en CNAME-post för `www`).
3. Kryssa i **Enforce HTTPS** när certifikatet är klart.

### Testa lokalt

Öppna `index.html` direkt i webbläsaren, eller starta en enkel server i mappen:

```bash
python3 -m http.server 8000
# öppna http://localhost:8000
```

## 5. Checklista före publicering

- [ ] Bakgrundstexten i *Om oss* är ifylld (sök efter `[` i `index.html`)
- [ ] JSON-LD i `<head>` innehåller bara korrekta uppgifter (testa med
      [Googles test för rich results](https://search.google.com/test/rich-results))
- [ ] Canonical, `og:url`, `robots.txt` och `sitemap.xml` pekar på rätt domän
- [ ] Egna bilder med beskrivande alt-texter
- [ ] Texterna i Tjänster och Om oss stämmer med verksamheten
- [ ] Sidan är testad på mobil, i ljust och mörkt läge

## Tekniska detaljer

- **Färgtema:** Följer systemets inställning (`prefers-color-scheme`). Knappen i sidhuvudet
  växlar manuellt och valet sparas i `localStorage` (`theme`). Ett litet inline-skript i
  `<head>` sätter temat innan sidan ritas, så att den inte blinkar.
- **Utan JavaScript:** Allt innehåll och alla länkar fungerar. Temat följer då systemet och
  menyn visas som en rad länkar.
- **Rörelse:** Intoningen av sektioner och mjuk scrollning stängs av om besökaren har valt
  reducerad rörelse i sitt operativsystem.
- **Kontakt:** Inget formulär (ingen backend). Knappen "Skicka förfrågan via e-post" öppnar
  besökarens e-postprogram med en färdig mall – ändra mallen i `mailto:`-länken i
  `index.html` om du vill.
- **Ingen spårning** eller analys ingår.
