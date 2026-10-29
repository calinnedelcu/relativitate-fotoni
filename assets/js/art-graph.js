/* ==========================================================================
   RF.art — art-graph.js — grafice și bare șlefuite (canvas 2D)
   Ghid: _dev/art-guide.md  ·  Galerie: _dev/gallery.html#grafic

   Toate funcțiile desenează în pixeli CSS, citesc paleta la fiecare apel
   (tema deschisă / întunecată) și nu aruncă erori la opțiuni lipsă.

   ── TEXT CU INDICI ──────────────────────────────────────────────────────
   Orice text din acest modul (etichete, titluri, chips, legende) acceptă un
   mini-limbaj:  E_c  → E cu indice c;  m_{0}c^{2} → m₀c²;  U_{s}, ν_{0}, L_{ex}.
   După „_” sau „^” vine un singur caracter, sau un grup între acolade.
   Funcția publică: A.richText(ctx, text, x, y, {size, weight, mono, color, align, base, halo})

   ── A.graph(ctx, rect, o) ───────────────────────────────────────────────
   rect = {x, y, w, h} (px CSS). Desenează panoul, grila punctată, axele cu
   săgeți, gradațiile și titlurile; întoarce obiectul grafic `g`.
   o: { xmin, xmax, ymin, ymax,
        xlabel, ylabel      titlurile axelor (x: jos-dreapta; y: sus-stânga, orizontal)
        title               titlu în colțul de sus-stânga al panoului
        xticks, yticks      număr aproximativ (ex. 5) SAU listă [0, .5, 1] SAU [{v:1, label:'c'}]
        fmtx(v), fmty(v)    formatare gradații (implicit: virgulă zecimală, minus tipografic)
        grid:true           grila punctată
        axes:'auto'|'edge'  'auto' (implicit): axa trece prin 0 dacă 0 e în interval; 'edge': pe margini
        cross:[cx, cy]      unde se intersectează axele (în unități de date)
        pad                 număr (adaugă) sau {l,t,r,b} (înlocuiește) — marginile dintre panou și zona de trasare
        panel:false         nu desena panoul (graficul se suprapune peste fundalul tău)
        radius              raza colțurilor panoului (14) }
   g.px(x) g.py(y) g.ix(px) g.iy(py)     conversii date ⇄ pixeli
   g.plot={x,y,w,h}   zona de trasare;   g.axisX, g.axisY   pixelii axelor;   g.small   (lățime < 360)
   g.curve(fnOrPts, {color,w,fill,glow,dash,samples,from,to,alpha,smooth,label,labelAt,labelPos,base})
        fnOrPts: funcție x→y (eșantionare adaptivă, rupe la ∞/NaN) sau listă [[x,y],…] / [{x,y},…].
        fill: implicit true DOAR pentru prima curbă (umplere cu gradient până la axă); false pentru celelalte.
        from/to: porțiunea desenată (ex. animație: to = t curent). Întoarce {f(x), pts}.
   g.area(fn1, fn2|number|null, {color,alpha,from,to,hatch})   zonă între două curbe (sau până la axă)
   g.point(x, y, {color,r,label,labelPos,halo:true,drop:true|'x'|'y',tags:true,xtag,ytag,t})
        marcaj strălucitor (halou + inel alb), ghiduri punctate spre axe cu etichete de valoare pe axe;
        `t` (secunde) → inel pulsatoriu. Culoarea implicită = culoarea ultimei curbe.
   g.dots([[x,y],…], {color,r})                   puncte experimentale (sfere mici)
   g.hline(y, {color,dash,label,labelAt:'right'|'left',w})   g.vline(x, {color,dash,label,labelAt:'top'|'bottom',w})
   g.band(x0, x1, {color,alpha,label,labelPos:'top'|'bottom',hatch,edges})   zonă verticală (ex. „viteze obișnuite”)
   g.hband(y0, y1, {…})                           zonă orizontală (ex. „interzis: peste c”, cu hatch:true)
   g.span(x, y0, y1, {color,label,side:'right'|'left'})   cotă verticală cu săgeți (ex. L_ex)
   g.hspan(y, x0, x1, {color,label,side:'above'|'below'}) cotă orizontală
   g.arrow(x0,y0,x1,y1,{color,w,label})           săgeată de adnotare în coordonate de date
   g.text(x, y, str, {color,align,size,weight,mono,chip:false,halo:true,dx,dy,dot})
   g.legend([{color,label,dash,kind:'line'|'dot'|'area'}], {pos:'tr'|'tl'|'br'|'bl'|'tc'|'bc', horizontal, at:{x,y}})
   g.clip() / g.unclip()                          decupează pe zona de trasare (pentru desen propriu)

   ── A.bars(ctx, rect, items, o) ─────────────────────────────────────────
   items: [{label, value, color, note?, parts?:[{value,color,label?}] (bară stivuită), mark?:{value,label,color}}]
   o: { max, min, horizontal:false, showValues:true, fmt(v), baseline:0, animate (0..1 sau true cu o.t),
        t, panel:true, grid:true, track:true, axis:false, caption, barW, unit }
   întoarce {bars:[{x,y,w,h,cx,cy,top:{x,y},bottom:{x,y},value,color}], vToY(v) / vToX(v), plot, base}

   ── A.speedBar(ctx, x, y, w, o) ─────────────────────────────────────────
   (x,y) = capătul stâng al pistei, centrul vertical; w = lățimea TUTUROR scalei (0 … max·c).
   o: { markers:[{v, label, color, side:'up'|'down', badge:'ok'|'no'}], max (c; implicit 1 sau peste cel mai mare v),
        fill:v | {v,color},  fills:[{v0,v1,color,label}],  h (grosimea pistei), t, overLabel, ticks:[…],
        wallLabel, bounds:{x0,x1} }
   v > 1 → depășește „zidul” c: hașură roșie, marcaj roșu automat cu ✗.
   întoarce {vToX(v), xToV(px), x, y, w, h, wallX, vmax, top, bottom, markers:[{x,y,chip}]}

   ── A.energyTriangle(ctx, rect, o) ──────────────────────────────────────
   o: { E, pc, E0 (oricare două), max (scara = E maxim) | maxPc, maxE0, labels:{E,pc,E0} | false,
        values:false, unit, fmt, angleLabel:'θ', panel:true, t }
   catete: pc (cyan, orizontală), m₀c² (roz, verticală), ipotenuză E (chihlimbar). Colțul A (stânga-jos) e fix.
   întoarce {pts:{a,b,c}, scale, theta, E, pc, E0, mid:{E,pc,E0}}

   ── A.axes2D(ctx, rect, o) ──────────────────────────────────────────────
   o: { angle (rad, sens trigonometric), half (semi-lățime vizibilă, unități), points:[{x,y,label},{…}],
        labels:{x,y,xp,yp}, proj:'both'|'fixed'|'rot'|false, values:false, fmt, dLabel:'d', panel:true, angleLabel }
   întoarce {px,py,ix,iy,toPx(x,y),rot(x,y)→{x,y}',rotPx(x′,y′),scale,origin,A,B,d,dx,dy,dxp,dyp,plot}
   ========================================================================== */
(function (global) {
  'use strict';
  var RF = global.RF, D = RF.draw, TAU = Math.PI * 2;
  var A = RF.art = RF.art || {};
  A.gallery = A.gallery || [];

  /* ======================= utilitare private ======================= */
  function pal() { return RF.sim.palette(); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function isN(v) { return typeof v === 'number' && isFinite(v); }
  function nz(v, d) { return isN(v) ? v : d; }
  function easeOut(t) { t = clamp(t, 0, 1); return 1 - Math.pow(1 - t, 3); }
  function reduced() { return !!RF.reduced; }

  /* număr de zecimale cerut de un pas (0.25 → 2) */
  function dec(step) {
    var s = Math.abs(step), d = 0;
    if (!s) return 0;
    while (d < 6) {
      var k = s * Math.pow(10, d);
      if (Math.abs(k - Math.round(k)) <= 1e-7 * Math.max(1, k)) break;
      d++;
    }
    return d;
  }
  /* număr cu virgulă zecimală și minus tipografic (evită „-0,0”) */
  function fmtN(v, d) {
    if (!isFinite(v)) return v > 0 ? '∞' : v < 0 ? '−∞' : '–';
    if (Math.abs(v) < 0.5 * Math.pow(10, -d)) return '0';
    return RF.fmt.n(v, d).replace('-', '−');
  }
  function tickColor(P) { return P.dark ? P.tx3 : P.tx2; }
  function lum(c) {
    var p = A.parse(c);
    function f(v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }
    return 0.2126 * f(p[0]) + 0.7152 * f(p[1]) + 0.0722 * f(p[2]);
  }
  function textOn(c) { return lum(c) > 0.34 ? '#0d1226' : '#ffffff'; }

  /* fonturi și lățimi de text în cache */
  var fcache = {};
  function font(size, weight, mono) {
    var k = size + '|' + weight + '|' + (mono ? 1 : 0);
    return fcache[k] || (fcache[k] = D.font(size, weight, mono));
  }
  var twc = {}, twn = 0;
  function tw(ctx, f, s) {
    var k = f + '|' + s, v = twc[k];
    if (v == null) {
      if (twn > 900) { twc = {}; twn = 0; }
      ctx.save(); ctx.font = f; v = ctx.measureText(s).width; ctx.restore();
      twc[k] = v; twn++;
    }
    return v;
  }

  /* ---------- text cu indici: „E_c”, „m_{0}c^{2}” ---------- */
  var rcache = {}, rcn = 0;
  function rich(s) {
    s = String(s == null ? '' : s);
    var hit = rcache[s];
    if (hit) return hit;
    var segs = [], buf = '', i = 0, n = s.length;
    function flush() { if (buf) { segs.push({ t: buf, m: 0 }); buf = ''; } }
    while (i < n) {
      var ch = s.charAt(i);
      if ((ch === '_' || ch === '^') && i + 1 < n) {
        var mode = ch === '_' ? -1 : 1, nx = s.charAt(i + 1);
        if (nx === '{') {
          var j = s.indexOf('}', i + 2);
          if (j > 0) { flush(); segs.push({ t: s.slice(i + 2, j), m: mode }); i = j + 1; continue; }
        } else if (nx !== ' ') {
          flush(); segs.push({ t: nx, m: mode }); i += 2; continue;
        }
      }
      buf += ch; i++;
    }
    flush();
    if (rcn > 500) { rcache = {}; rcn = 0; }
    rcache[s] = segs; rcn++;
    return segs;
  }
  function rwidth(ctx, s, size, weight, mono) {
    var segs = rich(s), w = 0;
    for (var i = 0; i < segs.length; i++) w += tw(ctx, font(segs[i].m ? size * 0.74 : size, weight, mono), segs[i].t);
    return w;
  }
  /* desenează text; o:{size, weight, mono, color, align, base, halo (culoare), haloW} ; întoarce lățimea */
  function rdraw(ctx, s, x, y, o) {
    o = o || {};
    var size = o.size || 12, wgt = o.weight || 600, segs = rich(s), ws = [], total = 0, i, f;
    for (i = 0; i < segs.length; i++) {
      f = font(segs[i].m ? size * 0.74 : size, wgt, o.mono);
      ws[i] = tw(ctx, f, segs[i].t); total += ws[i];
    }
    var cx = o.align === 'center' ? x - total / 2 : o.align === 'right' ? x - total : x;
    ctx.save();
    ctx.textAlign = 'left'; ctx.textBaseline = o.base || 'middle'; ctx.lineJoin = 'round';
    for (i = 0; i < segs.length; i++) {
      var dy = segs[i].m < 0 ? size * 0.2 : segs[i].m > 0 ? -size * 0.36 : 0;
      ctx.font = font(segs[i].m ? size * 0.74 : size, wgt, o.mono);
      if (o.halo) { ctx.strokeStyle = o.halo; ctx.lineWidth = o.haloW || 3.6; ctx.strokeText(segs[i].t, cx, y + dy + 0.5); }
      ctx.fillStyle = o.color || pal().tx;
      ctx.fillText(segs[i].t, cx, y + dy + 0.5);
      cx += ws[i];
    }
    ctx.restore();
    return total;
  }
  A.richText = function (ctx, s, x, y, o) { return rdraw(ctx, s, x, y, o); };
  A.richWidth = function (ctx, s, size, weight, mono) { return rwidth(ctx, s, size || 12, weight || 600, mono); };

  /* ---------- etichetă rotunjită (ca A.chip, dar cu indici, insignă, culoare plină) ----------
     o:{size, color, dot, badge:'ok'|'no', bg, border, fill (culoare plină), align, mono, weight, shadow:false, h} */
  function chip(ctx, text, x, y, o) {
    o = o || {};
    var P = pal(), size = o.size || 11.5, hh = o.h || Math.round(size + 10);
    var padX = o.padX == null ? 9 : o.padX, lead = o.badge ? 17 : o.dot ? 12 : 0;
    var wgt = o.weight || 650, tW = rwidth(ctx, text, size, wgt, o.mono);
    var w = Math.max(tW + padX * 2 + lead, hh);
    var bx = o.align === 'center' ? x - w / 2 : o.align === 'right' ? x - w : x, by = y - hh / 2;
    ctx.save();
    if (o.shadow !== false) { ctx.shadowColor = 'rgba(0,0,0,.26)'; ctx.shadowBlur = 7; ctx.shadowOffsetY = 2; }
    var bg = o.bg, bd = o.border, tc = o.color || P.tx;
    if (o.fill) {
      bg = A.lin(ctx, bx, by, bx, by + hh, [[0, A.lighten(o.fill, 0.22)], [1, A.darken(o.fill, 0.12)]]);
      bd = D.rgba(A.darken(o.fill, 0.35), 0.5); tc = o.color || textOn(o.fill);
    }
    D.fillRR(ctx, bx, by, w, hh, hh / 2, bg || D.rgba(P.card, 0.95), bd || D.rgba(o.dot || P.line2, 0.8), 1);
    ctx.shadowColor = 'transparent';
    if (o.badge) A.badge(ctx, o.badge, bx + 11, y, 6.4);
    else if (o.dot) { ctx.fillStyle = o.dot; ctx.beginPath(); ctx.arc(bx + 11, y, 3.6, 0, TAU); ctx.fill(); }
    rdraw(ctx, text, bx + padX + lead, y, { size: size, weight: wgt, color: tc, mono: o.mono });
    ctx.restore();
    return { x: bx, y: by, w: w, h: hh };
  }
  function chipW(ctx, text, o) {
    o = o || {};
    var size = o.size || 11.5, hh = o.h || Math.round(size + 10), padX = o.padX == null ? 9 : o.padX, lead = o.badge ? 17 : o.dot ? 12 : 0;
    return Math.max(rwidth(ctx, text, size, o.weight || 650, o.mono) + padX * 2 + lead, hh);
  }
  /* etichetă mică, plină, pe o axă („valoarea curentă”) */
  function tag(ctx, text, x, y, color, o) {
    o = o || {};
    var size = o.size || 10.5, hh = size + 8, w = rwidth(ctx, text, size, 700, true) + 12;
    var bx = o.align === 'right' ? x - w : o.align === 'left' ? x : x - w / 2, by = y - hh / 2;
    ctx.save();
    ctx.shadowColor = D.rgba(color, 0.55); ctx.shadowBlur = 8;
    D.rrect(ctx, bx, by, w, hh, hh / 2);
    ctx.fillStyle = A.lin(ctx, bx, by, bx, by + hh, [[0, A.lighten(color, 0.22)], [1, A.darken(color, 0.14)]]);
    ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = D.rgba(A.darken(color, 0.4), 0.45); ctx.lineWidth = 1; ctx.stroke();
    rdraw(ctx, text, bx + 6, y, { size: size, weight: 700, mono: true, color: textOn(color) });
    ctx.restore();
    return { x: bx, y: by, w: w, h: hh };
  }

  /* ---------- panou rotunjit cu gradient fin ---------- */
  function panel(ctx, x, y, w, h, P, r) {
    r = r == null ? 14 : r;
    var top = P.dark ? P.card2 : P.card, bot = P.dark ? P.card : P.card2;
    ctx.save();
    D.rrect(ctx, x, y, w, h, r);
    ctx.fillStyle = A.lin(ctx, x, y, x + w * 0.4, y + h, [[0, top], [1, bot]]);
    ctx.fill();
    ctx.clip();
    var gl = ctx.createRadialGradient(x + w * 0.1, y, 0, x + w * 0.1, y, Math.max(w, h) * 0.85);
    gl.addColorStop(0, P.dark ? 'rgba(120,170,255,.10)' : 'rgba(255,255,255,.7)'); gl.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gl; ctx.fillRect(x, y, w, h);
    ctx.fillStyle = A.lin(ctx, 0, y, 0, y + 2, [[0, P.dark ? 'rgba(255,255,255,.07)' : 'rgba(255,255,255,.95)'], [1, 'rgba(255,255,255,0)']]);
    ctx.fillRect(x, y, w, 2);
    ctx.restore();
    ctx.save();
    D.rrect(ctx, x + 0.5, y + 0.5, w - 1, h - 1, r);
    ctx.strokeStyle = P.line2; ctx.lineWidth = 1; ctx.stroke();
    ctx.restore();
  }
  function panelColorAt(P, y, y0, h) {
    var top = P.dark ? P.card2 : P.card, bot = P.dark ? P.card : P.card2;
    return A.mix(top, bot, clamp((y - y0) / Math.max(h, 1), 0, 1));
  }

  function arrowhead(ctx, x, y, ang, len, wid, color) {
    ctx.save();
    ctx.translate(x, y); ctx.rotate(ang);
    ctx.fillStyle = color; ctx.strokeStyle = color; ctx.lineJoin = 'round'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-len, -wid / 2); ctx.lineTo(-len * 0.7, 0); ctx.lineTo(-len, wid / 2); ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.restore();
  }

  /* ---------- gradații „frumoase” ---------- */
  function tickStep(min, max, n) {
    var range = Math.abs(max - min); n = Math.max(1, n);
    var raw = range / n, mag = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10));
    var ms = [1, 2, 5, 10, 20, 50], i, st, s0 = null;
    for (i = 0; i < ms.length; i++) { st = ms[i] * mag; if (range / st <= n + 1e-9) { s0 = st; break; } }
    if (s0 == null) s0 = 10 * mag;
    if (min > 0) { /* aliniază pe minim (ex. γ: 1, 2, 3 …) dacă nu cere mult mai multe gradații */
      for (i = 0; i < ms.length; i++) {
        st = ms[i] * mag;
        if (st >= s0 * 0.99) break;
        if (range / st <= n * 1.35 + 0.5 && Math.abs(min / st - Math.round(min / st)) < 1e-6) return st;
      }
    }
    return s0;
  }
  function makeTicks(min, max, spec, count) {
    var list = [], i, d = 0, eps = 1e-9 * Math.abs(max - min);
    if (spec && typeof spec === 'object' && spec.length != null) {
      for (i = 0; i < spec.length; i++) {
        var t = spec[i], isO = t && typeof t === 'object', v = isO ? t.v : t;
        if (!isN(v) || v < min - eps || v > max + eps) continue;
        list.push({ v: v, label: isO ? t.label : null });
        d = Math.max(d, Math.min(3, dec(v)));
      }
      return { list: list, step: 0, dec: d };
    }
    var step = tickStep(min, max, typeof spec === 'number' ? spec : count);
    var k0 = Math.ceil(min / step - 1e-9), k1 = Math.floor(max / step + 1e-9);
    for (var k = k0; k <= k1; k++) list.push({ v: +(k * step).toFixed(10) });
    return { list: list, step: step, dec: dec(step) };
  }

  /* ---------- traseu neted (Catmull-Rom → Bézier) sau poligonal ---------- */
  function tracePts(path, pts, smooth, cont) {
    var n = pts.length, i;
    if (!n) return;
    if (!cont) path.moveTo(pts[0][0], pts[0][1]); else path.lineTo(pts[0][0], pts[0][1]);
    if (n < 2) return;
    if (!smooth || n < 3) { for (i = 1; i < n; i++) path.lineTo(pts[i][0], pts[i][1]); return; }
    for (i = 0; i < n - 1; i++) {
      var p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      path.bezierCurveTo(p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6,
        p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6, p2[0], p2[1]);
    }
  }
  function toPts(src) {
    var out = [];
    if (!src) return out;
    for (var i = 0; i < src.length; i++) {
      var p = src[i], x = p && p.length != null ? p[0] : p && p.x, y = p && p.length != null ? p[1] : p && p.y;
      if (isN(x) && isN(y)) out.push({ x: x, y: y });
    }
    return out;
  }
  function interpFn(pts) {
    return function (x) {
      if (!pts.length) return NaN;
      if (x <= pts[0].x) return pts[0].y;
      for (var i = 1; i < pts.length; i++) {
        if (x <= pts[i].x) { var a = pts[i - 1], b = pts[i], u = b.x === a.x ? 0 : (x - a.x) / (b.x - a.x); return a.y + (b.y - a.y) * u; }
      }
      return pts[pts.length - 1].y;
    };
  }
  /* hașură diagonală în dreptunghiul curent (clip-ul îl pune apelantul) */
  function hatchRect(ctx, x, y, w, h, color, gap, lw) {
    ctx.save();
    ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    ctx.strokeStyle = color; ctx.lineWidth = lw || 1.6; ctx.lineCap = 'butt';
    ctx.beginPath();
    for (var k = -h; k < w + h; k += gap || 8) { ctx.moveTo(x + k, y + h); ctx.lineTo(x + k + h, y); }
    ctx.stroke();
    ctx.restore();
  }

  /* ======================= A.graph ======================= */
  A.graph = function (ctx, rect, o) {
    o = o || {};
    var P = pal(), X0 = rect.x, Y0 = rect.y, W = Math.max(rect.w, 60), H = Math.max(rect.h, 60);
    var xmin = nz(o.xmin, 0), xmax = nz(o.xmax, 1), ymin = nz(o.ymin, 0), ymax = nz(o.ymax, 1);
    if (xmax === xmin) xmax = xmin + 1;
    if (ymax === ymin) ymax = ymin + 1;
    var small = W < 360, fsT = small ? 10.5 : 11, fsL = small ? 11.5 : 12.5, tcol = tickColor(P);

    /* unde se taie axele */
    var cx = nz(o.cross && o.cross[0], (xmin < 0 && xmax > 0) ? 0 : xmin);
    var cy = nz(o.cross && o.cross[1], (ymin < 0 && ymax > 0) ? 0 : ymin);
    if (o.axes === 'edge') { cx = xmin; cy = ymin; }
    var atLeft = Math.abs(cx - xmin) < 1e-9 * Math.abs(xmax - xmin), atBottom = Math.abs(cy - ymin) < 1e-9 * Math.abs(ymax - ymin);

    /* gradații (numărul depinde de spațiul disponibil) */
    var xt = makeTicks(xmin, xmax, o.xticks, Math.max(2, Math.floor(Math.max(50, W - 70) / (small ? 50 : 62))));
    var yt = makeTicks(ymin, ymax, o.yticks, Math.max(2, Math.floor(Math.max(40, H - 80) / 34)));
    var fx = o.fmtx || function (v) { return fmtN(v, xt.dec); };
    var fy = o.fmty || function (v) { return fmtN(v, yt.dec); };
    function xlab(t) { return t.label != null ? t.label : fx(t.v); }
    function ylab(t) { return t.label != null ? t.label : fy(t.v); }
    var maxLW = 0, i;
    for (i = 0; i < yt.list.length; i++) maxLW = Math.max(maxLW, rwidth(ctx, ylab(yt.list[i]), fsT, 600, true));

    /* margini */
    var m = small ? 10 : 12, ov = 13;
    var pad = {
      l: m + (atLeft ? maxLW + 12 : 6), r: m + 14,
      t: m + (o.title ? 22 : 0) + ov + (o.ylabel ? 9 : 1),
      b: m - 2 + (atBottom ? fsT + 13 : 2) + (o.xlabel ? 19 : 2)
    };
    if (typeof o.pad === 'number') { pad.l += o.pad; pad.r += o.pad; pad.t += o.pad; pad.b += o.pad; }
    else if (o.pad) { for (var kk in o.pad) if (isN(o.pad[kk])) pad[kk] = o.pad[kk]; }
    var plot = { x: X0 + pad.l, y: Y0 + pad.t, w: Math.max(30, W - pad.l - pad.r), h: Math.max(30, H - pad.t - pad.b) };
    var sx = plot.w / (xmax - xmin), sy = plot.h / (ymax - ymin);
    function px(x) { return plot.x + (x - xmin) * sx; }
    function py(y) { return plot.y + plot.h - (y - ymin) * sy; }
    function ix(p) { return xmin + (p - plot.x) / sx; }
    function iy(p) { return ymin + (plot.y + plot.h - p) / sy; }
    var axX = px(cx), axY = py(cy);

    /* ---------- desen static ---------- */
    if (o.panel !== false) panel(ctx, X0, Y0, W, H, P, o.radius);
    if (o.title) rdraw(ctx, o.title, X0 + m + 2, Y0 + m + 7, { size: small ? 12.5 : 13.5, weight: 700, color: P.tx });

    if (o.grid !== false) {
      ctx.save();
      ctx.strokeStyle = P.dark ? 'rgba(150,180,255,.24)' : 'rgba(20,30,70,.18)';
      ctx.lineWidth = 1.7; ctx.lineCap = 'round'; ctx.setLineDash([0.1, 4.6]);
      ctx.beginPath();
      for (i = 0; i < xt.list.length; i++) {
        var gx = px(xt.list[i].v);
        if (Math.abs(gx - axX) < 1.5) continue;
        ctx.moveTo(gx, plot.y); ctx.lineTo(gx, plot.y + plot.h);
      }
      for (i = 0; i < yt.list.length; i++) {
        var gy = py(yt.list[i].v);
        if (Math.abs(gy - axY) < 1.5) continue;
        ctx.moveTo(plot.x, gy); ctx.lineTo(plot.x + plot.w, gy);
      }
      ctx.stroke();
      ctx.restore();
    }

    /* axe */
    var ac = P.dark ? 'rgba(190,203,235,.88)' : 'rgba(55,66,98,.92)';
    ctx.save();
    ctx.strokeStyle = ac; ctx.lineWidth = 1.7; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(plot.x, axY); ctx.lineTo(plot.x + plot.w + ov - 3, axY);
    ctx.moveTo(axX, plot.y + plot.h); ctx.lineTo(axX, plot.y - ov + 3); ctx.stroke();
    ctx.lineWidth = 1.3; ctx.beginPath();
    for (i = 0; i < xt.list.length; i++) { var tx = px(xt.list[i].v); ctx.moveTo(tx, axY); ctx.lineTo(tx, axY + 4.5); }
    for (i = 0; i < yt.list.length; i++) { var ty = py(yt.list[i].v); ctx.moveTo(axX, ty); ctx.lineTo(axX - 4.5, ty); }
    ctx.stroke();
    ctx.restore();
    arrowhead(ctx, plot.x + plot.w + ov, axY, 0, 9, 8, ac);
    arrowhead(ctx, axX, plot.y - ov, -Math.PI / 2, 9, 8, ac);

    /* etichete gradații (cu „halo” când stau peste zona de trasare) */
    var haloX = atBottom ? null : D.rgba(panelColorAt(P, axY, Y0, H), 0.9);
    var haloY = atLeft ? null : D.rgba(panelColorAt(P, plot.y + plot.h / 2, Y0, H), 0.9);
    var zeroBoth = Math.abs(cx) < 1e-9 && Math.abs(cy) < 1e-9, drewZero = false;
    for (i = 0; i < xt.list.length; i++) {
      var xv = xt.list[i].v, xs = xlab(xt.list[i]);
      if (zeroBoth && Math.abs(xv) < 1e-9) { rdraw(ctx, xs, axX - 8, axY + 8 + fsT / 2, { size: fsT, weight: 600, mono: true, color: tcol, align: 'right', halo: haloX || haloY }); drewZero = true; continue; }
      rdraw(ctx, xs, px(xv), axY + 9 + fsT / 2, { size: fsT, weight: 600, mono: true, color: tcol, align: 'center', halo: haloX });
    }
    for (i = 0; i < yt.list.length; i++) {
      var yv = yt.list[i].v;
      if (drewZero && Math.abs(yv) < 1e-9) continue;
      rdraw(ctx, ylab(yt.list[i]), axX - 9, py(yv), { size: fsT, weight: 600, mono: true, color: tcol, align: 'right', halo: haloY });
    }
    /* titlurile axelor */
    if (o.ylabel) rdraw(ctx, o.ylabel, axX + 11, plot.y - ov, { size: fsL, weight: 650, color: P.tx2 });
    if (o.xlabel) rdraw(ctx, o.xlabel, plot.x + plot.w + ov, Y0 + H - (small ? 12 : 14), { size: fsL, weight: 650, color: P.tx2, align: 'right' });

    /* ---------- obiectul grafic ---------- */
    var g = {
      rect: rect, plot: plot, px: px, py: py, ix: ix, iy: iy, small: small, P: P,
      xmin: xmin, xmax: xmax, ymin: ymin, ymax: ymax, axisX: axX, axisY: axY,
      xticks: xt.list, yticks: yt.list, fmtx: fx, fmty: fy
    };
    var nCurves = 0, lastColor = null;
    var panelBg = function (y) { return D.rgba(panelColorAt(P, y, Y0, H), 0.88); };

    g.clip = function () { ctx.save(); ctx.beginPath(); ctx.rect(plot.x - 1, plot.y - 1, plot.w + 2, plot.h + 2); ctx.clip(); };
    g.unclip = function () { ctx.restore(); };

    /* alege locul unei etichete lângă un punct, rămânând în zona de trasare */
    function place(X, Y, w, h, off, pref) {
      var bx0 = plot.x + 2, bx1 = plot.x + plot.w - 2, by0 = plot.y + 2, by1 = plot.y + plot.h - 2;
      var c = {
        up: [X, Y - off - h / 2], down: [X, Y + off + h / 2], right: [X + off + w / 2, Y], left: [X - off - w / 2, Y],
        upleft: [X - off * 0.4 - w / 2, Y - off - h / 2], upright: [X + off * 0.4 + w / 2, Y - off - h / 2],
        downright: [X + off * 0.4 + w / 2, Y + off + h / 2], downleft: [X - off * 0.4 - w / 2, Y + off + h / 2]
      };
      var orders = {
        up: ['up', 'upleft', 'upright', 'left', 'right', 'down'], down: ['down', 'downright', 'downleft', 'right', 'left', 'up'],
        left: ['left', 'upleft', 'downleft', 'up', 'down', 'right'], right: ['right', 'upright', 'downright', 'up', 'down', 'left']
      };
      var ord = orders[pref] || orders.up;
      for (var k = 0; k < ord.length; k++) {
        var q = c[ord[k]];
        if (q[0] - w / 2 >= bx0 && q[0] + w / 2 <= bx1 && q[1] - h / 2 >= by0 && q[1] + h / 2 <= by1) return q;
      }
      var q0 = c[ord[0]];
      return [clamp(q0[0], bx0 + w / 2, Math.max(bx0 + w / 2, bx1 - w / 2)), clamp(q0[1], by0 + h / 2, Math.max(by0 + h / 2, by1 - h / 2))];
    }

    /* eșantionare adaptivă a unei funcții → segmente de puncte în pixeli */
    function sampleFn(fn, a, b, nOpt) {
      if (b < a) { var sw = a; a = b; b = sw; }
      var adaptive = !nOpt, n = nOpt ? Math.max(4, nOpt | 0) : clamp(Math.round(plot.w / 7), 24, 90);
      var out = [], xs = [], ys = [], i, ptop = plot.y - 30, pbot = plot.y + plot.h + 30;
      function ev(x) { var y; try { y = fn(x); } catch (e) { y = NaN; } return typeof y === 'number' ? y : NaN; }
      function push(x, y) { out.push([x, y]); }
      function refine(xa, ya, xb, yb, d) {
        if (d > 7) return;
        var xm = (xa + xb) / 2, ym = ev(xm);
        if (!isFinite(ym)) return;
        var pa = py(ya), pb = py(yb), pm = py(ym);
        if ((pa < ptop && pb < ptop && pm < ptop) || (pa > pbot && pb > pbot && pm > pbot)) return;
        if (Math.abs(pm - (pa + pb) / 2) > 0.3) { refine(xa, ya, xm, ym, d + 1); push(xm, ym); refine(xm, ym, xb, yb, d + 1); }
      }
      function bisect(xf, xb) { /* xf: punct cu valoare finită, xb: punct fără */
        var yf = ev(xf);
        for (var k = 0; k < 28; k++) { var xm = (xf + xb) / 2, ym = ev(xm); if (isFinite(ym)) { xf = xm; yf = ym; } else xb = xm; }
        return { x: xf, y: yf };
      }
      for (i = 0; i <= n; i++) { xs[i] = a + (b - a) * i / n; ys[i] = ev(xs[i]); }
      push(xs[0], ys[0]);
      for (i = 0; i < n; i++) {
        var fa = isFinite(ys[i]), fb = isFinite(ys[i + 1]), e;
        if (fa && fb) { if (adaptive) refine(xs[i], ys[i], xs[i + 1], ys[i + 1], 0); push(xs[i + 1], ys[i + 1]); }
        else if (fa) { e = bisect(xs[i], xs[i + 1]); if (adaptive) refine(xs[i], ys[i], e.x, e.y, 0); push(e.x, e.y); push(xs[i + 1], NaN); }
        else if (fb) { e = bisect(xs[i + 1], xs[i]); push(e.x, e.y); if (adaptive) refine(e.x, e.y, xs[i + 1], ys[i + 1], 0); push(xs[i + 1], ys[i + 1]); }
        else push(xs[i + 1], NaN);
      }
      var segs = [], cur = [], prevP = null;
      for (i = 0; i < out.length; i++) {
        var yy = out[i][1];
        if (!isFinite(yy)) { if (cur.length) segs.push(cur); cur = []; prevP = null; continue; }
        var Py = clamp(py(yy), plot.y - 4000, plot.y + plot.h + 4000);
        if (prevP != null && ((prevP < plot.y - 200 && Py > plot.y + plot.h + 200) || (prevP > plot.y + plot.h + 200 && Py < plot.y - 200))) { segs.push(cur); cur = []; }
        cur.push([px(out[i][0]), Py]); prevP = Py;
      }
      if (cur.length) segs.push(cur);
      return segs;
    }
    /* taie lista de puncte la x ∈ [a, b] */
    function cutPts(pts, a, b) {
      if (pts.length < 2) return pts;
      var f = interpFn(pts), out = [];
      var inc = pts[pts.length - 1].x >= pts[0].x;
      if (!inc) return pts;
      if (pts[0].x < a) out.push({ x: a, y: f(a) });
      for (var i = 0; i < pts.length; i++) if (pts[i].x >= a && pts[i].x <= b) out.push(pts[i]);
      if (pts[pts.length - 1].x > b) out.push({ x: b, y: f(b) });
      return out;
    }

    /* ---------- curbă ---------- */
    g.curve = function (src, op) {
      op = op || {};
      var col = op.color || P.acc, lw = op.w || (small ? 2.6 : 3.2);
      var from = nz(op.from, xmin), to = nz(op.to, xmax), segs, f, smooth = false;
      if (typeof src === 'function') { f = src; segs = sampleFn(src, from, to, op.samples); }
      else {
        var pts = cutPts(toPts(src), from, to);
        f = interpFn(pts); smooth = op.smooth !== false && pts.length > 2;
        segs = [pts.map(function (p) { return [px(p.x), py(p.y)]; })];
      }
      lastColor = col;
      var first = nCurves === 0; nCurves++;
      var doFill = op.fill != null ? !!op.fill : first;
      var live = false, k;
      for (k = 0; k < segs.length; k++) if (segs[k].length > 1) live = true;
      if (!live) return { f: f, pts: segs };
      var line = new Path2D(), area = null;
      for (k = 0; k < segs.length; k++) tracePts(line, segs[k], smooth, false);
      var by = py(clamp(nz(op.base, cy), ymin, ymax));
      ctx.save();
      ctx.beginPath(); ctx.rect(plot.x - 0.5, plot.y - 0.5, plot.w + 1, plot.h + 1); ctx.clip();
      if (op.alpha != null) ctx.globalAlpha = op.alpha;
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      if (doFill) {
        area = new Path2D();
        var far = by, s2, j;
        for (k = 0; k < segs.length; k++) {
          s2 = segs[k]; if (s2.length < 2) continue;
          area.moveTo(s2[0][0], by); tracePts(area, s2, smooth, true); area.lineTo(s2[s2.length - 1][0], by); area.closePath();
          for (j = 0; j < s2.length; j++) { var yc = clamp(s2[j][1], plot.y, plot.y + plot.h); if (Math.abs(yc - by) > Math.abs(far - by)) far = yc; }
        }
        if (Math.abs(far - by) > 1.5) {
          ctx.fillStyle = A.lin(ctx, 0, far, 0, by, [[0, D.rgba(col, P.dark ? 0.36 : 0.28)], [0.65, D.rgba(col, P.dark ? 0.12 : 0.09)], [1, D.rgba(col, 0.02)]]);
          ctx.fill(area);
        }
      }
      if (op.dash) ctx.setLineDash(op.dash);
      if (op.glow !== false) {
        ctx.save();
        if (P.dark) ctx.globalCompositeOperation = 'lighter';
        ctx.strokeStyle = D.rgba(col, P.dark ? 0.09 : 0.1); ctx.lineWidth = lw * 4.4; ctx.stroke(line);
        ctx.strokeStyle = D.rgba(col, P.dark ? 0.16 : 0.15); ctx.lineWidth = lw * 2.3; ctx.stroke(line);
        ctx.restore();
      }
      ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.stroke(line);
      if (!op.dash && lw >= 2.4) {
        ctx.save(); ctx.translate(-lw * 0.1, -lw * 0.14);
        ctx.strokeStyle = D.rgba(A.lighten(col, 0.7), 0.5); ctx.lineWidth = lw * 0.32; ctx.stroke(line);
        ctx.restore();
      }
      ctx.restore();
      if (op.label) {
        var lx = nz(op.labelAt, to - (to - from) * 0.07), ly = f(lx);
        if (isFinite(ly)) {
          var lw2 = chipW(ctx, op.label, { dot: col }), q = place(px(lx), py(ly), lw2, 22, 12, op.labelPos || 'up');
          chip(ctx, op.label, q[0], q[1], { dot: col, align: 'center' });
        }
      }
      return { f: f, pts: segs };
    };

    /* ---------- zonă între două curbe ---------- */
    g.area = function (f1, f2, op) {
      op = op || {};
      var col = op.color || P.acc, a = nz(op.alpha, 0.2), from = nz(op.from, xmin), to = nz(op.to, xmax);
      var n = op.samples || clamp(Math.round(plot.w / 3), 30, 220), i, u1 = [], u2 = [];
      var g1 = typeof f1 === 'function' ? f1 : function () { return nz(f1, cy); };
      var g2 = typeof f2 === 'function' ? f2 : function () { return nz(f2, cy); };
      for (i = 0; i <= n; i++) {
        var x = from + (to - from) * i / n, y1 = g1(x), y2 = g2(x);
        if (!isFinite(y1) || !isFinite(y2)) continue;
        u1.push([px(x), clamp(py(y1), plot.y - 2000, plot.y + plot.h + 2000)]); u2.push([px(x), clamp(py(y2), plot.y - 2000, plot.y + plot.h + 2000)]);
      }
      if (u1.length < 2) return;
      ctx.save();
      ctx.beginPath(); ctx.rect(plot.x, plot.y, plot.w, plot.h); ctx.clip();
      ctx.beginPath(); ctx.moveTo(u1[0][0], u1[0][1]);
      for (i = 1; i < u1.length; i++) ctx.lineTo(u1[i][0], u1[i][1]);
      for (i = u2.length - 1; i >= 0; i--) ctx.lineTo(u2[i][0], u2[i][1]);
      ctx.closePath();
      ctx.fillStyle = D.rgba(col, a); ctx.fill();
      if (op.hatch) { ctx.clip(); hatchRect(ctx, plot.x, plot.y, plot.w, plot.h, D.rgba(col, 0.5), 8, 1.4); }
      ctx.restore();
    };

    /* ---------- punct / marcaj curent ---------- */
    g.point = function (x, y, op) {
      op = op || {};
      var col = op.color || lastColor || P.light, r = op.r || (small ? 5.5 : 6.5);
      var X = px(x), Y = py(y);
      if (!isFinite(X) || !isFinite(Y)) return null;
      if (X < plot.x - r || X > plot.x + plot.w + r || Y < plot.y - r || Y > plot.y + plot.h + r) return null;
      var drop = op.drop, tags = op.tags !== false;
      if (drop) {
        ctx.save();
        ctx.strokeStyle = D.rgba(col, 0.75); ctx.lineWidth = 1.4; ctx.lineCap = 'round'; ctx.setLineDash([5, 4]);
        ctx.beginPath();
        if (drop !== 'y') { ctx.moveTo(X, Y + r * 0.6); ctx.lineTo(X, axY); }
        if (drop !== 'x') { ctx.moveTo(X - r * 0.6, Y); ctx.lineTo(axX, Y); }
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = col;
        if (drop !== 'y') { ctx.beginPath(); ctx.arc(X, axY, 3, 0, TAU); ctx.fill(); }
        if (drop !== 'x') { ctx.beginPath(); ctx.arc(axX, Y, 3, 0, TAU); ctx.fill(); }
        ctx.restore();
        if (tags) {
          var dx = Math.min(3, xt.dec + 1), dy = Math.min(3, yt.dec + 1);
          if (drop !== 'y') tag(ctx, op.xtag != null ? op.xtag : (o.fmtx ? fx(x) : fmtN(x, dx)), X, axY + 9 + fsT / 2, col);
          if (drop !== 'x') tag(ctx, op.ytag != null ? op.ytag : (o.fmty ? fy(y) : fmtN(y, dy)), axX - 6, Y, col, { align: 'right' });
        }
      }
      /* halou + inel pulsatoriu */
      if (op.halo !== false) A.glow(ctx, X, Y, r * 4.6, col, 0.6);
      if (op.t != null && !reduced()) {
        var ph = (op.t % 1.8) / 1.8;
        ctx.save();
        ctx.strokeStyle = D.rgba(col, 0.55 * (1 - ph)); ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(X, Y, r + 2 + ph * r * 2.4, 0, TAU); ctx.stroke();
        ctx.restore();
      }
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,.4)'; ctx.shadowBlur = 6; ctx.shadowOffsetY = 1.5;
      ctx.fillStyle = P.dark ? '#f5f8ff' : '#ffffff'; ctx.beginPath(); ctx.arc(X, Y, r + 2.6, 0, TAU); ctx.fill();
      ctx.restore();
      ctx.fillStyle = A.rad(ctx, X, Y, 0, r * 1.05, [[0, A.lighten(col, 0.6)], [0.5, col], [1, A.darken(col, 0.3)]], X - r * 0.3, Y - r * 0.35);
      ctx.beginPath(); ctx.arc(X, Y, r, 0, TAU); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.65)'; ctx.beginPath(); ctx.ellipse(X - r * 0.3, Y - r * 0.38, r * 0.28, r * 0.16, -0.6, 0, TAU); ctx.fill();
      if (op.label) {
        var cw = chipW(ctx, op.label, { dot: col, mono: op.mono }), q = place(X, Y, cw, 22, r + 9, op.labelPos || 'up');
        chip(ctx, op.label, q[0], q[1], { dot: col, align: 'center', mono: op.mono });
      }
      return { x: X, y: Y };
    };

    g.dots = function (pts, op) {
      op = op || {};
      var col = op.color || P.light, r = op.r || 4, list = toPts(pts);
      ctx.save();
      ctx.beginPath(); ctx.rect(plot.x - r, plot.y - r, plot.w + 2 * r, plot.h + 2 * r); ctx.clip();
      for (var i = 0; i < list.length; i++) {
        var X = px(list[i].x), Y = py(list[i].y);
        ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 4; ctx.shadowOffsetY = 1;
        ctx.fillStyle = P.dark ? '#f5f8ff' : '#fff'; ctx.beginPath(); ctx.arc(X, Y, r + 1.6, 0, TAU); ctx.fill();
        ctx.shadowColor = 'transparent';
        ctx.fillStyle = A.rad(ctx, X, Y, 0, r * 1.1, [[0, A.lighten(col, 0.55)], [0.5, col], [1, A.darken(col, 0.3)]], X - r * 0.3, Y - r * 0.35);
        ctx.beginPath(); ctx.arc(X, Y, r, 0, TAU); ctx.fill();
      }
      ctx.restore();
    };

    /* ---------- linii de referință ---------- */
    g.hline = function (y, op) {
      op = op || {};
      var col = op.color || P.light, Y = py(y), lw = op.w || 1.8;
      if (Y < plot.y - 1 || Y > plot.y + plot.h + 1) return;
      ctx.save();
      ctx.beginPath(); ctx.rect(plot.x, plot.y - 4, plot.w, plot.h + 8); ctx.clip();
      if (op.glow !== false) { ctx.strokeStyle = D.rgba(col, 0.16); ctx.lineWidth = lw * 4; ctx.beginPath(); ctx.moveTo(plot.x, Y); ctx.lineTo(plot.x + plot.w, Y); ctx.stroke(); }
      ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.setLineDash(op.dash === false ? [] : (op.dash || [7, 5]));
      ctx.beginPath(); ctx.moveTo(plot.x, Y); ctx.lineTo(plot.x + plot.w, Y); ctx.stroke();
      ctx.restore();
      if (op.label) {
        var left = op.labelAt === 'left', cw = chipW(ctx, op.label, { dot: col }), hh = 22;
        var yy = Y - hh / 2 - 7; if (yy - hh / 2 < plot.y + 1) yy = Y + hh / 2 + 7;
        chip(ctx, op.label, left ? plot.x + 8 : plot.x + plot.w - 8, yy, { dot: col, align: left ? 'left' : 'right' });
      }
    };
    g.vline = function (x, op) {
      op = op || {};
      var col = op.color || P.light, X = px(x), lw = op.w || 1.8;
      if (X < plot.x - 1 || X > plot.x + plot.w + 1) return;
      ctx.save();
      ctx.beginPath(); ctx.rect(plot.x - 4, plot.y, plot.w + 8, plot.h); ctx.clip();
      if (op.glow !== false) { ctx.strokeStyle = D.rgba(col, 0.16); ctx.lineWidth = lw * 4; ctx.beginPath(); ctx.moveTo(X, plot.y); ctx.lineTo(X, plot.y + plot.h); ctx.stroke(); }
      ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.setLineDash(op.dash === false ? [] : (op.dash || [7, 5]));
      ctx.beginPath(); ctx.moveTo(X, plot.y); ctx.lineTo(X, plot.y + plot.h); ctx.stroke();
      ctx.restore();
      if (op.label) {
        var cw = chipW(ctx, op.label, { dot: col }), bottom = op.labelAt === 'bottom', hh = 22;
        var yy = bottom ? plot.y + plot.h - hh / 2 - 8 : plot.y + hh / 2 + 8;
        var right = X + 7 + cw <= plot.x + plot.w - 2;
        chip(ctx, op.label, right ? X + 7 : X - 7, yy, { dot: col, align: right ? 'left' : 'right' });
      }
    };

    /* ---------- benzi (zone) ---------- */
    g.band = function (x0, x1, op) {
      op = op || {};
      var col = op.color || P.warn, a = nz(op.alpha, 0.16);
      var A0 = clamp(px(Math.min(x0, x1)), plot.x, plot.x + plot.w), A1 = clamp(px(Math.max(x0, x1)), plot.x, plot.x + plot.w);
      if (A1 - A0 < 0.5) return;
      ctx.save();
      ctx.beginPath(); ctx.rect(plot.x, plot.y, plot.w, plot.h); ctx.clip();
      ctx.fillStyle = A.lin(ctx, 0, plot.y, 0, plot.y + plot.h, [[0, D.rgba(col, a * 1.5)], [1, D.rgba(col, a * 0.7)]]);
      ctx.fillRect(A0, plot.y, A1 - A0, plot.h);
      if (op.hatch) hatchRect(ctx, A0, plot.y, A1 - A0, plot.h, D.rgba(col, 0.45), 8, 1.4);
      if (op.edges !== false) {
        ctx.strokeStyle = D.rgba(col, 0.6); ctx.lineWidth = 1.3; ctx.setLineDash([4, 4]);
        ctx.beginPath();
        if (A0 > plot.x + 0.5) { ctx.moveTo(A0, plot.y); ctx.lineTo(A0, plot.y + plot.h); }
        if (A1 < plot.x + plot.w - 0.5) { ctx.moveTo(A1, plot.y); ctx.lineTo(A1, plot.y + plot.h); }
        ctx.stroke();
      }
      ctx.restore();
      if (op.label) {
        var cw = chipW(ctx, op.label, { dot: col }), yy = op.labelPos === 'bottom' ? plot.y + plot.h - 17 : plot.y + 17;
        var cxx = clamp((A0 + A1) / 2, plot.x + cw / 2 + 3, plot.x + plot.w - cw / 2 - 3);
        chip(ctx, op.label, cxx, yy, { dot: col, align: 'center' });
      }
    };
    g.hband = function (y0, y1, op) {
      op = op || {};
      var col = op.color || P.bad, a = nz(op.alpha, 0.16);
      var B0 = clamp(py(Math.max(y0, y1)), plot.y, plot.y + plot.h), B1 = clamp(py(Math.min(y0, y1)), plot.y, plot.y + plot.h);
      if (B1 - B0 < 0.5) return;
      ctx.save();
      ctx.beginPath(); ctx.rect(plot.x, plot.y, plot.w, plot.h); ctx.clip();
      ctx.fillStyle = A.lin(ctx, plot.x, 0, plot.x + plot.w, 0, [[0, D.rgba(col, a * 0.8)], [1, D.rgba(col, a * 1.4)]]);
      ctx.fillRect(plot.x, B0, plot.w, B1 - B0);
      if (op.hatch) hatchRect(ctx, plot.x, B0, plot.w, B1 - B0, D.rgba(col, 0.45), 8, 1.4);
      ctx.restore();
      if (op.label) {
        var left = op.labelAt === 'left', yy = clamp((B0 + B1) / 2, plot.y + 14, plot.y + plot.h - 14);
        chip(ctx, op.label, left ? plot.x + 8 : plot.x + plot.w - 8, yy, { dot: col, align: left ? 'left' : 'right' });
      }
    };

    /* ---------- cote și săgeți de adnotare ---------- */
    function dim(X0_, Y0_, X1_, Y1_, col, label, side, lw) {
      ctx.save();
      ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw || 1.8; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      var len = Math.hypot(X1_ - X0_, Y1_ - Y0_);
      if (len > 2) {
        var ang = Math.atan2(Y1_ - Y0_, X1_ - X0_), hl = Math.min(8, len / 2.4);
        ctx.beginPath(); ctx.moveTo(X0_ + Math.cos(ang) * hl * 0.6, Y0_ + Math.sin(ang) * hl * 0.6); ctx.lineTo(X1_ - Math.cos(ang) * hl * 0.6, Y1_ - Math.sin(ang) * hl * 0.6); ctx.stroke();
        arrowhead(ctx, X1_, Y1_, ang, hl, hl * 0.95, col); arrowhead(ctx, X0_, Y0_, ang + Math.PI, hl, hl * 0.95, col);
      }
      ctx.restore();
      if (label) {
        var mx = (X0_ + X1_) / 2, my = (Y0_ + Y1_) / 2, cw = chipW(ctx, label, { dot: col }), q;
        if (Math.abs(X1_ - X0_) < Math.abs(Y1_ - Y0_)) { q = side === 'left' ? [mx - 8 - cw / 2, my] : [mx + 8 + cw / 2, my]; }
        else { q = side === 'below' ? [mx, my + 8 + 11] : [mx, my - 8 - 11]; }
        chip(ctx, label, clamp(q[0], plot.x + cw / 2 + 2, plot.x + plot.w - cw / 2 - 2), clamp(q[1], plot.y + 12, plot.y + plot.h - 12), { dot: col, align: 'center' });
      }
    }
    g.span = function (x, y0, y1, op) { op = op || {}; dim(px(x), py(y0), px(x), py(y1), op.color || P.light, op.label, op.side, op.w); };
    g.hspan = function (y, x0, x1, op) { op = op || {}; dim(px(x0), py(y), px(x1), py(y), op.color || P.light, op.label, op.side, op.w); };
    g.arrow = function (x0, y0, x1, y1, op) {
      op = op || {};
      var col = op.color || P.tx, a0 = px(x0), b0 = py(y0), a1 = px(x1), b1 = py(y1);
      ctx.save();
      ctx.strokeStyle = col; ctx.lineWidth = op.w || 2; ctx.lineCap = 'round';
      var ang = Math.atan2(b1 - b0, a1 - a0), hl = 9;
      ctx.beginPath(); ctx.moveTo(a0, b0); ctx.lineTo(a1 - Math.cos(ang) * hl * 0.6, b1 - Math.sin(ang) * hl * 0.6); ctx.stroke();
      arrowhead(ctx, a1, b1, ang, hl, 8.5, col);
      ctx.restore();
      if (op.label) chip(ctx, op.label, clamp(a0, plot.x + 20, plot.x + plot.w - 20), clamp(b0 + (b0 > b1 ? 14 : -14), plot.y + 12, plot.y + plot.h - 12), { dot: col, align: 'center' });
    };

    g.text = function (x, y, str, op) {
      op = op || {};
      var X = px(x) + (op.dx || 0), Y = py(y) + (op.dy || 0);
      if (op.chip) return chip(ctx, str, X, Y, { align: op.align || 'center', dot: op.dot, color: op.color, size: op.size, mono: op.mono });
      var size = op.size || (small ? 11.5 : 12);
      return rdraw(ctx, str, X, Y, { size: size, weight: op.weight || 650, mono: op.mono, color: op.color || P.tx, align: op.align || 'center', halo: op.halo === false ? null : panelBg(Y), haloW: 4 });
    };

    /* ---------- legendă ---------- */
    g.legend = function (items, op) {
      op = op || {};
      items = items || [];
      var size = small ? 11 : 11.5, rowH = size + 8, padX = 9, padY = 6, sw = 22, n = items.length, i;
      if (!n) return null;
      var ws = [], sum = 0, mx = 0;
      for (i = 0; i < n; i++) { ws[i] = rwidth(ctx, items[i].label, size, 600); sum += ws[i]; mx = Math.max(mx, ws[i]); }
      var horiz = op.horizontal;
      if (horiz == null) horiz = false;
      var bw = horiz ? padX * 2 + sum + n * (sw + 7) + (n - 1) * 12 : padX * 2 + sw + 7 + mx;
      var bh = horiz ? rowH + padY : padY * 2 + n * rowH - 6;
      var pos = op.pos || 'tr', mg = 9, lx, ly;
      if (op.at) { lx = op.at.x; ly = op.at.y; }
      else {
        lx = pos.charAt(1) === 'l' ? plot.x + mg : pos.charAt(1) === 'c' ? plot.x + (plot.w - bw) / 2 : plot.x + plot.w - bw - mg;
        ly = pos.charAt(0) === 'b' ? plot.y + plot.h - bh - mg : plot.y + mg;
      }
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,.22)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 2;
      D.fillRR(ctx, lx, ly, bw, bh, 11, D.rgba(P.card, 0.9), P.line2, 1);
      ctx.restore();
      var cxp = lx + padX, cyp = ly + (horiz ? bh / 2 : padY + (rowH - 6) / 2 + 1);
      for (i = 0; i < n; i++) {
        var it = items[i], col = it.color || P.acc, kind = it.kind || 'line';
        ctx.save();
        ctx.lineCap = 'round';
        if (kind === 'dot') {
          ctx.fillStyle = col; ctx.beginPath(); ctx.arc(cxp + sw / 2, cyp, 4.6, 0, TAU); ctx.fill();
        } else if (kind === 'area') {
          D.fillRR(ctx, cxp, cyp - 5.5, sw, 11, 4, D.rgba(col, 0.28), D.rgba(col, 0.9), 1.2);
        } else {
          if (it.dash) ctx.setLineDash([5, 4]);
          ctx.strokeStyle = D.rgba(col, 0.25); ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(cxp + 2, cyp); ctx.lineTo(cxp + sw - 2, cyp); ctx.stroke();
          ctx.strokeStyle = col; ctx.lineWidth = 3.2; ctx.beginPath(); ctx.moveTo(cxp + 1, cyp); ctx.lineTo(cxp + sw - 1, cyp); ctx.stroke();
        }
        ctx.restore();
        rdraw(ctx, it.label, cxp + sw + 7, cyp, { size: size, weight: 600, color: P.tx });
        if (horiz) cxp += sw + 7 + ws[i] + 12; else cyp += rowH;
      }
      return { x: lx, y: ly, w: bw, h: bh };
    };

    return g;
  };

  /* ======================= utilitare pentru bare ======================= */
  function niceMax(x) {
    if (!(x > 0)) return 1;
    var e = Math.pow(10, Math.floor(Math.log(x) / Math.LN10)), f = x / e, nm = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
    for (var i = 0; i < nm.length; i++) if (nm[i] >= f * 1.04) return nm[i] * e;
    return 10 * e;
  }
  /* dreptunghi cu rază diferită pe fiecare colț */
  function rrCorners(ctx, x, y, w, h, tl, tr, br, bl) {
    ctx.beginPath();
    ctx.moveTo(x + tl, y);
    ctx.lineTo(x + w - tr, y); ctx.arcTo(x + w, y, x + w, y + tr, tr);
    ctx.lineTo(x + w, y + h - br); ctx.arcTo(x + w, y + h, x + w - br, y + h, br);
    ctx.lineTo(x + bl, y + h); ctx.arcTo(x, y + h, x, y + h - bl, bl);
    ctx.lineTo(x, y + tl); ctx.arcTo(x, y, x + tl, y, tl);
    ctx.closePath();
  }
  function wrapText(ctx, text, maxW, size, weight, mono, maxLines) {
    var words = String(text).split(/\s+/), lines = [], cur = '', i;
    for (i = 0; i < words.length; i++) {
      var tryS = cur ? cur + ' ' + words[i] : words[i];
      if (!cur || rwidth(ctx, tryS, size, weight, mono) <= maxW) cur = tryS;
      else { lines.push(cur); cur = words[i]; }
    }
    if (cur) lines.push(cur);
    if (maxLines && lines.length > maxLines) { lines = lines.slice(0, maxLines); lines[maxLines - 1] += '…'; }
    return lines;
  }
  /* etichetă pe 1–2 rânduri cu punct colorat; (cx, topY) = centrul sus; întoarce {x,y,w,h} */
  function labelPill(ctx, lines, cx, topY, color, size, align) {
    var P = pal(), lh = size + 3, ww = 0, i, padX = 9, lead = 12;
    for (i = 0; i < lines.length; i++) ww = Math.max(ww, rwidth(ctx, lines[i], size, 650));
    var w = ww + padX * 2 + lead, h = lines.length * lh + 9;
    var x = align === 'right' ? cx - w : align === 'left' ? cx : cx - w / 2;
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,.24)'; ctx.shadowBlur = 7; ctx.shadowOffsetY = 2;
    D.fillRR(ctx, x, topY, w, h, Math.min(h / 2, 11), D.rgba(P.card, 0.95), D.rgba(color, 0.8), 1);
    ctx.shadowColor = 'transparent';
    ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x + 11, topY + h / 2, 3.6, 0, TAU); ctx.fill();
    for (i = 0; i < lines.length; i++) rdraw(ctx, lines[i], x + padX + lead, topY + 4.5 + lh * (i + 0.5), { size: size, weight: 650, color: P.tx });
    ctx.restore();
    return { x: x, y: topY, w: w, h: h };
  }

  /* bară lucioasă: (x,y,w,h) = dreptunghiul final; dir = direcția de creștere ('up','down','right','left');
     segs = [{f0,f1,color,label}] (fracții 0..1 pe lungime, 0 = la bază) */
  function drawBar(ctx, P, x, y, w, h, dir, color, segs, t) {
    var vert = dir === 'up' || dir === 'down', thick = vert ? w : h, len = vert ? h : w;
    var rf = Math.min(thick * 0.32, 14, len / 2), rb = Math.min(3, len / 2), tl, tr, br, bl, k;
    if (dir === 'up') { tl = tr = rf; bl = br = rb; }
    else if (dir === 'down') { bl = br = rf; tl = tr = rb; }
    else if (dir === 'right') { tr = br = rf; tl = bl = rb; }
    else { tl = bl = rf; tr = br = rb; }
    /* umbră colorată moale */
    ctx.save();
    ctx.shadowColor = D.rgba(color, P.dark ? 0.55 : 0.42); ctx.shadowBlur = 14; ctx.shadowOffsetY = vert ? 4 : 3;
    rrCorners(ctx, x, y, w, h, tl, tr, br, bl);
    ctx.fillStyle = color; ctx.fill();
    ctx.restore();
    /* conținut decupat pe forma barei */
    ctx.save();
    rrCorners(ctx, x, y, w, h, tl, tr, br, bl); ctx.clip();
    for (k = 0; k < segs.length; k++) {
      var s = segs[k], sx, sy, sw, sh;
      if (dir === 'up') { sx = x; sw = w; sy = y + h - s.f1 * h; sh = (s.f1 - s.f0) * h; }
      else if (dir === 'down') { sx = x; sw = w; sy = y + s.f0 * h; sh = (s.f1 - s.f0) * h; }
      else if (dir === 'right') { sy = y; sh = h; sx = x + s.f0 * w; sw = (s.f1 - s.f0) * w; }
      else { sy = y; sh = h; sx = x + w - s.f1 * w; sw = (s.f1 - s.f0) * w; }
      ctx.fillStyle = vert
        ? A.lin(ctx, x, 0, x + w, 0, [[0, A.lighten(s.color, 0.32)], [0.42, s.color], [1, A.darken(s.color, 0.36)]])
        : A.lin(ctx, 0, y, 0, y + h, [[0, A.lighten(s.color, 0.32)], [0.42, s.color], [1, A.darken(s.color, 0.36)]]);
      ctx.fillRect(sx, sy, sw, sh);
      if (k < segs.length - 1) {                      /* separator între segmente */
        ctx.fillStyle = D.rgba(A.darken(s.color, 0.55), 0.55);
        if (vert) ctx.fillRect(sx, dir === 'up' ? sy - 0.75 : sy + sh - 0.75, sw, 1.5); else ctx.fillRect(dir === 'right' ? sx + sw - 0.75 : sx - 0.75, sy, 1.5, sh);
        ctx.fillStyle = 'rgba(255,255,255,.28)';
        if (vert) ctx.fillRect(sx, dir === 'up' ? sy + 0.75 : sy + sh - 2.25, sw, 1); else ctx.fillRect(dir === 'right' ? sx + sw + 0.75 : sx - 1.75, sy, 1, sh);
      }
    }
    /* luminozitate de sus-stânga / umbră de jos-dreapta */
    ctx.fillStyle = vert
      ? A.lin(ctx, 0, y, 0, y + h, dir === 'up' ? [[0, 'rgba(255,255,255,.2)'], [0.5, 'rgba(255,255,255,0)'], [1, 'rgba(0,0,20,.16)']] : [[0, 'rgba(0,0,20,.16)'], [0.5, 'rgba(255,255,255,0)'], [1, 'rgba(255,255,255,.2)']])
      : A.lin(ctx, x, 0, x + w, 0, dir === 'right' ? [[0, 'rgba(0,0,20,.16)'], [0.5, 'rgba(255,255,255,0)'], [1, 'rgba(255,255,255,.2)']] : [[0, 'rgba(255,255,255,.2)'], [0.5, 'rgba(255,255,255,0)'], [1, 'rgba(0,0,20,.16)']]);
    ctx.fillRect(x, y, w, h);
    /* bandă de reflexie */
    var hi = vert ? A.lin(ctx, 0, y, 0, y + h, [[0, 'rgba(255,255,255,.42)'], [1, 'rgba(255,255,255,.06)']]) : A.lin(ctx, x, 0, x + w, 0, [[0, 'rgba(255,255,255,.06)'], [1, 'rgba(255,255,255,.42)']]);
    ctx.fillStyle = hi;
    if (vert) { if (h > 10) { D.rrect(ctx, x + w * 0.13, y + rf * 0.7, Math.max(2, w * 0.15), Math.max(0, h - rf * 0.7 - 6), w * 0.07); ctx.fill(); } }
    else if (w > 10) { D.rrect(ctx, x + 5, y + h * 0.13, Math.max(0, w - rf * 0.7 - 6), Math.max(2, h * 0.15), h * 0.07); ctx.fill(); }
    ctx.restore();
    /* margine fină, mai închisă */
    ctx.save();
    rrCorners(ctx, x + 0.5, y + 0.5, Math.max(0, w - 1), Math.max(0, h - 1), tl, tr, br, bl);
    ctx.strokeStyle = D.rgba(A.darken(color, 0.55), 0.35); ctx.lineWidth = 1; ctx.stroke();
    ctx.restore();
    /* etichete în segmente */
    for (k = 0; k < segs.length; k++) {
      var sg = segs[k];
      if (!sg.label) continue;
      var segLen = (sg.f1 - sg.f0) * len;
      if (segLen < 17) continue;
      var mid = (sg.f0 + sg.f1) / 2, tx, ty;
      if (dir === 'up') { tx = x + w / 2; ty = y + h - mid * h; }
      else if (dir === 'down') { tx = x + w / 2; ty = y + mid * h; }
      else if (dir === 'right') { tx = x + mid * w; ty = y + h / 2; }
      else { tx = x + w - mid * w; ty = y + h / 2; }
      if (rwidth(ctx, sg.label, 11, 700) > (vert ? w : segLen) - 4) continue;
      rdraw(ctx, sg.label, tx, ty, { size: 11, weight: 700, color: textOn(sg.color), align: 'center' });
    }
  }

  /* ======================= A.bars ======================= */
  A.bars = function (ctx, rect, items, o) {
    o = o || {};
    items = items || [];
    var P = pal(), n = items.length, horiz = !!o.horizontal, i, j;
    var X0 = rect.x, Y0 = rect.y, W = Math.max(rect.w, 60), H = Math.max(rect.h, 60), small = W < 360;
    var rawP = o.animate === true ? (o.t || 0) / 0.9 : (isN(o.animate) ? o.animate : 1);
    var prog = reduced() ? 1 : easeOut(rawP);
    if (o.panel !== false) panel(ctx, X0, Y0, W, H, P, o.radius);

    var rows = [], base = nz(o.baseline, 0), vhi = base, vlo = base;
    for (i = 0; i < n; i++) {
      var it = items[i], parts = it.parts && it.parts.length ? it.parts : null, v = 0;
      if (parts) for (j = 0; j < parts.length; j++) v += nz(parts[j].value, 0); else v = nz(it.value, 0);
      rows.push({ it: it, v: v, parts: parts, color: it.color || (parts && parts[0].color) || P.acc });
      vhi = Math.max(vhi, v); vlo = Math.min(vlo, v);
    }
    var vmax = isN(o.max) ? o.max : base + niceMax(vhi - base || 1);
    var vmin = isN(o.min) ? o.min : (vlo < base ? base - niceMax(base - vlo) : base);
    if (vmax <= vmin) vmax = vmin + 1;
    var span = vmax - vmin, big = Math.max(Math.abs(vmax), Math.abs(vmin));
    var d0 = big >= 100 ? 0 : big >= 10 ? 1 : 2;
    var fmt = o.fmt || function (v) { return fmtN(v, d0); };
    var showV = o.showValues !== false;

    var m = small ? 10 : 14, fsL = small ? 11 : 11.5, fsN = 10.5;
    var inner = { x: X0 + m, y: Y0 + m, w: W - 2 * m, h: H - 2 * m };
    if (o.caption) { rdraw(ctx, o.caption, X0 + m + 2, Y0 + m + 5, { size: 11.5, weight: 600, color: P.tx2 }); inner.y += 22; inner.h -= 22; }
    var axW = o.axis ? 36 : 0;
    var ticks = makeTicks(vmin, vmax, 4), tcol = tickColor(P);
    var res = { bars: [], base: base };
    var lines = [], noteLines = [], plot, slot;

    /* grila punctată + podeaua (comune) */
    function gridV(plot_) {
      ctx.save();
      ctx.strokeStyle = P.dark ? 'rgba(150,180,255,.22)' : 'rgba(20,30,70,.16)'; ctx.lineWidth = 1.7; ctx.lineCap = 'round'; ctx.setLineDash([0.1, 4.6]);
      ctx.beginPath();
      for (var q = 0; q < ticks.list.length; q++) {
        var tv = ticks.list[q].v;
        if (horiz) { var gx = plot_.x + (tv - vmin) / span * plot_.w; ctx.moveTo(gx, plot_.y); ctx.lineTo(gx, plot_.y + plot_.h); }
        else { var gy = plot_.y + plot_.h - (tv - vmin) / span * plot_.h; ctx.moveTo(plot_.x, gy); ctx.lineTo(plot_.x + plot_.w, gy); }
      }
      ctx.stroke();
      ctx.restore();
      if (o.axis) for (var q2 = 0; q2 < ticks.list.length; q2++) {
        var tv2 = ticks.list[q2].v, lab = fmtN(tv2, ticks.dec);
        if (horiz) rdraw(ctx, lab, plot_.x + (tv2 - vmin) / span * plot_.w, plot_.y + plot_.h + 10, { size: 10.5, weight: 600, mono: true, color: tcol, align: 'center' });
        else rdraw(ctx, lab, plot_.x - 7, plot_.y + plot_.h - (tv2 - vmin) / span * plot_.h, { size: 10.5, weight: 600, mono: true, color: tcol, align: 'right' });
      }
    }
    function floorLine(x0, y0, x1, y1) {
      ctx.save();
      ctx.lineCap = 'round';
      ctx.strokeStyle = P.dark ? 'rgba(150,180,255,.16)' : 'rgba(20,30,70,.12)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
      ctx.strokeStyle = P.dark ? 'rgba(200,212,240,.7)' : 'rgba(55,66,98,.7)'; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
      ctx.restore();
    }
    function trackShape(x, y, w, h, dir) {
      var thick = (dir === 'up' || dir === 'down') ? w : h, rf = Math.min(thick * 0.32, 14, Math.max(h, w) / 2);
      ctx.save();
      if (dir === 'up') rrCorners(ctx, x, y, w, h, rf, rf, 3, 3); else if (dir === 'right') rrCorners(ctx, x, y, w, h, 3, rf, rf, 3);
      else D.rrect(ctx, x, y, w, h, rf);
      ctx.fillStyle = P.dark ? 'rgba(255,255,255,.035)' : 'rgba(20,30,70,.04)'; ctx.fill();
      ctx.strokeStyle = P.dark ? 'rgba(150,180,255,.14)' : 'rgba(20,30,70,.10)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.restore();
    }
    function segsOf(r, len) {
      if (!r.parts) return [{ f0: 0, f1: 1, color: r.color }];
      var tot = 0, k; for (k = 0; k < r.parts.length; k++) tot += Math.max(0, nz(r.parts[k].value, 0));
      var out = [], acc = 0;
      for (k = 0; k < r.parts.length; k++) {
        var pv = Math.max(0, nz(r.parts[k].value, 0)), f0 = tot ? acc / tot : 0, f1 = tot ? (acc + pv) / tot : 1;
        out.push({ f0: f0, f1: f1, color: r.parts[k].color || r.color, label: r.parts[k].label }); acc += pv;
      }
      return out;
    }

    if (!horiz) {
      /* ---------- bare verticale ---------- */
      slot = (inner.w - axW) / Math.max(n, 1);
      var bw = clamp(slot * 0.56, 14, o.barW || 96), labH = 0, noteH = 0;
      for (i = 0; i < n; i++) {
        lines[i] = wrapText(ctx, rows[i].it.label || '', slot - 4 - 21, fsL, 650, false, 2);
        noteLines[i] = rows[i].it.note ? wrapText(ctx, rows[i].it.note, slot - 2, fsN, 600, false, 2) : [];
        labH = Math.max(labH, lines[i].length * (fsL + 3) + 9); noteH = Math.max(noteH, noteLines[i].length * 13);
      }
      var below = 9 + labH + (noteH ? noteH + 4 : 0);
      var pTop = inner.y + (showV ? 30 : 8), pBot = inner.y + inner.h - below;
      plot = { x: inner.x + axW, y: pTop, w: inner.w - axW, h: Math.max(30, pBot - pTop) };
      var vy = function (v) { return plot.y + plot.h - (v - vmin) / span * plot.h; };
      var by = vy(base);
      gridV(plot);
      floorLine(plot.x, by, plot.x + plot.w, by);
      for (i = 0; i < n; i++) {
        var r = rows[i], cxp = plot.x + slot * (i + 0.5), bx = cxp - bw / 2;
        var va = base + (r.v - base) * prog, up = va >= base;
        var yA = vy(Math.max(va, base)), yB = vy(Math.min(va, base)), hh = Math.max(0, yB - yA);
        if (o.track !== false) trackShape(bx, vy(vmax), bw, by - vy(vmax), 'up');
        if (hh > 0.5) {
          if (P.dark && hh > 6) A.glow(ctx, cxp, up ? yA : yB, bw * 0.95, r.color, 0.32);
          drawBar(ctx, P, bx, yA, bw, hh, up ? 'up' : 'down', r.color, segsOf(r, hh), o.t);
        }
        var topY = up ? yA : yB;
        if (showV) {
          var txt = r.it.valueText != null ? r.it.valueText : fmt(va);
          var cy2 = up ? topY - 16 : topY + 16;
          chip(ctx, txt, cxp, cy2, { mono: true, align: 'center', size: small ? 11 : 11.5, border: D.rgba(r.color, 0.9) });
        }
        var pill = labelPill(ctx, lines[i], cxp, by + 9, r.color, fsL, 'center');
        for (j = 0; j < noteLines[i].length; j++) rdraw(ctx, noteLines[i][j], cxp, pill.y + pill.h + 8 + j * 13, { size: fsN, weight: 600, color: P.tx2, align: 'center' });
        res.bars.push({ x: bx, y: yA, w: bw, h: hh, cx: cxp, cy: (yA + yB) / 2, top: { x: cxp, y: topY }, bottom: { x: cxp, y: by }, value: r.v, color: r.color, label: r.it.label });
      }
      res.vToY = vy;
    } else {
      /* ---------- bare orizontale ---------- */
      var maxLab = Math.min(W * 0.36, 170), labW = 0;
      slot = inner.h / Math.max(n, 1);
      for (i = 0; i < n; i++) {
        lines[i] = wrapText(ctx, rows[i].it.label || '', maxLab - 21, fsL, 650, false, 2);
        var lw0 = 0; for (j = 0; j < lines[i].length; j++) lw0 = Math.max(lw0, rwidth(ctx, lines[i][j], fsL, 650));
        labW = Math.max(labW, lw0 + 21);
      }
      var valW = showV ? 66 : 8;
      plot = { x: inner.x + labW + 12 + axW, y: inner.y + 4, w: inner.w - labW - 12 - axW - valW, h: inner.h - 8 - (o.axis ? 14 : 0) };
      slot = plot.h / Math.max(n, 1);
      var bh = clamp(slot * 0.56, 12, o.barW || 44);
      var vx = function (v) { return plot.x + (v - vmin) / span * plot.w; };
      var bx0 = vx(base);
      gridV(plot);
      floorLine(bx0, plot.y, bx0, plot.y + plot.h);
      for (i = 0; i < n; i++) {
        var r2 = rows[i], cyp = plot.y + slot * (i + 0.5), byy = cyp - bh / 2;
        var vb = base + (r2.v - base) * prog, right = vb >= base;
        var xA = vx(Math.min(vb, base)), xB = vx(Math.max(vb, base)), ww = Math.max(0, xB - xA);
        if (o.track !== false) trackShape(bx0, byy, vx(vmax) - bx0, bh, 'right');
        if (ww > 0.5) {
          if (P.dark && ww > 6) A.glow(ctx, right ? xB : xA, cyp, bh * 1.6, r2.color, 0.3);
          drawBar(ctx, P, xA, byy, ww, bh, right ? 'right' : 'left', r2.color, segsOf(r2, ww), o.t);
        }
        if (showV) chip(ctx, r2.it.valueText != null ? r2.it.valueText : fmt(vb), (right ? xB : xA) + (right ? 10 : -10), cyp, { mono: true, align: right ? 'left' : 'right', size: small ? 11 : 11.5, border: D.rgba(r2.color, 0.9) });
        var lh = lines[i].length * (fsL + 3) + 9;
        labelPill(ctx, lines[i], inner.x + labW, cyp - lh / 2, r2.color, fsL, 'right');
        res.bars.push({ x: xA, y: byy, w: ww, h: bh, cx: (xA + xB) / 2, cy: cyp, top: { x: right ? xB : xA, y: cyp }, bottom: { x: bx0, y: cyp }, value: r2.v, color: r2.color, label: r2.it.label });
      }
      res.vToX = vx;
    }
    res.plot = plot;
    return res;
  };

  /* ======================= A.speedBar ======================= */
  A.speedBar = function (ctx, x, y, w, o) {
    o = o || {};
    var P = pal(), mk = (o.markers || []).slice(), fills = (o.fills || []).slice(), i, k;
    if (o.fill != null && o.fill !== false) {
      var fo = typeof o.fill === 'object' ? o.fill : { v: o.fill };
      fills.unshift({ v0: 0, v1: nz(fo.v, 0), color: fo.color || P.s1 });
    }
    var maxV = 1;
    for (i = 0; i < mk.length; i++) maxV = Math.max(maxV, nz(mk[i].v, 0));
    for (i = 0; i < fills.length; i++) maxV = Math.max(maxV, nz(fills[i].v1, 0));
    var vmax = isN(o.max) ? Math.max(o.max, 1) : (maxV > 1.0001 ? Math.min(3, Math.ceil(maxV * 20) / 20 + 0.06) : 1);
    var th = o.h || clamp(w * 0.05, 15, 24), small = w < 300;
    function vToX(v) { return x + w * v / vmax; }
    function xToV(px_) { return (px_ - x) / w * vmax; }
    var ty0 = y - th / 2, wallX = vToX(1), hasOver = vmax > 1.0001, zx1 = Math.min(wallX, x + w);
    var t = reduced() ? 0 : (o.t || 0);

    /* ----- pista ----- */
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,.3)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 2;
    D.rrect(ctx, x, ty0, w, th, th / 2);
    ctx.fillStyle = P.dark ? '#0a1124' : '#e1e8f5'; ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.clip();
    ctx.fillStyle = A.lin(ctx, x, 0, zx1, 0, [[0, D.rgba(P.s1, P.dark ? 0.14 : 0.12)], [1, D.rgba(P.light, P.dark ? 0.32 : 0.3)]]);
    ctx.fillRect(x, ty0, zx1 - x, th);
    /* gradații fine în pistă */
    if (w / vmax >= 200) {
      ctx.fillStyle = P.dark ? 'rgba(200,215,245,.16)' : 'rgba(30,45,90,.16)';
      for (var mv = 0.1; mv < vmax - 1e-6; mv += 0.1) { var mx = vToX(mv); ctx.fillRect(mx - 0.5, ty0 + th - 5, 1, 5); }
    }
    for (i = 0; i < fills.length; i++) {
      var f = fills[i], fx0 = vToX(clamp(nz(f.v0, 0), 0, vmax)), fx1 = vToX(clamp(nz(f.v1, 0), 0, vmax)), fcol = f.color || P.s1, fw = fx1 - fx0;
      if (fw < 0.5) continue;
      var fh = th - 4, rEnd = fh / 2, rl = f.v0 <= 1e-9 ? rEnd : 2, rr_ = (i === fills.length - 1 || f.v1 >= vmax - 1e-9) ? rEnd : 2;
      ctx.save();
      ctx.shadowColor = D.rgba(fcol, 0.6); ctx.shadowBlur = 9;
      rrCorners(ctx, fx0 + (f.v0 <= 1e-9 ? 2 : 0), ty0 + 2, Math.max(1, fw - (f.v0 <= 1e-9 ? 2 : 0) - 2), fh, Math.min(rl, fw / 2), Math.min(rr_, fw / 2), Math.min(rr_, fw / 2), Math.min(rl, fw / 2));
      ctx.fillStyle = A.lin(ctx, 0, ty0 + 2, 0, ty0 + th - 2, [[0, A.lighten(fcol, 0.35)], [0.5, fcol], [1, A.darken(fcol, 0.3)]]);
      ctx.fill();
      ctx.restore();
      ctx.fillStyle = 'rgba(255,255,255,.26)';
      D.rrect(ctx, fx0 + 4, ty0 + 3.5, Math.max(0, fw - 8), fh * 0.34, fh * 0.17); ctx.fill();
    }
    if (hasOver) {
      ctx.fillStyle = D.rgba(P.bad, P.dark ? 0.2 : 0.16); ctx.fillRect(wallX, ty0, x + w - wallX, th);
      hatchRect(ctx, wallX, ty0, x + w - wallX, th, D.rgba(P.bad, 0.6), 6.5, 1.7);
    }
    ctx.fillStyle = A.lin(ctx, 0, ty0, 0, ty0 + th, [[0, 'rgba(0,0,0,.26)'], [0.5, 'rgba(0,0,0,0)'], [1, 'rgba(255,255,255,.07)']]);
    ctx.fillRect(x, ty0, w, th);
    ctx.restore();
    D.rrect(ctx, x + 0.5, ty0 + 0.5, w - 1, th - 1, th / 2);
    ctx.save(); ctx.strokeStyle = P.line2; ctx.lineWidth = 1.2; ctx.stroke(); ctx.restore();
    if (hasOver && o.overLabel !== false && (x + w - wallX) > 74) {
      rdraw(ctx, o.overLabel || 'imposibil', (wallX + x + w) / 2 + 1, y + 0.5, { size: 11, weight: 750, color: P.dark ? '#ffd0d0' : '#8f1d1d', align: 'center', halo: D.rgba(P.dark ? '#2a0c14' : '#ffe9e9', 0.85), haloW: 4 });
    }

    /* ----- zidul de la c ----- */
    var wallH = th + 18, pulse = 0.82 + 0.18 * Math.sin(t * 2.2);
    A.glow(ctx, wallX, y, th * 1.9 + 14, P.light, 0.8 * pulse);
    ctx.save();
    ctx.shadowColor = D.rgba(P.light, 0.95); ctx.shadowBlur = 10;
    D.rrect(ctx, wallX - 2.4, y - wallH / 2, 4.8, wallH, 2.4);
    ctx.fillStyle = A.lin(ctx, 0, y - wallH / 2, 0, y + wallH / 2, [[0, '#ffffff'], [0.5, A.lighten(P.light, 0.55)], [1, P.light]]);
    ctx.fill();
    ctx.restore();

    /* ----- gradații ----- */
    var tickY = ty0 + th + 3, labY = ty0 + th + 17;
    var tl = o.ticks;
    if (!tl) { tl = [0, 0.5, 1]; for (var tv = 1.5; tv <= vmax + 1e-6; tv += 0.5) tl.push(tv); if (vmax >= 2.5) tl = tl.filter(function (q) { return q === 0 || q === 1 || q % 1 === 0; }); }
    var tcol = tickColor(P), haloT = D.rgba(P.dark ? P.bg : P.bg, 0.85);
    ctx.save(); ctx.strokeStyle = tcol; ctx.lineWidth = 1.3; ctx.lineCap = 'round'; ctx.beginPath();
    for (i = 0; i < tl.length; i++) { var tx = vToX(tl[i]); if (tx > x + w + 1) continue; ctx.moveTo(tx, tickY); ctx.lineTo(tx, tickY + 4); }
    ctx.stroke(); ctx.restore();

    /* ----- marcaje: nivelare ca să nu se suprapună ----- */
    var chipH = 22, size = small ? 11 : 11.5, bounds = o.bounds, cvW = 0;
    try { var tr0 = ctx.getTransform(); if (tr0.a > 0) cvW = ctx.canvas.width / tr0.a; } catch (e) { cvW = 0; }
    var bx0 = bounds ? bounds.x0 : 6, bx1 = bounds ? bounds.x1 : (cvW || x + w + 400) - 6;
    var items = [];
    for (i = 0; i < mk.length; i++) {
      var mm = mk[i], over = nz(mm.v, 0) > 1.0001, col = mm.color || (over ? P.bad : P.s1);
      var badge = mm.badge === undefined ? (over ? 'no' : null) : mm.badge;
      var copt = { dot: badge ? null : col, badge: badge, size: size };
      var cw = chipW(ctx, mm.label || '', copt);
      items.push({ m: mm, X: vToX(clamp(nz(mm.v, 0), 0, vmax)), side: mm.side === 'down' ? 'down' : 'up', col: col, cw: cw, copt: copt, level: 0, badge: badge });
    }
    ['up', 'down'].forEach(function (sd) {
      var list = items.filter(function (it) { return it.side === sd; }).sort(function (a, b) { return a.X - b.X; }), ends = [];
      list.forEach(function (it) {
        var left = clamp(it.X - it.cw / 2, bx0, Math.max(bx0, bx1 - it.cw)), lv = 0;
        while (ends[lv] != null && left < ends[lv] + 7) lv++;
        ends[lv] = left + it.cw; it.level = lv; it.left = left;
      });
    });
    var topY = ty0 - 14, botY = labY + 8, out = [];
    /* tijele (sub chip-uri) */
    for (i = 0; i < items.length; i++) {
      var it = items[i], up = it.side === 'up';
      var cyc = up ? ty0 - 12 - chipH / 2 - it.level * (chipH + 6) : labY + 12 + chipH / 2 + it.level * (chipH + 6);
      it.cy = cyc;
      ctx.save();
      ctx.strokeStyle = D.rgba(it.col, 0.9); ctx.lineWidth = 2; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(it.X, y); ctx.lineTo(it.X, cyc); ctx.stroke();
      ctx.restore();
      topY = Math.min(topY, cyc - chipH / 2); botY = Math.max(botY, cyc + chipH / 2);
    }
    /* etichetele gradațiilor, peste tije */
    for (i = 0; i < tl.length; i++) {
      var tvv = tl[i], txx = vToX(tvv);
      if (txx > x + w + 1) continue;
      var isC = Math.abs(tvv - 1) < 1e-9, ltxt = Math.abs(tvv) < 1e-9 ? '0' : isC ? 'c' : fmtN(tvv, dec(tvv)) + ' c';
      rdraw(ctx, ltxt, txx, labY, { size: small ? 10.5 : 11, weight: isC ? 800 : 600, mono: true, color: isC ? P.light : tcol, align: 'center', halo: haloT, haloW: 4 });
    }
    /* capete ("thumbs") pe pistă */
    for (i = 0; i < items.length; i++) {
      var q = items[i], hr = th * 0.5 + 1.5;
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,.45)'; ctx.shadowBlur = 7; ctx.shadowOffsetY = 1.5;
      ctx.fillStyle = P.dark ? '#f5f8ff' : '#ffffff'; ctx.beginPath(); ctx.arc(q.X, y, hr, 0, TAU); ctx.fill();
      ctx.restore();
      A.glow(ctx, q.X, y, hr * 3.2, q.col, 0.38);
      ctx.fillStyle = A.rad(ctx, q.X, y, 0, hr, [[0, A.lighten(q.col, 0.6)], [0.5, q.col], [1, A.darken(q.col, 0.32)]], q.X - hr * 0.3, y - hr * 0.35);
      ctx.beginPath(); ctx.arc(q.X, y, hr - 2.6, 0, TAU); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.beginPath(); ctx.ellipse(q.X - hr * 0.25, y - hr * 0.32, hr * 0.22, hr * 0.12, -0.6, 0, TAU); ctx.fill();
    }
    /* chip-uri */
    for (i = 0; i < items.length; i++) {
      var c = items[i], cb = chip(ctx, c.m.label || '', c.left, c.cy, { dot: c.badge ? null : c.col, badge: c.badge, size: size, border: D.rgba(c.col, 0.9) });
      out.push({ x: c.X, y: c.cy, chip: cb, v: c.m.v });
    }
    return { vToX: vToX, xToV: xToV, x: x, y: y, w: w, h: th, wallX: wallX, vmax: vmax, top: topY, bottom: botY, markers: out };
  };

  /* ======================= A.energyTriangle ======================= */
  A.energyTriangle = function (ctx, rect, o) {
    o = o || {};
    var P = pal(), X0 = rect.x, Y0 = rect.y, W = Math.max(rect.w, 90), H = Math.max(rect.h, 90), small = W < 340;
    var E = o.E, pc = o.pc, E0 = o.E0, hE = isN(E), hP = isN(pc), h0 = isN(E0);
    if (hP && h0) { /* catetele determină ipotenuza */ }
    else if (hE && hP) E0 = Math.sqrt(Math.max(0, E * E - pc * pc));
    else if (hE && h0) pc = Math.sqrt(Math.max(0, E * E - E0 * E0));
    else if (hE) { pc = 0.8 * E; E0 = 0.6 * E; }
    else if (hP) E0 = pc ? pc * 0.75 : 1;
    else if (h0) pc = E0 * 0.75;
    else { pc = 0.75; E0 = 1; }
    pc = Math.max(0, pc); E0 = Math.max(0, E0); E = Math.hypot(pc, E0);
    var mx = isN(o.max) ? o.max : E;
    var maxPc = Math.max(nz(o.maxPc, mx), pc, 1e-9), maxE0 = Math.max(nz(o.maxE0, mx), E0, 1e-9);

    var fmt = o.fmt || function (v) { return fmtN(v, Math.abs(v) >= 100 ? 0 : Math.abs(v) >= 10 ? 1 : 2); };
    var unit = o.unit ? ' ' + o.unit : '';
    var lab = o.labels === false ? null : (o.labels || {});
    var nm = {
      E: lab ? (lab.E != null ? lab.E : (o.values ? 'E' : 'E = mc²')) : null,
      pc: lab ? (lab.pc != null ? lab.pc : 'pc') : null,
      E0: lab ? (lab.E0 != null ? lab.E0 : 'm_{0}c²') : null
    };
    var txt = {
      E: nm.E == null ? null : (o.values ? nm.E + ' = ' + fmt(E) + unit : nm.E),
      pc: nm.pc == null ? null : (o.values ? nm.pc + ' = ' + fmt(pc) + unit : nm.pc),
      E0: nm.E0 == null ? null : (o.values ? nm.E0 + ' = ' + fmt(E0) + unit : nm.E0)
    };
    var cs = small ? 11 : 12, cwE = txt.E ? chipW(ctx, txt.E, { dot: true, size: cs }) : 0, cw0 = txt.E0 ? chipW(ctx, txt.E0, { dot: true, size: cs }) : 0;
    if (o.panel !== false) panel(ctx, X0, Y0, W, H, P, o.radius);
    var padL = 14 + (cwE ? cwE * 0.9 : 0), padR = 18 + (cw0 ? cw0 + 12 : 0), padT = 22, padB = 22 + (txt.pc ? 26 : 0);
    var inner = { x: X0 + padL, y: Y0 + padT, w: Math.max(40, W - padL - padR), h: Math.max(40, H - padT - padB) };
    var s = Math.min(inner.w / maxPc, inner.h / maxE0);
    var ax = inner.x, ay = inner.y + inner.h, bx = ax + pc * s, by = ay, cx = bx, cy = ay - E0 * s;
    var sw = clamp(Math.min(W, H) * 0.028, 5, 9);
    var phi = Math.atan2(E0, pc);
    var pcL = pc * s, e0L = E0 * s, eL = E * s;

    /* interior */
    if (pcL > 1 && e0L > 1) {
      ctx.save();
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.lineTo(cx, cy); ctx.closePath();
      ctx.fillStyle = A.lin(ctx, ax, cy, bx, ay, [[0, D.rgba(P.light, P.dark ? 0.2 : 0.16)], [0.6, D.rgba(P.acc2, P.dark ? 0.1 : 0.07)], [1, D.rgba(P.s1, P.dark ? 0.12 : 0.08)]]);
      ctx.fill();
      ctx.restore();
    }
    /* ghost: scara maximă (axe punctate discrete) */
    ctx.save();
    ctx.strokeStyle = P.dark ? 'rgba(150,180,255,.22)' : 'rgba(20,30,70,.16)'; ctx.lineWidth = 1.7; ctx.lineCap = 'round'; ctx.setLineDash([0.1, 4.6]);
    ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ax + maxPc * s, ay); ctx.moveTo(ax, ay); ctx.lineTo(ax, ay - maxE0 * s); ctx.stroke();
    ctx.restore();
    /* unghi la A */
    var ar = clamp(Math.min(pcL, eL) * 0.3, 16, 46), showArc = pcL > 38 && e0L > 20 && phi > 0.06;
    if (showArc) {
      ctx.save();
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.arc(ax, ay, ar, -phi, 0, false); ctx.closePath();
      ctx.fillStyle = D.rgba(P.light, 0.26); ctx.fill();
      ctx.strokeStyle = P.light; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(ax, ay, ar, -phi, 0, false); ctx.stroke();
      ctx.restore();
    }
    /* laturile (gros, rotunjit, cu strălucire) */
    function side(x0, y0, x1, y1, col) {
      var len = Math.hypot(x1 - x0, y1 - y0);
      if (len < 0.8) return;
      ctx.save();
      ctx.lineCap = 'round';
      if (P.dark) { ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = D.rgba(col, 0.16); ctx.lineWidth = sw * 3.4; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.globalCompositeOperation = 'source-over'; }
      else { ctx.strokeStyle = D.rgba(col, 0.16); ctx.lineWidth = sw * 2.6; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); }
      ctx.strokeStyle = D.rgba(A.darken(col, 0.5), 0.55); ctx.lineWidth = sw + 2; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
      ctx.strokeStyle = A.lin(ctx, x0, y0, x1, y1, [[0, A.lighten(col, 0.28)], [1, col]]); ctx.lineWidth = sw; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
      ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = Math.max(1.2, sw * 0.28);
      var nx = (y1 - y0) / len, ny = -(x1 - x0) / len, k = -sw * 0.2;                 /* spre stânga-sus */
      if (nx > 0 || (nx === 0 && ny > 0)) k = -k;
      ctx.beginPath(); ctx.moveTo(x0 + nx * k, y0 + ny * k); ctx.lineTo(x1 + nx * k, y1 + ny * k); ctx.stroke();
      ctx.restore();
    }
    side(ax, ay, bx, by, P.s1);
    side(bx, by, cx, cy, P.s2);
    side(ax, ay, cx, cy, P.light);
    /* unghi drept la B */
    if (pcL > 24 && e0L > 24) {
      var ra = clamp(Math.min(pcL, e0L) * 0.2, 7, 13);
      ctx.save();
      ctx.fillStyle = D.rgba(P.tx, 0.1); ctx.fillRect(bx - ra, by - ra - sw * 0.5, ra, ra);
      ctx.strokeStyle = D.rgba(P.tx, 0.85); ctx.lineWidth = 1.5; ctx.lineJoin = 'round';
      ctx.beginPath(); ctx.moveTo(bx - ra, by - sw * 0.5); ctx.lineTo(bx - ra, by - ra - sw * 0.5); ctx.lineTo(bx, by - ra - sw * 0.5); ctx.stroke();
      ctx.restore();
    }
    /* vârfuri */
    [[ax, ay, P.light], [bx, by, P.s1], [cx, cy, P.light]].forEach(function (v, idx) {
      if (idx === 1 && pcL < 2) return;
      ctx.fillStyle = A.rad(ctx, v[0], v[1], 0, sw * 0.9, [[0, '#ffffff'], [1, A.lighten(v[2], 0.4)]]);
      ctx.beginPath(); ctx.arc(v[0], v[1], sw * 0.62, 0, TAU); ctx.fill();
    });
    if (showArc && o.angleLabel !== false) {
      var am = -phi / 2, lr = ar + 13;
      rdraw(ctx, o.angleLabel || 'θ', ax + Math.cos(am) * lr, ay + Math.sin(am) * lr, { size: 13.5, weight: 750, color: P.light, align: 'center', halo: D.rgba(P.card, 0.85), haloW: 4 });
    }
    /* etichete */
    var mid = { E: { x: (ax + cx) / 2, y: (ay + cy) / 2 }, pc: { x: (ax + bx) / 2, y: ay }, E0: { x: bx, y: (by + cy) / 2 } };
    if (txt.E && eL > 14) {
      var dxh = (cx - ax) / eL, dyh = (cy - ay) / eL, nx2 = dyh, ny2 = -dxh, hE_ = Math.round(cs + 10);
      var off = sw / 2 + 8 + Math.abs(nx2) * cwE / 2 + Math.abs(ny2) * hE_ / 2;
      var qx = clamp(mid.E.x + nx2 * off, X0 + 6 + cwE / 2, X0 + W - 6 - cwE / 2), qy = clamp(mid.E.y + ny2 * off, Y0 + 6 + hE_ / 2, Y0 + H - 6 - hE_ / 2);
      chip(ctx, txt.E, qx, qy, { dot: P.light, align: 'center', size: cs });
    }
    if (txt.pc && pcL > 30) chip(ctx, txt.pc, mid.pc.x, ay + sw / 2 + 11 + 11, { dot: P.s1, align: 'center', size: cs });
    if (txt.E0 && e0L > 26) chip(ctx, txt.E0, bx + sw / 2 + 10, mid.E0.y, { dot: P.s2, align: 'left', size: cs });
    return { pts: { a: { x: ax, y: ay }, b: { x: bx, y: by }, c: { x: cx, y: cy } }, scale: s, theta: phi, E: E, pc: pc, E0: E0, mid: mid, inner: inner };
  };

  /* ======================= A.axes2D ======================= */
  A.axes2D = function (ctx, rect, o) {
    o = o || {};
    var P = pal(), X0 = rect.x, Y0 = rect.y, W = Math.max(rect.w, 100), H = Math.max(rect.h, 100), small = W < 340, i;
    var m = small ? 8 : 10, plot = { x: X0 + m, y: Y0 + m, w: W - 2 * m, h: H - 2 * m };
    var half = nz(o.half, 5), s = isN(o.scale) ? o.scale : plot.w / (2 * half);
    var ox = plot.x + plot.w * (o.origin ? nz(o.origin.x, 0.5) : 0.5), oy = plot.y + plot.h * (o.origin ? nz(o.origin.y, 0.5) : 0.5);
    var ang = nz(o.angle, 0), ca = Math.cos(ang), sa = Math.sin(ang);
    function px(x_) { return ox + x_ * s; }
    function py(y_) { return oy - y_ * s; }
    function ix(p) { return (p - ox) / s; }
    function iy(p) { return (oy - p) / s; }
    function toPx(x_, y_) { return { x: px(x_), y: py(y_) }; }
    function rot(x_, y_) { return { x: x_ * ca + y_ * sa, y: -x_ * sa + y_ * ca }; }
    function rotPx(xp, yp) { return toPx(xp * ca - yp * sa, xp * sa + yp * ca); }
    var lb = o.labels || {}, fmt = o.fmt || function (v) { return fmtN(v, 1); };
    var proj = o.proj === undefined ? 'both' : o.proj;
    if (o.panel !== false) panel(ctx, X0, Y0, W, H, P, o.radius);

    ctx.save();
    D.rrect(ctx, plot.x, plot.y, plot.w, plot.h, 10); ctx.clip();
    var Lu = Math.hypot(plot.w, plot.h) / s, K = Math.ceil(Lu) + 1;
    /* grila reperului fix + a celui rotit (punctate) */
    ctx.lineCap = 'round'; ctx.setLineDash([0.1, 4.6]); ctx.lineWidth = 1.7;
    ctx.strokeStyle = P.dark ? 'rgba(150,180,255,.20)' : 'rgba(20,30,70,.15)';
    ctx.beginPath();
    var kx0 = Math.ceil(ix(plot.x)), kx1 = Math.floor(ix(plot.x + plot.w)), ky0 = Math.ceil(iy(plot.y + plot.h)), ky1 = Math.floor(iy(plot.y));
    for (i = kx0; i <= kx1; i++) { if (i === 0) continue; ctx.moveTo(px(i), plot.y); ctx.lineTo(px(i), plot.y + plot.h); }
    for (i = ky0; i <= ky1; i++) { if (i === 0) continue; ctx.moveTo(plot.x, py(i)); ctx.lineTo(plot.x + plot.w, py(i)); }
    ctx.stroke();
    if (Math.abs(ang) > 0.02) {
      ctx.strokeStyle = D.rgba(P.s2, P.dark ? 0.34 : 0.3);
      ctx.beginPath();
      for (i = -K; i <= K; i++) {
        if (i === 0) continue;
        var a1 = rotPx(-Lu, i), a2 = rotPx(Lu, i); ctx.moveTo(a1.x, a1.y); ctx.lineTo(a2.x, a2.y);
        var b1 = rotPx(i, -Lu), b2 = rotPx(i, Lu); ctx.moveTo(b1.x, b1.y); ctx.lineTo(b2.x, b2.y);
      }
      ctx.stroke();
    }
    ctx.restore();

    /* ieșirea unei raze din plot (pentru vârfurile săgeților) */
    function exitPt(dx, dy, inset) {
      var t = 1e9;
      if (dx > 1e-9) t = Math.min(t, (plot.x + plot.w - inset - ox) / dx); else if (dx < -1e-9) t = Math.min(t, (plot.x + inset - ox) / dx);
      if (dy > 1e-9) t = Math.min(t, (plot.y + plot.h - inset - oy) / dy); else if (dy < -1e-9) t = Math.min(t, (plot.y + inset - oy) / dy);
      return { x: ox + dx * t, y: oy + dy * t, t: t };
    }
    function axis(dx, dy, col, lw, name, glow, labelSide) {
      var e1 = exitPt(dx, dy, 7), e0 = exitPt(-dx, -dy, 7);
      ctx.save();
      ctx.lineCap = 'round';
      if (glow) { if (P.dark) ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = D.rgba(col, P.dark ? 0.16 : 0.14); ctx.lineWidth = lw * 4; ctx.beginPath(); ctx.moveTo(e0.x, e0.y); ctx.lineTo(e1.x, e1.y); ctx.stroke(); ctx.globalCompositeOperation = 'source-over'; }
      ctx.strokeStyle = col; ctx.lineWidth = lw;
      ctx.beginPath(); ctx.moveTo(e0.x, e0.y); ctx.lineTo(e1.x - dx * 6, e1.y - dy * 6); ctx.stroke();
      ctx.restore();
      arrowhead(ctx, e1.x, e1.y, Math.atan2(dy, dx), 10, 9, col);
      if (name) {
        var px_ = -dy * labelSide, py_ = dx * labelSide;
        rdraw(ctx, name, e1.x - dx * 17 + px_ * 13, e1.y - dy * 17 + py_ * 13, { size: 14, weight: 750, color: col, align: 'center', halo: D.rgba(P.card, 0.8), haloW: 4 });
      }
    }
    axis(1, 0, D.rgba(P.s1, 0.85), 1.9, lb.x != null ? lb.x : 'x', false, -1);
    axis(0, -1, D.rgba(P.s1, 0.85), 1.9, lb.y != null ? lb.y : 'y', false, 1);
    axis(ca, -sa, P.s2, 2.6, lb.xp != null ? lb.xp : 'x′', true, 1);
    axis(-sa, -ca, P.s2, 2.6, lb.yp != null ? lb.yp : 'y′', true, -1);

    /* unghiul de rotație */
    if (Math.abs(ang) > 0.03) {
      var ra = clamp(Math.min(plot.w, plot.h) * 0.14, 24, 48), a0 = Math.min(0, -ang), a1_ = Math.max(0, -ang);
      ctx.save();
      ctx.beginPath(); ctx.moveTo(ox, oy); ctx.arc(ox, oy, ra, a0, a1_, false); ctx.closePath();
      ctx.fillStyle = D.rgba(P.s2, 0.22); ctx.fill();
      ctx.strokeStyle = P.s2; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(ox, oy, ra, a0, a1_, false); ctx.stroke();
      ctx.restore();
      var am = (a0 + a1_) / 2, lrr = ra + 13;
      var atxt = o.angleLabel === false ? null : (o.angleLabel != null ? o.angleLabel : (o.showAngle ? 'α = ' + RF.fmt.n(Math.abs(ang) * 180 / Math.PI, 0) + '°' : 'α'));
      if (atxt) rdraw(ctx, atxt, ox + Math.cos(am) * lrr, oy + Math.sin(am) * lrr, { size: 13, weight: 750, color: P.s2, align: o.showAngle ? 'left' : 'center', halo: D.rgba(P.card, 0.85), haloW: 4 });
    }

    /* punctele, segmentul și proiecțiile */
    var pts = (o.points && o.points.length >= 2) ? o.points : [{ x: -2.1, y: -0.8, label: 'A' }, { x: 2.3, y: 1.7, label: 'B' }];
    var Ap = pts[0], Bp = pts[1], a = toPx(Ap.x, Ap.y), b = toPx(Bp.x, Bp.y);
    var dxv = Bp.x - Ap.x, dyv = Bp.y - Ap.y, dist = Math.hypot(dxv, dyv), rr = rot(dxv, dyv);
    var F = toPx(Bp.x, Ap.y), R = toPx(Ap.x + rr.x * ca, Ap.y + rr.x * sa);
    var cs = small ? 11 : 11.5;
    function leg(p, q, t, col, name, val, key) {
      var len = Math.hypot(q.x - p.x, q.y - p.y);
      ctx.save();
      ctx.strokeStyle = D.rgba(col, 0.95); ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.setLineDash([6, 5]);
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
      ctx.restore();
      if (len < 22 || o.labels === false) return;
      var mx_ = (p.x + q.x) / 2, my_ = (p.y + q.y) / 2, ux = (q.x - p.x) / len, uy = (q.y - p.y) / len, nx = -uy, ny = ux;
      if (nx * (mx_ - t.x) + ny * (my_ - t.y) < 0) { nx = -nx; ny = -ny; }
      var txt_ = o.values ? name + ' = ' + fmtN(val, 1) : name, w_ = chipW(ctx, txt_, { dot: col, size: cs }), h_ = Math.round(cs + 10);
      var off = 12 + Math.abs(nx) * w_ / 2 + Math.abs(ny) * h_ / 2;
      chip(ctx, txt_, clamp(mx_ + nx * off, plot.x + w_ / 2 + 2, plot.x + plot.w - w_ / 2 - 2), clamp(my_ + ny * off, plot.y + h_ / 2 + 2, plot.y + plot.h - h_ / 2 - 2), { dot: col, align: 'center', size: cs });
    }
    function square(c, p, q, col) {
      var l1 = Math.hypot(p.x - c.x, p.y - c.y), l2 = Math.hypot(q.x - c.x, q.y - c.y);
      if (l1 < 14 || l2 < 14) return;
      var u1x = (p.x - c.x) / l1, u1y = (p.y - c.y) / l1, u2x = (q.x - c.x) / l2, u2y = (q.y - c.y) / l2, r_ = 7;
      ctx.save(); ctx.strokeStyle = D.rgba(col, 0.9); ctx.lineWidth = 1.4; ctx.lineJoin = 'round';
      ctx.beginPath(); ctx.moveTo(c.x + u1x * r_, c.y + u1y * r_); ctx.lineTo(c.x + (u1x + u2x) * r_, c.y + (u1y + u2y) * r_); ctx.lineTo(c.x + u2x * r_, c.y + u2y * r_); ctx.stroke(); ctx.restore();
    }
    if (proj === 'both' || proj === 'fixed') { square(F, a, b, P.s1); leg(a, F, b, P.s1, 'Δx', dxv); leg(F, b, a, P.s1, 'Δy', dyv); }
    if ((proj === 'both' || proj === 'rot') && Math.abs(ang) > 0.02) { square(R, a, b, P.s2); leg(a, R, b, P.s2, 'Δx′', rr.x); leg(R, b, a, P.s2, 'Δy′', rr.y); }
    /* segmentul = distanța (invariantă) */
    ctx.save();
    ctx.lineCap = 'round';
    if (P.dark) ctx.globalCompositeOperation = 'lighter';
    ctx.strokeStyle = D.rgba(P.good, P.dark ? 0.2 : 0.2); ctx.lineWidth = 11; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = P.good; ctx.lineWidth = 3.6; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,.45)'; ctx.lineWidth = 1.1; ctx.beginPath(); ctx.moveTo(a.x - 0.6, a.y - 0.8); ctx.lineTo(b.x - 0.6, b.y - 0.8); ctx.stroke();
    ctx.restore();
    var dl = Math.hypot(b.x - a.x, b.y - a.y);
    if (o.labels !== false && dl > 26) {
      var dn = { x: -(b.y - a.y) / dl, y: (b.x - a.x) / dl };
      if (dn.x * ((a.x + b.x) / 2 - (F.x)) + dn.y * ((a.y + b.y) / 2 - (F.y)) < 0) { dn.x = -dn.x; dn.y = -dn.y; }
      var dtxt = (o.dLabel != null ? o.dLabel : 'd') + (o.values ? ' = ' + fmtN(dist, 1) : ''), dw = chipW(ctx, dtxt, { dot: P.good, size: cs }), dh = Math.round(cs + 10);
      var doff = 12 + Math.abs(dn.x) * dw / 2 + Math.abs(dn.y) * dh / 2;
      chip(ctx, dtxt, clamp((a.x + b.x) / 2 + dn.x * doff, plot.x + dw / 2 + 2, plot.x + plot.w - dw / 2 - 2), clamp((a.y + b.y) / 2 + dn.y * doff, plot.y + dh / 2 + 2, plot.y + plot.h - dh / 2 - 2), { dot: P.good, align: 'center', size: cs, bg: D.rgba(P.card, 0.96) });
    }
    [[a, b, Ap], [b, a, Bp]].forEach(function (pp) {
      var p = pp[0], q = pp[1], dd = Math.hypot(p.x - q.x, p.y - q.y) || 1, r_ = small ? 5.5 : 6.5;
      A.glow(ctx, p.x, p.y, r_ * 4, P.acc2, 0.5);
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,.4)'; ctx.shadowBlur = 6; ctx.shadowOffsetY = 1.5;
      ctx.fillStyle = P.dark ? '#f5f8ff' : '#ffffff'; ctx.beginPath(); ctx.arc(p.x, p.y, r_ + 2.6, 0, TAU); ctx.fill();
      ctx.restore();
      ctx.fillStyle = A.rad(ctx, p.x, p.y, 0, r_ * 1.05, [[0, A.lighten(P.acc2, 0.6)], [0.5, P.acc2], [1, A.darken(P.acc2, 0.3)]], p.x - r_ * 0.3, p.y - r_ * 0.35);
      ctx.beginPath(); ctx.arc(p.x, p.y, r_, 0, TAU); ctx.fill();
      if (pp[2].label) rdraw(ctx, pp[2].label, p.x + (p.x - q.x) / dd * 17, p.y + (p.y - q.y) / dd * 17, { size: 14, weight: 800, color: P.tx, align: 'center', halo: D.rgba(P.card, 0.85), haloW: 4 });
    });

    return {
      px: px, py: py, ix: ix, iy: iy, toPx: toPx, rot: rot, rotPx: rotPx, scale: s, origin: { x: ox, y: oy }, plot: plot,
      A: a, B: b, d: dist, dx: dxv, dy: dyv, dxp: rr.x, dyp: rr.y, angle: ang
    };
  };

  /* @@PART3@@ */

  /* ======================= galerie: grafice ======================= */
  function stage(ctx, W, H, t) { D.clear({ ctx: ctx, W: W, H: H }); return reduced() ? 0 : t; }
  function inset(W, H, m) { m = m == null ? 6 : m; return { x: m, y: m, w: W - 2 * m, h: H - 2 * m }; }

  A.gallery.push({
    name: 'Grafic γ(β)', src: 'art-graph.js', w: 560, h: 330, draw: function (ctx, W, H, t) {
      var P = pal(); t = stage(ctx, W, H, t);
      var gam = function (b) { return 1 / Math.sqrt(1 - b * b); };
      var g = A.graph(ctx, inset(W, H), { xmin: 0, xmax: 1, ymin: 1, ymax: 8, xlabel: 'viteza  β = v/c', ylabel: 'factorul γ', xticks: [0, 0.2, 0.4, 0.6, 0.8, 1], yticks: 7 });
      g.band(0, 0.12, { color: P.good, label: 'viteze obișnuite', alpha: 0.2 });
      g.vline(1, { color: P.light, label: 'c' });
      g.curve(gam, { color: P.acc });
      g.point(0.9, gam(0.9), { color: P.acc2, r: 4.5, halo: false, label: '0,9 c → γ = 2,3', labelPos: 'right' });
      var b = 0.55 + 0.4 * Math.sin(t * 0.7);
      g.point(b, gam(b), { drop: true, label: 'γ = ' + RF.fmt.n(gam(b), 2), t: t, color: P.light });
    }
  });

  A.gallery.push({
    name: 'Grafic v(t): Newton și relativist', src: 'art-graph.js', w: 560, h: 330, draw: function (ctx, W, H, t) {
      var P = pal(); t = stage(ctx, W, H, t);
      var newton = function (x) { return x; }, rel = function (x) { return x / Math.sqrt(1 + x * x); };
      var g = A.graph(ctx, inset(W, H), { xmin: 0, xmax: 3, ymin: 0, ymax: 1.5, xlabel: 'timpul cât împingi', ylabel: 'viteza  v / c', xticks: 3, yticks: [0, 0.5, { v: 1, label: 'c' }, 1.5] });
      g.hband(1, 1.5, { color: P.bad, hatch: true, label: 'interzis: v > c' });
      g.hline(1, { color: P.light });
      g.curve(newton, { color: P.bad, dash: [8, 6], fill: false, glow: false });
      g.curve(rel, { color: P.good });
      var x = (t * 0.45) % 3.4; x = Math.min(x, 3);
      g.span(x, rel(x), Math.min(newton(x), 1.5), { color: P.tx2, label: 'diferența', side: 'right' });
      g.point(x, rel(x), { color: P.good, t: t });
      if (newton(x) < 1.5) g.point(x, newton(x), { color: P.bad, halo: false, r: 5 });
      g.legend([{ color: P.bad, label: 'Newton: v = a·t', dash: true }, { color: P.good, label: 'relativist' }], { pos: 'bl' });
    }
  });

  A.gallery.push({
    name: 'Grafic I–U (efect fotoelectric)', src: 'art-graph.js', w: 560, h: 330, draw: function (ctx, W, H, t) {
      var P = pal(); t = stage(ctx, W, H, t);
      var Us = -1.4;
      function cur(Is) { return function (U) { var x = (U - Us) / (3.6 - Us); return U <= Us ? 0 : Is * (x >= 1 ? 1 : 3 * x * x - 2 * x * x * x); }; }
      var g = A.graph(ctx, inset(W, H), { xmin: -3, xmax: 6, ymin: 0, ymax: 1.3, xlabel: 'tensiunea U (V)', ylabel: 'curentul I (µA)', xticks: 9, yticks: [0, 0.5, 1] });
      g.vline(Us, { color: P.warn, label: 'U_{s}' });
      g.curve(cur(1), { color: P.light });
      g.curve(cur(0.5), { color: P.light, dash: [7, 5], fill: false });
      g.hline(1, { color: P.light, dash: [2, 5], label: 'I_{sat}', labelAt: 'left' });
      var U = 1.4 + 3.6 * Math.sin(t * 0.8);
      g.point(U, cur(1)(U), { color: P.light, drop: true, t: t });
      g.legend([{ color: P.light, label: 'intensitate mare' }, { color: P.light, label: 'intensitate mică', dash: true }], { pos: 'br' });
    }
  });

  A.gallery.push({
    name: 'Grafic E_c(ν) (efect fotoelectric)', src: 'art-graph.js', w: 560, h: 340, draw: function (ctx, W, H, t) {
      var P = pal(); t = stage(ctx, W, H, t);
      var h = 0.4136, cs = 2.1, zn = 4.3, n0 = cs / h, n1 = zn / h;
      var g = A.graph(ctx, inset(W, H), { xmin: 0, xmax: 14, ymin: -5, ymax: 4, xlabel: 'frecvența ν (×10¹⁴ Hz)', ylabel: 'E_{c} (eV)', xticks: 7, yticks: [-4, -2, 0, 2, 4] });
      g.curve(function (x) { return h * x - cs; }, { color: P.light, from: 0, to: n0, dash: [4, 6], fill: false, glow: false, alpha: 0.7 });
      g.curve(function (x) { return h * x - zn; }, { color: P.acc2, from: 0, to: n1, dash: [4, 6], fill: false, glow: false, alpha: 0.7 });
      g.curve(function (x) { return h * x - cs; }, { color: P.light, from: n0, fill: false });
      g.curve(function (x) { return h * x - zn; }, { color: P.acc2, from: n1, fill: false });
      g.dots([[6.6, 0.62], [8.1, 1.3], [9.9, 2.05], [11.4, 2.66], [13.2, 3.42]], { color: P.light, r: 4 });
      g.span(0, -cs, 0, { color: P.light, label: '−L_{ex}', side: 'right' });
      g.point(n0, 0, { color: P.light, label: 'ν_{0}', labelPos: 'up', r: 5 });
      var nu = 7 + 6 * (0.5 + 0.5 * Math.sin(t * 0.8));
      g.point(nu, h * nu - cs, { color: P.light, t: t, drop: 'x' });
      g.legend([{ color: P.light, label: 'cesiu' }, { color: P.acc2, label: 'zinc' }], { pos: 'tl' });
    }
  });
})(window);
