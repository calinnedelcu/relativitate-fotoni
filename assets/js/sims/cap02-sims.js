/* Capitolul 2 — Spațiu-timp și intervalul: c02Roteste, c02Minkowski, c02Poveste, c02Con */
(function () {
  'use strict';
  var RF = window.RF, D = RF.draw;
  var DEG = Math.PI / 180;

  /* ---------- ajutoare ---------- */
  function nf(x, d) {                         // număr cu virgulă și minus tipografic
    var s = RF.fmt.n(x, d == null ? 2 : d);
    if (/^-0(,0*)?$/.test(s)) s = s.slice(1);
    return s.replace('-', '−');
  }
  function sg(x, d) {                         // cu semn explicit (+ sau −)
    var s = nf(x, d);
    return (s.charAt(0) === '−' || /^0(,0*)?$/.test(s)) ? s : '+' + s;
  }
  function fsz(W) { return W < 460 ? 11 : 12.5; }
  function unit(a, b) { var dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1; return [dx / l, dy / l]; }
  function tint(ro, i, css) { var r = ro.el.children[i]; if (r && r.lastChild) r.lastChild.style.color = css; }
  function rightMark(ctx, C, u, w, r, color) {   // colț drept în vârful C (u, w = versori spre laturi)
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.beginPath();
    ctx.moveTo(C[0] + u[0] * r, C[1] + u[1] * r);
    ctx.lineTo(C[0] + (u[0] + w[0]) * r, C[1] + (u[1] + w[1]) * r);
    ctx.lineTo(C[0] + w[0] * r, C[1] + w[1] * r);
    ctx.stroke(); ctx.restore();
  }
  /* etichete stivuite de jos în sus, centrate: items = [{t, color}] */
  function stackLabels(cv, items, alpha) {
    var ctx = cv.ctx, f = fsz(cv.W), y = cv.H - 15, P = RF.sim.palette();
    ctx.save(); if (alpha != null) ctx.globalAlpha *= alpha;
    items.forEach(function (it) {
      D.label(ctx, it.t, cv.W / 2, y, { size: f, color: it.color || P.tx, align: 'center', border: it.border || null });
      y -= f + 12;
    });
    ctx.restore();
  }

  /* ===================================================================
     A. Harta cu axe rotite (desen comun pentru c02Roteste și c02Poveste)
     =================================================================== */
  var MAP = { x0: -1.4, x1: 7.4, y0: -1.4, y1: 5.8 }, PA = [1, 1], PB = [5, 4];
  /* FIZICA hărții (fără desen): componentele segmentului AB în axele inițiale și în cele rotite cu phi (radiani) */
  function mapPhys(phi) {
    var c = Math.cos(phi), sn = Math.sin(phi), dx = PB[0] - PA[0], dy = PB[1] - PA[1];
    var dxp = dx * c + dy * sn, dyp = -dx * sn + dy * c;
    return { phi: phi, dx: dx, dy: dy, dxp: dxp, dyp: dyp, dS: Math.sqrt(dx * dx + dy * dy), dP: Math.sqrt(dxp * dxp + dyp * dyp) };
  }
  /* DESENUL hărții — toate apelurile de desen sunt aici (o.ph = rezultatul lui mapPhys) */
  function drawMap(cv, o) {
    var ctx = cv.ctx, P = RF.sim.palette(), W = cv.W, H = cv.H, f = fsz(W);
    var wx = MAP.x1 - MAP.x0, wy = MAP.y1 - MAP.y0, s = Math.min(W / wx, H / wy);
    var ox = (W - wx * s) / 2, oy = (H - wy * s) / 2;
    function pt(x, y) { return [ox + (x - MAP.x0) * s, oy + (MAP.y1 - y) * s]; }
    var ph = o.ph.phi, c = Math.cos(ph), sn = Math.sin(ph), al = o.alpha == null ? 1 : o.alpha, nm = o.names || {};
    var k, k0, k1, p1, p2;

    // grila axelor inițiale
    ctx.save(); ctx.strokeStyle = D.rgba(P.s1, 0.13); ctx.lineWidth = 1; ctx.beginPath();
    k0 = Math.ceil(MAP.x0 - ox / s); k1 = Math.floor(MAP.x0 + (W - ox) / s);
    for (k = k0; k <= k1; k++) { p1 = pt(k, 0); ctx.moveTo(p1[0] + 0.5, 0); ctx.lineTo(p1[0] + 0.5, H); }
    k0 = Math.ceil(MAP.y1 - (H - oy) / s); k1 = Math.floor(MAP.y1 + oy / s);
    for (k = k0; k <= k1; k++) { p1 = pt(0, k); ctx.moveTo(0, p1[1] + 0.5); ctx.lineTo(W, p1[1] + 0.5); }
    ctx.stroke(); ctx.restore();
    // grila axelor rotite
    if (al > 0.01) {
      ctx.save(); ctx.strokeStyle = D.rgba(P.s2, 0.14 * al); ctx.lineWidth = 1; ctx.beginPath();
      for (k = -14; k <= 14; k++) {
        p1 = pt(k * c + 30 * sn, k * sn - 30 * c); p2 = pt(k * c - 30 * sn, k * sn + 30 * c);
        ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]);
        p1 = pt(-k * sn - 30 * c, k * c - 30 * sn); p2 = pt(-k * sn + 30 * c, k * c + 30 * sn);
        ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]);
      }
      ctx.stroke(); ctx.restore();
    }

    // axele
    function lim(dx, dy, len) {
      var m = 0.45, L = len;
      if (dx > 1e-6) L = Math.min(L, (MAP.x1 - m) / dx); else if (dx < -1e-6) L = Math.min(L, (MAP.x0 + m) / dx);
      if (dy > 1e-6) L = Math.min(L, (MAP.y1 - m) / dy); else if (dy < -1e-6) L = Math.min(L, (MAP.y0 + m) / dy);
      return L;
    }
    function axis(dx, dy, len, back, color, name, w, a) {
      if (a < 0.01) return;
      var L = lim(dx, dy, len), B = lim(-dx, -dy, back);
      var q0 = pt(-dx * B, -dy * B), q1 = pt(dx * L, dy * L), u = unit(q0, q1);
      ctx.save(); ctx.globalAlpha *= a;
      D.arrow(ctx, q0[0], q0[1], q1[0], q1[1], { color: color, w: w, head: 10 });
      D.text(ctx, name, q1[0] + u[0] * 15, q1[1] + u[1] * 15, { color: color, size: f + 1, weight: 700, align: 'center', base: 'middle' });
      ctx.restore();
    }
    axis(1, 0, 7.2, 1.0, P.s1, 'x', 2.2, 1);
    axis(0, 1, 5.6, 1.0, P.s1, nm.y || 'y', 2.2, 1);
    axis(c, sn, 6.1, 1.0, P.s2, 'x′', 2.4, al);
    axis(-sn, c, 4.5, 1.0, P.s2, nm.yp || 'y′', 2.4, al);

    // arcul unghiului
    var O = pt(0, 0);
    if (al > 0.05 && Math.abs(ph) > 0.12) {
      var r = 1.2 * s;
      ctx.save(); ctx.strokeStyle = D.rgba(P.s2, 0.95 * al); ctx.lineWidth = 2; ctx.beginPath();
      ctx.arc(O[0], O[1], r, 0, -ph, ph > 0); ctx.stroke(); ctx.restore();
      ctx.save(); ctx.globalAlpha *= al;
      D.text(ctx, nm.angle || 'φ', O[0] + Math.cos(ph / 2) * (r + 12), O[1] - Math.sin(ph / 2) * (r + 12), { color: P.s2, size: f + 1, weight: 700, align: 'center', base: 'middle' });
      ctx.restore();
    }

    // punctele, triunghiurile și segmentul AB
    var A = pt(PA[0], PA[1]), B = pt(PB[0], PB[1]);
    var dxp = o.ph.dxp;
    var C1 = pt(PB[0], PA[1]), C2 = pt(PA[0] + dxp * c, PA[1] + dxp * sn);
    function tri(V, C, W2, color, a, n1, n2) {
      if (a < 0.02) return;
      ctx.save(); ctx.globalAlpha *= a;
      D.line(ctx, V[0], V[1], C[0], C[1], color, 2, [6, 5]);
      D.line(ctx, C[0], C[1], W2[0], W2[1], color, 2, [6, 5]);
      if (Math.hypot(C[0] - V[0], C[1] - V[1]) > 14 && Math.hypot(C[0] - W2[0], C[1] - W2[1]) > 14) rightMark(ctx, C, unit(C, V), unit(C, W2), 9, color);
      var cen = [(V[0] + C[0] + W2[0]) / 3, (V[1] + C[1] + W2[1]) / 3];
      [[V, C, n1], [C, W2, n2]].forEach(function (L) {
        var q = L[0], z = L[1];
        if (Math.hypot(z[0] - q[0], z[1] - q[1]) < 24) return;
        var m = [(q[0] + z[0]) / 2, (q[1] + z[1]) / 2], d = unit(cen, m);
        D.label(ctx, L[2], m[0] + d[0] * 17, m[1] + d[1] * 17, { size: f, color: color, align: 'center', bg: D.rgba(P.card, 0.82) });
      });
      ctx.restore();
    }
    tri(A, C1, B, P.s1, 1, nm.dx || 'Δx', nm.dy || 'Δy');
    tri(A, C2, B, P.s2, al, 'Δx′', nm.dyp || 'Δy′');
    D.line(ctx, A[0], A[1], B[0], B[1], P.good, 3.5);
    var mid = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], ab = unit(A, B), n = [-ab[1], ab[0]];
    if (n[0] * (mid[0] - C1[0]) + n[1] * (mid[1] - C1[1]) < 0) n = [-n[0], -n[1]];
    D.label(ctx, nm.ab || 'AB', mid[0] + n[0] * 20, mid[1] + n[1] * 20, { size: f + 1, color: P.good, align: 'center', border: P.good });
    D.dot(ctx, A[0], A[1], 5.5, P.tx, 8); D.dot(ctx, B[0], B[1], 5.5, P.tx, 8);
    D.text(ctx, nm.a || 'A', A[0] - 13, A[1] + 13, { color: P.tx, size: f + 1, weight: 700, align: 'center', base: 'middle' });
    D.text(ctx, nm.b || 'B', B[0] + 13, B[1] - 13, { color: P.tx, size: f + 1, weight: 700, align: 'center', base: 'middle' });
  }

  /* ===================================================================
     B. Diagrama Minkowski reală (x–ct), desen comun
     =================================================================== */
  var MK = { x0: -4.2, x1: 4.2, y0: -1.3, y1: 4.7 };
  /* FIZICA diagramei (fără desen): coordonatele unui eveniment E2 față de E1 în S și în S′ (β = v/c), în unități c = 1 */
  function minkPhys(beta, dx, ct) {
    var g = 1 / Math.sqrt(1 - beta * beta), Xp = g * (dx - beta * ct), Tp = g * (ct - beta * dx);
    return { b: beta, g: g, dx: dx, ct: ct, Xp: Xp, Tp: Tp, ds2: dx * dx - ct * ct, ds2p: Xp * Xp - Tp * Tp };
  }
  /* DESENUL diagramei — toate apelurile de desen sunt aici (o.ph = rezultatul lui minkPhys) */
  function drawMink(cv, o) {
    var ctx = cv.ctx, P = RF.sim.palette(), W = cv.W, H = cv.H, f = fsz(W);
    var wx = MK.x1 - MK.x0, wy = MK.y1 - MK.y0, s = Math.min(W / wx, H / wy);
    var ox = (W - wx * s) / 2, oy = (H - wy * s) / 2;
    function pt(x, y) { return [ox + (x - MK.x0) * s, oy + (MK.y1 - y) * s]; }
    var q = o.ph, b = q.b, g = q.g, dx = q.dx, ct = q.ct, Xp = q.Xp, Tp = q.Tp;
    var pr = o.prime == null ? 1 : o.prime, cS = o.consS == null ? 1 : o.consS, cP = o.consP == null ? 1 : o.consP;
    var iv = o.interval == null ? 1 : o.interval, wd = o.wedge || 0, k, k0, k1, p1, p2, L;

    // zonele (conul luminii) — doar în Adaos
    if (wd > 0.01) {
      var O0 = pt(0, 0), a1 = pt(-9, 9), a2 = pt(9, 9), a3 = pt(-9, -9), a4 = pt(9, -9);
      ctx.save();
      ctx.fillStyle = D.rgba(P.light, 0.10 * wd);
      ctx.beginPath(); ctx.moveTo(O0[0], O0[1]); ctx.lineTo(a1[0], a1[1]); ctx.lineTo(a2[0], a2[1]); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(O0[0], O0[1]); ctx.lineTo(a3[0], a3[1]); ctx.lineTo(a4[0], a4[1]); ctx.closePath(); ctx.fill();
      ctx.fillStyle = D.rgba(P.bad, 0.07 * wd);
      ctx.beginPath(); ctx.moveTo(O0[0], O0[1]); ctx.lineTo(a1[0], a1[1]); ctx.lineTo(a3[0], a3[1]); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(O0[0], O0[1]); ctx.lineTo(a2[0], a2[1]); ctx.lineTo(a4[0], a4[1]); ctx.closePath(); ctx.fill();
      ctx.restore();
    }
    // grila lui S
    ctx.save(); ctx.strokeStyle = D.rgba(P.s1, 0.12); ctx.lineWidth = 1; ctx.beginPath();
    k0 = Math.ceil(MK.x0 - ox / s); k1 = Math.floor(MK.x0 + (W - ox) / s);
    for (k = k0; k <= k1; k++) { p1 = pt(k, 0); ctx.moveTo(p1[0] + 0.5, 0); ctx.lineTo(p1[0] + 0.5, H); }
    k0 = Math.ceil(MK.y1 - (H - oy) / s); k1 = Math.floor(MK.y1 + oy / s);
    for (k = k0; k <= k1; k++) { p1 = pt(0, k); ctx.moveTo(0, p1[1] + 0.5); ctx.lineTo(W, p1[1] + 0.5); }
    ctx.stroke(); ctx.restore();
    // grila lui S′ (liniile x′ = k și ct′ = k)
    if (pr > 0.01) {
      ctx.save(); ctx.strokeStyle = D.rgba(P.s2, 0.17 * pr); ctx.lineWidth = 1; ctx.beginPath();
      for (k = -6; k <= 6; k++) {
        if (!k) continue;
        p1 = pt(g * (k - 12 * b), g * (-12 + b * k)); p2 = pt(g * (k + 12 * b), g * (12 + b * k));
        ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]);
        p1 = pt(g * (-12 + b * k), g * (k - 12 * b)); p2 = pt(g * (12 + b * k), g * (k + 12 * b));
        ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]);
      }
      ctx.stroke(); ctx.restore();
    }
    // linia luminii (aceeași pentru toți)
    p1 = pt(-9, -9); p2 = pt(9, 9); D.line(ctx, p1[0], p1[1], p2[0], p2[1], P.light, 2.6);
    p1 = pt(-9, 9); p2 = pt(9, -9); D.line(ctx, p1[0], p1[1], p2[0], p2[1], P.light, 2.6);
    if (o.lightLabel !== false) {
      var ll = pt(3.05, 3.95);
      D.label(ctx, W < 460 ? 'lumina' : 'linia luminii', ll[0], ll[1], { size: f, color: P.light, align: 'center' });
    }

    // axele lui S
    function arrowAxis(q0, q1, color, w, name, off, a) {
      if (a < 0.01) return;
      ctx.save(); ctx.globalAlpha *= a;
      D.arrow(ctx, q0[0], q0[1], q1[0], q1[1], { color: color, w: w, head: 10 });
      D.text(ctx, name, q1[0] + off[0], q1[1] + off[1], { color: color, size: f + 1, weight: 700, align: 'center', base: 'middle' });
      ctx.restore();
    }
    arrowAxis(pt(-4.05, 0), pt(4.1, 0), P.s1, 2.2, 'x', [-4, 14], 1);
    arrowAxis(pt(0, -1.15), pt(0, 4.45), P.s1, 2.2, 'ct', [-17, 3], 1);
    // axele lui S′
    var u1 = Math.min(4.35, 3.95 / Math.max(b, 0.01)), tip1 = pt(b * u1, u1), tip2 = pt(3.8, 3.8 * b);
    arrowAxis(pt(-b * 1.1, -1.1), tip1, P.s2, 2.5, 'ct′', [tip1[0] + 36 > W ? -19 : 19, 3], pr);
    arrowAxis(pt(-3.8, -3.8 * b), tip2, P.s2, 2.5, 'x′', [-1, -14], pr);

    var E1 = pt(0, 0), E2 = pt(dx, ct);
    // citirea coordonatelor în S
    if (cS > 0.02) {
      ctx.save(); ctx.globalAlpha *= cS;
      var fx = pt(dx, 0), fy = pt(0, ct);
      D.line(ctx, E2[0], E2[1], fx[0], fx[1], P.s1, 1.8, [6, 5]);
      D.line(ctx, E2[0], E2[1], fy[0], fy[1], P.s1, 1.8, [6, 5]);
      if (Math.abs(dx) * s > 18) D.label(ctx, 'Δx', fx[0], fx[1] + 15, { size: f, color: P.s1, align: 'center' });
      if (Math.abs(ct) * s > 18) D.label(ctx, 'cΔt', fy[0] - 9, fy[1], { size: f, color: P.s1, align: 'right' });
      ctx.restore();
    }
    // citirea coordonatelor în S′: paralele la axele lui S′
    if (cP > 0.02 && b > 0.03) {
      ctx.save(); ctx.globalAlpha *= cP;
      var F1 = pt(g * Xp, g * b * Xp), F2 = pt(g * b * Tp, g * Tp);
      D.line(ctx, E2[0], E2[1], F1[0], F1[1], P.s2, 1.8, [2, 4]);
      D.line(ctx, E2[0], E2[1], F2[0], F2[1], P.s2, 1.8, [2, 4]);
      if (Math.hypot(F1[0] - E1[0], F1[1] - E1[1]) > 26) D.label(ctx, 'Δx′', F1[0] + 6, F1[1] + 16, { size: f, color: P.s2, align: 'center' });
      if (Math.hypot(F2[0] - E1[0], F2[1] - E1[1]) > 26) D.label(ctx, 'cΔt′', F2[0] + 10, F2[1], { size: f, color: P.s2, align: 'left' });
      ctx.restore();
    }
    // intervalul (același pentru toți)
    if (iv > 0.02) {
      ctx.save(); ctx.globalAlpha *= iv;
      D.line(ctx, E1[0], E1[1], E2[0], E2[1], P.good, 3.2);
      var m = [(E1[0] + E2[0]) / 2, (E1[1] + E2[1]) / 2], u = unit(E1, E2), nn = [u[1], -u[0]];
      D.label(ctx, 'Δs', m[0] + nn[0] * 17, m[1] + nn[1] * 17, { size: f + 1, color: P.good, align: 'center', border: P.good });
      ctx.restore();
    }
    // evenimentele
    D.dot(ctx, E1[0], E1[1], 5.5, P.tx, 8);
    D.dot(ctx, E2[0], E2[1], 6, P.tx, 10);
    D.text(ctx, 'E₁', E1[0] - 11, E1[1] + 14, { color: P.tx, size: f + 1, weight: 700, align: 'center', base: 'middle' });
    var right = E2[0] + 28 > W;
    D.text(ctx, 'E₂', E2[0] + (right ? -13 : 13), E2[1] - 13, { color: P.tx, size: f + 1, weight: 700, align: 'center', base: 'middle' });

    if (o.zones) {
      var z1 = pt(0, -0.78), z2 = pt(-3.0, 0.5);
      D.label(ctx, 'de tip timp', z1[0], z1[1], { size: f, color: P.good, align: 'center' });
      D.label(ctx, 'de tip spațiu', z2[0], z2[1], { size: f, color: P.bad, align: 'center' });
    }
  }

  /* ===================================================================
     1. c02Roteste — rotește axele: Δx, Δy se schimbă, AB nu
     =================================================================== */
  RF.sims.c02Roteste = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 16 / 10, minH: 300, maxH: 430 });
    var phiDeg = 30, auto = !RF.reduced, T = 0;
    var sl = RF.ui.slider(api.controls, {
      label: 'Rotația axelor (unghiul φ)', min: -90, max: 90, step: 1, value: phiDeg, tone: 's2',
      fmt: function (v) { return Math.round(v) + '°'; },
      onInput: function (v) { phiDeg = v; setAuto(false); }
    });
    var bt = RF.ui.buttons(api.controls, [{ label: auto ? '❚❚ Oprește rotirea' : '▶ Rotește singur', onClick: function () { setAuto(!auto); } }]);
    function setAuto(on) { auto = on; bt.buttons[0].textContent = on ? '❚❚ Oprește rotirea' : '▶ Rotește singur'; }
    var ro = RF.ui.readouts(api.controls, [
      { k: 's', label: 'În axele x, y (cyan)' },
      { k: 'p', label: 'În axele x′, y′ (roz)' },
      { k: 'ds', label: 'Distanța AB, din valorile cyan' },
      { k: 'dp', label: 'Distanța AB, din valorile roz' }
    ]);
    tint(ro, 2, 'var(--good)'); tint(ro, 3, 'var(--good)');
    RF.ui.legend(api.controls, [
      { color: 'var(--s1)', label: 'axele x, y' }, { color: 'var(--s2)', label: 'axele rotite x′, y′' }, { color: 'var(--good)', label: 'distanța AB' }
    ]);

    var st = null;
    /* (1) STAREA + FIZICA: ce se întâmplă, fără niciun apel de desen */
    function update(dt) {
      if (auto && dt > 0) {
        T += dt; phiDeg = 30 + 45 * Math.sin(T * 0.55);
        sl.set(Math.round(phiDeg), true);
      }
      st = mapPhys(phiDeg * DEG);
      ro.set('s', 'Δx = ' + nf(st.dx, 2) + ' · Δy = ' + nf(st.dy, 2));
      ro.set('p', 'Δx′ = ' + nf(st.dxp, 2) + ' · Δy′ = ' + nf(st.dyp, 2));
      ro.set('ds', nf(st.dS, 2) + ' m');
      ro.set('dp', nf(st.dP, 2) + ' m  ✓');
    }
    /* (2) DESENUL: toate apelurile de desen ale simulării */
    function drawScene(S) {
      var P = RF.sim.palette();
      D.clear(cv);
      drawMap(cv, { ph: S, alpha: 1 });
      stackLabels(cv, [{ t: 'AB = ' + nf(S.dS, 2) + ' m — la fel, oricum ai pune axele', color: P.good }]);
    }
    RF.sim.loop(host, function (dt) { update(dt); drawScene(st); });
  };
  /* ===================================================================
     2. c02Minkowski — doi observatori, aceleași două evenimente
     =================================================================== */
  var PRESETS = { sp: { dx: 3.0, ct: 2.0 }, time: { dx: 1.5, ct: 3.0 }, light: { dx: 2.5, ct: 2.5 } };
  RF.sims.c02Minkowski = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 1.5, minH: 300, maxH: 470 });
    var beta = 0.5, pre = 'sp', dirty = true, st = null;
    RF.ui.slider(api.controls, {
      label: 'Viteza lui S′ față de S', min: 0, max: 0.95, step: 0.01, value: beta, tone: 's2',
      fmt: function (v) { return RF.fmt.c(v) + ' · α = ' + nf(Math.atan(v) / DEG, 1) + '°'; },
      onInput: function (v) { beta = v; dirty = true; }
    });
    RF.ui.segmented(api.controls, {
      label: 'Perechea de evenimente', value: pre,
      options: [{ k: 'sp', label: 'Două scântei' }, { k: 'time', label: 'Plecare și sosire' }, { k: 'light', label: 'Impuls de lumină' }],
      onChange: function (k) { pre = k; dirty = true; }
    });
    var ro = RF.ui.readouts(api.controls, [
      { k: 'a', label: 'În S (unități: ani-lumină)' },
      { k: 'b', label: 'În S′' },
      { k: 'c', label: '(Δs)² calculat în S' },
      { k: 'd', label: '(Δs)² calculat în S′' }
    ]);
    tint(ro, 2, 'var(--good)'); tint(ro, 3, 'var(--good)');
    RF.ui.legend(api.controls, [
      { color: 'var(--s1)', label: 'axele lui S' }, { color: 'var(--s2)', label: 'axele lui S′' },
      { color: 'var(--light)', label: 'linia luminii' }, { color: 'var(--good)', label: 'intervalul Δs' }
    ]);
    RF.sim.onTheme(function () { dirty = true; });

    /* (1) STAREA + FIZICA */
    function update() {
      var e = PRESETS[pre];
      st = minkPhys(beta, e.dx, e.ct);
      ro.set('a', 'Δx = ' + nf(st.dx, 2) + ' · cΔt = ' + nf(st.ct, 2));
      ro.set('b', 'Δx′ = ' + nf(st.Xp, 2) + ' · cΔt′ = ' + nf(st.Tp, 2));
      ro.set('c', sg(st.ds2, 2));
      ro.set('d', sg(st.ds2p, 2) + '  ✓');
    }
    /* (2) DESENUL */
    function drawScene(S) {
      var P = RF.sim.palette(), items = [{ t: '(Δs)² = ' + sg(S.ds2, 2) + ' — la fel în S și în S′  ✓', color: P.good }];
      D.clear(cv);
      drawMink(cv, { ph: S, prime: 1, consS: 1, consP: 1, interval: 1 });
      if (S.b > 0.03) {
        if (Math.abs(S.Tp) < 0.045) items.push({ t: 'în S′ cele două evenimente sunt simultane', color: P.s2 });
        if (Math.abs(S.Xp) < 0.045) items.push({ t: 'în S′ au loc în același loc', color: P.s2 });
        if (S.Tp < -0.045) items.push({ t: 'în S′ ordinea se inversează: E₂ vine primul', color: P.s2 });
      }
      stackLabels(cv, items);
    }
    RF.sim.loop(host, function (dt) {
      if (dirty || dt === 0 || !st) { update(); drawScene(st); dirty = false; }
    });
  };
  /* ===================================================================
     3. c02Poveste — scena poveștii pe pași (stagiile 0..4 vin din „pe pași”)
        0 harta · 1 două evenimente · 2 doi observatori · 3 intervalul · 4 trucul ict
     =================================================================== */
  var ICT_NAMES = { y: 'ict', yp: 'ict′', dy: 'icΔt', dyp: 'icΔt′', ab: 'Δs', angle: 'α', a: 'E₁', b: 'E₂' };
  var CAPS = [
    'Δx și Δy se schimbă · distanța AB nu  ✓',
    'orizontal: spațiul (x) · vertical: timpul (ct)',
    'aceleași două evenimente, alte numere în S′',
    '(Δs)² = Δx² − (cΔt)² — la fel în S și în S′  ✓',
    'axele x–ict: schimbarea S.R.I. = o rotație (formală)'
  ];
  RF.sims.c02Poveste = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 1, minH: 340, maxH: 440 });
    var stage = 0, T = 0, capStage = 0, capA = 1, S = null;
    var sh = { map: 1, mink: 0, prime: 0, iv: 0 };
    if (api.steps) api.steps.addEventListener('rf:step', function (e) { stage = e.detail.stage; });
    function toward(cur, tgt, k) { return cur + (tgt - cur) * k; }

    /* (1) STAREA + FIZICA: tranziții între scene și numerele care se văd */
    function update(dt) {
      var k = Math.min(1, dt * 5);
      T += dt;
      sh.map = toward(sh.map, (stage === 0 || stage === 4) ? 1 : 0, k);
      sh.mink = toward(sh.mink, (stage >= 1 && stage <= 3) ? 1 : 0, k);
      sh.prime = toward(sh.prime, (stage === 2 || stage === 3) ? 1 : 0, k);
      sh.iv = toward(sh.iv, stage === 3 ? 1 : 0, k);
      if (capStage !== stage) { capA -= dt * 6; if (capA <= 0) { capA = 0; capStage = stage; } }
      else capA = Math.min(1, capA + dt * 6);
      S = {
        stage: stage, sh: sh, capStage: capStage, capA: capA,
        map: mapPhys((30 + 45 * Math.sin(T * 0.55)) * DEG),
        mink: minkPhys(0.5 + 0.33 * Math.sin(T * 0.5), 3, 2)
      };
    }

    /* (2) DESENUL: toate apelurile de desen ale scenei */
    function panel(S) {                                    // tabelul de numere din colț (pașii 2–4)
      var sg0 = S.capStage;
      if (sg0 < 1 || sg0 > 3) return;
      var P = RF.sim.palette(), ctx = cv.ctx, m = S.mink, fp = 10.5, rh = 16, x0 = 8, y0 = 8;
      var head = sg0 === 1 ? ['', 'S'] : ['', 'S', 'S′'], rows;
      if (sg0 === 1) rows = [['Δx', nf(m.dx, 2)], ['cΔt', nf(m.ct, 2)]];
      else if (sg0 === 2) rows = [['Δx', nf(m.dx, 2), nf(m.Xp, 2)], ['cΔt', nf(m.ct, 2), nf(m.Tp, 2)]];
      else rows = [['Δx²', nf(m.dx * m.dx, 2), nf(m.Xp * m.Xp, 2)], ['(cΔt)²', nf(m.ct * m.ct, 2), nf(m.Tp * m.Tp, 2)], ['Δs²', sg(m.ds2, 2), sg(m.ds2p, 2)]];
      var cw = [46, 42, 42], w = 16 + cw[0] + cw[1] + (head.length > 2 ? cw[2] : 0), h = 16 + rh * (rows.length + 1);
      var colors = [P.tx2, P.s1, P.s2];
      function rowY(r) { return y0 + 8 + rh * r + rh / 2; }
      function cell(t, r, c, o) {
        var xr = x0 + 8 + cw[0] + (c > 0 ? cw[1] : 0) + (c > 1 ? cw[2] : 0) - 4;
        D.text(ctx, t, c === 0 ? x0 + 8 : xr, rowY(r), { color: o.color, size: fp, weight: o.weight || 500, align: c === 0 ? 'left' : 'right', base: 'middle', mono: true });
      }
      ctx.save(); ctx.globalAlpha *= S.capA * S.sh.mink;
      D.fillRR(ctx, x0, y0, w, h, 8, D.rgba(P.card, 0.94), P.line2, 1);
      if (sg0 === 3) D.fillRR(ctx, x0 + 4, rowY(rows.length) - rh / 2 + 1, w - 8, rh - 2, 5, D.rgba(P.good, 0.18), P.good, 1);
      head.forEach(function (t, c) { cell(t, 0, c, { color: colors[c], weight: 700 }); });
      rows.forEach(function (row, r) {
        var last = sg0 === 3 && r === rows.length - 1;
        row.forEach(function (t, c) { cell(t, r + 1, c, { color: last ? P.good : (c === 0 ? P.tx2 : colors[c]), weight: last ? 700 : 500 }); });
      });
      ctx.restore();
    }
    function drawScene(S) {
      var P = RF.sim.palette(), ctx = cv.ctx, sh = S.sh;
      D.clear(cv);
      if (sh.map > 0.02) {
        ctx.save(); ctx.globalAlpha = sh.map;
        drawMap(cv, { ph: S.map, alpha: 1, names: S.stage === 4 ? ICT_NAMES : null });
        ctx.restore();
      }
      if (sh.mink > 0.02) {
        ctx.save(); ctx.globalAlpha = sh.mink;
        drawMink(cv, { ph: S.mink, prime: sh.prime, consS: 1, consP: sh.prime, interval: sh.iv });
        ctx.restore();
        panel(S);
      }
      stackLabels(cv, [{ t: CAPS[S.capStage], color: (S.capStage === 0 || S.capStage === 3) ? P.good : P.tx }], S.capA);
    }
    RF.sim.loop(host, function (dt) { update(dt); drawScene(S); });
  };

  /* ===================================================================
     4. c02Con — (Adaos) semnul lui (Δs)² și ce poate lega două evenimente
     =================================================================== */
  RF.sims.c02Con = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 16 / 9, minH: 280, maxH: 400 });
    var dx = 1.5, ct = 3.0, dirty = true, st = null;
    RF.ui.slider(api.controls, {
      label: 'Depărtarea în spațiu, Δx (în S)', min: 0, max: 4, step: 0.1, value: dx,
      fmt: function (v) { return nf(v, 1) + ' a.l.'; }, onInput: function (v) { dx = v; dirty = true; }
    });
    RF.ui.slider(api.controls, {
      label: 'Timpul dintre ele, cΔt (în S)', min: 0, max: 4.3, step: 0.1, value: ct, tone: 'light',
      fmt: function (v) { return nf(v, 1) + ' a.l.'; }, onInput: function (v) { ct = v; dirty = true; }
    });
    var ro = RF.ui.readouts(api.controls, [
      { k: 'ds', label: '(Δs)² = Δx² − (cΔt)²' },
      { k: 'ty', label: 'Felul intervalului' },
      { k: 'ca', label: 'E₁ poate fi cauza lui E₂?' }
    ]);
    RF.sim.onTheme(function () { dirty = true; });

    /* (1) STAREA + FIZICA */
    function update() {
      st = minkPhys(0, dx, ct);
      var d = st.ds2, same = dx < 0.05 && ct < 0.05, css, ty, ca;
      if (same) { ty = 'același eveniment'; ca = '—'; css = 'var(--tx2)'; }
      else if (Math.abs(d) < 0.005) { ty = 'de tip lumină'; ca = 'doar printr-un impuls de lumină'; css = 'var(--light)'; }
      else if (d < 0) { ty = 'de tip timp'; ca = 'da — un corp sau un semnal mai lent decât lumina'; css = 'var(--good)'; }
      else { ty = 'de tip spațiu'; ca = 'nu — ar trebui un semnal mai rapid decât lumina'; css = 'var(--bad)'; }
      ro.set('ds', same ? '0,00' : sg(d, 2)); ro.set('ty', ty); ro.set('ca', ca);
      tint(ro, 1, css); tint(ro, 2, css);
    }
    /* (2) DESENUL */
    function drawScene(S) {
      D.clear(cv);
      drawMink(cv, { ph: S, prime: 0, consS: 1, consP: 0, interval: 1, wedge: 1, zones: true });
    }
    RF.sim.loop(host, function (dt) {
      if (dirty || dt === 0 || !st) { update(); drawScene(st); dirty = false; }
    });
  };
})();
