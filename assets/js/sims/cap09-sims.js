/* Capitolul 9 — Energia: c09Bare, c09Poveste (scena „pe pași”), c09Curba, c09Triunghi — desenate cu RF.art */
(function () {
  'use strict';
  var RF = window.RF, D = RF.draw, A = RF.art;
  function gam(b) { return 1 / Math.sqrt(1 - b * b); }
  function n2(x) { return RF.fmt.n(x, x < 10 ? 2 : 1); }

  /* panou comun: bară de viteză + bare de energie (E0, Ec, E) pentru viteza β */
  function energyPanel(ctx, W, H, beta, t, o) {
    var P = RF.sim.palette(), g = gam(beta), fs = W < 460 ? 11 : 12.5;
    D.clear({ ctx: ctx, W: W, H: H });
    var sbY = H * 0.13;
    A.speedBar(ctx, 22, sbY, W - 44, {
      max: 1, ticks: [0, 0.5, 1], fill: { v: beta, color: P.s2 }, t: t,
      markers: [{ v: beta, label: 'v = ' + RF.fmt.c(beta, beta > 0.95 ? 3 : 2), color: P.s2, side: 'down' }]
    });
    var Ec = g - 1, items = [
      { label: 'E_0 (repaus)', value: 1, color: P.good },
      { label: 'E_c (cinetică)', value: Math.max(Ec, 0), color: P.s2 },
      { label: 'E (totală)', value: g, color: P.light, parts: [{ value: 1, color: P.good }, { value: Math.max(Ec, 0), color: P.s2 }] }
    ];
    A.bars(ctx, { x: 10, y: H * 0.27, w: W - 20, h: H * 0.7 }, items, {
      max: 8, fmt: function (v) { return n2(v) + ' E_0'; }, t: t, animate: false
    });
    if (o && o.note) A.chip(ctx, o.note, W - 14, H * 0.3, { align: 'right', dot: o.noteColor || P.acc, size: fs });
  }

  /* ---------- 1. bare de energie (liberă) ---------- */
  RF.sims.c09Bare = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 16 / 9, minH: 300, maxH: 430 });
    var beta = 0.6;
    var ro;
    RF.ui.slider(api.controls, {
      label: 'Viteza corpului', min: 0, max: 0.995, step: 0.001, value: beta, tone: 's2',
      fmt: function (v) { return RF.fmt.c(v, v > 0.95 ? 3 : 2); },
      onInput: function (v) { beta = v; info(); }
    });
    ro = RF.ui.readouts(api.controls, [
      { k: 'g', label: 'Factorul γ' }, { k: 'e', label: 'E față de E_0' }, { k: 'c', label: 'E_c față de E_0' }
    ]);
    function info() {
      var g = gam(beta);
      ro.set('g', RF.fmt.n(g, 2)); ro.set('e', RF.fmt.n(g, 2) + ' ×'); ro.set('c', RF.fmt.n(g - 1, 2) + ' ×');
    }
    info();
    RF.sim.loop(host, function (dt, t) {
      var g = gam(beta);
      energyPanel(cv.ctx, cv.W, cv.H, beta, t, { note: g - 1 < 0.05 ? 'v ≪ c: E_c abia se vede' : g > 3 ? 'ultrarelativist: E_c ≫ E_0' : 'relativist', noteColor: g - 1 < 0.05 ? P0().good : g > 3 ? P0().light : P0().acc });
    });
  };
  function P0() { return RF.sim.palette(); }

  /* ---------- 2. scena poveștii (stage 0..4) ---------- */
  RF.sims.c09Poveste = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 5 / 4.6, minH: 330, maxH: 460 });
    var targets = [0, 0.1, 0.87, 0.99, 0.8], stage = 0, cur = 0;
    if (api.steps) api.steps.addEventListener('rf:step', function (e) { stage = e.detail.stage; });
    var notes = ['stă pe loc: E = E_0', 'v ≪ c: fâșia roz abia se vede', 'E_c = E_0 (γ = 2)', 'aproape de c: E ≈ 7 E_0', 'E = E_0 + E_c'];
    RF.sim.loop(host, function (dt, t) {
      cur += (targets[stage] - cur) * Math.min(1, dt * 2.6);
      var p = RF.sim.palette();
      energyPanel(cv.ctx, cv.W, cv.H, Math.min(cur, 0.995), t, { note: notes[stage], noteColor: stage === 2 ? p.warn : p.acc });
    });
  };

  /* ---------- 3. curba E_c: clasic vs relativist ---------- */
  RF.sims.c09Curba = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 16 / 9.5, minH: 300, maxH: 440 });
    var beta = 0.5, ro;
    RF.ui.slider(api.controls, {
      label: 'Viteza corpului', min: 0.01, max: 0.98, step: 0.005, value: beta, tone: 'light',
      fmt: function (v) { return RF.fmt.c(v, 2); }, onInput: function (v) { beta = v; info(); }
    });
    ro = RF.ui.readouts(api.controls, [
      { k: 'r', label: 'E_c relativist / E_0' }, { k: 'c', label: 'E_c clasic (½β²) / E_0' }, { k: 'q', label: 'Formula clasică greșește cu' }
    ]);
    function info() {
      var rel = gam(beta) - 1, cls = 0.5 * beta * beta;
      ro.set('r', RF.fmt.n(rel, 3)); ro.set('c', RF.fmt.n(cls, 3)); ro.set('q', RF.fmt.n(100 * (rel - cls) / rel, 1) + ' %');
    }
    info();
    RF.sim.loop(host, function (dt, t) {
      var ctx = cv.ctx, W = cv.W, H = cv.H, P = RF.sim.palette();
      D.clear({ ctx: ctx, W: W, H: H });
      var g = A.graph(ctx, { x: 8, y: 8, w: W - 16, h: H - 16 }, {
        xmin: 0, xmax: 1, ymin: 0, ymax: 7, xlabel: 'viteza β = v/c', ylabel: 'E_c / E_0',
        xticks: [0, 0.2, 0.4, 0.6, 0.8, 1], yticks: [0, 1, 2, 3, 4, 5, 6, 7]
      });
      g.band(0, 0.12, { color: P.good, alpha: 0.14, label: 'v ≪ c' });
      g.curve(function (x) { return x >= 0.9999 ? NaN : 1 / Math.sqrt(1 - x * x) - 1; }, { color: P.light, w: 3.6, glow: true, fill: true });
      g.curve(function (x) { return 0.5 * x * x; }, { color: P.bad, w: 3, dash: [9, 7], fill: false });
      var rel = gam(beta) - 1, cls = 0.5 * beta * beta;
      g.vline(1, { color: P.tx3, dash: [4, 5], label: 'c', labelAt: 'top' });
      g.point(beta, Math.min(rel, 6.9), { color: P.light, label: 'relativist: ' + RF.fmt.n(rel, 2), drop: true, t: t });
      g.point(beta, cls, { color: P.bad, label: 'clasic: ' + RF.fmt.n(cls, 2) });
      g.legend([{ color: P.light, label: 'relativist: (γ − 1)·E_0' }, { color: P.bad, label: 'clasic: ½β²·E_0', dash: true }], { pos: 'tl' });
    });
  };

  /* ---------- 4. triunghiul E – pc – m0c² ---------- */
  RF.sims.c09Triunghi = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 16 / 9.5, minH: 300, maxH: 440 });
    var beta = 0.6, ro;
    RF.ui.slider(api.controls, {
      label: 'Viteza corpului', min: 0, max: 0.99, step: 0.001, value: beta, tone: 's2',
      fmt: function (v) { return RF.fmt.c(v, v > 0.95 ? 3 : 2); }, onInput: function (v) { beta = v; info(); }
    });
    ro = RF.ui.readouts(api.controls, [
      { k: 'e0', label: 'cateta m_0c² (repaus)' }, { k: 'pc', label: 'cateta p·c' }, { k: 'e', label: 'ipotenuza E' }
    ]);
    function info() {
      var g = gam(beta);
      ro.set('e0', '1,00 (mereu)'); ro.set('pc', RF.fmt.n(g * beta, 2)); ro.set('e', RF.fmt.n(g, 2));
    }
    info();
    RF.sim.loop(host, function (dt, t) {
      var ctx = cv.ctx, W = cv.W, H = cv.H, P = RF.sim.palette(), g = gam(beta);
      D.clear({ ctx: ctx, W: W, H: H });
      A.energyTriangle(ctx, { x: 8, y: 8, w: W - 16, h: H - 16 }, { E0: 1, pc: g * beta, max: 7.5, t: t, unit: 'E_0' });
      var regim = g - 1 < 0.05 ? 'v ≪ c — triunghiul e aproape doar cateta verticală' : g - 1 > 3 ? 'ultrarelativist — E ≈ pc' : 'relativist';
      A.chip(ctx, regim, W / 2, 24, { align: 'center', dot: g - 1 > 3 ? P.light : P.acc, size: W < 460 ? 11 : 12.5 });
    });
  };
})();
