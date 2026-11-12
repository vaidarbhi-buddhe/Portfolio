/* Vaidarbhi Buddhe portfolio. Renders content from data.js (portfolioData). */
(function () {
  'use strict';
  var D = window.portfolioData || (typeof portfolioData !== 'undefined' ? portfolioData : null);
  if (!D) { document.body.classList.remove('is-loading'); return; }

  var $ = function (id) { return document.getElementById(id); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  };
  var CALM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var HOVER = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Equipment symbols (drawn around 0,0) ---------- */
  var SYM = {
    stirred: '<rect class="v" x="-24" y="-30" width="48" height="66" rx="22"/><rect class="v" x="-8" y="-46" width="16" height="12"/><path class="l" d="M0-34V12M-13 12H13"/>',
    moulder: '<path class="v" d="M-16-24h22l-6 14h-10z"/><rect class="v" x="-40" y="-10" width="68" height="26" rx="3"/><path class="l" d="M-34 10l8-14 8 14 8-14 8 14 8-14 8 14"/><path class="v" d="M28-4l14 7-14 7z"/>',
    exchanger: '<circle class="v" r="32"/><path class="l" d="M-32 0H-20L-12-14 0 14 12-14 20 0H32"/>',
    blender: '<path class="v" d="M-28-30V22a10 10 0 0 0 10 10h36a10 10 0 0 0 10-10V-30z"/><path class="l" d="M-28-8q7-6 14 0t14 0 14 0 14 0"/><path class="l" d="M0-44V16M-12 16H12"/>',
    packed: '<rect class="v" x="-22" y="-42" width="44" height="84" rx="20"/><path class="l" d="M-22-18H22M-22 18H22M-22-18L22 18M22-18L-22 18"/>',
    pump: '<path class="l" d="M-18 24l-8 14h52l-8-14"/><circle class="v" r="28"/><path class="f" d="M-11-15L17 0-11 15z"/>',
    instrument: '<circle class="v" r="34"/><path class="l" d="M-34 0H34"/><text class="bubble-t" text-anchor="middle" y="-9">AI</text><text class="bubble-t" text-anchor="middle" y="21">701</text>'
  };

  /* Chronological order = tag order on the diagram */
  var UNITS = [
    { id: 'clarion-organics', tag: 'R-101', sym: 'stirred', name: 'Clarion Organics', sub: 'Pharma intermediates', yr: '2023' },
    { id: 'sanjay-techno', tag: 'X-201', sym: 'moulder', name: 'Sanjay Techno', sub: 'Injection moulding', yr: '2024' },
    { id: 'indorama-synthetics', tag: 'E-301', sym: 'exchanger', name: 'Indorama Synthetics', sub: 'Insulation retrofit', yr: '2024' },
    { id: 'ultra-plus-lubes', tag: 'M-401', sym: 'blender', name: 'Ultra Plus Lubes', sub: 'Lubricant blending', yr: '2025' },
    { id: 'csir-iip', tag: 'R-501', sym: 'packed', name: 'CSIR-IIP', sub: 'Syngas to LPG', yr: '2025 to 26' },
    { id: 'dow-ditc', tag: 'P-601', sym: 'pump', name: 'Dow DITC', sub: 'EOR decline curves', yr: '2026' },
    { id: 'thesis', tag: 'AI-701', sym: 'instrument', name: 'ICT thesis', sub: 'Fault detection', yr: '2026 on' }
  ];
  var unitById = {};
  UNITS.forEach(function (u) { unitById[u.id] = u; });

  var T = D.thesis;
  var ITEMS = [{
    id: 'thesis', period: T.period, company: T.title, badge: T.badge,
    role: T.degree, location: T.institution, teaser: T.teaser, metrics: T.metrics,
    projectTitle: T.description, highlights: T.highlights, technologies: T.technologies,
    guide: 'Major guide: ' + T.majorGuide + '. Minor guide: ' + T.minorGuide + '.', wide: true
  }].concat(D.experiences.map(function (x) {
    var y = {}; for (var k in x) y[k] = x[k];
    if (x.guide) y.guide = 'Guide: ' + x.guide + '.';
    return y;
  }));
  var itemById = {};
  ITEMS.forEach(function (x) { itemById[x.id] = x; });

  /* ---------- Hero ---------- */
  function splitChars(el, start) {
    var txt = el.textContent;
    el.innerHTML = txt.split('').map(function (c, i) {
      return '<span class="ch" aria-hidden="true" style="--i:' + (start + i) + '">' + c + '</span>';
    }).join('');
    return txt.length;
  }
  function fitName() {
    var wrap = $('name-wrap'), l1 = $('name-l1'), l2 = $('name-l2'), pic = $('portrait');
    wrap.style.setProperty('--fs', '100px');
    var w = l1.getBoundingClientRect().width;
    if (!w) return;
    var fs = 100 * wrap.clientWidth / w;
    if (window.innerWidth > 820) fs = Math.min(fs, window.innerHeight * 0.34);
    wrap.style.setProperty('--fs', fs.toFixed(2) + 'px');
    var left = l2.getBoundingClientRect().width + fs * 0.09;
    pic.style.left = left + 'px';
    pic.style.width = Math.max(0, Math.min(wrap.clientWidth - left, fs * 1.5)) + 'px';
  }
  function drawHero() {
    var n = splitChars($('name-l1'), 0);
    splitChars($('name-l2'), n);
    $('lede').textContent = D.personal.summary;
    fitName();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitName);
    window.addEventListener('load', fitName);
    window.addEventListener('resize', fitName);

    var words = ['Aspen Plus', 'Aspen HYSYS', 'DWSIM', 'Python', 'MATLAB', 'Gas Chromatography', 'HPLC', 'Karl Fischer Titration', 'Six Sigma', 'Kaizen', 'PLC Blending', 'SAP ERP', 'Reaction Engineering', 'Heat Transfer', 'Decline Curve Analysis'];
    var one = words.map(function (w) { return '<span>' + w + '</span><i></i>'; }).join('');
    $('marquee').innerHTML = one + one;
  }
  function typeRoles() {
    var p = D.personal, el = $('typed');
    var roles = [p.title, p.degree, p.minor.replace('Minor: ', 'Minor in '), p.institution, p.classRank + ', CGPA ' + p.cgpa];
    if (CALM) { el.textContent = roles[0]; return; }
    var r = 0, i = 0, del = false;
    (function tick() {
      var s = roles[r];
      i += del ? -2 : 1;
      el.textContent = s.slice(0, Math.max(0, i));
      var wait = del ? 18 : 42;
      if (!del && i >= s.length) { del = true; wait = 1900; }
      else if (del && i <= 0) { del = false; r = (r + 1) % roles.length; wait = 300; }
      setTimeout(tick, wait);
    })();
  }

  /* ---------- Flow diagram ---------- */
  function drawPfd() {
    var svg = $('pfd-svg');
    var X0 = 190, DX = 170, HALF = 85, MID = 215, UP = 150, DOWN = 280;
    var d = 'M0 ' + MID + 'H' + (X0 - HALF);
    var parts = [];
    UNITS.forEach(function (u, i) {
      var x = X0 + i * DX, y = i % 2 ? DOWN : UP;
      d += 'V' + y + 'H' + (x + HALF);
      var up = y === UP;
      var ty = up ? y - 92 : y + 74;
      parts.push(
        '<a class="unit" href="#work" data-unit="' + u.id + '" style="--i:' + (i + 1) + '" aria-label="' + esc(u.tag + ', ' + u.name + ', ' + u.sub + ', ' + u.yr + '. Open case study') + '">' +
        '<rect class="hit" x="' + (x - 80) + '" y="' + (up ? y - 110 : y - 52) + '" width="160" height="162" rx="8"/>' +
        '<circle class="halo" cx="' + x + '" cy="' + y + '" r="38"/>' +
        '<g transform="translate(' + x + ' ' + y + ')"><g class="sym sym-in">' + SYM[u.sym] + '</g></g>' +
        '<text class="u-tag" text-anchor="middle" x="' + x + '" y="' + ty + '">' + u.tag + '</text>' +
        '<text class="u-name" text-anchor="middle" x="' + x + '" y="' + (ty + 20) + '">' + esc(u.name) + '</text>' +
        '<text class="u-sub" text-anchor="middle" x="' + x + '" y="' + (ty + 38) + '">' + esc(u.sub) + ', ' + u.yr + '</text>' +
        '</a>'
      );
    });
    d += 'V' + MID + 'H1380';
    svg.innerHTML =
      '<defs><linearGradient id="pipe-g" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1400" y2="0"><stop offset="0" stop-color="#2CF5C4"/><stop offset=".55" stop-color="#FFB300"/><stop offset="1" stop-color="#FF3B6B"/></linearGradient></defs>' +
      '<path class="pipe" pathLength="1" d="' + d + '"/>' +
      '<path class="pipe-flow" d="' + d + '"/>' +
      '<g class="end" style="--i:0"><text class="u-tag" x="10" y="' + (MID - 30) + '">Feed</text><text class="u-end" x="10" y="' + (MID - 12) + '">ICT Mumbai</text><text class="u-sub" x="10" y="' + (MID + 24) + '">2022 intake</text></g>' +
      parts.join('') +
      '<g class="end" style="--i:8"><path d="M1378 ' + (MID - 12) + 'L1399 ' + MID + ' 1378 ' + (MID + 12) + 'z" fill="#FF3B6B"/><text class="u-tag" x="1305" y="' + (MID + 26) + '">Product</text><text class="u-end" x="1305" y="' + (MID + 44) + '">Industry</text><text class="u-sub" x="1305" y="' + (MID + 61) + '">from 2027</text></g>';

    svg.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('.unit') : null;
      if (a) { e.preventDefault(); openModal(a.getAttribute('data-unit')); }
    });
  }

  /* ---------- Stats ---------- */
  function drawStats() {
    $('stats').innerHTML = D.stats.map(function (s, i) {
      return '<div class="stat glow reveal" style="--d:' + i + '"><b data-count="' + esc(s.value) + '">' + esc(s.value) + '</b><span>' + esc(s.label) + '</span><em>' + esc(s.highlight) + '</em></div>';
    }).join('');
  }
  function countUp(el) {
    var m = /^(\D*)([\d.]+)(.*)$/.exec(el.getAttribute('data-count'));
    if (!m || CALM) return;
    var end = parseFloat(m[2]), dec = (m[2].split('.')[1] || '').length, t0 = null;
    (function step(t) {
      if (!t0) t0 = t;
      var k = Math.min(1, (t - t0) / 1600), e = 1 - Math.pow(1 - k, 4);
      el.textContent = m[1] + (end * e).toFixed(dec) + m[3];
      if (k < 1) requestAnimationFrame(step);
    })(performance.now());
  }

  /* ---------- Experience cards and modal ---------- */
  function symSvg(u) { return '<svg viewBox="-50 -55 100 110" aria-hidden="true"><g class="sym">' + SYM[u.sym] + '</g></svg>'; }

  function drawSheets() {
    $('sheets').innerHTML = ITEMS.map(function (x, i) {
      var u = unitById[x.id];
      return '<button type="button" class="sheet glow reveal' + (x.wide ? ' wide' : '') + '" data-id="' + x.id + '" style="--d:' + (i % 2) + '">' +
        '<span class="sheet-top">' + symSvg(u) + '<span><span class="sheet-when">' + u.tag + ' / ' + esc(x.period) + '</span></span><span class="chip c2">' + esc(x.badge) + '</span></span>' +
        '<span class="sheet-h">' + esc(x.company) + '</span>' +
        '<span class="sheet-role">' + esc(x.role) + (x.location ? ', ' + esc(x.location) : '') + '</span>' +
        '<span class="sheet-teaser">' + esc(x.teaser) + '</span>' +
        '<span class="sheet-metrics">' + x.metrics.map(function (m) {
          return '<span><small>' + esc(m.label) + '</small><b>' + esc(m.val) + '</b></span>';
        }).join('') + '</span>' +
        '<span class="sheet-open"><i>+</i>Open case study</span>' +
      '</button>';
    }).join('');
    $('sheets').addEventListener('click', function (e) {
      var b = e.target.closest('.sheet');
      if (b) openModal(b.getAttribute('data-id'));
    });
  }

  function openModal(id) {
    var x = itemById[id], u = unitById[id], dlg = $('modal');
    if (!x) return;
    $('modal-body').innerHTML =
      '<div class="m-head">' + symSvg(u) + '<div><span class="sheet-when">' + u.tag + ' / ' + esc(x.period) + '</span>' +
      '<h2 class="m-title" id="modal-title">' + esc(x.company) + '</h2>' +
      '<p class="m-sub">' + esc(x.role) + (x.location ? ', ' + esc(x.location) : '') + '</p></div></div>' +
      '<span class="chip c2">' + esc(x.badge) + '</span>' + (x.category ? ' <span class="chip c1">' + esc(x.category) + '</span>' : '') +
      '<p class="m-proj">' + esc(x.projectTitle) + '</p>' +
      (x.guide ? '<p class="m-sub">' + esc(x.guide) + '</p>' : '') +
      '<div class="m-metrics">' + x.metrics.map(function (m) { return '<div><small>' + esc(m.label) + '</small><b>' + esc(m.val) + '</b></div>'; }).join('') + '</div>' +
      '<ul>' + x.highlights.map(function (h, i) { return '<li style="--i:' + i + '">' + esc(h) + '</li>'; }).join('') + '</ul>' +
      '<div class="m-tech">' + x.technologies.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>';
    if (dlg.showModal) { if (!dlg.open) dlg.showModal(); } else dlg.setAttribute('open', '');
    dlg.scrollTop = 0;
  }
  function bindModal() {
    var dlg = $('modal');
    var close = function () { if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); };
    $('modal-x').addEventListener('click', close);
    dlg.addEventListener('click', function (e) { if (e.target === dlg) close(); });
  }

  /* ---------- Reactor model ---------- */
  var DEF = { t: 260, p: 40, r: 1.8 };
  var S = { t: DEF.t, p: DEF.p, r: DEF.r };

  function selAt(temp, p, r) {
    var pf = Math.min(1, 0.45 + (p / 60) * 0.55);
    var rf = Math.exp(-Math.pow(r - 1.8, 2) / 1.8);
    var dt = temp - 265;
    return Math.min(84.5, Math.max(18, 68 * Math.exp(-(dt * dt) / 2200) * pf * rf + 12));
  }
  function model() {
    var conv = Math.min(96.5, Math.max(38, 45 + (S.t - 200) * 0.32 + (S.p - 20) * 0.45 + (S.r - 0.5) * 6));
    var lpg = selAt(S.t, S.p, S.r);
    var ch4 = Math.min(45, Math.max(4, (S.t > 280 ? (S.t - 280) * 0.4 : 6) + (S.r > 2 ? (S.r - 2) * 8 : 0)));
    var dme = Math.max(2, 100 - lpg - ch4 - 14);
    var co2 = Math.max(8, 100 - lpg - ch4 - dme);
    var y = conv * lpg / 100;
    return {
      conv: conv, lpg: lpg, yield: y,
      products: [
        { n: 'C₃H₈ (Propane)', v: y * 0.58, c: '#2CF5C4' },
        { n: 'C₄H₁₀ (Butane)', v: y * 0.42, c: '#3FC8FF' },
        { n: 'CH₄ (Methane)', v: conv * ch4 / 100, c: '#FF3B6B' },
        { n: 'DME / MeOH', v: conv * dme / 100, c: '#FFB300' },
        { n: 'CO₂ (WGS)', v: conv * co2 / 100, c: '#B37BFF' }
      ]
    };
  }

  function drawTrend() {
    var m = model();
    var W = 640, H = 340, L = 46, R = 30, Tp = 22, B = 36;
    var cw = W - L - R, ch = H - Tp - B;
    var px = function (t) { return L + (t - 200) / 150 * cw; };
    var py = function (v) { return Tp + ch - v / 100 * ch; };
    var s = '<defs><linearGradient id="curve-g" x1="0" x2="1"><stop offset="0" stop-color="#2CF5C4"/><stop offset=".5" stop-color="#FFB300"/><stop offset="1" stop-color="#FF3B6B"/></linearGradient>' +
      '<linearGradient id="area-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2CF5C4" stop-opacity=".3"/><stop offset="1" stop-color="#2CF5C4" stop-opacity="0"/></linearGradient></defs>';
    for (var g = 0; g <= 100; g += 20) {
      s += '<line class="t-grid" x1="' + L + '" x2="' + (W - R) + '" y1="' + py(g) + '" y2="' + py(g) + '"/>' +
           '<text class="t-axis" text-anchor="end" x="' + (L - 8) + '" y="' + (py(g) + 4) + '">' + g + '%</text>';
    }
    for (var t = 200; t <= 350; t += 30) {
      s += '<text class="t-axis" text-anchor="middle" x="' + px(t) + '" y="' + (H - 12) + '">' + t + '°C</text>';
    }
    s += '<rect class="t-band" x="' + px(255) + '" y="' + Tp + '" width="' + (px(275) - px(255)) + '" height="' + ch + '"/>';
    var pts = [];
    for (var q = 200; q <= 350; q += 3) pts.push(px(q).toFixed(1) + ' ' + py(selAt(q, S.p, S.r)).toFixed(1));
    s += '<path class="t-area" d="M' + pts.join('L') + 'L' + px(350) + ' ' + py(0) + 'L' + px(200) + ' ' + py(0) + 'z"/>';
    s += '<path class="t-curve" d="M' + pts.join('L') + '"/>';
    var cx = px(S.t), cy = py(m.lpg);
    s += '<line class="t-drop" x1="' + cx + '" x2="' + cx + '" y1="' + cy + '" y2="' + py(0) + '"/>';
    s += '<circle class="t-ring" cx="' + cx + '" cy="' + cy + '" r="8"/><circle class="t-dot" cx="' + cx + '" cy="' + cy + '" r="8"/>';
    var lx = Math.min(W - R - 80, Math.max(L + 80, cx));
    s += '<text class="t-label" text-anchor="middle" x="' + lx + '" y="' + (cy - 20) + '">LPG ' + m.lpg.toFixed(1) + '% @ ' + S.t + '°C</text>';
    $('trend-svg').innerHTML = s;

    $('ro-conv').textContent = m.conv.toFixed(1) + '%';
    $('ro-sel').textContent = m.lpg.toFixed(1) + '%';
    $('ro-yield').textContent = m.yield.toFixed(1) + '%';
    $('ro-phase').textContent = S.t < 240 ? 'Gas-Liquid Mix' : 'Vapor Phase';

    var bars = $('product-bars');
    if (!bars.children.length) {
      bars.innerHTML = m.products.map(function (p) {
        return '<li><div class="pb-row"><span>' + p.n + '</span><b></b></div><div class="pb-track"><div class="pb-fill" style="background:' + p.c + ';box-shadow:0 0 14px ' + p.c + '"></div></div></li>';
      }).join('');
    }
    m.products.forEach(function (p, i) {
      var li = bars.children[i];
      li.querySelector('b').textContent = p.v.toFixed(1) + '%';
      li.querySelector('.pb-fill').style.width = Math.min(100, p.v / 60 * 100).toFixed(1) + '%';
    });

    var rows = [
      ['Temperature (°C)', '25.0', S.t + '.0', '42.5'],
      ['Pressure (bar)', S.p + '.0', (S.p - 0.8).toFixed(1), '12.0'],
      ['H₂ / CO ratio', S.r.toFixed(2), '0.34 (consumed)', '0.00'],
      ['CO conversion', '0.0%', m.conv.toFixed(1) + '%', '100% recycled'],
      ['Total LPG yield', '0.0 kmol/h', m.yield.toFixed(1) + ' mol%', (m.yield * 1.42).toFixed(2) + ' MT/day']
    ];
    $('stream-table').innerHTML = '<caption>Aspen Plus (RGibbs) 27-reaction stream synthesis balance</caption>' +
      '<thead><tr><th scope="col">Stream name</th><th scope="col">FEED-SYNGAS</th><th scope="col">REACTOR-OUT</th><th scope="col">LPG-FRACTION</th></tr></thead><tbody>' +
      rows.map(function (r) { return '<tr><th scope="row">' + r[0] + '</th><td>' + r[1] + '</td><td>' + r[2] + '</td><td>' + r[3] + '</td></tr>'; }).join('') + '</tbody>';
  }

  function bindReactor() {
    var t = $('sp-t'), p = $('sp-p'), r = $('sp-r');
    function sync() {
      S.t = +t.value; S.p = +p.value; S.r = +r.value;
      $('sp-t-out').textContent = S.t + ' °C';
      $('sp-p-out').textContent = S.p + ' bar';
      $('sp-r-out').textContent = S.r.toFixed(1) + ' : 1';
      drawTrend();
    }
    [t, p, r].forEach(function (el) { el.addEventListener('input', sync); });
    $('sp-reset').addEventListener('click', function () { t.value = DEF.t; p.value = DEF.p; r.value = DEF.r; sync(); });
    $$('.view').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('.view').forEach(function (o) { o.classList.toggle('is-on', o === b); o.setAttribute('aria-selected', o === b ? 'true' : 'false'); });
        ['curve', 'bars', 'table'].forEach(function (v) { $('pane-' + v).hidden = v !== b.getAttribute('data-view'); });
      });
    });
    sync();
  }

  /* ---------- Skills, education, leadership ---------- */
  function drawSkills() {
    var tierClass = function (t) { return /Lead/.test(t) ? 'c2' : /Advanced/.test(t) ? 'c1' : 'c3'; };
    var short = ['Simulation & modelling', 'Core chemical engineering', 'Lab & analytical', 'Operations & lean'];
    var tabs = $('sk-tabs'), panel = $('skills-grid'), ind = $('sk-ind');
    tabs.insertAdjacentHTML('beforeend', D.skillsData.map(function (c, i) {
      return '<button type="button" role="tab" class="sk-tab" id="sk-tab-' + i + '" aria-controls="skills-grid" aria-selected="' + (i === 0) + '" data-i="' + i + '">' +
        '<span>' + esc(short[i] || c.category) + '</span><b>' + c.skills.length + '</b></button>';
    }).join(''));

    function moveInd(btn) {
      ind.style.width = btn.offsetWidth + 'px';
      ind.style.height = btn.offsetHeight + 'px';
      ind.style.transform = 'translate(' + btn.offsetLeft + 'px,' + btn.offsetTop + 'px)';
    }
    function show(i) {
      var c = D.skillsData[i];
      $$('.sk-tab', tabs).forEach(function (t) {
        var on = +t.getAttribute('data-i') === i;
        t.setAttribute('aria-selected', on);
        t.tabIndex = on ? 0 : -1;
        if (on) { moveInd(t); panel.setAttribute('aria-labelledby', t.id); }
      });
      var lead = c.skills.filter(function (s) { return /Lead|Certified/.test(s.tier); }).length;
      panel.innerHTML =
        '<div class="sk-head"><h3>' + esc(c.category) + '</h3><p>' + c.skills.length + ' skills, ' + lead + ' at specialist level</p></div>' +
        '<div class="sk-grid">' + c.skills.map(function (s, k) {
          return '<article class="sk glow" style="--k:' + k + '">' +
            '<div class="sk-top"><span class="chip ' + tierClass(s.tier) + '">' + esc(s.tier) + '</span>' +
              (s.simLink ? '<a class="sk-sim" href="#reactor">Try simulator</a>' : '') + '</div>' +
            '<h4>' + esc(s.name) + '</h4>' +
            '<p class="sk-dom">' + esc(s.domain) + '</p>' +
            '<p class="sk-desc">' + esc(s.desc) + '</p>' +
            '<p class="sk-at"><span>Applied</span>' + esc(s.appliedAt) + '</p>' +
          '</article>';
        }).join('') + '</div>';
    }
    tabs.addEventListener('click', function (e) {
      var t = e.target.closest('.sk-tab');
      if (t) show(+t.getAttribute('data-i'));
    });
    tabs.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var all = $$('.sk-tab', tabs), cur = all.indexOf(document.activeElement);
      if (cur < 0) return;
      var nx = (cur + (e.key === 'ArrowRight' ? 1 : all.length - 1)) % all.length;
      all[nx].focus(); show(nx); e.preventDefault();
    });
    window.addEventListener('resize', function () {
      var on = tabs.querySelector('[aria-selected="true"]'); if (on) moveInd(on);
    });
    show(0);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { var on = tabs.querySelector('[aria-selected="true"]'); if (on) moveInd(on); });
  }

  function drawEdu() {
    $('edu-list').innerHTML = D.education.map(function (e, i) {
      return '<article class="edu-card glow reveal" style="--d:' + i + '">' +
        (e.badge ? '<span class="chip c2" style="align-self:flex-start">' + esc(e.badge) + '</span>' : '') +
        '<span class="when">' + esc(e.period) + '</span><h3>' + esc(e.degree) + '</h3>' +
        (e.minor ? '<p class="inst" style="color:var(--c1)">' + esc(e.minor) + '</p>' : '') +
        '<p class="inst">' + esc(e.institution) + '</p>' +
        '<p class="edu-grade">' + esc(e.grade) + '</p><p class="edu-rank">' + esc(e.rank) + '</p>' +
        '<ul>' + e.details.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul></article>';
    }).join('');
    $('cert-list').innerHTML = D.certificationsAndAwards.map(function (c, i) {
      return '<article class="cert glow reveal" style="--d:' + (i % 5) + '"><div class="cert-top"><span class="chip ' + (c.type === 'Certification' ? 'c1' : 'c2') + '">' + esc(c.type) + '</span><span class="when">' + esc(c.date) + '</span></div>' +
        '<h4>' + esc(c.title) + '</h4><p class="issuer">' + esc(c.issuer) + '</p><p>' + esc(c.desc) + '</p></article>';
    }).join('');
    $('lead-list').innerHTML = D.leadership.map(function (l, i) {
      return '<article class="lead-card glow reveal" style="--d:' + (i % 3) + '"><span class="when">' + esc(l.period) + '</span><h3>' + esc(l.role) + '</h3><p class="org">' + esc(l.org) + '</p><p>' + esc(l.description) + '</p></article>';
    }).join('');
    var GLYPH = { English: 'Aa', Marathi: 'म', Hindi: 'हि' };
    var SCRIPT = { English: 'Latin script', Marathi: 'Devanagari script', Hindi: 'Devanagari script' };
    $('lang-list').innerHTML = D.languages.map(function (l, i) {
      var parts = l.level.split('/').map(function (x) { return x.trim(); });
      return '<article class="lang glow reveal" style="--d:' + i + '">' +
        '<span class="lang-glyph" aria-hidden="true">' + (GLYPH[l.name] || l.name.slice(0, 2)) + '</span>' +
        '<div class="lang-body"><h4>' + esc(l.name) + '</h4><p class="lang-lvl">' + esc(parts[0]) + '</p>' +
        (parts[1] ? '<p class="lang-sub">' + esc(parts[1]) + '</p>' : '') +
        '<p class="lang-script">' + esc(SCRIPT[l.name] || '') + '</p></div></article>';
    }).join('');

    var ICON = {
      book: '<path d="M6 8h20a4 4 0 0 1 4 4v28a4 4 0 0 0-4-4H6z"/><path d="M42 8H30a4 4 0 0 0-4 4v28a4 4 0 0 1 4-4h12z"/><path class="ic-line" d="M11 16h10M11 22h10M11 28h6"/>',
      'pen-tool': '<path d="M10 38l4-12L32 8l8 8-18 18z"/><path d="M28 12l8 8"/><path class="ic-line" d="M6 42c6-2 10-2 16 0s10 2 16 0"/>',
      compass: '<circle cx="24" cy="24" r="17"/><path class="ic-spin" d="M30 18l-4 10-8 2 4-10z"/><circle cx="24" cy="24" r="1.6" fill="currentColor"/>',
      'message-square': '<path d="M8 10h22a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H18l-8 6v-6H8a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4z"/><path d="M38 18h2a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4h-2v5l-7-5h-9"/><path class="ic-line" d="M11 18h14M11 22h9"/>'
    };
    $('interest-list').innerHTML = D.interests.map(function (l, i) {
      return '<article class="hobby glow reveal" style="--d:' + i + '">' +
        '<svg class="hobby-ic" viewBox="0 0 48 48" aria-hidden="true">' + (ICON[l.icon] || ICON.book) + '</svg>' +
        '<h4>' + esc(l.name) + '</h4><p>' + esc(l.desc) + '</p></article>';
    }).join('');
  }

  /* ---------- Motion: headings, reveals, cursor, canvas ---------- */
  function splitHeadings() {
    $$('h2.split').forEach(function (h) {
      var words = h.textContent.trim().split(/\s+/);
      h.setAttribute('aria-label', words.join(' '));
      h.innerHTML = words.map(function (w, i) { return '<span class="w" aria-hidden="true"><span style="--i:' + i + '">' + esc(w) + '</span></span>'; }).join(' ');
    });
  }

  function bindReveal() {
    var els = $$('.reveal, h2.split');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        $$('[data-count]', en.target).forEach(countUp);
        if (en.target.classList.contains('pfd')) en.target.classList.add('is-live');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (e) { io.observe(e); });
  }

  function bindPointer() {
    if (!HOVER || CALM) return;
    var spot = $('spot'), tx = 0, ty = 0, x = 0, y = 0, on = false;
    document.addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!on) { on = true; x = tx; y = ty; spot.classList.add('on'); }
      var c = e.target.closest ? e.target.closest('.glow') : null;
      if (c) {
        var r = c.getBoundingClientRect();
        var mx = e.clientX - r.left, my = e.clientY - r.top;
        c.style.setProperty('--mx', mx + 'px');
        c.style.setProperty('--my', my + 'px');
        if (c.classList.contains('sheet')) {
          c.style.setProperty('--ry', ((mx / r.width - 0.5) * 5).toFixed(2) + 'deg');
          c.style.setProperty('--rx', ((0.5 - my / r.height) * 5).toFixed(2) + 'deg');
        }
      }
    }, { passive: true });
    (function loop() {
      x += (tx - x) * 0.12; y += (ty - y) * 0.12;
      spot.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
      requestAnimationFrame(loop);
    })();
  }

  function bindScrollBar() {
    var bar = $('progress'), tick = false;
    function upd() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? window.scrollY / max : 0).toFixed(4) + ')';
      tick = false;
    }
    window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  }

  /* Drifting molecule field behind the page */
  function startCanvas() {
    if (CALM) return;
    var cv = $('bg'), ctx = cv.getContext('2d'), W, H, pts = [], mouse = { x: -9999, y: -9999 }, run = true;
    var COL = ['44,245,196', '255,179,0', '255,59,107'];
    function size() {
      var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.max(24, Math.min(90, Math.round(W * H / 21000)));
      pts = [];
      for (var i = 0; i < n; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .45, vy: (Math.random() - .5) * .45, r: 1.2 + Math.random() * 2.4, c: COL[i % 7 === 0 ? 2 : i % 4 === 0 ? 1 : 0] });
    }
    function frame() {
      if (!run) return;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        var dx = p.x - mouse.x, dy = p.y - mouse.y, dd = dx * dx + dy * dy;
        if (dd < 22500 && dd > 1) { var f = (150 - Math.sqrt(dd)) / 150 * 0.6; p.vx += dx / Math.sqrt(dd) * f * 0.2; p.vy += dy / Math.sqrt(dd) * f * 0.2; }
        p.vx *= 0.985; p.vy *= 0.985;
        if (Math.abs(p.vx) < 0.08) p.vx += (Math.random() - .5) * 0.04;
        if (Math.abs(p.vy) < 0.08) p.vy += (Math.random() - .5) * 0.04;
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = W + 20; else if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20; else if (p.y > H + 20) p.y = -20;
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j], ex = p.x - q.x, ey = p.y - q.y, e2 = ex * ex + ey * ey;
          if (e2 < 16900) {
            ctx.strokeStyle = 'rgba(' + p.c + ',' + (0.32 * (1 - e2 / 16900)).toFixed(3) + ')';
            ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        ctx.fillStyle = 'rgba(' + p.c + ',.85)';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    size(); frame();
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(size, 200); });
    document.addEventListener('mousemove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    document.addEventListener('visibilitychange', function () { var was = run; run = !document.hidden; if (run && !was) frame(); });
  }

  /* ---------- Contact and nav ---------- */
  function bindMisc() {
    $$('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var text = btn.getAttribute('data-copy');
        var done = function () { btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = btn.getAttribute('data-label'); }, 1800); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () { window.prompt('Copy this', text); });
        else window.prompt('Copy this', text);
      });
    });

    $('contact-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var name = $('contact-name').value.trim(), email = $('contact-email').value.trim();
      var topic = $('contact-topic').value, msg = $('contact-message').value.trim();
      var subject = encodeURIComponent('[Portfolio Inquiry - ' + topic + '] Message from ' + name);
      var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nTopic: ' + topic + '\n\nMessage:\n' + msg);
      window.location.href = 'mailto:' + D.personal.email + '?subject=' + subject + '&body=' + body;
      $('form-note').textContent = 'Thank you, ' + name + '. Your email app is opening with the draft.';
    });

    if ('IntersectionObserver' in window) {
      var links = {};
      $$('.top-nav a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          var a = links[en.target.id];
          if (a && en.isIntersecting) {
            Object.keys(links).forEach(function (k) { links[k].removeAttribute('aria-current'); });
            a.setAttribute('aria-current', 'true');
          }
        });
      }, { rootMargin: '-40% 0px -55% 0px' });
      Object.keys(links).forEach(function (k) { var s = $(k); if (s) io.observe(s); });
    }
  }

  /* ---------- Loader ---------- */
  function runLoader(done) {
    var el = $('loader'), num = $('loader-num'), step = $('loader-step'), fill = $('flask-fill');
    var finished = false;
    function finish() {
      if (finished) return; finished = true;
      el.classList.add('done');
      document.body.classList.remove('is-loading');
      document.body.classList.add('ready');
      done();
    }
    if (CALM) { finish(); return; }
    var steps = ['Charging feed', 'Heating to 260 °C', 'Pressurising to 40 bar', 'Reaction at steady state'];
    var t0 = performance.now(), DUR = 1900;
    (function tick(t) {
      var k = Math.min(1, (t - t0) / DUR), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      num.textContent = Math.round(e * 100);
      fill.setAttribute('y', (150 - e * 105).toFixed(1));
      step.textContent = steps[Math.min(steps.length - 1, Math.floor(e * steps.length))];
      if (k < 1) requestAnimationFrame(tick); else setTimeout(finish, 250);
    })(t0);
    setTimeout(finish, 4000);
  }

  /* ---------- Boot ---------- */
  drawHero();
  drawPfd();
  drawStats();
  drawSheets();
  bindModal();
  bindReactor();
  drawSkills();
  drawEdu();
  splitHeadings();
  bindMisc();
  bindScrollBar();
  runLoader(function () {
    typeRoles();
    bindReveal();
    bindPointer();
    startCanvas();
  });
})();
