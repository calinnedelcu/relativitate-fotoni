/* ==========================================================================
   RF.art — modulul „spațiu”  (art-space.js)
   Scene cosmice: fundal, rachetă, stație, planete, stea, astronaut, capsulă, dungi de viteză.
   Scenele cosmice rămân ÎNTUNECATE în ambele teme (sunt „poze”). Luminile (flăcări, halouri)
   sunt aditive. Culorile materialelor sunt fixe; accentele vin din paletă (S = P.s1, S′ = P.s2).
   Toate funcțiile: A.nume(ctx, x, y, mărime, o) · desenează în pixeli CSS · întorc ancore în
   coordonate canvas · nu aruncă erori la opțiuni lipsă · îngheață animația când RF.reduced.

   --- REFERINȚĂ RAPIDĂ (detalii în comentariul fiecărei funcții) ---------------------------
   A.space(ctx, W, H, o)        fundal; o:{cam, t, nebula:true, vignette:true}
   A.rocket(ctx, x, y, w, o)    navă spre dreapta, (x,y)=centrul corpului; o:{accent, thrust, t, pilot, cabin,
                                fins, label, facing, portholes, flame}
                                → {nose, tail, muzzle, window:{x,y,r}, top, bottom, engine, flameTip, h, w}
   A.station(ctx, x, y, w, o)   stație, (x,y)=centru; o:{observer, accent, t, label, angle, panels}
                                → {window:{x,y,r}, top, antenna, beacon, left, right, bottom, hub, h, w}
   A.planet(ctx, x, y, r, o)    o:{kind:'earth'|'moon'|'mars'|'gas'|'ice', t, light, rot, ring, atmosphere}
   A.star(ctx, x, y, r, o)      o:{color, t, rays}
   A.astronaut(ctx, x, y, h, o) (x,y)=tălpi (sau centru la pose:'float'); ancore ca la A.person
   A.pod(ctx, x, y, w, o)       capsulă / proiectil spre dreapta, (x,y)=centru; o:{color, thrust, t, facing, label}
   A.speedLines(ctx, x, y, len, o)  dungi spre stânga lui (x,y); o:{n, spread, alpha, color, t, w}
   ========================================================================== */
(function (global) {
  'use strict';
  var RF = global.RF;
  if (!RF || !RF.art || !RF.art.lin) return;           // art.js trebuie încărcat înaintea acestui fișier
  var A = RF.art, D = RF.draw;
  A.gallery = A.gallery || [];

  var PI = Math.PI, TAU = PI * 2, RAD = PI / 180;
  var sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt, abs = Math.abs, min = Math.min, max = Math.max, floor = Math.floor;

  /* ======================= utilitare private ======================= */
  function num(v, d) { return typeof v === 'number' && isFinite(v) ? v : d; }
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function T(o) { return RF.reduced ? 0 : num(o && o.t, 0); }          // timpul de animație (0 când RF.reduced)
  function fract(v) { return v - floor(v); }
  function hsh(i) { return A.hash(i); }
  function rgba(c, a) { return D.rgba(c, a); }
  function pal() { return RF.sim.palette(); }

  /* halou aditiv (scenele cosmice sunt mereu întunecate → „lighter” în ambele teme) */
  function glow(ctx, x, y, r, color, a) {
    if (!(r > 0.5) || !(a > 0)) return;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    var g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, rgba(color, a));
    g.addColorStop(0.2, rgba(color, a * 0.62));
    g.addColorStop(0.45, rgba(color, a * 0.26));
    g.addColorStop(0.75, rgba(color, a * 0.07));
    g.addColorStop(1, rgba(color, 0));
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
    ctx.restore();
  }
  function ell(ctx, x, y, rx, ry, rot) { ctx.beginPath(); ctx.ellipse(x, y, max(0.01, rx), max(0.01, ry), rot || 0, 0, TAU); }
  function rr(ctx, x, y, w, h, r) { D.rrect(ctx, x, y, w, h, r); }
  /* cilindru (capsulă) gradat perpendicular pe axă, lumina din stânga-sus */
  function cyl(ctx, x0, y0, x1, y1, wd, c0, c1, c2) {
    var dx = x1 - x0, dy = y1 - y0, len = sqrt(dx * dx + dy * dy) || 1, nx = -dy / len, ny = dx / len;
    if (nx + ny > 0) { nx = -nx; ny = -ny; }                        // normala spre lumină (stânga-sus)
    var mx = (x0 + x1) / 2, my = (y0 + y1) / 2, k = wd / 2;
    ctx.fillStyle = A.lin(ctx, mx + nx * k, my + ny * k, mx - nx * k, my - ny * k, [[0, c0], [0.5, c1], [1, c2]]);
    A.capsule(ctx, x0, y0, x1, y1, wd); ctx.fill();
  }
  /* fâșie de lumină pe un cilindru (luciu) */
  function cylShine(ctx, x0, y0, x1, y1, wd, a) {
    var dx = x1 - x0, dy = y1 - y0, len = sqrt(dx * dx + dy * dy) || 1, nx = -dy / len, ny = dx / len;
    if (nx + ny > 0) { nx = -nx; ny = -ny; }
    var sh = wd * 0.26, ux = dx / len, uy = dy / len, cut = min(len * 0.22, wd * 0.5);
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,' + (a == null ? 0.5 : a) + ')'; ctx.lineWidth = max(0.8, wd * 0.15); ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x0 + nx * sh + ux * cut, y0 + ny * sh + uy * cut);
    ctx.lineTo(x1 + nx * sh - ux * cut, y1 + ny * sh - uy * cut);
    ctx.stroke(); ctx.restore();
  }

  /* ==========================================================================
     A.space(ctx, W, H, o) — fundal de spațiu adânc (mereu întunecat)
       o.cam      px (număr) sau {x,y}: deplasarea camerei; 3 straturi de stele (0,15 / 0,35 / 0,70) și nebuloasa (0,05)
       o.t        secunde → scânteierea stelelor
       o.nebula   true (implicit) – pete moi violet/cyan/magenta
       o.vignette true (implicit) – margini întunecate
     Desenează tot canvasul W×H. Întoarce {W,H}.
     ========================================================================== */
  var STARCOL = ['#ffffff', '#e4eeff', '#cfe0ff', '#fff3dc', '#ffe0b0', '#b9cfff'];
  var LAYERS = [
    { k: 0.15, d: 0.00034, r0: 0.40, r1: 0.78, a0: 0.28, a1: 0.58, s: 1000, tw: 0.10 },
    { k: 0.35, d: 0.00019, r0: 0.62, r1: 1.08, a0: 0.45, a1: 0.85, s: 2000, tw: 0.26 },
    { k: 0.70, d: 0.00008, r0: 0.92, r1: 1.55, a0: 0.62, a1: 1.00, s: 3000, tw: 0.40 }
  ];
  var starCache = {}, starCacheN = 0;
  function starsFor(W, H) {
    var key = Math.round(W) + 'x' + Math.round(H), c = starCache[key];
    if (c) return c;
    if (starCacheN > 12) { starCache = {}; starCacheN = 0; }
    c = { layers: [], glints: [] };
    for (var L = 0; L < LAYERS.length; L++) {
      var ly = LAYERS[L], n = Math.round(W * H * ly.d) + 8, groups = {}, tw = [];
      for (var i = 0; i < n; i++) {
        var h = ly.s + i * 11;
        var s = {
          x: hsh(h) * W, y: hsh(h + 1) * H, r: ly.r0 + hsh(h + 2) * (ly.r1 - ly.r0), a: ly.a0 + hsh(h + 3) * (ly.a1 - ly.a0),
          c: floor(hsh(h + 4) * STARCOL.length), tw: hsh(h + 5) < ly.tw, ts: 0.7 + hsh(h + 6) * 1.9, tp: hsh(h + 7) * TAU
        };
        if (L === 2 && s.r > 1.38 && c.glints.length < 9) { s.glint = true; s.tw = true; c.glints.push(s); continue; }
        if (s.tw) { tw.push(s); continue; }
        var gk = s.c + '|' + floor(s.a * 4), g = groups[gk];
        if (!g) g = groups[gk] = { col: STARCOL[s.c], a: (floor(s.a * 4) + 0.5) / 4, list: [] };
        g.list.push(s);
      }
      var arr = []; for (var k in groups) arr.push(groups[k]);
      c.layers.push({ groups: arr, tw: tw, k: ly.k });
    }
    starCache[key] = c; starCacheN++;
    return c;
  }
  function glintSprite() {
    return A.cached('space.glint', 40, 40, function (c, w, h) {
      c.translate(w / 2, h / 2);
      var g = c.createRadialGradient(0, 0, 0, 0, 0, w / 2);
      g.addColorStop(0, 'rgba(255,255,255,.95)'); g.addColorStop(0.1, 'rgba(235,243,255,.6)');
      g.addColorStop(0.35, 'rgba(190,215,255,.14)'); g.addColorStop(1, 'rgba(190,215,255,0)');
      c.fillStyle = g; c.fillRect(-w / 2, -h / 2, w, h);
      for (var k = 0; k < 2; k++) {
        c.save(); c.rotate(k * PI / 2);
        var lg = c.createLinearGradient(-w / 2, 0, w / 2, 0);
        lg.addColorStop(0, 'rgba(255,255,255,0)'); lg.addColorStop(0.5, 'rgba(255,255,255,.95)'); lg.addColorStop(1, 'rgba(255,255,255,0)');
        c.fillStyle = lg; c.beginPath(); c.moveTo(-w / 2, 0); c.lineTo(0, -1.2); c.lineTo(w / 2, 0); c.lineTo(0, 1.2); c.closePath(); c.fill();
        c.restore();
      }
    });
  }
  var NEB = [
    { u: 0.10, v: 0.20, r: 0.62, k: 0.56, a: -0.35, c: '#6b3fd4', al: 0.24 },
    { u: 0.92, v: 0.84, r: 0.58, k: 0.55, a: 0.45, c: '#1e9ad8', al: 0.17 },
    { u: 0.62, v: 0.04, r: 0.40, k: 0.60, a: 0.15, c: '#c24ba6', al: 0.11 },
    { u: 0.34, v: 0.98, r: 0.46, k: 0.52, a: -0.15, c: '#3a55dc', al: 0.15 },
    { u: -0.38, v: 0.55, r: 0.52, k: 0.60, a: 0.20, c: '#5b3fc8', al: 0.15 },
    { u: 1.38, v: 0.28, r: 0.52, k: 0.55, a: -0.30, c: '#2a8fd0', al: 0.13 }
  ];
  function paintNebula(ctx, W, H, cx, cy, t) {
    var Lb = max(W, H), per = 2.2 * Lb;
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (var i = 0; i < NEB.length; i++) {
      var b = NEB[i], bx = (((b.u * W - cx * 0.05 + 0.6 * W) % per) + per) % per - 0.6 * W, by = b.v * H - cy * 0.05, R = b.r * Lb;
      if (bx + R < 0 || bx - R > W) continue;
      ctx.save(); ctx.translate(bx, by); ctx.rotate(b.a + 0.05 * sin(t * 0.12 + i)); ctx.scale(1, b.k);
      var g = ctx.createRadialGradient(0, 0, 0, 0, 0, R);
      g.addColorStop(0, rgba(b.c, b.al)); g.addColorStop(0.42, rgba(b.c, b.al * 0.48)); g.addColorStop(0.75, rgba(b.c, b.al * 0.14)); g.addColorStop(1, rgba(b.c, 0));
      ctx.fillStyle = g; ctx.fillRect(-R, -R, 2 * R, 2 * R);
      // nucleu mai luminos, pentru structură
      var g2 = ctx.createRadialGradient(R * 0.12, -R * 0.08, 0, R * 0.12, -R * 0.08, R * 0.42);
      g2.addColorStop(0, rgba(A.lighten(b.c, 0.35), b.al * 0.55)); g2.addColorStop(1, rgba(b.c, 0));
      ctx.fillStyle = g2; ctx.fillRect(-R, -R, 2 * R, 2 * R);
      ctx.restore();
    }
    ctx.restore();
  }
  A.space = function (ctx, W, H, o) {
    o = o || {}; W = max(1, num(W, 400)); H = max(1, num(H, 300));
    var t = T(o), cx = 0, cy = 0;
    if (typeof o.cam === 'number') cx = num(o.cam, 0); else if (o.cam) { cx = num(o.cam.x, 0); cy = num(o.cam.y, 0); }
    ctx.save();
    ctx.fillStyle = A.lin(ctx, 0, 0, W * 0.4, H, [[0, '#03050e'], [0.5, '#070b21'], [1, '#0d1334']]);
    ctx.fillRect(0, 0, W, H);
    if (o.nebula !== false) paintNebula(ctx, W, H, cx, cy, t);

    var S = starsFor(W, H), li, gi, si, s, px, py, g, lay;
    for (li = 0; li < S.layers.length; li++) {
      lay = S.layers[li];
      for (gi = 0; gi < lay.groups.length; gi++) {
        g = lay.groups[gi];
        ctx.fillStyle = rgba(g.col, g.a);
        ctx.beginPath();
        for (si = 0; si < g.list.length; si++) {
          s = g.list[si];
          px = (s.x - cx * lay.k) % W; if (px < 0) px += W;
          py = (s.y - cy * lay.k) % H; if (py < 0) py += H;
          if (s.r < 0.85) ctx.rect(px - s.r, py - s.r, s.r * 2, s.r * 2);
          else { ctx.moveTo(px + s.r, py); ctx.arc(px, py, s.r, 0, TAU); }
        }
        ctx.fill();
      }
      for (si = 0; si < lay.tw.length; si++) {
        s = lay.tw[si];
        px = (s.x - cx * lay.k) % W; if (px < 0) px += W;
        py = (s.y - cy * lay.k) % H; if (py < 0) py += H;
        var a = s.a * (0.62 + 0.38 * sin(t * s.ts + s.tp));
        ctx.fillStyle = rgba(STARCOL[s.c], a);
        ctx.beginPath(); ctx.arc(px, py, s.r, 0, TAU); ctx.fill();
      }
    }
    // „scântei” (stelele mari, cu raze în cruce)
    var spr = glintSprite(), kk = LAYERS[2].k;
    ctx.globalCompositeOperation = 'lighter';
    for (si = 0; si < S.glints.length; si++) {
      s = S.glints[si];
      px = (s.x - cx * kk) % W; if (px < 0) px += W;
      py = (s.y - cy * kk) % H; if (py < 0) py += H;
      var sz = 13 + s.r * 8, pu = 0.6 + 0.4 * sin(t * s.ts * 0.8 + s.tp);
      ctx.globalAlpha = clamp(0.5 * s.a * pu + 0.3, 0, 1);
      ctx.drawImage(spr, px - sz / 2, py - sz / 2, sz, sz);
    }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';

    if (o.vignette !== false) {
      var vg = ctx.createRadialGradient(W / 2, H / 2, min(W, H) * 0.28, W / 2, H / 2, sqrt(W * W + H * H) * 0.56);
      vg.addColorStop(0, 'rgba(0,0,8,0)'); vg.addColorStop(0.6, 'rgba(1,2,12,.16)'); vg.addColorStop(1, 'rgba(0,0,6,.66)');
      ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
    }
    ctx.restore();
    return { W: W, H: H };
  };

  /* ==========================================================================
     A.star(ctx, x, y, r, o) — stea îndepărtată strălucitoare; (x,y)=centru, r=raza nucleului
       o.color  culoarea (implicit galben cald '#ffd77a') · o.t secunde (pulsație lentă + rotirea razelor)
       o.rays   true (implicit): raze lungi în cruce + 4 diagonale scurte · o.halo (implicit 1): factor pentru halou
     Întoarce {x,y,r}.
     ========================================================================== */
  A.star = function (ctx, x, y, r, o) {
    o = o || {}; r = max(0.8, num(r, 8));
    var t = T(o), col = o.color || '#ffd77a', hot = A.lighten(col, 0.82), halo = num(o.halo, 1);
    var pulse = 1 + 0.045 * sin(t * 1.9) + 0.02 * sin(t * 3.3 + 1);
    ctx.save();
    glow(ctx, x, y, r * 9 * halo * pulse, col, 0.20);
    glow(ctx, x, y, r * 3.8 * halo * pulse, col, 0.50);
    if (o.rays !== false) {
      ctx.globalCompositeOperation = 'lighter';
      var rot = t * 0.06 + num(o.angle, 0), kinds = [[0, 8.6, 0.30], [PI / 2, 8.6, 0.30], [PI / 4, 4.4, 0.20], [-PI / 4, 4.4, 0.20]];
      for (var i = 0; i < kinds.length; i++) {
        var K = kinds[i], len = r * K[1] * (0.94 + 0.06 * sin(t * 1.3 + i * 1.7)) * pulse, wd = r * K[2];
        ctx.save(); ctx.translate(x, y); ctx.rotate(rot + K[0]);
        var lg = ctx.createLinearGradient(-len, 0, len, 0);
        lg.addColorStop(0, rgba(col, 0)); lg.addColorStop(0.5, rgba(hot, i < 2 ? 0.95 : 0.7)); lg.addColorStop(1, rgba(col, 0));
        ctx.fillStyle = lg; ctx.beginPath(); ctx.moveTo(-len, 0); ctx.lineTo(0, -wd); ctx.lineTo(len, 0); ctx.lineTo(0, wd); ctx.closePath(); ctx.fill();
        ctx.restore();
      }
      ctx.globalCompositeOperation = 'source-over';
    }
    // coroană + nucleu
    var cg = ctx.createRadialGradient(x, y, r * 0.5, x, y, r * 2.4 * pulse);
    cg.addColorStop(0, rgba(col, 0.9)); cg.addColorStop(0.45, rgba(col, 0.28)); cg.addColorStop(1, rgba(col, 0));
    ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(x, y, r * 2.4 * pulse, 0, TAU); ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = A.rad(ctx, x, y, 0, r, [[0, '#ffffff'], [0.5, hot], [1, col]], x - r * 0.15, y - r * 0.18);
    ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
    ctx.restore();
    return { x: x, y: y, r: r };
  };

  /* ==========================================================================
     A.speedLines(ctx, x, y, len, o) — dungi de viteză care se întind spre STÂNGA lui (x,y)
       (x,y) = capătul din dreapta (de obicei coada obiectului), len = lungimea maximă
       o.n       număr de dungi (implicit 7) · o.spread înălțimea totală în px (implicit n·9)
       o.alpha   0..1 (implicit 0,55) · o.color (implicit alb-albăstrui) · o.w grosime (implicit 2,2)
       o.t       secunde → dungile „vibrează” ușor, ca un vânt
     Întoarce {x0 (capătul stâng), x1, y, spread}.
     ========================================================================== */
  A.speedLines = function (ctx, x, y, len, o) {
    o = o || {}; len = max(4, num(len, 120));
    var n = clamp(Math.round(num(o.n, 7)), 1, 24), spread = num(o.spread, n * 9), al = clamp(num(o.alpha, 0.55), 0, 1);
    var col = o.color || '#d6e8ff', wd = num(o.w, 2.2), t = T(o);
    ctx.save();
    for (var i = 0; i < n; i++) {
      var f = n === 1 ? 0.5 : i / (n - 1), yy = y + (f - 0.5) * spread + (hsh(i + 41) - 0.5) * (spread / n) * 0.5;
      var edge = 1 - abs(f - 0.5) * 1.15;                              // dungile din margine sunt mai scurte
      var sh = 0.88 + 0.12 * sin(t * (2.2 + hsh(i + 9) * 2.4) + hsh(i + 3) * TAU);
      var li = len * (0.42 + 0.58 * hsh(i + 17)) * clamp(edge, 0.35, 1) * sh;
      var gap = len * 0.02 + len * 0.06 * hsh(i + 29), xe = x - gap, xs = xe - li, w = wd * (0.7 + 0.6 * hsh(i + 5));
      var g = ctx.createLinearGradient(xs, 0, xe, 0);
      g.addColorStop(0, rgba(col, 0)); g.addColorStop(0.6, rgba(col, al * 0.55)); g.addColorStop(1, rgba(col, al));
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.moveTo(xs, yy); ctx.lineTo(xe - w * 0.5, yy - w * 0.5); ctx.arc(xe - w * 0.5, yy, w * 0.5, -PI / 2, PI / 2); ctx.closePath(); ctx.fill();
    }
    ctx.restore();
    return { x0: x - len, x1: x, y: y, spread: spread };
  };

  /* ======================= flacără (comună rachetei și capsulei) ======================= */
  /* (x,y) = ieșirea duzei; flacăra se întinde spre stânga; len lungime, wid lățimea la duză, th 0..1 */
  function drop(ctx, x, y, L, W, wob) {
    ctx.beginPath();
    ctx.moveTo(x, y - W / 2);
    ctx.bezierCurveTo(x - L * 0.30, y - W * 0.66, x - L * 0.72, y - W * 0.30 + wob * 0.4, x - L, y + wob);
    ctx.bezierCurveTo(x - L * 0.72, y + W * 0.30 + wob * 0.4, x - L * 0.30, y + W * 0.66, x, y + W / 2);
    ctx.closePath();
  }
  function flame(ctx, x, y, len, wid, th, t, base) {
    if (!(len > 1) || !(th > 0)) return;
    var fl = 1 + 0.07 * sin(t * 29) + 0.05 * sin(t * 47 + 1.3) + 0.03 * sin(t * 71 + 0.4);
    var L = len * fl, W = wid * (1 + 0.05 * sin(t * 33 + 0.7)), wob = sin(t * 19) * W * 0.07;
    var c0 = base || '#ff7424', c1 = A.mix(c0, '#ffd45e', 0.7), c2 = '#fff7dc';
    glow(ctx, x - L * 0.30, y, max(L * 1.0, W * 2.8), c0, 0.30 + 0.34 * th);
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    var ls = [[1, 1.0, c0, 0.92], [0.76, 0.7, c1, 0.95], [0.48, 0.4, c2, 1]];
    for (var i = 0; i < ls.length; i++) {
      var s = ls[i], ll = L * s[0];
      ctx.fillStyle = A.lin(ctx, x, 0, x - ll, 0, [[0, rgba(s[2], s[3])], [0.55, rgba(s[2], s[3] * 0.62)], [1, rgba(s[2], 0)]]);
      drop(ctx, x, y, ll, W * s[1], wob * s[0]); ctx.fill();
    }
    if (th > 0.45) {                                                     // „diamante” de șoc
      for (var d = 0; d < 3; d++) {
        var u = 0.17 + d * 0.2, dx = x - L * u;
        ctx.fillStyle = rgba('#ffffff', 0.5 * th * (1 - u));
        ell(ctx, dx, y, L * 0.05, W * (0.13 - d * 0.025), 0); ctx.fill();
      }
    }
    var ne = Math.round(3 + 5 * th);                                     // scântei
    for (var e = 0; e < ne; e++) {
      var uu = fract(t * (0.55 + hsh(e + 61) * 0.5) + hsh(e + 71)), px = x - L * (0.45 + 0.85 * uu), py = y + (hsh(e + 81) - 0.5) * W * (0.5 + 1.1 * uu);
      ctx.fillStyle = rgba(c1, 0.9 * (1 - uu));
      ctx.beginPath(); ctx.arc(px, py, max(0.5, W * 0.045 * (1 - uu * 0.6)), 0, TAU); ctx.fill();
    }
    ctx.restore();
  }

  /* ==========================================================================
     A.rocket(ctx, x, y, w, o) — navă spațială orizontală, cu botul spre DREAPTA
       (x,y) = centrul corpului · w = lungimea totală (de la ieșirea duzei la vârful botului), înălțimea ≈ 0,31·w
       o.accent    culoarea benzii, botului și aripioarelor (implicit P.s2 = roz, S′)
       o.thrust    0..1 lungimea/luminozitatea flăcării (implicit 0,6; 0 = fără flacără)
       o.t         secunde → pâlpâirea flăcării
       o.pilot     true (implicit) = bustul lui Bogdan în hublou · false = cabină goală · obiect = opțiuni de persoană
                   {skin, hair, hairStyle, shirt (implicit accent), look}
       o.cabin     function(ctx, info) opțională: desenează în hublou (decupată în cerc; coordonate canvas); info={x,y,r}
       o.fins      true (implicit) aripioare sus/jos · o.portholes numărul de hublouri mici (implicit 2 dacă w ≥ 120)
       o.flame     culoarea flăcării (implicit portocaliu; ex. '#7fc8ff' pentru motor ionic)
       o.facing    1 (dreapta, implicit) | −1 (oglindit spre stânga)
       o.label     text într-un chip sub navă
     Întoarce {nose, tail, muzzle (puțin în fața botului), window:{x,y,r}, top, bottom, engine (ieșirea duzei),
               flameTip, h, w}  — toate în coordonate canvas.
     ========================================================================== */
  A.rocket = function (ctx, x, y, w, o) {
    o = o || {}; w = max(20, num(w, 200));
    var P = pal(), acc = o.accent || P.s2, t = T(o), th = clamp(num(o.thrust, 0.6), 0, 1), f = o.facing === -1 ? -1 : 1;
    var L = w, H = w * 0.31, fins = o.fins !== false;
    var xe = -0.50 * L, x0 = -0.43 * L, xs = -0.30 * L, xn = 0.04 * L, xt = 0.50 * L, xj = 0.17 * L;
    var wx = -0.015 * L, wy = -0.025 * H, R = 0.215 * H, gr = R * 0.78;
    var nph = o.portholes == null ? (w >= 120 ? 2 : 0) : clamp(Math.round(o.portholes), 0, 3);

    function hullPath() {
      ctx.beginPath();
      ctx.moveTo(x0, -0.27 * H);
      ctx.quadraticCurveTo(x0, -0.5 * H, xs, -0.5 * H);
      ctx.lineTo(xn, -0.5 * H);
      ctx.bezierCurveTo(xn + 0.30 * L, -0.5 * H, xt - 0.16 * L, -0.13 * H, xt, 0);
      ctx.bezierCurveTo(xt - 0.16 * L, 0.13 * H, xn + 0.30 * L, 0.5 * H, xn, 0.5 * H);
      ctx.lineTo(xs, 0.5 * H);
      ctx.quadraticCurveTo(x0, 0.5 * H, x0, 0.27 * H);
      ctx.closePath();
    }
    function finPath(s) {
      ctx.beginPath();
      ctx.moveTo(-0.07 * L, s * 0.40 * H); ctx.lineTo(-0.30 * L, s * 1.0 * H); ctx.lineTo(-0.405 * L, s * 1.0 * H); ctx.lineTo(-0.425 * L, s * 0.26 * H);
      ctx.closePath();
    }

    ctx.save();
    ctx.translate(x, y); ctx.scale(f, 1);

    /* flacără (în spate) */
    var flameLen = th > 0 ? L * (0.05 + 0.42 * th) : 0;
    if (th > 0) flame(ctx, xe + 0.004 * L, 0, flameLen, 0.5 * H, th, t, o.flame);

    /* aripioare */
    if (fins) {
      [-1, 1].forEach(function (s) {
        var dark = s > 0 ? 0.12 : 0;
        finPath(s);
        ctx.fillStyle = A.lin(ctx, 0, s * 1.0 * H, 0, s * 0.3 * H, [[0, A.lighten(acc, 0.12 - dark)], [1, A.darken(acc, 0.42 + dark)]]);
        ctx.fill();
        ctx.lineJoin = 'round'; ctx.lineWidth = max(1, 0.04 * H); ctx.strokeStyle = A.darken(acc, 0.2 + dark); ctx.stroke();
        // muchie luminoasă
        ctx.strokeStyle = 'rgba(255,255,255,' + (s < 0 ? 0.55 : 0.28) + ')'; ctx.lineWidth = max(0.8, 0.022 * H); ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(-0.075 * L, s * 0.44 * H); ctx.lineTo(-0.295 * L, s * 0.98 * H); ctx.stroke();
      });
    }

    /* duza */
    ctx.beginPath();
    ctx.moveTo(x0 + 0.01 * L, -0.17 * H);
    ctx.quadraticCurveTo(xe + 0.012 * L, -0.17 * H, xe, -0.285 * H);
    ctx.lineTo(xe, 0.285 * H);
    ctx.quadraticCurveTo(xe + 0.012 * L, 0.17 * H, x0 + 0.01 * L, 0.17 * H);
    ctx.closePath();
    ctx.fillStyle = A.lin(ctx, 0, -0.28 * H, 0, 0.28 * H, [[0, '#6b7893'], [0.4, '#3a4358'], [1, '#161b2c']]);
    ctx.fill();
    if (th > 0) {                                                       // gâtul duzei incandescent
      ctx.save(); ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = A.rad(ctx, xe + 0.01 * L, 0, 0, 0.26 * H, [[0, rgba('#fff2c6', 0.95 * th)], [0.5, rgba('#ff9a3c', 0.8 * th)], [1, rgba('#ff5a1f', 0)]]);
      ell(ctx, xe + 0.006 * L, 0, 0.03 * L, 0.26 * H, 0); ctx.fill(); ctx.restore();
    }
    ctx.fillStyle = A.lin(ctx, 0, -0.3 * H, 0, 0.3 * H, [[0, '#e8eef7'], [0.5, '#9aa7bf'], [1, '#4a546c']]);
    rr(ctx, xe - 0.004 * L, -0.30 * H, 0.016 * L + 1.5, 0.60 * H, 0.012 * L); ctx.fill();

    /* corpul */
    hullPath();
    ctx.fillStyle = A.lin(ctx, 0, -0.5 * H, 0, 0.5 * H, [[0, '#ffffff'], [0.38, '#eef2f9'], [0.72, '#c7d1e3'], [1, '#8f9db8']]);
    ctx.fill();
    ctx.save();
    hullPath(); ctx.clip();
    // umbră în spate (spre duză) și pe burtă
    ctx.fillStyle = A.lin(ctx, x0, 0, 0.0 * L, 0, [[0, 'rgba(25,35,75,.30)'], [1, 'rgba(25,35,75,0)']]); ctx.fillRect(x0 - 2, -H, 0.43 * L, 2 * H);
    ctx.fillStyle = A.lin(ctx, 0, 0.1 * H, 0, 0.5 * H, [[0, 'rgba(25,35,75,0)'], [1, 'rgba(25,35,75,.26)']]); ctx.fillRect(x0 - 2, 0.1 * H, L, 0.42 * H);
    // nasul colorat (separat printr-o cusătură curbă)
    ctx.beginPath();
    ctx.moveTo(xj, -0.62 * H); ctx.quadraticCurveTo(xj + 0.055 * L, 0, xj, 0.62 * H); ctx.lineTo(xt + 4, 0.62 * H); ctx.lineTo(xt + 4, -0.62 * H); ctx.closePath();
    ctx.fillStyle = A.lin(ctx, 0, -0.5 * H, 0, 0.5 * H, [[0, A.lighten(acc, 0.42)], [0.45, acc], [1, A.darken(acc, 0.42)]]); ctx.fill();
    ctx.fillStyle = A.lin(ctx, xj, 0, xt, 0, [[0, 'rgba(0,0,0,.20)'], [0.35, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,.0)']]);
    ctx.fill();
    // banda colorată
    ctx.fillStyle = A.lin(ctx, 0, 0.16 * H, 0, 0.32 * H, [[0, A.lighten(acc, 0.25)], [1, A.darken(acc, 0.28)]]);
    ctx.fillRect(x0 - 2, 0.16 * H, xj - x0 + 2, 0.15 * H);
    ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.fillRect(x0 - 2, 0.145 * H, xj - x0 + 2, max(0.8, 0.014 * H));
    // cusături
    ctx.strokeStyle = 'rgba(40,55,100,.20)'; ctx.lineWidth = max(0.7, 0.012 * H);
    [-0.255, -0.04, 0.115].forEach(function (u) {
      if (u > -0.05 - 0.0 && u < 0.0) return;
      ctx.beginPath(); ctx.moveTo(u * L, -0.5 * H); ctx.lineTo(u * L, 0.5 * H); ctx.stroke();
    });
    // luciu sus
    ctx.fillStyle = A.lin(ctx, xs, 0, xn + 0.25 * L, 0, [[0, 'rgba(255,255,255,0)'], [0.3, 'rgba(255,255,255,.7)'], [0.8, 'rgba(255,255,255,.5)'], [1, 'rgba(255,255,255,0)']]);
    rr(ctx, xs, -0.455 * H, xn + 0.25 * L - xs, 0.075 * H, 0.04 * H); ctx.fill();
    // luciu pe nas
    ctx.fillStyle = 'rgba(255,255,255,.38)';
    ctx.beginPath(); ctx.moveTo(xj + 0.045 * L, -0.40 * H); ctx.quadraticCurveTo(xj + 0.16 * L, -0.34 * H, xt - 0.07 * L, -0.07 * H);
    ctx.quadraticCurveTo(xj + 0.15 * L, -0.28 * H, xj + 0.04 * L, -0.31 * H); ctx.closePath(); ctx.fill();
    // hublouri mici
    for (var pi = 0; pi < nph; pi++) {
      var px = (-0.145 - pi * 0.1) * L, pr = 0.092 * H;
      ctx.fillStyle = A.lin(ctx, px - pr, -pr, px + pr, pr, [[0, '#eef3fb'], [1, '#6f7c94']]); A.circle(ctx, px, wy, pr * 1.18); ctx.fill();
      ctx.fillStyle = A.lin(ctx, 0, wy - pr, 0, wy + pr, [[0, '#fff0c0'], [1, '#ffc766']]); A.circle(ctx, px, wy, pr * 0.86); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.55)'; ell(ctx, px - pr * 0.25, wy - pr * 0.3, pr * 0.34, pr * 0.16, -0.7); ctx.fill();
    }
    ctx.restore();
    hullPath(); ctx.lineJoin = 'round'; ctx.strokeStyle = 'rgba(30,45,95,.32)'; ctx.lineWidth = 1; ctx.stroke();
    // cusătura nasului (linie de lumină)
    ctx.save(); hullPath(); ctx.clip();
    ctx.strokeStyle = 'rgba(255,255,255,.72)'; ctx.lineWidth = max(1, 0.02 * H);
    ctx.beginPath(); ctx.moveTo(xj, -0.6 * H); ctx.quadraticCurveTo(xj + 0.055 * L, 0, xj, 0.6 * H); ctx.stroke();
    ctx.restore();

    /* hublou mare */
    ctx.fillStyle = 'rgba(15,25,60,.28)'; A.circle(ctx, wx + R * 0.06, wy + R * 0.1, R * 1.1); ctx.fill();
    ctx.fillStyle = A.lin(ctx, wx - R, wy - R, wx + R, wy + R, [[0, '#fbfdff'], [0.45, '#c3cddf'], [1, '#6d7a93']]); A.circle(ctx, wx, wy, R); ctx.fill();
    ctx.fillStyle = A.lin(ctx, wx - R, wy - R, wx + R, wy + R, [[0, '#6f7c96'], [1, '#232b41']]); A.circle(ctx, wx, wy, R * 0.87); ctx.fill();
    ctx.strokeStyle = A.alpha(acc, 0.9); ctx.lineWidth = max(1, R * 0.06); A.circle(ctx, wx, wy, R * 0.93); ctx.stroke();
    ctx.save();
    A.circle(ctx, wx, wy, gr); ctx.clip();
    ctx.fillStyle = A.lin(ctx, 0, wy - gr, 0, wy + gr, [[0, '#fff3cf'], [1, '#ffd88a']]); ctx.fillRect(wx - gr, wy - gr, 2 * gr, 2 * gr);
    // pereți de cabină (ca să nu fie un gol)
    ctx.fillStyle = 'rgba(160,110,50,.22)'; ctx.fillRect(wx - gr, wy + gr * 0.62, 2 * gr, gr);
    ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(wx - gr, wy - gr * 0.9, 2 * gr, gr * 0.12);
    var pil = o.pilot == null ? true : o.pilot;
    if (pil) {
      var po = typeof pil === 'object' ? pil : {};
      A.bust(ctx, wx + gr * 0.03, wy + gr * 0.10, gr * 0.44, {
        skin: po.skin || A.skin[1], hair: po.hair || A.hairc[3], hairStyle: po.hairStyle || 'short', shirt: po.shirt || acc, look: num(po.look, 0.9)
      });
    }
    if (typeof o.cabin === 'function') {
      ctx.save(); ctx.scale(f, 1); ctx.translate(-x, -y);
      try { o.cabin(ctx, { x: x + f * wx, y: y + wy, r: gr }); } catch (err) { /* ignorăm */ }
      ctx.restore();
    }
    // sticlă: reflexii
    ctx.fillStyle = A.lin(ctx, wx - gr, wy - gr, wx + gr * 0.4, wy + gr * 0.4, [[0, 'rgba(255,255,255,.50)'], [1, 'rgba(255,255,255,0)']]);
    ctx.beginPath(); ctx.moveTo(wx - gr, wy - gr * 0.1); ctx.quadraticCurveTo(wx - gr * 0.55, wy - gr * 0.95, wx + gr * 0.45, wy - gr * 0.95);
    ctx.lineTo(wx + gr * 0.05, wy - gr * 0.55); ctx.quadraticCurveTo(wx - gr * 0.5, wy - gr * 0.5, wx - gr * 0.62, wy + gr * 0.2); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.28)'; ell(ctx, wx + gr * 0.5, wy + gr * 0.55, gr * 0.28, gr * 0.07, -0.75); ctx.fill();
    var ig = ctx.createRadialGradient(wx, wy, gr * 0.62, wx, wy, gr);
    ig.addColorStop(0, 'rgba(20,30,70,0)'); ig.addColorStop(1, 'rgba(20,30,70,.38)');
    ctx.fillStyle = ig; ctx.fillRect(wx - gr, wy - gr, 2 * gr, 2 * gr);
    ctx.restore();
    ctx.restore();

    if (o.label) A.chip(ctx, String(o.label), x, y + (fins ? 1.0 : 0.5) * H + 18, { align: 'center', dot: acc });

    return {
      nose: { x: x + f * xt, y: y }, tail: { x: x + f * xe, y: y }, muzzle: { x: x + f * (xt + 0.035 * L), y: y },
      window: { x: x + f * wx, y: y + wy, r: gr }, top: { x: x, y: y - (fins ? 1.0 : 0.5) * H }, bottom: { x: x, y: y + (fins ? 1.0 : 0.5) * H },
      engine: { x: x + f * xe, y: y }, flameTip: { x: x + f * (xe - flameLen), y: y }, h: H, w: L
    };
  };

  /* ==========================================================================
     A.pod(ctx, x, y, w, o) — capsulă / proiectil mic, botul spre DREAPTA; (x,y) = centru, w = lungimea totală
       o.color   culoarea botului și aripioarelor (implicit P.warn · galben-chihlimbar; proiectilul lansat de navă)
       o.thrust  0..1 flacăra (implicit 0,55) · o.t secunde · o.facing 1|−1 · o.label text în chip
       o.flame   culoarea flăcării
     Întoarce {nose, tail, top, bottom, center, flameTip, h, w}.
     ========================================================================== */
  A.pod = function (ctx, x, y, w, o) {
    o = o || {}; w = max(12, num(w, 60));
    var P = pal(), col = o.color || P.warn, t = T(o), th = clamp(num(o.thrust, 0.55), 0, 1), f = o.facing === -1 ? -1 : 1;
    var L = w, H = w * 0.30, xe = -0.50 * L, xb = -0.36 * L, xn = 0.10 * L, xt = 0.50 * L;
    ctx.save(); ctx.translate(x, y); ctx.scale(f, 1);
    var flameLen = th > 0 ? L * (0.05 + 0.45 * th) : 0;
    if (th > 0) flame(ctx, xe + 0.004 * L, 0, flameLen, 0.52 * H, th, t, o.flame);
    // aripioare
    [-1, 1].forEach(function (s) {
      ctx.beginPath(); ctx.moveTo(-0.14 * L, s * 0.40 * H); ctx.lineTo(-0.38 * L, s * 0.98 * H); ctx.lineTo(-0.47 * L, s * 0.98 * H); ctx.lineTo(-0.45 * L, s * 0.30 * H); ctx.closePath();
      ctx.fillStyle = A.lin(ctx, 0, s * 1.0 * H, 0, s * 0.3 * H, [[0, A.lighten(col, 0.1 - (s > 0 ? 0.1 : 0))], [1, A.darken(col, 0.45)]]); ctx.fill();
      ctx.lineJoin = 'round'; ctx.lineWidth = max(1, 0.05 * H); ctx.strokeStyle = A.darken(col, 0.22); ctx.stroke();
    });
    // duză
    ctx.fillStyle = A.lin(ctx, 0, -0.3 * H, 0, 0.3 * H, [[0, '#66738e'], [0.5, '#363f55'], [1, '#161b2c']]);
    ctx.beginPath(); ctx.moveTo(xb, -0.26 * H); ctx.lineTo(xe, -0.34 * H); ctx.lineTo(xe, 0.34 * H); ctx.lineTo(xb, 0.26 * H); ctx.closePath(); ctx.fill();
    if (th > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = rgba('#ffb35a', 0.8 * th); ell(ctx, xe + 0.004 * L, 0, 0.02 * L, 0.26 * H, 0); ctx.fill(); ctx.restore(); }
    // corp
    function body() {
      ctx.beginPath();
      ctx.moveTo(xb - 0.02 * L, -0.40 * H); ctx.lineTo(xn, -0.5 * H);
      ctx.bezierCurveTo(xn + 0.18 * L, -0.5 * H, xt - 0.07 * L, -0.2 * H, xt, 0);
      ctx.bezierCurveTo(xt - 0.07 * L, 0.2 * H, xn + 0.18 * L, 0.5 * H, xn, 0.5 * H);
      ctx.lineTo(xb - 0.02 * L, 0.40 * H); ctx.quadraticCurveTo(xb - 0.05 * L, 0, xb - 0.02 * L, -0.40 * H); ctx.closePath();
    }
    body();
    ctx.fillStyle = A.lin(ctx, 0, -0.5 * H, 0, 0.5 * H, [[0, '#ffffff'], [0.4, '#ecf0f8'], [0.75, '#bcc7dc'], [1, '#8794b0']]); ctx.fill();
    ctx.save(); body(); ctx.clip();
    // nasul colorat
    ctx.beginPath(); ctx.moveTo(0.20 * L, -H); ctx.quadraticCurveTo(0.255 * L, 0, 0.20 * L, H); ctx.lineTo(xt + 3, H); ctx.lineTo(xt + 3, -H); ctx.closePath();
    ctx.fillStyle = A.lin(ctx, 0, -0.5 * H, 0, 0.5 * H, [[0, A.lighten(col, 0.4)], [0.5, col], [1, A.darken(col, 0.42)]]); ctx.fill();
    // inel colorat
    ctx.fillStyle = A.lin(ctx, 0, -0.5 * H, 0, 0.5 * H, [[0, A.lighten(col, 0.25)], [1, A.darken(col, 0.3)]]); ctx.fillRect(-0.12 * L, -H, 0.07 * L, 2 * H);
    ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fillRect(-0.125 * L, -H, max(0.8, 0.008 * L), 2 * H);
    // umbră / luciu
    ctx.fillStyle = A.lin(ctx, 0, 0.0, 0, 0.5 * H, [[0, 'rgba(25,35,75,0)'], [1, 'rgba(25,35,75,.28)']]); ctx.fillRect(xb - 4, 0, L, 0.5 * H);
    ctx.fillStyle = A.lin(ctx, xb, 0, xn + 0.2 * L, 0, [[0, 'rgba(255,255,255,0)'], [0.4, 'rgba(255,255,255,.75)'], [1, 'rgba(255,255,255,0)']]);
    rr(ctx, xb, -0.43 * H, xn + 0.2 * L - xb, 0.1 * H, 0.05 * H); ctx.fill();
    // senzor
    var sx = -0.22 * L, sr = 0.17 * H;
    ctx.fillStyle = A.lin(ctx, sx - sr, -sr, sx + sr, sr, [[0, '#2b3b66'], [1, '#101830']]); A.circle(ctx, sx, 0, sr * 1.2); ctx.fill();
    ctx.fillStyle = A.rad(ctx, sx, 0, 0, sr, [[0, '#d9f4ff'], [0.5, '#5cc8ff'], [1, '#1c6fb0']], sx - sr * 0.3, -sr * 0.3); A.circle(ctx, sx, 0, sr * 0.82); ctx.fill();
    ctx.restore();
    body(); ctx.lineJoin = 'round'; ctx.strokeStyle = 'rgba(30,45,95,.30)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.restore();
    if (o.label) A.chip(ctx, String(o.label), x, y + H + 16, { align: 'center', dot: col });
    return {
      nose: { x: x + f * xt, y: y }, tail: { x: x + f * xe, y: y }, top: { x: x, y: y - H * 0.98 }, bottom: { x: x, y: y + H * 0.98 },
      center: { x: x, y: y }, flameTip: { x: x + f * (xe - flameLen), y: y }, h: H, w: L
    };
  };

  /* ==========================================================================
     A.station(ctx, x, y, w, o) — stație spațială; (x,y) = centrul modulului principal, w = lățimea TOTALĂ (cu panourile)
       o.observer  true (implicit): bustul Anei în hublou · false = hublou gol, luminat · obiect = opțiuni de persoană
                   {skin, hair, hairStyle, shirt (implicit accent), look}
       o.accent    culoarea inelelor și a benzilor (implicit P.s1 = cyan, S)
       o.t         secunde → balizele clipesc, luciul străbate panourile, ușoară legănare
       o.angle     rotire în radiani (implicit 0) · o.panels:true (panouri solare) · o.label text într-un chip dedesubt
       o.cabin     function(ctx, info) opțională: desenează în hublou (coordonate canvas, decupat în cerc); info={x,y,r}
     Întoarce {window:{x,y,r}, top, antenna, beacon, left, right, bottom, hub:{x,y,w,h}, h, w}.
     ========================================================================== */
  A.station = function (ctx, x, y, w, o) {
    o = o || {}; w = max(30, num(w, 300));
    var P = pal(), acc = o.accent || P.s1, t = T(o), u = w / 100, ang = num(o.angle, 0) + 0.012 * sin(t * 0.5);
    var wx = 0, wy = -0.8, R = 8.6, gr = R * 0.78;
    function pt(lx, ly) { var c = cos(ang), s = sin(ang); return { x: x + (lx * c - ly * s) * u, y: y + (lx * s + ly * c) * u }; }

    ctx.save();
    ctx.translate(x, y); ctx.rotate(ang); ctx.scale(u, u);
    ctx.lineJoin = 'round';

    /* — panouri solare — */
    if (o.panels !== false) {
      var sweep = fract(t * 0.11), cols = 3, rows = 8;
      [-1, 1].forEach(function (s) {
        // catarg
        ctx.fillStyle = A.lin(ctx, 0, -1.4, 0, 1.4, [[0, '#f3f6fb'], [0.5, '#aab5ca'], [1, '#5d6a85']]);
        rr(ctx, s > 0 ? 15 : -50.5, -1.3, 35.5, 2.6, 1.2); ctx.fill();
        // articulație
        ctx.fillStyle = A.lin(ctx, 0, -4.6, 0, 4.6, [[0, '#6f7c96'], [1, '#262e45']]);
        rr(ctx, s > 0 ? 22.4 : -25.4, -4.6, 3, 9.2, 1.2); ctx.fill();
        [[24.6, 12.6], [38.4, 12.4]].forEach(function (pp, pi) {
          var px0 = s > 0 ? pp[0] : -pp[0] - pp[1], py0 = -15.5, pw = pp[1], ph = 31;
          // ramă
          ctx.fillStyle = A.lin(ctx, px0, py0, px0 + pw, py0 + ph, [[0, '#f6f8fc'], [1, '#8794ac']]);
          rr(ctx, px0, py0, pw, ph, 1.3); ctx.fill();
          var ix = px0 + 0.95, iy = py0 + 0.95, iw = pw - 1.9, ih = ph - 1.9;
          ctx.fillStyle = A.lin(ctx, ix, iy, ix + iw, iy + ih, [[0, '#62a4ff'], [0.42, '#2a63d0'], [1, '#11307a']]);
          rr(ctx, ix, iy, iw, ih, 0.7); ctx.fill();
          ctx.save(); rr(ctx, ix, iy, iw, ih, 0.7); ctx.clip();
          ctx.strokeStyle = 'rgba(215,232,255,.34)'; ctx.lineWidth = 0.26; ctx.beginPath();
          for (var c = 1; c < cols; c++) { ctx.moveTo(ix + iw * c / cols, iy); ctx.lineTo(ix + iw * c / cols, iy + ih); }
          for (var r = 1; r < rows; r++) { ctx.moveTo(ix, iy + ih * r / rows); ctx.lineTo(ix + iw, iy + ih * r / rows); }
          ctx.stroke();
          // luciu fix + luciu care străbate
          ctx.fillStyle = A.lin(ctx, ix, iy, ix + iw * 1.2, iy + ih * 0.6, [[0, 'rgba(255,255,255,.34)'], [1, 'rgba(255,255,255,0)']]);
          ctx.beginPath(); ctx.moveTo(ix, iy); ctx.lineTo(ix + iw, iy); ctx.lineTo(ix, iy + ih * 0.55); ctx.closePath(); ctx.fill();
          var sx = (sweep * 1.6 - 0.3 + (s > 0 ? pi * 0.12 : 0.24 - pi * 0.12)) * (iw + ih * 0.5);
          ctx.fillStyle = 'rgba(255,255,255,.20)';
          ctx.beginPath(); ctx.moveTo(ix + sx, iy); ctx.lineTo(ix + sx + iw * 0.5, iy); ctx.lineTo(ix + sx + iw * 0.5 - ih * 0.3, iy + ih); ctx.lineTo(ix + sx - ih * 0.3, iy + ih); ctx.closePath(); ctx.fill();
          ctx.restore();
          // muchie de accent
          ctx.strokeStyle = rgba(acc, 0.85); ctx.lineWidth = 0.35;
          ctx.beginPath(); ctx.moveTo(px0 + 1.5, py0 + 0.35); ctx.lineTo(px0 + pw - 1.5, py0 + 0.35); ctx.stroke();
        });
        // capăt de catarg
        ctx.fillStyle = A.lin(ctx, 0, -2, 0, 2, [[0, '#e6ecf6'], [1, '#6a7791']]); A.circle(ctx, s * 51.2, 0, 1.6); ctx.fill();
      });
    }

    /* — modul inferior și noduri de andocare — */
    ctx.fillStyle = A.lin(ctx, -6, 0, 6, 0, [[0, '#dfe6f2'], [1, '#8a97b0']]);
    rr(ctx, -5.2, 8, 10.4, 10, 2.6); ctx.fill();
    ctx.fillStyle = A.lin(ctx, 0, 14.5, 0, 18.5, [[0, '#55627e'], [1, '#232b41']]); rr(ctx, -3.6, 15.2, 7.2, 3.2, 1.2); ctx.fill();
    ctx.fillStyle = rgba(acc, 0.9); rr(ctx, -5.2, 11.4, 10.4, 1.3, 0.6); ctx.fill();
    [-1, 1].forEach(function (s) {
      ctx.fillStyle = A.lin(ctx, 0, -6.2, 0, 6.2, [[0, '#e9eef7'], [0.5, '#a7b3c9'], [1, '#6a7791']]);
      rr(ctx, s > 0 ? 15 : -23, -6, 8, 12, 2.4); ctx.fill();
      ctx.fillStyle = rgba(acc, 0.9); rr(ctx, s > 0 ? 18.4 : -20.6, -6, 2.2, 12, 0.8); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.45)'; rr(ctx, s > 0 ? 15.6 : -22.4, -5.2, 6.8, 1.4, 0.7); ctx.fill();
    });

    /* — antene — */
    ctx.fillStyle = A.lin(ctx, 6.2, 0, 7.8, 0, [[0, '#dce3ef'], [1, '#7b88a2']]); rr(ctx, 6.3, -19, 1.5, 9, 0.6); ctx.fill();
    ctx.save(); ctx.translate(7, -19.4); ctx.rotate(-0.55);
    ctx.fillStyle = A.lin(ctx, -6, -3, 6, 3, [[0, '#ffffff'], [0.6, '#c3cde0'], [1, '#7c89a3']]);
    ctx.beginPath(); ctx.ellipse(0, 0, 6.2, 2.7, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = A.lin(ctx, 0, -2, 0, 2, [[0, '#4a5775'], [1, '#222a40']]);
    ctx.beginPath(); ctx.ellipse(0.5, 0.2, 5.1, 1.8, 0, 0, TAU); ctx.fill();
    ctx.strokeStyle = '#b5c0d6'; ctx.lineWidth = 0.4; ctx.beginPath(); ctx.moveTo(0.5, 0); ctx.lineTo(3.2, -4.6); ctx.stroke();
    ctx.fillStyle = acc; A.circle(ctx, 3.3, -4.9, 0.9); ctx.fill();
    ctx.restore();
    ctx.strokeStyle = '#aab5ca'; ctx.lineWidth = 0.55; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-9, -10); ctx.lineTo(-9, -19); ctx.stroke();

    /* — modulul principal — */
    function hubPath() { rr(ctx, -16.5, -10.8, 33, 21.6, 7); }
    hubPath();
    ctx.fillStyle = A.lin(ctx, 0, -10.8, 0, 10.8, [[0, '#ffffff'], [0.4, '#eef2f9'], [0.75, '#c4cfe2'], [1, '#8d9bb6']]); ctx.fill();
    ctx.save(); hubPath(); ctx.clip();
    ctx.fillStyle = A.lin(ctx, 0, 0, 0, 10.8, [[0, 'rgba(25,35,75,0)'], [1, 'rgba(25,35,75,.26)']]); ctx.fillRect(-17, 0, 34, 11);
    ctx.fillStyle = A.lin(ctx, -16.5, 0, 16.5, 0, [[0, 'rgba(255,255,255,.28)'], [0.35, 'rgba(255,255,255,0)'], [1, 'rgba(25,35,75,.18)']]); ctx.fillRect(-17, -11, 34, 22);
    ctx.fillStyle = A.lin(ctx, 0, 7.4, 0, 9.6, [[0, A.lighten(acc, 0.25)], [1, A.darken(acc, 0.3)]]); ctx.fillRect(-17, 7.4, 34, 2.1);
    ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fillRect(-17, 7.2, 34, 0.35);
    ctx.strokeStyle = 'rgba(40,55,100,.22)'; ctx.lineWidth = 0.3;
    [-11.2, 11.2].forEach(function (sx) { ctx.beginPath(); ctx.moveTo(sx, -11); ctx.lineTo(sx, 11); ctx.stroke(); });
    ctx.fillStyle = 'rgba(255,255,255,.65)'; rr(ctx, -13, -9.6, 26, 1.5, 0.75); ctx.fill();
    // hublouri mici
    [-1, 1].forEach(function (s) {
      var px = s * 13.6, py = -2.2;
      ctx.fillStyle = A.lin(ctx, px - 2, py - 2, px + 2, py + 2, [[0, '#eef3fb'], [1, '#6f7c94']]); A.circle(ctx, px, py, 2.1); ctx.fill();
      ctx.fillStyle = A.lin(ctx, 0, py - 1.6, 0, py + 1.6, [[0, '#fff0c0'], [1, '#ffc766']]); A.circle(ctx, px, py, 1.55); ctx.fill();
    });
    ctx.restore();
    hubPath(); ctx.strokeStyle = 'rgba(30,45,95,.32)'; ctx.lineWidth = 0.32; ctx.stroke();

    /* — hublou mare — */
    ctx.fillStyle = 'rgba(15,25,60,.28)'; A.circle(ctx, wx + 0.5, wy + 0.9, R * 1.08); ctx.fill();
    ctx.fillStyle = A.lin(ctx, wx - R, wy - R, wx + R, wy + R, [[0, '#fbfdff'], [0.45, '#c3cddf'], [1, '#6d7a93']]); A.circle(ctx, wx, wy, R); ctx.fill();
    ctx.strokeStyle = acc; ctx.lineWidth = 1.05; A.circle(ctx, wx, wy, R * 0.9); ctx.stroke();
    ctx.fillStyle = A.lin(ctx, wx - R, wy - R, wx + R, wy + R, [[0, '#6f7c96'], [1, '#232b41']]); A.circle(ctx, wx, wy, R * 0.84); ctx.fill();
    ctx.save();
    A.circle(ctx, wx, wy, gr); ctx.clip();
    ctx.fillStyle = A.lin(ctx, 0, wy - gr, 0, wy + gr, [[0, '#fff3cf'], [1, '#ffd88a']]); ctx.fillRect(wx - gr, wy - gr, 2 * gr, 2 * gr);
    ctx.fillStyle = 'rgba(160,110,50,.20)'; ctx.fillRect(wx - gr, wy + gr * 0.64, 2 * gr, gr);
    ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(wx - gr, wy - gr * 0.88, 2 * gr, gr * 0.12);
    var ob = o.observer == null ? true : o.observer;
    if (ob) {
      var po = typeof ob === 'object' ? ob : {};
      A.bust(ctx, wx, wy + gr * 0.12, gr * 0.46, { skin: po.skin || A.skin[0], hair: po.hair || A.hairc[1], hairStyle: po.hairStyle || 'bob', shirt: po.shirt || acc, look: num(po.look, 0.1) });
    }
    if (typeof o.cabin === 'function') {
      ctx.save(); ctx.rotate(-ang); ctx.scale(1 / u, 1 / u); ctx.translate(-x, -y);
      try { o.cabin(ctx, { x: pt(wx, wy).x, y: pt(wx, wy).y, r: gr * u }); } catch (err) { /* ignorăm */ }
      ctx.restore();
    }
    ctx.fillStyle = A.lin(ctx, wx - gr, wy - gr, wx + gr * 0.4, wy + gr * 0.4, [[0, 'rgba(255,255,255,.50)'], [1, 'rgba(255,255,255,0)']]);
    ctx.beginPath(); ctx.moveTo(wx - gr, wy - gr * 0.1); ctx.quadraticCurveTo(wx - gr * 0.55, wy - gr * 0.95, wx + gr * 0.45, wy - gr * 0.95);
    ctx.lineTo(wx + gr * 0.05, wy - gr * 0.55); ctx.quadraticCurveTo(wx - gr * 0.5, wy - gr * 0.5, wx - gr * 0.62, wy + gr * 0.2); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.28)'; ell(ctx, wx + gr * 0.5, wy + gr * 0.55, gr * 0.28, gr * 0.07, -0.75); ctx.fill();
    var ig = ctx.createRadialGradient(wx, wy, gr * 0.62, wx, wy, gr);
    ig.addColorStop(0, 'rgba(20,30,70,0)'); ig.addColorStop(1, 'rgba(20,30,70,.38)');
    ctx.fillStyle = ig; ctx.fillRect(wx - gr, wy - gr, 2 * gr, 2 * gr);
    ctx.restore();

    /* — baliza (clipește) — */
    var bp = 0.5 + 0.5 * sin(t * 3.6), bl = 0.25 + 0.75 * bp * bp * bp;
    ctx.fillStyle = A.rad(ctx, -9, -19.6, 0, 1.4, [[0, '#ffffff'], [0.5, '#ff8f8f'], [1, '#d63b3b']], -9.3, -19.9); A.circle(ctx, -9, -19.7, 1.25); ctx.fill();
    ctx.restore();
    var bpos = pt(-9, -19.7);
    glow(ctx, bpos.x, bpos.y, 9 * u * (0.7 + 0.5 * bl), '#ff5a5a', 0.75 * bl);

    if (o.label) A.chip(ctx, String(o.label), x, y + 25 * u + 8, { align: 'center', dot: acc });

    var tp = pt(0, -21);
    return {
      window: { x: pt(wx, wy).x, y: pt(wx, wy).y, r: gr * u }, top: tp, antenna: pt(7, -19.4), beacon: bpos, left: pt(-51, 0), right: pt(51, 0),
      bottom: pt(0, 18.5), hub: { x: x, y: y, w: 33 * u, h: 21.6 * u }, h: 38 * u, w: w
    };
  };

  /* ==========================================================================
     Planete — geometrie pe sferă (proiecție ortografică a unor „pete” sferice) + benzi pentru giganți
     ========================================================================== */
  function mkBlob(lonD, latD, rhoD, seed, n, wob, ex, ey) {
    var lon = lonD * RAD, lat = latD * RAD, rho = rhoD * RAD, cl = cos(lat), sl = sin(lat);
    var cx = cl * sin(lon), cy = sl, cz = cl * cos(lon);
    var e1x = cos(lon), e1z = -sin(lon), e2x = -sl * sin(lon), e2y = cl, e2z = -sl * cos(lon);
    var p1 = hsh(seed) * TAU, p2 = hsh(seed + 1) * TAU, p3 = hsh(seed + 2) * TAU, out = [];
    ex = ex || 1; ey = ey || 1; n = n || 14; wob = wob == null ? 0.25 : wob;
    for (var k = 0; k < n; k++) {
      var th = k / n * TAU, rv = rho * (1 + wob * (0.55 * sin(2 * th + p1) + 0.3 * sin(3 * th + p2) + 0.15 * sin(5 * th + p3)));
      var a = cos(th) * ex, b = sin(th) * ey, s = sin(rv), c = cos(rv);
      var vx = cx * c + (e1x * a + e2x * b) * s, vy = cy * c + (e2y * b) * s, vz = cz * c + (e1z * a + e2z * b) * s;
      var m = sqrt(vx * vx + vy * vy + vz * vz) || 1;
      out.push(vx / m, vy / m, vz / m);
    }
    return out;
  }
  function unitVec(lonD, latD) { var lo = lonD * RAD, la = latD * RAD; return [cos(la) * sin(lo), sin(la), cos(la) * cos(lo)]; }
  /* matricea de rotație: Rz(roll)·Rx(tilt)·Ry(alpha) — tilt>0 apleacă polul nord spre privitor */
  function rotM(alpha, tilt, roll) {
    var ca = cos(alpha), sa = sin(alpha), ct = cos(tilt), st = sin(tilt), cr = cos(roll), sr = sin(roll);
    return [cr * ca - sr * st * sa, -sr * ct, cr * sa + sr * st * ca,
            sr * ca + cr * st * sa, cr * ct, sr * sa - cr * st * ca,
            -ct * sa, st, ct * ca];
  }
  var _px = [], _py = [];
  function addPoly(ctx, v, M, x, y, r) {
    var n = v.length / 3, i, vis = 0;
    for (i = 0; i < n; i++) {
      var X = v[3 * i], Y = v[3 * i + 1], Z = v[3 * i + 2];
      var sx = M[0] * X + M[1] * Y + M[2] * Z, sy = M[3] * X + M[4] * Y + M[5] * Z, sz = M[6] * X + M[7] * Y + M[8] * Z;
      if (sz < 0) { var d = sqrt(sx * sx + sy * sy) || 1; sx /= d; sy /= d; } else vis++;
      _px[i] = x + sx * r; _py[i] = y - sy * r;
    }
    if (!vis) return false;
    ctx.moveTo((_px[n - 1] + _px[0]) / 2, (_py[n - 1] + _py[0]) / 2);
    for (i = 0; i < n; i++) { var j = i + 1 === n ? 0 : i + 1; ctx.quadraticCurveTo(_px[i], _py[i], (_px[i] + _px[j]) / 2, (_py[i] + _py[j]) / 2); }
    ctx.closePath();
    return true;
  }
  function polyList(ctx, list, M, x, y, r) { ctx.beginPath(); for (var i = 0; i < list.length; i++) addPoly(ctx, list[i], M, x, y, r); }
  function mkList(defs, seed0, n, wob) { return defs.map(function (d, i) { return mkBlob(d[0], d[1], d[2], seed0 + i * 5, d[3] || n || 14, wob == null ? 0.26 : wob, d[4], d[5]); }); }

  var BL = null;
  function blobs() {
    if (BL) return BL;
    BL = {};
    BL.land = mkList([
      [-100, 48, 17], [-112, 62, 12], [-84, 34, 12], [-104, 25, 8], [-90, 15, 5], [-122, 42, 7], [-76, 47, 8], [-60, 56, 7],
      [-60, -8, 14], [-58, -25, 10], [-68, -42, 6], [-73, -8, 6],
      [18, 8, 17], [22, -9, 14], [26, -26, 9], [-4, 26, 12], [36, 18, 8], [47, 8, 4], [47, -19, 3.2],
      [10, 48, 9], [32, 53, 12], [60, 58, 15], [90, 57, 16], [120, 57, 14], [80, 33, 13], [106, 30, 11], [132, 46, 8], [76, 19, 8], [101, 15, 7], [-4, 41, 7], [15, 63, 7], [142, 38, 3.2],
      [134, -25, 11], [116, -3, 4], [128, 0, 3], [172, -41, 3.5]
    ], 11);
    BL.ice = mkList([[0, -90, 20, 18], [-40, 73, 8], [0, 90, 12, 16]], 211, 14, 0.12);
    BL.desert = mkList([[8, 24, 9], [47, 24, 6], [133, -25, 6.5], [105, 43, 6], [22, -23, 4], [-108, 30, 5], [-68, -24, 4.5]], 311, 12, 0.3);
    var cl = [], i;
    for (i = 0; i < 17; i++) cl.push([hsh(i * 3 + 500) * 360 - 180, (hsh(i * 3 + 501) - 0.5) * 140, 5 + hsh(i * 3 + 502) * 8, 12, 1.6 + hsh(i * 3 + 503) * 1.6, 0.55 + hsh(i * 3 + 504) * 0.3]);
    BL.cloud = mkList(cl, 611, 12, 0.3);
    BL.maria = mkList([[-22, 32, 19], [20, 24, 11], [32, 8, 11], [-48, 12, 18], [0, -16, 7], [-12, 2, 8], [58, 0, 6]], 711, 14, 0.3);
    BL.craters = [[-11, -43, 4.6, 1], [-20, 10, 3.6, 1], [-38, 8, 2.6, 0], [-47, 23, 2.8, 1], [-9, 51, 4.2, 0], [30, -28, 5, 0], [52, 18, 3.4, 0], [8, 36, 2.6, 0],
      [-62, -20, 4.2, 0], [20, -5, 2.6, 0], [-30, -30, 3.2, 0], [60, -34, 4.4, 0], [-4, 20, 2, 0], [40, 40, 3, 0], [-70, 25, 3, 0], [12, -52, 3.4, 0], [-25, -55, 2.8, 0], [75, 15, 2.8, 0]
    ].map(function (c) { return { v: unitVec(c[0], c[1]), s: c[2] * RAD, big: c[3] }; });
    BL.marsDark = mkList([[-15, 42, 14], [40, -4, 16], [75, 14, 13], [-62, -24, 15], [-112, 12, 12], [100, -30, 11], [8, -12, 10], [-150, 30, 12]], 811, 14, 0.3);
    BL.marsLight = mkList([[70, -42, 13], [-130, -10, 12], [150, 20, 14]], 911, 14, 0.25);
    BL.marsCap = mkList([[0, 88, 13, 14], [0, -86, 10, 14]], 951, 14, 0.2);
    BL.volc = [[-112, 18, 5], [-104, 6, 4], [-92, 0, 3.4]].map(function (c) { return { v: unitVec(c[0], c[1]), s: c[2] * RAD }; });
    BL.grs = mkBlob(30, -24, 11, 971, 18, 0.05, 1.9, 1);
    BL.storm = mkList([[-40, 38, 4, 12, 2.2, 1], [110, -40, 3.5, 12, 2, 1], [-120, 20, 3, 12, 2, 1]], 981, 12, 0.1);
    return BL;
  }

  function crater(ctx, M, c, x, y, r, big) {
    var v = c.v, sx = M[0] * v[0] + M[1] * v[1] + M[2] * v[2], sy = M[3] * v[0] + M[4] * v[1] + M[5] * v[2], sz = M[6] * v[0] + M[7] * v[1] + M[8] * v[2];
    if (sz < 0.1) return;
    var px = x + sx * r, py = y - sy * r, rad = sin(c.s) * r, rot = Math.atan2(-sy, sx) + PI / 2, ry = max(0.3, rad * sz);
    ctx.save(); ctx.translate(px, py); ctx.rotate(rot);
    ctx.fillStyle = A.lin(ctx, -rad, -ry, rad, ry, [[0, 'rgba(30,34,60,.34)'], [0.55, 'rgba(60,66,95,.14)'], [1, 'rgba(255,255,255,.16)']]);
    ctx.beginPath(); ctx.ellipse(0, 0, max(0.3, rad), ry, 0, 0, TAU); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.22)'; ctx.lineWidth = max(0.5, r * 0.010);
    ctx.beginPath(); ctx.ellipse(0, 0, max(0.3, rad), ry, 0, PI * 0.95, PI * 1.75); ctx.stroke();
    if (big) { ctx.strokeStyle = 'rgba(255,255,255,.16)'; ctx.lineWidth = max(0.5, r * 0.008); for (var k = 0; k < 8; k++) { var a = k * TAU / 8 + 0.3; ctx.beginPath(); ctx.moveTo(cos(a) * rad * 1.2, sin(a) * ry * 1.2); ctx.lineTo(cos(a) * rad * (2.2 + 0.9 * hsh(k)), sin(a) * ry * (2.2 + 0.9 * hsh(k))); ctx.stroke(); } }
    ctx.restore();
  }

  function drawEarth(ctx, x, y, r, st) {
    var B = blobs(), M = st.M, Lx = st.Lx, Ly = st.Ly, M2 = rotM(st.alpha * 1.22 + 0.9, st.tilt, st.roll), sheenX = x + Lx * r * 0.35, sheenY = y + Ly * r * 0.35;
    ctx.fillStyle = A.rad(ctx, sheenX, sheenY, 0, r * 1.5, [[0, '#6cc2ff'], [0.42, '#2f86e6'], [0.78, '#164fae'], [1, '#0a2a74']]);
    ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
    // zone de ocean mai deschise (apă mică) — pete largi
    // coastă (halou), apoi uscat
    polyList(ctx, B.land, M, x, y, r);
    ctx.lineJoin = 'round'; ctx.strokeStyle = 'rgba(150,232,255,.42)'; ctx.lineWidth = max(1.2, r * 0.06); ctx.stroke();
    ctx.fillStyle = A.rad(ctx, sheenX, sheenY, 0, r * 1.4, [[0, '#bff07c'], [0.45, '#5cbf5e'], [1, '#2a7c48']]); ctx.fill();
    polyList(ctx, B.desert, M, x, y, r);
    ctx.fillStyle = 'rgba(232,200,126,.78)'; ctx.fill();
    polyList(ctx, B.ice, M, x, y, r);
    ctx.fillStyle = '#f2fbff'; ctx.fill();
    // strălucire pe ocean
    var sg = ctx.createRadialGradient(sheenX - Lx * r * 0.1, sheenY - Ly * r * 0.1, 0, sheenX, sheenY, r * 0.5);
    sg.addColorStop(0, 'rgba(255,255,255,.30)'); sg.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = sg; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
    // nori: umbră, apoi nori
    ctx.save(); ctx.translate(-Lx * r * 0.035, -Ly * r * 0.035);
    polyList(ctx, B.cloud, M2, x, y, r * 1.01); ctx.fillStyle = 'rgba(12,35,95,.20)'; ctx.fill();
    ctx.restore();
    polyList(ctx, B.cloud, M2, x, y, r * 1.012);
    ctx.fillStyle = 'rgba(255,255,255,.88)'; ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.30)'; ctx.lineWidth = max(1, r * 0.03); ctx.stroke();
  }
  function drawMoon(ctx, x, y, r, st) {
    var B = blobs(), M = st.M, Lx = st.Lx, Ly = st.Ly;
    ctx.fillStyle = A.rad(ctx, x + Lx * r * 0.3, y + Ly * r * 0.3, 0, r * 1.5, [[0, '#f4f4f8'], [0.5, '#c5c8d6'], [1, '#80859b']]);
    ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
    polyList(ctx, B.maria, M, x, y, r); ctx.fillStyle = 'rgba(84,92,124,.55)'; ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.10)'; ctx.lineWidth = max(1, r * 0.02); ctx.stroke();
    for (var i = 0; i < B.craters.length; i++) crater(ctx, M, B.craters[i], x, y, r, B.craters[i].big);
  }
  function drawMars(ctx, x, y, r, st) {
    var B = blobs(), M = st.M, Lx = st.Lx, Ly = st.Ly;
    ctx.fillStyle = A.rad(ctx, x + Lx * r * 0.3, y + Ly * r * 0.3, 0, r * 1.5, [[0, '#f7a874'], [0.45, '#d2623a'], [0.85, '#8e3524'], [1, '#6a2418']]);
    ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
    polyList(ctx, B.marsLight, M, x, y, r); ctx.fillStyle = 'rgba(255,205,160,.30)'; ctx.fill();
    polyList(ctx, B.marsDark, M, x, y, r); ctx.fillStyle = 'rgba(104,36,26,.50)'; ctx.fill();
    polyList(ctx, B.marsCap, M, x, y, r); ctx.fillStyle = 'rgba(255,244,236,.95)'; ctx.fill();
    for (var i = 0; i < B.volc.length; i++) crater(ctx, M, B.volc[i], x, y, r, 0);
  }
  var GAS = {
    gas: ['#d9b98a', '#f0e1c1', '#c38c58', '#f3e4c5', '#b57444', '#ebd3a8', '#cf9a63', '#f1e1be', '#b98557', '#e6cda1', '#c9a577'],
    ice: ['#bfeaf4', '#8ed3ea', '#a9e0f0', '#6fb9de', '#9bd7ec', '#5aa3cf', '#8ccbe6', '#7cc0e2', '#a8dcee', '#6aaed8', '#9ed8ec']
  };
  var GEDGE = [90, 64, 46, 32, 18, 6, -6, -19, -33, -48, -66, -90];
  function drawGas(ctx, x, y, r, st) {
    var B = blobs(), cols = GAS[st.pal] || GAS.gas, tilt = 0.30, ct = cos(tilt), stl = sin(tilt), t = st.t, Lx = st.Lx, Ly = st.Ly, i, k, N = 18;
    ctx.save(); ctx.translate(x, y); ctx.rotate(st.roll);
    ctx.fillStyle = cols[0]; ctx.fillRect(-r, -r * 1.3, 2 * r, 2.6 * r);
    for (i = 0; i < cols.length; i++) {
      var phi = GEDGE[i] * RAD, cphi = cos(phi), sphi = sin(phi), amp = (0.010 + 0.012 * hsh(i + 5)) * r, fq = 3 + hsh(i + 9) * 4, ph = hsh(i + 13) * TAU + t * (0.25 + 0.3 * hsh(i + 17)) * (i % 2 ? 1 : -1);
      if (i === 0) continue;
      ctx.beginPath();
      for (k = 0; k <= N; k++) {
        var lam = -PI / 2 + PI * k / N, px = cphi * sin(lam) * r, py = -(sphi * ct - cphi * cos(lam) * stl) * r + amp * sin(fq * lam + ph);
        if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.lineTo(r * 1.4, r * 1.5); ctx.lineTo(-r * 1.4, r * 1.5); ctx.closePath();
      ctx.fillStyle = cols[i]; ctx.fill();
    }
    // linii fine între benzi
    ctx.strokeStyle = 'rgba(255,255,255,.14)'; ctx.lineWidth = max(0.6, r * 0.012);
    for (i = 1; i < GEDGE.length - 1; i += 2) {
      var ph2 = GEDGE[i] * RAD, c2 = cos(ph2), s2 = sin(ph2);
      ctx.beginPath();
      for (k = 0; k <= N; k++) { var l2 = -PI / 2 + PI * k / N, qx = c2 * sin(l2) * r, qy = -(s2 * ct - c2 * cos(l2) * stl) * r; if (k === 0) ctx.moveTo(qx, qy); else ctx.lineTo(qx, qy); }
      ctx.stroke();
    }
    ctx.restore();
    if (st.pal === 'gas') {                                            // Pata Roșie
      var M = rotM(st.alpha, tilt, st.roll);
      ctx.beginPath(); addPoly(ctx, B.grs, M, x, y, r);
      ctx.fillStyle = 'rgba(214,92,62,.88)'; ctx.fill(); ctx.strokeStyle = 'rgba(255,236,206,.55)'; ctx.lineWidth = max(1, r * 0.03); ctx.stroke();
      ctx.beginPath(); addPoly(ctx, mkBlob(30, -24, 5.5, 975, 14, 0.05, 1.8, 1), M, x, y, r); ctx.fillStyle = 'rgba(150,50,36,.55)'; ctx.fill();
    } else {
      var M3 = rotM(st.alpha, tilt, st.roll);
      polyList(ctx, B.storm, M3, x, y, r); ctx.fillStyle = 'rgba(235,250,255,.55)'; ctx.fill();
    }
  }
  var KIND = {
    earth: { atmo: '#6fc0ff', atmoA: 0.62, rim: '#bfe6ff', rimA: 0.55, draw: drawEarth, spin: 0.085, tilt: 0.38, roll: -0.36, a0: -0.30 },
    moon: { atmo: null, rim: '#e6eaff', rimA: 0.0, draw: drawMoon, spin: 0.010, tilt: 0.12, roll: -0.20, a0: 0.20, libr: 0.10 },
    mars: { atmo: '#ff9a68', atmoA: 0.30, rim: '#ffd0b4', rimA: 0.22, draw: drawMars, spin: 0.07, tilt: 0.34, roll: -0.30, a0: 0.50 },
    gas: { atmo: '#f1d4a0', atmoA: 0.20, rim: '#fff0d2', rimA: 0.20, draw: drawGas, spin: 0.10, tilt: 0.30, roll: -0.14, a0: 0.2, pal: 'gas' },
    ice: { atmo: '#9fe2ff', atmoA: 0.34, rim: '#d4f3ff', rimA: 0.35, draw: drawGas, spin: 0.09, tilt: 0.30, roll: 0.20, a0: 0.9, pal: 'ice' }
  };
  function ringArcs(ctx, x, y, r, roll, k, front, Lx) {
    var bands = [[1.30, 0.07, '#8f7b5c', 0.55], [1.42, 0.12, '#e6d2a4', 0.92], [1.58, 0.05, '#bda47a', 0.7], [1.68, 0.18, '#f2e2ba', 0.95], [1.90, 0.09, '#cdb48a', 0.75]];
    ctx.save(); ctx.translate(x, y); ctx.rotate(roll); ctx.scale(1, k);
    ctx.lineCap = 'butt';
    for (var i = 0; i < bands.length; i++) {
      var b = bands[i], rad = b[0] * r;
      ctx.strokeStyle = A.lin(ctx, -rad, 0, rad, 0, [[0, rgba(b[2], b[3])], [0.6, rgba(b[2], b[3] * 0.92)], [1, rgba(A.darken(b[2], 0.4), b[3] * 0.85)]]);
      ctx.lineWidth = b[1] * r;
      ctx.beginPath(); ctx.arc(0, 0, rad, front ? 0 : PI, front ? PI : TAU); ctx.stroke();
    }
    ctx.restore();
  }

  /* ==========================================================================
     A.planet(ctx, x, y, r, o) — planetă sferică; (x,y)=centru, r=raza discului
       o.kind        'earth' (implicit) | 'moon' | 'mars' | 'gas' (gigant cu benzi + Pata Roșie) | 'ice' (gigant albastru)
       o.t           secunde → rotație lentă (Pământul se rotește spre est; norii ceva mai repede)
       o.light       direcția spre lumină, în radiani pe ecran (implicit −2,36 ≈ stânga-sus; terminatorul cade în dreapta-jos)
       o.rot         deplasare de longitudine la t=0, în radiani (alege ce parte se vede)
       o.atmosphere  true (implicit) halou atmosferic / false
       o.ring        true → inele (doar pentru 'gas' / 'ice'), se întind până la ≈ 2,0·r
     Întoarce {x, y, r, light:{x,y}, top:{x,y}, bottom:{x,y}, left:{x,y}, right:{x,y}}.
     ========================================================================== */
  A.planet = function (ctx, x, y, r, o) {
    o = o || {}; r = max(2, num(r, 40));
    var K = KIND[o.kind] || KIND.earth, t = T(o), la = num(o.light, -2.36), Lx = cos(la), Ly = sin(la);
    var alpha = K.a0 + num(o.rot, 0) + t * K.spin + (K.libr ? K.libr * sin(t * 0.16) : 0);
    var st = { M: rotM(alpha, K.tilt, K.roll), alpha: alpha, tilt: K.tilt, roll: K.roll, t: t, Lx: Lx, Ly: Ly, pal: K.pal };
    var ringOn = !!o.ring && (o.kind === 'gas' || o.kind === 'ice'), ringK = 0.27, ringRoll = K.roll - 0.1;
    ctx.save();
    // halou atmosferic: uniform subțire + accentuat spre lumină
    if (K.atmo && o.atmosphere !== false) {
      var g1 = ctx.createRadialGradient(x, y, r * 0.96, x, y, r * 1.2);
      g1.addColorStop(0, rgba(K.atmo, 0.30 * K.atmoA)); g1.addColorStop(0.35, rgba(K.atmo, 0.12 * K.atmoA)); g1.addColorStop(1, rgba(K.atmo, 0));
      ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g1; ctx.beginPath(); ctx.arc(x, y, r * 1.2, 0, TAU); ctx.fill();
      var dl = 0.2 * r, bx = x + Lx * dl, by = y + Ly * dl, Rg = r * 1.42, g2 = ctx.createRadialGradient(bx, by, 0, bx, by, Rg);
      g2.addColorStop(0, rgba(K.atmo, 0.62 * K.atmoA)); g2.addColorStop((r - dl) / Rg, rgba(K.atmo, 0.62 * K.atmoA)); g2.addColorStop((r * 1.02) / Rg, rgba(K.atmo, 0.30 * K.atmoA));
      g2.addColorStop((r * 1.07) / Rg, rgba(K.atmo, 0.09 * K.atmoA)); g2.addColorStop(1, rgba(K.atmo, 0));
      ctx.fillStyle = g2; ctx.beginPath(); ctx.arc(bx, by, Rg, 0, TAU); ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    }
    if (ringOn) ringArcs(ctx, x, y, r, ringRoll, ringK, false, Lx);
    // disc
    ctx.save();
    ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.clip();
    K.draw(ctx, x, y, r, st);
    // întunecare spre margine + lumină de atmosferă pe margine
    var lg = ctx.createRadialGradient(x, y, r * 0.55, x, y, r);
    lg.addColorStop(0, 'rgba(10,18,50,0)'); lg.addColorStop(1, 'rgba(10,18,50,.30)');
    ctx.fillStyle = lg; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
    if (K.rimA > 0 && o.atmosphere !== false) {
      var rg = ctx.createRadialGradient(x, y, r * 0.78, x, y, r);
      rg.addColorStop(0, rgba(K.rim, 0)); rg.addColorStop(0.7, rgba(K.rim, 0.12 * K.rimA)); rg.addColorStop(1, rgba(K.rim, 0.62 * K.rimA));
      ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = rg; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); ctx.globalCompositeOperation = 'source-over';
    }
    // terminator (umbră moale în dreapta-jos)
    var lz = 0.55, cc = (1 - lz * lz) / (2 * lz), R0 = (cc + lz) * r, tx = x + Lx * cc * r, ty = y + Ly * cc * r, Rt = R0 * 1.2, s = 1 / 1.2;
    var tg = ctx.createRadialGradient(tx, ty, 0, tx, ty, Rt);
    tg.addColorStop(0, 'rgba(4,8,30,0)'); tg.addColorStop(0.58 * s, 'rgba(4,8,30,0)'); tg.addColorStop(0.80 * s, 'rgba(4,8,30,.24)');
    tg.addColorStop(0.95 * s, 'rgba(4,8,30,.60)'); tg.addColorStop(1.06 * s, 'rgba(3,6,26,.86)'); tg.addColorStop(1, 'rgba(2,4,20,.93)');
    ctx.fillStyle = tg; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
    ctx.restore();
    // margine fină, luminoasă spre lumină
    var eg = ctx.createLinearGradient(x + Lx * r, y + Ly * r, x - Lx * r, y - Ly * r);
    eg.addColorStop(0, rgba(K.rim, K.rimA > 0 ? 0.80 : 0.5)); eg.addColorStop(0.45, rgba(K.rim, 0.18)); eg.addColorStop(1, rgba(K.rim, 0));
    ctx.strokeStyle = eg; ctx.lineWidth = max(1, r * 0.022); ctx.beginPath(); ctx.arc(x, y, r - 0.4, 0, TAU); ctx.stroke();
    if (ringOn) ringArcs(ctx, x, y, r, ringRoll, ringK, true, Lx);
    ctx.restore();
    return { x: x, y: y, r: r, light: { x: Lx, y: Ly }, top: { x: x, y: y - r }, bottom: { x: x, y: y + r }, left: { x: x - r, y: y }, right: { x: x + r, y: y } };
  };

  /* ==========================================================================
     A.astronaut(ctx, x, y, h, o) — astronaut în costum alb; (x,y) = TĂLPILE (sau CENTRUL când pose:'float'), h = înălțimea în px
       o.pose      'stand' (implicit) | 'wave' | 'point' | 'float' (imponderabilitate: x,y = centrul, înclinare + derivă lentă)
                   | 'throw' | 'hold' | 'out' | 'up' | 'think' (aceleași ca la A.person) | [a1,a2,b1,b2] unghiuri de braț (ca la A.person)
       o.accent    culoarea petecului de pe piept, a manșetelor, benzilor și a ochelarilor „S”/„S′” (implicit P.s1 = cyan)
       o.badge     text scurt în petec (ex. 'S', 'S′')
       o.visor     'mirror' (implicit: vizieră oglindă, reflexii) | 'clear' (sticlă transparentă, se vede fața: o.skin, o.hair, o.hairStyle)
       o.facing    1 (spre dreapta, implicit) | −1 · o.t secunde (respirație / derivă) · o.still:true fără mișcare
       o.wave      true/false: mișcarea mâinii la pose 'wave' (implicit true) · o.shadow:false fără umbră de contact
       o.holdR / o.holdL  function(ctx, x, y, u) apelate în mâna dreaptă/stângă, ca la A.person
     Întoarce {head, handR, handL, feet, top, center, visor, back, u}  — puncte în coordonate canvas.
     ========================================================================== */
  var APOSE = {
    stand: [0.12, 0.06, -0.12, -0.06], throw: [2.35, 2.80, -0.12, -0.06], point: [1.45, 1.55, -0.12, -0.06], wave: [2.55, 2.75, -0.12, -0.06],
    hold: [0.85, 1.65, -0.85, -1.65], out: [1.40, 1.45, -1.40, -1.45], up: [2.9, 3.0, -2.9, -3.0], think: [0.12, 0.05, -0.9, -2.5],
    float: [1.45, 1.95, -1.25, -1.7]
  };
  A.astronaut = function (ctx, x, y, h, o) {
    o = o || {}; h = max(16, num(h, 120));
    var P = pal(), acc = o.accent || P.s1, t = T(o), u = h / 100, f = o.facing === -1 ? -1 : 1;
    var pose = o.pose || 'stand', flt = pose === 'float' || o.float === true;
    var ang = (typeof pose === 'string' ? APOSE[pose] : pose) || APOSE.stand, a1 = ang[0], a2 = ang[1], b1 = ang[2], b2 = ang[3];
    if (flt && typeof pose !== 'string') flt = !!o.float;
    if (pose === 'wave' && o.wave !== false) a2 += sin(t * 7.5) * 0.4;
    if (o.wave === true && pose !== 'wave') a2 += sin(t * 7.5) * 0.4;
    var leg = flt ? [0.62, -0.22, -0.24, 0.5] : [0.05, 0.0, -0.05, 0.0];
    var seed = num(o.seed, 0), still = !!o.still;
    var bob = still ? 0 : (flt ? sin(t * 0.9 + seed) * 2.2 : sin(t * 2.4 + seed) * 0.5), rot = flt ? f * (-0.2 + (still ? 0 : 0.07 * sin(t * 0.7 + seed))) : 0;
    if (flt && !still) { a1 += 0.12 * sin(t * 1.1 + seed); b1 += 0.12 * sin(t * 0.9 + 1); leg[0] += 0.08 * sin(t * 0.8); leg[2] += 0.08 * sin(t * 1.0 + 2); }
    var HX = 1.2, HY = -85.5, VX = HX + 3.4, VY = HY + 1;                      // casca și vizieră (unități locale)
    var cS0 = '#ffffff', cS1 = '#e7ecf5', cS2 = '#a9b5cb';                      // costum: lumină → umbră

    function pt(lx, ly) {
      var px = f * u * lx, py = u * (ly + (flt ? 50 : 0));
      if (flt) { var c = cos(rot), s = sin(rot), qx = px * c - py * s, qy = px * s + py * c; px = qx; py = qy; }
      return { x: x + px, y: y + bob * u + py };
    }
    if (o.shadow !== false && !flt) A.shadow(ctx, x, y, h * 0.5, 0.34);

    ctx.save();
    ctx.translate(x, y + bob * u);
    if (flt) ctx.rotate(rot);
    ctx.scale(f * u, u);
    if (flt) ctx.translate(0, 50);
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';

    /* rucsac */
    ctx.fillStyle = 'rgba(15,25,60,.25)'; rr(ctx, -24.4, -72, 18, 34, 6.5); ctx.fill();
    ctx.fillStyle = A.lin(ctx, -26, 0, -8, 0, [[0, '#f1f5fb'], [0.5, '#c4cde0'], [1, '#8e9bb5']]);
    rr(ctx, -26, -74, 18, 34, 6.5); ctx.fill();
    ctx.fillStyle = A.lin(ctx, 0, -76, 0, -70, [[0, '#9aa7c0'], [1, '#6f7c96']]); rr(ctx, -25, -75.4, 16, 6.4, 3); ctx.fill();
    ctx.fillStyle = A.lin(ctx, 0, -66, 0, -42, [[0, A.lighten(acc, 0.25)], [1, A.darken(acc, 0.3)]]); rr(ctx, -21.6, -67, 3.6, 24, 1.8); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.55)'; rr(ctx, -24.6, -72, 2.2, 28, 1.1); ctx.fill();
    ctx.strokeStyle = '#6b7893'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(-9, -62); ctx.quadraticCurveTo(-4, -52, -9, -46); ctx.stroke();

    /* picioare */
    function limb(x0, y0, x1, y1, wd, c0, c1, c2) { cyl(ctx, x0, y0, x1, y1, wd, c0, c1, c2); cylShine(ctx, x0, y0, x1, y1, wd, 0.5); }
    function legDraw(side, ta, tb) {
      var hx0 = side * 6.4, hy0 = -45, kx = hx0 + sin(ta) * 19, ky = hy0 + cos(ta) * 19, fx = kx + sin(tb) * 17, fy = ky + cos(tb) * 17;
      limb(hx0, hy0, kx, ky, 12.6, cS0, cS1, cS2);
      ctx.fillStyle = 'rgba(70,90,140,.22)'; A.circle(ctx, kx, ky, 6.2); ctx.fill();
      limb(kx, ky, fx, fy, 11.6, cS0, cS1, cS2);
      ctx.save(); ctx.translate(fx, fy + 0.5); ctx.rotate(tb * 0.45);
      ctx.fillStyle = A.lin(ctx, 0, -3, 0, 7.5, [[0, '#a2aec8'], [0.5, '#5d6a86'], [1, '#2a3248']]); rr(ctx, -7, -3, 17.6, 10.4, 4.6); ctx.fill();
      ctx.fillStyle = rgba(acc, 0.95); rr(ctx, -6.4, 4.1, 16.4, 2.1, 1); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.35)'; rr(ctx, -5.4, -2, 10, 1.6, 0.8); ctx.fill();
      ctx.restore();
      return { x: fx, y: fy };
    }
    var legB = legDraw(-1, leg[2], leg[3]), legF = legDraw(1, leg[0], leg[1]);

    /* trunchi */
    function torso() { rr(ctx, -13.8, -72, 27.6, 29.5, 9.5); }
    torso(); ctx.fillStyle = A.lin(ctx, -14, 0, 14, 0, [[0, cS0], [0.5, cS1], [1, cS2]]); ctx.fill();
    ctx.save(); torso(); ctx.clip();
    ctx.fillStyle = A.lin(ctx, 0, -72, 0, -42, [[0, 'rgba(255,255,255,.35)'], [0.3, 'rgba(255,255,255,0)'], [1, 'rgba(25,35,80,.18)']]); ctx.fillRect(-15, -73, 30, 32);
    ctx.fillStyle = A.lin(ctx, 0, -48.5, 0, -43, [[0, A.lighten(acc, 0.2)], [1, A.darken(acc, 0.35)]]); ctx.fillRect(-15, -48.4, 30, 3.2);
    ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fillRect(-15, -48.8, 30, 0.6);
    ctx.strokeStyle = 'rgba(40,55,100,.14)'; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(-3.5, -72); ctx.lineTo(-3.5, -49); ctx.stroke();
    ctx.restore();
    torso(); ctx.strokeStyle = 'rgba(40,55,110,.30)'; ctx.lineWidth = 0.8; ctx.stroke();
    // cutie de comandă
    ctx.fillStyle = A.lin(ctx, 0, -66, 0, -57, [[0, '#46526f'], [1, '#232b41']]); rr(ctx, -9.6, -66, 12.4, 9.2, 2.4); ctx.fill();
    [['#ff6b6b', -7.4], ['#5ef2a6', -4.1], [A.lighten(acc, 0.2), -0.8]].forEach(function (d) { ctx.fillStyle = d[0]; A.circle(ctx, d[1], -63.2, 1.15); ctx.fill(); });
    ctx.fillStyle = 'rgba(255,255,255,.28)'; rr(ctx, -8.4, -60.6, 10, 1.4, 0.7); ctx.fill();
    // petec de accent (S / S′)
    ctx.fillStyle = A.lin(ctx, 4, -70, 10, -60, [[0, A.lighten(acc, 0.3)], [1, A.darken(acc, 0.25)]]); A.circle(ctx, 7.4, -64.6, 4.7); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 0.9; A.circle(ctx, 7.4, -64.6, 4.7); ctx.stroke();
    if (o.badge) {
      ctx.fillStyle = '#fff'; ctx.font = '700 5.6px system-ui,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      if (f === -1) { ctx.save(); ctx.translate(7.4, -64.3); ctx.scale(-1, 1); ctx.fillText(String(o.badge), 0, 0.2); ctx.restore(); } else ctx.fillText(String(o.badge), 7.4, -64.1);
    }

    /* brațe */
    function armDraw(side, ta, tb) {
      var sx = side * 14.6, sy = -66.5, ex = sx + sin(ta) * 15, ey = sy + cos(ta) * 15, hx = ex + sin(tb) * 14, hy = ey + cos(tb) * 14;
      ctx.fillStyle = A.lin(ctx, sx - 7, sy - 7, sx + 7, sy + 7, [[0, cS0], [1, cS2]]); A.circle(ctx, sx, sy, 7.2); ctx.fill();   // umăr
      limb(sx, sy, ex, ey, 10.8, '#fbfdff', '#dde4f0', '#b1bdd3');
      ctx.fillStyle = 'rgba(70,90,140,.22)'; A.circle(ctx, ex, ey, 5.5); ctx.fill();
      limb(ex, ey, hx, hy, 9.8, '#f6f9fd', '#d6deec', '#a9b6cd');
      var dx = sin(tb), dy = cos(tb), nx = dy, ny = -dx;
      ctx.strokeStyle = A.darken(acc, 0.05); ctx.lineWidth = 3; ctx.lineCap = 'butt';                // manșetă de accent
      ctx.beginPath(); ctx.moveTo(hx - dx * 0.6 + nx * 4.9, hy - dy * 0.6 + ny * 4.9); ctx.lineTo(hx - dx * 0.6 - nx * 4.9, hy - dy * 0.6 - ny * 4.9); ctx.stroke();
      ctx.lineCap = 'round';
      var gx = hx + dx * 4.4, gy = hy + dy * 4.4;
      ctx.fillStyle = A.rad(ctx, gx, gy, 0, 6.2, [[0, '#d5ddec'], [0.55, '#8793ad'], [1, '#434e6a']], gx - 2, gy - 2); A.circle(ctx, gx, gy, 5.5); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.35)'; A.circle(ctx, gx - 1.6, gy - 1.8, 1.8); ctx.fill();
      return { x: gx + dx * 1.2, y: gy + dy * 1.2 };
    }
    var hl = armDraw(-1, b1, b2), hr = armDraw(1, a1, a2);

    /* cască */
    ctx.fillStyle = A.lin(ctx, 0, -74.5, 0, -69, [[0, '#8b98b3'], [1, '#56627d']]); rr(ctx, -8.8, -74.2, 17.6, 5.4, 2.6); ctx.fill();     // guler
    ctx.fillStyle = 'rgba(15,25,60,.22)'; A.circle(ctx, HX + 0.8, HY + 1.6, 15.4); ctx.fill();
    ctx.fillStyle = A.rad(ctx, HX, HY, 1, 17, [[0, '#ffffff'], [0.55, '#e8edf6'], [1, '#a1adc5']], HX - 5.5, HY - 6.5); A.circle(ctx, HX, HY, 15); ctx.fill();
    ctx.strokeStyle = rgba(acc, 0.95); ctx.lineWidth = 1.5; ctx.lineCap = 'round';                      // bandă de accent
    ctx.beginPath(); ctx.arc(HX, HY, 13.2, -2.55, -0.6); ctx.stroke();
    ctx.fillStyle = A.lin(ctx, HX - 15, 0, HX - 8, 0, [[0, '#a8b4cb'], [1, '#6e7b96']]); A.circle(ctx, HX - 11.8, HY + 2, 3.5); ctx.fill();    // cască de comunicații
    // vizieră
    var vrx = 11.2, vry = 10.4;
    ctx.fillStyle = A.lin(ctx, VX - 12, VY - 12, VX + 12, VY + 12, [[0, '#8b98b3'], [1, '#3b4660']]); ell(ctx, VX, VY, vrx + 1.5, vry + 1.4, 0); ctx.fill();
    ctx.save(); ell(ctx, VX, VY, vrx, vry, 0); ctx.clip();
    var clear = o.visor === 'clear';
    if (clear) {
      ctx.fillStyle = A.lin(ctx, 0, VY - vry, 0, VY + vry, [[0, '#fff0c8'], [1, '#ffd48a']]); ctx.fillRect(VX - 13, VY - 12, 26, 24);
      A.bust(ctx, VX - 0.3, VY + 1.6, 8.4, { skin: o.skin || A.skin[0], hair: o.hair || A.hairc[1], hairStyle: o.hairStyle || 'bob', shirt: '#e5ebf5', look: num(o.look, 0.6) });
      ctx.fillStyle = 'rgba(30,60,120,.16)'; ctx.fillRect(VX - 13, VY - 12, 26, 24);
    } else {
      ctx.fillStyle = A.lin(ctx, VX - vrx, VY - vry, VX + vrx, VY + vry, [[0, '#4a78c4'], [0.4, '#243f86'], [1, '#101d4a']]); ctx.fillRect(VX - 13, VY - 12, 26, 24);
      ctx.fillStyle = A.rad(ctx, VX + 4.5, VY + 6.5, 0, 8, [[0, 'rgba(255,170,90,.55)'], [1, 'rgba(255,170,90,0)']]); ctx.fillRect(VX - 13, VY - 12, 26, 24);       // reflexie caldă (Soare)
      ctx.fillStyle = 'rgba(190,225,255,.5)'; ctx.beginPath(); ctx.arc(VX + 4.3, VY + 9.8, 6.4, PI * 1.05, PI * 1.62); ctx.arc(VX + 4.3, VY + 11.4, 6.0, PI * 1.55, PI * 1.08, true); ctx.closePath(); ctx.fill();   // „Pământ” reflectat
    }
    ctx.fillStyle = A.lin(ctx, VX - vrx, VY - vry, VX + 4, VY + 2, [[0, 'rgba(255,255,255,.62)'], [1, 'rgba(255,255,255,0)']]);
    ctx.beginPath(); ctx.moveTo(VX - vrx, VY - 1); ctx.quadraticCurveTo(VX - vrx * 0.55, VY - vry * 1.05, VX + 2.5, VY - vry); ctx.lineTo(VX - 1.5, VY - vry * 0.55); ctx.quadraticCurveTo(VX - vrx * 0.55, VY - vry * 0.5, VX - vrx * 0.62, VY + 2); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.9)'; A.circle(ctx, VX - 5.6, VY - 5.4, 0.9); ctx.fill();
    var vg = ctx.createRadialGradient(VX, VY, vry * 0.55, VX, VY, vry * 1.05); vg.addColorStop(0, 'rgba(10,18,50,0)'); vg.addColorStop(1, 'rgba(10,18,50,.42)');
    ctx.fillStyle = vg; ctx.fillRect(VX - 13, VY - 12, 26, 24);
    ctx.restore();
    ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 0.9; ctx.beginPath(); ctx.ellipse(HX, HY, 14.4, 14.4, 0, PI * 1.08, PI * 1.55); ctx.stroke();    // luciu pe cască
    ctx.restore();

    var anchors = {
      head: pt(HX, HY), handR: pt(hr.x, hr.y), handL: pt(hl.x, hl.y), feet: flt ? pt(0, 0) : { x: x, y: y }, top: pt(0, -100), center: pt(0, -50),
      visor: pt(VX, VY), back: pt(-17, -57), u: u
    };
    if (o.holdR) o.holdR(ctx, anchors.handR.x, anchors.handR.y, u);
    if (o.holdL) o.holdL(ctx, anchors.handL.x, anchors.handL.y, u);
    return anchors;
  };

  /* ======================= GALERIE (partea 1) ======================= */
  A.gallery.push({
    name: 'TEST planete', src: 'art-space.js', w: 560, h: 220, draw: function (ctx, W, H, t) {
      A.space(ctx, W, H, { cam: t * 10, t: t });
      A.planet(ctx, W * 0.14, H * 0.5, H * 0.3, { kind: 'earth', t: t });
      A.planet(ctx, W * 0.32, H * 0.5, H * 0.22, { kind: 'moon', t: t });
      A.planet(ctx, W * 0.48, H * 0.5, H * 0.24, { kind: 'mars', t: t });
      A.planet(ctx, W * 0.68, H * 0.5, H * 0.26, { kind: 'gas', t: t, ring: true });
      A.planet(ctx, W * 0.88, H * 0.5, H * 0.2, { kind: 'ice', t: t });
    }
  });
  A.gallery.push({
    name: 'TEST statie', src: 'art-space.js', w: 560, h: 300, draw: function (ctx, W, H, t) {
      A.space(ctx, W, H, { cam: t * 10, t: t });
      A.station(ctx, W * 0.5, H * 0.5, W * 0.8, { t: t, label: 'Stația (S)' });
    }
  });
  A.gallery.push({
    name: 'TEST rachetă · A.rocket', src: 'art-space.js', w: 560, h: 300, draw: function (ctx, W, H, t) {
      A.space(ctx, W, H, { cam: t * 26, t: t });
      var r = A.rocket(ctx, W * 0.45, H * 0.45, W * 0.55, { t: t, thrust: 0.8, label: 'Nava (S′)' });
      A.speedLines(ctx, r.tail.x - 10, H * 0.45, W * 0.2, { t: t });
      A.pod(ctx, W * 0.82, H * 0.2, W * 0.16, { t: t });
    }
  });
  A.gallery.push({
    name: 'Fundal cosmic · A.space + A.star + A.planet', src: 'art-space.js', w: 560, h: 300, draw: function (ctx, W, H, t) {
      A.space(ctx, W, H, { cam: t * 26, t: t });
      A.star(ctx, W * 0.82, H * 0.24, Math.min(W, H) * 0.035, { t: t });
    }
  });
})(window);
