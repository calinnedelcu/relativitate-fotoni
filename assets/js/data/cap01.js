/* Capitolul 1 — Cele două postulate: rezumat, glosar, bancă de întrebări */
RF.register({
  id: 1,

  summary: [
    { q: `Ce este un S.R.I.?`,
      a: `Un <strong>sistem de referință inerțial</strong>: un sistem în care un corp lăsat liber își păstrează viteza (sau stă pe loc), adică nu accelerează. Orice sistem aflat în mișcare rectilinie uniformă față de un S.R.I. este și el S.R.I.` },
    { q: `Enunță Postulatul I.`,
      a: `Viteza luminii în vid este o constantă universală, <var>c</var> ≈ 3·10⁸ m/s, în <strong>orice</strong> S.R.I. în care o măsurăm — indiferent de mișcarea sursei sau a observatorului.` },
    { q: `Enunță Postulatul al II-lea.`,
      a: `Legile fizicii sunt aceleași (au aceeași formă) în orice S.R.I. Nu există un S.R.I. privilegiat; din interiorul unui S.R.I. nu poți afla, prin experimente, dacă te miști uniform sau stai pe loc. În plus, spațiul și timpul (duratele) devin relative, depind de S.R.I. ⟹ spațiu-timp (4D).` },
    { q: `De ce lumina „nu se adună” cu viteza sursei?`,
      a: `Viteza = distanță ÷ durată. Dacă doi observatori în mișcare relativă măsoară același <var>c</var>, ei nu pot măsura aceleași distanțe și aceleași durate. Cedează ideea de spațiu și timp absolute, nu constanța lui <var>c</var>.` },
    { q: `Ce se schimbă și ce nu se schimbă de la un S.R.I. la altul?`,
      a: `Se schimbă: poziții, viteze, traiectorii, durate, lungimi. Nu se schimbă: viteza luminii în vid și forma legilor fizicii.` }
  ],

  glossary: [
    { term: `S.R.I.`, def: `Sistem de referință inerțial: un sistem în care un corp liber păstrează viteza constantă. Orice sistem în mișcare rectilinie uniformă față de un S.R.I. e tot S.R.I.` },
    { term: `Postulatul I`, def: `Viteza luminii în vid este o constantă universală, c ≈ 3·10⁸ m/s, în orice S.R.I.` },
    { term: `Postulatul al II-lea`, def: `Legile fizicii sunt aceleași în orice S.R.I.; spațiul și timpul devin relative la S.R.I. ⟹ spațiu-timp (4D).` },
    { term: `Sistem de referință`, def: `Un corp de referință împreună cu rigle (pentru poziții) și ceasuri (pentru momente), față de care descriem mișcarea.` },
    { term: `Principiul relativității`, def: `Legile fizicii au aceeași formă în orice S.R.I.; nicio experiență făcută în interiorul unui S.R.I. nu arată dacă el se mișcă uniform sau stă.` }
  ],

  quiz: [
    {
      id: 'c1q1', type: 'single',
      q: `Care dintre formulări exprimă corect principiul relativității (Postulatul al II-lea)?`,
      options: [
        { t: `Rezultatul oricărei măsurători (traiectorie, viteză, durată) este același în orice S.R.I.`, ok: false,
          why: `Capcana principală. Traiectoria unei mingi, viteza ei sau poziția unui eveniment diferă de la un S.R.I. la altul (vertical vs. parabolă). Ce rămâne la fel nu sunt rezultatele măsurătorilor, ci <strong>legile</strong> care le explică.` },
        { t: `Legile fizicii au aceeași formă în orice S.R.I.`, ok: true,
          why: `Exact: mecanica, electromagnetismul etc. se scriu la fel în toate S.R.I., deci niciun S.R.I. nu este privilegiat.` },
        { t: `Toate sistemele de referință, inclusiv cele care accelerează, sunt echivalente.`, ok: false,
          why: `Postulatul vorbește doar despre sistemele <strong>inerțiale</strong>. Într-un sistem care accelerează apar efecte (forțe de inerție) prin care îți dai seama că accelerezi.` },
        { t: `Nu există nimic absolut: orice mărime fizică depinde de observator.`, ok: false,
          why: `Teoria relativității restrânse tocmai spune ce rămâne <em>absolut</em> (viteza luminii, forma legilor, intervalul spațio-temporal). Doar alte mărimi sunt relative.` }
      ],
      explain: `Principiul relativității afirmă egalitatea S.R.I. în privința <strong>legilor</strong>, nu în privința <strong>rezultatelor</strong> concrete ale măsurătorilor.`,
      ref: { id: 'postulat2', label: 'Postulatul al II-lea' }
    },
    {
      id: 'c1q2', type: 'single',
      scenario: `Într-un tren care merge uniform, un pasager aruncă o minge vertical în sus și o prinde la loc. Un observator de pe peron vede mingea urcând și coborând, dar și deplasându-se înainte odată cu trenul.`,
      q: `Faptul că cei doi văd traiectorii diferite (verticală vs. parabolă) contrazice Postulatul al II-lea?`,
      options: [
        { t: `Da: dacă legile ar fi aceleași, ambii ar vedea aceeași traiectorie.`, ok: false,
          why: `Traiectoria nu e o lege, ci un rezultat. Aceeași lege (inerție + gravitație) produce traiectorii diferite când e descrisă din sisteme diferite.` },
        { t: `Nu: traiectoria depinde de S.R.I., iar aceeași lege explică ambele descrieri.`, ok: true,
          why: `Pasagerul vede mingea fără viteză orizontală; peronul vede aceeași viteză orizontală ca a trenului, compusă cu mișcarea verticală. Aceeași lege, două descrieri.` },
        { t: `Nu: pasagerul e în repaus absolut, deci doar descrierea lui contează.`, ok: false,
          why: `Nu există repaus absolut — chiar asta spune postulatul. Peronul nu e mai puțin „în repaus” decât trenul.` },
        { t: `Da, dar numai dacă trenul merge foarte repede; la viteze mici diferența dispare.`, ok: false,
          why: `Viteza trenului nu schimbă concluzia: pentru orice viteză constantă, legile sunt aceleași.` }
      ],
      explain: `Distinge mereu între <strong>ce măsori</strong> (depinde de S.R.I.) și <strong>legea</strong> care leagă măsurătorile (aceeași).`,
      ref: { id: 'sri', label: 'Sistemul de referință inerțial' }
    },
    {
      id: 'c1q3', type: 'single',
      scenario: `O navă se îndepărtează cu 0,5 <var>c</var> față de o stație spațială. Pilotul trimite înainte un impuls laser.`,
      q: `Ce viteză măsoară stația pentru impuls?`,
      options: [
        { t: `1,5 <var>c</var> — vitezele se adună.`, ok: false,
          why: `Adunarea simplă funcționează pentru mingi, nu pentru lumină. Postulatul I exclude acest rezultat.` },
        { t: `<var>c</var> — la fel ca pilotul.`, ok: true,
          why: `Postulatul I: viteza luminii în vid este aceeași în orice S.R.I.` },
        { t: `0,5 <var>c</var> — lumina „rămâne în urmă” față de stație.`, ok: false,
          why: `Viteza navei nu se scade din cea a luminii. Stația măsoară viteza luminii, nu distanța dintre lumină și navă.` },
        { t: `Ceva între <var>c</var> și 1,5 <var>c</var>, în funcție de cât de bun e aparatul.`, ok: false,
          why: `Nu e o chestiune de precizie: oricât de fin ai măsura, obții <var>c</var>.` }
      ],
      explain: `Lumina nu „moștenește” viteza sursei.`,
      ref: { id: 'postulat1', label: 'Postulatul I' }
    },
    {
      id: 'c1q4', type: 'multi',
      scenario: `O sursă de lumină verde se apropie de tine cu viteză foarte mare.`,
      q: `Care dintre afirmațiile despre lumina primită sunt adevărate?`,
      options: [
        { t: `Frecvența primită e mai mare decât cea emisă (lumina tinde spre albastru).`, ok: true,
          why: `Efectul Doppler: la apropiere, frecvența crește — e reală și măsurabilă.` },
        { t: `Lungimea de undă primită e mai mică decât cea emisă.`, ok: true,
          why: `Viteza e aceeași, frecvența crește ⇒ lungimea de undă scade.` },
        { t: `Viteza luminii în vid e mai mare decât <var>c</var>, fiindcă se adună cu viteza sursei.`, ok: false,
          why: `Exact ce neagă Postulatul I.` },
        { t: `Viteza luminii în vid rămâne <var>c</var>.`, ok: true,
          why: `Din cele trei mărimi (viteză, frecvență, lungime de undă), viteza e cea care nu se schimbă.` }
      ],
      explain: `Mișcarea sursei schimbă <strong>culoarea</strong> (frecvența), nu <strong>viteza</strong> luminii.`,
      ref: { id: 'postulat1', label: 'Postulatul I' }
    },
    {
      id: 'c1q5', type: 'multi',
      q: `Alege toate afirmațiile care decurg din cele două postulate sau le exprimă:`,
      options: [
        { t: `Doi observatori în mișcare uniformă relativă măsoară aceeași viteză pentru același fascicul de lumină din vid.`, ok: true,
          why: `Este chiar Postulatul I.` },
        { t: `Prin experimente făcute doar în interiorul unei nave care se mișcă uniform nu poți afla dacă nava se mișcă sau stă.`, ok: true,
          why: `Principiul relativității (Postulatul al II-lea).` },
        { t: `Durata dintre două evenimente este aceeași pentru toți observatorii.`, ok: false,
          why: `Aceasta e ipoteza mecanicii clasice. Postulatele o contrazic: duratele devin relative.` },
        { t: `Distanța dintre două evenimente poate diferi de la un S.R.I. la altul.`, ok: true,
          why: `Consecință directă: spațiul și timpul devin relative la S.R.I.` },
        { t: `Pentru viteze apropiate de <var>c</var>, viteza unui proiectil față de sol se obține tot prin simpla adunare cu viteza vehiculului.`, ok: false,
          why: `Adunarea simplă e doar o aproximație pentru viteze mici; formula corectă apare în capitolul 7.` }
      ],
      explain: `Cele două postulate au o consecință radicală: ideea de spațiu și timp comune tuturor observatorilor cade.`,
      ref: { id: 'postulat2', label: 'Postulatul al II-lea și consecința lui' }
    },
    {
      id: 'c1q6', type: 'single',
      scenario: `Doi astronauți, Ana și Bogdan, se depărtează unul de altul cu viteză constantă, în spațiu gol, departe de orice stea. Ana spune: „Eu stau pe loc, Bogdan se depărtează.” Bogdan spune exact același lucru despre Ana.`,
      q: `Cine are dreptate?`,
      options: [
        { t: `Ana, pentru că ea a pornit prima.`, ok: false,
          why: `Ordinea pornirii nu creează un sistem privilegiat.` },
        { t: `Amândoi, fiecare în propriul S.R.I.; nu există un S.R.I. „în repaus absolut”.`, ok: true,
          why: `Mișcarea uniformă are sens doar „față de ceva”. Cele două descrieri sunt la fel de valide.` },
        { t: `Cel a cărui navă are motoarele oprite.`, ok: false,
          why: `Ambele nave se mișcă uniform; motoarele nu fac diferența cât timp nu accelerează.` },
        { t: `Se poate afla: cel aflat în repaus va măsura pentru lumină o viteză diferită de a celuilalt.`, ok: false,
          why: `Tocmai invers: amândoi vor măsura aceeași viteză, <var>c</var>. Nici lumina nu poate trăda cine „stă”.` }
      ],
      explain: `Mișcarea uniformă e relativă: nu există un test care s-o facă absolută.`,
      ref: { id: 'postulat2', label: 'Postulatul al II-lea' }
    },
    {
      id: 'c1q7', type: 'single',
      q: `Un coleg afirmă: „Postulatul I spune că nimic nu poate depăși viteza luminii.” Care e evaluarea corectă?`,
      options: [
        { t: `Corect: aceasta este chiar formularea postulatului, iar celelalte rezultate decurg din ea.`, ok: false,
          why: `Formularea postulatului e despre constanța lui <var>c</var> în orice S.R.I., nu despre o limită de viteză.` },
        { t: `Incorect: postulatul afirmă constanța lui <var>c</var> în orice S.R.I.; limita de viteză iese mai târziu, ca o consecință.`, ok: true,
          why: `Enunțul și consecința sunt lucruri diferite. Limita de viteză se demonstrează din compunerea vitezelor și din dinamica relativistă (capitolele 7–8).` },
        { t: `Incorect: lumina poate fi depășită de particule foarte energetice, deci nu există nicio limită.`, ok: false,
          why: `Fals ca fapt fizic (în vid nimic nu depășește lumina) — și nu asta e problema afirmației colegului.` },
        { t: `Corect, dar doar pentru lumina vizibilă, nu și pentru celelalte radiații electromagnetice.`, ok: false,
          why: `Postulatul se referă la lumina din vid în general (orice radiație electromagnetică), nu doar la domeniul vizibil.` }
      ],
      explain: `Un enunț fundamental nu e același lucru cu consecințele lui: constanța lui <var>c</var> ⟶ (mai târziu) <var>c</var> ca viteză-limită.`,
      ref: { id: 'postulat1', label: 'Postulatul I' }
    },
    {
      id: 'c1q8', type: 'multi',
      q: `Alege toate situațiile în care sistemul legat de corp poate fi considerat (aproximativ) inerțial:`,
      options: [
        { t: `Un tren care merge pe o porțiune dreaptă, cu viteză constantă.`, ok: true,
          why: `Mișcare rectilinie uniformă: exact definiția.` },
        { t: `Un tren care frânează brusc.`, ok: false,
          why: `Accelerează (negativ): obiectele din vagon „o iau din loc”.` },
        { t: `O mașină care ia o curbă cu viteza, ca modul, constantă.`, ok: false,
          why: `Viteza e vector: se schimbă direcția, deci există accelerație.` },
        { t: `O navă cu motoarele oprite, departe de orice astru.`, ok: true,
          why: `Nu accelerează: un corp liber din interior își păstrează viteza.` },
        { t: `Un carusel care se rotește cu viteza unghiulară constantă.`, ok: false,
          why: `Rotația e mișcare accelerată (accelerație centripetă): o simți.` }
      ],
      explain: `Inerțial = fără accelerație — nici în mărime, nici în direcție.`,
      ref: { id: 'sri', label: 'Sistemul de referință inerțial' }
    },
    {
      id: 'c1q9', type: 'single',
      q: `De ce constanța lui <var>c</var> obligă la revizuirea ideilor despre spațiu și timp?`,
      options: [
        { t: `Pentru că lumina e prea rapidă ca să putem măsura ceva cu precizie suficientă la viteze mari.`, ok: false,
          why: `Nu e o limită tehnică de măsurare, ci una de principiu.` },
        { t: `Pentru că viteza = distanță ÷ durată: același <var>c</var> pentru doi observatori în mișcare relativă nu permite aceleași distanțe și durate.`, ok: true,
          why: `Asta e logica de fier: raportul e același, deci cel puțin unul dintre cei doi termeni diferă între observatori.` },
        { t: `Pentru că lumina nu are masă, iar ce nu are masă nu poate avea o viteză relativă.`, ok: false,
          why: `Absența masei nu are legătură cu argumentul (și va fi tratată abia în capitolul 10).` },
        { t: `Pentru că ceasurile și riglele reale se deformează la viteze mari, deci măsurătorile devin nesigure.`, ok: false,
          why: `Nu e un defect al aparatelor: chiar și ceasuri perfecte dau aceste rezultate.` }
      ],
      explain: `Postulatele nu cer „efecte ciudate” de la aparate, ci o schimbare a ideii de spațiu și timp.`,
      ref: { id: 'strans', label: 'Ce ne obligă să acceptăm' }
    },
    {
      id: 'c1q10', type: 'spot',
      q: `Raționamentul de mai jos duce la o concluzie falsă. Care este <strong>primul</strong> pas care afirmă ceva fals despre ce se măsoară în realitate?`,
      steps: [
        { t: `O navă se depărtează de stație cu 0,6 <var>c</var> și emite înainte un fascicul laser.` },
        { t: `Pilotul măsoară viteza fasciculului față de navă: <var>c</var>.` },
        { t: `Aplicând regula „vitezele se adună”, stația ar calcula <var>c</var> + 0,6 <var>c</var> = 1,6 <var>c</var>.` },
        { t: `Deci stația va <em>măsura</em> experimental 1,6 <var>c</var>, pentru că regulile mecanicii sunt aceleași pentru toți observatorii.`, bad: true,
          why: `Aici e eroarea: regula adunării simple nu se aplică luminii. Experimentele (Postulatul I) dau <var>c</var> și la stație. Faptul că legile sunt aceleași nu înseamnă că „adunarea” e legea potrivită la viteze comparabile cu <var>c</var>.` },
        { t: `Prin urmare, viteza luminii depinde de mișcarea sursei.` }
      ],
      explain: `Pasul 3 e doar o predicție clasică (ce ar calcula cineva care adună simplu); pasul 4 o prezintă drept fapt măsurat — și asta e fals.`,
      ref: { id: 'postulat1', label: 'Postulatul I' }
    },
    {
      id: 'c1q11', type: 'spot',
      q: `Care pas din raționamentul următor este greșit?`,
      steps: [
        { t: `Într-un tren care merge uniform, pasagerul aruncă o minge în sus și o vede urcând și coborând vertical.` },
        { t: `Observatorul de pe peron vede aceeași minge descriind o parabolă.` },
        { t: `Cele două traiectorii sunt diferite, deci legile fizicii nu pot fi aceleași în cele două sisteme.`, bad: true,
          why: `Confuzia clasică: traiectoria e un <em>rezultat</em> care depinde de sistem. Aceeași lege (inerție + gravitație) dă ambele traiectorii.` },
        { t: `Prin urmare, Postulatul al II-lea este fals.` }
      ],
      explain: `Postulatul al II-lea e despre <strong>legi</strong>, nu despre faptul că toți observatorii ar descrie la fel același eveniment.`,
      ref: { id: 'postulat2', label: 'Postulatul al II-lea' }
    },
    {
      id: 'c1q12', type: 'multi',
      q: `Care dintre mărimile următoare au aceeași valoare în toate S.R.I. (conform postulatelor)?`,
      options: [
        { t: `Viteza luminii în vid.`, ok: true, why: `Postulatul I.` },
        { t: `Forma matematică a legilor fizicii.`, ok: true, why: `Postulatul al II-lea.` },
        { t: `Viteza unui tren măsurată față de peron.`, ok: false,
          why: `Față de alt tren, sau față de un alt peron în mișcare, are altă valoare: depinde de sistem.` },
        { t: `Durata dintre două evenimente.`, ok: false, why: `Devine relativă (vezi capitolul 6).` },
        { t: `Poziția unui eveniment (coordonata <var>x</var>).`, ok: false, why: `Un alt S.R.I. are alt punct de origine și alte axe: coordonata se schimbă.` }
      ],
      explain: `Relativitatea restrânsă este și știința lucrurilor care <strong>nu</strong> se schimbă.`,
      ref: { id: 'mituri', label: 'Mituri vs. realitate' }
    },
    {
      id: 'c1q13', type: 'single',
      scenario: `Căpitanul unei nave care merge uniform vrea să afle dacă nava se mișcă. Are un laser la un capăt al unui coridor lung, o oglindă la celălalt capăt și un ceas. Măsoară timpul dus-întors al luminii o dată cu coridorul orientat în sensul mișcării și o dată perpendicular pe el.`,
      q: `Ce va constata?`,
      options: [
        { t: `Timpi diferiți: mai lung când coridorul e orientat în sensul mișcării.`, ok: false,
          why: `Asta ar prezice o lumină care se „adună” cu viteza navei — contrazisă de Postulatul I.` },
        { t: `Același timp în ambele orientări, egal cu cel de la staționare.`, ok: true,
          why: `Pentru pilot, lumina are viteza <var>c</var> în toate direcțiile, deci experimentul nu poate trăda mișcarea uniformă.` },
        { t: `Un timp care crește proporțional cu viteza navei.`, ok: false,
          why: `Nu: pentru pilot, nava e în repaus și nimic nu depinde de viteza ei față de altceva.` },
        { t: `Rezultatul depinde de culoarea laserului.`, ok: false,
          why: `În vid, toate culorile au aceeași viteză <var>c</var>.` }
      ],
      explain: `Postulatul I și Postulatul al II-lea acționează împreună: niciun experiment cu lumină nu poate face diferența între repaus și mișcare uniformă.`,
      ref: { id: 'postulat2', label: 'Postulatul al II-lea' }
    },
    {
      id: 'c1q14', type: 'single',
      q: `Care afirmație despre teoria relativității restrânse este corectă?`,
      options: [
        { t: `Teoria spune că toate mărimile fizice sunt relative, deci nu rămâne nimic la fel pentru toți observatorii.`, ok: false,
          why: `Invers: ea identifică ce e absolut (viteza luminii, forma legilor, intervalul spațio-temporal).` },
        { t: `Teoria stabilește ce rămâne la fel pentru toți (viteza luminii, forma legilor) și ce depinde de observator (durate, lungimi).`, ok: true,
          why: `O descriere exactă a ce rămâne și ce se schimbă la trecerea între S.R.I.` },
        { t: `Teoria spune că nu există adevăr obiectiv despre fenomene, fiindcă fiecare observator vede altceva.`, ok: false,
          why: `Fiecare observator măsoară ceva bine definit, iar legile care leagă măsurătorile sunt obiective.` },
        { t: `Teoria spune că timpul „curge diferit” doar în percepția observatorilor, nu în măsurători.`, ok: false,
          why: `Diferențele rezultă din măsurători riguroase cu ceasuri; nu sunt iluzii de percepție.` }
      ],
      explain: `Numele „relativitate” induce în eroare: teoria e la fel de mult despre invarianți ca despre relativ.`,
      ref: { id: 'mituri', label: 'Mituri vs. realitate' }
    },
    {
      id: 'c1q15', type: 'single',
      q: `De ce, în relativitate, spațiul și timpul sunt tratate împreună, ca spațiu-timp (4D)?`,
      options: [
        { t: `Pentru că timpul ar fi o a patra dimensiune spațială, de același fel cu lungimea.`, ok: false,
          why: `Timpul nu e „încă o lungime”: în formule intră cu alt semn (capitolul 2).` },
        { t: `Pentru că distanța și durata, separat, depind de observator; doar o combinație a lor (intervalul) e aceeași pentru toți.`, ok: true,
          why: `Separarea „spațiu” / „timp” nu mai e aceeași pentru toți observatorii; combinația lor e ce rămâne comun.` },
        { t: `Pentru că universul ar avea în realitate patru dimensiuni spațiale, nu trei, iar noi le vedem doar pe unele.`, ok: false,
          why: `Spațiul rămâne tridimensional; la el se adaugă timpul ca a patra coordonată a evenimentelor.` },
        { t: `Pentru că orice eveniment are nevoie de patru numere ca să fie precizat — iar asta e o noutate adusă de relativitate față de fizica clasică.`, ok: false,
          why: `Patru numere (unde și când) erau necesare și în fizica clasică. Noutatea e că împărțirea dintre „unde” și „când” depinde de observator.` }
      ],
      explain: `Spațiu-timpul apare pentru că spațiul și timpul, separat, au încetat să mai fie ale tuturor.`,
      ref: { id: 'strans', label: 'Ce ne obligă să acceptăm' }
    }
  ]
});
