/* Capitolul 9 — Energia: E = mc² — rezumat, glosar, bancă de întrebări */
RF.register({
  id: 9,

  summary: [
    { q: `Cât este energia cinetică a unui punct material în TRR?`,
      a: `<var>E</var><sub>c</sub> = (γ − 1)<var>m</var><sub>0</sub><var>c</var>² = <var>mc</var>² − <var>m</var><sub>0</sub><var>c</var>². Este energia pe care corpul o are <em>în plus</em> față de cea din repaus.` },
    { q: `Ce sunt mc² și m₀c²?`,
      a: `<var>mc</var>² este <strong>energia totală</strong> a punctului material care se deplasează cu viteza <var>v</var> (<var>m</var> = γ<var>m</var><sub>0</sub>). <var>m</var><sub>0</sub><var>c</var>² = <var>E</var><sub>0</sub> este <strong>energia de repaus</strong>: energia pe care o are când stă pe loc (<var>v</var> = 0). Deci <var>E</var> = <var>E</var><sub>0</sub> + <var>E</var><sub>c</sub>.` },
    { q: `Cum arată triunghiul energie–impuls?`,
      a: `Triunghi dreptunghic cu ipotenuza <var>E</var> = <var>mc</var>² și catetele <var>pc</var> și <var>m</var><sub>0</sub><var>c</var>² = <var>E</var><sub>0</sub>: <var>E</var> = √[(<var>pc</var>)² + (<var>m</var><sub>0</sub><var>c</var>²)²]. Când corpul accelerează, cateta <var>m</var><sub>0</sub><var>c</var>² rămâne la fel, iar <var>pc</var> și <var>E</var> cresc.` },
    { q: `De ce un corp cu masă de repaus nenulă nu poate atinge c?`,
      a: `Pentru că pe măsură ce <var>v</var> → <var>c</var>, γ crește fără limită, deci și energia totală (și impulsul). Ar fi nevoie de o energie infinită; viteza are un plafon, energia nu.` },
    { q: `Ce se întâmplă pentru v ≪ c și pentru v ≈ c?`,
      a: `Pentru <strong><var>v</var> ≪ <var>c</var></strong>: γ → 1, <var>m</var> → <var>m</var><sub>0</sub>, Lorentz → Galilei, <var>E</var><sub>c</sub> ≈ ½<var>m</var><sub>0</sub><var>v</var>² (mecanica clasică). Pentru <strong><var>v</var> ≈ <var>c</var></strong> corpul este <strong>ultrarelativist</strong>: <var>E</var><sub>c</sub> ≫ <var>E</var><sub>0</sub> și <var>E</var> ≈ <var>pc</var>.` },
    { q: `Ce NU spune E = mc²?`,
      a: `Nu spune că orice masă se transformă în energie oricând, ci că masa este o formă de energie: un corp în repaus are <var>E</var><sub>0</sub> = <var>m</var><sub>0</sub><var>c</var>². Nici că energia cinetică ar fi ½<var>mv</var>² la orice viteză.` }
  ],

  glossary: [
    { term: `energie de repaus`, def: `E₀ = m₀c²: energia pe care un corp o are doar pentru că are masă, chiar când stă pe loc (v = 0). Nu depinde de viteză.` },
    { term: `energie totală`, def: `E = mc² = γm₀c²: energia punctului material care se deplasează cu viteza v. E = E₀ + E_c.` },
    { term: `energie cinetică relativistă`, def: `E_c = (γ − 1)m₀c² = mc² − m₀c²: energia în plus față de cea de repaus. Crește fără limită când v → c.` },
    { term: `ultrarelativist`, def: `Corp cu viteza v ≈ c (comparabilă cu c): energia cinetică este mult mai mare decât cea de repaus, iar E ≈ pc.` },
    { term: `triunghiul energie–impuls`, def: `Triunghi dreptunghic cu ipotenuza E = mc² și catetele pc și m₀c² = E₀, adică E² = (pc)² + (m₀c²)².` },
    { term: `masă de mișcare`, def: `m = γm₀ = m₀/√(1 − v²/c²): masa corpului care se mișcă cu viteza v; crește cu viteza (m₀ = masa de repaus).` }
  ],

  quiz: [
    {
      id: 'c9q1', type: 'single',
      q: `Ce reprezintă <var>E</var><sub>0</sub> = <var>m</var><sub>0</sub><var>c</var>²?`,
      options: [
        { t: `Energia pe care o are un corp doar pentru că are masă, inclusiv când stă pe loc.`, ok: true, why: `Exact: energia de repaus există la <var>v</var> = 0, înainte de orice mișcare.` },
        { t: `Energia cinetică a corpului în repaus, care se adaugă la cea de mișcare când pornește.`, ok: false, why: `Corpul în repaus are energie cinetică zero; <var>E</var><sub>0</sub> este altceva: energia de repaus.` },
        { t: `Energia pe care o capătă corpul când ajunge la viteza luminii.`, ok: false, why: `Nu are legătură cu viteza: <var>E</var><sub>0</sub> nu depinde de <var>v</var>.` },
        { t: `O energie care apare doar în procese nucleare, nu și la corpurile obișnuite.`, ok: false, why: `Orice corp cu masă are <var>E</var><sub>0</sub>; procesele nucleare doar eliberează o mică parte din ea.` }
      ],
      explain: `Masa este o formă de energie: orice corp în repaus are <var>E</var><sub>0</sub> = <var>m</var><sub>0</sub><var>c</var>².`,
      ref: { id: 'repaus', label: 'Energia de repaus' }
    },
    {
      id: 'c9q2', type: 'single',
      scenario: `Un electron este accelerat de la 0,9 <var>c</var> la 0,99 <var>c</var>. Viteza lui crește cu doar vreo 10 %.`,
      q: `Cum se compară energia totală de la sfârșit cu cea de la început?`,
      options: [
        { t: `Este de câteva ori mai mare — mult mai mult decât a crescut viteza.`, ok: true, why: `γ trece de la ≈ 2,3 la ≈ 7: energia se înmulțește cam de trei ori.` },
        { t: `Cu cam 10 % mai mare, la fel ca viteza.`, ok: false, why: `Capcana: energia nu e proporțională cu viteza; aproape de <var>c</var> crește mult mai repede.` },
        { t: `Rămâne aproape la fel, pentru că energia depinde de masă, nu de viteză.`, ok: false, why: `Masa de repaus nu se schimbă, dar <var>E</var> = γ<var>m</var><sub>0</sub><var>c</var>² depinde de γ, deci de viteză.` },
        { t: `Scade, pentru că o parte din energie de repaus se transformă în viteză.`, ok: false, why: `Energia de repaus rămâne constantă; se adaugă energie cinetică.` }
      ],
      explain: `Viteza are plafon (<var>c</var>), energia nu: aproape de <var>c</var>, fiecare „9” în plus înmulțește energia, nu viteza.`,
      ref: { id: 'cinetica', label: 'Energia cinetică' }
    },
    {
      id: 'c9q3', type: 'multi',
      q: `Alege toate afirmațiile adevărate despre energiile unui punct material cu masa de repaus <var>m</var><sub>0</sub>:`,
      options: [
        { t: `Energia totală este suma dintre energia de repaus și cea cinetică.`, ok: true, why: `<var>E</var> = <var>E</var><sub>0</sub> + <var>E</var><sub>c</sub>.` },
        { t: `Energia cinetică este diferența dintre <var>mc</var>² și <var>m</var><sub>0</sub><var>c</var>².`, ok: true, why: `Aceasta este definiția din curs: <var>E</var><sub>c</sub> = <var>mc</var>² − <var>m</var><sub>0</sub><var>c</var>².` },
        { t: `La viteza zero, energia totală este egală cu energia de repaus.`, ok: true, why: `La <var>v</var> = 0: γ = 1, <var>E</var><sub>c</sub> = 0, <var>E</var> = <var>E</var><sub>0</sub>.` },
        { t: `Energia cinetică este ½<var>m</var><sub>0</sub><var>v</var>² la orice viteză.`, ok: false, why: `Doar pentru <var>v</var> ≪ <var>c</var>; altfel formula clasică greșește mult.` },
        { t: `Energia de repaus crește pe măsură ce corpul accelerează.`, ok: false, why: `<var>m</var><sub>0</sub> nu se schimbă cu viteza, deci nici <var>E</var><sub>0</sub>.` }
      ],
      explain: `Energia totală = energia de repaus (constantă) + energia cinetică (care crește cu viteza).`,
      ref: { id: 'cinetica', label: 'Energia cinetică' }
    },
    {
      id: 'c9q4', type: 'spot',
      q: `Care este <strong>primul</strong> pas greșit al raționamentului?`,
      steps: [
        { t: `Un bloc cu masa de repaus <var>m</var><sub>0</sub> stă nemișcat în laborator.` },
        { t: `Energia lui cinetică este zero, fiindcă <var>v</var> = 0.` },
        { t: `Deci blocul nu are nicio energie.`, bad: true, why: `Are energie de repaus <var>E</var><sub>0</sub> = <var>m</var><sub>0</sub><var>c</var>² ≠ 0. Absența energiei cinetice nu înseamnă absența energiei.` },
        { t: `Când îl pornim, el capătă energie cinetică <var>E</var><sub>c</sub>.` },
        { t: `Energia lui totală devine <var>E</var><sub>c</sub>.` }
      ],
      explain: `Energia totală are două părți; la repaus rămâne cea de repaus, nu zero.`,
      ref: { id: 'repaus', label: 'Energia de repaus' }
    },
    {
      id: 'c9q5', type: 'single',
      q: `De ce un corp cu masă de repaus nenulă nu poate atinge viteza <var>c</var>?`,
      options: [
        { t: `Ar necesita o energie totală infinită, deoarece γ crește fără limită când <var>v</var> → <var>c</var>.`, ok: true, why: `<var>E</var> = γ<var>m</var><sub>0</sub><var>c</var>²: pentru <var>v</var> = <var>c</var> energia ar fi infinită.` },
        { t: `Pentru că forțele disponibile în natură sunt prea mici.`, ok: false, why: `Nu e o problemă de tehnologie: chiar cu forță oricât de mare, energia necesară crește fără limită.` },
        { t: `Pentru că la <var>v</var> = <var>c</var> masa de repaus devine zero.`, ok: false, why: `Masa de repaus nu se schimbă cu viteza; zero este pentru foton, care nu poate sta pe loc.` },
        { t: `Pentru că lumina împinge corpul înapoi cu aceeași forță.`, ok: false, why: `Nu există o astfel de „frână” a luminii; limita vine din structura energiei.` }
      ],
      explain: `Viteza are plafon, energia nu: ultimul „9” costă tot mai multă energie și aproape nicio viteză.`,
      ref: { id: 'poveste', label: 'Povestea: de la repaus la aproape de c' }
    },
    {
      id: 'c9q6', type: 'multi',
      scenario: `Se compară formula clasică ½<var>m</var><sub>0</sub><var>v</var>² cu energia cinetică relativistă.`,
      q: `În care situații formula clasică este o aproximație bună?`,
      options: [
        { t: `O mașină care merge cu 100 km/h.`, ok: true, why: `<var>v</var> ≪ <var>c</var>: corecția relativistă este neglijabilă.` },
        { t: `Un satelit care se deplasează cu aproximativ 8 km/s.`, ok: true, why: `Tot <var>v</var> ≪ <var>c</var> (de ordinul 10⁻⁵ <var>c</var>).` },
        { t: `Un proton cu <var>v</var> = 0,99 <var>c</var>.`, ok: false, why: `Aici <var>E</var><sub>c</sub> ≈ 6 <var>E</var><sub>0</sub>; formula clasică dă aproape de zece ori prea puțin.` },
        { t: `Un corp pentru care energia cinetică este de cinci ori energia de repaus.`, ok: false, why: `<var>E</var><sub>c</sub> ≫ <var>E</var><sub>0</sub> înseamnă regim ultrarelativist; clasic nu mai merge.` },
        { t: `O particulă cu <var>v</var> = 0,6 <var>c</var>.`, ok: false, why: `Abaterea este deja mare (zeci de procente); e regim relativist.` }
      ],
      explain: `Criteriul real este raportul <var>E</var><sub>c</sub> / <var>E</var><sub>0</sub>: dacă e foarte mic, mecanica clasică este suficientă.`,
      ref: { id: 'regimuri', label: 'Cele trei regimuri' }
    },
    {
      id: 'c9q7', type: 'single',
      q: `Un corp accelerează de la repaus spre <var>c</var>. Cum se schimbă cele trei laturi ale triunghiului energie–impuls?`,
      options: [
        { t: `<var>m</var><sub>0</sub><var>c</var>² rămâne constantă, <var>pc</var> crește, iar ipotenuza <var>E</var> crește.`, ok: true, why: `Exact: catetele sunt <var>pc</var> (crește) și <var>E</var><sub>0</sub> (fixă); ipotenuza crește odată cu ele.` },
        { t: `Toate trei cresc, pentru că masa corpului crește.`, ok: false, why: `Masa de repaus nu crește; cateta <var>m</var><sub>0</sub><var>c</var>² e fixă.` },
        { t: `<var>pc</var> rămâne constantă, iar <var>m</var><sub>0</sub><var>c</var>² crește.`, ok: false, why: `Invers: <var>m</var><sub>0</sub><var>c</var>² e fixă, iar impulsul crește.` },
        { t: `Ipotenuza rămâne constantă, iar una dintre catete devine tot mai mică.`, ok: false, why: `Ipotenuza (energia totală) crește; ea rămâne constantă doar într-un alt exercițiu, cu energie dată.` }
      ],
      explain: `Triunghiul se „culcă”: cateta verticală fixă, cea orizontală tot mai lungă.`,
      ref: { id: 'triunghi', label: 'Triunghiul energie–impuls' }
    },
    {
      id: 'c9q8', type: 'single',
      scenario: `Un electron are <var>E</var><sub>c</sub> de zece ori mai mare decât <var>E</var><sub>0</sub>.`,
      q: `De ce se poate scrie aproximativ <var>E</var> ≈ <var>pc</var>?`,
      options: [
        { t: `Pentru că (<var>m</var><sub>0</sub><var>c</var>²)² este foarte mic față de (<var>pc</var>)²: cateta verticală abia contează.`, ok: true, why: `Triunghiul este foarte „culcat”: ipotenuza ≈ cateta orizontală.` },
        { t: `Pentru că masa de repaus devine zero la viteze mari.`, ok: false, why: `Masa de repaus nu se schimbă; doar devine neglijabilă în comparație cu energia.` },
        { t: `Pentru că impulsul electronului devine egal cu energia, indiferent de viteză.`, ok: false, why: `E ≈ <var>pc</var> este o aproximare valabilă doar în regimul ultrarelativist.` },
        { t: `Pentru că energia de repaus se transformă integral în impuls.`, ok: false, why: `Nimic nu se „transformă”: <var>E</var><sub>0</sub> rămâne, dar e mică față de total.` }
      ],
      explain: `Ultrarelativist înseamnă <var>E</var><sub>c</sub> ≫ <var>E</var><sub>0</sub>, deci <var>E</var> ≈ <var>pc</var>.`,
      ref: { id: 'regimuri', label: 'Cele trei regimuri' }
    },
    {
      id: 'c9q9', type: 'single',
      q: `Care este formularea corectă a ideii din <var>E</var> = <var>mc</var>²?`,
      options: [
        { t: `Masa este o formă de energie: un corp în repaus are energia <var>m</var><sub>0</sub><var>c</var>², iar la mișcare energia totală este <var>mc</var>².`, ok: true, why: `Aceasta e lectura din curs: <var>E</var><sub>0</sub> = <var>m</var><sub>0</sub><var>c</var>² la repaus, <var>E</var> = <var>mc</var>² în mișcare.` },
        { t: `Orice bucată de materie se poate transforma în energie oricând, pur și simplu.`, ok: false, why: `Formula nu spune că transformarea se face „de la sine”; spune ce echivalent energetic are masa.` },
        { t: `Doar corpurile aflate în mișcare au energie, egală cu masa înmulțită cu viteza luminii.`, ok: false, why: `Corpurile în repaus au <var>E</var><sub>0</sub>, iar formula conține <var>c</var>², nu <var>c</var>.` },
        { t: `Energia unui corp este mereu egală cu energia lui cinetică.`, ok: false, why: `Energia totală include și energia de repaus.` }
      ],
      explain: `Nu „masa devine energie”, ci „masa este una dintre formele energiei”.`,
      ref: { id: 'repaus', label: 'Energia de repaus' }
    },
    {
      id: 'c9q10', type: 'multi',
      q: `O forță constantă împinge un corp tot mai aproape de <var>c</var>. Ce rămâne adevărat?`,
      options: [
        { t: `Forța continuă să facă lucru mecanic, iar energia totală crește.`, ok: true, why: `Lucrul mecanic al forței mărește energia, chiar dacă viteza abia se schimbă.` },
        { t: `Viteza corpului crește tot mai puțin la fiecare împingere.`, ok: true, why: `Plafonul <var>c</var> se apropie; același câștig de energie dă tot mai puțin câștig de viteză.` },
        { t: `Energia cinetică crește fără limită.`, ok: true, why: `<var>E</var><sub>c</sub> = (γ − 1)<var>m</var><sub>0</sub><var>c</var>² → ∞ când <var>v</var> → <var>c</var>.` },
        { t: `Energia de repaus scade, pentru că se consumă pentru accelerare.`, ok: false, why: `<var>E</var><sub>0</sub> este constantă; nu se „consumă”.` },
        { t: `Aproape de <var>c</var>, forța nu mai face lucru mecanic.`, ok: false, why: `Face lucru mecanic mereu; el ajunge în energie cinetică, nu în viteză.` }
      ],
      explain: `Energia nu are plafon; viteza are. De aceea ultimele procente de viteză sunt atât de scumpe.`,
      ref: { id: 'poveste', label: 'Povestea: de la repaus la aproape de c' }
    },
    {
      id: 'c9q11', type: 'spot',
      q: `Care este <strong>primul</strong> pas greșit?`,
      steps: [
        { t: `Un corp pornește din repaus și este accelerat până la viteza <var>v</var>.` },
        { t: `Forța care îl accelerează face lucru mecanic.` },
        { t: `Lucrul mecanic al forței este egal cu energia totală finală <var>mc</var>².`, bad: true, why: `Lucrul mecanic este egal cu energia cinetică <var>E</var><sub>c</sub> = <var>mc</var>² − <var>m</var><sub>0</sub><var>c</var>²; energia de repaus exista deja la început.` },
        { t: `Deci corpul ar primi <var>m</var><sub>0</sub><var>c</var>² chiar și dacă forța ar acționa un timp foarte scurt.` }
      ],
      explain: `Lucrul mecanic construiește doar partea cinetică; energia de repaus nu se „plătește” din nou.`,
      ref: { id: 'cinetica', label: 'Energia cinetică' }
    },
    {
      id: 'c9q12', type: 'single',
      q: `Care dintre mărimile următoare NU depinde de viteza corpului?`,
      options: [
        { t: `Energia de repaus <var>m</var><sub>0</sub><var>c</var>².`, ok: true, why: `<var>m</var><sub>0</sub> este o proprietate a corpului, deci <var>E</var><sub>0</sub> rămâne aceeași.` },
        { t: `Energia cinetică relativistă.`, ok: false, why: `Depinde prin γ: crește cu viteza.` },
        { t: `Impulsul <var>p</var> = γ<var>m</var><sub>0</sub><var>v</var>.`, ok: false, why: `Crește cu viteza (fără limită când <var>v</var> → <var>c</var>).` },
        { t: `Energia totală <var>mc</var>².`, ok: false, why: `<var>m</var> = γ<var>m</var><sub>0</sub> depinde de viteză.` }
      ],
      explain: `Singura constantă din triunghi este cateta <var>m</var><sub>0</sub><var>c</var>².`,
      ref: { id: 'triunghi', label: 'Triunghiul energie–impuls' }
    },
    {
      id: 'c9q13', type: 'multi',
      q: `Alege afirmațiile corecte despre triunghiul energie–impuls:`,
      options: [
        { t: `Ipotenuza este energia totală <var>E</var>.`, ok: true, why: `Aceasta e latura cea mai lungă a triunghiului dreptunghic.` },
        { t: `Pentru un corp în repaus triunghiul se reduce la cateta <var>m</var><sub>0</sub><var>c</var>².`, ok: true, why: `La <var>v</var> = 0, <var>p</var> = 0: rămâne doar cateta verticală.` },
        { t: `Pentru un corp ultrarelativist cateta <var>pc</var> aproape se confundă cu ipotenuza.`, ok: true, why: `Cateta verticală este mică față de <var>E</var>.` },
        { t: `Cateta <var>m</var><sub>0</sub><var>c</var>² crește odată cu viteza.`, ok: false, why: `Este constantă: masa de repaus nu depinde de viteză.` },
        { t: `Cele două catete sunt mereu egale.`, ok: false, why: `Nu e o regulă: cateta <var>m</var><sub>0</sub><var>c</var>² e fixă, iar <var>pc</var> variază cu viteza, deci se potrivesc cel mult într-un singur punct.` }
      ],
      explain: `Forma triunghiului îți spune imediat în ce regim ești: vertical = repaus, culcat = ultrarelativist.`,
      ref: { id: 'triunghi', label: 'Triunghiul energie–impuls' }
    },
    {
      id: 'c9q14', type: 'single',
      scenario: `Două corpuri identice (aceeași masă de repaus) sunt accelerate: unul până la 0,5 <var>c</var>, celălalt până la 0,99 <var>c</var>.`,
      q: `Care afirmație despre energiile lor de repaus este corectă?`,
      options: [
        { t: `Sunt egale: depind doar de masa de repaus, nu de viteză.`, ok: true, why: `<var>E</var><sub>0</sub> = <var>m</var><sub>0</sub><var>c</var>² este aceeași pentru ambele.` },
        { t: `Cel mai rapid are energie de repaus mai mare, pentru că masa lui de mișcare e mai mare.`, ok: false, why: `Masa de mișcare intră în energia <em>totală</em>, nu în cea de repaus.` },
        { t: `Cel mai rapid are energie de repaus mai mică, pentru că a „cheltuit” din ea.`, ok: false, why: `Nu există consum: <var>E</var><sub>0</sub> rămâne neschimbată.` },
        { t: `Nu se pot compara, pentru că corpurile se mișcă.`, ok: false, why: `Energia de repaus se definește tocmai independent de mișcare.` }
      ],
      explain: `Ce diferă între corpuri este energia cinetică, nu cea de repaus.`,
      ref: { id: 'repaus', label: 'Energia de repaus' }
    },
    {
      id: 'c9q15', type: 'single',
      q: `Pe graficul energiei cinetice, curba clasică (½<var>m</var><sub>0</sub><var>v</var>²) și cea relativistă diferă astfel:`,
      options: [
        { t: `Se suprapun la viteze mici, apoi cea relativistă urcă tot mai abrupt și crește fără limită când <var>v</var> → <var>c</var>.`, ok: true, why: `Clasic ajunge la <var>v</var> = <var>c</var> doar la 0,5 <var>E</var><sub>0</sub>; relativist tinde la infinit.` },
        { t: `Sunt identice pe tot intervalul; diferența apare doar la masă.`, ok: false, why: `Diferă puternic la viteze mari.` },
        { t: `Cea relativistă rămâne sub cea clasică, pentru că viteza este limitată la <var>c</var>.`, ok: false, why: `Invers: este peste ea; plafonul vitezei nu limitează energia.` },
        { t: `Cea clasică crește fără limită, cea relativistă se oprește la <var>c</var>.`, ok: false, why: `Se inversează rolurile: cea relativistă nu se oprește.` }
      ],
      explain: `Mecanica clasică este cazul limită <var>v</var> ≪ <var>c</var> al celei relativiste.`,
      ref: { id: 'regimuri', label: 'Cele trei regimuri' }
    },
    {
      id: 'c9q16', type: 'single',
      q: `Un coleg spune: „la viteze mici energia cinetică este ½<var>m</var><sub>0</sub><var>v</var>², deci energia totală este tot ½<var>m</var><sub>0</sub><var>v</var>².” Ce e greșit?`,
      options: [
        { t: `Energia totală include și energia de repaus <var>E</var><sub>0</sub>, uriașă față de ½<var>m</var><sub>0</sub><var>v</var>².`, ok: true, why: `<var>E</var> = <var>E</var><sub>0</sub> + <var>E</var><sub>c</sub>; la viteze mici <var>E</var> ≈ <var>E</var><sub>0</sub>.` },
        { t: `Nimic: formula clasică dă energia totală la viteze mici.`, ok: false, why: `Dă doar partea cinetică.` },
        { t: `Formula clasică nu este valabilă la viteze mici.`, ok: false, why: `Tocmai acolo este valabilă (pentru energia cinetică).` },
        { t: `Energia totală este zero la viteze mici.`, ok: false, why: `Este aproximativ <var>E</var><sub>0</sub>, nu zero.` }
      ],
      explain: `Nu confunda „energia cinetică” cu „energia totală”: la viteze mici prima e o fâșie subțire peste a doua.`,
      ref: { id: 'regimuri', label: 'Nu amesteca energiile' }
    }
  ]
});
