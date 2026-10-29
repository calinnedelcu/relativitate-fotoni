/* ==========================================================================
   Relativitate & Fotoni — sim.js
   Unelte pentru simulări: canvas adaptiv, buclă de animație (rulează doar
   când simularea se vede), paletă de culori din temă, desen, fizică, formatare.
   Simulările se înregistrează în RF.sims.<nume> și pornesc automat din
   <figure class="sim" data-sim="nume">.
   ========================================================================== */
(function (global) {
  'use strict';
  var RF = global.RF, el = RF.el;
  RF.sims = RF.sims || {};
  RF.sim = {};

  /* ---------- paleta curentă (citită din variabilele CSS) ---------- */
  var pal = null;
  function readPalette() {
    var cs = getComputedStyle(document.documentElement);
    function v(n) { return cs.getPropertyValue(n).trim(); }
    pal = {
      dark: RF.theme.get() === 'dark',
      bg: v('--stage'), card: v('--card-solid'), card2: v('--card2'),
      tx: v('--tx'), tx2: v('--tx2'), tx3: v('--tx3'),
      line: v('--line'), line2: v('--line2'),
      acc: v('--acc'), acc2: v('--acc2'), light: v('--light'),
      s1: v('--s1'), s2: v('--s2'), s3: v('--s3'),
      good: v('--good'), bad: v('--bad'), warn: v('--warn'),
      font: getComputedStyle(document.body).fontFamily,
      mono: v('--mono')
    };
    return pal;
  }
  RF.sim.palette = function () { return pal || readPalette(); };
  var themeCbs = [];
  RF.sim.onTheme = function (fn) { themeCbs.push(fn); };
  document.addEventListener('rf:theme', function () {
    pal = null; dotPat = {};
    themeCbs.forEach(function (f) { try { f(); } catch (e) { /* ignorăm */ } });
  });

  /* ---------- canvas adaptiv ---------- */
  /* RF.sim.canvas(stage, {aspect:16/9, height, minH, maxH}) -> {cv, ctx, W, H, dpr, onResize(fn), drag(handlers)}
     Coordonatele de desen sunt în pixeli CSS (W x H); densitatea ecranului e tratată automat. */
  RF.sim.canvas = function (stage, o) {
    o = o || {};
    var cv = el('canvas', { class: 'sim__canvas' });
    stage.appendChild(cv);
    var api = { cv: cv, ctx: cv.getContext('2d'), W: 0, H: 0, dpr: 1, _cb: [] };
    var lastW = 0;
    function resize() {
      var w = Math.floor(stage.clientWidth);
      if (!w) return;
      lastW = w;
      var h = o.height ? o.height : w / (o.aspect || 16 / 9);
      if (o.maxH) h = Math.min(h, o.maxH);
      if (o.minH) h = Math.max(h, o.minH);
      h = Math.round(h);
      var dpr = Math.min(global.devicePixelRatio || 1, 2.5);
      cv.style.height = h + 'px';
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      api.W = w; api.H = h; api.dpr = dpr;
      api.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      api._cb.forEach(function (f) { f(api); });
      stage.dispatchEvent(new CustomEvent('rf:resize', { bubbles: true }));
    }
    api.resize = resize;
    api.onResize = function (f) { api._cb.push(f); };
    if (global.ResizeObserver) {
      new ResizeObserver(function () { if (Math.floor(stage.clientWidth) !== lastW) resize(); }).observe(stage);
    } else {
      global.addEventListener('resize', resize);
    }
    resize();
    /* tragere cu mouse / deget: handlers {down(x,y), move(x,y), up(), hover(x,y)}; opts {lock:true} blochează derularea paginii */
    api.drag = function (h, opts) {
      var active = false;
      if (opts && opts.lock) cv.style.touchAction = 'none';
      function pos(e) {
        var r = cv.getBoundingClientRect();
        return [(e.clientX - r.left) * (api.W / r.width), (e.clientY - r.top) * (api.H / r.height)];
      }
      function end() { if (active) { active = false; if (h.up) h.up(); } }
      cv.addEventListener('pointerdown', function (e) {
        var p = pos(e);
        if (h.down && h.down(p[0], p[1], e) === false) return;
        active = true;
        try { cv.setPointerCapture(e.pointerId); } catch (x) { /* ignorăm */ }
        if (opts && opts.lock) e.preventDefault();
      });
      cv.addEventListener('pointermove', function (e) {
        var p = pos(e);
        if (active) { if (h.move) h.move(p[0], p[1], e); if (opts && opts.lock) e.preventDefault(); }
        else if (h.hover) h.hover(p[0], p[1], e);
      });
      cv.addEventListener('pointerup', end);
      cv.addEventListener('pointercancel', end);
    };
    return api;
  };

  /* ---------- buclă de animație: RF.sim.loop(host, (dt, t) => {...}) -> {start, stop, isRunning} ----------
     Rulează doar cât timp `host` se vede pe ecran și fila e activă. dt în secunde (max 0.05). */
  RF.sim.loop = function (host, fn) {
    var raf = 0, last = 0, visible = true, wanted = true;
    function frame(ts) {
      raf = global.requestAnimationFrame(frame);
      var dt = last ? Math.min((ts - last) / 1000, 0.05) : 0.016;
      last = ts;
      fn(dt, ts / 1000);
    }
    /* un cadru static când bucla nu rulează (după redimensionare sau la prima afișare) */
    function paintOnce() {
      if (raf) return;
      global.requestAnimationFrame(function (ts) {
        if (raf) return;
        try { fn(0, ts / 1000); } catch (e) { /* cadru static: ignorăm */ }
      });
    }
    function update() {
      var should = wanted && visible && !document.hidden;
      if (should && !raf) { last = 0; raf = global.requestAnimationFrame(frame); }
      else if (!should && raf) { global.cancelAnimationFrame(raf); raf = 0; }
    }
    host.addEventListener('rf:resize', paintOnce);
    paintOnce();
    if (global.IntersectionObserver) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; update(); }).observe(host);
    }
    document.addEventListener('visibilitychange', update);
    update();
    return {
      start: function () { wanted = true; update(); },
      stop: function () { wanted = false; update(); },
      isRunning: function () { return !!raf; }
    };
  };

  /* ---------- pornirea automată a simulărilor ---------- */
  RF.sim.autoInit = function (root) {
    RF.$$('[data-sim]', root).forEach(function (host) {
      if (host._rfsim) return;
      host._rfsim = true;
      var name = host.getAttribute('data-sim'), fn = RF.sims[name];
      host.classList.add('sim');
      var title = RF.$('figcaption', host) || RF.$('.sim__title', host);
      if (title) title.classList.add('sim__title');
      var hint = RF.$('.sim__hint', host);
      var stage = RF.$('.sim__stage', host), controls = RF.$('.sim__controls', host);
      if (!stage) {
        stage = el('div', { class: 'sim__stage' });
        if (title) title.insertAdjacentElement('afterend', stage); else host.insertBefore(stage, host.firstChild);
      }
      if (!controls) {
        controls = el('div', { class: 'sim__controls' });
        stage.insertAdjacentElement('afterend', controls);
      }
      if (!fn) { stage.innerHTML = '<div class="sim__missing">Simularea „' + name + '” se pregătește…</div>'; return; }
      try {
        fn(host, { stage: stage, controls: controls, hint: hint, steps: host.closest('.steps') });
        RF.$$('canvas', stage).forEach(function (c) {
          c.setAttribute('role', 'img');
          c.setAttribute('aria-label', (title ? title.textContent : 'Simulare') + ' — ilustrație interactivă');
        });
      } catch (e) {
        console.error('Simularea ' + name + ' nu a putut porni:', e);
        stage.innerHTML = '<div class="sim__missing">Simularea nu a putut porni.</div>';
      }
    });
  };

  /* ---------- fizică ---------- */
  RF.phys = {
    C: 299792458,
    /* factorul Lorentz pentru β = v/c */
    gamma: function (b) { b = Math.min(Math.abs(b), 0.9999999); return 1 / Math.sqrt(1 - b * b); },
    /* compunerea relativistă a vitezelor (în unități de c) */
    addv: function (u, v) { return (u + v) / (1 + u * v); },
    /* factor Doppler relativist longitudinal (sursa se apropie: >1) */
    doppler: function (b) { return Math.sqrt((1 + b) / (1 - b)); }
  };

  /* ---------- formatare cu virgulă zecimală ---------- */
  RF.fmt = {
    n: function (x, d) { return Number(x).toFixed(d == null ? 2 : d).replace('.', ','); },
    c: function (b, d) { return RF.fmt.n(b, d == null ? 2 : d) + ' c'; },
    pct: function (x, d) { return RF.fmt.n(x * 100, d == null ? 0 : d) + '%'; }
  };

  /* ---------- desen ---------- */
  var D = RF.draw = {};
  D.font = function (size, weight, mono) {
    var P = RF.sim.palette();
    return (weight || 400) + ' ' + (size || 13) + 'px ' + (mono ? P.mono : P.font);
  };
  /* culoare cu transparență: D.rgba('#5cc8ff', .4) */
  D.rgba = function (c, a) {
    c = String(c).trim();
    var m = c.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (m) {
      var h = m[1];
      if (h.length === 3) h = h.split('').map(function (x) { return x + x; }).join('');
      var n = parseInt(h, 16);
      return 'rgba(' + (n >> 16 & 255) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',' + a + ')';
    }
    m = c.match(/^rgba?\(([^)]+)\)/i);
    if (m) { var p = m[1].split(',').map(function (s) { return s.trim(); }); return 'rgba(' + p[0] + ',' + p[1] + ',' + p[2] + ',' + a + ')'; }
    return c;
  };
  /* ---- culori: deschide / închide o culoare (hex sau rgb[a]) ---- */
  function pc(c) {
    c = String(c).trim();
    var m = c.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (m) { var h = m[1]; if (h.length === 3) h = h.split('').map(function (x) { return x + x; }).join(''); var n = parseInt(h, 16); return [n >> 16 & 255, n >> 8 & 255, n & 255, 1]; }
    m = c.match(/^rgba?\(([^)]+)\)/i);
    if (m) { var q = m[1].split(',').map(parseFloat); return [q[0], q[1], q[2], q.length > 3 ? q[3] : 1]; }
    return [128, 128, 128, 1];
  }
  /* amt > 0 deschide spre alb, amt < 0 închide spre negru; păstrează transparența */
  D.shade = function (c, amt) {
    var a = pc(c), t = amt > 0 ? 255 : 0, k = Math.abs(amt);
    return 'rgba(' + Math.round(a[0] + (t - a[0]) * k) + ',' + Math.round(a[1] + (t - a[1]) * k) + ',' + Math.round(a[2] + (t - a[2]) * k) + ',' + a[3] + ')';
  };
  var dotPat = {};
  D.line = function (ctx, x1, y1, x2, y2, color, w, dash) {
    ctx.save();
    ctx.strokeStyle = color; ctx.lineWidth = w || 1;
    if (dash) ctx.setLineDash(dash);
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    ctx.restore();
  };
  /* săgeată: o = {color, w, head, dash} */
  D.arrow = function (ctx, x1, y1, x2, y2, o) {
    o = o || {};
    var w = o.w || 2, a = Math.atan2(y2 - y1, x2 - x1), h = o.head || Math.max(9, w * 3.2), len = Math.hypot(x2 - x1, y2 - y1), col = o.color || '#fff';
    if (len < 1) return;
    ctx.save();
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    if (w >= 3 && !o.dash) { ctx.shadowColor = D.rgba(col, 0.55); ctx.shadowBlur = 10; }
    if (o.dash) ctx.setLineDash(o.dash);
    var k = Math.min(h * 0.7, len);
    if (w >= 3 && !o.dash && len > 24) {
      var gr = ctx.createLinearGradient(x1, y1, x2, y2); gr.addColorStop(0, D.rgba(col, 0.35)); gr.addColorStop(1, col); ctx.strokeStyle = gr;
    }
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - Math.cos(a) * k, y2 - Math.sin(a) * k); ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - h * Math.cos(a - 0.42), y2 - h * Math.sin(a - 0.42));
    ctx.lineTo(x2 - h * 0.78 * Math.cos(a), y2 - h * 0.78 * Math.sin(a));
    ctx.lineTo(x2 - h * Math.cos(a + 0.42), y2 - h * Math.sin(a + 0.42));
    ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();
  };
  D.dot = function (ctx, x, y, r, color, glow) {
    ctx.save();
    if (glow) { ctx.shadowColor = color; ctx.shadowBlur = glow; }
    if (r >= 3.5) {
      var g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.08, x, y, r * 1.05);
      g.addColorStop(0, D.shade(color, 0.6)); g.addColorStop(0.5, color); g.addColorStop(1, D.shade(color, -0.4));
      ctx.fillStyle = g;
    } else ctx.fillStyle = color;
    ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
    ctx.restore();
  };
  D.ring = function (ctx, x, y, r, color, w) {
    ctx.save();
    ctx.strokeStyle = color; ctx.lineWidth = w || 1.5;
    ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.stroke();
    ctx.restore();
  };
  D.rrect = function (ctx, x, y, w, h, r) {
    w = Math.max(w, 0); h = Math.max(h, 0);
    r = Math.max(0, Math.min(r, w / 2, h / 2));
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  };
  D.fillRR = function (ctx, x, y, w, h, r, fill, stroke, sw) {
    ctx.save();
    D.rrect(ctx, x, y, w, h, r);
    if (fill) {
      var f = fill;
      if (typeof fill === 'string' && h > 10 && pc(fill)[3] > 0.92) {
        var g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, D.shade(fill, 0.14)); g.addColorStop(1, D.shade(fill, -0.14)); f = g;
      }
      ctx.fillStyle = f; ctx.fill();
    }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = sw || 1; ctx.stroke(); }
    ctx.restore();
  };
  /* text: o = {color, size, weight, align, base, mono} */
  D.text = function (ctx, s, x, y, o) {
    o = o || {};
    ctx.save();
    ctx.fillStyle = o.color || RF.sim.palette().tx;
    ctx.font = D.font(o.size, o.weight, o.mono);
    ctx.textAlign = o.align || 'left'; ctx.textBaseline = o.base || 'alphabetic';
    ctx.fillText(s, x, y);
    ctx.restore();
  };
  /* etichetă cu fundal: o = {color, bg, size, weight, align, pad} */
  D.label = function (ctx, s, x, y, o) {
    o = o || {};
    var P = RF.sim.palette(), size = o.size || 12, pad = o.pad == null ? 7 : o.pad;
    ctx.save();
    ctx.font = D.font(size, o.weight || 650, o.mono);
    var w = ctx.measureText(s).width + pad * 2, h = size + pad * 1.5;
    var bx = o.align === 'center' ? x - w / 2 : o.align === 'right' ? x - w : x;
    ctx.shadowColor = 'rgba(0,0,0,.28)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 2;
    D.fillRR(ctx, bx, y - h / 2, w, h, h / 2, o.bg || D.rgba(P.card, 0.94), o.border || D.rgba(P.line2, 0.95), 1);
    ctx.shadowColor = 'transparent';
    ctx.fillStyle = o.color || P.tx; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(s, bx + pad, y + 0.5);
    ctx.restore();
    return w;
  };
  D.clear = function (api) {
    var ctx = api.ctx, W = api.W, H = api.H, P = RF.sim.palette(), k = P.dark ? 'd' : 'l';
    var g = ctx.createLinearGradient(0, 0, 0, H);
    if (P.dark) { g.addColorStop(0, '#0d1838'); g.addColorStop(1, '#070d22'); } else { g.addColorStop(0, '#f7faff'); g.addColorStop(1, '#e5edf8'); }
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    var r = ctx.createRadialGradient(W * 0.18, H * 0.05, 0, W * 0.18, H * 0.05, Math.max(W, H) * 0.75);
    r.addColorStop(0, P.dark ? 'rgba(92,200,255,.11)' : 'rgba(10,127,196,.08)'); r.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = r; ctx.fillRect(0, 0, W, H);
    var r2 = ctx.createRadialGradient(W * 0.95, H * 0.9, 0, W * 0.95, H * 0.9, Math.max(W, H) * 0.6);
    r2.addColorStop(0, P.dark ? 'rgba(167,139,250,.10)' : 'rgba(106,69,224,.06)'); r2.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = r2; ctx.fillRect(0, 0, W, H);
    if (!dotPat[k]) {
      var c = document.createElement('canvas'); c.width = c.height = 28;
      var cx = c.getContext('2d'); cx.fillStyle = P.dark ? 'rgba(160,190,255,.10)' : 'rgba(20,40,90,.09)'; cx.beginPath(); cx.arc(14, 14, 1.2, 0, 6.2832); cx.fill();
      dotPat[k] = ctx.createPattern(c, 'repeat');
    }
    ctx.fillStyle = dotPat[k]; ctx.fillRect(0, 0, W, H);
  };
  /* rețea fină de fundal */
  D.grid = function (ctx, W, H, step, color) {
    ctx.save();
    ctx.strokeStyle = color; ctx.lineWidth = 1;
    ctx.beginPath();
    for (var x = step; x < W; x += step) { ctx.moveTo(x + .5, 0); ctx.lineTo(x + .5, H); }
    for (var y = step; y < H; y += step) { ctx.moveTo(0, y + .5); ctx.lineTo(W, y + .5); }
    ctx.stroke();
    ctx.restore();
  };
  /* culoare aproximativă a luminii vizibile pentru o lungime de undă (nm); în afara 380–750 returnează gri */
  D.wavelengthColor = function (nm) {
    var r = 0, g = 0, b = 0;
    if (nm >= 380 && nm < 440) { r = -(nm - 440) / 60; b = 1; }
    else if (nm < 490) { g = (nm - 440) / 50; b = 1; }
    else if (nm < 510) { g = 1; b = -(nm - 510) / 20; }
    else if (nm < 580) { r = (nm - 510) / 70; g = 1; }
    else if (nm < 645) { r = 1; g = -(nm - 645) / 65; }
    else if (nm <= 750) { r = 1; }
    else return 'rgb(150,120,150)';
    if (nm < 380) return 'rgb(170,130,255)';
    var f = nm > 700 ? 0.3 + 0.7 * (750 - nm) / 50 : nm < 420 ? 0.3 + 0.7 * (nm - 380) / 40 : 1;
    function c(x) { return Math.round(255 * Math.pow(x * f, 0.8)); }
    return 'rgb(' + c(r) + ',' + c(g) + ',' + c(b) + ')';
  };
})(window);
