/* ==========================================================================
   art-spacetime.js — diagrame spațiu-timp (Minkowski) pentru RF.art
   Convenții: unități cu c = 1 (axa verticală e ct); reperul S (fix) = cyan P.s1,
   S′ (se mișcă cu v = βc spre +x) = roz P.s2; lumina = chihlimbar P.light;
   invarianți (hiperbole) = verde P.good; evenimente = stele violet P.acc2.
   Lumea e „în picioare”: razele de lumină sunt la 45° (scara x și ct e egală
   implicit — vezi o.equal), axa ct′ e linia de univers x = βt, axa x′ e t = βx,
   unitățile de pe axele S′ sunt întinse cu √((1+β²)/(1−β²)) față de cele din S,
   ca să stea pe aceeași hiperbolă t² − x² = const.

   ┌─ A.spacetime(ctx, rect, o) → st ────────────────────────────────────────┐
   │ rect {x,y,w,h} = tot panoul (card rotunjit). o:                          │
   │  xmin,xmax,tmin,tmax (c=1; implicit −4,4,−3,5)                           │
   │  equal:true   scară egală x/ct (extinde domeniul scurt; false = umple)    │
   │  step         pasul grilei/gradațiilor (auto)                            │
   │  grid:true|'dots'|false · cone:true (viitor/trecut chihlimbar, „în altă  │
   │  parte” neutru) · coneLabels:true|false|{future,past,elsewhere}          │
   │  light:true (razele de 45° strălucitoare) · lightLabel:'lumină'|false    │
   │  labels:true (nume axe, cifre, O) · numerals:true · xlabel:'x' · tlabel:'ct'│
   │  origin:'O'|false · title:'text' (chip sus-stânga) · color (axele lui S) │
   │  panel:true · t (secunde → pulsuri de lumină pe raze; ignorat la RF.reduced)│
   │ st: px(x) py(t) ix(px) it(py) · rect plot sx sy xmin xmax tmin tmax step │
   │  st.frame(beta,{color,label:'S′',grid:true,ticks:true,numerals:true,      │
   │      step,origin:{x,t},galilei:false,angle:false,alpha}) → f              │
   │      f: beta gamma toS(x′,t′)→{x,t} fromS(x,t)→{x,t} pt(x′,t′)→{x,y}      │
   │         event(x′,t′,o) simLine(t′,o) worldline(pts′,o)                   │
   │  st.event(x,t,{label,color,r,pos,drop:true|f,shape,pulse}) → {x,y,r,label}│
   │  st.worldline(pts,{color,w,ticks:Δτ|{every,labels},arrow:true,label,      │
   │      labelAt:.5,labelSide:1,dash,tau0,alpha}) → {tau,at(τ),start,end}     │
   │  st.hyperbola(s2,{timelike:true,color,alpha,w,label,sheet:0|1|-1,dash})   │
   │  st.simLine(t0,{beta,x0:0,color,dash,label,frame,from,to})  (prin (x0,t0)) │
   │  st.lightRay(x0,t0,dir,{back,len,arrow:true,color,label,pulse})           │
   │  st.cone(x,t,{color,alpha,future,past,rays:true,elsewhere})               │
   │  st.segment(x0,t0,x1,t1,{color,w,dash,arrow,label}) · st.measure(...)     │
   │  st.text(x,t,str,{chip:true,color,pos,size,math,mono,dot})                │
   │  st.legend([{label,color}],{pos:'tl'|'tr'|'bl'|'br'}) · st.clip()/unclip()│
   └──────────────────────────────────────────────────────────────────────────┘
   A.eventMark(ctx, x, y, o) → {x,y,r,label}      (x,y)=centrul stelei
        o:{color (P.acc2), r:7, label, pos:'ne'|'nw'|'se'|'sw'|'n'|'s'|'e'|'w',
           shape:'star'|'diamond'|'dot', glow:true, ring:true, pulse:true, t, sub}
   A.frameAxes(ctx, ox, oy, len, angle, o) → {o,x,y,ux,uy,to(a,b)}
        (ox,oy)=originea în px; angle (rad, antiorar pe ecran) = axa 1; axa 2 =
        angle + 90° sau o.angle2; o:{color,color2,labels:['x','y'],ticks,neg:.22,w,dash,alpha,origin}
   ========================================================================== */
(function (global) {
  'use strict';
  var RF = global.RF, D = RF.draw, A = RF.art = RF.art || {};
  A.gallery = A.gallery || [];
  var TAU = Math.PI * 2, PI = Math.PI;
  var abs = Math.abs, min = Math.min, max = Math.max, sqrt = Math.sqrt, floor = Math.floor, ceil = Math.ceil;

  /* ======================= utilitare private ======================= */
  function num(v, d) { return typeof v === 'number' && isFinite(v) ? v : d; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function pt(p) { return Array.isArray(p) ? { x: +p[0], t: +p[1] } : { x: +p.x, t: +(p.t != null ? p.t : p.y) }; }
  function fmtNum(v) {
    var r = Math.round(v * 100) / 100;
    if (r === 0) r = 0;
    var s = String(r).replace('.', ',');
    return s.charAt(0) === '-' ? '−' + s.slice(1) : s;
  }
  function niceStep(raw) {
    var e = Math.pow(10, floor(Math.log(raw) / Math.LN10)), m = raw / e;
    return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * e;
  }
  /* fontul „matematic” (cursiv, serif) — la fel ca <var> din paginile site-ului */
  var serifStack = null;
  function serif() {
    if (!serifStack) {
      var s = '';
      try { s = getComputedStyle(document.documentElement).getPropertyValue('--serif').trim(); } catch (e) { /* ignorăm */ }
      serifStack = s || '"STIX Two Text","Iowan Old Style","Times New Roman",Georgia,serif';
    }
    return serifStack;
  }
  function vfont(size, weight) { return 'italic ' + (weight || 600) + ' ' + size + 'px ' + serif(); }

  /* intersecția dreptei (x0,y0)+u·(dx,dy) cu un dreptunghi; întoarce [u0,u1] sau null */
  function lineRect(x0, y0, dx, dy, L, T, Rr, B) {
    var u0 = -Infinity, u1 = Infinity;
    function cl(p, q) {
      if (abs(p) < 1e-12) return q >= 0;
      var r = q / p;
      if (p < 0) { if (r > u1) return false; if (r > u0) u0 = r; }
      else { if (r < u0) return false; if (r < u1) u1 = r; }
      return true;
    }
    if (cl(-dx, x0 - L) && cl(dx, Rr - x0) && cl(-dy, y0 - T) && cl(dy, B - y0)) return [u0, u1];
    return null;
  }
  function overlapArea(a, b) {
    var w = min(a.x + a.w, b.x + b.w) - max(a.x, b.x), h = min(a.y + a.h, b.y + b.h) - max(a.y, b.y);
    return w > 0 && h > 0 ? w * h : 0;
  }

  /* vârf de săgeată (cu mică scobitură în spate), vârful în (x,y), direcția = ang */
  function arrowHead(ctx, x, y, ang, len, wid, color) {
    var c = Math.cos(ang), s = Math.sin(ang), nx = -s, ny = c;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - c * len + nx * wid / 2, y - s * len + ny * wid / 2);
    ctx.lineTo(x - c * len * 0.7, y - s * len * 0.7);
    ctx.lineTo(x - c * len - nx * wid / 2, y - s * len - ny * wid / 2);
    ctx.closePath();
    ctx.fillStyle = color; ctx.strokeStyle = color; ctx.lineJoin = 'round'; ctx.lineWidth = 1.6;
    ctx.fill(); ctx.stroke();
    ctx.restore();
  }

  /* linie cu halou moale (2 trepte) + miez; path() construiește calea */
  function glowStroke(ctx, P, path, color, w, o) {
    o = o || {};
    var gk = o.glow == null ? 1 : o.glow, dark = P.dark;
    ctx.save();
    ctx.lineCap = o.cap || 'round'; ctx.lineJoin = 'round';
    if (o.dash) ctx.setLineDash(o.dash);
    if (gk > 0) {
      if (dark) ctx.globalCompositeOperation = 'lighter';
      ctx.lineWidth = w * 4.4; ctx.strokeStyle = D.rgba(color, 0.085 * gk); path(); ctx.stroke();
      ctx.lineWidth = w * 2.3; ctx.strokeStyle = D.rgba(color, (dark ? 0.17 : 0.12) * gk); path(); ctx.stroke();
      ctx.globalCompositeOperation = 'source-over';
    }
    ctx.lineWidth = w; ctx.strokeStyle = o.stroke || D.rgba(color, o.alpha == null ? 1 : o.alpha);
    path(); ctx.stroke();
    if (o.core) { ctx.lineWidth = Math.max(0.8, w * 0.4); ctx.strokeStyle = o.core; path(); ctx.stroke(); }
    ctx.restore();
  }

  /* text cu contur (halou) în culoarea panoului — pentru cifre pe fundal aglomerat */
  function haloText(ctx, P, str, x, y, color, o) {
    o = o || {};
    ctx.save();
    ctx.font = o.font || D.font(o.size || 11, o.weight || 500, !o.noMono);
    ctx.textAlign = o.align || 'center'; ctx.textBaseline = o.base || 'middle';
    ctx.lineJoin = 'round'; ctx.lineWidth = o.halo || 3.6;
    ctx.strokeStyle = o.bg || (P.dark ? 'rgba(11,18,42,.86)' : 'rgba(255,255,255,.9)');
    ctx.strokeText(str, x, y);
    ctx.fillStyle = color; ctx.fillText(str, x, y);
    ctx.restore();
  }

  /* chip (aceeași înfățișare ca A.chip, dar cu font „matematic” opțional și măsurare separată) */
  function chipMeasure(ctx, text, o) {
    var size = o.size || 12;
    ctx.save();
    ctx.font = o.math ? vfont(size + 1.5, 600) : D.font(size, 650, o.mono);
    var tw = ctx.measureText(text).width;
    ctx.restore();
    var padX = o.pad == null ? 9 : o.pad, dotW = o.dot ? 13 : 0;
    return { w: tw + padX * 2 + dotW, h: size + 11, padX: padX, dotW: dotW, size: size };
  }
  function chipDraw(ctx, text, bx, by, m, o) {
    var P = RF.sim.palette();
    ctx.save();
    if (o.shadow !== false) { ctx.shadowColor = 'rgba(0,0,0,.28)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 2; }
    D.fillRR(ctx, bx, by, m.w, m.h, m.h / 2, o.bg || D.rgba(P.card, 0.94), o.border || D.rgba(o.dot || o.color || P.line2, o.dot || o.color ? 0.75 : 0.8), 1);
    ctx.shadowColor = 'transparent';
    if (o.dot) { ctx.fillStyle = o.dot; ctx.beginPath(); ctx.arc(bx + 11, by + m.h / 2, 3.6, 0, TAU); ctx.fill(); }
    ctx.fillStyle = o.color || P.tx;
    ctx.font = o.math ? vfont(m.size + 1.5, 600) : D.font(m.size, 650, o.mono);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    ctx.fillText(text, bx + m.padX + m.dotW, by + m.h / 2 + (o.math ? 0 : 0.5));
    ctx.restore();
  }
  /* poziția colțului stânga-sus al unei cutii (w,h) în jurul ancorei (ax,ay) pe partea `side` */
  function sideBox(side, w, h, ax, ay, g) {
    switch (side) {
      case 'e': return { x: ax + g, y: ay - h / 2 };
      case 'w': return { x: ax - g - w, y: ay - h / 2 };
      case 'n': return { x: ax - w / 2, y: ay - g - h };
      case 's': return { x: ax - w / 2, y: ay + g };
      case 'ne': return { x: ax + g, y: ay - g - h };
      case 'nw': return { x: ax - g - w, y: ay - g - h };
      case 'se': return { x: ax + g, y: ay + g };
      case 'sw': return { x: ax - g - w, y: ay + g };
      default: return { x: ax - w / 2, y: ay - h / 2 };
    }
  }
  var SIDES_ALL = ['ne', 'nw', 'se', 'sw', 'n', 's', 'e', 'w'];

  /* ======================= A.eventMark ======================= */
  /* stea cu 4 vârfuri, concavă */
  function starPath(ctx, x, y, R, k) {
    ctx.beginPath();
    ctx.moveTo(x, y - R);
    ctx.quadraticCurveTo(x + R * k, y - R * k, x + R, y);
    ctx.quadraticCurveTo(x + R * k, y + R * k, x, y + R);
    ctx.quadraticCurveTo(x - R * k, y + R * k, x - R, y);
    ctx.quadraticCurveTo(x - R * k, y - R * k, x, y - R);
    ctx.closePath();
  }

  /* Marcaj de eveniment: halou + inel + stea cu 4 vârfuri + miez alb + etichetă (chip) opțională.
     (x,y) = centrul. o:{color:P.acc2, r:7, label, sub, pos:'ne', shape:'star'|'diamond'|'dot',
     glow:true, ring:true, pulse:false (inel care se extinde cu o.t), t, gap}
     întoarce {x,y,r,label:{x,y,w,h}|null} */
  A.eventMark = function (ctx, x, y, o) {
    o = o || {};
    var P = RF.sim.palette(), dark = P.dark;
    var r = clamp(num(o.r, 7), 2, 40), col = o.color || P.acc2, shape = o.shape || 'star';
    var animate = o.t != null && !RF.reduced, T = animate ? o.t : 0;
    var R = r * 1.75;
    ctx.save();
    if (o.glow !== false) A.glow(ctx, x, y, r * 4, col, dark ? 0.62 : 0.4);
    if (animate && o.pulse) {
      var ph = (T * 0.55) % 1;
      ctx.strokeStyle = D.rgba(col, (1 - ph) * (dark ? 0.55 : 0.5)); ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.arc(x, y, r * (1.2 + 2.8 * ph), 0, TAU); ctx.stroke();
    }
    if (o.ring !== false && shape !== 'dot') {
      ctx.strokeStyle = D.rgba(col, dark ? 0.5 : 0.55); ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(x, y, r * 1.18, 0, TAU); ctx.stroke();
    }
    if (shape === 'star') {
      ctx.save(); ctx.translate(x, y); ctx.rotate(PI / 4);
      starPath(ctx, 0, 0, R * 0.62, 0.14); ctx.fillStyle = D.rgba(dark ? '#ffffff' : col, dark ? 0.4 : 0.38); ctx.fill();
      ctx.restore();
      starPath(ctx, x, y, R, 0.13);
      ctx.fillStyle = A.rad(ctx, x, y, 0, R, [[0, '#ffffff'], [0.3, A.lighten(col, 0.5)], [0.62, col], [1, A.darken(col, dark ? 0.1 : 0.22)]]);
      ctx.fill();
      ctx.lineJoin = 'round'; ctx.lineWidth = 1.1; ctx.strokeStyle = dark ? D.rgba(A.lighten(col, 0.7), 0.8) : D.rgba(A.darken(col, 0.4), 0.85); ctx.stroke();
    } else if (shape === 'diamond') {
      var dd = r * 1.25;
      ctx.beginPath(); ctx.moveTo(x, y - dd * 1.15); ctx.lineTo(x + dd, y); ctx.lineTo(x, y + dd * 1.15); ctx.lineTo(x - dd, y); ctx.closePath();
      ctx.fillStyle = A.lin(ctx, x - dd, y - dd, x + dd, y + dd, [[0, A.lighten(col, 0.6)], [0.5, col], [1, A.darken(col, 0.3)]]); ctx.fill();
      ctx.lineJoin = 'round'; ctx.lineWidth = 1.1; ctx.strokeStyle = dark ? D.rgba(A.lighten(col, 0.7), 0.8) : D.rgba(A.darken(col, 0.4), 0.85); ctx.stroke();
    } else {
      A.sphere(ctx, x, y, r * 0.95, col);
    }
    if (shape !== 'dot') { ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(x, y, r * 0.34, 0, TAU); ctx.fill(); }
    ctx.restore();

    var lab = null;
    if (o.label) {
      var co = { size: o.size || 12, math: o.math, color: o.labelColor, dot: o.dot };
      var m = chipMeasure(ctx, o.label, co), g = num(o.gap, R * 0.85 + 4);
      var b = sideBox(o.pos || 'ne', m.w, m.h, x, y, g);
      chipDraw(ctx, o.label, b.x, b.y, m, { size: co.size, math: o.math, color: o.labelColor, dot: o.dot, border: D.rgba(col, 0.7) });
      lab = { x: b.x, y: b.y, w: m.w, h: m.h };
    }
    return { x: x, y: y, r: r, R: R, label: lab };
  };

  /* ======================= A.frameAxes ======================= */
  /* Pereche de axe în pixeli. (ox,oy) = originea; len = lungimea părții pozitive; angle (rad, antiorar pe ecran)
     = direcția axei 1; axa 2 la angle+90° (sau o.angle2).
     o:{color:P.s1, color2, labels:['x','y'], ticks:0 (n gradații pe partea pozitivă), neg:.22 (partea negativă,
        fracție din len), w:2.2, dash, alpha, origin:false|'O', size, glow}
     întoarce {o:{x,y}, x:{x,y} (vârful axei 1), y:{x,y}, ux:{x,y}, uy:{x,y}, to(a,b) → punct în px la a·ux + b·uy} */
  A.frameAxes = function (ctx, ox, oy, len, angle, o) {
    o = o || {};
    var P = RF.sim.palette();
    len = max(12, num(len, 100)); angle = num(angle, 0);
    var col = o.color || P.s1, col2 = o.color2 || col;
    var a2 = o.angle2 != null ? o.angle2 : angle + PI / 2;
    var u1 = { x: Math.cos(angle), y: -Math.sin(angle) }, u2 = { x: Math.cos(a2), y: -Math.sin(a2) };
    var w = o.w || 2.2, neg = o.neg == null ? 0.22 : o.neg, labs = o.labels || ['x', 'y'], alpha = o.alpha == null ? 1 : o.alpha;
    var hl = 9 + w * 0.8;
    function axis(u, c, lab) {
      var ang = Math.atan2(u.y, u.x), tx = ox + u.x * len, ty = oy + u.y * len;
      ctx.save();
      ctx.globalAlpha = alpha;
      glowStroke(ctx, P, function () {
        ctx.beginPath(); ctx.moveTo(ox - u.x * len * neg, oy - u.y * len * neg); ctx.lineTo(tx - u.x * hl * 0.6, ty - u.y * hl * 0.6);
      }, c, w, { glow: o.glow == null ? 0.45 : o.glow, dash: o.dash });
      arrowHead(ctx, tx, ty, ang, hl, hl * 0.82, c);
      if (o.ticks > 0) {
        ctx.strokeStyle = D.rgba(c, 0.8); ctx.lineWidth = 1.5; ctx.lineCap = 'round'; ctx.beginPath();
        for (var i = 1; i < o.ticks; i++) {
          var k = len * i / o.ticks, px = ox + u.x * k, py = oy + u.y * k;
          ctx.moveTo(px - u.y * 3.5, py + u.x * 3.5); ctx.lineTo(px + u.y * 3.5, py - u.x * 3.5);
        }
        ctx.stroke();
      }
      ctx.restore();
      if (lab) {
        var co = { size: o.size || 12, math: o.math !== false, color: c }, m = chipMeasure(ctx, lab, co);
        var off = abs(u.x) * m.w / 2 + abs(u.y) * m.h / 2 + 7;
        chipDraw(ctx, lab, tx + u.x * off - m.w / 2, ty + u.y * off - m.h / 2, m, co);
      }
      return { x: tx, y: ty };
    }
    var t1 = axis(u1, col, labs[0]), t2 = axis(u2, col2, labs[1]);
    if (o.origin) {
      ctx.save(); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(ox, oy, 3, 0, TAU); ctx.fill(); ctx.restore();
      if (typeof o.origin === 'string') haloText(ctx, P, o.origin, ox - 9, oy + 12, P.tx2, { font: vfont(12.5, 600), align: 'center' });
    }
    return {
      o: { x: ox, y: oy }, x: t1, y: t2, ux: u1, uy: u2,
      to: function (a, b) { return { x: ox + a * u1.x + (b || 0) * u2.x, y: oy + a * u1.y + (b || 0) * u2.y }; }
    };
  };

  /* ======================= A.spacetime ======================= */
  A.spacetime = function (ctx, rect, o) {
    o = o || {}; rect = rect || {};
    var P = RF.sim.palette(), dark = P.dark;
    var R = { x: num(rect.x, 0), y: num(rect.y, 0), w: max(60, num(rect.w, 320)), h: max(60, num(rect.h, 240)) };
    var compact = R.w < 430 || R.h < 300;
    var labels = o.labels !== false;
    var animate = o.t != null && !RF.reduced, T = animate ? o.t : 0;
    var csz = compact ? 11.5 : 12;                        // mărimea textului din chip-uri

    /* ---- domeniu, margini, scară ---- */
    var xmin = num(o.xmin, -4), xmax = num(o.xmax, 4), tmin = num(o.tmin, -3), tmax = num(o.tmax, 5);
    if (!(xmax > xmin)) xmax = xmin + 1;
    if (!(tmax > tmin)) tmax = tmin + 1;
    var numerals = labels && o.numerals !== false;
    var padL = 12 + (numerals && xmin >= 0 ? 17 : 0), padB = 12 + (numerals && tmin >= 0 ? 17 : 0), padT = 15, padR = 15;
    var Q = { x: R.x + padL, y: R.y + padT, w: R.w - padL - padR, h: R.h - padT - padB };
    var sx = Q.w / (xmax - xmin), sy = Q.h / (tmax - tmin);
    if (o.equal !== false) {
      var sc = min(sx, sy);
      if (sx > sc * 1.0001) {
        var ex = Q.w / sc - (xmax - xmin);
        if (xmin >= 0) xmax += ex; else if (xmax <= 0) xmin -= ex; else { xmin -= ex / 2; xmax += ex / 2; }
      }
      if (sy > sc * 1.0001) {
        var et = Q.h / sc - (tmax - tmin);
        if (tmin >= 0) tmax += et; else if (tmax <= 0) tmin -= et; else { tmin -= et / 2; tmax += et / 2; }
      }
      sx = sy = sc;
    }
    function px(x) { return Q.x + (x - xmin) * sx; }
    function py(t) { return Q.y + Q.h - (t - tmin) * sy; }
    function ix(X) { return xmin + (X - Q.x) / sx; }
    function it(Y) { return tmin + (Q.y + Q.h - Y) / sy; }
    var ox = px(0), oy = py(0);
    var step = o.step > 0 ? o.step : (26 / sx <= 1 ? 1 : niceStep(26 / sx));
    var rad = clamp(min(R.w, R.h) * 0.05, 8, 16);
    var axc = o.color || P.s1;
    var axX = clamp(ox, Q.x, Q.x + Q.w), axY = clamp(oy, Q.y, Q.y + Q.h);

    var st = {
      ctx: ctx, rect: R, plot: Q, sx: sx, sy: sy, xmin: xmin, xmax: xmax, tmin: tmin, tmax: tmax,
      step: step, t: T, animate: animate, compact: compact, px: px, py: py, ix: ix, it: it, ox: ox, oy: oy, _boxes: []
    };

    function panelClip() {
      ctx.save();
      D.rrect(ctx, R.x + 0.5, R.y + 0.5, R.w - 1, R.h - 1, rad - 0.5);
      ctx.clip();
    }
    st.clip = panelClip;
    st.unclip = function () { ctx.restore(); };

    /* ---- etichete cu evitarea suprapunerilor ---- */
    function place(w, h, ax, ay, sides, gap) {
      var best = null, bs = Infinity;
      sides = sides || SIDES_ALL;
      for (var i = 0; i < sides.length; i++) {
        var b = sideBox(sides[i], w, h, ax, ay, gap);
        var score = i * 0.6;
        var offx = max(0, R.x + 3 - b.x) + max(0, b.x + w - (R.x + R.w - 3));
        var offy = max(0, R.y + 3 - b.y) + max(0, b.y + h - (R.y + R.h - 3));
        score += (offx * h + offy * w) * 4;
        var bb = { x: b.x, y: b.y, w: w, h: h };
        for (var k = 0; k < st._boxes.length; k++) score += overlapArea(bb, st._boxes[k]) * 5;
        if (score < bs) { bs = score; best = b; }
      }
      return best;
    }
    /* chip la (ax,ay) în px, pe una din părțile `sides`; se înregistrează ca obstacol */
    function tagPx(text, ax, ay, co, sides, gap) {
      co = co || {};
      if (co.size == null) co.size = csz;
      var m = chipMeasure(ctx, text, co), b = place(m.w, m.h, ax, ay, sides, gap == null ? 7 : gap);
      chipDraw(ctx, text, b.x, b.y, m, co);
      var box = { x: b.x, y: b.y, w: m.w, h: m.h };
      st._boxes.push(box);
      return box;
    }
    st.label = tagPx;
    st.tag = function (x, t, text, co, sides, gap) { return tagPx(text, px(x), py(t), co, sides, gap); };

    /* ---- panou ---- */
    if (o.panel !== false) {
      ctx.save();
      D.rrect(ctx, R.x, R.y, R.w, R.h, rad);
      ctx.fillStyle = A.lin(ctx, R.x, R.y, R.x + R.w * 0.6, R.y + R.h,
        dark ? [[0, A.mix(P.card2, '#ffffff', 0.05)], [0.5, P.card], [1, A.darken(P.card, 0.3)]]
             : [[0, '#ffffff'], [1, P.card2]]);
      ctx.fill();
      ctx.restore();
    }

    panelClip();
    /* ---- umbrire: conurile de lumină ---- */
    function drawCone(ax, ay, c) {
      c = c || {};
      var col = c.color || P.light, a = c.alpha == null ? 1 : c.alpha, L = 80;
      var Rg = Math.sqrt(Math.pow(max(ax - R.x, R.x + R.w - ax), 2) + Math.pow(max(ay - R.y, R.y + R.h - ay), 2));
      ctx.save();
      if (c.elsewhere !== false) {
        ctx.fillStyle = dark ? 'rgba(135,160,225,' + (0.055 * a) + ')' : 'rgba(45,65,135,' + (0.045 * a) + ')';
        ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ax + L * sx, ay - L * sy); ctx.lineTo(ax + L * sx, ay + L * sy); ctx.closePath(); ctx.fill();
        ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ax - L * sx, ay - L * sy); ctx.lineTo(ax - L * sx, ay + L * sy); ctx.closePath(); ctx.fill();
      }
      var g = ctx.createRadialGradient(ax, ay, 0, ax, ay, Rg);
      g.addColorStop(0, D.rgba(col, (dark ? 0.36 : 0.28) * a));
      g.addColorStop(0.42, D.rgba(col, (dark ? 0.15 : 0.12) * a));
      g.addColorStop(1, D.rgba(col, (dark ? 0.055 : 0.045) * a));
      ctx.fillStyle = g;
      if (c.future !== false) { ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ax + L * sx, ay - L * sy); ctx.lineTo(ax - L * sx, ay - L * sy); ctx.closePath(); ctx.fill(); }
      if (c.past !== false) { ctx.globalAlpha = 0.8; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ax + L * sx, ay + L * sy); ctx.lineTo(ax - L * sx, ay + L * sy); ctx.closePath(); ctx.fill(); }
      ctx.restore();
    }
    /* razele de 45° din (ax,ay): strălucitoare; pulsuri care urcă dacă există o.t */
    function drawRays(ax, ay, rc) {
      rc = rc || {};
      var col = rc.color || P.light, w = rc.w || 2.4;
      var core = dark ? 'rgba(255,249,228,.95)' : D.rgba(A.lighten(col, 0.6), 0.85);
      var dirs = [[1, 1], [-1, 1], [1, -1], [-1, -1]];
      for (var i = 0; i < 4; i++) {
        var d = dirs[i], dx = d[0] * sx, dy = -d[1] * sy;
        var rr = lineRect(ax, ay, dx, dy, R.x, R.y, R.x + R.w, R.y + R.h);
        if (!rr) continue;
        var u0 = max(0, rr[0]), u1 = rr[1];
        if (u1 <= u0 + 0.01) continue;
        var x0 = ax + dx * u0, y0 = ay + dy * u0, x1 = ax + dx * u1, y1 = ay + dy * u1;
        var grad = ctx.createLinearGradient(x0, y0, x1, y1);
        grad.addColorStop(0, D.rgba(col, 1)); grad.addColorStop(1, D.rgba(col, 0.62));
        glowStroke(ctx, P, function () { ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); }, col, w, { stroke: grad, core: core });
        if (animate && rc.pulse !== false) {
          var len = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)), ux = (x1 - x0) / len, uy = (y1 - y0) / len;
          for (var k = 0; k < 2; k++) {
            var s = (T / 3.6 + k * 0.5 + i * 0.13) % 1, fade = Math.pow(Math.sin(PI * s), 0.7);
            var pos = d[1] > 0 ? s : 1 - s, qx = x0 + (x1 - x0) * pos, qy = y0 + (y1 - y0) * pos;
            var tx = d[1] > 0 ? ux : -ux, ty = d[1] > 0 ? uy : -uy;
            ctx.save(); ctx.globalAlpha = fade;
            var tr = ctx.createLinearGradient(qx - tx * 26, qy - ty * 26, qx, qy);
            tr.addColorStop(0, D.rgba(col, 0)); tr.addColorStop(1, D.rgba(dark ? '#fff4cf' : col, 0.8));
            ctx.strokeStyle = tr; ctx.lineWidth = 3; ctx.lineCap = 'round';
            ctx.beginPath(); ctx.moveTo(qx - tx * 26, qy - ty * 26); ctx.lineTo(qx, qy); ctx.stroke();
            A.glow(ctx, qx, qy, 11, col, 0.9);
            ctx.fillStyle = dark ? '#fffbea' : A.lighten(col, 0.7); ctx.beginPath(); ctx.arc(qx, qy, 2.1, 0, TAU); ctx.fill();
            ctx.restore();
          }
        }
      }
    }

    if (o.panel !== false) {
      /* strălucire fină în colțul stânga-sus */
      var hg = ctx.createRadialGradient(R.x + R.w * 0.2, R.y, 0, R.x + R.w * 0.2, R.y, R.w * 0.8);
      hg.addColorStop(0, 'rgba(255,255,255,' + (dark ? 0.045 : 0.5) + ')'); hg.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = hg; ctx.fillRect(R.x, R.y, R.w, R.h);
    }
    if (o.cone !== false) drawCone(ox, oy, {});

    /* ---- grilă ---- */
    if (o.grid !== false) {
      var gk = floor(xmin / step) - 1, gk1 = ceil(xmax / step) + 1, gt0 = floor(tmin / step) - 1, gt1 = ceil(tmax / step) + 1;
      var gridCol = dark ? 'rgba(150,180,255,.10)' : 'rgba(25,40,100,.10)';
      if (o.grid === 'dots') {
        ctx.fillStyle = dark ? 'rgba(170,195,255,.34)' : 'rgba(25,40,100,.3)';
        for (var a = gk; a <= gk1; a++) for (var b = gt0; b <= gt1; b++) {
          ctx.beginPath(); ctx.arc(px(a * step), py(b * step), 1.3, 0, TAU); ctx.fill();
        }
      } else {
        ctx.strokeStyle = gridCol; ctx.lineWidth = 1; ctx.beginPath();
        for (var a2 = gk; a2 <= gk1; a2++) { var gx = Math.round(px(a2 * step)) + 0.5; ctx.moveTo(gx, R.y); ctx.lineTo(gx, R.y + R.h); }
        for (var b2 = gt0; b2 <= gt1; b2++) { var gy = Math.round(py(b2 * step)) + 0.5; ctx.moveTo(R.x, gy); ctx.lineTo(R.x + R.w, gy); }
        ctx.stroke();
      }
    }

    /* ---- razele de lumină ---- */
    if (o.light !== false && o.cone !== false || o.light === true) drawRays(ox, oy, {});
    ctx.restore(); // panelClip

    /* ---- axele lui S ---- */
    ctx.save();
    var tipX = Q.x + Q.w + 5, tipY = Q.y - 5;
    glowStroke(ctx, P, function () { ctx.beginPath(); ctx.moveTo(Q.x, axY); ctx.lineTo(tipX - 6, axY); }, axc, 2.2, { glow: 0.5 });
    arrowHead(ctx, tipX, axY, 0, 11, 9, axc);
    glowStroke(ctx, P, function () { ctx.beginPath(); ctx.moveTo(axX, Q.y + Q.h); ctx.lineTo(axX, tipY + 6); }, axc, 2.2, { glow: 0.5 });
    arrowHead(ctx, axX, tipY, -PI / 2, 11, 9, axc);
    /* gradații */
    var kx0 = ceil(xmin / step - 1e-9), kx1 = floor(xmax / step + 1e-9), kt0 = ceil(tmin / step - 1e-9), kt1 = floor(tmax / step + 1e-9), k;
    ctx.strokeStyle = D.rgba(axc, 0.8); ctx.lineWidth = 1.6; ctx.lineCap = 'round'; ctx.beginPath();
    for (k = kx0; k <= kx1; k++) { if (!k) continue; ctx.moveTo(px(k * step), axY - 3.5); ctx.lineTo(px(k * step), axY + 3.5); }
    for (k = kt0; k <= kt1; k++) { if (!k) continue; ctx.moveTo(axX - 3.5, py(k * step)); ctx.lineTo(axX + 3.5, py(k * step)); }
    ctx.stroke();
    if (numerals) {
      var strideX = max(1, ceil(30 / (step * sx))), strideT = max(1, ceil(19 / (step * sy)));
      for (k = kx0; k <= kx1; k++) {
        if (!k || k % strideX) continue;
        haloText(ctx, P, fmtNum(k * step), px(k * step), axY + 14, P.tx3);
      }
      for (k = kt0; k <= kt1; k++) {
        if (!k || k % strideT) continue;
        haloText(ctx, P, fmtNum(k * step), axX - 8, py(k * step), P.tx3, { align: 'right' });
      }
      if (o.origin !== false && ox >= Q.x - 1 && ox <= Q.x + Q.w + 1 && oy >= Q.y - 1 && oy <= Q.y + Q.h + 1)
        haloText(ctx, P, typeof o.origin === 'string' ? o.origin : 'O', ox - 8, oy + 13, P.tx2, { font: vfont(12.5, 600), noMono: true });
    }
    ctx.restore();

    /* ---- etichete: titlu, numele axelor, „lumină”, viitor/trecut/în altă parte ---- */
    if (o.title) {
      var tb = tagPx(o.title, R.x + 12, R.y + 12 + (csz + 11) / 2, { dot: axc, size: csz }, ['e'], 0);
      void tb;
    }
    if (labels) {
      tagPx(o.xlabel || 'x', tipX, axY, { math: true, color: axc, size: csz }, ['nw', 'n', 'w'], 4);
      tagPx(o.tlabel || 'ct', axX, tipY, { math: true, color: axc, size: csz }, ['e', 'ne', 'se'], 7);
      var ll = o.lightLabel === undefined ? 'lumină' : o.lightLabel;
      if (ll && o.light !== false && o.cone !== false && !compact) {
        var rr0 = lineRect(ox, oy, sx, -sy, Q.x, Q.y, Q.x + Q.w, Q.y + Q.h);
        if (rr0 && rr0[1] > 40 / sx) {
          var uu = rr0[1] * 0.72;
          tagPx(ll, ox + sx * uu, oy - sy * uu, { color: P.light, size: csz - 0.5, border: D.rgba(P.light, 0.7) }, ['c'], 0);
        }
      }
      if (o.cone !== false && o.coneLabels !== false) {
        var cl = typeof o.coneLabels === 'object' && o.coneLabels ? o.coneLabels : {};
        panelClip();
        ctx.font = D.font(11.5, 650); ctx.textBaseline = 'middle'; ctx.textAlign = 'center';
        var tf = cl.future === undefined ? 'viitor' : cl.future, tp = cl.past === undefined ? 'trecut' : cl.past, te = cl.elsewhere === undefined ? 'în altă parte' : cl.elsewhere;
        var cf = D.rgba(P.light, dark ? 0.8 : 0.9), ce = D.rgba(P.tx3, 0.95);
        var lxOff = function (wd) { return clamp(ox - 50 - wd / 2, Q.x + wd / 2 + 6, Q.x + Q.w - wd / 2 - 6); };
        if (tf) { var wf = ctx.measureText(tf).width, yf = Q.y + 24, lxf = lxOff(wf); if (ox > Q.x && ox < Q.x + Q.w && oy - yf > 0 && (oy - yf) / sy * sx > abs(lxf - ox) + wf / 2 + 10) { ctx.fillStyle = cf; ctx.fillText(tf, lxf, yf); } }
        if (tp) { var wp = ctx.measureText(tp).width, yp = Q.y + Q.h - 20, lxp = lxOff(wp); if (ox > Q.x && ox < Q.x + Q.w && yp - oy > 0 && (yp - oy) / sy * sx > abs(lxp - ox) + wp / 2 + 10) { ctx.fillStyle = cf; ctx.fillText(tp, lxp, yp); } }
        if (te) {
          var we = ctx.measureText(te).width;
          [[Q.x + Q.w - 22 - we / 2 - 36, 1], [Q.x + 22 + we / 2 + 6, -1]].forEach(function (c2) {
            var ee = abs(c2[0] - ox), ey = axY - 18;
            if (c2[0] > Q.x && c2[0] < Q.x + Q.w && ee > abs(ey - oy) + we / 2 + 8 && ey > Q.y + 8) { ctx.fillStyle = ce; ctx.fillText(te, c2[0], ey); }
          });
        }
        ctx.restore();
      }
    }

    /* ======================= metode ======================= */

    /* ---- eveniment ---- */
    st.event = function (x, t, eo) {
      eo = eo || {};
      var X = px(x), Y = py(t), col = eo.color || P.acc2, r = eo.r || (compact ? 5.6 : 6.6);
      if (X < R.x - 2 || X > R.x + R.w + 2 || Y < R.y - 2 || Y > R.y + R.h + 2) return null;
      /* proiecții punctate */
      if (eo.drop) {
        panelClip();
        var f = eo.drop && eo.drop.fromS ? eo.drop : null;
        ctx.setLineDash([4, 4]); ctx.lineWidth = 1.3; ctx.lineCap = 'round';
        var dc = eo.dropColor || (f ? f.color : axc);
        ctx.strokeStyle = D.rgba(dc, 0.8); ctx.fillStyle = dc;
        var fx, fy;
        if (f) {
          var q = f.fromS(x, t), a1 = f.pt(q.x, 0), a2 = f.pt(0, q.t);
          fx = a1; fy = a2;
        } else { fx = { x: X, y: axY }; fy = { x: axX, y: Y }; }
        ctx.beginPath(); ctx.moveTo(X, Y); ctx.lineTo(fx.x, fx.y); ctx.moveTo(X, Y); ctx.lineTo(fy.x, fy.y); ctx.stroke();
        ctx.setLineDash([]);
        ctx.beginPath(); ctx.arc(fx.x, fx.y, 3, 0, TAU); ctx.arc(fy.x, fy.y, 3, 0, TAU); ctx.fill();
        ctx.restore();
      }
      var mk = A.eventMark(ctx, X, Y, { color: col, r: r, shape: eo.shape, glow: eo.glow, ring: eo.ring, pulse: eo.pulse, t: animate ? T : undefined });
      var box = null;
      if (eo.label) {
        var co = { size: csz, math: eo.math, color: eo.labelColor, dot: eo.dot, border: D.rgba(col, 0.7) };
        st._boxes.push({ x: X - mk.R, y: Y - mk.R, w: mk.R * 2, h: mk.R * 2 });
        box = tagPx(eo.label, X, Y, co, eo.pos ? [eo.pos].concat(SIDES_ALL) : SIDES_ALL, mk.R * 0.85 + 4);
      } else st._boxes.push({ x: X - mk.R, y: Y - mk.R, w: mk.R * 2, h: mk.R * 2 });
      return { x: X, y: Y, r: r, label: box, ex: x, et: t };
    };

    /* ---- linie de univers ---- */
    st.worldline = function (pts, wo) {
      wo = wo || {};
      if (!pts || pts.length < 2) return null;
      var col = wo.color || P.s2, w = wo.w || (compact ? 3.4 : 4.2);
      var arr = pts.map(pt), n = arr.length, xy = arr.map(function (p) { return { x: px(p.x), y: py(p.t) }; });
      var cum = [wo.tau0 || 0], i;
      for (i = 1; i < n; i++) {
        var ddx = arr[i].x - arr[i - 1].x, ddt = arr[i].t - arr[i - 1].t, d2 = ddt * ddt - ddx * ddx;
        cum.push(cum[i - 1] + (d2 > 0 ? sqrt(d2) : 0));
      }
      var total = cum[n - 1] - cum[0];
      var arrow = wo.arrow !== false, hl = arrow ? 7 + w * 1.7 : 0;
      var ex = xy[n - 1].x, ey = xy[n - 1].y, lastAng = Math.atan2(xy[n - 1].y - xy[n - 2].y, xy[n - 1].x - xy[n - 2].x);
      var segLen = Math.sqrt(Math.pow(xy[n - 1].x - xy[n - 2].x, 2) + Math.pow(xy[n - 1].y - xy[n - 2].y, 2));
      var cut = arrow ? min(hl * 0.7, segLen * 0.8) : 0;
      function path() {
        ctx.beginPath(); ctx.moveTo(xy[0].x, xy[0].y);
        for (var j = 1; j < n - 1; j++) ctx.lineTo(xy[j].x, xy[j].y);
        ctx.lineTo(ex - Math.cos(lastAng) * cut, ey - Math.sin(lastAng) * cut);
      }
      panelClip();
      ctx.globalAlpha = wo.alpha == null ? 1 : wo.alpha;
      glowStroke(ctx, P, path, col, w, { glow: wo.glow == null ? 1 : wo.glow, dash: wo.dash });
      ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      if (wo.dash) ctx.setLineDash(wo.dash);
      ctx.lineWidth = w * 0.34; ctx.strokeStyle = D.rgba(A.lighten(col, 0.6), 0.6); path(); ctx.stroke();
      ctx.restore();
      /* gradații de timp propriu */
      var tk = wo.ticks, every = typeof tk === 'number' ? tk : tk && tk.every, tickLabels = tk && typeof tk === 'object' ? tk.labels : false;
      if (every > 0 && total > 0) {
        var tf = dark ? A.lighten(col, 0.72) : A.darken(col, 0.18), te = dark ? 'rgba(8,13,32,.55)' : 'rgba(255,255,255,.9)';
        var cnt = 0, tl = w + 9, k;
        for (i = 1; i < n && cnt < 400; i++) {
          var dtau = cum[i] - cum[i - 1];
          if (dtau <= 1e-9) continue;
          var k0 = i === 1 ? ceil((cum[0] - 1e-9) / every - 1e-9) : floor((cum[i - 1] + 1e-9) / every) + 1, k1 = floor((cum[i] + 1e-9) / every);
          var sdx = xy[i].x - xy[i - 1].x, sdy = xy[i].y - xy[i - 1].y, sl = Math.sqrt(sdx * sdx + sdy * sdy) || 1, nx = -sdy / sl, ny = sdx / sl;
          for (k = k0; k <= k1; k++) {
            var s = (k * every - cum[i - 1]) / dtau, tx = xy[i - 1].x + sdx * s, ty = xy[i - 1].y + sdy * s;
            if (arrow && i === n - 1 && s > 0.995 && k * every >= cum[n - 1] - 1e-6) { /* vârful săgeții: tic mai mic */ }
            A.capsule(ctx, tx - nx * tl / 2, ty - ny * tl / 2, tx + nx * tl / 2, ty + ny * tl / 2, 3.4);
            ctx.fillStyle = te; ctx.fill();
            A.capsule(ctx, tx - nx * (tl / 2 - 1), ty - ny * (tl / 2 - 1), tx + nx * (tl / 2 - 1), ty + ny * (tl / 2 - 1), 1.9);
            ctx.fillStyle = tf; ctx.fill();
            if (tickLabels && (!(tk.labelEvery > 1) || k % tk.labelEvery === 0)) {
              var side = wo.labelSide === -1 ? -1 : 1;
              haloText(ctx, P, fmtNum(k * every), tx + nx * side * (tl / 2 + 8), ty + ny * side * (tl / 2 + 8), col, { size: 10.5, weight: 600 });
            }
            cnt++;
          }
        }
      }
      if (arrow) arrowHead(ctx, ex, ey, lastAng, hl, hl * 0.86, col);
      ctx.restore();
      /* etichetă */
      var lab = null;
      if (wo.label) {
        var tot = 0, segs = [];
        for (i = 1; i < n; i++) { var l2 = Math.sqrt(Math.pow(xy[i].x - xy[i - 1].x, 2) + Math.pow(xy[i].y - xy[i - 1].y, 2)); segs.push(l2); tot += l2; }
        var target = tot * (wo.labelAt == null ? 0.5 : wo.labelAt), acc = 0, si = 0;
        while (si < segs.length - 1 && acc + segs[si] < target) { acc += segs[si]; si++; }
        var ss = segs[si] > 0 ? clamp((target - acc) / segs[si], 0, 1) : 0, lx = xy[si].x + (xy[si + 1].x - xy[si].x) * ss, ly = xy[si].y + (xy[si + 1].y - xy[si].y) * ss;
        var sd = wo.labelSide === -1 ? -1 : 1, ang2 = Math.atan2(xy[si + 1].y - xy[si].y, xy[si + 1].x - xy[si].x);
        var sides = sd > 0 ? ['e', 'ne', 'se', 'w', 'nw', 'sw'] : ['w', 'nw', 'sw', 'e', 'ne', 'se'];
        if (abs(Math.sin(ang2)) < 0.4) sides = sd > 0 ? ['s', 'se', 'sw', 'n', 'ne', 'nw'] : ['n', 'ne', 'nw', 's', 'se', 'sw'];
        lab = tagPx(wo.label, lx, ly, { size: csz, color: wo.labelColor, dot: wo.dotLabel === false ? undefined : col, math: wo.math }, sides, w / 2 + 6);
      }
      return {
        tau: total, label: lab, start: xy[0], end: xy[n - 1], pts: xy,
        at: function (tau) {
          tau = clamp(tau + cum[0], cum[0], cum[n - 1]);
          for (var j = 1; j < n; j++) if (tau <= cum[j] + 1e-9) {
            var dd = cum[j] - cum[j - 1], u = dd > 0 ? (tau - cum[j - 1]) / dd : 0;
            var X = arr[j - 1].x + (arr[j].x - arr[j - 1].x) * u, TT = arr[j - 1].t + (arr[j].t - arr[j - 1].t) * u;
            return { x: X, t: TT, px: px(X), py: py(TT) };
          }
          return { x: arr[n - 1].x, t: arr[n - 1].t, px: xy[n - 1].x, py: xy[n - 1].y };
        }
      };
    };

    /* ---- hiperbolă invariantă: t² − x² = s2 (timelike) sau x² − t² = s2 ---- */
    st.hyperbola = function (s2, ho) {
      ho = ho || {};
      var s = sqrt(abs(s2));
      if (!(s > 1e-6)) return null;
      var timelike = ho.timelike !== false, col = ho.color || P.good, a = ho.alpha == null ? 0.78 : ho.alpha, w = ho.w || 2.2;
      var far = max(abs(ix(R.x)), abs(ix(R.x + R.w)), abs(it(R.y)), abs(it(R.y + R.h))) * 1.15 + 1;
      var U = Math.log(far / s + Math.sqrt(max(0, (far / s) * (far / s) - 1))) + 0.05;
      if (!(U > 0.01)) return null;
      var N = 150, sheets = ho.sheet === 1 || ho.sheet === -1 ? [ho.sheet] : [1, -1];
      panelClip();
      sheets.forEach(function (sh) {
        function path() {
          ctx.beginPath();
          for (var j = 0; j <= N; j++) {
            var u = -U + 2 * U * j / N, c = Math.cosh(u), sn = Math.sinh(u);
            var X = timelike ? s * sn : sh * s * c, TT = timelike ? sh * s * c : s * sn;
            if (j) ctx.lineTo(px(X), py(TT)); else ctx.moveTo(px(X), py(TT));
          }
        }
        glowStroke(ctx, P, path, col, w, { glow: 0.55, alpha: a, dash: ho.dash });
      });
      ctx.restore();
      var lab = null;
      if (ho.label) {
        var sh0 = sheets[0], uu = ho.labelU == null ? 1.05 : ho.labelU;
        var lx = timelike ? s * Math.sinh(uu) : sh0 * s * Math.cosh(uu), lt = timelike ? sh0 * s * Math.cosh(uu) : s * Math.sinh(uu);
        lab = tagPx(ho.label, px(lx), py(lt), { size: csz - 0.5, color: ho.labelColor || col, border: D.rgba(col, 0.7), math: ho.math }, timelike ? ['se', 'sw', 'e'] : ['ne', 'nw', 'n'], 6);
      }
      return { label: lab };
    };

    /* ---- linie de simultaneitate: t = t0 + β·(x − x0) ---- */
    st.simLine = function (t0, so) {
      so = so || {};
      var beta = so.frame ? so.frame.beta : num(so.beta, 0), x0 = num(so.x0, 0);
      var col = so.color || (abs(beta) < 1e-9 ? P.s1 : P.s2), w = so.w || 2.2;
      var X0 = px(x0), Y0 = py(t0), dx = sx, dy = -sy * beta;
      var rr = lineRect(X0, Y0, dx, dy, R.x, R.y, R.x + R.w, R.y + R.h);
      if (!rr) return null;
      var u0 = rr[0], u1 = rr[1];
      if (so.from != null) u0 = max(u0, (px(so.from) - X0) / dx);
      if (so.to != null) u1 = min(u1, (px(so.to) - X0) / dx);
      if (u1 <= u0) return null;
      var ax0 = X0 + dx * u0, ay0 = Y0 + dy * u0, ax1 = X0 + dx * u1, ay1 = Y0 + dy * u1;
      panelClip();
      glowStroke(ctx, P, function () { ctx.beginPath(); ctx.moveTo(ax0, ay0); ctx.lineTo(ax1, ay1); }, col, w, { glow: 0.5, dash: so.dash === false ? null : (so.dash || [8, 6]), alpha: so.alpha == null ? 0.95 : so.alpha });
      ctx.restore();
      var lab = null;
      if (so.label) {
        var lu = u0 + (u1 - u0) * (so.labelAt == null ? 0.86 : so.labelAt), lx = X0 + dx * lu, ly = Y0 + dy * lu;
        lab = tagPx(so.label, lx, ly, { size: csz - 0.5, color: so.labelColor || P.tx, dot: col, math: so.math }, ['n', 'nw', 's', 'sw', 'ne', 'se'], 6);
      }
      return { x0: ax0, y0: ay0, x1: ax1, y1: ay1, label: lab };
    };

    /* ---- rază de lumină din (x0,t0), dir = +1 (dreapta) sau −1; back = vine din trecut ---- */
    st.lightRay = function (x0, t0, dir, lo) {
      lo = lo || {};
      dir = dir < 0 ? -1 : 1;
      var col = lo.color || P.light, back = !!lo.back, w = lo.w || 2.4;
      var sgn = back ? -1 : 1;                        // sensul de desenare față de (x0,t0)
      var X0 = px(x0), Y0 = py(t0), dxp = dir * sx * sgn, dyp = -sy * sgn;
      var rr = lineRect(X0, Y0, dxp, dyp, R.x, R.y, R.x + R.w, R.y + R.h);
      if (!rr) return null;
      var u0 = max(0, rr[0]), u1 = rr[1];
      if (lo.len != null) u1 = min(u1, lo.len);
      if (u1 <= u0 + 0.01) return null;
      var x1 = X0 + dxp * u1, y1 = Y0 + dyp * u1, xs = X0 + dxp * u0, ys = Y0 + dyp * u0;
      var arrow = lo.arrow !== false && !(rr[1] < (lo.len == null ? Infinity : lo.len) && false);
      var core = dark ? 'rgba(255,249,228,.95)' : D.rgba(A.lighten(col, 0.6), 0.85);
      // sensul săgeții: spre timp crescător
      var tipx = back ? xs : x1, tipy = back ? ys : y1, tailx = back ? x1 : xs, taily = back ? y1 : ys;
      var ang = Math.atan2(tipy - taily, tipx - tailx), hl = 11;
      panelClip();
      glowStroke(ctx, P, function () { ctx.beginPath(); ctx.moveTo(tailx, taily); ctx.lineTo(tipx - Math.cos(ang) * (arrow ? hl * 0.6 : 0), tipy - Math.sin(ang) * (arrow ? hl * 0.6 : 0)); }, col, w, { core: core, dash: lo.dash });
      if (arrow) arrowHead(ctx, tipx, tipy, ang, hl, hl * 0.82, col);
      if (animate && lo.pulse) {
        var len2 = Math.sqrt((tipx - tailx) * (tipx - tailx) + (tipy - taily) * (tipy - taily)), ux = (tipx - tailx) / len2, uy = (tipy - taily) / len2;
        var s2 = (T / 2.8) % 1, qx = tailx + (tipx - tailx) * s2, qy = taily + (tipy - taily) * s2;
        ctx.globalAlpha = Math.pow(Math.sin(PI * s2), 0.7);
        A.glow(ctx, qx, qy, 12, col, 0.95);
        ctx.fillStyle = '#fffbea'; ctx.beginPath(); ctx.arc(qx, qy, 2.2, 0, TAU); ctx.fill();
        void ux; void uy;
      }
      ctx.restore();
      var lab = null;
      if (lo.label) {
        var lu = lo.labelAt == null ? 0.55 : lo.labelAt;
        lab = tagPx(lo.label, tailx + (tipx - tailx) * lu, taily + (tipy - taily) * lu, { size: csz - 0.5, color: P.light, border: D.rgba(P.light, 0.7) }, dir > 0 ? ['se', 'nw', 'e', 'w'] : ['sw', 'ne', 'w', 'e'], 6);
      }
      return { x: x0 + dir * sgn * u1 / sx, t: t0 + sgn * u1 / sy, end: { x: tipx, y: tipy }, label: lab };
    };

    /* ---- con de lumină în orice eveniment ---- */
    st.cone = function (x, t, co) {
      co = co || {};
      var X = px(x), Y = py(t);
      panelClip();
      drawCone(X, Y, { color: co.color, alpha: co.alpha == null ? 1 : co.alpha, future: co.future, past: co.past, elsewhere: co.elsewhere === true });
      if (co.rays !== false) {
        var dirs = [[1, 1, co.future], [-1, 1, co.future], [1, -1, co.past], [-1, -1, co.past]];
        void dirs;
        drawRays(X, Y, { color: co.color, w: co.w || 2, pulse: false });
      }
      ctx.restore();
    };

    /* ---- segment generic (în coordonate x,t) ---- */
    st.segment = function (x0, t0, x1, t1, so) {
      so = so || {};
      var col = so.color || P.tx2, w = so.w || 2.2;
      var X0 = px(x0), Y0 = py(t0), X1 = px(x1), Y1 = py(t1), ang = Math.atan2(Y1 - Y0, X1 - X0);
      var cutE = so.arrow ? 7 : 0;
      panelClip();
      glowStroke(ctx, P, function () { ctx.beginPath(); ctx.moveTo(X0, Y0); ctx.lineTo(X1 - Math.cos(ang) * cutE, Y1 - Math.sin(ang) * cutE); }, col, w, { glow: so.glow == null ? 0.35 : so.glow, dash: so.dash, alpha: so.alpha });
      if (so.arrow) arrowHead(ctx, X1, Y1, ang, 10, 8.5, col);
      ctx.restore();
      var lab = null;
      if (so.label) {
        var lu = so.labelAt == null ? 0.5 : so.labelAt;
        lab = tagPx(so.label, X0 + (X1 - X0) * lu, Y0 + (Y1 - Y0) * lu, { size: csz - 0.5, color: so.labelColor || P.tx, dot: so.dot === false ? undefined : col, math: so.math }, so.sides || SIDES_ALL, 6);
      }
      return { label: lab };
    };

    /* ---- cotă (linie de măsură cu capete) între două puncte, translată cu `off` px ---- */
    st.measure = function (x0, t0, x1, t1, mo) {
      mo = mo || {};
      var col = mo.color || P.tx2, off = mo.offset == null ? 14 : mo.offset;
      var X0 = px(x0), Y0 = py(t0), X1 = px(x1), Y1 = py(t1), L = Math.sqrt((X1 - X0) * (X1 - X0) + (Y1 - Y0) * (Y1 - Y0));
      if (L < 6) return null;
      var nx = -(Y1 - Y0) / L, ny = (X1 - X0) / L;
      var ax0 = X0 + nx * off, ay0 = Y0 + ny * off, ax1 = X1 + nx * off, ay1 = Y1 + ny * off;
      panelClip();
      ctx.strokeStyle = D.rgba(col, 0.9); ctx.fillStyle = col; ctx.lineWidth = 1.6; ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(X0, Y0); ctx.lineTo(ax0 + nx * 4 * (off < 0 ? -1 : 1), ay0 + ny * 4 * (off < 0 ? -1 : 1));
      ctx.moveTo(X1, Y1); ctx.lineTo(ax1 + nx * 4 * (off < 0 ? -1 : 1), ay1 + ny * 4 * (off < 0 ? -1 : 1));
      ctx.stroke();
      var ang = Math.atan2(ay1 - ay0, ax1 - ax0);
      ctx.beginPath(); ctx.moveTo(ax0 + Math.cos(ang) * 6, ay0 + Math.sin(ang) * 6); ctx.lineTo(ax1 - Math.cos(ang) * 6, ay1 - Math.sin(ang) * 6); ctx.stroke();
      arrowHead(ctx, ax0, ay0, ang + PI, 8, 7, col); arrowHead(ctx, ax1, ay1, ang, 8, 7, col);
      ctx.restore();
      var lab = null;
      if (mo.label) lab = tagPx(mo.label, (ax0 + ax1) / 2, (ay0 + ay1) / 2, { size: csz - 0.5, color: mo.labelColor || P.tx, math: mo.math, border: D.rgba(col, 0.7) }, ['c'], 0);
      return { label: lab };
    };

    /* ---- text / etichetă în coordonate de diagramă ---- */
    st.text = function (x, t, str, to) {
      to = to || {};
      var X = px(x), Y = py(t);
      if (to.chip === false) {
        haloText(ctx, P, str, X, Y, to.color || P.tx2, { size: to.size || csz, weight: to.weight || 600, align: to.align || 'center', noMono: !to.mono, font: to.math ? vfont((to.size || csz) + 1.5, 600) : null });
        return null;
      }
      return tagPx(str, X, Y, { size: to.size || csz, color: to.color, dot: to.dot, math: to.math, mono: to.mono, border: to.border }, to.pos ? [to.pos].concat(to.avoid ? SIDES_ALL : []) : ['c'], to.gap == null ? 0 : to.gap);
    };

    /* ---- legendă: [{label,color}] ---- */
    st.legend = function (items, lo) {
      lo = lo || {};
      var pos = lo.pos || 'tl', yy = R.y + 12;
      var ms = items.map(function (it0) { return chipMeasure(ctx, it0.label, { dot: it0.color, size: csz, math: it0.math }); });
      var hh = ms[0] ? ms[0].h : 23;
      if (pos.charAt(0) === 'b') yy = R.y + R.h - 12 - items.length * (hh + 4) + 4;
      items.forEach(function (it0, i) {
        var m = ms[i], bx = pos.charAt(1) === 'r' ? R.x + R.w - 12 - m.w : R.x + 12;
        chipDraw(ctx, it0.label, bx, yy + i * (hh + 4), m, { dot: it0.color, size: csz, math: it0.math });
        st._boxes.push({ x: bx, y: yy + i * (hh + 4), w: m.w, h: m.h });
      });
    };

    /* ---- reperul S′: axele înclinate, grilă, gradații ---- */
    st.frame = function (beta, fo) {
      fo = fo || {};
      var b = clamp(num(beta, 0), -0.9995, 0.9995), gal = !!fo.galilei;
      var g = gal ? 1 : 1 / sqrt(1 - b * b);
      var ex = gal ? [1, 0] : [g, g * b], et = gal ? [b, 1] : [g * b, g];            // e_x′ și e_t′ în coordonate (x,t) din S
      var org = fo.origin ? pt(fo.origin) : { x: 0, t: 0 };
      var col = fo.color || P.s2, name = fo.label == null ? 'S′' : fo.label, alpha = fo.alpha == null ? 1 : fo.alpha;
      var stp = fo.step > 0 ? fo.step : step;
      var sfx = name.charAt(0) === 'S' ? name.slice(1) : '′';
      var axl = fo.axisLabels || ['x' + sfx, 'ct' + sfx];
      var f = { beta: b, gamma: g, color: col, name: name, origin: org, galilei: gal, ex: ex, et: et };
      f.toS = function (xp, tp) { return { x: org.x + xp * ex[0] + tp * et[0], t: org.t + xp * ex[1] + tp * et[1] }; };
      f.fromS = function (x, t) {
        var dx = x - org.x, dt = t - org.t, det = ex[0] * et[1] - et[0] * ex[1];
        return { x: (dx * et[1] - et[0] * dt) / det, t: (ex[0] * dt - ex[1] * dx) / det };
      };
      f.pt = function (xp, tp) { var s = f.toS(xp, tp); return { x: px(s.x), y: py(s.t) }; };
      var vx = [ex[0] * sx, -ex[1] * sy], vt = [et[0] * sx, -et[1] * sy];            // vectorii unitate pe ecran
      var lvx = Math.sqrt(vx[0] * vx[0] + vx[1] * vx[1]), lvt = Math.sqrt(vt[0] * vt[0] + vt[1] * vt[1]);
      var O = f.pt(0, 0);
      panelClip();
      ctx.globalAlpha = alpha;
      /* grilă paralelă */
      if (fo.grid !== false) {
        var cs = [[R.x, R.y], [R.x + R.w, R.y], [R.x, R.y + R.h], [R.x + R.w, R.y + R.h]].map(function (c) { return f.fromS(ix(c[0]), it(c[1])); });
        var xa = min(cs[0].x, cs[1].x, cs[2].x, cs[3].x), xb = max(cs[0].x, cs[1].x, cs[2].x, cs[3].x);
        var ta = min(cs[0].t, cs[1].t, cs[2].t, cs[3].t), tb2 = max(cs[0].t, cs[1].t, cs[2].t, cs[3].t);
        var ka = floor(xa / stp), kb = ceil(xb / stp), la = floor(ta / stp), lb = ceil(tb2 / stp);
        ctx.strokeStyle = D.rgba(col, dark ? 0.15 : 0.17); ctx.lineWidth = 1; ctx.beginPath();
        if (kb - ka < 160) for (k = ka; k <= kb; k++) {
          var p0 = f.pt(k * stp, 0), rr = lineRect(p0.x, p0.y, vt[0], vt[1], R.x, R.y, R.x + R.w, R.y + R.h);
          if (rr) { ctx.moveTo(p0.x + vt[0] * rr[0], p0.y + vt[1] * rr[0]); ctx.lineTo(p0.x + vt[0] * rr[1], p0.y + vt[1] * rr[1]); }
        }
        if (lb - la < 160) for (k = la; k <= lb; k++) {
          var p1 = f.pt(0, k * stp), r2 = lineRect(p1.x, p1.y, vx[0], vx[1], R.x, R.y, R.x + R.w, R.y + R.h);
          if (r2) { ctx.moveTo(p1.x + vx[0] * r2[0], p1.y + vx[1] * r2[0]); ctx.lineTo(p1.x + vx[0] * r2[1], p1.y + vx[1] * r2[1]); }
        }
        ctx.stroke();
      }
      ctx.restore();

      ctx.save(); ctx.globalAlpha = alpha;
      var tips = {};
      function axis(v, lv, key) {
        var rr = lineRect(O.x, O.y, v[0], v[1], Q.x, Q.y, Q.x + Q.w, Q.y + Q.h);
        if (!rr || rr[0] > 0 || rr[1] < 0) return null;
        var ang = Math.atan2(v[1], v[0]), ex2 = O.x + v[0] * rr[1] + Math.cos(ang) * 5, ey2 = O.y + v[1] * rr[1] + Math.sin(ang) * 5;
        // partea negativă (mai estompată)
        glowStroke(ctx, P, function () { ctx.beginPath(); ctx.moveTo(O.x + v[0] * rr[0], O.y + v[1] * rr[0]); ctx.lineTo(O.x, O.y); }, col, 2, { glow: 0.2, alpha: 0.5 });
        glowStroke(ctx, P, function () { ctx.beginPath(); ctx.moveTo(O.x, O.y); ctx.lineTo(ex2 - Math.cos(ang) * 6, ey2 - Math.sin(ang) * 6); }, col, 2.2, { glow: 0.5 });
        arrowHead(ctx, ex2, ey2, ang, 11, 9, col);
        tips[key] = { x: ex2, y: ey2, ang: ang };
        return rr;
      }
      var rrx = axis(vx, lvx, 'x'), rrt = axis(vt, lvt, 't');
      /* gradații pe axe, paralele cu cealaltă axă + cifre */
      if (fo.ticks !== false) {
        var nlx = [vt[0] / lvt, vt[1] / lvt], nlt = [vx[0] / lvx, vx[1] / lvx];
        ctx.strokeStyle = D.rgba(col, 0.95); ctx.lineWidth = 1.7; ctx.lineCap = 'round'; ctx.beginPath();
        function ticksOn(rr, v, lv, dirT, which) {
          if (!rr) return;
          var k0 = ceil(rr[0] / stp - 1e-9), k1 = floor(rr[1] / stp + 1e-9);
          for (var q = k0; q <= k1; q++) {
            if (!q) continue;
            var cx = O.x + v[0] * q * stp, cy = O.y + v[1] * q * stp;
            ctx.moveTo(cx - dirT[0] * 4.2, cy - dirT[1] * 4.2); ctx.lineTo(cx + dirT[0] * 4.2, cy + dirT[1] * 4.2);
          }
          void which;
        }
        ticksOn(rrx, vx, lvx, nlx, 'x'); ticksOn(rrt, vt, lvt, nlt, 't');
        ctx.stroke();
        if (fo.numerals !== false && labels) {
          var sgn = b < 0 ? -1 : 1;
          var strideA = max(1, ceil(26 / (stp * lvx))), strideB = max(1, ceil(19 / (stp * lvt)));
          if (rrx) {
            var kk0 = ceil(rrx[0] / stp - 1e-9), kk1 = floor(rrx[1] / stp + 1e-9);
            var nvx = [vx[1] / lvx, -vx[0] / lvx];            // normala „în sus”
            for (k = kk0; k <= kk1; k++) {
              if (!k || (k < 0 && fo.negNumerals !== true) || k % strideA) continue;
              haloText(ctx, P, fmtNum(k * stp), O.x + vx[0] * k * stp + nvx[0] * 12, O.y + vx[1] * k * stp + nvx[1] * 12, col, { weight: 600 });
            }
          }
          if (rrt) {
            var kq0 = ceil(rrt[0] / stp - 1e-9), kq1 = floor(rrt[1] / stp + 1e-9);
            var nvt = [-vt[1] / lvt, vt[0] / lvt];            // normala „spre dreapta”
            for (k = kq0; k <= kq1; k++) {
              if (!k || (k < 0 && fo.negNumerals !== true) || k % strideB) continue;
              haloText(ctx, P, fmtNum(k * stp), O.x + vt[0] * k * stp + nvt[0] * 10 * sgn, O.y + vt[1] * k * stp + nvt[1] * 10 * sgn, col, { weight: 600, align: sgn > 0 ? 'left' : 'right' });
            }
          }
        }
      }
      /* arce unghi α (tg α = β) */
      if (fo.angle && !gal) {
        var ra = 40, thx = Math.atan2(vx[1], vx[0]), tht = Math.atan2(vt[1], vt[0]);
        ctx.strokeStyle = D.rgba(col, 0.9); ctx.lineWidth = 1.6; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.arc(O.x, O.y, ra, thx < 0 ? thx : 0, thx < 0 ? 0 : thx, false); ctx.stroke();
        ctx.beginPath(); ctx.arc(O.x, O.y, ra, tht, -PI / 2, true); ctx.stroke();
        haloText(ctx, P, 'α', O.x + ra * 1.35 * Math.cos(thx / 2), O.y + ra * 1.35 * Math.sin(thx / 2), col, { font: vfont(13, 600), noMono: true });
        haloText(ctx, P, 'α', O.x + ra * 1.35 * Math.cos((tht - PI / 2) / 2), O.y + ra * 1.35 * Math.sin((tht - PI / 2) / 2), col, { font: vfont(13, 600), noMono: true });
      }
      ctx.restore();
      /* numele axelor */
      if (labels && fo.names !== false) {
        if (tips.x) tagPx(axl[0], tips.x.x, tips.x.y, { math: true, color: col, size: csz }, ['n', 'nw', 'w', 'ne'], 4);
        if (tips.t) tagPx(axl[1], tips.t.x, tips.t.y, { math: true, color: col, size: csz }, ['e', 'ne', 'se', 'w'], 7);
      }
      /* metode */
      f.event = function (xp, tp, eo) { var s = f.toS(xp, tp), e2 = {}; for (var key in eo) e2[key] = eo[key]; if (e2.drop === true) e2.drop = f; return st.event(s.x, s.t, e2); };
      f.simLine = function (tp, so) { var s = f.toS(0, tp); so = so || {}; so.beta = gal ? 0 : b; so.x0 = s.x; so.color = so.color || col; return st.simLine(s.t, so); };
      f.worldline = function (ptsP, wo) { return st.worldline(ptsP.map(function (p) { var q = pt(p); return [f.toS(q.x, q.t).x, f.toS(q.x, q.t).t]; }), wo); };
      f.xAxisPoint = function (xp) { return f.pt(xp, 0); };
      return f;
    };

    return st;
  };

  /* ======================= galerie ======================= */
  var K = 'art-spacetime.js';
  function rectIn(W, H, m) { m = m == null ? 8 : m; return { x: m, y: m, w: W - 2 * m, h: H - 2 * m }; }

  A.gallery.push({
    name: 'Spațiu-timp · S și S′ (β = 0,6)', src: K, w: 460, h: 360, draw: function (ctx, W, H, t) {
      var P = RF.sim.palette(); D.clear({ ctx: ctx, W: W, H: H });
      var st = A.spacetime(ctx, rectIn(W, H), { xmin: -4, xmax: 4, tmin: -2.5, tmax: 5.5, t: t });
      var f = st.frame(0.6, { label: 'S′', grid: true, ticks: true, angle: true });
      st.event(2.4, 3, { label: 'E', drop: f });
      st.legend([{ label: 'S — Ana', color: P.s1 }, { label: 'S′ — Bogdan, 0,6 c', color: P.s2 }], { pos: 'tl' });
    }
  });
  A.gallery.push({
    name: 'Spațiu-timp · gemenii (linii de univers + timp propriu)', src: K, w: 400, h: 420, draw: function (ctx, W, H, t) {
      var P = RF.sim.palette(); D.clear({ ctx: ctx, W: W, H: H });
      var st = A.spacetime(ctx, rectIn(W, H), { xmin: -1.2, xmax: 5.2, tmin: 0, tmax: 10.8, cone: false, light: true, labels: true, tlabel: 'ct', t: t, lightLabel: false });
      var ana = st.worldline([[0, 0], [0, 10]], { color: P.s1, ticks: 1, label: 'Ana: 10 ani', labelAt: 0.3, labelSide: -1 });
      var bog = st.worldline([[0, 0], [3, 5], [0, 10]], { color: P.s2, ticks: 1, label: 'Bogdan: 8 ani', labelAt: 0.25 });
      st.event(0, 0, { label: 'plecarea', pos: 'se' });
      st.event(3, 5, { label: 'întoarcerea', pos: 'e' });
      st.event(0, 10, { label: 'revederea', pos: 'ne' });
      void ana; void bog;
    }
  });
  A.gallery.push({
    name: 'Spațiu-timp · simultaneitate în S și S′', src: K, w: 460, h: 340, draw: function (ctx, W, H, t) {
      var P = RF.sim.palette(); D.clear({ ctx: ctx, W: W, H: H });
      var st = A.spacetime(ctx, rectIn(W, H), { xmin: -4, xmax: 4, tmin: -1, tmax: 5, t: t, coneLabels: false });
      var f = st.frame(0.6, { grid: false, ticks: false });
      st.simLine(2, { color: P.s1, label: 'simultane în S' });
      st.simLine(2, { frame: f, x0: -2, label: 'simultane în S′ cu A' });
      st.simLine(2, { frame: f, x0: 2, alpha: 0.7 });
      st.event(-2, 2, { label: 'A' });
      st.event(2, 2, { label: 'B' });
    }
  });
  A.gallery.push({
    name: 'Spațiu-timp · hiperbole invariante', src: K, w: 460, h: 360, draw: function (ctx, W, H, t) {
      var P = RF.sim.palette(); D.clear({ ctx: ctx, W: W, H: H });
      var st = A.spacetime(ctx, rectIn(W, H), { xmin: -4.5, xmax: 4.5, tmin: -3.5, tmax: 5.5, t: t, coneLabels: false, lightLabel: false });
      st.hyperbola(1, { label: 't² − x² = 1' });
      st.hyperbola(4, { label: '= 4' });
      st.hyperbola(1, { timelike: false, label: 'x² − t² = 1' });
      var f = st.frame(0.6, { grid: false });
      var g = f.gamma;
      st.event(0, 1, { color: P.s1, r: 4.5, shape: 'dot' });
      st.event(g * 0.6, g, { color: P.s2, r: 4.5, shape: 'dot' });
    }
  });
  A.gallery.push({
    name: 'Spațiu-timp · cauzalitate (conul de lumină)', src: K, w: 460, h: 340, draw: function (ctx, W, H, t) {
      var P = RF.sim.palette(); D.clear({ ctx: ctx, W: W, H: H });
      var st = A.spacetime(ctx, rectIn(W, H), { xmin: -4.5, xmax: 4.5, tmin: -2.5, tmax: 4.5, t: t });
      st.worldline([[0, -2], [0.6, 0], [1.4, 3.5]], { color: P.s2, label: 'o navă', labelAt: 0.82, ticks: 0 });
      st.lightRay(-3.5, -0.5, 1, { back: true });
      st.event(0, 0, { label: 'aici și acum', color: P.light, pos: 'sw', pulse: true });
      st.event(1.4, 3.5, { label: 'poate fi efect', color: P.good, pos: 'ne' });
      st.event(3.2, 0.6, { label: 'nu poate fi legat', color: P.bad, pos: 'ne' });
    }
  });
  A.gallery.push({
    name: 'Galilei vs. Lorentz (S′ la β = 0,5)', src: K, w: 520, h: 270, draw: function (ctx, W, H, t) {
      var P = RF.sim.palette(); D.clear({ ctx: ctx, W: W, H: H });
      var gap = 10, w2 = (W - 3 * gap) / 2, h2 = H - 2 * gap;
      var s1 = A.spacetime(ctx, { x: gap, y: gap, w: w2, h: h2 }, { xmin: -3, xmax: 3, tmin: -2, tmax: 4, light: true, coneLabels: false, title: 'Galilei', lightLabel: false });
      s1.frame(0.5, { galilei: true, grid: true });
      var s2 = A.spacetime(ctx, { x: 2 * gap + w2, y: gap, w: w2, h: h2 }, { xmin: -3, xmax: 3, tmin: -2, tmax: 4, light: true, coneLabels: false, title: 'Lorentz', lightLabel: false });
      s2.frame(0.5, { grid: true });
    }
  });
  A.gallery.push({
    name: 'A.eventMark (evenimente)', src: K, w: 420, h: 190, draw: function (ctx, W, H, t) {
      var P = RF.sim.palette(); D.clear({ ctx: ctx, W: W, H: H });
      var g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, P.dark ? '#16224a' : '#ffffff'); g.addColorStop(1, P.dark ? '#0b1330' : '#e9eefa');
      ctx.fillStyle = g; D.rrect(ctx, 8, 8, W - 16, H - 16, 14); ctx.fill();
      A.eventMark(ctx, W * 0.14, H * 0.42, { label: 'A', pos: 'ne', t: t, pulse: true });
      A.eventMark(ctx, W * 0.34, H * 0.42, { label: 'B', color: P.s1, pos: 'nw', r: 9 });
      A.eventMark(ctx, W * 0.54, H * 0.42, { label: 'C', color: P.s2, pos: 'se', shape: 'diamond' });
      A.eventMark(ctx, W * 0.72, H * 0.42, { label: 'D', color: P.light, pos: 's', r: 8 });
      A.eventMark(ctx, W * 0.88, H * 0.42, { color: P.good, shape: 'dot', r: 6, label: 'E', pos: 'n' });
      A.eventMark(ctx, W * 0.5, H * 0.8, { label: 'evenimentul (x, ct) = (2; 3)', pos: 'e', r: 5.5, color: P.acc2 });
    }
  });
  A.gallery.push({
    name: 'A.frameAxes (axe rotite / înclinate)', src: K, w: 460, h: 260, draw: function (ctx, W, H, t) {
      var P = RF.sim.palette(); D.clear({ ctx: ctx, W: W, H: H });
      var g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, P.dark ? '#16224a' : '#ffffff'); g.addColorStop(1, P.dark ? '#0b1330' : '#e9eefa');
      ctx.fillStyle = g; D.rrect(ctx, 8, 8, W - 16, H - 16, 14); ctx.fill();
      var ox = W * 0.26, oy = H * 0.72, len = H * 0.56;
      var ang = 0.5 + 0.12 * Math.sin(t * 0.8);
      A.frameAxes(ctx, ox, oy, len, 0, { color: P.s1, labels: ['x', 'y'], ticks: 4, origin: 'O' });
      var rot = A.frameAxes(ctx, ox, oy, len * 0.95, ang, { color: P.s2, labels: ['x′', 'y′'], ticks: 4 });
      var p = rot.to(len * 0.55, len * 0.4);
      ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = D.rgba(P.s2, 0.8); ctx.lineWidth = 1.3;
      var a = rot.to(len * 0.55, 0), b2 = rot.to(0, len * 0.4);
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(a.x, a.y); ctx.moveTo(p.x, p.y); ctx.lineTo(b2.x, b2.y); ctx.stroke(); ctx.restore();
      A.eventMark(ctx, p.x, p.y, { label: 'P', r: 5.5, pos: 'ne' });
      var ox2 = W * 0.72, oy2 = H * 0.72;
      A.frameAxes(ctx, ox2, oy2, len, 0, { color: P.s1, labels: ['x', 'ct'], angle2: PI / 2, origin: 'O' });
      A.frameAxes(ctx, ox2, oy2, len * 0.95, 0.5, { color: P.s2, labels: ['x′', 'ct′'], angle2: PI / 2 - 0.5 });
    }
  });
})(window);
