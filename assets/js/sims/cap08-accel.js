/* Capitolul 8 — „Cât de ușor accelerează”: aceeași forță, accelerație tot mai mică */
(function () {
  'use strict';
  var RF = window.RF, D = RF.draw;

  function pct(x) {
    var d = x >= 10 ? 0 : x >= 1 ? 1 : x >= 0.1 ? 2 : 3;
    return RF.fmt.n(x, d) + ' %';
  }

  RF.sims.c08Accel = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 16 / 11, minH: 330, maxH: 460 });
    var ctx = cv.ctx;
    var beta = 0.9, mode = 'par', clock = 0;

    RF.ui.slider(api.controls, {
      label: 'Viteza particulei față de laborator', min: 0, max: 0.995, step: 0.005, value: beta,
      fmt: function (v) { return RF.fmt.c(v, 3); },
      onInput: function (v) { beta = v; }
    });
    RF.ui.segmented(api.controls, {
      label: 'Împingi…', value: mode,
      options: [{ k: 'par', label: 'în sensul mișcării' }, { k: 'perp', label: 'perpendicular pe mișcare' }],
      onChange: function (k) { mode = k; }
    });
    var ro = RF.ui.readouts(api.controls, [
      { k: 'g', label: 'γ (factorul Lorentz)' },
      { k: 'in', label: 'Inerția la această împingere' },
      { k: 'a', label: 'Accelerația pentru aceeași forță' }
    ]);
    RF.ui.legend(api.controls, [
      { color: 'var(--s1)', label: 'în sensul mișcării: <var>F</var> = γ³<var>m</var><sub>0</sub><var>a</var>' },
      { color: 'var(--s3)', label: 'perpendicular: <var>F</var> = γ<var>m</var><sub>0</sub><var>a</var>' },
      { color: 'var(--tx3)', label: 'clasic: la fel la orice viteză' }
    ]);

    /* (1) fizica: accelerația pentru aceeași forță, în unități ale celei de la repaus */
    function ratio(b, m) { var g = RF.phys.gamma(b); return m === 'par' ? 1 / (g * g * g) : 1 / g; }
    function step(dt) { clock += dt; }

    /* (3) afișajele numerice */
    function report() {
      var g = RF.phys.gamma(beta), r = ratio(beta, mode);
      ro.set('g', RF.fmt.n(g, 2));
      ro.set('in', RF.fmt.n(1 / r, r < 0.1 ? 0 : 1) + ' × m₀  (' + (mode === 'par' ? 'γ³' : 'γ') + '·m₀)');
      ro.set('a', pct(r * 100) + ' din cea de la repaus');
    }

    RF.sim.loop(host, function (dt) { step(dt); drawScene(); report(); });

    /* (2) TOT desenul e aici; citește doar starea (beta, mode, clock) */
    function drawScene() {
      var A = RF.art, P = RF.sim.palette(), W = cv.W, H = cv.H;
      if (W < 60 || H < 200) return;
      var small = W < 460, i, j;
      D.clear(cv);
      var rPar = ratio(beta, 'par'), rPerp = ratio(beta, 'perp'), r = mode === 'par' ? rPar : rPerp;
      var colA = mode === 'par' ? P.s1 : P.s3;

      // ---- scena de sus: particula, forța (aceeași) și accelerația ----
      var stripH = small ? 104 : 116, xp = W * 0.34, yp = stripH * 0.64, Lf = small ? 34 : 42;
      D.fillRR(ctx, 8, 8, W - 16, stripH - 8, 14, A.alpha(P.card2, 0.55), P.line, 1);
      var nS = 7, span = Math.max(40, xp - 44);
      for (j = 0; j < nS; j++) {
        var yj = yp + (j - (nS - 1) / 2) * (small ? 8 : 9);
        var len = 8 + 70 * beta, off = (clock * (60 + 380 * beta) + j * 53) % span, xe = xp - 24 - off;
        if (beta > 0.01 && xe > 16) D.line(ctx, xe, yj, Math.max(14, xe - len), yj, D.rgba(P.s2, 0.12 + 0.45 * beta), 2);
      }
      A.glow(ctx, xp, yp, 34, P.s2, 0.35 + 0.4 * beta);
      A.sphere(ctx, xp, yp, small ? 12 : 14, P.s2);
      A.chip(ctx, 'v = ' + RF.fmt.c(beta, 3), 16, 26, { dot: P.s2, size: small ? 11 : 12 });
      var la = Lf * r;
      if (mode === 'par') {
        A.vector(ctx, xp + 20, yp - 17, xp + 20 + Lf, yp - 17, { color: P.acc2, w: 6 });
        A.chip(ctx, 'F (aceeași)', xp + 20 + Lf + 10, yp - 17, { dot: P.acc2, size: small ? 11 : 12 });
        if (la >= 6) A.vector(ctx, xp + 20, yp + 17, xp + 20 + la, yp + 17, { color: colA, w: 6 });
        A.chip(ctx, 'a = ' + pct(r * 100), xp + 20 + Math.max(la, 6) + 10, yp + 17, { dot: colA, size: small ? 11 : 12 });
      } else {
        A.vector(ctx, xp - 14, yp - 18, xp - 14, yp - 18 - Lf, { color: P.acc2, w: 6 });
        A.chip(ctx, 'F (aceeași)', xp - 24, yp - 18 - Lf + 2, { dot: P.acc2, align: 'right', size: small ? 11 : 12 });
        if (la >= 6) A.vector(ctx, xp + 14, yp - 18, xp + 14, yp - 18 - la, { color: colA, w: 6 });
        A.chip(ctx, 'a = ' + pct(r * 100), xp + 26, yp - 18 - Math.max(la, 6) + 2, { dot: colA, size: small ? 11 : 12 });
      }

      // ---- graficul: accelerația pentru aceeași forță, în funcție de viteză ----
      var g = A.graph(ctx, { x: 6, y: stripH + 8, w: W - 12, h: H - stripH - 14 }, {
        xmin: 0, xmax: 1, ymin: 0, ymax: 1.1, xlabel: 'viteza particulei', ylabel: 'accelerația (aceeași forță)',
        xticks: [{ v: 0, label: '0' }, { v: 0.5, label: '0,5 c' }, { v: 1, label: 'c' }],
        yticks: [{ v: 0, label: '0' }, { v: 0.5, label: '50 %' }, { v: 1, label: '100 %' }]
      });
      g.hline(1, { color: P.tx2, dash: [7, 5], w: 1.8, label: W < 460 ? 'clasic' : 'clasic: la fel la orice viteză', labelAt: 'right' });
      var fPar = function (b) { return Math.pow(1 - b * b, 1.5); }, fPerp = function (b) { return Math.sqrt(1 - b * b); };
      var lo = { w: 2, fill: false, alpha: 0.5 };
      if (mode === 'par') {
        g.curve(fPerp, { color: P.s3, w: lo.w, fill: false, alpha: lo.alpha, to: 0.9999 });
        g.curve(fPar, { color: P.s1, w: 3.8, glow: true, fill: true, to: 0.9999 });
      } else {
        g.curve(fPar, { color: P.s1, w: lo.w, fill: false, alpha: lo.alpha, to: 0.9999 });
        g.curve(fPerp, { color: P.s3, w: 3.8, glow: true, fill: true, to: 0.9999 });
      }
      g.point(beta, r, { color: colA, drop: true, t: clock, label: pct(r * 100), labelPos: beta > 0.55 ? 'left' : 'right', xtag: RF.fmt.c(beta, 2), ytag: pct(r * 100) });
    }
  };
})();
