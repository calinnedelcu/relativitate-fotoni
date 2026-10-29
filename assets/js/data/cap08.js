/* Capitolul 8 — Dinamica relativistă: rezumat, glosar, bancă de întrebări */
RF.register({
  id: 8,

  summary: [
    { q: `Cum se scrie impulsul unui punct material în mecanica clasică și în TRR?`,
      a: `În m.c.: <var>p</var> = <var>m</var>·<var>v</var>. În TRR: <strong><var>p</var> = γ·<var>m</var><sub>0</sub>·<var>v</var></strong>, cu <var>m</var><sub>0</sub> masa de repaus și γ = 1/√(1 − <var>v</var>²/<var>c</var>²) ≥ 1. Când <var>v</var> → <var>c</var>, γ → ∞, deci <var>p</var> → ∞, deși viteza rămâne sub <var>c</var>.` },
    { q: `Ce sunt masa de repaus și masa de mișcare? Care dintre ele depinde de viteză?`,
      a: `<var>m</var><sub>0</sub> = <strong>masa de repaus</strong>: o proprietate a corpului, aceeași pentru toți observatorii. <var>m</var> = γ<var>m</var><sub>0</sub> = <var>m</var><sub>0</sub>/√(1 − <var>v</var>²/<var>c</var>²) = <var>m</var>(<var>v</var>) este <strong>masa de mișcare</strong>: <strong>crește când <var>v</var> crește</strong> și depinde de viteza corpului față de observator. Nu înseamnă „mai multă materie", ci mai multă inerție: este factorul din <var>p</var> = <var>m</var><var>v</var>.` },
    { q: `Care este legea fundamentală a dinamicii și mai este ea valabilă în TRR?`,
      a: `<strong><var>F</var> = lim<sub>Δ<var>t</var>→0</sub> Δ<var>p</var>/Δ<var>t</var></strong>: forța este ritmul cu care se schimbă impulsul. Rămâne valabilă și în TRR, dar cu <var>p</var> = γ<var>m</var><sub>0</sub><var>v</var>. În m.c. (masă constantă) ea dă <var>F</var> = <var>m</var><var>a</var>; în TRR nu mai dă atât de simplu.` },
    { q: `De ce, în TRR, accelerația nu mai are în general direcția forței?`,
      a: `Pentru că <var>a</var> = <var>F</var>/<var>m</var> − (<var>F</var>·<var>v</var>)<var>v</var>/(<var>m</var><var>c</var>²), cu <var>m</var> = γ<var>m</var><sub>0</sub>. Componenta forței paralelă cu viteza întâlnește o inerție γ³<var>m</var><sub>0</sub>, cea perpendiculară una de γ<var>m</var><sub>0</sub>: prima produce o accelerație de γ² ori mai mică. <var>a</var> ∥ <var>F</var> doar dacă <var>F</var> ∥ <var>v</var> sau <var>F</var> ⊥ <var>v</var> (sau dacă <var>v</var> ≪ <var>c</var>).` },
    { q: `Cum arată legea a II-a pentru mișcarea rectilinie (<var>F</var> ∥ <var>v</var>)?`,
      a: `Mișcarea rămâne rectilinie și <strong><var>F</var> = γ³<var>m</var><sub>0</sub><var>a</var></strong> (= γ²<var>m</var><var>a</var>). Deci <var>a</var> = <var>F</var>/(γ³<var>m</var><sub>0</sub>): aceeași forță dă o accelerație din ce în ce mai mică, care tinde la zero când <var>v</var> → <var>c</var>.` },
    { q: `De ce un corp cu masă de repaus nenulă nu poate atinge viteza <var>c</var>?`,
      a: `Pentru <var>v</var> = <var>c</var> ar trebui γ = ∞, deci un impuls infinit. Fiecare împingere adaugă doar un impuls finit (<var>F</var> = Δ<var>p</var>/Δ<var>t</var>), iar inerția γ³<var>m</var><sub>0</sub> crește fără limită, deci accelerația → 0. Limita este structurală, nu o chestiune de frecare sau de tehnologie.` },
    { q: `Ce devin formulele pentru <var>v</var> ≪ <var>c</var> și ce înseamnă „ultrarelativist"?`,
      a: `Pentru <var>v</var> ≪ <var>c</var>: γ → 1, <var>m</var> → <var>m</var><sub>0</sub>, <var>p</var> → <var>m</var><sub>0</sub><var>v</var>, <var>F</var> → <var>m</var><sub>0</sub><var>a</var>, iar transformările Lorentz → Galilei: mecanica clasică este cazul-limită al TRR. Dacă <var>v</var> ≈ <var>c</var> (comparabilă cu <var>c</var>), corpul se numește <strong>ultrarelativist</strong>.` },
    { q: `Ce se schimbă și ce nu se schimbă de la un observator la altul, în dinamică?`,
      a: `<strong>Nu se schimbă:</strong> masa de repaus <var>m</var><sub>0</sub>, viteza luminii <var>c</var>, forma legilor (de exemplu <var>F</var> = Δ<var>p</var>/Δ<var>t</var>). <strong>Se schimbă:</strong> viteza corpului, impulsul <var>p</var> și masa de mișcare <var>m</var> — ele depind de viteza corpului față de observator.` }
  ],

  glossary: [
    { term: `impuls`, def: `Mărimea p a unui punct material: în mecanica clasică p = m·v; în TRR p = γ·m₀·v. Forța este ritmul cu care variază impulsul.` },
    { term: `masa de repaus`, def: `m₀: masa corpului când acesta stă în repaus. Este o proprietate a corpului, aceeași pentru toți observatorii.` },
    { term: `masa de mișcare`, def: `m = γ·m₀ = m₀/√(1 − v²/c²): masa corpului care se mișcă cu viteza v față de observator. Crește odată cu v; este factorul din p = m·v.` },
    { term: `punct material`, def: `Corp ale cărui dimensiuni se pot neglija în problema studiată; îl descriem prin masă și poziție (p.m.).` },
    { term: `legea fundamentală a dinamicii`, def: `F = lim Δp/Δt: forța este ritmul cu care variază impulsul. Rămâne valabilă și în TRR.` },
    { term: `mișcare rectilinie`, def: `Mișcare pe o dreaptă. În TRR, dacă F ∥ v, accelerația are aceeași direcție și mișcarea rămâne rectilinie.` },
    { term: `inerție`, def: `Împotrivirea unui corp la schimbarea mișcării sale: cu cât inerția e mai mare, cu atât aceeași forță produce o accelerație mai mică.` },
    { term: `ultrarelativist`, def: `Corp cu viteza v ≈ c (comparabilă cu c): γ este foarte mare, iar impulsul și inerția sunt uriașe.` },
    { term: `TRR`, def: `Teoria relativității restrânse: cele două postulate și consecințele lor (spațiu-timp, transformările Lorentz, dinamica relativistă).` },
    { term: `m.c.`, def: `Mecanica clasică (a lui Newton): cazul-limită al TRR pentru viteze mult mai mici decât c.` }
  ],

  quiz: [
    {
      id: 'c8q1', type: 'single',
      scenario: `Un electron pornește din repaus într-un accelerator liniar și este împins, în sensul mișcării, cu o forță constantă. Urmărești impulsul <var>p</var> și viteza <var>v</var> în timp.`,
      q: `Ce spune TRR despre cele două mărimi?`,
      options: [
        { t: `<var>p</var> crește cu același spor în fiecare secundă; <var>v</var> crește tot mai încet și rămâne sub <var>c</var>.`, ok: true,
          why: `Din <var>F</var> = Δ<var>p</var>/Δ<var>t</var>, cu <var>F</var> constantă, impulsul crește liniar. Dar <var>p</var> = γ<var>m</var><sub>0</sub><var>v</var>, iar γ crește și el, deci viteza nu mai urmează impulsul.` },
        { t: `Și <var>p</var>, și <var>v</var> cresc cu același spor în fiecare secundă, până când <var>v</var> ajunge la <var>c</var>, unde totul se oprește.`, ok: false,
          why: `Este mecanica clasică (<var>v</var> ∝ <var>p</var>) cu o oprire pusă „artificial" la <var>c</var>. În realitate viteza nu crește liniar: ea se aplatizează lin, treptat, fără nicio oprire bruscă.` },
        { t: `Atât impulsul, cât și viteza cresc tot mai încet, apropiindu-se amândouă de câte o valoare-limită.`, ok: false,
          why: `Se aplatizează doar viteza. Impulsul nu are limită: cât timp forța acționează, el crește cu același spor la fiecare secundă (<var>p</var> = <var>F</var>·<var>t</var>).` },
        { t: `Viteza crește uniform, iar impulsul se aplatizează spre o valoare-limită, pentru că masa de mișcare crește.`, ok: false,
          why: `Rolurile sunt inversate. Creșterea masei de mișcare face ca viteza să urce tot mai greu, dar impulsul, definit de <var>F</var> = Δ<var>p</var>/Δ<var>t</var>, continuă să crească liniar.` }
      ],
      explain: `Forța dă impuls, nu viteză: impulsul crește la nesfârșit, iar viteza, legată de impuls prin γ, se apropie de <var>c</var>.`,
      ref: { id: 'forta', label: 'Forța: legea rămâne, viteza se saturează' }
    },
    {
      id: 'c8q2', type: 'single',
      scenario: `Un electron trece prin laboratorul tău cu 0,9 <var>c</var>. Laboratorul îi atribuie masa de mișcare <var>m</var> = γ<var>m</var><sub>0</sub> ≈ 2,3 <var>m</var><sub>0</sub>. O navă zboară alături de electron, cu aceeași viteză și în același sens.`,
      q: `Ce masă de mișcare îi atribuie echipajul navei?`,
      options: [
        { t: `<var>m</var><sub>0</sub>, pentru că față de navă electronul stă pe loc și γ = 1.`, ok: true,
          why: `Masa de mișcare depinde de viteza corpului <em>față de observator</em>. Față de echipaj, electronul are viteza zero, deci γ = 1 și <var>m</var> = <var>m</var><sub>0</sub>.` },
        { t: `Tot ≈ 2,3 <var>m</var><sub>0</sub>, pentru că masa este o proprietate a electronului, nu a observatorului.`, ok: false,
          why: `Proprietatea electronului este masa de repaus <var>m</var><sub>0</sub>. Masa de mișcare este o relație electron–observator: se schimbă odată cu viteza relativă.` },
        { t: `Mai mare de 2,3 <var>m</var><sub>0</sub>, pentru că acum se mișcă amândoi cu 0,9 <var>c</var> față de laborator.`, ok: false,
          why: `Contează doar viteza dintre electron și observatorul care măsoară. Viteza față de laborator nu intră în ce măsoară echipajul navei.` },
        { t: `Nu poate fi definită, deoarece nava se mișcă și deci nu este un sistem inerțial.`, ok: false,
          why: `Nava merge uniform, deci este un S.R.I. — la fel de bun ca laboratorul. Dacă ar accelera, ar fi altă discuție, dar nu aici.` }
      ],
      explain: `<var>m</var><sub>0</sub> este a corpului (aceeași pentru toți); <var>m</var> = γ<var>m</var><sub>0</sub> depinde de viteza lui față de observator.`,
      ref: { id: 'masa', label: 'Masa de repaus și masa de mișcare' }
    },
    {
      id: 'c8q3', type: 'single',
      scenario: `Doi protoni identici se mișcă în același sens: unul cu 0,6 <var>c</var>, altul cu 0,99 <var>c</var>. Fiecare este împins timp de o microsecundă cu aceeași forță, în sensul mișcării lui.`,
      q: `Cum se compară cei doi, după împingere?`,
      options: [
        { t: `Au primit același spor de impuls, dar sporul de viteză al protonului de 0,99 <var>c</var> este mult mai mic.`, ok: true,
          why: `<var>F</var> = Δ<var>p</var>/Δ<var>t</var>: aceeași forță și același timp înseamnă același Δ<var>p</var>. Cât viteză „cumpără" acel impuls depinde de γ: lângă <var>c</var> aproape nimic.` },
        { t: `Au primit același spor de impuls și același spor de viteză, ca în mecanica clasică.`, ok: false,
          why: `Ar fi adevărat doar pentru <var>v</var> ≪ <var>c</var>. La 0,99 <var>c</var>, γ ≈ 7 și inerția în sensul mișcării este γ³<var>m</var><sub>0</sub>, uriașă.` },
        { t: `Protonul de 0,99 <var>c</var> a primit un spor de impuls mai mic, pentru că acolo „forța are mai puțin efect".`, ok: false,
          why: `Legea <var>F</var> = Δ<var>p</var>/Δ<var>t</var> nu își pierde efectul: sporul de impuls depinde numai de forță și de durată. Efectul „mai mic" se vede în viteză, nu în impuls.` },
        { t: `Au același spor de viteză, dar protonul de 0,99 <var>c</var> a primit un spor de impuls mai mare, fiindcă masa lui de mișcare e mai mare.`, ok: false,
          why: `Invers: impulsul adăugat este egal, iar viteza câștigată este diferită. Masa de mișcare mai mare înseamnă mai puțină viteză pentru același impuls.` }
      ],
      explain: `Aceeași împingere adaugă același impuls oricui; cât de mult se vede în viteză depinde de cât de aproape ești de <var>c</var>.`,
      ref: { id: 'gamma3', label: 'Împingerea în sensul mișcării' }
    },
    {
      id: 'c8q4', type: 'single',
      scenario: `Un proton rapid, cu γ ≈ 5, poate fi împins cu o forță de aceeași mărime fie în sensul mișcării lui, fie lateral, perpendicular pe direcția mișcării.`,
      q: `În care caz primește o accelerație mai mare?`,
      options: [
        { t: `Lateral: inerția la împingerea perpendiculară este γ<var>m</var><sub>0</sub>, mai mică decât γ³<var>m</var><sub>0</sub>.`, ok: true,
          why: `Pentru <var>F</var> ⊥ <var>v</var>, <var>F</var>·<var>v</var> = 0 și <var>a</var> = <var>F</var>/<var>m</var> cu <var>m</var> = γ<var>m</var><sub>0</sub>. În sensul mișcării, <var>a</var> = <var>F</var>/(γ³<var>m</var><sub>0</sub>) — de γ² = 25 de ori mai mică.` },
        { t: `În sensul mișcării, deoarece forța se adaugă vitezei pe care o are deja.`, ok: false,
          why: `Nu există un asemenea bonus. Tocmai în sensul mișcării întâlnești inerția cea mai mare, γ³<var>m</var><sub>0</sub>, pentru că γ crește odată cu viteza.` },
        { t: `La fel în ambele cazuri, pentru că masa de mișcare γ<var>m</var><sub>0</sub> este aceeași indiferent de direcția forței.`, ok: false,
          why: `<var>F</var> = <var>m</var><var>a</var> cu <var>m</var> = γ<var>m</var><sub>0</sub> este corectă numai pentru împingerea perpendiculară. Pentru cea longitudinală mai apare încă un factor γ².` },
        { t: `Nu se poate decide fără să știi cât de mare este forța.`, ok: false,
          why: `Mărimea forței nu contează: comparăm accelerațiile produse de aceeași forță. Contează doar direcția ei față de viteză.` }
      ],
      explain: `Inerția relativistă depinde de direcție: γ<var>m</var><sub>0</sub> pentru împingerea laterală, γ³<var>m</var><sub>0</sub> pentru cea în sensul mișcării.`,
      ref: { id: 'acceleratie', label: 'Accelerația nu mai e simplu F/m' }
    },
    {
      id: 'c8q5', type: 'single',
      q: `Un coleg scrie, pentru un electron rapid împins în sensul mișcării: „<var>F</var> = <var>m</var><var>a</var>, cu <var>m</var> = γ<var>m</var><sub>0</sub>, masa de mișcare." Ce este greșit?`,
      options: [
        { t: `Raportul dintre forță și accelerație este aici γ³<var>m</var><sub>0</sub>: masa de mișcare apare în <var>p</var> = <var>m</var><var>v</var>, nu în <var>F</var> = <var>m</var><var>a</var>.`, ok: true,
          why: `Legea corectă pentru mișcarea rectilinie este <var>F</var> = γ³<var>m</var><sub>0</sub><var>a</var> = γ²<var>m</var><var>a</var>. Cu <var>m</var> = γ<var>m</var><sub>0</sub> ai „uitat" factorul γ².` },
        { t: `Nimic: <var>m</var> = γ<var>m</var><sub>0</sub> este masa corpului în mișcare, iar <var>F</var> = <var>m</var><var>a</var> este legea a II-a, valabilă oricând.`, ok: false,
          why: `Este exact capcana. Legea fundamentală este <var>F</var> = Δ<var>p</var>/Δ<var>t</var>; ea se reduce la <var>F</var> = <var>m</var><var>a</var> doar când masa nu se schimbă, iar aici γ se schimbă odată cu viteza.` },
        { t: `Trebuie folosită masa de repaus: <var>F</var> = <var>m</var><sub>0</sub><var>a</var> este corectă la orice viteză.`, ok: false,
          why: `<var>F</var> = <var>m</var><sub>0</sub><var>a</var> este forma clasică, bună pentru <var>v</var> ≪ <var>c</var>. La viteze mari, aceeași forță dă o accelerație mult mai mică decât ar prezice ea.` },
        { t: `Forța nu mai poate fi definită în TRR, deci nu are sens să scrii o lege pentru ea.`, ok: false,
          why: `Forța se definește mai departe prin <var>F</var> = Δ<var>p</var>/Δ<var>t</var>; doar expresia impulsului se schimbă.` }
      ],
      explain: `<var>F</var> = Δ<var>p</var>/Δ<var>t</var> rămâne; <var>F</var> = <var>m</var><var>a</var> nu mai este forma ei în general.`,
      ref: { id: 'gamma3', label: 'Împingerea în sensul mișcării' }
    }
    ,
    {
      id: 'c8q6', type: 'single',
      q: `Un corp cu masă de repaus nenulă este împins mult timp, în vid perfect, fără frecare, cu o forță cât de mare. Care este explicația corectă a faptului că nu atinge viteza <var>c</var>?`,
      options: [
        { t: `Fiecare împingere adaugă un impuls finit, dar pentru <var>v</var> = <var>c</var> impulsul <var>p</var> = γ<var>m</var><sub>0</sub><var>v</var> ar trebui să fie infinit.`, ok: true,
          why: `Lanțul corect: forța dă impuls finit în timp finit; γ → ∞ când <var>v</var> → <var>c</var>; deci impulsul necesar la <var>c</var> nu poate fi atins niciodată.` },
        { t: `Pe măsură ce viteza crește, forța scade treptat și ajunge la zero exact în momentul în care <var>v</var> = <var>c</var>, așa că împingerea se stinge singură.`, ok: false,
          why: `Forța poate fi ținută constantă (sau oricât de mare). Ceea ce scade este <em>accelerația</em>, pentru că inerția γ³<var>m</var><sub>0</sub> crește.` },
        { t: `Masa de repaus <var>m</var><sub>0</sub> crește cu viteza și devine infinită la <var>c</var>, deci corpul nu mai poate fi pus în mișcare.`, ok: false,
          why: `<var>m</var><sub>0</sub> nu se schimbă niciodată. Ce crește este masa de mișcare γ<var>m</var><sub>0</sub> — și ea nu „blochează" corpul, ci cere impuls tot mai mare pentru fiecare spor de viteză.` },
        { t: `Nu există o interdicție de principiu; ajungerea la <var>c</var> cere doar acceleratoare mult mai mari decât cele de azi.`, ok: false,
          why: `Limita este structurală: oricât de mare ar fi acceleratorul, impulsul necesar la <var>c</var> rămâne infinit. Mai multă tehnologie doar apropie corpul de <var>c</var>.` }
      ],
      explain: `Limita nu vine din frecare sau din tehnologie, ci din forma <var>p</var> = γ<var>m</var><sub>0</sub><var>v</var>: la <var>c</var> impulsul ar fi infinit.`,
      ref: { id: 'limita', label: 'Limita lui c și cazurile-limită' }
    },
    {
      id: 'c8q7', type: 'single',
      scenario: `Trei corpuri: o mașină de curse cu 100 m/s; un proton care se mișcă cu 0,5 <var>c</var>; un electron cu 0,999 <var>c</var>.`,
      q: `Pentru care dintre ele formula clasică <var>p</var> = <var>m</var><sub>0</sub><var>v</var> dă o eroare practic neglijabilă?`,
      options: [
        { t: `Numai pentru mașină: acolo γ este practic 1, pe când la 0,5 <var>c</var> diferența e deja vizibilă, iar la 0,999 <var>c</var> uriașă.`, ok: true,
          why: `Mecanica clasică este cazul-limită <var>v</var> ≪ <var>c</var>. 0,5 <var>c</var> este „comparabilă cu <var>c</var>", nu „mult mai mică".` },
        { t: `Pentru mașină și pentru proton: 0,5 <var>c</var> este sub jumătate din viteza luminii, deci încă „mică".`, ok: false,
          why: `La 0,5 <var>c</var>, γ ≈ 1,15: impulsul real e cu peste 15% mai mare decât cel clasic — o diferență clară în orice experiment. „Mică" înseamnă ≪ <var>c</var>, nu doar &lt; <var>c</var>.` },
        { t: `Pentru toate trei: formula clasică este o bună aproximare oricât de aproape de <var>c</var> ne-am afla, atâta timp cât <var>v</var> &lt; <var>c</var>.`, ok: false,
          why: `Nu: apropierea de <var>c</var> este chiar locul unde γ explodează. La 0,999 <var>c</var>, γ ≈ 22 — formula clasică greșește de peste 20 de ori.` },
        { t: `Pentru niciuna: formula clasică este greșită la orice viteză, deci nu mai are rost să o folosim.`, ok: false,
          why: `Formula clasică este greșită „pe hârtie" la orice viteză, dar eroarea ei este sub orice precizie de măsurare pentru <var>v</var> ≪ <var>c</var>; de aceea mecanica clasică rămâne utilă.` }
      ],
      explain: `Mecanica clasică nu e răsturnată, ci e cazul-limită al TRR: γ ≈ 1 doar când <var>v</var> ≪ <var>c</var>.`,
      ref: { id: 'limita', label: 'Limita lui c și cazurile-limită' }
    },
    {
      id: 'c8q8', type: 'single',
      q: `Împingi o particulă din repaus, în linie dreaptă, cu o forță constantă. Care descriere a graficului vitezei în funcție de timp este corectă în TRR?`,
      options: [
        { t: `Începe aproape ca o dreaptă, apoi se curbează tot mai tare și se apropie de <var>c</var> fără să o atingă.`, ok: true,
          why: `La viteze mici γ ≈ 1 și mecanica clasică merge (dreaptă). Apoi accelerația scade, iar curba se aplatizează lin spre <var>c</var>.` },
        { t: `O dreaptă care continuă și după <var>c</var>, pentru că o forță constantă dă o accelerație constantă.`, ok: false,
          why: `Accelerație constantă ar fi în mecanica clasică (<var>a</var> = <var>F</var>/<var>m</var><sub>0</sub>). În TRR accelerația scade pe măsură ce γ crește.` },
        { t: `O dreaptă până la <var>c</var>, apoi o orizontală: viteza se oprește brusc când atinge <var>c</var>.`, ok: false,
          why: `Nu există o oprire bruscă: accelerația scade continuu (≈ 1/γ³), iar viteza se apropie de <var>c</var> asimptotic, fără să ajungă acolo.` },
        { t: `O curbă care urcă tot mai abrupt, pentru că masa de mișcare crește și „se adună" cu viteza.`, ok: false,
          why: `Masa de mișcare mai mare înseamnă inerție mai mare, deci accelerație mai mică — curba urcă tot mai încet, nu tot mai abrupt.` }
      ],
      explain: `Forța constantă dă impuls liniar în timp; viteza, legată de impuls prin γ, se aplatizează spre <var>c</var>.`,
      ref: { id: 'forta', label: 'Forța: legea rămâne, viteza se saturează' }
    },
    {
      id: 'c8q9', type: 'single',
      scenario: `O particulă pornește din repaus și este împinsă cu o forță constantă, în sensul mișcării. După prima oră, impulsul ei este <var>p</var><sub>1</sub>, iar viteza aproximativ 0,7 <var>c</var>.`,
      q: `Ce impuls va avea după 10 ore în total, dacă forța rămâne aceeași?`,
      options: [
        { t: `10 <var>p</var><sub>1</sub>, pentru că legea <var>F</var> = Δ<var>p</var>/Δ<var>t</var> adaugă același impuls în fiecare oră, indiferent de viteză.`, ok: true,
          why: `Forță constantă înseamnă spor de impuls constant. Viteza, în schimb, rămâne sub <var>c</var> (aproximativ 0,995 <var>c</var>), nu de zece ori mai mare.` },
        { t: `Mai puțin de 10 <var>p</var><sub>1</sub>, pentru că la viteze apropiate de <var>c</var> forța are tot mai puțin efect asupra impulsului.`, ok: false,
          why: `Forța are exact același efect asupra impulsului, la orice viteză. „Mai puțin efect" apare doar asupra vitezei.` },
        { t: `Mai mult de 10 <var>p</var><sub>1</sub>, pentru că masa de mișcare crește și, odată cu ea, impulsul crește „în plus".`, ok: false,
          why: `Creșterea lui γ este deja inclusă în expresia <var>p</var> = γ<var>m</var><sub>0</sub><var>v</var>. Câtă vreme forța e constantă, impulsul crește exact liniar.` },
        { t: `Aproximativ tot <var>p</var><sub>1</sub>: viteza e aproape de <var>c</var>, deci și impulsul „se saturează".`, ok: false,
          why: `Se saturează viteza, nu impulsul. Impulsul nu are plafon: tinde la infinit când <var>v</var> → <var>c</var>.` }
      ],
      explain: `Forță constantă ⟹ impuls care crește liniar în timp, chiar dacă viteza abia mai crește.`,
      ref: { id: 'forta', label: 'Forța: legea rămâne, viteza se saturează' }
    },
    {
      id: 'c8q10', type: 'multi',
      q: `Alege toate afirmațiile corecte despre masa de repaus <var>m</var><sub>0</sub> și masa de mișcare <var>m</var> = γ<var>m</var><sub>0</sub>.`,
      options: [
        { t: `<var>m</var><sub>0</sub> este aceeași pentru toți observatorii, oricum s-ar mișca ei față de corp.`, ok: true,
          why: `Masa de repaus este proprietatea corpului. Fiecare observator o poate afla din impulsul și viteza pe care le măsoară.` },
        { t: `<var>m</var> depinde de viteza corpului față de observatorul care măsoară.`, ok: true,
          why: `γ este calculat cu viteza relativă dintre corp și observator; observatori diferiți obțin valori diferite pentru <var>m</var>.` },
        { t: `Pentru <var>v</var> ≪ <var>c</var>, masa de mișcare și masa de repaus sunt practic egale.`, ok: true,
          why: `γ → 1, deci <var>m</var> → <var>m</var><sub>0</sub>: exact motivul pentru care în viața de zi cu zi nu observăm nicio schimbare de masă.` },
        { t: `Când <var>m</var> crește, în corp apar mai mulți atomi sau mai multă substanță.`, ok: false,
          why: `Numărul de particule rămâne același. Crește inerția (impulsul pe care îl are corpul pentru o viteză dată), nu cantitatea de materie.` },
        { t: `<var>m</var> poate fi mai mică decât <var>m</var><sub>0</sub>, dacă observatorul se mișcă în același sens cu corpul.`, ok: false,
          why: `γ ≥ 1 pentru orice viteză relativă, deci <var>m</var> ≥ <var>m</var><sub>0</sub> mereu. Contează mărimea vitezei relative, nu sensul ei.` }
      ],
      explain: `<var>m</var><sub>0</sub> = a corpului, aceeași pentru toți; <var>m</var> = relația corp–observator, ≥ <var>m</var><sub>0</sub>.`,
      ref: { id: 'masa', label: 'Masa de repaus și masa de mișcare' }
    },
    {
      id: 'c8q11', type: 'multi',
      q: `Un electron este adus tot mai aproape de <var>c</var>. Care dintre următoarele mărimi cresc fără limită?`,
      options: [
        { t: `Impulsul <var>p</var> = γ<var>m</var><sub>0</sub><var>v</var>.`, ok: true,
          why: `γ → ∞, iar <var>v</var> rămâne aproape de <var>c</var>: produsul nu are plafon.` },
        { t: `Masa de mișcare <var>m</var> = γ<var>m</var><sub>0</sub>.`, ok: true,
          why: `Este γ înmulțit cu o constantă, deci crește oricât.` },
        { t: `Inerția la împingerea în sensul mișcării, adică raportul <var>F</var>/<var>a</var> = γ³<var>m</var><sub>0</sub>.`, ok: true,
          why: `Chiar mai repede decât <var>m</var>: de aceea accelerația produsă de aceeași forță tinde la zero.` },
        { t: `Viteza <var>v</var>.`, ok: false,
          why: `Viteza rămâne mereu sub <var>c</var> — este singura dintre mărimi care „se saturează".` },
        { t: `Masa de repaus <var>m</var><sub>0</sub>.`, ok: false,
          why: `Masa de repaus nu depinde de viteză deloc.` }
      ],
      explain: `Se saturează viteza; impulsul, masa de mișcare și inerția explodează.`,
      ref: { id: 'impuls', label: 'Impulsul crește mai repede decât viteza' }
    }
    ,
    {
      id: 'c8q12', type: 'multi',
      q: `Alege toate motivele care explică corect de ce un electron nu poate fi adus la viteza <var>c</var>.`,
      options: [
        { t: `Când <var>v</var> → <var>c</var>, γ → ∞, deci ar fi nevoie de un impuls infinit.`, ok: true,
          why: `Fără impuls infinit nu se ajunge la <var>c</var>: asta e miezul explicației.` },
        { t: `Inerția γ³<var>m</var><sub>0</sub> crește fără limită, deci aceeași forță dă o accelerație din ce în ce mai mică.`, ok: true,
          why: `Accelerația produsă de o forță dată scade spre zero pe măsură ce viteza se apropie de <var>c</var>.` },
        { t: `Fiecare împingere adaugă un impuls finit, iar un număr finit de împingeri nu atinge infinitul.`, ok: true,
          why: `Aceeași idee, din altă parte: <var>F</var> = Δ<var>p</var>/Δ<var>t</var> dă sporuri finite de impuls în timp finit.` },
        { t: `Frecarea cu resturile de gaz din tubul acceleratorului crește tot mai mult cu viteza și anulează forța.`, ok: false,
          why: `Limita există și într-un vid perfect, fără frecare. Frecarea poate cel mult să îngreuneze accelerarea.` },
        { t: `Tehnologia actuală nu poate produce forțe destul de mari; cu aparate viitoare s-ar putea atinge <var>c</var>.`, ok: false,
          why: `Aparate mai bune pot apropia corpul de <var>c</var> (γ tot mai mare), dar niciodată nu-l aduc la <var>c</var>: impulsul necesar rămâne infinit.` }
      ],
      explain: `Limita lui <var>c</var> este structurală: ține de forma impulsului și de inerția care crește, nu de frecare sau de aparate.`,
      ref: { id: 'limita', label: 'Limita lui c și cazurile-limită' }
    },
    {
      id: 'c8q13', type: 'multi',
      q: `Alege toate afirmațiile corecte despre cazurile-limită ale dinamicii relativiste.`,
      options: [
        { t: `Pentru <var>v</var> ≪ <var>c</var>: γ ≈ 1, deci <var>p</var> ≈ <var>m</var><sub>0</sub><var>v</var> și <var>F</var> ≈ <var>m</var><sub>0</sub><var>a</var>.`, ok: true,
          why: `Aceasta este mecanica clasică, regăsită ca limită a formulelor relativiste.` },
        { t: `Mecanica clasică este un caz-limită al TRR, nu o teorie fără nicio legătură cu ea.`, ok: true,
          why: `La fel cum transformările Lorentz devin cele ale lui Galilei pentru <var>v</var> ≪ <var>c</var>.` },
        { t: `Un corp cu <var>v</var> ≈ <var>c</var> se numește ultrarelativist: γ este foarte mare, iar corpul se mișcă practic cu viteza luminii.`, ok: true,
          why: `Aici impulsul și inerția sunt uriașe, iar formulele clasice nu mai au niciun sens.` },
        { t: `Pentru <var>v</var> ≪ <var>c</var>, masa de mișcare devine zero, de aceea obiectele lente nu au inerție relativistă.`, ok: false,
          why: `γ → 1, deci <var>m</var> → <var>m</var><sub>0</sub>, nu 0. Masa de repaus rămâne, iar „corecția" relativistă dispare.` },
        { t: `Pentru un corp ultrarelativist, <var>F</var> = <var>m</var><sub>0</sub><var>a</var> rămâne o bună aproximare, deoarece masa de repaus nu se schimbă.`, ok: false,
          why: `Tocmai aici formula clasică greșește cel mai mult: adevărata relație este <var>F</var> = γ³<var>m</var><sub>0</sub><var>a</var>, cu γ foarte mare.` }
      ],
      explain: `Newton rămâne valabil pentru <var>v</var> ≪ <var>c</var>; la <var>v</var> ≈ <var>c</var> trebuie formulele relativiste.`,
      ref: { id: 'limita', label: 'Limita lui c și cazurile-limită' }
    },
    {
      id: 'c8q14', type: 'multi',
      q: `Un electron rapid este împins de o forță <var>F</var>. În care situații are accelerația lui <em>exact</em> direcția forței?`,
      options: [
        { t: `Când <var>F</var> ∥ <var>v</var>: forța acționează de-a lungul mișcării.`, ok: true,
          why: `Mișcarea rămâne rectilinie și <var>a</var> ∥ <var>F</var> ∥ <var>v</var>.` },
        { t: `Când <var>F</var> ⊥ <var>v</var>: forța acționează perpendicular pe mișcare.`, ok: true,
          why: `Atunci <var>F</var>·<var>v</var> = 0, al doilea termen din <var>a</var> dispare și <var>a</var> = <var>F</var>/<var>m</var> are direcția lui <var>F</var>.` },
        { t: `Pentru orice orientare a forței, dacă <var>v</var> ≪ <var>c</var> (γ ≈ 1).`, ok: true,
          why: `Termenul corector este neglijabil, deci regăsim <var>a</var> ≈ <var>F</var>/<var>m</var><sub>0</sub>, ca în mecanica clasică.` },
        { t: `Pentru orice orientare a forței, atâta timp cât mărimea ei rămâne constantă.`, ok: false,
          why: `Mărimea forței nu are legătură cu paralelismul. Contează unghiul dintre <var>F</var> și <var>v</var>, precum și cât de mare este γ.` },
        { t: `Pentru orice orientare a forței, dacă <var>v</var> ≈ <var>c</var>: atunci accelerația „se aliniază" cu forța.`, ok: false,
          why: `Invers: lângă <var>c</var> componenta paralelă cu viteza e înăbușită de γ³, deci accelerația se rotește spre perpendiculara pe viteză, departe de direcția forței.` }
      ],
      explain: `Accelerația e paralelă cu forța doar în cazurile speciale <var>F</var> ∥ <var>v</var>, <var>F</var> ⊥ <var>v</var> sau <var>v</var> ≪ <var>c</var>.`,
      ref: { id: 'acceleratie', label: 'Accelerația nu mai e simplu F/m' }
    },
    {
      id: 'c8q15', type: 'spot',
      q: `Raționamentul de mai jos conchide că o forță constantă poate duce un electron dincolo de <var>c</var>. Care este <strong>primul</strong> pas greșit?`,
      steps: [
        { t: `Un electron este împins cu o forță constantă <var>F</var>, în sensul mișcării.` },
        { t: `Legea fundamentală rămâne valabilă și în TRR: <var>F</var> = Δ<var>p</var>/Δ<var>t</var>, deci impulsul crește cu același spor în fiecare secundă.` },
        { t: `Impulsul este <var>p</var> = <var>m</var><sub>0</sub><var>v</var>, deci și viteza crește cu același spor în fiecare secundă.`, bad: true,
          why: `Aici e greșeala. În TRR impulsul este <var>p</var> = γ<var>m</var><sub>0</sub><var>v</var>, iar γ crește odată cu viteza: viteza nu mai este proporțională cu impulsul. Pasul 2 era corect.` },
        { t: `După un timp suficient de lung, viteza electronului depășește <var>c</var>.` },
        { t: `Prin urmare, un corp cu masă de repaus nenulă poate depăși viteza luminii.` }
      ],
      explain: `Impulsul crește liniar cu timpul, dar viteza nu îl urmează: factorul γ din <var>p</var> = γ<var>m</var><sub>0</sub><var>v</var> o ține sub <var>c</var>.`,
      ref: { id: 'impuls', label: 'Impulsul crește mai repede decât viteza' }
    },
    {
      id: 'c8q16', type: 'spot',
      q: `Care este primul pas greșit în raționamentul următor?`,
      steps: [
        { t: `Un proton trece prin laborator cu 0,9 <var>c</var>; laboratorul îi atribuie masa de mișcare <var>m</var> = γ<var>m</var><sub>0</sub> ≈ 2,3 <var>m</var><sub>0</sub>.` },
        { t: `Pentru laborator, protonul în mișcare are deci mai multă inerție decât unul identic aflat în repaus în laborator.` },
        { t: `Un observator care călătorește împreună cu protonul îl vede în repaus și îi atribuie masa <var>m</var><sub>0</sub>.` },
        { t: `Cei doi observatori se contrazic, deci unul dintre ei a greșit: masa protonului ar trebui să fie aceeași pentru amândoi.`, bad: true,
          why: `Nu e contradicție: masa de mișcare răspunde la întrebarea „cât de repede se mișcă protonul față de mine?", iar răspunsurile diferă. Singura masă comună tuturor este masa de repaus <var>m</var><sub>0</sub>.` },
        { t: `Prin urmare, formula <var>m</var> = γ<var>m</var><sub>0</sub> nu poate fi corectă.` }
      ],
      explain: `Ca durata și lungimea, masa de mișcare depinde de observator; invariantul este <var>m</var><sub>0</sub>.`,
      ref: { id: 'masa', label: 'Masa de repaus și masa de mișcare' }
    },
    {
      id: 'c8q17', type: 'spot',
      q: `Un student susține că un electron rapid, cu γ = 4, se accelerează la fel de ușor în orice direcție îl împingi. Care este primul pas greșit?`,
      steps: [
        { t: `Pentru laborator, electronul are masa de mișcare <var>m</var> = 4<var>m</var><sub>0</sub>.` },
        { t: `Dacă îl împingi lateral (<var>F</var> ⊥ <var>v</var>), avem <var>F</var>·<var>v</var> = 0, deci <var>a</var> = <var>F</var>/<var>m</var>: inerția este 4<var>m</var><sub>0</sub>.` },
        { t: `Dacă îl împingi în sensul mișcării, tot <var>a</var> = <var>F</var>/<var>m</var>, pentru că masa de mișcare este aceeași indiferent de direcția forței.`, bad: true,
          why: `Aici e eroarea. În sensul mișcării mai intră în joc termenul corector din legea accelerației: <var>a</var> = <var>F</var>/(γ³<var>m</var><sub>0</sub>), adică de γ² = 16 ori mai mică decât în cazul lateral. Pasul 2 era corect.` },
        { t: `Deci accelerația este aceeași în ambele cazuri.` },
        { t: `Prin urmare, inerția unui corp nu depinde de direcția în care îl împingi.` }
      ],
      explain: `Masa de mișcare apare în <var>p</var> = <var>m</var><var>v</var>; inerția la accelerare depinde de direcție: γ<var>m</var><sub>0</sub> lateral, γ³<var>m</var><sub>0</sub> în sensul mișcării.`,
      ref: { id: 'gamma3', label: 'Împingerea în sensul mișcării' }
    },
    {
      id: 'c8q18', type: 'single',
      scenario: `Un electron se mișcă cu 0,9 <var>c</var>. Cu o împingere suplimentară, în sensul mișcării, îi dublezi impulsul.`,
      q: `Ce se întâmplă cu viteza lui?`,
      options: [
        { t: `Crește, dar mult mai puțin decât de două ori, și rămâne sub <var>c</var>.`, ok: true,
          why: `Impulsul se dublează, viteza nu: de la 0,9 <var>c</var> ajunge doar la aproximativ 0,97 <var>c</var>, pentru că γ crește și el.` },
        { t: `Se dublează, ca în mecanica clasică, și ajunge la 1,8 <var>c</var>, mai mare decât viteza luminii.`, ok: false,
          why: `Proporționalitatea dintre impuls și viteză (<var>p</var> = <var>m</var><sub>0</sub><var>v</var>) este doar clasică. În TRR viteza nu depășește <var>c</var>.` },
        { t: `Rămâne 0,9 <var>c</var>: lângă <var>c</var>, impulsul poate crește fără ca viteza să se schimbe deloc.`, ok: false,
          why: `Viteza crește, deși puțin. Nu există un prag de la care impulsul suplimentar să nu mai aibă efect asupra vitezei.` },
        { t: `Devine exact <var>c</var>: dublarea impulsului acoperă diferența rămasă până la viteza luminii.`, ok: false,
          why: `<var>c</var> nu se atinge cu niciun impuls finit; cu cât te apropii, cu atât ai nevoie de mai mult impuls pentru fiecare fărâmă de viteză.` }
      ],
      explain: `Viteza nu este proporțională cu impulsul: aproape de <var>c</var>, un impuls dublu aduce doar o creștere mică a vitezei.`,
      ref: { id: 'impuls', label: 'Impulsul crește mai repede decât viteza' }
    },
    {
      id: 'c8q19', type: 'single',
      q: `Care afirmație descrie corect locul legii <var>F</var> = Δ<var>p</var>/Δ<var>t</var> în TRR?`,
      options: [
        { t: `Rămâne legea fundamentală, cu <var>p</var> = γ<var>m</var><sub>0</sub><var>v</var>; din ea iese, pentru <var>F</var> ∥ <var>v</var>, <var>F</var> = γ³<var>m</var><sub>0</sub><var>a</var>.`, ok: true,
          why: `Se schimbă expresia impulsului, nu forma legii. <var>F</var> = γ³<var>m</var><sub>0</sub><var>a</var> este o consecință pentru mișcarea rectilinie, nu o lege separată.` },
        { t: `Este înlocuită de <var>F</var> = <var>m</var><sub>0</sub><var>a</var>, care rămâne valabilă la orice viteză, deoarece <var>m</var><sub>0</sub> nu se schimbă niciodată.`, ok: false,
          why: `Faptul că <var>m</var><sub>0</sub> e constantă nu salvează <var>F</var> = <var>m</var><sub>0</sub><var>a</var>: variază γ din impuls, iar asta schimbă relația dintre forță și accelerație.` },
        { t: `Nu mai este valabilă: în TRR forța se definește direct prin <var>F</var> = γ³<var>m</var><sub>0</sub><var>a</var>, pentru orice tip de mișcare.`, ok: false,
          why: `Formula cu γ³ este valabilă doar pentru <var>F</var> ∥ <var>v</var> și se deduce din legea fundamentală. Pentru alte orientări accelerația are altă expresie.` },
        { t: `Rămâne valabilă numai pentru <var>v</var> ≪ <var>c</var>; la viteze mari nu mai există o lege a forței.`, ok: false,
          why: `Legea își păstrează forma în orice S.R.I. (Postulatul al II-lea): doar impulsul se scrie altfel.` }
      ],
      explain: `Legea fundamentală rămâne; ce se schimbă este expresia impulsului, iar de aici pornesc toate consecințele (<var>F</var> = γ³<var>m</var><sub>0</sub><var>a</var> etc.).`,
      ref: { id: 'forta', label: 'Forța: legea rămâne, viteza se saturează' }
    }
  ]
});
