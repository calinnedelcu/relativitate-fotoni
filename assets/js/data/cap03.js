/* Capitolul 3 — Transformările Lorentz: rezumat, glosar, bancă de întrebări */
RF.register({
  id: 3,

  summary: [
    { q: `Ce fac transformările Lorentz?`,
      a: `Sunt „dicționarul” dintre coordonatele (<var>x</var>, <var>y</var>, <var>z</var>, <var>t</var>) pe care două S.R.I. le atribuie <strong>aceluiași eveniment</strong>. Convenția: S este „fix”, S′ se mișcă față de S cu viteza <var>v</var> pe axa <var>x</var>, iar ceasurile sunt reglate să arate <var>t</var> = <var>t</var>′ = 0 când originile coincid. Se aplică oricărui eveniment, nu doar celor în care apare lumina.` },
    { q: `Scrie transformările Lorentz speciale.`,
      a: `<var>x</var>′ = γ(<var>x</var> − <var>v</var><var>t</var>); <var>t</var>′ = γ(<var>t</var> − <var>v</var><var>x</var>/<var>c</var>²); <var>y</var>′ = <var>y</var>, <var>z</var>′ = <var>z</var>. Inversele: <var>x</var> = γ(<var>x</var>′ + <var>v</var><var>t</var>′); <var>t</var> = γ(<var>t</var>′ + <var>v</var><var>x</var>′/<var>c</var>²) — aceleași formule, cu <var>v</var> → −<var>v</var>.` },
    { q: `Ce e nou față de transformările lui Galilei?`,
      a: `La Galilei: <var>x</var>′ = <var>x</var> − <var>v</var><var>t</var> și <var>t</var>′ = <var>t</var> (timp absolut). La Lorentz apare factorul γ și, mai ales, ora <var>t</var>′ depinde și de poziția <var>x</var> (termenul −<var>v</var><var>x</var>/<var>c</var>²): <strong>timpul se amestecă cu spațiul</strong>. Doar așa lumina are aceeași viteză <var>c</var> în S și în S′.` },
    { q: `Ce este factorul Lorentz γ și cum se comportă?`,
      a: `γ = 1/√(1 − <var>v</var>²/<var>c</var>²) = 1/√(1 − β²), cu β = <var>v</var>/<var>c</var>. Mereu γ ≥ 1; γ = 1 doar la <var>v</var> = 0; γ crește odată cu <var>v</var> (rămâne aproape de 1 mult timp, apoi urcă tot mai abrupt) și tinde la ∞ când <var>v</var> → <var>c</var>. Ca γ să fie real, trebuie <var>v</var> &lt; <var>c</var>.` },
    { q: `Ce devin transformările pentru v ≪ c? Dar pentru v ≈ c?`,
      a: `Pentru <var>v</var> ≪ <var>c</var>: γ → 1 și termenul <var>v</var><var>x</var>/<var>c</var>² e neglijabil, deci transformările Lorentz → transformările Galilei (mecanica clasică). Dacă <var>v</var> ≈ <var>c</var>, mișcarea se numește ultrarelativistă: γ ≫ 1 și mecanica clasică nu mai are nicio valoare.` },
    { q: `Ce rămâne la fel pentru toți observatorii?`,
      a: `Viteza luminii <var>c</var> (Postulatul I) și intervalul spațio-temporal Δ<var>s</var>; la mișcare pe <var>x</var>, și coordonatele <var>y</var>, <var>z</var>. Se schimbă <var>x</var> și <var>t</var> (adică Δ<var>x</var> și Δ<var>t</var>, luate separat). Trecerea la alt S.R.I. e ca o <strong>rotație a axelor</strong> în spațiu-timp: schimbă coordonatele, dar păstrează Δ<var>s</var>.` },
    { q: `Două evenimente sunt simultane în S. Sunt simultane și în S′?`,
      a: `În general nu: <var>t</var>′ depinde și de <var>x</var>. Rămân simultane doar dacă au aceeași <var>x</var> (diferă doar prin <var>y</var> sau <var>z</var>). Iar două evenimente produse în același loc în S, la momente diferite, nu sunt simultane în niciun alt S.R.I. Motivul fizic al nesimultaneității — capitolul 4.` }
  ],

  glossary: [
    { term: `transformările Lorentz`, def: `Regulile prin care coordonatele (x, y, z, t) ale unui eveniment într-un S.R.I. (S) devin coordonatele (x′, y′, z′, t′) ale aceluiași eveniment în alt S.R.I. (S′), care se mișcă față de S cu viteza v. Păstrează viteza luminii și intervalul Δs.` },
    { term: `transformările Galilei`, def: `Regulile clasice: x′ = x − vt, y′ = y, z′ = z, t′ = t (timp absolut). Sunt limita transformărilor Lorentz pentru v ≪ c.` },
    { term: `factorul Lorentz`, def: `γ = 1/√(1 − v²/c²) = 1/√(1 − β²), cu β = v/c. Este mereu ≥ 1; γ = 1 la v = 0 și γ → ∞ când v → c. Spune cât de departe suntem de mecanica clasică.` },
    { term: `β`, def: `Raportul β = v/c dintre viteza lui S′ față de S (sau a unui corp) și viteza luminii. Pentru S.R.I. reale, 0 ≤ β < 1.` },
    { term: `ultrarelativist`, def: `Regimul v ≈ c, în care γ ≫ 1 și mecanica clasică nu mai are nicio valoare. (La viteze doar comparabile cu c se spune, de obicei, „relativist”.)` },
    { term: `transformarea inversă`, def: `Trecerea de la S′ la S: aceleași formule ca de la S la S′, cu v înlocuit cu −v (pentru S′, sistemul S se mișcă cu −v). Factorul γ nu se schimbă.` },
    { term: `limita clasică`, def: `Cazul v ≪ c: γ ≈ 1, termenul vx/c² e neglijabil, iar transformările Lorentz se reduc la cele ale lui Galilei (mecanica clasică).` },
    { term: `S și S′`, def: `Convenția de lucru: S e sistemul „fix” (Ana, peronul), S′ e sistemul „mobil” (Bogdan, trenul), care se mișcă față de S cu viteza v pe axa x. La t = t′ = 0 originile celor două sisteme coincid.` }
  ],

  quiz: [
    {
      id: 'c3q1', type: 'single',
      scenario: `Pe un peron, două lămpi sunt montate la aceeași distanță de capătul peronului (aceeași coordonată <var>x</var>), dar la înălțimi diferite (<var>y</var> diferit). Ele se aprind simultan pentru Ana, care stă pe peron. Un tren trece pe lângă peron, pe direcția <var>x</var>; Bogdan e în tren.`,
      q: `Sunt cele două aprinderi simultane și pentru Bogdan?`,
      options: [
        { t: `Da: ora <var>t</var>′ depinde de poziția pe direcția mișcării (<var>x</var>), iar cele două evenimente au aceeași <var>x</var>.`, ok: true,
          why: `Termenul care strică simultaneitatea este −<var>v</var><var>x</var>/<var>c</var>². Cum <var>x</var> e aceeași pentru ambele lămpi, termenul e același și dispare din diferența orelor. Pe direcțiile perpendiculare pe mișcare nu se schimbă nimic.` },
        { t: `Nu: orice două evenimente simultane pentru Ana devin nesimultane pentru Bogdan, cât timp trenul se mișcă.`, ok: false,
          why: `Generalizare greșită. Nesimultaneitatea vine din diferența de <em>poziție pe direcția mișcării</em>. Aici ea este zero, deci simultaneitatea se păstrează.` },
        { t: `Nu: Bogdan vede lumina lămpii mai apropiate de el cu mai puțină întârziere, deci o percepe prima.`, ok: false,
          why: `Confuzie între ce <em>vede</em> Bogdan (depinde de distanțe și de timpul de propagare) și momentele <em>atribuite</em> evenimentelor, după ce s-au corectat întârzierile luminii. Transformările lucrează cu a doua.` },
        { t: `Da, dar numai dacă cele două lămpi sunt foarte aproape una de alta, pe verticală.`, ok: false,
          why: `Distanța pe verticală nu contează deloc: <var>t</var>′ nu depinde de <var>y</var> sau <var>z</var>. Răspunsul e „da” pentru orice diferență de înălțime.` }
      ],
      explain: `Ora <var>t</var>′ depinde de <var>t</var> și de <var>x</var> — coordonata pe direcția mișcării —, nu de <var>y</var> sau <var>z</var>.`,
      ref: { id: 'lorentz', label: 'Dicționarul Lorentz' }
    },
    {
      id: 'c3q2', type: 'single',
      scenario: `Pe peron, un petard explodează în punctul P. Peste câteva secunde (după ceasul peronului), un alt petard explodează chiar în același punct P. Un tren trece pe lângă peron, pe direcția <var>x</var>, cu o viteză oarecare.`,
      q: `Poate exista un tren (o viteză a lui S′) pentru care cele două explozii să fie simultane?`,
      options: [
        { t: `Nu: la același loc în S, diferența orelor din S′ e diferența din S înmulțită cu γ — niciodată zero.`, ok: true,
          why: `Cu Δ<var>x</var> = 0, în Δ<var>t</var>′ nu mai apare niciun termen dependent de poziție; rămâne γΔ<var>t</var>, care e nenul cât timp Δ<var>t</var> ≠ 0.` },
        { t: `Da: un tren suficient de rapid le-ar găsi simultane, pentru că ora lui depinde de viteză și de γ.`, ok: false,
          why: `Viteza trenului schimbă γ, dar γΔ<var>t</var> nu poate deveni zero. Rapiditatea nu poate „anula” o diferență de timp între evenimente din același loc.` },
        { t: `Da: un tren care s-ar mișca în sens invers, față de sensul în care am orientat axa <var>x</var>, le-ar găsi simultane.`, ok: false,
          why: `Sensul mișcării nu schimbă nimic aici: cu Δ<var>x</var> = 0, orice <var>v</var> (pozitiv sau negativ) duce la aceeași concluzie.` },
        { t: `Nu, dar numai pentru că în S′ cele două explozii ar avea loc în locuri diferite, fiindcă peronul se mișcă.`, ok: false,
          why: `E adevărat că în S′ locurile diferă (<var>x</var>′ depinde de <var>t</var>), dar nu acesta e motivul: și evenimente din locuri diferite pot fi simultane într-un alt S.R.I. Aici contează forma lui <var>t</var>′: fără termen de poziție, rămâne doar γΔ<var>t</var>.` }
      ],
      explain: `Evenimentele produse în același loc într-un S.R.I. nu pot fi simultane în niciun alt S.R.I. (decât dacă sunt același eveniment).`,
      ref: { id: 'lorentz', label: 'Dicționarul Lorentz' }
    },
    {
      id: 'c3q3', type: 'single',
      q: `Dicționarul lui Galilei dă pentru lumina trimisă înainte viteza <var>c</var> − <var>v</var> în S′, în conflict cu Postulatul I. Ce trebuie schimbat în dicționar ca viteza luminii să iasă <var>c</var> în ambele sisteme?`,
      options: [
        { t: `Nu doar regula pentru poziție: ora <var>t</var>′ trebuie să nu mai fie egală cu <var>t</var>, ci să depindă și de <var>x</var>.`, ok: true,
          why: `Aceasta e noutatea transformărilor Lorentz. Viteza e distanță ÷ durată: dacă durata din S′ rămâne cea din S, nu are cum să iasă <var>c</var> pentru amândoi observatorii.` },
        { t: `Doar regula pentru poziție: se înmulțește <var>x</var>′ cu un factor potrivit, iar ora rămâne aceeași pentru toți observatorii.`, ok: false,
          why: `Cu <var>t</var>′ = <var>t</var>, un factor în fața lui <var>x</var>′ poate repara cel mult un singur sens al luminii (înainte <em>sau</em> înapoi), niciodată pe amândouă. Pentru ambele sensuri trebuie schimbat și timpul.` },
        { t: `Viteza luminii din S trebuie scăzută cu viteza lui S′, pentru a compensa diferența dintre cele două sisteme.`, ok: false,
          why: `Exact asta face Galilei, și de aici iese <var>c</var> − <var>v</var>. Postulatul I cere ca măsurătoarea din S′ să nu arate nicio scădere.` },
        { t: `Nimic: dicționarul lui Galilei e corect, iar măsurătorile care dau <var>c</var> în S′ sunt afectate de erori de aparat.`, ok: false,
          why: `Nu sunt erori de aparat: Postulatul I e confirmat experimental, oricât de precis se măsoară.` }
      ],
      explain: `Viteza = distanță ÷ durată: ca raportul să iasă <var>c</var> pentru ambii observatori, trebuie să se schimbe nu doar distanțele, ci și duratele.`,
      ref: { id: 'poveste', label: 'De la Galilei la Lorentz' }
    },
    {
      id: 'c3q4', type: 'single',
      scenario: `Ana (în S) notează că Bogdan (în S′) se mișcă față de ea cu viteza +<var>v</var> pe axa <var>x</var>. Bogdan vrea să-și traducă observațiile în coordonatele Anei.`,
      q: `Cum arată transformarea lui Bogdan (de la S′ la S), față de cea a Anei (de la S la S′)?`,
      options: [
        { t: `Are aceeași formă, cu <var>v</var> înlocuit cu −<var>v</var>: pentru Bogdan, Ana se mișcă cu −<var>v</var>.`, ok: true,
          why: `Postulatul al II-lea: niciun S.R.I. nu e privilegiat, deci regula are aceeași formă pentru amândoi; se schimbă doar sensul mișcării relative.` },
        { t: `Are aceeași formă, dar cu γ înlocuit cu 1/γ, pentru că trecerea inversă „desface” trecerea directă.`, ok: false,
          why: `γ depinde de <var>v</var>², deci −<var>v</var> dă exact aceeași valoare a lui γ. Se schimbă semnele din paranteze, nu factorul γ.` },
        { t: `Are altă formă: sistemul „fix” S are formule mai simple decât sistemul „mobil” S′.`, ok: false,
          why: `Ar însemna un S.R.I. privilegiat, ceea ce exclude Postulatul al II-lea. „Fix” și „mobil” sunt doar etichete de convenție.` },
        { t: `Are aceeași formă, dar cu <var>c</var> înlocuit cu −<var>c</var>, fiindcă lumina ar fi măsurată în sens invers.`, ok: false,
          why: `Viteza luminii e aceeași (<var>c</var>) în ambele sisteme și nu își schimbă valoarea la inversarea transformării.` }
      ],
      explain: `Transformarea inversă = aceeași formă, cu <var>v</var> → −<var>v</var>; γ rămâne neschimbat.`,
      ref: { id: 'lorentz', label: 'Dicționarul Lorentz' }
    },
    {
      id: 'c3q5', type: 'single',
      scenario: `Într-o povestire, o navă accelerează „până la exact viteza luminii” față de Pământ, iar pilotul folosește transformările Lorentz ca să afle ce notează observatorii de pe Pământ.`,
      q: `Ce nu funcționează în această scenă, din punctul de vedere al transformărilor?`,
      options: [
        { t: `La <var>v</var> = <var>c</var>, γ nu are valoare finită: transformările nu pot lega un S.R.I. de unul care s-ar mișca față de el cu <var>c</var>.`, ok: true,
          why: `Sub radical ar apărea 1 − 1 = 0, adică γ → ∞. Transformările leagă între ele doar sisteme cu <var>v</var> &lt; <var>c</var>.` },
        { t: `La <var>v</var> = <var>c</var>, γ devine 1, deci transformările se reduc la ale lui Galilei și nu mai spun nimic nou.`, ok: false,
          why: `γ = 1 corespunde lui <var>v</var> = 0, nu lui <var>v</var> = <var>c</var>. La <var>v</var> = <var>c</var> se ajunge la γ infinit, nu la Galilei.` },
        { t: `La <var>v</var> = <var>c</var>, γ devine zero, deci toate lungimile s-ar anula, iar duratele ar deveni infinite.`, ok: false,
          why: `γ nu scade niciodată sub 1 și crește fără limită, spre infinit, când <var>v</var> → <var>c</var>.` },
        { t: `Nimic nu e în neregulă: transformările merg la orice viteză, doar că rezultatele devin foarte mari și foarte „relativiste”.`, ok: false,
          why: `La <var>v</var> = <var>c</var> nu obții „rezultate foarte mari”, ci expresii fără sens (împărțire la zero).` }
      ],
      explain: `γ → ∞ când <var>v</var> → <var>c</var>: de aceea transformările cer <var>v</var> &lt; <var>c</var>.`,
      ref: { id: 'gamma', label: 'Factorul γ' }
    },
    {
      id: 'c3q6', type: 'single',
      q: `Un inginer calculează mișcarea unui satelit față de Pământ cu transformările lui Galilei și nu greșește practic deloc. Care e motivul corect?`,
      options: [
        { t: `γ e atât de aproape de 1, iar termenul <var>v</var><var>x</var>/<var>c</var>² atât de mic, încât transformările Lorentz dau practic aceleași rezultate.`, ok: true,
          why: `Pentru <var>v</var> ≪ <var>c</var>, Lorentz se reduce la Galilei: abaterea e mult sub orice precizie de măsurare obișnuită.` },
        { t: `Transformările lui Galilei sunt valabile pentru corpurile macroscopice, iar cele ale lui Lorentz doar pentru particule foarte mici.`, ok: false,
          why: `Lorentz sunt valabile pentru orice; Galilei este doar limita lor la viteze mici. Nu mărimea corpului decide, ci raportul <var>v</var>/<var>c</var>.` },
        { t: `Satelitul se mișcă mai încet decât sunetul, iar efectele relativității apar doar la viteze supersonice.`, ok: false,
          why: `Reperul nu este viteza sunetului, ci viteza luminii. Un satelit e de zeci de mii de ori sub <var>c</var>, de aceea γ ≈ 1; un avion supersonic e la fel de „clasic”.` },
        { t: `Pentru un observator de pe Pământ satelitul e în repaus, deci relativitatea nu i se aplică.`, ok: false,
          why: `Satelitul se mișcă față de sol (are chiar vreo 8 km/s). Iar relativitatea se aplică oricând; doar efectele ei sunt aici neglijabile.` }
      ],
      explain: `Galilei nu e „greșit” și nici „pentru alte corpuri”: e limita lui Lorentz pentru <var>v</var> ≪ <var>c</var>.`,
      ref: { id: 'gamma', label: 'Factorul γ' }
    },
    {
      id: 'c3q7', type: 'single',
      scenario: `Într-o diagramă spațiu-timp (<var>x</var> pe orizontală, <var>ct</var> pe verticală) desenată pentru S, un coleg a trasat axele lui S′: axa <var>ct</var>′ este înclinată față de verticală, dar axa <var>x</var>′ coincide cu axa <var>x</var>.`,
      q: `Ce transformare a folosit colegul?`,
      options: [
        { t: `Pe cea a lui Galilei: „acum”-ul lui S′ coincide cu „acum”-ul lui S, adică <var>t</var>′ = <var>t</var> (timp absolut).`, ok: true,
          why: `Axa <var>x</var>′ e locul evenimentelor cu <var>t</var>′ = 0. Dacă ea coincide cu axa <var>x</var> (<var>t</var> = 0), cei doi observatori au același „acum”: timp absolut, deci Galilei.` },
        { t: `Pe cea a lui Lorentz, dar pentru o viteză a lui S′ atât de apropiată de zero încât axa <var>x</var>′ nu se mai distinge de axa <var>x</var>.`, ok: false,
          why: `Chiar și la viteze mici, în Lorentz axa <var>x</var>′ se înclină (puțin), simetric cu <var>ct</var>′. Coincidența exactă cu axa <var>x</var> nu apare niciodată dacă <var>v</var> ≠ 0.` },
        { t: `Pe cea a lui Lorentz, pentru o viteză a lui S′ apropiată de <var>c</var>, când axele se turtesc.`, ok: false,
          why: `Atunci ambele axe s-ar apropia de linia luminii, simetric. Desenul colegului are o axă înclinată și una nu.` },
        { t: `Pe niciuna: axele unui sistem de coordonate trebuie să fie mereu perpendiculare, deci desenul colegului e greșit.`, ok: false,
          why: `Perpendiculare sunt axele lui S <em>în desenul lui S</em>. Axele lui S′ apar înclinate în desenul lui S în ambele transformări; în desenul lui S′ ele ar fi perpendiculare.` }
      ],
      explain: `Axa <var>x</var>′ orizontală = „acum” comun = timp absolut; în Lorentz ambele axe se înclină.`,
      ref: { id: 'amestec', label: 'Timpul se amestecă cu spațiul' }
    },
    {
      id: 'c3q8', type: 'single',
      q: `Cum se comportă factorul γ când viteza lui S′ față de S crește de la 0 spre <var>c</var>?`,
      options: [
        { t: `Pornește de la 1, rămâne aproape de 1 mult timp, apoi crește tot mai abrupt și tinde la infinit lângă <var>c</var>.`, ok: true,
          why: `Exact forma curbei din γ-metru: aproape plată la început, un „perete” lângă <var>c</var>.` },
        { t: `Crește proporțional cu <var>v</var>, deci ajunge la 2 când <var>v</var> = <var>c</var>/2 și nu mai are limită superioară.`, ok: false,
          why: `γ nu crește liniar: la <var>c</var>/2 are doar vreo 1,15. Creșterea e mică pe cea mai mare parte a intervalului și explozivă lângă <var>c</var>.` },
        { t: `Scade de la 1 spre 0, pentru că durata și lungimile se micșorează odată cu viteza lui S′.`, ok: false,
          why: `Confuzie cu 1/γ. γ nu coboară niciodată sub 1; în anumite măsurători scad alte mărimi (vezi capitolele 5–6), nu γ.` },
        { t: `Rămâne 1 pentru orice <var>v</var> &lt; <var>c</var> și devine infinit exact în <var>v</var> = <var>c</var>, ca o treaptă bruscă, fără nicio creștere între.`, ok: false,
          why: `γ se abate de la 1 pentru orice <var>v</var> ≠ 0, doar că abaterea e minusculă la viteze mici. Creșterea e continuă, nu în treaptă.` }
      ],
      explain: `γ ≥ 1: foarte aproape de 1 la viteze mici, infinit la <var>c</var>.`,
      ref: { id: 'gamma', label: 'Factorul γ' }
    },
    {
      id: 'c3q9', type: 'single',
      q: `Ce reprezintă numerele (<var>x</var>′, <var>t</var>′) pe care transformările Lorentz le dau pentru un eveniment?`,
      options: [
        { t: `Locul și ora atribuite evenimentului de un observator din S′, cu rigle și ceasuri sincronizate în sistemul lui.`, ok: true,
          why: `Transformările lucrează cu coordonatele evenimentului, nu cu momentul în care semnalul ajunge la ochii cuiva.` },
        { t: `Locul și momentul în care observatorul din S′ vede lumina evenimentului ajungând la ochii lui, adică momentul recepției.`, ok: false,
          why: `Ar include și timpul de propagare al luminii, care depinde de distanța până la observator. Transformările dau coordonatele evenimentului, nu momentul recepției semnalului.` },
        { t: `Aspectul evenimentului într-o fotografie făcută din S′ la momentul <var>t</var>′, așa cum îl surprinde aparatul.`, ok: false,
          why: `O fotografie prinde lumină sosită simultan la aparat din puncte aflate la distanțe diferite, deci plecată din momente diferite. E altceva decât coordonatele unui eveniment.` },
        { t: `Valori „aparente”, pe când cele din S sunt „reale”, fiindcă S e sistemul în repaus.`, ok: false,
          why: `Nu există coordonate „mai reale”: S și S′ sunt la fel de îndreptățite (Postulatul al II-lea); ambele seturi sunt rezultate de măsurători.` }
      ],
      explain: `Transformările traduc coordonate măsurate, nu „cum arată” lucrurile.`,
      ref: { id: 'amestec', label: 'Timpul se amestecă cu spațiul' }
    },
    {
      id: 'c3q10', type: 'multi',
      q: `Alege toate afirmațiile corecte despre transformările Lorentz speciale (S′ se mișcă pe axa <var>x</var> față de S; originile coincid la <var>t</var> = <var>t</var>′ = 0):`,
      options: [
        { t: `Poziția <var>x</var>′ a unui eveniment depinde și de <var>x</var>, și de <var>t</var>.`, ok: true,
          why: `Prin termenul −<var>v</var><var>t</var>: în timpul <var>t</var>, S′ a înaintat.` },
        { t: `Ora <var>t</var>′ a unui eveniment depinde și de <var>t</var>, și de <var>x</var>.`, ok: true,
          why: `Prin termenul −<var>v</var><var>x</var>/<var>c</var>²: aici e diferența față de Galilei.` },
        { t: `Coordonatele <var>y</var> și <var>z</var> ale unui eveniment sunt aceleași în S și în S′.`, ok: true,
          why: `Pe direcțiile perpendiculare pe mișcare nu se schimbă nimic: <var>y</var>′ = <var>y</var>, <var>z</var>′ = <var>z</var>.` },
        { t: `Ora <var>t</var>′ depinde doar de <var>t</var>, ca în mecanica clasică; poziția este singura care se amestecă.`, ok: false,
          why: `Aceasta e ipoteza timpului absolut (Galilei). În Lorentz, <var>t</var>′ conține și poziția.` },
        { t: `Se aplică numai evenimentelor în care apare lumina.`, ok: false,
          why: `Se aplică oricărui eveniment: un fulger, o ciocnire, o bătaie de ceas. Lumina a fost doar cheia prin care s-au găsit.` }
      ],
      explain: `Lorentz = Galilei + γ + o corecție de timp care depinde de poziție.`,
      ref: { id: 'lorentz', label: 'Dicționarul Lorentz' }
    },
    {
      id: 'c3q11', type: 'multi',
      q: `Care dintre mărimile următoare au aceeași valoare în S și în S′, dacă trecerea se face cu transformarea Lorentz?`,
      options: [
        { t: `Viteza luminii în vid.`, ok: true, why: `Postulatul I: <var>c</var> în orice S.R.I.` },
        { t: `Intervalul spațio-temporal Δ<var>s</var> dintre două evenimente.`, ok: true,
          why: `Transformarea Lorentz e, în spațiu-timp, ca o rotație a axelor: schimbă Δ<var>x</var> și Δ<var>t</var>, dar păstrează combinația Δ<var>s</var>.` },
        { t: `Coordonata <var>y</var> a unui eveniment (mișcarea relativă fiind pe <var>x</var>).`, ok: true, why: `<var>y</var>′ = <var>y</var>.` },
        { t: `Durata Δ<var>t</var> dintre două evenimente.`, ok: false,
          why: `Se schimbă: Δ<var>t</var>′ depinde de Δ<var>t</var> și de Δ<var>x</var>.` },
        { t: `Distanța Δ<var>x</var> dintre două evenimente, pe direcția mișcării.`, ok: false,
          why: `Se schimbă: Δ<var>x</var>′ depinde de Δ<var>x</var> și de Δ<var>t</var>.` }
      ],
      explain: `Se schimbă <var>x</var> și <var>t</var> separat; rămân la fel <var>c</var>, Δ<var>s</var>, <var>y</var> și <var>z</var>.`,
      ref: { id: 'schimba', label: 'Ce se schimbă și ce rămâne la fel' }
    },
    {
      id: 'c3q12', type: 'multi',
      scenario: `Un tren merge cu 30 m/s față de peron.`,
      q: `Care dintre afirmațiile următoare sunt corecte?`,
      options: [
        { t: `γ e atât de aproape de 1, încât diferența nu poate fi observată prin măsurători obișnuite.`, ok: true,
          why: `La <var>v</var>/<var>c</var> ≈ 10⁻⁷, abaterea lui γ față de 1 e sub 10⁻¹⁴.` },
        { t: `Transformările Lorentz rămân valabile și aici, iar rezultatele lor coincid practic cu cele ale lui Galilei.`, ok: true,
          why: `Lorentz se aplică mereu; la viteze mici ele dau practic ce dă Galilei.` },
        { t: `Termenul <var>v</var><var>x</var>/<var>c</var>² din ora <var>t</var>′ e atât de mic încât ceasurile trenului și ale peronului practic nu se deosebesc.`, ok: true,
          why: `<var>c</var>² e uriaș, deci termenul e neglijabil la distanțe și viteze obișnuite.` },
        { t: `Pentru acest tren transformările Lorentz nu se mai aplică; se aplică exact cele ale lui Galilei.`, ok: false,
          why: `Galilei nu e o altă teorie „exactă” pentru trenuri, ci o aproximație extrem de bună a lui Lorentz.` },
        { t: `Ora <var>t</var>′ nu depinde deloc de <var>x</var>, deci simultaneitatea este absolută, exact.`, ok: false,
          why: `Dependența de <var>x</var> există mereu (dacă <var>v</var> ≠ 0); aici e doar minusculă, nu inexistentă.` }
      ],
      explain: `Viteză mică ⟹ efectele sunt neglijabile, nu inexistente: Galilei e limita lui Lorentz.`,
      ref: { id: 'gamma', label: 'Factorul γ' }
    },
    {
      id: 'c3q13', type: 'multi',
      q: `În diagrama <var>x</var>–<var>ct</var> a lui S, desenată cu transformarea Lorentz pentru <var>v</var> &gt; 0, care afirmații sunt corecte?`,
      options: [
        { t: `Axa <var>ct</var>′ (punctele cu <var>x</var>′ = 0) este drumul în spațiu-timp al originii lui S′.`, ok: true,
          why: `Originea lui S′ se mișcă cu <var>v</var> față de S: <var>x</var> = <var>v</var><var>t</var>.` },
        { t: `Axele <var>x</var>′ și <var>ct</var>′ sunt înclinate simetric față de linia luminii.`, ok: true,
          why: `Lumina e „bisectoarea” axelor lui S′, exact cum e și pentru S: de aceea <var>c</var> iese la fel.` },
        { t: `Evenimentele aflate pe o dreaptă paralelă cu axa <var>x</var>′ sunt simultane pentru S′.`, ok: true,
          why: `Axa <var>x</var>′ e locul lui <var>t</var>′ = 0; paralelele ei sunt liniile <var>t</var>′ = constant.` },
        { t: `Evenimentele aflate pe o dreaptă paralelă cu axa <var>x</var> sunt simultane pentru S′.`, ok: false,
          why: `Sunt simultane pentru S (aceeași <var>ct</var>). Pentru S′, simultane sunt cele de pe paralele la <var>x</var>′.` },
        { t: `Lumina apare la 45° în desenul lui S, dar înclinată diferit în desenul lui S′.`, ok: false,
          why: `Asta s-ar întâmpla la Galilei. În Lorentz lumina e la 45° în ambele desene: același <var>c</var>.` }
      ],
      explain: `În desenul lui S, „acum”-ul lui S′ este înclinat; lumina rămâne bisectoarea axelor ambilor observatori.`,
      ref: { id: 'amestec', label: 'Timpul se amestecă cu spațiul' }
    },
    {
      id: 'c3q14', type: 'multi',
      q: `Alege toate afirmațiile corecte despre factorul γ:`,
      options: [
        { t: `γ = 1 doar când S′ stă față de S; atunci transformările se reduc la <var>x</var>′ = <var>x</var>, <var>t</var>′ = <var>t</var>.`, ok: true,
          why: `La <var>v</var> = 0 nu mai e nimic de „tradus”.` },
        { t: `Cu cât S′ se mișcă mai repede față de S, cu atât γ este mai mare.`, ok: true,
          why: `γ crește odată cu <var>v</var> și tinde la infinit când <var>v</var> → <var>c</var>.` },
        { t: `γ are aceeași valoare în transformarea de la S la S′ și în cea inversă, de la S′ la S.`, ok: true,
          why: `γ depinde de <var>v</var>², deci nu simte sensul mișcării.` },
        { t: `La viteze mici, γ poate fi mai mic decât 1, ceea ce corespunde unei „micșorări”.`, ok: false,
          why: `γ ≥ 1 mereu: sub radical e 1 − <var>v</var>²/<var>c</var>², un număr cel mult 1, iar γ e inversul rădăcinii lui.` },
        { t: `γ tinde la 0 când <var>v</var> se apropie de <var>c</var>.`, ok: false,
          why: `Tocmai invers: γ tinde la infinit.` }
      ],
      explain: `γ ≥ 1; crește cu <var>v</var>; nu depinde de sensul mișcării.`,
      ref: { id: 'gamma', label: 'Factorul γ' }
    },
    {
      id: 'c3q15', type: 'spot',
      q: `Raționamentul de mai jos „arată” că transformările Lorentz contrazic Postulatul I. Care este <strong>primul</strong> pas greșit?`,
      steps: [
        { t: `Un impuls de lumină pleacă din originea comună, la <var>t</var> = <var>t</var>′ = 0, în sensul +<var>x</var>. În S, la momentul <var>t</var>, el se află la <var>x</var> = <var>c</var><var>t</var>.` },
        { t: `Poziția lui în S′ se obține cu <var>x</var>′ = γ(<var>x</var> − <var>v</var><var>t</var>), deci <var>x</var>′ = γ(<var>c</var> − <var>v</var>)<var>t</var>.` },
        { t: `Momentul corespunzător în S′ este <var>t</var>′ = <var>t</var>, fiindcă ceasurile merg la fel pentru toți observatorii.`, bad: true,
          why: `Aici e greșeala: în transformările Lorentz ora nu mai e <var>t</var>′ = <var>t</var>, ci <var>t</var>′ = γ(<var>t</var> − <var>v</var><var>x</var>/<var>c</var>²). Cu ora corectă, raportul <var>x</var>′/<var>t</var>′ iese exact <var>c</var>. Contradicția apare doar din amestecul dintre regula Lorentz pentru poziție și regula Galilei pentru timp.` },
        { t: `Viteza măsurată în S′ ar fi <var>x</var>′/<var>t</var>′ = γ(<var>c</var> − <var>v</var>), diferită de <var>c</var>.` },
        { t: `Concluzie: transformările Lorentz contrazic Postulatul I.` }
      ],
      explain: `Dacă schimbi regula pentru poziție, trebuie s-o schimbi și pe cea pentru timp: separat, niciuna nu păstrează <var>c</var>.`,
      ref: { id: 'poveste', label: 'De la Galilei la Lorentz' }
    },
    {
      id: 'c3q16', type: 'spot',
      q: `Care este <strong>primul</strong> pas greșit în raționamentul despre transformarea inversă?`,
      steps: [
        { t: `S′ se mișcă față de S cu viteza +<var>v</var> pe axa <var>x</var>.` },
        { t: `Deci, văzut din S′, sistemul S se mișcă cu −<var>v</var>.` },
        { t: `Cele două sisteme sunt la fel de „bune” (Postulatul al II-lea), așa că transformarea de la S′ la S are aceeași formă ca cea de la S la S′, cu <var>v</var> schimbat în −<var>v</var>.` },
        { t: `Factorul γ depinde de <var>v</var>; fiindcă sensul s-a inversat, în transformarea inversă apare 1/γ.`, bad: true,
          why: `γ conține pe <var>v</var> la pătrat: −<var>v</var> dă exact aceeași valoare a lui γ. Se schimbă semnele lui <var>v</var> din <var>x</var>′ + <var>v</var><var>t</var>′ și <var>t</var>′ + <var>v</var><var>x</var>′/<var>c</var>², nu factorul γ.` },
        { t: `Rezultă <var>x</var> = γ(<var>x</var>′ + <var>v</var><var>t</var>′) și <var>t</var> = γ(<var>t</var>′ + <var>v</var><var>x</var>′/<var>c</var>²).` }
      ],
      explain: `Inversarea sensului schimbă semnul lui <var>v</var>, nu valoarea lui γ.`,
      ref: { id: 'lorentz', label: 'Dicționarul Lorentz' }
    },
    {
      id: 'c3q17', type: 'spot',
      q: `Care este <strong>primul</strong> pas greșit în raționamentul despre simultaneitate?`,
      steps: [
        { t: `Două evenimente au aceeași coordonată de timp <var>t</var> în S, dar sunt în locuri diferite pe axa <var>x</var>.` },
        { t: `Pentru S′, ora fiecărui eveniment este <var>t</var>′ = γ(<var>t</var> − <var>v</var><var>x</var>/<var>c</var>²).` },
        { t: `Primul termen din paranteză, <var>t</var>, este același pentru ambele evenimente.` },
        { t: `Deci ora <var>t</var>′ este aceeași pentru ambele evenimente, iar ele sunt simultane și în S′.`, bad: true,
          why: `Termenul <var>v</var><var>x</var>/<var>c</var>² nu e același: locurile (<var>x</var>) diferă. Diferența dintre cele două ore <var>t</var>′ provine tocmai din el.` },
        { t: `Prin urmare, simultaneitatea nu depinde de observator.` }
      ],
      explain: `În <var>t</var>′ intră și poziția: evenimente din locuri diferite capătă, în general, ore diferite în S′.`,
      ref: { id: 'amestec', label: 'Timpul se amestecă cu spațiul' }
    },
    {
      id: 'c3q18', type: 'spot',
      q: `Care este <strong>primul</strong> pas greșit în raționamentul despre când mai merge Galilei?`,
      steps: [
        { t: `γ = 1/√(1 − <var>v</var>²/<var>c</var>²) este mereu cel puțin 1.` },
        { t: `Cu cât γ − 1 este mai mare, cu atât transformările Lorentz se abat mai mult de cele ale lui Galilei.` },
        { t: `Un tren obișnuit are γ − 1 de ordinul 10⁻¹⁵.` },
        { t: `Deci și pentru tren abaterea față de Galilei e la fel de importantă ca pentru o navă cu 0,9 <var>c</var>: orice γ &gt; 1 înseamnă efecte relativiste mari.`, bad: true,
          why: `γ &gt; 1 spune doar că nu ești exact în lumea lui Galilei. Mărimea abaterii o dă γ − 1: aici ~10⁻¹⁵, absolut neglijabilă; pentru nava la 0,9 <var>c</var>, γ − 1 depășește 1. Contrazice chiar pașii 2–3.` },
        { t: `Prin urmare, nimeni nu poate folosi legitim transformările lui Galilei.` }
      ],
      explain: `Nu „γ ≠ 1” contează, ci <strong>cât de mult</strong> diferă γ de 1.`,
      ref: { id: 'gamma', label: 'Factorul γ' }
    },
    {
      id: 'c3q19', type: 'single',
      scenario: `Un felinar de pe peron stă aprins toată noaptea în același loc, la <var>x</var> constant. Bogdan trece prin gară cu un tren care merge cu viteza <var>v</var> pe axa <var>x</var> și are ceasuri sincronizate în tot trenul.`,
      q: `Cum descrie Bogdan poziția felinarului în timp?`,
      options: [
        { t: `<var>x</var>′ se schimbă în timp: felinarul se îndepărtează de Bogdan, în sens invers mișcării trenului.`, ok: true,
          why: `<var>x</var>′ conține termenul −<var>v</var><var>t</var>: la <var>x</var> constant, <var>x</var>′ scade pe măsură ce trece timpul. Felinarul, în repaus în S, se mișcă în S′ cu −<var>v</var>.` },
        { t: `Felinarul rămâne la aceeași <var>x</var>′ pentru Bogdan, fiindcă el nu s-a mișcat deloc de pe peron toată noaptea.`, ok: false,
          why: `„Nu s-a mișcat” e adevărat doar față de peron. Poziția <var>x</var>′ se măsoară față de tren, iar trenul înaintează.` },
        { t: `Felinarul e în repaus față de tren numai dacă trenul merge destul de repede, cu γ mare.`, ok: false,
          why: `În niciun caz nu devine felinarul „în repaus față de tren”: asta ar cere ca trenul să stea față de peron.` },
        { t: `Felinarul pare în mișcare numai în relativitate; în mecanica clasică ar rămâne la loc.`, ok: false,
          why: `Și la Galilei <var>x</var>′ = <var>x</var> − <var>v</var><var>t</var> arată felinarul în mișcare cu −<var>v</var>. Dependența lui <var>x</var>′ de <var>t</var> nu e nouă; nouă e dependența lui <var>t</var>′ de <var>x</var>.` }
      ],
      explain: `<var>x</var>′ depinde de <var>t</var> (trenul înaintează) în ambele transformări; noutatea e că și <var>t</var>′ depinde de <var>x</var>.`,
      ref: { id: 'lorentz', label: 'Dicționarul Lorentz' }
    },
    {
      id: 'c3q20', type: 'single',
      scenario: `Într-un accelerator, un proton se mișcă față de laborator cu o viteză atât de apropiată de <var>c</var>, încât γ ≈ 7000.`,
      q: `Care afirmație este corectă?`,
      options: [
        { t: `Ultrarelativistă: <var>v</var> e încă sub <var>c</var>, iar un S.R.I. legat de proton există și se leagă de laborator prin Lorentz.`, ok: true,
          why: `Orice γ finit este permis: cât timp <var>v</var> &lt; <var>c</var>, transformările există, oricât de mare ar fi γ.` },
        { t: `Viteza protonului depășește <var>c</var>, de aceea γ iese atât de mare — semn că o particulă poate întrece lumina.`, ok: false,
          why: `γ mare înseamnă <var>v</var> foarte aproape de <var>c</var>, dar tot sub <var>c</var>: la <var>v</var> &gt; <var>c</var>, γ nici nu mai e număr real.` },
        { t: `Un S.R.I. legat de proton nu există, fiindcă γ este prea mare pentru ca transformările să funcționeze.`, ok: false,
          why: `Doar γ infinit ar fi interzis (<var>v</var> = <var>c</var>). Un γ de 7000, oricât ar părea de mare, e perfect acceptabil.` },
        { t: `La asemenea viteze, transformările lui Galilei devin mai precise decât ale lui Lorentz.`, ok: false,
          why: `Invers: Galilei e bun doar la <var>v</var> ≪ <var>c</var>; aici ar greși enorm.` }
      ],
      explain: `γ foarte mare = <var>v</var> foarte aproape de <var>c</var>, dar încă sub <var>c</var>: regim ultrarelativist, nu „imposibil”.`,
      ref: { id: 'gamma', label: 'Factorul γ' }
    }
  ]
});
