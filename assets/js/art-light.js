/* ==========================================================================
   RF.art — modulul LUMINĂ  ·  assets/js/art-light.js
   Fotoni, unde, fascicule, laser, fulgere, fronturi, spectru, oglinzi,
   ceasul de lumină, drumuri în zigzag, bec.   Ghid de stil: _dev/art-guide.md §1

   Pe scene ÎNCHISE (tema întunecată sau o.dark:true): miez alb-incandescent + halou colorat, amestec aditiv.
   Pe scene DESCHISE (tema luminoasă): culoare mai saturată/închisă, amestec normal, contur fin.

   OPȚIUNI COMUNE (toate funcțiile):
     color | nm   culoarea luminii: orice culoare CSS, sau lungimea de undă în nm (380–750 = culoarea reală;
                  <380 = ultraviolet violet pal, >750 = infraroșu roșu cald). Implicit chihlimbar (P.light).
     dark         bool — scena din spatele desenului este întunecată (ex. scene spațiale în tema luminoasă). Implicit = tema.
     additive     bool — amestec aditiv ('lighter'). Implicit = dark.
     alpha        0..1 opacitate generală.        t   secunde (sclipiri/unduiri; RF.reduced => 0).
   Toate funcțiile întorc un obiect de ancore în coordonate canvas și nu aruncă erori la opțiuni lipsă.

   SEMNĂTURI
   A.photon(ctx,x,y,r,o)          (x,y)=centru; r=raza miezului (haloul ajunge la ~5r).
        o:{color|nm, angle (rad, direcția), tail (px | true=9r | 0.3..3 = multiplu de 9r; coadă ondulată în spate),
           t, alpha, lite (doar halou+miez, pentru mulțimi de fotoni)}          → {x,y,r,angle,tail:{x,y}}
   A.wavePacket(ctx,x0,y0,x1,y1,o) pachet de undă pe segment, cu înfășurătoare gaussiană.
        o:{color|nm, lambda (px; implicit ∝ nm), amp (px), phase (rad; implicit t·6), width (px), envelope:true,
           center 0..1 (poziția vârfului înfășurătoarei), sigma (fracție din lungime), glow:true, axis:false, alpha}
                                                                               → {a,b,center,lambda,amp,angle,at(s)}
   A.beam(ctx,x0,y0,x1,y1,o)      fascicul laser/lumină.
        o:{color|nm, w (grosimea miezului px, 4), from,to (0..1 porțiunea desenată; la to<1 apare vârful luminos),
           wave:false|true|{lambda,amp} (undă pe fascicul; phase|t), alpha, additive,
           pulse:{pos 0..1 (centrul), len px, trail 0..1, clip:true} → doar un puls care se mișcă}
                                                                               → {a,b,head,len,angle,at(f)}
   A.laser(ctx,x,y,w,o)           lanternă/laser de mână; (x,y)=centrul aparatului, w=lungimea, privește spre dreapta.
        o:{on:true, color|nm, angle, facing:1|-1 (−1 = oglindit, privește spre stânga), accent (P.s2), t}
                                                                               → {muzzle,lens,back,grip,angle,w}
   A.flash(ctx,x,y,r,o)           explozie stelată pentru un eveniment. o:{p 0..1 (0,3 implicit: crește, apoi se stinge), color, rays 12, t}
                                                                               → {x,y,R,intensity}
   A.lightning(ctx,x,y0,y1,o)     fulger de la (x,y0) în jos la (x,y1). o:{p (înfășurătoare, 0,12 = vârf), seed, color, w}
                                                                               → {top,bottom,pts,intensity}
   A.wavefront(ctx,x,y,r,o)       front circular. o:{color, alpha, w (2.4), fill:true, ripples:2, arc:[a0,a1]}   → {x,y,r}
   A.front(ctx,x,y0,y1,o)         front plan (linie verticală). o:{color, w (3), dir:1|-1|0 (sensul de mers), wake px (38), arrows:false}   → {x,y0,y1,dir}
   A.spectrum(ctx,x,y,w,h,o)      bară spectru; (x,y)=colțul stânga-sus. o:{range:[300,1000], labels:true, zones:true,
                                  nm (număr | listă | [{nm,label,color}]), unit:'nm'}
                                                                               → {nmToX,xToNm,x,y,w,h,bottom,colorAt}
   A.mirror(ctx,x,y,w,o)          oglindă; (x,y)=centrul barei. o:{face:'up'|'down', th, angle (rad), mount:true, accent, hit 0..1, hitAt −1..1}
                                                                               → {surface,left,right,normal,top,bottom,w,th}
   A.lightClock(ctx,x,y,h,o)      ceas de lumină; (x,y)=centrul. o:{w, accent (P.s1), phase (0..1 = un du-te-vino; implicit t/2,4),
                                  photon:true, stand:false, guide:true, color|nm, t, alpha}
                                                                               → {top,bottom,photon,w,h,tube,phase,up}
   A.zigzag(ctx,pts,o)            traseu de lumină [{x,y}|[x,y]…]. o:{color|nm, w (3), dash, arrows:true, nodes:true, progress 0..1, head}
                                                                               → {length,drawn,head,pts}
   A.bulb(ctx,x,y,r,o)            bec; (x,y)=centrul globului. o:{on:true|0..1, color, hang:false (baza sus), cord px, rays:false, t}
                                                                               → {center,filament,base,top}
   ========================================================================== */
(function (global) {
  'use strict';
  var RF = global.RF, D = RF.draw, TAU = Math.PI * 2, HP = Math.PI / 2;
  var A = RF.art = RF.art || {};
  A.gallery = A.gallery || [];

  /* ======================= utilitare private ======================= */
  function num(v, d) { v = +v; return isFinite(v) ? v : d; }
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function sstep(a, b, x) { x = clamp((x - a) / (b - a), 0, 1); return x * x * (3 - 2 * x); }
  function pal() { return RF.sim.palette(); }
  function T(o) { return RF.reduced ? 0 : num(o && o.t, 0); }
  function sceneDark(o) { return (o && o.dark != null) ? !!o.dark : !!pal().dark; }
  function useAdd(o, dark) { return (o && o.additive != null) ? !!o.additive : dark; }
  function rgba(c, a) { return D.rgba(c, Math.round(clamp(a, 0, 1) * 1000) / 1000); }
  function lum(c) { var p = A.parse(c); return 0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2]; }
  /* adaptează culoarea la fundal: pe scene închise o luminează dacă e prea întunecată; pe scene deschise o întunecă dacă e prea pală */
  function fit(c, dark) {
    var l = lum(c);
    if (dark) return l < 140 ? A.mix(c, '#ffffff', clamp((140 - l) / (255 - l) * 0.9, 0, 0.8)) : c;
    return l > 150 ? A.mix(c, '#000000', clamp(1 - 150 / l, 0, 0.6)) : c;
  }

  /* lungime de undă (nm) → culoare; în 420–700 identică cu D.wavelengthColor, capetele sunt mai luminoase; în afara 380–750 se duce spre indigo/roșu închis (pentru bara de spectru) */
  var KEYS = [380, 420, 440, 490, 510, 580, 645, 700, 750];
  function nmColor(nm) {
    nm = num(nm, 550);
    var nn = clamp(nm, 380, 750), r = 0, g = 0, b = 0, f = 1;
    if (nn < 440) { r = (440 - nn) / 60 * (1 - 0.2 * clamp((420 - nn) / 40, 0, 1)); b = 1; }
    else if (nn < 490) { g = (nn - 440) / 50; b = 1; }
    else if (nn < 510) { g = 1; b = (510 - nn) / 20; }
    else if (nn < 580) { r = (nn - 510) / 70; g = 1; }
    else if (nn < 645) { r = 1; g = (645 - nn) / 65; }
    else r = 1;
    if (nn < 420) f = 0.55 + 0.45 * (nn - 380) / 40;
    else if (nn > 700) f = 0.5 + 0.5 * (750 - nn) / 50;
    function c(v) { return Math.round(255 * Math.pow(clamp(v * f, 0, 1), 0.8)); }
    var s = 'rgb(' + c(r) + ',' + c(g) + ',' + c(b) + ')';
    if (nm < 380) return A.mix(s, '#1b1240', clamp((380 - nm) / 90, 0, 1));
    if (nm > 750) return A.mix(s, '#2a0a10', clamp((nm - 750) / 230, 0, 1));
    return s;
  }
  /* culoarea unui foton cu lungimea de undă nm (pentru lumină care străluce) */
  function nmGlow(nm) { return nm < 380 ? '#b49cff' : nm > 750 ? '#ff6a55' : nmColor(nm); }
  /* culoarea luminii dintr-un obiect de opțiuni */
  function lightCol(o, dark) {
    var P = pal(), c;
    if (o && o.color) c = o.color;
    else if (o && o.nm != null) c = nmGlow(num(o.nm, 550));
    else c = (dark === !!P.dark && P.light) ? P.light : (dark ? '#ffd36e' : '#c47f00');
    return fit(c, dark);
  }

  /* ======================= primitive de strălucire ======================= */
  /* halou moale rotund (cădere aproape gaussiană) */
  function halo(ctx, x, y, rad, col, a, add) {
    if (a <= 0.004 || rad < 0.5) return;
    ctx.save();
    if (add) ctx.globalCompositeOperation = 'lighter';
    var g = ctx.createRadialGradient(x, y, 0, x, y, rad);
    g.addColorStop(0, rgba(col, a)); g.addColorStop(0.16, rgba(col, a * 0.62)); g.addColorStop(0.38, rgba(col, a * 0.27));
    g.addColorStop(0.68, rgba(col, a * 0.07)); g.addColorStop(1, rgba(col, 0));
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, rad, 0, TAU); ctx.fill();
    ctx.restore();
  }
  /* elipsă moale: gradient radial unitar scalat (rx, ry), rotit cu ang; stops = [[0..1, culoare]…] */
  function blob(ctx, x, y, rx, ry, ang, stops, add) {
    ctx.save();
    if (add) ctx.globalCompositeOperation = 'lighter';
    ctx.translate(x, y); if (ang) ctx.rotate(ang); ctx.scale(Math.max(rx, 0.1), Math.max(ry, 0.1));
    var g = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
    for (var i = 0; i < stops.length; i++) g.addColorStop(stops[i][0], stops[i][1]);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 1, 0, TAU); ctx.fill();
    ctx.restore();
  }
  /* cometă: strălucire alungită în spatele unui cap din (x,y), care se mișcă spre unghiul ang; len px, wid = semi-lățime la cap */
  function comet(ctx, x, y, ang, len, wid, col, a, add) {
    if (len < 1 || wid < 0.3 || a <= 0.004) return;
    ctx.save();
    if (add) ctx.globalCompositeOperation = 'lighter';
    ctx.translate(x, y); ctx.rotate(ang); ctx.translate(-len / 2, 0); ctx.scale(len / 2, wid);
    var g = ctx.createRadialGradient(0.86, 0, 0, 0, 0, 1);
    g.addColorStop(0, rgba(col, a)); g.addColorStop(0.3, rgba(col, a * 0.55)); g.addColorStop(0.65, rgba(col, a * 0.16)); g.addColorStop(1, rgba(col, 0));
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 1, 0, TAU); ctx.fill();
    ctx.restore();
  }
  /* stea cu 4 vârfuri (sclipire), centrată în (0,0), vârfurile la distanța L */
  function starPath(ctx, L, c) {
    ctx.beginPath();
    ctx.moveTo(0, -L); ctx.quadraticCurveTo(c, -c, L, 0); ctx.quadraticCurveTo(c, c, 0, L);
    ctx.quadraticCurveTo(-c, c, -L, 0); ctx.quadraticCurveTo(-c, -c, 0, -L); ctx.closePath();
  }
  function sparkle(ctx, L, col, a, dark) {
    var g = A.rad(ctx, 0, 0, 0, L, dark
      ? [[0, rgba('#ffffff', a)], [0.12, rgba(A.lighten(col, 0.65), 0.95 * a)], [0.45, rgba(col, 0.5 * a)], [1, rgba(col, 0)]]
      : [[0, rgba(A.lighten(col, 0.3), a)], [0.5, rgba(col, 0.55 * a)], [1, rgba(col, 0)]]);
    ctx.fillStyle = g; starPath(ctx, L, L * 0.075); ctx.fill();
  }
  /* bandă (în coordonate locale) cu profil transversal: prof = [[d, culoare]…], d=0 centru … 1 margine; capete rotunjite moi */
  function ribbon(ctx, s0, s1, hw, prof) {
    if (hw < 0.25 || s1 < s0) return;
    var i, n = prof.length;
    var lg = ctx.createLinearGradient(0, -hw, 0, hw);
    for (i = n - 1; i >= 0; i--) lg.addColorStop(0.5 - prof[i][0] / 2, prof[i][1]);
    for (i = 1; i < n; i++) lg.addColorStop(0.5 + prof[i][0] / 2, prof[i][1]);
    var rg = ctx.createRadialGradient(0, 0, 0, 0, 0, hw);
    for (i = 0; i < n; i++) rg.addColorStop(prof[i][0], prof[i][1]);
    ctx.fillStyle = lg;
    if (s1 > s0) ctx.fillRect(s0 - 0.5, -hw, s1 - s0 + 1, hw * 2);
    ctx.fillStyle = rg;
    ctx.save(); ctx.translate(s0, 0); ctx.beginPath(); ctx.arc(0, 0, hw, HP, HP * 3); ctx.fill(); ctx.restore();
    ctx.save(); ctx.translate(s1, 0); ctx.beginPath(); ctx.arc(0, 0, hw, -HP, HP); ctx.fill(); ctx.restore();
  }
  /* bandă conică în jurul unei curbe: xFn(s), yFn(s), wFn(s)=lățime totală, s din [sa,sb] în n pași */
  function makeBand(n, xFn, yFn, wFn, sa, sb) {
    var B = { n: n, xs: [], ys: [], ws: [], nx: [], ny: [] }, i, s, h = (sb - sa) / n;
    for (i = 0; i <= n; i++) { s = sa + h * i; B.xs.push(xFn(s)); B.ys.push(yFn(s)); B.ws.push(wFn(s)); }
    for (i = 0; i <= n; i++) {
      var i0 = Math.max(0, i - 1), i1 = Math.min(n, i + 1), tx = B.xs[i1] - B.xs[i0], ty = B.ys[i1] - B.ys[i0], tl = Math.hypot(tx, ty) || 1;
      B.nx.push(-ty / tl); B.ny.push(tx / tl);
    }
    return B;
  }
  function bandFill(ctx, B, mult, fill) {
    var i, h;
    ctx.beginPath();
    for (i = 0; i <= B.n; i++) { h = B.ws[i] * mult / 2; if (i) ctx.lineTo(B.xs[i] + B.nx[i] * h, B.ys[i] + B.ny[i] * h); else ctx.moveTo(B.xs[i] + B.nx[i] * h, B.ys[i] + B.ny[i] * h); }
    for (i = B.n; i >= 0; i--) { h = B.ws[i] * mult / 2; ctx.lineTo(B.xs[i] - B.nx[i] * h, B.ys[i] - B.ny[i] * h); }
    ctx.closePath(); ctx.fillStyle = fill; ctx.fill();
  }

  /* ======================= A.photon ======================= */
  function photonTail(ctx, x, y, ang, r, Lt, col, dark, add, t) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
    if (add) ctx.globalCompositeOperation = 'lighter';
    var lam = Math.max(r * 3.3, 10), amp = r * 0.66, n = clamp(Math.ceil(Lt / 3), 12, 90), ph = t * 9;
    var B = makeBand(n, function (s) { return -s; },
      function (s) { var u = s / Lt; return amp * sstep(0, 0.16, u) * Math.pow(1 - u, 0.85) * Math.sin(TAU * s / lam - ph); },
      function (s) { return r * 0.56 * Math.pow(1 - s / Lt, 0.8) + 0.25; }, 0, Lt);
    function grad(c0, a0) { var g = ctx.createLinearGradient(0, 0, -Lt, 0); g.addColorStop(0, rgba(c0, a0)); g.addColorStop(1, rgba(c0, 0)); return g; }
    if (dark) {
      bandFill(ctx, B, 4.2, grad(col, 0.2)); bandFill(ctx, B, 1.8, grad(A.lighten(col, 0.2), 0.5));
      bandFill(ctx, B, 0.8, grad('#ffffff', 0.85));
    } else {
      bandFill(ctx, B, 3.2, grad(col, 0.16)); bandFill(ctx, B, 1, grad(col, 0.95));
    }
    ctx.restore();
  }
  A.photon = function (ctx, x, y, r, o) {
    o = o || {};
    x = num(x, 0); y = num(y, 0); r = Math.max(1, num(r, 6));
    var dark = sceneDark(o), add = useAdd(o, dark), col = lightCol(o, dark);
    var ang = num(o.angle, 0), t = T(o), al = clamp(num(o.alpha, 1), 0, 1);
    var tl = o.tail === true ? r * 9 : num(o.tail, 0);
    if (tl > 0 && tl <= 3) tl *= r * 9;
    var tw = 1 + 0.07 * Math.sin(t * 5.3 + 1.3), tw2 = 1 + 0.13 * Math.sin(t * 3.4);
    var res = { x: x, y: y, r: r, angle: ang, tail: { x: x - Math.cos(ang) * tl, y: y - Math.sin(ang) * tl } };
    if (al <= 0.003) return res;
    ctx.save();
    ctx.globalAlpha *= al;
    if (tl > 0) photonTail(ctx, x, y, ang, r, tl, col, dark, add, t);
    if (dark) {
      halo(ctx, x, y, r * 5.2, col, 0.38, add);
      halo(ctx, x, y, r * 2.4, A.lighten(col, 0.3), 0.6, add);
      if (!o.lite) {
        ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
        if (add) ctx.globalCompositeOperation = 'lighter';
        sparkle(ctx, r * 4 * tw, col, 1, true);
        ctx.rotate(Math.PI / 4); sparkle(ctx, r * 2.3 * tw2, col, 0.55, true);
        ctx.restore();
      }
      ctx.save(); if (add) ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = A.rad(ctx, x, y, 0, r * 0.8, [[0, '#ffffff'], [0.5, '#ffffff'], [0.8, rgba(A.lighten(col, 0.55), 0.9)], [1, rgba(col, 0)]]);
      ctx.beginPath(); ctx.arc(x, y, r * 0.8, 0, TAU); ctx.fill(); ctx.restore();
    } else {
      halo(ctx, x, y, r * 3.6, col, 0.4, false);
      if (!o.lite) {
        ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
        sparkle(ctx, r * 3.6 * tw, col, 1, false); ctx.rotate(Math.PI / 4); sparkle(ctx, r * 2 * tw2, col, 0.6, false);
        ctx.restore();
      }
      ctx.fillStyle = A.rad(ctx, x, y, r * 0.08, r * 0.78, [[0, '#ffffff'], [0.3, A.lighten(col, 0.5)], [0.75, col], [1, A.darken(col, 0.3)]], x - r * 0.2, y - r * 0.24);
      ctx.beginPath(); ctx.arc(x, y, r * 0.78, 0, TAU); ctx.fill();
      ctx.strokeStyle = rgba(A.darken(col, 0.5), 0.5); ctx.lineWidth = Math.max(1, r * 0.1); ctx.stroke();
    }
    ctx.restore();
    return res;
  };

  /* ======================= A.wavePacket ======================= */
  A.wavePacket = function (ctx, x0, y0, x1, y1, o) {
    o = o || {};
    x0 = num(x0, 0); y0 = num(y0, 0); x1 = num(x1, x0 + 200); y1 = num(y1, y0);
    var dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy), ang = Math.atan2(dy, dx);
    var dark = sceneDark(o), add = useAdd(o, dark), col = lightCol(o, dark), al = clamp(num(o.alpha, 1), 0, 1);
    var lam = o.lambda != null ? Math.max(4, num(o.lambda, 24)) : (o.nm != null ? clamp(num(o.nm, 550) * 0.06, 8, Math.max(8, L / 3)) : clamp(L / 10, 10, 48));
    var amp = o.amp != null ? Math.abs(num(o.amp, 10)) : clamp(L * 0.085, 5, 24);
    var ph = o.phase != null ? num(o.phase, 0) : T(o) * 6, w = Math.max(1, num(o.width, 3));
    var useEnv = o.envelope !== false, cc = clamp(num(o.center, 0.5), 0, 1), sg = clamp(num(o.sigma, 0.17), 0.04, 0.5);
    function env(s) { if (useEnv) { var u = (s / L - cc) / sg; return Math.exp(-u * u / 2); } return sstep(0, 0.07, s / L) * (1 - sstep(0.93, 1, s / L)); }
    var res = {
      a: { x: x0, y: y0 }, b: { x: x1, y: y1 }, center: { x: x0 + dx * cc, y: y0 + dy * cc }, lambda: lam, amp: amp, angle: ang,
      at: function (s) { var f = clamp(s, 0, 1); return { x: x0 + dx * f, y: y0 + dy * f }; }
    };
    if (L < 6 || al <= 0.003) return res;
    var n = clamp(Math.ceil(L / Math.min(lam / 8, 4)), 40, 420);
    var B = makeBand(n, function (s) { return s; }, function (s) { return amp * env(s) * Math.sin(TAU * s / lam - ph); },
      function (s) { return w * (0.28 + 0.72 * env(s)); }, 0, L);
    ctx.save();
    ctx.translate(x0, y0); ctx.rotate(ang); ctx.globalAlpha *= al;
    var i, g;
    if (add) ctx.globalCompositeOperation = 'lighter';
    if (o.axis) { ctx.strokeStyle = rgba(col, 0.22); ctx.lineWidth = 1; ctx.setLineDash([3, 5]); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(L, 0); ctx.stroke(); ctx.setLineDash([]); }
    if (useEnv && amp > 2) {   // înfășurătoarea: umplere discretă + contur punctat
      var m = Math.max(12, Math.round(n / 3)), tops = [];
      ctx.beginPath();
      for (i = 0; i <= m; i++) { var s = L * i / m; tops.push(s); ctx[i ? 'lineTo' : 'moveTo'](s, -amp * env(s)); }
      for (i = m; i >= 0; i--) ctx.lineTo(tops[i], amp * env(tops[i]));
      ctx.closePath(); ctx.fillStyle = rgba(col, dark ? 0.07 : 0.08); ctx.fill();
      ctx.strokeStyle = rgba(col, dark ? 0.35 : 0.4); ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
      ctx.beginPath(); for (i = 0; i <= m; i++) ctx[i ? 'lineTo' : 'moveTo'](tops[i], -amp * env(tops[i])); ctx.stroke();
      ctx.beginPath(); for (i = 0; i <= m; i++) ctx[i ? 'lineTo' : 'moveTo'](tops[i], amp * env(tops[i])); ctx.stroke();
      ctx.setLineDash([]);
    }
    function lgrad(c0, a0, a1) {   // alfa mai mic la capete
      var gg = ctx.createLinearGradient(0, 0, L, 0);
      gg.addColorStop(0, rgba(c0, 0)); gg.addColorStop(useEnv ? 0.1 : 0.04, rgba(c0, a1)); gg.addColorStop(0.5, rgba(c0, a0)); gg.addColorStop(useEnv ? 0.9 : 0.96, rgba(c0, a1)); gg.addColorStop(1, rgba(c0, 0));
      return gg;
    }
    if (o.glow !== false) { bandFill(ctx, B, 6, lgrad(col, dark ? 0.09 : 0.1, dark ? 0.05 : 0.05)); bandFill(ctx, B, 3, lgrad(col, dark ? 0.2 : 0.18, dark ? 0.1 : 0.1)); }
    bandFill(ctx, B, 1, lgrad(dark ? A.lighten(col, 0.2) : col, 1, 0.8));
    if (dark) bandFill(ctx, B, 0.4, lgrad('#ffffff', 0.9, 0.5));
    else bandFill(ctx, B, 0.3, lgrad(A.lighten(col, 0.6), 0.8, 0.5));
    ctx.restore();
    return res;
  };

  /* ======================= A.beam / A.front ======================= */
  /* corpul unui fascicul în coordonate locale (axa x), de la s0 la s1; k = intensitatea miezului (0..1) */
  function beamBody(ctx, s0, s1, w, col, dark, add, k) {
    k = k == null ? 1 : k;
    ctx.save();
    if (add) ctx.globalCompositeOperation = 'lighter';
    if (dark) {
      var lc = A.lighten(col, 0.3);
      ribbon(ctx, s0, s1, w * 5.8, [[0, rgba(col, 0.2)], [0.3, rgba(col, 0.1)], [0.65, rgba(col, 0.03)], [1, rgba(col, 0)]]);
      ribbon(ctx, s0, s1, w * 2.5, [[0, rgba(lc, 0.6)], [0.3, rgba(col, 0.38)], [0.65, rgba(col, 0.12)], [1, rgba(col, 0)]]);
      ribbon(ctx, s0, s1, w * 0.78, [[0, rgba('#ffffff', k)], [0.45, rgba(A.lighten(col, 0.7), 0.95 * k)], [1, rgba(col, 0)]]);
    } else {
      ribbon(ctx, s0, s1, w * 4.2, [[0, rgba(col, 0.2)], [0.4, rgba(col, 0.08)], [1, rgba(col, 0)]]);
      ribbon(ctx, s0, s1, w * 1.9, [[0, rgba(col, 0.5)], [0.5, rgba(col, 0.2)], [1, rgba(col, 0)]]);
      ribbon(ctx, s0, s1, w * 0.8, [[0, rgba(A.lighten(col, 0.35), k)], [0.5, rgba(col, k)], [0.85, rgba(col, 0.55 * k)], [1, rgba(col, 0)]]);
      ribbon(ctx, s0, s1, w * 0.22, [[0, 'rgba(255,255,255,.8)'], [1, 'rgba(255,255,255,0)']]);
    }
    ctx.restore();
  }
  /* undă sinusoidală de amplitudine constantă (cu margini moi) în coordonate locale, între s0 și s1 */
  function waveLine(ctx, s0, s1, amp, lam, ph, wd, col, dark, add) {
    var len = s1 - s0;
    if (len < 4) return;
    var fl = Math.min(36, len * 0.25), n = clamp(Math.ceil(len / Math.min(lam / 8, 4)), 12, 420);
    function fade(s) { return sstep(0, fl, s - s0) * (1 - sstep(len - fl, len, s - s0 + 0)); }
    var B = makeBand(n, function (s) { return s; }, function (s) { return amp * fade(s) * Math.sin(TAU * s / lam - ph); },
      function (s) { return wd * (0.35 + 0.65 * fade(s)); }, s0, s1);
    ctx.save();
    if (add) ctx.globalCompositeOperation = 'lighter';
    function lg(c0, a0) { var g = ctx.createLinearGradient(s0, 0, s1, 0); g.addColorStop(0, rgba(c0, 0)); g.addColorStop(Math.min(0.2, fl / len), rgba(c0, a0)); g.addColorStop(1 - Math.min(0.2, fl / len), rgba(c0, a0)); g.addColorStop(1, rgba(c0, 0)); return g; }
    if (dark) { bandFill(ctx, B, 4, lg(col, 0.18)); bandFill(ctx, B, 1.5, lg(A.lighten(col, 0.25), 0.9)); bandFill(ctx, B, 0.5, lg('#ffffff', 0.85)); }
    else { bandFill(ctx, B, 3, lg(col, 0.16)); bandFill(ctx, B, 1.1, lg(col, 0.95)); }
    ctx.restore();
  }
  /* puls luminos (în coordonate locale): centrul în c, lungimea len */
  function pulseGlow(ctx, c, len, w, col, dark, add) {
    var hx = c + len * 0.28;
    if (dark) {
      comet(ctx, hx, 0, 0, len * 1.5, w * 1.5, col, 0.55, add);
      blob(ctx, c, 0, len * 0.72, w * 3.4, 0, [[0, rgba(A.lighten(col, 0.3), 0.55)], [0.35, rgba(col, 0.28)], [1, rgba(col, 0)]], add);
      blob(ctx, c + len * 0.05, 0, len * 0.42, w * 1.0, 0, [[0, 'rgba(255,255,255,1)'], [0.5, rgba(A.lighten(col, 0.7), 0.9)], [1, rgba(col, 0)]], add);
      halo(ctx, hx, 0, w * 3.2, A.lighten(col, 0.5), 0.55, add);
    } else {
      comet(ctx, hx, 0, 0, len * 1.5, w * 1.4, col, 0.4, false);
      blob(ctx, c, 0, len * 0.7, w * 2.6, 0, [[0, rgba(col, 0.5)], [0.5, rgba(col, 0.2)], [1, rgba(col, 0)]], false);
      blob(ctx, c + len * 0.05, 0, len * 0.42, w * 0.95, 0, [[0, rgba(A.lighten(col, 0.4), 1)], [0.55, rgba(col, 1)], [1, rgba(col, 0)]], false);
    }
  }
  A.beam = function (ctx, x0, y0, x1, y1, o) {
    o = o || {};
    x0 = num(x0, 0); y0 = num(y0, 0); x1 = num(x1, x0 + 200); y1 = num(y1, y0);
    var dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy), ang = Math.atan2(dy, dx);
    var dark = sceneDark(o), add = useAdd(o, dark), col = lightCol(o, dark), al = clamp(num(o.alpha, 1), 0, 1);
    var w = Math.max(1, num(o.w, 4)), f0 = clamp(num(o.from, 0), 0, 1), f1 = clamp(num(o.to, 1), 0, 1);
    if (f1 < f0) { var sw = f0; f0 = f1; f1 = sw; }
    var s0 = f0 * L, s1 = f1 * L;
    function at(f) { return { x: x0 + dx * f, y: y0 + dy * f }; }
    var res = { a: { x: x0, y: y0 }, b: { x: x1, y: y1 }, head: at(f1), len: L, angle: ang, at: at };
    if (L < 0.5 || al <= 0.003) return res;
    ctx.save();
    ctx.translate(x0, y0); ctx.rotate(ang); ctx.globalAlpha *= al;
    if (o.pulse) {
      var pl = o.pulse === true ? {} : o.pulse;
      var plen = Math.max(6, num(pl.len, Math.max(24, L * 0.1))), pf = clamp(num(pl.pos, 0.5), 0, 1), pc = pf * L;
      ctx.save();
      if (pl.clip !== false) { ctx.beginPath(); ctx.rect(0, -w * 14, L, w * 28); ctx.clip(); }
      if (num(pl.trail, 0) > 0) beamBody(ctx, s0, s1, w * 0.7, col, dark, add, clamp(num(pl.trail, 0), 0, 1) * 0.4);
      pulseGlow(ctx, pc, plen, w, col, dark, add);
      ctx.restore();
      res.head = at(pf);
    } else {
      var wv = o.wave ? (typeof o.wave === 'object' ? o.wave : {}) : null;
      beamBody(ctx, s0, s1, w, col, dark, add, wv ? 0.6 : 1);
      if (wv) {
        var lam = Math.max(6, num(o.lambda != null ? o.lambda : wv.lambda, Math.max(16, w * 7)));
        var amp = Math.abs(num(o.amp != null ? o.amp : wv.amp, Math.max(w * 2.2, 6)));
        var ph = o.phase != null ? num(o.phase, 0) : (wv.phase != null ? num(wv.phase, 0) : T(o) * 6);
        waveLine(ctx, s0, s1, amp, lam, ph, Math.max(1.4, w * 0.55), col, dark, add);
      }
      if (f1 < 0.999 && o.head !== false) {   // vârf luminos la capătul care avansează
        if (dark) { halo(ctx, s1, 0, w * 4, A.lighten(col, 0.4), 0.6, add); halo(ctx, s1, 0, w * 1.6, '#ffffff', 0.8, add); }
        else { halo(ctx, s1, 0, w * 3.2, col, 0.5, false); }
      }
    }
    ctx.restore();
    return res;
  };

  /* front plan: linie verticală luminoasă cu o dâră în spate */
  A.front = function (ctx, x, y0, y1, o) {
    o = o || {};
    x = num(x, 0); y0 = num(y0, 0); y1 = num(y1, y0 + 100);
    var dark = sceneDark(o), add = useAdd(o, dark), col = lightCol(o, dark), al = clamp(num(o.alpha, 1), 0, 1);
    var w = Math.max(1, num(o.w, 3)), dir = o.dir == null ? 1 : (o.dir < 0 ? -1 : (o.dir > 0 ? 1 : 0)), wake = Math.max(0, num(o.wake, 38));
    var top = Math.min(y0, y1), bot = Math.max(y0, y1), len = bot - top;
    var res = { x: x, y0: y0, y1: y1, dir: dir };
    if (len < 1 || al <= 0.003) return res;
    ctx.save(); ctx.globalAlpha *= al;
    if (dir && wake > 1) {
      var xb = x - dir * wake, ins = Math.min(len * 0.07, 18), g = ctx.createLinearGradient(x, 0, xb, 0);
      g.addColorStop(0, rgba(col, dark ? 0.3 : 0.24)); g.addColorStop(0.35, rgba(col, dark ? 0.1 : 0.09)); g.addColorStop(1, rgba(col, 0));
      ctx.save(); if (add) ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x, top); ctx.lineTo(x, bot); ctx.lineTo(xb, bot - ins); ctx.lineTo(xb, top + ins); ctx.closePath(); ctx.fill();
      ctx.restore();
    }
    ctx.save(); ctx.translate(x, top); ctx.rotate(HP);
    beamBody(ctx, 0, len, w, col, dark, add, 1);
    ctx.restore();
    if (o.arrows && dir) {   // trei săgeți mici în dâră
      var sz = Math.max(5, w * 2.2);
      ctx.fillStyle = rgba(dark ? A.lighten(col, 0.4) : col, 0.9);
      [0.22, 0.5, 0.78].forEach(function (f) {
        var ay = top + len * f, ax = x - dir * Math.min(wake, 40) * 0.45;
        ctx.beginPath(); ctx.moveTo(ax + dir * sz, ay); ctx.lineTo(ax - dir * sz * 0.55, ay - sz * 0.7); ctx.lineTo(ax - dir * sz * 0.2, ay); ctx.lineTo(ax - dir * sz * 0.55, ay + sz * 0.7); ctx.closePath(); ctx.fill();
      });
    }
    ctx.restore();
    return res;
  };

  /* front circular în expansiune */
  A.wavefront = function (ctx, x, y, r, o) {
    o = o || {};
    x = num(x, 0); y = num(y, 0); r = Math.max(1, num(r, 60));
    var dark = sceneDark(o), add = useAdd(o, dark), col = lightCol(o, dark), al = clamp(num(o.alpha, 1), 0, 1);
    var w = Math.max(0.8, num(o.w, 2.4)), rip = o.ripples == null ? 2 : Math.max(0, Math.round(num(o.ripples, 2)));
    var full = !o.arc, a0 = full ? 0 : num(o.arc[0], 0), a1 = full ? TAU : num(o.arc[1], TAU), i;
    var res = { x: x, y: y, r: r };
    if (al <= 0.003) return res;
    ctx.save(); ctx.globalAlpha *= al;
    if (add) ctx.globalCompositeOperation = 'lighter';
    if (o.fill !== false) {
      var g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, rgba(col, 0)); g.addColorStop(0.5, rgba(col, dark ? 0.025 : 0.04)); g.addColorStop(0.82, rgba(col, dark ? 0.09 : 0.12)); g.addColorStop(1, rgba(col, dark ? 0.2 : 0.24));
      ctx.fillStyle = g; ctx.beginPath(); if (!full) ctx.moveTo(x, y); ctx.arc(x, y, r, a0, a1); ctx.closePath(); ctx.fill();
    }
    ctx.lineCap = 'round';
    for (i = 1; i <= rip; i++) {   // ecouri slabe în interior
      ctx.beginPath(); ctx.arc(x, y, r * (1 - 0.11 * i), a0, a1);
      ctx.strokeStyle = rgba(col, (dark ? 0.2 : 0.25) / i); ctx.lineWidth = Math.max(0.8, w * 0.55); ctx.stroke();
    }
    function ring(wd, st) { ctx.beginPath(); ctx.arc(x, y, r, a0, a1); ctx.lineWidth = wd; ctx.strokeStyle = st; ctx.stroke(); }
    if (dark) { ring(w * 7, rgba(col, 0.07)); ring(w * 3.4, rgba(col, 0.17)); ring(w * 1.5, rgba(A.lighten(col, 0.25), 0.6)); ring(w * 0.7, 'rgba(255,255,255,.92)'); }
    else { ring(w * 5, rgba(col, 0.13)); ring(w * 2.4, rgba(col, 0.92)); ring(w * 0.7, rgba(A.lighten(col, 0.55), 0.95)); }
    ctx.restore();
    return res;
  };

  /* ======================= A.laser ======================= */
  /* sprite static al aparatului; unitatea de desen u = w/100, originea la centrul aparatului, +x = direcția fasciculului */
  function laserSprite(w, accent) {
    var u = w / 100, pad = 10, Wd = 112 * u + pad * 2, Ht = 58 * u + pad * 2, ox = pad + 57 * u, oy = pad + 14 * u;
    var c = A.cached('llas|' + Math.round(w) + '|' + accent, Wd, Ht, function (cx) {
      cx.translate(ox, oy); cx.scale(u, u);
      var i, hx;
      // mâner
      cx.save(); cx.translate(-22, 4); cx.rotate(0.17);
      cx.shadowColor = 'rgba(0,0,0,.38)'; cx.shadowBlur = 8; cx.shadowOffsetY = 3;
      cx.fillStyle = A.lin(cx, -12, 0, 12, 0, [[0, '#5c6684'], [0.4, '#2f3752'], [1, '#141a2b']]);
      A.rrPath(cx, -11, 0, 22, 42, 7); cx.fill(); cx.shadowColor = 'transparent';
      for (i = 0; i < 4; i++) { var gy = 12 + i * 7; cx.fillStyle = 'rgba(0,0,0,.3)'; cx.fillRect(-9, gy, 18, 1.8); cx.fillStyle = 'rgba(255,255,255,.1)'; cx.fillRect(-9, gy + 1.8, 18, 0.9); }
      cx.fillStyle = 'rgba(255,255,255,.16)'; A.rrPath(cx, -9.5, 3, 3, 36, 1.5); cx.fill();
      cx.restore();
      // corp
      cx.save(); cx.shadowColor = 'rgba(0,0,0,.35)'; cx.shadowBlur = 8; cx.shadowOffsetY = 3;
      cx.fillStyle = A.lin(cx, 0, -7.5, 0, 7.5, [[0, '#f7faff'], [0.3, '#d3dcec'], [0.62, '#9aa7bf'], [1, '#5b6886']]);
      A.rrPath(cx, -50, -7.5, 64, 15, 6.5); cx.fill(); cx.restore();
      cx.fillStyle = A.lin(cx, 0, -6, 0, 6, [[0, '#667189'], [1, '#202840']]);
      A.rrPath(cx, -57, -6.2, 11, 12.4, 4.5); cx.fill();
      cx.fillStyle = accent; A.circle(cx, -51.5, 0, 1.6); cx.fill();
      cx.fillStyle = 'rgba(255,255,255,.6)'; A.rrPath(cx, -45, -6.2, 55, 2.4, 1.2); cx.fill();
      cx.fillStyle = A.lin(cx, 0, -7.8, 0, 7.8, [[0, A.lighten(accent, 0.35)], [0.5, accent], [1, A.darken(accent, 0.35)]]);
      cx.fillRect(-29, -7.8, 6, 15.6);
      cx.fillStyle = 'rgba(0,0,0,.25)'; cx.fillRect(-29, -7.8, 0.9, 15.6); cx.fillRect(-23.9, -7.8, 0.9, 15.6);
      cx.strokeStyle = 'rgba(30,40,70,.3)'; cx.lineWidth = 1;
      for (hx = -18; hx < -3; hx += 2.4) { cx.beginPath(); cx.moveTo(hx, -6); cx.lineTo(hx, 6.2); cx.stroke(); }
      cx.fillStyle = A.lin(cx, 0, -11, 0, -7, [[0, A.lighten(accent, 0.45)], [1, A.darken(accent, 0.15)]]);
      A.rrPath(cx, -13, -10.8, 10, 4.6, 2.2); cx.fill();
      // cap (reflector)
      cx.save(); cx.shadowColor = 'rgba(0,0,0,.3)'; cx.shadowBlur = 6; cx.shadowOffsetY = 2;
      cx.beginPath(); cx.moveTo(12, -8.2); cx.lineTo(43, -12.5); cx.quadraticCurveTo(48.2, -13, 48.6, -8.5); cx.lineTo(48.6, 8.5); cx.quadraticCurveTo(48.2, 13, 43, 12.5); cx.lineTo(12, 8.2); cx.closePath();
      cx.fillStyle = A.lin(cx, 0, -13, 0, 13, [[0, '#7a86a3'], [0.2, '#505b78'], [0.6, '#2c3550'], [1, '#171d31']]); cx.fill(); cx.restore();
      cx.strokeStyle = 'rgba(255,255,255,.4)'; cx.lineWidth = 1.2; cx.beginPath(); cx.moveTo(13, -7.6); cx.lineTo(43, -11.8); cx.stroke();
      for (hx = 19; hx <= 31; hx += 6) {
        var hf = 8.2 + (hx - 12) * (4.3 / 31);
        cx.strokeStyle = 'rgba(0,0,0,.35)'; cx.lineWidth = 1.3; cx.beginPath(); cx.moveTo(hx, -hf + 1.2); cx.lineTo(hx, hf - 1.2); cx.stroke();
        cx.strokeStyle = 'rgba(255,255,255,.14)'; cx.beginPath(); cx.moveTo(hx + 1.3, -hf + 1.2); cx.lineTo(hx + 1.3, hf - 1.2); cx.stroke();
      }
      // ramă lentilă + lentilă (stinsă)
      cx.fillStyle = A.lin(cx, 45, 0, 53, 0, [[0, '#c3cde0'], [1, '#586481']]);
      cx.beginPath(); cx.ellipse(49, 0, 4.2, 12.9, 0, 0, TAU); cx.fill();
      cx.fillStyle = '#0c1223'; cx.beginPath(); cx.ellipse(49.6, 0, 3, 10.7, 0, 0, TAU); cx.fill();
      cx.fillStyle = A.rad(cx, 50, 0, 0, 10, [[0, '#2d4472'], [1, '#0e1730']], 49.2, -3);
      cx.beginPath(); cx.ellipse(50, 0, 2.3, 9.6, 0, 0, TAU); cx.fill();
      cx.fillStyle = 'rgba(255,255,255,.4)'; cx.beginPath(); cx.ellipse(49.4, -4.2, 0.9, 3.2, 0, 0, TAU); cx.fill();
    });
    return { c: c, ox: ox, oy: oy };
  }
  A.laser = function (ctx, x, y, w, o) {
    o = o || {};
    x = num(x, 0); y = num(y, 0); w = Math.max(16, num(w, 100));
    var P = pal(), dark = sceneDark(o), add = useAdd(o, dark), col = lightCol(o, dark);
    var on = o.on === undefined ? true : !!o.on, ang = num(o.angle, 0), face = o.facing === -1 ? -1 : 1;
    var u = w / 100, t = T(o), al = clamp(num(o.alpha, 1), 0, 1), spr = laserSprite(w, o.accent || P.s2);
    var ca = Math.cos(ang), sa = Math.sin(ang);
    function loc(lx, ly) { var px = face * lx; return { x: x + px * ca - ly * sa, y: y + px * sa + ly * ca }; }
    var res = { muzzle: loc(54 * u, 0), lens: loc(50 * u, 0), back: loc(-57 * u, 0), grip: loc(-26 * u, 40 * u), angle: ang + (face === -1 ? Math.PI : 0), w: w };
    if (al <= 0.003) return res;
    ctx.save(); ctx.globalAlpha *= al;
    ctx.translate(x, y); ctx.rotate(ang); if (face === -1) ctx.scale(-1, 1);
    A.blit(ctx, spr.c, -spr.ox, -spr.oy);
    if (on) {
      var lx = 50 * u, fl = 1 + 0.05 * Math.sin(t * 9);
      halo(ctx, lx, 0, 32 * u * fl, col, dark ? 0.55 : 0.4, add);
      halo(ctx, lx, 0, 13 * u, A.lighten(col, 0.5), dark ? 0.9 : 0.5, add);
      ctx.save(); ctx.translate(lx, 0);
      ctx.fillStyle = A.rad(ctx, 0, 0, 0, 10 * u, dark ? [[0, '#ffffff'], [0.45, A.lighten(col, 0.6)], [1, col]] : [[0, '#ffffff'], [0.5, A.lighten(col, 0.4)], [1, col]]);
      ctx.beginPath(); ctx.ellipse(0, 0, 2.5 * u, 9.8 * u, 0, 0, TAU); ctx.fill(); ctx.restore();
      if (dark) blob(ctx, lx, 0, 28 * u, 1.5 * u, 0, [[0, 'rgba(255,255,255,.9)'], [0.5, rgba(col, 0.5)], [1, rgba(col, 0)]], add);
      ctx.save(); ctx.translate(lx, 0); if (add) ctx.globalCompositeOperation = 'lighter'; sparkle(ctx, 15 * u * fl, col, 0.85, dark); ctx.restore();
    }
    ctx.restore();
    return res;
  };

  /* ======================= A.flash ======================= */
  A.flash = function (ctx, x, y, r, o) {
    o = o || {};
    x = num(x, 0); y = num(y, 0); r = Math.max(2, num(r, 40));
    var dark = sceneDark(o), add = useAdd(o, dark), col = lightCol(o, dark), al = clamp(num(o.alpha, 1), 0, 1);
    var p = clamp(num(o.p, 0.3), 0, 1), t = T(o), i;
    var I = sstep(0, 0.1, p) * Math.pow(1 - sstep(0.1, 1, p), 1.35);
    var e = 1 - Math.pow(1 - p, 3), R = r * (0.32 + 0.68 * e);
    var res = { x: x, y: y, R: R, intensity: I };
    if (I < 0.006 || al <= 0.003) return res;
    var nr = Math.max(6, (Math.round(num(o.rays, 12)) >> 1) << 1), rot = 0.26 + p * 0.5 + t * 0.06;
    ctx.save(); ctx.globalAlpha *= al;
    halo(ctx, x, y, R * 1.9, col, (dark ? 0.55 : 0.4) * I, add);
    // inel de șoc
    ctx.save(); if (add) ctx.globalCompositeOperation = 'lighter';
    ctx.strokeStyle = rgba(dark ? A.lighten(col, 0.4) : col, 0.55 * I * (1 - p * 0.5)); ctx.lineWidth = Math.max(1, r * 0.05 * (1 - 0.7 * p));
    ctx.beginPath(); ctx.arc(x, y, r * (0.25 + 1.0 * e), 0, TAU); ctx.stroke(); ctx.restore();
    // raze
    ctx.save(); ctx.translate(x, y); if (add) ctx.globalCompositeOperation = 'lighter';
    var gr = ctx.createLinearGradient(0, 0, 1, 0);
    if (dark) { gr.addColorStop(0, rgba('#ffffff', I)); gr.addColorStop(0.16, rgba(A.lighten(col, 0.6), 0.95 * I)); gr.addColorStop(0.55, rgba(col, 0.5 * I)); gr.addColorStop(1, rgba(col, 0)); }
    else { gr.addColorStop(0, rgba(A.lighten(col, 0.5), I)); gr.addColorStop(0.2, rgba(col, I)); gr.addColorStop(1, rgba(col, 0)); }
    ctx.fillStyle = gr;
    for (i = 0; i < nr; i++) {
      var lg = (i % 2 === 0), Lr = R * (lg ? 1.1 : 0.62) * (0.88 + 0.24 * A.hash(i + 3)), hw = R * (lg ? 0.085 : 0.06);
      ctx.save(); ctx.rotate(rot + i * TAU / nr); ctx.scale(Lr, hw);
      ctx.beginPath(); ctx.moveTo(0.04, -1); ctx.quadraticCurveTo(0.3, -0.34, 1, 0); ctx.quadraticCurveTo(0.3, 0.34, 0.04, 1); ctx.closePath(); ctx.fill();
      ctx.restore();
    }
    ctx.restore();
    // scântei
    ctx.save(); if (add) ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = rgba(dark ? A.lighten(col, 0.6) : col, 0.9 * I);
    for (i = 0; i < 8; i++) {
      var sa = A.hash(i * 2.3 + 1) * TAU + rot, sd = R * (0.55 + 0.75 * e * (0.5 + 0.5 * A.hash(i + 9)));
      ctx.beginPath(); ctx.arc(x + Math.cos(sa) * sd, y + Math.sin(sa) * sd, Math.max(0.8, r * 0.028 * (1 - p)), 0, TAU); ctx.fill();
    }
    ctx.restore();
    // miez
    halo(ctx, x, y, R * 0.7, dark ? '#ffffff' : A.lighten(col, 0.6), 0.95 * I, add);
    ctx.fillStyle = A.rad(ctx, x, y, 0, R * 0.3, [[0, '#ffffff'], [0.6, '#ffffff'], [1, rgba(A.lighten(col, 0.6), 0)]]);
    ctx.beginPath(); ctx.arc(x, y, R * 0.3, 0, TAU); ctx.fill();
    if (!dark) { ctx.strokeStyle = rgba(A.darken(col, 0.35), 0.5 * I); ctx.lineWidth = Math.max(1, r * 0.04); ctx.beginPath(); ctx.arc(x, y, R * 0.28, 0, TAU); ctx.stroke(); }
    ctx.restore();
    return res;
  };

  /* ======================= A.lightning ======================= */
  function boltPts(x, y0, y1, seed, spread, n) {
    var pts = [{ x: x, y: y0 }], off = 0, i, t;
    for (i = 1; i <= n; i++) {
      t = i / n;
      off = off * 0.5 + (A.hash(seed * 7.13 + i * 3.7) - 0.5) * spread * 2.2;
      pts.push({ x: x + off * (1 - sstep(0.78, 1, t)), y: y0 + (y1 - y0) * t + (A.hash(seed * 3.3 + i * 5.9) - 0.5) * (y1 - y0) / n * 0.5 });
    }
    pts[n].y = y1;
    return pts;
  }
  A.lightning = function (ctx, x, y0, y1, o) {
    o = o || {};
    x = num(x, 0); y0 = num(y0, 0); y1 = num(y1, y0 + 160);
    var dark = sceneDark(o), add = useAdd(o, dark), al = clamp(num(o.alpha, 1), 0, 1);
    var col = o.color ? fit(o.color, dark) : (dark ? '#cfe6ff' : '#ffb21a');
    var seed = num(o.seed, 1), p = clamp(num(o.p, 0.12), 0, 1), k, j;
    var I = sstep(0, 0.08, p) * Math.pow(1 - sstep(0.08, 1, p), 1.8);
    var len = Math.abs(y1 - y0), n = clamp(Math.round(len / 13), 7, 30), spread = clamp(len * 0.04, 3.5, 22);
    var pts = boltPts(x, y0, y1, seed, spread, n);
    var res = { top: { x: x, y: y0 }, bottom: { x: pts[n].x, y: y1 }, pts: pts, intensity: I };
    if (I < 0.008 || al <= 0.003 || len < 4) return res;
    var ws = clamp(len / 230, 0.7, 1.8) * num(o.w, 1), branches = [];
    for (k = 0; k < 3; k++) {
      var bi = Math.floor(n * (0.2 + 0.22 * k + 0.1 * A.hash(seed * 5.1 + k)));
      if (bi < 1 || bi >= n - 1) continue;
      var dir = A.hash(seed * 9.7 + k * 3.1) < 0.5 ? -1 : 1, m = 4 + Math.floor(A.hash(seed * 2.2 + k) * 3), step = len / n * 1.05;
      var b = [pts[bi]], bx = pts[bi].x, by = pts[bi].y;
      for (j = 1; j <= m; j++) { bx += dir * step * (0.45 + 0.55 * A.hash(seed + k * 7 + j * 1.9)); by += step * (0.7 + 0.35 * A.hash(seed * 1.3 + k * 5 + j)); b.push({ x: bx, y: by }); }
      branches.push(b);
    }
    function poly(pp, wd, st) {
      ctx.beginPath(); ctx.moveTo(pp[0].x, pp[0].y);
      for (var q = 1; q < pp.length; q++) ctx.lineTo(pp[q].x, pp[q].y);
      ctx.lineWidth = wd; ctx.strokeStyle = st; ctx.stroke();
    }
    ctx.save(); ctx.globalAlpha *= al; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    halo(ctx, pts[n].x, y1, 36 * ws, col, 0.55 * I, add);
    halo(ctx, x, y0, 44 * ws, col, 0.3 * I, add);
    if (add) ctx.globalCompositeOperation = 'lighter';
    var passes = dark
      ? [[15 * ws, rgba(col, 0.08 * I)], [8 * ws, rgba(col, 0.2 * I)], [3.6 * ws, rgba(col, 0.85 * I)], [1.8 * ws, rgba('#ffffff', I)]]
      : [[6 * ws, rgba(A.darken(col, 0.5), 0.5 * I)], [3.8 * ws, rgba(col, 0.95 * I)], [1.6 * ws, rgba('#ffffff', 0.9 * I)]];
    passes.forEach(function (ps) {
      poly(pts, ps[0], ps[1]);
      for (var q = 0; q < branches.length; q++) poly(branches[q], ps[0] * 0.55, ps[1]);
    });
    ctx.restore();
    return res;
  };

  /* ======================= A.spectrum ======================= */
  function niceStep(pxPerNm, minPx) {
    var steps = [5, 10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000], i;
    for (i = 0; i < steps.length; i++) if (steps[i] * pxPerNm >= minPx) return steps[i];
    return 5000;
  }
  A.spectrum = function (ctx, x, y, w, h, o) {
    o = o || {};
    x = num(x, 0); y = num(y, 0); w = Math.max(40, num(w, 320)); h = Math.max(8, num(h, 26));
    var P = pal(), rg = o.range || [300, 1000], n0 = num(rg[0], 300), n1 = num(rg[1], 1000), al = clamp(num(o.alpha, 1), 0, 1);
    if (n1 <= n0) n1 = n0 + 1;
    var span = n1 - n0, yb = y + h, bottom = yb, top = y;
    function nmToX(nm) { return x + (nm - n0) / span * w; }
    function xToNm(px) { return n0 + (px - x) / w * span; }
    var res = { nmToX: nmToX, xToNm: xToNm, x: x, y: y, w: w, h: h, bottom: bottom, top: top, colorAt: nmColor };
    if (al <= 0.003) return res;
    ctx.save(); ctx.globalAlpha *= al;
    var pad = 14;
    var spr = A.cached('lspec|' + Math.round(w) + '|' + Math.round(h) + '|' + n0 + '|' + n1, w + pad * 2, h + pad * 2, function (cx) {
      cx.translate(pad, pad);
      var lg = cx.createLinearGradient(0, 0, w, 0), list = [], i, N = 44;
      for (i = 0; i <= N; i++) list.push(n0 + span * i / N);
      KEYS.forEach(function (k) { if (k > n0 && k < n1) list.push(k); });
      list.sort(function (a, b) { return a - b; });
      list.forEach(function (nm) { lg.addColorStop(clamp((nm - n0) / span, 0, 1), nmColor(nm)); });
      cx.save(); cx.shadowColor = 'rgba(0,0,0,.38)'; cx.shadowBlur = 9; cx.shadowOffsetY = 3;
      A.rrPath(cx, 0, 0, w, h, h / 2); cx.fillStyle = lg; cx.fill(); cx.restore();
      cx.save(); A.rrPath(cx, 0, 0, w, h, h / 2); cx.clip();
      cx.strokeStyle = 'rgba(255,255,255,.16)'; cx.lineWidth = 1.4;   // zonele invizibile (UV/IR): hașură fină
      [[n0, Math.min(380, n1)], [Math.max(750, n0), n1]].forEach(function (z) {
        if (z[1] <= z[0]) return;
        var xa = (z[0] - n0) / span * w, xb = (z[1] - n0) / span * w;
        cx.save(); cx.beginPath(); cx.rect(xa, 0, xb - xa, h); cx.clip();
        for (var q = xa - h; q < xb + h; q += 6) { cx.beginPath(); cx.moveTo(q, h); cx.lineTo(q + h, 0); cx.stroke(); }
        cx.restore();
      });
      cx.fillStyle = A.lin(cx, 0, 0, 0, h * 0.55, [[0, 'rgba(255,255,255,.44)'], [1, 'rgba(255,255,255,0)']]); cx.fillRect(0, 0, w, h * 0.55);
      cx.fillStyle = A.lin(cx, 0, h * 0.5, 0, h, [[0, 'rgba(0,0,0,0)'], [1, 'rgba(0,10,30,.24)']]); cx.fillRect(0, h * 0.5, w, h * 0.5);
      cx.restore();
      A.rrPath(cx, 0.5, 0.5, w - 1, h - 1, h / 2); cx.strokeStyle = 'rgba(10,18,40,.35)'; cx.lineWidth = 1; cx.stroke();
    });
    A.blit(ctx, spr, x - pad, y - pad);
    // gradații
    if (o.labels !== false) {
      var step = niceStep(w / span, 54), v, last = null, first = Math.ceil(n0 / step) * step, unit = o.unit == null ? 'nm' : o.unit;
      for (v = first; v <= n1 + 1e-6; v += step) last = v;
      ctx.save(); ctx.font = D.font(11, 500, true); ctx.textBaseline = 'top'; ctx.strokeStyle = P.line2; ctx.lineWidth = 1; ctx.fillStyle = P.tx3;
      for (v = first; v <= n1 + 1e-6; v += step) {
        var tx = Math.round(nmToX(v)) + 0.5, txt = String(Math.round(v));
        ctx.beginPath(); ctx.moveTo(tx, yb + 3); ctx.lineTo(tx, yb + 8); ctx.stroke();
        if (v === last && unit) { ctx.textAlign = 'right'; ctx.fillText(txt + ' ' + unit, tx + 8, yb + 11); }
        else { ctx.textAlign = 'center'; ctx.fillText(txt, tx, yb + 11); }
      }
      ctx.restore();
      bottom = yb + 25;
    }
    // zone: ultraviolet / vizibil / infraroșu
    if (o.zones !== false) {
      var zy = bottom + (o.labels !== false ? 4 : 8);
      ctx.save(); ctx.font = D.font(11, 600); ctx.textAlign = 'center'; ctx.textBaseline = 'top'; ctx.lineWidth = 1.2; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      [{ a: n0, b: Math.min(380, n1), full: 'ultraviolet', sh: 'UV' }, { a: Math.max(380, n0), b: Math.min(750, n1), full: 'vizibil', sh: '' },
        { a: Math.max(750, n0), b: n1, full: 'infraroșu', sh: 'IR' }].forEach(function (z) {
        if (z.b - z.a <= 0) return;
        var xa = nmToX(z.a) + 2, xb = nmToX(z.b) - 2, zw = xb - xa;
        if (zw < 22) return;
        var lab = ctx.measureText(z.full).width + 8 <= zw ? z.full : (z.sh && ctx.measureText(z.sh).width + 6 <= zw ? z.sh : '');
        ctx.strokeStyle = P.line2; ctx.beginPath(); ctx.moveTo(xa, zy + 4); ctx.lineTo(xa, zy); ctx.lineTo(xb, zy); ctx.lineTo(xb, zy + 4); ctx.stroke();
        if (lab) { ctx.fillStyle = P.tx2; ctx.fillText(lab, (xa + xb) / 2, zy + 6); }
      });
      ctx.restore();
      bottom = zy + 22;
    }
    // marcaje (indicator + etichetă)
    var marks = [], rows = [];
    if (o.nm != null) (Array.isArray(o.nm) ? o.nm : [o.nm]).forEach(function (m) {
      if (m != null && typeof m === 'object') { if (m.nm != null) marks.push(m); } else if (isFinite(+m)) marks.push({ nm: +m });
    });
    marks.forEach(function (m) {
      var nm = clamp(num(m.nm, n0), n0, n1), mx = nmToX(nm), mc = m.color || nmGlow(nm);
      var label = m.label != null ? String(m.label) : (Math.round(nm) + ' nm');
      ctx.save(); ctx.font = D.font(12, 650);
      var cw = ctx.measureText(label).width + 18 + 13; ctx.restore();
      var cxm = clamp(mx, x + cw / 2 - 6, x + w - cw / 2 + 6), row = 0;
      while (rows[row] && rows[row].some(function (r0) { return cxm - cw / 2 < r0[1] + 4 && cxm + cw / 2 > r0[0] - 4; })) row++;
      (rows[row] = rows[row] || []).push([cxm - cw / 2, cxm + cw / 2]);
      var cy = y - 28 - row * 27;
      ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      if (row > 0) { ctx.strokeStyle = rgba(mc, 0.8); ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(mx, cy + 12); ctx.lineTo(mx, y - 14); ctx.stroke(); }
      ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(mx, y - 3); ctx.lineTo(mx, yb + 3); ctx.stroke();
      ctx.strokeStyle = 'rgba(255,255,255,.96)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(mx, y - 3); ctx.lineTo(mx, yb + 3); ctx.stroke();
      ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 6; ctx.shadowOffsetY = 2;
      ctx.fillStyle = mc; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(mx, y - 3); ctx.lineTo(mx - 6.5, y - 14); ctx.lineTo(mx + 6.5, y - 14); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.restore();
      A.chip(ctx, label, cxm, cy, { align: 'center', dot: mc });
      top = Math.min(top, cy - 12);
    });
    res.bottom = bottom; res.top = top;
    ctx.restore();
    return res;
  };

  /* ======================= A.mirror ======================= */
  /* oglindă „în sus” centrată în (0,0); postamentul (mh px) în jos */
  function mirrorLocal(c, w, th, mh, accent) {
    var x0 = -w / 2, y0 = -th / 2, r = Math.min(th * 0.4, 6), ph = th * 0.58;
    if (mh > 0) {
      var pw = Math.max(4, th * 0.7);
      [-0.3, 0.3].forEach(function (kk) {
        var px = kk * w - pw / 2;
        c.fillStyle = A.lin(c, px, 0, px + pw, 0, [[0, '#8793ae'], [0.5, '#4d5873'], [1, '#222a40']]);
        A.rrPath(c, px, th / 2 - 2, pw, mh + 2, 2); c.fill();
        c.fillStyle = '#1c2234'; A.rrPath(c, px - pw * 0.55, th / 2 + mh - 3, pw * 2.1, 5, 2.5); c.fill();
        c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(px + 1, th / 2, 1.2, Math.max(1, mh - 4));
      });
    }
    c.save(); c.shadowColor = 'rgba(0,0,0,.4)'; c.shadowBlur = 8; c.shadowOffsetY = 3;
    A.rrPath(c, x0, y0, w, th, r); c.fillStyle = A.lin(c, 0, y0, 0, y0 + th, [[0, '#5b6783'], [1, '#1b2133']]); c.fill(); c.restore();
    if (accent && th >= 8) {
      c.fillStyle = A.lin(c, 0, y0 + ph, 0, y0 + th, [[0, A.lighten(accent, 0.3)], [1, A.darken(accent, 0.3)]]);
      A.rrPath(c, x0 + 2, y0 + ph + 0.5, w - 4, th - ph - 2, 1.5); c.fill();
    }
    c.save(); A.rrPath(c, x0 + 1, y0 + 1, w - 2, ph, Math.max(1, r * 0.8)); c.clip();
    c.fillStyle = A.lin(c, 0, y0, 0, y0 + ph + 1, [[0, '#ffffff'], [0.4, '#dce8f8'], [0.75, '#a3b9d8'], [1, '#7388ad']]); c.fillRect(x0, y0, w, ph + 2);
    [[0.22, 0.12], [0.62, 0.07], [0.82, 0.03]].forEach(function (b) {   // reflexii oblice
      var bx = x0 + b[0] * w, bw = Math.max(3, b[1] * w), sk = ph * 0.9;
      c.fillStyle = A.lin(c, bx, 0, bx + bw, 0, [[0, 'rgba(255,255,255,0)'], [0.5, 'rgba(255,255,255,.7)'], [1, 'rgba(255,255,255,0)']]);
      c.beginPath(); c.moveTo(bx, y0); c.lineTo(bx + bw, y0); c.lineTo(bx + bw - sk, y0 + ph + 1); c.lineTo(bx - sk, y0 + ph + 1); c.closePath(); c.fill();
    });
    c.restore();
    c.fillStyle = 'rgba(255,255,255,.95)'; c.fillRect(x0 + r, y0 + 0.5, w - 2 * r, 1);
    c.fillStyle = 'rgba(40,60,100,.55)'; c.fillRect(x0 + 1, y0 + ph, w - 2, 1);
  }
  function mirrorBar(ctx, cx, cy, w, th, up, mount, accent, angle) {
    var pad = 12, mh = mount ? Math.max(6, th * 1.3) : 0, Wd = w + pad * 2, Ht = th + pad * 2 + mh, oy = pad + (up ? 0 : mh) + th / 2;
    var spr = A.cached('lmir|' + (up ? 'u' : 'd') + '|' + Math.round(w * 2) + '|' + Math.round(th * 4) + '|' + (mount ? 1 : 0) + '|' + (accent || ''), Wd, Ht, function (c) {
      c.translate(Wd / 2, oy); if (!up) c.scale(1, -1);
      mirrorLocal(c, w, th, mh, accent);
    });
    ctx.save(); ctx.translate(cx, cy); if (angle) ctx.rotate(angle);
    A.blit(ctx, spr, -Wd / 2, -oy);
    ctx.restore();
  }
  /* lumină care lovește oglinda: halou + dungă pe suprafață + vârf */
  function contactGlow(ctx, px, py, ang, size, a, col, dark, add) {
    if (a <= 0.01) return;
    halo(ctx, px, py, size * 1.7, col, 0.65 * a, add);
    ctx.save(); ctx.translate(px, py); ctx.rotate(ang);
    blob(ctx, 0, 0, size * 1.9, Math.max(1, size * 0.15), 0, dark ? [[0, 'rgba(255,255,255,.95)'], [0.5, rgba(col, 0.5)], [1, rgba(col, 0)]] : [[0, rgba(A.lighten(col, 0.4), 0.95)], [0.5, rgba(col, 0.5)], [1, rgba(col, 0)]], add);
    if (add) ctx.globalCompositeOperation = 'lighter';
    sparkle(ctx, size * 1.1 * a, col, 0.9, dark);
    ctx.restore();
    halo(ctx, px, py, size * 0.55, dark ? '#ffffff' : A.lighten(col, 0.5), 0.9 * a, add);
  }
  A.mirror = function (ctx, x, y, w, o) {
    o = o || {};
    x = num(x, 0); y = num(y, 0); w = Math.max(10, num(w, 120));
    var th = Math.max(3, num(o.th, clamp(w * 0.075, 6, 16))), up = o.face !== 'down', ang = num(o.angle, 0), al = clamp(num(o.alpha, 1), 0, 1);
    var ca = Math.cos(ang), sa = Math.sin(ang);
    function loc(lx, ly) { return { x: x + lx * ca - ly * sa, y: y + lx * sa + ly * ca }; }
    var fy = up ? -th / 2 : th / 2, nm = loc(0, up ? -1 : 1);
    var res = { surface: loc(0, fy), left: loc(-w / 2, fy), right: loc(w / 2, fy), normal: { x: nm.x - x, y: nm.y - y }, top: loc(0, -th / 2), bottom: loc(0, th / 2), w: w, th: th, face: up ? 'up' : 'down' };
    if (al <= 0.003) return res;
    ctx.save(); ctx.globalAlpha *= al;
    mirrorBar(ctx, x, y, w, th, up, o.mount !== false, o.accent, ang);
    var hit = clamp(num(o.hit, 0), 0, 1);
    if (hit > 0.01) {
      var dark = sceneDark(o), add = useAdd(o, dark), col = lightCol(o, dark), hp = loc(clamp(num(o.hitAt, 0), -1, 1) * w / 2, fy);
      contactGlow(ctx, hp.x, hp.y, ang, Math.max(8, th * 1.8), hit, col, dark, add);
    }
    ctx.restore();
    return res;
  };

  /* ======================= A.lightClock ======================= */
  A.lightClock = function (ctx, x, y, h, o) {
    o = o || {};
    x = num(x, 0); y = num(y, 0); h = Math.max(50, num(h, 190));
    var P = pal(), dark = sceneDark(o), add = useAdd(o, dark), col = lightCol(o, dark);
    var accent = o.accent || P.s1, t = T(o), al = clamp(num(o.alpha, 1), 0, 1);
    var tw = Math.max(16, num(o.w, h * 0.25)), capH = clamp(h * 0.085, 7, 24), capW = tw * 1.38;
    var yT = y - h / 2 + capH, yB = y + h / 2 - capH, inner = yB - yT;
    var phase = o.phase != null ? num(o.phase, 0) : t / 2.4, ph = phase - Math.floor(phase);
    var up = ph < 0.5, f = up ? ph * 2 : 2 - ph * 2, py = yB - f * inner;
    var rP = Math.max(3.2, tw * 0.17), vAng = up ? -HP : HP, gx = x - tw / 2, tr = tw * 0.12;
    var res = { top: { x: x, y: yT }, bottom: { x: x, y: yB }, photon: { x: x, y: py }, w: tw, h: h, tube: { x: gx, y: yT, w: tw, h: inner }, phase: ph, up: up };
    if (al <= 0.003) return res;
    ctx.save(); ctx.globalAlpha *= al;
    if (o.stand) {   // soclu sub ceas (în afara înălțimii h)
      var sy = y + h / 2, sh = Math.max(6, capH * 0.9), sw = capW * 1.5;
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3;
      ctx.fillStyle = A.lin(ctx, 0, sy, 0, sy + sh, [[0, '#59647f'], [1, '#1b2133']]);
      A.rrPath(ctx, x - sw / 2, sy - 1, sw, sh + 1, sh * 0.45); ctx.fill(); ctx.restore();
      ctx.fillStyle = A.lin(ctx, 0, sy, 0, sy + 3, [[0, A.lighten(accent, 0.3)], [1, accent]]);
      A.rrPath(ctx, x - sw * 0.34, sy + sh * 0.35, sw * 0.68, 2.4, 1.2); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.fillRect(x - sw / 2 + sh * 0.45, sy, sw - sh * 0.9, 1);
    }
    // sticla (spate)
    var gg = ctx.createLinearGradient(gx, 0, gx + tw, 0);
    if (dark) { gg.addColorStop(0, 'rgba(210,232,255,.34)'); gg.addColorStop(0.14, 'rgba(190,222,255,.15)'); gg.addColorStop(0.5, 'rgba(150,200,245,.06)'); gg.addColorStop(0.86, 'rgba(170,210,250,.15)'); gg.addColorStop(1, 'rgba(210,232,255,.32)'); }
    else { gg.addColorStop(0, 'rgba(60,110,180,.38)'); gg.addColorStop(0.14, 'rgba(110,160,225,.22)'); gg.addColorStop(0.5, 'rgba(150,195,245,.14)'); gg.addColorStop(0.86, 'rgba(110,160,225,.22)'); gg.addColorStop(1, 'rgba(60,110,180,.38)'); }
    ctx.fillStyle = gg; A.rrPath(ctx, gx, yT - 1, tw, inner + 2, tr); ctx.fill();
    ctx.fillStyle = rgba(accent, dark ? 0.08 : 0.1); ctx.fill();
    if (o.guide !== false) {
      ctx.strokeStyle = dark ? 'rgba(255,255,255,.13)' : 'rgba(40,70,120,.2)'; ctx.lineWidth = 1; ctx.setLineDash([2, 5]);
      ctx.beginPath(); ctx.moveTo(x, yT + 2); ctx.lineTo(x, yB - 2); ctx.stroke(); ctx.setLineDash([]);
    }
    // fotonul (în interiorul tubului)
    if (o.photon !== false) {
      ctx.save(); A.rrPath(ctx, gx + 1, yT, tw - 2, inner, tr); ctx.clip();
      halo(ctx, x, py, tw * 1.25, col, dark ? 0.32 : 0.28, add);
      comet(ctx, x, py, vAng, inner * 0.32, rP * 1.15, col, dark ? 0.6 : 0.5, add);
      A.photon(ctx, x, py, rP, { color: col, angle: vAng, t: t, dark: dark, additive: add });
      ctx.restore();
    }
    // sticla (față): reflexii și margini
    ctx.fillStyle = A.lin(ctx, 0, yT, 0, yB, [[0, 'rgba(255,255,255,.6)'], [1, 'rgba(255,255,255,.05)']]);
    A.rrPath(ctx, x - tw * 0.37, yT + inner * 0.05, tw * 0.1, inner * 0.7, tw * 0.05); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.22)'; A.rrPath(ctx, x + tw * 0.27, yT + inner * 0.1, tw * 0.045, inner * 0.5, tw * 0.022); ctx.fill();
    ctx.strokeStyle = dark ? 'rgba(220,238,255,.5)' : 'rgba(50,85,140,.6)'; ctx.lineWidth = 1.2; A.rrPath(ctx, gx, yT - 1, tw, inner + 2, tr); ctx.stroke();
    // oglinzile (capace)
    mirrorBar(ctx, x, yT - capH / 2, capW, capH, false, false, accent, 0);
    mirrorBar(ctx, x, yB + capH / 2, capW, capH, true, false, accent, 0);
    // sclipire la lovitură
    if (o.photon !== false) {
      var dk = ph % 0.5, a1 = clamp(1 - dk / 0.12, 0, 1), a2 = clamp((dk - 0.42) / 0.08, 0, 1);
      contactGlow(ctx, x, yB, 0, tw * 0.6, up ? a1 : a2, col, dark, add);
      contactGlow(ctx, x, yT, 0, tw * 0.6, up ? a2 : a1, col, dark, add);
    }
    ctx.restore();
    return res;
  };

/*@@END@@*/
})(window);
