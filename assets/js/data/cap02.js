/* Capitolul 2 — Spațiu-timp și intervalul: rezumat, glosar, bancă de întrebări */
RF.register({
  id: 2,

  summary: [
    { q: `Ce este un eveniment și cum se descrie?`,
      a: `Ceva ce are loc într-un loc precis și la un moment precis (o scânteie, o ciocnire). Se descrie prin <strong>patru numere</strong>, <var>E</var>(<var>x</var>, <var>y</var>, <var>z</var>, <var>t</var>) — un punct în <strong>spațiu-timpul 4D</strong>. Același eveniment primește coordonate diferite în S.R.I. diferite, dar rămâne același eveniment.` },
    { q: `Ce se întâmplă cu distanța dintre două puncte când rotești axele de coordonate?`,
      a: `În 3D, AB = √[(<var>x</var><sub>A</sub> − <var>x</var><sub>B</sub>)² + (<var>y</var><sub>A</sub> − <var>y</var><sub>B</sub>)² + (<var>z</var><sub>A</sub> − <var>z</var><sub>B</sub>)²]. Componentele Δ<var>x</var>, Δ<var>y</var>, Δ<var>z</var> se schimbă la rotire, dar <strong>AB = const</strong> pentru orice sistem de axe <var>x</var>O<var>yz</var>.` },
    { q: `Enunță intervalul spațio-temporal.`,
      a: `Distanța dintre două evenimente <var>E</var><sub>1</sub>(<var>x</var><sub>1</sub>, <var>y</var><sub>1</sub>, <var>z</var><sub>1</sub>, <var>t</var><sub>1</sub>) și <var>E</var><sub>2</sub>(<var>x</var><sub>2</sub>, <var>y</var><sub>2</sub>, <var>z</var><sub>2</sub>, <var>t</var><sub>2</sub>) în 4D: <strong>(Δ<var>s</var>)² = (Δ<var>x</var>)² + (Δ<var>y</var>)² + (Δ<var>z</var>)² − (<var>c</var>·Δ<var>t</var>)²</strong>. Δ<var>s</var> se numește <strong>interval spațio-temporal</strong>. Cu <var>i</var>² = −1: (Δ<var>s</var>)² = (Δ<var>x</var>)² + (Δ<var>y</var>)² + (Δ<var>z</var>)² + (<var>i</var>·<var>c</var>·Δ<var>t</var>)².` },
    { q: `De ce este Δs un invariant relativist? Ce se schimbă și ce nu?`,
      a: `Pentru că are <strong>aceeași valoare în orice S.R.I.</strong> În 3D, AB = const pentru orice <var>x</var>O<var>yz</var>; în spațiu-timp, Δ<var>s</var> = const pentru orice <var>x</var>O<var>yz</var>(<var>ict</var>). Se schimbă Δ<var>x</var> și Δ<var>t</var> <em>luate separat</em>; nu se schimbă combinația lor. A roti un <var>x</var>O<var>yz</var>(<var>ict</var>) ⟺ un nou reper pentru un mobil care se deplasează cu <var>v</var> față de alt reper.` },
    { q: `Descrie diagrama Minkowski.`,
      a: `Axe <var>x</var> și <var>ict</var>; prin rotire apar <var>x</var>′ și <var>ict</var>′, iar un eveniment E(<var>x</var>, <var>ict</var>) ≡ E′(<var>x</var>′, <var>ict</var>′), cu tg α = <var>v</var>/(<var>ic</var>), <var>i</var>² = −1. În varianta reală (<var>x</var> – <var>ct</var>), axele lui S′ se înclină simetric față de linia luminii; coordonatele lui S′ se citesc cu paralele la axele lui S′.` },
    { q: `Cât este Δs pentru două evenimente aflate pe drumul aceluiași impuls de lumină?`,
      a: `<strong>Zero, în orice S.R.I.</strong> Pentru lumină |Δ<var>x</var>| = <var>c</var>·Δ<var>t</var> în toate sistemele (Postulatul I), deci (Δ<var>s</var>)² = 0. Linia luminii este aceeași dreaptă pe diagrama oricărui observator.` },
    { q: `De ce timpul nu este „încă o lungime”?`,
      a: `În interval, termenul de timp intră cu semn <strong>opus</strong> celor spațiale. Doar așa combinația rămâne aceeași pentru toți observatorii și iese 0 pentru lumină. De aceea (Δ<var>s</var>)² poate fi pozitiv, zero sau negativ: nu este pătratul unei lungimi obișnuite.` },
    { q: `Ce înseamnă „trucul ict”?`,
      a: `A patra coordonată se scrie <var>i</var>·<var>c</var>·<var>t</var> (<var>i</var>² = −1), deci (<var>ict</var>)² = −<var>c</var>²<var>t</var>² și intervalul arată ca o distanță obișnuită, cu patru termeni plus. Schimbarea S.R.I. devine o <strong>rotație formală</strong> a axelor <var>x</var>–<var>ict</var>. Este un truc de calcul, nu un „timp imaginar”.` }
  ],

  glossary: [
    { term: `Eveniment`, def: `Ceva ce se întâmplă într-un loc precis și la un moment precis (o scânteie, o ciocnire, o bătaie de ceas). Se descrie prin patru numere, E(x, y, z, t); același eveniment primește coordonate diferite în S.R.I. diferite.` },
    { term: `Spațiu-timp`, def: `Spațiul cu trei dimensiuni la care se adaugă timpul ca a patra coordonată (4D). Fiecare eveniment este un punct al lui; desenat, apare ca plane suprapuse, „straturi de timp”.` },
    { term: `Interval spațio-temporal`, def: `„Distanța” dintre două evenimente în 4D: (Δs)² = (Δx)² + (Δy)² + (Δz)² − (c·Δt)². Are aceeași valoare în orice S.R.I.` },
    { term: `Invariant relativist`, def: `Mărime care are aceeași valoare în toate S.R.I. (de exemplu intervalul Δs sau viteza luminii în vid). Nu înseamnă „constant în timp”.` },
    { term: `Diagrama Minkowski`, def: `Desen al spațiu-timpului cu axele x și ct (sau x și ict). Un punct = un eveniment; schimbarea S.R.I. înclină (sau rotește) axele. Coordonatele lui S′ se citesc cu paralele la axele lui S′.` },
    { term: `Linia luminii`, def: `Dreapta de pe diagrama Minkowski pe care |Δx| = c·Δt: drumul unui impuls de lumină. Pe ea (Δs)² = 0, iar ea este aceeași pentru toți observatorii.` },
    { term: `ict`, def: `A patra coordonată scrisă i·c·t, cu i² = −1: face ca formula intervalului să arate ca o sumă de patru pătrate. Este un truc de calcul, nu un „timp imaginar”.` },
    { term: `Interval de tip timp`, def: `Adaos · (Δs)² < 0, adică c·Δt > |Δx|. Evenimentele pot fi legate de un corp sau de un semnal mai lent decât lumina; ordinea lor în timp este aceeași pentru toți observatorii.` },
    { term: `Interval de tip spațiu`, def: `Adaos · (Δs)² > 0, adică |Δx| > c·Δt. Niciun semnal nu le poate lega (ar trebui să fie mai rapid decât lumina); ordinea lor în timp poate diferi de la un observator la altul.` }
  ],

  quiz: [
    {
      id: 'c2q1', type: 'single',
      scenario: `Un fulger lovește vârful unui catarg. Un observator de pe țărm și unul de pe o barcă ce trece uniform pe lângă țărm notează fiecare, în sistemul lui, unde și când s-a produs lovitura.`,
      q: `Ce poți spune despre cele două înregistrări?`,
      options: [
        { t: `E același eveniment; numerele notate (loc și moment) pot diferi, fiindcă fiecare le măsoară în propriul sistem de referință.`, ok: true,
          why: `Evenimentul nu depinde de nimeni; coordonatele lui sunt doar „etichete” într-un sistem. Alt S.R.I. ⇒ alte etichete pentru același eveniment.` },
        { t: `Dacă numerele diferă, înseamnă că cei doi au văzut de fapt două evenimente diferite, produse în locuri sau în momente diferite.`, ok: false,
          why: `Confuzia dintre eveniment și coordonatele lui. Același eveniment primește coordonate diferite în S.R.I. diferite; nu sunt două fulgere.` },
        { t: `Numerele trebuie să coincidă; dacă diferă, cel puțin unul dintre ei a măsurat greșit sau are un aparat defect.`, ok: false,
          why: `Chiar și în fizica clasică poziția diferă între observatori în mișcare relativă; în relativitate diferă și momentul. Nu e o greșeală de măsurare.` },
        { t: `Cel de pe țărm are numerele „adevărate”, pentru că solul este în repaus absolut, iar barca doar se mișcă față de el.`, ok: false,
          why: `Nu există repaus absolut (Postulatul al II-lea): țărmul este un S.R.I. printre altele, iar barca e la fel de îndreptățită să se considere în repaus.` }
      ],
      explain: `Evenimentul este real și unic; <strong>coordonatele</strong> lui (<var>x</var>, <var>y</var>, <var>z</var>, <var>t</var>) depind de sistemul de referință.`,
      ref: { id: 'eveniment', label: 'Un eveniment: unde și când' }
    },
    {
      id: 'c2q2', type: 'single',
      scenario: `Doi prieteni desenează fiecare axe pe aceeași hartă; axele celui de-al doilea sunt rotite față de ale primului. Al doilea alege rotația astfel încât orașele A și B să aibă aceeași coordonată <var>y</var>′ (segmentul AB e paralel cu axa lui <var>x</var>′).`,
      q: `Ce poți spune, fără nicio măsurătoare nouă, despre Δ<var>x</var>′ găsit de al doilea prieten?`,
      options: [
        { t: `Δ<var>x</var>′ este chiar distanța AB: cu Δ<var>y</var>′ = 0, toată depărtarea dintre orașe se vede pe axa <var>x</var>′ (AB nu depinde de axe).`, ok: true,
          why: `Distanța AB are aceeași valoare în orice sistem de axe; în sistemul lui, AB² = Δ<var>x</var>′² + Δ<var>y</var>′² și, cu Δ<var>y</var>′ = 0, rămâne |Δ<var>x</var>′| = AB.` },
        { t: `Δ<var>x</var>′ = 0, pentru că orașele sunt pe aceeași orizontală și deci nu mai există nicio depărtare între ele pe harta rotită.`, ok: false,
          why: `Aceeași coordonată <var>y</var>′ înseamnă Δ<var>y</var>′ = 0, nu Δ<var>x</var>′ = 0. Orașele sunt tot depărtate; depărtarea apare acum numai pe axa <var>x</var>′.` },
        { t: `Δ<var>x</var>′ este mai mare decât AB, deoarece axele rotite „întind” harta și măresc toate depărtările măsurate pe ea.`, ok: false,
          why: `Rotația nu întinde nimic, iar proiecția unui segment nu poate depăși segmentul. Distanța AB rămâne aceeași pentru ambii prieteni.` },
        { t: `Nu se poate spune nimic fără o nouă măsurătoare, pentru că rezultatul depinde de unghiul cu care sunt rotite axele față de prima pereche.`, ok: false,
          why: `Tocmai invarianța distanței ne dă răspunsul fără altă măsurătoare: oricare ar fi unghiul, AB² = Δ<var>x</var>′² + Δ<var>y</var>′².` }
      ],
      explain: `Componentele depind de axe; <strong>distanța dintre puncte nu</strong>. Este modelul pentru intervalul dintre evenimente.`,
      ref: { id: 'distanta', label: 'Pe hartă: distanța nu depinde de axe' }
    },
    {
      id: 'c2q3', type: 'single',
      scenario: `În S, două scântei apar simultan în două puncte ale peronului, aflate la 100 m unul de altul.`,
      q: `Ce poți afirma despre (Δ<var>s</var>)² pentru perechea de scântei?`,
      options: [
        { t: `Este pozitiv în S și rămâne pozitiv în orice S.R.I., deci nimeni nu le poate vedea în același loc.`, ok: true,
          why: `Cu Δ<var>t</var> = 0, (Δ<var>s</var>)² = (Δ<var>x</var>)² > 0. Fiind invariant, rămâne pozitiv pentru toți; dacă ar fi în același loc (Δ<var>x</var>′ = 0), (Δ<var>s</var>)² ar fi ≤ 0.` },
        { t: `Este zero, pentru că scânteile sunt simultane (Δ<var>t</var> = 0), iar lumina n-ar avea timp să parcurgă nimic între ele.`, ok: false,
          why: `Δ<var>t</var> = 0 nu face (Δ<var>s</var>)² = 0: rămâne termenul spațial (Δ<var>x</var>)². Zero obții doar când |Δ<var>x</var>| = <var>c</var>Δ<var>t</var>, adică pe drumul unui impuls de lumină.` },
        { t: `Este pozitiv în S, dar pentru un S′ foarte rapid poate ieși negativ, dacă scânteile nu mai sunt simultane acolo.`, ok: false,
          why: `Intervalul este invariant: semnul lui nu se schimbă. În S′ scânteile nu mai sunt simultane, dar Δ<var>x</var>′ și Δ<var>t</var>′ se ajustează astfel încât (Δ<var>s</var>)² să rămână același.` },
        { t: `Nu are sens, fiindcă intervalul se definește doar pentru evenimente produse în același loc al peronului.`, ok: false,
          why: `Intervalul se definește pentru orice pereche de evenimente și orice observator; nu are nevoie ca ele să fie în același loc.` }
      ],
      explain: `(Δ<var>s</var>)² are un <strong>semn</strong> care nu depinde de observator: aici pozitiv, deci scânteile nu pot fi „în același loc” pentru nimeni.`,
      ref: { id: 'interval', label: 'Intervalul Δs: ce se schimbă și ce nu' }
    },
    {
      id: 'c2q4', type: 'single',
      q: `De ce apare în formula intervalului semnul minus între termenii spațiali și termenul (<var>c</var>Δ<var>t</var>)²?`,
      options: [
        { t: `Pentru că numai cu minus combinația iese 0 pentru lumină în orice S.R.I.; cu plus nu ar mai rămâne aceeași pentru toți.`, ok: true,
          why: `Postulatul I cere |Δ<var>x</var>| = <var>c</var>Δ<var>t</var> pentru lumină în toate S.R.I.; diferența pătratelor dă 0 pentru toți, suma nu.` },
        { t: `Pentru că timpul curge numai înainte, deci contribuția lui la „distanță” trebuie scăzută, nu adunată cu cele trei spațiale.`, ok: false,
          why: `Sensul curgerii timpului nu are legătură cu semnul. Minusul vine din cerința ca lumina să aibă aceeași viteză în toate S.R.I.` },
        { t: `Pentru că spațiul se măsoară în metri, iar timpul în secunde, iar mărimile cu unități diferite se scad, nu se adună între ele.`, ok: false,
          why: `Produsul <var>c</var>Δ<var>t</var> este deja o lungime, deci unitățile sunt aceleași. Nu unitățile cer minusul, ci Postulatul I.` },
        { t: `Este doar o convenție: cu semn plus s-ar obține exact aceeași mărime invariantă, scrisă puțin altfel.`, ok: false,
          why: `Nu e convenție. Suma (Δ<var>x</var>)² + (<var>c</var>Δ<var>t</var>)² NU rămâne aceeași pentru doi observatori în mișcare relativă (pentru lumină nu e nici măcar 0).` }
      ],
      explain: `Minusul nu e un capriciu: este <strong>Postulatul I</strong> scris în limbajul intervalului.`,
      ref: { id: 'poveste', label: 'De la hartă la spațiu-timp' }
    },
    {
      id: 'c2q5', type: 'single',
      q: `Pe diagrama Minkowski desenată de S, axa <var>ct</var>′ a lui S′ este o dreaptă înclinată spre dreapta. Ce reprezintă ea?`,
      options: [
        { t: `Toate evenimentele care au loc în originea lui S′, adică drumul pe care îl face originea lui S′ văzută din S.`, ok: true,
          why: `Pe <var>ct</var>′ avem <var>x</var>′ = 0 (același loc în S′), iar în S locul se deplasează cu viteza <var>v</var>: dreapta este înclinată cu tg α = <var>v</var>/<var>c</var>.` },
        { t: `Drumul unui impuls de lumină care pleacă din originea lui S și care, privit din S′, pare mai lent decât <var>c</var>.`, ok: false,
          why: `Drumul luminii este linia de 45°, aceeași pentru toți. Axa <var>ct</var>′ este mai puțin înclinată (tg α = <var>v</var>/<var>c</var> < 1), fiindcă S′ se mișcă mai încet decât lumina.` },
        { t: `Axa pe care S′ își măsoară distanțele, rotită față de axa lui S, la fel ca la harta cu axe rotite.`, ok: false,
          why: `Distanțele lui S′ se măsoară pe <var>x</var>′. Axa <var>ct</var>′ este axa timpului lui S′ (evenimentele cu <var>x</var>′ = 0).` },
        { t: `O frontieră a diagramei pe care evenimentele din S nu o pot traversa, pentru că S′ se mișcă față de S.`, ok: false,
          why: `Evenimentele pot fi oriunde pe diagramă; <var>ct</var>′ este doar o axă de coordonate, nu un perete.` }
      ],
      explain: `Axa <var>ct</var>′ = „locul” originii lui S′, văzut din S; înclinarea ei măsoară viteza relativă (tg α = <var>v</var>/<var>c</var>).`,
      ref: { id: 'minkowski', label: 'Diagrama Minkowski' }
    },
    {
      id: 'c2q6', type: 'single',
      q: `Cum se modifică axele lui S′ pe diagrama lui S, atunci când viteza lui S′ față de S crește?`,
      options: [
        { t: `Ambele axe se înclină spre linia luminii, simetric față de ea; la viteze apropiate de <var>c</var> ar ajunge aproape lipite de ea.`, ok: true,
          why: `<var>ct</var>′ (<var>x</var>′ = 0) și <var>x</var>′ (<var>t</var>′ = 0) se înclină cu același unghi, spre dreapta de 45° pe care o împart la mijloc.` },
        { t: `Doar <var>ct</var>′ se înclină; <var>x</var>′ rămâne orizontală, fiindcă „în același timp” înseamnă același lucru pentru toți observatorii.`, ok: false,
          why: `Aceasta este imaginea fizicii clasice (timp absolut). În relativitate se înclină și axa <var>x</var>′, adică mulțimea evenimentelor simultane pentru S′.` },
        { t: `Se rotesc împreună, rămânând perpendiculare în desen, exact ca axele rotite pe harta cu orașe.`, ok: false,
          why: `Pe hartă rotația este rigidă. În diagrama reală <var>x</var>–<var>ct</var> axele se strâng ca o foarfecă; „rotație” apare doar în varianta cu <var>ict</var>, și acolo formală.` },
        { t: `Rămân pe loc; se deplasează doar evenimentele, spre dreapta, odată cu viteza lui S′.`, ok: false,
          why: `Evenimentele nu se mută. Se schimbă axele, adică etichetele de coordonate pe care le folosește S′.` }
      ],
      explain: `Schimbarea S.R.I. înclină <strong>simetric</strong> ambele axe spre linia luminii, care rămâne pe loc.`,
      ref: { id: 'minkowski', label: 'Diagrama Minkowski' }
    },
    {
      id: 'c2q7', type: 'single',
      scenario: `Într-un laborator (S), un ceas din apropierea unui detector face două „tic-uri”, <var>E</var><sub>1</sub> și <var>E</var><sub>2</sub>, la 5 secunde unul după altul, exact în același loc.`,
      q: `Ce poți spune despre (Δ<var>s</var>)² pentru perechea <var>E</var><sub>1</sub>, <var>E</var><sub>2</sub>?`,
      options: [
        { t: `Este negativ, iar semnul se păstrează în orice S.R.I., fiindcă intervalul are aceeași valoare pentru toți observatorii.`, ok: true,
          why: `Δ<var>x</var> = 0 ⇒ (Δ<var>s</var>)² = −(<var>c</var>Δ<var>t</var>)² < 0. Fiind invariant, rămâne negativ pentru toți: niciun observator nu le poate găsi simultane.` },
        { t: `Este zero, pentru că evenimentele au loc în același loc, deci între ele nu există nicio distanță de parcurs.`, ok: false,
          why: `Intervalul nu este distanța în spațiu: timpul contribuie și el (cu minus). Ar fi 0 numai dacă și Δ<var>t</var> ar fi 0 — atunci ar fi același eveniment.` },
        { t: `Este pozitiv, deoarece un pătrat nu poate fi niciodată negativ, oricare ar fi mărimile care intră în el.`, ok: false,
          why: `(Δ<var>s</var>)² nu este pătratul unei lungimi obișnuite: termenul de timp intră cu minus, deci combinația poate ieși negativă.` },
        { t: `Depinde de observator: unul care trece cu viteză mare ar putea găsi un (Δ<var>s</var>)² pozitiv pentru aceleași evenimente.`, ok: false,
          why: `Invarianța înseamnă tocmai că toți găsesc aceeași valoare; semnul ei nu se poate schimba de la un observator la altul.` }
      ],
      explain: `Un (Δ<var>s</var>)² negativ nu e o eroare: timpul „bate” spațiul — și asta e valabil pentru toți observatorii.`,
      ref: { id: 'interval', label: 'Intervalul Δs: ce se schimbă și ce nu' }
    },
    {
      id: 'c2q8', type: 'single',
      q: `Ce rol are scrierea celei de-a patra coordonate ca <var>ict</var> (cu <var>i</var>² = −1) în formula intervalului?`,
      options: [
        { t: `Un truc de notație: (<var>ic</var>Δ<var>t</var>)² = −(<var>c</var>Δ<var>t</var>)², deci intervalul arată ca o sumă de patru pătrate.`, ok: true,
          why: `Exact: <var>i</var> doar preia semnul minus. Formula rămâne aceeași, dar se vede ca o distanță în 4D, iar schimbarea S.R.I. ca o rotație (formală).` },
        { t: `Arată că timpul este o mărime imaginară și că, de aceea, nu poate fi măsurat cu un ceas obișnuit, real, ci doar calculat.`, ok: false,
          why: `Timpul se măsoară cu ceasuri reale și dă numere reale. <var>i</var> apare doar ca să preia semnul minus; nu schimbă natura timpului.` },
        { t: `Înlocuiește viteza luminii: în spațiu-timp se ia <var>c</var> = <var>i</var>, ca să dispară toate constantele din formulă.`, ok: false,
          why: `<var>c</var> rămâne viteza luminii (≈ 3·10⁸ m/s). Produsul <var>i</var>·<var>c</var>·<var>t</var> este doar o notație pentru a patra coordonată.` },
        { t: `Face ca (Δ<var>s</var>)² să fie mereu pozitiv, la fel ca pătratul oricărei distanțe obișnuite dintre două puncte ale spațiului.`, ok: false,
          why: `Formula nu se schimbă, doar se rescrie: (Δ<var>s</var>)² poate fi în continuare pozitiv, zero sau negativ.` }
      ],
      explain: `<var>ict</var> este o notație care ascunde semnul minus; fizica rămâne aceeași, iar timpul rămâne real.`,
      ref: { id: 'poveste', label: 'De la hartă la spațiu-timp' }
    },
    {
      id: 'c2q9', type: 'single',
      scenario: `Doi observatori, S și S′, studiază aceeași pereche de evenimente. S măsoară între ele o distanță spațială Δ<var>x</var>, iar S′ găsește pentru aceeași pereche un Δ<var>x</var>′ clar diferit.`,
      q: `Care concluzie este corectă?`,
      options: [
        { t: `Este normal: în general vor diferi și duratele, astfel încât (Δ<var>x</var>)² − (<var>c</var>Δ<var>t</var>)² să iasă la fel pentru amândoi.`, ok: true,
          why: `Δ<var>x</var> și Δ<var>t</var> se schimbă împreună și se compensează în Δ<var>s</var>.` },
        { t: `Imposibil: dacă intervalul Δ<var>s</var> este invariant, atunci și distanța spațială Δ<var>x</var> trebuie să fie aceeași pentru toți.`, ok: false,
          why: `Invariantă este numai combinația Δ<var>s</var>; termenii ei, luați separat, se pot schimba atâta timp cât se compensează reciproc.` },
        { t: `Unul dintre ei a greșit: o distanță măsurată corect este aceeași pentru toți observatorii, oricum s-ar mișca ei.`, ok: false,
          why: `Distanța dintre două evenimente depinde de observator (și în fizica clasică, dacă evenimentele nu sunt simultane). Nu e o eroare de măsurare.` },
        { t: `Durata Δ<var>t</var> rămâne aceeași pentru amândoi; Δ<var>x</var> diferă doar pentru că originile lor de coordonate sunt în locuri diferite.`, ok: false,
          why: `O origine diferită nu schimbă o diferență Δ<var>x</var> (se anulează). Δ<var>x</var> diferă din cauza mișcării relative, iar atunci diferă în general și Δ<var>t</var>: timpul absolut e exclus de Postulatul I.` }
      ],
      explain: `Δ<var>x</var> și Δ<var>t</var> se schimbă <strong>împreună</strong>, compensându-se în Δ<var>s</var>.`,
      ref: { id: 'interval', label: 'Intervalul Δs: ce se schimbă și ce nu' }
    },
    {
      id: 'c2q10', type: 'single',
      q: `Pe diagrama Minkowski a lui S, o dreaptă orizontală reunește evenimente cu același <var>t</var> în S (un „strat de timp” al lui S). Ce se întâmplă cu aceste evenimente, privite de S′ (în mișcare față de S)?`,
      options: [
        { t: `În general nu mai sunt simultane: stratul de timp al lui S′ e o paralelă înclinată la <var>x</var>′, care taie orizontala în puncte cu <var>t</var>′ diferit.`, ok: true,
          why: `„În același timp” depinde de S.R.I.; se vede din înclinarea axei <var>x</var>′. Detaliile vin în capitolul 4.` },
        { t: `Rămân simultane, deoarece simultaneitatea a două evenimente nu depinde de sistemul de referință al observatorului, ci doar de ceasurile lor.`, ok: false,
          why: `Asta este ipoteza timpului absolut din fizica clasică. Înclinarea lui <var>x</var>′ arată că „în același timp” depinde de S.R.I.` },
        { t: `Devin simultane în S′ numai dacă S′ se mișcă mai repede decât lumina; altfel rămân simultane și acolo, ca în sistemul S.`, ok: false,
          why: `S′ nu poate depăși <var>c</var>, iar efectul apare pentru orice viteză relativă nenulă, crescând odată cu ea.` },
        { t: `Rămân simultane, dar distanțele dintre ele se micșorează, pentru că S′ se mișcă față de S și toate lungimile se contractă.`, ok: false,
          why: `Orizontalele lui S nu sunt paralele cu <var>x</var>′; deci evenimentele de pe o orizontală a lui S nu sunt simultane pentru S′.` }
      ],
      explain: `Orizontalele lui S și paralelele la <var>x</var>′ sunt drepte diferite: asta anunță relativitatea simultaneității.`,
      ref: { id: 'minkowski', label: 'Diagrama Minkowski' }
    },
    {
      id: 'c2q11', type: 'multi',
      q: `Pentru aceeași pereche de evenimente, care dintre mărimile următoare au aceeași valoare în toate S.R.I.?`,
      options: [
        { t: `Intervalul spațio-temporal Δ<var>s</var> dintre cele două evenimente.`, ok: true,
          why: `Este invariantul relativist al capitolului.` },
        { t: `Viteza luminii în vid, așa cum o măsoară fiecare observator.`, ok: true,
          why: `Postulatul I: <var>c</var> este aceeași în orice S.R.I.` },
        { t: `Distanța spațială Δ<var>x</var> dintre cele două evenimente.`, ok: false,
          why: `Se schimbă de la un S.R.I. la altul (de-a lungul direcției mișcării).` },
        { t: `Durata Δ<var>t</var> dintre cele două evenimente.`, ok: false,
          why: `Duratele devin relative la S.R.I.; Δ<var>t</var> nu este invariant.` },
        { t: `Suma (Δ<var>x</var>)² + (<var>c</var>Δ<var>t</var>)², adică aceeași combinație, dar cu plus.`, ok: false,
          why: `Capcană: doar diferența păstrează valoarea. Suma depinde de observator (pentru lumină nu e nici 0).` }
      ],
      explain: `Invarianți: <strong>Δ<var>s</var></strong> și <strong><var>c</var></strong>. Separat, Δ<var>x</var> și Δ<var>t</var> sunt relative.`,
      ref: { id: 'interval', label: 'Intervalul Δs: ce se schimbă și ce nu' }
    },
    {
      id: 'c2q12', type: 'multi',
      q: `Alege toate afirmațiile corecte despre intervalul spațio-temporal Δ<var>s</var>.`,
      options: [
        { t: `Pentru două evenimente aflate pe drumul aceluiași impuls de lumină, (Δ<var>s</var>)² = 0 în orice S.R.I.`, ok: true,
          why: `Postulatul I: |Δ<var>x</var>| = <var>c</var>Δ<var>t</var> pentru toți, deci diferența pătratelor este 0 pentru toți.` },
        { t: `(Δ<var>s</var>)² poate ieși negativ, fără ca asta să indice vreo eroare de măsurare.`, ok: true,
          why: `Termenul de timp intră cu minus; când <var>c</var>Δ<var>t</var> depășește |Δ<var>x</var>|, combinația este negativă.` },
        { t: `Doi observatori pot găsi Δ<var>x</var> și Δ<var>t</var> diferite pentru aceleași evenimente și, totuși, același Δ<var>s</var>.`, ok: true,
          why: `Exact asta înseamnă invariant: combinația rămâne, termenii se schimbă.` },
        { t: `Δ<var>s</var> este distanța în spațiu dintre evenimente, măsurată de observatorul care stă pe loc.`, ok: false,
          why: `Distanța în spațiu este Δ<var>x</var> (și depinde de observator). Δ<var>s</var> amestecă spațiul cu timpul.` },
        { t: `Dacă (Δ<var>s</var>)² = 0, cele două evenimente au loc în același loc.`, ok: false,
          why: `Zero nu înseamnă „același loc”: înseamnă că evenimentele sunt legate printr-un impuls de lumină. Același loc + același moment ar fi același eveniment.` }
      ],
      explain: `Δ<var>s</var> nu e „distanța în spațiu”: e un amestec spațiu-timp, egal cu 0 pentru lumină, de orice semn în rest.`,
      ref: { id: 'interval', label: 'Intervalul Δs: ce se schimbă și ce nu' }
    },
    {
      id: 'c2q13', type: 'multi',
      q: `Care dintre afirmațiile despre diagrama Minkowski (varianta reală, cu <var>x</var> și <var>ct</var>) sunt adevărate?`,
      options: [
        { t: `Fiecare punct al diagramei este un eveniment, iar același eveniment rămâne același punct oricare ar fi axele folosite.`, ok: true,
          why: `Axele schimbă doar „grila” după care citești coordonatele, nu evenimentul.` },
        { t: `Coordonatele (<var>x</var>′, <var>ct</var>′) ale unui eveniment se citesc ducând din el drepte paralele cu axele lui S′, nu perpendiculare pe ele.`, ok: true,
          why: `Axele lui S′ nu sunt perpendiculare în desen; regula „paralele la axe” funcționează pentru orice pereche de axe.` },
        { t: `Axele <var>x</var>′ și <var>ct</var>′ sunt așezate simetric față de linia luminii.`, ok: true,
          why: `Amândouă se înclină cu același unghi (tg α = <var>v</var>/<var>c</var>), una de fiecare parte a dreptei de 45°.` },
        { t: `Linia luminii se înclină odată cu axele lui S′, ca să rămână mereu la 45° față de axa <var>ct</var>′.`, ok: false,
          why: `Linia luminii nu se mișcă: este aceeași pentru toți (Postulatul I). Axele sunt cele care se apropie de ea.` },
        { t: `Orizontalele diagramei lui S (straturile de timp ale lui S) sunt straturi de timp și pentru S′.`, ok: false,
          why: `Pentru S′, „același timp” înseamnă paralelele la <var>x</var>′, care sunt înclinate față de orizontale.` }
      ],
      explain: `Citește S′ cu <strong>paralele la axele lui S′</strong>, iar linia luminii rămâne neatinsă.`,
      ref: { id: 'minkowski', label: 'Diagrama Minkowski' }
    },
    {
      id: 'c2q14', type: 'multi',
      q: `Alege toate corespondențele corecte între rotirea axelor pe o hartă și schimbarea S.R.I. în spațiu-timp.`,
      options: [
        { t: `Pe hartă se schimbă Δ<var>x</var> și Δ<var>y</var>; în spațiu-timp se schimbă Δ<var>x</var> și Δ<var>t</var>.`, ok: true,
          why: `În ambele cazuri se „amestecă” două coordonate (aici, spațiul pe direcția mișcării cu timpul).` },
        { t: `Pe hartă rămâne la fel distanța AB; în spațiu-timp rămâne la fel intervalul Δ<var>s</var>.`, ok: true,
          why: `Intervalul este „distanța” spațiu-timpului, la fel de independentă de axe ca AB.` },
        { t: `O rotație „curată” apare doar dacă a patra coordonată se scrie <var>ict</var>; în diagrama reală <var>x</var>–<var>ct</var> axele se strâng spre linia luminii.`, ok: true,
          why: `Trucul <var>ict</var> transformă foarfeca în rotație formală; fără <var>i</var>, axele nu rămân perpendiculare în desen.` },
        { t: `Pe hartă orașele A și B se deplasează când rotești axele; în spațiu-timp evenimentele se deplasează când schimbi S.R.I.`, ok: false,
          why: `Nici orașele, nici evenimentele nu se mută: se schimbă numai axele, adică etichetele.` },
        { t: `În varianta cu <var>ict</var>, unghiul de rotație α este un unghi real obișnuit, ca pe hartă, cu tg α = <var>v</var>/<var>c</var>.`, ok: false,
          why: `În curs, tg α = <var>v</var>/(<var>ic</var>): un număr imaginar. Rotația este formală, un truc de calcul.` }
      ],
      explain: `Analogia hartă ↔ spațiu-timp: <strong>componentele se schimbă, „distanța” nu</strong>; dar rotația este formală.`,
      ref: { id: 'distanta', label: 'Pe hartă: distanța nu depinde de axe' }
    },
    {
      id: 'c2q15', type: 'multi',
      q: `<strong>Adaos.</strong> Două evenimente au (Δ<var>s</var>)² > 0 („de tip spațiu”). Care afirmații sunt adevărate?`,
      options: [
        { t: `Niciun semnal care merge cu viteza luminii sau mai lent nu poate ajunge de la unul la celălalt.`, ok: true,
          why: `|Δ<var>x</var>| > <var>c</var>Δ<var>t</var>: lumina n-ar apuca să parcurgă distanța dintre ele.` },
        { t: `Pentru niciun observator cele două evenimente nu pot avea loc în același loc.`, ok: true,
          why: `Semnul lui (Δ<var>s</var>)² e același pentru toți; cu Δ<var>x</var>′ = 0 am obține (Δ<var>s</var>)² ≤ 0.` },
        { t: `Există un S.R.I. în care cele două evenimente sunt simultane.`, ok: true,
          why: `Axa <var>x</var>′ se poate înclina până trece prin ambele (pentru o viteză relativă mai mică decât <var>c</var>).` },
        { t: `Primul eveniment poate fi cauza celui de-al doilea, dacă semnalul care le leagă este suficient de rapid.`, ok: false,
          why: `„Suficient de rapid” ar însemna mai rapid decât lumina, iar nimic nu poate depăși limita de viteză (capitolele 7–8).` },
        { t: `Toți observatorii sunt de acord care dintre cele două evenimente a avut loc primul.`, ok: false,
          why: `Pentru evenimente de tip spațiu, ordinea în timp depinde de observator (capitolul 4) — de aceea ele nu pot fi legate cauzal.` }
      ],
      explain: `Semnul lui (Δ<var>s</var>)² separă absolut ce poate influența ce: <strong>cauză și efect</strong> doar la intervale de tip timp sau lumină.`,
      ref: { id: 'adaos', label: 'Adaos: semnul lui (Δs)² și cauza' }
    },
    {
      id: 'c2q16', type: 'spot',
      q: `Raționamentul de mai jos ajunge la o concluzie falsă. Care este <strong>primul</strong> pas greșit?`,
      steps: [
        { t: `Un impuls de lumină pleacă din <var>E</var><sub>1</sub> și ajunge în <var>E</var><sub>2</sub>; în S, distanța parcursă este Δ<var>x</var>, în timpul Δ<var>t</var>, cu |Δ<var>x</var>| = <var>c</var>Δ<var>t</var>.` },
        { t: `Prin urmare, în S, (Δ<var>s</var>)² = (Δ<var>x</var>)² − (<var>c</var>Δ<var>t</var>)² = 0.` },
        { t: `Un observator S′, în mișcare față de S, măsoară pentru aceleași evenimente alte valori, Δ<var>x</var>′ și Δ<var>t</var>′.` },
        { t: `Deoarece valorile sunt altele, intervalul nu mai are voie să fie 0: Δ<var>s</var> depinde de observatorul care îl calculează.`, bad: true,
          why: `Aici e greșeala: Δ<var>s</var> este invariant, nu depinde de observator. Valorile Δ<var>x</var>′ și Δ<var>t</var>′ sunt altele, dar rămân în relația |Δ<var>x</var>′| = <var>c</var>Δ<var>t</var>′ (Postulatul I), deci și în S′ avem (Δ<var>s</var>)² = 0.` },
        { t: `Deci, în S′, lumina nu mai parcurge Δ<var>x</var>′ = <var>c</var>Δ<var>t</var>′, adică viteza luminii ar depinde de S.R.I.` }
      ],
      explain: `Faptul că Δ<var>x</var> și Δ<var>t</var> se schimbă nu înseamnă că se schimbă și combinația lor: <strong>pentru lumină, Δ<var>s</var> = 0 pentru toți</strong>.`,
      ref: { id: 'lumina', label: 'Lumina: Δs = 0 pentru toți' }
    },
    {
      id: 'c2q17', type: 'spot',
      q: `Găsește <strong>primul</strong> pas care conține o greșeală de raționament:`,
      steps: [
        { t: `Un eveniment are patru coordonate: <var>x</var>, <var>y</var>, <var>z</var> și <var>t</var>.` },
        { t: `Dacă rotești axele spațiale, componentele Δ<var>x</var>, Δ<var>y</var>, Δ<var>z</var> se schimbă, dar distanța √(Δ<var>x</var>² + Δ<var>y</var>² + Δ<var>z</var>²) rămâne aceeași.` },
        { t: `Timpul este doar a patra dimensiune, de același fel cu celelalte trei, deci intră în interval tot cu semn plus: (Δ<var>s</var>)² = Δ<var>x</var>² + Δ<var>y</var>² + Δ<var>z</var>² + (<var>c</var>Δ<var>t</var>)².`, bad: true,
          why: `Aici e greșeala: timpul intră cu semn <em>opus</em>. Doar diferența păstrează valoarea 0 pentru lumină în toate S.R.I. (Postulatul I); suma nu. Pașii următori pornesc de la această premisă falsă.` },
        { t: `Această sumă ar fi aceeași pentru orice observator în mișcare uniformă.` },
        { t: `Prin urmare, schimbarea S.R.I. ar fi o rotație obișnuită în 4D, ca aceea de pe hartă.` }
      ],
      explain: `Timpul nu este „încă o lungime”: în interval apare cu <strong>semn opus</strong>.`,
      ref: { id: 'interval', label: 'Intervalul Δs: ce se schimbă și ce nu' }
    },
    {
      id: 'c2q18', type: 'spot',
      q: `Cineva citește coordonatele unui eveniment pe diagrama Minkowski reală (axele <var>x</var> și <var>ct</var>), în care axele lui S′ sunt înclinate. Care este <strong>primul</strong> pas greșit?`,
      steps: [
        { t: `Evenimentul <var>E</var> este un punct al diagramei; coordonatele lui în S, (<var>x</var>, <var>ct</var>), se citesc pe axele lui S.` },
        { t: `Axa <var>ct</var>′ este drumul originii lui S′ văzut din S, deci este înclinată; axa <var>x</var>′ este înclinată simetric față de linia luminii.` },
        { t: `Ca să aflu <var>x</var>′, duc din <var>E</var> o perpendiculară pe axa <var>x</var>′ și citesc unde o taie.`, bad: true,
          why: `Aici e greșeala: axele lui S′ nu sunt perpendiculare în desen. Coordonata <var>x</var>′ se citește ducând din <var>E</var> o paralelă la axa <var>ct</var>′ până la axa <var>x</var>′; perpendiculara ar da o valoare greșită.` },
        { t: `La fel, pentru <var>ct</var>′, duc din <var>E</var> o perpendiculară pe axa <var>ct</var>′.` },
        { t: `Perechea (<var>x</var>′, <var>ct</var>′) diferă de (<var>x</var>, <var>ct</var>), deși <var>E</var> este același punct al diagramei.` }
      ],
      explain: `În S′ citești cu <strong>paralele la axele lui S′</strong>; desenul „euclidian” (perpendiculare) induce în eroare.`,
      ref: { id: 'minkowski', label: 'Diagrama Minkowski' }
    }
  ]
});
