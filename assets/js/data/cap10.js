/* Capitolul 10 — Fotonul: rezumat, glosar, bancă de întrebări */
RF.register({
  id: 10,

  summary: [
    { q: `Ce este un foton?`,
      a: `<strong>Cuanta</strong> (porția) de radiație electromagnetică de o anumită frecvență ν. Se deplasează în vid cu viteza <var>c</var> în <strong>orice</strong> S.R.I., nu are masă de repaus (<var>m</var><sub>0</sub> = 0), dar are energie <var>E</var><sub>γ</sub> = <var>h</var>ν și impuls <var>p</var><sub>γ</sub> = <var>h</var>ν/<var>c</var>.` },
    { q: `De ce are fotonul masa de repaus <var>m</var><sub>0</sub> = 0?`,
      a: `Fotonul se deplasează cu <var>c</var>, deci γ = lim<sub><var>v</var>→<var>c</var></sub> 1/√(1 − <var>v</var><sup>2</sup>/<var>c</var><sup>2</sup>) = ∞. Dar masa de mișcare <var>m</var> = γ<var>m</var><sub>0</sub> și energia <var>E</var> = <var>mc</var><sup>2</sup> sunt finite ⟹ <strong><var>m</var><sub>0</sub> = 0</strong>. Din triunghiul energie–impuls: <var>m</var><sub>0</sub> = √(<var>E</var><sup>2</sup> − (<var>pc</var>)<sup>2</sup>)/<var>c</var><sup>2</sup> = 0, adică <var>E</var> = <var>pc</var>.` },
    { q: `Cum arată triunghiul energie–impuls pentru un foton și ce rezultă de aici?`,
      a: `Triunghiul se „turtește” într-un segment: ipotenuza <var>E</var> și cateta <var>pc</var> sunt egale, iar cateta <var>m</var><sub>0</sub><var>c</var><sup>2</sup> este zero. Rezultă că fotonul merge exact cu <var>c</var> și <strong>nu poate fi adus în repaus</strong>: la <var>p</var> = 0 ar fi și <var>E</var> = 0, adică nu ar mai rămâne nimic.` },
    { q: `Enunță legea lui Planck.`,
      a: `Energia unui foton este proporțională cu frecvența radiației: <var>E</var><sub>γ</sub> = <var>h</var>ν, cu <var>h</var> ≈ 6,62·10<sup>−34</sup> J·s (constanta lui Planck, aceeași pentru toate culorile). Dublezi frecvența ⟹ dublezi energia fiecărui foton: albastru > roșu, ultraviolet > albastru.` },
    { q: `Cât este impulsul unui foton și cum se obține?`,
      a: `<var>E</var><sub>γ</sub> = <var>mc</var><sup>2</sup> = <var>h</var>ν și <var>p</var><sub>γ</sub> = <var>mc</var> ⟹ <var>E</var><sub>γ</sub>/<var>p</var><sub>γ</sub> = <var>c</var> ⟹ <strong><var>p</var><sub>γ</sub> = <var>h</var>ν/<var>c</var></strong>. Fotonul are impuls deși <var>m</var><sub>0</sub> = 0, pentru că are masă de mișcare <var>m</var> = <var>h</var>ν/<var>c</var><sup>2</sup> ≠ 0.` },
    { q: `Ce decide energia unui foton și ce decide numărul de fotoni?`,
      a: `Energia fiecărui foton o decide doar <strong>frecvența</strong> (culoarea). <strong>Intensitatea</strong> (la o culoare dată) decide câți fotoni sosesc pe secundă. Puterea fasciculului = (fotoni pe secundă) × (energia unui foton): la aceeași putere, un fascicul albastru are mai puțini fotoni decât unul roșu.` },
    { q: `Ce se schimbă și ce nu între doi fotoni de culori diferite?`,
      a: `Se schimbă: frecvența, lungimea de undă, energia, impulsul și masa de mișcare (mai mari pentru albastru decât pentru roșu). Nu se schimbă: viteza (<var>c</var>), masa de repaus (0) și raportul <var>E</var>/<var>p</var> = <var>c</var>.` }
  ],

  glossary: [
    { term: `foton`, def: `Cuanta (porția) de radiație electromagnetică de frecvență ν. În vid se mișcă cu <var>c</var> în orice S.R.I., are <var>m</var><sub>0</sub> = 0, energia <var>E</var> = <var>h</var>ν și impulsul <var>p</var> = <var>h</var>ν/<var>c</var>.` },
    { term: `cuantă`, def: `Cea mai mică porție în care poate fi schimbată o mărime fizică — aici, energia unei radiații de frecvență dată. Nu există „jumătate de cuantă”.` },
    { term: `legea lui Planck`, def: `Energia unui foton este proporțională cu frecvența radiației: <var>E</var><sub>γ</sub> = <var>h</var>ν.` },
    { term: `constanta lui Planck`, def: `<var>h</var> ≈ 6,62·10<sup>−34</sup> J·s. Aceeași pentru toate culorile și toate materialele; leagă energia unui foton de frecvența lui.` },
    { term: `masa de repaus`, def: `<var>m</var><sub>0</sub>: masa unui corp măsurată când el stă în repaus; aceeași pentru toți observatorii. Pentru foton, <var>m</var><sub>0</sub> = 0.` },
    { term: `masa de mișcare`, def: `<var>m</var> = γ<var>m</var><sub>0</sub> = <var>E</var>/<var>c</var><sup>2</sup>: energia corpului împărțită la <var>c</var><sup>2</sup>. La foton, <var>m</var> = <var>h</var>ν/<var>c</var><sup>2</sup> (nenulă), deși <var>m</var><sub>0</sub> = 0.` },
    { term: `impuls`, def: `<var>p</var>: în relativitate, <var>p</var> = γ<var>m</var><sub>0</sub><var>v</var> = <var>mv</var>. La foton, <var>p</var> = <var>h</var>ν/<var>c</var> = <var>E</var>/<var>c</var>.` },
    { term: `intensitate`, def: `Energia pe care o transportă lumina într-o secundă prin unitatea de suprafață. La o culoare dată, ea crește doar dacă sosesc mai mulți fotoni pe secundă.` },
    { term: `electronvolt`, def: `eV: unitate de energie potrivită scării atomice, 1 eV ≈ 1,6·10<sup>−19</sup> J. Un foton de lumină vizibilă are între 1,6 și 3,3 eV.` },
    { term: `ultrarelativist`, def: `Regim în care <var>v</var> ≈ <var>c</var> și energia totală este mult mai mare decât energia de repaus; atunci <var>E</var> ≈ <var>pc</var>.` }
  ],

  quiz: [
    {
      id: 'c10q1', type: 'single',
      scenario: `O colegă spune: „Fotonul merge cu <var>c</var> și are energie finită. Se poate, dacă masa lui de repaus e extrem de mică — de un miliard de ori mai mică decât a electronului — dar nu zero.”`,
      q: `Ce nu merge în raționamentul ei?`,
      options: [
        { t: `Nimic: o masă de repaus extrem de mică permite și <var>v</var> = <var>c</var>, și o energie finită, deci raționamentul ei este corect.`, ok: false,
          why: `Exact asta nu se poate. La <var>v</var> = <var>c</var>, γ este infinit; înmulțit cu orice <var>m</var><sub>0</sub> ≠ 0, oricât de mic, dă energie infinită. „Foarte mică” nu salvează situația.` },
        { t: `Fotonul nu are nicio masă, nici de repaus, nici de mișcare; tocmai de aceea poate merge cu <var>c</var> fără probleme.`, ok: false,
          why: `Fotonul are masă de mișcare <var>m</var> = <var>h</var>ν/<var>c</var><sup>2</sup> ≠ 0 (energia lui împărțită la <var>c</var><sup>2</sup>). Doar masa de <em>repaus</em> este zero.` },
        { t: `Cu γ infinit, masa de mișcare rămâne finită numai dacă <var>m</var><sub>0</sub> este exact zero; „foarte mic” nu ajunge.`, ok: true,
          why: `Energia fotonului e finită, deci <var>m</var> = <var>E</var>/<var>c</var><sup>2</sup> e finită; din <var>m</var><sub>0</sub> = <var>m</var>/γ, cu γ = ∞, rezultă <var>m</var><sub>0</sub> = 0.` },
        { t: `Masa de repaus a fotonului depinde de culoare, deci nu poate fi aceeași valoare mică pentru toți fotonii.`, ok: false,
          why: `Nu depinde: <var>m</var><sub>0</sub> = 0 pentru toți fotonii. Ce depinde de culoare este masa de mișcare, nu cea de repaus.` }
      ],
      explain: `Un factor nenul, oricât de mic, înmulțit cu γ = ∞ dă infinit; doar <var>m</var><sub>0</sub> = 0 e compatibil cu <var>v</var> = <var>c</var> și energie finită.`,
      ref: { id: 'masa', label: 'De ce fotonul nu are masă de repaus' }
    },
    {
      id: 'c10q2', type: 'single',
      scenario: `Două lasere, unul roșu și unul albastru, au exact aceeași putere: fiecare transportă aceeași energie în fiecare secundă.`,
      q: `Care laser trimite mai mulți fotoni pe secundă?`,
      options: [
        { t: `Cel albastru: fotonii lui sunt mai energetici, deci sunt și mai mulți.`, ok: false,
          why: `Raționament inversat. Un foton albastru are mai multă energie, deci ai nevoie de mai puțini ca să aduni aceeași putere.` },
        { t: `Cel roșu: un foton roșu are mai puțină energie, deci îți trebuie mai mulți pe secundă ca să aduni aceeași putere.`, ok: true,
          why: `Puterea = (fotoni pe secundă) × (energia unui foton). La putere egală, energie mai mică pe foton înseamnă mai mulți fotoni.` },
        { t: `Niciunul: aceeași putere înseamnă același număr de fotoni pe secundă.`, ok: false,
          why: `Puterea nu numără fotonii, ci energia lor totală. Dacă energia pe foton diferă, la aceeași putere diferă și numărul de fotoni.` },
        { t: `Nu se poate spune fără să cunoaștem frecvențele exacte ale celor două lasere.`, ok: false,
          why: `Se poate decide calitativ: albastrul are frecvența mai mare, deci energie mai mare pe foton. Valorile exacte nu schimbă sensul concluziei.` }
      ],
      explain: `Puterea unui fascicul este produsul dintre numărul de fotoni pe secundă și energia unui foton; la putere egală, factorii variază invers.`,
      ref: { id: 'intensitate', label: 'Culoare și intensitate' }
    },
    {
      id: 'c10q3', type: 'single',
      scenario: `Un fascicul roșu puternic și unul albastru foarte slab (obținut printr-un filtru) cad, pe rând, pe același detector.`,
      q: `Care afirmație despre fotonii celor două fascicule este corectă?`,
      options: [
        { t: `Un foton albastru are mai multă energie decât un foton roșu, chiar dacă fasciculul albastru este mai slab.`, ok: true,
          why: `Energia unui foton depinde doar de frecvență. Slăbirea fasciculului înseamnă mai puțini fotoni, nu fotoni mai slabi.` },
        { t: `Fotonii fasciculului albastru au energie mică, fiindcă însuși fasciculul este slab și transportă puțină putere.`, ok: false,
          why: `Se confundă puterea fasciculului cu energia unui foton. Fasciculul albastru e slab pentru că are puțini fotoni; fiecare își păstrează energia <var>h</var>ν.` },
        { t: `Fotonii roșii au mai multă energie fiecare, pentru că fasciculul lor transportă mai multă putere.`, ok: false,
          why: `Fasciculul roșu transportă mai multă putere pentru că are mai mulți fotoni, nu fotoni mai energici. Un foton roșu are mai puțină energie decât unul albastru.` },
        { t: `Fotonii albaștri ajung mai târziu la detector, fiindcă un fascicul slab înaintează mai încet.`, ok: false,
          why: `Viteza luminii în vid nu depinde nici de culoare, nici de intensitate: toți fotonii au <var>c</var>.` }
      ],
      explain: `Culoarea fixează energia unui foton; intensitatea doar câți fotoni sosesc. Cele două „butoane” sunt independente.`,
      ref: { id: 'intensitate', label: 'Culoare și intensitate' }
    },
    {
      id: 'c10q4', type: 'single',
      scenario: `Un laser verde trece printr-un filtru gri (neutru) care face fasciculul de zece ori mai slab. Lumina rămâne verde.`,
      q: `Ce s-a schimbat, privind fasciculul ca pe un șuvoi de fotoni?`,
      options: [
        { t: `Energia fiecărui foton a scăzut, de aceea fasciculul pare mai slab.`, ok: false,
          why: `Dacă energia fiecărui foton ar scădea, ar scădea frecvența, deci s-ar schimba culoarea. Lumina a rămas verde: energia pe foton e aceeași.` },
        { t: `Frecvența luminii a scăzut, dar schimbarea nu se vede cu ochiul liber.`, ok: false,
          why: `Cu energia <var>h</var>ν, o frecvență mai mică ar muta verdele spre galben și roșu — s-ar vedea. Culoarea a rămas aceeași, deci și frecvența.` },
        { t: `Prin filtru trec mai puțini fotoni pe secundă; fiecare foton care trece are aceeași energie ca înainte.`, ok: true,
          why: `Filtrul neutru „taie” fotoni, nu îi slăbește. Culoarea (frecvența) și energia unui foton rămân neschimbate.` },
        { t: `Fotonii au rămas aceiași, dar sunt acum mai lenți, de aceea ajung mai rar la detector.`, ok: false,
          why: `Viteza unui foton în vid este mereu <var>c</var>; nu se poate încetini. Fasciculul e mai slab pentru că sosesc mai puțini fotoni.` }
      ],
      explain: `Intensitatea mai mică la aceeași culoare înseamnă mai puțini fotoni pe secundă, nu fotoni „mai mici”.`,
      ref: { id: 'intensitate', label: 'Culoare și intensitate' }
    },
    {
      id: 'c10q5', type: 'single',
      scenario: `Un foton și un electron au exact aceeași energie totală <var>E</var>.`,
      q: `Ce se poate spune despre impulsurile lor?`,
      options: [
        { t: `Au același impuls, pentru că impulsul depinde numai de energia totală.`, ok: false,
          why: `Contează cum se împarte <var>E</var>. În triunghiul <var>E</var><sup>2</sup> = (<var>pc</var>)<sup>2</sup> + (<var>m</var><sub>0</sub><var>c</var><sup>2</sup>)<sup>2</sup>, electronul are o catetă <var>m</var><sub>0</sub><var>c</var><sup>2</sup> nenulă, deci <var>pc</var> mai mică.` },
        { t: `Electronul are impulsul mai mare, fiindcă are masă de repaus și deci „mai mult de împins”.`, ok: false,
          why: `Intuiție clasică (<var>p</var> = <var>mv</var> cu masă mare). Aici o parte din energia electronului rămâne energie de repaus și nu contribuie la impuls.` },
        { t: `Fotonul are impulsul mai mare: nu are energie de repaus, deci <var>pc</var> = <var>E</var>; la electron <var>pc</var> &lt; <var>E</var>.`, ok: true,
          why: `La același <var>E</var>, ipotenuza e aceeași. Fotonul are cateta <var>m</var><sub>0</sub><var>c</var><sup>2</sup> = 0, deci <var>pc</var> egală cu ipotenuza; electronul are <var>pc</var> mai mică.` },
        { t: `Nu se pot compara, fiindcă nu știm vitezele lor.`, ok: false,
          why: `Nu e nevoie de valori: fotonul merge cu <var>c</var>, electronul (are masă de repaus) merge sub <var>c</var>, iar triunghiul decide comparația.` }
      ],
      explain: `La aceeași energie totală, lipsa energiei de repaus face ca fotonul să aibă cel mai mare impuls posibil: <var>E</var> = <var>pc</var>.`,
      ref: { id: 'masa', label: 'De ce fotonul nu are masă de repaus' }
    },
    {
      id: 'c10q6', type: 'single',
      scenario: `Un laborator anunță că a „oprit” un foton în vid: acesta ar sta acum pe loc, păstrându-și energia <var>h</var>ν.`,
      q: `De ce contrazice afirmația teoria din acest capitol?`,
      options: [
        { t: `Un foton oprit ar avea masă de repaus, deci ar începe să cadă.`, ok: false,
          why: `Fotonul nu are masă de repaus. Problema nu e căderea, ci ce rămâne dintr-un foton fără mișcare.` },
        { t: `La oprire, energia fotonului ar crește de la sine, ceea ce încalcă conservarea energiei.`, ok: false,
          why: `Nu energia crește. Problema e că, fără mișcare, nu mai rămâne energie deloc.` },
        { t: `Un foton în repaus ar avea <var>p</var> = 0; din <var>E</var> = <var>pc</var> ar rezulta <var>E</var> = 0, adică nu ar mai rămâne nimic din el.`, ok: true,
          why: `Fotonul nu are energie de repaus (<var>m</var><sub>0</sub> = 0): toată energia lui e legată de mișcare. Fără impuls, nu există foton.` },
        { t: `Nu o contrazice: câmpul electromagnetic poate fi oprit ca orice alt corp, dacă laboratorul e destul de bun.`, ok: false,
          why: `Nu e o chestiune de tehnică. Chiar și în experimentele de „lumină oprită”, fotonul este absorbit de atomi și energia lui rămâne în materie; fotonul nu stă pe loc.` }
      ],
      explain: `Un foton există numai mișcându-se cu <var>c</var>: la <var>p</var> = 0 ar fi și <var>E</var> = 0.`,
      ref: { id: 'masa', label: 'De ce fotonul nu are masă de repaus' }
    },
    {
      id: 'c10q7', type: 'single',
      q: `În vid, un foton are lungimea de undă 450 nm, iar altul 650 nm. Care afirmație este corectă?`,
      options: [
        { t: `Cel de 650 nm are energia mai mare: o undă mai lungă transportă mai multă energie.`, ok: false,
          why: `Intuiția de la valuri nu se aplică aici. Energia fotonului este <var>h</var>ν, iar o lungime de undă mai mare înseamnă frecvență mai mică (λν = <var>c</var>).` },
        { t: `Au aceeași energie, fiindcă amândoi se mișcă cu aceeași viteză, <var>c</var>.`, ok: false,
          why: `Viteza e aceeași, dar la foton energia nu depinde de viteză, ci de frecvență.` },
        { t: `Cel de 450 nm are frecvența mai mare, deci energia și impulsul mai mari.`, ok: true,
          why: `λ mai mică ⟺ ν mai mare (λν = <var>c</var>); apoi <var>E</var> = <var>h</var>ν și <var>p</var> = <var>E</var>/<var>c</var> cresc odată cu ν.` },
        { t: `Energia lor depinde de intensitatea fasciculului din care fac parte, nu de lungimea de undă.`, ok: false,
          why: `Intensitatea numără fotonii, nu stabilește energia unuia. Energia unui foton o fixează frecvența.` }
      ],
      explain: `Lungime de undă mică ⟹ frecvență mare ⟹ foton mai energic și cu impuls mai mare.`,
      ref: { id: 'energia', label: 'Energia unui foton' }
    },
    {
      id: 'c10q8', type: 'single',
      q: `Un foton nu are masă de repaus. De ce are totuși impuls?`,
      options: [
        { t: `Nu are: „impuls” se spune doar pentru corpuri cu masă, iar lumina împinge numai prin încălzire.`, ok: false,
          why: `Fotonul are impuls <var>p</var> = <var>h</var>ν/<var>c</var>; lumina împinge o suprafață și prin transfer de impuls, nu doar prin încălzire.` },
        { t: `Pentru că masa lui de repaus, extrem de mică, este totuși nenulă.`, ok: false,
          why: `Masa de repaus este exact zero. Impulsul nu o cere.` },
        { t: `Impulsul nu cere masă de repaus: din <var>E</var> = <var>mc</var><sup>2</sup> = <var>h</var>ν și <var>p</var> = <var>mc</var> rezultă <var>p</var> = <var>h</var>ν/<var>c</var>.`, ok: true,
          why: `Fotonul are masă de <em>mișcare</em> <var>m</var> = <var>h</var>ν/<var>c</var><sup>2</sup> ≠ 0, iar impulsul este masa de mișcare înmulțită cu viteza.` },
        { t: `Toți fotonii au același impuls, fiindcă au aceeași viteză <var>c</var>.`, ok: false,
          why: `Aceeași viteză, dar nu același impuls: <var>p</var> = <var>h</var>ν/<var>c</var> depinde de frecvență. Un foton albastru are mai mult impuls decât unul roșu.` }
      ],
      explain: `„Fără masă de repaus” nu înseamnă „fără impuls”: <var>p</var> = <var>E</var>/<var>c</var>.`,
      ref: { id: 'impulsul', label: 'Impulsul fotonului' }
    },
    {
      id: 'c10q9', type: 'single',
      scenario: `Un pilot se apropie cu viteză mare de o lampă verde și o vede albastră: pentru el, lumina lămpii are o frecvență mai mare decât pentru un observator aflat în repaus față de lampă.`,
      q: `Ce găsește pilotul pentru fotonii lămpii, comparat cu observatorul în repaus?`,
      options: [
        { t: `O viteză mai mare decât <var>c</var>, fiindcă se adună cu viteza navei, și aceeași energie pe foton.`, ok: false,
          why: `Postulatul I: viteza luminii în vid este <var>c</var> în orice S.R.I. Viteza nu se adună.` },
        { t: `Aceeași viteză <var>c</var> și aceeași energie pe foton: energia unui foton este o proprietate a luminii, nu a observatorului.`, ok: false,
          why: `Energia unui foton este <var>h</var>ν, iar ν se măsoară în sistemul fiecărui observator. Pilotul măsoară o frecvență mai mare, deci energie mai mare.` },
        { t: `Aceeași viteză <var>c</var>, dar o energie mai mare pe foton.`, ok: true,
          why: `Viteza rămâne <var>c</var> (Postulatul I). Frecvența măsurată de pilot e mai mare, deci <var>E</var> = <var>h</var>ν e mai mare. Masa de repaus rămâne 0.` },
        { t: `Fotoni cu masă de repaus nenulă, pentru că, văzuți din mișcare, par mai energetici.`, ok: false,
          why: `Masa de repaus este 0 în orice S.R.I. (o proprietate a fotonului, nu a observatorului). Se schimbă energia măsurată, nu <var>m</var><sub>0</sub>.` }
      ],
      explain: `Frecvența, energia și impulsul unui foton depind de observator; viteza <var>c</var> și <var>m</var><sub>0</sub> = 0 nu.`,
      ref: { id: 'energia', label: 'Energia unui foton' }
    },
    {
      id: 'c10q10', type: 'single',
      q: `Un electron accelerat până când energia lui totală e de mii de ori mai mare decât energia lui de repaus se comportă „aproape ca un foton”. Ce înseamnă asta pentru triunghiul energie–impuls?`,
      options: [
        { t: `Masa de repaus a electronului a scăzut aproape de zero, deci triunghiul s-a turtit.`, ok: false,
          why: `Masa de repaus este o proprietate a corpului și nu se schimbă cu viteza. Cateta <var>m</var><sub>0</sub><var>c</var><sup>2</sup> rămâne aceeași; ce se schimbă e că <var>E</var> și <var>pc</var> au devenit mult mai mari decât ea.` },
        { t: `Cateta <var>m</var><sub>0</sub><var>c</var><sup>2</sup> a crescut odată cu viteza, așa că triunghiul și-a păstrat forma.`, ok: false,
          why: `Energia de repaus <var>m</var><sub>0</sub><var>c</var><sup>2</sup> nu crește cu viteza. Ce crește este energia cinetică, deci <var>E</var> și <var>pc</var>.` },
        { t: `Triunghiul e aproape un segment: <var>E</var> ≈ <var>pc</var>, deși <var>m</var><sub>0</sub> a rămas aceeași.`, ok: true,
          why: `Regim ultrarelativist: cateta constantă <var>m</var><sub>0</sub><var>c</var><sup>2</sup> devine neglijabilă față de celelalte laturi. Electronul tot nu e foton: <var>v</var> &lt; <var>c</var>.` },
        { t: `Electronul a devenit foton: energia lui se poate scrie acum <var>h</var>ν.`, ok: false,
          why: `Un corp cu <var>m</var><sub>0</sub> ≠ 0 nu devine foton prin accelerare. E doar „foarte aproape” de comportamentul unui foton.` }
      ],
      explain: `Ultrarelativist: <var>E</var> ≈ <var>pc</var>. Triunghiul se apropie de cel al fotonului, dar cateta <var>m</var><sub>0</sub><var>c</var><sup>2</sup> nu dispare niciodată complet.`,
      ref: { id: 'masa', label: 'De ce fotonul nu are masă de repaus' }
    },
    {
      id: 'c10q11', type: 'single',
      q: `Compari un foton violet cu unul roșu, ambii din vid. Cum stau masele lor?`,
      options: [
        { t: `Masa de repaus e mai mare pentru cel violet, pentru că are mai multă energie.`, ok: false,
          why: `Masa de repaus este 0 pentru ambii. Energia mai mare duce la o masă de <em>mișcare</em> mai mare, nu la una de repaus.` },
        { t: `Masa de mișcare e zero pentru amândoi, fiindcă nu au masă de repaus.`, ok: false,
          why: `Au masă de mișcare <var>m</var> = <var>h</var>ν/<var>c</var><sup>2</sup> ≠ 0. Doar masa de repaus e zero.` },
        { t: `Masa de repaus e zero pentru amândoi; masa de mișcare e mai mare pentru cel violet.`, ok: true,
          why: `<var>m</var> = <var>h</var>ν/<var>c</var><sup>2</sup> crește cu frecvența, iar violetul are frecvența mai mare. <var>m</var><sub>0</sub> = 0 pentru orice foton.` },
        { t: `Masa de mișcare e mai mare pentru cel roșu, fiindcă lungimea lui de undă e mai mare.`, ok: false,
          why: `Lungimea de undă mare înseamnă frecvență mică, deci energie și masă de mișcare mai mici.` }
      ],
      explain: `Masa de mișcare a unui foton urmează energia (și frecvența); masa de repaus este 0 pentru toți.`,
      ref: { id: 'impulsul', label: 'Impulsul fotonului' }
    },
    {
      id: 'c10q12', type: 'single',
      scenario: `Un detector extrem de sensibil primește lumină verde atât de slabă, încât în fiecare secundă sosesc, în medie, doar câțiva fotoni.`,
      q: `Ce poate primi detectorul de la lumină?`,
      options: [
        { t: `Orice cantitate de energie, oricât de mică: dacă slăbești destul lumina, poate primi și o fracțiune dintr-un foton.`, ok: false,
          why: `Fotonul e cuantă: se primește întreg sau deloc. Slăbirea luminii reduce numărul de fotoni, nu mărimea lor.` },
        { t: `Un număr întreg de fotoni, fiecare cu energia <var>h</var>ν a luminii verzi; lumina slabă înseamnă fotoni rari, nu fotoni „mai mici”.`, ok: true,
          why: `La fiecare interacțiune se schimbă o cuantă întreagă, <var>h</var>ν. Aceeași culoare înseamnă aceeași energie pe foton.` },
        { t: `Fotoni cu atât mai puțin energici, cu cât lumina e mai slabă, dar de aceeași frecvență.`, ok: false,
          why: `Contrazice <var>E</var> = <var>h</var>ν: aceeași frecvență înseamnă aceeași energie pe foton, oricât de slabă e lumina.` },
        { t: `Doar o undă continuă: fotonii apar numai la lumina foarte intensă.`, ok: false,
          why: `Invers: la lumina slabă „granulele” se văd, iar la lumina intensă fotonii sunt atât de mulți încât lumina pare continuă.` }
      ],
      explain: `Energia luminii se schimbă numai în cuante întregi <var>h</var>ν; intensitatea numără cuantele.`,
      ref: { id: 'intro', label: 'Ce este un foton?' }
    },
    {
      id: 'c10q13', type: 'multi',
      q: `Alege toate afirmațiile adevărate despre un foton din vid:`,
      options: [
        { t: `Se mișcă cu viteza <var>c</var> în orice S.R.I.`, ok: true,
          why: `Postulatul I, aplicat luminii.` },
        { t: `Are masa de repaus zero.`, ok: true,
          why: `Cu γ = ∞ și energie finită, singura variantă este <var>m</var><sub>0</sub> = 0.` },
        { t: `Energia și impulsul lui sunt legate prin <var>E</var> = <var>pc</var>.`, ok: true,
          why: `Triunghiul energie–impuls cu <var>m</var><sub>0</sub> = 0: o catetă egală cu ipotenuza.` },
        { t: `Un observator suficient de rapid îl poate vedea în repaus.`, ok: false,
          why: `Niciun S.R.I. nu se mișcă cu <var>c</var> față de altul. Fotonul are viteza <var>c</var> în toate și nu poate fi adus în repaus.` },
        { t: `Nu poate avea impuls, fiindcă nu are masă de repaus.`, ok: false,
          why: `Are impuls <var>p</var> = <var>h</var>ν/<var>c</var>; impulsul vine din masa de mișcare, nu din cea de repaus.` }
      ],
      explain: `Foton: <var>v</var> = <var>c</var>, <var>m</var><sub>0</sub> = 0, <var>E</var> = <var>pc</var> — și nu poate sta pe loc.`,
      ref: { id: 'masa', label: 'De ce fotonul nu are masă de repaus' }
    },
    {
      id: 'c10q14', type: 'multi',
      q: `Frecvența unei radiații se dublează (treci, de exemplu, la o culoare mai albastră). Ce se dublează pentru <strong>fiecare foton</strong> al ei?`,
      options: [
        { t: `Energia fotonului.`, ok: true, why: `<var>E</var> = <var>h</var>ν este proporțională cu ν.` },
        { t: `Impulsul fotonului.`, ok: true, why: `<var>p</var> = <var>E</var>/<var>c</var>: crește la fel ca energia.` },
        { t: `Masa de mișcare a fotonului.`, ok: true, why: `<var>m</var> = <var>E</var>/<var>c</var><sup>2</sup> urmează energia.` },
        { t: `Viteza fotonului în vid.`, ok: false, why: `Rămâne <var>c</var>: nu depinde de frecvență.` },
        { t: `Lungimea de undă a radiației.`, ok: false, why: `Se înjumătățește (λν = <var>c</var>), nu se dublează.` },
        { t: `Masa de repaus a fotonului.`, ok: false, why: `Rămâne 0: 0 dublat tot 0 este.` }
      ],
      explain: `Tot ce ține de energia fotonului crește odată cu ν; viteza și masa de repaus nu se schimbă.`,
      ref: { id: 'energia', label: 'Energia unui foton' }
    },
    {
      id: 'c10q15', type: 'multi',
      scenario: `Un fascicul violet foarte slab (puțini fotoni) și un fascicul roșu puternic (mulți fotoni) cad, pe rând, pe același panou negru.`,
      q: `Alege toate afirmațiile corecte:`,
      options: [
        { t: `Fiecare foton violet are mai multă energie decât fiecare foton roșu.`, ok: true,
          why: `Violetul are frecvența mai mare, deci <var>h</var>ν mai mare.` },
        { t: `Fasciculul roșu poate transporta mai multă energie pe secundă decât cel violet.`, ok: true,
          why: `Puterea = (fotoni/s) × (energia unui foton); numărul mult mai mare de fotoni roșii poate compensa energia lor mai mică.` },
        { t: `Fiecare foton violet îi dă panoului mai mult impuls decât un foton roșu.`, ok: true,
          why: `<var>p</var> = <var>h</var>ν/<var>c</var> crește cu frecvența.` },
        { t: `Fotonii violeți sunt mai rapizi, de aceea sunt mai energici.`, ok: false,
          why: `Toți fotonii au <var>c</var> în vid; energia vine din frecvență, nu din viteză.` },
        { t: `Dacă slăbești și mai mult fasciculul violet, fotonii lui devin mai puțin energici.`, ok: false,
          why: `Slăbirea scade numărul de fotoni, nu energia unuia (frecvența rămâne aceeași).` }
      ],
      explain: `Pe foton decide culoarea; pe fascicul decid, împreună, culoarea și numărul de fotoni.`,
      ref: { id: 'intensitate', label: 'Culoare și intensitate' }
    },
    {
      id: 'c10q16', type: 'multi',
      q: `Care dintre următoarele sunt consecințe ale faptului că fotonul are masa de repaus zero?`,
      options: [
        { t: `Triunghiul energie–impuls se reduce la un segment: <var>E</var> = <var>pc</var>.`, ok: true,
          why: `Cateta <var>m</var><sub>0</sub><var>c</var><sup>2</sup> este zero, deci ipotenuza coincide cu cateta <var>pc</var>.` },
        { t: `Fotonul nu poate fi adus în repaus.`, ok: true,
          why: `La <var>p</var> = 0, <var>E</var> = <var>pc</var> ar da <var>E</var> = 0: nu ar rămâne nimic.` },
        { t: `Orice obiect cu masă de repaus zero se mișcă în vid cu viteza <var>c</var>.`, ok: true,
          why: `Din <var>E</var> = <var>pc</var> și <var>p</var> = <var>mv</var> cu <var>m</var> = <var>E</var>/<var>c</var><sup>2</sup> rezultă <var>v</var> = <var>c</var>.` },
        { t: `Fotonul nu poate transporta energie.`, ok: false,
          why: `Transportă energie <var>h</var>ν. Masa de repaus nu e singura sursă de energie: energia vine și din mișcare.` },
        { t: `Masa de mișcare a fotonului este și ea zero.`, ok: false,
          why: `<var>m</var> = <var>h</var>ν/<var>c</var><sup>2</sup> ≠ 0; doar <var>m</var><sub>0</sub> este zero.` }
      ],
      explain: `<var>m</var><sub>0</sub> = 0 ⟹ <var>E</var> = <var>pc</var> ⟹ <var>v</var> = <var>c</var>, fără posibilitatea de a sta pe loc.`,
      ref: { id: 'masa', label: 'De ce fotonul nu are masă de repaus' }
    },
    {
      id: 'c10q17', type: 'multi',
      scenario: `Doi observatori aflați în mișcare relativă uniformă măsoară același foton venit de la o stea.`,
      q: `Ce valori vor fi, cu siguranță, aceleași pentru amândoi?`,
      options: [
        { t: `Viteza fotonului.`, ok: true, why: `Postulatul I: <var>c</var> în orice S.R.I.` },
        { t: `Masa de repaus a fotonului.`, ok: true, why: `<var>m</var><sub>0</sub> = 0 pentru orice foton, în orice S.R.I.` },
        { t: `Raportul dintre energia și impulsul fotonului.`, ok: true, why: `<var>E</var>/<var>p</var> = <var>c</var> pentru ambii, chiar dacă <var>E</var> și <var>p</var> au valori diferite.` },
        { t: `Frecvența luminii.`, ok: false, why: `Observatori în mișcare relativă măsoară frecvențe diferite (efectul Doppler, capitolul 1).` },
        { t: `Energia fotonului.`, ok: false, why: `Cum <var>E</var> = <var>h</var>ν, iar ν diferă de la un observator la altul, și energia măsurată diferă.` }
      ],
      explain: `Ce rămâne la fel: <var>c</var>, <var>m</var><sub>0</sub> = 0, <var>E</var>/<var>p</var> = <var>c</var>. Ce se schimbă: ν, <var>E</var>, <var>p</var>.`,
      ref: { id: 'energia', label: 'Energia unui foton' }
    },
    {
      id: 'c10q18', type: 'multi',
      q: `Alege toate rapoartele care au <strong>aceeași valoare pentru toți fotonii</strong>, indiferent de culoare:`,
      options: [
        { t: `energia ÷ frecvența`, ok: true, why: `<var>E</var>/ν = <var>h</var>, constanta lui Planck.` },
        { t: `energia ÷ impulsul`, ok: true, why: `<var>E</var>/<var>p</var> = <var>c</var> pentru orice foton.` },
        { t: `impulsul ÷ frecvența`, ok: true, why: `<var>p</var> = <var>h</var>ν/<var>c</var> ⟹ <var>p</var>/ν = <var>h</var>/<var>c</var>, același pentru toți.` },
        { t: `energia ÷ lungimea de undă`, ok: false, why: `<var>E</var> crește cu ν, iar λ scade când ν crește: raportul crește rapid spre albastru (nu e constant).` },
        { t: `frecvența ÷ lungimea de undă`, ok: false, why: `ν crește și λ scade, deci raportul crește spre albastru (nu e constant).` }
      ],
      explain: `Proporționalitățile <var>E</var> ∝ ν, <var>p</var> ∝ ν și λ ∝ 1/ν decid care rapoarte rămân constante.`,
      ref: { id: 'impulsul', label: 'Impulsul fotonului' }
    },
    {
      id: 'c10q19', type: 'spot',
      q: `Raționamentul de mai jos ajunge la o concluzie care contrazice cursul. Care este <strong>primul</strong> pas greșit?`,
      steps: [
        { t: `Fotonul se deplasează în vid cu viteza <var>c</var>, în orice S.R.I. (Postulatul I).` },
        { t: `La <var>v</var> = <var>c</var>, factorul Lorentz γ este infinit.` },
        { t: `Totuși, energia unui foton este finită: <var>E</var> = <var>h</var>ν.` },
        { t: `Cum <var>E</var> = γ<var>m</var><sub>0</sub><var>c</var><sup>2</sup>, rezultă că <var>m</var><sub>0</sub> este foarte mic, dar nenul: un număr foarte mic înmulțit cu infinit poate da o valoare finită.`, bad: true,
          why: `Un număr nenul, oricât de mic, înmulțit cu un γ infinit dă un rezultat infinit — nu unul finit. Singura variantă este <var>m</var><sub>0</sub> = 0 (masa de mișcare <var>m</var> = <var>E</var>/<var>c</var><sup>2</sup> e finită, iar <var>m</var><sub>0</sub> = <var>m</var>/γ = 0).` },
        { t: `Prin urmare, fotonul are o masă de repaus nenulă, dar neglijabilă.` }
      ],
      explain: `Pașii 1–3 sunt corecți; la pasul 4 se ignoră că un factor nenul înmulțit cu γ = ∞ rămâne infinit.`,
      ref: { id: 'masa', label: 'De ce fotonul nu are masă de repaus' }
    },
    {
      id: 'c10q20', type: 'spot',
      q: `Care este <strong>primul</strong> pas greșit în raționamentul următor?`,
      steps: [
        { t: `Fotonul are masa de repaus <var>m</var><sub>0</sub> = 0.` },
        { t: `Impulsul unui corp este <var>p</var> = <var>m</var><sub>0</sub><var>v</var>: masa de repaus înmulțită cu viteza.`, bad: true,
          why: `În relativitate, impulsul este <var>p</var> = γ<var>m</var><sub>0</sub><var>v</var> = <var>mv</var>, cu masa de <em>mișcare</em> <var>m</var>. Pentru foton, <var>m</var> = <var>h</var>ν/<var>c</var><sup>2</sup> nu e zero, deci <var>p</var> = <var>mc</var> = <var>h</var>ν/<var>c</var> ≠ 0.` },
        { t: `Pentru foton rezultă <var>p</var> = 0.` },
        { t: `Atunci lumina nu poate exercita nicio forță de presiune asupra unei suprafețe.` },
        { t: `Dar lumina împinge suprafețele pe care cade, deci teoria ar fi greșită.` }
      ],
      explain: `Impulsul se calculează cu masa de mișcare, nu cu cea de repaus; de aceea fotonul are impuls deși <var>m</var><sub>0</sub> = 0.`,
      ref: { id: 'impulsul', label: 'Impulsul fotonului' }
    },
    {
      id: 'c10q21', type: 'spot',
      q: `Găsește primul pas greșit:`,
      steps: [
        { t: `Două lasere verzi, A și B, au aceeași frecvență; laserul B este de două ori mai intens.` },
        { t: `Aceeași frecvență înseamnă că fotonii celor două lasere au aceeași energie <var>h</var>ν.` },
        { t: `Laserul B transportă de două ori mai multă energie pe secundă.` },
        { t: `Deci fiecare foton al laserului B transportă de două ori mai multă energie decât un foton al laserului A.`, bad: true,
          why: `Mai multă energie pe secundă vine din mai mulți fotoni pe secundă, nu din fotoni mai energici: energia unui foton e fixată de frecvență (pasul 2), iar frecvența e aceeași.` },
        { t: `Prin urmare, energia unui foton depinde de intensitatea luminii.` }
      ],
      explain: `Intensitatea mai mare, la aceeași culoare, înseamnă mai mulți fotoni — nu fotoni mai energici.`,
      ref: { id: 'intensitate', label: 'Culoare și intensitate' }
    }
  ]
});
