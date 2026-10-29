/* Capitolul 11 — scena poveștii „Un foton, un electron” (c11Poveste): diagrama „gropii” a electronului în metal.
   Structură: (1) cinematica (cfg / actor — funcții de timp), (2) desenul, adunat în drawScene(). */
(function () {
  'use strict';
  var RF = window.RF, D = RF.draw;
  var L_EX = 2.3, T = 4.4;                        // potasiu; durata unui ciclu (s)
  var E_RED = 1.7, E_BLUE = 3.1, E_UV = 4.5;      // energii de foton (eV)

  RF.sims.c11Poveste = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 16 / 10.5, minH: 320, maxH: 440 });
    var stage = 0, rev = true, clock = 0;
    if (api.steps) {
      api.steps.addEventListener('rf:step', function (e) {
        stage = e.detail.stage;
        var pr = e.detail.step && e.detail.step.querySelector('.predict');
        rev = !pr || pr.hasAttribute('data-answered');
        clock = 0;
      });
      api.steps.addEventListener('rf:predict', function () { rev = true; clock = 0; });
    }
    RF.sim.loop(host, function (dt) { clock = (clock + dt) % T; drawScene(); });

    /* ---------- (1) scena curentă și cinematica ---------- */
    function cfg() {                                // înainte de răspuns se vede scena pasului anterior
      switch (stage) {
        case 0: return { E: 0, n: 0 };
        case 1: return { E: E_RED, n: rev ? 7 : 1, pend: !rev };
        case 2: return { E: E_BLUE, n: 1 };
        case 3: return { E: E_BLUE, n: rev ? 2 : 1, pend: !rev };
        case 4: return { E: rev ? E_UV : E_BLUE, n: 1, pend: !rev };
        default: return { E: E_UV, n: 1, stop: true };
      }
    }
    function ease(x) { x = RF.clamp(x, 0, 1); return x * x * (3 - 2 * x); }
    function geo(W, H) {
      var g = { y0: H * 0.37, sc: H * 0.098, xm0: W * 0.05, xw: W * 0.40, xr: W * 0.96, xan: W * 0.90 };
      g.yL = g.y0 + L_EX * g.sc;
      return g;
    }
    function exOf(i, n, g) { return n === 1 ? g.xm0 + (g.xw - g.xm0) * 0.45 : g.xm0 + (g.xw - g.xm0) * (0.14 + 0.72 * i / (n - 1)); }

    /* electronul i la momentul t al ciclului: poziția, energia (eV față de nivelul vid), faza */
    function actor(i, n, E, stop, g, t) {
      var xe = exOf(i, n, g), d = n > 1 ? i * (n > 3 ? 0.14 : 0.18) : 0;
      var a = { xe: xe, p: RF.clamp((t - d) / 0.9, 0, 1), x: xe, level: -L_EX, u: 0, phase: 'wait', alpha: 1, tt: t - d - 0.9 };
      var tt = a.tt;
      if (tt < 0) return a;
      a.u = ease(tt / 0.7);
      if (E < L_EX) {                                // foton prea slab: urcă, nu ajunge, cade
        if (tt > 1.0) a.u = 1 - ease((tt - 1.0) / 0.6);
        a.level = -L_EX + a.u * E; a.phase = tt > 1.0 ? 'fall' : 'rise';
        return a;
      }
      a.level = -L_EX + a.u * E; a.phase = 'rise';
      if (tt > 0.7) {
        a.phase = 'fly'; a.u = 1;
        var m = RF.clamp((tt - 0.7) / 2.0, 0, 1);
        if (stop) {
          var dA = g.xw - xe, dB = g.xan - g.xw, m1 = dA / (dA + 2 * dB);
          if (m < m1) a.x = xe + dA * (m / m1);
          else { var q = (m - m1) / (1 - m1); a.x = g.xw + dB * (1 - (1 - q) * (1 - q)); }
        } else {
          a.x = xe + (g.xr - 10 - xe) * m;
        }
        if (tt > 2.9) a.alpha = Math.max(0, 1 - (tt - 2.9) / 0.5);
      }
      return a;
    }

    /* ==================================================================
       (2) DESENUL — tot ce atinge canvasul e aici (se poate reface cu RF.art)
       ================================================================== */
    function tsub(ctx, base, sub, x, y, o) {
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

    function drawScene() {
      var W = cv.W, H = cv.H;
      if (W < 80 || H < 80) return;
      var ctx = cv.ctx, P = RF.sim.palette(), c = cfg(), g = geo(W, H), fs = W < 460 ? 11 : 12, t = clock, i;
      var col = c.E > 0 ? D.wavelengthColor(1240 / c.E) : P.light;
      D.clear(cv);

      /* groapa: metalul (stânga), vidul (dreapta), nivelul E = 0 */
      ctx.fillStyle = D.rgba(P.s1, 0.14); ctx.fillRect(g.xm0, g.yL, g.xw - g.xm0, H * 0.07);
      for (i = 0; i < 6; i++) D.dot(ctx, g.xm0 + (g.xw - g.xm0) * (i + 0.5) / 6, g.yL + H * 0.045, 3.2, P.tx2);
      D.line(ctx, g.xm0, g.yL, g.xw, g.yL, P.s1, 2.5);
      D.line(ctx, g.xm0, g.y0, g.xm0, g.yL, P.tx3, 2);
      D.line(ctx, g.xw, g.y0, g.xw, g.yL, P.tx2, 3);
      D.line(ctx, g.xw, g.y0, g.xr, g.y0, P.tx3, 1.5, [6, 5]);
      D.text(ctx, 'în metal', g.xm0 + 4, g.yL + H * 0.115, { color: P.tx3, size: 11 });
      D.text(ctx, 'electron liber: E = 0', g.xr, g.y0 + 15, { color: P.tx3, size: 11, align: 'right' });
      // adâncimea gropii = L ex
      var bx = g.xw + W * 0.045, mid = (g.y0 + g.yL) / 2;
      D.arrow(ctx, bx, mid, bx, g.y0 + 3, { color: P.light, w: 2, head: 8 });
      D.arrow(ctx, bx, mid, bx, g.yL - 3, { color: P.light, w: 2, head: 8 });
      tsub(ctx, 'L', 'ex', bx + 7, mid + 4, { color: P.light, size: fs + 1 });

      var n = c.n, E = c.E, acts = [];
      for (i = 0; i < n; i++) acts.push(actor(i, n, E, c.stop, g, t));

      /* electroni în repaus pe fundul gropii (lipsesc cei care au plecat) */
      for (i = 0; i < 9; i++) {
        var rx = g.xm0 + (g.xw - g.xm0) * (i + 0.5) / 9, free = true;
        for (var a0 = 0; a0 < acts.length; a0++) if (Math.abs(acts[a0].xe - rx) < W * 0.03) free = false;
        if (free) D.dot(ctx, rx, g.yL - 5, 4, D.rgba(P.s1, 0.75));
      }

      /* scena opririi: rampa de energie potențială până la anod */
      var yE = g.y0 - (E - L_EX) * g.sc;
      if (c.stop) {
        D.line(ctx, g.xw, g.y0, g.xan, yE, P.warn, 3);
        D.line(ctx, g.xw, yE, g.xan, yE, D.rgba(P.s1, 0.55), 1.5, [5, 5]);
        D.fillRR(ctx, g.xan, yE - 14, 7, g.y0 - yE + 30, 3, P.tx2);
        D.text(ctx, 'anod', g.xan + 3, g.y0 + 30, { color: P.tx3, size: 11, align: 'center' });
        D.arrow(ctx, g.xan - 12, g.y0 - 2, g.xan - 12, yE + 2, { color: P.warn, w: 2, head: 7 });
        tsub(ctx, '|e|U', 's', g.xan - 18, (g.y0 + yE) / 2 + 4, { color: P.warn, size: fs, align: 'right' });
        D.text(ctx, 'frână', g.xan - 64, g.y0 - 8, { color: P.warn, size: 11 });
      }

      /* fotonii, săgeata de energie și electronii */
      for (i = 0; i < acts.length; i++) {
        var a = acts[i], ey = g.y0 - a.level * g.sc, sx = a.xe - W * 0.1, sy = H * 0.1, hx = a.xe, hy = g.yL - 7;
        if (a.p > 0 && a.p < 1) {
          var px = sx + (hx - sx) * a.p, py = sy + (hy - sy) * a.p, q = Math.max(0, a.p - 0.16);
          D.line(ctx, sx + (hx - sx) * q, sy + (hy - sy) * q, px, py, D.rgba(col, 0.6), 2.5);
          D.dot(ctx, px, py, 4.2, col, 10);
          if (i === 0) D.text(ctx, 'foton', px + 8, py - 4, { color: col, size: 11 });
        }
        if (a.phase === 'rise' || a.phase === 'fall') {                       // energia primită de la foton
          D.arrow(ctx, a.xe + 11, g.yL - 6, a.xe + 11, Math.min(g.yL - 8, ey), { color: D.rgba(col, 0.9), w: 2.5, head: 8 });
          if (i === 0 && c.n < 3 && a.phase === 'rise') D.text(ctx, 'hν', a.xe + 17, (g.yL + ey) / 2, { color: col, size: fs + 1, weight: 600 });
        }
        ctx.save(); ctx.globalAlpha = a.alpha;
        D.dot(ctx, a.x, ey - 6 * (1 - a.u), 5.2, P.s1, 10);
        ctx.restore();
        if (c.stop && a.phase === 'fly' && a.x > g.xw) {                       // energia cinetică rămasă = distanța până la rampă
          var ry = g.y0 - (g.y0 - yE) * (a.x - g.xw) / (g.xan - g.xw);
          D.line(ctx, a.x, ey, a.x, ry, D.rgba(P.s1, 0.9), 2.5);
        }
      }
      // brațul „E c” pe peretele din stânga (scena opririi și zborul liber)
      if (E >= L_EX && acts.length && acts[0].phase === 'fly' && acts[0].alpha > 0.5) {
        var xb = g.xm0 + W * 0.035;
        D.arrow(ctx, xb, g.y0, xb, yE + 2, { color: P.s1, w: 2, head: 7 });
        tsub(ctx, 'E', 'c', xb + 6, (g.y0 + yE) / 2 + 4, { color: P.s1, size: fs });
      }

      /* bilanțul energetic: o bară împărțită */
      if (E > 0 && !c.stop) {
        var by = H * 0.8, bh = Math.max(18, H * 0.065), x0 = W * 0.07, bu = W * 0.86 / 5, wl = Math.min(E, L_EX) * bu;
        var absorbed = acts.length && acts[0].tt > 0.2, al = absorbed ? 1 : 0.25;
        ctx.save(); ctx.globalAlpha = al;
        D.fillRR(ctx, x0, by, wl, bh, 4, D.rgba(P.tx3, 0.55), P.tx2, 1.5);
        if (E >= L_EX) {
          D.fillRR(ctx, x0 + wl, by, (E - L_EX) * bu, bh, 4, D.rgba(P.s1, 0.8), P.s1, 1.5);
          tsub(ctx, 'L', 'ex', x0 + wl / 2, by + bh / 2 + 4, { color: P.tx, size: fs, align: 'center' });
          tsub(ctx, 'E', 'c', x0 + wl + (E - L_EX) * bu / 2, by + bh / 2 + 4, { color: P.tx, size: fs, align: 'center' });
          D.line(ctx, x0, by - 7, x0 + E * bu, by - 7, col, 2);
          D.text(ctx, 'hν = ' + RF.fmt.n(E, 1) + ' eV', x0 + E * bu / 2, by - 12, { color: col, size: fs, align: 'center', weight: 600 });
        } else {
          D.fillRR(ctx, x0, by, wl, bh, 4, D.rgba(col, 0.6), col, 1.5);
          D.fillRR(ctx, x0 + wl, by, (L_EX - E) * bu, bh, 4, null, P.bad, 1.5);
          D.text(ctx, 'lipsește', x0 + wl + (L_EX - E) * bu / 2, by + bh / 2 + 4, { color: P.bad, size: 11, align: 'center' });
          var s1 = 'hν = ' + RF.fmt.n(E, 1) + ' eV  <  ';
          ctx.save(); ctx.font = D.font(fs, 600); var w1 = ctx.measureText(s1).width; ctx.restore();
          D.text(ctx, s1, x0, by - 8, { color: col, size: fs, weight: 600 });
          tsub(ctx, 'L', 'ex = ' + RF.fmt.n(L_EX, 1) + ' eV', x0 + w1, by - 8, { color: P.tx2, size: fs });
        }
        ctx.restore();
      }

      /* mesajul scenei */
      var msg = '', mc = P.tx2;
      if (c.pend) { msg = 'Ghicește întâi — apoi privește ce se întâmplă'; mc = P.light; }
      else if (stage === 0) { msg = 'Electronii sunt legați: au nevoie de cel puțin L ex ca să iasă'; }
      else if (E < L_EX && acts.length && acts[0].tt > 1.0) { msg = 'foton prea slab: electronul cade înapoi'; mc = P.bad; }
      else if (c.stop && acts.length && acts[0].tt > 2.6) { msg = 'frâna îl oprește exact la anod'; mc = P.warn; }
      else if (E >= L_EX && acts.length && acts[0].tt > 0.7 && !c.stop) { msg = 'iese cu energia cinetică ' + RF.fmt.n(E - L_EX, 1) + ' eV'; mc = P.good; }
      if (msg) D.label(ctx, msg, W / 2, H * 0.045 + 6, { size: fs, color: mc, align: 'center' });
    }
  };
})();
