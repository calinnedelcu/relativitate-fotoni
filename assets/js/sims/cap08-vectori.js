/* Capitolul 8 — „Forța și accelerația nu mai sunt paralele”: a = F/m − (F·v)v/(mc²) */
(function () {
  'use strict';
  var RF = window.RF, D = RF.draw;

  RF.sims.c08Vectori = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 16 / 9, minH: 290, maxH: 420 });
    var ctx = cv.ctx;
    var beta = 0.8, theta = 40, clock = 0;

    RF.ui.slider(api.controls, {
      label: 'Viteza particulei', min: 0, max: 0.99, step: 0.01, value: beta, tone: 's2',
      fmt: function (v) { return RF.fmt.c(v, 2); },
      onInput: function (v) { beta = v; }
    });
    RF.ui.slider(api.controls, {
      label: 'Unghiul dintre forță și viteză', min: 0, max: 90, step: 1, value: theta,
      fmt: function (v) { return Math.round(v) + '°'; },
      onInput: function (v) { theta = v; }
    });
    var ro = RF.ui.readouts(api.controls, [
      { k: 'th', label: 'Direcția forței față de viteză' },
      { k: 'ph', label: 'Direcția accelerației față de viteză' },
      { k: 'rel', label: 'Accelerația față de cea clasică, <var>F</var>/<var>m</var><sub>0</sub>' },
      { k: 'c', label: 'Concluzie' }
    ]);
    RF.ui.legend(api.controls, [
      { color: 'var(--acc2)', label: 'forța <var>F</var>' },
      { color: 'var(--s1)', label: 'accelerația <var>a</var>' },
      { color: 'var(--s2)', label: 'viteza <var>v</var>' }
    ]);

    /* (1) fizica: componenta paralelă cu v e „împiedicată” de γ³, cea perpendiculară de γ (în unități F/m₀) */
    function accel() {
      var g = RF.phys.gamma(beta), th = theta * Math.PI / 180;
      var ax = Math.cos(th) / (g * g * g), ay = Math.sin(th) / g;
      return { g: g, th: th, ax: ax, ay: ay, phi: Math.atan2(ay, ax), mag: Math.hypot(ax, ay) };
    }
    function step(dt) { clock += dt; }

    /* (3) afișajele numerice */
    function report() {
      var s = accel(), par = Math.abs(s.phi - s.th) < 0.009;
      ro.set('th', RF.fmt.n(theta, 0) + '°');
      ro.set('ph', RF.fmt.n(s.phi * 180 / Math.PI, 0) + '°');
      ro.set('rel', RF.fmt.n(s.mag * 100, s.mag < 0.1 ? 1 : 0) + ' %');
      ro.set('c', par ? 'a ∥ F  ✓' : 'a nu e paralelă cu F');
    }

    RF.sim.loop(host, function (dt) { step(dt); drawScene(); report(); });

    /* (2) TOT desenul e aici; citește doar starea (beta, theta) */
    function drawScene() {
      var A = RF.art, P = RF.sim.palette(), W = cv.W, H = cv.H;
      if (W < 120 || H < 160) return;
      var small = W < 460, fs = small ? 11 : 12;
      D.clear(cv);
      var s = accel();
      var S = Math.min(W * 0.52, H * 0.6), ox = Math.max(30, W * 0.12), oy = H * 0.78;
      function pt(len, ang) { return [ox + len * Math.cos(ang), oy - len * Math.sin(ang)]; }

      // direcția vitezei (axa)
      D.line(ctx, ox, oy, W - 12, oy, D.rgba(P.line2, 0.9), 1.5, [3, 5]);
      A.chip(ctx, 'direcția vitezei →', W - 14, oy - 14, { align: 'right', size: fs, color: P.tx2 });

      // forța: direcția ei prelungită (reperul „a ∥ F”), componentele ei
      var fT = pt(S, s.th), fx = pt(S * Math.cos(s.th), 0), fe = pt(S * 1.18, s.th);
      D.line(ctx, ox, oy, fe[0], fe[1], D.rgba(P.acc2, 0.4), 1.5, [6, 5]);
      D.line(ctx, ox, oy, fx[0], fx[1], D.rgba(P.acc2, 0.35), 1.5, [3, 4]);
      D.line(ctx, fx[0], fx[1], fT[0], fT[1], D.rgba(P.acc2, 0.35), 1.5, [3, 4]);

      // accelerația și componentele ei (în aceeași scară: S = F/m₀)
      var aT = [ox + S * s.ax, oy - S * s.ay], aX = [ox + S * s.ax, oy];
      D.line(ctx, ox, oy, aX[0], aX[1], D.rgba(P.s1, 0.45), 1.5, [3, 4]);
      D.line(ctx, aX[0], aX[1], aT[0], aT[1], D.rgba(P.s1, 0.45), 1.5, [3, 4]);

      // arcuri de unghi (forța — violet, accelerația — albastru)
      function arc(r, ang, col) {
        if (ang < 0.02) return;
        ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 2.2; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.arc(ox, oy, r, -ang, 0, false); ctx.stroke(); ctx.restore();
      }
      arc(small ? 30 : 38, s.th, P.acc2);
      arc(small ? 44 : 54, s.phi, P.s1);

      // vectorii: forța deasupra, accelerația mai subțire, viteza sub axă
      A.vector(ctx, ox, oy, fT[0], fT[1], { color: P.acc2, w: 7 });
      if (Math.hypot(aT[0] - ox, aT[1] - oy) > 8) A.vector(ctx, ox, oy, aT[0], aT[1], { color: P.s1, w: 6 });
      var vl = Math.max(0, beta) * S;
      if (vl > 8) A.vector(ctx, ox, oy + 20, ox + vl, oy + 20, { color: P.s2, w: 6 });
      A.chip(ctx, beta > 0.005 ? 'v = ' + RF.fmt.c(beta, 2) : 'v = 0 (repaus)', ox + Math.max(vl, 0) / 2 + (vl > 8 ? 0 : 40), oy + 42, { dot: P.s2, align: 'center', size: fs });

      // particula
      A.glow(ctx, ox, oy, 30, P.s2, 0.5);
      A.sphere(ctx, ox, oy, small ? 9 : 11, P.s2);

      // etichete la vârfuri
      var fl = pt(S + 16, s.th), al = pt(Math.hypot(S * s.ax, S * s.ay) + 16, s.phi);
      var fy = Math.max(fl[1], 16), ay = Math.max(al[1], 16) + (Math.abs(al[1] - fl[1]) < 26 ? 26 : 0);
      A.chip(ctx, 'F  ' + RF.fmt.n(theta, 0) + '°', Math.min(fl[0], W - 78), fy, { dot: P.acc2, size: fs });
      A.chip(ctx, 'a  ' + RF.fmt.n(s.phi * 180 / Math.PI, 0) + '°', Math.min(al[0] + 4, W - 78), ay, { dot: P.s1, size: fs });
    }
  };
})();
