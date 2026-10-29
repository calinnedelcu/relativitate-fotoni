/* Capitolul 11 — c11Dreapta („Dreapta lui h”) și c11Clasic (Adaos: unda clasică vs. experiment).
   Structură: (1) starea și calculele, (2) desenul, adunat în drawScene(). */
(function () {
  'use strict';
  var RF = window.RF, D = RF.draw;
  var HEV = 0.41357, LAMBDA = 2998;                // h în eV pe 10^14 Hz; λ[nm] = 2998 / ν
  var METALS = [
    { k: 'Cs', name: 'Cesiu', L: 2.1 }, { k: 'K', name: 'Potasiu', L: 2.3 }, { k: 'Na', name: 'Sodiu', L: 2.4 },
    { k: 'Zn', name: 'Zinc', L: 4.3 }, { k: 'Cu', name: 'Cupru', L: 4.7 }
  ];

  function tsub(ctx, base, sub, x, y, o) {            // text cu indice
    o = o || {};
    var size = o.size || 12, wt = o.weight || 600;
    ctx.save();
    ctx.font = D.font(size, wt); var w1 = ctx.measureText(base).width;
    ctx.font = D.font(size * 0.72, wt); var w2 = ctx.measureText(sub).width;
    var x0 = o.align === 'center' ? x - (w1 + w2) / 2 : o.align === 'right' ? x - (w1 + w2) : x;
    ctx.fillStyle = o.color || RF.sim.palette().tx; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.font = D.font(size, wt); ctx.fillText(base, x0, y);
    ctx.font = D.font(size * 0.72, wt); ctx.fillText(sub, x0 + w1, y + size * 0.28);
    ctx.restore();
    return w1 + w2;
  }
  function curve(ctx, g, fn, x0, x1, color, w, dash) {
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineJoin = 'round';
    if (dash) ctx.setLineDash(dash);
    ctx.beginPath();
    for (var i = 0; i <= 80; i++) {
      var xv = x0 + (x1 - x0) * i / 80, px = g.x(xv), py = g.y(fn(xv));
      if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py);
    }
    ctx.stroke(); ctx.restore();
  }

  /* ====================================================================
     c11Dreapta — punctele experimentale E_c(ν) și dreapta: panta = h, ordonata = −L_ex
     ==================================================================== */
  RF.sims.c11Dreapta = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 16 / 9.2, minH: 290, maxH: 410 });
    var S = { metal: 1, all: true, ext: true };
    var FREQ = [5.5, 6.5, 7.5, 8.5, 9.5, 10.5, 11.5, 12];

    RF.ui.segmented(api.controls, {
      label: 'Catodul (metalul)', value: METALS[S.metal].k, wide: true,
      options: METALS.map(function (m) { return { k: m.k, label: m.k }; }),
      onChange: function (k) { S.metal = METALS.map(function (m) { return m.k; }).indexOf(k); info(); }
    });
    RF.ui.toggle(api.controls, { label: 'Arată dreptele celorlalte metale', value: S.all, onChange: function (b) { S.all = b; } });
    RF.ui.toggle(api.controls, { label: 'Prelungește dreapta până la axa verticală', value: S.ext, onChange: function (b) { S.ext = b; } });
    var ro = RF.ui.readouts(api.controls, [
      { k: 'a', label: 'Panta dreptei' },
      { k: 'b', label: 'Ordonata la origine' },
      { k: 'n', label: 'Frecvența de prag ν<sub>0</sub>' }
    ]);
    function info() {
      var m = METALS[S.metal];
      ro.set('a', 'h ≈ 6,62·10⁻³⁴ J·s (la toate)');
      ro.set('b', '−' + RF.fmt.n(m.L, 1) + ' eV = −L ex');
      ro.set('n', RF.fmt.n(m.L / HEV, 2) + '·10¹⁴ Hz');
    }
    info();
    RF.sim.loop(host, function () { drawScene(); });

    function points(mi) {                              // „măsurători”: doar peste prag, cu mică împrăștiere
      var L = METALS[mi].L, out = [];
      FREQ.forEach(function (nu, k) {
        if (HEV * nu - L >= 0.02) out.push({ x: nu, y: HEV * nu - L + 0.05 * Math.sin(7.3 * k + 1.7 * mi + 0.5) });
      });
      return out;
    }

    /* ---------- (2) desenul ---------- */
    function drawScene() {
      var W = cv.W, H = cv.H;
      if (W < 80 || H < 80) return;
      var ctx = cv.ctx, P = RF.sim.palette(), m = METALS[S.metal], nu0 = m.L / HEV, i;
      D.clear(cv);
      var g = { L: 46, R: W - 16, T: 40, B: H - 40 };
      g.x = function (v) { return g.L + v / 12 * (g.R - g.L); };
      g.y = function (v) { return g.B - (v + 5) / 8.2 * (g.B - g.T); };
      var xt = [0, 2, 4, 6, 8, 10, 12], yt = [-4, -2, 0, 2];
      for (i = 0; i < xt.length; i++) {
        D.line(ctx, g.x(xt[i]), g.T, g.x(xt[i]), g.B, P.line, 1);
        D.text(ctx, String(xt[i]), g.x(xt[i]), g.B + 15, { color: P.tx3, size: 11, align: 'center' });
      }
      for (i = 0; i < yt.length; i++) {
        D.line(ctx, g.L, g.y(yt[i]), g.R, g.y(yt[i]), yt[i] === 0 ? P.tx3 : P.line, yt[i] === 0 ? 1.6 : 1);
        D.text(ctx, String(yt[i]).replace('-', '−'), g.L - 7, g.y(yt[i]) + 4, { color: P.tx3, size: 11, align: 'right' });
      }
      D.line(ctx, g.L, g.T, g.L, g.B, P.tx3, 1.5); D.line(ctx, g.L, g.B, g.R, g.B, P.tx3, 1.5);
      D.text(ctx, 'Energia cinetică maximă a fotoelectronilor, în funcție de frecvență', 10, 18, { color: P.tx, size: W < 460 ? 11 : 12, weight: 650 });
      D.text(ctx, 'ν (10¹⁴ Hz)', g.R, H - 8, { color: P.tx2, size: 11, align: 'right' });
      D.text(ctx, 'E (eV)', g.L + 6, g.T - 9, { color: P.tx2, size: 11 });

      if (S.all) {
        for (i = 0; i < METALS.length; i++) {
          if (i === S.metal) continue;
          (function (L) { curve(ctx, g, function (x) { return HEV * x - L; }, 0, 12, D.rgba(P.tx3, 0.6), 1.4); })(METALS[i].L);
          var Lx = (METALS[i].L / HEV);
          D.text(ctx, METALS[i].k, g.x(12) - 2, g.y(HEV * 12 - METALS[i].L) - 5, { color: P.tx3, size: 11, align: 'right' });
          D.dot(ctx, g.x(Lx), g.y(0), 2.5, P.tx3);
        }
      }
      var fn = function (x) { return HEV * x - m.L; };
      if (S.ext) curve(ctx, g, fn, 0, nu0, D.rgba(P.light, 0.75), 1.8, [5, 4]);
      curve(ctx, g, fn, nu0, 12, P.light, 3.2);
      D.text(ctx, m.k, g.x(12) - 2, g.y(fn(12)) - 7, { color: P.light, size: 12, align: 'right', weight: 700 });

      var pts = points(S.metal);
      for (i = 0; i < pts.length; i++) {
        D.dot(ctx, g.x(pts[i].x), g.y(pts[i].y), 5, P.card);
        D.ring(ctx, g.x(pts[i].x), g.y(pts[i].y), 5, P.s1, 2.2);
      }
      if (!pts.length) D.text(ctx, 'sub prag: nu există puncte', (g.L + g.R) / 2, g.y(1), { color: P.bad, size: 12, align: 'center' });

      // triunghiul pantei (același pentru toate metalele)
      var xa = 7.2, xb = 9.6, ya = fn(xa), yb = fn(xb);
      D.line(ctx, g.x(xa), g.y(ya), g.x(xb), g.y(ya), P.good, 2);
      D.line(ctx, g.x(xb), g.y(ya), g.x(xb), g.y(yb), P.good, 2);
      D.text(ctx, 'Δν', g.x((xa + xb) / 2), g.y(ya) + 15, { color: P.good, size: 12, align: 'center', weight: 600 });
      D.text(ctx, 'ΔE', g.x(xb) + 6, (g.y(ya) + g.y(yb)) / 2 + 4, { color: P.good, size: 12, weight: 600 });
      D.text(ctx, 'ΔE / Δν = h  (aceeași la toate)', g.L + 10, g.T + 16, { color: P.good, size: W < 460 ? 11 : 12, weight: 600 });

      if (S.ext) {                                   // ordonata la origine și pragul
        D.dot(ctx, g.x(0), g.y(-m.L), 5, P.light);
        tsub(ctx, '−L', 'ex', g.x(0) + 9, g.y(-m.L) - 6, { color: P.light, size: 12 });
      }
      D.dot(ctx, g.x(nu0), g.y(0), 4.5, P.good);
      tsub(ctx, 'ν', '0', g.x(nu0) - 4, g.y(0) - 8, { color: P.good, size: 12, align: 'right' });
    }
  };

  /* ====================================================================
     c11Clasic — Adaos: ce ar prezice unda clasică și ce arată experimentul (sodiu)
     ==================================================================== */
  RF.sims.c11Clasic = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 16 / 10, minH: 330, maxH: 430 });
    var L = 2.4, NU0 = L / HEV, S = { inten: 80, nu: 4.5 };

    RF.ui.slider(api.controls, {
      label: 'Frecvența luminii ν', min: 2.5, max: 12, step: 0.05, value: S.nu, tone: 'light',
      fmt: function (v) { return RF.fmt.n(v, 2) + '·10¹⁴ Hz · ' + Math.round(LAMBDA / v) + ' nm'; },
      onInput: function (v) { S.nu = v; info(); }
    });
    RF.ui.slider(api.controls, {
      label: 'Intensitatea luminii', min: 5, max: 100, step: 1, value: S.inten, tone: 's2',
      fmt: function (v) { return Math.round(v) + '%'; },
      onInput: function (v) { S.inten = v; info(); }
    });
    var ro = RF.ui.readouts(api.controls, [
      { k: 'E', label: 'Energia unui foton hν' },
      { k: 'L', label: 'Sodiu: L<sub>ex</sub>' },
      { k: 'p', label: 'Pragul ν<sub>0</sub> al sodiului' }
    ]);
    function info() {
      ro.set('E', RF.fmt.n(HEV * S.nu, 2) + ' eV');
      ro.set('L', RF.fmt.n(L, 1) + ' eV');
      ro.set('p', RF.fmt.n(NU0, 2) + '·10¹⁴ Hz');
    }
    info();
    RF.sim.loop(host, function () { drawScene(); });

    function model() {                                // (1) ce prezice fiecare imagine
      var emits = HEV * S.nu >= L - 1e-9, i = S.inten / 100;
      return {
        emits: emits,
        clE: i,                                       // clasic: crește cu intensitatea, nu depinde de culoare
        obE: emits ? RF.clamp((HEV * S.nu - L) / 2.6, 0, 1) : 0,
        obEv: emits ? HEV * S.nu - L : 0,
        clD: Math.log(1 / i) / Math.log(20),          // clasic: întârzierea crește când lumina e slabă
        i: i
      };
    }

    /* ---------- (2) desenul ---------- */
    function drawScene() {
      var W = cv.W, H = cv.H;
      if (W < 100 || H < 100) return;
      var ctx = cv.ctx, P = RF.sim.palette(), m = model(), fs = W < 460 ? 11 : 12, band = H / 3;
      var x0 = W < 460 ? 88 : 108, x1 = W - (W < 460 ? 96 : 120), bh = 14;
      D.clear(cv);
      for (var r = 0; r < 3; r++) {
        var y = r * band;
        if (r) D.line(ctx, 10, y, W - 10, y, P.line, 1);
        D.text(ctx, ['1 · Cât de rapizi ies electronii?', '2 · Apar electroni?', '3 · Cât așteptăm până apare primul?'][r], 12, y + 20, { color: P.tx, size: fs + 0.5, weight: 650 });
        D.dot(ctx, 16, y + band * 0.5 + 4, 4, P.acc2); D.text(ctx, 'undă clasică', 26, y + band * 0.5 + 8, { color: P.acc2, size: 11 });
        D.dot(ctx, 16, y + band * 0.78 + 4, 4, P.good); D.text(ctx, 'experiment', 26, y + band * 0.78 + 8, { color: P.good, size: 11 });
      }
      var yA = band * 0.5 - 2, yB = band * 0.78 - 2, wbar = x1 - x0;
      function bar(y, f, color) {
        D.fillRR(ctx, x0, y, wbar, bh, 6, D.rgba(P.tx3, 0.2));
        if (f > 0.005) D.fillRR(ctx, x0, y, Math.max(8, wbar * f), bh, 6, color);
      }
      function verdict(y, ok, txt) {
        D.text(ctx, (ok ? '✓ ' : '✗ ') + txt, x1 + 10, y + 8, { color: ok ? P.good : P.bad, size: 11, weight: 700 });
      }
      // rândul 1: energia electronilor
      bar(yA, m.clE, P.acc2);
      bar(yB, m.obE, P.good);
      D.text(ctx, 'crește cu intensitatea', x0 + 6, yA + 11, { color: P.tx, size: 11 });
      D.text(ctx, m.emits ? RF.fmt.n(m.obEv, 2) + ' eV · depinde de ν' : 'niciun electron', x0 + 6, yB + 11, { color: P.tx, size: 11 });
      var same1 = Math.abs(m.clE - m.obE) < 0.12;
      verdict(yA + 10, same1, same1 ? 'coincid' : 'nu coincid');
      // rândul 2: apar electroni?
      var y2 = band;
      D.text(ctx, 'da — la orice culoare, dacă lumina e destul de puternică', x0, y2 + band * 0.5 + 8, { color: P.acc2, size: 11 });
      D.text(ctx, m.emits ? 'da — culoarea e peste prag' : 'nu — culoarea e sub prag', x0, y2 + band * 0.78 + 8, { color: m.emits ? P.good : P.bad, size: 11, weight: 600 });
      verdict(y2 + band * 0.5 - 4, m.emits, m.emits ? 'coincid' : 'nu coincid');
      // rândul 3: întârzierea
      var y3 = 2 * band, fd = RF.clamp(0.06 + 0.94 * m.clD, 0.06, 1);
      D.fillRR(ctx, x0, y3 + band * 0.5 - 2, wbar, bh, 6, D.rgba(P.tx3, 0.2));
      D.fillRR(ctx, x0, y3 + band * 0.5 - 2, Math.max(8, wbar * fd), bh, 6, P.acc2);
      D.text(ctx, m.i > 0.7 ? 'scurtă' : m.i > 0.3 ? 'ceva timp' : 'mult timp (secunde–minute)', x0 + 6, y3 + band * 0.5 + 9, { color: P.tx, size: 11 });
      D.fillRR(ctx, x0, y3 + band * 0.78 - 2, wbar, bh, 6, D.rgba(P.tx3, 0.2));
      if (m.emits) D.fillRR(ctx, x0, y3 + band * 0.78 - 2, 8, bh, 6, P.good);
      D.text(ctx, m.emits ? 'instantaneu (≈ 10⁻⁹ s)' : 'nu apare niciodată', x0 + 14, y3 + band * 0.78 + 9, { color: P.tx, size: 11 });
      var same3 = m.emits && m.i > 0.7;
      verdict(y3 + band * 0.5 - 4, same3 || (!m.emits && false), same3 ? 'aproape' : 'nu coincid');
    }
  };
})();
