/* Capitolul 6 — Dilatarea timpului și gemenii: c06Ceas (ceasul cu lumină) și c06Gemeni (paradoxul gemenilor) — RF.art */
(function () {
  'use strict';
  var RF = window.RF, D = RF.draw, A = RF.art;
  function gam(b) { return 1 / Math.sqrt(1 - b * b); }
  function panel(ctx, x, y, w, h, col) {
    var P = RF.sim.palette();
    D.fillRR(ctx, x, y, w, h, 14, 'rgba(8,14,34,.55)', D.rgba(col || P.line2, 0.7), 1.5);
  }

  /* ===================================================================
     1. ceasul cu lumină: în repaus (Bogdan) vs. în mișcare (Ana)
     =================================================================== */
  RF.sims.c06Ceas = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 16 / 9, minH: 300, maxH: 440 });
    var beta = 0.8, T0 = 2.6, clockT = 0, ro;
    RF.ui.slider(api.controls, {
      label: 'Viteza ceasului față de Ana', min: 0, max: 0.95, step: 0.01, value: beta, tone: 's2',
      fmt: function (v) { return RF.fmt.c(v, 2); }, onInput: function (v) { beta = v; clockT = 0; info(); }
    });
    RF.ui.buttons(api.controls, [{ label: '↻ Repornește', onClick: function () { clockT = 0; } }]);
    ro = RF.ui.readouts(api.controls, [
      { k: 'g', label: 'Factorul γ' }, { k: 'T0', label: 'Un tic-tac, pentru Bogdan' }, { k: 'T', label: 'Un tic-tac, văzut de Ana' }
    ]);
    function info() {
      var g = gam(beta);
      ro.set('g', RF.fmt.n(g, 2)); ro.set('T0', '1,00 unități'); ro.set('T', RF.fmt.n(g, 2) + ' unități');
    }
    info();

    RF.sim.loop(host, function (dt, t) {
      clockT += dt;
      draw(clockT, t);
    });

    function draw(tt, t) {
      var ctx = cv.ctx, W = cv.W, H = cv.H, P = RF.sim.palette(), g = gam(beta), fs = W < 460 ? 11 : 12.5;
      A.space(ctx, W, H, { t: t, nebula: true });
      var wide = W >= 520, lw = wide ? W * 0.34 : W * 0.4, gap = 10, top = 8, ph = H - 16;
      panel(ctx, 8, top, lw, ph, P.s2);
      panel(ctx, 8 + lw + gap, top, W - lw - gap - 16, ph, P.s1);
      var h = Math.min(ph * 0.5, 170), cyc = ph * 0.58, c = 2 * h / T0;

      /* --- stânga: ceasul în repaus (Bogdan): lumina urcă și coboară drept --- */
      var cx0 = 8 + lw / 2, phase0 = (tt / T0) % 1, n0 = Math.floor(tt / T0);
      A.lightClock(ctx, cx0, cyc, h, { accent: P.s2, phase: phase0, t: t });
      A.chip(ctx, 'Bogdan (în ceas)', cx0, top + 22, { align: 'center', dot: P.s2, size: fs });
      A.chip(ctx, 'tic-taci: ' + n0, cx0, top + ph - 24, { align: 'center', dot: P.s2, size: fs });
      A.chip(ctx, 'lumina merge drept', cx0, top + ph - 54, { align: 'center', color: P.tx2, size: fs - 1 });

      /* --- dreapta: ceasul în mișcare, văzut de Ana: lumina face o diagonală --- */
      var px0 = 8 + lw + gap, pw = W - lw - gap - 16, T = g * T0, v = beta * c;
      var span = pw * 0.8, x0 = px0 + pw * 0.12, wrap = span + 0.0;
      var tt2 = tt % ((span - 40) / Math.max(v, 1e-6) + 0.0001) ;
      var tw = beta > 0.001 ? Math.min(tt % ((span - 30) / v), 1e9) : tt;      // timp în ciclul curent (față de ieșire)
      var cx = x0 + (beta > 0.001 ? v * tw : 0), n1 = Math.floor(tt / T);
      var phaseS = (tw / T) % 1;
      // urma luminii (zigzag) pentru ultimele două jumătăți de perioadă
      var half = T / 2, k = Math.floor(tw / half), pts = [], j;
      for (j = Math.max(0, k - 3); j <= k + 1; j++) {
        var tj = Math.min(j * half, tw);
        pts.push({ x: x0 + v * tj + 0, y: (j % 2 === 0) ? cyc + h / 2 : cyc - h / 2 });
      }
      pts[pts.length - 1] = { x: cx, y: cyc + h * (0.5 - (phaseS < 0.5 ? phaseS * 2 : 2 - phaseS * 2)) };
      if (beta > 0.02 && pts.length > 1) A.zigzag(ctx, pts, { color: P.light, w: 3, arrows: false });
      A.lightClock(ctx, cx, cyc, h, { accent: P.s2, phase: phaseS, t: t });
      A.chip(ctx, 'Ana (privește)', px0 + pw / 2, top + 22, { align: 'center', dot: P.s1, size: fs });
      A.chip(ctx, 'tic-taci: ' + n1, px0 + pw / 2, top + ph - 24, { align: 'center', dot: P.s1, size: fs });
      A.chip(ctx, 'lumina face o diagonală, mai lungă', px0 + pw / 2, top + ph - 54, { align: 'center', color: P.tx2, size: fs - 1 });
      if (beta > 0.02) A.chip(ctx, 'v = ' + RF.fmt.c(beta, 2), cx, cyc - h / 2 - 26, { align: 'center', dot: P.s2, size: fs - 1 });
    }
  };

  /* ===================================================================
     2. paradoxul gemenilor: diagrama spațiu-timp (c = 1, ani și ani-lumină)
     =================================================================== */
  RF.sims.c06Gemeni = function (host, api) {
    var inStory = !!api.steps;
    var cv = RF.sim.canvas(api.stage, { aspect: inStory ? 1.05 : 16 / 10.5, minH: 330, maxH: 520 });
    var beta = 0.8, dist = 3, prog = 0, hold = 0, stage = 0, show = true, ro;
    if (!inStory) {
      RF.ui.slider(api.controls, {
        label: 'Viteza lui Bogdan', min: 0.3, max: 0.95, step: 0.01, value: beta, tone: 's2',
        fmt: function (v) { return RF.fmt.c(v, 2); }, onInput: function (v) { beta = v; prog = 0; info(); }
      });
      RF.ui.slider(api.controls, {
        label: 'Distanța până la stea', min: 1, max: 4, step: 0.1, value: dist, tone: 'light',
        fmt: function (v) { return RF.fmt.n(v, 1) + ' ani-lumină'; }, onInput: function (v) { dist = v; prog = 0; info(); }
      });
      RF.ui.toggle(api.controls, { label: 'Arată ce „acum” vede Bogdan pe Pământ', value: true, onChange: function (b) { show = b; } });
      ro = RF.ui.readouts(api.controls, [
        { k: 'a', label: 'Ana (rămâne pe Pământ)' }, { k: 'b', label: 'Bogdan (călătorește)' }, { k: 'j', label: 'Salt de simultaneitate la întoarcere' }
      ]);
      info();
    } else {
      api.steps.addEventListener('rf:step', function (e) { stage = e.detail.stage; prog = stage >= 3 ? 1 : stage === 2 ? 0.5 : stage === 1 ? 0.25 : 0; });
    }
    function info() {
      if (!ro) return;
      var g = gam(beta), T = 2 * dist / beta;
      ro.set('a', RF.fmt.n(T, 1) + ' ani'); ro.set('b', RF.fmt.n(T / g, 1) + ' ani'); ro.set('j', RF.fmt.n(2 * beta * dist, 1) + ' ani');
    }

    RF.sim.loop(host, function (dt, t) {
      if (!inStory) { if (prog < 1) prog = Math.min(1, prog + dt / 9); else { hold += dt; if (hold > 2.2) { hold = 0; prog = 0; } } }
      draw(t);
    });

    function draw(t) {
      var ctx = cv.ctx, W = cv.W, H = cv.H, P = RF.sim.palette(), g = gam(beta), fs = W < 460 ? 11 : 12.5;
      D.clear({ ctx: ctx, W: W, H: H });
      var T = 2 * dist / beta, side = W >= 560 && !inStory, dw = side ? W * 0.58 : W - 16;
      var st = A.spacetime(ctx, { x: 8, y: 8, w: dw, h: H - 16 }, {
        xmin: -0.8, xmax: dist + 1, tmin: -0.5, tmax: T + 0.8, equal: true, cone: false, coneLabels: false, lightLabel: false
      });
      var tTurn = dist / beta;
      // linia de univers a Anei și a lui Bogdan, cu tic-taci de timp propriu (câte un an)
      st.worldline([[0, 0], [0, T]], { color: P.s1, w: 4, ticks: 1, label: 'Ana', arrow: false });
      st.worldline([[0, 0], [dist, tTurn], [0, T]], { color: P.s2, w: 4, ticks: g > 0 ? g : 1, label: 'Bogdan', arrow: false });
      // „acum” pentru Bogdan, la întoarcere: două linii de simultaneitate
      if (show && (inStory ? stage >= 2 : true)) {
        st.simLine(tTurn, { beta: beta, x0: dist, color: P.s2, dash: [6, 5], from: 0, to: dist });
        st.simLine(tTurn, { beta: -beta, x0: dist, color: P.s2, dash: [6, 5], from: 0, to: dist });
        st.event(0, tTurn - beta * dist, { color: P.s2, r: 5, label: 'înainte de întoarcere', pos: 'e' });
        st.event(0, tTurn + beta * dist, { color: P.s2, r: 5, label: 'după întoarcere', pos: 'e' });
      }
      st.event(dist, tTurn, { color: P.light, r: 7, label: 'steaua', pos: 'w' });
      // evenimentele „acum”
      var tc = prog * T, onA = [0, tc], xB = tc <= tTurn ? beta * tc : dist - beta * (tc - tTurn);
      var tauB = tc / g;
      st.event(0, tc, { color: P.s1, r: 6, pos: 'e' });
      st.event(xB, tc, { color: P.s2, r: 6, pos: 'e' });
      st.segment(0, tc, xB, tc, { color: D.rgba(P.tx2, 0.5), dash: [4, 5], w: 1.5 });

      /* ani — panou lateral (sau chips) */
      var ageA = RF.fmt.n(tc, 1) + ' ani', ageB = RF.fmt.n(tauB, 1) + ' ani';
      if (side) {
        var rx = 8 + dw + 10, rw = W - rx - 8, cx = rx + rw / 2;
        panel(ctx, rx, 8, rw, H - 16, P.line2);
        A.person(ctx, cx - rw * 0.22, H * 0.46, H * 0.3, A.ana({ pose: 'stand', t: t, badge: 'S', look: 0.3 }));
        A.person(ctx, cx + rw * 0.22, H * 0.46, H * 0.3, A.bogdan({ pose: 'stand', t: t, badge: 'S′', look: -0.3, seed: 2 }));
        A.digital(ctx, cx - rw * 0.22, H * 0.62, rw * 0.4, ageA, { color: P.s1 });
        A.digital(ctx, cx + rw * 0.22, H * 0.62, rw * 0.4, ageB, { color: P.s2 });
        A.chip(ctx, 'vârsta Anei', cx - rw * 0.22, H * 0.72, { align: 'center', dot: P.s1, size: fs });
        A.chip(ctx, 'vârsta lui Bogdan', cx + rw * 0.22, H * 0.72, { align: 'center', dot: P.s2, size: fs });
        if (prog >= 0.999) A.chip(ctx, 'Bogdan e mai tânăr', cx, H * 0.84, { align: 'center', dot: P.good, size: fs, color: P.good });
      } else {
        A.chip(ctx, 'Ana: ' + ageA, 16, 24, { dot: P.s1, size: fs });
        A.chip(ctx, 'Bogdan: ' + ageB, 16, 52, { dot: P.s2, size: fs });
        if (prog >= 0.999) A.chip(ctx, 'Bogdan e mai tânăr', 16, 80, { dot: P.good, size: fs, color: P.good });
      }
    }
  };
})();
