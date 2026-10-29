/* Capitolul 1 — simulări: „adunare” (povestea pe pași), „cabina”, „lanterna”
   Desenate cu RF.art: Ana = observatorul din S (cyan), Bogdan = observatorul din S′ (roz). */
(function () {
  'use strict';
  var RF = window.RF, D = RF.draw, A = RF.art;
  var muzzleOff = null;

  /* ===================================================================
     scena spațială comună (stația cu Ana, nava cu Bogdan, lumina și „fantoma”)
     o: {sx, sw, xe, rw, ly, beta, tau, cpx, ghost (0..1), showGhost, tag}
     întoarce {lx, gx, rk, st, ex}
     =================================================================== */
  function spaceScene(ctx, W, H, t, o) {
    var P = RF.sim.palette(), ly = o.ly;
    if (!(A.space && A.station && A.rocket && A.beam && A.photon && A.zigzag)) {   // modulele de ilustrații încă se încarcă
      D.clear({ ctx: ctx, W: W, H: H });
      A.chip(ctx, 'ilustrațiile spațiale se pregătesc…', W / 2, H / 2, { align: 'center' });
      return { lx: 0, gx: 0, rk: { nose: { x: 0, y: 0 }, window: { x: W / 2, y: H / 2 } }, st: null, ex: 0 };
    }
    A.space(ctx, W, H, { t: t, nebula: true });
    var st = A.station(ctx, o.sx, ly, o.sw, { observer: true, t: t });
    var off = muzzleOff == null ? o.rw * 0.55 : muzzleOff;
    var rx = o.xe - off + o.beta * o.cpx * o.tau;
    var rk = A.rocket(ctx, rx, ly, o.rw, { pilot: true, thrust: 0.3 + 0.7 * o.beta, t: t });
    muzzleOff = rk.muzzle.x - rx;
    var ex = o.xe, lx = ex + o.cpx * o.tau, gx = ex + (1 + o.beta) * o.cpx * o.tau;
    if (o.tau > 0.02) A.beam(ctx, ex, ly, Math.min(lx, W + 10), ly, { color: P.light, w: 6, from: 0, fade: true });
    if (lx < W + 10) A.photon(ctx, lx, ly, 11, { color: P.light, t: t });
    if (o.showGhost && o.ghost > 0.02 && o.tau > 0.02) {
      ctx.save();
      ctx.globalAlpha = o.ghost;
      A.zigzag(ctx, [[ex, ly + 22], [Math.min(gx, W - 6), ly + 22]], { color: P.bad, w: 3, dash: [9, 7] });
      if (gx < W - 6) A.photon(ctx, gx, ly + 22, 8, { color: P.bad, t: t, alpha: 0.7 });
      ctx.restore();
    }
    return { lx: lx, gx: gx, rk: rk, st: st, ex: ex };
  }

  /* ===================================================================
     1. adunare — povestea vitezelor (stagiile 0..3 vin din „pe pași”)
     =================================================================== */
  RF.sims.adunare = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 5 / 4.4, minH: 330, maxH: 470 });
    var ctx = cv.ctx, stage = 0, sh = [1, 0, 0, 0];
    if (api.steps) api.steps.addEventListener('rf:step', function (e) { stage = e.detail.stage; });
    var T0 = null;
    RF.sim.loop(host, function (dt, t) {
      for (var k = 1; k < 4; k++) sh[k] += ((stage >= k ? 1 : 0) - sh[k]) * Math.min(1, dt * 4);
      if (T0 == null) T0 = t;
      draw(t, t - T0);
    });

    function row(y, len, color, label, alpha, W, fs) {
      if (alpha < 0.02) return;
      ctx.save(); ctx.globalAlpha = alpha;
      A.vector(ctx, 16, y, 16 + Math.max(len, 8), y, { color: color, w: 6 });
      A.chip(ctx, label, 14, y - 17, { dot: color, size: fs });
      ctx.restore();
    }

    function draw(t, tt) {
      var P = RF.sim.palette(), W = cv.W, H = cv.H, wf = sh[2], fs = W < 420 ? 11 : 12.5;
      var avail = W - 52, y1 = H * 0.15, y2 = H * 0.15 + 46, y3 = H * 0.15 + 92, y4 = H * 0.15 + 138;

      /* ---- lumea de zi cu zi: tren + minge ---- */
      if (wf < 0.99) {
        ctx.save(); ctx.globalAlpha = 1;
        var sc = A.sceneGround(ctx, W, H, { t: t });
        var h = Math.max(62, Math.min(H * 0.27, W * 0.9 / 4.0)), len = 3.0;
        var carW = h * len + h * 0.95, span = W + carW;
        var carX = ((tt * 84) % span) - carW;
        var tr = A.train(ctx, carX, sc.railY, {
          h: h, cars: 1, len: len, cutaway: true, speed: 0.55, phase: t * 12,
          interior: function (c, info) {
            var ph = (tt % 1.9) / 1.9, ph2 = Math.min(1, ph / 0.8);
            var pw = info.x1 - info.x0, ph0 = h * 0.5;
            var px = info.x0 + pw * 0.22;
            A.person(c, px, info.floorY, ph0, A.bogdan({ pose: ph < 0.12 ? 'throw' : 'stand', t: t, shadow: false, badge: 'S′', look: 0.8 }));
            var bx = px + ph0 * 0.2 + ph2 * pw * 0.55, by = info.floorY - ph0 * 0.6 - Math.sin(ph2 * Math.PI) * h * 0.1;
            A.ball(c, bx, by, h * 0.045, { angle: t * 7 });
            if (ph > 0.12 && ph2 > 0.02) for (var i = 1; i < 7; i++) { var q = ph2 - i * 0.045; if (q < 0.02) break; A.ball(c, px + ph0 * 0.2 + q * pw * 0.55, info.floorY - ph0 * 0.6 - Math.sin(q * Math.PI) * h * 0.1, h * 0.03, { angle: 0, color: P.s2, color2: P.s2 }); }
          }
        });
        A.person(ctx, W * 0.84, sc.railY + 22, Math.min(H * 0.34, 130), A.ana({ pose: 'stand', t: t, facing: -1, badge: 'S', look: 0.9 }));
        ctx.restore();
        // săgeți (cine măsoară? culoarea arată: cyan = Ana, roz = Bogdan)
        var kb = avail / 135, a0 = 1 - wf;
        row(y1, 100 * kb, P.s1, 'Ana: trenul are 100 km/h', a0, W, fs);
        row(y2, 20 * kb, P.s2, 'Bogdan: mingea are 20 km/h', a0, W, fs);
        row(y3, 120 * kb * sh[1], P.good, 'Ana: mingea are 100 + 20 = 120 km/h', a0 * sh[1], W, fs);
      }

      /* ---- lumea luminii: navă + laser ---- */
      if (wf > 0.01) {
        ctx.save(); ctx.globalAlpha = wf;
        var cyc = 3.8, ph = (tt % cyc), tau = Math.min(ph, 3.0);
        var sp = spaceScene(ctx, W, H, t, {
          sx: W * 0.12, sw: Math.min(W * 0.2, 95), xe: W * 0.6, rw: Math.min(W * 0.3, 130), ly: H * 0.8,
          beta: 0.5, tau: tau, cpx: W * 0.17, ghost: 1 - 0.55 * sh[3], showGhost: true
        });
        ctx.restore();
        var kc = avail / 1.65;
        row(y1, 0.5 * kc, P.s1, 'Ana: nava are 0,5 c', wf, W, fs);
        row(y2, kc, P.light, 'Bogdan: lumina are c', wf, W, fs);
        row(y3, 1.5 * kc, P.bad, sh[3] > 0.5 ? 'Adunare simplă: 1,5 c — nu se observă' : 'Dacă s-ar aduna: 1,5 c … ?', wf * (1 - 0.45 * sh[3]), W, fs);
        row(y4, kc * sh[3], P.good, 'Ana măsoară: c', wf * sh[3], W, fs);
        if (sh[3] > 0.05) { ctx.save(); ctx.globalAlpha = wf * sh[3]; A.badge(ctx, 'ok', W - 26, y4, 13); A.badge(ctx, 'no', W - 26, y3, 13); ctx.restore(); }
      }
    }
  };

  /* ===================================================================
     2. cabina — nimic din cabină nu te trădează (Postulatul al II-lea)
     =================================================================== */
  RF.sims.cabina = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 16 / 7.6, minH: 260, maxH: 410 });
    var ctx = cv.ctx, view = 'cabin', vkmh = 40;
    var G = 9.8, TF = 1.3, U0 = G * TF / 2, CYC = 2.8, SLOW = 0.55, APEX = U0 * U0 / (2 * G);

    RF.ui.slider(api.controls, {
      label: 'Viteza trenului față de peron', min: 0, max: 50, step: 1, value: vkmh,
      fmt: function (v) { return Math.round(v) + ' km/h'; },
      onInput: function (v) { vkmh = v; info(); }
    });
    RF.ui.segmented(api.controls, {
      label: 'Privești din…', value: view,
      options: [{ k: 'cabin', label: 'cabina lui Bogdan' }, { k: 'ground', label: 'peronul Anei' }],
      onChange: function (k) { view = k; info(); }
    });
    var ro = RF.ui.readouts(api.controls, [
      { k: 'traj', label: 'Traiectoria mingii' },
      { k: 'law', label: 'Legea (inerție + gravitație)' }
    ]);
    function info() {
      var curved = vkmh > 0.5 && view === 'ground';
      ro.set('traj', curved ? 'parabolă' : 'verticală');
      ro.set('law', 'aceeași ✓');
    }
    info();

    RF.sim.loop(host, function (dt, t) { draw(t); });

    function draw(t) {
      var P = RF.sim.palette(), W = cv.W, H = cv.H, v = vkmh / 3.6, fs = W < 460 ? 11 : 12.5;
      var ts = t * SLOW, tau = ts % CYC, ground = view === 'ground';
      var pxm = W / 55, cam = ground ? 0 : v * ts * pxm;
      var sc = A.sceneGround(ctx, W, H, { t: t, cam: cam });
      var len = 2.55, h = Math.max(78, Math.min(H * 0.5, W * 0.8 / (len + 0.95)));
      var carW = h * len + h * 0.95;
      var carX = ground ? (W * 0.03 - 0.12 * carW + v * tau * pxm) : (W * 0.5 - carW * 0.5);
      var fade = ground ? Math.max(0, Math.min(1, tau / 0.22, (CYC - tau) / 0.22)) : 1;
      var throwing = tau < TF, personH = h * 0.54;
      var hand = null, geo = null;

      ctx.save(); ctx.globalAlpha = fade;
      var tr = A.train(ctx, carX, sc.railY, {
        h: h, cars: 1, len: len, cutaway: true, speed: v > 0.5 ? Math.min(1, v / 14) * 0.6 : 0, phase: ground ? v * tau * pxm / (h * 0.14) : cam / (h * 0.14),
        interior: function (c, info) {
          geo = info;
          var px = info.x0 + (info.x1 - info.x0) * 0.3;
          var pose = tau < 0.2 ? 'throw' : (tau > TF - 0.4 && tau < TF + 0.15 ? 'up' : 'stand');
          var pr = A.person(c, px, info.floorY, personH, A.bogdan({ pose: pose, t: t, shadow: false, badge: 'S′', look: 0.2, mouth: pose === 'up' ? 'o' : undefined }));
          hand = { x: px + personH * 0.22, y: info.floorY - personH * 0.74 };
          var yb = throwing ? U0 * tau - G * tau * tau / 2 : 0;
          var by = hand.y - yb / APEX * h * 0.25;
          A.ball(c, hand.x, by, h * 0.075, { angle: t * 6 });
        }
      });
      ctx.restore();

      // urma mingii (stroboscopică), în coordonatele vederii
      if (geo && throwing) {
        ctx.save(); ctx.globalAlpha = fade;
        for (var tt = 0; tt < tau - 0.02; tt += 0.075) {
          var yy = U0 * tt - G * tt * tt / 2, dx = ground ? -v * (tau - tt) * pxm : 0;
          A.ball(ctx, hand.x + dx, hand.y - yy / APEX * h * 0.25, h * 0.032, { color: P.s2, color2: P.s2 });
        }
        ctx.restore();
      }
      // Ana pe peron (se mișcă împreună cu lumea în vederea din cabină)
      var wrap = W + 160, ax = ground ? W * 0.9 : (((W * 0.9 - cam) % wrap) + wrap) % wrap - 80;
      A.person(ctx, ax, sc.railY + 24, h * 0.78, A.ana({ pose: ground ? 'wave' : 'stand', wave: ground, t: t, facing: -1, badge: 'S', look: 0.9 }));

      // etichete
      var who = ground ? 'Ana (pe peron) vede o parabolă' : 'Bogdan (în tren) vede mingea vertical';
      A.chip(ctx, who, 12, 22, { dot: ground ? P.s1 : P.s2, size: fs });
      A.chip(ctx, 'trenul: ' + Math.round(vkmh) + ' km/h' + (ground ? ' față de Ana' : ' (față de peron)'), 12, 50, { dot: P.s1, size: fs, color: P.tx2 });
      if (!throwing && geo) A.chip(ctx, 'mingea revine în mâna lui Bogdan', 12, 78, { dot: P.good, size: fs });
    }
  };

  /* ===================================================================
     3. lanterna — lumina nu se adună cu viteza sursei (Postulatul I)
     =================================================================== */
  RF.sims.lanterna = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 16 / 6.8, minH: 260, maxH: 390 });
    var ctx = cv.ctx, beta = 0.5, ghost = true, T0 = null, TC = 4.4, TRUN = 3.4;

    RF.ui.slider(api.controls, {
      label: 'Viteza navei față de stație', min: 0, max: 0.9, step: 0.01, value: beta, tone: 'light',
      fmt: function (v) { return RF.fmt.c(v); },
      onInput: function (v) { beta = v; restart(); info(); }
    });
    RF.ui.toggle(api.controls, {
      label: 'Arată „adunarea simplă” (nu se observă niciodată)', value: true,
      onChange: function (b) { ghost = b; }
    });
    RF.ui.buttons(api.controls, [{ label: '↻ Repetă emisia', onClick: restart }]);
    var ro = RF.ui.readouts(api.controls, [
      { k: 'p', label: 'Bogdan (în navă) măsoară lumina' },
      { k: 's', label: 'Ana (la stație) măsoară lumina' },
      { k: 'g', label: 'Adunarea simplă ar fi dat' },
      { k: 'd', label: 'Lumină față de navă, văzut de Ana' }
    ]);
    function info() {
      ro.set('p', '1,00 c  ✓');
      ro.set('s', '1,00 c  ✓');
      ro.set('g', RF.fmt.c(1 + beta) + '  ✗');
      ro.set('d', 'c − v = ' + RF.fmt.c(1 - beta));
    }
    info();
    function restart() { T0 = null; }

    RF.sim.loop(host, function (dt, t) {
      if (T0 == null) T0 = t;
      draw(t, (t - T0) % TC);
    });

    function draw(t, ph) {
      var P = RF.sim.palette(), W = cv.W, H = cv.H, fs = W < 460 ? 11 : 12.5, tau = Math.min(ph, TRUN);
      var ly = H * 0.6;
      var sp = spaceScene(ctx, W, H, t, {
        sx: W * 0.11, sw: Math.min(W * 0.18, 140), xe: W * 0.56, rw: Math.min(W * 0.25, 210), ly: ly,
        beta: beta, tau: tau, cpx: W * 0.19, ghost: 1, showGhost: ghost
      });
      A.chip(ctx, 'Ana · stația', W * 0.11, ly - Math.min(W * 0.18, 140) * 0.62, { dot: P.s1, size: fs, align: 'center' });
      A.chip(ctx, 'Bogdan · nava', sp.rk.window ? sp.rk.window.x : W * 0.3, ly - Math.min(W * 0.25, 210) * 0.5, { dot: P.s2, size: fs, align: 'center' });
      if (sp.lx < W - 80) A.chip(ctx, 'lumina: c', Math.min(sp.lx, W - 60), ly - 30, { dot: P.light, size: fs, align: 'center' });
      if (ghost && sp.gx < W - 100 && tau > 0.3) A.chip(ctx, 'c + v ? ✗', Math.min(sp.gx, W - 60), ly + 52, { dot: P.bad, size: fs, align: 'center', color: P.bad });
      if (tau > 0.5 && beta > 0.05 && sp.lx - sp.rk.nose.x > 90) {
        A.vector(ctx, sp.rk.nose.x + 14, ly - 54, sp.lx - 14, ly - 54, { color: P.tx2, w: 3.4, glow: false, label: 'din stație: se depărtează cu c − v', size: fs - 1 });
      }
    }
  };
})();
