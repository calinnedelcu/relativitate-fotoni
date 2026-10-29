/* ==========================================================================
   Relativitate & Fotoni — steps.js
   Secvențe „pe pași” (povești interactive). Autor:
     <div class="steps" data-title="Titlu">
       <div class="steps__stage"><figure data-sim="...">…</figure></div>   (opțional)
       <section class="step" data-stage="0">…</section>
       <section class="step" data-stage="1">…<div class="predict">…</div></section>
     </div>
   La fiecare pas se trimite evenimentul `rf:step` pe elementul .steps, cu
   detail = {index, count, stage, step}. Simulările din .stage îl ascultă.
   Un pas cu .predict blochează „Continuă” până răspunzi.
   ========================================================================== */
(function (global) {
  'use strict';
  var RF = global.RF, el = RF.el;
  RF.steps = {};

  function build(box) {
    if (box._rf) return;
    box._rf = true;
    var title = box.getAttribute('data-title') || 'Povestea';
    var stageEl = RF.$(':scope > .steps__stage', box);
    var items = RF.$$(':scope > .step', box);
    if (!items.length) return;

    var counter = el('span', { class: 'steps__count' });
    var head = el('div', { class: 'steps__head' }, [el('span', { class: 'steps__badge', text: 'Pe pași' }), el('span', { text: title }), counter]);
    var layout = el('div', { class: 'steps__layout' });
    var body = el('div', { class: 'steps__body' });
    var list = el('div', { class: 'steps__items' });
    items.forEach(function (s) { list.appendChild(s); });
    var prev = el('button', { type: 'button', class: 'btn', text: '← Înapoi' });
    var next = el('button', { type: 'button', class: 'btn btn--primary', text: 'Continuă →' });
    var dots = el('div', { class: 'steps__dots', role: 'tablist' });
    var dotEls = items.map(function (s, i) {
      var d = el('i', { role: 'tab', 'aria-label': 'Pasul ' + (i + 1) });
      d.addEventListener('click', function () { if (i <= maxReached) go(i, true); });
      dots.appendChild(d);
      return d;
    });
    body.appendChild(list);
    body.appendChild(el('div', { class: 'steps__nav' }, [prev, dots, next]));
    if (stageEl) { box.classList.add('has-stage'); layout.appendChild(stageEl); }
    layout.appendChild(body);
    box.appendChild(head);
    box.appendChild(layout);
    box.setAttribute('tabindex', '-1');

    var idx = 0, maxReached = 0;

    function gated(s) {
      if (s.getAttribute('data-gate') === 'off') return false;
      if (s._unlocked) return false;
      return s.hasAttribute('data-gate') || !!RF.$('.predict', s);
    }
    function refresh() {
      var s = items[idx], last = idx === items.length - 1;
      items.forEach(function (x, i) { x.hidden = i !== idx; });
      dotEls.forEach(function (d, i) {
        d.classList.toggle('is-on', i === idx);
        d.classList.toggle('is-done', i < idx || (i <= maxReached && i !== idx));
      });
      prev.disabled = idx === 0;
      counter.textContent = (idx + 1) + ' / ' + items.length;
      var g = gated(s);
      next.disabled = g && !last;
      next.textContent = last ? 'Reia povestea ↺' : (g ? 'Răspunde ca să continui' : 'Continuă →');
      next.disabled = g;
    }
    function go(i, user) {
      idx = RF.clamp(i, 0, items.length - 1);
      maxReached = Math.max(maxReached, idx);
      refresh();
      var st = items[idx];
      var stage = st.hasAttribute('data-stage') ? Number(st.getAttribute('data-stage')) : idx;
      box.dispatchEvent(new CustomEvent('rf:step', { detail: { index: idx, count: items.length, stage: stage, step: st } }));
      if (user && box.getBoundingClientRect().top < 64) {
        global.scrollTo({ top: global.pageYOffset + box.getBoundingClientRect().top - 76, behavior: RF.reduced ? 'auto' : 'smooth' });
      }
    }
    prev.addEventListener('click', function () { go(idx - 1, true); });
    next.addEventListener('click', function () {
      if (idx === items.length - 1) { maxReached = 0; items.forEach(function (s) { s._unlocked = false; }); go(0, true); }
      else go(idx + 1, true);
    });
    box.addEventListener('rf:predict', function () {
      items[idx]._unlocked = true;
      refresh();
    });
    box.addEventListener('keydown', function (e) {
      if (e.target.closest && e.target.closest('input,select,textarea')) return;
      if (e.key === 'ArrowRight' && !next.disabled && idx < items.length - 1) go(idx + 1, true);
      if (e.key === 'ArrowLeft' && idx > 0) go(idx - 1, true);
    });
    box._rfGo = go;
    box._rfUnlock = function (stepEl) { stepEl._unlocked = true; refresh(); };
    go(0, false);
  }

  RF.steps.init = function (root) {
    RF.$$('.steps', root || document).forEach(build);
  };
  /* deblochează un pas (pentru simulări care cer o acțiune înainte de „Continuă”) */
  RF.steps.unlock = function (stepEl) {
    var box = stepEl.closest('.steps');
    if (box && box._rfUnlock) box._rfUnlock(stepEl);
  };
  RF.steps.goto = function (box, i) { if (box && box._rfGo) box._rfGo(i, true); };
})(window);
