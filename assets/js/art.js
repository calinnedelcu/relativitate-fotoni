/* ==========================================================================
   RF.art — bibliotecă de ilustrații pentru simulări (canvas) — NUCLEUL
   Stil: vectorial plat, gradienți moi, lumină din stânga-sus, umbre fine.
   Convenții: S (Ana, reperul „fix”) = cyan (P.s1); S′ (Bogdan, mobil) = roz (P.s2);
   lumina = chihlimbar (P.light). Toate funcțiile desenează în pixeli CSS.
   Alte fișiere adaugă la același spațiu RF.art: art-space.js, art-light.js,
   art-lab.js, art-graph.js.  Ghid: _dev/art-guide.md  ·  Galerie: _dev/gallery.html
   ========================================================================== */
(function (global) {
  'use strict';
  var RF = global.RF, D = RF.draw, TAU = Math.PI * 2;
  var A = RF.art = RF.art || {};
  A.gallery = A.gallery || [];

  /* ======================= culori ======================= */
  A.skin = ['#f3cfae', '#dca47a', '#a9693f', '#7a4a2c'];
  A.hairc = ['#241a15', '#5b3a22', '#c9954a', '#16161f', '#8a2f2f'];

  function parse(c) {
    c = String(c).trim();
    var m = c.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (m) {
      var h = m[1];
      if (h.length === 3) h = h.split('').map(function (x) { return x + x; }).join('');
      var n = parseInt(h, 16);
      return [n >> 16 & 255, n >> 8 & 255, n & 255, 1];
    }
    m = c.match(/^rgba?\(([^)]+)\)/i);
    if (m) { var p = m[1].split(',').map(parseFloat); return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1]; }
    return [128, 128, 128, 1];
  }
  A.parse = parse;
  A.mix = function (c1, c2, t) {
    var a = parse(c1), b = parse(c2);
    return 'rgb(' + Math.round(a[0] + (b[0] - a[0]) * t) + ',' + Math.round(a[1] + (b[1] - a[1]) * t) + ',' + Math.round(a[2] + (b[2] - a[2]) * t) + ')';
  };
  A.lighten = function (c, t) { return A.mix(c, '#ffffff', t); };
  A.darken = function (c, t) { return A.mix(c, '#000000', t); };
  A.alpha = function (c, a) { return D.rgba(c, a); };
  /* număr pseudo-aleator stabil (0..1) dintr-un întreg */
  A.hash = function (i) { var s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };

  /* ======================= gradienți și forme ======================= */
  A.lin = function (ctx, x0, y0, x1, y1, stops) {
    var g = ctx.createLinearGradient(x0, y0, x1, y1);
    for (var i = 0; i < stops.length; i++) g.addColorStop(stops[i][0], stops[i][1]);
    return g;
  };
  /* radial: cercul exterior (x,y,r1); punctul de focar (fx,fy,r0) opțional */
  A.rad = function (ctx, x, y, r0, r1, stops, fx, fy) {
    var g = ctx.createRadialGradient(fx == null ? x : fx, fy == null ? y : fy, r0, x, y, r1);
    for (var i = 0; i < stops.length; i++) g.addColorStop(stops[i][0], stops[i][1]);
    return g;
  };
  A.rrPath = function (ctx, x, y, w, h, r) { D.rrect(ctx, x, y, w, h, r); };
  /* segment gros cu capete rotunde (cale) */
  A.capsule = function (ctx, x0, y0, x1, y1, w) {
    var a = Math.atan2(y1 - y0, x1 - x0), r = w / 2;
    ctx.beginPath();
    ctx.arc(x0, y0, r, a + Math.PI / 2, a + 3 * Math.PI / 2);
    ctx.arc(x1, y1, r, a - Math.PI / 2, a + Math.PI / 2);
    ctx.closePath();
  };
  A.circle = function (ctx, x, y, r, fill) { ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); if (fill) { ctx.fillStyle = fill; ctx.fill(); } };

  /* ======================= umbre, străluciri, sfere ======================= */
  /* umbră de contact pe sol (elipsă moale) */
  A.shadow = function (ctx, x, y, w, a, k) {
    ctx.save();
    ctx.translate(x, y); ctx.scale(1, k || 0.17);
    var g = ctx.createRadialGradient(0, 0, 0, 0, 0, w / 2);
    g.addColorStop(0, 'rgba(0,0,0,' + (a == null ? 0.38 : a) + ')'); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, w / 2, 0, TAU); ctx.fill();
    ctx.restore();
  };
  /* strălucire moale (halou); additive=true -> se adună cu fundalul (pe scene închise) */
  A.glow = function (ctx, x, y, r, color, a, additive) {
    a = a == null ? 0.9 : a;
    ctx.save();
    if (additive !== false && RF.sim.palette().dark) ctx.globalCompositeOperation = 'lighter';
    var g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, D.rgba(color, a)); g.addColorStop(0.35, D.rgba(color, a * 0.38)); g.addColorStop(1, D.rgba(color, 0));
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
    ctx.restore();
  };
  /* sferă lucioasă */
  A.sphere = function (ctx, x, y, r, color) {
    var g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.08, x, y, r * 1.05);
    g.addColorStop(0, A.lighten(color, 0.7)); g.addColorStop(0.45, color); g.addColorStop(1, A.darken(color, 0.5));
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.5)';
    ctx.beginPath(); ctx.ellipse(x - r * 0.33, y - r * 0.4, r * 0.3, r * 0.17, -0.6, 0, TAU); ctx.fill();
  };
  /* minge cu felii colorate (se rotește cu o.angle) */
  A.ball = function (ctx, x, y, r, o) {
    o = o || {};
    var P = RF.sim.palette(), c1 = o.color || P.s2, c2 = o.color2 || '#fff7e8';
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.clip();
    ctx.fillStyle = c1; ctx.fillRect(-r, -r, 2 * r, 2 * r);
    ctx.rotate(o.angle || 0);
    ctx.fillStyle = c2;
    for (var i = 0; i < 3; i++) {
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r * 1.6, i * TAU / 3 - 0.32, i * TAU / 3 + 0.32); ctx.closePath(); ctx.fill();
    }
    ctx.rotate(-(o.angle || 0));
    var g = ctx.createRadialGradient(-r * 0.35, -r * 0.4, r * 0.05, 0, 0, r * 1.15);
    g.addColorStop(0, 'rgba(255,255,255,.65)'); g.addColorStop(0.3, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(0,0,30,.5)');
    ctx.fillStyle = g; ctx.fillRect(-r, -r, 2 * r, 2 * r);
    ctx.restore();
  };

  /* ======================= sprite în cache (pentru piese grele) ======================= */
  var cache = {}, cacheN = 0;
  A.cached = function (key, w, h, draw) {
    var P = RF.sim.palette(), dpr = Math.min(global.devicePixelRatio || 1, 2);
    var k = key + '|' + (P.dark ? 'd' : 'l') + '|' + dpr + '|' + Math.round(w) + 'x' + Math.round(h);
    var c = cache[k];
    if (!c) {
      if (cacheN > 80) { cache = {}; cacheN = 0; }
      c = document.createElement('canvas');
      c.width = Math.ceil(w * dpr); c.height = Math.ceil(h * dpr);
      var cx = c.getContext('2d'); cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(cx, w, h);
      c._w = w; c._h = h;
      cache[k] = c; cacheN++;
    }
    return c;
  };
  A.blit = function (ctx, c, x, y) { ctx.drawImage(c, x, y, c._w, c._h); };

  /* ======================= oameni ======================= */
  var POSES = {
    stand: [0.10, 0.04, -0.10, -0.04],
    throw: [2.35, 2.80, -0.10, -0.04],
    point: [1.45, 1.55, -0.10, -0.04],
    wave: [2.55, 2.75, -0.10, -0.04],
    hold: [0.85, 1.65, -0.85, -1.65],
    out: [1.40, 1.45, -1.40, -1.45],
    up: [2.9, 3.0, -2.9, -3.0],
    think: [0.12, 0.05, -0.9, -2.5]
  };
  /* personaje recurente: Ana (S, cyan) și Bogdan (S′, roz) */
  A.ana = function (o) {
    var P = RF.sim.palette(), r = { skin: A.skin[0], hair: A.hairc[1], hairStyle: 'bob', shirt: P.s1, pants: '#2a3556' };
    for (var k in o) r[k] = o[k];
    return r;
  };
  A.bogdan = function (o) {
    var P = RF.sim.palette(), r = { skin: A.skin[1], hair: A.hairc[3], hairStyle: 'short', shirt: P.s2, pants: '#2f2f4a' };
    for (var k in o) r[k] = o[k];
    return r;
  };

  /* cap: centrat în (0,0), rază ≈ 11 (unități locale) */
  function head(ctx, o) {
    var skin = o.skin || A.skin[0], hair = o.hair || A.hairc[0], style = o.hairStyle || 'short';
    var look = o.look == null ? 0.5 : o.look, hc = A.lin(ctx, 0, -12, 0, 12, [[0, A.lighten(hair, 0.14)], [1, A.darken(hair, 0.28)]]);
    if (style === 'bob') {
      ctx.fillStyle = hc; A.rrPath(ctx, -13, -11, 26, 21, 9); ctx.fill();
    }
    ctx.fillStyle = A.darken(skin, 0.07);
    A.circle(ctx, -10.6, 1, 2.6); ctx.fill(); A.circle(ctx, 10.6, 1, 2.6); ctx.fill();
    var g = A.rad(ctx, 0, 0, 0.5, 13, [[0, A.lighten(skin, 0.26)], [0.62, skin], [1, A.darken(skin, 0.14)]], -3.5, -4);
    ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(0, 0, 10.4, 11, 0, 0, TAU); ctx.fill();
    // păr / șapcă
    ctx.fillStyle = hc;
    if (style === 'cap') {
      ctx.fillStyle = o.capColor || A.darken(o.shirt || '#c33', 0.1);
      ctx.beginPath(); ctx.moveTo(-11, -1.5); ctx.bezierCurveTo(-12, -15, 12, -15, 11, -1.5); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.ellipse(8.5, -1.2, 8, 2.1, 0.05, 0, TAU); ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(-11.2, 0.5);
      ctx.bezierCurveTo(-13, -15, 13, -15, 11.2, 0.5);
      ctx.bezierCurveTo(10.4, -3.5, 7, -6.5, 2.8, -5.4);
      ctx.bezierCurveTo(-1.5, -8, -8, -6, -11.2, 0.5);
      ctx.closePath(); ctx.fill();
      if (style === 'bob') { ctx.beginPath(); ctx.moveTo(-11.2, 0.5); ctx.lineTo(-12.2, 10); ctx.lineTo(-8.6, 8.4); ctx.lineTo(-9.2, 0); ctx.closePath(); ctx.fill();
        ctx.beginPath(); ctx.moveTo(11.2, 0.5); ctx.lineTo(12.2, 10); ctx.lineTo(8.6, 8.4); ctx.lineTo(9.2, 0); ctx.closePath(); ctx.fill(); }
    }
    // față
    if (o.face !== false) {
      for (var s = -1; s <= 1; s += 2) {
        var ex = s * 4.2, ey = 1.4;
        ctx.fillStyle = 'rgba(255,255,255,.96)'; ctx.beginPath(); ctx.ellipse(ex, ey, 2.5, 2.9, 0, 0, TAU); ctx.fill();
        ctx.fillStyle = '#1b2236'; A.circle(ctx, ex + look * 1.1, ey + 0.2, 1.55); ctx.fill();
        ctx.fillStyle = '#fff'; A.circle(ctx, ex + look * 1.1 - 0.5, ey - 0.5, 0.5); ctx.fill();
        var ix = ex - s * 2.6, ox = ex + s * 2.6, iy = ey - 4 - (o.worried ? 1.1 : 0), oy = ey - 4 + (o.worried ? 0.6 : 0);
        ctx.strokeStyle = A.darken(hair, 0.1); ctx.lineWidth = 1; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(ix, iy); ctx.quadraticCurveTo(ex, ey - 5.6, ox, oy); ctx.stroke();
      }
      ctx.fillStyle = 'rgba(255,110,110,.2)'; A.circle(ctx, -7.2, 5.6, 2.6); ctx.fill(); A.circle(ctx, 7.2, 5.6, 2.6); ctx.fill();
      ctx.strokeStyle = '#8a3b30'; ctx.lineWidth = 1.2; ctx.lineCap = 'round';
      ctx.beginPath();
      if (o.mouth === 'o') { ctx.fillStyle = '#6a2a24'; ctx.ellipse(look * 0.8, 6.6, 1.7, 2.2, 0, 0, TAU); ctx.fill(); }
      else { ctx.arc(look * 0.8, 3.6, 3.2, 0.22 * Math.PI, 0.78 * Math.PI); ctx.stroke(); }
    }
  }

  /* persoană în picioare. (x,y) = tălpile, h = înălțimea în px.
     o: {facing:1|-1, pose:'stand'|'throw'|'point'|'wave'|'hold'|'out'|'up'|'think' | [a1,a2,b1,b2], skin, hair, hairStyle:'short'|'bob'|'cap',
         shirt, pants, look(-1..1), t, still, wave, mouth:'o', worried, holdR(ctx,x,y,u), holdL(ctx,x,y,u)}
     întoarce puncte de ancorare în coordonate canvas: {head, handR, handL, feet, top, u} */
  A.person = function (ctx, x, y, h, o) {
    o = o || {};
    var P = RF.sim.palette(), u = h / 100, f = o.facing === -1 ? -1 : 1, t = o.t || 0;
    var shirt = o.shirt || P.s1, pants = o.pants || '#2a3556', shoe = o.shoe || '#161b2e', skin = o.skin || A.skin[0];
    var pose = o.pose || 'stand', ang = (typeof pose === 'string' ? POSES[pose] : pose) || POSES.stand;
    var a1 = ang[0], a2 = ang[1], b1 = ang[2], b2 = ang[3];
    if (o.wave) a2 += Math.sin(t * 7.5) * 0.4;
    var bob = o.still ? 0 : Math.sin(t * 2.4 + (o.seed || 0)) * 0.55;
    var anchors = {};
    function pt(lx, ly) { return { x: x + f * u * lx, y: y + u * (ly + bob) }; }

    if (o.shadow !== false) A.shadow(ctx, x, y, h * 0.5, 0.34);
    ctx.save();
    ctx.translate(x, y + bob * u); ctx.scale(f * u, u);

    // picioare
    var pg = A.lin(ctx, 0, -46, 0, -6, [[0, A.lighten(pants, 0.1)], [1, A.darken(pants, 0.22)]]);
    ctx.fillStyle = pg;
    A.capsule(ctx, -5.3, -44, -5.6, -10, 10.6); ctx.fill();
    A.capsule(ctx, 5.3, -44, 5.6, -10, 10.6); ctx.fill();
    ctx.fillStyle = shoe;
    A.rrPath(ctx, -11.8, -6.4, 12.6, 6.4, 3.2); ctx.fill();
    A.rrPath(ctx, -0.8, -6.4, 12.6, 6.4, 3.2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.fillRect(-11, -1.4, 11, 1.1); ctx.fillRect(0, -1.4, 11, 1.1);

    // gât
    ctx.fillStyle = A.darken(skin, 0.08); A.rrPath(ctx, -3.6, -83, 7.2, 7, 2); ctx.fill();
    // trunchi
    ctx.beginPath();
    ctx.moveTo(-11.6, -45);
    ctx.lineTo(-14.7, -72.5);
    ctx.quadraticCurveTo(-14.9, -79.2, -8, -79.2);
    ctx.lineTo(8, -79.2);
    ctx.quadraticCurveTo(14.9, -79.2, 14.7, -72.5);
    ctx.lineTo(11.6, -45);
    ctx.quadraticCurveTo(0, -42.8, -11.6, -45);
    ctx.closePath();
    ctx.fillStyle = A.lin(ctx, -14, 0, 14, 0, [[0, A.lighten(shirt, 0.2)], [0.5, shirt], [1, A.darken(shirt, 0.3)]]);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.14)'; ctx.beginPath(); ctx.ellipse(-6, -68, 3.2, 9, 0.12, 0, TAU); ctx.fill();
    ctx.fillStyle = A.darken(skin, 0.1); ctx.beginPath(); ctx.moveTo(-4.4, -79.2); ctx.lineTo(0, -73); ctx.lineTo(4.4, -79.2); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.lineWidth = 0.9; ctx.beginPath(); ctx.moveTo(0, -72.4); ctx.lineTo(0, -46.6); ctx.stroke();
    ctx.fillStyle = A.darken(shirt, 0.45); ctx.fillRect(-11.9, -47.4, 23.8, 2.4);
    if (o.badge) {
      ctx.fillStyle = 'rgba(255,255,255,.9)'; A.circle(ctx, 6.4, -66, 3.5); ctx.fill();
      ctx.fillStyle = A.darken(shirt, 0.35); ctx.font = '700 4.8px system-ui,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      if (f === -1) { ctx.save(); ctx.translate(6.4, -66); ctx.scale(-1, 1); ctx.fillText(o.badge, 0, 0.3); ctx.restore(); } else ctx.fillText(o.badge, 6.4, -65.7);
    }

    // brațe
    function arm(side, ta, tb) {
      var sx = side * 13.6, sy = -75.2, ex = sx + Math.sin(ta) * 16, ey = sy + Math.cos(ta) * 16;
      var hx = ex + Math.sin(tb) * 15, hy = ey + Math.cos(tb) * 15;
      ctx.fillStyle = A.darken(shirt, 0.06); A.capsule(ctx, sx, sy, ex, ey, 8.8); ctx.fill();
      ctx.fillStyle = A.darken(shirt, 0.14); A.capsule(ctx, ex, ey, hx, hy, 7.8); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.3)'; A.circle(ctx, hx - Math.sin(tb) * 0.8, hy - Math.cos(tb) * 0.8, 3.9); ctx.fill();
      var tx = hx + Math.sin(tb) * 3.3, ty = hy + Math.cos(tb) * 3.3;
      ctx.fillStyle = skin; A.circle(ctx, tx, ty, 4.1); ctx.fill();
      return { x: tx, y: ty };
    }
    var hl = arm(-1, b1, b2), hr = arm(1, a1, a2);

    // cap
    ctx.save(); ctx.translate(0, -89);
    head(ctx, o);
    ctx.restore();
    ctx.restore();

    anchors.handR = pt(hr.x, hr.y); anchors.handL = pt(hl.x, hl.y);
    anchors.head = pt(0, -89); anchors.feet = { x: x, y: y }; anchors.top = pt(0, -100); anchors.u = u;
    if (o.holdR) o.holdR(ctx, anchors.handR.x, anchors.handR.y, u);
    if (o.holdL) o.holdL(ctx, anchors.handL.x, anchors.handL.y, u);
    return anchors;
  };

  /* bust (cap + umeri), pentru ferestre. (x,y) = centrul capului; r = raza capului în px.
     Se decupează automat de clip-ul curent al apelantului. */
  A.bust = function (ctx, x, y, r, o) {
    o = o || {};
    var P = RF.sim.palette(), s = r / 11, shirt = o.shirt || P.s1, skin = o.skin || A.skin[0];
    ctx.save();
    ctx.translate(x, y); ctx.scale(s, s);
    ctx.fillStyle = A.lin(ctx, -16, 0, 16, 0, [[0, A.lighten(shirt, 0.18)], [0.5, shirt], [1, A.darken(shirt, 0.3)]]);
    ctx.beginPath(); ctx.moveTo(-17, 40); ctx.lineTo(-16, 20); ctx.quadraticCurveTo(-15, 12, -6, 11.5); ctx.lineTo(6, 11.5); ctx.quadraticCurveTo(15, 12, 16, 20); ctx.lineTo(17, 40); ctx.closePath(); ctx.fill();
    ctx.fillStyle = A.darken(skin, 0.08); A.rrPath(ctx, -3.6, 7, 7.2, 7, 2); ctx.fill();
    head(ctx, o);
    ctx.restore();
  };

  /* ======================= tren ======================= */
  function wheel(ctx, x, y, r, phase) {
    ctx.fillStyle = A.lin(ctx, x, y - r, x, y + r, [[0, '#4a546c'], [1, '#222a3d']]);
    A.circle(ctx, x, y, r); ctx.fill();
    ctx.strokeStyle = '#a8b4c8'; ctx.lineWidth = Math.max(1, r * 0.16); A.circle(ctx, x, y, r * 0.86); ctx.stroke();
    ctx.strokeStyle = 'rgba(200,215,235,.55)'; ctx.lineWidth = Math.max(1, r * 0.1);
    for (var i = 0; i < 4; i++) {
      var a = phase + i * Math.PI / 2;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * r * 0.78, y + Math.sin(a) * r * 0.78); ctx.stroke();
    }
    ctx.fillStyle = '#c9d3e4'; A.circle(ctx, x, y, r * 0.2); ctx.fill();
  }

  /* tren (cu fața spre dreapta). (x,y) = capătul din spate la nivelul șinei.
     o: {w (lățime totală) sau h (înălțimea caroseriei), cars:2, accent, phase (rotația roților), speed (0..1, dungi de viteză),
         cutaway:true (vagon cu geamuri mari, se văd oamenii), interior(ctx, info, i) (desenează oameni înăuntru), lit}
     întoarce {tip:{x,y}, cars:[{x,y,w,h,floorY,x0,x1}], h} */
  A.train = function (ctx, x, y, o) {
    o = o || {};
    var P = RF.sim.palette(), n = o.cars || 2, acc = o.accent || P.s2, len = o.len || 4.2;
    var units = n * len + 0.95 + (n - 1) * 0.1;
    var h = o.h || (o.w ? o.w / units : 56);
    var cw = h * len, nl = h * 0.95, gap = h * 0.1;
    var yb = y - 0.2 * h, yTop = yb - h, info = { cars: [], h: h };
    var spd = o.speed || 0;

    // dungi de viteză în spate
    if (spd > 0.02) {
      ctx.save();
      for (var i = 0; i < 6; i++) {
        var ly = yTop + h * (0.12 + i * 0.15), len = h * (1.2 + 2.6 * A.hash(i + 3)) * spd;
        var g = ctx.createLinearGradient(x - len, 0, x, 0);
        g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(255,255,255,' + (0.34 * spd) + ')');
        ctx.strokeStyle = g; ctx.lineWidth = 2.2; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(x - len, ly); ctx.lineTo(x - 2, ly); ctx.stroke();
      }
      ctx.restore();
    }
    A.shadow(ctx, x + (n * cw + nl) / 2, y + 2, n * cw * 0.95, 0.3, 0.05);

    for (var c = 0; c < n; c++) {
      var x0 = x + c * (cw + gap), isNose = c === n - 1, nose = isNose ? nl : 0, w = cw;
      // boghiuri
      var rw = 0.14 * h;
      [0.16, 0.84].forEach(function (k) { [-1, 1].forEach(function (s) { wheel(ctx, x0 + w * k + s * 0.21 * h, y - rw, rw, (o.phase || 0) + c); }); });
      ctx.fillStyle = '#171d2e'; A.rrPath(ctx, x0 + 0.05 * w, yb - 0.1 * h, w * 0.9, 0.24 * h, 0.06 * h); ctx.fill();
      // caroserie
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x0 + 0.1 * h, yTop);
      if (isNose) {
        var xe = x0 + w;
        ctx.lineTo(xe - 0.5 * h, yTop);
        ctx.bezierCurveTo(xe + nose * 0.32, yTop, xe + nose * 0.8, yTop + h * 0.3, xe + nose, yTop + h * 0.66);
        ctx.bezierCurveTo(xe + nose * 1.02, yTop + h * 0.82, xe + nose * 0.94, yb - 0.01 * h, xe + nose * 0.72, yb);
      } else {
        ctx.lineTo(x0 + w - 0.1 * h, yTop);
        ctx.quadraticCurveTo(x0 + w, yTop, x0 + w, yTop + 0.1 * h);
        ctx.lineTo(x0 + w, yb - 0.06 * h); ctx.quadraticCurveTo(x0 + w, yb, x0 + w - 0.06 * h, yb);
      }
      ctx.lineTo(x0 + 0.06 * h, yb); ctx.quadraticCurveTo(x0, yb, x0, yb - 0.06 * h);
      ctx.lineTo(x0, yTop + 0.1 * h); ctx.quadraticCurveTo(x0, yTop, x0 + 0.1 * h, yTop);
      ctx.closePath();
      ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 4;
      ctx.fillStyle = A.lin(ctx, 0, yTop, 0, yb, [[0, '#ffffff'], [0.55, '#e3eaf6'], [1, '#aeb9ce']]);
      ctx.fill();
      ctx.shadowColor = 'transparent';
      ctx.clip();

      var info1 = { x: x0, y: yTop, w: w + nose, h: h, c: c, bodyW: w };
      var winTop = yTop + 0.13 * h, winBot = yb - 0.3 * h, wx0 = x0 + 0.34 * h, wx1 = x0 + w - (isNose ? 0.2 * h : 0.34 * h);
      info1.floorY = winBot - 0.02 * h; info1.x0 = wx0; info1.x1 = wx1; info1.top = winTop; info1.bottom = winBot;

      if (o.cutaway) {
        // interior luminos
        ctx.fillStyle = A.lin(ctx, 0, winTop, 0, winBot, [[0, '#fff3cf'], [1, '#ffd98a']]);
        A.rrPath(ctx, wx0, winTop, wx1 - wx0, winBot - winTop, 0.06 * h); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(wx0, winTop, wx1 - wx0, 0.05 * h);
        ctx.fillStyle = A.darken('#c9a46a', 0.25); ctx.fillRect(wx0, winBot - 0.1 * h, wx1 - wx0, 0.1 * h);
        // bare de sprijin
        ctx.strokeStyle = 'rgba(120,90,50,.35)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(wx0 + 6, winTop + 0.12 * h); ctx.lineTo(wx1 - 6, winTop + 0.12 * h); ctx.stroke();
        if (o.interior) { ctx.save(); ctx.beginPath(); ctx.rect(wx0, winTop, wx1 - wx0, winBot - winTop); ctx.clip(); o.interior(ctx, info1, c); ctx.restore(); }
        // sticlă
        var gg = A.lin(ctx, wx0, winTop, wx1, winBot, [[0, 'rgba(255,255,255,.28)'], [0.35, 'rgba(255,255,255,0)'], [0.7, 'rgba(255,255,255,.08)'], [1, 'rgba(255,255,255,0)']]);
        ctx.fillStyle = gg; A.rrPath(ctx, wx0, winTop, wx1 - wx0, winBot - winTop, 0.06 * h); ctx.fill();
        ctx.strokeStyle = '#9aa7bd'; ctx.lineWidth = 3; A.rrPath(ctx, wx0, winTop, wx1 - wx0, winBot - winTop, 0.06 * h); ctx.stroke();
      } else {
        var cnt = Math.max(2, Math.floor((wx1 - wx0) / (0.8 * h))), sp = (wx1 - wx0) / cnt, ww = sp - 0.14 * h;
        for (var k = 0; k < cnt; k++) {
          var wxx = wx0 + k * sp + 0.07 * h;
          ctx.fillStyle = A.lin(ctx, 0, winTop, 0, winBot, [[0, '#ffeab0'], [1, '#ffc766']]);
          A.rrPath(ctx, wxx, winTop, ww, winBot - winTop, 0.07 * h); ctx.fill();
          if ((c + k) % 3 !== 1) { ctx.save(); ctx.beginPath(); ctx.rect(wxx, winTop, ww, winBot - winTop); ctx.clip();
            A.bust(ctx, wxx + ww * 0.5, winBot - 0.12 * h, 0.082 * h, { skin: A.skin[(c + k) % 4], hair: A.hairc[(c * 2 + k) % 5], shirt: ['#6c7a9c', '#9a6c8c', '#6c9a8a', '#a08c5c'][(c + k) % 4], face: false }); ctx.restore(); }
          ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.beginPath(); ctx.moveTo(wxx + ww * 0.1, winTop); ctx.lineTo(wxx + ww * 0.45, winTop); ctx.lineTo(wxx + ww * 0.15, winBot); ctx.lineTo(wxx - ww * 0.1, winBot); ctx.closePath(); ctx.fill();
        }
      }
      // parbriz (cap de tren)
      if (isNose) {
        var xe2 = x0 + w;
        ctx.fillStyle = A.lin(ctx, 0, yTop, 0, yTop + 0.6 * h, [[0, '#2c4468'], [1, '#101a30']]);
        ctx.beginPath(); ctx.moveTo(xe2 - 0.18 * h, yTop + 0.12 * h); ctx.bezierCurveTo(xe2 + nose * 0.25, yTop + 0.1 * h, xe2 + nose * 0.6, yTop + 0.22 * h, xe2 + nose * 0.8, yTop + 0.52 * h);
        ctx.lineTo(xe2 - 0.18 * h, yTop + 0.52 * h); ctx.closePath(); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.beginPath(); ctx.moveTo(xe2 - 0.1 * h, yTop + 0.13 * h); ctx.lineTo(xe2 + nose * 0.22, yTop + 0.13 * h); ctx.lineTo(xe2 + nose * 0.05, yTop + 0.5 * h); ctx.lineTo(xe2 - 0.1 * h, yTop + 0.5 * h); ctx.closePath(); ctx.fill();
      }
      // dungă de culoare
      ctx.fillStyle = A.lin(ctx, 0, yb - 0.27 * h, 0, yb - 0.1 * h, [[0, A.lighten(acc, 0.2)], [1, A.darken(acc, 0.2)]]);
      ctx.fillRect(x0 - 2, yb - 0.27 * h, w + nose + 4, 0.15 * h);
      ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fillRect(x0 - 2, yb - 0.285 * h, w + nose + 4, 0.012 * h);
      // uși
      if (!o.cutaway) {
        [0.06, 0.87].forEach(function (kk) { var dx = x0 + (c === 0 && kk < 0.5 ? 0.12 : kk) * w - 0.12 * h; if (isNose && kk > 0.5) return;
          ctx.strokeStyle = 'rgba(70,85,115,.45)'; ctx.lineWidth = 1.2; ctx.strokeRect(dx, yTop + 0.1 * h, 0.5 * h, h * 0.68); });
      }
      // lumină și umbră pe caroserie
      ctx.fillStyle = A.lin(ctx, 0, yTop, 0, yTop + 0.22 * h, [[0, 'rgba(255,255,255,.55)'], [1, 'rgba(255,255,255,0)']]);
      ctx.fillRect(x0 - 2, yTop, w + nose + 4, 0.22 * h);
      ctx.restore();
      ctx.strokeStyle = 'rgba(40,55,90,.4)'; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(x0 + 0.1 * h, yTop); ctx.lineTo(x0 + w - (isNose ? 0.5 * h : 0.1 * h), yTop); ctx.stroke();
      // acoperiș: aer condiționat
      if (!isNose) { ctx.fillStyle = A.lin(ctx, 0, yTop - 0.1 * h, 0, yTop, [[0, '#d5dceb'], [1, '#9aa6bd']]);
        A.rrPath(ctx, x0 + w * 0.2, yTop - 0.09 * h, w * 0.18, 0.1 * h, 0.03 * h); ctx.fill(); A.rrPath(ctx, x0 + w * 0.62, yTop - 0.09 * h, w * 0.18, 0.1 * h, 0.03 * h); ctx.fill(); }
      if (isNose) { A.glow(ctx, x0 + w + nose * 0.93, yTop + 0.74 * h, h * 0.5, '#fff1c2', 0.95);
        ctx.fillStyle = '#fffbe8'; ctx.beginPath(); ctx.ellipse(x0 + w + nose * 0.9, yTop + 0.74 * h, h * 0.045, h * 0.07, 0.2, 0, TAU); ctx.fill(); }
      // burduf
      if (c > 0) { ctx.fillStyle = '#10151f'; ctx.fillRect(x0 - gap, yTop + 0.1 * h, gap, h * 0.78); }
      info.cars.push(info1);
    }
    info.tip = { x: x + (n - 1) * (cw + gap) + cw + nl, y: yTop + 0.66 * h };
    info.top = yTop; info.bottom = y;
    return info;
  };

  /* ======================= decor: cer, orizont, sol, șină, peron ======================= */
  /* cer: noapte (tema întunecată) / zi (tema luminoasă). o:{horizon, t} */
  A.sky = function (ctx, W, H, o) {
    o = o || {};
    var P = RF.sim.palette(), hz = o.horizon != null ? o.horizon : H * 0.8, t = o.t || 0;
    var g = ctx.createLinearGradient(0, 0, 0, hz);
    if (P.dark) { g.addColorStop(0, '#060c22'); g.addColorStop(0.55, '#10285a'); g.addColorStop(1, '#2d5a96'); }
    else { g.addColorStop(0, '#7cc0f2'); g.addColorStop(1, '#eaf6ff'); }
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    if (P.dark) {
      for (var i = 0; i < 46; i++) {
        var sx = A.hash(i) * W, sy = A.hash(i + 99) * hz * 0.85, tw = 0.55 + 0.45 * Math.sin(t * (0.8 + A.hash(i + 7) * 1.6) + i);
        ctx.fillStyle = 'rgba(220,235,255,' + (0.25 + 0.55 * tw * A.hash(i + 21)) + ')';
        ctx.beginPath(); ctx.arc(sx, sy, 0.5 + A.hash(i + 13) * 1.1, 0, TAU); ctx.fill();
      }
      A.glow(ctx, W * 0.84, hz * 0.28, Math.min(W, H) * 0.2, '#cfe3ff', 0.2);
      ctx.fillStyle = '#eef4ff'; ctx.beginPath(); ctx.arc(W * 0.84, hz * 0.28, Math.min(W, H) * 0.03, 0, TAU); ctx.fill();
    } else {
      ctx.fillStyle = 'rgba(255,255,255,.75)';
      [[0.18, 0.2, 0.09], [0.6, 0.14, 0.11], [0.82, 0.3, 0.07]].forEach(function (c, k) {
        var cx = (c[0] * W + (o.cam || 0) * 0.03 * (k + 1)) % (W + 120) , cy = c[1] * hz, r = c[2] * Math.min(W, 600) * 0.6;
        ctx.beginPath(); ctx.ellipse(cx, cy, r * 1.5, r * 0.5, 0, 0, TAU); ctx.ellipse(cx - r * 0.5, cy - r * 0.2, r * 0.8, r * 0.5, 0, 0, TAU); ctx.ellipse(cx + r * 0.6, cy - r * 0.15, r * 0.7, r * 0.45, 0, 0, TAU); ctx.fill();
      });
    }
    return hz;
  };
  /* siluete de clădiri cu ferestre aprinse; o:{cam (px), h, seed, far} */
  A.skyline = function (ctx, W, yBase, o) {
    o = o || {};
    var P = RF.sim.palette(), cam = (o.cam || 0) * (o.far ? 0.25 : 0.5), maxH = o.h || 90, seed = o.seed || 0;
    var base = P.dark ? (o.far ? '#16305f' : '#0c1c40') : (o.far ? '#b6cde6' : '#92abc9');
    var x = -((cam % 400) + 400) % 400 - 40, i = 0;
    while (x < W + 60) {
      var bw = 26 + A.hash(i + seed) * 40, bh = maxH * (0.35 + A.hash(i + seed + 40) * 0.65);
      ctx.fillStyle = A.lin(ctx, 0, yBase - bh, 0, yBase, [[0, A.lighten(base, P.dark ? 0.08 : 0.15)], [1, base]]);
      ctx.fillRect(x, yBase - bh, bw, bh);
      if (P.dark && !o.far) {
        for (var wy = yBase - bh + 6; wy < yBase - 6; wy += 9) for (var wx = x + 4; wx < x + bw - 5; wx += 8) {
          if (A.hash(wx * 0.37 + wy * 0.91 + seed) > 0.55) { ctx.fillStyle = 'rgba(255,214,120,' + (0.35 + A.hash(wx + wy) * 0.5) + ')'; ctx.fillRect(wx, wy, 3.4, 4.2); }
        }
      }
      x += bw + 3 + A.hash(i + seed + 70) * 10; i++;
    }
  };
  /* sol (iarbă / pământ) sub linia y0 */
  A.ground = function (ctx, W, y0, H) {
    var P = RF.sim.palette();
    ctx.fillStyle = A.lin(ctx, 0, y0, 0, H, P.dark ? [[0, '#16233f'], [1, '#0a1226']] : [[0, '#a9bf93'], [1, '#86a073']]);
    ctx.fillRect(0, y0, W, H - y0);
  };
  /* șină și traverse; y = fața de sus a șinei; o.offset = deplasare (px) pentru efect de mișcare */
  A.track = function (ctx, x0, x1, y, o) {
    o = o || {};
    var P = RF.sim.palette(), off = o.offset || 0, gap = o.gap || 22;
    ctx.fillStyle = A.lin(ctx, 0, y, 0, y + 18, P.dark ? [[0, '#3a4258'], [1, '#232a3d']] : [[0, '#a0a7b4'], [1, '#7f8696']]);
    ctx.fillRect(x0, y + 3, x1 - x0, 15);
    ctx.fillStyle = P.dark ? '#4c3b34' : '#8a6a52';
    for (var sx = x0 - ((off % gap) + gap) % gap; sx < x1; sx += gap) ctx.fillRect(sx, y + 3, 9, 6);
    ctx.fillStyle = 'rgba(255,255,255,.06)';
    for (var q = 0; q < (x1 - x0) / 7; q++) ctx.fillRect(x0 + A.hash(q) * (x1 - x0), y + 10 + A.hash(q + 5) * 7, 2, 1.5);
    ctx.fillStyle = A.lin(ctx, 0, y - 1, 0, y + 4, [[0, '#f1f5fb'], [1, '#8b97ab']]);
    ctx.fillRect(x0, y - 1, x1 - x0, 4);
    ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillRect(x0, y - 1, x1 - x0, 1);
  };
  /* peron: suprafața la yTop; o:{h:24, lamp:true} */
  A.platform = function (ctx, x0, x1, yTop, o) {
    o = o || {};
    var P = RF.sim.palette(), h = o.h || 24;
    ctx.fillStyle = A.lin(ctx, 0, yTop, 0, yTop + h, P.dark ? [[0, '#566079'], [1, '#2f3750']] : [[0, '#c6ccd8'], [1, '#98a0b2']]);
    ctx.fillRect(x0, yTop, x1 - x0, h);
    ctx.fillStyle = P.dark ? '#7c879f' : '#dfe4ec'; ctx.fillRect(x0, yTop, x1 - x0, 3);
    ctx.fillStyle = '#f2c231'; ctx.fillRect(x0, yTop + 3, x1 - x0, 3);
    ctx.fillStyle = 'rgba(0,0,0,.18)'; for (var sx = x0 + 30; sx < x1; sx += 46) ctx.fillRect(sx, yTop + 8, 1.5, h - 8);
  };
  /* stâlp de iluminat cu lumină caldă */
  A.lamp = function (ctx, x, yBase, h) {
    var P = RF.sim.palette();
    ctx.fillStyle = A.lin(ctx, x - 2, 0, x + 2, 0, [[0, '#6a7490'], [1, '#2b3249']]);
    ctx.fillRect(x - 1.8, yBase - h, 3.6, h);
    ctx.fillStyle = '#2b3249'; A.rrPath(ctx, x - 7, yBase - h - 3, 14, 6, 3); ctx.fill();
    if (P.dark) { A.glow(ctx, x, yBase - h + 5, h * 0.7, '#ffd98a', 0.45); ctx.fillStyle = '#fff0c4'; ctx.beginPath(); ctx.ellipse(x, yBase - h + 1, 5, 2, 0, 0, TAU); ctx.fill(); }
  };

  /* ======================= săgeți și etichete ======================= */
  /* vector gros cu gradient + halou; o:{color, w, label, labelPos:'above'|'below'|'end', fade:true, glow:true, size} */
  A.vector = function (ctx, x0, y0, x1, y1, o) {
    o = o || {};
    var P = RF.sim.palette(), col = o.color || P.acc, w = o.w || 7, len = Math.hypot(x1 - x0, y1 - y0);
    if (len < 3) return;
    var a = Math.atan2(y1 - y0, x1 - x0), hl = Math.min(len * 0.7, w * 2.5), hw = w * 2.1;
    ctx.save();
    ctx.translate(x0, y0); ctx.rotate(a);
    var g = ctx.createLinearGradient(0, 0, len, 0);
    g.addColorStop(0, D.rgba(col, o.fade === false ? 1 : 0.3)); g.addColorStop(1, col);
    if (o.glow !== false) { ctx.shadowColor = D.rgba(col, 0.7); ctx.shadowBlur = 12; }
    ctx.fillStyle = g;
    A.rrPath(ctx, 0, -w / 2, Math.max(len - hl + 3, 0.5), w, w / 2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(len, 0); ctx.lineTo(len - hl, -hw / 2); ctx.lineTo(len - hl * 0.8, 0); ctx.lineTo(len - hl, hw / 2); ctx.closePath();
    ctx.fillStyle = col; ctx.strokeStyle = col; ctx.lineJoin = 'round'; ctx.lineWidth = 2.4; ctx.fill(); ctx.stroke();
    ctx.restore();
    if (o.label) {
      var pos = o.labelPos || 'above', mx = (x0 + x1) / 2, my = (y0 + y1) / 2;
      if (pos === 'above') A.chip(ctx, o.label, mx, my - w - 13, { color: P.tx, dot: col, align: 'center', size: o.size });
      else if (pos === 'below') A.chip(ctx, o.label, mx, my + w + 13, { color: P.tx, dot: col, align: 'center', size: o.size });
      else A.chip(ctx, o.label, x1 + 10, y1, { color: P.tx, dot: col, size: o.size });
    }
  };
  /* etichetă rotunjită cu punct colorat; întoarce {x,y,w,h}; o:{color, dot, bg, border, size, align:'left'|'center'|'right'} */
  A.chip = function (ctx, text, x, y, o) {
    o = o || {};
    var P = RF.sim.palette(), size = o.size || 12;
    ctx.save();
    ctx.font = D.font(size, 650);
    var tw = ctx.measureText(text).width, padX = 9, hh = size + 11, dotW = o.dot ? 13 : 0, w = tw + padX * 2 + dotW;
    var bx = o.align === 'center' ? x - w / 2 : o.align === 'right' ? x - w : x, by = y - hh / 2;
    ctx.shadowColor = 'rgba(0,0,0,.28)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 2;
    D.fillRR(ctx, bx, by, w, hh, hh / 2, o.bg || D.rgba(P.card, 0.94), o.border || D.rgba(o.dot || P.line2, 0.8), 1);
    ctx.shadowColor = 'transparent';
    if (o.dot) { ctx.fillStyle = o.dot; ctx.beginPath(); ctx.arc(bx + 11, y, 3.6, 0, TAU); ctx.fill(); }
    ctx.fillStyle = o.color || P.tx; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    ctx.fillText(text, bx + padX + dotW, y + 0.5);
    ctx.restore();
    return { x: bx, y: by, w: w, h: hh };
  };
  /* semn de întrebare / verificare / interzis desenat frumos */
  A.badge = function (ctx, kind, x, y, r) {
    var P = RF.sim.palette(), col = kind === 'ok' ? P.good : kind === 'no' ? P.bad : P.warn;
    ctx.save();
    ctx.shadowColor = D.rgba(col, 0.6); ctx.shadowBlur = 10;
    ctx.fillStyle = A.lin(ctx, x, y - r, x, y + r, [[0, A.lighten(col, 0.25)], [1, A.darken(col, 0.2)]]);
    A.circle(ctx, x, y, r); ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = '#fff'; ctx.lineWidth = Math.max(2, r * 0.22); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath();
    if (kind === 'ok') { ctx.moveTo(x - r * 0.42, y + r * 0.02); ctx.lineTo(x - r * 0.1, y + r * 0.34); ctx.lineTo(x + r * 0.45, y - r * 0.32); }
    else if (kind === 'no') { ctx.moveTo(x - r * 0.35, y - r * 0.35); ctx.lineTo(x + r * 0.35, y + r * 0.35); ctx.moveTo(x + r * 0.35, y - r * 0.35); ctx.lineTo(x - r * 0.35, y + r * 0.35); }
    else { ctx.fillStyle = '#fff'; ctx.font = '800 ' + (r * 1.3) + 'px system-ui,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('?', x, y + r * 0.06); }
    ctx.stroke();
    ctx.restore();
  };

  /* ======================= scene gata făcute ======================= */
  /* scenă de zi/noapte cu cer, orizont, sol și șină. Întoarce {groundY, railY}. o:{cam, t, rails:true} */
  A.sceneGround = function (ctx, W, H, o) {
    o = o || {};
    var hz = H * 0.74, railY = H * 0.9;
    A.sky(ctx, W, H, { horizon: hz, t: o.t, cam: o.cam });
    A.skyline(ctx, W, hz + 2, { cam: o.cam, h: H * 0.2, far: true, seed: 11 });
    A.skyline(ctx, W, hz + 2, { cam: o.cam, h: H * 0.13, seed: 3 });
    A.ground(ctx, W, hz, H);
    if (o.rails !== false) A.track(ctx, 0, W, railY, { offset: -(o.cam || 0) });
    return { groundY: hz, railY: railY };
  };

  /* traseu de lumină (polilinie) cu halou și săgeți mici; pts=[[x,y],…]; o:{color,w,dash,arrows:true} */
  A.zigzag = function (ctx, pts, o) {
    o = o || {};
    var P = RF.sim.palette(), col = o.color || P.light, w = o.w || 3;
    if (!pts || pts.length < 2) return;
    pts = pts.map(function (q) { return Array.isArray(q) ? q : [q.x, q.y]; });
    ctx.save();
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    function path() { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (var i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); }
    if (!o.dash) { ctx.strokeStyle = D.rgba(col, 0.25); ctx.lineWidth = w + 7; path(); ctx.stroke(); }
    if (o.dash) ctx.setLineDash(o.dash);
    ctx.strokeStyle = col; ctx.lineWidth = w; path(); ctx.stroke();
    ctx.setLineDash([]);
    if (o.arrows !== false) {
      ctx.fillStyle = col;
      for (var k = 1; k < pts.length; k++) {
        var x0 = pts[k - 1][0], y0 = pts[k - 1][1], x1 = pts[k][0], y1 = pts[k][1], L = Math.hypot(x1 - x0, y1 - y0);
        if (L < 40) continue;
        var a = Math.atan2(y1 - y0, x1 - x0), mx = x0 + (x1 - x0) * 0.6, my = y0 + (y1 - y0) * 0.6, s = w * 2.2;
        ctx.beginPath(); ctx.moveTo(mx + Math.cos(a) * s, my + Math.sin(a) * s);
        ctx.lineTo(mx + Math.cos(a + 2.5) * s, my + Math.sin(a + 2.5) * s); ctx.lineTo(mx + Math.cos(a - 2.5) * s, my + Math.sin(a - 2.5) * s); ctx.closePath(); ctx.fill();
      }
    }
    ctx.restore();
  };
  /* electron (sferă albastră cu „−”) și ion (sferă portocalie cu „+”) */
  A.electron = function (ctx, x, y, r, o) {
    A.glow(ctx, x, y, r * 2.8, '#4cc9f0', 0.5);
    A.sphere(ctx, x, y, r, '#2f9bff');
    ctx.strokeStyle = 'rgba(255,255,255,.95)'; ctx.lineWidth = Math.max(1.2, r * 0.18); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x - r * 0.42, y); ctx.lineTo(x + r * 0.42, y); ctx.stroke();
  };
  A.ion = function (ctx, x, y, r, o) {
    A.sphere(ctx, x, y, r, (o && o.color) || '#ff7a59');
    ctx.strokeStyle = 'rgba(255,255,255,.95)'; ctx.lineWidth = Math.max(1.2, r * 0.18); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x - r * 0.42, y); ctx.lineTo(x + r * 0.42, y); ctx.moveTo(x, y - r * 0.42); ctx.lineTo(x, y + r * 0.42); ctx.stroke();
  };

  /* ======================= galerie (previzualizare pentru dezvoltare) ======================= */
  A.gallery.push({
    name: 'Ana & Bogdan', w: 420, h: 250, draw: function (ctx, W, H, t) {
      var P = RF.sim.palette(); D.clear({ ctx: ctx, W: W, H: H });
      A.sceneGround(ctx, W, H, { t: t, rails: false });
      var gy = H * 0.9;
      A.person(ctx, W * 0.22, gy, H * 0.62, A.ana({ pose: 'wave', wave: true, t: t, badge: 'S' }));
      A.person(ctx, W * 0.5, gy, H * 0.62, A.bogdan({ pose: 'throw', t: t, seed: 2, badge: 'S′' }));
      A.person(ctx, W * 0.78, gy, H * 0.62, { skin: A.skin[2], hair: A.hairc[2], hairStyle: 'cap', shirt: '#8a5cff', pose: 'point', t: t, seed: 5, facing: -1 });
    }
  });
  A.gallery.push({
    name: 'Tren (cutaway)', w: 560, h: 250, draw: function (ctx, W, H, t) {
      var sc = A.sceneGround(ctx, W, H, { t: t, cam: t * 60 });
      var tr = A.train(ctx, W * 0.06, sc.railY, {
        w: W * 0.88, cars: 2, cutaway: true, speed: 0.8, phase: t * 14,
        interior: function (c, info, i) {
          var u = info.h * 0.62 / 100;
          if (i === 1) A.person(c, info.x0 + (info.x1 - info.x0) * 0.35, info.floorY, info.h * 0.62, A.bogdan({ pose: 'throw', t: t, shadow: false, hair: A.hairc[3] }));
          else A.person(c, info.x0 + (info.x1 - info.x0) * 0.5, info.floorY, info.h * 0.62, A.ana({ still: false, t: t, shadow: false, pose: 'stand' }));
        }
      });
    }
  });
  A.gallery.push({
    name: 'Persoane (detaliu)', w: 420, h: 300, draw: function (ctx, W, H, t) {
      D.clear({ ctx: ctx, W: W, H: H });
      var P = RF.sim.palette();
      ctx.fillStyle = A.lin(ctx, 0, 0, 0, H, P.dark ? [[0, '#16254a'], [1, '#0b1430']] : [[0, '#dfeeff'], [1, '#bcd3ee']]); ctx.fillRect(0, 0, W, H);
      A.person(ctx, W * 0.3, H * 0.96, H * 0.88, A.ana({ pose: 'point', t: t, badge: 'S' }));
      A.person(ctx, W * 0.7, H * 0.96, H * 0.88, A.bogdan({ pose: 'hold', t: t, badge: 'S′', mouth: 'o', worried: true,
        holdR: function (c, x, y, u) { A.ball(c, x + 4 * u, y - 2 * u, 7 * u, { angle: t * 3 }); } }));
    }
  });
  A.gallery.push({
    name: 'Tren 1 vagon (cutaway)', w: 560, h: 260, draw: function (ctx, W, H, t) {
      var sc = A.sceneGround(ctx, W, H, { t: t, cam: t * 70 });
      var tx = ((t * 90) % (W * 1.8)) - W * 0.7;
      A.train(ctx, tx, sc.railY, {
        h: H * 0.42, cars: 1, cutaway: true, speed: 0.9, phase: t * 16,
        interior: function (c, info) {
          A.person(c, info.x0 + (info.x1 - info.x0) * 0.4, info.floorY, info.h * 0.74, A.bogdan({ pose: 'throw', t: t, shadow: false, badge: 'S′' }));
          A.ball(c, info.x0 + (info.x1 - info.x0) * (0.55 + 0.35 * ((t * 0.7) % 1)), info.floorY - info.h * 0.55, info.h * 0.045, { angle: t * 9 });
        }
      });
      A.person(ctx, W * 0.82, sc.railY + 20, H * 0.5, A.ana({ pose: 'wave', wave: true, t: t, badge: 'S', facing: -1 }));
    }
  });
  A.gallery.push({
    name: 'Tren (ferestre)', w: 560, h: 220, draw: function (ctx, W, H, t) {
      var sc = A.sceneGround(ctx, W, H, { t: t, cam: -t * 20 });
      A.train(ctx, W * 0.05, sc.railY, { w: W * 0.9, cars: 3, accent: RF.sim.palette().s1, phase: t * 6, speed: 0.3 });
    }
  });
  A.gallery.push({
    name: 'Vectori și etichete', w: 420, h: 200, draw: function (ctx, W, H, t) {
      var P = RF.sim.palette(); D.clear({ ctx: ctx, W: W, H: H });
      A.vector(ctx, 30, 50, W - 60, 50, { color: P.s1, label: 'Trenul față de peron: 100 km/h' });
      A.vector(ctx, 30, 110, 150, 110, { color: P.s2, label: 'Mingea: 20 km/h' });
      A.vector(ctx, 30, 165, W - 120, 165, { color: P.good, label: 'Peronul măsoară: 120 km/h', labelPos: 'below' });
      A.badge(ctx, 'ok', W - 40, 40, 14); A.badge(ctx, 'no', W - 40, 90, 14); A.badge(ctx, 'q', W - 40, 140, 14);
      A.ball(ctx, W - 100, 100, 12, { angle: t * 5 });
    }
  });
})(window);
