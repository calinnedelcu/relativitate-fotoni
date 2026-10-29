/* Capitolul 5 — Contracția lungimilor: rezumat, glosar, bancă de întrebări */
RF.register({
  id: 5,

  summary: [
    { q: `Cum se măsoară lungimea unui corp care se mișcă?`,
      a: `Se determină pozițiile celor două capete <strong>în același moment</strong> al observatorului (<var>t</var><sub>A</sub> = <var>t</var><sub>B</sub>) și se măsoară distanța dintre semne. Dacă momentele sunt diferite, corpul se mută între cele două citiri și rezultatul nu mai este lungimea lui.` },
    { q: `Ce este lungimea proprie? Dar lungimea măsurată?`,
      a: `<strong>Lungimea proprie</strong> <var>L</var>′ este lungimea barei în sistemul în care ea stă pe loc (S′) — cea mai mare lungime posibilă. <strong>Lungimea măsurată</strong> <var>L</var> este cea determinată în S, unde bara se mișcă cu viteza <var>v</var>, prin marcare simultană a capetelor.` },
    { q: `Enunță contracția lungimilor.`,
      a: `Bara AB, în repaus în S′, are lungimea <var>L</var>′ = <var>x</var>′<sub>A</sub> − <var>x</var>′<sub>B</sub>. În S, lungimea ei <var>L</var> = <var>x</var><sub>A</sub> − <var>x</var><sub>B</sub> se măsoară cu <var>t</var><sub>A</sub> = <var>t</var><sub>B</sub>. Rezultă <strong><var>L</var>′ = γ·<var>L</var></strong> și, cum γ &gt; 1 pentru orice <var>v</var>, <strong><var>L</var> &lt; <var>L</var>′</strong>: un corp în mișcare este mai scurt (pe direcția mișcării) decât în repaus.` },
    { q: `De ce apare contracția? Explică fără formule.`,
      a: `Pentru că „în același moment” depinde de observator. Marcajele puse simultan în S nu sunt simultane în S′: în sistemul barei, primul semn se pune la capătul din față, al doilea mai târziu, la cel din spate, iar între ele solul alunecă înapoi. Semnele ies deci mai apropiate decât capetele barei.` },
    { q: `Pe ce direcție apare contracția și pe care nu?`,
      a: `Doar <strong>în lungul mișcării</strong>. Pe direcțiile perpendiculare nimic nu se schimbă (<var>y</var> = <var>y</var>′, <var>z</var> = <var>z</var>′): înălțimea și grosimea sunt aceleași în ambele sisteme.` },
    { q: `Este contracția reală? Cine vede bara mai scurtă?`,
      a: `Efectul este <strong>reciproc</strong>: fiecare observator o măsoară mai scurtă pe bara celuilalt, iar bara din propriul sistem o găsește neschimbată. Nu e o strivire produsă de forțe și nu e o iluzie optică, ci rezultatul măsurării cu momente „simultane” diferite în cele două sisteme.` },
    { q: `Când este contracția neglijabilă?`,
      a: `Când <var>v</var> ≪ <var>c</var>: γ → 1, deci <var>L</var> ≈ <var>L</var>′ și lungimile par aceleași pentru toți, ca în fizica clasică. Efectul devine mare doar la viteze comparabile cu <var>c</var>.` }
  ],

  glossary: [
    { term: `lungime proprie`, def: `Lungimea unui corp măsurată în sistemul în care el stă pe loc (în curs: <var>L</var>′, pentru bara din S′). Este cea mai mare dintre lungimile măsurate de observatori diferiți.` },
    { term: `lungime măsurată`, def: `Lungimea unui corp care se mișcă față de observator: distanța dintre pozițiile capetelor, determinate în același moment al observatorului (<var>t</var><sub>A</sub> = <var>t</var><sub>B</sub>). În curs: <var>L</var>, măsurată în S.` },
    { term: `marcare simultană`, def: `Procedura de măsurare a unui corp în mișcare: pozițiile ambelor capete se notează în același moment al ceasurilor observatorului, apoi se măsoară distanța dintre semne.` },
    { term: `contracția lungimilor`, def: `Un corp în mișcare are, pe direcția mișcării, o lungime măsurată mai mică decât lungimea proprie: <var>L</var>′ = γ·<var>L</var>, deci <var>L</var> &lt; <var>L</var>′.` },
    { term: `reciprocitate`, def: `Efectul este același pentru ambii observatori: fiecare măsoară mai scurtă bara celuilalt. Niciun S.R.I. nu este privilegiat.` },
    { term: `factor Lorentz`, def: `γ = 1/√(1 − <var>v</var>²/<var>c</var>²) = 1/√(1 − β²), cu β = <var>v</var>/<var>c</var>. Are mereu γ ≥ 1, iar γ ≈ 1 când <var>v</var> ≪ <var>c</var>.` },
    { term: `dimensiune transversală`, def: `Dimensiunea unui corp pe o direcție perpendiculară pe mișcare (înălțime, grosime). Nu se schimbă: <var>y</var> = <var>y</var>′, <var>z</var> = <var>z</var>′.` }
  ],

  quiz: [
    {
      id: 'c5q1', type: 'single',
      scenario: `Echipajul unei nave își măsoară nava în timp ce ea stă pe loc față de el: 100 m. Apoi nava trece în viteză pe lângă o stație, iar stația îi determină lungimea prin marcare simultană (în sistemul stației) a celor două capete.`,
      q: `Ce relație există între cele două valori, și care dintre ele este lungimea proprie?`,
      options: [
        { t: `Stația obține o valoare mai mică; lungimea proprie este cea a echipajului (100 m), care este și cea mai mare dintre valorile posibile.`, ok: true,
          why: `Lungimea proprie este cea din sistemul în care corpul stă pe loc. Orice alt sistem, în care corpul se mișcă, o găsește mai mică (<var>L</var> = <var>L</var>′/γ), deci valoarea proprie este maximul.` },
        { t: `Stația obține o valoare mai mică; lungimea proprie este cea a stației, fiindcă ea aplică procedura corectă, cu marcare simultană a capetelor.`, ok: false,
          why: `Marcarea simultană e necesară pentru un corp în mișcare, dar nu o face „proprie”. „Proprie” înseamnă „în sistemul propriu al corpului”, adică acolo unde el stă în repaus.` },
        { t: `Stația obține o valoare mai mare, pentru că viteza „întinde” corpul în sensul mișcării; lungimea proprie este cea mai mică dintre valori.`, ok: false,
          why: `Sensul este invers: <var>L</var>′ = γ·<var>L</var> cu γ &gt; 1, deci în mișcare lungimea măsurată este mai mică. Corpurile nu se „întind”.` },
        { t: `Cele două valori sunt egale: lungimea este o proprietate a navei și nu depinde de sistemul din care o măsori, ci doar de precizia măsurării.`, ok: false,
          why: `Lungimea unui corp depinde de mișcarea lui față de observator. Diferența nu ține de precizie: chiar cu aparate perfecte, stația obține altă valoare decât echipajul.` }
      ],
      explain: `Lungimea proprie este lungimea din sistemul în care corpul stă pe loc și este maximul tuturor lungimilor măsurate.`,
      ref: { id: 'bara', label: 'Lungime proprie și lungime măsurată' }
    },
    {
      id: 'c5q2', type: 'single',
      scenario: `O bară zboară cu 0,8 <var>c</var> pe lângă o stație. Un tehnician marchează pe sol poziția capătului din față. O clipă mai târziu, un alt tehnician marchează poziția capătului din spate. Apoi se măsoară distanța dintre cele două semne.`,
      q: `Ce poți spune despre numărul obținut?`,
      options: [
        { t: `Depinde de cât a durat clipa dintre marcaje: cu altă întârziere ar fi ieșit alt număr, deci nu este lungimea barei în sistemul stației.`, ok: true,
          why: `Între cele două marcaje bara se deplasează, iar deplasarea se adună (sau se scade) din distanța dintre semne. Lungimea în S există doar dacă ambele capete sunt localizate în același moment al lui S.` },
        { t: `Este lungimea barei în sistemul stației, pentru că fiecare capăt a fost marcat exact acolo unde se afla în momentul marcării lui.`, ok: false,
          why: `Fiecare semn e corect pus pentru capătul lui, dar cele două capete nu au fost localizate în același moment. Distanța dintre semne amestecă lungimea barei cu drumul parcurs de ea între marcaje.` },
        { t: `Este lungimea măsurată corect, doar că „deja contractată”: contracția explică de ce iese mai mic decât în repaus, indiferent de întârziere.`, ok: false,
          why: `Contracția apare numai cu marcare simultană. O întârziere adaugă sau scade un efect cu totul diferit — deplasarea barei —, care poate da chiar un număr mai mare decât lungimea proprie.` },
        { t: `Este lungimea măsurată corect: la o bară care zboară uniform, momentele marcajelor nu contează, fiindcă viteza ei este constantă.`, ok: false,
          why: `Tocmai pentru că bara se mișcă (fie și uniform), contează cât timp trece între marcaje: în acel interval ea parcurge un drum proporțional cu întârzierea.` }
      ],
      explain: `Lungimea unui corp în mișcare cere ambele capete localizate în același moment; altfel rezultatul depinde de întârziere.`,
      ref: { id: 'masurare', label: 'Cum măsori o bară care zboară' }
    },
    {
      id: 'c5q3', type: 'single',
      scenario: `Ana (în sistemul S) și Bogdan (în sistemul S′) se depărtează unul de altul cu 0,6 <var>c</var>, uniform. Fiecare ține în mână o bară care, în repaus față de el, are exact 1 m.`,
      q: `Fiecare măsoară corect, prin marcare simultană în sistemul propriu, bara celuilalt. Ce găsesc?`,
      options: [
        { t: `Ana găsește bara lui Bogdan mai scurtă de 1 m, iar Bogdan găsește bara Anei mai scurtă de 1 m.`, ok: true,
          why: `Situația este simetrică: niciun S.R.I. nu e privilegiat, deci amândoi obțin același tip de rezultat. Nu e contradicție — fiecare compară cu „același moment” al sistemului său.` },
        { t: `Ana găsește bara lui Bogdan mai scurtă, iar Bogdan găsește bara Anei mai lungă de 1 m, astfel încât efectele se compensează.`, ok: false,
          why: `Ar însemna că unul dintre ei este privilegiat. Conform Postulatului al II-lea, cei doi sunt echivalenți: rezultatul este același pentru amândoi (bara celuilalt, mai scurtă).` },
        { t: `Ana găsește bara lui Bogdan mai scurtă, dar Bogdan găsește bara Anei neschimbată, de 1 m, pentru că Ana este cea care „stă pe loc”.`, ok: false,
          why: `Nu există „stat pe loc” absolut. Bogdan poate spune, cu același drept, că el stă pe loc și Ana se mișcă.` },
        { t: `Amândoi găsesc 1 m: barele sunt identice, deci nu pot arăta diferit pentru nimeni, indiferent cum se mișcă una față de alta.`, ok: false,
          why: `Barele sunt identice ca lungimi proprii (în repaus). Identitatea în repaus nu garantează aceeași lungime măsurată de un observator față de care bara se mișcă.` }
      ],
      explain: `Contracția este reciprocă: fiecare observator măsoară mai scurtă bara celuilalt.`,
      ref: { id: 'reciproc', label: 'Reciprocitatea' }
    },
    {
      id: 'c5q4', type: 'single',
      scenario: `O placă pătrată, cu laturile de 1 m în repaus, zboară cu 0,9 <var>c</var> pe lângă o stație, cu două laturi paralele cu direcția mișcării. Stația marchează simultan colțurile plăcii.`,
      q: `Ce formă și ce dimensiuni găsește stația?`,
      options: [
        { t: `Un dreptunghi: laturile paralele cu mișcarea sunt mai scurte de 1 m, iar cele perpendiculare pe mișcare rămân de 1 m.`, ok: true,
          why: `Contracția apare numai în lungul mișcării. Pe perpendiculară coordonatele sunt aceleași în ambele sisteme (<var>y</var> = <var>y</var>′).` },
        { t: `Un pătrat mai mic: toate laturile se micșorează cu același factor, deoarece efectul depinde doar de viteza plăcii, nu și de direcție.`, ok: false,
          why: `Efectul depinde de direcție: doar dimensiunea de-a lungul mișcării se scurtează. Dimensiunile transversale nu sunt afectate.` },
        { t: `Un dreptunghi mai înalt: latura perpendiculară crește, ca să compenseze scurtarea, iar suprafața plăcii să rămână de 1 m².`, ok: false,
          why: `Nu există nicio compensare: transversal nu se schimbă nimic, iar aria măsurată de stație scade odată cu latura scurtată.` },
        { t: `Tot un pătrat de 1 m: contracția apare doar la corpuri înguste, ca o bară, nu la corpuri plane sau voluminoase.`, ok: false,
          why: `Contracția nu depinde de forma corpului. Orice corp, plat sau voluminos, își scurtează dimensiunea paralelă cu mișcarea.` }
      ],
      explain: `Doar dimensiunea paralelă cu mișcarea se scurtează; cele perpendiculare rămân neschimbate.`,
      ref: { id: 'directie', label: 'Doar în lungul mișcării' }
    },
    {
      id: 'c5q5', type: 'single',
      scenario: `Un inginer se află pe o bară lungă, care trece cu viteză foarte mare pe lângă o stație. Stația o găsește, prin marcare simultană, mult mai scurtă decât cei 100 m pe care îi are în repaus. Inginerul inspectează toată bara cu aparatura lui, aflată pe bară.`,
      q: `Ce găsește inginerul?`,
      options: [
        { t: `Nimic neobișnuit: bara are 100 m, materialul e relaxat, fără tensiuni, și nicio măsurătoare făcută pe bară nu-i arată cât de repede zboară.`, ok: true,
          why: `În sistemul propriu bara e în repaus: lungimea ei proprie e de 100 m, nedeformată. Scurtarea este o relație între bară și un observator față de care ea se mișcă.` },
        { t: `Urme de compresie: legăturile dintre atomi sunt apropiate în sensul mișcării, deoarece bara este strânsă de viteza foarte mare cu care zboară.`, ok: false,
          why: `Nu există nicio forță care să comprime bara. Contracția nu este o deformare a materialului, ci rezultatul unei măsurători făcute dintr-un alt sistem.` },
        { t: `O bară de lungime aproape egală cu cea găsită de stație, fiindcă și rigla lui se scurtează în aceeași măsură și compensează efectul.`, ok: false,
          why: `Rigla inginerului stă pe loc față de bară, deci în sistemul lui nu e scurtată. El măsoară 100 m, nu valoarea stației.` },
        { t: `Aceeași bară scurtată, de câteva zeci de metri: contracția este o proprietate a barei și o constată oricine o măsoară, chiar și el.`, ok: false,
          why: `Pentru inginer bara este în repaus, deci își are lungimea proprie. Doar un observator față de care ea se mișcă obține o valoare mai mică.` }
      ],
      explain: `Contracția nu schimbă bara; în sistemul ei propriu lungimea este cea proprie, neschimbată.`,
      ref: { id: 'directie', label: 'Doar în lungul mișcării' }
    },
    {
      id: 'c5q6', type: 'single',
      scenario: `În sistemul stației (S), două flash-uri marchează în același moment capetele unei bare care zboară spre dreapta cu 0,8 <var>c</var>. Cineva aflat pe bară (în S′) analizează aceleași două evenimente.`,
      q: `Ce constată el despre momentele celor două marcaje?`,
      options: [
        { t: `Nu sunt simultane: marcajul de la capătul din față (spre care „zboară” bara față de stație) are loc primul.`, ok: true,
          why: `Ca în trenul lui Einstein: sistemul care se mișcă spre un capăt consideră că evenimentul de la acel capăt s-a produs primul. Simultaneitatea a două evenimente depărtate depinde de observator.` },
        { t: `Sunt simultane și pentru el, fiindcă sunt aceleași evenimente, iar un eveniment nu poate avea momente diferite pentru observatori diferiți.`, ok: false,
          why: `Evenimentele sunt aceleași, dar coordonatele lor de timp nu: pentru evenimente depărtate în lungul mișcării, „în același moment” nu are sens absolut.` },
        { t: `Nu sunt simultane: marcajul de la capătul din spate are loc primul, deoarece bara se îndepărtează de el în timpul măsurării.`, ok: false,
          why: `Sensul este invers: primul este marcajul din față. Iar motivul nu e „îndepărtarea”: chiar fără nicio întârziere de semnal, momentele atribuite diferă.` },
        { t: `Sunt simultane, dar el le vede la momente diferite, pentru că lumina de la ele ajunge la el cu întârzieri diferite.`, ok: false,
          why: `Nu e o chestiune de întârziere a semnalului: și după ce ține cont de timpii de propagare, el atribuie celor două evenimente momente diferite.` }
      ],
      explain: `Evenimente simultane în S, separate în lungul mișcării, nu sunt simultane în S′: cel din față are loc primul.`,
      ref: { id: 'poveste', label: 'De ce iese mai scurtă (pe pași)' }
    },
    {
      id: 'c5q7', type: 'single',
      q: `De ce depinde cât de mult se scurtează o bară văzută în mișcare (raportul dintre lungimea măsurată și cea proprie)?`,
      options: [
        { t: `Numai de raportul <var>v</var>/<var>c</var>: o bară de oțel și un fir de ață se scurtează în același raport, dacă au aceeași viteză.`, ok: true,
          why: `Factorul γ depinde doar de <var>v</var>/<var>c</var>. Nici materialul, nici lungimea proprie nu intervin: e o proprietate a spațiului și timpului, nu a corpului.` },
        { t: `De materialul barei: corpurile mai rigide, în care legăturile dintre atomi sunt mai puternice, se scurtează mai puțin decât cele moi.`, ok: false,
          why: `Contracția nu este o deformare mecanică, deci rigiditatea nu contează. Un material oricât de rigid sau de moale se scurtează în același raport la aceeași viteză.` },
        { t: `De lungimea proprie: barele foarte lungi se scurtează în proporție mai mare, iar cele de câțiva centimetri aproape deloc.`, ok: false,
          why: `Raportul <var>L</var>/<var>L</var>′ nu depinde de cât de lungă e bara. Un obiect de 1 cm și unul de 1 km, la aceeași viteză, se scurtează în același raport.` },
        { t: `De cât timp a fost bara în mișcare: cu cât zboară de mai multă vreme, cu atât se scurtează mai mult față de lungimea ei de început.`, ok: false,
          why: `Durata mișcării nu intervine. Lungimea măsurată se stabilește, în fiecare moment, doar de viteza relativă dintre bară și observator.` }
      ],
      explain: `Raportul dintre lungimea măsurată și cea proprie depinde exclusiv de viteza relativă (prin γ).`,
      ref: { id: 'cat-de-mult', label: 'Cât de mult se scurtează' }
    },
    {
      id: 'c5q8', type: 'single',
      scenario: `Un hambar are 10 m în repaus, cu câte o ușă la fiecare capăt. O scară are 12 m în repaus și se apropie de hambar cu o viteză la care, văzută din hambar, are doar 8 m. Cei din hambar închid scurt ambele uși în același moment, când scara este toată înăuntru.`,
      q: `Cum descrie aceeași situație un observator aflat pe scară?`,
      options: [
        { t: `Scara nu încape: hambarul îi apare mai scurt decât ea, iar cele două uși nu se închid în același moment — ușa spre care se îndreaptă scara se închide prima.`, ok: true,
          why: `Pentru cel de pe scară hambarul este scurtat (mai mic de 10 m), deci scara de 12 m nu încape. „Ambele uși închise în același moment” e adevărat doar în sistemul hambarului; în sistemul scării, ușa din fața ei se închide înaintea celeilalte.` },
        { t: `Scara încape și pentru el: faptul că ea încape în hambar nu depinde de observator, ci doar de lungimile din repaus ale celor două obiecte.`, ok: false,
          why: `„Încape” înseamnă „ambele uși închise în același moment, cu scara înăuntru”, iar „în același moment” depinde de observator. Fiecare sistem are o descriere coerentă, dar ele diferă în privința ordinii închiderilor.` },
        { t: `Scara nu încape, dar ușile se închid tot simultan; contradicția cu descrierea din hambar arată că scurtarea scării este doar o aparență.`, ok: false,
          why: `Tocmai simultaneitatea închiderilor se schimbă între cele două sisteme. Nu e nicio contradicție, ci relativitatea lui „în același moment”.` },
        { t: `Scara încape cu rezervă, pentru că și în sistemul ei lungimea de 12 m se micșorează la 8 m, cât o văd cei din hambar.`, ok: false,
          why: `În sistemul propriu scara are 12 m, nu 8 m. Cei 8 m sunt lungimea ei măsurată din hambar, nu o schimbare a scării.` }
      ],
      explain: `Faptul că scara „încape” depinde de simultaneitatea închiderii ușilor, deci de observator; fiecare descriere este însă coerentă.`,
      ref: { id: 'scara', label: 'Scara și hambarul' }
    },
    {
      id: 'c5q9', type: 'single',
      q: `Doi observatori își măresc treptat viteza relativă, rămânând sub <var>c</var>. Fiecare măsoară, prin marcare simultană, bara celuilalt, identică cu a lui în repaus. Cum se schimbă valorile măsurate?`,
      options: [
        { t: `Scad pentru amândoi, tot mai mult, tinzând spre zero când viteza relativă se apropie de <var>c</var>, fără să atingă zero la nicio viteză posibilă.`, ok: true,
          why: `<var>L</var> = <var>L</var>′/γ, iar γ crește fără limită când <var>v</var> → <var>c</var>. Cum <var>v</var> &lt; <var>c</var> mereu, γ rămâne finit și lungimea măsurată nu devine zero.` },
        { t: `Scad pentru cel care accelerează, în timp ce pentru celălalt rămân constante, deoarece numai mișcarea „proprie”, cea resimțită prin accelerare, produce scurtarea.`, ok: false,
          why: `Efectul depinde doar de viteza relativă și este simetric. Cel care accelerează schimbă sistemul, dar celălalt își măsoară bara la fel de scurtată.` },
        { t: `Scad până la jumătate din valoarea proprie și apoi se stabilizează, pentru că un corp nu se poate scurta mai mult decât atât fără să se strivească.`, ok: false,
          why: `Nu există o valoare de saturație: pe măsură ce γ crește, raportul scade continuu către zero (fără să-l atingă).` },
        { t: `Cresc pentru amândoi, deoarece energia suplimentară pe care o capătă corpul în mișcare îl întinde pe direcția vitezei, ca pe un elastic.`, ok: false,
          why: `Sensul este invers: lungimea măsurată scade. Corpurile nu se întind, iar energia nu intervine în această relație.` }
      ],
      explain: `Lungimea măsurată scade monoton cu viteza relativă și tinde spre zero când v → c; efectul este simetric.`,
      ref: { id: 'reciproc', label: 'Reciprocitatea' }
    },
    {
      id: 'c5q10', type: 'single',
      scenario: `Pe sol (S) este întinsă o riglă lungă, cu gradații la câte 1 m una de alta, măsurate de cei din S. O bară zboară deasupra ei, cu viteză mare. Cei de pe bară (S′) privesc gradațiile solului cum trec pe sub ei.`,
      q: `Cum li se par distanțele dintre gradații?`,
      options: [
        { t: `Mai mici de 1 m: rigla solului, aflată în mișcare față de ei, este scurtată în lungul mișcării, la fel ca orice alt corp.`, ok: true,
          why: `Contracția este reciprocă. Pentru cei din S′, solul și rigla lui sunt corpuri în mișcare, deci lungimile lor măsurate sunt mai mici decât cele proprii.` },
        { t: `Exact 1 m: gradațiile sunt trasate pe un obiect material, iar distanța dintre ele nu poate depinde de observatorul care o măsoară.`, ok: false,
          why: `Distanța e 1 m în sistemul în care rigla stă pe loc (S). Pentru cine o vede în mișcare, distanța dintre gradații este o lungime măsurată, deci mai mică.` },
        { t: `Mai mari de 1 m: solul se mișcă în sens opus barei, așa că efectul se inversează față de cel văzut din stație.`, ok: false,
          why: `Sensul mișcării nu inversează efectul. Contracția depinde doar de mărimea vitezei relative, nu de sensul ei.` },
        { t: `Mai mici de 1 m, dar numai în dreptul barei; restul riglei, aflat mai departe, rămâne cu gradațiile la câte 1 m.`, ok: false,
          why: `Întreaga riglă se mișcă la fel față de S′, deci toate gradațiile ei sunt apropiate în același raport, oriunde s-ar afla.` }
      ],
      explain: `Reciprocitate: și solul, văzut din bară, este scurtat în lungul mișcării.`,
      ref: { id: 'reciproc', label: 'Reciprocitatea' }
    },
    {
      id: 'c5q11', type: 'multi',
      q: `Stația vrea lungimea, în sistemul ei, a unei bare care zboară pe lângă ea. Alege toate procedurile care o dau:`,
      options: [
        { t: `Se notează pe sol pozițiile celor două capete în același moment al ceasurilor stației, apoi se măsoară distanța dintre semne.`, ok: true,
          why: `Este definiția lungimii unui corp în mișcare: <var>t</var><sub>A</sub> = <var>t</var><sub>B</sub> în sistemul observatorului.` },
        { t: `Mai mulți observatori de pe sol, cu ceasuri sincronizate între ele, notează fiecare unde se află un capăt al barei la același moment convenit, apoi își compară pozițiile.`, ok: true,
          why: `Este aceeași procedură, distribuită: ceasuri sincronizate în S, pozițiile ambelor capete luate la același moment al lui S.` },
        { t: `Se notează poziția capătului din față și, după o secundă, poziția celui din spate, apoi se măsoară distanța dintre semne.`, ok: false,
          why: `Capetele nu sunt localizate în același moment: între cele două citiri bara se deplasează, iar distanța dintre semne depinde de întârziere.` },
        { t: `Se cere echipajului barei să își măsoare bara cu o riglă proprie; valoarea lui este lungimea ei și în sistemul stației.`, ok: false,
          why: `Echipajul obține lungimea proprie, valabilă în sistemul lui. În sistemul stației, unde bara se mișcă, valoarea este alta (mai mică).` },
        { t: `Se fotografiază bara în trecere și se citește lungimea direct din imagine, fără nicio altă corecție.`, ok: false,
          why: `Lumina de la cele două capete pleacă la momente diferite ca să ajungă deodată în aparat, deci imaginea nu corespunde unor poziții luate în același moment. Lungimea măsurată corect ține cont de timpii de propagare.` }
      ],
      explain: `Lungimea în sistemul stației cere ambele capete localizate în același moment al stației.`,
      ref: { id: 'masurare', label: 'Cum măsori o bară care zboară' }
    },
    {
      id: 'c5q12', type: 'multi',
      q: `O bară are 10 m în repaus și zboară cu 0,8 <var>c</var> pe lângă o stație. Alege toate afirmațiile corecte:`,
      options: [
        { t: `Stația, prin marcare simultană, măsoară pentru bară mai puțin de 10 m.`, ok: true,
          why: `Lungimea măsurată în S este mai mică decât cea proprie: <var>L</var> &lt; <var>L</var>′.` },
        { t: `Pentru cine ține bara în mână, lungimea ei rămâne 10 m, indiferent cât de repede o vede stația zburând.`, ok: true,
          why: `Este lungimea proprie, măsurată în sistemul în care bara stă pe loc; nu depinde de ceilalți observatori.` },
        { t: `Cei de pe bară pot susține, cu același drept ca stația, că rigla și solul stației sunt cele scurtate.`, ok: true,
          why: `Reciprocitate: pentru ei, solul și riglele lui sunt corpuri în mișcare, deci scurtate.` },
        { t: `Bara este mai scurtă în toate dimensiunile ei, nu doar în lungime: înălțimea și grosimea scad în același raport.`, ok: false,
          why: `Contracția apare numai în lungul mișcării; înălțimea și grosimea rămân aceleași.` },
        { t: `Dacă stația ar marca capetele la momente diferite, ar obține tot lungimea contractată, doar cu o mică eroare.`, ok: false,
          why: `Cu momente diferite rezultatul poate fi oricât — mai mic sau chiar mai mare decât lungimea proprie —, în funcție de întârziere. Nu e „aceeași valoare, cu eroare”.` }
      ],
      explain: `Deosebește lungimea proprie (a celui care ține bara), lungimea măsurată (în S), direcția efectului și reciprocitatea.`,
      ref: { id: 'bara', label: 'Lungime proprie și lungime măsurată' }
    },
    {
      id: 'c5q13', type: 'multi',
      q: `Alege toate mărimile care iau valori diferite pentru doi observatori aflați în mișcare relativă uniformă:`,
      options: [
        { t: `Lungimea măsurată (prin marcare simultană) a unei bare care se mișcă față de unul dintre ei.`, ok: true,
          why: `Depinde de mișcarea barei față de observator: unul o găsește în repaus (lungime proprie), celălalt în mișcare (mai scurtă).` },
        { t: `Distanța dintre două semne fixe de pe sol: cei care văd solul în mișcare o găsesc mai mică decât cei de pe sol.`, ok: true,
          why: `Rigla solului este un corp ca oricare altul: în sistemul în care se mișcă, lungimile ei sunt scurtate.` },
        { t: `Ordinea în timp a două evenimente depărtate în lungul mișcării, dacă într-un sistem ele sunt simultane (de pildă cele două marcaje).`, ok: true,
          why: `Simultaneitatea evenimentelor depărtate nu e absolută: ce e simultan într-un sistem nu mai e în celălalt.` },
        { t: `Viteza luminii în vid.`, ok: false,
          why: `Postulatul I: aceeași valoare, <var>c</var>, în orice S.R.I.` },
        { t: `Înălțimea barei, măsurată perpendicular pe direcția mișcării.`, ok: false,
          why: `Dimensiunile transversale nu se schimbă: <var>y</var> = <var>y</var>′, <var>z</var> = <var>z</var>′.` }
      ],
      explain: `Lungimile în lungul mișcării și simultaneitatea depind de observator; viteza luminii și dimensiunile transversale nu.`,
      ref: { id: 'mituri', label: 'Mituri vs. realitate' }
    },
    {
      id: 'c5q14', type: 'multi',
      q: `Alege toate afirmațiile corecte despre natura contracției lungimilor:`,
      options: [
        { t: `Nu este produsă de forțe care ar comprima bara: în sistemul propriu, materialul ei este la fel de relaxat ca în repaus.`, ok: true,
          why: `Cei de pe bară nu observă nicio deformare; scurtarea este o relație între bară și observatorul față de care ea se mișcă.` },
        { t: `Rămâne chiar dacă se ține cont de timpii de propagare ai luminii: nu este o iluzie de perspectivă, ci rezultatul unei măsurători corecte.`, ok: true,
          why: `Lungimea măsurată prin marcare simultană corectează întârzierile de semnal; scurtarea rămâne.` },
        { t: `Se leagă de faptul că momentele „simultane” într-un sistem nu sunt simultane în celălalt.`, ok: true,
          why: `Din punctul de vedere al barei, semnele solului sunt puse la momente diferite; de aici diferența dintre cele două lungimi.` },
        { t: `Apare numai dacă bara accelerează, fiindcă accelerația este cea care o comprimă.`, ok: false,
          why: `Contracția apare și la mișcare uniformă; ea depinde de viteza relativă, nu de accelerație.` },
        { t: `Dispare dacă marcajele se fac cu aparate suficient de rapide, pentru că ea provine din timpul de reacție al aparatelor.`, ok: false,
          why: `Nu e o eroare instrumentală: aparate perfecte, cu ceasuri sincronizate, dau aceeași scurtare.` }
      ],
      explain: `Contracția nu este o deformare și nu este o iluzie optică: este consecința relativității simultaneității în măsurarea lungimii.`,
      ref: { id: 'directie', label: 'Doar în lungul mișcării' }
    },
    {
      id: 'c5q15', type: 'multi',
      q: `În notația cursului (bara AB în repaus în S′), alege toate afirmațiile corecte:`,
      options: [
        { t: `<var>L</var>′ = <var>x</var>′<sub>A</sub> − <var>x</var>′<sub>B</sub> este lungimea barei în sistemul în care ea stă pe loc.`, ok: true,
          why: `Este lungimea proprie.` },
        { t: `<var>L</var> = <var>x</var><sub>A</sub> − <var>x</var><sub>B</sub> reprezintă lungimea barei în S numai dacă <var>t</var><sub>A</sub> = <var>t</var><sub>B</sub>.`, ok: true,
          why: `Pentru un corp în mișcare, poziția capetelor trebuie luată în același moment al lui S.` },
        { t: `Din <var>L</var>′ = γ·<var>L</var> și γ &gt; 1 rezultă <var>L</var> &lt; <var>L</var>′ pentru orice viteză diferită de zero.`, ok: true,
          why: `γ &gt; 1 pentru orice <var>v</var> ≠ 0, deci lungimea măsurată în S este mai mică decât cea proprie.` },
        { t: `Din <var>L</var>′ = γ·<var>L</var> rezultă că <var>L</var>′ este cea mai mică dintre lungimile pe care le poate avea bara.`, ok: false,
          why: `Invers: <var>L</var> = <var>L</var>′/γ ≤ <var>L</var>′. Lungimea proprie este cea mai mare.` },
        { t: `<var>x</var><sub>A</sub> − <var>x</var><sub>B</sub> este lungimea barei în S oricare ar fi momentele la care s-au notat pozițiile capetelor.`, ok: false,
          why: `Fără <var>t</var><sub>A</sub> = <var>t</var><sub>B</sub>, diferența amestecă lungimea cu deplasarea barei între cele două momente.` }
      ],
      explain: `L′ este lungimea proprie (S′), L se măsoară în S cu t_A = t_B, iar L′ = γ·L înseamnă L &lt; L′.`,
      ref: { id: 'bara', label: 'Lungime proprie și lungime măsurată' }
    },
    {
      id: 'c5q16', type: 'spot',
      q: `Raționamentul de mai jos duce la o concluzie falsă. Care este <strong>primul</strong> pas greșit?`,
      steps: [
        { t: `Ana (în S) și Bogdan (în S′) au bare identice, de 1 m în repaus, și se depărtează uniform unul de altul.` },
        { t: `Ana, marcând simultan (în sistemul ei) capetele barei lui Bogdan, o găsește mai scurtă de 1 m.` },
        { t: `La fel, Bogdan, marcând simultan (în sistemul lui) capetele barei Anei, o găsește pe aceasta mai scurtă de 1 m.` },
        { t: `Dar două bare nu pot fi fiecare mai scurtă decât cealaltă, deci cel puțin una dintre cele două măsurători trebuie să fie greșită.`, bad: true,
          why: `Aici e greșeala. Cele două „mai scurtă” sunt rezultate ale unor măsurători făcute în sisteme diferite, cu „același moment” diferit — nu o comparație a celor două bare în același sistem. Lungimea măsurată nu e o proprietate absolută a barei, deci rezultatele nu se contrazic.` },
        { t: `Prin urmare, contracția lungimilor este o contradicție internă a teoriei.` }
      ],
      explain: `„Mai scurtă” înseamnă „măsurată în sistemul meu”: două afirmații despre sisteme diferite nu se contrazic.`,
      ref: { id: 'reciproc', label: 'Reciprocitatea' }
    },
    {
      id: 'c5q17', type: 'spot',
      q: `Cineva încearcă să obțină relația dintre lungimi pentru bara AB (în repaus în S′), fără să impună nicio condiție asupra momentelor la care își notează pozițiile. Care este <strong>primul</strong> pas greșit?`,
      steps: [
        { t: `Bara AB stă în repaus în S′ și are acolo lungimea <var>L</var>′ = <var>x</var>′<sub>A</sub> − <var>x</var>′<sub>B</sub>.` },
        { t: `În S se notează pozițiile capetelor: <var>x</var><sub>A</sub> la momentul <var>t</var><sub>A</sub> și <var>x</var><sub>B</sub> la momentul <var>t</var><sub>B</sub>.` },
        { t: `Din transformările Lorentz, <var>x</var>′ = γ(<var>x</var> − <var>vt</var>), deci diferența pozițiilor din S′ este γ ori diferența dintre (<var>x</var><sub>A</sub> − <var>vt</var><sub>A</sub>) și (<var>x</var><sub>B</sub> − <var>vt</var><sub>B</sub>).` },
        { t: `Termenii cu timpul se anulează între ei, deci <var>x</var>′<sub>A</sub> − <var>x</var>′<sub>B</sub> = γ(<var>x</var><sub>A</sub> − <var>x</var><sub>B</sub>) și <var>L</var>′ = γ·<var>L</var>.`, bad: true,
          why: `Termenii <var>vt</var><sub>A</sub> și <var>vt</var><sub>B</sub> se anulează doar dacă <var>t</var><sub>A</sub> = <var>t</var><sub>B</sub>. Altfel rămâne un termen cu <var>v</var>(<var>t</var><sub>A</sub> − <var>t</var><sub>B</sub>), iar <var>x</var><sub>A</sub> − <var>x</var><sub>B</sub> nu mai este lungimea barei în S, ci lungimea amestecată cu drumul parcurs între cele două momente.` },
        { t: `Prin urmare, <var>L</var>′ = γ·<var>L</var> este valabilă oricum ar fi marcate capetele în S.` }
      ],
      explain: `Condiția t_A = t_B este chiar ceea ce face ca termenii cu timpul să se anuleze și ca x_A − x_B să fie o lungime.`,
      ref: { id: 'bara', label: 'Lungime proprie și lungime măsurată' }
    },
    {
      id: 'c5q18', type: 'spot',
      q: `Care este <strong>primul</strong> pas greșit din raționamentul următor?`,
      steps: [
        { t: `O bară are 10 m în repaus și trece cu 0,8 <var>c</var> pe lângă o stație.` },
        { t: `Stația marchează simultan capetele (în sistemul ei) și găsește, între semne, 6 m.` },
        { t: `Deci, în sistemul stației, bara are într-adevăr 6 m; nu este o eroare de măsurare.` },
        { t: `Prin urmare, bara s-a micșorat fizic de la 10 m la 6 m, iar cei de pe bară trebuie să o simtă și ei strivită.`, bad: true,
          why: `Cei 6 m sunt o lungime măsurată în S, nu o modificare a barei. Pentru cei de pe bară ea are mai departe 10 m și e nedeformată: măsurătorile sunt corecte, dar răspund la întrebări diferite (cu „același moment” diferit).` },
        { t: `Atunci între atomii ei ar trebui să apară forțe de compresie, care să explice scurtarea.` }
      ],
      explain: `Scurtarea măsurată este o relație între bară și observator, nu o deformare a barei.`,
      ref: { id: 'directie', label: 'Doar în lungul mișcării' }
    }
  ]
});
