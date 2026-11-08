/* Problemele de calcul (generatoare cu numere aleatoare). Itemii A/F, alegere, combinații și răspunsuri scurte
   sunt pe capitole în probleme-cap.js. */
(function () {
  'use strict';
  var RF = window.RF;
  var P = RF.problems = RF.problems || {};

  /* ============================ 5. CALCULE ============================ */
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function gam(b) { return 1 / Math.sqrt(1 - b * b); }
  function n(x, d) { return RF.fmt.n(x, d); }
  var HEV = 4.1375e-3;            // eV per THz  (h/e = 4,1375·10^-15 eV·s)

  P.calc = [
    { id: 'contractie', title: 'Nava: factorul Lorentz și lungimea măsurată',
      gen: function () {
        var v = pick([0.6, 0.8, 0.5, 0.9]), L0 = pick([10, 12, 15, 20, 24, 30, 50, 100]), g = gam(v), L = L0 / g;
        return {
          text: 'O navă se deplasează rectiliniu și uniform cu viteza <var>v</var> = ' + n(v, 1) + '·<var>c</var> față de Pământ. În sistemul propriu al navei, lungimea ei este <var>L</var><sub>0</sub> = ' + L0 + ' m. Calculați: a) factorul Lorentz γ; b) lungimea navei măsurată de un observator terestru, pe direcția mișcării.',
          parts: [{ k: 'γ', ans: g, tol: 0.01, d: 3 }, { k: 'L (m)', ans: L, tol: 0.01, d: 2 }],
          steps: ['γ = 1/√(1 − <var>v</var>²/<var>c</var>²) = 1/√(1 − ' + n(v * v, 2) + ') = 1/√' + n(1 - v * v, 2) + ' = 1/' + n(Math.sqrt(1 - v * v), 3) + ' = <b>' + n(g, 3) + '</b>.',
            'Lungimea proprie <var>L</var><sub>0</sub> (nava stă pe loc în sistemul ei) se <b>împarte</b> la γ: <var>L</var> = <var>L</var><sub>0</sub>/γ = ' + L0 + '/' + n(g, 3) + ' = <b>' + n(L, 2) + ' m</b>.',
            'Verificare: lungimea măsurată trebuie să fie mai mică decât cea proprie (' + n(L, 2) + ' < ' + L0 + ').'] };
      } },
    { id: 'dilatare', title: 'Ceasul în mișcare: durata măsurată',
      gen: function () {
        var v = pick([0.6, 0.8, 0.5, 0.9]), t0 = pick([2, 5, 10, 20, 30]), g = gam(v), t = g * t0;
        return {
          text: 'Un ceas aflat într-o rachetă care se mișcă cu <var>v</var> = ' + n(v, 1) + '·<var>c</var> față de Pământ măsoară între două evenimente petrecute în rachetă durata Δ<var>t</var><sub>0</sub> = ' + t0 + ' s. a) Calculați γ. b) Ce durată măsoară între aceleași evenimente un observator de pe Pământ?',
          parts: [{ k: 'γ', ans: g, tol: 0.01, d: 3 }, { k: 'Δt (s)', ans: t, tol: 0.01, d: 2 }],
          steps: ['γ = 1/√(1 − ' + n(v * v, 2) + ') = <b>' + n(g, 3) + '</b>.',
            'Evenimentele au loc în același loc în rachetă, deci Δ<var>t</var><sub>0</sub> = ' + t0 + ' s este durata <b>proprie</b>. Durata proprie se <b>înmulțește</b> cu γ: Δ<var>t</var> = γΔ<var>t</var><sub>0</sub> = ' + n(g, 3) + '·' + t0 + ' = <b>' + n(t, 2) + ' s</b>.',
            'Verificare: durata măsurată pe Pământ e mai mare decât cea proprie.'] };
      } },
    { id: 'fotoelectric', title: 'Efect fotoelectric: se produce? energia cinetică și tensiunea de stopare',
      gen: function () {
        var m = pick([['cesiu', 2.1], ['potasiu', 2.3], ['sodiu', 2.4], ['zinc', 4.3], ['cupru', 4.7], ['un metal oarecare', 2.0]]);
        var nu = pick([450, 500, 550, 600, 650, 700, 800, 900, 1000, 1100, 1200]);
        var E = nu * HEV, ok = E >= m[1], Ec = ok ? E - m[1] : 0;
        return {
          text: 'Catodul unei celule fotoelectrice (' + m[0] + ') are lucrul mecanic de extracție <var>L</var><sub>ex</sub> = ' + n(m[1], 1) + ' eV și este iluminat cu radiație de frecvență ν = ' + nu + ' THz. (1 eV = |<var>e</var>|·1 V ≈ 1,6·10<sup>−19</sup> J; <var>h</var> ≈ 6,62·10<sup>−34</sup> J·s; 1 THz = 10<sup>12</sup> Hz.) a) Calculați energia unui foton, în eV. b) Se produce efect fotoelectric? c) Dacă da, cât este energia cinetică maximă a fotoelectronilor (în eV)? (Dacă nu, scrieți 0.) d) Cât este tensiunea de stopare (în V)?',
          parts: [{ k: 'hν (eV)', ans: E, tol: 0.015, d: 2 }, { k: 'efect?', yn: ok }, { k: 'E_c (eV)', ans: Ec, tol: 0.03, abs: 0.03, d: 2 }, { k: 'U_s (V)', ans: Ec, tol: 0.03, abs: 0.03, d: 2 }],
          steps: ['hν = 6,62·10<sup>−34</sup>·' + nu + '·10<sup>12</sup> = ' + n(6.62e-34 * nu * 1e12 * 1e19, 2) + '·10<sup>−19</sup> J = (÷ 1,6·10<sup>−19</sup>) = <b>' + n(E, 2) + ' eV</b>. (Scurtătură: hν[eV] ≈ 0,00414·ν[THz].)',
            'Se compară cu <var>L</var><sub>ex</sub>: ' + n(E, 2) + (ok ? ' ≥ ' : ' < ') + n(m[1], 1) + ' ⇒ <b>' + (ok ? 'DA, efectul se produce' : 'NU, efectul nu se produce (fotonii au prea puțină energie, oricât de intensă ar fi lumina)') + '</b>.',
            ok ? '<var>E</var><sub>c</sub> = hν − <var>L</var><sub>ex</sub> = ' + n(E, 2) + ' − ' + n(m[1], 1) + ' = <b>' + n(Ec, 2) + ' eV</b>.' : 'Fără efect: <var>E</var><sub>c</sub> = <b>0</b>.',
            ok ? '|<var>e</var>|·<var>U</var><sub>s</sub> = <var>E</var><sub>c</sub> ⇒ <var>U</var><sub>s</sub> = <b>' + n(Ec, 2) + ' V</b> (în volți, numeric egală cu energia în eV).' : 'Fără fotoelectroni nu e nevoie de tensiune de stopare: <b>0 V</b>.'] };
      } },
    { id: 'prag', title: 'Frecvența și lungimea de undă de prag',
      gen: function () {
        var m = pick([['cesiu', 2.1], ['potasiu', 2.3], ['sodiu', 2.4], ['zinc', 4.3], ['cupru', 4.7]]), L = m[1], nu0 = L / HEV, lam = 1240 / L;
        return {
          text: 'Pentru ' + m[0] + ', <var>L</var><sub>ex</sub> = ' + n(L, 1) + ' eV. Calculați: a) frecvența de prag ν<sub>0</sub> (în THz); b) lungimea de undă de prag λ<sub>prag</sub> (în nm). (Folosiți <var>h</var> ≈ 4,14·10<sup>−15</sup> eV·s și <var>hc</var> ≈ 1240 eV·nm.)',
          parts: [{ k: 'ν₀ (THz)', ans: nu0, tol: 0.015, d: 0 }, { k: 'λ_prag (nm)', ans: lam, tol: 0.015, d: 0 }],
          steps: ['ν<sub>0</sub> = <var>L</var><sub>ex</sub>/<var>h</var> = ' + n(L, 1) + ' eV / 4,14·10<sup>−15</sup> eV·s = <b>' + n(nu0, 0) + ' THz</b>.',
            'λ<sub>prag</sub> = <var>hc</var>/<var>L</var><sub>ex</sub> = 1240/' + n(L, 1) + ' = <b>' + n(lam, 0) + ' nm</b>.',
            'Efect fotoelectric apare pentru ν ≥ ν<sub>0</sub> (adică λ ≤ λ<sub>prag</sub>).'] };
      } },
    { id: 'foton', title: 'Fotonul: energie, frecvență și impuls',
      gen: function () {
        var lam = pick([400, 450, 500, 550, 600, 650, 700]), E = 1240 / lam, nu = 3e5 / lam, p = 662 / lam;
        return {
          text: 'Un foton are lungimea de undă λ = ' + lam + ' nm. Calculați: a) energia lui (în eV, cu <var>hc</var> ≈ 1240 eV·nm); b) frecvența (în THz, cu <var>c</var> = 3·10<sup>8</sup> m/s); c) impulsul (în 10<sup>−27</sup> kg·m/s, cu <var>p</var> = <var>h</var>/λ și <var>h</var> ≈ 6,62·10<sup>−34</sup> J·s).',
          parts: [{ k: 'E (eV)', ans: E, tol: 0.015, d: 2 }, { k: 'ν (THz)', ans: nu, tol: 0.015, d: 0 }, { k: 'p (10⁻²⁷)', ans: p, tol: 0.02, d: 2 }],
          steps: ['<var>E</var> = <var>hc</var>/λ = 1240/' + lam + ' = <b>' + n(E, 2) + ' eV</b>.',
            'ν = <var>c</var>/λ = 3·10<sup>8</sup>/(' + lam + '·10<sup>−9</sup>) = <b>' + n(nu, 0) + ' THz</b> (' + n(nu / 1000, 3) + '·10<sup>15</sup> Hz).',
            '<var>p</var> = <var>h</var>/λ = 6,62·10<sup>−34</sup>/(' + lam + '·10<sup>−9</sup>) = <b>' + n(p, 2) + '·10<sup>−27</sup> kg·m/s</b>.'] };
      } },
    { id: 'compunere', title: 'Compunerea relativistă a vitezelor',
      gen: function () {
        var v = pick([0.5, 0.6, 0.8, 0.9]), u1 = pick([0.5, 0.6, 0.8, 0.9]), u = (u1 + v) / (1 + u1 * v);
        return {
          text: 'Un sistem S′ se deplasează cu viteza <var>v</var> = ' + n(v, 1) + '·<var>c</var> față de S, în sensul axei <var>x</var>. Un proiectil este lansat în S′ în același sens, cu viteza <var>u</var>′ = ' + n(u1, 1) + '·<var>c</var> față de S′. Calculați viteza proiectilului față de S, în unități de <var>c</var>. (Ce ar da adunarea simplă?)',
          parts: [{ k: 'u (în c)', ans: u, tol: 0.005, d: 3 }],
          steps: ['<var>u</var> = (<var>u</var>′ + <var>v</var>)/(1 + <var>vu</var>′/<var>c</var>²) = (' + n(u1, 1) + ' + ' + n(v, 1) + ')<var>c</var>/(1 + ' + n(v * u1, 2) + ') = ' + n(u1 + v, 1) + '<var>c</var>/' + n(1 + v * u1, 2) + ' = <b>' + n(u, 3) + '<var>c</var></b>.',
            'Adunarea simplă ar fi dat ' + n(u1 + v, 1) + '<var>c</var>' + (u1 + v > 1 ? ' (> c, imposibil)' : '') + '; rezultatul relativist rămâne sub <var>c</var>.'] };
      } },
    { id: 'energie', title: 'Energia relativistă la o viteză dată',
      gen: function () {
        var v = pick([0.6, 0.8, 0.9]), g = gam(v), Ec = g - 1, E = g, p = g * v;
        return {
          text: 'Un corp cu masa de repaus <var>m</var><sub>0</sub> se mișcă cu <var>v</var> = ' + n(v, 1) + '·<var>c</var>. Exprimați: a) γ; b) energia cinetică în unități de <var>m</var><sub>0</sub><var>c</var>²; c) energia totală în unități de <var>m</var><sub>0</sub><var>c</var>²; d) impulsul în unități de <var>m</var><sub>0</sub><var>c</var>.',
          parts: [{ k: 'γ', ans: g, tol: 0.01, d: 3 }, { k: 'E_c/m₀c²', ans: Ec, tol: 0.015, d: 3 }, { k: 'E/m₀c²', ans: E, tol: 0.01, d: 3 }, { k: 'p/m₀c', ans: p, tol: 0.015, d: 3 }],
          steps: ['γ = 1/√(1 − ' + n(v * v, 2) + ') = <b>' + n(g, 3) + '</b>.',
            '<var>E</var><sub>c</sub> = (γ − 1)<var>m</var><sub>0</sub><var>c</var>² = (' + n(g, 3) + ' − 1) = <b>' + n(Ec, 3) + '</b> <var>m</var><sub>0</sub><var>c</var>².',
            '<var>E</var> = γ<var>m</var><sub>0</sub><var>c</var>² = <b>' + n(E, 3) + '</b> <var>m</var><sub>0</sub><var>c</var>² (= <var>E</var><sub>0</sub> + <var>E</var><sub>c</sub>).',
            '<var>p</var> = γ<var>m</var><sub>0</sub><var>v</var> = ' + n(g, 3) + '·' + n(v, 1) + ' = <b>' + n(p, 3) + '</b> <var>m</var><sub>0</sub><var>c</var>. Verificare: <var>E</var>² = (<var>pc</var>)² + (<var>m</var><sub>0</sub><var>c</var>²)² ⇒ ' + n(E * E, 3) + ' = ' + n(p * p, 3) + ' + 1.'] };
      } },
    { id: 'interval', title: 'Intervalul dintre două evenimente',
      gen: function () {
        var dx, dt;
        do { dx = 1 + Math.floor(Math.random() * 6); dt = 1 + Math.floor(Math.random() * 6); } while (dx === dt && Math.random() < 0.7);
        var s2 = dx * dx - dt * dt, kind = s2 < 0 ? 0 : s2 > 0 ? 1 : 2;
        return {
          text: 'Două evenimente au, într-un S.R.I., separarea spațială Δ<var>x</var> = ' + dx + ' ani-lumină și separarea temporală Δ<var>t</var> = ' + dt + ' ani (Δ<var>y</var> = Δ<var>z</var> = 0). Cu <var>c</var> = 1 an-lumină/an: a) calculați (Δ<var>s</var>)² (în ani-lumină²); b) stabiliți felul intervalului.',
          parts: [{ k: '(Δs)²', ans: s2, tol: 0.001, abs: 0.01, d: 0 }, { k: 'felul', kind: kind }],
          steps: ['(Δ<var>s</var>)² = (Δ<var>x</var>)² − (<var>c</var>Δ<var>t</var>)² = ' + dx + '² − ' + dt + '² = ' + (dx * dx) + ' − ' + (dt * dt) + ' = <b>' + s2 + '</b>.',
            kind === 0 ? '(Δ<var>s</var>)² < 0 ⇒ interval de <b>tip timp</b>: evenimentele pot fi legate cauză-efect, ordinea e aceeași în orice S.R.I.' : kind === 1 ? '(Δ<var>s</var>)² > 0 ⇒ interval de <b>tip spațiu</b>: niciun semnal nu le poate lega, ordinea poate diferi.' : '(Δ<var>s</var>)² = 0 ⇒ evenimente pe drumul aceluiași impuls de <b>lumină</b>.',
            'Valoarea lui (Δ<var>s</var>)² este aceeași în orice S.R.I.'] };
      } },
    { id: 'viteza', title: 'Viteza la care energia cinetică egalează energia de repaus',
      gen: function () {
        var k = pick([1, 2, 3]), g = 1 + k, v = Math.sqrt(1 - 1 / (g * g));
        return {
          text: 'La ce viteză (în unități de <var>c</var>) energia cinetică a unui corp devine ' + (k === 1 ? 'egală cu' : 'de ' + k + ' ori mai mare decât') + ' energia lui de repaus?',
          parts: [{ k: 'v (în c)', ans: v, tol: 0.005, d: 3 }],
          steps: ['<var>E</var><sub>c</sub> = ' + (k === 1 ? '' : k + '·') + '<var>m</var><sub>0</sub><var>c</var>² ⇒ (γ − 1) = ' + k + ' ⇒ γ = ' + g + '.',
            '<var>v</var> = <var>c</var>·√(1 − 1/γ²) = <var>c</var>·√(1 − 1/' + (g * g) + ') = <b>' + n(v, 3) + '<var>c</var></b>.'] };
      } },
    { id: 'lorentz', title: 'Transformarea coordonatelor unui eveniment (Lorentz)',
      gen: function () {
        var v = pick([0.6, 0.8, 0.5]), x = pick([3, 5, 10]), t = pick([1, 2, 4]), g = gam(v), xp = g * (x - v * t), tp = g * (t - v * x);
        return {
          text: 'Un eveniment are, în sistemul S, coordonatele <var>x</var> = ' + x + ' ani-lumină și <var>t</var> = ' + t + ' ani (cu <var>c</var> = 1 an-lumină/an). Sistemul S′ se mișcă cu viteza <var>v</var> = ' + n(v, 1) + '·<var>c</var> față de S, în sensul axei <var>x</var> (axele paralele, originile coincid la <var>t</var> = <var>t</var>′ = 0). Calculați: a) γ; b) <var>x</var>′ (în ani-lumină); c) <var>t</var>′ (în ani).',
          parts: [{ k: 'γ', ans: g, tol: 0.01, d: 3 }, { k: "x′ (al)", ans: xp, tol: 0.01, abs: 0.02, d: 2 }, { k: "t′ (ani)", ans: tp, tol: 0.01, abs: 0.02, d: 2 }],
          steps: ['γ = 1/√(1 − ' + n(v * v, 2) + ') = <b>' + n(g, 3) + '</b>.',
            '<var>x</var>′ = γ(<var>x</var> − <var>vt</var>) = ' + n(g, 3) + '·(' + x + ' − ' + n(v, 1) + '·' + t + ') = ' + n(g, 3) + '·' + n(x - v * t, 2) + ' = <b>' + n(xp, 2) + ' ani-lumină</b>.',
            '<var>t</var>′ = γ(<var>t</var> − <var>vx</var>/<var>c</var>²) = ' + n(g, 3) + '·(' + t + ' − ' + n(v, 1) + '·' + x + ') = ' + n(g, 3) + '·' + n(t - v * x, 2) + ' = <b>' + n(tp, 2) + ' ani</b>.',
            'Verificare: (Δ<var>s</var>)² se păstrează: ' + n(x * x - t * t, 2) + ' = ' + n(xp * xp - tp * tp, 2) + '.'] };
      } },
    { id: 'simult', title: 'Simultaneitatea relativă: decalajul de timp în S′',
      gen: function () {
        var v = pick([0.6, 0.8, 0.5]), dx = pick([2, 5, 10]), g = gam(v), dtp = -g * v * dx;
        return {
          text: 'În sistemul S două evenimente sunt <b>simultane</b> (Δ<var>t</var> = 0) și au loc în locuri diferite pe axa <var>x</var>, la distanța Δ<var>x</var> = ' + dx + ' ani-lumină. Sistemul S′ se mișcă cu <var>v</var> = ' + n(v, 1) + '·<var>c</var> față de S, în sensul axei <var>x</var>. Calculați: a) γ; b) decalajul de timp Δ<var>t</var>′ dintre evenimente în S′ (în ani, cu semn; cu <var>c</var> = 1 al/an). Sunt ele simultane în S′?',
          parts: [{ k: 'γ', ans: g, tol: 0.01, d: 3 }, { k: "Δt′ (ani)", ans: dtp, tol: 0.01, abs: 0.02, d: 2 }],
          steps: ['γ = 1/√(1 − ' + n(v * v, 2) + ') = <b>' + n(g, 3) + '</b>.',
            'Δ<var>t</var>′ = γ(Δ<var>t</var> − <var>v</var>Δ<var>x</var>/<var>c</var>²) = γ·(0 − ' + n(v, 1) + '·' + dx + ') = −' + n(g, 3) + '·' + n(v * dx, 2) + ' = <b>' + n(dtp, 2) + ' ani</b>.',
            'Δ<var>t</var>′ ≠ 0 ⇒ evenimentele <b>nu</b> sunt simultane în S′ (simultaneitatea e relativă); semnul arată care dintre ele are loc primul în S′.'] };
      } },
    { id: 'dinamica', title: 'Forță și accelerație în TRR',
      gen: function () {
        var v = pick([0.6, 0.8, 0.9]), g = gam(v), par = 100 / (g * g * g), perp = 100 / g;
        return {
          text: 'O forță constantă <var>F</var> acționează asupra unui corp cu masa de repaus <var>m</var><sub>0</sub>, care se mișcă cu <var>v</var> = ' + n(v, 1) + '·<var>c</var>. Notăm cu <var>a</var><sub>cl</sub> = <var>F</var>/<var>m</var><sub>0</sub> accelerația din mecanica clasică. Calculați: a) γ; b) accelerația când <var>F</var> ∥ <var>v</var>, ca procent din <var>a</var><sub>cl</sub>; c) accelerația când <var>F</var> ⟂ <var>v</var>, ca procent din <var>a</var><sub>cl</sub>.',
          parts: [{ k: 'γ', ans: g, tol: 0.01, d: 3 }, { k: 'a (F ∥ v), %', ans: par, tol: 0.02, d: 1 }, { k: 'a (F ⟂ v), %', ans: perp, tol: 0.02, d: 1 }],
          steps: ['γ = 1/√(1 − ' + n(v * v, 2) + ') = <b>' + n(g, 3) + '</b>.',
            '<var>F</var> ∥ <var>v</var>: <var>F</var> = γ³<var>m</var><sub>0</sub><var>a</var> ⇒ <var>a</var> = <var>F</var>/(γ³<var>m</var><sub>0</sub>) = <var>a</var><sub>cl</sub>/γ³ = <var>a</var><sub>cl</sub>/' + n(g * g * g, 2) + ' = <b>' + n(par, 1) + ' %</b> din <var>a</var><sub>cl</sub>.',
            '<var>F</var> ⟂ <var>v</var>: <var>F</var> = γ<var>m</var><sub>0</sub><var>a</var> ⇒ <var>a</var> = <var>a</var><sub>cl</sub>/γ = <b>' + n(perp, 1) + ' %</b> din <var>a</var><sub>cl</sub>.',
            'Accelerația scade pe măsură ce v crește, mai tare pe direcția mișcării (γ³) decât perpendicular (γ).'] };
      } },
    { id: 'contractie_inv', title: 'La ce viteză se contractă o bară la o fracțiune dată?',
      gen: function () {
        var f = pick([0.8, 0.6, 0.5]), v = Math.sqrt(1 - f * f), L0 = pick([10, 20, 50]);
        return {
          text: 'O bară are lungimea proprie <var>L</var><sub>0</sub> = ' + L0 + ' m. La ce viteză (în unități de <var>c</var>) lungimea ei măsurată pe direcția mișcării devine ' + n(f * L0, 0) + ' m, adică ' + n(f * 100, 0) + '% din <var>L</var><sub>0</sub>?',
          parts: [{ k: 'v (în c)', ans: v, tol: 0.01, d: 3 }],
          steps: ['<var>L</var>/<var>L</var><sub>0</sub> = 1/γ = ' + n(f, 1) + ' ⇒ γ = ' + n(1 / f, 3) + '.',
            '1/γ = √(1 − <var>v</var>²/<var>c</var>²) ⇒ <var>v</var>²/<var>c</var>² = 1 − (1/γ)² = 1 − ' + n(f * f, 2) + ' = ' + n(1 - f * f, 2) + '.',
            '<var>v</var> = <var>c</var>·√' + n(1 - f * f, 2) + ' = <b>' + n(v, 3) + '<var>c</var></b>.'] };
      } },
    { id: 'muon', title: 'Muonul: durata măsurată pe Pământ și drumul parcurs',
      gen: function () {
        var v = pick([0.9, 0.95, 0.99]), g = gam(v), t0 = 2.2, t = g * t0, d = v * 3e8 * t * 1e-6 / 1000;
        return {
          text: 'Un muon are durata de viață proprie Δ<var>t</var><sub>0</sub> = 2,2 μs și se mișcă față de Pământ cu <var>v</var> = ' + n(v, 2) + '·<var>c</var> (<var>c</var> = 3·10<sup>8</sup> m/s). Calculați: a) γ; b) durata de viață măsurată de un observator de pe Pământ (în μs); c) distanța parcursă de muon în sistemul Pământului (în km).',
          parts: [{ k: 'γ', ans: g, tol: 0.01, d: 2 }, { k: 'Δt (μs)', ans: t, tol: 0.015, d: 1 }, { k: 'd (km)', ans: d, tol: 0.02, d: 2 }],
          steps: ['γ = 1/√(1 − ' + n(v * v, 4) + ') = <b>' + n(g, 2) + '</b>.',
            'Δ<var>t</var> = γΔ<var>t</var><sub>0</sub> = ' + n(g, 2) + '·2,2 = <b>' + n(t, 1) + ' μs</b> (durata proprie se înmulțește cu γ).',
            '<var>d</var> = <var>v</var>Δ<var>t</var> = ' + n(v, 2) + '·3·10<sup>8</sup>·' + n(t, 1) + '·10<sup>−6</sup> = <b>' + n(d, 2) + ' km</b>. Fără dilatare ar fi fost doar ' + n(v * 3e8 * 2.2e-6 / 1000, 2) + ' km.'] };
      } },
    { id: 'lambda', title: 'Din energia fotonului: lungime de undă, frecvență și culoare',
      gen: function () {
        var E = pick([1.8, 2.0, 2.5, 3.1, 4.0]), lam = 1240 / E, nu = E / HEV;
        return {
          text: 'Un foton are energia <var>E</var> = ' + n(E, 1) + ' eV. Calculați: a) lungimea de undă λ (în nm, cu <var>hc</var> ≈ 1240 eV·nm); b) frecvența ν (în THz, cu <var>h</var> ≈ 4,14·10<sup>−15</sup> eV·s).',
          parts: [{ k: 'λ (nm)', ans: lam, tol: 0.015, d: 0 }, { k: 'ν (THz)', ans: nu, tol: 0.015, d: 0 }],
          steps: ['λ = <var>hc</var>/<var>E</var> = 1240/' + n(E, 1) + ' = <b>' + n(lam, 0) + ' nm</b>.',
            'ν = <var>E</var>/<var>h</var> = ' + n(E, 1) + '/(4,14·10<sup>−15</sup>) = <b>' + n(nu, 0) + ' THz</b>.',
            'Verificare: λν = <var>c</var> ⇒ ' + n(lam, 0) + '·10<sup>−9</sup>·' + n(nu, 0) + '·10<sup>12</sup> ≈ 3·10<sup>8</sup> m/s.'] };
      } }
  ];
})();
