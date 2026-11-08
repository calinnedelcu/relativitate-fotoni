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
  var tipN = 0;
  function section(root, id, kicker, title, lead) {
    var s = el('section', { class: 'pb-sec', id: id });
    s.appendChild(el('p', { class: 'pb-kicker', text: 'Tip ' + (++tipN) }));
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
  var LABELS = ['1 și 2', '1 și 3', '1 și 4', '2 și 3', '2 și 4', '3 și 4', '1, 2 și 3', '1, 2 și 4', '1, 3 și 4', '2, 3 și 4', 'toate'];
  function comboOpts(right) {
    var others = shuffle(LABELS.filter(function (l) { return l !== right; })).slice(0, 3).concat([right]);
    return LABELS.filter(function (l) { return others.indexOf(l) >= 0; });
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
      var qopts = q.o || comboOpts(right);
      var list = el('div', { class: 'pb-optlist' }), why = el('div', { class: 'pb-why', hidden: true });
      var btns = [];
      qopts.forEach(function (o, i) {
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

  /* ---------- Completează spațiile ---------- */
  function buildCloze(root, list) {
    if (!list.length) return;
    var sec = section(root, 'cloze', '', 'Completează spațiile',
      'Alege din listă cuvântul sau expresia potrivită pentru fiecare spațiu.');
    var card = el('div', { class: 'pb-card' });
    list.forEach(function (txt, i) {
      var row = el('div', { class: 'pb-stmt' });
      var p = el('p', { class: 'pb-stmt__t pb-cloze' });
      p.appendChild(el('span', { class: 'pb-n', text: (i + 1) + '. ' }));
      var sels = [];
      txt.split(/(\[\[[^\]]*\]\])/).forEach(function (part) {
        var m = /^\[\[([^\]]*)\]\]$/.exec(part);
        if (!m) { p.appendChild(document.createTextNode(part)); return; }
        var opts = m[1].split('|'), right = opts[0];
        var sel = el('select', { class: 'pb-sel' });
        sel.appendChild(el('option', { value: '', text: '—' }));
        shuffle(opts).forEach(function (o) { sel.appendChild(el('option', { value: o, text: o })); });
        sel._right = right; sels.push(sel);
        p.appendChild(sel);
      });
      row.appendChild(p);
      var out = el('div', { class: 'pb-out' });
      var btn = el('button', { class: 'btn btn--primary pb-btn-sm', type: 'button', text: 'Verifică' });
      btn.addEventListener('click', function () {
        var ok = 0;
        sels.forEach(function (x) { var good = x.value === x._right; x.classList.toggle('is-right', good); x.classList.toggle('is-wrong', !good); if (good) ok++; });
        out.innerHTML = '';
        var all = ok === sels.length;
        out.appendChild(verdict(all, all ? 'propoziția e completă și corectă.' : ok + ' din ' + sels.length + ' spații corecte' + '. Corect: <b>' + sels.map(function (x) { return x._right; }).join(' · ') + '</b>'));
      });
      row.appendChild(btn); row.appendChild(out);
      card.appendChild(row);
    });
    sec.appendChild(card);
  }

  /* ---------- Potrivește ---------- */
  function buildMatch(root, list) {
    if (!list.length) return;
    var sec = section(root, 'match', '', 'Potrivește', 'Alege pentru fiecare noțiune descrierea sau valoarea care i se potrivește.');
    list.forEach(function (m) {
      var card = el('div', { class: 'pb-card' });
      card.appendChild(el('h3', { text: m.t }));
      var rights = shuffle(m.pairs.map(function (p) { return p[1]; }));
      var sels = [];
      m.pairs.forEach(function (p) {
        var row = el('div', { class: 'pb-match' });
        row.appendChild(el('span', { class: 'pb-match__l', html: p[0] }));
        var sel = el('select', { class: 'pb-sel pb-sel--wide' });
        sel.appendChild(el('option', { value: '', text: '— alege —' }));
        rights.forEach(function (r) { sel.appendChild(el('option', { value: r, text: r })); });
        sel._right = p[1]; sels.push(sel);
        row.appendChild(sel);
        card.appendChild(row);
      });
      var out = el('div', { class: 'pb-out' });
      var btn = el('button', { class: 'btn btn--primary', type: 'button', text: 'Verifică' });
      btn.addEventListener('click', function () {
        var ok = 0;
        sels.forEach(function (x) { var good = x.value === x._right; x.classList.toggle('is-right', good); x.classList.toggle('is-wrong', !good); if (good) ok++; });
        out.innerHTML = '';
        out.appendChild(verdict(ok === sels.length, ok + ' din ' + sels.length + ' perechi corecte.'));
      });
      card.appendChild(el('div', { class: 'pb-acts' }, [btn]));
      card.appendChild(out);
      sec.appendChild(card);
    });
  }

  /* ---------- Ordonează pașii ---------- */
  function buildOrder(root, list) {
    if (!list.length) return;
    var sec = section(root, 'order', '', 'Ordonează pașii', 'Pașii sunt amestecați. Numerotează-i în ordinea corectă (1 = primul).');
    list.forEach(function (o) {
      var card = el('div', { class: 'pb-card' });
      card.appendChild(el('h3', { text: o.t }));
      var n = o.steps.length, sels = [];
      shuffle(o.steps.map(function (t, i) { return { t: t, i: i }; })).forEach(function (st) {
        var row = el('div', { class: 'pb-match' });
        var sel = el('select', { class: 'pb-sel' });
        sel.appendChild(el('option', { value: '', text: '—' }));
        for (var k = 1; k <= n; k++) sel.appendChild(el('option', { value: String(k), text: String(k) }));
        sel._right = String(st.i + 1); sels.push(sel);
        row.appendChild(sel);
        row.appendChild(el('span', { class: 'pb-match__l', html: st.t }));
        card.appendChild(row);
      });
      var out = el('div', { class: 'pb-out' });
      var btn = el('button', { class: 'btn btn--primary', type: 'button', text: 'Verifică' });
      btn.addEventListener('click', function () {
        var ok = 0;
        sels.forEach(function (x) { var good = x.value === x._right; x.classList.toggle('is-right', good); x.classList.toggle('is-wrong', !good); if (good) ok++; });
        out.innerHTML = '';
        out.appendChild(verdict(ok === n, ok + ' din ' + n + ' pași la locul lor.'));
      });
      card.appendChild(el('div', { class: 'pb-acts' }, [btn]));
      card.appendChild(out);
      sec.appendChild(card);
    });
  }

  /* ---------- 4. Construiește răspunsul (fără scris) ---------- */
  function buildShort(root, list) {
    if (!list.length) return;
    var sec = section(root, 'short', 'Tip 4', 'Construiește răspunsul',
      'La test ți se cere un răspuns scurt, cu justificare. Aici nu scrii nimic: <b>bifează propozițiile care ar face parte dintr-un răspuns corect</b> (unele sunt capcane), apoi apasă „Verifică”.');
    list.forEach(function (it, i) {
      var card = el('div', { class: 'pb-card' });
      card.appendChild(el('p', { class: 'pb-stmt__t', html: '<span class="pb-n">' + (i + 1) + '.</span> ' + it.q }));
      var cands = [];
      it.ok.forEach(function (t) { cands.push({ t: t, ok: true }); });
      it.bad.forEach(function (b) { cands.push({ t: b[0], ok: false, why: b[1] }); });
      cands = shuffle(cands);
      var list = el('div', { class: 'pb-picks' });
      cands.forEach(function (c) {
        var lab = el('label', { class: 'pb-pick' });
        var cb = el('input', { type: 'checkbox' });
        c.cb = cb; c.lab = lab;
        lab.appendChild(cb);
        lab.appendChild(el('span', { class: 'pb-pick__t', html: c.t }));
        c.note = el('span', { class: 'pb-pick__note', hidden: true });
        lab.appendChild(c.note);
        list.appendChild(lab);
      });
      card.appendChild(list);
      var acts = el('div', { class: 'pb-acts' });
      var bCheck = el('button', { class: 'btn btn--primary', type: 'button', text: 'Verifică' });
      var bModel = el('button', { class: 'btn', type: 'button', text: 'Arată răspunsul-model' });
      var bReset = el('button', { class: 'btn btn--ghost', type: 'button', text: '↺ Resetează' });
      acts.appendChild(bCheck); acts.appendChild(bModel); acts.appendChild(bReset);
      card.appendChild(acts);
      var out = el('div', { class: 'pb-out' });
      card.appendChild(out);
      var box = el('div', { class: 'pb-why', hidden: true });
      box.appendChild(el('div', { class: 'pb-model', html: it.model }));
      card.appendChild(box);
      var checked = false;
      bCheck.addEventListener('click', function () {
        var hit = 0, miss = 0, wrong = 0;
        cands.forEach(function (c) {
          var on = c.cb.checked;
          c.lab.classList.remove('is-right', 'is-wrong', 'is-miss');
          c.note.hidden = true;
          if (c.ok && on) { hit++; c.lab.classList.add('is-right'); }
          else if (c.ok && !on) { miss++; c.lab.classList.add('is-miss'); c.note.hidden = false; c.note.textContent = 'Lipsea: aceasta făcea parte din răspuns.'; }
          else if (!c.ok && on) { wrong++; c.lab.classList.add('is-wrong'); c.note.hidden = false; c.note.textContent = c.why || 'Nu face parte din răspunsul corect.'; }
        });
        var full = !miss && !wrong;
        out.innerHTML = '';
        out.appendChild(verdict(full, full ? 'răspuns complet și fără capcane.' : hit + ' din ' + it.ok.length + ' propoziții corecte bifate' + (wrong ? ', ' + wrong + ' capcană/capcane bifate' : '') + (miss ? ', ' + miss + ' lipsă' : '') + '.'));
        checked = true;
      });
      bModel.addEventListener('click', function () { box.hidden = !box.hidden; bModel.textContent = box.hidden ? 'Arată răspunsul-model' : 'Ascunde răspunsul-model'; });
      bReset.addEventListener('click', function () {
        cands.forEach(function (c) { c.cb.checked = false; c.lab.classList.remove('is-right', 'is-wrong', 'is-miss'); c.note.hidden = true; });
        out.innerHTML = '';
      });
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
  function pool(id) {
    var c = P.ch[id];
    return {
      af: c.af.map(function (a) { return { t: a[0], a: a[1], why: a[2] }; }),
      single: c.single || [], combo: c.combo || [], cloze: c.cloze || [], match: c.match || [], order: c.order || [], short: c.short || [],
      calc: (c.calc || []).map(calcById).filter(Boolean)
    };
  }
  function sample(a, k) { return shuffle(a).slice(0, k); }
  function chapterSets(id) {
    var p = pool(id);
    return { af: sample(p.af, 6), single: sample(p.single, 4), combo: sample(p.combo, 2), cloze: sample(p.cloze, 3), match: sample(p.match, 1), order: sample(p.order, 1), short: sample(p.short, 2), calc: p.calc };
  }
  function poolSize(id) {
    var p = pool(id);
    return p.af.length + p.single.length + p.combo.length + p.cloze.length + p.match.length + p.order.length + p.short.length + p.calc.length;
  }
  function mixedSets() {
    var all = { af: [], single: [], combo: [], cloze: [], match: [], order: [], short: [], calc: [] };
    Object.keys(P.ch).forEach(function (k) { var p = pool(k); Object.keys(all).forEach(function (t) { all[t] = all[t].concat(p[t]); }); });
    return { af: sample(all.af, 6), single: sample(all.single, 5), combo: sample(all.combo, 2), cloze: sample(all.cloze, 3), match: sample(all.match, 1), order: sample(all.order, 1), short: sample(all.short, 2), calc: sample(P.calc, 2) };
  }

  var root, chips;
  function select(sel) {
    root.innerHTML = '';
    tipN = 0;
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
      head.appendChild(el('p', { class: 'pb-lead', html: 'Itemi ca la test, doar din acest capitol (' + poolSize(id) + ' în bibliotecă; la fiecare „Alt set” apar alții). <a href="' + RF.chapterUrl(ch) + '">Recitește capitolul →</a>' }));
      var nb2 = el('button', { class: 'btn btn--primary', type: 'button', text: '↻ Alt set' });
      nb2.addEventListener('click', function () { select(sel); });
      head.appendChild(nb2);
    }
    root.appendChild(head);
    buildAF(root, sets.af); buildSingle(root, sets.single); buildCombo(root, sets.combo); buildCloze(root, sets.cloze); buildMatch(root, sets.match); buildOrder(root, sets.order); buildShort(root, sets.short); buildCalc(root, sets.calc);
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
