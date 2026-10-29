/* Capitolul 7 (Adaos) — simularea „c07Apropiere”: viteza de apropiere (în stație) vs. viteza relativă.
   Structură: (1) stare + fizică (update) · (2) un singur drawScene(...) care conține TOT desenul. Vitezele sunt în unități de c. */
(function () {
  'use strict';
  var RF = window.RF, D = RF.draw;

  /* ---------- fizică (fără desen) ---------- */
  function compose(v, u1) { return (u1 + v) / (1 + u1 * v); }
  function fv(x) {
    if (Math.abs(x - 1) < 5e-6) return '1,00 c';
    var d = (x >= 1 || x < 0.95) ? 2 : x < 0.995 ? 3 : x < 0.9995 ? 4 : 5;
    return RF.fmt.n(x, d) + ' c';
  }
  var RUN = 3.0, CYC = 4.8;

  RF.sims.c07Apropiere = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 16 / 9.6, minH: 340, maxH: 440 });
    cv.cv.setAttribute('role', 'img'); cv.cv.setAttribute('aria-label', 'Două nave se apropie în sistemul stației; barele compară ritmul de apropiere (poate trece de c) cu viteza relativă (rămâne sub c).');
    var ctx = cv.ctx;

    /* ---------- (1) stare ---------- */
    var S = { a: 0.9, b: 0.9, ph: 0 };
    function update(dt) { S.ph = (S.ph + dt) % CYC; }

    RF.ui.slider(api.controls, {
      label: 'Nava A față de stație (o măsoară Ana)', min: 0, max: 0.99, step: 0.01, value: S.a, tone: 's2',
      fmt: function (x) { return RF.fmt.c(x); },
      onInput: function (x) { S.a = x; info(); }
    });
    RF.ui.slider(api.controls, {
      label: 'Nava B față de stație (o măsoară Ana)', min: 0, max: 0.99, step: 0.01, value: S.b, tone: 'violet',
      fmt: function (x) { return RF.fmt.c(x); },
      onInput: function (x) { S.b = x; info(); }
    });
    var ro = RF.ui.readouts(api.controls, [
      { k: 'c', label: 'Ritmul de apropiere, în stație' },
      { k: 'r', label: 'A măsoară viteza lui B (și invers)' },
      { k: 's', label: 'Suma simplă depășește viteza relativă cu' }
    ]);
    ro.el.classList.add('c7-wide');
    function info() {
      var cl = S.a + S.b, rel = compose(S.a, S.b);
      ro.set('c', fv(cl) + (cl > 1 + 1e-9 ? '  (nu e viteză)' : ''));
      ro.set('r', fv(rel) + '  ✓');
      var e = S.a * S.b * 100;
      ro.set('s', e < 0.05 ? '≈ 0 %' : RF.fmt.n(e, e < 10 ? 1 : 0) + ' %');
    }
    info();

    /* ---------- (2) desen ---------- */
    function drawScene(t) {
      var P = RF.sim.palette(), W = cv.W, H = cv.H, fs = W < 460 ? 11 : 12.5;
      D.clear(cv);
      var sh = Math.round(H * 0.42);
      paintStrip(P, { x: 0, y: 0, w: W, h: sh }, fs);
      D.line(ctx, 0, sh, W, sh, P.line, 1);
      paintBars(P, { x: 0, y: sh + 2, w: W, h: H - sh - 2 }, fs);
    }

    /* scena în sistemul stației: două nave se apropie */
    function paintStrip(P, R, fs) {
      var A = RF.art;
      var shipL = Math.min(84, R.w * 0.2), gy = R.y + R.h * 0.62;
      var xA0 = R.x + 10 + shipL, xB0 = R.x + R.w - 10 - shipL, gap0 = xB0 - xA0;
      var K = gap0 / (1.98 * 1.7), clos = S.a + S.b;
      var tm = clos > 0.01 ? gap0 / (K * clos) : 1e9;
      var tt = Math.min(S.ph, RUN, tm);
      var xa = xA0 + S.a * K * tt, xb = xB0 - S.b * K * tt;
      ctx.save();
      ctx.beginPath(); ctx.rect(R.x, R.y, R.w, R.h); ctx.clip();
      ctx.translate(R.x, R.y); A.space(ctx, R.w, R.h, { t: S.ph, nebula: true }); ctx.translate(-R.x, -R.y);
      /* stația (Ana), în spatele navelor */
      var cx = R.x + R.w / 2;
      A.station(ctx, cx, gy - 4, Math.min(120, R.w * 0.3), { t: S.ph, label: 'Ana (stația)' });
      /* nava A (roz) și nava B (violet) */
      A.rocket(ctx, xa - shipL / 2, gy, shipL, { thrust: 0.2 + 0.6 * S.a, t: S.ph, label: 'A', accent: P.s2 });
      A.rocket(ctx, xb + shipL / 2, gy, shipL, { thrust: 0.2 + 0.6 * S.b, t: S.ph, label: 'B', accent: P.acc2, pilot: false, facing: -1 });
      /* distanța dintre nave */
      var yd = gy - shipL * 0.3 - 22, mid = (xa + xb) / 2;
      if (xb - xa > 16) {
        D.arrow(ctx, mid, yd, xa + 2, yd, { color: P.s1, w: 2.4, head: 8 });
        D.arrow(ctx, mid, yd, xb - 2, yd, { color: P.s1, w: 2.4, head: 8 });
      }
      A.chip(ctx, 'distanța scade cu ' + fv(clos) + ' (în stație)', cx, Math.max(R.y + 16, yd - 18), { dot: P.s1, align: 'center', size: fs - 0.5 });
      ctx.restore();
    }

    /* bare: ritmul de apropiere (stația) vs. viteza relativă (măsurată de A, de B) */
    function paintBars(P, R, fs) {
      var A = RF.art, H7 = RF.c07;
      var x0 = R.x + 14, x1 = R.x + R.w - 14, narrow = R.w < 460;
      function X(s) { return x0 + (x1 - x0) * Math.max(0, Math.min(2, s)) / 2; }
      var top = R.y + 22, rh = Math.min(54, (R.h - 34) / 3), bh = 16, xc = X(1), xr = R.x + R.w - 6;
      var bottom = top + 3 * rh - 8, zTop = top + rh - 6;
      var cl = S.a + S.b, rel = compose(S.a, S.b);

      /* zona „peste c” doar pentru rândurile 2–3 (acolo sunt viteze de corpuri) */
      ctx.save();
      D.rrect(ctx, xc, zTop, X(2) - xc, bottom - zTop, 10); ctx.clip();
      ctx.fillStyle = D.rgba(P.bad, 0.1); ctx.fillRect(xc, zTop, X(2) - xc, bottom - zTop);
      ctx.strokeStyle = D.rgba(P.bad, 0.22); ctx.lineWidth = 1.2;
      for (var k = -(bottom - zTop); k < X(2) - xc; k += 12) {
        ctx.beginPath(); ctx.moveTo(xc + k, bottom); ctx.lineTo(xc + k + (bottom - zTop), zTop); ctx.stroke();
      }
      ctx.restore();
      A.chip(ctx, narrow ? 'viteze: nu trec de c' : 'viteze de corpuri: nu trec de c', (xc + X(2)) / 2, bottom + 12, { dot: P.bad, align: 'center', size: fs - 1 });

      [0, 0.5, 1, 1.5, 2].forEach(function (s) {
        var lab = s === 0 ? '0' : s === 1 ? 'c' : s === 2 ? '2 c' : RF.fmt.n(s, 1);
        D.text(ctx, lab, X(s), R.y + 14, { color: s === 1 ? P.light : P.tx3, size: fs - 1, align: s === 0 ? 'left' : s === 2 ? 'right' : 'center', weight: s === 1 ? 800 : 400 });
        if (s !== 1) D.line(ctx, X(s), top - 6, X(s), bottom, D.rgba(P.line2, 0.4), 1, [2, 5]);
      });
      A.glow(ctx, xc, (top + bottom) / 2, Math.max(36, (bottom - top) * 0.55), P.light, 0.5);
      ctx.save();
      ctx.shadowColor = D.rgba(P.light, 0.9); ctx.shadowBlur = 10;
      D.rrect(ctx, xc - 2.5, top - 8, 5, bottom - top + 8, 2.5);
      ctx.fillStyle = A.lin(ctx, 0, top, 0, bottom, [[0, '#ffffff'], [0.5, A.lighten(P.light, 0.5)], [1, P.light]]); ctx.fill();
      ctx.restore();

      function row(i, label, val, color, txt, txtColor) {
        var y0 = top + i * rh, yb = y0 + 16, yc = yb + bh / 2;
        D.text(ctx, label, x0, y0 + 10, { color: P.tx2, size: fs, weight: 600 });
        H7.capsule(ctx, P, X(0), X(2), yb, bh);
        H7.seg(ctx, P, X(0), X(val), yb, bh, color, null, fs, true, true);
        H7.endLabel(ctx, txt, X(val), yc, txtColor, fs, xr);
      }
      row(0, narrow ? 'Ritm de apropiere (stația)' : 'Ritm de apropiere, măsurat în stație', cl, P.s1, fv(cl) + (cl > 1 + 1e-9 ? '  (nu e viteză)' : ''), P.s1);
      row(1, narrow ? 'A măsoară viteza lui B' : 'Nava A măsoară viteza navei B', rel, P.s2, fv(rel) + '  ✓', P.good);
      row(2, narrow ? 'B măsoară viteza lui A' : 'Nava B măsoară viteza navei A', rel, P.acc2, fv(rel) + '  ✓', P.good);
    }
    RF.sim.loop(host, function (dt, t) { update(dt); drawScene(t); });
  };
})();
