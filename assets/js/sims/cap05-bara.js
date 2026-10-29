/* Capitolul 5 — simulări: „c05Bara” (bara în mișcare, liberă) și „c05Poveste” (scena poveștii pe pași).
   Ambele folosesc același „motor”: o bară cu lungimea proprie L′ (în repaus în S′) trece pe lângă sol (S),
   iar solul îi marchează capetele. Totul se calculează din EVENIMENTE (cu transformările Lorentz), deci
   vederea din S și cea din S′ descriu aceleași două marcaje. Unități: L′ = 1, c = 1; pe ecran timpul curge încetinit. */
(function () {
  'use strict';
  var RF = window.RF, D = RF.draw;

  var K = 0.45;     // câți L′/c trec într-o secundă de ecran
  var T1 = 1.9;     // secunda ciclului la care are loc primul marcaj
  var LM = 10;      // lungimea proprie în metri (doar pentru afișaj)
  var NS = 33.356;  // L′/c în nanosecunde, pentru L′ = 10 m

  function gam(b) { return 1 / Math.sqrt(1 - b * b); }
  function f1(x) { return RF.fmt.n(x, 1); }

  /* Evenimentele: A = marcarea capătului din față (la t = 0 în S); B = marcarea capătului din spate (la t = d în S).
     Bara (în S): capătul din spate la x = xB0 + b·t, cel din față cu Lc = L′/γ mai departe. */
  function model(b, d) {
    var g = gam(b), Lc = 1 / g, xB0 = -(Lc + b * d) / 2;
    var XA = xB0 + Lc, XB = xB0 + b * d;
    var tpA = -g * b * XA, tpB = g * (d - b * XB);
    return { b: b, g: g, Lc: Lc, xB0: xB0, d: d, XA: XA, XB: XB, D: XA - XB,
             tpA: tpA, tpB: tpB, t0S: Math.min(0, d), t0P: Math.min(tpA, tpB) };
  }
  /* momentele (în secunde de ecran) ale celor două marcaje, în vederea 'S' sau 'P' (= S′) */
  function times(m, view) {
    var tA, tB;
    if (view === 'P') { tA = T1 + (m.tpA - m.t0P) / K; tB = T1 + (m.tpB - m.t0P) / K; }
    else { tA = T1 - m.t0S / K; tB = T1 + (m.d - m.t0S) / K; }
    var hold = Math.max(tA, tB) + 1.4;
    return { tA: tA, tB: tB, hold: hold, cyc: hold + 3.2 };
  }
  /* mișcarea încetinește lin și se oprește la „hold”, ca imaginea finală să poată fi citită */
  function easeT(tau, hold) {
    var u = tau - (hold - 0.6);
    if (u <= 0) return tau;
    if (u >= 0.6) return hold - 0.3;
    return hold - 0.6 + u - u * u / 1.2;
  }

  /* ---------- piese de desen ---------- */
  function drawRod(ctx, P, x1, x2, yc, hh, sc, letters) {
    var w = Math.max(x2 - x1, 6);
    RF.art.rod(ctx, x1, yc, x1 + w, { th: Math.max(hh * 0.95, 12), accent: P.s2, labels: (letters && w > 52) ? ['B', 'A'] : false });
  }
  function flash(ctx, P, x, y, age, yDrop) {
    if (age < 0 || age > 1.1) return;
    ctx.save();
    if (yDrop != null) { ctx.globalAlpha *= 1 - age / 1.1; D.line(ctx, x, y + 6, x, yDrop, D.rgba(P.light, 0.8), 2, [4, 4]); }
    ctx.restore();
    RF.art.flash(ctx, x, y, 26, { p: age / 1.1 });
  }
  function mark(ctx, x, yG, color) {
    RF.art.eventMark(ctx, x, yG + 8, { shape: 'diamond', r: 6, color: color, glow: false, pulse: false });
  }
  function bracket(ctx, x1, x2, y, color) {
    var a = Math.min(x1, x2), b = Math.max(x1, x2);
    D.line(ctx, a, y, b, y, color, 2);
    D.line(ctx, a, y - 5, a, y + 5, color, 2);
    D.line(ctx, b, y - 5, b, y + 5, color, 2);
  }
  function badge(ctx, P, x, y, n) {
    D.dot(ctx, x, y, 9, P.light);
    D.text(ctx, String(n), x, y + 4, { color: P.bg, size: 12, weight: 800, align: 'center' });
  }
  function hMark(ctx, P, x, yc, hh, fs) {
    D.line(ctx, x, yc - hh / 2, x, yc + hh / 2, P.good, 2);
    D.line(ctx, x - 3, yc - hh / 2, x + 3, yc - hh / 2, P.good, 2);
    D.line(ctx, x - 3, yc + hh / 2, x + 3, yc + hh / 2, P.good, 2);
    D.text(ctx, 'h', x - 5, yc + 4, { color: P.good, size: fs - 1, weight: 700, align: 'right' });
  }
  /* marcajele „1”/„2” (ordinea) sau bara „același moment” */
  function order(ctx, P, o, R, xA, xB, yTop, tA, tB, ageA, ageB) {
    var simul = Math.abs(tA - tB) < 0.05;
    if (simul) {
      if (ageA < 0) return;
      D.line(ctx, xB, yTop, xA, yTop, D.rgba(P.light, 0.95), 2, [5, 4]);
      D.dot(ctx, xA, yTop, 3.5, P.light); D.dot(ctx, xB, yTop, 3.5, P.light);
      D.text(ctx, 'același moment în S', RF.clamp((xA + xB) / 2, R.x + 76, R.x + R.w - 76), yTop - 8,
        { color: P.light, size: o.fs - 1, weight: 600, align: 'center' });
    } else {
      if (ageA >= 0) badge(ctx, P, xA, yTop, tA < tB ? 1 : 2);
      if (ageB >= 0) badge(ctx, P, xB, yTop, tA < tB ? 2 : 1);
    }
  }

  /* ---------- vederea din S (solul): bara zboară ---------- */
  function laneS(ctx, P, R, m, tau, o) {
    var Lp = o.Lp, fs = o.fs, cx = R.x + R.w / 2, hh = o.hh;
    var yG = R.y + R.h * 0.70, yR = R.y + R.h * 0.42;
    var tm = times(m, 'S'), te = easeT(tau, tm.hold);
    var tS = m.t0S + K * (te - T1);
    var ageA = o.noEv ? -1 : tau - tm.tA, ageB = o.noEv ? -1 : tau - tm.tB;
    function sx(X) { return cx + X * Lp; }
    ctx.save(); ctx.beginPath(); ctx.rect(R.x, R.y, R.w, R.h); ctx.clip();

    D.text(ctx, o.narrow ? 'Din S (solul)' : 'Din S (solul): bara zboară spre dreapta', R.x + 10, R.y + 16, { color: P.s1, size: fs, weight: 700 });
    if (o.showRef) {
      D.fillRR(ctx, R.x + 10, R.y + 27, Lp, 9, 3, D.rgba(P.s2, 0.3), P.s2, 1.5);
      D.text(ctx, 'L′: bara în repaus' + (o.nums ? ', ' + f1(LM) + ' m' : ''), R.x + 17 + Lp, R.y + 36, { color: P.s2, size: fs - 1, weight: 600 });
    }
    if (o.q && ageA < 0) {
      D.text(ctx, 'Cum îi afli lungimea?', cx, yG + 32, { color: P.tx2, size: fs, weight: 600, align: 'center' });
    }
    // solul
    (function(){ var gg = ctx.createLinearGradient(0, yG, 0, yG + 18); gg.addColorStop(0, D.rgba(P.s1, 0.28)); gg.addColorStop(1, D.rgba(P.s1, 0)); ctx.fillStyle = gg; ctx.fillRect(R.x, yG, R.w, 18); D.line(ctx, R.x, yG, R.x + R.w, yG, D.rgba(P.s1, 0.8), 2); })();
    var step = 0.1 * Lp, k0 = Math.floor((R.x - cx) / step), k1 = Math.ceil((R.x + R.w - cx) / step);
    ctx.save(); ctx.strokeStyle = P.line2; ctx.lineWidth = 1; ctx.beginPath();
    for (var k = k0; k <= k1; k++) { var tx = cx + k * step; ctx.moveTo(tx, yG); ctx.lineTo(tx, yG + (k % 5 === 0 ? 8 : 4)); }
    ctx.stroke(); ctx.restore();

    // bara
    var rear = m.xB0 + m.b * tS, x1 = sx(rear), x2 = sx(rear + m.Lc);
    drawRod(ctx, P, x1, x2, yR, hh, 1 / m.g, true);
    hMark(ctx, P, x1 - 8, yR, hh, fs);

    // marcajele
    var xA = sx(m.XA), xB = sx(m.XB);
    flash(ctx, P, xA, yR, ageA, yG); flash(ctx, P, xB, yR, ageB, yG);
    if (ageA >= 0) mark(ctx, xA, yG, P.s1);
    if (ageB >= 0) mark(ctx, xB, yG, P.s1);
    order(ctx, P, o, R, xA, xB, yR - hh / 2 - 40, tm.tA, tm.tB, ageA, ageB);
    if (ageA >= 0 && ageB >= 0) {
      var col = o.wrong ? P.bad : P.s1, yb = yG + 17, txt;
      bracket(ctx, xA, xB, yb, col);
      if (o.wrong) txt = o.nums ? 'distanța = ' + f1(Math.abs(m.D) * LM) + ' m ✗' : 'distanța dintre semne ✗';
      else txt = o.nums ? 'L = ' + f1(m.Lc * LM) + ' m ✓' : 'L';
      D.label(ctx, txt, RF.clamp((xA + xB) / 2, R.x + 52, R.x + R.w - 52), yb + 16, { size: fs, color: o.wrong ? P.bad : P.good, align: 'center' });
    }
    if (o.cmp) D.label(ctx, 'L < L′', R.x + R.w - 10, R.y + 30, { size: fs + 1, color: P.good, align: 'right' });
    ctx.restore();
  }

  /* ---------- vederea din S′ (bara): bara stă pe loc, solul fuge spre stânga ---------- */
  function laneP(ctx, P, R, m, tau, o) {
    var Lp = o.Lp, fs = o.fs, cx = R.x + R.w / 2, hh = o.hh;
    var yG = R.y + R.h * 0.70, yR = R.y + R.h * 0.42;
    var tm = times(m, 'P'), te = easeT(tau, tm.hold);
    var tP = m.t0P + K * (te - T1), xc = m.g * m.xB0 + 0.5;
    var ageA = o.noEv ? -1 : tau - tm.tA, ageB = o.noEv ? -1 : tau - tm.tB;
    function gx(X) { return cx + (X / m.g - m.b * tP - xc) * Lp; }
    ctx.save(); ctx.beginPath(); ctx.rect(R.x, R.y, R.w, R.h); ctx.clip();

    D.text(ctx, o.narrow ? 'Din S′ (bara)' : 'Din S′ (bara): bara stă pe loc, solul fuge spre stânga', R.x + 10, R.y + 16, { color: P.s2, size: fs, weight: 700 });
    // solul, în mișcare; gradațiile lui sunt mai dese (rigla solului e scurtată)
    (function(){ var gg = ctx.createLinearGradient(0, yG, 0, yG + 18); gg.addColorStop(0, D.rgba(P.s1, 0.28)); gg.addColorStop(1, D.rgba(P.s1, 0)); ctx.fillStyle = gg; ctx.fillRect(R.x, yG, R.w, 18); D.line(ctx, R.x, yG, R.x + R.w, yG, D.rgba(P.s1, 0.8), 2); })();
    var Xl = m.g * (xc + m.b * tP + (R.x - cx) / Lp), Xr = m.g * (xc + m.b * tP + (R.x + R.w - cx) / Lp);
    var k0 = Math.floor(Xl / 0.1), k1 = Math.ceil(Xr / 0.1);
    ctx.save(); ctx.strokeStyle = P.line2; ctx.lineWidth = 1; ctx.beginPath();
    for (var k = k0; k <= k1; k++) { var tx = gx(k * 0.1); ctx.moveTo(tx, yG); ctx.lineTo(tx, yG + (k % 5 === 0 ? 8 : 4)); }
    ctx.stroke(); ctx.restore();

    // bara, în repaus
    var eB = cx - Lp / 2, eA = cx + Lp / 2;
    drawRod(ctx, P, eB, eA, yR, hh, 1, true);
    hMark(ctx, P, eB - 8, yR, hh, fs);
    D.text(ctx, o.nums ? 'L′ = ' + f1(LM) + ' m' : 'L′', cx, yR + hh / 2 + 14, { color: P.s2, size: fs - 1, weight: 700, align: 'center' });

    // marcajele
    var gA = gx(m.XA), gB = gx(m.XB);
    if (ageA >= 0 && ageB >= 0) {
      D.line(ctx, eA, yR + hh / 2 + 20, eA, yG, D.rgba(P.s2, 0.5), 1.5, [3, 4]);
      D.line(ctx, eB, yR + hh / 2 + 20, eB, yG, D.rgba(P.s2, 0.5), 1.5, [3, 4]);
    }
    flash(ctx, P, eA, yR, ageA, yG); flash(ctx, P, eB, yR, ageB, yG);
    if (ageA >= 0) mark(ctx, gA, yG, P.s1);
    if (ageB >= 0) mark(ctx, gB, yG, P.s1);
    order(ctx, P, o, R, eA, eB, yR - hh / 2 - 40, tm.tA, tm.tB, ageA, ageB);
    if (ageA >= 0 && ageB >= 0) {
      var yb = yG + 17;
      bracket(ctx, gA, gB, yb, P.s1);
      D.label(ctx, 'semnele solului', RF.clamp((gA + gB) / 2, R.x + 60, R.x + R.w - 60), yb + 16, { size: fs, color: P.s1, align: 'center' });
      if (!o.compact && R.h > 250 && Math.abs(tm.tA - tm.tB) > 0.05) {
        D.text(ctx, 'Semnul 1 apoi semnul 2: între ele solul a alunecat înapoi, deci semnele ies mai apropiate decât capetele barei.',
          R.x + 10, R.y + R.h - 10, { color: P.tx2, size: fs - 1 });
      }
    }
    ctx.restore();
  }

  function opts(W, H, extra) {
    var o = { Lp: Math.max(70, Math.min(W * 0.3, 250)), fs: W < 460 ? 11 : 12.5, hh: Math.max(22, Math.min(34, H * 0.1)), narrow: W < 460 };
    for (var k in extra) o[k] = extra[k];
    return o;
  }
  function cycle(t0, t, len) { return (((t - t0) % len) + len) % len; }
  function fade(tau, len) { return Math.max(0, Math.min(1, tau / 0.5, (len - tau) / 0.5)); }

  /* ===================================================================
     c05Bara — „Bara în mișcare” (simulare liberă)
     =================================================================== */
  RF.sims.c05Bara = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 16 / 8.4, minH: 280, maxH: 400 });
    var st = { b: 0.8, view: 'S', wrong: false, dns: 20 }, T0 = null;

    RF.ui.slider(api.controls, {
      label: 'Viteza barei față de S', min: 0, max: 0.97, step: 0.01, value: st.b, tone: 's2',
      fmt: function (v) { return RF.fmt.c(v); },
      onInput: function (v) { st.b = v; info(); }
    });
    RF.ui.segmented(api.controls, {
      label: 'Privești din…', value: st.view,
      options: [{ k: 'S', label: 'S (solul)' }, { k: 'P', label: 'S′ (bara)' }],
      onChange: function (k) { st.view = k; restart(); info(); }
    });
    RF.ui.toggle(api.controls, {
      label: 'Marchează capetele la momente diferite (procedură greșită)', value: false,
      onChange: function (v) { st.wrong = v; slD.el.hidden = !v; restart(); info(); }
    });
    var slD = RF.ui.slider(api.controls, {
      label: 'Capătul din spate e marcat după cel din față cu', min: -26, max: 26, step: 1, value: st.dns, tone: 'light',
      fmt: function (v) { return (v > 0 ? '+' : '') + Math.round(v) + ' ns'; },
      onInput: function (v) { st.dns = v; info(); }
    });
    slD.el.hidden = true;
    var ro = RF.ui.readouts(api.controls, [
      { k: 'g', label: 'γ (factorul Lorentz)' },
      { k: 'lp', label: 'L′ — lungimea proprie (în S′)' },
      { k: 'd', label: 'Distanța dintre semnele de pe sol (în S)' },
      { k: 'r', label: 'L / L′ cu marcare simultană' }
    ]);
    function model0() { return model(st.b, st.wrong ? st.dns / NS : 0); }
    function info() {
      var m = model0();
      ro.set('g', RF.fmt.n(m.g, 2));
      ro.set('lp', f1(LM) + ' m');
      ro.set('d', f1(Math.abs(m.D) * LM) + ' m  ' + (st.wrong ? '✗ nu e L' : '= L ✓'));
      ro.set('r', RF.fmt.pct(1 / m.g, 1));
    }
    info();
    function restart() { T0 = performance.now() / 1000 - (T1 - 0.9); }

    RF.sim.loop(host, function (dt, t) {
      if (!cv.W || !cv.H) return;
      if (T0 == null) T0 = t - (T1 - 1.1);
      // (1) starea: modelul fizic și faza ciclului
      var m = model0(), len = times(m, st.view).cyc;
      drawScene(m, cycle(T0, t, len), len);
    });
    // (2) tot desenul, într-un singur loc (aici se pot schimba sprite-urile fără să se atingă fizica)
    function drawScene(m, tau, len) {
      var P = RF.sim.palette(), W = cv.W, H = cv.H, ctx = cv.ctx;
      D.clear(cv);
      ctx.save(); ctx.globalAlpha = fade(tau, len);
      var o = opts(W, H, { showRef: st.view === 'S', nums: true, wrong: st.wrong });
      (st.view === 'S' ? laneS : laneP)(ctx, P, { x: 0, y: 0, w: W, h: H }, m, tau, o);
      ctx.restore();
    }
  };

  /* ===================================================================
     c05Poveste — scena poveștii „pe pași” (stagiile vin din data-stage)
       0 bara trece · 1 marcaj la momente diferite · 2 marcaj simultan · 3 comparația L < L′
       4 din bară (S′) · 5 ambele vederi, una peste alta
     =================================================================== */
  RF.sims.c05Poveste = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 16 / 11.5, minH: 340, maxH: 460 });
    var stage = 0, T0 = null, B = 0.8;
    var CFG = [
      { v: 'S', d: 0, noEv: true, q: true },
      { v: 'S', d: 0.6, wrong: true, nums: true },
      { v: 'S', d: 0 },
      { v: 'S', d: 0, ref: true, nums: true, cmp: true },
      { v: 'P', d: 0, nums: true },
      { v: 'SP', d: 0, nums: true }
    ];
    if (api.steps) api.steps.addEventListener('rf:step', function (e) {
      stage = Math.max(0, Math.min(CFG.length - 1, e.detail.stage | 0));
      T0 = performance.now() / 1000 - (T1 - 0.8);
    });
    RF.sim.loop(host, function (dt, t) {
      if (!cv.W || !cv.H) return;
      if (T0 == null) T0 = t - (T1 - 1.1);
      // (1) starea: scena curentă, modelul fizic și faza ciclului
      var c = CFG[stage], m = model(B, c.d);
      var len = c.v === 'SP' ? Math.max(times(m, 'S').cyc, times(m, 'P').cyc) : times(m, c.v).cyc;
      drawScene(c, m, cycle(T0, t, len), len);
    });
    // (2) tot desenul, într-un singur loc
    function drawScene(c, m, tau, len) {
      var P = RF.sim.palette(), W = cv.W, H = cv.H, ctx = cv.ctx;
      D.clear(cv);
      ctx.save(); ctx.globalAlpha = fade(tau, len);
      if (c.v === 'SP') {
        var o2 = opts(W, H / 2, { compact: true, nums: true, hh: Math.max(20, Math.min(26, H * 0.075)) });
        laneS(ctx, P, { x: 0, y: 0, w: W, h: H / 2 }, m, tau, o2);
        D.line(ctx, 0, H / 2, W, H / 2, P.line2, 1);
        laneP(ctx, P, { x: 0, y: H / 2, w: W, h: H / 2 }, m, tau, o2);
      } else {
        var o = opts(W, H, { showRef: !!c.ref, nums: !!c.nums, wrong: !!c.wrong, noEv: !!c.noEv, q: !!c.q, cmp: !!c.cmp });
        (c.v === 'S' ? laneS : laneP)(ctx, P, { x: 0, y: 0, w: W, h: H }, m, tau, o);
      }
      ctx.restore();
    }
  };
})();
