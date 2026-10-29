/* Capitolul 3 — Transformările Lorentz: simulări
   · c03Poveste  — scena din povestea „pe pași” (un eveniment, două adrese)
   · c03Diagrame — Galilei vs. Lorentz: același spațiu-timp, două desene (S și S′)
   · c03Gamma    — γ-metru: cât de departe de Galilei suntem

   Structură (ca desenul să poată fi schimbat ușor):
     1) FIZICĂ + STARE — funcții fără desen (matrice de transformare, modele de vedere, formatare);
     2) DESEN — funcții draw…() care conțin TOT desenul și primesc un „model” deja calculat;
     3) SIMULĂRILE — controale, citiri, buclă; ele doar leagă 1) de 2). */
(function () {
  'use strict';
  var RF = window.RF, D = RF.draw;

  /* =====================================================================
     1 · FIZICĂ ȘI STARE (fără desen)
     ===================================================================== */
  var C_KMS = 299792.458;
  var PR = '′';                                   // ′ (prim)
  var SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };

  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function gam(b) { return RF.phys.gamma(b); }
  /* γ − 1 fără pierdere de precizie la viteze foarte mici */
  function gm1(b) {
    b = Math.min(Math.abs(b), 0.9999999);
    var r = Math.sqrt(1 - b * b);
    return b * b / (r * (1 + r));
  }
  /* 4,3·10⁻¹⁵ */
  function sci(x, d) {
    if (!(x > 0)) return '0';
    d = d == null ? 1 : d;
    var e = Math.floor(Math.log(x) / Math.LN10), m = x / Math.pow(10, e), ms = m.toFixed(d);
    if (parseFloat(ms) >= 10) { ms = (m / 10).toFixed(d); e += 1; }
    return ms.replace('.', ',') + '·10' + String(e).split('').map(function (ch) { return SUP[ch] || ch; }).join('');
  }
  function mn(x, d) { return RF.fmt.n(x, d).replace('-', '−'); }

  /* Matricea S → S′ pe coordonatele (x, ct):  x′ = a·x + b·ct,  ct′ = c·x + d·ct.
     m = 0: Galilei (x′ = x − vt, t′ = t) · m = 1: Lorentz · între ele: doar amestec vizual, pentru animație. */
  function mat(beta, m) {
    var g = gam(beta), a = (1 - m) + m * g;
    var T = { a: a, b: -beta * a, c: -m * g * beta, d: a, m: m, beta: beta };
    T.det = T.a * T.d - T.b * T.c;
    T.inv = { a: T.d / T.det, b: -T.b / T.det, c: -T.c / T.det, d: T.a / T.det, det: 1 / T.det };
    return T;
  }
  function ap(T, p) { return [T.a * p[0] + T.b * p[1], T.c * p[0] + T.d * p[1]]; }

  /* Evenimentele din „Diagrame”, în coordonatele lui S (x, ct): A și B sunt simultane în S,
     C și D au același loc în S. (unități: x și ct în aceeași unitate, de ex. secunde-lumină) */
  var EVB = { A: [-0.55, 0.40], B: [0.55, 0.40], C: [0.25, 0.30], D: [0.25, 0.90] };
  /* Evenimentele din „Poveste” */
  var EVP = { E: [0.75, 0.60], A: [-0.60, 0.50], B: [0.60, 0.50] };

  /* Modelul unui panou: tot ce trebuie desenat într-un desen, calculat din matricea M (S → S′).
     own = 'S' (desenul lui Ana) sau 'Sp' (desenul lui Bogdan). spec: {events, links, lightA, otherA} */
  function panelModel(own, M, spec) {
    var T = own === 'S' ? M.inv : M;                       // coordonatele celuilalt sistem → coordonatele proprii
    var V = { own: own, T: T, otherA: spec.otherA, lightA: spec.lightA, events: [], links: [], rays: [], ref45: false };
    V.u = 0.25 * T.d / T.det;                              // pasul rețelei celuilalt sistem (aspect constant)
    [1, -1].forEach(function (sg) {
      var dir = own === 'S' ? [sg, 1] : ap(M, [sg, 1]);
      var speed = Math.abs(dir[0] / dir[1]);
      V.rays.push({ dir: dir, speed: speed, ok: Math.abs(speed - 1) < 0.005, sg: sg });
    });
    V.ref45 = own === 'Sp' && M.m < 0.5 && M.beta > 0.02 && !!spec.ref45;
    var byId = {};
    spec.events.forEach(function (e) {
      var po = own === 'S' ? e.p : ap(M, e.p), qo = own === 'S' ? ap(M, e.p) : e.p;
      var ev = {
        id: e.id, name: e.id + (own === 'S' ? '' : PR), po: po, a: e.a,
        ownH: !!e.ownH, ownV: !!e.ownV, ownA: e.ownA == null ? 1 : e.ownA,
        othH: !!e.othH, othV: !!e.othV, othA: e.othA == null ? 0 : e.othA,
        coordNames: !!e.coordNames, lab: e.lab || [8, -9],
        footCt: ap(T, [0, qo[1]]), footX: ap(T, [qo[0], 0]), ctLabel: e.ctLabel || null
      };
      V.events.push(ev); byId[e.id] = ev;
    });
    (spec.links || []).forEach(function (l) {
      if (byId[l[0]] && byId[l[1]]) V.links.push({ a: byId[l[0]], b: byId[l[1]] });
    });
    return V;
  }

  /* Bucla: redesenează doar când s-a schimbat ceva (sau cât timp ceva se animă). draw(dt, t) → true cât timp animația continuă. */
  function painter(host, cv, draw) {
    var dirty = true, busy = false;
    RF.sim.loop(host, function (dt, t) {
      if (!cv.W || !cv.H) return;
      if (dirty || busy) { dirty = false; busy = !!draw(dt, t); }
    });
    cv.onResize(function () { dirty = true; });
    RF.sim.onTheme(function () { dirty = true; });
    return { invalidate: function () { dirty = true; } };
  }

  /* =====================================================================
     2 · DESEN (toate apelurile de desen sunt aici)
     ===================================================================== */
  var WIN_B = { xr: 1.6, yb: -0.5, yt: 1.7 };            // fereastra lumii pentru „Diagrame”
  var WIN_P = { xr: 1.25, yb: -0.4, yt: 1.45 };          // fereastra lumii pentru „Poveste”

  function fitPanel(R, win) {
    var s = Math.min(R.w / (2 * win.xr), R.h / (win.yt - win.yb));
    var pw = 2 * win.xr * s, ph = (win.yt - win.yb) * s;
    var x0 = R.x + (R.w - pw) / 2, y0 = R.y + (R.h - ph) / 2;
    return { s: s, x0: x0, y0: y0, pw: pw, ph: ph, ox: x0 + win.xr * s, oy: y0 + win.yt * s };
  }
  function exitPt(x0, y0, dx, dy, L, T, R, B) {
    var t = Infinity;
    if (dx > 1e-9) t = Math.min(t, (R - x0) / dx); else if (dx < -1e-9) t = Math.min(t, (L - x0) / dx);
    if (dy > 1e-9) t = Math.min(t, (B - y0) / dy); else if (dy < -1e-9) t = Math.min(t, (T - y0) / dy);
    if (!isFinite(t)) t = 0;
    return [x0 + dx * t, y0 + dy * t];
  }

  /* Un panou de spațiu-timp (axele proprii ortogonale; axele și rețeaua celuilalt sistem înclinate). */
  function drawPanel(ctx, R, win, V, P, fs) {
    var f = fitPanel(R, win), s = f.s, ox = f.ox, oy = f.oy, x0 = f.x0, y0 = f.y0, pw = f.pw, ph = f.ph;
    var own = V.own === 'S';
    var ownC = own ? P.s1 : P.s2, othC = own ? P.s2 : P.s1;
    var ownP = own ? '' : PR, othP = own ? PR : '';
    var Lm = x0 + 5, Tm = y0 + 5, Rm = x0 + pw - 5, Bm = y0 + ph - 5;
    function X(a) { return ox + a * s; }
    function Y(a) { return oy - a * s; }
    var i, k, a, b;

    D.fillRR(ctx, x0, y0, pw, ph, 10, D.rgba(P.card, 0.5), P.line2, 1);
    ctx.save();
    ctx.beginPath(); ctx.rect(x0, y0, pw, ph); ctx.clip();

    /* grila proprie */
    ctx.strokeStyle = D.rgba(ownC, 0.10); ctx.lineWidth = 1; ctx.beginPath();
    for (var gx = -Math.floor(win.xr / 0.25) * 0.25; gx <= win.xr + 1e-6; gx += 0.25) { ctx.moveTo(X(gx), y0); ctx.lineTo(X(gx), y0 + ph); }
    for (var gy = Math.ceil(win.yb / 0.25) * 0.25; gy <= win.yt + 1e-6; gy += 0.25) { ctx.moveTo(x0, Y(gy)); ctx.lineTo(x0 + pw, Y(gy)); }
    ctx.stroke();

    /* rețeaua celuilalt sistem */
    if (V.otherA > 0.01) {
      var u = V.u, K = 14;
      ctx.strokeStyle = D.rgba(othC, 0.26 * V.otherA); ctx.lineWidth = 1; ctx.beginPath();
      for (k = -K; k <= K; k++) {
        a = ap(V.T, [k * u, -9]); b = ap(V.T, [k * u, 9]);
        ctx.moveTo(X(a[0]), Y(a[1])); ctx.lineTo(X(b[0]), Y(b[1]));
        a = ap(V.T, [-9, k * u]); b = ap(V.T, [9, k * u]);
        ctx.moveTo(X(a[0]), Y(a[1])); ctx.lineTo(X(b[0]), Y(b[1]));
      }
      ctx.stroke();
    }

    /* lumina */
    if (V.lightA > 0.01) {
      V.rays.forEach(function (r) {
        var ex = X(r.dir[0] / r.dir[1] * 4), ey = Y(4);
        ctx.save(); ctx.globalAlpha = V.lightA;
        D.line(ctx, ox, oy, ex, ey, D.rgba(P.light, 0.28), 8);
        D.line(ctx, ox, oy, ex, ey, P.light, 2.5);
        ctx.restore();
      });
      if (V.ref45) {
        [1, -1].forEach(function (sg) { D.line(ctx, ox, oy, X(sg * 4), Y(4), D.rgba(P.bad, 0.85 * V.lightA), 1.6, [6, 5]); });
      }
    }

    /* axele celuilalt sistem */
    if (V.otherA > 0.01) {
      ctx.save(); ctx.globalAlpha = V.otherA;
      [{ d: [V.T.a, V.T.c], nm: 'x' + othP, side: 1 }, { d: [V.T.b, V.T.d], nm: 'ct' + othP, side: -1 }].forEach(function (ax) {
        var dx = ax.d[0], dy = -ax.d[1], n = Math.hypot(dx, dy) || 1, ux = dx / n, uy = dy / n;
        var e1 = exitPt(ox, oy, dx, dy, Lm, Tm, Rm, Bm), e0 = exitPt(ox, oy, -dx, -dy, Lm, Tm, Rm, Bm);
        D.arrow(ctx, e0[0], e0[1], e1[0], e1[1], { color: othC, w: 2.2, head: 9 });
        D.text(ctx, ax.nm, e1[0] - ux * 20 + uy * ax.side * 13, e1[1] - uy * 20 - ux * ax.side * 13, { color: othC, size: fs + 1, weight: 700, align: 'center', base: 'middle' });
      });
      ctx.restore();
    }

    /* axele proprii */
    D.arrow(ctx, x0 + 3, oy, x0 + pw - 5, oy, { color: ownC, w: 2.2, head: 9 });
    D.arrow(ctx, ox, y0 + ph - 3, ox, y0 + 6, { color: ownC, w: 2.2, head: 9 });
    D.text(ctx, 'x' + ownP, x0 + pw - 16, oy + 15, { color: ownC, size: fs + 1, weight: 700, align: 'center', base: 'middle' });
    D.text(ctx, 'ct' + ownP, ox + 15, y0 + 15, { color: ownC, size: fs + 1, weight: 700, align: 'center', base: 'middle' });
    D.text(ctx, 'O', ox - 8, oy + 12, { color: P.tx3, size: fs, align: 'center', base: 'middle' });

    /* legături între evenimente (perechi) */
    V.links.forEach(function (l) {
      var al = Math.min(l.a.a, l.b.a);
      if (al < 0.02) return;
      ctx.save(); ctx.globalAlpha = al;
      D.line(ctx, X(l.a.po[0]), Y(l.a.po[1]), X(l.b.po[0]), Y(l.b.po[1]), D.rgba(P.tx2, 0.8), 1.6, [5, 4]);
      ctx.restore();
    });

    /* evenimente + linii ajutătoare (citirea coordonatelor) */
    V.events.forEach(function (ev) {
      if (ev.a < 0.02) return;
      var px = X(ev.po[0]), py = Y(ev.po[1]);
      ctx.save(); ctx.globalAlpha = ev.a;
      if (ev.ownA > 0.02) {
        ctx.save(); ctx.globalAlpha = ev.a * ev.ownA;
        if (ev.ownH) { D.line(ctx, ox, py, px, py, ownC, 1.7, [3, 4]); D.dot(ctx, ox, py, 3.2, ownC); }
        if (ev.ownV) { D.line(ctx, px, oy, px, py, ownC, 1.7, [3, 4]); D.dot(ctx, px, oy, 3.2, ownC); }
        ctx.restore();
      }
      if (ev.othA > 0.02 && V.otherA > 0.02) {
        ctx.save(); ctx.globalAlpha = ev.a * ev.othA * V.otherA;
        var fc = ev.footCt, fx = ev.footX;
        if (ev.othH) { D.line(ctx, px, py, X(fc[0]), Y(fc[1]), othC, 1.7, [3, 4]); D.dot(ctx, X(fc[0]), Y(fc[1]), 3.2, othC); }
        if (ev.ctLabel) D.text(ctx, ev.ctLabel, X(fc[0]) + 8, Y(fc[1]) + 1, { color: othC, size: fs, weight: 700, align: 'left', base: 'middle' });
        if (ev.othV) { D.line(ctx, px, py, X(fx[0]), Y(fx[1]), othC, 1.7, [3, 4]); D.dot(ctx, X(fx[0]), Y(fx[1]), 3.2, othC); }
        ctx.restore();
      }
      D.dot(ctx, px, py, 5.2, P.tx, 7);
      D.text(ctx, ev.name, px + ev.lab[0], py + ev.lab[1], { color: P.tx, size: fs + 1, weight: 700, align: 'center', base: 'middle' });
      ctx.restore();
    });

    /* nume ale coordonatelor la „picioare” (doar pentru evenimentul din poveste) */
    V.events.forEach(function (ev) {
      if (!ev.coordNames || ev.a < 0.02) return;
      var px = X(ev.po[0]), py = Y(ev.po[1]);
      ctx.save(); ctx.globalAlpha = ev.a;
      if (ev.ownA > 0.02) {
        ctx.globalAlpha = ev.a * ev.ownA;
        D.text(ctx, 'x' + ownP, px, oy + 15, { color: ownC, size: fs + 1, weight: 700, align: 'center', base: 'middle' });
        D.text(ctx, 'ct' + ownP, ox - 14, py, { color: ownC, size: fs + 1, weight: 700, align: 'center', base: 'middle' });
      }
      if (ev.othA > 0.02 && V.otherA > 0.02) {
        ctx.globalAlpha = ev.a * ev.othA * V.otherA;
        D.text(ctx, 'x' + othP, X(ev.footX[0]) + 2, Y(ev.footX[1]) + 15, { color: othC, size: fs + 1, weight: 700, align: 'center', base: 'middle' });
        D.text(ctx, 'ct' + othP, X(ev.footCt[0]) + 18, Y(ev.footCt[1]) + 1, { color: othC, size: fs + 1, weight: 700, align: 'center', base: 'middle' });
      }
      ctx.restore();
    });
    ctx.restore();                                          // sfârșit decupare

    /* etichetele vitezei luminii: centrate pe rază, în interiorul panoului */
    if (V.lightA > 0.05 && V.showSpeeds) {
      V.rays.forEach(function (r) {
        var ctl = Math.min(1.2, (win.xr - 0.45) * r.dir[1] / Math.max(Math.abs(r.dir[0]), 1e-6), win.yt - 0.2);
        var lx = X(r.dir[0] / r.dir[1] * ctl), ly = Y(ctl);
        ctx.save(); ctx.globalAlpha = V.lightA;
        D.label(ctx, RF.fmt.c(r.speed) + (r.ok ? '  ✓' : '  ✗'), lx, ly, { size: fs, color: r.ok ? P.good : P.bad, align: 'center', border: D.rgba(r.ok ? P.good : P.bad, 0.55) });
        ctx.restore();
      });
    }
    return f;
  }

  /* ---------- scena „Diagrame”: două panouri ---------- */
  function drawDiagramScene(cv, md, P) {
    var ctx = cv.ctx, fs = cv.W < 460 ? 11 : 12;
    D.clear(cv);
    md.views.forEach(function (V, i) {
      var R = md.lay.rects[i];
      drawPanel(ctx, R, WIN_B, V, P, fs);
      var own = V.own === 'S';
      D.text(ctx, own ? 'Desenul lui S — Ana, pe peron' : 'Desenul lui S′ — Bogdan, în tren', R.x + R.w / 2, R.y - 8,
        { color: own ? P.s1 : P.s2, size: fs + 1, weight: 700, align: 'center' });
    });
  }

  /* ---------- scena „Poveste”: un singur panou + antet ---------- */
  function drawStoryScene(cv, md, P) {
    var ctx = cv.ctx, W = cv.W, H = cv.H, fs = W < 460 ? 11 : 12;
    D.clear(cv);
    /* antet */
    D.text(ctx, md.head[0], 12, 20, { color: P.tx, size: fs + 2, weight: 700 });
    D.text(ctx, md.head[1], 12, 38, { color: P.tx2, size: fs + 1 });
    var R = { x: 8, y: 48, w: W - 16, h: H - 48 - 8 };
    var f = drawPanel(ctx, R, WIN_P, md.view, P, fs);
    function X(a) { return f.ox + a * f.s; }
    function Y(a) { return f.oy - a * f.s; }
    /* semn de întrebare: S′ nu și-a notat încă numerele */
    if (md.ghost > 0.02) {
      ctx.save(); ctx.globalAlpha = md.ghost;
      D.label(ctx, 'Bogdan: x′ = ?  t′ = ?', X(md.ghostAt[0]), Y(md.ghostAt[1]), { size: fs, color: P.s2, border: D.rgba(P.s2, 0.6) });
      ctx.restore();
    }
    /* notă în panou */
    if (md.note && md.noteA > 0.02) {
      ctx.save(); ctx.globalAlpha = md.noteA;
      D.label(ctx, md.note.text, f.x0 + f.pw / 2, f.y0 + f.ph - 16, { size: fs, color: md.note.color === 'good' ? P.good : md.note.color === 'bad' ? P.bad : P.tx, align: 'center', border: D.rgba(md.note.color === 'good' ? P.good : md.note.color === 'bad' ? P.bad : P.tx2, 0.55) });
      ctx.restore();
    }
  }

  /* ---------- scena „Gamma”: graficul γ(β) ---------- */
  function drawGammaScene(cv, md, P) {
    var ctx = cv.ctx, W = cv.W, H = cv.H, A = RF.art, GM = md.GMAX;
    D.clear(cv);
    var g = A.graph(ctx, { x: 8, y: 8, w: W - 16, h: H - 16 }, {
      xmin: 0, xmax: 1, ymin: 0.6, ymax: GM, axes: 'edge',
      xlabel: 'viteza lui S′ față de S (v / c)', ylabel: 'γ',
      xticks: [{ v: 0, label: '0' }, { v: 0.25, label: '0,25 c' }, { v: 0.5, label: '0,5 c' }, { v: 0.75, label: '0,75 c' }, { v: 1, label: 'c' }],
      yticks: [1, 2, 4, 6, 8]
    });
    g.band(0, 0.1, { color: P.good, alpha: 0.16, label: 'v ≪ c' });
    g.band(0.1, 0.9, { color: P.warn, alpha: 0.08, label: 'relativist' });
    g.band(0.9, 1, { color: P.bad, alpha: 0.14, label: 'v ≈ c' });
    g.hline(1, { color: P.tx2, dash: [7, 6], label: W >= 400 ? 'Galilei: γ = 1, oricât de repede' : 'Galilei: γ = 1', labelAt: 'left' });
    g.curve(function (b) { return b >= 0.9999 ? NaN : 1 / Math.sqrt(1 - b * b); }, { color: P.light, w: 3.6, glow: true, fill: true, base: 1 });
    g.point(md.beta, Math.min(md.g, GM - 0.15), { color: P.light, label: 'γ = ' + md.gText, drop: true });
  }

  /* =====================================================================
     3 · SIMULĂRILE
     ===================================================================== */

  /* ---------- 3.1 · Povestea „pe pași” ---------- */
  var HEAD_S = ['Un eveniment E, văzut de Ana', 'Ana (S) îi notează locul și ora: x, t'];
  var HEAD_G = ['Dicționarul lui Galilei', 'x′ = x − vt   ·   t′ = t'];
  var HEAD_L = ['Dicționarul Lorentz', 'x′ = γ(x − vt)   ·   t′ = γ(t − vx/c²)'];
  /* câmpurile numerice sunt animate (tween); head/note/ghost sunt alese din scena-țintă */
  var SCENES = [
    { head: HEAD_S, beta: 0,    m: 0, sp: 0, E: 1,   A: 0, projS: 1, projSp: 0, light: 0,    ghost: 1 },
    { head: HEAD_G, beta: 0.5,  m: 0, sp: 1, E: 1,   A: 0, projS: 1, projSp: 1, light: 0,    ghost: 0 },
    { head: HEAD_G, beta: 0.5,  m: 0, sp: 1, E: 0.2, A: 0, projS: 0, projSp: 0, light: 1,    ghost: 0, noteK: 'G' },
    { head: HEAD_L, beta: 0.5,  m: 1, sp: 1, E: 1,   A: 0, projS: 1, projSp: 1, light: 1,    ghost: 0, noteK: 'L' },
    { head: HEAD_L, beta: 0.5,  m: 1, sp: 1, E: 0,   A: 1, projS: 1, projSp: 0, light: 0.3,  ghost: 0, noteK: 'AB' },
    { head: HEAD_L, beta: 0.06, m: 1, sp: 1, E: 1,   A: 0, projS: 1, projSp: 1, light: 0.3,  ghost: 0, noteK: 'low' }
  ];
  var TWEEN_KEYS = ['beta', 'm', 'sp', 'E', 'A', 'projS', 'projSp', 'light', 'ghost'];

  /* pasul de animație: apropie valorile curente de cele-țintă; întoarce true cât timp ceva se mișcă */
  function stepScene(cur, tgt, dt) {
    var moving = false, k = 1 - Math.exp(-dt * 5.5);
    TWEEN_KEYS.forEach(function (key) {
      var d = tgt[key] - cur[key];
      if (Math.abs(d) > 0.0015) { cur[key] += d * k; moving = true; } else cur[key] = tgt[key];
    });
    return moving;
  }

  function buildStoryModel(cur, scene, revealed) {
    var M = mat(cur.beta, cur.m);
    var rev = revealed ? 1 : 0;
    var showCoords = cur.E > 0.3;
    var spec = {
      otherA: cur.sp, lightA: cur.light, ref45: false,
      events: [
        { id: 'E', p: EVP.E, a: cur.E, ownH: true, ownV: true, ownA: cur.projS, othH: true, othV: true, othA: cur.projSp, coordNames: showCoords, lab: [11, -10] },
        { id: 'A', p: EVP.A, a: cur.A, ownH: true, ownA: 1, othH: true, othA: rev, lab: [-10, -10], ctLabel: 'ct' + PR + '(A)' },
        { id: 'B', p: EVP.B, a: cur.A, ownH: true, ownA: 1, othH: true, othA: rev, lab: [10, -10], ctLabel: 'ct' + PR + '(B)' }
      ],
      links: [['A', 'B']]
    };
    var V = panelModel('S', M, spec);
    V.showSpeeds = false;
    var note = null;
    switch (scene.noteK) {
      case 'G': note = revealed ? { text: 'Bogdan ar măsura ' + RF.fmt.c(1 - cur.beta) + ' (c − v)  ✗', color: 'bad' } : null; break;
      case 'L': note = { text: 'Bogdan măsoară c, ca și Ana  ✓', color: 'good' }; break;
      case 'AB': note = revealed ? { text: 'A și B: simultane pentru Ana, nu pentru Bogdan', color: 'good' } : null; break;
      case 'low': note = { text: 'v mică → axele aproape coincid: Lorentz ≈ Galilei', color: 'good' }; break;
    }
    return {
      head: scene.head, view: V, ghost: cur.ghost, ghostAt: [0.0, 1.22],
      note: note, noteA: note ? 1 : 0
    };
  }

  RF.sims.c03Poveste = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 1 / 0.9, minH: 290, maxH: 470 });
    cv.cv.setAttribute('role', 'img');
    cv.cv.setAttribute('aria-label', 'Diagramă spațiu-timp: același eveniment, descris de Ana (S) și de Bogdan (S′)');
    var stage = 0, answered = {};
    var cur = {};
    TWEEN_KEYS.forEach(function (k) { cur[k] = SCENES[0][k]; });
    var paint = painter(host, cv, function (dt) {
      var scene = SCENES[clamp(stage, 0, SCENES.length - 1)];
      var moving = stepScene(cur, scene, dt);
      drawStoryScene(cv, buildStoryModel(cur, scene, !!answered[stage]), RF.sim.palette());
      return moving;
    });
    if (api.steps) {
      api.steps.addEventListener('rf:step', function (e) { stage = e.detail.stage; paint.invalidate(); });
      api.steps.addEventListener('rf:predict', function () { answered[stage] = true; paint.invalidate(); });
    }
  };

  /* ---------- 3.2 · Galilei vs. Lorentz ---------- */
  function diagramLayout(W) {
    var stacked = W < 560, pad = 8, gap = 12, titleH = 24;
    var pw, ph, H, rects;
    if (!stacked) {
      pw = (W - 2 * pad - gap) / 2;
      ph = pw * (WIN_B.yt - WIN_B.yb) / (2 * WIN_B.xr);
      H = titleH + ph + pad + 4;
      rects = [{ x: pad, y: titleH, w: pw, h: ph }, { x: pad + pw + gap, y: titleH, w: pw, h: ph }];
    } else {
      pw = W - 2 * pad;
      ph = pw * (WIN_B.yt - WIN_B.yb) / (2 * WIN_B.xr);
      H = 2 * (titleH + ph) + gap + pad;
      rects = [{ x: pad, y: titleH, w: pw, h: ph }, { x: pad, y: 2 * titleH + ph + gap, w: pw, h: ph }];
    }
    return { H: Math.round(H), rects: rects, stacked: stacked };
  }

  function buildDiagramModel(M, lay) {
    var spec = {
      otherA: 1, lightA: 1, ref45: true, links: [['A', 'B'], ['C', 'D']],
      events: [
        { id: 'A', p: EVB.A, a: 1, ownH: true, lab: [-10, -10] },
        { id: 'B', p: EVB.B, a: 1, ownH: true, lab: [10, -10] },
        { id: 'C', p: EVB.C, a: 1, ownV: true, lab: [-11, 4] },
        { id: 'D', p: EVB.D, a: 1, ownV: true, lab: [-11, 4] }
      ]
    };
    var vs = panelModel('S', M, spec), vp = panelModel('Sp', M, spec);
    vs.showSpeeds = true; vp.showSpeeds = true;
    return { lay: lay, views: [vs, vp] };
  }

  RF.sims.c03Diagrame = function (host, api) {
    var st = { mode: 'L', beta: 0.6 }, opts = { height: 300 }, fixing = false, lay = null;
    var cv = RF.sim.canvas(api.stage, opts);
    cv.cv.setAttribute('role', 'img');
    cv.cv.setAttribute('aria-label', 'Două diagrame spațiu-timp ale acelorași evenimente: desenul lui S (Ana) și desenul lui S′ (Bogdan)');

    RF.ui.slider(api.controls, {
      label: 'Viteza lui S′ față de S', min: 0, max: 0.8, step: 0.01, value: st.beta, tone: 's2',
      fmt: function (v) { return RF.fmt.c(v); }, onInput: function (v) { st.beta = v; changed(); }
    });
    RF.ui.segmented(api.controls, {
      label: 'Dicționarul folosit', value: st.mode,
      options: [{ k: 'G', label: 'Galilei (clasic)' }, { k: 'L', label: 'Lorentz' }],
      onChange: function (k) { st.mode = k; changed(); }
    });
    var ro = RF.ui.readouts(api.controls, [
      { k: 'light', label: 'Lumina spre dreapta, măsurată de Bogdan' },
      { k: 'ab', label: 'A și B (simultane pentru Ana), pentru Bogdan' },
      { k: 'ds', label: '(Δs)² între C și D — în S | în S′' }
    ]);

    function matNow() { return mat(st.beta, st.mode === 'L' ? 1 : 0); }
    function readouts() {
      var M = matNow(), ld = ap(M, [1, 1]), sp = ld[0] / ld[1];
      ro.set('light', RF.fmt.c(sp) + (Math.abs(sp - 1) < 0.005 ? '  ✓' : '  ✗'));
      var tA = ap(M, EVB.A)[1], tB = ap(M, EVB.B)[1];
      ro.set('ab', Math.abs(tA - tB) < 0.004 ? 'simultane  ✓' : (tB < tA ? 'B înaintea lui A' : 'A înaintea lui B'));
      var dS = Math.pow(EVB.D[0] - EVB.C[0], 2) - Math.pow(EVB.D[1] - EVB.C[1], 2);
      var C2 = ap(M, EVB.C), D2 = ap(M, EVB.D);
      var dSp = Math.pow(D2[0] - C2[0], 2) - Math.pow(D2[1] - C2[1], 2);
      ro.set('ds', mn(dS, 3) + ' | ' + mn(dSp, 3) + (Math.abs(dS - dSp) < 0.0005 ? '  ✓' : '  ✗'));
    }
    function fit() {
      if (!cv.W) return;
      lay = diagramLayout(cv.W);
      if (!fixing && Math.abs(lay.H - cv.H) > 1) { fixing = true; opts.height = lay.H; cv.resize(); fixing = false; }
    }
    fit();
    cv.onResize(fit);

    var paint = painter(host, cv, function () {
      if (!lay) fit();
      if (!lay) return false;
      drawDiagramScene(cv, buildDiagramModel(matNow(), lay), RF.sim.palette());
      return false;
    });
    function changed() { readouts(); paint.invalidate(); }
    readouts();
  };

  /* ---------- 3.3 · γ-metru ---------- */
  function gammaModel(st) {
    var b = clamp(st.beta, 0, 0.9995), g = gam(b), e = gm1(b);
    var gText = e <= 0 ? '1' : e < 0.001 ? '1 + ' + sci(e) : RF.fmt.n(g, g < 3 ? 3 : g < 30 ? 2 : 1);
    return { beta: b, g: g, e: e, gText: gText, GMAX: 8 };
  }
  function speedText(b) {
    var ms = b * C_KMS * 1000;
    if (ms < 1000) return RF.fmt.n(ms, 1) + ' m/s';
    if (b < 0.01) return RF.fmt.n(ms / 1000, 1) + ' km/s';
    return RF.fmt.c(b, b > 0.98 ? 3 : 2);
  }

  RF.sims.c03Gamma = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 16 / 9, minH: 270, maxH: 410 });
    cv.cv.setAttribute('role', 'img');
    cv.cv.setAttribute('aria-label', 'Graficul factorului Lorentz γ în funcție de viteza lui S′ față de S, cu zonele clasic, relativist și ultrarelativist');
    var st = { beta: 0.8 };
    var sl = RF.ui.slider(api.controls, {
      label: 'Viteza lui S′ față de S', min: 0, max: 0.999, step: 0.001, value: st.beta, tone: 's2', wide: true,
      fmt: function (v) { return RF.fmt.c(v, v > 0.98 ? 3 : 2); },
      onInput: function (v) { st.beta = v; changed(); }
    });
    function setBeta(b) { st.beta = b; sl.set(b < 0.0005 ? 0 : b, true); changed(); }
    var presets = RF.ui.buttons(api.controls, [
      { label: 'Mașină', onClick: function () { setBeta(27.78 / (C_KMS * 1000)); } },
      { label: 'Satelit', onClick: function () { setBeta(7.8 / C_KMS); } },
      { label: '0,1 c', onClick: function () { setBeta(0.1); } },
      { label: '0,5 c', onClick: function () { setBeta(0.5); } },
      { label: '0,9 c', onClick: function () { setBeta(0.9); } },
      { label: '0,99 c', onClick: function () { setBeta(0.99); } },
      { label: '0,999 c', onClick: function () { setBeta(0.999); } }
    ]);
    presets.el.classList.add('ui-wide');
    var ro = RF.ui.readouts(api.controls, [
      { k: 'v', label: 'Viteza lui S′' },
      { k: 'g', label: 'Factorul γ' },
      { k: 'e', label: 'Cu cât se abate Lorentz de Galilei (γ − 1)' },
      { k: 'r', label: 'Regim' }
    ]);
    function readouts() {
      var md = gammaModel(st);
      ro.set('v', speedText(md.beta));
      ro.set('g', md.gText);
      ro.set('e', md.e <= 0 ? '0' : md.e < 0.001 ? sci(md.e) : md.e < 1 ? RF.fmt.n(md.e * 100, md.e < 0.1 ? 1 : 0) + ' %' : RF.fmt.n(md.e, 1));
      ro.set('r', md.beta < 0.1 ? 'clasic (v ≪ c): Galilei e de-ajuns' : md.beta < 0.9 ? 'relativist: Galilei nu mai merge' : 'ultrarelativist (v ≈ c)');
    }
    var paint = painter(host, cv, function () {
      drawGammaScene(cv, gammaModel(st), RF.sim.palette());
      return false;
    });
    function changed() { readouts(); paint.invalidate(); }
    readouts();
  };
})();
