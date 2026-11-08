/* Probleme tip test: modelul testului (evaluare sumativă) — Adevărat/Fals, un singur răspuns,
   „care afirmații sunt corecte”, răspunsuri scurte cu model și calcule cu numere generate.
   Notă: în notițe Postulatul I = c constant, Postulatul II = legile fizicii; în unele surse ordinea e inversă. */
(function () {
  'use strict';
  var RF = window.RF;
  var P = RF.problems = {};

  /* ======================= 1. ADEVĂRAT / FALS ======================= */
  P.af = [
    { title: 'Setul 1 · postulate, Galilei, contracție, prag', items: [
      { t: 'Viteza luminii în vid are aceeași valoare în toți S.R.I.', a: true, why: 'Este Postulatul privind constanța lui c: nu depinde de mișcarea sursei sau a observatorului.' },
      { t: 'Pentru viteze apropiate de viteza luminii, transformările Galilei descriu mulțumitor relațiile dintre coordonatele spațio-temporale ale evenimentelor.', a: false, why: 'Galilei merge doar la v ≪ c; la v ≈ c apar abateri mari și se folosește Lorentz.' },
      { t: 'Un observator față de care un corp se mișcă măsoară, pe direcția mișcării, o lungime mai mare decât lungimea proprie.', a: false, why: 'Măsoară una mai mică: L = L₀/γ. Lungimea proprie este cea mai mare.' },
      { t: 'Lungimea proprie a unui corp este lungimea măsurată în S.R.I. în care corpul este în repaus.', a: true, why: 'Așa se definește lungimea proprie L₀.' },
      { t: 'În efectul fotoelectric extern, frecvența de prag depinde de materialul catodului.', a: true, why: 'ν₀ = L_ex/h, iar L_ex este o constantă de material.' }
    ] },
    { title: 'Setul 2 · timp, interval, compunere, energie', items: [
      { t: 'Durata proprie dintre două evenimente este mai mare decât durata măsurată de un observator față de care ceasul se mișcă.', a: false, why: 'Durata proprie este cea mai mică: Δt = γΔt₀ > Δt₀.' },
      { t: 'Intervalul spațio-temporal Δs dintre două evenimente are aceeași valoare în orice S.R.I.', a: true, why: 'Este invariantul relativist: Δx și Δt se schimbă, combinația (Δs)² nu.' },
      { t: 'Dacă un corp are viteza c față de S′, el are viteza c și față de S, oricare ar fi viteza lui S′ față de S.', a: true, why: 'Din compunerea relativistă: u′ = c ⇒ u = c. Exact Postulatul constanței lui c.' },
      { t: 'Un corp aflat în repaus față de un S.R.I. are energie totală zero.', a: false, why: 'Are energie de repaus E₀ = m₀c².' },
      { t: 'Fotonul are masă de repaus nenulă.', a: false, why: 'm₀ = 0 (altfel energia i-ar deveni infinită la v = c); are însă energie, impuls și masă de mișcare.' }
    ] },
    { title: 'Setul 3 · fotoelectric și dinamică', items: [
      { t: 'Dacă frecvența luminii e sub frecvența de prag, creșterea intensității poate determina apariția efectului fotoelectric.', a: false, why: 'Nu: fiecare foton are hν < L_ex și energiile mai multor fotoni nu se adună.' },
      { t: 'Energia cinetică maximă a fotoelectronilor depinde de frecvența radiației, nu de intensitate.', a: true, why: 'E_c = hν − L_ex; intensitatea schimbă doar numărul de electroni.' },
      { t: 'Un fotoelectron poate fi extras de mai mulți fotoni care își adună energiile.', a: false, why: 'Un electron absoarbe energia unui singur foton.' },
      { t: 'Când F este paralelă cu v, aceeași forță produce o accelerație tot mai mică pe măsură ce viteza crește.', a: true, why: 'a = F/(γ³m₀): γ crește cu v.' },
      { t: 'Un corp cu masă de repaus nenulă poate atinge viteza luminii dacă forța este suficient de mare.', a: false, why: 'Când v → c, γ → ∞: ar trebui energie și impuls infinite.' }
    ] },
    { title: 'Setul 4 · simultaneitate, gemeni, γ', items: [
      { t: 'Două evenimente simultane într-un S.R.I., petrecute în locuri diferite, sunt simultane în orice alt S.R.I.', a: false, why: 'Simultaneitatea e relativă: Δt′ = −γvΔx/c² ≠ 0 dacă Δx ≠ 0.' },
      { t: 'Două evenimente petrecute în același loc și în același moment (o coincidență) sunt coincidente pentru toți observatorii.', a: true, why: 'Coincidențele sunt invariante: ciocnirea are loc pentru toți.' },
      { t: 'Dilatarea timpului este reciprocă în mișcare rectilinie uniformă: fiecare observator găsește că ceasul celuilalt merge mai încet.', a: true, why: 'Nu e contradicție: ceasurile nu se pot compara direct și sincronizările diferă.' },
      { t: 'În paradoxul gemenilor, gemenul care se întoarce își schimbă S.R.I.', a: true, why: 'De aceea situația nu e simetrică; la revedere el e mai tânăr.' },
      { t: 'Factorul Lorentz γ poate fi mai mic decât 1.', a: false, why: 'γ ≥ 1 întotdeauna; γ = 1 doar pentru v = 0.' }
    ] }
  ];

  /* ======================= 2. UN SINGUR RĂSPUNS ======================= */
  P.single = [
    { q: 'O bară are lungimea proprie L₀ și se deplasează longitudinal cu viteza v față de un S.R.I. Lungimea barei, măsurată de acesta, este:',
      o: [['L = γL₀', 0], ['L = L₀/γ', 1], ['L = L₀', 0], ['L = γ²L₀', 0]],
      why: 'Contracție pe direcția mișcării: L = L₀/γ < L₀, cu γ > 1.' },
    { q: 'Un ceas se mișcă cu viteza v față de un observator. Între două ticuri, ceasul însuși măsoară durata proprie Δt₀. Observatorul măsoară:',
      o: [['Δt₀/γ', 0], ['γΔt₀', 1], ['Δt₀', 0], ['γ²Δt₀', 0]],
      why: 'Dilatare: Δt = γΔt₀ > Δt₀. Durata proprie se înmulțește cu γ.' },
    { q: 'Pentru un corp aflat în repaus față de un S.R.I., factorul Lorentz este:',
      o: [['0', 0], ['1', 1], ['∞', 0], ['c', 0]],
      why: 'γ = 1/√(1 − v²/c²); la v = 0 rezultă 1.' },
    { q: 'Care dintre următoarele mărimi are aceeași valoare în toți S.R.I.?',
      o: [['lungimea unei bare în mișcare', 0], ['durata dintre două evenimente', 0], ['intervalul spațio-temporal dintre două evenimente', 1], ['simultaneitatea a două evenimente îndepărtate', 0]],
      why: 'Δs este invariant relativist; lungimile, duratele și simultaneitatea depind de observator.' },
    { q: 'Energia de repaus a unui corp cu masa de repaus m₀ este:',
      o: [['m₀c²', 1], ['½m₀c²', 0], ['γm₀c²', 0], ['m₀c', 0]],
      why: 'E₀ = m₀c². γm₀c² este energia totală a corpului în mișcare.' },
    { q: 'Energia unui foton cu frecvența ν este:',
      o: [['hν', 1], ['h/ν', 0], ['ν/h', 0], ['hν/c', 0]],
      why: 'Legea lui Planck: E = hν. (hν/c este impulsul.)' },
    { q: 'Efectul fotoelectric extern se produce dacă:',
      o: [['frecvența radiației ≥ frecvența de prag', 1], ['intensitatea radiației este foarte mare, indiferent de frecvență', 0], ['frecvența este mai mică decât frecvența de prag, dar intensitatea e mare', 0], ['lungimea de undă este foarte mare', 0]],
      why: 'Condiția este hν ≥ L_ex ⇔ ν ≥ ν₀; intensitatea nu contează.' },
    { q: 'Pentru mișcarea rectilinie (F ∥ v), legea a II-a în TRR se scrie:',
      o: [['F = m₀a', 0], ['F = γm₀a', 0], ['F = γ³m₀a', 1], ['F = γ⁴m₀a', 0]],
      why: 'F = γ³m₀a = γ²ma; pentru F ⟂ v ar fi F = γm₀a.' },
    { q: 'Dacă în S′ un impuls de lumină are viteza c, în S (față de care S′ se mișcă cu v) viteza lui este:',
      o: [['c + v', 0], ['c', 1], ['c − v', 0], ['c/γ', 0]],
      why: 'u′ = c ⇒ u = (c + v)/(1 + v/c) = c.' },
    { q: 'Tensiunea de stopare din efectul fotoelectric depinde de:',
      o: [['frecvența luminii și de materialul catodului', 1], ['intensitatea luminii', 0], ['numărul de fotoni pe secundă', 0], ['numai de anod', 0]],
      why: '|e|U_s = hν − L_ex: depinde de ν și de L_ex, nu de intensitate.' },
    { q: 'Ce se întâmplă cu energia unui corp cu m₀ ≠ 0 când v → c?',
      o: [['tinde la zero', 0], ['rămâne m₀c²', 0], ['tinde la infinit', 1], ['devine c²', 0]],
      why: 'E = γm₀c² și γ → ∞; de aceea corpul nu poate atinge c.' }
  ];

  /* ============ 3. „CARE DINTRE AFIRMAȚII SUNT CORECTE?” (combinații) ============ */
  P.combo = [
    { q: 'Care dintre următoarele afirmații despre contracția lungimilor sunt corecte?',
      s: [['Apare doar pe direcția mișcării.', 1, 'Pe perpendiculară lungimile nu se schimbă.'], ['Este reciprocă.', 1, 'Fiecare observator vede scurtă bara celuilalt.'], ['Este doar o iluzie optică.', 0, 'E rezultat de măsurare (capete marcate simultan), nu iluzie.'], ['Lungimea proprie este cea mai mare.', 1, 'L = L₀/γ ≤ L₀.']],
      o: ['1 și 2', '1, 2 și 4', '2, 3 și 4', 'toate'] },
    { q: 'Care dintre următoarele afirmații despre efectul fotoelectric extern sunt corecte?',
      s: [['Energia cinetică maximă depinde de frecvență.', 1, 'E_c = hν − L_ex.'], ['Sub prag, o intensitate mare poate produce efect.', 0, 'Nu: fotonii luați separat nu au destulă energie.'], ['Un foton extrage cel mult un electron.', 1, 'Energiile fotonilor nu se adună.'], ['Frecvența de prag depinde de catod.', 1, 'ν₀ = L_ex/h.']],
      o: ['1, 3 și 4', '2 și 3', '1 și 2', 'toate'] },
    { q: 'Care dintre următoarele afirmații despre foton sunt corecte?',
      s: [['Are masa de repaus zero.', 1, 'm₀ = 0.'], ['Energia lui este E = pc.', 1, 'Din triunghiul energie–impuls cu m₀ = 0.'], ['Se deplasează cu c în orice S.R.I.', 1, 'Postulatul constanței lui c.'], ['Are impuls nul.', 0, 'p = hν/c = h/λ ≠ 0.']],
      o: ['1 și 2', '1, 2 și 3', '1, 2, 3 și 4', '2 și 4'] },
    { q: 'Care dintre următoarele afirmații despre dilatarea timpului sunt corecte?',
      s: [['Durata proprie este cea mai mică.', 1, 'Δt = γΔt₀ ≥ Δt₀.'], ['Efectul este reciproc în mișcare uniformă.', 1, 'Fiecare vede ceasul celuilalt încetinit.'], ['La revedere, gemenul rămas acasă este mai tânăr.', 0, 'Mai tânăr este gemenul care a călătorit.'], ['Un ceas în mișcare merge mai încet, văzut de observator.', 1, 'Asta e dilatarea.']],
      o: ['1, 2 și 3', '1, 2 și 4', '3 și 4', 'toate'] },
    { q: 'Care dintre următoarele afirmații despre energia relativistă sunt corecte?',
      s: [['E = γm₀c².', 1, 'Energia totală.'], ['E_c = (γ − 1)m₀c².', 1, 'Energia totală minus energia de repaus.'], ['Când v → c, energia tinde la infinit.', 1, 'γ → ∞.'], ['Energia de repaus depinde de viteză.', 0, 'E₀ = m₀c² este aceeași pentru toți.']],
      o: ['1, 2 și 3', '1, 2 și 4', '2 și 3', 'toate'] },
    { q: 'Care dintre următoarele afirmații despre factorul Lorentz sunt corecte?',
      s: [['γ ≥ 1.', 1, 'Mereu.'], ['Pentru un corp în repaus față de S.R.I., γ = 1.', 1, 'v = 0.'], ['γ crește odată cu modulul vitezei relative.', 1, 'Pentru viteze admisibile fizic (v < c).'], ['Un corp cu masă de repaus nenulă poate atinge c dacă forța e suficient de mare.', 0, 'Pentru v = c, γ ar fi infinit.']],
      o: ['1 și 4', '2 și 4', '1, 2 și 3', 'toate'] }
  ];

  /* ============ 4. RĂSPUNSURI SCURTE (cu model și listă de verificare) ============ */
  P.short = [
    { q: 'Enunțați cele două postulate ale teoriei relativității restrânse și precizați de ce postulatul constanței vitezei luminii nu este compatibil cu legea clasică de compunere a vitezelor.',
      model: '<p><strong>Postulatele:</strong> (1) viteza luminii în vid este constantă universală, c ≈ 3·10<sup>8</sup> m/s, în orice S.R.I.; (2) legile fizicii au aceeași formă în toate S.R.I. <em>(Atenție: în unele surse ordinea e inversă; dacă întrebarea zice „al doilea postulat”, enunță ambele și spune clar care e care.)</em></p><p><strong>Incompatibilitatea:</strong> legea clasică u = u′ + v ar da, pentru lumina emisă de o sursă în mișcare, viteza c ± v, deci diferită pentru observatori diferiți. Postulatul spune că toți observatorii măsoară exact c ⇒ legea clasică de compunere nu mai e valabilă la viteze mari și se înlocuiește cu cea relativistă, u = (u′ + v)/(1 + vu′/c²).</p>',
      pts: ['Enunță constanța lui c în orice S.R.I.', 'Enunță că legile fizicii sunt aceleași în toți S.R.I.', 'Arată că u = u′ + v ar da lumina c ± v', 'Concluzia: toți măsoară c ⇒ compunerea clasică nu e valabilă'] },
    { q: '„Dacă mărim suficient intensitatea luminii incidente, putem extrage electroni din orice metal, indiferent de frecvența radiației.” Precizați dacă afirmația este corectă și justificați.',
      model: '<p><strong>Afirmația este falsă.</strong> Un electron este extras de un singur foton, iar energia unui foton este hν. Dacă ν este sub frecvența de prag, hν &lt; L<sub>ex</sub>, deci niciun foton nu are destulă energie, iar energiile mai multor fotoni nu se adună. Creșterea intensității înseamnă doar <em>mai mulți</em> fotoni, nu fotoni mai energici. Efectul apare doar dacă ν ≥ ν₀ = L<sub>ex</sub>/h, iar ν₀ depinde de metal.</p>',
      pts: ['Spune clar: FALS', 'Un foton cedează energia unui singur electron', 'hν < L_ex sub prag: energia fotonului e insuficientă', 'Energiile mai multor fotoni nu se adună; intensitatea = numărul de fotoni, nu energia lor'] },
    { q: 'De ce un corp cu masă de repaus nenulă nu poate atinge viteza luminii în vid?',
      model: '<p>Energia totală este E = γm₀c², cu γ = 1/√(1 − v²/c²). Când v → c, γ → ∞, deci și energia (și impulsul) ar crește fără limită. Ar fi nevoie de o energie infinită; practic, aceeași forță produce o accelerație tot mai mică (F = γ³m₀a pentru F ∥ v). Viteza se apropie de c, dar nu o atinge.</p>',
      pts: ['E = γm₀c²', 'γ → ∞ când v → c', 'Ar trebui energie/impuls infinit', 'Accelerația scade (γ³) pentru aceeași forță'] },
    { q: 'Două evenimente sunt simultane pentru un observator, dar petrecute în locuri diferite. Sunt simultane și pentru un observator aflat în mișcare față de primul? Explicați (pe scurt, cu exemplul trenului).',
      model: '<p><strong>Nu în general.</strong> Simultaneitatea este relativă: Δt′ = −γvΔx/c² ≠ 0 dacă Δx ≠ 0. Exemplu: două fulgere lovesc simultan capetele unui tren, pentru cel de pe peron. Călătorul din mijlocul trenului merge spre fulgerul din față și îi vede lumina primul, iar lumina are aceeași viteză c pentru amândoi ⇒ concluzionează că a lovit mai devreme. Ambii au dreptate, fiecare în sistemul lui. Coincidențele (același loc și moment) și ordinea cauză-efect rămân neschimbate.</p>',
      pts: ['Răspunde: nu (în general)', 'Menționează că viteza luminii e aceeași c pentru ambii', 'Exemplul trenului: călătorul vede primul fulgerul din față', 'Ambii au dreptate; coincidențele se păstrează'] },
    { q: 'De ce fotonul are masa de repaus zero? Ce legătură există între energia și impulsul lui?',
      model: '<p>Fotonul se mișcă cu v = c, deci γ = ∞. Energia lui E = γm₀c² și masa de mișcare m = γm₀ sunt însă finite (le măsurăm), așa că m₀ = m/γ = 0. Din triunghiul energie–impuls, E² = (pc)² + (m₀c²)², cu m₀ = 0 rezultă E = pc, adică p = E/c = hν/c = h/λ.</p>',
      pts: ['v = c ⇒ γ = ∞ dar E și m finite ⇒ m₀ = 0', 'Triunghiul energie–impuls: E² = (pc)² + (m₀c²)²', 'Concluzie: E = pc, p = hν/c'] },
    { q: 'Dilatarea timpului este reciprocă. Cum se rezolvă atunci paradoxul gemenilor?',
      model: '<p>Reciprocitatea e valabilă doar în mișcare rectilinie uniformă, când nu se pot compara direct ceasurile. La gemeni, cel care călătorește își schimbă S.R.I. la întoarcere (accelerează), iar cel rămas acasă rămâne tot timpul în același S.R.I. ⇒ situația nu e simetrică. La revedere ceasurile se compară direct, în același loc și moment, deci fără ambiguitate: gemenul călător este mai tânăr.</p>',
      pts: ['Reciprocitatea doar în mișcare uniformă', 'Călătorul își schimbă S.R.I. (accelerează)', 'La revedere ceasurile se compară direct', 'Concluzie: călătorul e mai tânăr'] },
    { q: 'Care este diferența dintre durata proprie și durata măsurată între două evenimente? Dați relația dintre ele.',
      model: '<p>Durata proprie Δt₀ este cea dintre două evenimente petrecute în același loc, măsurată de un singur ceas aflat acolo (ceasul stă pe loc). Un observator față de care ceasul se mișcă măsoară o durată mai mare: Δt = γΔt₀ &gt; Δt₀. Durata proprie este deci cea mai mică; ea se <em>înmulțește</em> cu γ (lungimea proprie, în schimb, se <em>împarte</em> la γ).</p>',
      pts: ['Proprie = același loc, un singur ceas', 'Δt = γΔt₀', 'Proprie = cea mai mică; măsurată > proprie'] },
    { q: 'Cum se pot determina constanta lui Planck și lucrul mecanic de extracție din graficul energiei cinetice maxime a fotoelectronilor în funcție de frecvență?',
      model: '<p>Din E<sub>c</sub> = hν − L<sub>ex</sub> graficul E<sub>c</sub>(ν) este o dreaptă. <strong>Panta</strong> este h (aceeași pentru toate metalele), <strong>ordonata la origine</strong> (prelungind dreapta) este −L<sub>ex</sub>, iar <strong>intersecția cu axa ν</strong> este frecvența de prag ν₀ = L<sub>ex</sub>/h.</p>',
      pts: ['E_c = hν − L_ex este o dreaptă', 'Panta = h', 'Ordonata la origine = −L_ex; intersecția cu axa ν = ν₀'] }
  ];

  /* ============================ 5. CALCULE ============================ */
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function gam(b) { return 1 / Math.sqrt(1 - b * b); }
  function n(x, d) { return RF.fmt.n(x, d); }
  var HEV = 4.1375e-3;            // eV per THz  (h/e = 4,1375·10^-15 eV·s)

  P.calc = [
    { id: 'contractie', title: 'Nava: factorul Lorentz și lungimea măsurată',
      gen: function () {
        var v = pick([0.6, 0.8, 0.5, 0.9]), L0 = pick([10, 12, 15, 20, 24, 30, 50, 100]), g = gam(v), L = L0 / g;
        return {
          text: 'O navă se deplasează rectiliniu și uniform cu viteza <var>v</var> = ' + n(v, 1) + '·<var>c</var> față de Pământ. În sistemul propriu al navei, lungimea ei este <var>L</var><sub>0</sub> = ' + L0 + ' m. Calculați: a) factorul Lorentz γ; b) lungimea navei măsurată de un observator terestru, pe direcția mișcării.',
          parts: [{ k: 'γ', ans: g, tol: 0.01, d: 3 }, { k: 'L (m)', ans: L, tol: 0.01, d: 2 }],
          steps: ['γ = 1/√(1 − <var>v</var>²/<var>c</var>²) = 1/√(1 − ' + n(v * v, 2) + ') = 1/√' + n(1 - v * v, 2) + ' = 1/' + n(Math.sqrt(1 - v * v), 3) + ' = <b>' + n(g, 3) + '</b>.',
            'Lungimea proprie <var>L</var><sub>0</sub> (nava stă pe loc în sistemul ei) se <b>împarte</b> la γ: <var>L</var> = <var>L</var><sub>0</sub>/γ = ' + L0 + '/' + n(g, 3) + ' = <b>' + n(L, 2) + ' m</b>.',
            'Verificare: lungimea măsurată trebuie să fie mai mică decât cea proprie (' + n(L, 2) + ' < ' + L0 + ').'] };
      } },
    { id: 'dilatare', title: 'Ceasul în mișcare: durata măsurată',
      gen: function () {
        var v = pick([0.6, 0.8, 0.5, 0.9]), t0 = pick([2, 5, 10, 20, 30]), g = gam(v), t = g * t0;
        return {
          text: 'Un ceas aflat într-o rachetă care se mișcă cu <var>v</var> = ' + n(v, 1) + '·<var>c</var> față de Pământ măsoară între două evenimente petrecute în rachetă durata Δ<var>t</var><sub>0</sub> = ' + t0 + ' s. a) Calculați γ. b) Ce durată măsoară între aceleași evenimente un observator de pe Pământ?',
          parts: [{ k: 'γ', ans: g, tol: 0.01, d: 3 }, { k: 'Δt (s)', ans: t, tol: 0.01, d: 2 }],
          steps: ['γ = 1/√(1 − ' + n(v * v, 2) + ') = <b>' + n(g, 3) + '</b>.',
            'Evenimentele au loc în același loc în rachetă, deci Δ<var>t</var><sub>0</sub> = ' + t0 + ' s este durata <b>proprie</b>. Durata proprie se <b>înmulțește</b> cu γ: Δ<var>t</var> = γΔ<var>t</var><sub>0</sub> = ' + n(g, 3) + '·' + t0 + ' = <b>' + n(t, 2) + ' s</b>.',
            'Verificare: durata măsurată pe Pământ e mai mare decât cea proprie.'] };
      } },
    { id: 'fotoelectric', title: 'Efect fotoelectric: se produce? energia cinetică și tensiunea de stopare',
      gen: function () {
        var m = pick([['cesiu', 2.1], ['potasiu', 2.3], ['sodiu', 2.4], ['zinc', 4.3], ['cupru', 4.7], ['un metal oarecare', 2.0]]);
        var nu = pick([450, 500, 550, 600, 650, 700, 800, 900, 1000, 1100, 1200]);
        var E = nu * HEV, ok = E >= m[1], Ec = ok ? E - m[1] : 0;
        return {
          text: 'Catodul unei celule fotoelectrice (' + m[0] + ') are lucrul mecanic de extracție <var>L</var><sub>ex</sub> = ' + n(m[1], 1) + ' eV și este iluminat cu radiație de frecvență ν = ' + nu + ' THz. (1 eV = |<var>e</var>|·1 V ≈ 1,6·10<sup>−19</sup> J; <var>h</var> ≈ 6,62·10<sup>−34</sup> J·s; 1 THz = 10<sup>12</sup> Hz.) a) Calculați energia unui foton, în eV. b) Se produce efect fotoelectric? c) Dacă da, cât este energia cinetică maximă a fotoelectronilor (în eV)? (Dacă nu, scrieți 0.) d) Cât este tensiunea de stopare (în V)?',
          parts: [{ k: 'hν (eV)', ans: E, tol: 0.015, d: 2 }, { k: 'efect?', yn: ok }, { k: 'E_c (eV)', ans: Ec, tol: 0.03, abs: 0.03, d: 2 }, { k: 'U_s (V)', ans: Ec, tol: 0.03, abs: 0.03, d: 2 }],
          steps: ['hν = 6,62·10<sup>−34</sup>·' + nu + '·10<sup>12</sup> = ' + n(6.62e-34 * nu * 1e12 * 1e19, 2) + '·10<sup>−19</sup> J = (÷ 1,6·10<sup>−19</sup>) = <b>' + n(E, 2) + ' eV</b>. (Scurtătură: hν[eV] ≈ 0,00414·ν[THz].)',
            'Se compară cu <var>L</var><sub>ex</sub>: ' + n(E, 2) + (ok ? ' ≥ ' : ' < ') + n(m[1], 1) + ' ⇒ <b>' + (ok ? 'DA, efectul se produce' : 'NU, efectul nu se produce (fotonii au prea puțină energie, oricât de intensă ar fi lumina)') + '</b>.',
            ok ? '<var>E</var><sub>c</sub> = hν − <var>L</var><sub>ex</sub> = ' + n(E, 2) + ' − ' + n(m[1], 1) + ' = <b>' + n(Ec, 2) + ' eV</b>.' : 'Fără efect: <var>E</var><sub>c</sub> = <b>0</b>.',
            ok ? '|<var>e</var>|·<var>U</var><sub>s</sub> = <var>E</var><sub>c</sub> ⇒ <var>U</var><sub>s</sub> = <b>' + n(Ec, 2) + ' V</b> (în volți, numeric egală cu energia în eV).' : 'Fără fotoelectroni nu e nevoie de tensiune de stopare: <b>0 V</b>.'] };
      } },
    { id: 'prag', title: 'Frecvența și lungimea de undă de prag',
      gen: function () {
        var m = pick([['cesiu', 2.1], ['potasiu', 2.3], ['sodiu', 2.4], ['zinc', 4.3], ['cupru', 4.7]]), L = m[1], nu0 = L / HEV, lam = 1240 / L;
        return {
          text: 'Pentru ' + m[0] + ', <var>L</var><sub>ex</sub> = ' + n(L, 1) + ' eV. Calculați: a) frecvența de prag ν<sub>0</sub> (în THz); b) lungimea de undă de prag λ<sub>prag</sub> (în nm). (Folosiți <var>h</var> ≈ 4,14·10<sup>−15</sup> eV·s și <var>hc</var> ≈ 1240 eV·nm.)',
          parts: [{ k: 'ν₀ (THz)', ans: nu0, tol: 0.015, d: 0 }, { k: 'λ_prag (nm)', ans: lam, tol: 0.015, d: 0 }],
          steps: ['ν<sub>0</sub> = <var>L</var><sub>ex</sub>/<var>h</var> = ' + n(L, 1) + ' eV / 4,14·10<sup>−15</sup> eV·s = <b>' + n(nu0, 0) + ' THz</b>.',
            'λ<sub>prag</sub> = <var>hc</var>/<var>L</var><sub>ex</sub> = 1240/' + n(L, 1) + ' = <b>' + n(lam, 0) + ' nm</b>.',
            'Efect fotoelectric apare pentru ν ≥ ν<sub>0</sub> (adică λ ≤ λ<sub>prag</sub>).'] };
      } },
    { id: 'foton', title: 'Fotonul: energie, frecvență și impuls',
      gen: function () {
        var lam = pick([400, 450, 500, 550, 600, 650, 700]), E = 1240 / lam, nu = 3e5 / lam, p = 662 / lam;
        return {
          text: 'Un foton are lungimea de undă λ = ' + lam + ' nm. Calculați: a) energia lui (în eV, cu <var>hc</var> ≈ 1240 eV·nm); b) frecvența (în THz, cu <var>c</var> = 3·10<sup>8</sup> m/s); c) impulsul (în 10<sup>−27</sup> kg·m/s, cu <var>p</var> = <var>h</var>/λ și <var>h</var> ≈ 6,62·10<sup>−34</sup> J·s).',
          parts: [{ k: 'E (eV)', ans: E, tol: 0.015, d: 2 }, { k: 'ν (THz)', ans: nu, tol: 0.015, d: 0 }, { k: 'p (10⁻²⁷)', ans: p, tol: 0.02, d: 2 }],
          steps: ['<var>E</var> = <var>hc</var>/λ = 1240/' + lam + ' = <b>' + n(E, 2) + ' eV</b>.',
            'ν = <var>c</var>/λ = 3·10<sup>8</sup>/(' + lam + '·10<sup>−9</sup>) = <b>' + n(nu, 0) + ' THz</b> (' + n(nu / 1000, 3) + '·10<sup>15</sup> Hz).',
            '<var>p</var> = <var>h</var>/λ = 6,62·10<sup>−34</sup>/(' + lam + '·10<sup>−9</sup>) = <b>' + n(p, 2) + '·10<sup>−27</sup> kg·m/s</b>.'] };
      } },
    { id: 'compunere', title: 'Compunerea relativistă a vitezelor',
      gen: function () {
        var v = pick([0.5, 0.6, 0.8, 0.9]), u1 = pick([0.5, 0.6, 0.8, 0.9]), u = (u1 + v) / (1 + u1 * v);
        return {
          text: 'Un sistem S′ se deplasează cu viteza <var>v</var> = ' + n(v, 1) + '·<var>c</var> față de S, în sensul axei <var>x</var>. Un proiectil este lansat în S′ în același sens, cu viteza <var>u</var>′ = ' + n(u1, 1) + '·<var>c</var> față de S′. Calculați viteza proiectilului față de S, în unități de <var>c</var>. (Ce ar da adunarea simplă?)',
          parts: [{ k: 'u (în c)', ans: u, tol: 0.005, d: 3 }],
          steps: ['<var>u</var> = (<var>u</var>′ + <var>v</var>)/(1 + <var>vu</var>′/<var>c</var>²) = (' + n(u1, 1) + ' + ' + n(v, 1) + ')<var>c</var>/(1 + ' + n(v * u1, 2) + ') = ' + n(u1 + v, 1) + '<var>c</var>/' + n(1 + v * u1, 2) + ' = <b>' + n(u, 3) + '<var>c</var></b>.',
            'Adunarea simplă ar fi dat ' + n(u1 + v, 1) + '<var>c</var>' + (u1 + v > 1 ? ' (> c, imposibil)' : '') + '; rezultatul relativist rămâne sub <var>c</var>.'] };
      } },
    { id: 'energie', title: 'Energia relativistă la o viteză dată',
      gen: function () {
        var v = pick([0.6, 0.8, 0.9]), g = gam(v), Ec = g - 1, E = g, p = g * v;
        return {
          text: 'Un corp cu masa de repaus <var>m</var><sub>0</sub> se mișcă cu <var>v</var> = ' + n(v, 1) + '·<var>c</var>. Exprimați: a) γ; b) energia cinetică în unități de <var>m</var><sub>0</sub><var>c</var>²; c) energia totală în unități de <var>m</var><sub>0</sub><var>c</var>²; d) impulsul în unități de <var>m</var><sub>0</sub><var>c</var>.',
          parts: [{ k: 'γ', ans: g, tol: 0.01, d: 3 }, { k: 'E_c/m₀c²', ans: Ec, tol: 0.015, d: 3 }, { k: 'E/m₀c²', ans: E, tol: 0.01, d: 3 }, { k: 'p/m₀c', ans: p, tol: 0.015, d: 3 }],
          steps: ['γ = 1/√(1 − ' + n(v * v, 2) + ') = <b>' + n(g, 3) + '</b>.',
            '<var>E</var><sub>c</sub> = (γ − 1)<var>m</var><sub>0</sub><var>c</var>² = (' + n(g, 3) + ' − 1) = <b>' + n(Ec, 3) + '</b> <var>m</var><sub>0</sub><var>c</var>².',
            '<var>E</var> = γ<var>m</var><sub>0</sub><var>c</var>² = <b>' + n(E, 3) + '</b> <var>m</var><sub>0</sub><var>c</var>² (= <var>E</var><sub>0</sub> + <var>E</var><sub>c</sub>).',
            '<var>p</var> = γ<var>m</var><sub>0</sub><var>v</var> = ' + n(g, 3) + '·' + n(v, 1) + ' = <b>' + n(p, 3) + '</b> <var>m</var><sub>0</sub><var>c</var>. Verificare: <var>E</var>² = (<var>pc</var>)² + (<var>m</var><sub>0</sub><var>c</var>²)² ⇒ ' + n(E * E, 3) + ' = ' + n(p * p, 3) + ' + 1.'] };
      } },
    { id: 'interval', title: 'Intervalul dintre două evenimente',
      gen: function () {
        var dx, dt;
        do { dx = 1 + Math.floor(Math.random() * 6); dt = 1 + Math.floor(Math.random() * 6); } while (dx === dt && Math.random() < 0.7);
        var s2 = dx * dx - dt * dt, kind = s2 < 0 ? 0 : s2 > 0 ? 1 : 2;
        return {
          text: 'Două evenimente au, într-un S.R.I., separarea spațială Δ<var>x</var> = ' + dx + ' ani-lumină și separarea temporală Δ<var>t</var> = ' + dt + ' ani (Δ<var>y</var> = Δ<var>z</var> = 0). Cu <var>c</var> = 1 an-lumină/an: a) calculați (Δ<var>s</var>)² (în ani-lumină²); b) stabiliți felul intervalului.',
          parts: [{ k: '(Δs)²', ans: s2, tol: 0.001, abs: 0.01, d: 0 }, { k: 'felul', kind: kind }],
          steps: ['(Δ<var>s</var>)² = (Δ<var>x</var>)² − (<var>c</var>Δ<var>t</var>)² = ' + dx + '² − ' + dt + '² = ' + (dx * dx) + ' − ' + (dt * dt) + ' = <b>' + s2 + '</b>.',
            kind === 0 ? '(Δ<var>s</var>)² < 0 ⇒ interval de <b>tip timp</b>: evenimentele pot fi legate cauză-efect, ordinea e aceeași în orice S.R.I.' : kind === 1 ? '(Δ<var>s</var>)² > 0 ⇒ interval de <b>tip spațiu</b>: niciun semnal nu le poate lega, ordinea poate diferi.' : '(Δ<var>s</var>)² = 0 ⇒ evenimente pe drumul aceluiași impuls de <b>lumină</b>.',
            'Valoarea lui (Δ<var>s</var>)² este aceeași în orice S.R.I.'] };
      } },
    { id: 'viteza', title: 'Viteza la care energia cinetică egalează energia de repaus',
      gen: function () {
        var k = pick([1, 2, 3]), g = 1 + k, v = Math.sqrt(1 - 1 / (g * g));
        return {
          text: 'La ce viteză (în unități de <var>c</var>) energia cinetică a unui corp devine ' + (k === 1 ? 'egală cu' : 'de ' + k + ' ori mai mare decât') + ' energia lui de repaus?',
          parts: [{ k: 'v (în c)', ans: v, tol: 0.005, d: 3 }],
          steps: ['<var>E</var><sub>c</sub> = ' + (k === 1 ? '' : k + '·') + '<var>m</var><sub>0</sub><var>c</var>² ⇒ (γ − 1) = ' + k + ' ⇒ γ = ' + g + '.',
            '<var>v</var> = <var>c</var>·√(1 − 1/γ²) = <var>c</var>·√(1 − 1/' + (g * g) + ') = <b>' + n(v, 3) + '<var>c</var></b>.'] };
      } }
  ];
})();
