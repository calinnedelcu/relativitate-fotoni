/* Capitolul 6 — Dilatarea timpului și gemenii — rezumat, glosar, bancă de întrebări */
RF.register({
  id: 6,

  summary: [
    { q: `Ce este durata proprie?`,
      a: `Durata dintre două evenimente care se petrec în același loc, măsurată de un singur ceas aflat în repaus în sistemul propriu (<var>S</var>′). Este cea mai mică dintre duratele măsurate din S.R.I. diferite.` },
    { q: `Enunță dilatarea intervalelor temporale.`,
      a: `În sistemul propriu (<var>S</var>′) timpul „curge” mai încet decât în <var>S</var>: pentru aceeași pereche de evenimente, observatorul din <var>S</var>, față de care ceasul se mișcă, măsoară o durată mai mare: Δ<var>t</var> = γΔ<var>t</var>′, γ ≥ 1.` },
    { q: `De ce un ceas în mișcare merge mai încet? (ceasul cu lumină)`,
      a: `Văzută de observatorul față de care ceasul se mișcă, lumina parcurge o diagonală mai lungă între oglinzi. Viteza ei este totuși aceeași (<var>c</var>, Postulatul I), deci fiecare tic-tac durează mai mult.` },
    { q: `Efectul este reciproc?`,
      a: `Da, cât timp mișcarea relativă este uniformă: fiecare observator vede ceasul celuilalt mergând mai încet și pe al lui normal. Nu există un S.R.I. privilegiat.` },
    { q: `Explică paradoxul gemenilor.`,
      a: `Geamănul care călătorește se întoarce mai tânăr. Nu e contradicție: gemenii nu sunt simetrici, fiindcă cel care se întoarce își schimbă S.R.I. (drumul lui în spațiu-timp nu e drept). Ceasurile se compară direct la revedere, în același loc.` },
    { q: `Ce se întâmplă la viteze mici?`,
      a: `γ → 1, deci Δ<var>t</var> ≈ Δ<var>t</var>′: efectul dispare și rămâne timpul absolut al mecanicii clasice.` }
  ],

  glossary: [
    { term: `durata proprie`, def: `Durata dintre două evenimente petrecute în același loc, măsurată de un singur ceas aflat în repaus (în sistemul propriu). Este cea mai mică durată posibilă.` },
    { term: `dilatarea timpului`, def: `Δt = γΔt′: observatorul față de care ceasul se mișcă măsoară o durată de γ ori mai mare decât durata proprie.` },
    { term: `ceas cu lumină`, def: `Ceas ideal: un impuls de lumină care face du-te-vino între două oglinzi; un du-te-vino = un tic-tac.` },
    { term: `paradoxul gemenilor`, def: `Doi gemeni, dintre care unul călătorește și se întoarce, se revăd de vârste diferite (cel care a călătorit e mai tânăr); nu e contradicție, fiindcă situația lor nu e simetrică.` },
    { term: `linie de univers`, def: `Drumul unui corp în spațiu-timp, adică succesiunea evenimentelor prin care trece.` },
    { term: `timp propriu`, def: `Timpul măsurat de un ceas de-a lungul liniei sale de univers; pe ceasul lui, călătorul simte timpul trecând normal.` }
  ],

  quiz: [
    {
      id: 'c6q1', type: 'single',
      q: `Între ce evenimente se măsoară <strong>durata proprie</strong>?`,
      options: [
        { t: `Între două evenimente petrecute în același loc, măsurate de un singur ceas de acolo.`, ok: true, why: `Exact: este durata măsurată de ceasul care „însoțește” fenomenul, în sistemul în care acesta stă pe loc.` },
        { t: `Între două evenimente aflate în locuri diferite, măsurate cu două ceasuri sincronizate.`, ok: false, why: `Așa se măsoară durata într-un sistem față de care fenomenul se mișcă (nu cea proprie).` },
        { t: `Între oricare două evenimente, dar numai în S.R.I. al Pământului, luat ca sistem de referință.`, ok: false, why: `Pământul nu e privilegiat; durata proprie depinde de unde stă ceasul pe loc.` },
        { t: `Între două evenimente legate de lumină (emisie și recepție), indiferent unde stau ceasurile.`, ok: false, why: `Nu are legătură cu lumina; contează că evenimentele sunt în același loc.` }
      ],
      explain: `Durata proprie = durata „de lângă ceas”; din orice alt S.R.I. aceeași pereche de evenimente durează mai mult.`,
      ref: { id: 'proprie', label: 'Durata proprie' }
    },
    {
      id: 'c6q2', type: 'single',
      scenario: `Două observatoare măsoară durata aceluiași fenomen: unul stă lângă el, celălalt îl vede trecând în mișcare uniformă.`,
      q: `Care dintre durate este cea proprie și cum se compară?`,
      options: [
        { t: `Cea măsurată de observatorul de lângă fenomen; este mai mică.`, ok: true, why: `Durata proprie e minimă: Δ<var>t</var> = γΔ<var>t</var>′ ≥ Δ<var>t</var>′.` },
        { t: `Cea măsurată de observatorul care vede fenomenul în mișcare; este mai mică.`, ok: false, why: `Invers: acela măsoară o durată dilatată (mai mare).` },
        { t: `Sunt egale, pentru că fenomenul este același.`, ok: false, why: `Fenomenul e același, dar duratele măsurate diferă: timpul nu e absolut.` },
        { t: `Nu se pot compara, pentru că observatorii nu se află în același loc.`, ok: false, why: `Se pot compara; relația este chiar Δ<var>t</var> = γΔ<var>t</var>′.` }
      ],
      explain: `Durata proprie este cea mai mică posibilă.`,
      ref: { id: 'proprie', label: 'Durata proprie' }
    },
    {
      id: 'c6q3', type: 'multi',
      q: `Alege toate afirmațiile corecte despre ceasul cu lumină care se mișcă față de Ana:`,
      options: [
        { t: `Pentru Ana, lumina parcurge între oglinzi o cale mai lungă decât drumul drept.`, ok: true, why: `Diagonala este mai lungă decât perpendiculara dintre oglinzi.` },
        { t: `Viteza luminii rămâne <var>c</var>, deci un tic-tac durează mai mult pentru Ana.`, ok: true, why: `Aceeași viteză pe o cale mai lungă înseamnă mai mult timp.` },
        { t: `Pentru Bogdan, care stă lângă ceas, nimic nu este neobișnuit.`, ok: true, why: `El vede lumina mergând drept și ceasul bătând normal.` },
        { t: `Lumina se deplasează mai încet pe diagonală, ca să ajungă „la timp”.`, ok: false, why: `Viteza luminii nu se schimbă: tocmai asta forțează dilatarea timpului.` },
        { t: `Ceasul se strică din cauza vitezei și de aceea bate mai rar.`, ok: false, why: `Nu e defect: orice ceas, chiar și biologic, ar merge la fel.` }
      ],
      explain: `Cale mai lungă + aceeași viteză a luminii = durată mai mare între tic-taci.`,
      ref: { id: 'ceas', label: 'Ceasul cu lumină' }
    },
    {
      id: 'c6q4', type: 'single',
      scenario: `Bogdan trece pe lângă stația Anei cu o viteză apropiată de <var>c</var>. Ana spune: „ceasul lui merge încet”.`,
      q: `Ce spune Bogdan despre ceasul Anei?`,
      options: [
        { t: `Că ceasul Anei merge mai încet și al lui normal.`, ok: true, why: `Efectul este reciproc: fiecare își vede ceasul normal și pe al celuilalt dilatat.` },
        { t: `Că ceasul Anei merge mai repede.`, ok: false, why: `Nu există o asimetrie care să facă ceasul Anei să meargă mai repede.` },
        { t: `Că ceasul Anei merge normal, iar numai al lui este încetinit.`, ok: false, why: `Ar însemna că Bogdan poate „simți” că el e cel care se mișcă — interzis de Postulatul al II-lea.` },
        { t: `Nimic: Bogdan nu poate vedea ceasul Anei din cauza vitezei.`, ok: false, why: `Vederea nu e problema; vorbim de măsurători cu ceasuri sincronizate.` }
      ],
      explain: `Cât timp mișcarea e uniformă, dilatarea timpului este simetrică.`,
      ref: { id: 'reciproc', label: 'Efectul este reciproc' }
    },
    {
      id: 'c6q5', type: 'single',
      q: `Dacă efectul e reciproc, de ce nu se contrazic doi observatori inerțiali?`,
      options: [
        { t: `Pentru că ceasurile nu se pot compara direct (se depărtează), iar fiecare folosește ceasuri sincronizate altfel.`, ok: true, why: `Fiecare folosește rigla și ceasurile lui; nu există o comparație „în același loc” fără întoarcere.` },
        { t: `Pentru că unul dintre ei greșește la măsurare, deși din interior nu se poate ști care dintre cei doi.`, ok: false, why: `Ambii măsoară corect, fiecare în S.R.I. al lui.` },
        { t: `Pentru că timpul „adevărat” este al celui care stă pe loc, iar celălalt vede doar o iluzie optică, nu o dilatare reală.`, ok: false, why: `Nu există un „stă pe loc” absolut.` },
        { t: `Pentru că dilatarea se anulează între ei, ca două efecte egale și de sens contrar, deci niciunul nu observă nimic.`, ok: false, why: `Nu se anulează: fiecare vede dilatat ceasul celuilalt.` }
      ],
      explain: `Contradicția ar apărea numai dacă ar exista un timp comun tuturor — tocmai asta cade.`,
      ref: { id: 'reciproc', label: 'Efectul este reciproc' }
    },
    {
      id: 'c6q6', type: 'spot',
      q: `Care este <strong>primul</strong> pas greșit al raționamentului?`,
      steps: [
        { t: `Bogdan călătorește cu 0,9 <var>c</var>; Ana vede ceasul lui mergând mai încet.` },
        { t: `Ceasul lui Bogdan funcționează perfect.` },
        { t: `Deci pentru Bogdan, timpul însuși trece mai încet și el „simte” că ceasul lui e lent.`, bad: true, why: `Bogdan nu simte nimic neobișnuit: pentru el ceasul și timpul sunt normale. Încetinirea este o comparație din alt S.R.I.` },
        { t: `Prin urmare, Bogdan ar putea afla că se mișcă doar din ritmul propriului ceas.` }
      ],
      explain: `Dacă Bogdan ar simți încetinirea, ar avea un detector al mișcării uniforme — imposibil.`,
      ref: { id: 'mituri', label: 'Mituri vs. realitate' }
    },
    {
      id: 'c6q7', type: 'single',
      q: `De ce nu sunt gemenii simetrici în paradoxul gemenilor?`,
      options: [
        { t: `Pentru că Bogdan își schimbă S.R.I. la întoarcere, iar Ana rămâne într-unul singur.`, ok: true, why: `Traseul lui în spațiu-timp nu e drept; asimetria e reală.` },
        { t: `Pentru că Bogdan călătorește mai repede decât lumina și de aceea îmbătrânește altfel decât Ana.`, ok: false, why: `Nimic nu depășește <var>c</var>.` },
        { t: `Pentru că accelerația însăși face ceasul lui să meargă mai încet, indiferent de viteza atinsă.`, ok: false, why: `Accelerația nu încetinește ceasul; ea doar marchează schimbarea de S.R.I.` },
        { t: `Pentru că Ana este pe Pământ, care este un sistem absolut, față de care se măsoară orice mișcare.`, ok: false, why: `Nu există sisteme absolute.` }
      ],
      explain: `Fără întoarcere, cei doi nu s-ar mai revedea și n-ar avea cum să-și compare ceasurile.`,
      ref: { id: 'gemeni', label: 'Paradoxul gemenilor' }
    },
    {
      id: 'c6q8', type: 'single',
      q: `La revedere, cine este mai tânăr și cum se verifică asta fără ambiguitate?`,
      options: [
        { t: `Bogdan; ceasurile se compară direct, în același loc și moment, deci fără ambiguitate.`, ok: true, why: `Cum se întâlnesc, nu mai contează sistemul de referință: citești două ceasuri alăturate.` },
        { t: `Ana; Bogdan este cel care a încetinit și a rămas în urmă cu timpul propriu.`, ok: false, why: `Pe linia mai lungă în spațiu-timp (cea a Anei) s-a scurs mai mult timp propriu.` },
        { t: `Au aceeași vârstă, pentru că efectul este reciproc și deci se compensează la întoarcere.`, ok: false, why: `Reciprocitatea e doar pe durata mișcării uniforme; la revedere diferența este reală.` },
        { t: `Nu se poate spune, depinde de observatorul care compară ceasurile în timpul călătoriei.`, ok: false, why: `La revedere ei sunt împreună; ce arată ceasurile este același pentru toți.` }
      ],
      explain: `Compararea în același loc și moment elimină orice dispută de „punct de vedere”.`,
      ref: { id: 'gemeni', label: 'Paradoxul gemenilor' }
    },
    {
      id: 'c6q9', type: 'multi',
      q: `Alege afirmațiile adevărate despre călătoria gemenilor:`,
      options: [
        { t: `Cu cât viteza lui Bogdan e mai apropiată de <var>c</var>, cu atât diferența de vârstă e mai mare.`, ok: true, why: `γ crește fără limită când <var>v</var> → <var>c</var>.` },
        { t: `La întoarcere, „acum-ul” lui Bogdan despre Pământ sare brusc înainte.`, ok: true, why: `Schimbând S.R.I., schimbă ce evenimente de pe Pământ sunt simultane cu „acum”-ul lui.` },
        { t: `Ana rămâne tot timpul într-un singur S.R.I. (în aproximarea noastră).`, ok: true, why: `Linia ei de univers e dreaptă.` },
        { t: `Bogdan simte că îmbătrânește mai încet pe parcursul călătoriei.`, ok: false, why: `Nu simte nimic; diferența se vede la comparație.` },
        { t: `Dacă Bogdan nu s-ar întoarce, tot ar fi mai tânăr decât Ana, în mod absolut.`, ok: false, why: `Fără întoarcere nu există comparație directă: situația ar rămâne simetrică.` }
      ],
      explain: `Asimetria vine din întoarcere, nu din „timpul adevărat” al cuiva.`,
      ref: { id: 'gemeni', label: 'Paradoxul gemenilor' }
    },
    {
      id: 'c6q10', type: 'single',
      q: `Ce înseamnă, riguros, că „un ceas în mișcare merge mai încet”?`,
      options: [
        { t: `Că durata măsurată de observator, cu ceasurile lui sincronizate, e mai mare decât durata proprie.`, ok: true, why: `Este o afirmație despre măsurători comparate, nu despre „timpul în sine”.` },
        { t: `Că ceasul în mișcare își pierde din energie și de aceea se învârte mai încet decât unul aflat pe loc.`, ok: false, why: `Nu are legătură cu energia.` },
        { t: `Că lumina din interiorul ceasului în mișcare încetinește și de aceea măsoară secunde mai lungi.`, ok: false, why: `Lumina are mereu <var>c</var>.` },
        { t: `Că oamenii din ceasul acela îmbătrânesc mai încet, oricine ar compara și oricând.`, ok: false, why: `Depinde de comparație: din S.R.I. propriu, nimic nu se schimbă.` }
      ],
      explain: `Dilatarea timpului este o relație între două moduri de a măsura aceeași pereche de evenimente.`,
      ref: { id: 'proprie', label: 'Durata proprie' }
    },
    {
      id: 'c6q11', type: 'single',
      scenario: `Particule instabile (muoni) apar în atmosfera înaltă și ajung la sol, deși viața lor medie ar fi prea scurtă pentru un asemenea drum.`,
      q: `Cum explică un observator de la sol?`,
      options: [
        { t: `Ceasul muonilor, în mișcare rapidă, merge mai încet, deci „trăiesc” mai mult văzut de la sol.`, ok: true, why: `Durata măsurată de la sol este dilatată față de cea proprie.` },
        { t: `Muonii merg mai repede decât lumina, așa că ajung la sol înainte să se dezintegreze.`, ok: false, why: `Imposibil: nimic cu masă nu depășește <var>c</var>.` },
        { t: `Viața lor se prelungește pentru că se răcesc în atmosferă și se dezintegrează mai lent.`, ok: false, why: `Nu e o chestiune de temperatură.` },
        { t: `Atmosfera devine mai subțire pentru ei și drumul se scurtează, deci ajung mai ușor la sol.`, ok: false, why: `Aceasta este explicația din sistemul muonului (contracția lungimilor), nu a observatorului de la sol.` }
      ],
      explain: `Dilatarea timpului este un fapt măsurat, nu doar o teorie.`,
      ref: { id: 'gemeni', label: 'Nu e „vina” accelerației' }
    },
    {
      id: 'c6q12', type: 'single',
      q: `La viteze obișnuite (mașini, avioane), de ce nu observăm dilatarea timpului?`,
      options: [
        { t: `Pentru că γ este practic 1, deci durata măsurată e aproape egală cu cea proprie, diferind imperceptibil.`, ok: true, why: `Pentru <var>v</var> ≪ <var>c</var>: γ → 1, deci Δ<var>t</var> ≈ Δ<var>t</var>′.` },
        { t: `Pentru că dilatarea apare doar la corpuri foarte mici, nu la mașini sau avioane obișnuite, mult mai mari.`, ok: false, why: `Efectul nu depinde de dimensiune.` },
        { t: `Pentru că ceasurile obișnuite sunt prea imprecise ca să arate vreodată o diferență, oricât de mică.`, ok: false, why: `Chiar și ceasuri foarte precise arată doar diferențe minuscule; problema e γ ≈ 1.` },
        { t: `Pentru că la viteze mici timpul curge invers, deci efectul se anulează aproape complet la scară mică.`, ok: false, why: `Nu există așa ceva.` }
      ],
      explain: `La viteze mici formulele relativiste se reduc la cele clasice.`,
      ref: { id: 'formula', label: 'Formula în cuvinte' }
    },
    {
      id: 'c6q13', type: 'multi',
      q: `Alege afirmațiile corecte despre durata proprie:`,
      options: [
        { t: `Este cea mai mică dintre duratele măsurate din S.R.I. diferite pentru aceeași pereche de evenimente.`, ok: true, why: `Δ<var>t</var> = γΔ<var>t</var>′ cu γ ≥ 1.` },
        { t: `Se măsoară cu un singur ceas, aflat în repaus față de cele două evenimente.`, ok: true, why: `Nu cere ceasuri sincronizate.` },
        { t: `Din S.R.I. propriu, durata proprie este exact cea pe care o arată ceasul călătorului.`, ok: true, why: `Este „timpul propriu” al călătorului.` },
        { t: `Poate fi mai mare decât durata măsurată din alt S.R.I.`, ok: false, why: `Nu: este minima.` },
        { t: `Depinde de viteza relativă dintre cei doi observatori.`, ok: false, why: `Durata proprie nu depinde de nimic extern; cea măsurată din alt S.R.I. depinde.` }
      ],
      explain: `Timpul propriu este singurul „invariant”: cel pe care îl arată ceasul însoțitor.`,
      ref: { id: 'proprie', label: 'Durata proprie' }
    },
    {
      id: 'c6q14', type: 'spot',
      q: `Care este <strong>primul</strong> pas greșit?`,
      steps: [
        { t: `Pe un ceas cu lumină care se mișcă, lumina parcurge o diagonală.` },
        { t: `Diagonala este mai lungă decât perpendiculara dintre oglinzi.` },
        { t: `Deci lumina merge mai încet pe diagonală, ca să ajungă simultan.`, bad: true, why: `Lumina nu își schimbă viteza: <var>c</var> pentru toți observatorii. Pe diagonală ea își ia „mai mult timp”, nu „mai puțină viteză”.` },
        { t: `Prin urmare tic-tac-ul durează mai mult.` }
      ],
      explain: `Concluzia e corectă, dar justificarea trebuie să rămână la <var>c</var> constant.`,
      ref: { id: 'ceas', label: 'Ceasul cu lumină' }
    },
    {
      id: 'c6q15', type: 'single',
      scenario: `Pe diagrama spațiu-timp a gemenilor, linia Anei este verticală, iar a lui Bogdan este frântă (dus–întors).`,
      q: `Ce poți spune despre timpurile proprii de-a lungul celor două linii între plecare și revedere?`,
      options: [
        { t: `Pe linia dreaptă (a Anei) timpul propriu este mai mare decât pe cea frântă.`, ok: true, why: `În spațiu-timp, drumul drept maximizează timpul propriu (invers decât la distanțe în plan).` },
        { t: `Pe linia frântă timpul propriu este mai mare, pentru că drumul este mai lung.`, ok: false, why: `Lungimea „geometrică” nu e timpul propriu; cu minusul din interval, rezultatul se inversează.` },
        { t: `Sunt egale, pentru că ambele au aceleași capete.`, ok: false, why: `Capetele sunt aceleași, dar timpii proprii diferă.` },
        { t: `Nu se pot compara, pentru că liniile nu sunt paralele.`, ok: false, why: `Se compară oricând, de-a lungul fiecărui drum.` }
      ],
      explain: `Gemenii diferă prin drumul în spațiu-timp: drept (Ana) versus frânt (Bogdan).`,
      ref: { id: 'gemeni', label: 'Paradoxul gemenilor' }
    },
    {
      id: 'c6q16', type: 'single',
      q: `Care afirmație despre dilatarea timpului este corectă?`,
      options: [
        { t: `Depinde de viteza relativă și crește când viteza se apropie de <var>c</var>.`, ok: true, why: `γ crește fără limită când <var>v</var> → <var>c</var>.` },
        { t: `Depinde de direcția în care se mișcă ceasul.`, ok: false, why: `Nu: doar de mărimea vitezei.` },
        { t: `Se produce doar la ceasuri, nu și la fenomenele fizice sau biologice.`, ok: false, why: `Afectează toate procesele deopotrivă.` },
        { t: `Este un efect optic, provocat de întârzierea luminii care ajunge la observator.`, ok: false, why: `Nu e o iluzie: rămâne și după ce corectezi timpii de propagare.` }
      ],
      explain: `Efectul este real, măsurabil și reciproc, pentru toate procesele.`,
      ref: { id: 'mituri', label: 'Mituri vs. realitate' }
    },
    {
      id: 'c6q17', type: 'multi',
      q: `Alege toate afirmațiile corecte despre dilatarea timpului:`,
      options: [
        { t: `Un ceas aflat în repaus față de fenomen măsoară durata proprie, cea mai mică dintre duratele măsurate pentru el.`, ok: true, why: `Orice alt S.R.I. măsoară o durată mai mare, cu factorul γ.` },
        { t: `Efectul este reciproc: fiecare observator găsește că ceasul celuilalt merge mai încet.`, ok: true, why: `Simetria ține de mișcarea uniformă; asimetria apare doar când cineva își schimbă S.R.I.` },
        { t: `Diferența dintre două ceasuri se verifică fără ambiguitate numai dacă ele se reîntâlnesc.`, ok: true, why: `Doar compararea în același loc și moment elimină disputa de „punct de vedere”.` },
        { t: `Cu cât viteza este mai mică, cu atât γ este mai mare și dilatarea mai puternică.`, ok: false, why: `Invers: γ crește cu viteza și tinde la 1 când <var>v</var> ≪ <var>c</var>.` },
        { t: `Dilatarea apare doar la ceasurile mecanice; unul atomic sau biologic nu o suferă.`, ok: false, why: `Orice proces periodic, de orice natură, se dilată la fel.` }
      ],
      explain: `Durata proprie este minimă; restul este relația dintre două moduri de a măsura aceeași pereche de evenimente.`,
      ref: { id: 'proprie', label: 'Durata proprie' }
    }
  ]
});
