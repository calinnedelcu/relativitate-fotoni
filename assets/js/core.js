/* ==========================================================================
   Relativitate & Fotoni — core.js
   Spațiul de nume RF, lista de capitole, progres salvat local, temă,
   bara de sus, cuprinsul, navigarea între capitole, câmpul de stele.
   ========================================================================== */
(function (global) {
  'use strict';
  var RF = global.RF = global.RF || {};
  var doc = document;
  RF._errs = [];
  global.addEventListener('error', function (e) { RF._errs.push((e.message || '') + ' @' + String(e.filename || '').split('/').pop() + ':' + (e.lineno || 0)); });

  /* ---------- utilitare ---------- */
  RF.$ = function (s, r) { return (r || doc).querySelector(s); };
  RF.$$ = function (s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); };
  RF.el = function (tag, attrs, kids) {
    var e = doc.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        var v = attrs[k];
        if (v == null || v === false) continue;
        if (k === 'class') e.className = v;
        else if (k === 'html') e.innerHTML = v;
        else if (k === 'text') e.textContent = v;
        else if (k.slice(0, 2) === 'on' && typeof v === 'function') e.addEventListener(k.slice(2), v);
        else e.setAttribute(k, v === true ? '' : v);
      }
    }
    (kids || []).forEach(function (c) {
      if (c != null) e.appendChild(typeof c === 'string' ? doc.createTextNode(c) : c);
    });
    return e;
  };
  RF.clamp = function (x, a, b) { return Math.max(a, Math.min(b, x)); };
  RF.lerp = function (a, b, t) { return a + (b - a) * t; };
  RF.shuffle = function (arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  };
  RF.reduced = !!(global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches);
  RF.slug = function (s) {
    return String(s).toLowerCase()
      .replace(/[ăâ]/g, 'a').replace(/î/g, 'i').replace(/[șş]/g, 's').replace(/[țţ]/g, 't')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  };

  /* ---------- rădăcina site-ului (merge și din /cap/) ---------- */
  var rootUrl = '';
  (function () {
    var sc = doc.getElementsByTagName('script');
    for (var i = 0; i < sc.length; i++) {
      var m = (sc[i].getAttribute('src') || '').match(/^(.*?)assets\/js\/core\.js/);
      if (m) { rootUrl = m[1]; break; }
    }
  })();
  RF.root = rootUrl;
  RF.url = function (p) { return rootUrl + p; };

  /* ---------- lista de capitole ---------- */
  RF.parts = [
    { id: 1, title: 'Spațiu și timp', blurb: 'Postulate, spațiu-timp, Lorentz, contracție, dilatare, viteze' },
    { id: 2, title: 'Mișcare și energie', blurb: 'Dinamica relativistă și E = mc²' },
    { id: 3, title: 'Lumina ca particulă', blurb: 'Fotonul și efectul fotoelectric' }
  ];
  RF.chapters = [
    { id: 1, slug: '01-postulate', title: 'Cele două postulate', short: 'Lumina nu se adună, iar legile sunt aceleași pentru toți', part: 1, minutes: 14 },
    { id: 2, slug: '02-spatiu-timp', title: 'Spațiu-timp și intervalul', short: 'Evenimente în 4D și ce văd toți la fel', part: 1, minutes: 15 },
    { id: 3, slug: '03-lorentz', title: 'Transformările Lorentz', short: 'Cum „traduci” un eveniment între doi observatori', part: 1, minutes: 13 },
    { id: 4, slug: '04-simultaneitate', title: 'Simultaneitatea', short: '„În același timp” depinde de observator', part: 1, minutes: 12, bonus: true },
    { id: 5, slug: '05-contractia', title: 'Contracția lungimilor', short: 'De ce o bară în mișcare pare mai scurtă', part: 1, minutes: 13 },
    { id: 6, slug: '06-dilatarea', title: 'Dilatarea timpului și gemenii', short: 'Ceasul în mișcare merge mai încet', part: 1, minutes: 16 },
    { id: 7, slug: '07-viteze', title: 'Compunerea vitezelor', short: 'De ce nu depășești niciodată c', part: 1, minutes: 11 },
    { id: 8, slug: '08-dinamica', title: 'Dinamica relativistă', short: 'Impuls, masă și de ce accelerezi tot mai greu', part: 2, minutes: 14 },
    { id: 9, slug: '09-energia', title: 'Energia: E = mc²', short: 'Energie de repaus, cinetică și totală', part: 2, minutes: 14 },
    { id: 10, slug: '10-fotonul', title: 'Fotonul', short: 'Lumina în pachete, fără masă de repaus', part: 3, minutes: 11 },
    { id: 11, slug: '11-fotoelectric', title: 'Efectul fotoelectric extern', short: 'Cele patru legi și laboratorul virtual', part: 3, minutes: 16 }
  ];
  RF.chapter = function (id) {
    id = Number(id);
    for (var i = 0; i < RF.chapters.length; i++) if (RF.chapters[i].id === id) return RF.chapters[i];
    return null;
  };
  RF.chapterUrl = function (c) { return RF.url('cap/' + c.slug + '.html'); };
  /* fișierele de date (assets/js/data/capNN.js) își completează capitolul aici */
  RF.register = function (d) {
    var c = RF.chapter(d.id);
    if (!c) { c = { id: d.id }; RF.chapters.push(c); }
    for (var k in d) c[k] = d[k];
  };
  RF.glossaryAll = function () {
    var out = [];
    RF.chapters.forEach(function (c) {
      (c.glossary || []).forEach(function (g) { out.push({ term: g.term, def: g.def, ch: c.id }); });
    });
    return out;
  };

  /* ---------- progres salvat local ---------- */
  var KEY = 'rf-progress-v1';
  var mem = null;
  function load() {
    if (mem) return mem;
    var raw = null;
    try { raw = global.localStorage.getItem(KEY); } catch (e) { /* mod privat */ }
    try { mem = raw ? JSON.parse(raw) : null; } catch (e) { mem = null; }
    if (!mem || typeof mem !== 'object') mem = {};
    mem.read = mem.read || {}; mem.q = mem.q || {}; mem.att = mem.att || {};
    return mem;
  }
  function save() { try { global.localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) { /* ignorăm */ } }
  RF.store = {
    readFrac: function (ch) { return load().read[ch] || 0; },
    setRead: function (ch, f) {
      var d = load();
      if (f > (d.read[ch] || 0) + 0.01) { d.read[ch] = Math.round(f * 100) / 100; save(); }
    },
    answer: function (ch, qid, score) {
      var d = load(), c = d.q[ch] || (d.q[ch] = {});
      var r = c[qid] || (c[qid] = { n: 0, last: 0, best: 0 });
      r.n++; r.last = score; r.best = Math.max(r.best, score); r.t = Date.now();
      save();
    },
    attempt: function (ch, score, n) {
      var d = load(), a = d.att[ch] || (d.att[ch] = []);
      a.push({ t: Date.now(), s: Math.round(score * 1000) / 1000, n: n });
      if (a.length > 30) a.shift();
      save();
    },
    attempts: function (ch) { return load().att[ch] || []; },
    qstat: function (ch, qid) { var c = load().q[ch]; return (c && c[qid]) || null; },
    wrong: function (ch) {
      var c = load().q[ch] || {}, out = [];
      for (var id in c) if (c[id].last < 0.999) out.push(id);
      return out;
    },
    mastery: function (ch) {
      var c = RF.chapter(ch), bank = (c && c.quiz) || [];
      if (!bank.length) return { pct: 0, seen: 0, total: 0 };
      var st = load().q[ch] || {}, sum = 0, seen = 0;
      bank.forEach(function (q) { var r = st[q.id]; if (r) { seen++; sum += r.last; } });
      return { pct: Math.round(100 * sum / bank.length), seen: seen, total: bank.length };
    },
    reset: function () { mem = { read: {}, q: {}, att: {} }; save(); }
  };

  /* ---------- temă ---------- */
  function themeIcon() { return RF.theme.get() === 'dark' ? '☀' : '☾'; }
  RF.theme = {
    get: function () { return doc.documentElement.getAttribute('data-theme') || 'dark'; },
    set: function (t) {
      doc.documentElement.setAttribute('data-theme', t);
      try { global.localStorage.setItem('rf-theme', t); } catch (e) { /* ignorăm */ }
      var b = RF.$('#rf-theme'); if (b) b.textContent = themeIcon();
      doc.dispatchEvent(new CustomEvent('rf:theme', { detail: t }));
    },
    toggle: function () { RF.theme.set(RF.theme.get() === 'dark' ? 'light' : 'dark'); }
  };

  /* ---------- câmpul de stele ---------- */
  function stars() {
    if (RF.$('#rf-stars')) return;
    var cv = RF.el('canvas', { id: 'rf-stars', 'aria-hidden': 'true' });
    doc.body.insertBefore(cv, doc.body.firstChild);
    var ctx = cv.getContext('2d'), W = 0, H = 0, pts = [], t0 = 0;
    function build() {
      var dpr = Math.min(global.devicePixelRatio || 1, 2);
      W = global.innerWidth; H = global.innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.min(260, Math.round(W * H / 8500)), seed = 11;
      function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
      pts = [];
      for (var i = 0; i < n; i++) pts.push({ x: rnd() * W, y: rnd() * H, r: rnd() * 1.15 + .25, a: rnd() * .65 + .2, p: rnd() * 6.28, s: rnd() * 1.4 + .3 });
      draw(0);
    }
    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#d6e6ff';
      for (var i = 0; i < pts.length; i++) {
        var s = pts[i], tw = RF.reduced ? 1 : .6 + .4 * Math.sin(t * s.s + s.p);
        ctx.globalAlpha = s.a * tw;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.2832); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    build();
    var rt; global.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(build, 150); });
    if (!RF.reduced) {
      setInterval(function () {
        if (doc.hidden || RF.theme.get() !== 'dark') return;
        draw((Date.now() - (t0 = t0 || Date.now())) / 1000);
      }, 110);
    }
  }

  /* ---------- bara de sus și meniul ---------- */
  function buildTopbar(chId) {
    var cur = chId ? RF.chapter(chId) : null;
    var bar = RF.el('header', { class: 'topbar' });
    bar.innerHTML =
      '<a class="brand" href="' + RF.url('index.html') + '"><span class="brand__mark" aria-hidden="true"></span><span>Relativitate <em>&amp;</em> Fotoni</span></a>' +
      (cur ? '<span class="topbar__crumb">/ Cap. ' + cur.id + ' · ' + cur.title + '</span>' : '') +
      '<nav class="topbar__nav" aria-label="Navigare">' +
      '<a class="chip chip--tool" href="' + RF.url('test-final.html') + '">Test final</a>' +
      '<a class="chip chip--tool" href="' + RF.url('fisa.html') + '">Fișă</a>' +
      '<a class="chip chip--tool" href="' + RF.url('glosar.html') + '">Glosar</a>' +
      '<button class="chip" id="rf-menu-btn" type="button" aria-expanded="false" aria-controls="rf-menu">Meniu ☰</button>' +
      '<button class="iconbtn" id="rf-theme" type="button" aria-label="Schimbă tema (întunecat / luminos)">' + themeIcon() + '</button>' +
      '</nav><div class="topbar__progress"><i></i></div>';
    doc.body.insertBefore(bar, doc.body.firstChild);

    RF.$('#rf-theme').addEventListener('click', RF.theme.toggle);
    var btn = RF.$('#rf-menu-btn'), menu = null;
    function close() { if (menu) { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); } }
    function open() {
      if (!menu) {
        menu = RF.el('div', { class: 'menu', id: 'rf-menu', hidden: true });
        doc.body.appendChild(menu);
      }
      var h = '<div class="menu__label">Capitole</div>';
      RF.chapters.forEach(function (c) {
        var m = RF.store.mastery(c.id);
        h += '<a class="menu__item' + (cur && cur.id === c.id ? ' is-current' : '') + '" href="' + RF.chapterUrl(c) + '">' +
          '<span class="menu__num">' + c.id + '</span><span>' + c.title + (c.bonus ? ' <span class="badge bonus">Adaos</span>' : '') + '</span>' +
          '<span class="menu__pct">' + (m.total ? m.pct + '%' : '') + '</span></a>';
      });
      h += '<div class="menu__sep"></div><div class="menu__label">Unelte</div>' +
        '<a class="menu__item" href="' + RF.url('index.html') + '"><span class="menu__num">⌂</span><span>Pagina de start și harta</span></a>' +
        '<a class="menu__item" href="' + RF.url('test-final.html') + '"><span class="menu__num">✓</span><span>Test final amestecat</span></a>' +
        '<a class="menu__item" href="' + RF.url('fisa.html') + '"><span class="menu__num">≡</span><span>Fișa de recapitulare</span></a>' +
        '<a class="menu__item" href="' + RF.url('glosar.html') + '"><span class="menu__num">Aa</span><span>Glosar</span></a>' +
        '<div class="menu__sep"></div><button class="menu__item" id="rf-reset" type="button" style="width:100%;background:none;border:0;font:inherit;cursor:pointer;color:var(--tx3)"><span class="menu__num">↺</span><span>Resetează progresul</span></button>';
      menu.innerHTML = h;
      var rs = RF.$('#rf-reset', menu);
      rs.addEventListener('click', function () {
        if (global.confirm('Ștergi tot progresul salvat (teste și citit)?')) { RF.store.reset(); global.location.reload(); }
      });
      menu.hidden = false; btn.setAttribute('aria-expanded', 'true');
    }
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (menu && !menu.hidden) close(); else open();
    });
    doc.addEventListener('click', function (e) { if (menu && !menu.hidden && !menu.contains(e.target)) close(); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  /* ---------- cuprins lateral + indicator de citit ---------- */
  function buildToc(main) {
    var layout = main.parentNode;
    if (!layout || !layout.classList.contains('layout')) return;
    var heads = RF.$$('.sec > h2', main);
    if (heads.length < 2) return;
    var ol = RF.el('ol');
    var items = heads.map(function (h) {
      if (!h.id) { var s = h.closest('.sec'); h.id = (s && s.id) || RF.slug(h.textContent); }
      var a = RF.el('a', { href: '#' + h.id, text: h.textContent });
      ol.appendChild(RF.el('li', null, [a]));
      return { h: h, a: a };
    });
    var toc = RF.el('aside', { class: 'toc', 'aria-label': 'Cuprinsul capitolului' }, [RF.el('p', { class: 'toc__title', text: 'În acest capitol' }), ol]);
    layout.insertBefore(toc, main);
    return items;
  }

  function trackScroll(chId, tocItems) {
    var bar = RF.$('.topbar__progress i'), ticking = false;
    function update() {
      ticking = false;
      var h = doc.documentElement, max = h.scrollHeight - global.innerHeight;
      var f = max > 0 ? RF.clamp(h.scrollTop / max, 0, 1) : 0;
      if (bar) bar.style.width = (f * 100).toFixed(1) + '%';
      if (chId && f > 0.02) RF.store.setRead(chId, f);
      if (tocItems) {
        var active = null;
        tocItems.forEach(function (it) { if (it.h.getBoundingClientRect().top < 150) active = it; });
        tocItems.forEach(function (it) { it.a.classList.toggle('is-active', it === active); });
      }
    }
    global.addEventListener('scroll', function () { if (!ticking) { ticking = true; global.requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  function buildChapNav(main, chId) {
    var cur = RF.chapter(chId);
    if (!cur || main.getAttribute('data-nav') === 'off') return;
    var i = RF.chapters.indexOf(cur), prev = RF.chapters[i - 1], next = RF.chapters[i + 1];
    var nav = RF.el('nav', { class: 'chapnav', 'aria-label': 'Capitolul anterior / următor' });
    nav.innerHTML =
      (prev ? '<a class="prev" href="' + RF.chapterUrl(prev) + '"><small>← Capitolul anterior</small>' + prev.title + '</a>'
            : '<a class="prev" href="' + RF.url('index.html') + '"><small>← Începutul</small>Harta și pagina de start</a>') +
      (next ? '<a class="next" href="' + RF.chapterUrl(next) + '"><small>Capitolul următor →</small>' + next.title + '</a>'
            : '<a class="next" href="' + RF.url('test-final.html') + '"><small>Final →</small>Testul final amestecat</a>');
    main.appendChild(nav);
  }

  function buildFooter() {
    if (RF.$('.sitefoot')) return;
    doc.body.appendChild(RF.el('footer', { class: 'sitefoot', html: 'Relativitate &amp; Fotoni · material de studiu · progresul tău se salvează doar în acest browser' }));
  }

  /* ---------- pornirea paginii ---------- */
  RF.init = function () {
    if (RF._inited) return;
    RF._inited = true;
    var chId = Number(doc.body.getAttribute('data-chapter')) || 0;
    stars();
    buildTopbar(chId);
    var main = RF.$('main.chapter');
    if (RF.components) RF.components.init(doc);
    if (RF.sim && RF.sim.autoInit) RF.sim.autoInit(doc);
    if (RF.steps) RF.steps.init(doc);
    if (RF.quiz) RF.quiz.init(doc);
    var items = main ? buildToc(main) : null;
    if (main && chId) buildChapNav(main, chId);
    buildFooter();
    trackScroll(chId, items);
    doc.dispatchEvent(new CustomEvent('rf:ready'));
  };
})(window);
