/* Capitolul 10 — Fotonul. Simulări:
     c10Poveste  — stagiul poveștii „De ce m₀ = 0?” (grafic E–v, apoi triunghiul E–pc–m₀c²)
     c10Fotoni   — culoare vs. intensitate: energia unui foton, fotoni pe secundă, putere (fasciculul A vs. referința B)
     c10Triunghi — „Triunghiul se turtește”: aceeași energie totală, masa de repaus scade spre 0

   Structură (la fel în fiecare simulare):
     (1) stare + update(dt)  — fizica și animația, fără apeluri de desenare;
     (2) drawScene(P, W, H)  — TOATE apelurile de desenare, într-un singur loc
         (ușor de înlocuit cu sprite-uri RF.art). */
(function () {
  'use strict';
  var RF = window.RF, D = RF.draw;

  /* ---------- constante și utilitare ---------- */
  var TAU = Math.PI * 2;
  var HC = 0.41357;     // energia (eV) a unui foton cu ν = 10^14 Hz  (h/e ≈ 4,1357·10^-15 eV·s)
  var C14 = 2997.92;    // λ[nm] = C14 / ν[10^14 Hz]   (c ≈ 3·10^8 m/s)

  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function ease(t) { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); }
  function lamOf(nu) { return C14 / nu; }                  // ν în unități de 10^14 Hz → λ în nm
  function evOf(nu) { return HC * nu; }                    // ν în unități de 10^14 Hz → E în eV
  function fsOf(W) { return W < 460 ? 11 : 12.5; }
  function nowSec() { return (window.performance && performance.now ? performance.now() : Date.now()) / 1000; }
  function colorName(nm) {
    if (nm < 380) return 'ultraviolet (invizibil)';
    if (nm < 450) return 'violet';
    if (nm < 495) return 'albastru';
    if (nm < 570) return 'verde';
    if (nm < 590) return 'galben';
    if (nm < 620) return 'portocaliu';
    if (nm <= 750) return 'roșu';
    return 'infraroșu (invizibil)';
  }

  /* ===================================================================
     Desen comun: triunghiul energie–impuls (folosit de c10Triunghi și c10Poveste)
     ipotenuza = E (= k, scara fixă 1), cateta orizontală = pc, cateta verticală = m₀c² = r·E.
     g = {r, k, locus, ends, fs}; întoarce rezultatul lui A.energyTriangle
     =================================================================== */
  function drawTriangle(ctx, P, rect, g) {
    var A = RF.art, k = g.k == null ? 1 : g.k, r = clamp(g.r, 0, 1), flat = r < 0.012;
    var tri = A.energyTriangle(ctx, rect, {
      E: k, E0: r * k, max: 1, values: false,
      labels: { E: flat && k > 0.05 ? 'E = pc' : 'E' }
    });
    var a = tri.pts.a, s = tri.scale;
    if (g.locus) {
      // arcul pe care stă vârful triunghiului: aceeași energie totală E
      ctx.save();
      ctx.strokeStyle = D.rgba(P.light, 0.55); ctx.lineWidth = 1.8; ctx.setLineDash([5, 7]); ctx.lineCap = 'round';
      ctx.beginPath(); ctx.arc(a.x, a.y, s, -Math.PI / 2, 0); ctx.stroke();
      ctx.restore();
    }
    if (g.ends) {
      A.chip(ctx, 'foton', a.x + s, a.y + 24, { dot: P.light, align: 'center', size: g.fs - 0.5 });
      A.chip(ctx, 'în repaus', a.x + 10, a.y - s - 2, { dot: P.s2, size: g.fs - 0.5 });
    }
    return tri;
  }

  /* ===================================================================
     1. c10Fotoni — culoare vs. intensitate (fasciculul A reglabil, B = referință roșie)
     =================================================================== */
  RF.sims.c10Fotoni = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 16 / 13, minH: 480, maxH: 540 });
    cv.cv.setAttribute('role', 'img');
    cv.cv.setAttribute('aria-label', 'Două fascicule de fotoni, A și B, cu bare pentru energia unui foton, numărul de fotoni pe secundă și putere.');

    var NU_MIN = 3.0, NU_MAX = 12.0, N_MIN = 0.5, N_MAX = 8;   // ν în 10^14 Hz; fotoni/s (la scara desenului)
    var X0 = 62;                                                 // începutul culoarului (după sursă)
    var st = {
      A: { nu: 6.5, n: 2, acc: 0.6, ph: [] },
      B: { nu: 4.3, n: 5, acc: 0.1, ph: [] },
      fl: []                                                     // fulgerele de la detector
    };

    /* ---------- (1) stare + update ---------- */
    function laneLen() { return Math.max((cv.W || 600) - 86, 200); }
    function update(dt) {
      var L = laneLen(), spd = clamp(L / 1.9, 140, 270) / L;     // fracțiune de culoar pe secundă; aceeași pentru toți fotonii
      ['A', 'B'].forEach(function (key) {
        var b = st[key];
        b.acc += b.n * dt;
        while (b.acc >= 1) {
          b.acc -= 1;
          b.ph.push({ u: (b.acc / b.n) * spd, nu: b.nu, j: (Math.random() - 0.5) * 10 });
        }
        for (var i = b.ph.length - 1; i >= 0; i--) {
          var p = b.ph[i];
          p.u += spd * dt;
          if (p.u >= 1) { st.fl.push({ k: key, nu: p.nu, j: p.j, t: 0 }); b.ph.splice(i, 1); }
        }
      });
      st.fl.forEach(function (f) { f.t += dt; });
      st.fl = st.fl.filter(function (f) { return f.t < 0.5; });
    }
    for (var w = 0; w < 140; w++) update(0.02);                  // cadrul static de început are deja fotoni în culoar
    st.fl = [];

    /* ---------- controale ---------- */
    var slNu = RF.ui.slider(api.controls, {
      label: 'Fascicul A — culoarea (frecvența ν)', min: NU_MIN, max: NU_MAX, step: 0.1, value: st.A.nu, tone: 'light', wide: true,
      fmt: function (v) { return RF.fmt.n(v, 1) + '·10¹⁴ Hz · ' + Math.round(lamOf(v)) + ' nm'; },
      onInput: function (v) { st.A.nu = v; info(); }
    });
    var slN = RF.ui.slider(api.controls, {
      label: 'Fascicul A — intensitatea (fotoni pe secundă)', min: N_MIN, max: N_MAX, value: st.A.n, wide: true,
      fmt: function (v) { return RF.fmt.n(v, 1) + ' fotoni/s'; },
      onInput: function (v) { st.A.n = v; info(); }
    });
    RF.ui.buttons(api.controls, [
      { label: 'A = aceeași putere ca B', primary: true, onClick: function () {
          var need = st.B.n * evOf(st.B.nu) / evOf(st.A.nu);
          slN.set(clamp(need, N_MIN, N_MAX));
        } },
      { label: '↺ Starea inițială', onClick: function () { slNu.set(6.5); slN.set(2); } }
    ]);
    var ro = RF.ui.readouts(api.controls, [
      { k: 'e', label: 'Energie mai mare pe foton' },
      { k: 'n', label: 'Mai mulți fotoni pe secundă' },
      { k: 'p', label: 'Putere totală mai mare' }
    ]);
    function who(a, b, tol) {
      if (Math.abs(a - b) <= tol * Math.max(a, b)) return 'la fel ✓';
      return a > b ? 'A' : 'B';
    }
    function info() {
      var A = st.A, B = st.B, eA = evOf(A.nu), eB = evOf(B.nu);
      ro.set('e', who(eA, eB, 0.02));
      ro.set('n', who(A.n, B.n, 0.02));
      ro.set('p', who(A.n * eA, B.n * eB, 0.03));
    }
    info();

    RF.sim.loop(host, function (dt) { update(dt); drawScene(RF.sim.palette(), cv.W, cv.H); });

    /* ---------- (2) desen: tot ce se vede ---------- */
    function drawScene(P, W, H) {
      var ctx = cv.ctx, fs = fsOf(W), AR = RF.art;
      D.clear(cv);
      var A = st.A, B = st.B;
      var eA = evOf(A.nu), eB = evOf(B.nu), pA = A.n * eA, pB = B.n * eB;
      var laneBlock = Math.round(H * 0.36), laneH = laneBlock / 2;
      var xd = W - 24;

      /* --- cele două fascicule --- */
      function lane(key, idx, title) {
        var b = st[key], top = 6 + idx * laneH, cy = top + laneH * 0.68;
        var nm = lamOf(b.nu), col = D.wavelengthColor(nm);
        AR.chip(ctx, title + ' · ' + colorName(nm) + ' · ' + Math.round(nm) + ' nm', 10, top + 12, { dot: col, size: fs - 0.5 });
        AR.chip(ctx, 'viteza: c ✓', W - 10, top + 12, { dot: P.good, color: P.good, align: 'right', size: fs - 0.5 });   // invariantul: același pentru toate culorile
        D.line(ctx, X0, cy, xd, cy, D.rgba(P.line2, 0.45), 1.2, [3, 6]);                // culoarul
        AR.laser(ctx, 32, cy, 46, { nm: nm, on: true, t: 0 });                            // sursa
        D.fillRR(ctx, xd - 4, cy - laneH * 0.22, 8, laneH * 0.44, 4, P.tx2, D.rgba(P.tx, 0.3), 1);   // detectorul
        b.ph.forEach(function (p) {
          var x = X0 + p.u * (xd - X0);
          AR.photon(ctx, x, cy + p.j * 0.7, 3.6, { nm: lamOf(p.nu), angle: 0, tail: 1, alpha: clamp((x - X0) / 14, 0, 1) });
        });
        st.fl.forEach(function (f) {                                                    // fulger la sosire; mai mare = foton mai energic
          if (f.k !== key) return;
          var q = f.t / 0.5, e = evOf(f.nu);
          AR.flash(ctx, xd, cy + f.j * 0.7, 9 + 3.4 * e, { nm: lamOf(f.nu), p: q });
        });
      }
      lane('A', 0, 'A');
      lane('B', 1, 'B (referință)');
      D.line(ctx, 10, laneBlock + 10, W - 10, laneBlock + 10, P.line, 1);

      /* --- barele: energie / număr / putere --- */
      var colA = D.wavelengthColor(lamOf(A.nu)), colB = D.wavelengthColor(lamOf(B.nu));
      var gTop = laneBlock + 16, gH = (H - 6 - gTop) / 3;
      var groups = [
        { title: 'Energia unui foton (și impulsul: p = E ÷ c)', a: eA, b: eB, max: 5.2, f: function (v) { return RF.fmt.n(v, 2) + ' eV'; } },
        { title: 'Fotoni pe secundă (intensitatea)', a: A.n, b: B.n, max: N_MAX, f: function (v) { return RF.fmt.n(v, 1) + ' /s'; } },
        { title: 'Puterea = fotoni/s × energia unui foton', a: pA, b: pB, max: 40, f: function (v) { return RF.fmt.n(v, 1) + ' eV/s'; } }
      ];
      groups.forEach(function (g, i) {
        AR.bars(ctx, { x: 6, y: gTop + i * gH, w: W - 12, h: gH - 6 },
          [{ label: 'A', value: g.a, color: colA }, { label: 'B', value: g.b, color: colB }],
          { horizontal: true, max: g.max, fmt: g.f, caption: g.title, grid: false });
      });
      if (Math.abs(pA - pB) <= 0.03 * Math.max(pA, pB)) {
        AR.chip(ctx, 'puteri egale ✓', W - 16, gTop + 2 * gH + 19, { dot: P.good, color: P.good, align: 'right', size: fs - 1 });
      }
    }
  };

  /* ===================================================================
     2. c10Triunghi — aceeași energie totală, masa de repaus scade spre 0
     =================================================================== */
  RF.sims.c10Triunghi = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 16 / 9, minH: 290, maxH: 400 });
    cv.cv.setAttribute('role', 'img');
    cv.cv.setAttribute('aria-label', 'Triunghiul energie–impuls cu ipotenuza E fixă; cateta m₀c² se micșorează spre zero și triunghiul se turtește.');

    var R0 = 0.55, DEMO = 3.0, DELAY = 1.0;
    var st = { r: RF.reduced ? 0 : R0, demo: !RF.reduced, t: 0 };   // r = m₀c² / E

    /* ---------- controale ---------- */
    var sl = RF.ui.slider(api.controls, {
      label: 'Masa de repaus a corpului (toate au aceeași energie totală E)', min: 0, max: 1, step: 0.01, value: st.r, tone: 'light', wide: true,
      fmt: function (v) { return v < 0.005 ? '0 — foton' : 'm₀c² = ' + Math.round(v * 100) + '% din E'; },
      onInput: function (v) { st.demo = false; st.r = v; info(); }
    });
    RF.ui.buttons(api.controls, [
      { label: 'Foton (m₀ = 0)', onClick: function () { st.demo = false; sl.set(0); } },
      { label: 'Corp în repaus (p = 0)', onClick: function () { st.demo = false; sl.set(1); } },
      { label: '↻ Demo', onClick: function () { st.demo = true; st.t = 0; st.r = R0; sl.set(R0, true); info(); } }
    ]);
    var ro = RF.ui.readouts(api.controls, [
      { k: 'v', label: 'Viteza corpului' },
      { k: 'g', label: 'γ = E ÷ (m₀c²)' },
      { k: 'p', label: 'Impulsul: pc ca parte din E' }
    ]);
    function info() {
      var r = st.r, beta = Math.sqrt(1 - r * r);
      ro.set('v', r < 0.001 ? 'c — exact' : beta >= 0.99995 ? 'aproape c, dar < c' : RF.fmt.n(beta, beta > 0.999 ? 4 : 3) + ' c');
      ro.set('g', r < 0.001 ? '∞' : (1 / r >= 10 ? String(Math.round(1 / r)) : RF.fmt.n(1 / r, 1)));
      ro.set('p', RF.fmt.pct(beta, beta > 0.995 ? 2 : beta > 0.95 ? 1 : 0));
    }
    info();

    /* ---------- (1) stare + update ---------- */
    function update(dt) {
      if (!st.demo) return;
      st.t += dt;
      var k = (st.t - DELAY) / DEMO;
      st.r = R0 * (1 - ease(k));
      if (k >= 1) { st.demo = false; st.r = 0; }
      sl.set(st.r, true);
      info();
    }

    RF.sim.loop(host, function (dt) { update(dt); drawScene(RF.sim.palette(), cv.W, cv.H); });

    /* ---------- (2) desen ---------- */
    function drawScene(P, W, H) {
      var ctx = cv.ctx, fs = fsOf(W), AR = RF.art;
      D.clear(cv);
      drawTriangle(ctx, P, { x: 6, y: 6, w: W - 12, h: H - 12 }, { r: st.r, fs: fs, locus: true, ends: true });
      var r = st.r, reg = r < 0.001 ? 'foton: E = pc, exact' : r <= 0.2 ? 'regim ultrarelativist: E ≈ pc' : r <= 0.85 ? 'regim relativist' : 'viteze mici (aproape de repaus)';
      AR.chip(ctx, reg, W - 18, 26, { dot: r < 0.001 ? P.light : P.tx3, align: 'right', size: fs });
      AR.chip(ctx, W < 460 ? 'E aceeași ✓' : 'E (ipotenuza): aceeași pentru toate ✓', W - 18, 54, { dot: P.good, color: P.good, align: 'right', size: fs });   // invariantul acestei scene
    }
  };

  /* ===================================================================
     3. c10Poveste — stagiul poveștii „De ce m₀ = 0?”
        stage 0: curba E(v) a unui corp cu masă; 1: + punctul fotonului;
        stage 2: triunghiul se turtește; 3: segmentul E = pc se micșorează la 0
     =================================================================== */
  RF.sims.c10Poveste = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 16 / 11, minH: 290, maxH: 400 });
    cv.cv.setAttribute('role', 'img');
    cv.cv.setAttribute('aria-label', 'Grafic al energiei în funcție de viteză, apoi triunghiul energie–impuls care se turtește pentru foton.');

    var YMAX = 6.4, EPH = 2.4;                                   // energia maximă din grafic și energia fotonului (în E₀)
    var st = { stage: 0, t0: nowSec(), T: 0, vg: 1, vt: 0 };
    if (api.steps) api.steps.addEventListener('rf:step', function (e) { st.stage = e.detail.stage; st.t0 = nowSec(); });

    /* ---------- (1) stare + update ---------- */
    function update(dt) {
      var k = Math.min(1, dt * 6), g = st.stage < 2 ? 1 : 0;
      st.vg += (g - st.vg) * k;                                  // fundu încrucișat: grafic (stage 0–1) ↔ triunghi (stage 2–3)
      st.vt += ((1 - g) - st.vt) * k;
      st.T = Math.max(0, nowSec() - st.t0);
    }

    RF.sim.loop(host, function (dt) { update(dt); drawScene(RF.sim.palette(), cv.W, cv.H); });

    /* ---------- (2) desen ---------- */
    function drawScene(P, W, H) {
      var ctx = cv.ctx, fs = fsOf(W);
      D.clear(cv);
      var rect = { x: 6, y: 6, w: W - 12, h: H - 46 };
      if (st.vg > 0.02) { ctx.save(); ctx.globalAlpha = st.vg; graph(ctx, P, rect, fs); ctx.restore(); }
      if (st.vt > 0.02) { ctx.save(); ctx.globalAlpha = st.vt; triScene(ctx, P, rect, fs); ctx.restore(); }
      var cap = ['v → c  ⇒  γ → ∞  ⇒  E → ∞', 'Curba nu atinge punctul fotonului', 'm₀ → 0 ⇒ cateta m₀c² dispare, pc → E', 'p → 0 ⇒ E → 0: nu mai rămâne nimic'][clamp(st.stage, 0, 3)];
      RF.art.chip(ctx, cap, W / 2, H - 18, { align: 'center', size: fs, dot: P.light });
    }

    function graph(ctx, P, rect, fs) {
      var A = RF.art, showPh = st.stage >= 1;
      var g = A.graph(ctx, rect, {
        xmin: 0, xmax: 1.03, ymin: 0, ymax: YMAX, xlabel: 'viteza v', ylabel: 'energia E',
        xticks: [{ v: 0, label: '0' }, { v: 0.5, label: '0,5 c' }, { v: 1, label: 'c' }],
        yticks: [{ v: 0, label: '0' }, { v: 1, label: 'E₀' }]
      });
      g.vline(1, { color: P.light, dash: [6, 5], w: 2 });
      var fE = function (b) { return 1 / Math.sqrt(Math.max(1e-9, 1 - b * b)); };

      // punctul fotonului (v = c, energie finită)
      if (showPh) {
        g.hline(EPH, { color: P.light, dash: [3, 5], w: 1.6, label: 'E fotonului', labelAt: 'left' });
        g.point(1, EPH, { color: P.light, r: 7, label: 'foton', labelPos: 'up' });
      }

      // curba E = γE₀ a unui corp cu masă de repaus
      g.curve(fE, { color: P.acc, w: 2, fill: false, alpha: 0.3, to: 0.9895 });

      // corpul care accelerează
      var CYC = 6.6, p = st.T % CYC, m = ease(p / 4.4);
      var beta = 0.1 + 0.8955 * m, e = fE(beta), over = e >= YMAX;
      g.curve(fE, { color: P.acc, w: 3.8, glow: true, fill: true, to: beta });
      if (showPh && beta > 0.9096) {                                // a trecut prin energia fotonului, dar încă sub c
        g.point(0.9096, EPH, { color: P.tx, r: 5, label: 'aceeași E, v < c', labelPos: 'down' });
      }
      g.point(beta, over ? YMAX * 0.985 : e, { color: P.tx, t: st.T });
      var cx = g.px(beta);
      if (over) D.arrow(ctx, cx, g.py(YMAX) + 24, cx, g.py(YMAX) + 4, { color: P.acc, w: 3, head: 9 });
      RF.art.chip(ctx, over ? 'E → ∞' : 'E = ' + RF.fmt.n(e, 1) + ' · E₀', rect.x + rect.w * 0.45, rect.y + 24, { dot: P.acc, align: 'center', size: fs });
    }

    function triScene(ctx, P, rect, fs) {
      var r, k = 1, T = st.T;
      if (st.stage < 3) { r = 0.55 * (1 - ease(((T % 6.2) - 0.7) / 2.4)); }
      else { r = 0; k = 1 - ease(((T % 6.4) - 0.8) / 2.6); }
      var tri = drawTriangle(ctx, P, rect, { r: r, k: k, fs: fs, locus: st.stage < 3, ends: false });
      if (st.stage < 3) RF.art.chip(ctx, 'aceeași energie E — doar m₀ se schimbă', rect.x + 16, rect.y + 22, { dot: P.tx3, size: fs });
      else if (k < 0.05) RF.art.chip(ctx, 'E = 0', tri.pts.a.x + 40, tri.pts.a.y - 26, { dot: P.tx, size: fs });
    }
  };
})();
