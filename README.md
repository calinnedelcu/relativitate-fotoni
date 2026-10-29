# Relativitate & Fotoni — material de studiu interactiv

Site static (HTML + CSS + JavaScript simplu, fără dependențe și fără instalări) pentru învățarea **conceptuală** a relativității restrânse, a energiei relativiste, a fotonului și a efectului fotoelectric extern. Fără probleme de calcul: simulări, povești „pe pași”, mituri vs. realitate și întrebări grele de gândire.

## Cum îl deschizi

* Direct: dublu-click pe `index.html` (merge și fără server).
* Cu server local (recomandat pentru dezvoltare): `python3 -m http.server 8765` în acest folder, apoi `http://localhost:8765/`.
* Progresul (capitole citite, răspunsuri, scoruri) se salvează doar în browserul tău (`localStorage`). Se șterge din meniu: „Resetează progresul”.

## Ce conține

| pagină | rol |
|---|---|
| `index.html` | start: harta conceptelor, „continuă”, „de repetat”, cardurile capitolelor |
| `cap/NN-*.html` | cele 11 capitole (scroll, cu simulări și secvențe „pe pași”) |
| `test-final.html` | test amestecat din toate capitolele + harta stăpânirii |
| `fisa.html` | fișa de recapitulare (din `summary`-ul fiecărui capitol; se poate tipări) |
| `glosar.html` | glosar cu căutare (din `glossary`-ul fiecărui capitol) |

Teme: întunecat „Cosmos” (implicit) și luminos — buton în bara de sus.

## Structura codului

```
assets/css/base.css, components.css, home.css     design și componente
assets/js/core.js     registru de capitole, progres, temă, bară de sus, cuprins
assets/js/ui.js       controale pentru simulări + ghicește / mituri / termeni / „ce trebuie să poți spune”
assets/js/sim.js      canvas adaptiv, buclă de animație, paletă, desen, fizică, formatare
assets/js/steps.js    secvențe „pe pași”
assets/js/quiz.js     motorul de teste (single / multi cu punctaj parțial / spot = găsește greșeala)
assets/js/home.js     pagina de start, test final, fișă, glosar
assets/js/art*.js     biblioteca de ilustrații RF.art (oameni, tren, rachetă, lumină, ceasuri, grafice, diagrame spațiu-timp); galerie: _dev/gallery.html
assets/js/data/capNN.js     per capitol: summary (fișă), glossary, quiz (bancă de întrebări)
assets/js/sims/capNN-*.js   per capitol: simulările (RF.sims.<nume>)
tools/validate.js     validator (structură, întrebări, simulări): node tools/validate.js [N …]
cap/_sablon.html      șablon pentru un capitol nou
_dev/                 note de lucru (briefing-ul de construcție); nu face parte din site
```

## Cum adaugi sau modifici

* **O întrebare**: în `assets/js/data/capNN.js`, în lista `quiz` (tipuri: `single`, `multi`, `spot`; fiecare variantă are `why`; id `cNqK`). Rulează `node tools/validate.js N`.
* **Un capitol nou**: copiază `cap/_sablon.html`, adaugă intrarea în `RF.chapters` din `assets/js/core.js` și fișierele `data/capNN.js` + `sims/capNN-*.js`; adaugă `<script>` pentru `data/capNN.js` în `index.html`, `test-final.html`, `fisa.html`, `glosar.html`.
* **Culori / temă**: variabilele din `assets/css/base.css` (`:root` și `:root[data-theme="light"]`).
