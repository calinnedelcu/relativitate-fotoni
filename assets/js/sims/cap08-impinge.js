/* Capitolul 8 — „Împinge particula”: aceeași forță constantă, viteza clasică vs. viteza relativistă */
(function () {
  'use strict';
  var RF = window.RF, D = RF.draw;

  function pct(x) {
    var d = x >= 10 ? 0 : x >= 1 ? 1 : x >= 0.1 ? 2 : 3;
    return RF.fmt.n(x, d) + ' %';
  }

  RF.sims.c08Impinge = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 16 / 10, minH: 300, maxH: 440 });
    var ctx = cv.ctx;
    var TMAX = 4, YMAX = 1.5, RATE = 0.5, HOLD = 2.4;     // axa timpului, limita de sus a graficului (în c), ritm, pauza de la final
    var force = 1, t = 0, hold = 0, paused = false, showNewton = true;

    RF.ui.slider(api.controls, {
      label: 'Forța constantă (unități arbitrare)', min: 0.5, max: 2.5, step: 0.1, value: force,
      fmt: function (v) { return 'F = ' + RF.fmt.n(v, 1); },
      onInput: function (v) { force = v; }
    });
    RF.ui.toggle(api.controls, {
      label: 'Arată predicția clasică (linia punctată)', value: true,
      onChange: function (b) { showNewton = b; }
    });
    var btns = RF.ui.buttons(api.controls, [
      { label: '⏸ Pauză', onClick: function () { paused = !paused; btns.buttons[0].innerHTML = paused ? '▶ Continuă' : '⏸ Pauză'; } },
      { label: '↻ De la capăt', onClick: function () { t = 0; hold = 0; } }
    ]);
    var ro = RF.ui.readouts(api.controls, [
      { k: 'v', label: 'Viteza reală' },
      { k: 'g', label: 'γ = <var>m</var> / <var>m</var><sub>0</sub>' },
      { k: 'p', label: 'Impulsul <var>p</var> (în <var>m</var><sub>0</sub><var>c</var>)' },
      { k: 'a', label: 'Accelerația acum, față de start' },
      { k: 'n', label: 'Viteza după mecanica clasică' }
    ]);
    RF.ui.legend(api.controls, [
      { color: 'var(--good)', label: 'real (relativitate)' },
      { color: 'var(--tx2)', label: 'clasic (predicție)' },
      { color: 'var(--bad)', label: 'peste <var>c</var>: nu se observă' },
      { color: 'var(--light)', label: '<var>c</var> = viteza luminii' }
    ]);

    /* o forță constantă dă impuls p = F·t (în ambele teorii); τ = F·t / (m₀c) */
    function state(tt) {
      var tau = force * tt, g = Math.sqrt(1 + tau * tau);
      return { tau: tau, g: g, b: tau / g, bn: tau };
    }

    /* (1) starea: timpul de împingere avansează, apoi pauză și reluare */
    function step(dt) {
      if (paused || !(dt > 0)) return;
      if (t < TMAX) { t = Math.min(TMAX, t + dt * RATE); if (t >= TMAX) hold = HOLD; }
      else { hold -= dt; if (hold <= 0) t = 0; }
    }

    /* (3) afișajele numerice (în afara desenului) */
    function report() {
      var s = state(t);
      ro.set('v', RF.fmt.c(s.b, 3));
      ro.set('g', RF.fmt.n(s.g, 2));
      ro.set('p', RF.fmt.n(s.tau, 1));
      ro.set('a', pct(100 / (s.g * s.g * s.g)));
      ro.set('n', RF.fmt.c(s.bn, 2) + (s.bn > 1 ? '  ✗' : ''));
    }

    RF.sim.loop(host, function (dt) { step(dt); drawScene(); report(); });

    /* (2) TOT desenul e aici: drawScene() citește doar starea (t, force, showNewton) */
    function drawScene() {
      var A = RF.art, P = RF.sim.palette(), W = cv.W, H = cv.H;
      if (W < 60 || H < 120) return;
      D.clear(cv);
      var s = state(t), gh = H - 96;
      var g = A.graph(ctx, { x: 6, y: 6, w: W - 12, h: gh }, {
        xmin: 0, xmax: TMAX, ymin: 0, ymax: YMAX, xlabel: 'timpul cât împingi', ylabel: 'viteza',
        xticks: [0, 1, 2, 3, 4], yticks: [{ v: 0, label: '0' }, { v: 0.5, label: '0,5 c' }, { v: 1, label: 'c' }, { v: 1.5, label: '1,5 c' }]
      });
      g.hband(1, YMAX, { color: P.bad, alpha: 0.1, hatch: true, label: 'interzis: peste c', labelPos: 'top' });
      g.hline(1, { color: P.light, dash: [7, 5], w: 2 });
      if (showNewton) {
        g.curve(function (x) { return force * x; }, { color: P.tx2, w: 1.8, dash: [5, 5], fill: false, alpha: 0.35 });
        g.curve(function (x) { return force * x; }, { color: s.bn > 1 ? P.bad : P.tx2, w: 2.6, dash: [7, 5], fill: false, to: t });
      }
      g.curve(function (x) { return state(x).b; }, { color: P.good, w: 2, fill: false, alpha: 0.28 });
      g.curve(function (x) { return state(x).b; }, { color: P.good, w: 3.8, glow: true, fill: true, to: t });
      g.point(t, s.b, { color: P.good, t: t });
      if (showNewton && s.bn <= YMAX) g.point(t, s.bn, { color: s.bn > 1 ? P.bad : P.tx2, r: 5 });
      var mk = [{ v: Math.min(s.b, 1.499), label: 'real ' + RF.fmt.c(s.b, 3), color: P.good, side: 'up' }];
      if (showNewton) mk.push({ v: Math.min(s.bn, 1.499), label: 'clasic ' + RF.fmt.c(s.bn, 2) + (s.bn > 1 ? ' ✗' : ''), color: s.bn > 1 ? P.bad : P.tx2, side: 'down' });
      A.speedBar(ctx, 24, H - 40, W - 48, { max: 1.5, ticks: [0, 0.5, 1, 1.5], fill: { v: Math.min(s.b, 1.499), color: P.good }, markers: mk, t: t });
    }
  };
})();
