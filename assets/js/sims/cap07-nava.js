/* Capitolul 7 — simulări: „c07Poveste” (scena poveștii pe pași) și „c07Nava” (nava și proiectilul).
   Structură în fiecare simulare: (1) stare + fizică (update) · (2) un singur drawScene(...) care conține TOT desenul,
   ca să poată fi înlocuit ușor cu sprite-uri RF.art. Vitezele sunt în unități de c. */
(function () {
  'use strict';
  var RF = window.RF, D = RF.draw;

  /* ===================================================================
     Fizică (fără desen)
     =================================================================== */
  /* viteza în S, dacă în S′ (care se mișcă cu v față de S) corpul are viteza u1 */
  function compose(v, u1) { return (u1 + v) / (1 + u1 * v); }
  /* text de viteză, cu cifre în plus când rezultatul e foarte aproape de c */
  function fv(x) {
    if (Math.abs(x - 1) < 5e-6) return '1,00 c';
    var d = (x >= 1 || x < 0.95) ? 2 : x < 0.995 ? 3 : x < 0.9995 ? 4 : 5;
    return RF.fmt.n(x, d) + ' c';
  }
  function fp(x) {                       // eroare relativă, în procente
    var e = x * 100;
    if (e < 0.05) return '≈ 0 %';
    return RF.fmt.n(e, e < 10 ? 1 : 0) + ' %';
  }

  /* ===================================================================
     Desen — piese comune (toate apelate din drawScene)
     =================================================================== */
  function tw(ctx, s, size, weight) {
    ctx.save(); ctx.font = D.font(size, weight || 600); var w = ctx.measureText(s).width; ctx.restore();
    return w;
  }
  function endLabel(ctx, txt, xe, yc, color, fs, xmax) {
    var w = tw(ctx, txt, fs, 650) + 18 + 13;
    if (xe + 12 + w <= xmax) RF.art.chip(ctx, txt, xe + 12, yc, { dot: color, size: fs, color: color });
    else RF.art.chip(ctx, txt, xe - 12, yc, { dot: color, size: fs, color: color, align: 'right' });
  }
  /* pista (capsulă adâncită) pe care stau segmentele */
  function capsule(ctx, P, x0, x1, y, h) {
    ctx.save();
    D.rrect(ctx, x0, y, x1 - x0, h, h / 2);
    ctx.fillStyle = P.dark ? 'rgba(6,12,30,.7)' : 'rgba(205,215,238,.8)'; ctx.fill();
    ctx.strokeStyle = D.rgba(P.line2, 0.85); ctx.lineWidth = 1; ctx.stroke();
    ctx.restore();
  }
  /* segment lucios; rl/rr = capătul stâng/drept rotunjit (altfel se lipește de vecin) */
  function seg(ctx, P, x1, x2, y, h, color, label, fs, rl, rr) {
    if (x2 - x1 < 0.5) return;
    var A = RF.art;
    ctx.save();
    ctx.beginPath(); ctx.rect(x1, y - 8, x2 - x1, h + 16); ctx.clip();
    ctx.shadowColor = D.rgba(color, 0.55); ctx.shadowBlur = 8;
    D.rrect(ctx, rl ? x1 : x1 - h, y, (x2 - x1) + (rl ? 0 : h) + (rr ? 0 : h), h, h / 2);
    ctx.fillStyle = A.lin(ctx, 0, y, 0, y + h, [[0, A.lighten(color, 0.35)], [0.5, color], [1, A.darken(color, 0.3)]]);
    ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.fillStyle = 'rgba(255,255,255,.26)';
    D.rrect(ctx, x1 + 3, y + 2, Math.max(0, x2 - x1 - 6), h * 0.32, h * 0.16); ctx.fill();
    ctx.restore();
    if (label && x2 - x1 > 20) D.text(ctx, label, (x1 + x2) / 2, y + h - 5, { color: P.bg, size: fs, align: 'center', weight: 700 });
  }

  RF.c07 = { tw: tw, endLabel: endLabel, capsule: capsule, seg: seg };          // refolosite de c07Apropiere

  /* bare de viteză, scara 0 … 2 c; sc = {mode:'fwd'|'inv', v, up, light, reveal, shrink} */
  function paintBars(ctx, P, R, sc, fs) {
    var A = RF.art;
    var x0 = R.x + 14, x1 = R.x + R.w - 14, narrow = R.w < 460;
    function X(s) { return x0 + (x1 - x0) * Math.max(0, Math.min(2, s)) / 2; }
    var inv = sc.mode === 'inv', rows = inv ? 3 : 2, bh = 18;
    var top = R.y + 24, rh = Math.min(sc.rowMax || (inv ? 64 : 72), (R.h - 34) / rows), bottom = top + rows * rh - 8;
    var xc = X(1), xr = R.x + R.w - 6;

    /* zona „peste c” (hașurată, rotunjită) */
    ctx.save();
    D.rrect(ctx, xc, top - 6, X(2) - xc, bottom - top + 6, 10); ctx.clip();
    ctx.fillStyle = D.rgba(P.bad, 0.1); ctx.fillRect(xc, top - 6, X(2) - xc, bottom - top + 6);
    ctx.strokeStyle = D.rgba(P.bad, 0.22); ctx.lineWidth = 1.2;
    for (var k = -(bottom - top); k < X(2) - xc; k += 12) {
      ctx.beginPath(); ctx.moveTo(xc + k, bottom); ctx.lineTo(xc + k + (bottom - top), top - 6); ctx.stroke();
    }
    ctx.restore();
    A.chip(ctx, narrow ? 'peste c ✗' : 'mai repede decât lumina ✗', (xc + X(2)) / 2, bottom + 12, { dot: P.bad, align: 'center', size: fs - 1 });

    /* scala */
    [0, 0.5, 1, 1.5, 2].forEach(function (s) {
      var lab = s === 0 ? '0' : s === 1 ? 'c' : s === 2 ? '2 c' : RF.fmt.n(s, 1);
      D.text(ctx, lab, X(s), R.y + 14, { color: s === 1 ? P.light : P.tx3, size: fs - 1, align: s === 0 ? 'left' : s === 2 ? 'right' : 'center', weight: s === 1 ? 800 : 400 });
      if (s !== 1) D.line(ctx, X(s), top - 6, X(s), bottom, D.rgba(P.line2, 0.4), 1, [2, 5]);
    });
    /* zidul de la c */
    A.glow(ctx, xc, (top + bottom) / 2, Math.max(36, (bottom - top) * 0.55), P.light, 0.5);
    ctx.save();
    ctx.shadowColor = D.rgba(P.light, 0.9); ctx.shadowBlur = 10;
    D.rrect(ctx, xc - 2.5, top - 8, 5, bottom - top + 8, 2.5);
    ctx.fillStyle = A.lin(ctx, 0, top, 0, bottom, [[0, '#ffffff'], [0.5, A.lighten(P.light, 0.5)], [1, P.light]]); ctx.fill();
    ctx.restore();

    var v = sc.v, up = sc.up, gal = v + up, rel = compose(v, up);

    if (!inv) {
      /* rândul A — adunarea simplă */
      var yb = top + 16, yc = yb + bh / 2, over = gal > 1 + 1e-9, xa = X(v), xe = X(gal);
      D.text(ctx, narrow ? 'Adunarea simplă' : 'Adunarea simplă (Galilei)', x0, top + 10, { color: P.tx2, size: fs, weight: 600 });
      capsule(ctx, P, X(0), X(2), yb, bh);
      seg(ctx, P, X(0), xa, yb, bh, P.s1, 'v', fs, true, false);
      seg(ctx, P, xa, Math.min(xe, xc), yb, bh, P.s2, sc.light ? 'c' : 'u′', fs, false, xe <= xc);
      if (xe > Math.max(xa, xc)) seg(ctx, P, Math.max(xa, xc), xe, yb, bh, P.bad, null, fs, false, true);
      endLabel(ctx, fv(gal) + (over ? '  ✗' : ''), xe, yc, over ? P.bad : P.tx2, fs, xr);

      /* rândul B — regula corectă */
      var yb2 = top + rh + 16, yc2 = yb2 + bh / 2;
      D.text(ctx, 'Regula corectă (Lorentz)', x0, top + rh + 10, { color: P.tx2, size: fs, weight: 600 });
      capsule(ctx, P, X(0), X(2), yb2, bh);
      if (sc.reveal) {
        var xb = X(rel);
        seg(ctx, P, X(0), xa, yb2, bh, P.s1, 'v', fs, true, false);
        seg(ctx, P, xa, xb, yb2, bh, P.s2, null, fs, false, true);
        A.glow(ctx, xb, yc2, 22, P.good, 0.7);
        A.sphere(ctx, xb, yc2, 7, P.good);
        endLabel(ctx, fv(rel) + '  ✓', xb, yc2, P.good, fs, xr);
        if (sc.shrink) {
          D.arrow(ctx, xe, yb + bh + 4, xb + 2, yb2 - 3, { color: D.rgba(P.light, 0.9), w: 2, head: 8, dash: [4, 3] });
          A.chip(ctx, '÷ (1 + v·u′/c²)', Math.min(Math.max((xe + xb) / 2 + 10, x0 + (narrow ? 130 : 190)), xr - 130), top + rh - 4, { dot: P.light, size: fs - 1 });
        }
      } else {
        seg(ctx, P, X(0), xa, yb2, bh, P.s1, 'v', fs, true, true);
        ctx.save(); ctx.strokeStyle = D.rgba(P.tx3, 0.8); ctx.setLineDash([5, 4]); ctx.lineWidth = 1.5;
        D.rrect(ctx, xa + 3, yb2 + 2, Math.max(10, xc - xa - 8), bh - 4, (bh - 4) / 2); ctx.stroke(); ctx.restore();
        D.text(ctx, '? ghicește mai sus', xa + 14, yc2 + 4, { color: P.tx3, size: fs - 1 });
      }
    } else {
      /* inversul: Ana trimite lumină după navă */
      var yA = top + 14, bh2 = 10;
      D.text(ctx, narrow ? 'Ana (S): nava ' + fv(v) + ' · lumina c' : 'Ana măsoară (stația, S): nava ' + fv(v) + ', lumina c', x0, top + 8, { color: P.tx2, size: fs, weight: 600 });
      seg(ctx, P, X(0), X(v), yA, bh2, P.s1, null, fs, true, true);
      seg(ctx, P, X(0), X(1), yA + 13, bh2, P.light, null, fs, true, true);
      /* paranteza c − v */
      var yp = yA + 34;
      D.line(ctx, X(v), yp, X(1), yp, P.light, 2.4);
      D.line(ctx, X(v), yp - 5, X(v), yp + 5, P.light, 2.4); D.line(ctx, X(1), yp - 5, X(1), yp + 5, P.light, 2.4);
      var ct = 'c − v = ' + fv(1 - v), cwid = tw(ctx, ct, fs - 1, 650) + 36;
      if (X(1) + 12 + cwid <= xr) A.chip(ctx, ct, X(1) + 12, yp, { dot: P.light, size: fs - 1 });
      else A.chip(ctx, ct, Math.max(x0 + cwid, X(v) - 10), yp, { dot: P.light, size: fs - 1, align: 'right' });

      var yB = top + rh + 10;
      D.text(ctx, 'Bogdan ar măsura, scăzând simplu', x0, yB, { color: P.tx2, size: fs, weight: 600 });
      ctx.save(); ctx.strokeStyle = P.bad; ctx.lineWidth = 2; ctx.setLineDash([5, 4]);
      D.rrect(ctx, X(0) + 1, yB + 6, Math.max(2, X(1 - v) - X(0)), bh, bh / 2); ctx.stroke(); ctx.restore();
      endLabel(ctx, fv(1 - v) + '  ✗', X(1 - v), yB + 6 + bh / 2, P.bad, fs, xr);

      var yC = top + 2 * rh + 10;
      D.text(ctx, 'Bogdan măsoară de fapt (nava, S′)', x0, yC, { color: P.tx2, size: fs, weight: 600 });
      if (sc.reveal) {
        seg(ctx, P, X(0), X(1), yC + 6, bh, P.good, null, fs, true, true);
        endLabel(ctx, '1,00 c  ✓', X(1), yC + 6 + bh / 2, P.good, fs, xr);
      } else {
        ctx.save(); ctx.strokeStyle = D.rgba(P.tx3, 0.8); ctx.setLineDash([5, 4]); ctx.lineWidth = 1.5;
        D.rrect(ctx, X(0) + 0.5, yC + 6.5, X(1) - X(0) - 1, bh - 1, (bh - 1) / 2); ctx.stroke(); ctx.restore();
        D.text(ctx, '? ghicește mai sus', X(0) + 12, yC + 6 + bh / 2 + 4, { color: P.tx3, size: fs - 1 });
      }
    }
  }

  /* cursa (în sistemul stației): nava, lumina, proiectilul corect și „fantoma” adunării simple */
  var RUN = 3.0, CYC = 4.8;
  function paintRace(ctx, P, R, sc, ph, fs) {
    var A = RF.art;
    var gut = Math.max(98, R.w * 0.27), shipL = Math.min(54, R.w * 0.13);
    var x0 = R.x + gut, xs0 = x0 + shipL, x1 = R.x + R.w - 10, L = x1 - xs0;
    var Kc = L * 0.9 / RUN, tt = Math.min(ph, RUN);
    var v = sc.v, up = sc.up, rel = compose(v, up), gal = v + up;
    var ys = [R.y + R.h * 0.2, R.y + R.h * 0.43, R.y + R.h * 0.65, R.y + R.h * 0.87];
    var names = ['Nava (Bogdan)', 'Lumina', 'Rezultat corect', 'Adunare simplă'], cols = [P.s2, P.light, P.good, P.bad];
    ctx.save();
    ctx.beginPath(); ctx.rect(R.x, R.y, R.w, R.h); ctx.clip();
    ctx.translate(R.x, R.y); A.space(ctx, R.w, R.h, { t: ph, nebula: true }); ctx.translate(-R.x, -R.y);
    for (var i = 0; i < 4; i++) {
      A.chip(ctx, names[i], x0 - 8, ys[i], { align: 'right', dot: cols[i], size: fs - 1 });
      D.line(ctx, x0, ys[i], x1, ys[i], D.rgba('#9ab4ff', 0.18), 1);
    }
    /* stația (Ana) */
    var sg = ctx.createLinearGradient(x0 - 3, 0, x0 + 3, 0); sg.addColorStop(0, D.rgba(P.s1, 0.4)); sg.addColorStop(0.5, P.s1); sg.addColorStop(1, D.rgba(P.s1, 0.4));
    ctx.fillStyle = sg; D.rrect(ctx, x0 - 3, R.y + 4, 6, R.h - 8, 3); ctx.fill();
    A.chip(ctx, 'Ana (stația)', x0 + 8, R.y + 12, { dot: P.s1, size: fs - 1 });
    /* nava lui Bogdan */
    var tail = x0 + v * Kc * tt;
    A.rocket(ctx, tail + shipL * 0.5, ys[0], shipL * 1.15, { pilot: true, thrust: 0.25 + 0.75 * v, t: ph });
    /* lumina */
    var xl = xs0 + Kc * tt;
    if (xl > xs0 + 2) A.beam(ctx, xs0, ys[1], xl, ys[1], { color: P.light, w: 4 });
    A.photon(ctx, xl, ys[1], 6, { color: P.light, t: ph });
    /* proiectilul — regula corectă */
    var xr = xs0 + rel * Kc * tt;
    if (xr > xs0 + 2) A.beam(ctx, xs0, ys[2], xr, ys[2], { color: P.good, w: 3, alpha: 0.55 });
    A.pod(ctx, xr, ys[2], 24, { color: P.good, thrust: 0.7, t: ph });
    /* „fantoma” — adunarea simplă */
    var xg = xs0 + gal * Kc * tt, xgc = Math.min(xg, x1);
    if (xgc > xs0 + 2) A.zigzag(ctx, [[xs0, ys[3]], [xgc, ys[3]]], { color: P.bad, w: 2, dash: [6, 5], arrows: false });
    ctx.save(); ctx.globalAlpha = 0.6; A.pod(ctx, xgc, ys[3], 22, { color: P.bad, thrust: 0, t: ph }); ctx.restore();
    if (xg > x1) D.text(ctx, '→', x1 - 2, ys[3] - 11, { color: P.bad, size: fs + 2, align: 'right', weight: 800 });
    ctx.restore();
  }

  /* ===================================================================
     1. c07Poveste — scena poveștii „pe pași” (stagiile vin din data-stage)
     =================================================================== */
  RF.sims.c07Poveste = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 16 / 11.5, minH: 300, maxH: 430 });
    cv.cv.setAttribute('role', 'img'); cv.cv.setAttribute('aria-label', 'Bare de viteză pentru povestea pe pași: suma simplă comparată cu regula corectă, pe o scară de la 0 la 2 c.');
    var ctx = cv.ctx;

    /* stagiile: ce scenă arată fiecare pas */
    var SCENES = [
      { mode: 'fwd', v: 0.1, up: 0.1 },                         // 0 — viteze mici
      { mode: 'fwd', v: 0.8, up: 0.8, gate: true },              // 1 — viteze mari (ghicește)
      { mode: 'fwd', v: 0.5, up: 1, sweep: true, light: true },  // 2 — proiectilul e lumină
      { mode: 'inv', v: 0.9, up: 1, gate: true },                // 3 — lumina vine din urmă (ghicește)
      { mode: 'fwd', v: 0.8, up: 0.8, shrink: true },            // 4 — de ce se strânge suma
      { mode: 'fwd', v: 0.6, up: 0.6 }                           // 5 — recapitulare
    ];

    /* ---------- (1) stare + fizică ---------- */
    var S = { stage: 0, mode: 'fwd', v: 0.1, up: 0.1, tv: 0.1, tup: 0.1, sweep: false, light: false, shrink: false, gate: false, revealed: {} };
    function setStage(k) {
      var sc = SCENES[k] || SCENES[0];
      S.stage = k; S.mode = sc.mode; S.tv = sc.v; S.tup = sc.up;
      S.sweep = !!sc.sweep; S.light = !!sc.light; S.shrink = !!sc.shrink; S.gate = !!sc.gate;
    }
    function update(dt, t) {
      var tv = S.sweep ? 0.55 + 0.4 * Math.sin(t * 0.9) : S.tv;
      S.v += (tv - S.v) * Math.min(1, dt * (S.sweep ? 8 : 5));
      S.up += (S.tup - S.up) * Math.min(1, dt * 5);
      if (Math.abs(S.tup - S.up) < 2e-4) S.up = S.tup;
      if (!S.sweep && Math.abs(S.tv - S.v) < 2e-4) S.v = S.tv;
    }
    if (api.steps) {
      api.steps.addEventListener('rf:step', function (e) { setStage(e.detail.stage); });
      api.steps.addEventListener('rf:predict', function () { S.revealed[S.stage] = true; });
    }
    RF.ui.legend(api.controls, [
      { color: 'var(--s1)', label: 'nava față de stație (<var>v</var>, măsurată de Ana)' },
      { color: 'var(--s2)', label: 'proiectil față de navă (<var>u</var>′, măsurată de Bogdan)' },
      { color: 'var(--good)', label: 'rezultatul corect' },
      { color: 'var(--bad)', label: 'adunarea simplă' }
    ]);

    /* ---------- (2) desen ---------- */
    function drawScene(t) {
      var P = RF.sim.palette(), W = cv.W, H = cv.H, fs = W < 460 ? 11 : 12.5;
      D.clear(cv);
      var cap;
      if (S.mode === 'inv') cap = 'Nava fuge cu ' + fv(S.v) + ' · Ana trimite lumină după ea';
      else if (S.light) cap = 'Nava: ' + fv(S.v) + ' · impuls de lumină (față de navă: c)';
      else cap = 'Nava: ' + fv(S.v) + ' · proiectil față de navă: ' + fv(S.up);
      D.label(ctx, cap, 10, 18, { size: fs, color: P.tx, border: P.line2 });
      paintBars(ctx, P, { x: 0, y: 34, w: W, h: H - 34 },
        { mode: S.mode, v: S.v, up: S.up, light: S.light, shrink: S.shrink, reveal: !S.gate || !!S.revealed[S.stage], rowMax: S.mode === 'inv' ? 84 : 100 }, fs);
    }
    RF.sim.loop(host, function (dt, t) { update(dt, t); drawScene(t); });
  };

  /* ===================================================================
     2. c07Nava — „Nava și proiectilul” (simulare liberă)
     =================================================================== */
  RF.sims.c07Nava = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 16 / 9.4, minH: 340, maxH: 440 });
    cv.cv.setAttribute('role', 'img'); cv.cv.setAttribute('aria-label', 'Cursa din stația Anei (nava, lumina, proiectilul corect și suma simplă) și barele de viteză pe scara de la 0 la 2 c.');
    var ctx = cv.ctx;

    /* ---------- (1) stare + fizică ---------- */
    var S = { v: 0.6, up: 0.6, light: false, ph: 0 };
    function upEff() { return S.light ? 1 : S.up; }
    function update(dt) { S.ph = (S.ph + dt) % CYC; }

    var sv = RF.ui.slider(api.controls, {
      label: 'Nava față de stație — <var>v</var> (o măsoară Ana)', min: 0, max: 0.99, step: 0.01, value: S.v,
      fmt: function (x) { return RF.fmt.c(x); },
      onInput: function (x) { S.v = x; info(); }
    });
    var su = RF.ui.slider(api.controls, {
      label: 'Proiectil față de navă — <var>u</var>′ (o măsoară Bogdan)', min: 0, max: 0.99, step: 0.01, value: S.up, tone: 's2',
      fmt: function (x) { return S.light ? '1,00 c (lumină)' : RF.fmt.c(x); },
      onInput: function (x) { S.up = x; info(); }
    });
    RF.ui.toggle(api.controls, {
      label: 'Proiectilul este un impuls de lumină (<var>u</var>′ = <var>c</var>)', value: false,
      onChange: function (b) {
        S.light = b;
        su.input.disabled = b; su.el.style.opacity = b ? 0.45 : 1;
        su.set(su.get(), true);                       // repictează textul valorii
        info();
      }
    });
    var ro = RF.ui.readouts(api.controls, [
      { k: 'g', label: 'Adunarea simplă ar da' },
      { k: 'r', label: 'Regula corectă dă (măsoară Ana)' },
      { k: 'e', label: 'Suma simplă depășește rezultatul corect cu' }
    ]);
    ro.el.classList.add('c7-wide');
    RF.ui.legend(api.controls, [
      { color: 'var(--s1)', label: '<var>v</var> (Ana)' },
      { color: 'var(--s2)', label: '<var>u</var>′ (Bogdan)' },
      { color: 'var(--good)', label: 'rezultat corect' },
      { color: 'var(--bad)', label: 'adunare simplă / peste <var>c</var>' }
    ]);
    function info() {
      var up = upEff(), gal = S.v + up, rel = compose(S.v, up);
      ro.set('g', fv(gal) + (gal > 1 + 1e-9 ? '  ✗' : ''));
      ro.set('r', fv(rel) + '  ✓');
      ro.set('e', fp(S.v * up));
    }
    info();

    /* ---------- (2) desen ---------- */
    function drawScene(t) {
      var P = RF.sim.palette(), W = cv.W, H = cv.H, fs = W < 460 ? 11 : 12.5;
      D.clear(cv);
      var sh = Math.round(H * 0.43);
      var sc = { mode: 'fwd', v: S.v, up: upEff(), light: S.light, reveal: true, shrink: false, rowMax: 92 };
      paintRace(ctx, P, { x: 0, y: 0, w: W, h: sh }, sc, S.ph, fs);
      D.line(ctx, 0, sh, W, sh, P.line, 1);
      paintBars(ctx, P, { x: 0, y: sh + 2, w: W, h: H - sh - 2 }, sc, fs);
    }
    RF.sim.loop(host, function (dt, t) { update(dt); drawScene(t); });
  };
})();
