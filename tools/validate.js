#!/usr/bin/env node
/* Validator pentru capitole.
   Folosire:  node tools/validate.js          (toate capitolele existente)
              node tools/validate.js 5 6      (doar capitolele 5 și 6)
   Verifică: sintaxa JS, structura paginii HTML, datele (rezumat, glosar, întrebări),
   simulările referite de pagină și ancorele „ref” ale întrebărilor. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const pad = (n) => String(n).padStart(2, '0');
let errors = 0, warns = 0;
function err(ch, msg) { errors++; console.log('  ✗ [cap ' + ch + '] ' + msg); }
function warn(ch, msg) { warns++; console.log('  ! [cap ' + ch + '] ' + msg); }

function syntax(file, ch) {
  try { execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' }); }
  catch (e) { err(ch, 'eroare de sintaxă în ' + path.relative(root, file) + ': ' + String(e.stderr || e.message).split('\n').slice(0, 4).join(' | ')); }
}

function loadData(file) {
  let reg = null;
  const ctx = { RF: { register: (d) => { reg = d; } } };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file });
  return reg;
}

function loadSims(files) {
  const sims = {};
  files.forEach((f) => {
    const ctx = { RF: { sims: sims }, window: {}, document: {} };
    ctx.window = ctx;
    vm.createContext(ctx);
    try { vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: f }); } catch (e) { /* codul de pornire poate folosi RF.*; ne interesează doar RF.sims.x = … */ }
  });
  return Object.keys(sims);
}

function stripTags(s) { return String(s).replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim(); }

function checkChapter(n) {
  const ch = n;
  const dataFile = path.join(root, 'assets/js/data/cap' + pad(n) + '.js');
  const capDir = path.join(root, 'cap');
  const page = fs.existsSync(capDir) ? fs.readdirSync(capDir).find((f) => f.startsWith(pad(n) + '-') && f.endsWith('.html')) : null;
  console.log('\nCapitolul ' + n + (page ? '  (' + page + ')' : ''));
  if (!page) { err(ch, 'lipsește pagina cap/' + pad(n) + '-*.html'); return; }
  if (!fs.existsSync(dataFile)) { err(ch, 'lipsește assets/js/data/cap' + pad(n) + '.js'); return; }

  /* ---------- HTML ---------- */
  const html = fs.readFileSync(path.join(capDir, page), 'utf8');
  const ids = {};
  (html.match(/\sid="([^"]+)"/g) || []).forEach((m) => {
    const id = m.slice(5, -1);
    if (ids[id]) err(ch, 'id duplicat în pagină: ' + id);
    ids[id] = true;
  });
  if (!new RegExp('<body[^>]*data-chapter="' + n + '"').test(html)) err(ch, 'lipsește <body data-chapter="' + n + '">');
  if (!/class="hero"/.test(html)) err(ch, 'lipsește <header class="hero">');
  if (!new RegExp('class="quiz"[^>]*data-chapter="' + n + '"|data-chapter="' + n + '"[^>]*class="quiz"').test(html)) err(ch, 'lipsește <div class="quiz" data-chapter="' + n + '">');
  if (!new RegExp('data-summary="' + n + '"').test(html)) err(ch, 'lipsește <aside class="say" data-summary="' + n + '">');
  if (!/RF\.init\(\)/.test(html)) err(ch, 'lipsește RF.init()');
  if (!/class="sec"/.test(html)) err(ch, 'lipsesc secțiunile <section class="sec">');
  ['mituri', 'spune', 'test'].forEach((id) => { if (!ids[id]) warn(ch, 'recomandat: secțiune cu id="' + id + '"'); });
  if (/[şţŞŢ]/.test(html)) err(ch, 'diacritice cu sedilă (ş ţ) în HTML — folosește ș ț (virgulă dedesubt)');
  if (/\bTODO\b|lorem ipsum/i.test(html)) err(ch, 'TODO / lorem ipsum rămas în pagină');
  const nSims = (html.match(/data-sim="/g) || []).length;
  const nSteps = (html.match(/class="steps"/g) || []).length;
  console.log('  pagină: ' + nSims + ' simulări, ' + nSteps + ' secvențe „pe pași”, ' + (html.match(/class="predict"/g) || []).length + ' „ghicește”, ' + (html.match(/class="myth"/g) || []).length + ' mituri');
  if (nSims < 2) warn(ch, 'puține simulări (' + nSims + ') — țintă: cel puțin 2');
  if (nSteps < 1) warn(ch, 'nicio secvență „pe pași” — adaugă una unde are sens');

  /* scripturi referite */
  const scripts = (html.match(/<script[^>]+src="([^"]+)"/g) || []).map((s) => s.match(/src="([^"]+)"/)[1]);
  const simFiles = [];
  scripts.forEach((s) => {
    const f = path.resolve(capDir, s);
    if (!fs.existsSync(f)) { err(ch, 'script inexistent: ' + s); return; }
    syntax(f, ch);
    if (/\/sims\//.test(s)) simFiles.push(f);
  });
  if (!scripts.some((s) => /data\/cap/.test(s) && s.indexOf('cap' + pad(n) + '.js') >= 0)) err(ch, 'pagina nu încarcă assets/js/data/cap' + pad(n) + '.js');
  /* simulările trebuie să folosească biblioteca de ilustrații (RF.art), nu doar linii și puncte */
  if (nSims > 0 && !/art\.js"/.test(html)) warn(ch, 'pagina nu încarcă assets/js/art.js (biblioteca de ilustrații)');
  simFiles.forEach((f) => {
    const src = fs.readFileSync(f, 'utf8');
    const artCalls = (src.match(/\bA\.[a-zA-Z]+\(|RF\.art\.[a-zA-Z]+\(/g) || []).length;
    if (artCalls < 6) warn(ch, path.basename(f) + ': folosește foarte puțin RF.art (' + artCalls + ' apeluri) — desenele par încă „linii și puncte”?');
  });
  const defined = loadSims(simFiles);
  (html.match(/data-sim="([^"]+)"/g) || []).forEach((m) => {
    const name = m.slice(10, -1);
    if (defined.indexOf(name) < 0) err(ch, 'simularea „' + name + '” e folosită în pagină, dar nu e definită (RF.sims.' + name + ')');
  });
  /* css propriu */
  (html.match(/<link[^>]+href="([^"]+)"/g) || []).forEach((l) => {
    const href = l.match(/href="([^"]+)"/)[1];
    if (/^https?:/.test(href)) { err(ch, 'resursă externă: ' + href); return; }
    if (!fs.existsSync(path.resolve(capDir, href))) err(ch, 'CSS inexistent: ' + href);
  });
  if (/<script[^>]+src="https?:/.test(html)) err(ch, 'script extern — fără dependențe externe');

  /* ---------- date ---------- */
  syntax(dataFile, ch);
  let d;
  try { d = loadData(dataFile); } catch (e) { err(ch, 'datele nu se pot încărca: ' + e.message); return; }
  if (!d) { err(ch, 'fișierul de date nu apelează RF.register({...})'); return; }
  if (d.id !== n) err(ch, 'id-ul din date (' + d.id + ') nu e ' + n);

  const sum = d.summary || [];
  if (sum.length < 4) err(ch, 'rezumat prea scurt (' + sum.length + ' intrări; minim 4)');
  sum.forEach((s, i) => { if (!s.q || !s.a) err(ch, 'rezumat[' + i + '] fără q sau a'); });
  const gl = d.glossary || [];
  if (gl.length < 4) err(ch, 'glosar prea scurt (' + gl.length + '; minim 4)');
  gl.forEach((g, i) => { if (!g.term || !g.def) err(ch, 'glosar[' + i + '] fără term sau def'); });

  const quiz = d.quiz || [];
  if (quiz.length < 15) err(ch, 'bancă de întrebări prea mică (' + quiz.length + '; minim 15)');
  const seen = {}, types = { single: 0, multi: 0, spot: 0 };
  let longestCorrect = 0, singles = 0;
  quiz.forEach((q, i) => {
    const tag = (q.id || 'întrebarea #' + (i + 1));
    if (!q.id || !new RegExp('^c' + n + 'q\\d+$').test(q.id)) err(ch, tag + ': id trebuie să fie de forma c' + n + 'q<număr>');
    if (seen[q.id]) err(ch, tag + ': id duplicat'); seen[q.id] = true;
    if (!types.hasOwnProperty(q.type)) { err(ch, tag + ': type invalid (' + q.type + ')'); return; }
    types[q.type]++;
    if (!q.q || stripTags(q.q).length < 12) err(ch, tag + ': întrebare lipsă/prea scurtă');
    if (!q.explain || stripTags(q.explain).length < 12) err(ch, tag + ': lipsește explain');
    if (!q.ref || !q.ref.id) warn(ch, tag + ': fără ref {id,label} (recitește secțiunea)');
    else if (!ids[q.ref.id]) err(ch, tag + ': ref.id „' + q.ref.id + '” nu există ca id în pagină');
    const opts = q.type === 'spot' ? (q.steps || []).map((s) => ({ t: s.t, ok: !!s.bad, why: s.why })) : (q.options || []);
    if (q.type === 'spot') {
      if (opts.length < 4 || opts.length > 7) err(ch, tag + ': spot cere 4–7 pași');
      if (!opts.some((o) => o.ok)) err(ch, tag + ': spot fără niciun pas bad:true');
      opts.forEach((o, k) => { if (o.ok && !o.why) err(ch, tag + ': pasul greșit #' + (k + 1) + ' fără why'); });
    } else {
      if (opts.length < 3 || opts.length > 6) err(ch, tag + ': ' + opts.length + ' variante (3–6)');
      const nOk = opts.filter((o) => o.ok).length;
      if (q.type === 'single' && nOk !== 1) err(ch, tag + ': single cere exact 1 variantă corectă (are ' + nOk + ')');
      if (q.type === 'multi' && (nOk < 2 || nOk >= opts.length)) err(ch, tag + ': multi cere ≥2 corecte și cel puțin una greșită');
      opts.forEach((o, k) => {
        if (!o.t || stripTags(o.t).length < 2) err(ch, tag + ': varianta #' + (k + 1) + ' fără text');
        if (!o.why || stripTags(o.why).length < 8) err(ch, tag + ': varianta #' + (k + 1) + ' fără explicație (why)');
      });
      if (q.type === 'single') {
        singles++;
        const len = (o) => stripTags(o.t).length;
        const max = Math.max.apply(null, opts.map(len));
        const ok = opts.find((o) => o.ok);
        if (ok && len(ok) === max && opts.filter((o) => len(o) === max).length === 1) longestCorrect++;
      }
    }
    const blob = JSON.stringify(q);
    if (/[şţŞŢ]/.test(blob)) err(ch, tag + ': diacritice cu sedilă (ş ţ) — folosește ș ț');
    if (/toate (de )?mai sus|niciuna dintre cele de mai sus/i.test(blob)) warn(ch, tag + ': evită „toate de mai sus”');
  });
  if (types.single < 5) warn(ch, 'puține întrebări single (' + types.single + '; țintă ≥ 5)');
  if (types.multi < 4) warn(ch, 'puține întrebări multi (' + types.multi + '; țintă ≥ 4)');
  if (types.spot < 2) warn(ch, 'puține întrebări spot (' + types.spot + '; țintă ≥ 2)');
  if (singles >= 5 && longestCorrect / singles > 0.55) warn(ch, 'răspunsul corect e cel mai lung în ' + longestCorrect + '/' + singles + ' întrebări single — egalizează lungimile');
  if (/[şţŞŢ]/.test(JSON.stringify(sum) + JSON.stringify(gl))) err(ch, 'diacritice cu sedilă în rezumat/glosar');
  console.log('  date: ' + quiz.length + ' întrebări (single ' + types.single + ', multi ' + types.multi + ', spot ' + types.spot + '), rezumat ' + sum.length + ', glosar ' + gl.length);
}

let list = process.argv.slice(2).map(Number).filter(Boolean);
if (!list.length) {
  const capDir = path.join(root, 'cap');
  list = fs.readdirSync(capDir).map((f) => parseInt(f, 10)).filter((x) => x > 0).sort((a, b) => a - b);
}
list.forEach(checkChapter);
console.log('\n' + (errors ? '✗ ' + errors + ' erori' : '✓ fără erori') + (warns ? ', ' + warns + ' avertismente' : ''));
process.exit(errors ? 1 : 0);
