/* ==========================================================================
   Relativitate & Fotoni — ui.js
   Controale pentru simulări (RF.ui.*) și componentele de pagină
   (ghicește, mituri, termeni cu explicație).
   ========================================================================== */
(function (global) {
  'use strict';
  var RF = global.RF, el = RF.el, uid = 0;

  RF.ui = {};

  /* cursor: RF.ui.slider(parinte, {label, min, max, step, value, fmt(v), onInput(v), tone:'s2'|'light', wide}) */
  RF.ui.slider = function (parent, o) {
    var id = 'rfsl' + (++uid);
    var wrap = el('div', { class: 'ui-slider' + (o.tone ? ' is-' + o.tone : '') + (o.wide ? ' ui-wide' : '') });
    var lab = el('label', { for: id, html: o.label || '' });
    var val = el('output', { class: 'ui-slider__val', for: id });
    var input = el('input', { type: 'range', id: id, min: o.min, max: o.max, step: o.step || 'any', value: o.value });
    wrap.appendChild(el('div', { class: 'ui-slider__top' }, [lab, val]));
    wrap.appendChild(input);
    parent.appendChild(wrap);
    var fmt = o.fmt || function (v) { return String(v); };
    function paint() {
      var v = parseFloat(input.value);
      input.style.setProperty('--p', ((v - o.min) / (o.max - o.min) * 100) + '%');
      val.textContent = fmt(v);
    }
    input.addEventListener('input', function () { paint(); if (o.onInput) o.onInput(parseFloat(input.value)); });
    paint();
    return {
      el: wrap, input: input,
      get: function () { return parseFloat(input.value); },
      set: function (v, silent) { input.value = v; paint(); if (!silent && o.onInput) o.onInput(parseFloat(input.value)); }
    };
  };

  /* butoane exclusive: RF.ui.segmented(parinte, {label, options:[{k,label}], value, onChange(k), wide}) */
  RF.ui.segmented = function (parent, o) {
    var field = el('div', { class: 'ui-field' + (o.wide ? ' ui-wide' : '') });
    if (o.label) field.appendChild(el('span', { html: o.label }));
    var seg = el('div', { class: 'ui-seg', role: 'group' });
    var cur = o.value;
    var btns = o.options.map(function (op) {
      var b = el('button', { type: 'button', 'aria-pressed': String(op.k === cur), html: op.label });
      b.addEventListener('click', function () { api.set(op.k); });
      seg.appendChild(b);
      return { k: op.k, b: b };
    });
    field.appendChild(seg);
    parent.appendChild(field);
    var api = {
      el: field,
      get: function () { return cur; },
      set: function (k, silent) {
        cur = k;
        btns.forEach(function (x) { x.b.setAttribute('aria-pressed', String(x.k === k)); });
        if (!silent && o.onChange) o.onChange(k);
      }
    };
    return api;
  };

  /* comutator: RF.ui.toggle(parinte, {label, value, onChange(bool)}) */
  RF.ui.toggle = function (parent, o) {
    var inp = el('input', { type: 'checkbox' });
    inp.checked = !!o.value;
    var lab = el('label', { class: 'ui-toggle' }, [inp, el('span', { class: 'ui-toggle__sw' }), el('span', { html: o.label })]);
    inp.addEventListener('change', function () { if (o.onChange) o.onChange(inp.checked); });
    parent.appendChild(lab);
    return {
      el: lab,
      get: function () { return inp.checked; },
      set: function (v, silent) { inp.checked = !!v; if (!silent && o.onChange) o.onChange(inp.checked); }
    };
  };

  /* rând de butoane: RF.ui.buttons(parinte, [{label, onClick, primary}]) -> {el, buttons} */
  RF.ui.buttons = function (parent, list) {
    var row = el('div', { class: 'ui-btns' });
    var out = list.map(function (b) {
      var x = el('button', { type: 'button', class: 'btn' + (b.primary ? ' btn--primary' : ''), html: b.label });
      x.addEventListener('click', function (e) { if (b.onClick) b.onClick(e, x); });
      row.appendChild(x);
      return x;
    });
    parent.appendChild(row);
    return { el: row, buttons: out };
  };

  /* afișaje: RF.ui.readouts(parinte, [{k, label}]) -> {set(k, text)} */
  RF.ui.readouts = function (parent, rows) {
    var box = el('div', { class: 'ui-readouts' }), map = {};
    rows.forEach(function (r) {
      var b = el('b', { text: '—' });
      box.appendChild(el('div', { class: 'ui-readout' }, [el('span', { html: r.label }), b]));
      map[r.k] = b;
    });
    parent.appendChild(box);
    return { el: box, set: function (k, t) { if (map[k]) map[k].textContent = t; } };
  };

  /* legendă: RF.ui.legend(parinte, [{color, label}]) */
  RF.ui.legend = function (parent, items) {
    var box = el('div', { class: 'ui-legend ui-wide' });
    items.forEach(function (it) {
      box.appendChild(el('span', { html: '<i style="background:' + it.color + '"></i>' + it.label }));
    });
    parent.appendChild(box);
    return box;
  };

  /* ---------- componente de pagină ---------- */
  RF.components = {};

  function initPredict(root) {
    RF.$$('.predict', root).forEach(function (p) {
      if (p._rf) return; p._rf = true;
      var correct = p.getAttribute('data-correct');
      var reveal = RF.$('.predict__reveal', p);
      if (reveal) reveal.hidden = true;
      if (!RF.$('.predict__tag', p)) p.insertBefore(el('span', { class: 'predict__tag', text: 'Ghicește întâi' }), p.firstChild);
      RF.$$('.predict__opts > li', p).forEach(function (li) {
        var b = el('button', { type: 'button', class: 'predict__opt', html: li.innerHTML });
        li.innerHTML = ''; li.appendChild(b);
        b.addEventListener('click', function () {
          if (p.hasAttribute('data-answered')) return;
          p.setAttribute('data-answered', '1');
          var k = li.getAttribute('data-k'), ok = true;
          if (correct) {
            ok = (k === correct);
            li.classList.add(ok ? 'is-right' : 'is-wrong');
            if (!ok) { var c = RF.$('.predict__opts > li[data-k="' + correct + '"]', p); if (c) c.classList.add('is-right'); }
          } else {
            li.classList.add('is-right');
          }
          if (reveal) reveal.hidden = false;
          p.dispatchEvent(new CustomEvent('rf:predict', { bubbles: true, detail: { ok: ok, k: k } }));
        });
      });
    });
  }

  function initMyths(root) {
    RF.$$('.myth', root).forEach(function (m) {
      if (m._rf) return; m._rf = true;
      var t = RF.$('.myth__true', m);
      if (!t) return;
      t.hidden = true;
      var btn = el('button', { type: 'button', class: 'myth__btn', text: 'Care e adevărul? →' });
      m.insertBefore(btn, t);
      btn.addEventListener('click', function () {
        var open = t.hidden;
        t.hidden = !open;
        btn.textContent = open ? 'Ascunde' : 'Care e adevărul? →';
      });
    });
  }

  var tip = null;
  function termDef(t) {
    var d = t.getAttribute('data-def');
    if (d) return d;
    var key = t.textContent.trim().toLowerCase();
    var g = RF.glossaryAll().filter(function (x) { return x.term.toLowerCase() === key; })[0];
    return g ? g.def : '';
  }
  function showTip(t) {
    var d = termDef(t);
    if (!d) return;
    if (!tip) { tip = el('div', { class: 'tip', role: 'tooltip' }); document.body.appendChild(tip); }
    tip.innerHTML = d; tip.hidden = false;
    var r = t.getBoundingClientRect();
    var left = Math.max(8, Math.min(global.innerWidth - tip.offsetWidth - 8, r.left));
    var top = r.bottom + 8;
    if (top + tip.offsetHeight > global.innerHeight - 8) top = Math.max(8, r.top - tip.offsetHeight - 8);
    tip.style.left = left + 'px'; tip.style.top = top + 'px';
  }
  function hideTip() { if (tip) tip.hidden = true; }
  function initTerms(root) {
    RF.$$('.term', root).forEach(function (t) {
      if (t._rf) return; t._rf = true;
      t.setAttribute('tabindex', '0');
      t.addEventListener('mouseenter', function () { showTip(t); });
      t.addEventListener('mouseleave', hideTip);
      t.addEventListener('focus', function () { showTip(t); });
      t.addEventListener('blur', hideTip);
      t.addEventListener('click', function (e) { e.stopPropagation(); showTip(t); });
    });
    global.addEventListener('scroll', hideTip, { passive: true });
    document.addEventListener('click', hideTip);
  }

  /* „Ce trebuie să poți spune la test”: <aside class="say" data-summary="N"></aside>
     se completează din RF.chapter(N).summary = [{q, a}] — aceeași sursă ca fișa de recapitulare. */
  function initSay(root) {
    RF.$$('.say[data-summary]', root).forEach(function (box) {
      if (box._rf) return; box._rf = true;
      var c = RF.chapter(box.getAttribute('data-summary'));
      if (!c || !c.summary || !c.summary.length) return;
      box.innerHTML = '<p class="say__sub">Încearcă să răspunzi cu vorbele tale, apoi deschide răspunsul-model.</p>';
      c.summary.forEach(function (it) {
        var d = el('details', { class: 'flash' }, [el('summary', { html: it.q }), el('div', { html: it.a })]);
        box.appendChild(d);
      });
    });
  }

  RF.components.init = function (root) {
    root = root || document;
    initPredict(root);
    initMyths(root);
    initTerms(root);
    initSay(root);
  };
})(window);
