/* Capitolul 7 — Compunerea vitezelor: rezumat, glosar, bancă de întrebări */
RF.register({
  id: 7,

  summary: [
    { q: `Scrie regula clasică de compunere a vitezelor și spune când mai este valabilă.`,
      a: `<var>u</var> = <var>u</var>′ + <var>v</var> (transformările Galilei): viteza față de S = viteza față de S′ + viteza lui S′ față de S. Este corectă, cu o eroare nemăsurabilă, doar când <strong><var>v</var>, <var>u</var>′ ≪ <var>c</var></strong> (γ ≈ 1) — este <em>cazul-limită</em> al regulii relativiste. Pentru lumină nu este valabilă la nicio viteză a sursei.` },
    { q: `Enunță compunerea relativistă a vitezelor.`,
      a: `Fie S′ care se mișcă cu <var>v</var> față de S, pe axa <var>x</var>. Dacă un corp are viteza <var>u</var>′<sub>x</sub> în S′, atunci în S are <var>u</var><sub>x</sub> = (<var>u</var>′<sub>x</sub> + <var>v</var>) / (1 + <var>v</var><var>u</var>′<sub>x</sub>/<var>c</var>²). Invers: <var>u</var>′<sub>x</sub> = (<var>u</var><sub>x</sub> − <var>v</var>) / (1 − <var>v</var><var>u</var><sub>x</sub>/<var>c</var>²). Rezultatul nu e suma simplă, ci suma împărțită la un număr ≈ 1 la viteze mici și mai mare ca 1 la viteze mari.` },
    { q: `Ce se întâmplă cu rezultatul la viteze mici și la viteze mari?`,
      a: `La viteze mici (<var>v</var>, <var>u</var>′ ≪ <var>c</var>) numitorul e ≈ 1 și revii la adunarea simplă. La viteze mari, pentru un proiectil tras în sensul mișcării, rezultatul e <strong>mai mic decât suma simplă</strong> și, dacă ambele viteze sunt sub <var>c</var>, <strong>rămâne sub <var>c</var></strong>: compunând de oricâte ori, te apropii de <var>c</var> fără să-l atingi. Un corp cu <var>v</var> ≈ <var>c</var> se numește ultrarelativist.` },
    { q: `Ce rezultă dacă una dintre viteze este c?`,
      a: `Dacă <var>u</var><sub>x</sub> = <var>c</var>, atunci <var>u</var>′<sub>x</sub> = <var>c</var> (și invers), oricare ar fi viteza <var>v</var> a sistemului: este Postulatul I. Ritmul <var>c</var> − <var>v</var> cu care Ana vede lumina depărtându-se de navă este o diferență între două viteze din același sistem (S), nu viteza luminii în sistemul navei (S′), unde Bogdan măsoară <var>c</var>.` },
    { q: `Explică de ce suma simplă nu mai este corectă.`,
      a: `Viteza este distanță ÷ durată, iar distanțele și duratele nu sunt aceleași pentru cei doi observatori. Factorul γ apare la fel în distanță și în durată și se simplifică; rămâne faptul că timpul din S depinde și de locul din navă (<var>t</var> = γ(<var>t</var>′ + <var>v</var><var>x</var>′/<var>c</var>²)), adică ceasurile navei, văzute din S, nu sunt sincronizate. Durata dintre lansare și lovire primește un adaos, iar viteza iese mai mică. Proiectilul nu este încetinit de nimic: observatorii folosesc doar rigle și ceasuri diferite.` },
    { q: `Cum se compune componenta perpendiculară a vitezei?`,
      a: `<var>u</var><sub>y</sub> = <var>u</var>′<sub>y</sub> / [γ(1 + <var>v</var><var>u</var>′<sub>x</sub>/<var>c</var>²)] și <var>u</var>′<sub>y</sub> = <var>u</var><sub>y</sub> / [γ(1 − <var>v</var><var>u</var><sub>x</sub>/<var>c</var>²)]. Componenta se schimbă deși <var>y</var> = <var>y</var>′, pentru că durata nu e aceeași. Pentru un corp aruncat strict perpendicular în S′ (<var>u</var>′<sub>x</sub> = 0): <var>u</var><sub>y</sub> = <var>u</var>′<sub>y</sub>/γ. La un impuls de lumină, componenta verticală e <var>c</var>/γ, cea orizontală <var>v</var>, iar viteza totală rămâne <var>c</var>.` },
    { q: `Ce se schimbă și ce nu între cei doi observatori?`,
      a: `Se schimbă: viteza proiectilului (<var>u</var> ≠ <var>u</var>′), distanța parcursă și durata zborului, componenta perpendiculară a vitezei, ritmul de apropiere sau de depărtare. Nu se schimbă: viteza luminii <var>c</var> și forma legilor (regula are aceeași formă de la S la S′ ca de la S′ la S, cu <var>v</var> → −<var>v</var>).` },
    { q: `(Adaos) Care e diferența dintre viteza de apropiere și viteza relativă?`,
      a: `<strong>Viteza de apropiere</strong> = ritmul cu care scade distanța dintre două corpuri, măsurat de un singur observator (se obține prin adunare simplă; poate ajunge la 2<var>c</var> și nu e viteza vreunui corp). <strong>Viteza relativă</strong> = viteza unui corp măsurată în sistemul de repaus al celuilalt (se obține cu regula relativistă; rămâne sub <var>c</var>). Două nave cu 0,9 <var>c</var> față de stație, una spre alta: apropiere 1,8 <var>c</var>, viteză relativă ≈ 0,994 <var>c</var>.` }
  ],

  glossary: [
    { term: `Compunerea vitezelor`, def: `Regula care leagă viteza unui corp măsurată în S de viteza lui măsurată în S′, când S′ se mișcă cu viteza v față de S: u = (u′ + v) / (1 + v·u′/c²). Pentru viteze mici se reduce la adunarea simplă.` },
    { term: `Adunarea clasică a vitezelor`, def: `u = u′ + v (regula lui Galilei): viteza față de S = viteza față de S′ + viteza lui S′. Cazul-limită al regulii relativiste, valabil pentru v, u′ ≪ c.` },
    { term: `Viteza relativă`, def: `Viteza unui corp măsurată în sistemul de repaus al altui corp, cu rigla și ceasul acestuia. Pentru două corpuri cu masă rămâne mereu sub c.` },
    { term: `Viteza de apropiere`, def: `(Adaos) Ritmul cu care scade (sau, la depărtare, crește) distanța dintre două corpuri, măsurat de un singur observator cu aceleași rigle și ceasuri. Nu este viteza vreunui corp și poate depăși c (până la 2c).` },
    { term: `Ultrarelativist`, def: `Spus despre un corp care se mișcă cu o viteză apropiată de c (v ≈ c): efectele relativiste sunt maxime, iar viteza lui aproape nu mai crește.` },
    { term: `Componenta perpendiculară a vitezei`, def: `Partea vitezei pe o direcție perpendiculară pe mișcarea relativă a celor două sisteme (de exemplu u_y). Se schimbă la trecerea de la S la S′ deși y = y′, fiindcă durata dintre evenimente nu e aceeași.` }
  ],

  quiz: [
    {
      id: 'c7q1', type: 'single',
      scenario: `O navă pleacă dintr-o stație cu 0,9 <var>c</var> față de stație. Din ea se lansează o a doua navă, cu 0,9 <var>c</var> față de prima; din a doua se lansează o a treia, tot cu 0,9 <var>c</var> față de a doua, și tot așa, navă după navă.`,
      q: `Ce viteză măsoară stația pentru a suta navă din lanț?`,
      options: [
        { t: `Una uriașă, mult peste <var>c</var>: vitezele se tot adună, pas cu pas.`, ok: false,
          why: `Aceasta este adunarea simplă (0,9 <var>c</var> + 0,9 <var>c</var> + …). Regula corectă „strânge” fiecare compunere, iar rezultatul rămâne sub <var>c</var> la orice pas.` },
        { t: `Exact <var>c</var>, de la o anumită navă încolo.`, ok: false,
          why: `Rezultatul se apropie tot mai mult de <var>c</var>, dar distanța până la <var>c</var> nu se anulează niciodată. Singurul care dă exact <var>c</var> prin compunere este însuși <var>c</var> (lumina).` },
        { t: `Foarte aproape de <var>c</var>, dar mereu sub <var>c</var>.`, ok: true,
          why: `Fiecare navă adaugă tot mai puțin: 0,9 <var>c</var>, apoi ≈ 0,994 <var>c</var>, apoi ≈ 0,9997 <var>c</var> … Te apropii de <var>c</var> fără să-l atingi.` },
        { t: `Depinde de masa navelor: cele grele rămân sub <var>c</var>, cele ușoare pot trece de <var>c</var>.`, ok: false,
          why: `Regula de compunere nu conține nicio masă: leagă doar viteze măsurate în sisteme diferite.` }
      ],
      explain: `Compunerea unor viteze sub <var>c</var> rămâne sub <var>c</var>, oricâți pași ai face.`,
      ref: { id: 'regula', label: 'Regula corectă, în cuvinte' }
    },
    {
      id: 'c7q2', type: 'single',
      scenario: `Nava lui Bogdan se depărtează de stația Anei cu 0,8 <var>c</var>. Bogdan trimite înapoi, spre stație, un impuls de lumină.`,
      q: `Ce viteză măsoară Ana pentru impuls?`,
      options: [
        { t: `0,2 <var>c</var>: impulsul „pierde” din viteză pentru că nava fuge de stație (<var>c</var> − 0,8 <var>c</var>).`, ok: false,
          why: `Aceasta este adunarea simplă aplicată în sens opus. Postulatul I: lumina din vid are viteza <var>c</var> în orice S.R.I. și în orice direcție, oricum s-ar mișca sursa.` },
        { t: `<var>c</var>, la fel ca pentru Bogdan, deși sursa se îndepărtează.`, ok: true,
          why: `Este Postulatul I în limbajul compunerii: dacă <var>u</var>′ are mărimea <var>c</var> (în sens negativ, pentru Bogdan), atunci și Ana măsoară <var>c</var>. Ce se schimbă la lumina unei surse care fuge este culoarea (frecvența), nu viteza.` },
        { t: `1,8 <var>c</var>: viteza navei se adaugă la <var>c</var>, iar impulsul vine spre stație.`, ok: false,
          why: `Nici adunarea simplă nu ar da asta (nava fuge de stație, deci viteza ar scădea), iar rezultatul real nu depășește <var>c</var>.` },
        { t: `Un număr între 0,2 <var>c</var> și <var>c</var>, în funcție de cât de fine sunt aparatele Anei.`, ok: false,
          why: `Nu e o chestiune de precizie. Oricât de fin ai măsura, obții <var>c</var>.` }
      ],
      explain: `Lumina are viteza <var>c</var> în orice S.R.I., oricum s-ar mișca sursa și în orice sens ar pleca lumina.`,
      ref: { id: 'lumina', label: 'Lumina rămâne c — în ambele sensuri' }
    },
    {
      id: 'c7q3', type: 'single',
      scenario: `Ana vede nava lui Bogdan depărtându-se cu 0,6 <var>c</var>. Din navă pleacă înainte un impuls de lumină. Ana constată că distanța dintre impuls și navă crește cu 0,4 <var>c</var> (adică <var>c</var> − 0,6 <var>c</var>).`,
      q: `Ce legătură are numărul 0,4 <var>c</var> cu ceea ce măsoară Bogdan pentru impuls?`,
      options: [
        { t: `Bogdan măsoară și el 0,4 <var>c</var>: o distanță care crește într-un anumit ritm are același ritm pentru orice observator.`, ok: false,
          why: `Ritmul de 0,4 <var>c</var> este măsurat cu rigla și ceasul Anei. Bogdan folosește alte rigle și alte ceasuri, iar pentru el impulsul are viteza <var>c</var>.` },
        { t: `Niciuna directă: 0,4 <var>c</var> e un ritm din sistemul Anei; Bogdan măsoară <var>c</var>.`, ok: true,
          why: `Diferența dintre două viteze măsurate de același observator (Ana) nu este o viteză măsurată în alt sistem. Viteza impulsului în S′ se măsoară cu instrumentele navei și dă <var>c</var>.` },
        { t: `Bogdan măsoară 0,4 <var>c</var> cu aparatele lui, dar ceasul lui merge mai încet, așa că Ana „traduce” rezultatul în <var>c</var>.`, ok: false,
          why: `Nu există nicio măsurătoare de 0,4 <var>c</var> a lui Bogdan: instrumentele navei, oricât de bune, dau <var>c</var>. Iar dilatarea timpului nu „repară” nimic aici.` },
        { t: `Bogdan nu poate afirma nimic sigur, fiindcă nava se mișcă și măsurătorile lui sunt deformate de mișcare.`, ok: false,
          why: `Nava se mișcă uniform, deci este un S.R.I. la fel de bun ca stația (Postulatul al II-lea).` }
      ],
      explain: `Viteza unui corp într-un sistem se măsoară cu instrumentele acelui sistem; diferența a două viteze din același sistem este altceva.`,
      ref: { id: 'lumina', label: 'Lumina rămâne c — în ambele sensuri' }
    },
    {
      id: 'c7q4', type: 'single',
      q: `Care este cauza de fond a faptului că adunarea simplă a vitezelor nu mai funcționează aproape de <var>c</var>?`,
      options: [
        { t: `Proiectilul este încetinit de mișcarea navei prin „spațiul gol”, deci ajunge la o viteză mai mică decât suma.`, ok: false,
          why: `Nimic nu încetinește proiectilul. Diferența vine din măsurători: Ana și Bogdan folosesc rigle și ceasuri diferite.` },
        { t: `Viteza e distanță ÷ durată, iar cei doi observatori nu măsoară aceleași distanțe și durate.`, ok: true,
          why: `Adunarea simplă presupune distanțe și durate comune tuturor observatorilor; relativitatea le face să depindă de S.R.I., deci se schimbă și raportul lor.` },
        { t: `Energia proiectilului ar depăși energia navei, ceea ce legea conservării nu permite.`, ok: false,
          why: `Conservarea energiei nu are rol în compunerea vitezelor: regula leagă doar măsurători de viteză făcute în două sisteme.` },
        { t: `La viteze mari aparatele de măsură nu mai pot urmări mișcarea cu precizia necesară.`, ok: false,
          why: `Nu e o limită tehnică: chiar cu aparate perfecte rezultatul diferă de suma simplă, iar diferența este una de principiu.` }
      ],
      explain: `Regula se schimbă fiindcă se schimbă ce înseamnă distanță și durată pentru doi observatori în mișcare relativă.`,
      ref: { id: 'poveste', label: 'Pe pași: de la 0,1 c până la lumină' }
    },
    {
      id: 'c7q5', type: 'single',
      scenario: `Ana măsoară că nava lui Bogdan se depărtează de stație cu 0,6 <var>c</var>, în sensul pozitiv al axei <var>x</var>.`,
      q: `Ce viteză măsoară Bogdan pentru stația Anei?`,
      options: [
        { t: `Mai mică de 0,6 <var>c</var>, pentru că ceasul lui Bogdan merge mai încet, privit din stație.`, ok: false,
          why: `Ceasul lui Bogdan merge „normal” pentru el. Dilatarea timpului este reciprocă, iar viteza relativă rămâne egală în mărime pentru cei doi.` },
        { t: `0,6 <var>c</var> în sens opus: aceeași mărime, sens contrar.`, ok: true,
          why: `Viteza relativă a doi observatori inerțiali are aceeași mărime văzută de la oricare dintre ei (regula are aceeași formă de la S la S′ ca de la S′ la S, cu <var>v</var> → −<var>v</var>).` },
        { t: `Mai mare de 0,6 <var>c</var>, pentru că Bogdan este cel care se mișcă „cu adevărat”.`, ok: false,
          why: `Nu există mișcare „adevărată”: mișcarea uniformă este relativă (Postulatul al II-lea).` },
        { t: `Niciuna: o stație care „stă pe loc” nu are o viteză care să poată fi măsurată.`, ok: false,
          why: `Pentru Bogdan, stația se îndepărtează cu 0,6 <var>c</var>: viteza este o relație între doi observatori, nu o proprietate „în absolut”.` }
      ],
      explain: `Viteza relativă a doi observatori inerțiali are aceeași mărime văzută de la oricare dintre ei.`,
      ref: { id: 'regula', label: 'Regula corectă, în cuvinte' }
    },
    {
      id: 'c7q6', type: 'single',
      scenario: `Doi protoni se mișcă unul spre celălalt, în vid, fiecare cu 0,9 <var>c</var> față de laborator. Un fizician din laborator măsoară că distanța dintre ei scade cu 1,8 <var>c</var>.`,
      q: `Ce concluzie este corectă?`,
      options: [
        { t: `Relativitatea este contrazisă: ceva se mișcă mai repede decât lumina.`, ok: false,
          why: `1,8 <var>c</var> nu este viteza niciunui corp sau semnal. Este un ritm de scădere a unei distanțe, măsurat de un singur observator.` },
        { t: `Măsurătoarea laboratorului trebuie să fie greșită: o distanță nu poate scădea cu mai mult de <var>c</var>.`, ok: false,
          why: `Măsurătoarea poate fi corectă: același observator, cu aceeași riglă și același ceas, adună simplu două viteze din sistemul lui. Limita <var>c</var> se aplică vitezelor corpurilor, nu acestui ritm.` },
        { t: `Nu se încalcă nimic: 1,8 <var>c</var> e un ritm din sistemul laboratorului, iar fiecare proton măsoară viteza celuilalt sub <var>c</var>.`, ok: true,
          why: `Ritmul de apropiere (într-un sistem) și viteza relativă (în sistemul unuia dintre protoni) sunt mărimi diferite; a doua se obține cu regula de compunere și iese ≈ 0,994 <var>c</var>.` },
        { t: `Fiecare proton măsoară viteza celuilalt tot 1,8 <var>c</var>, dar nicio informație nu poate circula cu ea.`, ok: false,
          why: `Viteza unui proton în sistemul celuilalt iese sub <var>c</var>, nu 1,8 <var>c</var>; problema nu e „ce informație circulă”, ci ce mărime ai măsurat.` }
      ],
      explain: `Viteza de apropiere (într-un sistem) și viteza relativă (în sistemul unuia dintre corpuri) sunt mărimi diferite.`,
      ref: { id: 'apropiere', label: 'Viteza de apropiere nu e viteza relativă' }
    },
    {
      id: 'c7q7', type: 'single',
      scenario: `O navă trece prin dreptul stației cu 0,8 <var>c</var>. Bogdan aruncă o bilă exact în sus, față de navă. Pe verticală, distanțele măsurate de Ana și de Bogdan sunt aceleași.`,
      q: `Cum se compară viteza pe verticală a bilei, măsurată de Ana, cu cea măsurată de Bogdan?`,
      options: [
        { t: `Este aceeași, fiindcă distanțele pe verticală coincid.`, ok: false,
          why: `Viteza este distanță ÷ durată. Distanța coincide, dar durata dintre aceleași două evenimente nu este aceeași pentru cei doi observatori.` },
        { t: `Este mai mică la Ana: aceeași distanță verticală este parcursă, pentru ea, într-o durată mai lungă.`, ok: true,
          why: `Bila fiind aruncată exact în sus, cele două evenimente care definesc viteza (două poziții succesive) au loc în același loc din navă, deci ceasul navei arată durata proprie, mai scurtă; Ana măsoară o durată mai lungă (dilatarea timpului). Aceeași distanță în mai mult timp ⟹ viteză mai mică.` },
        { t: `Este mai mare la Ana: la viteza bilei se adaugă și cei 0,8 <var>c</var> ai navei.`, ok: false,
          why: `0,8 <var>c</var> este componenta orizontală. Vitezele pe direcții perpendiculare nu se adună între ele: sunt componentele aceluiași vector.` },
        { t: `Este mai mică la Ana, dar numai dacă bila este un impuls de lumină.`, ok: false,
          why: `Efectul apare pentru orice viteză pe verticală, nu doar pentru lumină.` }
      ],
      explain: `Distanța perpendiculară coincide, dar durata nu, deci și viteza perpendiculară se schimbă.`,
      ref: { id: 'perpendicular', label: 'Și pe verticală se schimbă ceva' }
    },
    {
      id: 'c7q8', type: 'single',
      q: `Alege situația în care adunarea simplă a vitezelor este greșită <em>în principiu</em>, chiar dacă viteza vehiculului este mică:`,
      options: [
        { t: `O minge aruncată înainte de un pasager dintr-un tren care merge cu 100 km/h față de peron.`, ok: false,
          why: `Ambele viteze sunt ≪ <var>c</var>: corecția <var>v</var>·<var>u</var>′/<var>c</var>² este practic nulă, deci suma simplă este o aproximație excelentă.` },
        { t: `Lumina farurilor unei mașini care merge cu 100 km/h, măsurată de un observator de pe șosea.`, ok: true,
          why: `Suma simplă ar da <var>c</var> + <var>v</var>, dar Postulatul I cere <var>c</var>, oricât de mică ar fi <var>v</var>. Lumina nu se supune adunării simple la nicio viteză a sursei.` },
        { t: `O sondă lansată înainte, cu 5 km/s față de rachetă, de o rachetă care zboară cu 10 km/s.`, ok: false,
          why: `Viteze de ordinul 10⁻⁵ din <var>c</var>: suma simplă este corectă pentru orice măsurătoare practică.` },
        { t: `Un glonț tras înainte de pe un avion de vânătoare care zboară cu 900 km/h față de sol.`, ok: false,
          why: `Tot viteze mult mai mici decât <var>c</var>: diferența dintre cele două reguli nu poate fi măsurată.` }
      ],
      explain: `Adunarea simplă este o aproximație excelentă pentru corpuri lente și nu este valabilă pentru lumină, la nicio viteză a sursei.`,
      ref: { id: 'regula', label: 'Regula corectă, în cuvinte' }
    },
    {
      id: 'c7q9', type: 'single',
      q: `Un proiectil este tras înainte dintr-o navă care se depărtează de stație; ambele viteze (<var>v</var> și <var>u</var>′) sunt sub <var>c</var>. Cum se compară viteza măsurată de stație cu suma simplă <var>u</var>′ + <var>v</var>?`,
      options: [
        { t: `Este mai mare decât suma simplă: la viteze mari, relativitatea „adaugă” viteză.`, ok: false,
          why: `Invers: suma simplă se împarte la un număr mai mare ca 1, deci rezultatul este mai mic.` },
        { t: `Este egală cu suma simplă cât timp aceasta nu depășește <var>c</var>; abia apoi rezultatul este „tăiat” la <var>c</var>.`, ok: false,
          why: `Nu există un prag brusc. Corecția apare treptat, de la viteze moderate (de exemplu la 0,3 <var>c</var> și 0,3 <var>c</var> rezultatul e deja vizibil sub 0,6 <var>c</var>) și crește lin spre <var>c</var>.` },
        { t: `Este mai mică decât suma simplă, cu atât mai mică cu cât vitezele sunt mai apropiate de <var>c</var>.`, ok: true,
          why: `Suma simplă se împarte la 1 + <var>v</var>·<var>u</var>′/<var>c</var>², un număr peste 1 care crește treptat cu produsul vitezelor.` },
        { t: `Este egală cu suma simplă; doar durata zborului se schimbă.`, ok: false,
          why: `Durata se schimbă, dar tocmai de aceea se schimbă și viteza (distanță ÷ durată).` }
      ],
      explain: `Pentru un proiectil tras în sensul mișcării, suma simplă se împarte la un număr peste 1, care crește treptat cu viteza.`,
      ref: { id: 'regula', label: 'Regula corectă, în cuvinte' }
    },
    {
      id: 'c7q10', type: 'single',
      scenario: `Două nave, una cu 0,2 <var>c</var> și una cu 0,9 <var>c</var>, se apropie de același detector pe trasee separate. În același moment, măsurat de detector, ambele se află la aceeași distanță de el, iar fiecare trimite spre detector câte un impuls de lumină.`,
      q: `Care impuls ajunge primul la detector?`,
      options: [
        { t: `Cel al navei de 0,9 <var>c</var>: lumina lui primește și viteza navei.`, ok: false,
          why: `Lumina nu „moștenește” viteza sursei (Postulatul I). Se schimbă culoarea (efectul Doppler), nu viteza.` },
        { t: `Ajung în același moment: detectorul măsoară <var>c</var> pentru ambele.`, ok: true,
          why: `Dacă <var>u</var>′ = <var>c</var>, atunci <var>u</var> = <var>c</var>, oricare ar fi viteza sursei. Cu aceeași viteză și aceeași distanță, durata este aceeași.` },
        { t: `Cel al navei de 0,2 <var>c</var>, pentru că o navă mai lentă „încurcă” mai puțin lumina.`, ok: false,
          why: `Viteza navei nu influențează nicio clipă viteza luminii.` },
        { t: `Cel al navei de 0,9 <var>c</var>, dar cu o diferență mică, fiindcă regula de compunere „strânge” rezultatul.`, ok: false,
          why: `Pentru lumină regula dă exact <var>c</var>, nu o valoare „aproape <var>c</var>”: nu apare nicio diferență.` }
      ],
      explain: `Lumina emisă de surse care se mișcă diferit se propagă la fel de repede: <var>c</var>.`,
      ref: { id: 'lumina', label: 'Lumina rămâne c — în ambele sensuri' }
    },
    {
      id: 'c7q11', type: 'multi',
      q: `Un proiectil este tras înainte dintr-o navă (S′) care se depărtează de stație (S). Alege toate afirmațiile corecte despre compunerea relativistă a vitezelor:`,
      options: [
        { t: `Dacă <var>v</var> și <var>u</var>′ sunt mult mai mici decât <var>c</var>, rezultatul coincide practic cu suma simplă.`, ok: true,
          why: `Numitorul 1 + <var>v</var><var>u</var>′/<var>c</var>² este practic 1: regula devine adunarea simplă.` },
        { t: `Dacă suma simplă depășește <var>c</var>, rezultatul corect o depășește și el, dar mai puțin.`, ok: false,
          why: `Dacă ambele viteze sunt sub <var>c</var>, rezultatul rămâne sub <var>c</var>, oricât de mare ar fi suma simplă.` },
        { t: `Dacă una dintre cele două viteze este <var>c</var>, rezultatul este <var>c</var>.`, ok: true,
          why: `Este Postulatul I; regula îl respectă exact.` },
        { t: `Dacă ambele viteze sunt sub <var>c</var>, rezultatul este sub <var>c</var>.`, ok: true,
          why: `Compunerea nu te scoate de sub <var>c</var>, oricâte compuneri ai face.` },
        { t: `Rezultatul depinde de masa proiectilului.`, ok: false,
          why: `Regula leagă doar viteze măsurate în două sisteme; masa nu apare nicăieri în ea.` }
      ],
      explain: `Regula se reduce la adunarea simplă pentru viteze mici, păstrează <var>c</var> și nu scoate rezultatul de sub <var>c</var>.`,
      ref: { id: 'regula', label: 'Regula corectă, în cuvinte' }
    },
    {
      id: 'c7q12', type: 'multi',
      scenario: `Nava lui Bogdan merge cu 0,6 <var>c</var> față de stația Anei. Bogdan trage înainte un proiectil care lovește o țintă din fața navei.`,
      q: `Care dintre următoarele mărimi au valori diferite pentru Ana și pentru Bogdan?`,
      options: [
        { t: `Viteza proiectilului.`, ok: true,
          why: `Bogdan măsoară <var>u</var>′, Ana măsoară <var>u</var>: sunt legate prin regula de compunere, dar nu sunt egale.` },
        { t: `Durata dintre lansare și lovire.`, ok: true,
          why: `Cele două evenimente sunt în locuri diferite din navă; durata măsurată de Ana diferă de cea măsurată de Bogdan.` },
        { t: `Distanța parcursă de proiectil între lansare și lovire.`, ok: true,
          why: `Pentru Ana, proiectilul parcurge și drumul navei din timpul zborului, iar riglele ei dau altă valoare decât ale lui Bogdan.` },
        { t: `Viteza unui impuls de lumină trimis de Bogdan în aceeași direcție.`, ok: false,
          why: `Rămâne <var>c</var> pentru amândoi (Postulatul I).` },
        { t: `Valoarea lui <var>c</var>.`, ok: false,
          why: `<var>c</var> este o constantă universală, aceeași în orice S.R.I.` }
      ],
      explain: `Se schimbă vitezele obișnuite, distanțele și duratele; nu se schimbă <var>c</var> (și forma legilor).`,
      ref: { id: 'poveste', label: 'Pe pași: de la 0,1 c până la lumină' }
    },
    {
      id: 'c7q13', type: 'multi',
      scenario: `Două nave, A și B, se apropie una de alta pe aceeași dreaptă; fiecare are 0,7 <var>c</var> față de stația Anei.`,
      q: `Alege afirmațiile corecte:`,
      options: [
        { t: `În stația Anei, distanța dintre nave scade cu 1,4 <var>c</var> pe unitatea de timp.`, ok: true,
          why: `În același sistem, două viteze se adună simplu atunci când vrei să afli cum se schimbă o distanță.` },
        { t: `Nava A măsoară viteza navei B egală cu 1,4 <var>c</var>.`, ok: false,
          why: `Viteza lui B în sistemul lui A cere regula de compunere și iese sub <var>c</var> (≈ 0,94 <var>c</var>).` },
        { t: `Nava A măsoară viteza navei B sub <var>c</var>.`, ok: true,
          why: `Compunerea a două viteze sub <var>c</var> rămâne sub <var>c</var>.` },
        { t: `Nava B măsoară viteza navei A cu aceeași mărime cu care A o măsoară pe a lui B.`, ok: true,
          why: `Viteza relativă are aceeași mărime văzută de la oricare dintre cei doi.` },
        { t: `Ritmul de 1,4 <var>c</var> arată că informația ar putea circula între nave mai repede decât lumina.`, ok: false,
          why: `Ritmul de apropiere nu transportă nimic: nu este viteza vreunui semnal.` }
      ],
      explain: `Ritmul de apropiere se măsoară într-un singur sistem; viteza relativă, în sistemul unuia dintre corpuri.`,
      ref: { id: 'apropiere', label: 'Viteza de apropiere nu e viteza relativă' }
    },
    {
      id: 'c7q14', type: 'multi',
      scenario: `Nava lui Bogdan merge orizontal cu 0,6 <var>c</var> față de stația Anei. Bogdan trimite un impuls de lumină exact în sus, față de navă.`,
      q: `Alege toate afirmațiile adevărate:`,
      options: [
        { t: `Bogdan măsoară <var>c</var> pe verticală.`, ok: true,
          why: `Lumina are viteza <var>c</var> în sistemul navei, în orice direcție.` },
        { t: `Ana vede impulsul urcând oblic, pe diagonală, fiindcă în timpul zborului nava înaintează.`, ok: true,
          why: `Pentru Ana, impulsul păstrează deplasarea orizontală a navei (0,6 <var>c</var>) și urcă în același timp.` },
        { t: `Componenta verticală a vitezei, măsurată de Ana, este tot <var>c</var>.`, ok: false,
          why: `Cu componenta orizontală 0,6 <var>c</var>, viteza totală ar depăși <var>c</var>. Componenta verticală este <var>c</var>/γ, mai mică.` },
        { t: `Viteza totală măsurată de Ana este tot <var>c</var>.`, ok: true,
          why: `Cele două componente (0,6 <var>c</var> și <var>c</var>/γ) se compun, ca vectori, în exact <var>c</var>: Postulatul I rămâne respectat.` },
        { t: `Viteza totală măsurată de Ana este mai mare decât <var>c</var>, pentru că viteza orizontală a navei se adaugă la <var>c</var>.`, ok: false,
          why: `Viteza verticală scade exact atât cât trebuie ca totalul să rămână <var>c</var>; nimic nu se „adaugă” peste <var>c</var>.` }
      ],
      explain: `Componentele vitezei se schimbă între observatori, dar viteza totală a luminii rămâne <var>c</var> în ambele sisteme.`,
      ref: { id: 'perpendicular', label: 'Și pe verticală se schimbă ceva' }
    },
    {
      id: 'c7q15', type: 'multi',
      q: `Alege afirmațiile corecte despre adunarea simplă a vitezelor, <var>u</var> = <var>u</var>′ + <var>v</var>:`,
      options: [
        { t: `Este cazul-limită al regulii relativiste, pentru viteze mult mai mici decât <var>c</var>.`, ok: true,
          why: `Când <var>v</var>, <var>u</var>′ ≪ <var>c</var> (γ ≈ 1), transformările Lorentz devin cele ale lui Galilei.` },
        { t: `Este exactă pentru orice viteze, atâta timp cât proiectilul nu este lumină.`, ok: false,
          why: `Corecția 1 + <var>v</var>·<var>u</var>′/<var>c</var>² există pentru orice proiectil; doar că la viteze mici este neglijabilă.` },
        { t: `Nu poate fi valabilă pentru lumină, oricât de mică ar fi viteza sursei.`, ok: true,
          why: `Ar da <var>c</var> + <var>v</var> ≠ <var>c</var>, în contradicție cu Postulatul I.` },
        { t: `Trebuie înlocuită cu totul, fiindcă dă erori vizibile chiar la viteze de zi cu zi.`, ok: false,
          why: `La viteze de zi cu zi eroarea este mult sub orice precizie de măsură: suma simplă rămâne folosită.` }
      ],
      explain: `Adunarea simplă este o aproximație excelentă pentru corpuri lente și nu este valabilă pentru lumină.`,
      ref: { id: 'regula', label: 'Regula corectă, în cuvinte' }
    },
    {
      id: 'c7q16', type: 'spot',
      q: `Raționamentul de mai jos ajunge la o concluzie falsă. Care este <strong>primul</strong> pas greșit?`,
      steps: [
        { t: `Nava lui Bogdan se depărtează de stația Anei cu 0,6 <var>c</var> și trimite înainte un impuls de lumină.` },
        { t: `Ana măsoară viteza impulsului: <var>c</var>; și viteza navei: 0,6 <var>c</var>.` },
        { t: `Deci, în sistemul Anei, distanța dintre impuls și navă crește cu <var>c</var> − 0,6 <var>c</var> = 0,4 <var>c</var>.` },
        { t: `Prin urmare, Bogdan trebuie să măsoare și el 0,4 <var>c</var> pentru impuls, fiindcă e vorba de aceeași distanță dintre aceleași două corpuri.`, bad: true,
          why: `Aici e greșeala: 0,4 <var>c</var> este un ritm măsurat cu rigla și ceasul Anei. Viteza impulsului în sistemul navei se măsoară cu instrumentele navei și dă <var>c</var>; cele două mărimi sunt diferite.` },
        { t: `Dar Postulatul I spune că Bogdan măsoară <var>c</var>, deci postulatul este contrazis.` }
      ],
      explain: `Pașii 1–3 sunt corecți; pasul 4 confundă un ritm măsurat într-un sistem cu o viteză măsurată în alt sistem.`,
      ref: { id: 'lumina', label: 'Lumina rămâne c — în ambele sensuri' }
    },
    {
      id: 'c7q17', type: 'spot',
      q: `Care este primul pas greșit din raționamentul următor?`,
      steps: [
        { t: `Două nave, A și B, se apropie una de alta; fiecare are 0,9 <var>c</var> față de stația Anei.` },
        { t: `Ana măsoară că distanța dintre nave scade cu 0,9 <var>c</var> + 0,9 <var>c</var> = 1,8 <var>c</var>.` },
        { t: `Deci nava A măsoară că nava B vine spre ea cu 1,8 <var>c</var>.`, bad: true,
          why: `1,8 <var>c</var> este un ritm măsurat în sistemul Anei. Viteza lui B în sistemul lui A se obține cu regula de compunere: ≈ 0,994 <var>c</var>, sub <var>c</var>.` },
        { t: `Dar nimic nu poate avea, față de un observator, o viteză mai mare decât <var>c</var>.` },
        { t: `Prin urmare, teoria relativității este contrazisă.` }
      ],
      explain: `Pasul 3 confundă viteza de apropiere (într-un sistem) cu viteza relativă (în sistemul unuia dintre corpuri).`,
      ref: { id: 'apropiere', label: 'Viteza de apropiere nu e viteza relativă' }
    },
    {
      id: 'c7q18', type: 'spot',
      q: `Găsește primul pas greșit:`,
      steps: [
        { t: `Nava lui Bogdan merge orizontal cu 0,8 <var>c</var> față de stația Anei.` },
        { t: `Bogdan trimite un impuls de lumină exact în sus; el măsoară <var>c</var> pe verticală.` },
        { t: `Distanța parcursă pe verticală este aceeași pentru Ana și pentru Bogdan, fiindcă <var>y</var> = <var>y</var>′.` },
        { t: `Deci și viteza pe verticală este aceeași pentru Ana: <var>c</var>.`, bad: true,
          why: `Viteza este distanță ÷ durată. Distanța coincide, dar durata nu (dilatarea timpului): componenta verticală măsurată de Ana este <var>c</var>/γ, mai mică.` },
        { t: `Împreună cu componenta orizontală, 0,8 <var>c</var>, Ana ar măsura o viteză totală mai mare decât <var>c</var>: contradicție cu Postulatul I.` }
      ],
      explain: `Pasul 4 uită că se schimbă și durata; cu componenta verticală corectă, viteza totală rămâne <var>c</var>.`,
      ref: { id: 'perpendicular', label: 'Și pe verticală se schimbă ceva' }
    },
    {
      id: 'c7q19', type: 'single',
      scenario: `Bogdan trage un proiectil înainte: lansarea și lovirea țintei au loc în două locuri diferite din navă.`,
      q: `Ce explică, în principal, faptul că Ana măsoară pentru proiectil o viteză mai mică decât suma simplă?`,
      options: [
        { t: `Proiectilul este frânat de o forță care apare numai pentru observatorii aflați în afara navei.`, ok: false,
          why: `Nu există nicio forță în plus: este vorba despre măsurători, nu despre mișcarea reală a proiectilului.` },
        { t: `Lansarea și lovirea sunt în locuri diferite din navă, iar ceasurile navei, văzute de Ana, nu sunt sincronizate: durata dintre ele nu e aceeași pentru cei doi.`, ok: true,
          why: `Timpul din stație depinde și de locul din navă. Adunarea simplă ignoră asta; regula corectă o include și iese o viteză mai mică.` },
        { t: `Ana măsoară greșit distanța parcursă, pentru că nava se mișcă în timpul zborului.`, ok: false,
          why: `Ana poate măsura corect, cu riglele ei; diferența vine din faptul că și durata nu e aceeași, nu dintr-o măsurătoare greșită.` },
        { t: `Lumina care aduce imaginea evenimentelor ajunge la Ana cu întârziere, așa că ea le vede mai târziu.`, ok: false,
          why: `Nu e vorba despre întârzierea semnalului: și după ce Ana corectează timpul de propagare, momentele atribuite evenimentelor diferă de cele ale lui Bogdan.` }
      ],
      explain: `Durata dintre două evenimente din locuri diferite nu este aceeași pentru doi observatori în mișcare relativă.`,
      ref: { id: 'poveste', label: 'Pe pași: de la 0,1 c până la lumină' }
    }
  ]
});
