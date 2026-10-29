/* Capitolul 4 (Adaos) — simulările libere: „c04Mijloc” (unde se întâlnesc luminile?)
   și „c04Nesimultane” (cât de nesimultane?).
   Fiecare simulare: (1) fizica = funcții pure fără desen, (2) starea + controalele,
   (3) un singur drawScene(...) cu toate apelurile de desen (sprite* = înlocuibile cu RF.art). */
(function () {
  'use strict';
  var RF = window.RF, D = RF.draw;

  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function n1(x) { return RF.fmt.n(x, 1); }

  /* sprite-uri locale (de înlocuit cu RF.art.*) */
  function spriteLightRing(ctx, P, x, y, r, alpha) {
    if (r <= 0) return;
    ctx.save();
    ctx.strokeStyle = D.rgba(P.light, 0.16 * alpha); ctx.lineWidth = 7;
    ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.stroke();
    ctx.strokeStyle = D.rgba(P.light, 0.95 * alpha); ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.stroke();
    ctx.restore();
  }
  function spriteBolt(ctx, P, x, y, age) {
    var d = 0.5;
    if (age < 0 || age > d) return;
    var k = age / d, r0 = 5 + 6 * k, r1 = 12 + 24 * k;
    ctx.save();
    ctx.globalAlpha = 1 - k;
    D.dot(ctx, x, y, 7 * (1 - 0.5 * k), P.light, 24);
    for (var i = 0; i < 8; i++) {
      var a = i * Math.PI / 4 + 0.2;
      D.line(ctx, x + Math.cos(a) * r0, y + Math.sin(a) * r0, x + Math.cos(a) * r1, y + Math.sin(a) * r1, P.light, 2.4);
    }
    ctx.restore();
  }
  function spriteEventMarker(ctx, P, x, y, letter, fs) {
    D.dot(ctx, x, y, 9.5, P.card);
    D.ring(ctx, x, y, 9.5, P.light, 2.2);
    D.text(ctx, letter, x, y + 4, { color: P.tx, size: fs - 1, weight: 700, align: 'center' });
  }

  /* ===================================================================
     1. c04Mijloc — „Unde se întâlnesc luminile?”
     =================================================================== */
  var TH = 1.5;       // s de animație: cât durează drumul luminii până la M
  var HOLD = 1.6;     // pauză la sfârșit

  /* fizica: momentele loviturilor, ale sosirilor la M și sfârșitul ciclului */
  function middleModel(delta) {
    var tA = 0.5 + Math.max(0, -delta), tB = 0.5 + Math.max(0, delta);
    return { tA: tA, tB: tB, arrA: tA + TH, arrB: tB + TH, end: Math.max(tA, tB) + TH + HOLD };
  }

  function drawMiddle(cv, P, m, t) {
    var ctx = cv.ctx, W = cv.W, H = cv.H, fs = W < 460 ? 11 : 12.5;
    D.clear(cv);
    var xA = W * 0.11, xB = W * 0.89, xM = W / 2, y = H * 0.66, cpx = (xM - xA) / TH;
    // axa și reperele A, M, B
    D.line(ctx, W * 0.03, y, W * 0.97, y, P.line2, 2);
    [[xA, 'A'], [xM, 'M · observator în repaus'], [xB, 'B']].forEach(function (p) {
      D.line(ctx, p[0], y - 6, p[0], y + 8, P.tx3, 2);
      D.text(ctx, p[1], p[0], y + 24, { color: p[1].charAt(0) === 'M' ? P.s1 : P.light, size: fs, weight: 700, align: 'center' });
    });
    // razele de lumină (decupate de marginile desenului)
    var rA = Math.max(0, cpx * (t - m.tA)), rB = Math.max(0, cpx * (t - m.tB));
    ctx.save();
    ctx.beginPath(); ctx.rect(0, 0, W, H); ctx.clip();
    spriteLightRing(ctx, P, xA, y, rA, clamp(1.2 - rA / (W * 0.6), 0.25, 1));
    spriteLightRing(ctx, P, xB, y, rB, clamp(1.2 - rB / (W * 0.6), 0.25, 1));
    ctx.restore();
    spriteBolt(ctx, P, xA, y, t - m.tA);
    spriteBolt(ctx, P, xB, y, t - m.tB);
    D.dot(ctx, xA, y, 5, P.light);
    D.dot(ctx, xB, y, 5, P.light);
    // observatorul din M
    D.dot(ctx, xM, y - 16, 7, P.s1, 12);
    D.line(ctx, xM, y - 9, xM, y, P.s1, 3);
    // sosirile
    var gotA = t >= m.arrA, gotB = t >= m.arrB;
    [[gotA, m.arrA, 'A'], [gotB, m.arrB, 'B']].forEach(function (p, i) {
      if (!p[0]) return;
      var k = (t - p[1]) / 0.55;
      if (k < 1) D.ring(ctx, xM, y - 16, 10 + 32 * k, D.rgba(P.light, 0.85 * (1 - k)), 2.5);
      var lx = xM + (i === 0 ? -1 : 1) * Math.max(58, W * 0.13), a = clamp((t - p[1]) / 0.2, 0, 1);
      ctx.save(); ctx.globalAlpha = a;
      D.label(ctx, 'lumina din ' + p[2], lx, y - 40, { size: fs - 0.5, color: P.light, border: D.rgba(P.light, 0.6), align: 'center' });
      ctx.restore();
    });
    // concluzia observatorului, după ce a primit ambele lumini
    var done = Math.max(m.arrA, m.arrB);
    if (t >= done + 0.2) {
      var simult = Math.abs(m.tA - m.tB) < 0.001;
      var txt = simult ? 'Au sosit deodată ⟹ fulgerele au fost simultane' : (m.arrA < m.arrB ? 'A a sosit prima ⟹ fulgerul din A s-a produs primul' : 'B a sosit prima ⟹ fulgerul din B s-a produs primul');
      var col = simult ? P.good : P.light;
      ctx.save(); ctx.globalAlpha = clamp((t - done - 0.2) / 0.3, 0, 1);
      D.label(ctx, txt, W / 2, H * 0.14, { size: fs, color: col, border: D.rgba(col, 0.7), align: 'center' });
      ctx.restore();
    }
  }

  RF.sims.c04Mijloc = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 16 / 5.8, minH: 230, maxH: 290 });
    var delta = 0, clock = 0;

    function dlabel(v) {
      if (Math.abs(v) < 0.03) return 'simultan cu A';
      return 'B cu ' + n1(Math.abs(v)) + ' s ' + (v > 0 ? 'mai târziu' : 'mai devreme');
    }
    RF.ui.slider(api.controls, {
      label: 'Momentul fulgerului din B față de cel din A', min: -1.2, max: 1.2, step: 0.05, value: 0, tone: 'light', fmt: dlabel,
      onInput: function (v) { delta = Math.abs(v) < 0.03 ? 0 : v; clock = 0; info(); }
    });
    RF.ui.buttons(api.controls, [{ label: '↻ Repetă', onClick: function () { clock = 0; } }]);
    var ro = RF.ui.readouts(api.controls, [
      { k: 'first', label: 'Lumina care ajunge prima la M' },
      { k: 'concl', label: 'Concluzia observatorului din M' }
    ]);
    function info() {
      if (delta === 0) { ro.set('first', 'ambele, deodată'); ro.set('concl', 'simultane'); }
      else if (delta > 0) { ro.set('first', 'cea din A'); ro.set('concl', 'A s-a produs primul'); }
      else { ro.set('first', 'cea din B'); ro.set('concl', 'B s-a produs primul'); }
    }
    info();

    RF.sim.loop(host, function (dt) {
      if (!cv.W || !cv.H) return;
      if (dt > 0) clock += dt;
      var m = middleModel(delta), cyc = m.end + 0.4, t = clock % cyc;
      drawMiddle(cv, RF.sim.palette(), m, t);
    });
  };

  /* ===================================================================
     2. c04Nesimultane — „Cât de nesimultane?”
     Evenimentele A și B sunt simultane într-un sistem (stația S sau nava S′).
     Celălalt sistem găsește între ele un decalaj γ·β·d (în secunde, cu d în lumină-secunde),
     dacă separarea e pe direcția mișcării; zero, dacă e perpendiculară.
     Evenimentul către care se îndreaptă „celălalt” sistem apare primul la el.
     =================================================================== */
  var TMAX = 25;      // rigla de timp: ±25 s

  function gapModel(beta, d, dir) {
    var gam = 1 / Math.sqrt(1 - beta * beta), along = dir === 'along';
    return { gam: gam, along: along, gap: along ? gam * beta * d : 0 };
  }

  /* orele celor două evenimente pe cele două rigle (simetric în jurul lui 0) */
  function eventTimes(who, gm) {
    var h = gm.gap / 2;
    // simultane în S: S′ găsește primul evenimentul B (din față, în sensul mișcării navei)
    // simultane în S′: S găsește primul evenimentul A (spre el se mișcă stația, văzută din navă)
    if (who === 'S') return { S: { A: 0, B: 0 }, Sp: { A: +h, B: -h } };
    return { Sp: { A: 0, B: 0 }, S: { A: -h, B: +h } };
  }

  function drawGap(cv, P, st, gm, tt, shipT) {
    var ctx = cv.ctx, W = cv.W, H = cv.H, fs = W < 460 ? 11 : 12.5, pad = 16;
    D.clear(cv);
    var frameCol = st.who === 'S' ? P.s1 : P.s2, otherCol = st.who === 'S' ? P.s2 : P.s1;

    /* ---- sus: spațiul (în sistemul în care evenimentele sunt simultane) ---- */
    var yl = H * 0.2;
    D.text(ctx, 'Spațiu — în ' + (st.who === 'S' ? 'stație (S)' : 'navă (S′)') + ', evenimentele sunt simultane', pad, H * 0.065, { color: frameCol, size: fs, weight: 700 });
    D.line(ctx, pad, yl, W - pad, yl, D.rgba(frameCol, 0.7), 2);
    var k = (W - 2 * pad - 70) / 8, xA, xB, yA, yB;
    if (gm.along) { xA = W / 2 - k * st.d / 2; xB = W / 2 + k * st.d / 2; yA = yB = yl - (st.d < 0.2 ? 16 : 0); if (st.d < 0.2) yB = yl + 16; }
    else { xA = xB = W / 2; yA = yl - (8 + 3 * st.d); yB = yl + (8 + 3 * st.d); }
    if (gm.along && st.d >= 0.2) D.arrow(ctx, xA + 12, yl + 22, xB - 12, yl + 22, { color: D.rgba(P.tx2, 0.8), w: 1.4, head: 6 });
    if (gm.along && st.d >= 0.2) D.arrow(ctx, xB - 12, yl + 22, xA + 12, yl + 22, { color: D.rgba(P.tx2, 0.8), w: 1.4, head: 6 });
    if (gm.along && st.d >= 0.8) D.text(ctx, 'd = ' + n1(st.d) + ' ls', W / 2, yl + 38, { color: P.tx2, size: fs - 1, align: 'center' });
    if (!gm.along) D.label(ctx, 'd = ' + n1(st.d) + ' ls', W / 2 + 22, yl, { size: fs - 1, color: P.tx2 });
    spriteEventMarker(ctx, P, xA, yA, 'A', fs);
    spriteEventMarker(ctx, P, xB, yB, 'B', fs);
    // celălalt sistem trece pe lângă ele (stilizat)
    var dirSign = st.who === 'S' ? 1 : -1, sx = ((shipT * (20 + 160 * st.beta)) % (W + 100)) - 50;
    if (dirSign < 0) sx = W - sx;
    var sy = H * 0.065 + 12;
    ctx.save(); ctx.globalAlpha = st.beta > 0.001 ? 1 : 0.5;
    D.fillRR(ctx, sx - 22, sy + 2, 44, 16, 6, P.card2, otherCol, 2);
    D.arrow(ctx, sx + dirSign * 6, sy + 10, sx + dirSign * 36, sy + 10, { color: otherCol, w: 2, head: 7 });
    D.text(ctx, st.who === 'S' ? 'S′' : 'S', sx - dirSign * 8, sy + 15, { color: otherCol, size: fs - 1, weight: 700, align: 'center' });
    ctx.restore();

    /* ---- jos: două rigle de timp ---- */
    var pps = (W - 2 * pad - 40) / (2 * TMAX), x0 = W / 2;
    var rows = [
      { key: 'S', y: H * 0.56, name: 'Ceasurile din stație (S)', col: P.s1 },
      { key: 'Sp', y: H * 0.86, name: 'Ceasurile din navă (S′)', col: P.s2 }
    ];
    rows.forEach(function (row) {
      var ay = row.y, t = tt[row.key];
      D.text(ctx, row.name, pad, ay - 27, { color: row.col, size: fs, weight: 700 });
      D.arrow(ctx, pad, ay, W - pad, ay, { color: P.line2, w: 1.6, head: 7 });
      for (var s = -20; s <= 20; s += 5) {
        var x = x0 + s * pps;
        D.line(ctx, x, ay - (s % 10 === 0 ? 5 : 3), x, ay + (s % 10 === 0 ? 5 : 3), P.tx3, 1.2);
        if (s % 10 === 0) D.text(ctx, String(s), x, ay + 18, { color: P.tx3, size: fs - 2, align: 'center' });
      }
      D.text(ctx, 's', W - pad, ay + 18, { color: P.tx3, size: fs - 2, align: 'right' });
      var xa = x0 + t.A * pps, xb = x0 + t.B * pps, gp = Math.abs(t.A - t.B);
      if (gp > 0.01) D.line(ctx, xa, ay, xb, ay, row.col, 4);
      D.line(ctx, xa, ay, xa, ay - 14, D.rgba(P.light, 0.8), 1.6);
      D.line(ctx, xb, ay, xb, ay + 14, D.rgba(P.light, 0.8), 1.6);
      spriteEventMarker(ctx, P, xa, ay - 24, 'A', fs);
      spriteEventMarker(ctx, P, xb, ay + 24, 'B', fs);
      var lab = gp > 0.01 ? 'decalaj ' + n1(gp) + ' s' : 'aceeași oră';
      D.text(ctx, lab, Math.max(xa, xb) + 18, ay - 6, { color: gp > 0.01 ? row.col : P.good, size: fs, weight: 700 });
    });
  }

  RF.sims.c04Nesimultane = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 16 / 8.2, minH: 340, maxH: 440 });
    var st = { d: 4, beta: 0.6, dir: 'along', who: 'S' }, shipT = 0;

    RF.ui.slider(api.controls, {
      label: 'Distanța dintre evenimente', min: 0, max: 8, step: 0.5, value: st.d, tone: 'light',
      fmt: function (v) { return n1(v) + ' ls'; },
      onInput: function (v) { st.d = v; info(); }
    });
    RF.ui.slider(api.controls, {
      label: 'Viteza navei față de stație', min: 0, max: 0.95, step: 0.01, value: st.beta, tone: 's2',
      fmt: function (v) { return RF.fmt.c(v); },
      onInput: function (v) { st.beta = v; info(); }
    });
    RF.ui.segmented(api.controls, {
      label: 'Evenimentele sunt depărtate…', value: st.dir,
      options: [{ k: 'along', label: 'pe direcția mișcării' }, { k: 'perp', label: 'perpendicular' }],
      onChange: function (k) { st.dir = k; info(); }
    });
    RF.ui.segmented(api.controls, {
      label: 'Simultane pentru…', value: st.who,
      options: [{ k: 'S', label: 'stație (S)' }, { k: 'Sp', label: 'navă (S′)' }],
      onChange: function (k) { st.who = k; info(); }
    });
    var ro = RF.ui.readouts(api.controls, [
      { k: 'g', label: 'Factorul γ' },
      { k: 'S', label: 'Stația (S) găsește' },
      { k: 'Sp', label: 'Nava (S′) găsește' }
    ]);
    function info() {
      var gm = gapModel(st.beta, st.d, st.dir), tt = eventTimes(st.who, gm), gp = gm.gap;
      ro.set('g', RF.fmt.n(gm.gam, 2));
      function say(frame, first) { return gp > 0.01 ? 'decalaj ' + n1(gp) + ' s — ' + first + ' primul' : 'simultane'; }
      ro.set('S', st.who === 'S' ? 'simultane' : say('S', 'A'));
      ro.set('Sp', st.who === 'Sp' ? 'simultane' : say('Sp', 'B'));
      void tt;
    }
    info();

    RF.sim.loop(host, function (dt) {
      if (!cv.W || !cv.H) return;
      if (dt > 0) shipT += dt;
      var gm = gapModel(st.beta, st.d, st.dir), tt = eventTimes(st.who, gm);
      drawGap(cv, RF.sim.palette(), st, gm, tt, shipT);
    });
  };
})();
