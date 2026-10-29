/* Capitolul 4 (Adaos) — „Trenul lui Einstein”: simularea c04Tren (scena povestii pe pași).
   Structură (ca desenul să se poată schimba ușor cu sprite-uri RF.art):
     1. FIZICA SCENEI — makeGeo, timesOf, snapshot: funcții pure, fără desen. Aici trăiesc toate
        pozițiile, razele luminii și momentele recepțiilor, calculate analitic în fiecare vedere.
     2. STAREA — etapa din poveste, vederea (peron / tren), ceasul animației, controalele.
     3. DESENUL — drawScene(...) conține TOATE apelurile de desen; sprite* sunt înlocuibile.
   Convenții: Ana = peronul (S, cyan), Bogdan = trenul (S′, roz). Lumina = amber.
   Vederea „peron”: lovirile sunt simultane (t = 0). Vederea „tren”: lovirea din față are loc
   la −τ, cea din spate la +τ. Ambele vederi sunt consecvente (urmele de pe peron coincid cu
   capetele trenului exact în momentele loviturilor, razele ating observatorii în aceleași
   evenimente) — verificat numeric. */
(function () {
  'use strict';
  var RF = window.RF, D = RF.draw;

  var PRE = 1.0;      // s de animație înainte de prima lovitură
  var POST = 1.1;     // s după ultima recepție
  var PAUSE = 1.5;    // pauză la sfârșit, înainte de repetare
  var STAGE_VIEW = { 0: 'S', 1: 'S', 2: 'S', 3: 'Sp', 4: 'S' };

  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }

  /* ======================================================================
     1. FIZICA SCENEI (fără desen)
     Unități: lungimi în px, timp în secunde de animație (foarte încetinit).
     ====================================================================== */
  function makeGeo(W, H, beta) {
    var g = { W: W, H: H, beta: beta };
    g.gam = 1 / Math.sqrt(1 - beta * beta);
    g.Lp = Math.min(W * 0.52, 300);              // lungimea proprie a trenului (în sistemul trenului)
    g.cpx = g.Lp / 2.6;                          // viteza luminii în animație (px/s)
    g.v = beta * g.cpx;                          // viteza trenului față de peron
    g.L = g.Lp / g.gam;                          // lungimea trenului văzută de pe peron (contractată)
    g.tau = beta * (g.Lp / 2) / g.cpx;           // în vederea trenului: lovituri la −τ (față) și +τ (spate)
    g.panelH = clamp(H * 0.42, 140, 200);        // panoul de jos (concluziile)
    g.panelTop = H - g.panelH;
    g.trainH = clamp(H * 0.15, 48, 72);
    g.platH = 36;
    g.yT = Math.max(66, g.panelTop * 0.42);      // axa trenului
    g.h = g.trainH / 2 + 9 + g.platH / 2;        // Ana stă pe peron, la distanța h de axa trenului
    g.cx = W * 0.32;                             // vederea peronului: poziția Anei (originea)
    g.cxT = W * 0.5;                             // vederea trenului: poziția lui Bogdan
    return g;
  }

  /* Momentele evenimentelor în fiecare vedere (ora din vederea respectivă). */
  function timesOf(view, g) {
    var hyp = Math.sqrt(g.L * g.L / 4 + g.h * g.h) / g.cpx;     // lumina de la o lovitură până la Ana (în S)
    if (view === 'S') {
      return { first: 0, anaBoth: hyp, bogF: (g.L / 2) / (g.cpx + g.v), bogR: (g.L / 2) / (g.cpx - g.v) };
    }
    return {
      first: -g.tau,
      anaBoth: g.gam * hyp,                                      // același eveniment, văzut din tren
      bogF: -g.tau + (g.Lp / 2) / g.cpx,
      bogR: g.tau + (g.Lp / 2) / g.cpx
    };
  }

  function spanOf(view, g) {
    var tm = timesOf(view, g), last = Math.max(tm.anaBoth, tm.bogR);
    return { t0: tm.first - PRE, first: tm.first, last: last, end: last + POST };
  }

  /* Instantaneu al scenei la momentul T al vederii `view`. */
  function snapshot(view, T, g) {
    var S = view === 'S', tm = timesOf(view, g), s = { view: view, S: S, T: T, tm: tm };
    s.ana = { x: S ? g.cx : g.cxT - g.v * T, y: g.yT + g.h };
    s.bog = { x: S ? g.cx + g.v * T : g.cxT, y: g.yT };
    s.trainLen = S ? g.L : g.Lp;
    s.markHalf = S ? g.L / 2 : g.Lp / (2 * g.gam * g.gam);      // jumătate din distanța dintre urmele de pe peron
    s.tickGap = S ? 32 : 32 / g.gam;                             // reperele peronului (se contractă în vederea trenului)
    var tF = S ? 0 : -g.tau, tR = S ? 0 : g.tau;
    var xF = S ? g.cx + g.L / 2 : g.cxT + g.Lp / 2;
    var xR = S ? g.cx - g.L / 2 : g.cxT - g.Lp / 2;
    s.strikes = [
      { id: 'F', t: tF, x: xF, y: g.yT, markX: s.ana.x + s.markHalf },
      { id: 'R', t: tR, x: xR, y: g.yT, markX: s.ana.x - s.markHalf }
    ];
    s.rings = s.strikes.map(function (k) {
      return { id: k.id, x: k.x, y: k.y, age: T - k.t, r: T >= k.t ? g.cpx * (T - k.t) : -1 };
    });
    s.recv = [
      { who: 'ana', t: tm.anaBoth, text: 'ambele deodată!' },
      { who: 'bog', t: tm.bogF, text: 'întâi: cea din față!' },
      { who: 'bog', t: tm.bogR, text: 'apoi: cea din spate!' }
    ];
    return s;
  }

  /* ======================================================================
     3. DESENUL — sprite-uri locale (de înlocuit cu RF.art.*) + drawScene
     ====================================================================== */
  var A = RF.art;
  function spritePlatform(ctx, P, g, s) {
    var y0 = g.yT + g.trainH / 2 + 9, W = g.W;
    A.platform(ctx, 0, W, y0, { h: g.platH });
    var gap = s.tickGap, x = (((s.ana.x % gap) + gap) % gap) - gap;
    ctx.save(); ctx.strokeStyle = D.rgba(P.s1, 0.6); ctx.lineWidth = 2;
    for (; x < W + gap; x += gap) { ctx.beginPath(); ctx.moveTo(x, y0 + g.platH - 10); ctx.lineTo(x, y0 + g.platH - 3); ctx.stroke(); }
    ctx.restore();
  }

  function spriteMarks(ctx, P, g, s) {
    var y0 = g.yT + g.trainH / 2 + 9;
    s.strikes.forEach(function (k) {
      var done = s.T >= k.t;
      ctx.save();
      ctx.globalAlpha = done ? 1 : 0.4;
      A.eventMark(ctx, k.markX, y0 + 14, { shape: 'diamond', r: 6, color: P.light, glow: done, pulse: false });
      ctx.restore();
    });
  }

  function spriteTrain(ctx, P, g, s) {
    var hArt = g.trainH / 1.2, len = Math.max(1.1, s.trainLen / hArt - 0.95);
    var x0 = s.bog.x - (len + 0.95) * hArt / 2, rail = g.yT + g.trainH / 2;
    A.track(ctx, 0, g.W, rail, { offset: s.S ? 0 : -s.ana.x });
    A.train(ctx, x0, rail, {
      h: hArt, cars: 1, len: len, cutaway: true, accent: P.s2, phase: s.T * 4,
      interior: function (c, info) {
        A.person(c, s.bog.x, info.floorY, hArt * 0.56, A.bogdan({ still: true, shadow: false, badge: 'S′', look: 0.5 }));
      }
    });
  }

  function spriteLightRing(ctx, P, x, y, r, alpha) {
    if (r <= 0) return;
    A.wavefront(ctx, x, y, r, { color: P.light, alpha: alpha, w: 3, fill: true });
  }

  function spriteBolt(ctx, P, x, y, age) {
    var d = 0.6;
    if (age < 0 || age > d) return;
    var p = age / d;
    A.lightning(ctx, x, Math.max(0, y - 120), y, { p: p, seed: Math.round(x) % 9 });
    A.flash(ctx, x, y, 32, { p: p });
  }

  function spritePerson(ctx, P, x, y, color, name, nameY, fs) {
    A.chip(ctx, name, x, nameY, { dot: color, align: 'center', size: fs });
  }

  function spriteHalo(ctx, x, y, color, k) {
    if (k < 0 || k > 1) return;
    D.ring(ctx, x, y, 8 + 34 * k, D.rgba(color, 0.85 * (1 - k)), 2.5);
  }

  function spritePopup(ctx, P, x, y, text, color, a, fs) {
    ctx.save();
    ctx.globalAlpha = clamp(a, 0, 1);
    D.label(ctx, text, x, y, { size: fs - 0.5, color: color, border: D.rgba(color, 0.7), align: 'center' });
    ctx.restore();
  }

  function drawScene(cv, P, g, s, ui) {
    var ctx = cv.ctx, W = g.W, fs = W < 460 ? 11 : 12.5;
    D.clear(cv);

    /* ---- scena (decupată deasupra panoului) ---- */
    ctx.save();
    ctx.beginPath(); ctx.rect(0, 0, W, g.panelTop); ctx.clip();
    A.sky(ctx, W, g.panelTop, { horizon: g.panelTop * 0.8, t: s.T });
    A.skyline(ctx, W, g.yT + g.trainH / 2 - 4, { cam: 0, h: g.trainH * 1.3, far: true, seed: 5 });
    spritePlatform(ctx, P, g, s);
    spriteMarks(ctx, P, g, s);
    spriteTrain(ctx, P, g, s);
    s.rings.forEach(function (r) { spriteLightRing(ctx, P, r.x, r.y, r.r, clamp(1.15 - r.r / (g.Lp * 1.7), 0.3, 1)); });
    s.strikes.forEach(function (k) { spriteBolt(ctx, P, k.x, k.y, s.T - k.t); });

    // etichete „față / spate” la capetele trenului
    var tx0 = s.bog.x - s.trainLen / 2, ty = g.yT - g.trainH / 2 - 7;
    D.text(ctx, 'spate', tx0, ty, { color: P.tx3, size: fs - 1, align: 'center' });
    D.text(ctx, 'față', tx0 + s.trainLen, ty, { color: P.tx3, size: fs - 1, align: 'center' });

    // observatorii
    var bogNameY = g.yT - g.trainH / 2 - 21, anaNameY = g.yT + g.h + g.platH / 2 + 15;
    A.person(ctx, s.ana.x, s.ana.y + g.platH / 2 - 3, Math.min(g.panelTop - s.ana.y + 8, 78), A.ana({ still: true, badge: 'S', look: 0.3 }));
    spritePerson(ctx, P, s.ana.x, s.ana.y, P.s1, 'Ana', anaNameY, fs);
    spritePerson(ctx, P, s.bog.x, s.bog.y, P.s2, 'Bogdan', bogNameY, fs);

    // recepțiile: halou scurt + mesaj
    var bogMsgs = 0;
    s.recv.forEach(function (rc) {
      var dt = s.T - rc.t;
      if (dt < 0) return;
      var who = rc.who === 'ana' ? s.ana : s.bog, col = rc.who === 'ana' ? P.s1 : P.s2;
      spriteHalo(ctx, who.x, who.y, col, dt / 0.55);
      var a = dt / 0.2, mx = clamp(who.x, 70, W - 70), my;
      if (rc.who === 'ana') my = anaNameY + 22;
      else { my = bogNameY - 20 - 20 * bogMsgs; bogMsgs++; }
      spritePopup(ctx, P, mx, my, rc.text, col, a, fs);
    });
    if (ui.paused) D.text(ctx, 'imagine oprită — răspunde la întrebare', W / 2, g.panelTop - 10, { color: P.tx3, size: fs - 1, align: 'center' });
    ctx.restore();

    /* ---- panoul de jos: priveliștea curentă + concluziile ---- */
    drawPanel(ctx, P, g, s, ui, fs);
  }

  function drawPanel(ctx, P, g, s, ui, fs) {
    var W = g.W, y0 = g.panelTop, ph = g.panelH;
    ctx.save();
    ctx.fillStyle = D.rgba(P.card, 0.94); ctx.fillRect(0, y0, W, ph);
    ctx.restore();
    D.line(ctx, 0, y0, W, y0, P.line2, 1.5);
    var colV = s.S ? P.s1 : P.s2;
    D.dot(ctx, 16, y0 + 15, 4.5, colV);
    D.text(ctx, (s.S ? 'Privești de pe peron (Ana)' : 'Privești din tren (Bogdan)') + ' · încetinit', 27, y0 + 19, { color: P.tx2, size: fs - 0.5 });

    var rows = ui.rows, n = Math.max(1, rows.length), top = y0 + 30, rh = (ph - 34) / n;
    var pps = (W - 100) / 4.6;                       // px pe secundă pe axa timpului (±2,3 s)
    rows.forEach(function (row, i) {
      var ry = top + i * rh, col = row.frame === 'S' ? P.s1 : P.s2;
      var title = row.frame === 'S' ? 'Ana (peron): fulgerele sunt simultane' : 'Bogdan (tren): întâi față, apoi spate';
      if (!row.show) {
        D.text(ctx, row.frame === 'S' ? 'Ce concluzie trage Ana?' : 'Ce concluzie trage Bogdan? Răspunde la întrebare.', 16, ry + rh * 0.45, { color: P.tx3, size: fs });
        return;
      }
      ctx.save();
      ctx.globalAlpha = row.alpha;
      D.text(ctx, title, 16, ry + 11, { color: col, size: fs, weight: 700 });
      var ay = ry + rh * 0.62, xc = W / 2;
      D.arrow(ctx, 14, ay, W - 12, ay, { color: P.line2, w: 1.6, head: 7 });
      D.text(ctx, 'timp', W - 14, ay + 13, { color: P.tx3, size: fs - 2, align: 'right' });
      var tF = row.frame === 'S' ? 0 : -g.tau, tR = row.frame === 'S' ? 0 : g.tau;
      var xF = xc + tF * pps, xR = xc + tR * pps;
      if (row.frame !== 'S') D.line(ctx, xF, ay, xR, ay, col, 4);
      D.dot(ctx, xF, ay, 5.5, P.light, 8);                           // față: disc plin
      D.ring(ctx, xR, ay, 5.5, P.light, 2.2);                        // spate: inel
      D.text(ctx, 'față', xF, ay - 10, { color: P.tx2, size: fs - 1, align: 'center' });
      D.text(ctx, 'spate', xR, ay + 17, { color: P.tx2, size: fs - 1, align: 'center' });
      ctx.restore();
    });
    if (ui.hint) D.text(ctx, ui.hint, 16, y0 + ph - 12, { color: P.tx3, size: fs - 1 });
  }

  /* ======================================================================
     2. STAREA ȘI CONTROALELE
     ====================================================================== */
  RF.sims.c04Tren = function (host, api) {
    var cv = RF.sim.canvas(api.stage, { aspect: 1 / 1.1, minH: 340, maxH: 470 });
    var view = 'S', beta = 0.6, stage = api.steps ? 0 : 4, clock = 0, predicted = {}, lastG = null;

    var sl = RF.ui.slider(api.controls, {
      label: 'Viteza trenului față de peron', min: 0.2, max: 0.8, step: 0.01, value: beta, tone: 's2',
      fmt: function (v) { return RF.fmt.c(v); },
      onInput: function (v) { beta = v; clock = 0; }
    });
    var seg = RF.ui.segmented(api.controls, {
      label: 'Privești din…', value: view,
      options: [{ k: 'S', label: 'peron (Ana)' }, { k: 'Sp', label: 'tren (Bogdan)' }],
      onChange: function (k) { view = k; clock = 0; }
    });
    var btns = RF.ui.buttons(api.controls, [{ label: '↻ Repetă', onClick: function () { clock = 0; } }]);

    function geo() { return makeGeo(cv.W || 400, cv.H || 440, beta); }

    function applyStage() {
      view = STAGE_VIEW[stage] || 'S';
      seg.set(view, true);
      clock = 0;
      api.controls.style.display = (stage >= 2 || !api.steps) ? '' : 'none';   // controalele apar de la pasul 3
    }

    /* Ceasul animației -> momentul T al vederii curente (după etapă) */
    function curT(g) {
      var sp = spanOf(view, g), len, cyc;
      if (stage === 0) {                                 // doar apropierea trenului, oprită chiar înainte de lovituri
        len = (sp.first - 0.04) - sp.t0; cyc = len + 1.5;
        return sp.t0 + Math.min(clock % cyc, len);
      }
      if (stage === 1 && !predicted[1]) return sp.first + 0.22;   // oprit imediat după lovituri, până răspunzi
      len = sp.end - sp.t0; cyc = len + PAUSE;
      return sp.t0 + Math.min(clock % cyc, len);
    }

    function uiState(g, T) {
      var rows = [], hint = '';
      function alphaFor(frame) {                         // concluzia apare când observatorul a primit ambele lumini
        if (view !== frame) return 1;
        var tm = timesOf(frame, g), done = frame === 'S' ? tm.anaBoth : tm.bogR;
        return clamp((T - done - 0.1) / 0.4, 0, 1);
      }
      if (stage === 2) rows = [{ frame: 'S', show: true, alpha: alphaFor('S') }];
      else if (stage === 3) rows = [{ frame: 'Sp', show: !!predicted[3], alpha: predicted[3] ? alphaFor('Sp') : 1 }];
      else if (stage === 4 || !api.steps) rows = [{ frame: 'S', show: true, alpha: 1 }, { frame: 'Sp', show: true, alpha: 1 }];   // rezumatul: ambele concluzii, mereu vizibile
      if (stage === 0) hint = 'Fulgerele vor lovi capetele trenului când Bogdan trece prin dreptul Anei.';
      if (stage === 1) hint = predicted[1] ? 'Lumina pornește din ambele capete ale trenului.' : 'Lumina tocmai a pornit din ambele capete.';
      return { rows: rows, hint: hint, paused: stage === 1 && !predicted[1] };
    }

    RF.sim.loop(host, function (dt) {
      if (!cv.W || !cv.H) return;
      if (dt > 0) clock += dt;
      var g = geo(), T = curT(g), s = snapshot(view, T, g);
      lastG = g;
      drawScene(cv, RF.sim.palette(), g, s, uiState(g, T));
    });

    /* ---- legătura cu povestea pe pași ---- */
    /* Soluție locală pentru „Reia povestea ↺”: motorul resetează blocajul, dar întrebările rămân
       marcate ca răspunse (nu se mai pot apăsa) și pasul ar rămâne blocat. Aici le redeschidem. */
    function fixGate(stepEl, st) {
      if (!stepEl) return;
      var p = stepEl.querySelector('.predict[data-answered]');
      if (p && !stepEl._unlocked) {
        p.removeAttribute('data-answered');
        var lis = p.querySelectorAll('.predict__opts > li');
        for (var i = 0; i < lis.length; i++) { lis[i].classList.remove('is-right'); lis[i].classList.remove('is-wrong'); }
        var rv = p.querySelector('.predict__reveal');
        if (rv) rv.hidden = true;
        predicted[st] = false;
      }
    }
    if (api.steps) {
      api.steps.addEventListener('rf:step', function (e) {
        var d = e.detail || {};
        stage = d.stage;
        fixGate(d.step, d.stage);
        applyStage();
      });
      api.steps.addEventListener('rf:predict', function () {
        predicted[stage] = true;
        if (stage === 1) {                               // continuă din cadrul oprit
          var g = geo(), sp = spanOf(view, g);
          clock = (sp.first + 0.22) - sp.t0;
        }
      });
    }
    applyStage();
  };
})();
