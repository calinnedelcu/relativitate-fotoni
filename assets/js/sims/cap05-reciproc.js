/* Capitolul 5 — „c05Reciproc”: Ana (S) și Bogdan (S′) au bare identice (10 m în repaus).
   Din fiecare sistem, bara celuilalt — care trece în viteză — iese mai scurtă. Efectul e simetric. */
(function () {
  'use strict';
  var RF = window.RF, D = RF.draw, LM = 10;
  function f1(x) { return RF.fmt.n(x, 1); }

  function rod(ctx, color, x1, x2, yc, hh, sc) {
    var w = Math.max(x2 - x1, 3), r = hh * 0.26;
    D.fillRR(ctx, x1, yc - hh / 2, w, hh, 5, D.rgba(color, 0.3), color, 2);
    ctx.save();
    ctx.strokeStyle = D.rgba(color, 0.55); ctx.lineWidth = 1;
    ctx.beginPath();
    [0.3, 0.7].forEach(function (f) { ctx.moveTo(x1 + w * f, yc - hh / 2 + 4); ctx.lineTo(x1 + w * f, yc + hh / 2 - 4); });
    ctx.stroke();
    ctx.fillStyle = D.rgba(color, 0.8);
    ctx.beginPath(); ctx.ellipse(x1 + w / 2, yc, Math.max(r * sc, 0.8), r, 0, 0, 6.2832); ctx.fill();
    ctx.restore();
  }

  RF.sims.c05Reciproc = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 16 / 8, minH: 280, maxH: 390 });
    var st = { b: 0.7, view: 'S' }, off = 0;

    RF.ui.slider(api.controls, {
      label: 'Viteza relativă dintre Ana și Bogdan', min: 0, max: 0.95, step: 0.01, value: st.b, tone: 's2',
      fmt: function (v) { return RF.fmt.c(v); },
      onInput: function (v) { st.b = v; info(); }
    });
    RF.ui.segmented(api.controls, {
      label: 'Privești din…', value: st.view,
      options: [{ k: 'S', label: 'S — Ana' }, { k: 'P', label: 'S′ — Bogdan' }],
      onChange: function (k) { st.view = k; off = 0; }
    });
    RF.ui.legend(api.controls, [
      { color: 'var(--s1)', label: 'Ana, sistemul S, cu bara ei de 10 m' },
      { color: 'var(--s2)', label: 'Bogdan, sistemul S′, cu bara lui de 10 m' }
    ]);
    var ro = RF.ui.readouts(api.controls, [
      { k: 'a1', label: 'Ana, bara ei (în repaus)' },
      { k: 'a2', label: 'Ana, bara lui Bogdan (în mișcare)' },
      { k: 'b1', label: 'Bogdan, bara lui (în repaus)' },
      { k: 'b2', label: 'Bogdan, bara Anei (în mișcare)' }
    ]);
    function info() {
      var g = RF.phys.gamma(st.b), L = f1(LM / g) + ' m' + (g - 1 < 0.005 ? ' — la fel' : ' — mai scurtă');
      ro.set('a1', f1(LM) + ' m'); ro.set('a2', L);
      ro.set('b1', f1(LM) + ' m'); ro.set('b2', L);
    }
    info();

    RF.sim.loop(host, function (dt) {
      if (!cv.W || !cv.H) return;
      // (1) starea: poziția barei care trece (în pixeli față de centru)
      var Lp = Math.max(80, Math.min(cv.W * 0.3, 240)), span = cv.W + 2 * Lp;
      if (st.b < 0.01) off *= Math.max(0, 1 - 4 * dt);
      else off += 1.5 * st.b * Lp * dt;
      if (off > span / 2) off -= span;
      drawScene(RF.phys.gamma(st.b), off, Lp);
    });

    // (2) tot desenul, într-un singur loc
    function drawScene(g, offset, Lp) {
      var P = RF.sim.palette(), W = cv.W, H = cv.H, ctx = cv.ctx, fs = W < 460 ? 11 : 12.5, narrow = W < 460;
      var S = st.view === 'S', own = S ? P.s1 : P.s2, oth = S ? P.s2 : P.s1, dir = S ? 1 : -1;
      var hh = Math.max(22, Math.min(30, H * 0.1)), yU = H * 0.27, yM = H * 0.50, yL = H * 0.80;
      var ownRod = S ? 'bara Anei' : 'bara lui Bogdan', othRod = S ? 'bara lui Bogdan' : 'bara Anei';
      D.clear(cv);

      D.text(ctx, narrow ? (S ? 'Ana (S) măsoară' : 'Bogdan (S′) măsoară')
        : (S ? 'Din S, Ana: bara lui Bogdan zboară spre dreapta' : 'Din S′, Bogdan: bara Anei zboară spre stânga'),
        10, 17, { color: own, size: fs, weight: 700 });

      // rigla observatorului și bara lui, în repaus
      var cx = W / 2, x1 = cx - Lp / 2, x2 = cx + Lp / 2;
      D.line(ctx, 0, yM, W, yM, D.rgba(own, 0.6), 2);
      var step = 0.1 * Lp;
      ctx.save(); ctx.strokeStyle = D.rgba(own, 0.5); ctx.lineWidth = 1; ctx.beginPath();
      for (var k = Math.floor(-cx / step); k <= Math.ceil(cx / step); k++) { var tx = cx + k * step; ctx.moveTo(tx, yM); ctx.lineTo(tx, yM + (k % 5 === 0 ? 8 : 4)); }
      ctx.stroke(); ctx.restore();
      D.line(ctx, x1, yL - hh / 2, x1, yM, D.rgba(own, 0.35), 1.5, [3, 4]);
      D.line(ctx, x2, yL - hh / 2, x2, yM, D.rgba(own, 0.35), 1.5, [3, 4]);
      rod(ctx, own, x1, x2, yL, hh, 1);
      D.text(ctx, ownRod + ': ' + f1(LM) + ' m (în repaus)', cx, yL + hh / 2 + 19, { color: own, size: fs, weight: 600, align: 'center' });

      // bara celuilalt, în mișcare, scurtată
      var cm = cx + dir * offset, wm = Lp / g, a = cm - wm / 2, b = cm + wm / 2;
      D.line(ctx, a, yU + hh / 2, a, yM, D.rgba(P.light, 0.9), 2, [4, 4]);
      D.line(ctx, b, yU + hh / 2, b, yM, D.rgba(P.light, 0.9), 2, [4, 4]);
      rod(ctx, oth, a, b, yU, hh, 1 / g);
      D.arrow(ctx, dir > 0 ? b + 8 : a - 8, yU, dir > 0 ? b + 34 : a - 34, yU, { color: D.rgba(oth, 0.85), w: 2.5, head: 8 });
      [a, b].forEach(function (x) {
        ctx.save(); ctx.fillStyle = own; ctx.beginPath();
        ctx.moveTo(x, yM + 1); ctx.lineTo(x - 5, yM + 11); ctx.lineTo(x + 5, yM + 11); ctx.closePath(); ctx.fill(); ctx.restore();
      });
      var yb = yM + 24;
      D.line(ctx, a, yb, b, yb, oth, 2); D.line(ctx, a, yb - 5, a, yb + 5, oth, 2); D.line(ctx, b, yb - 5, b, yb + 5, oth, 2);
      D.label(ctx, othRod + ': ' + f1(LM / g) + ' m' + (narrow ? '' : ' (măsurată)'),
        RF.clamp(cm, 96, W - 96), yb + 17, { size: fs, color: oth, align: 'center' });
      D.text(ctx, 'capetele, marcate în același moment al ' + (S ? 'Anei' : 'lui Bogdan'), RF.clamp(cm, 120, W - 120), yU - hh / 2 - 9,
        { color: P.light, size: fs - 1, weight: 600, align: 'center' });
    }
  };
})();
