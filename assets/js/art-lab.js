/* ==========================================================================
   RF.art — LAB: instrumente și obiecte de laborator   (assets/js/art-lab.js)
   Stil: vectorial plat, metal lustruit, sticlă cu reflexii, lumină din stânga-sus.
   Convenții: S = cyan (P.s1), S′ = roz (P.s2) -> `accent`; electron = albastru, ion = portocaliu.
   Toate funcțiile desenează în pixeli CSS, citesc paleta la fiecare apel și întorc puncte de ancorare.
   Ghid: _dev/art-guide.md  ·  Galerie: _dev/gallery.html#A.clock  (sau #A.gauge, #A.photocell …)

   A.clock(ctx,x,y,r,o)        ceas analogic (x,y = centru). o:{time,start,period,hands,accent,face,numerals,label,tick}
   A.stopwatch(ctx,x,y,r,o)    cronometru cu coroană (x,y = centrul cadranului). o:{time,period,accent,face,label,readout,sub,pressed}
   A.digital(ctx,x,y,w,text,o) afișaj LCD cu 7 segmente (x,y = centru). o:{h,color,unit,label,align,glow}
   A.rod(ctx,x0,y,x1,o)        bară metalică. o:{th,accent,labels,y1,labelSide}
   A.ruler(ctx,x0,y,x1,o)      riglă. o:{min,max,step,sub,units,material,side,h,accent}
   A.gauge(ctx,x,y,r,o)        aparat de măsură cu ac. o:{value,min,max,center,unit,label,zones,step,sub,accent,ease,id,readout}
   A.battery(ctx,x,y,w,o)      sursă de curent continuu. o:{volts,polarity,kind:'cell'|'supply',h,knob}
   A.wire(ctx,pts,o)           fir cu colțuri rotunjite și puncte de curent. o:{w,color,radius,flow,t,spacing,dotColor}
   A.electron(ctx,x,y,r,o)     electron. o:{trail,t,glow,color,sign}     A.ion(ctx,x,y,r,o)  ion pozitiv. o:{t,vibrate,sign,glow}
   A.metalBlock(ctx,x,y,w,h,o) bucată de metal cu rețea de ioni și „mare” de electroni. o:{t,nElectrons,skip,metal,spacing}
   A.photocell(ctx,x,y,w,h,o)  fotocelulă (tub de sticlă). o:{metal,cathodeColor,lit,labels}
   A.atom(ctx,x,y,r,o)         atom cu orbite. o:{t,orbits,perOrbit,tilt}
   Exemple de apel și opțiuni complete: vezi comentariile de deasupra fiecărei funcții.
   ========================================================================== */
(function (global) {
  'use strict';
  var RF = global.RF, D = RF.draw, A = RF.art = RF.art || {}, TAU = Math.PI * 2, PI = Math.PI;
  A.gallery = A.gallery || [];

  /* ======================= utilitare private ======================= */
  function pal() { return RF.sim.palette(); }
  function num(v, d) { v = Number(v); return isFinite(v) ? v : d; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function tOf(o) { return (RF.reduced || !o) ? 0 : num(o.t, 0); }
  function lum(c) { var q = A.parse(c); return (0.2126 * q[0] + 0.7152 * q[1] + 0.0722 * q[2]) / 255; }
  function inkOn(c) { return lum(c) > 0.6 ? '#0d1328' : '#ffffff'; }
  /* număr cu virgulă zecimală și minus tipografic (−0,0 nu apare) */
  function fnum(v, d) {
    var s = Number(v).toFixed(d == null ? 2 : d).replace('.', ',');
    if (!/[1-9]/.test(s)) s = s.replace('-', '');
    return s.replace('-', '−');
  }
  function rr(ctx, x, y, w, h, r) { D.rrect(ctx, x, y, w, h, r); }

  /* ======================= materiale ======================= */
  /* gradient conic de metal lustruit (cromat); centrul = (0,0) în spațiul curent */
  function chrome(ctx, R, tint) {
    var c = tint || '#b6c1d4', g, i;
    var st = [[0, A.lighten(c, .30)], [.06, A.lighten(c, .60)], [.15, A.darken(c, .16)], [.28, A.darken(c, .50)],
      [.40, A.lighten(c, .06)], [.50, A.lighten(c, .38)], [.60, A.lighten(c, .88)], [.69, A.lighten(c, .44)],
      [.80, A.darken(c, .05)], [.91, A.darken(c, .34)], [1, A.lighten(c, .30)]];
    if (ctx.createConicGradient) g = ctx.createConicGradient(0, 0, 0);
    else {
      g = ctx.createLinearGradient(-R, -R, R, R);
      st = [[0, A.lighten(c, .8)], [.3, A.lighten(c, .2)], [.6, A.darken(c, .1)], [1, A.darken(c, .5)]];
    }
    for (i = 0; i < st.length; i++) g.addColorStop(st[i][0], st[i][1]);
    return g;
  }
  /* inel metalic între razele R (exterior) și R-w, centrat în (0,0); cu muchii, reflexie și teșitură interioară */
  function metalRing(ctx, R, w, tint) {
    var ri = R - w, lw = Math.max(1, R * 0.014), bw = Math.max(1.4, R * 0.04);
    ctx.beginPath(); ctx.arc(0, 0, R, 0, TAU); ctx.arc(0, 0, ri, 0, TAU, true);
    ctx.fillStyle = chrome(ctx, R, tint); ctx.fill();
    ctx.lineWidth = lw; ctx.strokeStyle = 'rgba(6,10,26,.5)';
    ctx.beginPath(); ctx.arc(0, 0, R - lw / 2, 0, TAU); ctx.stroke();
    var l2 = Math.max(1, R * 0.02);
    ctx.lineWidth = l2;
    ctx.strokeStyle = A.lin(ctx, -R, -R, R, R, [[0, 'rgba(255,255,255,.85)'], [.5, 'rgba(255,255,255,0)'], [1, 'rgba(255,255,255,.22)']]);
    ctx.beginPath(); ctx.arc(0, 0, R - lw - l2 / 2, 0, TAU); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, ri + bw, 0, TAU); ctx.arc(0, 0, ri, 0, TAU, true);
    ctx.fillStyle = A.lin(ctx, -ri, -ri, ri, ri, [[0, 'rgba(5,8,24,.62)'], [.55, 'rgba(5,8,24,.18)'], [1, 'rgba(255,255,255,.6)']]);
    ctx.fill();
  }
  /* umbră moale aruncată de un obiect circular (spre dreapta-jos) */
  function dropShadow(ctx, R, dx, dy, a) {
    var g = ctx.createRadialGradient(dx, dy, R * 0.6, dx, dy, R * 1.28);
    g.addColorStop(0, 'rgba(0,0,0,' + a + ')'); g.addColorStop(0.5, 'rgba(0,0,0,' + (a * 0.6) + ')'); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(dx, dy, R * 1.28, 0, TAU); ctx.fill();
  }
  /* cilindru/metal orizontal sau vertical: umple calea curentă cu gradient de oțel */
  function steelFill(ctx, x0, y0, x1, y1, tint) {
    var c = tint || '#a9b5c8';
    return A.lin(ctx, x0, y0, x1, y1, [[0, A.lighten(c, .78)], [.28, A.lighten(c, .38)], [.62, A.darken(c, .12)], [1, A.darken(c, .45)]]);
  }

  /* ======================= cadrane (ceas, cronometru, aparate) ======================= */
  var FACES = {
    cream: { c0: '#fffcf4', c1: '#e8ddc4', ink: '#232b47', sub: 'rgba(35,43,71,.5)', num: '#1b2340', h0: '#56628a', h1: '#1b2340', win: '#2a3250' },
    dark: { c0: '#2d3d6c', c1: '#0a1026', ink: '#eaf0ff', sub: 'rgba(205,218,248,.5)', num: '#f2f6ff', h0: '#ffffff', h1: '#b4c3e6', win: '#050b16' }
  };
  function faceOf(o, p) { return (o.face === 'cream' || o.face === 'dark') ? o.face : (p.dark ? 'dark' : 'cream'); }
  /* fața cadranului: gradient radial + adâncitură (umbra ramei) */
  function dialFace(ctx, Rf, C) {
    ctx.beginPath(); ctx.arc(0, 0, Rf, 0, TAU);
    ctx.fillStyle = A.rad(ctx, 0, 0, 0, Rf * 1.05, [[0, C.c0], [1, C.c1]], -Rf * 0.28, -Rf * 0.34); ctx.fill();
    ctx.fillStyle = A.rad(ctx, 0, 0, Rf * 0.8, Rf, [[0, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,.26)']]); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(0, 0, Rf, 0, TAU); ctx.clip();
    ctx.lineWidth = Rf * 0.08;
    ctx.strokeStyle = A.lin(ctx, -Rf, -Rf, Rf * 0.5, Rf * 0.5, [[0, 'rgba(0,0,0,.26)'], [1, 'rgba(0,0,0,0)']]);
    ctx.beginPath(); ctx.arc(0, 0, Rf + ctx.lineWidth * 0.15, 0, TAU); ctx.stroke();
    ctx.restore();
  }
  /* gradații pe cerc: n diviziuni, fiecare `every`-a mai lungă; Rt = raza exterioară */
  function dialTicks(ctx, Rt, n, every, lenMinor, lenMajor, wMinor, wMajor, C, minorToo) {
    var i, a, s, c;
    if (minorToo !== false) {
      ctx.lineCap = 'butt'; ctx.strokeStyle = C.sub; ctx.lineWidth = wMinor; ctx.beginPath();
      for (i = 0; i < n; i++) {
        if (i % every === 0) continue;
        a = i / n * TAU; s = Math.sin(a); c = -Math.cos(a);
        ctx.moveTo(s * Rt, c * Rt); ctx.lineTo(s * (Rt - lenMinor), c * (Rt - lenMinor));
      }
      ctx.stroke();
    }
    ctx.lineCap = 'round'; ctx.strokeStyle = C.ink; ctx.lineWidth = wMajor; ctx.beginPath();
    for (i = 0; i < n; i += every) {
      a = i / n * TAU; s = Math.sin(a); c = -Math.cos(a);
      ctx.moveTo(s * (Rt - wMajor * 0.5), c * (Rt - wMajor * 0.5)); ctx.lineTo(s * (Rt - lenMajor), c * (Rt - lenMajor));
    }
    ctx.stroke();
  }
  /* insignă (pastilă) cu text pe cadran, ex. „S”, „S′” */
  function pill(ctx, text, cx, cy, size, accent) {
    ctx.font = D.font(size, 800);
    var w = ctx.measureText(text).width + size * 1.15, h = size * 1.55;
    rr(ctx, cx - w / 2, cy - h / 2, w, h, h / 2);
    ctx.fillStyle = A.lin(ctx, 0, cy - h / 2, 0, cy + h / 2, [[0, A.lighten(accent, .22)], [1, A.darken(accent, .22)]]); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.3)'; rr(ctx, cx - w / 2 + 1.5, cy - h / 2 + 1, w - 3, h * 0.4, h * 0.2); ctx.fill();
    ctx.fillStyle = inkOn(A.mix(accent, '#000000', .1)); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(text, cx, cy + size * 0.05);
  }
  /* ac cu vârf rotunjit, gradient fix (lumină din stânga-sus), umbră decalată.
     a = unghi (0 = în sus, sensul acelor), len = lungime, tail = coadă, wb/wt = lățime la bază/vârf */
  function needle(ctx, a, len, tail, wb, wt, fill, shade, sx, sy) {
    function path(dx, dy) {
      ctx.save(); ctx.translate(dx, dy); ctx.rotate(a);
      ctx.beginPath();
      ctx.moveTo(-wb / 2, tail); ctx.lineTo(-wb / 2, 0); ctx.lineTo(-wt / 2, -len + wt / 2);
      ctx.arc(0, -len + wt / 2, wt / 2, PI, TAU);
      ctx.lineTo(wb / 2, 0); ctx.lineTo(wb / 2, tail);
      ctx.arc(0, tail, wb / 2, 0, PI);
      ctx.closePath(); ctx.restore();
    }
    if (shade !== false) { path(sx || 0, sy || 0); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fill(); }
    path(0, 0); ctx.fillStyle = fill; ctx.fill();
  }
  /* butuc metalic circular */
  function hub(ctx, x, y, r, tint, dot) {
    ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.arc(x + r * 0.25, y + r * 0.4, r * 1.05, 0, TAU); ctx.fill();
    ctx.fillStyle = A.rad(ctx, x, y, 0, r, [[0, A.lighten(tint, .85)], [.55, tint], [1, A.darken(tint, .5)]], x - r * 0.35, y - r * 0.4);
    ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
    if (dot) { ctx.fillStyle = dot; ctx.beginPath(); ctx.arc(x, y, r * 0.42, 0, TAU); ctx.fill(); }
  }
  /* reflexie de sticlă peste un cadran circular de rază Rf (centrat în 0,0): lumină difuză + calotă lucioasă + muchie strălucitoare */
  function glassShine(ctx, Rf, strong) {
    var s = strong == null ? 1 : strong;
    ctx.save(); ctx.beginPath(); ctx.arc(0, 0, Rf, 0, TAU); ctx.clip();
    ctx.fillStyle = A.rad(ctx, 0, 0, 0, Rf * 1.15, [[0, 'rgba(255,255,255,' + 0.17 * s + ')'], [.5, 'rgba(255,255,255,' + 0.05 * s + ')'], [1, 'rgba(255,255,255,0)']], -Rf * 0.5, -Rf * 0.6);
    ctx.fillRect(-Rf, -Rf, 2 * Rf, 2 * Rf);
    ctx.beginPath(); ctx.ellipse(-Rf * 0.06, -Rf * 1.12, Rf * 1.02, Rf * 0.74, -0.28, 0, TAU);
    ctx.fillStyle = A.lin(ctx, 0, -Rf * 0.9, 0, -Rf * 0.38, [[0, 'rgba(255,255,255,' + 0.17 * s + ')'], [1, 'rgba(255,255,255,' + 0.04 * s + ')']]); ctx.fill();
    ctx.restore();
    ctx.strokeStyle = 'rgba(255,255,255,' + 0.5 * s + ')'; ctx.lineWidth = Math.max(1, Rf * 0.028); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(0, 0, Rf * 0.94, PI * 1.13, PI * 1.38); ctx.stroke();
  }

  /* ======================= CEAS ======================= */
  /* A.clock(ctx, x, y, r, o) — ceas analogic (x,y) = centrul cadranului, r = raza exterioară a ramei.
     o: {time    secunde scurse (implicit 0); acele: ora/minutul/secunda se calculează din time
         start   secunde adăugate (ora afișată la time=0; implicit 0 = 12:00:00)
         period  secunde per rotație a secundarului (implicit 60 = ceas obișnuit; 10 => ceas „rapid” pentru simulări)
         hands   'hms' (implicit) | 'ms' | 's' | 'm' | 'h' … care ace se desenează
         accent  culoarea ramei și a secundarului (P.s1 pentru S, P.s2 pentru S′; implicit P.s1)
         face    'auto' (implicit: întunecat în tema întunecată, crem în cea luminoasă) | 'cream' | 'dark'
         numerals 4 (12·3·6·9; implicit pentru r≥30) | 12 | 0
         label   insignă pe cadran, ex. 'S′'  ·  tick: true => secundarul „în salturi”  ·  shadow:false  ·  alpha}
     întoarce {x,y,r, center, top, bottom, left, right, below:{x,y} (sub ramă, pentru chip-uri), face (raza cadranului)} */
  A.clock = function (ctx, x, y, r, o) {
    o = o || {};
    r = Math.max(5, num(r, 48));
    var p = pal(), accent = o.accent || p.s1, face = faceOf(o, p), C = FACES[face];
    var nums = o.numerals == null ? (r >= 30 ? 4 : 0) : (o.numerals === true ? 12 : (+o.numerals || 0));
    var label = o.label ? String(o.label) : '', hands = o.hands || 'hms', shadow = o.shadow !== false;
    var rq = Math.max(5, Math.round(r)), k = r / rq, pad = Math.ceil(rq * 0.3), S = 2 * rq + 2 * pad;

    var spr = A.cached(['lab.clock', rq, accent, face, nums, label, shadow ? 1 : 0].join('|'), S, S, function (c2, w, h) {
      var R = rq, Rf = R * 0.885, Rt = Rf * 0.94;
      c2.translate(w / 2, h / 2);
      if (shadow) dropShadow(c2, R, R * 0.05, R * 0.12, 0.34);
      metalRing(c2, R, R * 0.115, A.mix(accent, '#dfe6f2', .14));
      dialFace(c2, Rf, C);
      if (R >= 22) dialTicks(c2, Rt, 60, 5, Rf * 0.045, Rf * 0.105, Math.max(.7, R * 0.011), Math.max(1.5, R * 0.03), C);
      else dialTicks(c2, Rt, 12, 1, 0, Rf * 0.14, 1, Math.max(1.6, R * 0.07), C, false);
      if (nums) {
        var fs = Math.max(10, Rf * (nums === 12 ? 0.19 : 0.27)), Rn = Rf * (nums === 12 ? 0.71 : 0.69), list = nums === 12 ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] : [12, 3, 6, 9], i, a;
        c2.fillStyle = C.num; c2.font = D.font(fs, 700); c2.textAlign = 'center'; c2.textBaseline = 'middle';
        for (i = 0; i < list.length; i++) { a = list[i] * PI / 6; c2.fillText(String(list[i]), Math.sin(a) * Rn, -Math.cos(a) * Rn + fs * 0.05); }
      }
      if (label) pill(c2, label, 0, Rf * 0.4, Math.max(10, Rf * 0.2), accent);
    });

    var per = o.period > 0 ? +o.period : 60, secs = num(o.time, 0) * (60 / per) + num(o.start, 0);
    var sS = o.tick ? Math.floor(secs) : secs;
    var aS = (sS % 60) / 60 * TAU, aM = ((secs / 60) % 60) / 60 * TAU, aH = ((secs / 3600) % 12) / 12 * TAU;

    ctx.save();
    if (o.alpha != null) ctx.globalAlpha = clamp(o.alpha, 0, 1);
    ctx.translate(x, y); ctx.scale(k, k);
    A.blit(ctx, spr, -S / 2, -S / 2);
    var R = rq, Rf = R * 0.885, sh = R * 0.028, hw = Math.max(1, R * 0.03);
    var hf = A.lin(ctx, -R * 0.5, -R * 0.5, R * 0.5, R * 0.5, [[0, C.h0], [1, C.h1]]);
    if (hands.indexOf('h') >= 0) needle(ctx, aH, R * 0.5, R * 0.1, Math.max(2.4, R * 0.085), Math.max(1.6, R * 0.05), hf, true, sh, sh * 1.5);
    if (hands.indexOf('m') >= 0) needle(ctx, aM, R * 0.74, R * 0.12, Math.max(2, R * 0.062), Math.max(1.3, R * 0.036), hf, true, sh, sh * 1.5);
    if (hands.indexOf('s') >= 0) {
      var sf = A.lin(ctx, -R * 0.3, -R * 0.3, R * 0.3, R * 0.3, [[0, A.lighten(accent, .45)], [1, A.darken(accent, .25)]]);
      needle(ctx, aS, R * 0.8, R * 0.2, Math.max(1.3, R * 0.024), Math.max(1, R * 0.016), sf, true, sh * 1.2, sh * 1.8);
      ctx.save(); ctx.rotate(aS);
      ctx.fillStyle = sf; ctx.beginPath(); ctx.arc(0, -R * 0.56, Math.max(1.4, R * 0.04), 0, TAU); ctx.fill();
      ctx.restore();
    }
    hub(ctx, 0, 0, Math.max(2.4, R * 0.07), '#c9d3e4', accent);
    glassShine(ctx, Rf, face === 'cream' ? 0.9 : 1);
    ctx.restore();
    return { x: x, y: y, r: r, center: { x: x, y: y }, top: { x: x, y: y - r }, bottom: { x: x, y: y + r }, left: { x: x - r, y: y }, right: { x: x + r, y: y },
      below: { x: x, y: y + r * 1.12 + 6 }, face: r * 0.885 };
  };

  /* ======================= AFIȘAJ LCD (7 segmente) ======================= */
  var SEG = { '0': 'abcdef', '1': 'bc', '2': 'abged', '3': 'abgcd', '4': 'fgbc', '5': 'afgcd', '6': 'afgedc', '7': 'abc', '8': 'abcdefg', '9': 'abcdfg', '-': 'g', '−': 'g' };
  /* adaugă la calea curentă segmentele cifrei într-un pătrat (x,y,w,h), grosime t */
  function segPath(ctx, x, y, w, h, t, which) {
    var hh = t / 2, gd = t * 0.16;
    function H(yc) {
      var xa = x + hh + gd, xb = x + w - hh - gd;
      ctx.moveTo(xa, yc); ctx.lineTo(xa + hh, yc - hh); ctx.lineTo(xb - hh, yc - hh); ctx.lineTo(xb, yc); ctx.lineTo(xb - hh, yc + hh); ctx.lineTo(xa + hh, yc + hh); ctx.closePath();
    }
    function V(xc, ya, yb) {
      ctx.moveTo(xc, ya); ctx.lineTo(xc + hh, ya + hh); ctx.lineTo(xc + hh, yb - hh); ctx.lineTo(xc, yb); ctx.lineTo(xc - hh, yb - hh); ctx.lineTo(xc - hh, ya + hh); ctx.closePath();
    }
    var yTop = y + hh + gd, yM1 = y + h / 2 - gd, yM2 = y + h / 2 + gd, yBot = y + h - hh - gd;
    if (which.indexOf('a') >= 0) H(y + hh);
    if (which.indexOf('g') >= 0) H(y + h / 2);
    if (which.indexOf('d') >= 0) H(y + h - hh);
    if (which.indexOf('f') >= 0) V(x + hh, yTop, yM1);
    if (which.indexOf('b') >= 0) V(x + w - hh, yTop, yM1);
    if (which.indexOf('e') >= 0) V(x + hh, yM2, yBot);
    if (which.indexOf('c') >= 0) V(x + w - hh, yM2, yBot);
  }
  /* text LCD centrat în (cx,cy), încadrat în maxW×maxH. Cifre, „:”, „,”, „.”, „−” = segmente; restul = text mono mic.
     întoarce {w,h (dimensiuni desenate)} */
  function drawLCD(ctx, text, cx, cy, maxW, maxH, color, o) {
    o = o || {};
    var P = pal(), H0 = 100, DW = 52, T = 12, items = [], total = 0, i, ch, it;
    text = String(text == null ? '' : text);
    ctx.save();
    ctx.font = '700 44px ' + P.mono;
    for (i = 0; i < text.length; i++) {
      ch = text.charAt(i); it = { ch: ch };
      if (SEG[ch] !== undefined) { it.k = 'd'; it.adv = 70; }
      else if (ch === ':') { it.k = ':'; it.adv = 30; }
      else if (ch === '.' || ch === ',') { it.k = ch; it.adv = 28; }
      else if (ch === ' ') { it.k = ' '; it.adv = 36; }
      else { it.k = 't'; it.adv = ctx.measureText(ch).width + 8; }
      it.x = total; total += it.adv; items.push(it);
    }
    ctx.restore();
    var wTot = Math.max(10, total - 18);
    var sc = Math.min(maxH / H0, maxW / wTot);
    if (!(sc > 0)) return { w: 0, h: 0 };
    var ghost = o.ghost !== false, lit = D.rgba(color, 1);
    ctx.save();
    ctx.translate(cx - wTot * sc / 2, cy - H0 * sc / 2); ctx.scale(sc, sc);
    var shear = [1, 0, -0.1, 1, 0.1 * H0 / 2, 0];
    // 1. fantome „8” + segmentele aprinse, într-o singură trecere
    ctx.save(); ctx.transform(shear[0], shear[1], shear[2], shear[3], shear[4], shear[5]);
    if (ghost) {
      ctx.beginPath();
      for (i = 0; i < items.length; i++) if (items[i].k === 'd') segPath(ctx, items[i].x, 0, DW, H0, T, 'abcdefg');
      ctx.fillStyle = D.rgba(color, 0.1); ctx.fill();
    }
    ctx.beginPath();
    for (i = 0; i < items.length; i++) {
      it = items[i];
      if (it.k === 'd') segPath(ctx, it.x, 0, DW, H0, T, SEG[it.ch]);
      else if (it.k === ':') { ctx.rect(it.x + 3, H0 * 0.28 - T / 2, T, T); ctx.rect(it.x + 3, H0 * 0.72 - T / 2, T, T); }
      else if (it.k === '.' || it.k === ',') {
        ctx.rect(it.x + 2, H0 - T, T, T);
        if (it.k === ',') { ctx.moveTo(it.x + 2, H0 - 1); ctx.lineTo(it.x + 2 + T, H0 - 1); ctx.lineTo(it.x + 2 + T * 0.1, H0 + T * 1.1); ctx.closePath(); }
      }
    }
    ctx.shadowColor = D.rgba(color, 0.95); ctx.shadowBlur = Math.max(3, H0 * sc * (o.glow == null ? 0.3 : o.glow));
    ctx.fillStyle = A.lighten(color, 0.18); ctx.fill();
    ctx.restore();
    // 2. text mono pentru caracterele care nu sunt segmente (unități, litere)
    ctx.font = '700 44px ' + P.mono; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.shadowColor = D.rgba(color, 0.8); ctx.shadowBlur = Math.max(2, H0 * sc * 0.18); ctx.fillStyle = A.lighten(color, 0.12);
    for (i = 0; i < items.length; i++) if (items[i].k === 't') ctx.fillText(items[i].ch, items[i].x + 3, H0 - 2);
    ctx.restore();
    return { w: wTot * sc, h: H0 * sc };
  }

  /* A.digital(ctx, x, y, w, text, o) — panou cu afișaj LCD/LED luminos. (x,y) = centrul panoului (sau marginea stângă/dreaptă cu o.align),
     w = lățimea panoului, text = ex. '12:03:45', '0,866', '3,25 s' (cifrele devin segmente, literele rămân text mic).
     o: {h (înălțimea panoului; implicit ~0.3w între 28 și 64), color (culoarea cifrelor; implicit P.s1; P.s2, P.light, P.good …),
         unit (text mic, aliniat jos-dreapta în ecran), label (text mic sus-stânga în panou), align:'center'|'left'|'right', glow (0..1), ghost:false}
     întoarce {x,y,w,h (colț stânga-sus), cx, cy, left, right, top, bottom, screen:{x,y,w,h}} */
  A.digital = function (ctx, x, y, w, text, o) {
    o = o || {};
    var p = pal(), color = o.color || p.s1;
    w = Math.max(24, num(w, 120));
    var h = Math.max(16, num(o.h, clamp(w * 0.3, 28, 64)));
    var bx = o.align === 'left' ? x : o.align === 'right' ? x - w : x - w / 2, by = y - h / 2;
    var bz = Math.max(2, h * 0.09), sx = bx + bz, sy = by + bz, sw = w - 2 * bz, sh = h - 2 * bz;
    var rw = Math.round(w), rh = Math.round(h), pad = 8;
    var spr = A.cached(['lab.digital', rw, rh, color].join('|'), rw + 2 * pad, rh + 2 * pad, function (c2, W2, H2) {
      var Z = Math.max(2, rh * 0.09), r0 = Math.min(rh * 0.3, 14);
      c2.save(); c2.translate(pad, pad);
      c2.shadowColor = 'rgba(0,0,0,.4)'; c2.shadowBlur = 10; c2.shadowOffsetY = 3;
      rr(c2, 0, 0, rw, rh, r0); c2.fillStyle = A.lin(c2, 0, 0, 0, rh, [[0, '#566283'], [.12, '#3b4666'], [1, '#1b2236']]); c2.fill();
      c2.shadowColor = 'transparent';
      c2.strokeStyle = 'rgba(255,255,255,.28)'; c2.lineWidth = 1; rr(c2, 0.5, 0.5, rw - 1, rh - 1, r0); c2.stroke();
      // ecranul (adâncit)
      var rs = Math.max(2, r0 - Z * 0.8);
      rr(c2, Z, Z, rw - 2 * Z, rh - 2 * Z, rs);
      c2.fillStyle = A.lin(c2, 0, Z, 0, rh - Z, [[0, A.mix(color, '#02060e', .93)], [1, A.mix(color, '#02060e', .84)]]); c2.fill();
      c2.save(); rr(c2, Z, Z, rw - 2 * Z, rh - 2 * Z, rs); c2.clip();
      // umbra interioară sus/stânga + reflexie sticlă
      c2.fillStyle = A.lin(c2, 0, Z, 0, Z + rh * 0.3, [[0, 'rgba(0,0,0,.55)'], [1, 'rgba(0,0,0,0)']]); c2.fillRect(Z, Z, rw, rh * 0.3);
      c2.fillStyle = A.lin(c2, 0, Z, 0, rh * 0.55, [[0, 'rgba(255,255,255,.1)'], [1, 'rgba(255,255,255,0)']]);
      c2.beginPath(); c2.moveTo(Z, Z); c2.lineTo(rw * 0.7, Z); c2.lineTo(rw * 0.55, rh * 0.5); c2.lineTo(Z, rh * 0.5); c2.closePath(); c2.fill();
      c2.restore();
      c2.strokeStyle = 'rgba(0,0,0,.55)'; c2.lineWidth = 1; rr(c2, Z + 0.5, Z + 0.5, rw - 2 * Z - 1, rh - 2 * Z - 1, rs); c2.stroke();
      c2.restore();
    });
    ctx.save();
    if (o.alpha != null) ctx.globalAlpha = clamp(o.alpha, 0, 1);
    A.blit(ctx, spr, bx - pad, by - pad);
    // ecranul: halou ambiental al culorii
    ctx.save(); rr(ctx, sx, sy, sw, sh, Math.max(2, h * 0.2)); ctx.clip();
    ctx.fillStyle = A.rad(ctx, bx + w / 2, y, 0, w * 0.55, [[0, D.rgba(color, .13)], [1, D.rgba(color, 0)]]); ctx.fillRect(sx, sy, sw, sh);
    ctx.restore();
    var lab = o.label ? String(o.label) : '', unit = o.unit ? String(o.unit) : '';
    var fsm = Math.max(10, Math.min(12, h * 0.22)), padX = Math.max(5, h * 0.2), tx0 = sx + padX, tx1 = sx + sw - padX, ty0 = sy + sh * 0.1, ty1 = sy + sh * 0.9;
    ctx.font = D.font(fsm, 700, true);
    if (lab) { ctx.fillStyle = D.rgba(A.lighten(color, .3), .75); ctx.textAlign = 'left'; ctx.textBaseline = 'top'; ctx.fillText(lab, tx0, sy + 3); ty0 = sy + 3 + fsm * 0.9; }
    if (unit) { var uw = ctx.measureText(unit).width; ctx.fillStyle = A.lighten(color, .2); ctx.textAlign = 'right'; ctx.textBaseline = 'alphabetic';
      ctx.shadowColor = D.rgba(color, .8); ctx.shadowBlur = 6; ctx.fillText(unit, tx1, ty1 - 1); ctx.shadowColor = 'transparent'; tx1 -= uw + 5; }
    drawLCD(ctx, text, (tx0 + tx1) / 2, (ty0 + ty1) / 2, Math.max(8, tx1 - tx0), Math.max(8, ty1 - ty0), color, { glow: o.glow, ghost: o.ghost });
    ctx.restore();
    return { x: bx, y: by, w: w, h: h, cx: bx + w / 2, cy: y, left: { x: bx, y: y }, right: { x: bx + w, y: y }, top: { x: bx + w / 2, y: by }, bottom: { x: bx + w / 2, y: by + h },
      screen: { x: sx, y: sy, w: sw, h: sh } };
  };

  /* ======================= CRONOMETRU ======================= */
  /* A.stopwatch(ctx, x, y, r, o) — cronometru cu coroană și buton lateral. (x,y) = centrul cadranului, r = raza ramei.
     o: {time   secunde scurse (acul mare face o rotație la `period`; implicit 0)
         period secunde per rotație (implicit 60; cifre 10,20…60)
         accent culoarea ramei și a acului (P.s1 / P.s2), face 'auto'|'cream'|'dark', label (insignă, ex. 'S′')
         readout true | 'text' | număr => fereastră LCD pe cadran (true: timpul cu 2 zecimale)  ·  fmt(t) formatare proprie
         sub: false ascunde cadranul mic de minute (apare implicit la r≥34 dacă nu e readout)
         pressed 0..1 (coroana apăsată), shadow:false, alpha}
     întoarce {x,y,r, center, top (sus, vârful coroanei), crown:{x,y}, below:{x,y}} */
  A.stopwatch = function (ctx, x, y, r, o) {
    o = o || {};
    r = Math.max(10, num(r, 50));
    var p = pal(), accent = o.accent || p.s1, face = faceOf(o, p), C = FACES[face];
    var per = o.period > 0 ? +o.period : 60, T = num(o.time, 0);
    var readout = o.readout, hasRead = readout != null && readout !== false;
    var showSub = o.sub === false ? false : (!hasRead && r >= 34);
    var label = o.label ? String(o.label) : '', shadow = o.shadow !== false;
    var rq = Math.max(10, Math.round(r)), k = r / rq, pad = Math.ceil(rq * 0.3), S = 2 * rq + 2 * pad;
    // cifre pe cadran: numărul de etichete care dă pași „rotunzi”
    var cnt = 6, cand = [6, 10, 5, 4, 8, 12, 3, 2], ci;
    for (ci = 0; ci < cand.length; ci++) { var st = per / cand[ci]; if (Math.abs(st * 10 - Math.round(st * 10)) < 1e-6) { cnt = cand[ci]; break; } }
    if (rq < 44 && cnt > 6) cnt = cnt % 2 === 0 ? cnt / 2 : cnt;

    var spr = A.cached(['lab.sw', rq, accent, face, per, label, showSub ? 1 : 0, hasRead ? 1 : 0, shadow ? 1 : 0].join('|'), S, S, function (c2, w, h) {
      var R = rq, Rf = R * 0.87, Rt = Rf * 0.94, i, a;
      c2.translate(w / 2, h / 2);
      if (shadow) dropShadow(c2, R, R * 0.05, R * 0.12, 0.34);
      // buton lateral la 45° (în spatele ramei)
      c2.save(); c2.rotate(PI / 4);
      rr(c2, -R * 0.075, -R * 1.1, R * 0.15, R * 0.2, R * 0.03); c2.fillStyle = steelFill(c2, -R * 0.08, 0, R * 0.08, 0); c2.fill();
      rr(c2, -R * 0.13, -R * 1.25, R * 0.26, R * 0.17, R * 0.05); c2.fillStyle = steelFill(c2, -R * 0.13, 0, R * 0.13, 0, '#b8c3d6'); c2.fill();
      c2.fillStyle = 'rgba(255,255,255,.5)'; rr(c2, -R * 0.1, -R * 1.24, R * 0.07, R * 0.15, R * 0.03); c2.fill();
      c2.restore();
      metalRing(c2, R, R * 0.13, A.mix(accent, '#dfe6f2', .14));
      dialFace(c2, Rf, C);
      dialTicks(c2, Rt, 60, 5, Rf * 0.045, Rf * 0.1, Math.max(.7, R * 0.011), Math.max(1.5, R * 0.028), C);
      // cifre
      if (R >= 30) {
        var fs = Math.max(10, Rf * 0.17), Rn = Rf * 0.66, v;
        c2.fillStyle = C.num; c2.font = D.font(fs, 700); c2.textAlign = 'center'; c2.textBaseline = 'middle';
        for (i = 1; i <= cnt; i++) {
          a = i / cnt * TAU; v = per * i / cnt;
          c2.fillText(String(Math.round(v * 10) / 10).replace('.', ','), Math.sin(a) * Rn, -Math.cos(a) * Rn + fs * 0.05);
        }
      }
      if (label) pill(c2, label, 0, -Rf * 0.34, Math.max(10, Rf * 0.19), accent);
      if (showSub) {
        var sr = Rf * 0.2, sy = Rf * 0.36;
        c2.save(); c2.translate(0, sy);
        c2.beginPath(); c2.arc(0, 0, sr, 0, TAU); c2.fillStyle = A.rad(c2, 0, 0, 0, sr, [[0, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,.14)']]); c2.fill();
        c2.strokeStyle = C.sub; c2.lineWidth = Math.max(.8, R * 0.012); c2.beginPath(); c2.arc(0, 0, sr, 0, TAU); c2.stroke();
        dialTicks(c2, sr * 0.9, 30, 5, sr * 0.14, sr * 0.28, Math.max(.6, R * 0.009), Math.max(1, R * 0.02), C);
        c2.restore();
      }
      if (hasRead) {
        var ww = Rf * 0.92, hh = Rf * 0.3, wy = Rf * 0.4;
        rr(c2, -ww / 2 - 1.5, wy - hh / 2 - 1.5, ww + 3, hh + 3, hh * 0.3); c2.fillStyle = A.lin(c2, 0, wy - hh / 2, 0, wy + hh / 2, [[0, 'rgba(0,0,0,.35)'], [1, 'rgba(255,255,255,.4)']]); c2.fill();
        rr(c2, -ww / 2, wy - hh / 2, ww, hh, hh * 0.25); c2.fillStyle = A.lin(c2, 0, wy - hh / 2, 0, wy + hh / 2, [[0, A.mix(accent, '#02060e', .9)], [1, A.mix(accent, '#02060e', .8)]]); c2.fill();
      }
    });

    ctx.save();
    if (o.alpha != null) ctx.globalAlpha = clamp(o.alpha, 0, 1);
    ctx.translate(x, y); ctx.scale(k, k);
    var R = rq, Rf = R * 0.87, pr = clamp(num(o.pressed, 0), 0, 1), d = pr * R * 0.07;
    // coroana (sus) — dinamică, se apasă
    ctx.fillStyle = 'rgba(0,0,0,.25)'; rr(ctx, -R * 0.09, -R * 1.0 + 1, R * 0.18, R * 0.2, R * 0.03); ctx.fill();
    rr(ctx, -R * 0.085, -R * 1.2, R * 0.17, R * 0.26, R * 0.03); ctx.fillStyle = steelFill(ctx, -R * 0.09, 0, R * 0.09, 0); ctx.fill();
    var bw = R * 0.4, bh = R * 0.27, by = -R * 1.46 + d;
    rr(ctx, -bw / 2 + R * 0.02, by + R * 0.04, bw, bh, R * 0.06); ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.fill();
    rr(ctx, -bw / 2, by, bw, bh, R * 0.06); ctx.fillStyle = steelFill(ctx, -bw / 2, by, bw / 2, by + bh, '#b8c3d6'); ctx.fill();
    ctx.save(); rr(ctx, -bw / 2, by, bw, bh, R * 0.06); ctx.clip();
    ctx.strokeStyle = 'rgba(20,30,60,.3)'; ctx.lineWidth = Math.max(.8, R * 0.012); ctx.beginPath();
    var kx; for (kx = -bw / 2 + R * 0.05; kx < bw / 2; kx += Math.max(2.5, R * 0.05)) { ctx.moveTo(kx, by + bh * 0.2); ctx.lineTo(kx, by + bh); }
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.65)'; ctx.fillRect(-bw / 2, by, bw, Math.max(1.2, R * 0.025));
    ctx.fillStyle = D.rgba(accent, .85); ctx.fillRect(-bw / 2, by + bh * 0.04 + R * 0.03, bw, Math.max(1.5, R * 0.035));
    ctx.restore();

    A.blit(ctx, spr, -S / 2, -S / 2);

    var sh = R * 0.028;
    // cadranul mic (minute): ac scurt
    if (showSub) {
      var sr = Rf * 0.2, sy = Rf * 0.36, rev = T / per, sa = (rev / 30 % 1) * TAU;
      var mf = A.lin(ctx, -R * 0.2, -R * 0.2, R * 0.2, R * 0.2, [[0, C.h0], [1, C.h1]]);
      ctx.save(); ctx.translate(0, sy);
      needle(ctx, sa, sr * 0.82, sr * 0.18, Math.max(1.6, R * 0.034), Math.max(1, R * 0.018), mf, true, sh * 0.6, sh);
      hub(ctx, 0, 0, Math.max(1.6, R * 0.034), '#c9d3e4');
      ctx.restore();
    }
    // fereastra cu cifre
    if (hasRead) {
      var txt = typeof readout === 'string' ? readout : (typeof readout === 'number' ? fnum(readout, 2) : (o.fmt ? o.fmt(T) : fnum(T, 2)));
      drawLCD(ctx, txt, 0, Rf * 0.4, Rf * 0.84, Rf * 0.21, accent, { glow: 0.22 });
    }
    // acul mare
    var af = A.lin(ctx, -R * 0.3, -R * 0.3, R * 0.3, R * 0.3, [[0, A.lighten(accent, .45)], [1, A.darken(accent, .25)]]);
    var ang = ((T / per) % 1) * TAU;
    needle(ctx, ang, R * 0.78, R * 0.2, Math.max(1.8, R * 0.036), Math.max(1, R * 0.018), af, true, sh * 1.3, sh * 1.9);
    ctx.save(); ctx.rotate(ang); ctx.fillStyle = af; ctx.beginPath(); ctx.arc(0, R * 0.2, Math.max(1.6, R * 0.045), 0, TAU); ctx.fill(); ctx.restore();
    hub(ctx, 0, 0, Math.max(2.6, R * 0.065), '#c9d3e4', accent);
    glassShine(ctx, Rf, face === 'cream' ? 0.9 : 1);
    ctx.restore();
    return { x: x, y: y, r: r, center: { x: x, y: y }, top: { x: x, y: y - r * 1.46 }, crown: { x: x, y: y - r * 1.2 }, bottom: { x: x, y: y + r },
      below: { x: x, y: y + r * 1.12 + 6 }, face: r * 0.87 };
  };

  /* ======================= BARĂ ȘI RIGLĂ ======================= */
  /* A.rod(ctx, x0, y, x1, o) — bară metalică: cilindru lustruit, colțare întunecate la capete, dungă colorată.
     Axa merge de la (x0,y) la (x1, o.y1 ?? y).
     o: {th grosime (implicit 6% din lungime, între 10 și 22 px), accent (dunga + insignele; P.s1 pentru S, P.s2 pentru S′),
         labels: true | ['A','B'] (insigne rotunde deasupra capetelor)  ·  labelSide:'up'|'down'  ·  stripe:false  ·  shadow:false  ·  alpha  ·  y1 (bară înclinată)}
     întoarce {a:{x,y}, b:{x,y}, mid:{x,y}, th, len, tagA:{x,y}, tagB:{x,y} (centrele insignelor)} */
  A.rod = function (ctx, x0, y, x1, o) {
    o = o || {};
    var p = pal(), accent = o.accent || p.s1, y1 = o.y1 == null ? y : num(o.y1, y);
    var dx = x1 - x0, dy = y1 - y, len = Math.max(4, Math.hypot(dx, dy)), ang = Math.atan2(dy, dx);
    var th = Math.max(5, num(o.th, clamp(len * 0.06, 10, 22))), rad = th * 0.42, cap = Math.min(len * 0.22, th * 0.66);
    ctx.save();
    if (o.alpha != null) ctx.globalAlpha = clamp(o.alpha, 0, 1);
    ctx.translate(x0, y); ctx.rotate(ang);
    if (o.shadow !== false) {
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.4)'; ctx.shadowBlur = Math.min(12, th * 0.8); ctx.shadowOffsetY = Math.min(6, th * 0.3);
      rr(ctx, 0, -th / 2, len, th, rad); ctx.fillStyle = '#6c7a94'; ctx.fill(); ctx.restore();
    }
    rr(ctx, 0, -th / 2, len, th, rad);
    ctx.fillStyle = A.lin(ctx, 0, -th / 2, 0, th / 2, [[0, '#fbfdff'], [.15, '#e1e8f4'], [.5, '#a9b6cb'], [.82, '#76849e'], [1, '#56627c']]); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.85)'; rr(ctx, cap * 0.9, -th / 2 + th * 0.13, len - cap * 1.8, Math.max(1.2, th * 0.1), th * 0.05); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.2)'; rr(ctx, cap * 0.9, th * 0.27, len - cap * 1.8, Math.max(1, th * 0.08), th * 0.04); ctx.fill();
    if (o.stripe !== false) {
      var sh = Math.max(2, th * 0.22);
      rr(ctx, cap * 1.05, -th * 0.05, len - cap * 2.1, sh, sh / 2);
      ctx.fillStyle = A.lin(ctx, 0, -th * 0.05, 0, -th * 0.05 + sh, [[0, A.lighten(accent, .4)], [1, A.darken(accent, .2)]]); ctx.fill();
    }
    [0, 1].forEach(function (e) {
      ctx.save();
      if (e) { ctx.translate(len, 0); ctx.scale(-1, 1); }
      rr(ctx, 0, -th * 0.58, cap, th * 1.16, th * 0.3);
      ctx.fillStyle = A.lin(ctx, 0, -th * 0.58, 0, th * 0.58, [[0, '#a3aec4'], [.25, '#667391'], [1, '#262e44']]); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.55)'; rr(ctx, th * 0.07, -th * 0.5, cap * 0.5, Math.max(1.2, th * 0.09), th * 0.04); ctx.fill();
      ctx.fillStyle = D.rgba(accent, .95); ctx.fillRect(cap - Math.max(1.5, th * 0.1), -th * 0.58, Math.max(1.5, th * 0.1), th * 1.16);
      ctx.restore();
    });
    ctx.restore();

    var ea = { x: x0, y: y }, eb = { x: x1, y: y1 }, tags = [null, null];
    var labs = o.labels === true ? ['A', 'B'] : (o.labels instanceof Array ? o.labels : null);
    if (labs) {
      var br = Math.max(9, th * 0.62), side = o.labelSide === 'down' ? 1 : -1, stem = Math.max(6, th * 0.45);
      ctx.save();
      if (o.alpha != null) ctx.globalAlpha = clamp(o.alpha, 0, 1);
      [ea, eb].forEach(function (e, i) {
        var cx = e.x, cy = e.y + side * (th * 0.55 + stem + br);
        ctx.strokeStyle = A.darken(accent, .25); ctx.lineWidth = Math.max(2, th * 0.16); ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(e.x, e.y + side * th * 0.4); ctx.lineTo(cx, cy - side * br * 0.8); ctx.stroke();
        ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 2;
        ctx.fillStyle = A.rad(ctx, cx, cy, br * 0.1, br * 1.05, [[0, A.lighten(accent, .55)], [.5, accent], [1, A.darken(accent, .4)]], cx - br * 0.35, cy - br * 0.4);
        ctx.beginPath(); ctx.arc(cx, cy, br, 0, TAU); ctx.fill(); ctx.restore();
        ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.beginPath(); ctx.ellipse(cx - br * .3, cy - br * .42, br * .34, br * .18, -.5, 0, TAU); ctx.fill();
        ctx.fillStyle = inkOn(accent); ctx.font = D.font(br * 1.15, 800); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(String(labs[i] == null ? '' : labs[i]), cx, cy + br * .06);
        tags[i] = { x: cx, y: cy };
      });
      ctx.restore();
    }
    return { a: ea, b: eb, mid: { x: (x0 + x1) / 2, y: (y + y1) / 2 }, th: th, len: len, tagA: tags[0], tagB: tags[1] };
  };

  /* pas „rotund” (1, 2, 2,5, 5 × 10^k) pentru aproximativ `target` intervale pe un domeniu */
  function niceStep(range, target) {
    var raw = range / Math.max(1, target), e = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10)), m = raw / e;
    return (m <= 1.2 ? 1 : m <= 2.2 ? 2 : m <= 3.5 ? 2.5 : m <= 7 ? 5 : 10) * e;
  }
  function decOf(step) {
    for (var d = 0; d < 4; d++) { var q = step * Math.pow(10, d); if (Math.abs(q - Math.round(q)) < 1e-6) return d; }
    return 3;
  }

  /* A.ruler(ctx, x0, y, x1, o) — riglă gradată. x0..x1 = intervalul valorilor [min,max] (marcajele cad exact pe x0 și x1); y = muchia de măsurare
     (de aici pornesc gradațiile); corpul riglei se desenează dedesubt (side:'up' => deasupra).
     o: {min:0, max:10, step (distanța dintre cifre; implicit „rotundă”), sub (diviziuni pe pas; implicit 10/4/5), units ('cm', 'm', 'al' … sub gradații, în dreapta),
         material:'wood'|'steel'|'accent' (implicit wood; cu o.accent => accent), accent, side:'down'|'up', h (grosimea corpului, implicit 42), fmt(v), labelEvery,
         marks:[{v, color, label}] (săgeți mici pe muchie, cu etichetă), shadow:false, alpha}
     întoarce {x(v)->px, val(px)->v, a:{x,y}, b:{x,y}, y, edge (muchia opusă), h, step, sub} */
  A.ruler = function (ctx, x0, y, x1, o) {
    o = o || {};
    var p = pal(), accent = o.accent || p.s1, mat = o.material || (o.accent ? 'accent' : 'wood');
    var vmin = num(o.min, 0), vmax = num(o.max, 10); if (!(vmax > vmin)) vmax = vmin + 1;
    var L = Math.max(10, x1 - x0), ppu = L / (vmax - vmin), h = Math.max(26, num(o.h, 42)), up = o.side === 'up', sg = up ? -1 : 1;
    var i, v, px, e, m, step = num(o.step, 0);
    if (!(step > 0)) step = niceStep(vmax - vmin, L / 38);
    e = Math.pow(10, Math.floor(Math.log(step) / Math.LN10 + 1e-9)); m = step / e;
    var sub = Math.round(num(o.sub, 0)) || (m < 1.5 ? 10 : m < 3 ? 4 : 5);
    while (sub > 1 && step / sub * ppu < 4.2) sub = sub === 10 ? 5 : sub === 5 ? 1 : sub === 4 ? 2 : 1;
    var pad = Math.min(14, h * 0.32), bx = x0 - pad, bw = L + 2 * pad, by = up ? y - h : y, rad = Math.min(8, h * 0.18);
    var M = { wood: { g: [[0, '#f8e3b8'], [.1, '#f0cf91'], [.55, '#dfb06a'], [1, '#c48f4a']], tick: '#4b2f14', hi: 'rgba(255,255,255,.55)', num: '#4b2f14' },
      steel: { g: [[0, '#f6f9fd'], [.12, '#dde5f1'], [.55, '#b4c0d3'], [1, '#8e9bb2']], tick: '#1c2234', hi: 'rgba(255,255,255,.8)', num: '#1c2234' },
      accent: { g: [[0, A.lighten(accent, .62)], [.12, A.lighten(accent, .35)], [.6, accent], [1, A.darken(accent, .28)]], tick: A.darken(accent, .72), hi: 'rgba(255,255,255,.6)', num: A.darken(accent, .72) } }[mat] || null;
    if (!M) M = { g: [[0, '#f8e3b8'], [1, '#c48f4a']], tick: '#4b2f14', hi: 'rgba(255,255,255,.5)', num: '#4b2f14' };
    ctx.save();
    if (o.alpha != null) ctx.globalAlpha = clamp(o.alpha, 0, 1);
    // corpul
    ctx.save();
    if (o.shadow !== false) { ctx.shadowColor = 'rgba(0,0,0,.38)'; ctx.shadowBlur = 9; ctx.shadowOffsetY = up ? -3 : 3; }
    rr(ctx, bx, by, bw, h, rad);
    ctx.fillStyle = A.lin(ctx, 0, y, 0, y + sg * h, M.g); ctx.fill();
    ctx.restore();
    ctx.save(); rr(ctx, bx, by, bw, h, rad); ctx.clip();
    if (mat === 'wood') {
      ctx.lineCap = 'round';
      for (i = 0; i < 16; i++) {
        var gy = by + h * (0.12 + 0.8 * A.hash(i * 3 + 1)), gx = bx + bw * A.hash(i * 5 + 2) * 0.9, gl = bw * (0.15 + 0.4 * A.hash(i * 7 + 3));
        ctx.strokeStyle = 'rgba(110,62,14,' + (0.07 + 0.07 * A.hash(i + 9)) + ')'; ctx.lineWidth = 0.8 + A.hash(i + 4) * 0.9;
        ctx.beginPath(); ctx.moveTo(gx, gy); ctx.quadraticCurveTo(gx + gl / 2, gy + (A.hash(i + 6) - .5) * 3, gx + gl, gy); ctx.stroke();
      }
    }
    // muchia teșită de măsurare (mai luminoasă) + linia de lumină
    ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.fillRect(bx, up ? y - 4 : y, bw, 4);
    ctx.fillStyle = M.hi; ctx.fillRect(bx, up ? y - 1 : y, bw, 1);
    ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect(bx, up ? by : by + h - 1.5, bw, 1.5);
    ctx.restore();
    // gradații
    var ds = step / sub, i0 = Math.ceil(vmin / ds - 1e-6), i1 = Math.floor(vmax / ds + 1e-6);
    var lenMaj = h * 0.34, lenHalf = h * 0.25, lenMin = h * 0.17;
    var dec = decOf(step), fmt = o.fmt || function (q) { return fnum(q, dec); };
    ctx.font = D.font(10.5, 650, true);
    var labw = Math.max(ctx.measureText(fmt(vmin)).width, ctx.measureText(fmt(vmax)).width, ctx.measureText(fmt(vmin + step)).width), every = num(o.labelEvery, 0);
    if (!(every >= 1)) { var cand = [1, 2, 5, 10, 20, 50, 100]; every = 100; for (i = 0; i < cand.length; i++) if (step * ppu * cand[i] >= labw + 10) { every = cand[i]; break; } }
    ctx.strokeStyle = M.tick; ctx.lineCap = 'butt';
    var paths = [[], [], []];
    for (i = i0; i <= i1; i++) {
      v = i * ds; px = x0 + (v - vmin) * ppu;
      var kind = (i % sub === 0) ? 2 : (sub % 2 === 0 && i % (sub / 2) === 0) ? 1 : 0;
      paths[kind].push(px);
    }
    [[0, lenMin, 1], [1, lenHalf, 1.2], [2, lenMaj, 1.7]].forEach(function (k) {
      ctx.lineWidth = k[2]; ctx.beginPath();
      paths[k[0]].forEach(function (q) { ctx.moveTo(q, y); ctx.lineTo(q, y + sg * k[1]); });
      ctx.stroke();
    });
    ctx.fillStyle = M.num; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (i = i0; i <= i1; i++) {
      if (i % sub !== 0 || Math.abs(i / sub) % every !== 0) continue;
      v = i * ds; px = x0 + (v - vmin) * ppu;
      ctx.fillText(fmt(v), px, y + sg * (lenMaj + 10.5));
    }
    if (o.units) { ctx.font = D.font(10.5, 800, true); ctx.textAlign = 'right'; ctx.fillStyle = M.num; ctx.globalAlpha = (o.alpha == null ? 1 : o.alpha) * 0.8; ctx.fillText(String(o.units), x1 + pad - 4, y + sg * (h - 9)); ctx.globalAlpha = o.alpha == null ? 1 : o.alpha; }
    // săgeți de marcare
    if (o.marks) o.marks.forEach(function (mk) {
      var q = x0 + (num(mk.v, 0) - vmin) * ppu, col = mk.color || accent, ty = y - sg * 2;
      ctx.fillStyle = col; ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1; ctx.lineJoin = 'round';
      ctx.beginPath(); ctx.moveTo(q, ty); ctx.lineTo(q - 6, ty - sg * 11); ctx.lineTo(q + 6, ty - sg * 11); ctx.closePath(); ctx.fill(); ctx.stroke();
      if (mk.label) A.chip(ctx, String(mk.label), q, ty - sg * 25, { align: 'center', size: 11, dot: col });
    });
    ctx.restore();
    return { x: function (q) { return x0 + (q - vmin) * ppu; }, val: function (q) { return vmin + (q - x0) / ppu; }, a: { x: x0, y: y }, b: { x: x1, y: y },
      y: y, edge: y + sg * h, h: h, step: step, sub: sub, bodyX: bx, bodyW: bw };
  };

  /* ======================= APARAT DE MĂSURĂ ======================= */
  var gState = {}, gCount = 0;
  /* acul se mișcă fin spre valoarea țintă (arc ușor subamortizat, cu mică depășire); starea e ținută intern după o.id / poziție */
  function gEase(key, uT, o) {
    var now = (global.performance && global.performance.now ? global.performance.now() : Date.now()) / 1000, s = gState[key];
    if (!s) { if (gCount > 80) { gState = {}; gCount = 0; } s = gState[key] = { u: uT, v: 0, last: now }; gCount++; return uT; }
    var dt = clamp(now - s.last, 0, 0.05); s.last = now;
    if (RF.reduced || o.ease === false) { s.u = uT; s.v = 0; return uT; }
    if (dt <= 0) return s.u;
    var n = Math.ceil(dt / 0.006), hh = dt / n, k = 170, c = 2 * Math.sqrt(k) * 0.7, i;
    for (i = 0; i < n; i++) { s.v += (k * (uT - s.u) - c * s.v) * hh; s.u += s.v * hh; }
    return s.u;
  }
  /* A.gauge(ctx, x, y, r, o) — aparat de măsură rotund (ampermetru / voltmetru): ramă cromată, cadran cu scală, zone colorate, ac, sticlă.
     o: {value, min:0, max:1 (valoarea de la capătul scalei), center:true (zero la mijloc: scala merge de la −max la +max),
         unit ('µA', 'V' …, sub ac), label (text mic deasupra pivotului, ex. 'FOTOCURENT'), step, sub (pas și subdiviziuni; implicit „rotunde”),
         zones:[{from,to,color}] (arce colorate pe scală), sweep (grade; implicit 240), face 'auto'|'cream'|'dark', accent (nuanța ramei; implicit oțel),
         needle (culoarea acului; implicit portocaliu), readout: true (fereastră LCD cu valoarea) · readoutColor, fmt(v),
         ease:false (fără mișcare fină a acului), id (identitatea aparatului pentru mișcarea fină, dacă își schimbă poziția), shadow:false, alpha}
     întoarce {x,y,r, pivot, tip (vârful acului), value (valoarea afișată acum), target, angle, point(v, k) -> punct pe cadran la valoarea v și raza k·r, below} */
  A.gauge = function (ctx, x, y, r, o) {
    o = o || {};
    r = Math.max(14, num(r, 60));
    var p = pal(), face = faceOf(o, p), C = FACES[face], sweepDeg = clamp(num(o.sweep, 240), 90, 300), sweep = sweepDeg * PI / 180;
    var center = !!(o.center || o.zero), vmax = num(o.max, 1), vmin;
    if (center) { vmax = Math.max(Math.abs(vmax), o.min != null ? Math.abs(num(o.min, 0)) : 0) || 1; vmin = -vmax; }
    else { vmin = num(o.min, 0); if (!(vmax > vmin)) vmax = vmin + 1; }
    var range = vmax - vmin, step = num(o.step, 0) > 0 ? +o.step : niceStep(range, r > 70 ? 6 : 5), e = Math.pow(10, Math.floor(Math.log(step) / Math.LN10 + 1e-9)), m = step / e;
    var sub = Math.round(num(o.sub, 0)) || (m < 1.5 ? 5 : m < 3 ? (Math.abs(m - 2.5) < .01 ? 5 : 4) : 5);
    var dec = decOf(step), fmt = o.fmt || function (q) { return fnum(q, dec); };
    var rq = Math.max(14, Math.round(r)), k = r / rq, pad = Math.ceil(rq * 0.3), S = 2 * rq + 2 * pad, shadow = o.shadow !== false;
    var zones = o.zones || [], zkey = zones.map(function (z) { return z.from + '>' + z.to + ':' + z.color; }).join(';');
    var hasRead = !!o.readout, unit = o.unit ? String(o.unit) : '', label = o.label ? String(o.label) : '', tint = o.accent ? A.mix(o.accent, '#dfe6f2', .14) : '#b6c1d4';
    var rcol = o.readoutColor || p.s1;
    function ang(v) { return -sweep / 2 + (v - vmin) / range * sweep; }

    var spr = A.cached(['lab.gauge', rq, face, vmin, vmax, step, sub, sweepDeg, unit, label, zkey, tint, hasRead ? 1 : 0, rcol, shadow ? 1 : 0, fmt(vmin) + fmt(vmax) + fmt(vmin + step)].join('|'), S, S, function (c2, w, h) {
      var R = rq, Rf = R * 0.885, Rt = R * 0.745, i, v, a, s, c, i0, i1, ds = step / sub;
      c2.translate(w / 2, h / 2);
      if (shadow) dropShadow(c2, R, R * 0.05, R * 0.12, 0.34);
      metalRing(c2, R, R * 0.115, tint);
      dialFace(c2, Rf, C);
      c2.save(); c2.rotate(-PI / 2);
      // zone colorate
      zones.forEach(function (z) {
        var a0 = ang(clamp(num(z.from, vmin), vmin, vmax)), a1 = ang(clamp(num(z.to, vmax), vmin, vmax));
        c2.lineCap = 'butt'; c2.lineWidth = R * 0.05; c2.strokeStyle = z.color || p.good;
        c2.beginPath(); c2.arc(0, 0, R * 0.8, a0, a1); c2.stroke();
        c2.lineWidth = R * 0.016; c2.strokeStyle = 'rgba(255,255,255,.4)';
        c2.beginPath(); c2.arc(0, 0, R * 0.8 - R * 0.012, a0, a1); c2.stroke();
      });
      c2.strokeStyle = C.sub; c2.lineWidth = Math.max(.8, R * 0.01);
      c2.beginPath(); c2.arc(0, 0, Rt + R * 0.012, -sweep / 2, sweep / 2); c2.stroke();
      c2.restore();
      // gradații
      i0 = Math.ceil(vmin / ds - 1e-6); i1 = Math.floor(vmax / ds + 1e-6);
      c2.lineCap = 'butt'; c2.strokeStyle = C.sub; c2.lineWidth = Math.max(.7, R * 0.011); c2.beginPath();
      for (i = i0; i <= i1; i++) { if (i % sub === 0) continue; a = ang(i * ds); s = Math.sin(a); c = -Math.cos(a); c2.moveTo(s * Rt, c * Rt); c2.lineTo(s * (Rt - R * 0.055), c * (Rt - R * 0.055)); }
      c2.stroke();
      c2.lineCap = 'round'; c2.strokeStyle = C.ink; c2.lineWidth = Math.max(1.4, R * 0.028); c2.beginPath();
      for (i = i0; i <= i1; i++) { if (i % sub !== 0) continue; a = ang(i * ds); s = Math.sin(a); c = -Math.cos(a); c2.moveTo(s * (Rt - R * 0.01), c * (Rt - R * 0.01)); c2.lineTo(s * (Rt - R * 0.115), c * (Rt - R * 0.115)); }
      c2.stroke();
      // cifre
      var fs = clamp(R * 0.14, 9.5, 14), Rn = R * 0.5, maxw = 0, every = 1;
      c2.font = D.font(fs, 650, true);
      for (i = Math.ceil(vmin / step - 1e-6); i <= Math.floor(vmax / step + 1e-6); i++) maxw = Math.max(maxw, c2.measureText(fmt(i * step)).width);
      while (Rn * (step / range * sweep) * every < maxw + fs * 0.7 && every < 8) every++;
      c2.fillStyle = C.num; c2.textAlign = 'center'; c2.textBaseline = 'middle';
      for (i = Math.ceil(vmin / step - 1e-6); i <= Math.floor(vmax / step + 1e-6); i++) {
        if (Math.abs(i) % every !== 0) continue;
        v = i * step; a = ang(v); c2.fillText(fmt(v), Math.sin(a) * Rn, -Math.cos(a) * Rn + fs * 0.05);
      }
      if (label) { c2.fillStyle = C.sub; c2.font = D.font(clamp(R * 0.095, 8.5, 11), 700); c2.fillText(label, 0, -R * 0.27); }
      if (hasRead) {
        var ww = R * 0.86, hh = R * 0.27, wy = R * 0.58;
        rr(c2, -ww / 2 - 1.5, wy - hh / 2 - 1.5, ww + 3, hh + 3, hh * 0.3); c2.fillStyle = A.lin(c2, 0, wy - hh / 2, 0, wy + hh / 2, [[0, 'rgba(0,0,0,.35)'], [1, 'rgba(255,255,255,.4)']]); c2.fill();
        rr(c2, -ww / 2, wy - hh / 2, ww, hh, hh * 0.25); c2.fillStyle = A.lin(c2, 0, wy - hh / 2, 0, wy + hh / 2, [[0, A.mix(rcol, '#02060e', .92)], [1, A.mix(rcol, '#02060e', .82)]]); c2.fill();
      } else if (unit) {
        c2.fillStyle = C.num; c2.font = D.font(clamp(R * 0.21, 10, 20), 800); c2.textBaseline = 'middle'; c2.fillText(unit, 0, R * 0.55);
      }
    });

    var target = clamp(num(o.value, vmin), vmin - range * 0.04, vmax + range * 0.04), uT = (target - vmin) / range;
    var key = o.id || [Math.round(x), Math.round(y), Math.round(r), unit].join(',');
    var u = gEase(key, uT, o), a = -sweep / 2 + u * sweep, shown = vmin + u * range;
    ctx.save();
    if (o.alpha != null) ctx.globalAlpha = clamp(o.alpha, 0, 1);
    ctx.translate(x, y); ctx.scale(k, k);
    A.blit(ctx, spr, -S / 2, -S / 2);
    var R = rq, Rf = R * 0.885, sh = R * 0.03;
    if (hasRead) drawLCD(ctx, o.fmt ? o.fmt(target) : fnum(target, Math.max(dec, 1)), 0, R * 0.58, R * (unit ? 0.58 : 0.7), R * 0.19, rcol, { glow: 0.22 });
    if (hasRead && unit) { ctx.font = D.font(clamp(R * 0.12, 9, 13), 800, true); ctx.fillStyle = A.lighten(rcol, .2); ctx.textAlign = 'right'; ctx.textBaseline = 'alphabetic'; ctx.fillText(unit, R * 0.41, R * 0.64); }
    var nc = o.needle || '#ff7a2e', nf = A.lin(ctx, -R * 0.3, -R * 0.3, R * 0.3, R * 0.3, [[0, A.lighten(nc, .5)], [.5, nc], [1, A.darken(nc, .3)]]);
    needle(ctx, a, R * 0.7, R * 0.17, R * 0.062, R * 0.014, nf, true, sh, sh * 1.6);
    hub(ctx, 0, 0, R * 0.075, '#c9d3e4', A.darken(nc, .1));
    glassShine(ctx, Rf, face === 'cream' ? 0.9 : 1);
    ctx.restore();
    return { x: x, y: y, r: r, pivot: { x: x, y: y }, tip: { x: x + Math.sin(a) * r * 0.7, y: y - Math.cos(a) * r * 0.7 }, value: shown, target: target, angle: a,
      point: function (v, kk) { var aa = ang(clamp(v, vmin, vmax)); kk = kk == null ? 0.8 : kk; return { x: x + Math.sin(aa) * r * kk, y: y - Math.cos(aa) * r * kk }; },
      below: { x: x, y: y + r * 1.12 + 6 }, top: { x: x, y: y - r }, face: r * 0.885 };
  };

  /* ======================= galerie (previzualizare pentru dezvoltare) ======================= */
  function backdrop(ctx, W, H) {
    var P = pal(); D.clear({ ctx: ctx, W: W, H: H });
    ctx.fillStyle = A.lin(ctx, 0, 0, 0, H, P.dark ? [[0, '#17264c'], [1, '#0b1430']] : [[0, '#e8f2ff'], [1, '#c3d7ef']]); ctx.fillRect(0, 0, W, H);
    D.grid(ctx, W, H, 26, P.dark ? 'rgba(150,180,255,.045)' : 'rgba(20,30,70,.05)');
  }
  function note(ctx, text, x, y, o) { var P = pal(); A.chip(ctx, text, x, y, o || { align: 'center', size: 11 }); }

  A.gallery.push({
    name: 'A.clock — ceasuri S și S′', src: 'art-lab.js', w: 440, h: 250, draw: function (ctx, W, H, t) {
      var P = pal(); backdrop(ctx, W, H);
      var rb = Math.min(W * 0.125, H * 0.27), cy = H * 0.42, rs = Math.min(W * 0.058, H * 0.1);
      var a = A.clock(ctx, W * 0.165, cy, rb, { accent: P.s1, time: t * 5 + 7, start: 10 * 3600 + 8 * 60 + 12, label: 'S' });
      var b = A.clock(ctx, W * 0.44, cy, rb, { accent: P.s2, time: t * 4 + 5.6, start: 10 * 3600 + 8 * 60 + 12, label: 'S′', numerals: 12 });
      note(ctx, 't = ' + fnum(t * 5 + 7, 1) + ' s', a.below.x, a.below.y + 3, { align: 'center', size: 11, dot: P.s1 });
      note(ctx, 't′ = ' + fnum(t * 4 + 5.6, 1) + ' s', b.below.x, b.below.y + 3, { align: 'center', size: 11, dot: P.s2 });
      A.clock(ctx, W * 0.76, H * 0.28, rs, { accent: P.s1, time: 0, start: 3 * 3600 + 45 * 60 + 20, face: 'cream' });
      A.clock(ctx, W * 0.91, H * 0.28, rs, { accent: P.s2, time: 0, start: 8 * 3600 + 15 * 60, face: 'dark', hands: 'hm' });
      A.clock(ctx, W * 0.76, H * 0.62, rs, { accent: P.light, time: t * 12, face: 'cream', period: 6, hands: 's', numerals: 0 });
      A.clock(ctx, W * 0.91, H * 0.62, rs * 0.6, { accent: P.good, time: t * 3, hands: 'ms' });
      note(ctx, 'face · period · hands', W * 0.835, H * 0.9, { align: 'center', size: 10.5 });
    }
  });
  A.gallery.push({
    name: 'A.stopwatch — cronometre', src: 'art-lab.js', w: 440, h: 250, draw: function (ctx, W, H, t) {
      var P = pal(); backdrop(ctx, W, H);
      var r1 = Math.min(W * 0.125, H * 0.25), cy = H * 0.56, T = (t * 3.7) % 60;
      var a = A.stopwatch(ctx, W * 0.165, cy, r1, { accent: P.s1, time: T, label: 'S', pressed: (T < 0.25 ? 1 : 0) });
      var b = A.stopwatch(ctx, W * 0.44, cy, r1, { accent: P.s2, time: (t * 3 + 8) % 60, readout: true, label: 'S′' });
      A.stopwatch(ctx, W * 0.735, H * 0.52, r1 * 0.62, { accent: P.light, time: (t * 0.9) % 10, period: 10 });
      A.stopwatch(ctx, W * 0.905, H * 0.57, r1 * 0.34, { accent: P.good, time: (t * 6) % 60, face: 'cream' });
      note(ctx, 'Δt = ' + fnum(T, 2) + ' s', a.below.x, a.below.y + 3, { align: 'center', size: 11, dot: P.s1 });
      note(ctx, 'readout: true', b.below.x, b.below.y + 3, { align: 'center', size: 11, dot: P.s2 });
      note(ctx, 'period: 10', W * 0.735, H * 0.9, { align: 'center', size: 10.5 });
    }
  });
  A.gallery.push({
    name: 'A.digital — afișaje', src: 'art-lab.js', w: 440, h: 230, draw: function (ctx, W, H, t) {
      var P = pal(); backdrop(ctx, W, H);
      var w1 = Math.min(W * 0.42, 190), hh = 54;
      var secs = Math.floor(t * 7.3) % 86400, hs = 13, ms = 7 + Math.floor(secs / 60) % 60, ss = secs % 60;
      function two(n) { return (n < 10 ? '0' : '') + n; }
      A.digital(ctx, W * 0.27, H * 0.2, w1, hs + ':' + two(ms) + ':' + two(ss), { color: P.s1, label: 'S', h: hh });
      A.digital(ctx, W * 0.73, H * 0.2, w1, hs + ':' + two(ms) + ':' + two((ss + 53) % 60), { color: P.s2, label: 'S′', h: hh });
      var b = 0.4 + 0.45 * (0.5 + 0.5 * Math.sin(t * 0.7));
      A.digital(ctx, W * 0.27, H * 0.5, w1 * 0.82, fnum(b, 3), { color: P.light, unit: 'c', label: 'β = v/c', h: 50 });
      A.digital(ctx, W * 0.73, H * 0.5, w1 * 0.82, fnum(1 / Math.sqrt(1 - b * b), 3), { color: P.good, label: 'γ', h: 50 });
      A.digital(ctx, W * 0.27, H * 0.78, w1 * 0.8, fnum(-1.2 + 0.4 * Math.sin(t), 2), { color: '#9be37a', unit: 'V', h: 42 });
      A.digital(ctx, W * 0.73, H * 0.78, w1 * 0.8, 'E = ' + fnum(2.1 + 0.2 * Math.sin(t), 2), { color: '#ff9d7a', unit: 'eV', h: 42, align: 'center' });
    }
  });
  A.gallery.push({
    name: 'A.rod + A.ruler — bară și riglă', src: 'art-lab.js', w: 440, h: 250, draw: function (ctx, W, H, t) {
      var P = pal(); backdrop(ctx, W, H);
      var pad = W * 0.08, L = W - 2 * pad, beta = 0.15 + 0.78 * (0.5 + 0.5 * Math.sin(t * 0.7)), gam = 1 / Math.sqrt(1 - beta * beta);
      var rod1 = A.rod(ctx, pad, H * 0.2, pad + L, { accent: P.s1, labels: true });
      A.ruler(ctx, pad, H * 0.3, pad + L, { min: 0, max: 10, units: 'm' });
      var rod2 = A.rod(ctx, pad, H * 0.66, pad + L / gam, { accent: P.s2, labels: ['A′', 'B′'] });
      var rl = A.ruler(ctx, pad, H * 0.76, pad + L, { min: 0, max: 10, units: 'm', material: 'steel', marks: [{ v: 10 / gam, color: P.s2, label: 'L = ' + fnum(10 / gam, 2) }] });
      note(ctx, 'γ = ' + fnum(gam, 2), W - pad - 28, H * 0.44, { align: 'center', size: 11 });
    }
  });
  A.gallery.push({
    name: 'A.gauge — aparate de măsură', src: 'art-lab.js', w: 440, h: 250, draw: function (ctx, W, H, t) {
      var P = pal(); backdrop(ctx, W, H);
      var r = Math.min(W * 0.14, H * 0.27), cy = H * 0.4;
      var g1 = A.gauge(ctx, W * 0.18, cy, r, { id: 'g1', value: 1.6 * Math.sin(t * 0.9), center: true, max: 2, unit: 'µA', label: 'FOTOCURENT' });
      var g2 = A.gauge(ctx, W * 0.5, cy, r, { id: 'g2', value: 0.52 + 0.4 * Math.sin(t * 0.6), max: 1, unit: 'mA', readout: true, zones: [{ from: 0, to: 0.6, color: P.good }, { from: 0.6, to: 0.85, color: P.warn }, { from: 0.85, to: 1, color: P.bad }] });
      var vs = [1.2, 3.8, 2.5, 4.6, 0.4][Math.floor(t / 1.6) % 5];
      var g3 = A.gauge(ctx, W * 0.82, cy, r, { id: 'g3', value: vs, max: 5, unit: 'V', face: 'cream', accent: P.s1 });
      note(ctx, 'center: true', g1.below.x, g1.below.y + 3, { align: 'center', size: 10.5 });
      note(ctx, 'zones · readout', g2.below.x, g2.below.y + 3, { align: 'center', size: 10.5 });
      note(ctx, 'face: cream', g3.below.x, g3.below.y + 3, { align: 'center', size: 10.5 });
      A.gauge(ctx, W * 0.14, H * 0.84, r * 0.4, { id: 'g4', value: 0.5 + 0.5 * Math.sin(t), max: 1 });
      A.gauge(ctx, W * 0.26, H * 0.84, r * 0.4, { id: 'g5', value: 0.2 + 0.2 * Math.sin(t * 1.3), max: 1, accent: P.s2, face: 'cream' });
      A.gauge(ctx, W * 0.86, H * 0.84, r * 0.4, { id: 'g6', value: -0.6 + 0.3 * Math.sin(t * .8), center: true, max: 1, accent: P.light });
    }
  });
})(window);
