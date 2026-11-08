/* Biblioteca extinsă de itemi, pe capitole. Se adaugă peste probleme-cap.js:
   af, single, combo, short (liste mai lungi) + tipuri noi: cloze (completează spațiile), match (potrivește), order (ordonează pașii).
   cloze: text cu [[corect|capcană|capcană]] · match: {t, pairs:[[stânga, dreapta]…]} · order: {t, steps:[în ordinea corectă]} */
(function () {
  'use strict';
  var RF = window.RF, P = RF.problems, ch = P.ch;

  function S(q, ok, bad, why) { return { q: q, o: [[ok, 1]].concat(bad.map(function (b) { return [b, 0]; })), why: why }; }
  function C(q, s) { return { q: q, s: s }; }
  function add(id, o) {
    var c = ch[id];
    ['af', 'single', 'combo', 'short'].forEach(function (k) { c[k] = (c[k] || []).concat(o[k] || []); });
    ['cloze', 'match', 'order'].forEach(function (k) { c[k] = (c[k] || []).concat(o[k] || []); });
    c.calc = (c.calc || []).concat(o.calc || []);
  }

  /* ============================ 1 ============================ */
  add(1, {
    af: [
      ['Viteza c ≈ 3·10⁸ m/s este aceeași pentru lumina unei surse care se apropie de observator și pentru lumina uneia care se depărtează.', true, 'Postulatul constanței lui c.'],
      ['Un experiment mecanic făcut într-un tren aflat în mișcare rectilinie uniformă poate arăta că trenul se mișcă.', false, 'Principiul relativității: niciun experiment din interior nu deosebește repausul de mișcarea uniformă.'],
      ['Legea clasică de compunere a vitezelor este valabilă și pentru lumină.', false, 'Pentru lumină ar da c ± v.'],
      ['Pământul poate fi considerat, în multe probleme, un S.R.I. aproximativ.', true, 'Accelerațiile lui sunt mici în raport cu durata experimentelor.'],
      ['Relativitatea restrânsă se ocupă de sistemele de referință inerțiale.', true, 'De aici „restrânsă”.'],
      ['Dacă un observator se mișcă uniform față de un S.R.I., legile fizicii sunt diferite pentru el.', false, 'Sunt aceleași: și el este într-un S.R.I.'],
      ['Din postulate rezultă că duratele și lungimile pot depinde de observator.', true, 'Asta duce la spațiu-timp relativ.']
    ],
    single: [
      S('Care dintre următoarele exprimă corect Postulatul constanței vitezei luminii?', 'viteza luminii în vid are aceeași valoare în orice S.R.I.', ['viteza luminii e mai mare când sursa se apropie', 'viteza luminii în vid depinde de culoare', 'viteza luminii este c doar în S.R.I. al sursei'], 'Constanța lui c în orice S.R.I.'),
      S('Un sistem de referință inerțial este un sistem în care:', 'un corp pe care nu acționează forțe stă pe loc sau se mișcă rectiliniu uniform', ['toate corpurile sunt în repaus', 'corpurile cad cu accelerație constantă', 'nu există niciun câmp'], 'Definiția S.R.I. (legea inerției).'),
      S('Un tren cu viteza v emite spre față un fascicul de lumină. Legea clasică u = u′ + v ar da pentru lumină viteza:', 'c + v', ['c', 'c − v', 'v'], 'Dar experimentul și postulatul arată c.'),
      S('Principiul relativității afirmă că:', 'niciun experiment nu deosebește repausul de mișcarea rectilinie uniformă', ['există un sistem de repaus absolut', 'legile fizicii diferă între S.R.I.', 'toate vitezele, inclusiv c, sunt relative'], 'Nu există repaus absolut; c rămâne constantă.')
    ],
    combo: [
      C('Care dintre următoarele afirmații sunt corecte?', [['Un S.R.I. poate fi în mișcare rectilinie uniformă față de alt S.R.I.', 1, 'Da.'], ['Legile fizicii sunt aceleași în S.R.I. diferite.', 1, 'Principiul relativității.'], ['Lumina se deplasează cu viteze diferite în S.R.I. diferite.', 0, 'Are aceeași viteză c.'], ['Un sistem care accelerează este S.R.I.', 0, 'Nu este inerțial.']]),
      C('Care dintre următoarele afirmații sunt corecte?', [['Viteza luminii nu depinde de viteza sursei.', 1, 'Postulat.'], ['Legea u = u′ + v este valabilă la v ≪ c.', 1, 'Ca aproximație.'], ['La viteze apropiate de c, adunarea simplă dă rezultate corecte.', 0, 'Dă rezultate greșite.'], ['Relativitatea restrânsă se ocupă numai de S.R.I.', 1, 'De aceea e „restrânsă”.']])
    ],
    cloze: [
      'Viteza luminii în vid are aceeași valoare, [[c|c + v|c − v]], în orice [[S.R.I.|sistem accelerat|sistem aflat în repaus absolut]].',
      'Un sistem care se mișcă [[rectiliniu uniform|accelerat|în cerc]] față de un S.R.I. este tot un S.R.I.',
      'Legea clasică u = u′ + v este o aproximație valabilă doar pentru [[v ≪ c|v ≈ c|orice viteze]].'
    ],
    match: [{ t: 'Potrivește noțiunea cu descrierea', pairs: [['S.R.I.', 'sistem în care un corp liber stă pe loc sau se mișcă rectiliniu uniform'], ['Eveniment', 'ceva ce se petrece într-un loc și într-un moment precis'], ['Postulatul constanței lui c', 'viteza luminii în vid este aceeași în orice S.R.I.'], ['Principiul relativității', 'legile fizicii au aceeași formă în toți S.R.I.']] }],
    order: [{ t: 'Ordonează raționamentul: de ce adunarea clasică nu merge pentru lumină', steps: ['Clasic, vitezele se adună: u = u′ + v.', 'Pentru lumina unei surse în mișcare ar rezulta c + v.', 'Postulatul spune că toți observatorii măsoară exact c.', 'Deci adunarea clasică nu mai este valabilă la viteze mari.'] }]
  });

  /* ============================ 2 ============================ */
  add(2, {
    af: [
      ['Intervalul Δs se măsoară în unități de lungime (de exemplu metri sau ani-lumină).', true, 'Termenul cΔt are dimensiune de lungime.'],
      ['Dacă (Δs)² > 0, evenimentele pot fi legate prin cauză și efect.', false, 'Asta se întâmplă la tip timp, (Δs)² < 0.'],
      ['Dacă (Δs)² < 0, există un S.R.I. în care evenimentele au loc în același loc.', true, 'Tip timp.'],
      ['Dacă (Δs)² > 0, există un S.R.I. în care evenimentele sunt simultane.', true, 'Tip spațiu.'],
      ['Linia luminii pe diagrama Minkowski este diferită pentru S și S′.', false, 'Este aceeași pentru toți.'],
      ['Un eveniment din spațiu-timp se descrie prin patru numere.', true, '(x, y, z, t).'],
      ['În 3D, distanța dintre două puncte rămâne aceeași la rotirea axelor.', true, 'Se schimbă doar coordonatele.']
    ],
    single: [
      S('Pentru două evenimente aflate pe drumul aceluiași impuls de lumină, (Δs)² este:', 'zero', ['pozitiv', 'negativ', 'egal cu c²'], '|Δx| = cΔt în orice S.R.I.'),
      S('Dacă (Δs)² < 0, intervalul dintre cele două evenimente este de tip:', 'timp', ['spațiu', 'lumină', 'nu se poate spune'], 'Semnul minus ⇒ tip timp.'),
      S('Un eveniment în spațiu-timp este descris de:', 'patru numere (x, y, z, t)', ['trei numere (x, y, z)', 'un singur număr', 'doar de t'], 'Trei coordonate de spațiu și una de timp.'),
      S('În analogia cu rotirea axelor în plan, distanței dintre puncte îi corespunde:', 'intervalul spațio-temporal Δs', ['timpul t', 'viteza luminii', 'coordonata x'], 'Δs se păstrează la schimbarea S.R.I., ca distanța la rotire.')
    ],
    combo: [
      C('Care dintre următoarele afirmații despre tipurile de intervale sunt corecte?', [['Pentru lumină (Δs)² = 0.', 1, 'Da.'], ['Tip timp: (Δs)² < 0.', 1, 'Da.'], ['Tip spațiu: ordinea evenimentelor poate diferi între observatori.', 1, 'Da.'], ['Tip timp: niciun semnal nu le poate lega.', 0, 'Pot fi legate cauză-efect.']]),
      C('Care dintre următoarele afirmații sunt corecte?', [['Linia luminii este aceeași pentru toți observatorii.', 1, 'Da.'], ['Δs este invariant relativist.', 1, 'Da.'], ['La rotirea axelor în 3D distanța AB se păstrează.', 1, 'Da.'], ['Trucul ict înseamnă că timpul este „imaginar”.', 0, 'E doar o notație.']])
    ],
    cloze: [
      '(Δs)² = (Δx)² + (Δy)² + (Δz)² [[−|+|×]] (cΔt)².',
      'Intervalul Δs este un invariant [[relativist|clasic|local]]: are [[aceeași|alte|zero]] valoare în orice S.R.I.',
      'Dacă (Δs)² < 0, intervalul este de tip [[timp|spațiu|lumină]], iar evenimentele pot fi legate [[prin cauză și efect|doar prin semnale mai rapide decât c|prin nicio legătură]].'
    ],
    match: [{ t: 'Potrivește tipul de interval cu semnul', pairs: [['Interval de tip timp', '(Δs)² < 0'], ['Interval de tip spațiu', '(Δs)² > 0'], ['Drumul unui impuls de lumină', '(Δs)² = 0'], ['Invariant relativist', 'aceeași valoare în orice S.R.I.']] }],
    order: [{ t: 'Ordonează: de la distanță la intervalul spațio-temporal', steps: ['Distanța AB nu depinde de axele alese.', 'Se păstrează la rotirea axelor în 2D și 3D.', 'În spațiu-timp se păstrează combinația cu minus pe termenul de timp.', 'Ea este intervalul Δs, invariantul relativist.'] }]
  });

  /* ============================ 3 ============================ */
  add(3, {
    af: [
      ['x′ = γ(x − vt) este transformarea coordonatei x de la S la S′.', true, 'S′ se mișcă cu v pe axa x.'],
      ['t′ = γ(t − vx/c²).', true, 'Apare termenul vx/c².'],
      ['Pentru un punct fix al lui S aflat în origine (x = 0), x′ = −γvt.', true, 'x′ = γ(0 − vt).'],
      ['Transformările Lorentz păstrează intervalul Δs.', true, 'Sunt construite ca să păstreze c și Δs.'],
      ['La v = c, factorul γ este egal cu 1.', false, 'γ = 1 doar la v = 0; la v → c, γ → ∞.'],
      ['Transformările Lorentz sunt valabile pentru viteze relative v > c.', false, 'Pentru v ≥ c nu au sens fizic (γ imaginar sau infinit).'],
      ['Termenul vx/c² din t′ este legat de relativitatea simultaneității.', true, 'Evenimente cu același t, dar x diferit, au t′ diferit.']
    ],
    single: [
      S('Transformarea Lorentz pentru timp este:', 't′ = γ(t − vx/c²)', ['t′ = t', 't′ = γ(t − vx)', 't′ = (t − vx/c²)/γ'], 'Cu vx/c²; fără γ ar fi incomplet.'),
      S('Pentru v = 0,8c, factorul Lorentz este aproximativ:', '1,67', ['1,25', '0,6', '1,5'], 'γ = 1/√(1 − 0,64) = 1/0,6.'),
      S('Pentru v = 0,99c, factorul Lorentz este aproximativ:', '7,09', ['1,41', '0,99', '70,9'], 'γ = 1/√(1 − 0,9801) ≈ 7,09.'),
      S('Transformarea inversă (de la S′ la S) pentru x este:', 'x = γ(x′ + vt′)', ['x = γ(x′ − vt′)', 'x = x′ + vt′', 'x = x′/γ'], 'Se înlocuiește v cu −v.')
    ],
    combo: [
      C('Care dintre următoarele afirmații despre transformările Lorentz sunt corecte?', [['Pentru v ≪ c se reduc la transformările lui Galilei.', 1, 'γ → 1.'], ['x′ = γ(x − vt).', 1, 'Da.'], ['Coordonata y se schimbă: y′ ≠ y.', 0, 'y′ = y.'], ['t′ = t în orice caz.', 0, 'Doar la Galilei.']]),
      C('Care dintre următoarele afirmații sunt corecte?', [['Transformările Lorentz păstrează viteza luminii.', 1, 'Da.'], ['Păstrează și intervalul Δs.', 1, 'Da.'], ['Transformarea inversă se obține înlocuind v cu −v.', 1, 'Da.'], ['Factorul γ poate fi mai mic decât 1.', 0, 'γ ≥ 1.']])
    ],
    cloze: [
      'x′ = [[γ(x − vt)|x − vt|γ(x + vt)]].',
      'Pe direcțiile perpendiculare pe mișcare y′ [[=|≠]] y și z′ [[=|≠]] z.',
      'Pentru v ≪ c, factorul γ tinde la [[1|0|∞]], iar transformările devin cele ale lui [[Galilei|Einstein|Minkowski]].'
    ],
    match: [{ t: 'Potrivește viteza cu factorul Lorentz', pairs: [['v = 0', 'γ = 1'], ['v = 0,6c', 'γ = 1,25'], ['v = 0,8c', 'γ ≈ 1,67'], ['v → c', 'γ → ∞']] }],
    order: [{ t: 'Ordonează pașii pentru a calcula (x′, t′)', steps: ['Se identifică v (viteza lui S′ față de S) și coordonatele (x, t).', 'Se calculează β = v/c și γ = 1/√(1 − β²).', 'Se aplică x′ = γ(x − vt) și t′ = γ(t − vx/c²).', 'Se verifică păstrarea intervalului (Δs)².'] }],
    short: [{ q: 'De ce nu mai putem folosi transformările lui Galilei la viteze apropiate de c și ce le înlocuiește?',
      model: '<p>Transformările lui Galilei (x′ = x − vt, t′ = t) ar duce la u = u′ + v și la c ± v pentru lumină, contrazicând postulatul constanței lui c. Ele sunt înlocuite de transformările Lorentz, care păstrează c și intervalul Δs; au factorul γ și termenul vx/c² în t′. Pentru v ≪ c se reduc la Galilei.</p>',
      ok: ['Galilei ar da viteze c ± v pentru lumină, contrazicând postulatul constanței lui c.', 'Se folosesc transformările Lorentz, care păstrează c și intervalul Δs.', 'În Lorentz timpul se schimbă: t′ = γ(t − vx/c²).', 'Pentru v ≪ c, Lorentz se reduce la Galilei.'],
      bad: [['Galilei rămân corecte, dar cu o constantă diferită.', 'Fals: structura trebuie schimbată.'], ['În Lorentz timpul rămâne același pentru toți observatorii.', 'Fals: t′ ≠ t.'], ['Pentru v ≪ c Lorentz nu se mai poate aplica.', 'Fals: se reduce la Galilei.']] }],
    calc: []
  });

  /* ============================ 4 ============================ */
  add(4, {
    af: [
      ['Pe peron, cele două lumini ajung simultan la observatorul din mijloc ⇒ fulgerele sunt simultane pentru el.', true, 'Așa se verifică simultaneitatea.'],
      ['Simultaneitatea relativă înseamnă că există o eroare de măsurare.', false, 'Nu e eroare: e un efect real, consecință a lui c constant.'],
      ['Dacă Δx = 0, evenimentele simultane în S sunt simultane și în S′.', true, 'Δt′ = −γvΔx/c² = 0.'],
      ['Pentru o viteză relativă mai mare, decalajul Δt′ crește.', true, 'Δt′ ∝ γv.'],
      ['Ceasurile sincronizate într-un S.R.I. sunt sincronizate și în orice alt S.R.I.', false, 'Sincronizarea depinde de S.R.I.'],
      ['Două evenimente de tip timp pot fi simultane într-un S.R.I.', false, 'Pentru tip timp nu există niciun S.R.I. în care să fie simultane.'],
      ['Relativitatea simultaneității stă la baza contracției lungimilor.', true, 'Capetele se marchează simultan în sistemul observatorului.']
    ],
    single: [
      S('Dacă două evenimente sunt simultane în S și au loc în același loc (Δx = 0), în S′ decalajul de timp este:', 'zero', ['−γvΔx/c²', 'γΔt', 'infinit'], 'Δt′ = −γvΔx/c² = 0 pentru Δx = 0.'),
      S('Călătorul din mijlocul trenului vede primul fulgerul din față deoarece:', 'se mișcă spre el, iar viteza luminii este c pentru toți', ['lumina din față merge mai repede', 'fulgerul din față a lovit realmente mai devreme pentru toți', 'ochiul său e mai aproape de față'], 'Ambii observatori au dreptate, fiecare în S.R.I. lui.'),
      S('Care dintre următoarele NU se schimbă de la un S.R.I. la altul?', 'faptul că două evenimente au loc în același loc și în același moment', ['simultaneitatea a două evenimente îndepărtate', 'durata dintre două evenimente', 'distanța dintre două evenimente'], 'Coincidențele sunt invariante.'),
      S('Cum se sincronizează ceasuri aflate la distanță într-un S.R.I.?', 'cu semnale de lumină, ținând cont de timpul de drum', ['se potrivesc direct cu ochiul', 'cu viteza sunetului', 'nu pot fi sincronizate'], 'c este constantă, deci semnalul e de încredere.')
    ],
    combo: [
      C('Care dintre următoarele afirmații despre simultaneitate sunt corecte?', [['Simultaneitatea a două evenimente îndepărtate este relativă.', 1, 'Depinde de S.R.I.'], ['Dacă Δx = 0, simultaneitatea se păstrează.', 1, 'Δt′ = 0.'], ['Dezacordul crește cu viteza relativă.', 1, 'Δt′ ∝ γv.'], ['Dezacordul vine dintr-o eroare de măsură.', 0, 'Este un efect real.']]),
      C('Care dintre următoarele afirmații sunt corecte?', [['Coincidențele sunt aceleași pentru toți.', 1, 'Invariante.'], ['Ordinea cauză-efect se păstrează.', 1, 'Evenimentele de tip timp.'], ['Pentru tip spațiu ordinea poate diferi.', 1, 'Da.'], ['Orice două evenimente pot fi văzute în ordine inversată.', 0, 'Nu cele legate cauzal.']])
    ],
    cloze: [
      'Două evenimente simultane în S, la distanță [[diferită de zero|egală cu zero]], [[nu mai sunt|rămân]] simultane în S′.',
      'Pentru Δt = 0: Δt′ = [[−γvΔx/c²|γvΔx|Δx/c]].',
      'Coincidențele sunt [[invariante|relative|imposibile]], fiindcă au loc în [[același loc și moment|locuri diferite]].'
    ],
    match: [{ t: 'Potrivește noțiunea cu descrierea', pairs: [['Coincidență', 'același loc și același moment'], ['Evenimente simultane', 'același moment într-un S.R.I. dat'], ['Legătură cauzală', 'ordine păstrată pentru toți observatorii'], ['Sincronizarea ceasurilor', 'semnale de lumină și timp de drum']] }],
    order: [{ t: 'Ordonează: trenul lui Einstein', steps: ['Două fulgere lovesc capetele trenului.', 'Lumina lor ajunge simultan la observatorul de pe peron, aflat la mijloc.', 'Călătorul din mijlocul trenului se mișcă spre fulgerul din față și îi primește lumina primul.', 'Fiecare are dreptate în S.R.I. lui: simultaneitatea este relativă.'] }],
    short: [{ q: 'De ce dezacordul asupra simultaneității nu vine din întârzierea luminii?',
      model: '<p>Fiecare observator ține cont de timpul de drum al luminii (știe distanța și că viteza e c). Dezacordul rămâne totuși, pentru că viteza luminii este aceeași c pentru amândoi, deși ei se mișcă unul față de altul. Cauza reală este constanța lui c, nu întârzierea.</p>',
      ok: ['Fiecare observator corectează pentru timpul de drum al luminii.', 'Dezacordul rămâne chiar și după corecție.', 'Cauza reală este că viteza luminii este aceeași, c, pentru ambii observatori.'],
      bad: [['Dacă ar exista o corecție perfectă, dezacordul ar dispărea.', 'Fals: nu dispare.'], ['Observatorii au ceasuri defecte.', 'Fals.'], ['Lumina merge mai repede spre observatorul în mișcare.', 'Fals: viteza e c pentru toți.']] }],
    calc: []
  });

  /* ============================ 5 ============================ */
  add(5, {
    af: [
      ['O bară orientată perpendicular pe direcția mișcării nu se contractă.', true, 'Contracția apare doar pe direcția mișcării.'],
      ['Pentru v = 0,6c, lungimea măsurată este 0,8·L₀.', true, 'L = L₀/1,25 = 0,8L₀.'],
      ['Contracția lungimilor face ca volumul unui corp să crească.', false, 'Volumul scade (o dimensiune se micșorează).'],
      ['Dacă v ≪ c, atunci L ≈ L₀.', true, 'γ ≈ 1.'],
      ['Un observator față de care bara se mișcă măsoară L = γL₀.', false, 'L = L₀/γ.'],
      ['Pentru a măsura lungimea unei bare în mișcare, capetele trebuie marcate la momente diferite.', false, 'Se marchează simultan, în sistemul observatorului.'],
      ['Contracția lungimilor este o consecință a relativității simultaneității.', true, 'Capetele „simultane” diferă între observatori.']
    ],
    single: [
      S('O bară are lungimea proprie 10 m și se mișcă cu v = 0,8c. Lungimea măsurată este:', '6 m', ['16,7 m', '8 m', '10 m'], 'L = L₀/γ = 10/1,667 = 6 m.'),
      S('Lungimea măsurată L față de lungimea proprie L₀ este:', 'mai mică sau egală', ['mai mare', 'întotdeauna egală', 'de două ori mai mare'], 'L = L₀/γ ≤ L₀.'),
      S('O bară perpendiculară pe direcția mișcării:', 'își păstrează lungimea', ['se contractă cu γ', 'se dilată cu γ', 'devine zero'], 'Contracția e doar pe direcția mișcării.'),
      S('Contracția lungimilor este un efect:', 'reciproc', ['numai al observatorului în repaus', 'numai al obiectului în mișcare', 'care apare doar pentru lumină'], 'Fiecare vede mai scurtă bara celuilalt.')
    ],
    combo: [
      C('Care dintre următoarele afirmații sunt corecte?', [['L = L₀/γ.', 1, 'Da.'], ['Contracția apare doar pe direcția mișcării.', 1, 'Da.'], ['Contracția e doar iluzie optică.', 0, 'Rezultat de măsurare.'], ['Lungimea proprie este cea mai mare.', 1, 'Da.']]),
      C('Care dintre următoarele afirmații sunt corecte?', [['Capetele se marchează simultan în sistemul observatorului.', 1, 'Da.'], ['Efectul este reciproc.', 1, 'Da.'], ['La v ≪ c contracția este neglijabilă.', 1, 'γ ≈ 1.'], ['Lungimea măsurată poate depăși lungimea proprie.', 0, 'Nu.']])
    ],
    cloze: [
      'Lungimea proprie se [[împarte|înmulțește|adună]] la γ: L = [[L₀/γ|γL₀|L₀γ²]].',
      'Contracția apare doar pe [[direcția mișcării|direcția perpendiculară|ambele direcții]] și este [[reciprocă|doar a corpului în mișcare|nulă]].',
      'Lungimea unui corp în mișcare se măsoară marcând [[simultan|la momente diferite]] capetele în sistemul [[observatorului|corpului]].'
    ],
    match: [{ t: 'Potrivește simbolul cu semnificația', pairs: [['L₀', 'lungimea proprie (corpul în repaus)'], ['L', 'lungimea măsurată pe direcția mișcării'], ['Marcare simultană', 'metoda de măsurare a lungimii'], ['Reciprocitate', 'fiecare vede mai scurtă bara celuilalt']] }],
    order: [{ t: 'Ordonează pașii: de la Lorentz la L = L₀/γ', steps: ['Bara stă pe loc în S′: L₀ = x′_B − x′_A.', 'Se scrie x′ = γ(x − vt) pentru fiecare capăt.', 'Se aleg capetele la același moment în S (t_A = t_B).', 'Rezultă L₀ = γL, deci L = L₀/γ.'] }],
    short: [{ q: 'Cum se măsoară lungimea unui corp în mișcare și de ce rezultă o valoare diferită de cea proprie?',
      model: '<p>Lungimea se măsoară marcând <strong>simultan</strong>, în sistemul observatorului, pozițiile celor două capete. Din cauza relativității simultaneității, momentele simultane ale observatorului nu sunt simultane în sistemul corpului, de aceea rezultatul diferă: L = L₀/γ &lt; L₀, doar pe direcția mișcării.</p>',
      ok: ['Se marchează simultan capetele, în sistemul observatorului.', 'Simultaneitatea e relativă: momentele simultane diferă între sistemul observatorului și al corpului.', 'Rezultă L = L₀/γ, mai mică decât lungimea proprie.', 'Efectul apare doar pe direcția mișcării.'],
      bad: [['Capetele se marchează la momente diferite, ca să țină cont de mișcare.', 'Fals: se marchează simultan.'], ['Lungimea măsurată poate fi mai mare decât cea proprie.', 'Fals.'], ['Corpul se turtește fizic în orice direcție.', 'Fals: doar pe direcția mișcării și ca rezultat de măsurare.']] }],
    calc: ['contractie_inv']
  });

  /* ============================ 6 ============================ */
  add(6, {
    af: [
      ['La viteze obișnuite dilatarea timpului nu se observă pentru că γ ≈ 1.', true, 'Diferența e imperceptibilă.'],
      ['Pentru v = 0,8c, un interval propriu de 3 s corespunde la 5 s măsurate de observator.', true, 'Δt = γΔt₀ = 1,667·3 = 5.'],
      ['Durata proprie se măsoară cu două ceasuri aflate în locuri diferite.', false, 'Se măsoară cu un singur ceas, în același loc.'],
      ['Muonii ajung la sol datorită dilatării timpului, privită din sistemul de la sol.', true, 'Ceasul lor în mișcare merge încet.'],
      ['Accelerația gemenului care călătorește îi încetinește direct ceasul și de aceea e mai tânăr.', false, 'Accelerația doar marchează schimbarea de S.R.I.'],
      ['Un ceas cu lumină arată dilatarea timpului: drumul pe diagonală e mai lung și viteza luminii e tot c.', true, 'Așa se deduce Δt = γΔt₀.'],
      ['Timpul propriu este timpul măsurat de ceasul care însoțește corpul.', true, 'Definiția timpului propriu.']
    ],
    single: [
      S('Un ceas măsoară între două evenimente durata proprie 3 s și se mișcă cu 0,8c față de observator. Observatorul măsoară:', '5 s', ['1,8 s', '3 s', '8,3 s'], 'γ = 5/3 ⇒ Δt = 5 s.'),
      S('În paradoxul gemenilor, la revedere mai tânăr este:', 'gemenul care a călătorit', ['gemenul rămas acasă', 'amândoi la fel', 'nu se poate stabili'], 'Cel care își schimbă S.R.I. la întoarcere.'),
      S('Ceasul cu lumină se bazează pe faptul că:', 'viteza luminii este c pentru toți observatorii', ['lumina merge mai încet pe diagonală', 'ceasul se strică în mișcare', 'oglinzile se apropie'], 'Drum mai lung + aceeași viteză = durată mai mare.'),
      S('Dilatarea timpului, în mișcare rectilinie uniformă, este:', 'reciprocă', ['doar a observatorului', 'doar a ceasului în mișcare', 'inexistentă'], 'Fiecare vede ceasul celuilalt încetinit.')
    ],
    combo: [
      C('Care dintre următoarele afirmații sunt corecte?', [['Durata proprie este cea mai mică.', 1, 'Da.'], ['Un ceas în mișcare merge mai încet, văzut de observator.', 1, 'Da.'], ['Efectul este reciproc în mișcare uniformă.', 1, 'Da.'], ['Gemenul rămas acasă e mai tânăr.', 0, 'Nu, cel călător.']]),
      C('Care dintre următoarele afirmații sunt corecte?', [['La v ≪ c, Δt ≈ Δt₀.', 1, 'γ ≈ 1.'], ['Durata proprie se măsoară cu un singur ceas.', 1, 'În același loc.'], ['Muonii „trăiesc” mai mult văzut de la sol.', 1, 'Dilatare.'], ['Δt = Δt₀/γ.', 0, 'Δt = γΔt₀.']])
    ],
    cloze: [
      'Durata proprie se [[înmulțește|împarte|adună]] cu γ: Δt = [[γΔt₀|Δt₀/γ|Δt₀γ²]].',
      'Ceasul care stă pe loc măsoară durata [[proprie|dilatată]], iar un observator în mișcare față de el măsoară o durată [[mai mare|mai mică]].',
      'În paradoxul gemenilor cel care [[își schimbă S.R.I.|rămâne acasă]] la întoarcere este mai [[tânăr|bătrân]] la revedere.'
    ],
    match: [{ t: 'Potrivește noțiunea cu descrierea', pairs: [['Timp propriu', 'timpul măsurat de ceasul care însoțește corpul'], ['Linie de univers', 'drumul unui corp în spațiu-timp'], ['Ceas cu lumină', 'foton care urcă și coboară între două oglinzi'], ['Paradoxul gemenilor', 'asimetrie: cel care se întoarce își schimbă S.R.I.']] }],
    order: [{ t: 'Ordonează raționamentul ceasului cu lumină', steps: ['Un foton urcă și coboară între două oglinzi; ceasul stă pe loc: Δt₀ = 2h/c.', 'Pentru observatorul față de care ceasul se mișcă, lumina face o diagonală.', 'Drumul este mai lung, iar viteza luminii este tot c.', 'Rezultă o durată mai mare: Δt = γΔt₀.'] }],
    calc: ['muon']
  });

  /* ============================ 7 ============================ */
  add(7, {
    af: [
      ['Dacă v = 0,5c și u′ = 0,5c, rezultatul compunerii este u = c.', false, 'Rezultatul este 0,8c.'],
      ['Dacă v = 0,5c și u′ = 0,5c, rezultatul compunerii este u = 0,8c.', true, 'u = c/(1 + 0,25).'],
      ['Pentru viteze pozitive, numitorul 1 + vu′/c² este mai mare decât 1.', true, 'Asta „strânge” rezultatul.'],
      ['Pe verticală, dacă u′ₓ = 0, u_y = u′_y/γ.', true, 'Componenta perpendiculară se compune cu γ.'],
      ['Ritmul de apropiere a două nave poate depăși c.', true, 'Nu e viteza unui corp.'],
      ['Compunerea relativistă permite depășirea lui c, dacă se combină mai multe viteze mari.', false, 'Rezultatul rămâne sub c.'],
      ['La v = u′ ≪ c, u ≈ 2v.', true, 'Limita clasică.']
    ],
    single: [
      S('v = 0,8c și u′ = 0,8c (același sens). Viteza față de S este aproximativ:', '0,976c', ['1,6c', '0,8c', 'c'], 'u = 1,6c/1,64.'),
      S('La viteze mici (v, u′ ≪ c), compunerea relativistă devine:', 'u = u′ + v', ['u = c', 'u = u′ − v', 'u = u′/v'], 'Termenul vu′/c² dispare.'),
      S('Dacă un corp stă pe loc în S (u = 0), viteza lui în S′ (care se mișcă cu v față de S) este:', '−v', ['+v', '0', 'c'], 'Din u′ = (u − v)/(1 − vu/c²) cu u = 0.'),
      S('Două nave se apropie, fiecare cu 0,6c față de stație. Ritmul de apropiere, măsurat în stație, este:', '1,2c', ['0,6c', 'c', '0,88c'], 'Suma 0,6c + 0,6c; nu e viteza unui corp.')
    ],
    combo: [
      C('Care dintre următoarele afirmații sunt corecte?', [['Rezultatul compunerii relativiste este întotdeauna < c.', 1, 'Da.'], ['La v, u′ ≪ c, u ≈ u′ + v.', 1, 'Da.'], ['Dacă u′ = c, atunci u = c.', 1, 'Da.'], ['Ritmul de apropiere nu poate depăși c.', 0, 'Poate.']]),
      C('Care dintre următoarele afirmații sunt corecte?', [['Numitorul 1 + vu′/c² păstrează c.', 1, 'Da.'], ['Pe verticală u_y = u′_y/γ (cu u′ₓ = 0).', 1, 'Da.'], ['Adunarea simplă a vitezelor e exactă la v ≈ c.', 0, 'Nu.'], ['Viteza relativă a două nave rămâne < c.', 1, 'Da.']])
    ],
    cloze: [
      'u = (u′ + v)/(1 + [[vu′/c²|vu′|v/c]]).',
      'Dacă u′ = c, atunci u = [[c|c + v|c − v]].',
      'Ritmul de apropiere [[poate|nu poate]] depăși c, deoarece [[nu este viteza unui corp|este viteza luminii]].'
    ],
    match: [{ t: 'Potrivește situația cu rezultatul', pairs: [['v = u′ = 0,5c', 'u = 0,8c'], ['u′ = c', 'u = c'], ['v, u′ ≪ c', 'u ≈ u′ + v'], ['două nave, 0,9c fiecare, în stație', 'ritm de apropiere 1,8c']] }],
    order: [{ t: 'Ordonează pașii compunerii vitezelor', steps: ['Se identifică v (S′ față de S) și u′ (corpul față de S′).', 'Se calculează numărătorul u′ + v.', 'Se calculează numitorul 1 + vu′/c².', 'Se împarte și se verifică: rezultatul < c.'] }],
    calc: []
  });

  /* ============================ 8 ============================ */
  add(8, {
    af: [
      ['Masa de mișcare a unui corp crește cu viteza.', true, 'm = γm₀.'],
      ['Pentru F ⟂ v, F = γm₀a.', true, 'Inerția γm₀.'],
      ['Pentru v = 0,6c, γ³ ≈ 1,95.', true, '1,25³ = 1,953.'],
      ['Impulsul unui corp crește mai repede decât viteza lui.', true, 'p = γm₀v, iar γ crește cu v.'],
      ['F = Δp/Δt rămâne legea fundamentală a dinamicii în TRR.', true, 'Dar p = γm₀v.'],
      ['La v ≪ c se regăsește F = m₀a.', true, 'Limita clasică.'],
      ['Pentru F ∥ v, accelerația este mai mare decât cea clasică F/m₀.', false, 'Este mai mică: F/(γ³m₀).']
    ],
    single: [
      S('Pentru F ∥ v și v = 0,6c, accelerația este egală cu F/m₀ înmulțit cu aproximativ:', '0,51', ['0,8', '1,25', '1,95'], '1/γ³ = 1/1,95.'),
      S('În TRR, legea fundamentală a dinamicii se scrie:', 'F = Δp/Δt, cu p = γm₀v', ['F = m₀a', 'F = mv', 'F = m₀v/Δt'], 'Forma cu impulsul rămâne valabilă.'),
      S('Masa de repaus m₀ este:', 'aceeași pentru toți observatorii', ['mai mare la viteze mari', 'zero pentru corpuri rapide', 'egală cu masa de mișcare'], 'Invariantă.'),
      S('Pentru F ⟂ v, inerția corpului este:', 'γm₀', ['γ³m₀', 'm₀', 'm₀/γ'], 'F = γm₀a.')
    ],
    combo: [
      C('Care dintre următoarele afirmații sunt corecte?', [['m₀ este invariantă.', 1, 'Da.'], ['m = γm₀ crește cu v.', 1, 'Da.'], ['a este întotdeauna paralelă cu F.', 0, 'Nu în general.'], ['La v ≪ c, F = m₀a.', 1, 'Da.']]),
      C('Care dintre următoarele afirmații sunt corecte?', [['F ∥ v ⇒ F = γ³m₀a.', 1, 'Da.'], ['Impulsul este p = γm₀v.', 1, 'Da.'], ['Un corp cu m₀ ≠ 0 atinge c dacă F e mare.', 0, 'Nu.'], ['La v → c, p → ∞.', 1, 'Da.']])
    ],
    cloze: [
      'p = [[γm₀v|m₀v|m₀v/γ]].',
      'Pentru F ∥ v: F = [[γ³m₀a|γm₀a|m₀a]].',
      'Când v → c, γ → [[∞|0|1]], deci impulsul [[crește fără limită|tinde la 0|rămâne constant]].'
    ],
    match: [{ t: 'Potrivește mărimea cu expresia', pairs: [['impuls', 'γm₀v'], ['masă de mișcare', 'γm₀'], ['F ∥ v', 'F = γ³m₀a'], ['F ⟂ v', 'F = γm₀a']] }],
    order: [{ t: 'Ordonează: de ce un corp cu m₀ ≠ 0 nu atinge c', steps: ['Când v crește, γ crește.', 'Impulsul și energia cresc (p = γm₀v, E = γm₀c²).', 'Aceeași forță produce o accelerație tot mai mică (γ³).', 'La v → c ar trebui energie infinită: c nu se atinge.'] }],
    short: [{ q: 'De ce, în TRR, accelerația nu mai are în general direcția forței?',
      model: '<p>Din F = Δ(mv)/Δt cu m = γm₀ rezultă că și masa variază cu viteza, deci apare un termen în plus, în lungul lui v: a = (1/m)[F − (F·v)v/c²]. Inerția corpului este diferită în lungul vitezei (γ³m₀) și perpendicular pe ea (γm₀), de aceea a nu e paralelă cu F decât în cazuri particulare (F ∥ v sau F ⟂ v). La v ≪ c termenul dispare.</p>',
      ok: ['Masa m = γm₀ depinde de viteză, deci F = Δ(mv)/Δt are un termen în plus.', 'Termenul suplimentar este îndreptat în lungul vitezei.', 'Inerția e diferită în lungul vitezei (γ³m₀) și perpendicular pe ea (γm₀).', 'La v ≪ c termenul dispare.'],
      bad: [['Accelerația e paralelă cu forța doar dacă forța este foarte mare.', 'Fals.'], ['Termenul în plus apare doar pentru fotoni.', 'Fals.'], ['Accelerația nu poate fi calculată în TRR.', 'Fals.']] }],
    calc: []
  });

  /* ============================ 9 ============================ */
  add(9, {
    af: [
      ['Energia totală este suma dintre energia de repaus și energia cinetică.', true, 'E = E₀ + E_c.'],
      ['Pentru v ≪ c, E_c ≈ m₀v²/2.', true, 'Limita clasică.'],
      ['E² = (pc)² + (m₀c²)².', true, 'Triunghiul energie–impuls.'],
      ['Energia de repaus depinde de viteza corpului.', false, 'E₀ = m₀c² e invariantă.'],
      ['Pentru foton, E = pc.', true, 'm₀ = 0.'],
      ['Un corp în repaus nu are energie.', false, 'Are energie de repaus m₀c².'],
      ['γ = E/E₀.', true, 'E = γm₀c².']
    ],
    single: [
      S('Pentru v = 0,6c, energia cinetică este:', '0,25·m₀c²', ['0,6·m₀c²', '1,25·m₀c²', 'm₀c²/2'], '(γ − 1)m₀c² = 0,25m₀c².'),
      S('Pentru v = 0,6c, energia totală este:', '1,25·m₀c²', ['0,25·m₀c²', 'm₀c²', '1,6·m₀c²'], 'E = γm₀c².'),
      S('Triunghiul energie–impuls este dreptunghic, cu catetele:', 'pc și m₀c²', ['E și pc', 'E și m₀c²', 'E_c și E₀'], 'Ipotenuza este E.'),
      S('Pentru v ≪ c, energia cinetică relativistă se reduce la:', 'm₀v²/2', ['m₀c²', 'm₀v', 'mc²'], 'Formula clasică.')
    ],
    combo: [
      C('Care dintre următoarele afirmații sunt corecte?', [['E = E₀ + E_c.', 1, 'Da.'], ['E_c ≈ m₀v²/2 la v ≪ c.', 1, 'Da.'], ['E₀ depinde de viteză.', 0, 'Nu.'], ['Pentru foton E = pc.', 1, 'Da.']]),
      C('Care dintre următoarele afirmații sunt corecte?', [['γ = E/E₀.', 1, 'Da.'], ['E → ∞ când v → c (m₀ ≠ 0).', 1, 'Da.'], ['E_c = (γ − 1)m₀c².', 1, 'Da.'], ['Un corp în repaus are energie zero.', 0, 'Are m₀c².']])
    ],
    cloze: [
      'E = [[mc²|m₀c²|½mc²]] = γ[[m₀c²|m₀c|m₀v²]].',
      'E_c = ([[γ|1/γ|γ²]] − 1)m₀c².',
      'Energia de repaus este E₀ = [[m₀c²|mc²|m₀c]], iar E = E₀ + [[E_c|p|γ]].'
    ],
    match: [{ t: 'Potrivește mărimea cu expresia', pairs: [['E₀', 'm₀c²'], ['E', 'γm₀c²'], ['E_c', '(γ − 1)m₀c²'], ['pc', 'γm₀vc']] }],
    order: [{ t: 'Ordonează pașii: triunghiul energie–impuls', steps: ['Se scriu E = γm₀c² și p = γm₀v.', 'Se calculează (pc)² = γ²m₀²v²c².', 'Se adună (m₀c²)² și se folosește 1 − v²/c² = 1/γ².', 'Rezultă E² = (pc)² + (m₀c²)².'] }],
    short: [{ q: 'Ce înseamnă energia de repaus și ce legătură are cu masa de repaus?',
      model: '<p>Energia de repaus E₀ = m₀c² este energia pe care o are un corp doar pentru că există, chiar dacă stă pe loc; este proporțională cu masa de repaus (la 1 kg corespund ≈ 9·10<sup>16</sup> J) și aceeași pentru toți observatorii. Energia totală E = γm₀c² = E₀ + E_c include și energia cinetică.</p>',
      ok: ['E₀ = m₀c² este energia unui corp aflat în repaus.', 'Este proporțională cu masa de repaus și invariantă.', 'Energia totală E = γm₀c² = E₀ + E_c.'],
      bad: [['E₀ este zero când corpul stă pe loc.', 'Fals: tocmai atunci E = E₀.'], ['E₀ crește odată cu viteza.', 'Fals: e invariantă.'], ['E₀ este energia cinetică a corpului.', 'Fals.']] }],
    calc: []
  });

  /* ============================ 10 ============================ */
  add(10, {
    af: [
      ['Fotonul poate sta în repaus.', false, 'Se mișcă mereu cu c.'],
      ['Impulsul unui foton este p = h/λ.', true, 'Echivalent cu hν/c.'],
      ['Un foton ultraviolet are energie mai mare decât unul roșu.', true, 'Frecvență mai mare.'],
      ['Energia unui foton este E = pc.', true, 'm₀ = 0.'],
      ['Doi fotoni de culori diferite au viteze diferite în vid.', false, 'Ambii au viteza c.'],
      ['Constanta lui Planck este h ≈ 6,62·10⁻³⁴ J·s.', true, 'Da.'],
      ['O intensitate mare înseamnă fotoni cu energie mare.', false, 'Înseamnă mai mulți fotoni.']
    ],
    single: [
      S('Un foton are λ = 500 nm. Energia lui (hc ≈ 1240 eV·nm) este:', '2,48 eV', ['0,4 eV', '24,8 eV', '620 eV'], 'E = 1240/500.'),
      S('Care foton are energie mai mare?', 'cel cu frecvența mai mare', ['cel cu lungimea de undă mai mare', 'cel cu intensitatea mai mare', 'toți au aceeași'], 'E = hν.'),
      S('Impulsul unui foton este:', 'hν/c', ['hν', 'hc', 'ν/c'], 'p = E/c.'),
      S('Masa de mișcare a unui foton este:', 'hν/c²', ['zero', 'hν', 'h/c'], 'm = E/c².')
    ],
    combo: [
      C('Care dintre următoarele afirmații despre fotoni sunt corecte?', [['Energia depinde de frecvență.', 1, 'E = hν.'], ['Intensitatea = numărul de fotoni pe secundă.', 1, 'Da.'], ['Pot sta în repaus.', 0, 'Nu.'], ['Au impuls p = hν/c.', 1, 'Da.']]),
      C('Care dintre următoarele afirmații sunt corecte?', [['m₀ = 0 pentru foton.', 1, 'Da.'], ['Fotonii de culori diferite au aceeași viteză în vid.', 1, 'c.'], ['E/p = c.', 1, 'Da.'], ['Un foton violet are energie mai mică decât unul roșu.', 0, 'Mai mare.']])
    ],
    cloze: [
      'E = [[hν|h/ν|νc]].',
      'p = [[hν/c|hν|hc]].',
      'Masa de repaus a fotonului este [[0|hν/c²|∞]], deci E = [[pc|mc|hc]].'
    ],
    match: [{ t: 'Potrivește mărimea cu ce stabilește', pairs: [['culoarea (frecvența)', 'energia unui foton'], ['intensitatea', 'numărul de fotoni pe secundă'], ['m₀ = 0', 'fotonul nu poate sta pe loc'], ['E = pc', 'legătura energie–impuls a fotonului']] }],
    order: [{ t: 'Ordonează: de la triunghi la E = pc', steps: ['Se pornește de la E² = (pc)² + (m₀c²)².', 'Fotonul se mișcă cu c: γ = ∞, dar E și m sunt finite.', 'Rezultă m₀ = 0.', 'Atunci E² = (pc)², adică E = pc.'] }],
    short: [{ q: 'Ce decide energia unui foton și ce decide numărul de fotoni dintr-un fascicul?',
      model: '<p>Energia unui foton este decisă de frecvența (culoarea) radiației: E = hν. Numărul de fotoni pe secundă decide intensitatea fasciculului. Putere = (fotoni/s)·hν. O lumină mai intensă are mai mulți fotoni, nu fotoni mai energici.</p>',
      ok: ['Energia unui foton depinde doar de frecvență: E = hν.', 'Intensitatea este numărul de fotoni pe secundă.', 'Mai multă intensitate înseamnă mai mulți fotoni, nu mai energici.'],
      bad: [['Energia unui foton crește cu intensitatea fasciculului.', 'Fals.'], ['Numărul de fotoni depinde de culoare.', 'Fals: culoarea dă energia unui foton.'], ['Fotonii de frecvență mică au energie mare.', 'Fals.']] }],
    calc: ['lambda']
  });

  /* ============================ 11 ============================ */
  add(11, {
    af: [
      ['Efectul fotoelectric apare instantaneu, fără întârziere.', true, 'Un singur foton cedează energia.'],
      ['Tensiunea de stopare crește cu frecvența luminii.', true, '|e|U_s = hν − L_ex.'],
      ['Panta graficului E_c(ν) diferă de la metal la metal.', false, 'Este h pentru toate.'],
      ['Un metal cu L_ex mai mare are frecvența de prag mai mare.', true, 'ν₀ = L_ex/h.'],
      ['Curentul de saturație este proporțional cu intensitatea.', true, 'Mai mulți fotoelectroni.'],
      ['O intensitate mai mare produce fotoelectroni mai energici.', false, 'Mai mulți, nu mai energici.'],
      ['Lungimea de undă de prag este λ_prag = hc/L_ex.', true, 'Efect pentru λ ≤ λ_prag.']
    ],
    single: [
      S('L_ex = 2 eV și un foton de 2,5 eV. Energia cinetică maximă este:', '0,5 eV', ['4,5 eV', '2 eV', '0'], 'hν − L_ex.'),
      S('Frecvența de prag este:', 'ν₀ = L_ex/h', ['ν₀ = hL_ex', 'ν₀ = h/L_ex', 'ν₀ = L_ex·c'], 'hν₀ = L_ex.'),
      S('Dacă, peste prag, se dublează intensitatea, atunci:', 'numărul de fotoelectroni se dublează, E_c rămâne la fel', ['E_c se dublează', 'U_s se dublează', 'dispare efectul'], 'Intensitatea ≠ energia fotonului.'),
      S('Dacă, peste prag, se mărește frecvența, atunci:', 'E_c și U_s cresc', ['E_c scade', 'L_ex crește', 'efectul dispare'], 'E_c = hν − L_ex.')
    ],
    combo: [
      C('Care dintre următoarele afirmații sunt corecte?', [['E_c = hν − L_ex.', 1, 'Da.'], ['Sub prag nu apare efect, oricât de intensă ar fi lumina.', 1, 'Da.'], ['Panta lui E_c(ν) este h.', 1, 'Da.'], ['U_s depinde de intensitate.', 0, 'Nu.']]),
      C('Care dintre următoarele afirmații sunt corecte?', [['Un foton scoate cel mult un electron.', 1, 'Da.'], ['ν₀ depinde de catod.', 1, 'Da.'], ['Efectul apare cu întârziere.', 0, 'Instantaneu.'], ['Curentul de saturație crește cu intensitatea.', 1, 'Da.']])
    ],
    cloze: [
      'E_c = [[hν − L_ex|hν + L_ex|L_ex − hν]].',
      'Sub prag, efectul [[nu apare|apare slab]] oricât de mare ar fi [[intensitatea|frecvența]].',
      'Panta graficului E_c(ν) este [[h|L_ex|e]], aceeași pentru toate metalele.'
    ],
    match: [{ t: 'Potrivește noțiunea cu descrierea', pairs: [['L_ex', 'energia minimă de extracție a unui electron'], ['ν₀', 'frecvența de prag, L_ex/h'], ['U_s', 'tensiunea care oprește fotocurentul'], ['fotoelectron', 'electron smuls de un foton']] }],
    order: [{ t: 'Ordonează mecanismul efectului fotoelectric', steps: ['Un foton cu energia hν cade pe catod.', 'Cedează toată energia unui singur electron.', 'O parte (L_ex) se consumă pentru ieșirea din metal.', 'Restul devine energie cinetică: E_c = hν − L_ex.'] }],
    calc: []
  });
})();
