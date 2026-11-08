/* Pagina „Probleme tip test”: Adevărat/Fals, un singur răspuns, „care afirmații sunt corecte”,
   răspunsuri scurte cu model și calcule cu numere generate. Datele sunt în data/probleme.js. */
(function () {
  'use strict';
  var RF = window.RF, P = RF.problems;
  var el = RF.el;

  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function section(root, id, kicker, title, lead) {
    var s = el('section', { class: 'pb-sec', id: id });
    s.appendChild(el('p', { class: 'pb-kicker', text: kicker }));
    s.appendChild(el('h2', { text: title }));
    if (lead) s.appendChild(el('p', { class: 'pb-lead', html: lead }));
    root.appendChild(s);
    return s;
  }
  function verdict(ok, text) {
    return el('div', { class: 'pb-verdict ' + (ok ? 'is-right' : 'is-wrong'), html: '<b>' + (ok ? '✓ Corect' : '✗ Greșit') + '</b>' + (text ? ' — ' + text : '') });
  }

  /* ---------- 1. Adevărat / Fals ---------- */
  function buildAF(root, items) {
    if (!items.length) return;
    var sec = section(root, 'af', 'Tip 1', 'Adevărat / Fals',
      'Stabilește valoarea de adevăr a fiecărei afirmații. După fiecare răspuns vezi de ce.');
    var card = el('div', { class: 'pb-card' });
    var score = el('p', { class: 'pb-score', text: 'Scor: 0 / ' + items.length });
    var got = 0, done = 0;
    items.forEach(function (it, i) {
      var row = el('div', { class: 'pb-stmt' });
      row.appendChild(el('p', { class: 'pb-stmt__t', html: '<span class="pb-n">' + 'abcdefghij'[i] + ')</span> ' + it.t }));
      var btns = el('div', { class: 'pb-btns' });
      var why = el('div', { class: 'pb-why', hidden: true });
      [['Adevărat', true], ['Fals', false]].forEach(function (b) {
        var btn = el('button', { class: 'pb-opt pb-opt--small', type: 'button', text: b[0] });
        btn.addEventListener('click', function () {
          if (row.dataset.done) return;
          row.dataset.done = '1'; done++;
          var ok = b[1] === it.a;
          if (ok) got++;
          btn.classList.add(ok ? 'is-right' : 'is-wrong');
          if (!ok) [].forEach.call(btns.children, function (x) { if ((x.textContent === 'Adevărat') === it.a) x.classList.add('is-right'); });
          why.hidden = false;
          why.innerHTML = '';
          why.appendChild(verdict(ok, 'afirmația este <b>' + (it.a ? 'adevărată' : 'falsă') + '</b>. ' + it.why));
          score.textContent = 'Scor: ' + got + ' / ' + items.length + (done === items.length ? ' — terminat' : '');
        });
        btns.appendChild(btn);
      });
      row.appendChild(btns); row.appendChild(why);
      card.appendChild(row);
    });
    card.appendChild(score);
    sec.appendChild(card);
  }

  /* ---------- 2. Un singur răspuns ---------- */
  function buildSingle(root, list) {
    if (!list.length) return;
    var sec = section(root, 'single', 'Tip 2', 'Complement simplu (un singur răspuns corect)',
      'Alege varianta corectă. Distractorii sunt greșelile tipice (γ în loc de 1/γ, hν în loc de hν/c etc.).');
    var card = el('div', { class: 'pb-card' });
    var score = el('p', { class: 'pb-score', text: 'Scor: 0 / ' + list.length });
    var got = 0, done = 0;
    list.forEach(function (q, qi) {
      var box = el('div', { class: 'pb-stmt' });
      box.appendChild(el('p', { class: 'pb-stmt__t', html: '<span class="pb-n">' + (qi + 1) + '.</span> ' + q.q }));
      var list = el('div', { class: 'pb-optlist' });
      var why = el('div', { class: 'pb-why', hidden: true });
      var btns = [];
      shuffle(q.o).forEach(function (o, i) {
        var b = el('button', { class: 'pb-opt', type: 'button', html: '<span class="pb-n">' + 'ABCD'[i] + '.</span> ' + o[0] });
        b._ok = !!o[1];
        b.addEventListener('click', function () {
          if (box.dataset.done) return;
          box.dataset.done = '1'; done++;
          if (b._ok) got++;
          btns.forEach(function (x) { if (x._ok) x.classList.add('is-right'); });
          if (!b._ok) b.classList.add('is-wrong');
          why.hidden = false;
          why.appendChild(verdict(b._ok, q.why));
          score.textContent = 'Scor: ' + got + ' / ' + list.length + (done === list.length ? ' — terminat' : '');
        });
        btns.push(b); list.appendChild(b);
      });
      box.appendChild(list); box.appendChild(why);
      card.appendChild(box);
    });
    card.appendChild(score);
    sec.appendChild(card);
  }

  /* ---------- 3. „Care afirmații sunt corecte?” ---------- */
  function listLabel(idx) {
    var t = idx.map(function (i) { return i + 1; });
    if (t.length === 4) return 'toate';
    if (t.length === 1) return String(t[0]);
    return t.slice(0, -1).join(', ') + ' și ' + t[t.length - 1];
  }
  function buildCombo(root, list) {
    if (!list.length) return;
    var sec = section(root, 'combo', 'Tip 3', 'Care dintre afirmații sunt corecte?',
      'Citește toate cele patru afirmații, hotărăște-le pe fiecare, apoi alege combinația.');
    list.forEach(function (q, qi) {
      var card = el('div', { class: 'pb-card' });
      card.appendChild(el('h3', { text: 'Întrebarea ' + (qi + 1) }));
      card.appendChild(el('p', { class: 'pb-stmt__t', text: q.q }));
      var ol = el('ol', { class: 'pb-stm' });
      q.s.forEach(function (s) { ol.appendChild(el('li', { html: s[0] })); });
      card.appendChild(ol);
      var truth = []; q.s.forEach(function (s, i) { if (s[1]) truth.push(i); });
      var right = listLabel(truth);
      var list = el('div', { class: 'pb-optlist' }), why = el('div', { class: 'pb-why', hidden: true });
      var btns = [];
      q.o.forEach(function (o, i) {
        var b = el('button', { class: 'pb-opt', type: 'button', html: '<span class="pb-n">' + 'abcd'[i] + ')</span> ' + o });
        b._ok = o === right;
        b.addEventListener('click', function () {
          if (card.dataset.done) return;
          card.dataset.done = '1';
          btns.forEach(function (x) { if (x._ok) x.classList.add('is-right'); });
          if (!b._ok) b.classList.add('is-wrong');
          why.hidden = false;
          var h = '<ul class="pb-ul">';
          q.s.forEach(function (s, k) { h += '<li><b>' + (k + 1) + '. ' + (s[1] ? 'adevărată' : 'falsă') + '</b> — ' + s[2] + '</li>'; });
          why.appendChild(verdict(b._ok, 'corect este: <b>' + right + '</b>.'));
          why.appendChild(el('div', { html: h + '</ul>' }));
        });
        btns.push(b); list.appendChild(b);
      });
      card.appendChild(list); card.appendChild(why);
      sec.appendChild(card);
    });
  }

  /* ---------- 4. Răspunsuri scurte ---------- */
  function buildShort(root, list) {
    if (!list.length) return;
    var sec = section(root, 'short', 'Tip 4', 'Răspunsuri scurte, cu justificare',
      'Scrie răspunsul pe o foaie (sau în gând), apoi apasă „Arată modelul”. Bifează în lista de verificare ce ai spus: pe test se punctează pașii.');
    list.forEach(function (it, i) {
      var card = el('div', { class: 'pb-card' });
      card.appendChild(el('p', { class: 'pb-stmt__t', html: '<span class="pb-n">' + (i + 1) + '.</span> ' + it.q }));
      var ta = el('textarea', { class: 'pb-ta', rows: '3', placeholder: 'Scrie aici răspunsul tău (nu se salvează nicăieri)…' });
      card.appendChild(ta);
      var open = el('button', { class: 'btn btn--primary', type: 'button', text: 'Arată modelul' });
      var box = el('div', { class: 'pb-why', hidden: true });
      open.addEventListener('click', function () {
        box.hidden = !box.hidden;
        open.textContent = box.hidden ? 'Arată modelul' : 'Ascunde modelul';
      });
      var chk = el('div', { class: 'pb-check' });
      chk.appendChild(el('p', { class: 'pb-check__t', text: 'Ai inclus în răspunsul tău:' }));
      var sc = el('p', { class: 'pb-score', text: '0 / ' + it.pts.length + ' puncte' });
      var c = 0;
      it.pts.forEach(function (p) {
        var lab = el('label', { class: 'pb-check__i' });
        var cb = el('input', { type: 'checkbox' });
        cb.addEventListener('change', function () { c += cb.checked ? 1 : -1; sc.textContent = c + ' / ' + it.pts.length + ' puncte'; });
        lab.appendChild(cb); lab.appendChild(el('span', { html: ' ' + p }));
        chk.appendChild(lab);
      });
      chk.appendChild(sc);
      box.appendChild(el('div', { class: 'pb-model', html: it.model }));
      box.appendChild(chk);
      card.appendChild(open); card.appendChild(box);
      sec.appendChild(card);
    });
  }

  /* ---------- 5. Calcule cu numere generate ---------- */
  function parseNum(s) { return parseFloat(String(s).replace(',', '.').replace(/[^0-9eE+\-.]/g, '')); }
  var KINDS = ['tip timp', 'tip spațiu', 'lumină (Δs = 0)'];

  function buildCalc(root, defs) {
    if (!defs.length) return;
    var sec = section(root, 'calc', 'Tip 5', 'Probleme de calcul',
      'Ca la test: date simple, formule din foaie. Numerele se schimbă la fiecare variantă — apasă „Altă variantă” până ți se par ușoare. Răspunsurile se acceptă cu o mică toleranță de rotunjire.');
    defs.forEach(function (def) {
      var card = el('div', { class: 'pb-card' });
      card.appendChild(el('h3', { text: def.title }));
      var host = el('div');
      card.appendChild(host);
      sec.appendChild(card);
      function render() {
        host.innerHTML = '';
        var pr = def.gen();
        host.appendChild(el('p', { class: 'pb-stmt__t', html: pr.text }));
        var grid = el('div', { class: 'pb-parts' });
        var inputs = [];
        pr.parts.forEach(function (pt) {
          var row = el('div', { class: 'pb-part' });
          row.appendChild(el('label', { class: 'pb-part__k', text: pt.k }));
          var inp;
          if (pt.yn !== undefined || pt.kind !== undefined) {
            inp = el('select', { class: 'pb-in' });
            var opts = pt.yn !== undefined ? ['—', 'DA', 'NU'] : ['—'].concat(KINDS);
            opts.forEach(function (o, i) { inp.appendChild(el('option', { value: String(i), text: o })); });
          } else {
            inp = el('input', { class: 'pb-in', type: 'text', inputmode: 'decimal', autocomplete: 'off', placeholder: 'răspuns' });
          }
          row.appendChild(inp);
          var mark = el('span', { class: 'pb-mark' });
          row.appendChild(mark);
          inputs.push({ pt: pt, inp: inp, mark: mark, row: row });
          grid.appendChild(row);
        });
        host.appendChild(grid);
        var acts = el('div', { class: 'pb-acts' });
        var bCheck = el('button', { class: 'btn btn--primary', type: 'button', text: 'Verifică' });
        var bSol = el('button', { class: 'btn', type: 'button', text: 'Arată rezolvarea' });
        var bNew = el('button', { class: 'btn btn--ghost', type: 'button', text: '↻ Altă variantă' });
        acts.appendChild(bCheck); acts.appendChild(bSol); acts.appendChild(bNew);
        host.appendChild(acts);
        var out = el('div', { class: 'pb-out' });
        host.appendChild(out);
        var sol = el('div', { class: 'pb-why', hidden: true });
        sol.appendChild(el('p', { class: 'pb-sol__t', text: 'Rezolvare pas cu pas' }));
        var ol = el('ol', { class: 'pb-steps' });
        pr.steps.forEach(function (s) { ol.appendChild(el('li', { html: s })); });
        sol.appendChild(ol);
        host.appendChild(sol);

        bCheck.addEventListener('click', function () {
          var ok = 0;
          inputs.forEach(function (o) {
            var pt = o.pt, good;
            if (pt.yn !== undefined) { var v = +o.inp.value; good = v === (pt.yn ? 1 : 2); }
            else if (pt.kind !== undefined) { good = +o.inp.value === pt.kind + 1; }
            else {
              var x = parseNum(o.inp.value);
              good = isFinite(x) && Math.abs(x - pt.ans) <= Math.max(pt.tol * Math.abs(pt.ans), pt.abs || 0);
            }
            o.row.classList.toggle('is-right', !!good);
            o.row.classList.toggle('is-wrong', !good);
            o.mark.textContent = good ? '✓' : '✗';
            if (good) ok++;
          });
          out.innerHTML = '';
          out.appendChild(verdict(ok === inputs.length, ok + ' din ' + inputs.length + ' răspunsuri corecte' + (ok === inputs.length ? '.' : ' — vezi rezolvarea și încearcă din nou.')));
        });
        bSol.addEventListener('click', function () { sol.hidden = !sol.hidden; bSol.textContent = sol.hidden ? 'Arată rezolvarea' : 'Ascunde rezolvarea'; });
        bNew.addEventListener('click', render);
      }
      render();
    });
  }

  /* ---------- pagina: alegerea capitolului ---------- */
  function calcById(id) { for (var i = 0; i < P.calc.length; i++) if (P.calc[i].id === id) return P.calc[i]; return null; }
  function chapterSets(id) {
    var c = P.ch[id];
    return {
      af: c.af.map(function (a) { return { t: a[0], a: a[1], why: a[2] }; }),
      single: c.single, combo: c.combo, short: c.short,
      calc: c.calc.map(calcById).filter(Boolean)
    };
  }
  function sample(a, k) { return shuffle(a).slice(0, k); }
  function mixedSets() {
    var af = [], single = [], combo = [], short = [], calc = [];
    Object.keys(P.ch).forEach(function (k) {
      var s = chapterSets(k);
      af = af.concat(s.af); single = single.concat(s.single); combo = combo.concat(s.combo); short = short.concat(s.short);
    });
    return { af: sample(af, 5), single: sample(single, 4), combo: sample(combo, 2), short: sample(short, 2), calc: sample(P.calc, 2) };
  }

  var root, chips;
  function select(sel) {
    root.innerHTML = '';
    var sets, head;
    if (sel === 'mix') {
      sets = mixedSets();
      head = el('div', { class: 'pb-head' });
      head.appendChild(el('h2', { text: 'Test amestecat' }));
      head.appendChild(el('p', { class: 'pb-lead', text: 'Itemi aleși la întâmplare din toate capitolele, în ordinea tipurilor de la test. Apasă „Alt test” pentru alt set.' }));
      var nb = el('button', { class: 'btn btn--primary', type: 'button', text: '↻ Alt test' });
      nb.addEventListener('click', function () { select('mix'); });
      head.appendChild(nb);
    } else {
      var id = Number(sel), ch = RF.chapter(id);
      sets = chapterSets(id);
      head = el('div', { class: 'pb-head' });
      head.appendChild(el('h2', { text: 'Capitolul ' + id + ' · ' + ch.title }));
      head.appendChild(el('p', { class: 'pb-lead', html: 'Itemi ca la test, doar din acest capitol. <a href="' + RF.chapterUrl(ch) + '">Recitește capitolul →</a>' }));
    }
    root.appendChild(head);
    buildAF(root, sets.af); buildSingle(root, sets.single); buildCombo(root, sets.combo); buildShort(root, sets.short); buildCalc(root, sets.calc);
    [].forEach.call(chips.children, function (c) { c.classList.toggle('is-active', c.getAttribute('data-sel') === String(sel)); });
  }
  function fromHash() {
    var h = (location.hash || '').replace('#', '');
    if (h === 'mix') return 'mix';
    var m = /^cap(\d+)$/.exec(h);
    return m && P.ch[m[1]] ? m[1] : '1';
  }

  RF.probleme = {
    init: function () {
      root = RF.$('#pb-root'); chips = RF.$('#pb-chaps');
      if (!root || !chips) return;
      RF.chapters.forEach(function (c) {
        var a = el('a', { class: 'chip pb-chip', href: '#cap' + c.id, 'data-sel': String(c.id), title: c.title, html: '<b>' + c.id + '</b><span> ' + c.title + '</span>' });
        chips.appendChild(a);
      });
      chips.appendChild(el('a', { class: 'chip pb-chip pb-chip--mix', href: '#mix', 'data-sel': 'mix', html: '<b>★</b><span> Test amestecat</span>' }));
      window.addEventListener('hashchange', function () { select(fromHash()); window.scrollTo(0, chips.getBoundingClientRect().top + window.pageYOffset - 70); });
      select(fromHash());
    }
  };
})();
