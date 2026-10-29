/* ==========================================================================
   Relativitate & Fotoni — home.js
   Pagina de start (hero, continuă, harta, carduri), testul final (harta
   stăpânirii), fișa de recapitulare și glosarul.
   ========================================================================== */
(function (global) {
  'use strict';
  var RF = global.RF, el = RF.el;
  RF.home = {};

  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function readPct(c) { return Math.round(RF.store.readFrac(c.id) * 100); }
  function hasBank(c) { return !!(c.quiz && c.quiz.length); }

  /* ---------- artă pentru hero: un mic diagram spațiu-timp ---------- */
  function heroArt() {
    var cx = 200, cy = 190, s = '';
    function hyper(a, timelike, sign) {
      var R = 150, umax = Math.log(R / a + Math.sqrt((R / a) * (R / a) - 1)), pts = [];
      for (var u = -umax; u <= umax + 1e-9; u += umax / 14) {
        var x = timelike ? a * Math.sinh(u) : sign * a * Math.cosh(u);
        var y = timelike ? sign * a * Math.cosh(u) : a * Math.sinh(u);
        pts.push((cx + x).toFixed(1) + ',' + (cy - y).toFixed(1));
      }
      return 'M' + pts.join(' L');
    }
    s += '<defs><filter id="hg" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>';
    [45, 85, 125].forEach(function (a, i) {
      [1, -1].forEach(function (sg) {
        s += '<path d="' + hyper(a, true, sg) + '" fill="none" stroke="var(--acc)" stroke-opacity="' + (0.62 - i * 0.14) + '" stroke-width="1.6"/>';
        s += '<path d="' + hyper(a, false, sg) + '" fill="none" stroke="var(--acc2)" stroke-opacity="' + (0.62 - i * 0.14) + '" stroke-width="1.6"/>';
      });
    });
    s += '<line x1="20" y1="' + cy + '" x2="380" y2="' + cy + '" stroke="var(--line2)" stroke-width="1.4"/>';
    s += '<line x1="' + cx + '" y1="20" x2="' + cx + '" y2="360" stroke="var(--line2)" stroke-width="1.4"/>';
    var b = 0.36;
    s += '<line x1="' + (cx - b * 160) + '" y1="' + (cy + 160) + '" x2="' + (cx + b * 160) + '" y2="' + (cy - 160) + '" stroke="var(--s2)" stroke-width="2" stroke-dasharray="6 5"/>';
    s += '<line x1="' + (cx - 160) + '" y1="' + (cy + b * 160) + '" x2="' + (cx + 160) + '" y2="' + (cy - b * 160) + '" stroke="var(--s2)" stroke-width="2" stroke-dasharray="6 5"/>';
    s += '<g filter="url(#hg)" stroke="var(--light)" stroke-width="2.6" stroke-linecap="round"><line x1="' + (cx - 165) + '" y1="' + (cy + 165) + '" x2="' + (cx + 165) + '" y2="' + (cy - 165) + '"/><line x1="' + (cx - 165) + '" y1="' + (cy - 165) + '" x2="' + (cx + 165) + '" y2="' + (cy + 165) + '"/></g>';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="6" fill="var(--light)" filter="url(#hg)"/>';
    s += '<circle r="5" fill="#fff" filter="url(#hg)"><animateMotion dur="3.6s" repeatCount="indefinite" path="M' + (cx - 150) + ' ' + (cy + 150) + ' L' + (cx + 150) + ' ' + (cy - 150) + '"/></circle>';
    s += '<text x="382" y="' + (cy - 8) + '" fill="var(--tx3)" font-size="13" text-anchor="end" font-family="var(--font)">x</text>';
    s += '<text x="' + (cx + 8) + '" y="30" fill="var(--tx3)" font-size="13" font-family="var(--font)">ct</text>';
    s += '<text x="' + (cx + b * 160 + 8) + '" y="' + (cy - 150) + '" fill="var(--s2)" font-size="13" font-family="var(--font)">ct′</text>';
    s += '<text x="' + (cx + 142) + '" y="' + (cy - b * 160 - 6) + '" fill="var(--s2)" font-size="13" font-family="var(--font)">x′</text>';
    return '<svg viewBox="0 0 400 380" role="img" aria-label="Diagramă spațiu-timp cu conul de lumină">' + s + '</svg>';
  }

  /* ---------- harta conceptelor ---------- */
  function buildMap() {
    var n = RF.chapters.length, W = 1100, H = 350, x0 = 72, dx = (W - 2 * x0) / (n - 1), pts = [];
    RF.chapters.forEach(function (c, i) {
      pts.push({ c: c, x: x0 + i * dx, y: 178 + 62 * Math.sin(i * 1.12 + 0.3) });
    });
    var s = '', path = 'M' + pts[0].x.toFixed(1) + ' ' + pts[0].y.toFixed(1);
    for (var i = 1; i < pts.length; i++) {
      var a = pts[i - 1], b = pts[i], mx = (a.x + b.x) / 2;
      path += ' C' + mx.toFixed(1) + ' ' + a.y.toFixed(1) + ' ' + mx.toFixed(1) + ' ' + b.y.toFixed(1) + ' ' + b.x.toFixed(1) + ' ' + b.y.toFixed(1);
    }
    /* separatoare și titluri de părți */
    RF.parts.forEach(function (p) {
      var mem = pts.filter(function (q) { return q.c.part === p.id; });
      if (!mem.length) return;
      var x1 = mem[0].x, x2 = mem[mem.length - 1].x;
      var mid = ((x1 + x2) / 2).toFixed(1);
      s += '<text class="m-part" text-anchor="middle"><tspan x="' + mid + '" y="26">Partea ' + ['I', 'II', 'III'][p.id - 1] + '</tspan><tspan class="m-part2" x="' + mid + '" y="42">' + p.title + '</tspan></text>';
      if (p.id > 1) s += '<line class="m-sep" x1="' + (x1 - dx / 2).toFixed(1) + '" y1="14" x2="' + (x1 - dx / 2).toFixed(1) + '" y2="' + (H - 14) + '"/>';
    });
    s += '<path class="m-line" d="' + path + '"/>';
    var R = 24, circ = 2 * Math.PI * R;
    pts.forEach(function (q, i) {
      var c = q.c, m = RF.store.mastery(c.id), read = RF.store.readFrac(c.id) >= 0.9;
      var above = i % 2 === 0, ty = above ? q.y - R - 14 : q.y + R + 18;
      var words = c.title.split(' '), lines = [], cur = '';
      words.forEach(function (w) { if ((cur + ' ' + w).trim().length > 15 && cur) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); });
      if (cur) lines.push(cur);
      var ly = above ? ty - (lines.length - 1) * 14 : ty;
      var txt = lines.map(function (l, k) { return '<tspan x="' + q.x.toFixed(1) + '" y="' + (ly + k * 14).toFixed(1) + '">' + l + '</tspan>'; }).join('');
      s += '<a href="' + RF.chapterUrl(c) + '" aria-label="Capitolul ' + c.id + ': ' + c.title + '"><g class="m-node' + (read ? ' is-read' : '') + (c.bonus ? ' is-bonus' : '') + '" tabindex="0">' +
        '<circle class="halo" cx="' + q.x.toFixed(1) + '" cy="' + q.y.toFixed(1) + '" r="' + (R + 12) + '"/>' +
        '<circle class="bg" cx="' + q.x.toFixed(1) + '" cy="' + q.y.toFixed(1) + '" r="' + R + '"/>' +
        (m.pct > 0 ? '<circle class="arc" cx="' + q.x.toFixed(1) + '" cy="' + q.y.toFixed(1) + '" r="' + R + '" stroke-dasharray="' + (circ * m.pct / 100).toFixed(1) + ' ' + circ.toFixed(1) + '"/>' : '') +
        '<text class="n" x="' + q.x.toFixed(1) + '" y="' + q.y.toFixed(1) + '">' + c.id + '</text>' +
        '<text class="t">' + txt + '</text></g></a>';
    });
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="group" aria-label="Harta capitolelor">' + s + '</svg>';
  }

  /* ---------- pagina de start ---------- */
  RF.home.index = function () {
    var chs = RF.chapters, done = chs.filter(function (c) { return RF.store.readFrac(c.id) >= 0.9; }).length;
    var seen = 0, total = 0, mSum = 0, mN = 0;
    chs.forEach(function (c) {
      var m = RF.store.mastery(c.id);
      seen += m.seen; total += m.total;
      if (m.total) { mSum += m.pct; mN++; }
    });
    var art = RF.$('#home-art'); if (art) art.innerHTML = heroArt();

    var started = chs.filter(function (c) { return RF.store.readFrac(c.id) > 0.02; }).length > 0;
    var cta = RF.$('#cta');
    if (cta) {
      var next = chs.filter(function (c) { return RF.store.readFrac(c.id) < 0.9; })[0] || chs[0];
      cta.href = RF.chapterUrl(next);
      cta.textContent = started ? 'Continuă: cap. ' + next.id : 'Începe cu capitolul 1';
    }
    var stats = RF.$('#home-stats');
    if (stats) {
      stats.appendChild(el('span', { class: 'pill', text: done + ' / ' + chs.length + ' capitole citite' }));
      if (total) stats.appendChild(el('span', { class: 'pill', text: seen + ' / ' + total + ' întrebări încercate' }));
      if (mN && seen) stats.appendChild(el('span', { class: 'pill', text: 'stăpânire medie ' + Math.round(mSum / mN) + '%' }));
    }

    /* continuă + de repetat */
    var row = RF.$('#nextrow');
    if (row) {
      var cont = chs.filter(function (c) { return RF.store.readFrac(c.id) < 0.9; })[0];
      var a1;
      if (!started) a1 = '<small>Pornește de aici</small><strong>Capitolul 1 · ' + chs[0].title + '</strong><span>' + chs[0].short + '</span>';
      else if (cont) a1 = '<small>Continuă</small><strong>Capitolul ' + cont.id + ' · ' + cont.title + '</strong><span>' + (readPct(cont) ? 'Ai citit ' + readPct(cont) + '% din el.' : cont.short) + '</span>';
      else a1 = '<small>Ai parcurs tot materialul</small><strong>Fă testul final amestecat</strong><span>Întrebări din toate capitolele, cu capcane.</span>';
      var h1 = !started ? RF.chapterUrl(chs[0]) : cont ? RF.chapterUrl(cont) : RF.url('test-final.html');
      row.appendChild(el('a', { class: 'nextcard', href: h1, html: a1 }));
      var weak = null;
      chs.forEach(function (c) {
        var m = RF.store.mastery(c.id);
        if (m.seen && (!weak || m.pct < weak.m.pct)) weak = { c: c, m: m };
      });
      if (weak) row.appendChild(el('a', { class: 'nextcard is-warn', href: RF.chapterUrl(weak.c) + '#test',
        html: '<small>De repetat</small><strong>Capitolul ' + weak.c.id + ' · ' + weak.c.title + '</strong><span>Stăpânire ' + weak.m.pct + '% — încă un test și capcanele dispar.</span>' }));
      else row.appendChild(el('a', { class: 'nextcard', href: RF.url('test-final.html'),
        html: '<small>Verifică-te</small><strong>Testul final amestecat</strong><span>Vezi pe loc ce capitole stăpânești și unde ai capcane.</span>' }));
    }

    var map = RF.$('#map'); if (map) map.innerHTML = buildMap();

    /* carduri pe părți */
    var host = RF.$('#parts');
    if (host) {
      RF.parts.forEach(function (p) {
        var sec = el('div', { class: 'part' });
        sec.appendChild(el('div', { class: 'part__head', html: '<h3>Partea ' + ['I', 'II', 'III'][p.id - 1] + ' · ' + p.title + '</h3><small>' + p.blurb + '</small>' }));
        var grid = el('div', { class: 'cgrid' });
        chs.filter(function (c) { return c.part === p.id; }).forEach(function (c) {
          var m = RF.store.mastery(c.id), rp = readPct(c);
          var ring = '<span class="ring" style="--p:' + m.pct + '" title="Stăpânire"><b>' + (m.total && m.seen ? m.pct + '%' : '—') + '</b></span>';
          var card = el('a', { class: 'ccard', href: RF.chapterUrl(c) });
          card.innerHTML = '<span class="ccard__num">' + pad(c.id) + '</span>' +
            '<span class="ccard__body"><strong>' + c.title + (c.bonus ? ' <span class="badge bonus">Adaos</span>' : '') + '</strong><small>' + c.short + '</small>' +
            '<span class="ccard__meta">≈ ' + c.minutes + ' min' + (rp ? ' · citit ' + rp + '%' : '') + (hasBank(c) ? ' · ' + c.quiz.length + ' întrebări' : '') + '</span></span>' + ring +
            '<i class="ccard__bar"><b style="width:' + rp + '%"></b></i>';
          grid.appendChild(card);
        });
        sec.appendChild(grid);
        host.appendChild(sec);
      });
    }
  };

  /* ---------- test final: harta stăpânirii ---------- */
  RF.home.test = function () {
    var ul = RF.$('#mastery');
    if (!ul) return;
    RF.chapters.forEach(function (c) {
      var m = RF.store.mastery(c.id), cls = m.pct >= 70 ? 'hi' : m.pct >= 40 ? 'mid' : 'lo';
      var li = el('li');
      li.innerHTML = '<span class="mn">' + c.id + '</span><span>' + c.title + '</span>' +
        '<span class="mbar"><i class="' + cls + '" style="width:' + Math.max(m.pct, m.seen ? 3 : 0) + '%"></i></span>' +
        '<span class="mt">' + (m.total ? m.pct + '% · ' + m.seen + '/' + m.total + ' · <a href="' + RF.chapterUrl(c) + '#test">test</a>' : 'în pregătire') + '</span>';
      ul.appendChild(li);
    });
  };

  /* ---------- fișa de recapitulare ---------- */
  RF.home.fisa = function () {
    var body = RF.$('#fisa-body');
    if (!body) return;
    RF.chapters.forEach(function (c) {
      var box = el('section', { class: 'fisa-chap' });
      var h = '<h3><small>' + pad(c.id) + '</small><a href="' + RF.chapterUrl(c) + '" style="color:inherit">' + c.title + '</a>' + (c.bonus ? ' <span class="badge bonus">Adaos</span>' : '') + '</h3>';
      if (c.summary && c.summary.length) {
        h += '<dl>' + c.summary.map(function (it) { return '<dt>' + it.q + '</dt><dd>' + it.a + '</dd>'; }).join('') + '</dl>';
      } else h += '<p class="none">Fișa acestui capitol se pregătește.</p>';
      box.innerHTML = h;
      body.appendChild(box);
    });
  };

  /* ---------- glosar ---------- */
  RF.home.glosar = function () {
    var list = RF.$('#gl-list'), q = RF.$('#gl-q');
    if (!list) return;
    var all = RF.glossaryAll().sort(function (a, b) { return a.term.localeCompare(b.term, 'ro'); });
    function render() {
      var f = (q && q.value || '').trim().toLowerCase();
      list.innerHTML = '';
      var shown = all.filter(function (g) { return !f || g.term.toLowerCase().indexOf(f) >= 0 || g.def.toLowerCase().indexOf(f) >= 0; });
      if (!shown.length) { list.appendChild(el('p', { class: 'gl-empty', text: all.length ? 'Niciun termen nu se potrivește.' : 'Glosarul se pregătește.' })); return; }
      shown.forEach(function (g) {
        var c = RF.chapter(g.ch);
        list.appendChild(el('div', { class: 'gl-item', html: '<dl style="margin:0"><dt>' + g.term + (c ? ' <a href="' + RF.chapterUrl(c) + '">cap. ' + c.id + '</a>' : '') + '</dt><dd>' + g.def + '</dd></dl>' }));
      });
    }
    if (q) q.addEventListener('input', render);
    render();
  };
})(window);
