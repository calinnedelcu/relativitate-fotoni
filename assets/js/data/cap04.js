/* Capitolul 4 (Adaos) — Simultaneitatea: rezumat, glosar, bancă de întrebări
   Convenții: Ana = peronul (S, cyan), Bogdan = trenul (S′, roz). */
RF.register({
  id: 4,

  summary: [
    { q: `Cum verifici dacă două evenimente îndepărtate sunt simultane?`,
      a: `Printr-o <strong>procedură cu lumină</strong>, făcută într-un S.R.I. anume: un observator în repaus la <strong>mijlocul</strong> distanței dintre evenimente primește lumina lor în același moment, iar lumina are viteza <var>c</var> în ambele sensuri ⟹ cele două drumuri au durat la fel, deci evenimentele s-au produs simultan. (Echivalent: ceasuri sincronizate cu un semnal de lumină pornit din mijloc arată aceeași oră.)` },
    { q: `Descrie trenul lui Einstein și spune ce concluzie trage fiecare observator.`,
      a: `Două fulgere lovesc capetele unui tren în mișcare, în clipa în care pasagerul din mijloc trece prin dreptul observatorului de pe peron. Peronul primește cele două lumini în același moment ⟹ fulgerele sunt <strong>simultane</strong>. Pasagerul merge în întâmpinarea luminii din față și o primește prima; el e la mijlocul trenului, iar lumina are <var>c</var> în ambele sensuri ⟹ fulgerul din față s-a produs <strong>primul</strong>. <strong>Amândoi au dreptate.</strong>` },
    { q: `Enunță: ce înseamnă că simultaneitatea este relativă?`,
      a: `Două evenimente produse în locuri diferite, simultane într-un S.R.I., <strong>nu sunt în general simultane</strong> într-un alt S.R.I. care se mișcă față de primul pe direcția dintre ele. Cel care se mișcă găsește primul evenimentul către care se îndreaptă. Niciun S.R.I. nu e privilegiat, deci nu există un „moment adevărat” care să decidă.` },
    { q: `De ce nu e vorba de întârzierea luminii? Care e cauza reală?`,
      a: `Fiecare observator își corectează momentele pentru timpul de drum al luminii; după corecție, dezacordul rămâne. Cauza reală este <strong>Postulatul I</strong>: lumina are aceeași viteză <var>c</var> față de fiecare observator, în ambele sensuri, deci fiecare își stabilește simultaneitatea cu aceeași regulă — iar regula, aplicată în sisteme care se mișcă unul față de altul, dă rezultate diferite. (Dacă lumina s-ar aduna cu viteza observatorului, el ar corecta cu <var>c</var> ± <var>v</var> și ar fi de acord cu ceilalți.)` },
    { q: `Ce se schimbă și ce nu se schimbă de la un S.R.I. la altul?`,
      a: `<strong>Se schimbă:</strong> dacă două evenimente îndepărtate sunt simultane; ordinea evenimentelor fără legătură cauzală; durata dintre ele. <strong>Nu se schimbă:</strong> coincidențele (același loc și același moment, ca o ciocnire); ordinea cauză → efect; viteza luminii. Evenimentele simultane și depărtate doar perpendicular pe direcția mișcării rămân simultane.` },
    { q: `De ce crește dezacordul cu distanța și cu viteza? (legătura cu <var>t</var>′ = γ(<var>t</var> − <var>vx</var>/<var>c</var><sup>2</sup>))`,
      a: `În <var>t</var>′ = γ(<var>t</var> − <var>vx</var>/<var>c</var><sup>2</sup>) intră și poziția <var>x</var>. Pentru două evenimente cu același <var>t</var> în S, momentele <var>t</var>′ diferă prin termenul <var>vx</var>/<var>c</var><sup>2</sup>, care crește cu distanța dintre evenimente (pe direcția mișcării) și cu viteza <var>v</var>. Dacă <var>x</var> e același, sau dacă <var>v</var> ≪ <var>c</var>, diferența dispare sau devine neglijabilă.` },
    { q: `De ce e necesar acest capitol pentru contracția lungimilor și pentru gemeni?`,
      a: `Lungimea unei bare în mișcare se măsoară marcându-i capetele în același moment (<var>t</var><sub>A</sub> = <var>t</var><sub>B</sub>) al observatorului; un alt observator găsește că marcajele nu au fost simultane, de unde diferența dintre lungimi. La gemeni, ce înseamnă „acum” pentru un ceas îndepărtat depinde de S.R.I., iar călătorul își schimbă S.R.I. la întoarcere.` }
  ],

  glossary: [
    { term: `S.R.I.`, def: `Sistem de referință inerțial: un sistem în care un corp liber păstrează viteza constantă. Orice sistem în mișcare rectilinie uniformă față de un S.R.I. e tot S.R.I.` },
    { term: `Eveniment`, def: `Ceva ce se întâmplă într-un loc anume și la un moment anume — descris prin patru numere: E(x, y, z, t). Un fulger, o ciocnire, un bec care se aprinde.` },
    { term: `Simultane`, def: `Două evenimente din locuri diferite sunt simultane într-un S.R.I. dacă lumina lor ajunge în același moment la un observator aflat la mijlocul distanței dintre ele, în repaus în acel S.R.I.` },
    { term: `Simultaneitate relativă`, def: `Faptul că două evenimente simultane într-un S.R.I. nu sunt, în general, simultane într-un alt S.R.I. care se mișcă față de primul pe direcția dintre ele. Niciun S.R.I. nu e privilegiat.` },
    { term: `Sincronizarea ceasurilor`, def: `Punerea în acord a unor ceasuri aflate în locuri diferite, cu un semnal de lumină pornit din mijloc: lumina face drumuri egale, deci ceasurile pornesc în același moment. Ceasuri sincronizate într-un S.R.I. nu sunt sincronizate în altul.` },
    { term: `Coincidență`, def: `Două evenimente produse în același loc și în același moment (de exemplu o ciocnire). Toți observatorii sunt de acord că ea are loc; doar coordonatele ei diferă.` },
    { term: `Legătură cauzală`, def: `Relația dintre două evenimente dintre care unul poate fi provocat de celălalt, printr-un semnal care merge cel mult cu viteza luminii. Ordinea lor (cauză → efect) este aceeași în orice S.R.I.` },
    { term: `Trenul lui Einstein`, def: `Experiment de gândire: două fulgere lovesc capetele unui tren în mișcare; pentru peron ele sunt simultane, pentru pasagerul din mijloc cel din față are loc primul.` },
    { term: `Factor Lorentz`, def: `γ = 1/√(1 − v²/c²) ≥ 1. Măsoară cât de mult se abat rezultatele relativiste de cele clasice; pentru v ≪ c, γ ≈ 1.` }
  ],

  quiz: [
    {
      id: 'c4q1', type: 'single',
      scenario: `Un tren foarte lung trece cu viteză mare pe lângă un peron. Două fulgere lovesc capetele trenului. Ana, de pe peron, aflată la mijlocul distanței dintre locurile lovite, primește cele două lumini în același moment. Bogdan stă la mijlocul trenului.`,
      q: `Bogdan își corectează observațiile pentru timpul de drum al luminii. Ce concluzie trage despre fulgere?`,
      options: [
        { t: `Au fost simultane, la fel ca pentru Ana: după ce ții cont de drumul luminii, toți observatorii ajung la aceeași concluzie.`, ok: false,
          why: `Tocmai corecția pentru drumul luminii nu face dezacordul să dispară. Ea scoate doar efectul întârzierii; ce rămâne vine din faptul că lumina are viteza <var>c</var> față de fiecare observator, în ambele sensuri.` },
        { t: `Cel din față s-a produs primul: Bogdan e la mijloc, drumurile luminii sunt egale, iar viteza este <var>c</var> în ambele sensuri.`, ok: true,
          why: `Drumuri egale și aceeași viteză ⟹ lumina sosită prima a și plecat prima. Pentru Bogdan, fulgerul din față a avut loc înaintea celui din spate.` },
        { t: `Cel din spate s-a produs primul, pentru că lumina lui a avut de străbătut un drum mai lung până la Bogdan.`, ok: false,
          why: `În sistemul trenului, capetele stau pe loc și sunt la distanțe egale de Bogdan, care e la mijloc. Un drum mai lung ar avea de făcut lumina doar pentru un observator care nu e la mijloc.` },
        { t: `Nu poate trage nicio concluzie: într-un tren în mișcare ordinea fulgerelor nu se poate stabili.`, ok: false,
          why: `Trenul, cu mișcare uniformă, e un S.R.I. ca oricare altul (Postulatul al II-lea): procedura cu lumina funcționează în el la fel ca pe peron.` }
      ],
      explain: `Corecția pentru drumul luminii nu elimină dezacordul: Bogdan, la mijlocul trenului, găsește că fulgerul din față a fost primul.`,
      ref: { id: 'tren', label: 'Trenul lui Einstein' }
    },
    {
      id: 'c4q2', type: 'single',
      scenario: `Două fulgere lovesc capetele unui tren care trece pe lângă un peron. Ana, de pe peron, la mijlocul distanței dintre urmele fulgerelor, primește cele două lumini în același moment. Bogdan, aflat la mijlocul trenului, o primește întâi pe cea din față.`,
      q: `Cum explică Ana, în sistemul peronului, faptul că Bogdan primește mai întâi lumina din față?`,
      options: [
        { t: `Fulgerul din față s-a produs mai devreme, așa că lumina lui a pornit prima.`, ok: false,
          why: `Aceasta e explicația lui Bogdan, în sistemul lui. Pentru Ana, fulgerele sunt simultane; ei nu îi trebuie nicio asimetrie la emisie.` },
        { t: `Bogdan se mișcă: aleargă în întâmpinarea luminii din față și fuge de cea din spate, deși fulgerele au fost simultane.`, ok: true,
          why: `În sistemul peronului lumina pornește deodată din ambele capete; diferența de sosire la Bogdan vine doar din mișcarea lui.` },
        { t: `Lumina din față are față de peron o viteză mai mare, fiindcă se adună cu viteza trenului.`, ok: false,
          why: `Postulatul I: față de peron lumina are viteza <var>c</var> în orice direcție, indiferent ce face trenul. Nicio adunare de viteze.` },
        { t: `Ceasul lui Bogdan merge mai încet, așa că i se pare că lumina din față sosește mai devreme.`, ok: false,
          why: `Dilatarea timpului e alt efect (capitolul 6) și nu schimbă ordinea în care Bogdan primește luminile — ordinea aceasta e un fapt pe care îl admit toți observatorii.` }
      ],
      explain: `Pentru peron fulgerele sunt simultane; sosirea nesimultană la Bogdan se explică prin mișcarea lui, nu prin momentele loviturilor.`,
      ref: { id: 'tren', label: 'Trenul lui Einstein' }
    },
    {
      id: 'c4q3', type: 'single',
      scenario: `În altă situație, fulgerele lovesc capetele trenului în așa fel încât, pentru Bogdan, de la mijlocul trenului, ele sunt <strong>simultane</strong>. Ana stă pe peron.`,
      q: `Ce găsește Ana despre aceleași două fulgere?`,
      options: [
        { t: `Că sunt simultane și pentru ea: dacă sunt simultane pentru unul dintre observatori, sunt simultane pentru toți.`, ok: false,
          why: `Aceasta ar fi simultaneitatea absolută, exact ce contrazice teoria. Simultaneitatea depinde de S.R.I., indiferent care dintre cei doi o stabilește primul.` },
        { t: `Că fulgerul din față s-a produs primul, ca în povestea standard a trenului.`, ok: false,
          why: `Aceea era concluzia lui Bogdan când fulgerele erau simultane pentru Ana. Rolurile s-au inversat, deci și sensul decalajului s-a inversat.` },
        { t: `Că fulgerul din spatele trenului s-a produs primul: spre capătul din spate se mișcă peronul, văzut din tren.`, ok: true,
          why: `Cine se mișcă spre un eveniment îl găsește primul. Față de tren, peronul se îndreaptă spre spate — așadar Ana găsește primul fulgerul din spate. Situația este perfect simetrică.` },
        { t: `Că ordinea depinde de lungimea peronului, nu de mișcarea relativă.`, ok: false,
          why: `Lungimea peronului nu are rol. Decalajul apare din mișcarea relativă a celor doi observatori și din distanța dintre evenimente.` }
      ],
      explain: `Regula e simetrică: fiecare observator găsește primul evenimentul către care se îndreaptă față de celălalt.`,
      ref: { id: 'cat', label: 'Cât de mare e dezacordul?' }
    },
    {
      id: 'c4q4', type: 'single',
      scenario: `Două mașini ajung în același moment în același punct al unei intersecții și se ciocnesc. O navă trece pe lângă Pământ cu o viteză foarte mare și își înregistrează propriile măsurători ale evenimentului.`,
      q: `Ce poate afirma, cu certitudine, echipajul navei despre ciocnire?`,
      options: [
        { t: `Că mașinile n-au ajuns simultan în punct, deci ciocnirea nu s-a produs.`, ok: false,
          why: `O ciocnire este o coincidență: același loc, același moment. Dacă a avut loc pentru un observator, a avut loc pentru toți.` },
        { t: `Că ciocnirea s-a produs, dar una dintre mașini a ajuns în punctul de ciocnire înaintea celeilalte.`, ok: false,
          why: `Mașinile se întâlnesc într-un singur punct din spațiu-timp. Nu există un S.R.I. în care una să fi ajuns acolo „mai devreme” și apoi să se fi ciocnit.` },
        { t: `Că ciocnirea s-a produs; doar coordonatele <var>x</var> și <var>t</var> pe care i le atribuie pot fi altele.`, ok: true,
          why: `Coincidența e absolută. Se schimbă etichetele (coordonatele) pe care fiecare observator i le dă, nu existența evenimentului.` },
        { t: `Nimic sigur: dacă mașinile se mișcă față de navă, ea nu poate ști dacă s-au întâlnit.`, ok: false,
          why: `Tocmai întâlnirile în același punct sunt singurele lucruri pe care toți observatorii le recunosc, oricum s-ar mișca.` }
      ],
      explain: `Evenimentele unice (același loc, același moment) există pentru toți observatorii; doar coordonatele lor diferă.`,
      ref: { id: 'relativ', label: 'Simultaneitatea este relativă' }
    },
    {
      id: 'c4q5', type: 'single',
      scenario: `Pe un stâlp vertical de pe peron, două becuri — unul deasupra celuilalt — se aprind în același moment pentru Ana. Bogdan trece pe lângă stâlp, într-un tren care merge pe orizontală.`,
      q: `Ce găsește Bogdan despre cele două becuri?`,
      options: [
        { t: `Becul de sus s-a aprins primul, fiindcă lumina lui are de parcurs un drum mai scurt până la tren.`, ok: false,
          why: `Aici nu mai e vorba de drumul luminii: Bogdan își corectează oricum timpii pentru el. Iar decalajul nu depinde de înălțime.` },
        { t: `Becurile s-au aprins simultan și pentru el: ele au aceeași poziție pe direcția mișcării trenului.`, ok: true,
          why: `Decalajul depinde numai de distanța dintre evenimente <em>pe direcția mișcării</em>. Aici ea este zero, deci simultaneitatea se păstrează.` },
        { t: `Nesimultan: cu cât trenul merge mai repede, cu atât decalajul dintre becuri e mai mare.`, ok: false,
          why: `Regula „mai repede ⟹ decalaj mai mare” se aplică doar evenimentelor depărtate pe direcția mișcării; perpendicular pe ea, decalajul rămâne zero la orice viteză.` },
        { t: `Nu se poate spune fără să știm cât de înalt este stâlpul.`, ok: false,
          why: `Înălțimea stâlpului nu intră în decalajul de timp. Pozițiile pe verticală (perpendicular pe mișcare) nu schimbă momentele.` }
      ],
      explain: `Doar separarea pe direcția mișcării produce dezacordul; perpendicular pe mișcare, evenimentele simultane rămân simultane.`,
      ref: { id: 'cat', label: 'Cât de mare e dezacordul?' }
    },
    {
      id: 'c4q6', type: 'multi',
      q: `Care dintre următoarele sunt proceduri corecte pentru a stabili, într-un S.R.I., că două evenimente din locuri diferite sunt simultane?`,
      options: [
        { t: `Un observator în repaus la mijlocul distanței dintre ele primește lumina celor două evenimente în același moment.`, ok: true,
          why: `Drumuri egale, aceeași viteză în ambele sensuri ⟹ lumina a pornit deodată. Aceasta este procedura de bază.` },
        { t: `Un observator aflat oriunde în sistem scade din momentul fiecărei sosiri timpul de drum (distanța ÷ <var>c</var>) și constată că momentele rămase sunt egale.`, ok: true,
          why: `Mijlocul nu e obligatoriu: contează să cunoști distanțele și să folosești viteza <var>c</var>. După corecție, momentele de emisie se pot compara.` },
        { t: `Ceasuri sincronizate în acel sistem, cu un semnal de lumină pornit din mijloc, arată aceeași oră la cele două evenimente.`, ok: true,
          why: `Sincronizarea cu lumină din mijloc folosește aceeași idee: lumina face drumuri egale până la cele două ceasuri.` },
        { t: `Un observator, oriunde s-ar afla, vede cele două evenimente în același moment.`, ok: false,
          why: `Momentul în care <em>vezi</em> depinde de distanță. Vederea simultană nu înseamnă producere simultană decât dacă distanțele sunt egale.` },
        { t: `Cele două evenimente se produc în același loc.`, ok: false,
          why: `Acesta este cazul coincidenței, nu al simultaneității între locuri diferite — iar pentru locuri diferite tocmai procedura cu lumină e necesară.` }
      ],
      explain: `Simultaneitatea la distanță se stabilește corectând pentru drumul luminii, într-un S.R.I. anume — nu din ce vezi.`,
      ref: { id: 'intro', label: 'Ce înseamnă „în același moment”?' }
    },
    {
      id: 'c4q7', type: 'single',
      scenario: `Un laser este pornit în punctul A, iar lumina lui lovește, mai târziu, o țintă din punctul B, aflat la mare distanță.`,
      q: `Poate un observator dintr-o navă, oricât de rapidă, să găsească ținta lovită <em>înainte</em> de pornirea laserului?`,
      options: [
        { t: `Da, dacă nava merge destul de repede dinspre B spre A: simultaneitatea relativă permite orice ordine.`, ok: false,
          why: `Simultaneitatea relativă nu permite „orice ordine”. Ordinea se poate inversa doar pentru evenimente pe care nu le poate lega niciun semnal.` },
        { t: `Nu: evenimentele sunt legate prin lumină (unul îl provoacă pe celălalt), deci pornirea precede lovirea pentru toți observatorii.`, ok: true,
          why: `Când un semnal poate merge de la un eveniment la celălalt, decalajul de simultaneitate nu poate depăși intervalul de timp dintre ele, deci ordinea se păstrează.` },
        { t: `Da, dar numai pentru lumină; pentru semnale mai lente ordinea cauză–efect rămâne fixă.`, ok: false,
          why: `Invers: ordinea e cel mai sigur păstrată tocmai când semnalul merge cu viteza luminii, cea mai mare posibilă.` },
        { t: `Nu: pentru evenimentele legate prin lumină, simultaneitatea este absolută.`, ok: false,
          why: `Aceste evenimente nici nu sunt simultane — pornirea precede lovirea. Ce se păstrează este <em>ordinea</em>, nu o simultaneitate.` }
      ],
      explain: `Cauza rămâne înaintea efectului pentru toți observatorii; doar evenimentele fără legătură cauzală își pot schimba ordinea.`,
      ref: { id: 'cauza', label: 'Cauza rămâne înaintea efectului' }
    },
    {
      id: 'c4q8', type: 'single',
      q: `Ana și Bogdan își corectează amândoi timpii pentru drumul luminii și tot nu cad de acord asupra fulgerelor. Care este cauza dezacordului?`,
      options: [
        { t: `Lumina are o viteză finită, <var>c</var>, deci sosește mereu cu întârziere față de momentul în care s-a produs fulgerul.`, ok: false,
          why: `Întârzierea e deja corectată de ambii. Dacă lumina s-ar aduna cu viteza observatorului, el ar corecta cu <var>c</var> ± <var>v</var> și ar ajunge la acordul cu ceilalți.` },
        { t: `Lumina are viteza <var>c</var> față de fiecare dintre ei, în ambele sensuri, deși ei se mișcă unul față de altul.`, ok: true,
          why: `Postulatul I: fiecare folosește aceeași valoare <var>c</var> în corecția lui, iar regula aplicată în două sisteme în mișcare relativă dă rezultate diferite.` },
        { t: `Ceasurile lui Bogdan merg mai încet decât ale Anei, deci momentele lui sunt întinse.`, ok: false,
          why: `Dilatarea timpului e un efect înrudit, dar distinct (capitolul 6); nu ea este rădăcina dezacordului despre simultaneitate.` },
        { t: `Legile fizicii sunt diferite în tren față de peron, de aceea cei doi obțin rezultate diferite.`, ok: false,
          why: `Postulatul al II-lea spune contrariul: legile sunt aceleași în orice S.R.I. Diferă rezultatele măsurătorilor, nu legile.` }
      ],
      explain: `Simultaneitatea relativă este o consecință directă a Postulatului I: aceeași viteză <var>c</var> pentru toți observatorii.`,
      ref: { id: 'intarziere', label: 'Nu e vorba de întârzierea luminii' }
    },
    {
      id: 'c4q9', type: 'single',
      scenario: `În mijlocul unui vagon lung, un bec emite un scurt impuls de lumină spre ambele capete. Bogdan, care călătorește în vagon, constată că impulsul ajunge la cele două capete în același moment. Ana, de pe peron, urmărește aceleași două sosiri.`,
      q: `Ce găsește Ana despre cele două sosiri ale luminii la capetele vagonului?`,
      options: [
        { t: `Sosirea la capătul din față a avut loc prima, pentru că lumina se adună cu viteza trenului.`, ok: false,
          why: `Față de peron lumina are viteza <var>c</var> în ambele sensuri; nu se adună cu viteza trenului (Postulatul I).` },
        { t: `Sosirea la capătul din spate a avut loc prima: capătul din spate vine în întâmpinarea luminii, iar cel din față fuge de ea.`, ok: true,
          why: `Pentru Ana lumina pornește cu <var>c</var> în ambele sensuri, dar capetele se mișcă. Sosirile, simultane pentru Bogdan, nu sunt simultane pentru ea.` },
        { t: `Cele două sosiri sunt simultane și pentru ea: sosirea luminii la un perete este un eveniment, iar evenimentele sunt absolute.`, ok: false,
          why: `Cele două sosiri sunt două evenimente diferite, în locuri diferite. Absolute sunt doar coincidențele (același loc și același moment).` },
        { t: `Nu poate spune nimic, fiindcă lumina dintr-un vagon în mișcare nu poate fi urmărită din afară.`, ok: false,
          why: `Orice S.R.I. își poate descrie propriu-i filmul evenimentelor; cele două descrieri sunt diferite, dar la fel de valide.` }
      ],
      explain: `Ceasuri sau semnale sincronizate cu lumină din mijloc într-un sistem nu sunt sincronizate în sistemul care se mișcă față de el.`,
      ref: { id: 'legatura', label: 'De ce contează mai departe' }
    },
    {
      id: 'c4q10', type: 'single',
      q: `Doi observatori în mișcare relativă uniformă nu sunt de acord asupra ordinii a două evenimente fără legătură cauzală între ele. Cum se interpretează corect situația?`,
      options: [
        { t: `Unul dintre ei a greșit corecția pentru drumul luminii; refăcând calculele, ar ajunge la aceeași ordine.`, ok: false,
          why: `Ambii calculează corect. Dezacordul nu e o eroare de calcul, ci o proprietate a modului în care se stabilește simultaneitatea cu lumina.` },
        { t: `Are dreptate cel care e în repaus față de stelele fixe, pentru că sistemul lui este privilegiat.`, ok: false,
          why: `Postulatul al II-lea: niciun S.R.I. nu e privilegiat. „Repausul față de stele” nu dă un statut special sistemului.` },
        { t: `Amândoi au dreptate, fiecare în S.R.I. lui; niciun experiment nu arată care ordine este „cea adevărată”.`, ok: true,
          why: `Nu există un moment absolut al evenimentelor. Ordinea a două evenimente fără legătură cauzală este relativă la S.R.I.` },
        { t: `Ordinea reală este cea a observatorului care vede primul lumina; ceilalți se înșală din cauza întârzierii.`, ok: false,
          why: `Momentul în care vezi nu este momentul în care s-a întâmplat. Și oricum, după corecția pentru drum, dezacordul rămâne.` }
      ],
      explain: `Fără un S.R.I. privilegiat, nu există o ordine „adevărată” pentru evenimentele fără legătură cauzală.`,
      ref: { id: 'relativ', label: 'Simultaneitatea este relativă' }
    },
    {
      id: 'c4q11', type: 'single',
      scenario: `Aceleași două fulgere, simultane pentru Ana, lovesc aceleași două urme de pe peron, aflate la aceeași distanță una de alta. Dar acum trenul care trece prin dreptul lor merge <strong>mult mai repede</strong> decât înainte.`,
      q: `Cum se schimbă concluzia lui Bogdan, de la mijlocul trenului?`,
      options: [
        { t: `Decalajul pe care îl găsește între fulgere scade, pentru că lumina din față are acum mai puțin de străbătut.`, ok: false,
          why: `Drumurile luminii nu intervin în decalaj (sunt corectate). Și direcția e greșită: decalajul crește cu viteza, nu scade.` },
        { t: `Decalajul crește, iar ordinea rămâne aceeași: fulgerul din față primul.`, ok: true,
          why: `Decalajul crește odată cu viteza relativă; sensul lui (cine e primul) depinde doar de sensul mișcării, nu de cât de rapid e trenul.` },
        { t: `Peste o anumită viteză ordinea se inversează și fulgerul din spate devine primul.`, ok: false,
          why: `Nu există o viteză critică: ordinea e fixată de sensul mișcării. Mărind viteza se mărește doar decalajul.` },
        { t: `Nu se schimbă nimic: decalajul depinde doar de distanța dintre urme, nu și de viteza trenului.`, ok: false,
          why: `Decalajul depinde de ambele: distanța dintre evenimente (pe direcția mișcării) și viteza relativă a observatorilor.` }
      ],
      explain: `Pentru același cuplu de evenimente simultane, un observator mai rapid găsește un decalaj mai mare, în același sens.`,
      ref: { id: 'cat', label: 'Cât de mare e dezacordul?' }
    },
    {
      id: 'c4q12', type: 'single',
      scenario: `Ana vrea să măsoare lungimea trenului care trece prin fața ei. Marchează pe peron poziția capătului din față și pe cea a capătului din spate <strong>în același moment al ei</strong> (simultan în sistemul peronului), apoi măsoară distanța dintre cele două urme. Bogdan, din tren, urmărește totul.`,
      q: `Ce poate obiecta Bogdan la procedura Anei?`,
      options: [
        { t: `Nimic: dacă marcajele sunt simultane pentru Ana, sunt simultane și pentru el, deci măsurătoarea e corectă pentru amândoi.`, ok: false,
          why: `Aceasta ar fi simultaneitate absolută. Cele două marcaje sunt depărtate pe direcția mișcării, deci Bogdan nu le găsește simultane.` },
        { t: `Că trenul se mișcă, deci nu are o lungime bine definită și nimeni nu o poate măsura cu adevărat.`, ok: false,
          why: `Lungimea unui obiect în mișcare se poate măsura (cu marcaje simultane); problema e doar că „simultan” depinde de observator.` },
        { t: `Că, pentru el, marcajele nu au fost simultane; distanța dintre urme nu este deci lungimea trenului în sistemul lui.`, ok: true,
          why: `Ce numește Ana „aceeași clipă”, Bogdan găsește nesimultan. De aici diferența dintre lungimile găsite (capitolul 5).` },
        { t: `Că lumina a întârziat să ajungă la Ana, deci marcajele au fost plasate greșit pe peron și trebuie corectate.`, ok: false,
          why: `Întârzierea luminii nu e problema: Ana își corectează momentele. Obiecția lui Bogdan vine din simultaneitatea relativă.` }
      ],
      explain: `Condiția „în același moment” din definiția lungimii unui obiect în mișcare depinde de observator — de aici contracția lungimilor.`,
      ref: { id: 'legatura', label: 'De ce contează mai departe' }
    },
    {
      id: 'c4q13', type: 'multi',
      scenario: `Două fulgere lovesc capetele unui tren în mișcare. Pentru Ana, de pe peron, ele sunt simultane. Bogdan stă la mijlocul trenului.`,
      q: `Care dintre afirmații sunt adevărate?`,
      options: [
        { t: `Bogdan primește lumina din față înaintea celei din spate.`, ok: true,
          why: `Cele două recepții au loc în locul în care e Bogdan, în momente diferite; ordinea lor o admit toți observatorii.` },
        { t: `Bogdan găsește că fulgerul din față s-a produs înaintea celui din spate.`, ok: true,
          why: `Drumuri egale și viteza <var>c</var> în ambele sensuri ⟹ ordinea sosirii este ordinea producerii.` },
        { t: `Ana primește cele două lumini în același moment.`, ok: true,
          why: `Ea e la mijlocul distanței dintre urme, iar pentru ea fulgerele sunt simultane.` },
        { t: `Bogdan greșește, fiindcă sistemul trenului nu e la fel de bun ca peronul pentru a judeca simultaneitatea.`, ok: false,
          why: `Niciun S.R.I. nu e privilegiat (Postulatul al II-lea): trenul, în mișcare uniformă, e la fel de valid ca peronul.` },
        { t: `Față de Bogdan, lumina din față se deplasează mai repede decât cea din spate.`, ok: false,
          why: `Postulatul I: față de Bogdan lumina are viteza <var>c</var> în orice direcție.` }
      ],
      explain: `Ordinea sosirilor la același observator e comună tuturor; ordinea producerii fulgerelor depinde de S.R.I.`,
      ref: { id: 'tren', label: 'Trenul lui Einstein' }
    },
    {
      id: 'c4q14', type: 'multi',
      q: `Două evenimente sunt simultane într-un S.R.I. numit S. Pentru care dintre situațiile următoare sunt ele simultane și într-un alt S.R.I., S′, care se mișcă față de S?`,
      options: [
        { t: `Evenimentele se produc în același punct.`, ok: true,
          why: `Este o coincidență (același loc, același moment): rămâne coincidență pentru toți.` },
        { t: `Evenimentele sunt depărtate unul de altul doar perpendicular pe direcția de mișcare a lui S′.`, ok: true,
          why: `Decalajul depinde numai de distanța pe direcția mișcării; perpendicular pe ea, simultaneitatea se păstrează.` },
        { t: `S′ stă pe loc față de S.`, ok: true,
          why: `Fără mișcare relativă, cei doi observatori au același S.R.I. și același răspuns.` },
        { t: `Evenimentele sunt foarte depărtate pe direcția mișcării, dar S′ se mișcă foarte încet.`, ok: false,
          why: `Decalajul scade cu viteza, dar nu dispare: devine doar neglijabil. „Foarte mic” nu înseamnă „zero”.` },
        { t: `Evenimentele sunt depărtate pe direcția mișcării, iar S′ se mișcă rapid.`, ok: false,
          why: `Este cazul tipic al dezacordului puternic: aici simultaneitatea se pierde.` }
      ],
      explain: `Dezacordul cere ambele: mișcare relativă și separare pe direcția mișcării.`,
      ref: { id: 'cat', label: 'Cât de mare e dezacordul?' }
    },
    {
      id: 'c4q15', type: 'multi',
      q: `Care dintre afirmațiile următoare sunt acceptate de toți observatorii inerțiali, oricum s-ar mișca ei?`,
      options: [
        { t: `Două mașini s-au ciocnit.`, ok: true,
          why: `Ciocnirea este o coincidență — un singur eveniment, recunoscut de toți.` },
        { t: `Un laser a fost pornit în A și lumina lui a lovit ținta din B; pornirea a precedat lovirea.`, ok: true,
          why: `Evenimentele sunt legate cauzal (prin lumină), iar ordinea cauză → efect este aceeași pentru toți.` },
        { t: `Cele două fulgere de la capetele trenului au fost simultane.`, ok: false,
          why: `Simultaneitatea evenimentelor îndepărtate depinde de S.R.I.: Ana și Bogdan nu cad de acord.` },
        { t: `Lumina fulgerelor se propagă în vid cu viteza <var>c</var>.`, ok: true,
          why: `Postulatul I: viteza luminii în vid este aceeași în orice S.R.I.` },
        { t: `Fulgerul din fața trenului s-a produs înaintea celui din spate.`, ok: false,
          why: `Aceasta este concluzia lui Bogdan; Ana o contrazice. Ordinea evenimentelor fără legătură cauzală e relativă.` }
      ],
      explain: `Rămân la fel: coincidențele, ordinea cauză–efect și viteza luminii. Se schimbă: simultaneitatea la distanță.`,
      ref: { id: 'relativ', label: 'Simultaneitatea este relativă' }
    },
    {
      id: 'c4q16', type: 'multi',
      q: `Care dintre afirmațiile următoare fac parte din explicația corectă a dezacordului dintre Ana și Bogdan?`,
      options: [
        { t: `Fiecare aplică aceeași procedură de simultaneitate, dar în propriul S.R.I.`, ok: true,
          why: `Procedura e aceeași; sistemele diferă, deci și rezultatele.` },
        { t: `Lumina are viteza <var>c</var> față de fiecare dintre ei, în ambele sensuri (Postulatul I).`, ok: true,
          why: `Aceasta e rădăcina: nimeni nu poate folosi o altă viteză a luminii în corecția lui.` },
        { t: `Niciun S.R.I. nu este privilegiat (Postulatul al II-lea), deci nu există un moment „adevărat” al fulgerelor.`, ok: true,
          why: `Fără un sistem privilegiat, nimeni nu poate declara „corectă” simultaneitatea unuia dintre ei.` },
        { t: `Lumina din spate ajunge la Bogdan cu întârziere, fiindcă are de parcurs un drum mai lung.`, ok: false,
          why: `Pentru Bogdan, drumurile sunt egale; iar întârzierea luminii este oricum corectată de ambii observatori.` },
        { t: `Ceasul lui Bogdan merge cu altă viteză decât al Anei, de aceea momentele atribuite diferă.`, ok: false,
          why: `Ceasurile funcționează bine; dezacordul vine din modul în care sunt sincronizate ceasurile din locuri diferite în fiecare sistem.` }
      ],
      explain: `Dezacordul nu vine din aparate sau din drumul luminii, ci din Postulatul I aplicat în două sisteme în mișcare relativă.`,
      ref: { id: 'intarziere', label: 'Nu e vorba de întârzierea luminii' }
    },
    {
      id: 'c4q17', type: 'spot',
      q: `Raționamentul de mai jos duce la o concluzie falsă. Care este <strong>primul</strong> pas greșit?`,
      steps: [
        { t: `Două fulgere lovesc capetele unui tren; pentru Ana, de pe peron, ele sunt simultane.` },
        { t: `Bogdan, aflat la mijlocul trenului, primește întâi lumina din față, apoi pe cea din spate.` },
        { t: `În sistemul trenului, capetele stau pe loc și sunt la distanțe egale de Bogdan.` },
        { t: `Deci lumina din spate a sosit mai târziu numai pentru că a avut de parcurs un drum mai lung până la el.`, bad: true,
          why: `Pasul 3 spune chiar contrariul: drumurile sunt egale (și lumina are viteza <var>c</var> în ambele sensuri față de Bogdan). Întârzierea nu poate veni din drum; singura explicație rămasă este că lumina din spate a <em>plecat</em> mai târziu.` },
        { t: `Prin urmare fulgerele au fost simultane și pentru Bogdan, iar dezacordul este doar aparent.` }
      ],
      explain: `Corectat pentru drum, decalajul de sosire devine decalaj între momentele producerii — și el nu dispare.`,
      ref: { id: 'intarziere', label: 'Nu e vorba de întârzierea luminii' }
    },
    {
      id: 'c4q18', type: 'spot',
      q: `Care este <strong>primul</strong> pas greșit al raționamentului următor?`,
      steps: [
        { t: `Simultaneitatea este relativă: două evenimente simultane într-un S.R.I. nu sunt, în general, simultane în altul.` },
        { t: `Prin urmare, pentru <em>orice</em> pereche de evenimente există un observator suficient de rapid care le găsește în ordine inversată.`, bad: true,
          why: `Inversarea ordinii e posibilă doar pentru evenimente atât de depărtate încât nici lumina n-ar putea ajunge de la unul la celălalt în intervalul de timp dintre ele. Pentru evenimente legate cauzal, ordinea este aceeași pentru toți.` },
        { t: `Deci o navă foarte rapidă ar putea constata că ținta a fost lovită înainte ca laserul să fie pornit.` },
        { t: `Atunci efectul ar putea precede cauza.` },
        { t: `Așadar relativitatea ar face imposibilă orice ordine cauză–efect.` }
      ],
      explain: `Relativitatea simultaneității nu atinge ordinea cauză → efect: aceasta se păstrează pentru toți observatorii.`,
      ref: { id: 'cauza', label: 'Cauza rămâne înaintea efectului' }
    },
    {
      id: 'c4q19', type: 'spot',
      q: `Care este <strong>primul</strong> pas greșit al raționamentului următor?`,
      steps: [
        { t: `Pentru Ana (peron) fulgerele sunt simultane; pentru Bogdan (tren), cel din față s-a produs primul.` },
        { t: `Fiecare a aplicat aceeași procedură cu lumina, în propriul S.R.I., fără nicio greșeală de calcul.` },
        { t: `Dar trenul se mișcă, iar peronul stă pe loc; deci simultaneitatea stabilită pe peron este cea adevărată.`, bad: true,
          why: `Mișcarea uniformă este relativă: față de tren, peronul se mișcă. Postulatul al II-lea spune că niciun S.R.I. nu e privilegiat, deci nu putem declara „adevărată” simultaneitatea unuia dintre ei.` },
        { t: `Prin urmare Bogdan trebuie să se fi înșelat.` },
        { t: `Deci peronul este un sistem de referință privilegiat.` }
      ],
      explain: `„Eu stau, tu te miști” nu are sens în absolut: nu există un S.R.I. în repaus real care să decidă între observatori.`,
      ref: { id: 'relativ', label: 'Simultaneitatea este relativă' }
    },
    {
      id: 'c4q20', type: 'single',
      q: `Două evenimente au același moment <var>t</var> în S, dar poziții <var>x</var> diferite pe direcția mișcării lui S′. Ce arată transformarea <var>t</var>′ = γ(<var>t</var> − <var>vx</var>/<var>c</var><sup>2</sup>) despre momentele <var>t</var>′ din S′?`,
      options: [
        { t: `Că sunt egale, fiindcă <var>t</var> este același în S, iar factorul γ nu depinde de poziția evenimentelor.`, ok: false,
          why: `γ nu depinde de poziție, dar al doilea termen, <var>vx</var>/<var>c</var><sup>2</sup>, da. Același <var>t</var> nu garantează același <var>t</var>′.` },
        { t: `Că diferă doar prin factorul γ, adică prin dilatarea timpului, și nu prin poziția evenimentelor în spațiu.`, ok: false,
          why: `γ înmulțește la fel ambele momente și nu creează o diferență între ele. Diferența vine din termenul care conține <var>x</var>.` },
        { t: `Că diferă prin termenul cu <var>x</var>, cu atât mai mult cu cât evenimentele sunt mai depărtate și S′ merge mai repede.`, ok: true,
          why: `Chiar acesta este mecanismul simultaneității relative: poziția <var>x</var> intră în momentul <var>t</var>′ al lui S′.` },
        { t: `Că diferă numai dacă lumina de la evenimente nu a apucat încă să ajungă la observatorul din S′ și el o așteaptă.`, ok: false,
          why: `Transformarea dă momentele producerii evenimentelor, nu ale recepției luminii. Drumul luminii nu intervine.` }
      ],
      explain: `Termenul <var>vx</var>/<var>c</var><sup>2</sup> este cel care face ca „același moment” în S să devină „momente diferite” în S′.`,
      ref: { id: 'formula', label: 'Formula, în cuvinte' }
    },
    {
      id: 'c4q21', type: 'single',
      scenario: `Ana stă pe peron, dar nu la mijlocul distanței dintre urmele fulgerelor: este mult mai aproape de urma din față. Ea primește lumina din față cu mult înaintea celei din spate. Ana cunoaște distanțele de la ea la cele două urme și știe că, în sistemul peronului, lumina are viteza <var>c</var>.`,
      q: `Cum poate Ana stabili corect dacă fulgerele au fost simultane?`,
      options: [
        { t: `Fulgerul din față s-a produs primul, pentru că lumina lui a sosit prima la ea.`, ok: false,
          why: `Aici se confundă momentul în care <em>vezi</em> cu momentul în care <em>s-a întâmplat</em>. Lumina din față sosește întâi chiar și pentru fulgere simultane, fiindcă are de făcut un drum mai scurt.` },
        { t: `Nu poate stabili nimic: simultaneitatea se poate verifica numai de la mijlocul distanței dintre evenimente.`, ok: false,
          why: `Mijlocul e o comoditate, nu o obligație. Contează să cunoști distanțele și viteza luminii pentru a corecta drumurile.` },
        { t: `Scade din momentul fiecărei sosiri timpul de drum (distanța ÷ <var>c</var>) și compară momentele rezultate: dacă ies egale, fulgerele au fost simultane.`, ok: true,
          why: `Aceasta e corecția generală. Pentru Ana, în sistemul peronului, ea dă același rezultat ca la un observator aflat la mijloc.` },
        { t: `Fulgerele nu pot fi simultane, pentru că altfel lumina lor ar fi sosit deodată la ea.`, ok: false,
          why: `Sosirea deodată e cerută doar de la un observator aflat la mijloc. Aflată aproape de un capăt, Ana primește întâi lumina din apropiere chiar dacă fulgerele sunt simultane.` }
      ],
      explain: `Simultaneitatea se stabilește din momentele <em>producerii</em> (după scăderea timpului de drum), nu din ordinea în care vezi luminile.`,
      ref: { id: 'intarziere', label: 'Nu e vorba de întârzierea luminii' }
    }
  ]
});
