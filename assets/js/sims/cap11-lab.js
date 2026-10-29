/* Capitolul 11 — „Laboratorul virtual” (c11Laborator): tub fotoelectric + două grafice.
   Structură: (1) starea și fizica (calc / reach / update), (2) desenul, adunat în drawScene(). */
(function () {
  'use strict';
  var RF = window.RF, D = RF.draw;

  var HEV = 0.41357;            // h în eV pe 10^14 Hz (h = 4,1357·10^-15 eV·s)
  var LAMBDA = 2998;            // λ[nm] = 2998 / ν[10^14 Hz]
  var NU_MIN = 2.5, NU_MAX = 12, KAPPA = 0.22;
  var METALS = [
    { k: 'Cs', name: 'Cesiu', L: 2.1 },
    { k: 'K', name: 'Potasiu', L: 2.3 },
    { k: 'Na', name: 'Sodiu', L: 2.4 },
    { k: 'Zn', name: 'Zinc', L: 4.3 },
    { k: 'Cu', name: 'Cupru', L: 4.7 }
  ];

  RF.sims.c11Laborator = function (host, api) {
    /* ---------- structura: aparatul sus, două grafice dedesubt ---------- */
    var cA = RF.el('div', { class: 'c11-cell c11-cell--wide' });
    var cB = RF.el('div', { class: 'c11-cell c11-cell--g' });
    var cC = RF.el('div', { class: 'c11-cell c11-cell--g' });
    api.stage.appendChild(RF.el('div', { class: 'c11-grid' }, [cA, cB, cC]));
    var cvA = RF.sim.canvas(cA, { aspect: 16 / 8.4, minH: 280, maxH: 410 });
    var cvB = RF.sim.canvas(cB, { aspect: 4 / 3, minH: 230, maxH: 330 });
    var cvC = RF.sim.canvas(cC, { aspect: 4 / 3, minH: 230, maxH: 330 });

    /* ---------- (1) starea ---------- */
    var S = { metal: 1, nu: 8.0, inten: 60, U: 0 };
    var photons = [], electrons = [], puffs = [], acc = 0, clock = 0, flow = 0;

    function calc() {
      var m = METALS[S.metal], E = HEV * S.nu, emits = E >= m.L - 1e-9;
      return { m: m, E: E, L: m.L, emits: emits, Ec: emits ? Math.max(0, E - m.L) : 0, nu0: m.L / HEV, lam: LAMBDA / S.nu };
    }
    /* fracția fotoelectronilor care ajung la anod, la tensiunea U (negativ = frânare) */
    function reach(Ec, U) {
      if (U >= -0.25 * Ec) return 1;
      if (U <= -Ec) return 0;
      return (Ec + U) / (0.75 * Ec);
    }
    function current(c, U) { return c.emits ? S.inten / 100 * reach(c.Ec, U) : 0; }

    function newElectron(f, Ec) {
      var K0 = Ec * (0.25 + 0.75 * Math.random());
      return { s: 0, v: Math.sqrt(2 * KAPPA * K0), f: f, age: 0, state: 0, t: 0 };
    }
    function update(dt) {
      if (!(dt > 0)) return;
      var c = calc(), i;
      clock += dt;
      acc += (0.4 + 9 * S.inten / 100) * dt;
      while (acc >= 1) { acc -= 1; photons.push({ p: 0, f: Math.random() }); }
      for (i = photons.length - 1; i >= 0; i--) {
        var ph = photons[i];
        ph.p += dt / 0.55;
        if (ph.p >= 1) {
          if (c.emits) electrons.push(newElectron(ph.f, c.Ec)); else puffs.push({ f: ph.f, age: 0 });
          photons.splice(i, 1);
        }
      }
      var a = KAPPA * S.U;
      for (i = electrons.length - 1; i >= 0; i--) {
        var e = electrons[i];
        e.age += dt;
        if (e.state === 0) {
          e.s += e.v * dt + 0.5 * a * dt * dt; e.v += a * dt;
          if (e.s >= 1) { e.s = 1; e.state = 1; e.t = 0; }
          else if (e.s <= 0 && e.v < 0) { e.s = 0; e.state = 2; e.t = 0; }
          else if (e.age > 14) { e.state = 2; e.t = 0; }
        } else {
          e.t += dt;
          if (e.t > 0.35) electrons.splice(i, 1);
        }
      }
      for (i = puffs.length - 1; i >= 0; i--) { puffs[i].age += dt; if (puffs[i].age > 0.9) puffs.splice(i, 1); }
      flow = (flow + dt * (0.12 + 0.9 * current(c, S.U))) % 1;
      if (photons.length > 80) photons.length = 80;
      if (electrons.length > 120) electrons.splice(0, electrons.length - 120);
    }

    /* ---------- controalele ---------- */
    var seg = RF.ui.segmented(api.controls, {
      label: 'Catodul (metalul) — fiecare metal are alt L<sub>ex</sub>', value: METALS[S.metal].k, wide: true,
      options: METALS.map(function (m) { return { k: m.k, label: m.k }; }),
      onChange: function (k) { S.metal = METALS.map(function (m) { return m.k; }).indexOf(k); info(); }
    });
    var slNu = RF.ui.slider(api.controls, {
      label: 'Frecvența luminii ν', min: NU_MIN, max: NU_MAX, step: 0.05, value: S.nu, tone: 'light',
      fmt: function (v) { return RF.fmt.n(v, 2) + '·10¹⁴ Hz · ' + Math.round(LAMBDA / v) + ' nm'; },
      onInput: function (v) { S.nu = v; info(); }
    });
    var slI = RF.ui.slider(api.controls, {
      label: 'Intensitatea (câți fotoni pe secundă)', min: 5, max: 100, step: 1, value: S.inten, tone: 's2',
      fmt: function (v) { return Math.round(v) + '%'; },
      onInput: function (v) { S.inten = v; info(); }
    });
    var slU = RF.ui.slider(api.controls, {
      label: 'Tensiunea aplicată U (negativ = frânare)', min: -4, max: 4, step: 0.05, value: S.U,
      fmt: function (v) { return (v > 0.004 ? '+' : v < -0.004 ? '−' : '') + RF.fmt.n(Math.abs(v), 2) + ' V'; },
      onInput: function (v) { S.U = v; info(); }
    });
    RF.ui.buttons(api.controls, [
      { label: 'Roșu, foarte intens', onClick: function () { slNu.set(4.3); slI.set(100); } },
      { label: 'UV, foarte slab', onClick: function () { slNu.set(12); slI.set(8); } },
      { label: '↻ Revino', onClick: function () { slNu.set(8, true); slI.set(60, true); slU.set(0, true); S.nu = 8; S.inten = 60; S.U = 0; info(); } }
    ]);
    var ro = RF.ui.readouts(api.controls, [
      { k: 'm', label: 'Catod' },
      { k: 'E', label: 'Energia unui foton hν' },
      { k: 'L', label: 'Lucrul de extracție L<sub>ex</sub>' },
      { k: 'Ec', label: 'Energia cinetică maximă E<sub>c</sub>' },
      { k: 'Us', label: 'Tensiunea de stopare U<sub>s</sub>' },
      { k: 'I', label: 'Fotocurent (unități relative)' }
    ]);
    function info() {
      var c = calc();
      ro.set('m', c.m.name + ' (' + c.m.k + ')');
      ro.set('E', RF.fmt.n(c.E, 2) + ' eV');
      ro.set('L', RF.fmt.n(c.L, 1) + ' eV');
      ro.set('Ec', c.emits ? RF.fmt.n(c.Ec, 2) + ' eV' : 'niciuna — sub prag');
      ro.set('Us', c.emits ? RF.fmt.n(c.Ec, 2) + ' V' : '—');
      ro.set('I', RF.fmt.n(current(c, S.U), 2));
    }
    info();
    for (var k = 0; k < 40; k++) update(0.05);          // ca să nu pornească „gol”
    RF.sim.loop(host, function (dt) { update(dt); drawScene(); });

    /* ==================================================================
       (2) DESENUL — tot ce atinge canvasul e aici (se poate reface cu RF.art)
       ================================================================== */
    function drawScene() {
      var P = RF.sim.palette(), c = calc();
      drawApparatus(P, c);
      drawCurrentGraph(P, c);
      drawLineGraph(P, c);
    }

    function tsub(ctx, base, sub, x, y, o) {            // text cu indice: E + c
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

    function geo(W, H) {
      var g = { tx0: W * 0.05, tx1: W * 0.95, ty0: H * 0.25, ty1: H * 0.66 };
      var th = g.ty1 - g.ty0;
      g.cw = RF.clamp(W * 0.05, 18, 36);
      g.cx = g.tx0 + W * 0.07; g.fx = g.cx + g.cw; g.ax = g.tx1 - W * 0.08;
      g.cy0 = g.ty0 + th * 0.10; g.cy1 = g.ty1 - th * 0.10;
      g.lampX = g.fx + W * 0.16; g.lampY = H * 0.075; g.yc = H * 0.86;
      return g;
    }

    function drawApparatus(P, c) {
      var A = RF.art, cv = cvA, ctx = cv.ctx, W = cv.W, H = cv.H;
      if (W < 60 || H < 60) return;
      var fs = W < 460 ? 11 : 12, g = geo(W, H), col = D.wavelengthColor(LAMBDA / S.nu);
      var ch = g.cy1 - g.cy0, aw = W * 0.05, ay = g.lampY + 14, i;
      D.clear(cv);

      // fasciculul de lumină (con luminos) și lampa
      var hy0 = g.cy0 + ch * 0.12, hy1 = g.cy0 + ch * 0.88, k = 0.35 + 0.65 * S.inten / 100;
      var cone = ctx.createLinearGradient(g.lampX, ay, g.fx, (hy0 + hy1) / 2);
      cone.addColorStop(0, D.rgba(col, 0.38 * k)); cone.addColorStop(1, D.rgba(col, 0.07 * k));
      ctx.fillStyle = cone;
      ctx.beginPath(); ctx.moveTo(g.lampX - aw / 2, ay); ctx.lineTo(g.lampX + aw / 2, ay); ctx.lineTo(g.fx, hy1); ctx.lineTo(g.fx, hy0); ctx.closePath(); ctx.fill();
      D.fillRR(ctx, g.lampX - aw / 2 - 8, g.lampY - 14, aw + 16, 28, 10, '#8693ad', 'rgba(255,255,255,.25)', 1.2);
      A.glow(ctx, g.lampX, ay - 3, 30, col, 0.5 + 0.4 * S.inten / 100);
      ctx.fillStyle = A.lighten(col, 0.55); ctx.beginPath(); ctx.ellipse(g.lampX, ay - 2, aw * 0.36, 5, 0, 0, 6.2832); ctx.fill();
      var reg = c.lam > 750 ? 'infraroșu' : c.lam < 380 ? 'ultraviolet' : 'lumină vizibilă';
      A.chip(ctx, reg + ' · ' + Math.round(c.lam) + ' nm', g.lampX + aw / 2 + 16, g.lampY + 2, { dot: col, size: fs - 1 });

      // tubul de sticlă vidat
      var tg = ctx.createLinearGradient(0, g.ty0, 0, g.ty1);
      tg.addColorStop(0, 'rgba(180,215,255,.22)'); tg.addColorStop(0.5, 'rgba(180,215,255,.06)'); tg.addColorStop(1, 'rgba(180,215,255,.16)');
      D.rrect(ctx, g.tx0, g.ty0, g.tx1 - g.tx0, g.ty1 - g.ty0, 24); ctx.fillStyle = tg; ctx.fill();
      ctx.strokeStyle = 'rgba(190,222,255,.6)'; ctx.lineWidth = 2.5; ctx.stroke();
      ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 3; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(g.tx0 + 30, g.ty0 + 7); ctx.lineTo(g.tx1 - 60, g.ty0 + 7); ctx.stroke(); ctx.restore();
      A.chip(ctx, 'tub vidat', g.tx1 - 12, g.ty1 - 4, { align: 'right', size: 10.5, color: P.tx3 });

      // catodul: placă metalică cu rețea de ioni și electroni liberi
      var cg = ctx.createLinearGradient(g.cx, 0, g.cx + g.cw, 0);
      cg.addColorStop(0, '#f0f4fb'); cg.addColorStop(0.5, '#aeb9ce'); cg.addColorStop(1, '#707c94');
      D.fillRR(ctx, g.cx, g.cy0, g.cw, ch, 6, cg, 'rgba(255,255,255,.35)', 1.2);
      var cols = Math.max(1, Math.floor(g.cw / 11)), rows = Math.max(2, Math.floor(ch / 11));
      for (i = 0; i < cols * rows; i++) A.sphere(ctx, g.cx + ((i % cols) + 0.5) * g.cw / cols, g.cy0 + (Math.floor(i / cols) + 0.5) * ch / rows, 3.6, '#ff9a6b');
      for (i = 0; i < 9; i++) {
        A.electron(ctx, g.cx + g.cw * (0.25 + 0.5 * ((i * 0.37) % 1)) + 2.5 * Math.sin(clock * 2 + i * 2.1), g.cy0 + ch * ((i + 0.5) / 9) + 2.5 * Math.cos(clock * 1.7 + i), 2.3);
      }
      A.chip(ctx, 'catod ' + c.m.k, g.cx + g.cw / 2, g.cy0 - 14, { align: 'center', dot: '#ff9a6b', size: fs - 1 });
      // anodul
      var ag = ctx.createLinearGradient(g.ax - 4, 0, g.ax + 4, 0); ag.addColorStop(0, '#e6ecf6'); ag.addColorStop(1, '#8b97ab');
      D.fillRR(ctx, g.ax - 4, g.cy0, 8, ch, 4, ag);
      A.chip(ctx, 'anod', g.ax, g.cy0 - 14, { align: 'center', size: fs - 1, dot: P.tx2 });

      // fotonii în drum spre catod
      for (i = 0; i < photons.length; i++) {
        var ph = photons[i], sx = g.lampX + (ph.f - 0.5) * aw, hx = g.fx, hy = g.cy0 + ch * (0.12 + 0.76 * ph.f);
        var px = sx + (hx - sx) * ph.p, py = ay + (hy - ay) * ph.p;
        A.photon(ctx, px, py, 3.6, { color: col, angle: Math.atan2(hy - ay, hx - sx), tail: 16, lite: true, t: clock });
      }
      // fotoni absorbiți fără efect (sub prag)
      for (i = 0; i < puffs.length; i++) {
        var pf = puffs[i];
        ctx.save(); ctx.globalAlpha = Math.max(0, 1 - pf.age / 0.9);
        A.badge(ctx, 'no', g.fx + 11, g.cy0 + ch * (0.12 + 0.76 * pf.f), 6);
        ctx.restore();
      }
      // fotoelectronii
      for (i = 0; i < electrons.length; i++) {
        var e = electrons[i], ey = g.cy0 + ch * (0.12 + 0.76 * e.f), ex = g.fx + e.s * (g.ax - g.fx);
        ctx.save(); ctx.globalAlpha = e.state === 0 ? 1 : Math.max(0, 1 - e.t / 0.35);
        A.electron(ctx, ex, ey, 4.2);
        ctx.restore();
        if (e.state === 1) D.ring(ctx, g.ax, ey, 4 + 10 * e.t / 0.35, D.rgba(P.s1, 0.7), 1.5);
      }

      // verdictul
      A.chip(ctx, c.emits ? 'hν ≥ L_ex: ies fotoelectroni' : 'hν < L_ex: niciun electron', g.tx1 - 14, g.ty0 + 24, { align: 'right', dot: c.emits ? P.good : P.bad, size: fs, color: c.emits ? P.good : P.bad });
      A.chip(ctx, 'e⁻', W - 10, 16, { align: 'right', dot: '#2f9bff', size: 10.5 });
      A.chip(ctx, 'foton', W - 62, 16, { align: 'right', dot: col, size: 10.5 });

      // circuitul exterior: fire de cupru, baterie, ampermetru
      var xc = g.cx + g.cw / 2, xa = g.ax, yc = g.yc, bx = xc + (xa - xc) * 0.30, mx = xc + (xa - xc) * 0.72;
      var cur = current(c, S.U);
      function wire(x1, y1, x2, y2) { D.line(ctx, x1, y1, x2, y2, '#7a4a28', 5); D.line(ctx, x1, y1 - 0.5, x2, y2 - 0.5, '#d9965a', 3); }
      wire(xc, g.cy1, xc, yc); wire(xa, g.cy1, xa, yc);
      wire(xc, yc, bx - 12, yc); wire(bx + 12, yc, mx - 30, yc); wire(mx + 30, yc, xa, yc);
      if (cur > 0.02) {
        var Lt = (yc - g.cy1) * 2 + (xa - xc), n = 8;
        for (i = 0; i < n; i++) {
          var d = ((i / n + flow) % 1) * Lt, qx, qy;
          if (d < yc - g.cy1) { qx = xa; qy = g.cy1 + d; }
          else if (d < yc - g.cy1 + (xa - xc)) { qx = xa - (d - (yc - g.cy1)); qy = yc; }
          else { qx = xc; qy = yc - (d - (yc - g.cy1) - (xa - xc)); }
          D.dot(ctx, qx, qy, 2.6, '#7fd0ff', 8);
        }
      }
      // bateria (tensiunea U, cu polaritate)
      var plusRight = S.U >= 0, bw = 22;
      D.fillRR(ctx, bx - bw, yc - 15, bw * 2, 30, 8, '#2c3a5c', 'rgba(255,255,255,.3)', 1.2);
      ctx.fillStyle = P.good; ctx.font = D.font(14, 800); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('+', plusRight ? bx + bw * 0.5 : bx - bw * 0.5, yc + 0.5); ctx.fillStyle = P.bad; ctx.fillText('−', plusRight ? bx - bw * 0.5 : bx + bw * 0.5, yc + 0.5);
      A.chip(ctx, 'U = ' + (S.U > 0.004 ? '+' : S.U < -0.004 ? '−' : '') + RF.fmt.n(Math.abs(S.U), 2) + ' V' + (S.U < -0.004 ? ' (frânare)' : ''), bx, yc + 30, { align: 'center', size: fs - 1, dot: S.U < -0.004 ? P.warn : P.acc });
      // ampermetrul
      var gr = Math.min(28, H * 0.075);
      A.gauge(ctx, mx, yc - 2, gr, { value: RF.clamp(cur, 0, 1), min: 0, max: 1, label: 'I', accent: P.light });
      A.chip(ctx, 'I = ' + RF.fmt.n(cur, 2), mx, yc + gr + 14, { align: 'center', size: fs - 1, dot: P.light });
    }

    /* axe + grilă pentru cele două grafice; întoarce funcțiile de transformare */
    function axes(cv, P, o) {
      var ctx = cv.ctx, W = cv.W, H = cv.H, g = { L: 38, R: W - 12, T: 38, B: H - 36 };
      g.x = function (v) { return g.L + (v - o.xmin) / (o.xmax - o.xmin) * (g.R - g.L); };
      g.y = function (v) { return g.B - (v - o.ymin) / (o.ymax - o.ymin) * (g.B - g.T); };
      var i;
      for (i = 0; i < o.xt.length; i++) {
        D.line(ctx, g.x(o.xt[i]), g.T, g.x(o.xt[i]), g.B, P.line, 1);
        D.text(ctx, String(o.xt[i]).replace('-', '−'), g.x(o.xt[i]), g.B + 14, { color: P.tx3, size: 11, align: 'center' });
      }
      for (i = 0; i < o.yt.length; i++) {
        D.line(ctx, g.L, g.y(o.yt[i]), g.R, g.y(o.yt[i]), o.yt[i] === 0 && o.zero ? P.tx3 : P.line, o.yt[i] === 0 && o.zero ? 1.6 : 1);
        D.text(ctx, String(o.yt[i]).replace('-', '−').replace('.', ','), g.L - 6, g.y(o.yt[i]) + 4, { color: P.tx3, size: 11, align: 'right' });
      }
      D.line(ctx, g.L, g.T, g.L, g.B, P.tx3, 1.5); D.line(ctx, g.L, g.B, g.R, g.B, P.tx3, 1.5);
      D.text(ctx, o.title, 10, 17, { color: P.tx, size: 12, weight: 650 });
      D.text(ctx, o.xl, g.R, H - 6, { color: P.tx2, size: 11, align: 'right' });
      D.text(ctx, o.yl, g.L + 6, g.T - 8, { color: P.tx2, size: 11 });
      return g;
    }
    function curve(ctx, g, fn, x0, x1, color, w, dash) {
      ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineJoin = 'round';
      if (dash) ctx.setLineDash(dash);
      ctx.beginPath();
      for (var i = 0; i <= 120; i++) {
        var xv = x0 + (x1 - x0) * i / 120, px = g.x(xv), py = g.y(fn(xv));
        if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py);
      }
      ctx.stroke(); ctx.restore();
    }

    function drawCurrentGraph(P, c) {
      var A = RF.art, cv = cvB, ctx = cv.ctx;
      if (cv.W < 60 || cv.H < 60) return;
      D.clear(cv);
      var gr = A.graph(ctx, { x: 6, y: 6, w: cv.W - 12, h: cv.H - 12 }, { xmin: -4, xmax: 4, ymin: 0, ymax: 1.15, xlabel: 'U (V)', ylabel: 'I', title: cv.W > 330 ? 'Fotocurentul în funcție de tensiune' : 'I(U)', xticks: [-4, -2, 0, 2, 4], yticks: [0, 0.5, 1] });
      gr.curve(function (u) { return c.emits ? reach(c.Ec, u) : 0; }, { color: P.tx3, w: 2, dash: [6, 5], fill: false });
      gr.curve(function (u) { return current(c, u); }, { color: P.light, w: 3.4, glow: true, fill: true });
      if (c.emits && c.Ec > 0.02 && c.Ec <= 4) gr.vline(-c.Ec, { color: P.bad, dash: [4, 4], label: '−U_s', labelAt: 'top' });
      gr.point(S.U, current(c, S.U), { color: P.s1, drop: true });
      if (!c.emits) gr.text(0, 0.5, 'sub prag: nicio emisie', { color: P.bad, align: 'center' });
    }

    function drawLineGraph(P, c) {
      var A = RF.art, cv = cvC, ctx = cv.ctx;
      if (cv.W < 60 || cv.H < 60) return;
      D.clear(cv);
      var gr = A.graph(ctx, { x: 6, y: 6, w: cv.W - 12, h: cv.H - 12 }, { xmin: 0, xmax: 12, ymin: -5, ymax: 3.2, xlabel: 'ν (10¹⁴ Hz)', ylabel: 'E_c (eV)', title: cv.W > 330 ? 'Energia cinetică în funcție de frecvență' : 'E_c(ν)', xticks: [0, 2, 4, 6, 8, 10, 12], yticks: [-4, -2, 0, 2] });
      var i;
      for (i = 0; i < METALS.length; i++) {
        if (i === S.metal) continue;
        (function (L) { gr.curve(function (x) { return HEV * x - L; }, { color: P.tx3, w: 1.6, alpha: 0.6, fill: false }); })(METALS[i].L);
      }
      gr.curve(function (x) { return HEV * x - c.L; }, { color: P.light, w: 2, dash: [5, 5], fill: false, from: 0, to: c.nu0 });
      gr.curve(function (x) { return HEV * x - c.L; }, { color: P.light, w: 3.6, glow: true, fill: false, from: c.nu0, to: 12 });
      gr.point(0, -c.L, { color: P.light, label: '−L_ex' });
      gr.point(c.nu0, 0, { color: P.good, label: 'ν_0' });
      if (c.emits) gr.point(S.nu, c.Ec, { color: P.s1, drop: true });
      else { gr.vline(S.nu, { color: P.bad, dash: [4, 4] }); gr.text(S.nu, 0.6, '✗ sub prag', { color: P.bad, align: 'center' }); }
    }
  };
})();
