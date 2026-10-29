/* ==========================================================================
   Relativitate & Fotoni — quiz.js
   Motor de teste conceptuale.
   Tipuri de întrebări (în RF.chapter(id).quiz):
     single : o singură variantă corectă
     multi  : mai multe corecte, punctaj parțial (corecte − greșite) / total corecte
     spot   : „găsește greșeala” — pași de raționament, unul (sau mai mulți) are bad:true
   Format:
     { id:'c5q3', type:'single', scenario:'(opțional, HTML)', q:'întrebare (HTML)',
       options:[{t:'text', ok:true|false, why:'de ce (apare după verificare)'}],
       explain:'ideea-cheie (HTML)', ref:{id:'sectiune', label:'Titlu secțiune'} }
     { id:'c5q9', type:'spot', q:'Care pas conține greșeala?',
       steps:[{t:'Pasul 1'}, {t:'Pasul 2', bad:true, why:'de ce e greșit'}], explain:'…' }
   ========================================================================== */
(function (global) {
  'use strict';
  var RF = global.RF, el = RF.el;
  RF.quiz = {};

  var KIND = { single: 'Alege varianta corectă', multi: 'Bifează TOATE afirmațiile adevărate', spot: 'Găsește greșeala' };

  /* ---------- alegerea întrebărilor ---------- */
  function weight(ch, q) {
    var r = RF.store.qstat(ch, q.id);
    if (!r) return 3;            // încă nevăzută
    return r.last < 0.999 ? 2.4 : 1;   // greșită data trecută
  }
  function pick(entries, n) {
    var pool = entries.map(function (e) { return { e: e, w: weight(e.ch, e.q) }; }), out = [];
    n = Math.min(n, pool.length);
    while (out.length < n) {
      var tot = 0; pool.forEach(function (p) { tot += p.w; });
      var r = Math.random() * tot, k = 0;
      for (; k < pool.length - 1; k++) { r -= pool[k].w; if (r <= 0) break; }
      out.push(pool[k].e); pool.splice(k, 1);
    }
    return out;
  }
  function entriesOf(ch) {
    var c = RF.chapter(ch);
    return ((c && c.quiz) || []).map(function (q) { return { ch: ch, q: q }; });
  }
  /* pregătește o întrebare: normalizează „spot”, amestecă variantele */
  function prepare(entry) {
    var q = entry.q, opts;
    if (q.type === 'spot') {
      opts = (q.steps || []).map(function (s, i) { return { t: s.t, ok: !!s.bad, why: s.why, n: i + 1 }; });
    } else {
      opts = (q.options || []).map(function (o) { return { t: o.t, ok: !!o.ok, why: o.why }; });
      opts = (q.keepOrder ? opts : RF.shuffle(opts));
    }
    var nOk = opts.filter(function (o) { return o.ok; }).length;
    var multi = q.type === 'multi' || (q.type === 'spot' && nOk > 1);
    return { id: q.id, ch: entry.ch, type: q.type || 'single', multi: multi, scenario: q.scenario, q: q.q, opts: opts, explain: q.explain, ref: q.ref, nOk: nOk, spot: q.type === 'spot' };
  }
  function scoreOf(p, sel) {
    if (p.multi) {
      var tp = 0, fp = 0;
      sel.forEach(function (i) { if (p.opts[i].ok) tp++; else fp++; });
      return p.nOk ? Math.max(0, (tp - fp) / p.nOk) : 0;
    }
    return sel.length === 1 && p.opts[sel[0]].ok ? 1 : 0;
  }

  /* ---------- montarea unui test ---------- */
  /* cfg: {chapter, mixed:false, n:7, perChapter:2, title} */
  function mount(host, cfg) {
    cfg = cfg || {};
    var mixed = !!cfg.mixed;
    var st = { run: [], i: 0, scores: [], sel: [], checked: false };
    host.classList.add('quiz');

    function bank() {
      if (mixed) {
        var all = [];
        RF.chapters.forEach(function (c) { all = all.concat(entriesOf(c.id)); });
        return all;
      }
      return entriesOf(cfg.chapter);
    }
    function wrongEntries() {
      var out = [];
      bank().forEach(function (e) {
        var r = RF.store.qstat(e.ch, e.q.id);
        if (r && r.last < 0.999) out.push(e);
      });
      return out;
    }

    function shell(inner) {
      host.innerHTML = '';
      var bar = el('div', { class: 'quiz__bar' }, [el('i')]);
      var head = el('div', { class: 'quiz__head' }, [el('span', { text: cfg.title || (mixed ? 'Test amestecat' : 'Verifică-te') }), bar, el('span', { class: 'quiz__n' })]);
      var body = el('div', { class: 'quiz__body' });
      host.appendChild(head); host.appendChild(body);
      host.classList.remove('is-checked');
      inner(body, bar.firstChild, RF.$('.quiz__n', head));
    }

    /* ----- ecranul de start ----- */
    function intro() {
      var entries = bank();
      shell(function (body, bar, nEl) {
        nEl.textContent = '';
        if (!entries.length) {
          body.appendChild(el('div', { class: 'quiz__intro', html: '<h3>Testul se pregătește</h3><p>Întrebările pentru această parte nu sunt încă adăugate.</p>' }));
          return;
        }
        var wrong = wrongEntries();
        var seen = entries.filter(function (e) { return RF.store.qstat(e.ch, e.q.id); }).length;
        var att = mixed ? RF.store.attempts('mix') : RF.store.attempts(cfg.chapter);
        var last = att.length ? att[att.length - 1] : null;
        var nShort = mixed ? Math.min((cfg.perChapter || 2) * RF.chapters.filter(function (c) { return (c.quiz || []).length; }).length, entries.length) : Math.min(cfg.n || 7, entries.length);
        var intro = el('div', { class: 'quiz__intro' });
        intro.innerHTML = '<h3>' + (mixed ? 'Test final amestecat' : 'Testează-ți înțelegerea') + '</h3>' +
          '<p style="color:var(--tx2);margin:0">Întrebări grele, de gândire — fără calcule. Capcanele sunt făcute din greșelile pe care le fac cei mai mulți. După fiecare întrebare vezi de ce fiecare variantă e bună sau nu.</p>';
        var stats = el('div', { class: 'quiz__stats' });
        stats.appendChild(el('span', { class: 'pill', text: 'Bancă: ' + entries.length + ' întrebări' }));
        stats.appendChild(el('span', { class: 'pill', text: 'Încercate: ' + seen + ' / ' + entries.length }));
        if (last) stats.appendChild(el('span', { class: 'pill', text: 'Ultimul scor: ' + Math.round(last.s * 100) + '%' }));
        intro.appendChild(stats);
        var act = el('div', { class: 'quiz__actions' });
        var b1 = el('button', { type: 'button', class: 'btn btn--primary', text: 'Test scurt · ' + nShort + ' întrebări' });
        b1.addEventListener('click', function () { start(mixed ? mixedPick() : pick(entries, nShort)); });
        act.appendChild(b1);
        if (!mixed && entries.length > nShort) {
          var b2 = el('button', { type: 'button', class: 'btn', text: 'Toate cele ' + entries.length });
          b2.addEventListener('click', function () { start(RF.shuffle(entries)); });
          act.appendChild(b2);
        }
        if (mixed && entries.length > nShort) {
          var nMar = Math.min(30, entries.length);
          var b3 = el('button', { type: 'button', class: 'btn', text: 'Maraton · ' + nMar + ' întrebări' });
          b3.addEventListener('click', function () { start(pick(entries, nMar)); });
          act.appendChild(b3);
        }
        if (wrong.length) {
          var b4 = el('button', { type: 'button', class: 'btn', text: 'Repetă greșelile (' + wrong.length + ')' });
          b4.addEventListener('click', function () { start(RF.shuffle(wrong).slice(0, 15)); });
          act.appendChild(b4);
        }
        intro.appendChild(act);
        body.appendChild(intro);
      });
    }
    function mixedPick() {
      var per = cfg.perChapter || 2, out = [];
      RF.chapters.forEach(function (c) { out = out.concat(pick(entriesOf(c.id), per)); });
      return RF.shuffle(out);
    }

    function start(entries) {
      st.run = entries.map(prepare); st.i = 0; st.scores = [];
      question();
    }

    /* ----- o întrebare ----- */
    function question() {
      var p = st.run[st.i];
      st.sel = []; st.checked = false;
      shell(function (body, bar, nEl) {
        bar.style.width = (st.i / st.run.length * 100) + '%';
        nEl.textContent = (st.i + 1) + ' / ' + st.run.length;
        if (mixed) {
          var c = RF.chapter(p.ch);
          body.appendChild(el('div', { class: 'q__chap', text: 'Cap. ' + p.ch + ' · ' + (c ? c.title : '') }));
        }
        body.appendChild(el('span', { class: 'q__kind', text: p.multi && p.type !== 'multi' ? 'Bifează toți pașii greșiți' : KIND[p.type] || KIND.single }));
        if (p.scenario) body.appendChild(el('div', { class: 'q__scenario', html: p.scenario }));
        body.appendChild(el('div', { class: 'q__text', html: p.q }));
        if (p.multi && p.type === 'multi') body.appendChild(el('div', { class: 'q__hint', text: 'Punctaj parțial: o bifă greșită scade din ce ai câștigat.' }));
        var list = el('div', { class: 'q__opts' });
        var name = 'q' + Math.random().toString(36).slice(2, 8);
        p.opts.forEach(function (o, i) {
          var input = el('input', { type: p.multi ? 'checkbox' : 'radio', name: name });
          var mark = el('span', { class: 'qopt__mark', text: p.spot ? String(o.n) : String.fromCharCode(65 + i) });
          var main = el('div', { class: 'qopt__main' }, [el('div', { class: 'qopt__t', html: o.t })]);
          var lab = el('label', { class: 'qopt' + (p.multi ? ' qopt--multi' : '') }, [input, mark, main]);
          input.addEventListener('change', function () {
            if (st.checked) return;
            if (p.multi) { st.sel = RF.$$('input', list).map(function (x, k) { return x.checked ? k : -1; }).filter(function (k) { return k >= 0; }); }
            else st.sel = [i];
            RF.$$('.qopt', list).forEach(function (l, k) { l.classList.toggle('is-picked', st.sel.indexOf(k) >= 0); });
            check.disabled = !st.sel.length;
          });
          list.appendChild(lab);
        });
        body.appendChild(list);
        var act = el('div', { class: 'quiz__actions' });
        var check = el('button', { type: 'button', class: 'btn btn--primary', text: 'Verifică' });
        check.disabled = true;
        check.addEventListener('click', function () { doCheck(p, body, list, act, check, bar); });
        act.appendChild(check);
        body.appendChild(act);
      });
    }

    function doCheck(p, body, list, act, check, bar) {
      if (st.checked || !st.sel.length) return;
      st.checked = true;
      host.classList.add('is-checked');
      var sc = scoreOf(p, st.sel);
      st.scores.push(sc);
      RF.store.answer(p.ch, p.id, sc);
      RF.$$('input', list).forEach(function (x) { x.disabled = true; });
      RF.$$('.qopt', list).forEach(function (lab, i) {
        var o = p.opts[i], picked = st.sel.indexOf(i) >= 0;
        var cls = picked && o.ok ? 'is-ok' : picked && !o.ok ? 'is-bad' : !picked && o.ok ? 'is-missed' : 'is-neutral';
        lab.classList.remove('is-picked'); lab.classList.add(cls);
        var lbl = cls === 'is-ok' ? 'Corect:' : cls === 'is-bad' ? 'Capcană:' : cls === 'is-missed' ? (p.multi ? 'Trebuia bifat:' : 'Răspunsul corect:') : 'De ce nu:';
        if (o.why) lab.querySelector('.qopt__main').appendChild(el('div', { class: 'qopt__why', 'data-lbl': lbl, html: o.why }));
      });
      check.remove();
      var vcls = sc > 0.999 ? 'is-full' : sc > 0 ? 'is-part' : 'is-zero';
      var vtxt = sc > 0.999 ? 'Corect' : sc > 0 ? 'Parțial · ' + Math.round(sc * 100) + '%' : 'Greșit';
      body.insertBefore(el('div', { class: 'q__verdict ' + vcls, text: vtxt }), act);
      if (p.explain) {
        body.insertBefore(el('div', { class: 'q__explain', html: '<span class="callout__title">Ideea-cheie</span>' + p.explain }), act);
      }
      bar.style.width = ((st.i + 1) / st.run.length * 100) + '%';
      var last = st.i === st.run.length - 1;
      var nxt = el('button', { type: 'button', class: 'btn btn--primary', text: last ? 'Vezi rezultatul' : 'Continuă →' });
      nxt.addEventListener('click', function () {
        if (last) result(); else { st.i++; question(); host.scrollIntoView({ block: 'nearest', behavior: RF.reduced ? 'auto' : 'smooth' }); }
      });
      act.appendChild(nxt);
      nxt.focus({ preventScroll: true });
    }

    /* ----- rezultatul ----- */
    function result() {
      var n = st.run.length, sum = 0;
      st.scores.forEach(function (s) { sum += s; });
      var pct = Math.round(100 * sum / n);
      if (mixed) RF.store.attempt('mix', sum / n, n); else RF.store.attempt(cfg.chapter, sum / n, n);
      shell(function (body, bar, nEl) {
        bar.style.width = '100%'; nEl.textContent = 'Gata';
        var verdict = pct >= 85 ? 'Excelent — ai înțeles ideile, nu doar formulele.' : pct >= 60 ? 'Bine, dar mai ai câteva capcane de dezamorsat.' : 'Merită să recitești capitolul, apoi încearcă din nou.';
        var box = el('div', { class: 'quiz__result' });
        box.innerHTML = '<div class="quiz__score" style="--p:' + pct + '"><b>' + pct + '%</b></div><h3>' + verdict + '</h3>';
        var ul = el('ul', { class: 'quiz__list' });
        st.run.forEach(function (p, i) {
          var sc = st.scores[i], cls = sc > 0.999 ? 'is-full' : sc > 0 ? 'is-part' : '';
          var c = RF.chapter(p.ch), link = '';
          if (sc < 0.999 && p.ref && c) {
            link = ' <a href="' + RF.chapterUrl(c) + '#' + p.ref.id + '">Recitește: ' + (p.ref.label || 'secțiunea') + ' →</a>';
          }
          var plain = String(p.q).replace(/<[^>]+>/g, '');
          if (plain.length > 120) plain = plain.slice(0, 117) + '…';
          ul.appendChild(el('li', { html: '<span class="dot ' + cls + '"></span><span>' + plain + link + '</span>' }));
        });
        box.appendChild(ul);
        var act = el('div', { class: 'quiz__actions', style: 'justify-content:center' });
        var again = el('button', { type: 'button', class: 'btn btn--primary', text: 'Alt test (întrebări noi)' });
        again.addEventListener('click', intro);
        act.appendChild(again);
        box.appendChild(act);
        body.appendChild(box);
      });
      host.scrollIntoView({ block: 'start', behavior: RF.reduced ? 'auto' : 'smooth' });
    }

    intro();
  }

  RF.quiz.mount = mount;
  RF.quiz.init = function (root) {
    RF.$$('.quiz[data-chapter]', root || document).forEach(function (h) {
      if (h._rf) return; h._rf = true;
      mount(h, { chapter: Number(h.getAttribute('data-chapter')), n: Number(h.getAttribute('data-n')) || 7 });
    });
    RF.$$('.quiz[data-mixed]', root || document).forEach(function (h) {
      if (h._rf) return; h._rf = true;
      mount(h, { mixed: true, perChapter: Number(h.getAttribute('data-per')) || 2 });
    });
  };
})(window);
