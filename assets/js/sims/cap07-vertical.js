/* Capitolul 7 — simularea „c07Vertical”: componenta perpendiculară a vitezei („roza vitezelor”).
   Structură: (1) stare + fizică (update) · (2) un singur drawScene(...) care conține TOT desenul. Vitezele sunt în unități de c. */
(function () {
  'use strict';
  var RF = window.RF, D = RF.draw;

  /* ---------- fizică (fără desen) ---------- */
  function gam(b) { return 1 / Math.sqrt(1 - b * b); }
  function fv(x) {
    if (Math.abs(x - 1) < 1e-9) return '1,00 c';
    return RF.fmt.n(x, 2) + ' c';
  }
  /* u′y = viteza pe verticală măsurată de Bogdan (u′x = 0); întoarce ce măsoară Ana */
  function solve(v, uyp) {
    var uy = uyp / gam(v);
    return { uy: uy, tot: Math.hypot(v, uy), naive: Math.hypot(v, uyp), g: gam(v) };
  }
  function tw(ctx, s, size, weight) {
    ctx.save(); ctx.font = D.font(size, weight || 600); var w = ctx.measureText(s).width; ctx.restore();
    return w;
  }

  RF.sims.c07Vertical = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 16 / 10, minH: 320, maxH: 430 });
    cv.cv.setAttribute('role', 'img'); cv.cv.setAttribute('aria-label', 'Diagrama vitezelor: componenta orizontală și cea verticală măsurate de Ana, comparate cu ce măsoară Bogdan, în interiorul cercului de rază c.');
    var ctx = cv.ctx;

    /* ---------- (1) stare ---------- */
    var S = { v: 0.8, uyp: 0.5, light: false, ph: 0 };
    function uypEff() { return S.light ? 1 : S.uyp; }
    function update(dt) { S.ph = (S.ph + dt) % 2.4; }

    RF.ui.slider(api.controls, {
      label: 'Nava față de stație — <var>v</var>', min: 0, max: 0.99, step: 0.01, value: S.v,
      fmt: function (x) { return RF.fmt.c(x); },
      onInput: function (x) { S.v = x; info(); }
    });
    var su = RF.ui.slider(api.controls, {
      label: 'Bila în sus, față de navă — <var>u</var>′<sub>y</sub>', min: 0.05, max: 0.99, step: 0.01, value: S.uyp, tone: 's2',
      fmt: function (x) { return S.light ? '1,00 c (lumină)' : RF.fmt.c(x); },
      onInput: function (x) { S.uyp = x; info(); }
    });
    RF.ui.toggle(api.controls, {
      label: 'Impuls de lumină în loc de bilă (<var>u</var>′<sub>y</sub> = <var>c</var>)', value: false,
      onChange: function (b) {
        S.light = b; su.input.disabled = b; su.el.style.opacity = b ? 0.45 : 1;
        su.set(su.get(), true); info();
      }
    });
    var ro = RF.ui.readouts(api.controls, [
      { k: 'b', label: 'Pe verticală, Bogdan măsoară' },
      { k: 'a', label: 'Pe verticală, Ana măsoară' },
      { k: 't', label: 'Viteza totală măsurată de Ana' },
      { k: 'n', label: 'Dacă pe verticală nu s-ar schimba nimic' }
    ]);
    ro.el.classList.add('c7-wide');
    function info() {
      var uyp = uypEff(), r = solve(S.v, uyp);
      ro.set('b', fv(uyp));
      ro.set('a', fv(r.uy) + '  (÷ γ = ' + RF.fmt.n(r.g, 2) + ')');
      ro.set('t', fv(r.tot) + (r.tot <= 1 + 1e-9 ? '  ✓' : '  ✗'));
      ro.set('n', fv(r.naive) + (r.naive > 1 + 1e-9 ? '  ✗' : ''));
    }
    info();

    /* ---------- (2) desen ---------- */
    function drawScene(t) {
      var A = RF.art, P = RF.sim.palette(), W = cv.W, H = cv.H, fs = W < 460 ? 11 : 12.5;
      D.clear(cv);
      var uyp = uypEff(), r = solve(S.v, uyp), v = S.v, onC = r.tot > 0.999;
      var pl = W < 460 ? 46 : 58, pr = 22, pt = 20, pb = 40;
      var sz = Math.max(80, Math.min(W - 12 - pl - pr, H - 44 - pt - pb));
      var rw = sz + pl + pr, rx = (W - rw) / 2;
      var g = A.graph(ctx, { x: rx, y: 6, w: rw, h: sz + pt + pb }, {
        xmin: 0, xmax: 1.06, ymin: 0, ymax: 1.06, pad: { l: pl, t: pt, r: pr, b: pb },
        xlabel: 'viteza pe orizontală (în stația Anei)', ylabel: 'viteza pe verticală',
        xticks: [{ v: 0, label: '0' }, { v: 0.5, label: '0,5 c' }, { v: 1, label: 'c' }],
        yticks: [{ v: 0, label: '0' }, { v: 0.5, label: '0,5 c' }, { v: 1, label: 'c' }]
      });
      var ox = g.px(0), oy = g.py(0);

      /* zona interzisă (pătratul de peste cercul c) și zona permisă (în cerc) */
      g.clip();
      ctx.fillStyle = D.rgba(P.bad, 0.1); ctx.fillRect(ox, g.py(1), g.px(1) - ox, oy - g.py(1));
      g.unclip();
      g.curve(function (x) { return x > 1 ? NaN : Math.sqrt(Math.max(0, 1 - x * x)); }, { color: P.light, w: 3, dash: [8, 6], fill: true, to: 1 });
      g.text(0.985, 0.975, 'peste c ✗', { color: P.bad, align: 'right', size: fs - 1 });

      /* „fără corecție”: pe verticală nu s-ar schimba nimic */
      var nx = g.px(v), ny = g.py(uyp), ax = g.px(v), ay = g.py(r.uy);
      ctx.save();
      ctx.strokeStyle = D.rgba(P.bad, 0.7); ctx.lineWidth = 1.8; ctx.setLineDash([6, 5]); ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(ox, ny); ctx.lineTo(nx, ny); ctx.moveTo(nx, ny); ctx.lineTo(nx, oy); ctx.moveTo(ox, oy); ctx.lineTo(nx, ny); ctx.stroke();
      ctx.restore();

      /* Ana (în stație): orizontal v, apoi pe verticală uy; rezultanta deasupra */
      A.vector(ctx, ox, oy, ax, oy, { color: P.s1, w: 6 });
      A.vector(ctx, ax, oy, ax, ay, { color: P.s1, w: 6 });
      A.vector(ctx, ox, oy, ax, ay, { color: onC ? P.good : P.s1, w: 7, fade: false });
      /* Bogdan (în navă): vertical, pe axă */
      A.vector(ctx, ox, oy, ox, ny, { color: P.s2, w: 7 });

      g.point(v, uyp, { color: P.bad, r: 5.5, halo: false });
      g.point(v, r.uy, { color: onC ? P.good : P.s1, r: 7, t: t });

      /* etichete */
      A.chip(ctx, 'Bogdan: ' + fv(uyp), ox + 12, Math.max(ny - 16, 14), { dot: P.s2, size: fs - 0.5 });
      var nl = 'fără corecție ' + fv(uyp) + (r.naive > 1 + 1e-9 ? ' ✗' : '');
      var nw = tw(ctx, nl, fs - 0.5, 650) + 36;
      A.chip(ctx, nl, Math.min(Math.max(nx, 6 + nw / 2), W - 6 - nw / 2), Math.max(ny - 22, 14), { dot: P.bad, size: fs - 0.5, align: 'center' });
      var al = 'Ana: ' + fv(r.uy), aw = tw(ctx, al, fs - 0.5, 650) + 36;
      if (ax + 14 + aw < W - 6) A.chip(ctx, al, ax + 14, Math.min(ay + 18, oy - 14), { dot: onC ? P.good : P.s1, size: fs - 0.5 });
      else A.chip(ctx, al, ax - 14, Math.min(ay + 18, oy - 14), { dot: onC ? P.good : P.s1, size: fs - 0.5, align: 'right' });

      /* viteza totală (rândul de jos) */
      A.chip(ctx, 'viteza totală măsurată de Ana: ' + fv(r.tot) + (r.tot <= 1 + 1e-9 ? '  ✓' : '  ✗'), W / 2, H - 16, { align: 'center', size: fs, dot: onC ? P.good : P.s1, color: onC ? P.good : P.tx });

      /* un punct care „călătorește” pe vectorul Anei */
      var q = Math.min(1, S.ph / 1.6);
      A.sphere(ctx, ox + (ax - ox) * q, oy + (ay - oy) * q, 3.6, P.tx);
    }
    RF.sim.loop(host, function (dt, t) { update(dt); drawScene(t); });
  };
})();
