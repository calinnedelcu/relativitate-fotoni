/* Capitolul 8 — scena poveștii „Cât de tare împingi?”: împingeri egale, sărituri de viteză tot mai scurte */
(function () {
  'use strict';
  var RF = window.RF, D = RF.draw;

  var XR = 1.8;                                   // axa vitezelor merge până la 1,8 c
  function betaReal(k) { var p = 0.5 * k; return p / Math.sqrt(1 + p * p); }   // k împingeri egale (Δp = 0,5 m₀c)
  function betaNewton(k) { return 0.5 * k; }

  /* stagiile poveștii: câte sărituri se văd și cât de vizibile sunt elementele */
  var STAGES = [
    { n1: 2, n2: 0, aN: 1, aF: 0.35, aR: 0.3, inf: 0 },
    { n1: 3, n2: 0, aN: 1, aF: 1, aR: 0.45, inf: 0 },
    { n1: 3, n2: 20, aN: 0.5, aF: 0.7, aR: 1, inf: 0 },
    { n1: 3, n2: 20, aN: 0.22, aF: 0.5, aR: 1, inf: 1 }
  ];

  RF.sims.c08Poveste = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 16 / 10, minH: 300, maxH: 430 });
    var ctx = cv.ctx;
    var stage = 0, st = { n1: 2, n2: 0, aN: 1, aF: 0.35, aR: 0.3, inf: 0 }, clock = 0;

    if (api.steps) api.steps.addEventListener('rf:step', function (e) {
      stage = Math.max(0, Math.min(STAGES.length - 1, e.detail.stage | 0));
    });

    function approach(v, target, up, down) {
      return v < target ? Math.min(target, v + up) : Math.max(target, v - down);
    }

    /* (1) starea: săriturile apar una câte una, elementele se estompează lin */
    function step(dt) {
      if (!(dt > 0)) return;
      clock += dt;
      var T = STAGES[stage], k = Math.min(1, dt * 4);
      st.n1 = approach(st.n1, T.n1, dt * 2.4, dt * 8);
      st.n2 = approach(st.n2, T.n2, dt * 5, dt * 24);
      st.aN += (T.aN - st.aN) * k;
      st.aF += (T.aF - st.aF) * k;
      st.aR += (T.aR - st.aR) * k;
      st.inf += (T.inf - st.inf) * k;
    }

    RF.sim.loop(host, function (dt) { step(dt); drawScene(); });

    /* (2) TOT desenul e aici; citește doar starea (st, clock) */
    function drawScene() {
      var A = RF.art, P = RF.sim.palette(), W = cv.W, H = cv.H;
      if (W < 100 || H < 200) return;
      var small = W < 460, fs = small ? 11 : 12, k;
      D.clear(cv);
      var x0 = 18, x1 = W - 18;
      function X(b) { return x0 + (x1 - x0) * b / XR; }
      var topPad = 28, botPad = small ? 58 : 62, hl = (H - topPad - botPad) / 2;
      var ax1 = topPad + hl - 26, ax2 = topPad + 2 * hl - 26, wx = X(1);
      var ryMax = Math.max(22, Math.min(80, hl - 54));

      // un sărit: semielipsă de la xa la xb; frac = cât din arc e desenat; întoarce vârful curent
      function hop(xa, xb, ay, frac, color, w) {
        var cx = (xa + xb) / 2, rx = (xb - xa) / 2, ry = Math.min(rx * 0.9, ryMax), n = Math.max(6, Math.round(26 * frac)), i, a;
        ctx.save();
        ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineCap = 'round';
        ctx.shadowColor = D.rgba(color, 0.7); ctx.shadowBlur = 8;
        ctx.beginPath();
        for (i = 0; i <= n; i++) {
          a = Math.PI * (1 - frac * i / n);
          if (i) ctx.lineTo(cx + rx * Math.cos(a), ay - ry * Math.sin(a)); else ctx.moveTo(cx + rx * Math.cos(a), ay - ry * Math.sin(a));
        }
        ctx.stroke();
        ctx.restore();
        a = Math.PI * (1 - frac);
        return { x: cx + rx * Math.cos(a), y: ay - ry * Math.sin(a) };
      }
      // o linie de sărituri: betaOf(k) = viteza după k împingeri
      function runLane(ay, n, betaOf, colorOf, dotR) {
        var full = Math.floor(n + 1e-9), part = n - full, kk, last = null;
        for (kk = 1; kk <= full + (part > 0.001 ? 1 : 0); kk++) {
          var fr = kk <= full ? 1 : part, xa = X(betaOf(kk - 1)), xb = X(betaOf(kk));
          var tip = hop(xa, xb, ay, fr, colorOf(kk), 2.6);
          if (kk <= full) A.sphere(ctx, xb, ay, dotR(kk), colorOf(kk));
          else last = tip;
        }
        A.sphere(ctx, X(0), ay, 4.5, P.tx2);
        if (last) A.sphere(ctx, last.x, last.y, 4, colorOf(full + 1));
      }

      // ---- linia 1: mecanica clasică ----
      ctx.save(); ctx.globalAlpha = st.aN;
      A.speedBar(ctx, x0, ax1, x1 - x0, { max: XR, ticks: [0, 0.5, 1, 1.5], h: 12, overLabel: 'peste c ✗' });
      A.chip(ctx, 'Mecanica clasică:  p = m·v', x0, topPad + 13, { dot: P.tx2, size: fs });
      runLane(ax1, st.n1, betaNewton, function (kk) { return betaNewton(kk) > 1.0001 ? P.bad : P.tx2; }, function () { return 5.5; });
      if (st.n1 > 2.9) {
        D.arrow(ctx, X(1.5) + 8, ax1 - 16, x1 - 2, ax1 - 16, { color: P.bad, w: 2, head: 8, dash: [4, 4] });
        A.chip(ctx, '2 c … ✗', x1 - 2, ax1 - 32, { dot: P.bad, align: 'right', size: fs });
      }
      ctx.restore();

      // ---- linia 2: relativitate ----
      ctx.save(); ctx.globalAlpha = Math.max(0.25, st.aR);
      A.speedBar(ctx, x0, ax2, x1 - x0, { max: XR, ticks: [0, 0.5, 1, 1.5], h: 12, overLabel: 'peste c ✗' });
      A.chip(ctx, 'Relativitate:  p = γ·m₀·v', x0, topPad + hl + 13, { dot: P.good, size: fs });
      if (st.n2 < 0.05) D.text(ctx, 'ce se întâmplă aici?', X(0.2), ax2 - 22, { color: P.tx3, size: fs + 1 });
      runLane(ax2, st.n2, betaReal, function () { return P.good; }, function (kk) { return kk > 6 ? 3 : kk > 3 ? 4 : 5.2; });
      if (st.n2 >= 2) D.ring(ctx, X(betaReal(2)), ax2, 9, P.light, 2);
      if (st.n2 >= 19.9) D.ring(ctx, X(betaReal(20)), ax2, 8, P.light, 2);
      ctx.restore();

      // ---- note jos (apar după ce săriturile s-au desenat) ----
      var a2 = Math.max(0, Math.min(1, (st.n2 - 1.5) / 1)), a20 = Math.max(0, Math.min(1, (st.n2 - 19.5) / 0.5)), keep = 1 - st.inf;
      var ny = ax2 + 40;
      ctx.save();
      ctx.globalAlpha = a2 * keep;
      A.chip(ctx, '2 împingeri (prima oră): ' + RF.fmt.c(betaReal(2), 2), x0, ny, { dot: P.light, size: fs });
      ctx.globalAlpha = a20 * keep;
      A.chip(ctx, '20 împingeri (10× mai mult timp): ' + RF.fmt.c(betaReal(20), 3), x0, ny + 24, { dot: P.light, size: fs });
      ctx.restore();

      // ---- „∞” lângă perete și concluzia, în ultimul pas ----
      if (st.inf > 0.02) {
        var pulse = 0.7 + 0.3 * Math.sin(clock * 3.2);
        ctx.save(); ctx.globalAlpha = st.inf;
        D.text(ctx, '∞', wx + 26, ax2 - 20, { color: D.rgba(P.light, pulse), size: small ? 28 : 34, weight: 700, align: 'center' });
        A.chip(ctx, 'ca să atingi c ți-ar trebui impuls infinit', x0, ny, { dot: P.light, size: fs });
        A.chip(ctx, 'dar fiecare împingere adaugă o treaptă finită', x0, ny + 24, { dot: P.tx2, size: fs });
        ctx.restore();
      }
    }
  };
})();
