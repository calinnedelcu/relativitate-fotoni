/* Capitolul 11 — Efectul fotoelectric extern: rezumat, glosar, bancă de întrebări */
RF.register({
  id: 11,

  summary: [
    { q: `Descrie efectul fotoelectric extern.`,
      a: `Un <strong>foton</strong> care cade pe un <strong>catod</strong> metalic smulge din el un electron, numit <strong>fotoelectron</strong>. Electronii sunt legați de rețeaua metalului (nodurile ei sunt nucleele atomilor). Fotoelectronii care ajung la anod produc un fotocurent în circuit.` },
    { q: `Ce este lucrul mecanic de extracție și cum arată bilanțul energetic?`,
      a: `<var>L</var><sub>ex</sub> este energia minimă pe care trebuie s-o primească un electron ca să părăsească metalul: o <strong>constantă de material</strong>. Un foton își dă <strong>toată</strong> energia <var>h</var>ν unui <strong>singur</strong> electron: <var>E</var><sub>γ</sub> − <var>L</var><sub>ex</sub> = <var>E</var><sub>c</sub>(e⁻), adică <var>h</var>ν − <var>L</var><sub>ex</sub> = <var>E</var><sub>c</sub>. Aceasta este energia cinetică <em>maximă</em>.` },
    { q: `Enunță cele patru legi ale efectului fotoelectric extern.`,
      a: `<ol>
        <li>Efectul se produce abia când energia fotonilor incidenți depășește lucrul mecanic de extracție.</li>
        <li>Un fotoelectron poate fi extras doar de un singur foton, doar dacă <var>h</var>ν ≥ <var>L</var><sub>ex</sub>. Intensitatea luminii nu modifică energia cinetică a unui fotoelectron.</li>
        <li>Energia cinetică a fotoelectronilor variază doar cu frecvența radiației incidente: <var>E</var><sub>c</sub> = <var>h</var>ν − <var>L</var><sub>ex</sub>.</li>
        <li>O tensiune aplicată invers celulei fotoelectrice poate opri efectul: <var>h</var>ν − <var>L</var><sub>ex</sub> = |<var>e</var>|·<var>U</var><sub>s</sub>.</li>
      </ol>` },
    { q: `De ce lumina roșie foarte intensă nu scoate electroni dintr-un metal cu prag ridicat, iar o lumină ultravioletă foarte slabă scoate?`,
      a: `Fiecare foton roșu are <var>h</var>ν &lt; <var>L</var><sub>ex</sub>, iar un electron primește energie de la <strong>un singur foton</strong>: energiile fotonilor nu se adună. Mai mulți fotoni înseamnă doar mai multe încercări eșuate, oricât ai aștepta. Un foton ultraviolet are <var>h</var>ν ≥ <var>L</var><sub>ex</sub> și reușește singur, chiar dacă sosesc puțini.` },
    { q: `Ce schimbă intensitatea luminii și ce schimbă frecvența ei?`,
      a: `<strong>Intensitatea</strong> = câți fotoni pe secundă ⟹ câți fotoelectroni pe secundă ⟹ <strong>fotocurentul</strong>. Nu schimbă energia unui electron. <strong>Frecvența</strong> = energia fiecărui foton ⟹ <var>E</var><sub>c</sub> și <var>U</var><sub>s</sub>; tot ea decide dacă efectul apare (prag).` },
    { q: `Cum se recunoaște din experiment că <var>E</var><sub>γ</sub> = <var>h</var>ν?`,
      a: `Măsurând <var>E</var><sub>c</sub> la mai multe frecvențe, punctele cad pe o <strong>dreaptă</strong>, <var>E</var><sub>c</sub> = <em>a</em>ν + <em>b</em>. Panta <em>a</em> iese <strong>aceeași pentru toate metalele</strong>, egală cu <var>h</var>; ordonata la origine <em>b</em> depinde de metal și este −<var>L</var><sub>ex</sub>. Comparând cu <var>h</var>ν − <var>L</var><sub>ex</sub> rezultă <var>E</var><sub>γ</sub> = <var>h</var>ν. Impulsul fotonului este <var>p</var> = <var>h</var>ν/<var>c</var>.` },
    { q: `Ce este tensiunea de stopare și de ce nu depinde de intensitate?`,
      a: `Este tensiunea aplicată <em>invers</em> (anodul negativ față de catod) care oprește chiar și cei mai rapizi fotoelectroni: <var>h</var>ν − <var>L</var><sub>ex</sub> = |<var>e</var>|·<var>U</var><sub>s</sub>. Ea măsoară <strong>energia unui electron</strong>, nu câți sunt. Intensitatea schimbă doar numărul lor, deci <var>U</var><sub>s</sub> rămâne aceeași; crește doar cu frecvența.` },
    { q: `Ce nu poate explica imaginea clasică, în care lumina e o undă continuă? (Adaos)`,
      a: `Ea ar prevedea electroni mai rapizi la lumină mai intensă, emisie la orice culoare dacă lumina e destul de puternică și o întârziere cât timp se strânge energia. Experimentul arată un <strong>prag</strong>, emisie <strong>instantanee</strong> și <var>E</var><sub>c</sub> <strong>independentă de intensitate</strong> — lucruri care se explică prin fotoni: un foton, un electron.` }
  ],

  glossary: [
    { term: `catod`, def: `Electrodul metalic din tubul fotoelectric pe care cade lumina și din care sunt smulși fotoelectronii.` },
    { term: `anod`, def: `Electrodul care colectează fotoelectronii emiși de catod; legat cu catodul printr-un circuit cu ampermetru.` },
    { term: `fotoelectron`, def: `Electronul smuls dintr-un metal de un foton incident (e⁻).` },
    { term: `efect fotoelectric extern`, def: `Emisia de electroni de către un metal iluminat: un foton incident smulge un electron, care <strong>părăsește</strong> metalul.` },
    { term: `lucru mecanic de extracție`, def: `L<sub>ex</sub>: energia minimă necesară ca un electron să părăsească metalul; constantă de material (diferă de la un metal la altul).` },
    { term: `frecvență de prag`, def: `ν<sub>0</sub> = L<sub>ex</sub>/h: cea mai mică frecvență la care un foton are energia necesară ca să extragă un electron. Sub ea nu apare efectul, oricât de intensă ar fi lumina.` },
    { term: `tensiune de stopare`, def: `U<sub>s</sub>: tensiunea aplicată invers (anodul negativ față de catod) care oprește cei mai rapizi fotoelectroni și anulează fotocurentul: hν − L<sub>ex</sub> = |e|·U<sub>s</sub>.` },
    { term: `fotocurent`, def: `Curentul din circuit produs de fotoelectronii care ajung la anod; proporțional cu numărul de fotoni (intensitatea) când lumina e peste prag.` },
    { term: `constanta lui Planck`, def: `h ≈ 6,62·10⁻³⁴ J·s: constanta care leagă energia unui foton de frecvența luminii, E = hν. În graficul E<sub>c</sub>(ν) este panta dreptei, aceeași pentru toate metalele.` }
  ],

  quiz: [
    {
      id: 'c11q1', type: 'single',
      scenario: `Două fascicule cad, pe rând, pe aceeași placă de potasiu (<var>L</var><sub>ex</sub> ≈ 2,3 eV). Fasciculul A: lumină roșie (<var>h</var>ν ≈ 1,8 eV), foarte intensă — miliarde de fotoni pe secundă. Fasciculul B: lumină albastră (<var>h</var>ν ≈ 3,0 eV), extrem de slabă — doar câțiva fotoni pe secundă.`,
      q: `Ce se observă?`,
      options: [
        { t: `Cu A nu apare niciun fotoelectron; cu B apar, rar dar fără nicio întârziere.`, ok: true,
          why: `Fiecare foton roșu are <var>h</var>ν &lt; <var>L</var><sub>ex</sub>, iar energia fotonilor nu se adună în același electron. Fiecare foton albastru are <var>h</var>ν &gt; <var>L</var><sub>ex</sub> și scoate singur un electron.` },
        { t: `Cu A apar mulți fotoelectroni, fiindcă fasciculul transportă în total multă energie; cu B nu apare nimic, fiindcă energia totală e minusculă.`, ok: false,
          why: `Capcana „energiei totale”. Contează energia unui <em>singur</em> foton, pentru că un electron interacționează cu un singur foton. Energia totală a fasciculului nu ajută.` },
        { t: `Cu ambele apar fotoelectroni: mai mulți cu A (intensitate mare), mai rapizi cu B (frecvență mare).`, ok: false,
          why: `Sub prag nu apare niciun electron, oricât de intens e fasciculul. „Mai mulți” are sens doar pentru lumina care depășește pragul.` },
        { t: `Cu A apar fotoelectroni abia după o așteptare lungă, în care energia se strânge în metal; cu B apar imediat.`, ok: false,
          why: `Așteptarea ar ajuta doar dacă un electron ar putea aduna energia mai multor fotoni. Nu poate: sub prag nu se întâmplă nimic, oricât timp trece.` }
      ],
      explain: `Decide energia unui foton (frecvența), nu câți fotoni sosesc.`,
      ref: { id: 'bilant', label: 'Un foton, un electron' }
    },
    {
      id: 'c11q2', type: 'single',
      scenario: `Un catod de sodiu e iluminat cu lumină violetă, peste prag, iar ampermetrul indică un fotocurent. Apoi, păstrând culoarea, dublezi intensitatea luminii.`,
      q: `Ce se schimbă?`,
      options: [
        { t: `Se dublează fotocurentul de saturație; energia cinetică maximă și tensiunea de stopare rămân aceleași.`, ok: true,
          why: `De două ori mai mulți fotoni pe secundă ⟹ de două ori mai mulți electroni pe secundă. Fiecare foton are aceeași energie, deci fiecare electron pleacă cu aceeași energie.` },
        { t: `Fotocurentul rămâne la fel, dar fiecare fotoelectron devine de două ori mai energic, deoarece primește mai multă lumină.`, ok: false,
          why: `Confuzie între „mai multă lumină” și „fotoni mai energici”. Un electron primește energia unui singur foton, indiferent câți fotoni sosesc.` },
        { t: `Se dublează și fotocurentul, și energia fiecărui fotoelectron, pentru că de două ori mai multă lumină aduce de două ori mai multă energie.`, ok: false,
          why: `Energia în plus se duce în numărul de electroni, nu în energia fiecăruia. Imaginea ondulatorie clasică ar fi prevăzut așa ceva; experimentul nu.` },
        { t: `Fotocurentul se dublează, dar tensiunea de stopare scade, pentru că electronii mai numeroși se frânează între ei.`, ok: false,
          why: `Fotoelectronii nu își „împart” energia. <var>U</var><sub>s</sub> depinde doar de energia unui electron, adică de frecvență și de metal.` }
      ],
      explain: `Intensitatea → câți electroni. Frecvența → cât de energici.`,
      ref: { id: 'legi', label: 'Cele patru legi' }
    },
    {
      id: 'c11q3', type: 'single',
      scenario: `Un laser emite un fascicul cu o putere (energie pe secundă) fixă. Îl înlocuiești cu altul, de aceeași putere, dar cu frecvența de două ori mai mare. Ambele lumini sunt peste pragul catodului folosit.`,
      q: `Cum se compară fotocurenții de saturație (proporția fotonilor care reușesc să scoată un electron e aceeași) și energiile cinetice maxime?`,
      options: [
        { t: `Fotocurentul scade (sosesc mai puțini fotoni pe secundă), iar energia cinetică maximă crește.`, ok: true,
          why: `Putere = (fotoni pe secundă) × (energia unui foton). La putere fixă, un foton de două ori mai energic înseamnă de două ori mai puțini fotoni pe secundă.` },
        { t: `Fotocurentul rămâne același, fiindcă puterea e aceeași, iar energia cinetică maximă crește, fiindcă fotonii sunt mai energici.`, ok: false,
          why: `Aceeași putere nu înseamnă același număr de fotoni. Curentul numără fotoni, nu energie.` },
        { t: `Fotocurentul crește, pentru că fiecare foton aduce mai multă energie, iar energia cinetică maximă crește și ea.`, ok: false,
          why: `Energia mai mare a fotonului ridică <var>E</var><sub>c</sub>, nu numărul de electroni. Curentul scade, deoarece fotonii sunt mai rari.` },
        { t: `Fotocurentul scade, iar energia cinetică maximă rămâne aceeași, fiindcă puterea fasciculului nu s-a schimbat.`, ok: false,
          why: `<var>E</var><sub>c</sub> = <var>h</var>ν − <var>L</var><sub>ex</sub> depinde de frecvență, nu de puterea fasciculului: crește.` }
      ],
      explain: `Nu confunda puterea fasciculului cu numărul de fotoni: puterea este numărul de fotoni pe secundă înmulțit cu energia unui foton.`,
      ref: { id: 'bilant', label: 'Un foton, un electron' }
    },
    {
      id: 'c11q4', type: 'single',
      scenario: `Într-o celulă fotoelectrică măsori tensiunea de stopare <var>U</var><sub>s</sub> cu o lumină de o anumită culoare. Apoi înlocuiești sursa cu una de aceeași culoare, dar de zece ori mai puternică.`,
      q: `Ce observi pe graficul curent–tensiune (tensiunea inversă crește spre stânga)?`,
      options: [
        { t: `Curba urcă mai sus la palier, dar se anulează tot la aceeași tensiune inversă <var>U</var><sub>s</sub>.`, ok: true,
          why: `Mai mulți fotoni ⟹ palier mai înalt. Dar cei mai rapizi electroni au aceeași energie ca înainte, deci același <var>U</var><sub>s</sub> îi oprește.` },
        { t: `Curba urcă mai sus și se anulează la o tensiune inversă mai mare, fiindcă electronii mai numeroși „împing” mai tare spre anod.`, ok: false,
          why: `Electronii nu cooperează: fiecare se oprește sau nu în funcție de propria energie. Numărul lor nu mută punctul de anulare.` },
        { t: `Curba rămâne identică, deoarece o lumină mai puternică nu schimbă nimic din ce se poate măsura în celulă.`, ok: false,
          why: `Se schimbă ceva măsurabil: nivelul curentului (numărul de electroni). Nu se schimbă doar punctul în care curentul se anulează.` },
        { t: `Curba urcă mai sus și se anulează la o tensiune inversă mai mică, deoarece electronii își împart între ei energia primită.`, ok: false,
          why: `Nu există o „energie primită” de împărțit: fiecare electron primește energia unui singur foton, neschimbată.` }
      ],
      explain: `Tensiunea de stopare măsoară energia unui electron, nu numărul lor.`,
      ref: { id: 'stopare', label: 'Tensiunea de stopare' }
    },
    {
      id: 'c11q5', type: 'single',
      scenario: `Doi catozi, X și Y, sunt iluminați cu aceeași lumină, care depășește pragul ambelor metale. Se știe că <var>L</var><sub>ex</sub>(X) &lt; <var>L</var><sub>ex</sub>(Y).`,
      q: `Care afirmație este adevărată?`,
      options: [
        { t: `Fotoelectronii din X au energia cinetică maximă mai mare, deci necesită o tensiune de stopare mai mare.`, ok: true,
          why: `Fotonii au aceeași energie. Din ea, Y „ține” mai mult pentru ieșire, deci rămâne mai puțin pentru mișcare: <var>E</var><sub>c</sub> = <var>h</var>ν − <var>L</var><sub>ex</sub> e mai mare la X.` },
        { t: `Fotoelectronii din Y au energia cinetică maximă mai mare, fiindcă un metal care ține mai tare electronii îi lansează mai puternic.`, ok: false,
          why: `Legătura mai puternică înseamnă o taxă de ieșire mai mare, nu o lansare mai puternică. Se întâmplă exact invers.` },
        { t: `Energia cinetică maximă e aceeași în ambele cazuri, fiindcă fotonii aceleiași lumini au aceeași energie.`, ok: false,
          why: `Energia fotonului e aceeași, dar bilanțul scade <var>L</var><sub>ex</sub>, care diferă: <var>E</var><sub>c</sub> diferă.` },
        { t: `Tensiunea de stopare e aceeași pentru X și Y; diferă doar numărul de fotoelectroni emiși pe secundă.`, ok: false,
          why: `<var>U</var><sub>s</sub> este proporțională cu <var>E</var><sub>c</sub>, care diferă de la un metal la altul la aceeași lumină.` }
      ],
      explain: `Aceeași lumină, alt metal: <var>L</var><sub>ex</sub> mai mic ⟹ <var>E</var><sub>c</sub> mai mare.`,
      ref: { id: 'bilant', label: 'Un foton, un electron' }
    },
    {
      id: 'c11q6', type: 'single',
      q: `Pe un grafic al energiei cinetice maxime în funcție de frecvență apar dreptele a două metale, X și Y. Dreapta lui Y taie axa frecvențelor mai la dreapta decât a lui X. Ce rezultă?`,
      options: [
        { t: `Dreptele sunt paralele (aceeași pantă, h); Y are lucrul de extracție mai mare, deci frecvența de prag mai mare.`, ok: true,
          why: `Panta este <var>h</var> pentru orice metal. Locul unde dreapta taie axa frecvențelor este ν<sub>0</sub> = <var>L</var><sub>ex</sub>/<var>h</var>: mai la dreapta ⟹ <var>L</var><sub>ex</sub> mai mare.` },
        { t: `Dreptele nu sunt paralele: panta lui Y e mai mică, deoarece constanta lui Planck depinde de metalul folosit.`, ok: false,
          why: `<var>h</var> este o constantă universală. Metalul schimbă doar ordonata la origine (−<var>L</var><sub>ex</sub>), nu panta.` },
        { t: `Dreptele sunt paralele, dar Y are lucrul de extracție mai mic, pentru că începe să emită la o frecvență mai mare.`, ok: false,
          why: `Logică inversată: dacă electronii cer o frecvență mai mare ca să iasă, ei sunt legați mai tare, adică <var>L</var><sub>ex</sub> e mai mare.` },
        { t: `Dreptele sunt paralele, iar cele două metale au același lucru de extracție; doar frecvența de prag diferă.`, ok: false,
          why: `ν<sub>0</sub> = <var>L</var><sub>ex</sub>/<var>h</var>: cu aceeași <var>h</var>, praguri diferite înseamnă lucruri de extracție diferite.` }
      ],
      explain: `Panta = <var>h</var> (universală); poziția dreptei = metalul (−<var>L</var><sub>ex</sub>).`,
      ref: { id: 'dreapta', label: 'Dreapta care îl arată pe h' }
    },
    {
      id: 'c11q7', type: 'single',
      scenario: `Un experimentator luminează o placă de zinc cu o lampă infraroșie puternică. Timp de o săptămână ampermetrul nu indică nimic.`,
      q: `De ce nu ajută faptul că așteaptă mult?`,
      options: [
        { t: `Un electron primește energie de la un singur foton; dacă acesta are <var>h</var>ν &lt; <var>L</var><sub>ex</sub>, energia nu se adună peste ce aduc fotonii următori.`, ok: true,
          why: `Fiecare foton infraroșu are prea puțină energie și nu poate scoate electronul; timpul nu schimbă energia unui foton.` },
        { t: `Zincul își consumă electronii liberi în prima oră de iluminare, apoi nu mai are ce să emită, oricât ar mai aștepta.`, ok: false,
          why: `Metalul are electroni foarte mulți, iar problema nu e epuizarea lor: fiecare foton, luat separat, nu are destulă energie.` },
        { t: `Infraroșul este invizibil, deci nu transportă energie utilă și nu poate interacționa cu electronii metalului.`, ok: false,
          why: `Infraroșul transportă energie (încălzește placa). Doar că energia fiecărui foton este sub <var>L</var><sub>ex</sub>.` },
        { t: `Fotonii infraroșii sosiți în același interval se unesc într-un singur foton mai energic, dar numai dacă lampa e destul de puternică.`, ok: false,
          why: `Fotonii nu fuzionează. Un electron este extras de un singur foton incident, deci cu energia lui.` }
      ],
      explain: `Sub prag, timpul și intensitatea nu ajută: contează energia unui singur foton.`,
      ref: { id: 'bilant', label: 'Un foton, un electron' }
    },
    {
      id: 'c11q8', type: 'single',
      q: `De ce energia cinetică <var>h</var>ν − <var>L</var><sub>ex</sub> este numită energia cinetică <em>maximă</em> a fotoelectronilor?`,
      options: [
        { t: `Pentru că <var>L</var><sub>ex</sub> este energia minimă de extracție: electronii legați mai adânc sau care pierd energie pe drum ies cu mai puțin.`, ok: true,
          why: `Electronii cei mai puțin legați plătesc doar <var>L</var><sub>ex</sub> și păstrează tot restul. Ceilalți plătesc mai mult, deci pleacă mai lenți.` },
        { t: `Pentru că fotonul poate ceda electronului doar o parte din <var>h</var>ν, iar restul se pierde mereu ca lumină împrăștiată.`, ok: false,
          why: `În efectul fotoelectric fotonul este absorbit întreg și își dă toată energia. Variația energiilor vine din felul în care sunt legați electronii.` },
        { t: `Pentru că intensitatea mare ar mai adăuga energie peste valoarea <var>h</var>ν − <var>L</var><sub>ex</sub>, care ar fi doar un minim garantat.`, ok: false,
          why: `Exact invers: intensitatea nu adaugă niciodată energie unui electron. Valoarea <var>h</var>ν − <var>L</var><sub>ex</sub> este un maxim, nu un minim.` },
        { t: `Pentru că, după ce părăsește metalul, orice electron este frânat de câmpul anodului până la o fracțiune din energia inițială.`, ok: false,
          why: `Fără tensiune inversă nu există o frână sistematică. „Maxim” se referă la electronii care ies din metal, înainte de orice câmp exterior.` }
      ],
      explain: `<var>L</var><sub>ex</sub> este minimul plătit la ieșire; de aceea <var>h</var>ν − <var>L</var><sub>ex</sub> este maximul care rămâne.`,
      ref: { id: 'bilant', label: 'Un foton, un electron' }
    },
    {
      id: 'c11q9', type: 'single',
      scenario: `Într-o celulă fotoelectrică, la tensiune zero, ampermetrul indică un fotocurent. Aplici o tensiune inversă (anodul devine negativ față de catod), mai mică în modul decât tensiunea de stopare <var>U</var><sub>s</sub>.`,
      q: `Ce indică acum ampermetrul?`,
      options: [
        { t: `Un curent mai mic decât înainte, dar nenul: la anod mai ajung doar fotoelectronii cu energia cinetică suficient de mare.`, ok: true,
          why: `Frâna scade curentul, pentru că electronii mai lenți se întorc. Cei rapizi, cu energie peste |<var>e</var>|·|<var>U</var>|, mai trec. Curentul se anulează abia la <var>U</var><sub>s</sub>.` },
        { t: `Zero: orice tensiune inversă respinge toți electronii, fiindcă aceștia au sarcină negativă, ca anodul devenit negativ.`, ok: false,
          why: `Respingerea frânează electronii, dar nu îi oprește pe cei cu energie mare. Pe toți îi oprește doar o tensiune de cel puțin <var>U</var><sub>s</sub>.` },
        { t: `Același curent: tensiunea inversă nu are efect asupra electronilor deja scoși din metal de lumină.`, ok: false,
          why: `Câmpul dintre electrozi acționează asupra oricărui electron aflat între ei, indiferent de originea lui.` },
        { t: `Un curent mai mare, deoarece electronii frânați petrec mai mult timp în apropierea anodului și sunt numărați de mai multe ori.`, ok: false,
          why: `Un electron care ajunge la anod este numărat o dată. Frâna nu crește numărul celor care ajung, ci îl scade.` }
      ],
      explain: `Tensiunea inversă taie întâi electronii lenți și abia la <var>U</var><sub>s</sub> pe ultimii, cei mai rapizi.`,
      ref: { id: 'stopare', label: 'Tensiunea de stopare' }
    },
    {
      id: 'c11q10', type: 'single',
      q: `Cum explică imaginea cu fotoni faptul că energia cinetică a unui fotoelectron nu depinde de intensitatea luminii?`,
      options: [
        { t: `Intensitatea stabilește câți fotoni sosesc pe secundă, nu energia fiecăruia, iar fiecare electron primește energia unui singur foton.`, ok: true,
          why: `Mai multă lumină = mai mulți fotoni identici. Fiecare își face treaba separat, deci energia unui electron rămâne <var>h</var>ν − <var>L</var><sub>ex</sub>.` },
        { t: `Intensitatea mare face ca fotonii să se „stingă” între ei, așa că energia fiecăruia rămâne neschimbată de la o intensitate la alta.`, ok: false,
          why: `Fotonii nu se influențează unii pe alții în acest fenomen. Nu există nicio „stingere” care să explice constanța.` },
        { t: `Electronii mai numeroși își împart energia primită, așa că în medie fiecare ajunge cu aceeași energie ca înainte de mărirea intensității.`, ok: false,
          why: `Nu există o energie comună de împărțit: fiecare electron este legat de un singur foton, nu de „fasciculul întreg”.` },
        { t: `Energia unui foton depinde de intensitate doar la frecvențe sub prag; peste prag, ea se stabilizează la o valoare constantă pentru fiecare metal.`, ok: false,
          why: `Energia unui foton este <var>h</var>ν la orice intensitate. Constanța lui <var>E</var><sub>c</sub> nu vine dintr-o „stabilizare” a energiei fotonului.` }
      ],
      explain: `Intensitatea numără fotonii; energia fiecăruia este stabilită doar de frecvență.`,
      ref: { id: 'legi', label: 'Cele patru legi' }
    },
    {
      id: 'c11q11', type: 'single',
      q: `Dreptele energiei cinetice maxime în funcție de frecvență, trasate pentru metale diferite, sunt toate paralele. Ce arată acest fapt?`,
      options: [
        { t: `Panta este o constantă universală, h, care leagă energia unui foton de frecvență (<var>E</var> = <var>h</var>ν), indiferent de metal.`, ok: true,
          why: `Aceasta este chiar identificarea lui <var>E</var> = <var>h</var>ν din experiment: aceeași pantă pentru orice material.` },
        { t: `Toate metalele au același lucru de extracție, iar diferențele dintre ele apar doar la intensități foarte mari ale luminii.`, ok: false,
          why: `Dreptele sunt deplasate una față de alta tocmai pentru că <var>L</var><sub>ex</sub> diferă. Intensitatea nu intervine deloc în acest grafic.` },
        { t: `Panta depinde de lumina folosită, nu de materialul catodului, deci nu spune nimic fundamental despre natura luminii.`, ok: false,
          why: `Lumina nu are „o pantă a ei” diferită de la caz la caz. Panta se repetă pentru orice material, de aceea e fundamentală.` },
        { t: `Aceeași pantă arată că energia cinetică a fotoelectronilor nu depinde de frecvență, ci doar de metalul folosit la catod.`, ok: false,
          why: `O pantă nenulă înseamnă tocmai că <var>E</var><sub>c</sub> crește cu frecvența. Metalul decide doar poziția dreptei.` }
      ],
      explain: `Aceeași pantă pentru toate metalele ⟹ legea universală <var>E</var> = <var>h</var>ν.`,
      ref: { id: 'dreapta', label: 'Dreapta care îl arată pe h' }
    },
    {
      id: 'c11q12', type: 'single',
      q: `Ce măsoară, de fapt, tensiunea de stopare <var>U</var><sub>s</sub>?`,
      options: [
        { t: `Energia cinetică maximă a fotoelectronilor, prin |<var>e</var>|<var>U</var><sub>s</sub> = <var>h</var>ν − <var>L</var><sub>ex</sub>, și nu numărul lor.`, ok: true,
          why: `Frâna trebuie doar să oprească cei mai rapizi electroni: valoarea ei spune cât de energici sunt, nu câți sunt.` },
        { t: `Numărul de electroni emiși într-o secundă, fiindcă mai mulți electroni cer o frână mai puternică ca să fie opriți.`, ok: false,
          why: `Electronii sunt opriți unul câte unul, după energia proprie. Numărul lor schimbă nivelul curentului, nu tensiunea de stopare.` },
        { t: `Lucrul de extracție al metalului, indiferent de lumina folosită, deoarece frâna acționează chiar asupra legăturii electron–metal.`, ok: false,
          why: `Frâna acționează asupra electronilor liberi din tub, nu asupra legăturii din metal. De aceea <var>U</var><sub>s</sub> depinde și de frecvență.` },
        { t: `Energia totală a fasciculului incident, fiindcă frâna trebuie să „consume” toată energia sosită pe catod.`, ok: false,
          why: `Energia totală a fasciculului nu intervine: contează doar ce primește un singur electron de la un singur foton.` }
      ],
      explain: `<var>U</var><sub>s</sub> este „riglă” pentru energia unui electron, deci depinde de frecvență și de metal, nu de intensitate.`,
      ref: { id: 'stopare', label: 'Tensiunea de stopare' }
    },
    {
      id: 'c11q13', type: 'multi',
      scenario: `Un catod e iluminat cu lumină de frecvență fixă, peste prag. Intensitatea luminii se dublează.`,
      q: `Alege toate mărimile care cresc:`,
      options: [
        { t: `Numărul de fotoni care cad pe catod într-o secundă.`, ok: true,
          why: `La aceeași culoare, intensitatea înseamnă câți fotoni pe secundă.` },
        { t: `Numărul de fotoelectroni emiși într-o secundă.`, ok: true,
          why: `Un foton scoate un electron: mai mulți fotoni ⟹ mai mulți electroni ⟹ fotocurent mai mare.` },
        { t: `Energia cinetică maximă a unui fotoelectron.`, ok: false,
          why: `Capcana clasică. Ea depinde de frecvență și de <var>L</var><sub>ex</sub>: <var>h</var>ν − <var>L</var><sub>ex</sub>. Intensitatea nu apare.` },
        { t: `Tensiunea de stopare.`, ok: false,
          why: `Este proporțională cu <var>E</var><sub>c</sub>, deci nu se schimbă când se schimbă doar intensitatea.` },
        { t: `Frecvența de prag a metalului.`, ok: false,
          why: `Pragul este o proprietate a metalului (ν<sub>0</sub> = <var>L</var><sub>ex</sub>/<var>h</var>), nu a luminii.` }
      ],
      explain: `Intensitatea mărește numărul de fotoni și de electroni, nu energia unui electron.`,
      ref: { id: 'legi', label: 'Cele patru legi' }
    },
    {
      id: 'c11q14', type: 'multi',
      scenario: `Frecvența luminii crește, rămânând peste pragul catodului, iar numărul de fotoni pe secundă rămâne același.`,
      q: `Alege afirmațiile adevărate:`,
      options: [
        { t: `Energia cinetică maximă a fotoelectronilor crește.`, ok: true,
          why: `Fiecare foton are <var>h</var>ν mai mare, iar <var>L</var><sub>ex</sub> rămâne același: surplusul crește.` },
        { t: `Tensiunea de stopare crește.`, ok: true,
          why: `|<var>e</var>|<var>U</var><sub>s</sub> = <var>h</var>ν − <var>L</var><sub>ex</sub>: mai mare când <var>h</var>ν e mai mare.` },
        { t: `Fotocurentul de saturație rămâne aproximativ același.`, ok: true,
          why: `Numărul de fotoni pe secundă e neschimbat, deci și numărul de electroni.` },
        { t: `Lucrul mecanic de extracție al catodului scade.`, ok: false,
          why: `<var>L</var><sub>ex</sub> este o constantă a metalului; nu depinde de lumina care cade pe el.` },
        { t: `Numărul de fotoelectroni crește, fiindcă fiecare foton are mai multă energie de împărțit.`, ok: false,
          why: `Un foton scoate un singur electron și nu „împarte” nimic. Energia în plus ajunge în energia cinetică a acelui electron.` }
      ],
      explain: `Frecvența mai mare înseamnă electroni mai energici, nu mai mulți.`,
      ref: { id: 'legi', label: 'Cele patru legi' }
    },
    {
      id: 'c11q15', type: 'multi',
      q: `Compari experimentele făcute cu catozi din metale diferite. Alege mărimile care sunt aceleași pentru toate metalele:`,
      options: [
        { t: `Energia unui foton cu o frecvență dată (<var>h</var>ν).`, ok: true,
          why: `Fotonul nu „știe” pe ce metal cade: <var>E</var> = <var>h</var>ν pentru oricare.` },
        { t: `Panta dreptei care dă energia cinetică maximă în funcție de frecvență.`, ok: true,
          why: `Este <var>h</var>, o constantă universală; aceasta e dovada lui <var>E</var> = <var>h</var>ν.` },
        { t: `Lucrul mecanic de extracție.`, ok: false,
          why: `Diferă de la metal la metal: de exemplu, mic la cesiu, mare la cupru.` },
        { t: `Frecvența de prag.`, ok: false,
          why: `ν<sub>0</sub> = <var>L</var><sub>ex</sub>/<var>h</var> urmează <var>L</var><sub>ex</sub>, deci diferă între metale.` },
        { t: `Energia cinetică maximă a fotoelectronilor la aceeași lumină.`, ok: false,
          why: `Aceeași lumină, alt <var>L</var><sub>ex</sub> ⟹ alt surplus: <var>E</var><sub>c</sub> diferă.` }
      ],
      explain: `Universal: <var>h</var> și energia fotonului. Specific metalului: <var>L</var><sub>ex</sub>, ν<sub>0</sub> și tot ce depinde de ele.`,
      ref: { id: 'dreapta', label: 'Dreapta care îl arată pe h' }
    },
    {
      id: 'c11q16', type: 'multi',
      q: `Care dintre observațiile următoare sunt greu de explicat dacă lumina ar fi doar o undă continuă, care cedează energie treptat electronilor?`,
      options: [
        { t: `Sub o anumită frecvență nu apare niciun electron, oricât de intensă ar fi lumina.`, ok: true,
          why: `O undă destul de intensă ar fi trebuit să scoată electroni la orice culoare. Prag nu se poate explica așa.` },
        { t: `Electronii apar practic instantaneu, chiar și la lumină foarte slabă.`, ok: true,
          why: `Imaginea clasică cere un timp de strângere a energiei, cu atât mai lung cu cât lumina e mai slabă.` },
        { t: `Energia cinetică maximă a electronilor nu crește când crește intensitatea.`, ok: true,
          why: `În imaginea clasică, un câmp mai intens ar împinge electronii mai tare.` },
        { t: `Fotocurentul crește când crește intensitatea luminii, peste prag.`, ok: false,
          why: `Aceasta se potrivește cu ambele imagini: mai multă lumină, mai mulți electroni. Nu e un argument pentru fotoni.` },
        { t: `Electronii sunt emiși de suprafața metalului iluminat.`, ok: false,
          why: `Este simplul fapt experimental, pe care nicio imagine nu îl contestă.` }
      ],
      explain: `Pragul, emisia instantanee și independența lui <var>E</var><sub>c</sub> de intensitate cer fotoni.`,
      ref: { id: 'clasic', label: 'De ce nu ajunge lumina ca undă' }
    },
    {
      id: 'c11q17', type: 'multi',
      q: `Alege afirmațiile corecte despre interacțiunea dintre un foton și un electron din catod:`,
      options: [
        { t: `Un fotoelectron este extras de un singur foton incident.`, ok: true,
          why: `Aceasta este a doua lege a efectului fotoelectric extern.` },
        { t: `Fotonul își cedează electronului toată energia <var>h</var>ν.`, ok: true,
          why: `Fotonul este absorbit întreg; din <var>h</var>ν, o parte plătește <var>L</var><sub>ex</sub>, iar restul devine energie cinetică.` },
        { t: `În efectul fotoelectric, fotonul cedează electronului doar o parte din energie, iar restul continuă ca foton mai puțin energic.`, ok: false,
          why: `Așa ceva se întâmplă în alte fenomene. Aici fotonul dispare complet.` },
        { t: `Dacă <var>h</var>ν &lt; <var>L</var><sub>ex</sub>, electronul poate totuși ieși, după ce primește mai mulți fotoni consecutivi.`, ok: false,
          why: `Energiile fotonilor nu se adună în același electron; sub prag, mai mulți fotoni înseamnă doar mai multe încercări eșuate.` }
      ],
      explain: `Regula este simplă și strictă: un foton, un electron, toată energia.`,
      ref: { id: 'bilant', label: 'Un foton, un electron' }
    },
    {
      id: 'c11q18', type: 'multi',
      scenario: `Se trasează curentul în funcție de tensiune pentru două intensități ale aceleiași lumini monocromatice (aceeași frecvență, peste prag).`,
      q: `Alege afirmațiile adevărate despre cele două curbe:`,
      options: [
        { t: `Curba pentru lumina mai intensă are palierul de saturație mai sus.`, ok: true,
          why: `Mai mulți fotoni pe secundă ⟹ mai mulți electroni colectați pe secundă.` },
        { t: `Ambele curbe se anulează la aceeași tensiune inversă <var>U</var><sub>s</sub>.`, ok: true,
          why: `Cei mai rapizi electroni au aceeași energie la ambele intensități.` },
        { t: `Curba pentru lumina mai intensă se anulează la o tensiune inversă mai mare.`, ok: false,
          why: `Aceasta ar însemna electroni mai energici la intensitate mai mare, ceea ce nu se observă.` },
        { t: `La tensiuni pozitive, curentul poate crește peste palier dacă mărim suficient tensiunea.`, ok: false,
          why: `Palierul înseamnă că toți electronii emiși ajung deja la anod. Mai multă tensiune nu mai adaugă electroni.` }
      ],
      explain: `Pe graficul curent–tensiune, intensitatea mută înălțimea palierului; frecvența mută punctul de anulare.`,
      ref: { id: 'stopare', label: 'Tensiunea de stopare' }
    },
    {
      id: 'c11q19', type: 'spot',
      q: `Raționamentul de mai jos duce la o concluzie falsă. Care este <strong>primul</strong> pas greșit?`,
      steps: [
        { t: `Un fascicul de lumină roșie, foarte intens, cade pe un catod de zinc, al cărui prag este în ultraviolet.` },
        { t: `Fasciculul intens conține un număr enorm de fotoni pe secundă, fiecare cu aceeași energie <var>h</var>ν, mai mică decât <var>L</var><sub>ex</sub>.` },
        { t: `Un electron din zinc primește, în câteva secunde, energia mai multor fotoni, iar acestea se adună până depășesc <var>L</var><sub>ex</sub>.`, bad: true,
          why: `Aici e greșeala: un electron este extras de un singur foton, iar energiile fotonilor nu se adună în același electron. Dacă <var>h</var>ν &lt; <var>L</var><sub>ex</sub>, fiecare foton eșuează, oricâți ar sosi.` },
        { t: `Deci electronii vor părăsi zincul, iar ampermetrul va indica un fotocurent.` },
        { t: `Concluzie: o lumină destul de intensă poate înlocui frecvența care lipsește.` }
      ],
      explain: `Pasul 2 e corect; pasul 3 introduce o acumulare de energie între fotoni, care nu există în efectul fotoelectric.`,
      ref: { id: 'bilant', label: 'Un foton, un electron' }
    },
    {
      id: 'c11q20', type: 'spot',
      q: `Care este primul pas greșit în raționamentul de mai jos?`,
      steps: [
        { t: `O celulă fotoelectrică e iluminată cu lumină violetă, peste prag; apoi intensitatea se dublează.` },
        { t: `Sosesc de două ori mai mulți fotoni pe secundă, fiecare cu aceeași energie <var>h</var>ν.` },
        { t: `Se extrag de două ori mai mulți electroni pe secundă, deci fotocurentul de saturație se dublează.` },
        { t: `Cum energia totală primită s-a dublat, fiecare electron pleacă acum cu energia cinetică maximă dublată.`, bad: true,
          why: `Energia totală se împarte între mai mulți electroni: fiecare primește energia unui singur foton, neschimbată, adică <var>h</var>ν − <var>L</var><sub>ex</sub>.` },
        { t: `Prin urmare, și tensiunea de stopare se dublează.` }
      ],
      explain: `Pașii 2 și 3 sunt corecți. Pasul 5 doar repetă greșeala din pasul 4.`,
      ref: { id: 'stopare', label: 'Tensiunea de stopare' }
    },
    {
      id: 'c11q21', type: 'spot',
      q: `Găsește primul pas greșit:`,
      steps: [
        { t: `La un catod de sodiu, energia cinetică maximă a fotoelectronilor, măsurată la mai multe frecvențe, cade pe o dreaptă <var>E</var><sub>c</sub> = <em>a</em>ν + <em>b</em>.` },
        { t: `Repetând măsurătoarea pentru zinc, care are un lucru de extracție mai mare, punctele cad tot pe o dreaptă.` },
        { t: `Cum zincul ține mai tare electronii, dreapta lui trebuie să aibă panta mai mică decât a sodiului.`, bad: true,
          why: `Panta este <var>h</var>, aceeași pentru toate metalele. Un <var>L</var><sub>ex</sub> mai mare mută dreapta spre dreapta (−<var>L</var><sub>ex</sub> mai jos), dar nu o înclină.` },
        { t: `Deci energia unui foton ar depinde de metalul pe care cade.` },
        { t: `Prin urmare, relația <var>E</var> = <var>h</var>ν nu poate fi universală.` }
      ],
      explain: `Metalul alege poziția dreptei (ordonata −<var>L</var><sub>ex</sub>), nu panta.`,
      ref: { id: 'dreapta', label: 'Dreapta care îl arată pe h' }
    }
  ]
});
