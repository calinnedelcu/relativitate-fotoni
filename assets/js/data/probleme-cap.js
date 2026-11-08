/* Probleme tip test, pe capitole. Fiecare capitol are: Adevărat/Fals (af), un singur răspuns (single),
   „care afirmații sunt corecte” (combo), răspunsuri scurte (short) și calcule (calc = id-uri din RF.problems.calc).
   af: [text, adevărat?, explicație] · single: {q, o:[[text, corect?]…], why} · combo: {q, s:[[text, adevărat?, explicație]…], o:[etichete]}
   short: {q, model, ok:[propoziții corecte], bad:[[propoziție capcană, de ce e greșită]…]} */
(function () {
  'use strict';
  var RF = window.RF, P = RF.problems = RF.problems || {};

  P.ch = {
    /* ============================ 1 ============================ */
    1: {
      af: [
        ['Legile fizicii au aceeași formă în toți S.R.I.', true, 'Este unul dintre cele două postulate ale relativității restrânse.'],
        ['Viteza luminii în vid depinde de viteza sursei care o emite.', false, 'Nu: c este aceeași în orice S.R.I., indiferent de sursă sau de observator.'],
        ['Un sistem care se mișcă rectiliniu și uniform față de un S.R.I. este tot un S.R.I.', true, 'Asta definește familia S.R.I.: sistemele în mișcare rectilinie uniformă unul față de altul.'],
        ['Un tren care accelerează puternic poate fi considerat S.R.I.', false, 'Un sistem care accelerează nu este inerțial.'],
        ['Dacă un observator aleargă după un fascicul de lumină, el măsoară pentru lumină o viteză mai mică decât c.', false, 'Măsoară tot c: constanța lui c înlocuiește adunarea clasică a vitezelor.']
      ],
      single: [
        { q: 'Doi observatori, unul în repaus și unul în mișcare uniformă, măsoară viteza aceluiași fascicul de lumină în vid. Cele două valori sunt:',
          o: [['egale cu c', 1], ['diferite, cu valoarea vitezei relative dintre observatori', 0], ['c și c − v', 0], ['depind de culoarea luminii', 0]],
          why: 'Postulatul constanței vitezei luminii: toți observatorii inerțiali măsoară c.' },
        { q: 'Care dintre următoarele sisteme NU este un S.R.I.?',
          o: [['o navă care se mișcă cu viteză constantă în spațiu liber', 0], ['Pământul, în aproximația inerțială', 0], ['un autobuz care frânează brusc', 1], ['un tren în mers rectiliniu uniform', 0]],
          why: 'Un sistem care accelerează (frânează) nu este inerțial.' },
        { q: 'Ce înseamnă că legile fizicii au aceeași formă în toți S.R.I.?',
          o: [['niciun experiment din interiorul unui S.R.I. nu arată dacă sistemul stă sau se mișcă uniform', 1], ['toți observatorii măsoară aceleași lungimi', 0], ['toți observatorii măsoară aceleași durate', 0], ['viteza oricărui corp e aceeași în toți S.R.I.', 0]],
          why: 'Este principiul relativității; nu există repaus absolut. Lungimile, duratele și vitezele corpurilor depind de observator.' }
      ],
      combo: [{ q: 'Care dintre următoarele afirmații sunt corecte?',
        s: [['Viteza luminii în vid este aceeași în toți S.R.I.', 1, 'Postulatul constanței lui c.'], ['Legea u = u′ + v este valabilă pentru orice viteze, inclusiv pentru lumină.', 0, 'Pentru lumină ar da c ± v, în contradicție cu postulatul; legea e valabilă doar la v ≪ c.'], ['Postulatele conduc la concluzia că spațiul și timpul sunt relative.', 1, 'Duratele și lungimile depind de S.R.I. ⇒ spațiu-timp 4D.'], ['Un sistem aflat în rotație este S.R.I.', 0, 'Rotația este mișcare accelerată.']],
        o: ['1 și 3', '1, 2 și 3', '2 și 4', 'toate'] }],
      short: [
        { q: 'Enunțați cele două postulate ale teoriei relativității restrânse și precizați de ce postulatul constanței vitezei luminii nu este compatibil cu legea clasică de compunere a vitezelor.',
          model: '<p><strong>Postulatele:</strong> (1) viteza luminii în vid este constantă universală, c ≈ 3·10<sup>8</sup> m/s, în orice S.R.I.; (2) legile fizicii au aceeași formă în toate S.R.I. <em>(Atenție: în unele surse ordinea e inversă; dacă întrebarea zice „al doilea postulat”, enunță ambele și spune clar care e care.)</em></p><p><strong>Incompatibilitatea:</strong> legea clasică u = u′ + v ar da, pentru lumina emisă de o sursă în mișcare, viteza c ± v, deci diferită pentru observatori diferiți. Postulatul spune că toți observatorii măsoară exact c ⇒ legea clasică de compunere nu mai e valabilă la viteze mari și se înlocuiește cu cea relativistă, u = (u′ + v)/(1 + vu′/c²).</p>',
          ok: ["Viteza luminii în vid este constantă universală (c ≈ 3·10⁸ m/s) în orice S.R.I.", "Legile fizicii au aceeași formă în toți S.R.I.", "Legea clasică u = u′ + v ar da luminii viteza c ± v, diferită pentru observatori diferiți.", "Deoarece toți observatorii măsoară c, adunarea clasică a vitezelor nu mai e valabilă la viteze mari."], bad: [["Viteza luminii crește cu viteza sursei: c + v.", "Fals: viteza luminii nu depinde de mișcarea sursei."], ["Legile fizicii se schimbă de la un S.R.I. la altul.", "Fals: au aceeași formă în toți S.R.I."], ["Compunerea clasică rămâne valabilă la orice viteză, deci nu există nicio incompatibilitate.", "Fals: la viteze apropiate de c ar contrazice postulatul constanței lui c."]] },
        { q: 'De ce lumina „nu se adună” cu viteza sursei, așa cum se adună viteza unei mingi aruncate dintr-un tren?',
          model: '<p>Pentru că viteza luminii în vid este constantă universală: are valoarea c în orice S.R.I., indiferent de mișcarea sursei sau a observatorului. Adunarea u = u′ + v este o aproximație valabilă doar la viteze mici, v ≪ c; la viteze apropiate de c ea trebuie înlocuită cu compunerea relativistă, care nu poate da niciodată o viteză peste c.</p>',
          ok: ["Viteza luminii în vid este aceeași, c, în orice S.R.I., indiferent de sursă și de observator.", "Adunarea u = u′ + v este doar o aproximație, valabilă la v ≪ c.", "La viteze mari se folosește compunerea relativistă, care păstrează c."], bad: [["Lumina e un caz special: viteza ei se adună cu a sursei doar la distanțe mari.", "Fals: nu există o astfel de excepție."], ["Mingea și lumina se comportă la fel, deci u = u′ + v merge și pentru lumină.", "Fals: pentru lumină ar da c ± v."], ["Viteza luminii e mai mare dacă sursa se apropie de observator.", "Fals: rămâne c."]] }
      ],
      calc: []
    },

    /* ============================ 2 ============================ */
    2: {
      af: [
        ['Intervalul spațio-temporal Δs dintre două evenimente are aceeași valoare în orice S.R.I.', true, 'Este invariantul relativist: Δx și Δt se schimbă, combinația (Δs)² nu.'],
        ['Pentru două evenimente aflate pe drumul aceluiași impuls de lumină, (Δs)² = 0 în orice S.R.I.', true, '|Δx| = cΔt pentru lumină în orice S.R.I.'],
        ['Distanța dintre două puncte din plan se schimbă dacă rotești axele de coordonate.', false, 'Se schimbă doar coordonatele (Δx, Δy); distanța AB rămâne aceeași.'],
        ['Trucul ict înseamnă că timpul este o mărime imaginară.', false, 'Este doar o notație (i² = −1) prin care intervalul apare ca suma a patru pătrate.'],
        ['Dacă (Δs)² < 0, evenimentele pot fi legate prin cauză și efect.', true, 'Interval de tip timp: un corp sau semnal mai lent decât lumina poate ajunge de la unul la altul.']
      ],
      single: [
        { q: 'Intervalul spațio-temporal dintre două evenimente se scrie:',
          o: [['(Δs)² = (Δx)² + (Δy)² + (Δz)² − (cΔt)²', 1], ['(Δs)² = (Δx)² + (Δy)² + (Δz)² + (cΔt)²', 0], ['(Δs)² = (cΔt)² + (Δx)² − (Δy)² − (Δz)²', 0], ['Δs = Δx + Δy + Δz − cΔt', 0]],
          why: 'Timpul intră cu semn opus față de coordonatele spațiale, ca (Δs)² să fie 0 pentru lumină și invariant.' },
        { q: 'Pe diagrama Minkowski, trecerea de la un S.R.I. la altul corespunde:',
          o: [['rotirii axelor (x′, ict′)', 1], ['deplasării originii pe axa timpului', 0], ['micșorării scării axei x', 0], ['dispariției axei timpului', 0]],
          why: 'Schimbarea S.R.I. înclină/rotește axele, iar intervalul (distanța OE) rămâne neschimbat.' },
        { q: 'De ce apare semnul minus în fața termenului (cΔt)² din expresia intervalului?',
          o: [['doar așa (Δs)² = 0 pentru lumină, în orice S.R.I.', 1], ['pentru că timpul curge numai înainte', 0], ['pentru că timpul se măsoară în secunde, iar spațiul în metri', 0], ['este doar o convenție, cu plus ar ieși la fel', 0]],
          why: 'Cu minus, lumina (|Δx| = cΔt) dă Δs = 0 pentru toți observatorii; cu plus intervalul nu ar mai fi invariant.' }
      ],
      combo: [{ q: 'Care dintre următoarele afirmații despre intervalul spațio-temporal sunt corecte?',
        s: [['Are aceeași valoare în orice S.R.I.', 1, 'Invariant relativist.'], ['Între termenul de timp și cei spațiali apare un semn minus.', 1, 'Altfel nu ar fi invariant și nu ar da 0 pentru lumină.'], ['Dacă (Δs)² > 0, niciun semnal nu poate lega cele două evenimente.', 1, 'Tip spațiu: ar fi nevoie de viteză peste c.'], ['Valoarea lui (Δs)² depinde de observator.', 0, 'Tocmai e invariant.']],
        o: ['1, 2 și 3', '1 și 2', '2, 3 și 4', 'toate'] }],
      short: [
        { q: 'Ce este intervalul spațio-temporal și de ce se numește invariant relativist? Ce se schimbă și ce nu se schimbă de la un S.R.I. la altul?',
          model: '<p>Intervalul dintre două evenimente este (Δs)² = (Δx)² + (Δy)² + (Δz)² − (cΔt)². Este <strong>invariant relativist</strong> pentru că are aceeași valoare în orice S.R.I.: observatorii diferiți găsesc Δx și Δt diferite (acestea se schimbă), dar combinația de mai sus iese aceeași (aceasta nu se schimbă). Analogie: la rotirea axelor în plan se schimbă coordonatele, dar nu distanța dintre puncte. Pentru lumină (Δs)² = 0 în orice S.R.I.</p>',
          ok: ["(Δs)² = (Δx)² + (Δy)² + (Δz)² − (cΔt)².", "Are aceeași valoare în orice S.R.I.", "Δx și Δt se schimbă de la un S.R.I. la altul, dar combinația (Δs)² nu.", "La rotirea axelor în plan se păstrează distanța; la schimbarea S.R.I. se păstrează intervalul."], bad: [["Δs se schimbă, în schimb Δx și Δt rămân aceleași pentru toți observatorii.", "Fals: invers."], ["(Δs)² = (Δx)² + (Δy)² + (Δz)² + (cΔt)², cu plus pe termenul de timp.", "Fals: timpul intră cu minus."], ["Invariant înseamnă că nu se schimbă în timp.", "Fals: înseamnă aceeași valoare în toți S.R.I."]] },
        { q: 'De ce timpul nu este „încă o lungime”? Ce înseamnă „trucul ict”?',
          model: '<p>În interval, termenul de timp intră cu semn <strong>opus</strong> celor spațiale; doar așa combinația este aceeași pentru toți observatorii și iese 0 pentru lumină. „Trucul ict”: cu i² = −1, (ict)² = −c²t², deci (Δs)² = Δx² + Δy² + Δz² + (icΔt)², o sumă de patru pătrate; este doar o notație comodă, nu înseamnă că timpul ar fi „imaginar”.</p>',
          ok: ["Timpul intră în interval cu semn opus celor spațiale.", "Doar așa (Δs)² = 0 pentru lumină, în orice S.R.I., iar intervalul e invariant.", "Trucul ict (i² = −1) scrie intervalul ca o sumă de patru pătrate.", "ict este doar o notație; nu înseamnă că timpul ar fi „imaginar”."], bad: [["Timpul e o lungime imaginară, de aceea apare minus.", "Fals: e doar o notație."], ["Minusul apare fiindcă timpul curge doar înainte.", "Fals: motivul e invarianța și Δs = 0 pentru lumină."], ["Cu semn plus intervalul ar fi tot invariant; minusul e doar o convenție.", "Fals: cu plus nu ar mai fi invariant."]] }
      ],
      calc: ['interval']
    },

    /* ============================ 3 ============================ */
    3: {
      af: [
        ['Factorul Lorentz γ este mai mare sau egal cu 1.', true, 'γ = 1/√(1 − v²/c²) ≥ 1; γ = 1 doar pentru v = 0.'],
        ['Pe direcțiile perpendiculare pe mișcare, transformările Lorentz modifică coordonatele (y′ ≠ y).', false, 'y′ = y și z′ = z: pe perpendiculară nu se schimbă nimic.'],
        ['Pentru v ≪ c, transformările Lorentz se reduc la cele ale lui Galilei.', true, 'γ → 1 și termenul vx/c² dispare.'],
        ['În transformările Lorentz, timpul este același în S și în S′ (t′ = t).', false, 'Aceasta e Galilei; în Lorentz t′ = γ(t − vx/c²).'],
        ['Pentru trecerea de la S′ la S se folosesc aceleași formule, cu v înlocuit prin −v.', true, 'Sunt transformările inverse.']
      ],
      single: [
        { q: 'Transformarea Lorentz pentru coordonata x′ (S′ se mișcă cu v pe axa x față de S) este:',
          o: [['x′ = γ(x − vt)', 1], ['x′ = γ(x + vt)', 0], ['x′ = x − vt', 0], ['x′ = (x − vt)/γ', 0]],
          why: 'x′ = γ(x − vt). Fără γ ar fi Galilei; cu plus ar fi transformarea inversă (x = γ(x′ + vt′)).' },
        { q: 'Factorul Lorentz pentru v = 0,6c este:',
          o: [['1,25', 1], ['0,8', 0], ['1,67', 0], ['1,6', 0]],
          why: 'γ = 1/√(1 − 0,36) = 1/0,8 = 1,25.' },
        { q: 'Care dintre următoarele valori NU poate fi valoarea factorului Lorentz al unui corp?',
          o: [['1', 0], ['1,25', 0], ['0,8', 1], ['7,09', 0]],
          why: 'γ ≥ 1 mereu; 0,8 este 1/γ pentru v = 0,6c, nu γ.' }
      ],
      combo: [{ q: 'Care dintre următoarele afirmații despre factorul Lorentz sunt corecte?',
        s: [['γ ≥ 1.', 1, 'Mereu.'], ['Pentru un corp în repaus față de S.R.I., γ = 1.', 1, 'v = 0.'], ['γ crește odată cu modulul vitezei relative.', 1, 'Pentru viteze admisibile fizic (v < c).'], ['Un corp cu masă de repaus nenulă poate atinge c dacă forța e suficient de mare.', 0, 'Pentru v = c, γ ar fi infinit.']],
        o: ['1 și 4', '2 și 4', '1, 2 și 3', 'toate'] }],
      short: [
        { q: 'Ce devin transformările Lorentz pentru v ≪ c? Dar pentru v ≈ c?',
          model: '<p>Pentru <strong>v ≪ c</strong>: γ → 1 și termenul vx/c² dispare, deci x′ = x − vt, t′ = t — transformările lui Galilei (limita clasică). Pentru <strong>v ≈ c</strong> (caz ultrarelativist): γ este mare, termenul vx/c² nu mai poate fi neglijat, timpul t′ ≠ t, iar efectele relativiste (contracție, dilatare, simultaneitate relativă) devin vizibile; formulele relativiste sunt obligatorii.</p>',
          ok: ["Pentru v ≪ c: γ → 1 și termenul vx/c² dispare.", "Atunci x′ = x − vt și t′ = t: transformările lui Galilei.", "Pentru v ≈ c: γ este mare și t′ ≠ t.", "La v ≈ c efectele relativiste (contracție, dilatare, simultaneitate relativă) devin vizibile."], bad: [["Pentru v ≪ c transformările Lorentz dau x′ = x și t′ = t pentru orice viteză.", "Fals: x′ = x − vt."], ["Pentru v ≈ c transformările rămân aceleași ca la Galilei.", "Fals: abaterile sunt mari."], ["Pentru v ≈ c, γ devine mai mic decât 1.", "Fals: γ ≥ 1 mereu."]] }
      ],
      calc: ['lorentz']
    },

    /* ============================ 4 ============================ */
    4: {
      af: [
        ['Două evenimente simultane într-un S.R.I., petrecute în locuri diferite, sunt simultane în orice alt S.R.I.', false, 'Simultaneitatea e relativă: Δt′ = −γvΔx/c² ≠ 0 dacă Δx ≠ 0.'],
        ['Dezacordul asupra simultaneității vine din întârzierea cu care lumina ajunge la observatori.', false, 'Se ține cont de timpul de drum al luminii; cauza reală e constanța lui c pentru toți.'],
        ['Două evenimente petrecute în același loc și moment (coincidență) sunt coincidente pentru toți observatorii.', true, 'Coincidențele sunt invariante.'],
        ['Dezacordul asupra simultaneității crește cu distanța dintre evenimente.', true, 'Δt′ = −γvΔx/c² crește cu Δx și cu v.'],
        ['Un observator foarte rapid poate vedea efectul înaintea cauzei, pentru evenimente legate cauzal.', false, 'Ordinea cauză-efect (evenimente de tip timp) se păstrează pentru toți.']
      ],
      single: [
        { q: 'În trenul lui Einstein, două fulgere lovesc simultan capetele trenului pentru observatorul de pe peron. Călătorul din mijlocul trenului vede primul fulgerul:',
          o: [['din față (spre care se mișcă)', 1], ['din spate', 0], ['ambele în același moment', 0], ['niciunul', 0]],
          why: 'Călătorul se apropie de lumina din față și o întâlnește prima; viteza luminii e c pentru ambii, deci concluzionează că fulgerul din față a lovit mai devreme.' },
        { q: 'Cum se verifică dacă două evenimente îndepărtate sunt simultane într-un S.R.I.?',
          o: [['lumina emisă de ele ajunge în același moment la un observator aflat la mijlocul distanței', 1], ['se compară ceasurile celor doi observatori fără nicio corecție', 0], ['se măsoară doar viteza corpurilor din jur', 0], ['simultaneitatea nu poate fi verificată', 0]],
          why: 'Se folosește semnalul de lumină și timpul de drum (c constant).' },
        { q: 'Două evenimente sunt simultane în S și au loc la distanța Δx pe axa mișcării. În S′ (viteza v față de S) decalajul de timp este:',
          o: [['Δt′ = −γvΔx/c²', 1], ['Δt′ = 0', 0], ['Δt′ = γΔx', 0], ['Δt′ = Δx/c', 0]],
          why: 'Din Δt′ = γ(Δt − vΔx/c²) cu Δt = 0.' }
      ],
      combo: [{ q: 'Care dintre următoarele afirmații despre simultaneitate sunt corecte?',
        s: [['Simultaneitatea a două evenimente îndepărtate este relativă.', 1, 'Depinde de S.R.I.'], ['Coincidențele (același loc și moment) sunt aceleași pentru toți.', 1, 'Sunt invariante.'], ['Dezacordul se datorează întârzierii luminii.', 0, 'Se ține cont de întârziere; contează c constant.'], ['Ordinea cauză-efect se păstrează pentru toți observatorii.', 1, 'Evenimentele legate cauzal sunt de tip timp.']],
        o: ['1, 2 și 3', '1, 2 și 4', '3 și 4', 'toate'] }],
      short: [
        { q: 'Descrieți trenul lui Einstein și spuneți ce concluzie trage fiecare observator.',
          model: '<p>Două fulgere lovesc capetele unui tren în mișcare. Observatorul de pe peron (în mijlocul distanței dintre loviri) primește cele două lumini în același moment ⇒ concluzionează că fulgerele au fost <strong>simultane</strong>. Călătorul din mijlocul trenului se mișcă spre fulgerul din față, deci îi vede lumina primul, iar lumina are aceeași viteză c pentru amândoi ⇒ concluzionează că fulgerul din față a lovit <strong>mai devreme</strong>. Ambii au dreptate, fiecare în S.R.I. lui: simultaneitatea este relativă.</p>',
          ok: ["Două fulgere lovesc capetele trenului; observatorul de pe peron primește lumina lor în același moment, deci le vede simultane.", "Călătorul din mijlocul trenului merge spre fulgerul din față și îi vede lumina primul.", "Viteza luminii este c pentru amândoi observatorii.", "Concluzie: simultaneitatea este relativă; ambii observatori au dreptate."], bad: [["Călătorul vede întâi fulgerul din spate.", "Fals: merge spre cel din față."], ["Unul dintre observatori greșește: fulgerele sunt simultane sau nu, la fel pentru toți.", "Fals: simultaneitatea depinde de S.R.I."], ["Dezacordul apare doar din cauza întârzierii luminii.", "Fals: se ține cont de timpul de drum; cauza e c constant."]] }
      ],
      calc: ['simult']
    },

    /* ============================ 5 ============================ */
    5: {
      af: [
        ['Un observator față de care un corp se mișcă măsoară, pe direcția mișcării, o lungime mai mare decât lungimea proprie a corpului.', false, 'Măsoară o lungime mai mică: L = L₀/γ.'],
        ['Lungimea proprie a unui corp este lungimea măsurată în S.R.I. în care corpul este în repaus.', true, 'Așa se definește L₀.'],
        ['Contracția lungimilor apare și pe direcția perpendiculară pe mișcare.', false, 'Doar pe direcția mișcării.'],
        ['Contracția lungimilor este reciprocă: fiecare observator vede mai scurtă bara celuilalt.', true, 'Nu e contradicție: capetele se marchează simultan în sistemul fiecăruia.'],
        ['Lungimea proprie este cea mai mică dintre lungimile măsurate ale unui corp.', false, 'Este cea mai mare: L = L₀/γ ≤ L₀.']
      ],
      single: [
        { q: 'O bară are lungimea proprie L₀ și se deplasează longitudinal cu viteza v față de un S.R.I. Lungimea barei, măsurată de acesta, este:',
          o: [['L = γL₀', 0], ['L = L₀/γ', 1], ['L = L₀', 0], ['L = γ²L₀', 0]],
          why: 'Contracție pe direcția mișcării: L = L₀/γ < L₀, cu γ > 1.' },
        { q: 'Cum se măsoară lungimea unui corp care se mișcă față de observator?',
          o: [['se marchează simultan, în sistemul observatorului, pozițiile celor două capete', 1], ['se marchează capetele în momente diferite', 0], ['se măsoară timpul în care corpul trece pe lângă observator, fără alte date', 0], ['nu poate fi măsurată', 0]],
          why: 'Definiția măsurării lungimii presupune marcarea simultană a capetelor.' },
        { q: 'Contracția lungimilor este neglijabilă atunci când:',
          o: [['v ≪ c (γ ≈ 1)', 1], ['v = c', 0], ['corpul este foarte lung', 0], ['corpul este foarte ușor', 0]],
          why: 'Pentru v ≪ c, γ ≈ 1 și L ≈ L₀.' }
      ],
      combo: [{ q: 'Care dintre următoarele afirmații despre contracția lungimilor sunt corecte?',
        s: [['Apare doar pe direcția mișcării.', 1, 'Pe perpendiculară lungimile nu se schimbă.'], ['Este reciprocă.', 1, 'Fiecare observator vede scurtă bara celuilalt.'], ['Este doar o iluzie optică.', 0, 'E rezultat de măsurare (capete marcate simultan), nu iluzie.'], ['Lungimea proprie este cea mai mare.', 1, 'L = L₀/γ ≤ L₀.']],
        o: ['1 și 2', '1, 2 și 4', '2, 3 și 4', 'toate'] }],
      short: [
        { q: 'Este contracția lungimilor reală? Cine vede bara mai scurtă? De ce apare?',
          model: '<p>Contracția este reală ca <strong>rezultat al măsurării</strong> (nu iluzie optică și nu „turtire” a obiectului în sine): lungimea se măsoară marcând simultan capetele, iar pentru un corp în mișcare simultaneitatea în sistemul observatorului nu coincide cu cea din sistemul corpului. Efectul este <strong>reciproc</strong>: fiecare observator vede mai scurtă bara celuilalt. Apare doar pe direcția mișcării, L = L₀/γ.</p>',
          ok: ["Contracția este rezultat al măsurării, nu iluzie optică.", "Lungimea se măsoară marcând simultan capetele, în sistemul observatorului.", "Efectul este reciproc: fiecare observator vede mai scurtă bara celuilalt.", "Apare doar pe direcția mișcării: L = L₀/γ."], bad: [["Contracția este doar o iluzie optică provocată de perspectivă.", "Fals: e rezultat de măsurare."], ["Doar observatorul în mișcare vede bara scurtată; bara chiar se micșorează.", "Fals: efectul e reciproc."], ["Contracția apare și pe direcția perpendiculară pe mișcare.", "Fals: doar pe direcția mișcării."]] }
      ],
      calc: ['contractie']
    },

    /* ============================ 6 ============================ */
    6: {
      af: [
        ['Durata proprie dintre două evenimente este mai mare decât durata măsurată de un observator față de care ceasul se mișcă.', false, 'Durata proprie este cea mai mică: Δt = γΔt₀ > Δt₀.'],
        ['Dilatarea timpului este reciprocă în mișcare rectilinie uniformă.', true, 'Fiecare vede ceasul celuilalt încetinit; nu e contradicție.'],
        ['În paradoxul gemenilor, gemenul care se întoarce își schimbă S.R.I.', true, 'De aceea situația nu e simetrică.'],
        ['La revedere, gemenul rămas acasă este mai tânăr decât cel care a călătorit.', false, 'Mai tânăr este gemenul care a călătorit.'],
        ['Ceasul aflat în mișcare, văzut de un observator, merge mai încet decât ceasul observatorului.', true, 'Asta este dilatarea timpului.']
      ],
      single: [
        { q: 'Un ceas se mișcă cu viteza v față de un observator. Între două ticuri, ceasul măsoară durata proprie Δt₀. Observatorul măsoară:',
          o: [['Δt₀/γ', 0], ['γΔt₀', 1], ['Δt₀', 0], ['γ²Δt₀', 0]],
          why: 'Dilatare: Δt = γΔt₀ > Δt₀.' },
        { q: 'Durata proprie dintre două evenimente este durata măsurată:',
          o: [['de un singur ceas, aflat în același loc cu ambele evenimente', 1], ['de doi observatori care se mișcă unul față de altul', 0], ['de un observator față de care evenimentele sunt în mișcare', 0], ['de lumină, între cele două evenimente', 0]],
          why: 'Evenimentele au loc în același loc, în S.R.I. al ceasului.' },
        { q: 'Muonii creați în atmosfera înaltă ajung la sol, deși durata lor de viață proprie este scurtă. Din punctul de vedere al unui observator de la sol, explicația este că:',
          o: [['ceasul muonilor, în mișcare rapidă, merge mai încet', 1], ['muonii depășesc viteza luminii', 0], ['atmosfera se subțiază', 0], ['muonii se răcesc în atmosferă', 0]],
          why: 'Dilatarea timpului. (Din sistemul muonului, explicația e contracția drumului.)' }
      ],
      combo: [{ q: 'Care dintre următoarele afirmații despre dilatarea timpului sunt corecte?',
        s: [['Durata proprie este cea mai mică.', 1, 'Δt = γΔt₀ ≥ Δt₀.'], ['Efectul este reciproc în mișcare uniformă.', 1, 'Fiecare vede ceasul celuilalt încetinit.'], ['La revedere, gemenul rămas acasă este mai tânăr.', 0, 'Mai tânăr este gemenul care a călătorit.'], ['Un ceas în mișcare merge mai încet, văzut de observator.', 1, 'Asta e dilatarea.']],
        o: ['1, 2 și 3', '1, 2 și 4', '3 și 4', 'toate'] }],
      short: [
        { q: 'Dilatarea timpului este reciprocă. Cum se rezolvă atunci paradoxul gemenilor?',
          model: '<p>Reciprocitatea e valabilă doar în mișcare rectilinie uniformă, când nu se pot compara direct ceasurile. La gemeni, cel care călătorește își schimbă S.R.I. la întoarcere (accelerează), iar cel rămas acasă rămâne tot timpul în același S.R.I. ⇒ situația nu e simetrică. La revedere ceasurile se compară direct, în același loc și moment, deci fără ambiguitate: gemenul călător este mai tânăr.</p>',
          ok: ["Reciprocitatea e valabilă doar în mișcare rectilinie uniformă.", "Gemenul care călătorește își schimbă S.R.I. la întoarcere (accelerează).", "Cel rămas acasă rămâne tot timpul în același S.R.I., deci situația nu e simetrică.", "La revedere ceasurile se compară direct: gemenul călător e mai tânăr."], bad: [["Ambii gemeni îmbătrânesc la fel, fiindcă efectul e reciproc.", "Fals: situația nu e simetrică."], ["Gemenul rămas acasă e mai tânăr.", "Fals: mai tânăr e cel care a călătorit."], ["Accelerația este cea care încetinește ceasul călătorului.", "Fals: accelerația doar marchează schimbarea de S.R.I."]] },
        { q: 'Care este diferența dintre durata proprie și durata măsurată între două evenimente? Dați relația dintre ele.',
          model: '<p>Durata proprie Δt₀ este cea dintre două evenimente petrecute în același loc, măsurată de un singur ceas aflat acolo (ceasul stă pe loc). Un observator față de care ceasul se mișcă măsoară o durată mai mare: Δt = γΔt₀ &gt; Δt₀. Durata proprie este deci cea mai mică; ea se <em>înmulțește</em> cu γ (lungimea proprie, în schimb, se <em>împarte</em> la γ).</p>',
          ok: ["Durata proprie e cea dintre două evenimente petrecute în același loc, măsurată de un singur ceas.", "Un observator față de care ceasul se mișcă măsoară Δt = γΔt₀.", "Durata proprie este cea mai mică dintre duratele măsurate."], bad: [["Durata proprie este cea mai mare dintre durate.", "Fals: e cea mai mică."], ["Durata proprie se împarte la γ: Δt = Δt₀/γ.", "Fals: se înmulțește cu γ."], ["Durata proprie se măsoară cu două ceasuri sincronizate aflate în locuri diferite.", "Fals: un singur ceas, în același loc."]] }
      ],
      calc: ['dilatare']
    },

    /* ============================ 7 ============================ */
    7: {
      af: [
        ['Dacă un corp are viteza c față de S′, el are viteza c și față de S, oricare ar fi viteza lui S′ față de S.', true, 'Din compunerea relativistă: u′ = c ⇒ u = c.'],
        ['Compunerea relativistă a vitezelor nu poate da niciodată un rezultat mai mare decât c.', true, 'Numitorul 1 + vu′/c² „strânge” rezultatul sub c.'],
        ['La viteze mici (v, u ≪ c), compunerea relativistă se reduce la u = u′ + v.', true, 'Termenul vu′/c² devine neglijabil.'],
        ['Două nave care se apropie, fiecare cu 0,9c față de un observator, au una față de cealaltă viteza 1,8c.', false, '1,8c este doar ritmul de apropiere; viteza relativă este 1,8c/1,81 ≈ 0,994c.'],
        ['Adunarea clasică a vitezelor (u = u′ + v) este valabilă pentru orice viteze, inclusiv pentru lumină.', false, 'Pentru lumină ar da c ± v; e valabilă doar la v ≪ c.']
      ],
      single: [
        { q: 'Dacă în S′ un impuls de lumină are viteza c, în S (față de care S′ se mișcă cu v) viteza lui este:',
          o: [['c + v', 0], ['c', 1], ['c − v', 0], ['c/γ', 0]],
          why: 'u′ = c ⇒ u = (c + v)/(1 + v/c) = c.' },
        { q: 'S′ se mișcă cu 0,5c față de S, iar un proiectil are în S′ viteza 0,5c (în același sens). Viteza proiectilului față de S este:',
          o: [['c', 0], ['0,8c', 1], ['0,5c', 0], ['0,75c', 0]],
          why: 'u = (0,5 + 0,5)c/(1 + 0,25) = 0,8c.' },
        { q: 'De ce, în formula compunerii relativiste, apare termenul 1 + vu′/c² la numitor?',
          o: [['ca rezultatul să nu depășească niciodată c', 1], ['pentru a transforma metrii în secunde', 0], ['pentru a face viteza negativă', 0], ['este doar o convenție de scriere', 0]],
          why: 'Termenul „strânge” rezultatul sub c și păstrează constanța vitezei luminii.' }
      ],
      combo: [{ q: 'Care dintre următoarele afirmații despre compunerea vitezelor sunt corecte?',
        s: [['Dacă u′ = c, atunci u = c, indiferent de v.', 1, 'Postulatul constanței lui c.'], ['Nicio viteză a unui corp nu depășește c.', 1, 'Rezultatul compunerii rămâne sub c.'], ['La viteze mici, u ≈ u′ + v.', 1, 'Limita clasică.'], ['Ritmul de apropiere a două nave nu poate depăși c.', 0, 'Poate depăși c: nu e viteza unui corp.']],
        o: ['1, 2 și 3', '1 și 2', '2, 3 și 4', 'toate'] }],
      short: [
        { q: 'Explicați de ce suma simplă a vitezelor nu mai este corectă la viteze apropiate de c și cum se compun vitezele relativist.',
          model: '<p>Suma simplă u = u′ + v ar da, pentru lumină, c + v, contrazicând postulatul că toți observatorii măsoară c; ar permite și viteze peste c. Formula relativistă este u = (u′ + v)/(1 + vu′/c²): numitorul „strânge” rezultatul, care rămâne sub c; dacă u′ = c, rezultă u = c. La viteze mici (v, u ≪ c) termenul vu′/c² dispare și se regăsește u ≈ u′ + v (Galilei).</p>',
          ok: ["Suma simplă ar da pentru lumină c + v și ar permite viteze peste c.", "Formula relativistă este u = (u′ + v)/(1 + vu′/c²).", "Dacă u′ = c, atunci u = c; rezultatul rămâne sub c.", "La v, u ≪ c se regăsește u ≈ u′ + v (Galilei)."], bad: [["Formula relativistă dă tot suma vitezelor, doar cu 1% mai mică.", "Fals: diferența poate fi mare."], ["Numitorul 1 + vu′/c² este egal cu 1 pentru orice viteze.", "Fals: devine important la viteze mari."], ["Rezultatul compunerii poate depăși c dacă ambele viteze sunt aproape c.", "Fals: rămâne sub c."]] }
      ],
      calc: ['compunere']
    },

    /* ============================ 8 ============================ */
    8: {
      af: [
        ['Când F este paralelă cu v, aceeași forță produce o accelerație tot mai mică pe măsură ce viteza crește.', true, 'a = F/(γ³m₀): γ crește cu v.'],
        ['Un corp cu masă de repaus nenulă poate atinge viteza luminii dacă forța este suficient de mare.', false, 'Când v → c, γ → ∞: ar trebui energie și impuls infinite.'],
        ['Masa de repaus este aceeași pentru toți observatorii.', true, 'Este invariantă; masa de mișcare m = γm₀ depinde de observator.'],
        ['În TRR impulsul unui punct material este p = m₀v.', false, 'p = γm₀v = mv.'],
        ['În mecanica relativistă accelerația are întotdeauna direcția forței.', false, 'În general nu: a = (1/m)[F − (F·v)v/c²]; coincid doar în cazuri particulare.']
      ],
      single: [
        { q: 'Pentru mișcarea rectilinie (F ∥ v), legea a II-a în TRR se scrie:',
          o: [['F = m₀a', 0], ['F = γm₀a', 0], ['F = γ³m₀a', 1], ['F = γ⁴m₀a', 0]],
          why: 'F = γ³m₀a = γ²ma; pentru F ⟂ v ar fi F = γm₀a.' },
        { q: 'Impulsul unui punct material de masă de repaus m₀ și viteză v este:',
          o: [['γm₀v', 1], ['m₀v', 0], ['m₀v/γ', 0], ['γ²m₀v', 0]],
          why: 'p = mv cu m = γm₀.' },
        { q: 'Masa de mișcare a unui corp cu masa de repaus m₀ este:',
          o: [['m = γm₀', 1], ['m = m₀/γ', 0], ['m = m₀', 0], ['m = γ²m₀', 0]],
          why: 'Crește cu viteza; m₀ rămâne invariantă.' }
      ],
      combo: [{ q: 'Care dintre următoarele afirmații despre dinamica relativistă sunt corecte?',
        s: [['Masa de repaus m₀ este aceeași în toți S.R.I.', 1, 'Invariantă.'], ['Masa de mișcare m = γm₀ crește odată cu viteza.', 1, 'γ crește cu v.'], ['Accelerația este întotdeauna paralelă cu forța.', 0, 'În general nu este.'], ['La v ≪ c se regăsește F = m₀a.', 1, 'Mecanica clasică.']],
        o: ['1, 2 și 4', '1 și 2', '3 și 4', 'toate'] }],
      short: [
        { q: 'De ce un corp cu masă de repaus nenulă nu poate atinge viteza luminii în vid?',
          model: '<p>Energia totală este E = γm₀c², cu γ = 1/√(1 − v²/c²). Când v → c, γ → ∞, deci și energia (și impulsul) ar crește fără limită. Ar fi nevoie de o energie infinită; practic, aceeași forță produce o accelerație tot mai mică (F = γ³m₀a pentru F ∥ v). Viteza se apropie de c, dar nu o atinge.</p>',
          ok: ["Energia totală este E = γm₀c², cu γ = 1/√(1 − v²/c²).", "Când v → c, γ → ∞, deci energia și impulsul cresc fără limită.", "Ar fi nevoie de o energie infinită.", "Aceeași forță dă o accelerație tot mai mică (F = γ³m₀a pentru F ∥ v)."], bad: [["Corpul nu atinge c fiindcă masa lui de repaus devine zero.", "Fals: m₀ este invariantă."], ["Corpul atinge c dacă forța este suficient de mare.", "Fals: ar trebui energie infinită."], ["Energia corpului tinde la zero când v → c.", "Fals: tinde la infinit."]] }
      ],
      calc: ['dinamica']
    },

    /* ============================ 9 ============================ */
    9: {
      af: [
        ['Un corp aflat în repaus față de un S.R.I. are energie totală zero.', false, 'Are energie de repaus E₀ = m₀c².'],
        ['Energia totală a unui corp în mișcare este E = γm₀c².', true, 'E = mc² cu m = γm₀.'],
        ['Energia cinetică relativistă este E_c = (γ − 1)m₀c².', true, 'Energia totală minus energia de repaus.'],
        ['E = mc² înseamnă că masa unui corp „se transformă” în energie.', false, 'Spune că energia are inerție (masă de mișcare) și că un corp în repaus are energie de repaus m₀c².'],
        ['Când v → c, energia unui corp cu m₀ ≠ 0 tinde la infinit.', true, 'γ → ∞.']
      ],
      single: [
        { q: 'Energia de repaus a unui corp cu masa de repaus m₀ este:',
          o: [['m₀c²', 1], ['½m₀c²', 0], ['γm₀c²', 0], ['m₀c', 0]],
          why: 'E₀ = m₀c². γm₀c² este energia totală a corpului în mișcare.' },
        { q: 'Energia cinetică a unui corp, în TRR, este:',
          o: [['(γ − 1)m₀c²', 1], ['γm₀c²', 0], ['½m₀v²', 0], ['m₀c²/γ', 0]],
          why: 'E_c = E − E₀. Formula ½m₀v² este doar limita clasică (v ≪ c).' },
        { q: 'În triunghiul energie–impuls, ipotenuza este:',
          o: [['E (energia totală)', 1], ['pc', 0], ['m₀c²', 0], ['E_c', 0]],
          why: 'E² = (pc)² + (m₀c²)²; catetele sunt pc și m₀c².' }
      ],
      combo: [{ q: 'Care dintre următoarele afirmații despre energia relativistă sunt corecte?',
        s: [['E = γm₀c².', 1, 'Energia totală.'], ['E_c = (γ − 1)m₀c².', 1, 'Energia totală minus cea de repaus.'], ['Când v → c, energia tinde la infinit.', 1, 'γ → ∞.'], ['Energia de repaus depinde de viteză.', 0, 'E₀ = m₀c² este aceeași pentru toți.']],
        o: ['1, 2 și 3', '1, 2 și 4', '2 și 3', 'toate'] }],
      short: [
        { q: 'Ce NU spune relația E = mc²? Explicați și ce sunt mc² și m₀c².',
          model: '<p><strong>m₀c²</strong> este energia de repaus (a corpului în repaus); <strong>mc² = γm₀c²</strong> este energia totală a corpului în mișcare, E = E₀ + E_c. Relația <em>nu</em> spune că masa „se transformă” în energie și nici că un corp în mișcare are „mai multă materie”: spune că energia și masa de mișcare sunt proporționale (m = E/c²) și că un corp în repaus are energie de repaus.</p>',
          ok: ["m₀c² este energia de repaus a corpului în repaus.", "mc² = γm₀c² este energia totală, E₀ + E_c.", "Masa nu se „transformă” în energie.", "Energia și masa de mișcare sunt proporționale: m = E/c²."], bad: [["E = mc² înseamnă că orice masă se transformă integral în energie.", "Fals: nu spune asta."], ["Un corp în mișcare are „mai multă materie”.", "Fals: crește energia și masa de mișcare, nu cantitatea de materie."], ["m₀c² este energia cinetică a corpului.", "Fals: e energia de repaus."]] }
      ],
      calc: ['energie', 'viteza']
    },

    /* ============================ 10 ============================ */
    10: {
      af: [
        ['Fotonul are masă de repaus nenulă.', false, 'm₀ = 0 (altfel energia i-ar deveni infinită la v = c); are însă energie, impuls și masă de mișcare.'],
        ['Energia unui foton este E = hν.', true, 'Legea lui Planck.'],
        ['Intensitatea unei radiații monocromatice este determinată de numărul de fotoni pe secundă.', true, 'Culoarea dă energia unui foton, intensitatea dă numărul lor.'],
        ['Impulsul unui foton este p = hν/c.', true, 'p = E/c = h/λ.'],
        ['Un foton cu frecvență mai mare are energie mai mică.', false, 'E = hν crește cu ν.']
      ],
      single: [
        { q: 'Energia unui foton cu frecvența ν este:',
          o: [['hν', 1], ['h/ν', 0], ['ν/h', 0], ['hν/c', 0]],
          why: 'Legea lui Planck: E = hν. (hν/c este impulsul.)' },
        { q: 'Raportul dintre energia și impulsul unui foton este:',
          o: [['c', 1], ['c²', 0], ['h', 0], ['1/c', 0]],
          why: 'E = pc ⇒ E/p = c.' },
        { q: 'Pentru un foton, masa de repaus este:',
          o: [['zero', 1], ['hν/c²', 0], ['h/c', 0], ['infinită', 0]],
          why: 'm₀ = 0; hν/c² este masa de mișcare.' }
      ],
      combo: [{ q: 'Care dintre următoarele afirmații despre foton sunt corecte?',
        s: [['Are masa de repaus zero.', 1, 'm₀ = 0.'], ['Energia lui este E = pc.', 1, 'Din triunghiul energie–impuls cu m₀ = 0.'], ['Se deplasează cu c în orice S.R.I.', 1, 'Postulatul constanței lui c.'], ['Are impuls nul.', 0, 'p = hν/c = h/λ ≠ 0.']],
        o: ['1 și 2', '1, 2 și 3', '1, 2, 3 și 4', '2 și 4'] }],
      short: [
        { q: 'De ce fotonul are masa de repaus zero? Ce legătură există între energia și impulsul lui?',
          model: '<p>Fotonul se mișcă cu v = c, deci γ = ∞. Energia lui E = γm₀c² și masa de mișcare m = γm₀ sunt însă finite (le măsurăm), așa că m₀ = m/γ = 0. Din triunghiul energie–impuls, E² = (pc)² + (m₀c²)², cu m₀ = 0 rezultă E = pc, adică p = E/c = hν/c = h/λ.</p>',
          ok: ["Fotonul se mișcă cu v = c, deci γ = ∞.", "Energia și masa de mișcare ale fotonului sunt finite, deci m₀ = m/γ = 0.", "Din triunghiul energie–impuls cu m₀ = 0 rezultă E = pc.", "Impulsul fotonului este p = E/c = hν/c."], bad: [["Fotonul are masă de repaus foarte mică, dar nenulă.", "Fals: m₀ = 0."], ["Fotonul are impuls nul, fiindcă masa de repaus este zero.", "Fals: p = hν/c ≠ 0."], ["E = pc este valabilă doar pentru corpuri cu m₀ ≠ 0.", "Fals: este tocmai cazul m₀ = 0."]] }
      ],
      calc: ['foton']
    },

    /* ============================ 11 ============================ */
    11: {
      af: [
        ['În efectul fotoelectric extern, frecvența de prag depinde de materialul catodului.', true, 'ν₀ = L_ex/h, iar L_ex este o constantă de material.'],
        ['Dacă frecvența luminii e sub frecvența de prag, creșterea intensității poate determina apariția efectului fotoelectric.', false, 'Nu: fiecare foton are hν < L_ex și energiile mai multor fotoni nu se adună.'],
        ['Energia cinetică maximă a fotoelectronilor depinde de frecvența radiației, nu de intensitate.', true, 'E_c = hν − L_ex; intensitatea schimbă doar numărul de electroni.'],
        ['Un fotoelectron poate fi extras de mai mulți fotoni care își adună energiile.', false, 'Un electron absoarbe energia unui singur foton.'],
        ['Tensiunea de stopare depinde de intensitatea luminii incidente.', false, '|e|U_s = hν − L_ex: depinde de ν și de L_ex, nu de intensitate.']
      ],
      single: [
        { q: 'Efectul fotoelectric extern se produce dacă:',
          o: [['frecvența radiației ≥ frecvența de prag', 1], ['intensitatea radiației este foarte mare, indiferent de frecvență', 0], ['frecvența este mai mică decât frecvența de prag, dar intensitatea e mare', 0], ['lungimea de undă este foarte mare', 0]],
          why: 'Condiția este hν ≥ L_ex ⇔ ν ≥ ν₀; intensitatea nu contează.' },
        { q: 'Tensiunea de stopare din efectul fotoelectric depinde de:',
          o: [['frecvența luminii și de materialul catodului', 1], ['intensitatea luminii', 0], ['numărul de fotoni pe secundă', 0], ['numai de anod', 0]],
          why: '|e|U_s = hν − L_ex: depinde de ν și de L_ex, nu de intensitate.' },
        { q: 'Panta graficului E_c(ν) al fotoelectronilor este:',
          o: [['h, aceeași pentru toate metalele', 1], ['L_ex, diferită pentru fiecare metal', 0], ['c', 0], ['|e|', 0]],
          why: 'E_c = hν − L_ex: panta h, ordonata la origine −L_ex.' }
      ],
      combo: [{ q: 'Care dintre următoarele afirmații despre efectul fotoelectric extern sunt corecte?',
        s: [['Energia cinetică maximă depinde de frecvență.', 1, 'E_c = hν − L_ex.'], ['Sub prag, o intensitate mare poate produce efect.', 0, 'Nu: fotonii luați separat nu au destulă energie.'], ['Un foton extrage cel mult un electron.', 1, 'Energiile fotonilor nu se adună.'], ['Frecvența de prag depinde de catod.', 1, 'ν₀ = L_ex/h.']],
        o: ['1, 3 și 4', '2 și 3', '1 și 2', 'toate'] }],
      short: [
        { q: '„Dacă mărim suficient intensitatea luminii incidente, putem extrage electroni din orice metal, indiferent de frecvența radiației.” Precizați dacă afirmația este corectă și justificați.',
          model: '<p><strong>Afirmația este falsă.</strong> Un electron este extras de un singur foton, iar energia unui foton este hν. Dacă ν este sub frecvența de prag, hν &lt; L<sub>ex</sub>, deci niciun foton nu are destulă energie, iar energiile mai multor fotoni nu se adună. Creșterea intensității înseamnă doar <em>mai mulți</em> fotoni, nu fotoni mai energici. Efectul apare doar dacă ν ≥ ν₀ = L<sub>ex</sub>/h, iar ν₀ depinde de metal.</p>',
          ok: ["Afirmația este falsă.", "Un electron este extras de un singur foton, cu energia hν.", "Sub prag hν < L_ex, deci niciun foton nu are destulă energie.", "Energiile mai multor fotoni nu se adună; intensitatea înseamnă mai mulți fotoni, nu fotoni mai energici."], bad: [["Afirmația este corectă: destui fotoni își adună energiile.", "Fals: energiile nu se adună."], ["Efectul apare cu întârziere, când s-a acumulat destulă energie.", "Fals: nu există acumulare."], ["Frecvența de prag nu depinde de metal.", "Fals: ν₀ = L_ex/h depinde de metal."]] },
        { q: 'Cum se pot determina constanta lui Planck și lucrul mecanic de extracție din graficul energiei cinetice maxime a fotoelectronilor în funcție de frecvență?',
          model: '<p>Din E<sub>c</sub> = hν − L<sub>ex</sub> graficul E<sub>c</sub>(ν) este o dreaptă. <strong>Panta</strong> este h (aceeași pentru toate metalele), <strong>ordonata la origine</strong> (prelungind dreapta) este −L<sub>ex</sub>, iar <strong>intersecția cu axa ν</strong> este frecvența de prag ν₀ = L<sub>ex</sub>/h.</p>',
          ok: ["E_c = hν − L_ex, deci graficul E_c(ν) este o dreaptă.", "Panta dreptei este h, aceeași pentru toate metalele.", "Ordonata la origine (prelungind dreapta) este −L_ex.", "Intersecția cu axa ν este frecvența de prag ν₀ = L_ex/h."], bad: [["Panta dreptei este L_ex și diferă de la metal la metal.", "Fals: panta este h."], ["Graficul E_c(ν) este o parabolă.", "Fals: este o dreaptă."], ["Ordonata la origine este +L_ex.", "Fals: este −L_ex."]] }
      ],
      calc: ['fotoelectric', 'prag']
    }
  };
})();
