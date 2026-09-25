// Maz Figma Sprint: builds 3 pages of editable, auto-layout designs in the current file.
// Run in Figma desktop: Plugins > Development > Import plugin from manifest... > Run.

const hex = h => { const n = parseInt(h.slice(1), 16); return { r: (n >> 16 & 255) / 255, g: (n >> 8 & 255) / 255, b: (n & 255) / 255 }; };
const fill = h => [{ type: 'SOLID', color: hex(h) }];
const FILL = new Set();
const grow = n => { FILL.add(n); return n; };

// ---------- fonts (Google fonts available on free Figma; Inter fallback) ----------
const F = {};
const INTER = { Regular: 'Regular', Medium: 'Medium', SemiBold: 'Semi Bold', Bold: 'Bold', ExtraBold: 'Extra Bold' };
async function font(key, family, style) {
  try { await figma.loadFontAsync({ family, style }); F[key] = { family, style }; }
  catch (e) { const s = INTER[style] || 'Regular'; await figma.loadFontAsync({ family: 'Inter', style: s }); F[key] = { family: 'Inter', style: s }; }
}

// ---------- primitives ----------
function T(str, o = {}) {
  const t = figma.createText();
  t.fontName = o.f || F.r; t.fontSize = o.s || 14; t.characters = String(str);
  t.fills = fill(o.c || '#111111');
  if (o.lh) t.lineHeight = { value: o.lh, unit: 'PIXELS' };
  if (o.ls) t.letterSpacing = { value: o.ls, unit: 'PERCENT' };
  if (o.up) t.textCase = 'UPPER';
  if (o.w) { t.resize(o.w, t.height); t.textAutoResize = 'HEIGHT'; }
  if (o.grow) { grow(t); }
  t.name = o.n || String(str).slice(0, 32);
  return t;
}
function S(dir, o = {}, kids = []) {
  const f = figma.createFrame();
  f.name = o.n || (dir === 'V' ? 'Stack' : 'Row');
  f.layoutMode = dir === 'V' ? 'VERTICAL' : 'HORIZONTAL';
  f.itemSpacing = o.gap == null ? 8 : o.gap;
  const p = o.p == null ? 0 : o.p;
  const [pt, pr, pb, pl] = Array.isArray(p) ? (p.length === 2 ? [p[0], p[1], p[0], p[1]] : p) : [p, p, p, p];
  f.paddingTop = pt; f.paddingRight = pr; f.paddingBottom = pb; f.paddingLeft = pl;
  f.fills = o.bg ? fill(o.bg) : [];
  if (o.r) f.cornerRadius = o.r;
  if (o.stroke) { f.strokes = fill(o.stroke); f.strokeWeight = o.sw || 1; f.strokeAlign = 'INSIDE'; }
  f.primaryAxisSizingMode = 'AUTO'; f.counterAxisSizingMode = 'AUTO';
  if (o.align) f.counterAxisAlignItems = o.align;
  if (o.justify) f.primaryAxisAlignItems = o.justify;
  for (const k of kids) if (k) f.appendChild(k);
  for (const k of kids) if (k && FILL.has(k)) {
    k.layoutSizingHorizontal = 'FILL';
    if (k.type === 'TEXT') k.textAutoResize = 'HEIGHT';
  }
  if (o.w) { if (dir === 'V') f.counterAxisSizingMode = 'FIXED'; else f.primaryAxisSizingMode = 'FIXED'; f.resize(o.w, f.height); }
  if (o.grow) grow(f);
  return f;
}
const V = (o, k) => S('V', o, k);
const H = (o, k) => S('H', o, k);

// ---------- tiny reusable components (per page) ----------
function makeComponents(prefix, shelf, spec) {
  const out = {};
  for (const [name, build] of Object.entries(spec)) {
    const node = build(); shelf.appendChild(node);
    const c = figma.createComponentFromNode(node); c.name = `${prefix}/${name}`; out[name] = c;
  }
  return out;
}
function inst(comp, texts = [], style = {}) {
  const i = comp.createInstance();
  const ts = i.findAll(n => n.type === 'TEXT');
  texts.forEach((v, k) => { if (ts[k] && v != null) ts[k].characters = String(v); });
  if (style.bg) i.fills = fill(style.bg);
  if (style.fg) ts.forEach(t => t.fills = fill(style.fg));
  if (style.stroke) { i.strokes = fill(style.stroke); i.strokeWeight = 1; }
  if (style.grow) grow(i);
  return i;
}
function shelfFrame(page, label) {
  const s = H({ n: `Components — ${label}`, gap: 24, p: 24, bg: '#FFFFFF', stroke: '#E5E7EB', r: 8, align: 'CENTER' });
  page.appendChild(s); s.x = 0; s.y = -260; return s;
}
async function pageNamed(name, first) {
  const pg = first ? figma.root.children[0] : figma.createPage();
  pg.name = name; await figma.setCurrentPageAsync(pg); return pg;
}

// ======================================================================
// 01 EnderForge: calibration dashboard (desktop)
// ======================================================================
async function enderforge() {
  const pg = await pageNamed('01 EnderForge', true);
  const c = { bg: '#F3F4F6', surf: '#FFFFFF', ink: '#0F172A', mute: '#64748B', line: '#E2E8F0', acc: '#EA580C', accbg: '#FFEDD5', ok: '#15803D', okbg: '#DCFCE7', warn: '#B45309', warnbg: '#FEF3C7', idle: '#F1F5F9' };
  const shelf = shelfFrame(pg, 'EnderForge');
  const K = makeComponents('EF', shelf, {
    'Button/Primary': () => H({ p: [12, 20], r: 8, bg: c.acc, align: 'CENTER' }, [T('Primary action', { f: F.sb, s: 15, c: '#FFFFFF' })]),
    'Button/Secondary': () => H({ p: [12, 20], r: 8, bg: c.surf, stroke: c.line, align: 'CENTER' }, [T('Secondary', { f: F.sb, s: 15, c: c.ink })]),
    'Pill': () => H({ p: [5, 10], r: 999, bg: c.okbg, align: 'CENTER' }, [T('Status', { f: F.m, s: 12, c: c.ok })]),
    'Stage': () => V({ p: [10, 14], r: 10, bg: c.idle, gap: 2, w: 168 }, [T('1 · Stage', { f: F.sb, s: 14, c: c.ink }), T('Status', { f: F.r, s: 12, c: c.mute })]),
    'Card': () => V({ p: 20, r: 12, bg: c.surf, stroke: c.line, gap: 12, w: 400 }, [T('Card title', { f: F.sb, s: 13, c: c.mute, up: true, ls: 6 })]),
    'KV row': () => H({ gap: 12, w: 360, justify: 'SPACE_BETWEEN' }, [T('Label', { s: 14, c: c.mute }), T('Value', { f: F.mono, s: 13, c: c.ink })]),
  });
  const pill = (t, bg, fg) => inst(K.Pill, [t], { bg, fg });
  const btn = (t, primary = true) => inst(primary ? K['Button/Primary'] : K['Button/Secondary'], [t]);
  const kv = (a, b) => inst(K['KV row'], [a, b], { grow: true });
  const card = (title, kids) => { const i = inst(K.Card, [title], { grow: true }).detachInstance(); kids.forEach(k => { i.appendChild(k); if (FILL.has(k)) { k.layoutSizingHorizontal = 'FILL'; } }); return i; };

  // top bar
  const top = H({ n: 'Top bar', p: [14, 32], bg: c.ink, justify: 'SPACE_BETWEEN', align: 'CENTER', w: 1440 }, [
    H({ gap: 14, align: 'CENTER' }, [T('EnderForge', { f: F.b, s: 20, c: '#FFFFFF' }), pill('Ender 5 · SKR Mini E3 V2.0', '#1E293B', '#E2E8F0')]),
    H({ gap: 8, align: 'CENTER' }, [pill('OctoPrint · connected', c.okbg, c.ok), pill('Marlin 2.1.2.8 · Z400 steps', '#1E293B', '#E2E8F0'), pill('Heaters off · idle', c.okbg, c.ok)]),
  ]);

  // stage flow
  const stages = [
    ['1 · Connect', 'Done', c.okbg, c.ok], ['2 · Inspect', 'Stale · re-read after firmware', c.warnbg, c.warn],
    ['3 · Mechanical', 'Done', c.okbg, c.ok], ['4 · Level', 'Now · step 2 of 3', c.acc, '#FFFFFF'],
    ['5 · Extrusion', 'Next', c.idle, c.mute], ['6 · Motion', 'Locked until baseline', c.idle, c.mute], ['7 · Validate', 'Pending', c.idle, c.mute],
  ];
  const flow = H({ n: 'Stage flow', p: [16, 32], gap: 8, bg: c.surf, align: 'CENTER', w: 1440 }, stages.map(([n, s, bg, fg]) => {
    const i = inst(K.Stage, [n, s], { bg }); i.findAll(t => t.type === 'TEXT').forEach(t => t.fills = fill(fg === '#FFFFFF' ? '#FFFFFF' : (t.characters === n ? c.ink : fg))); return i;
  }));

  // bed map (220 x 220 mm, knobs at 30 mm inset)
  const bed = figma.createFrame(); bed.name = 'Bed map 220×220'; bed.resize(200, 200); bed.cornerRadius = 8; bed.fills = fill('#E7D9A8'); bed.strokes = fill('#C9B26B'); bed.strokeWeight = 1;
  [[28, 28, 'done'], [172, 28, 'now'], [172, 172, 'todo'], [28, 172, 'todo'], [100, 100, 'check']].forEach(([x, y, s], k) => {
    const e = figma.createEllipse(); const d = s === 'now' ? 22 : 16; e.resize(d, d); e.x = x - d / 2; e.y = y - d / 2;
    e.fills = fill(s === 'done' ? c.ok : s === 'now' ? c.acc : s === 'check' ? '#FFFFFF' : '#FFFFFF');
    e.strokes = fill(s === 'todo' || s === 'check' ? '#94A3B8' : '#FFFFFF'); e.strokeWeight = 2; e.name = ['front-left', 'front-right', 'back-right', 'back-left', 'centre check'][k]; bed.appendChild(e);
  });

  const current = V({ n: 'Current step', p: 28, r: 14, bg: c.surf, stroke: c.acc, sw: 2, gap: 16, grow: true }, [
    H({ gap: 12, align: 'CENTER' }, [pill('LEVEL · STEP 2 OF 3', c.accbg, c.acc), T('Corner tram', { f: F.b, s: 28, c: c.ink })]),
    T('Turn the knob nearest the nozzle until the paper just drags.', { f: F.m, s: 22, c: c.ink, lh: 30, grow: true }),
    T('Corner 2 of 4 · front-right · nozzle parked at Z0 · pass 1 of 2', { f: F.mono, s: 13, c: c.mute }),
    H({ gap: 28, align: 'CENTER' }, [bed, V({ gap: 10, w: 360 }, [
      T('Paper tight → turn that corner DOWN', { s: 15, c: c.ink }),
      T('Paper loose → turn it UP', { s: 15, c: c.ink }),
      T('Not sure which way? Turn ⅛ and feel again.', { s: 15, c: c.mute }),
      T('Corners affect each other, so two passes is normal.', { s: 13, c: c.mute, w: 340 }),
    ])]),
    H({ gap: 12, align: 'CENTER' }, [btn('Done: next corner'), btn('Stop and park bed', false), T('Keyboard: Enter', { f: F.mono, s: 12, c: c.mute })]),
  ]);
  const levelSteps = card('Level · 3 steps', [
    kv('1  Z height: silver screw + paper', 'Done'), kv('2  Corner tram (4 knobs)', 'In progress'), kv('3  Full-bed first-layer test', 'Next · ~12 min'),
  ]);
  const left = V({ n: 'Main', gap: 16, grow: true }, [current, levelSteps]);

  const safety = card('Safety', [
    kv('Nozzle', '21 °C · off'), kv('Bed', '21 °C · off'), kv('Motors', 'Holding position'),
    kv('Endstops', 'X open · Y open · Z open'), kv('Bed clear', 'Confirmed 10:42'), pill('Safe to move', c.okbg, c.ok),
  ]);
  const evidence = card('Evidence · ledger', [
    T('L-007  Z paper test: good after 2 rounds', { f: F.mono, s: 12, c: c.ink }),
    T('L-006  Home ×3: 3/3 clean', { f: F.mono, s: 12, c: c.ink }),
    T('L-005  Firmware 2.1.2.8 verified (M115, Z400)', { f: F.mono, s: 12, c: c.ink }),
    T('Open ledger →', { f: F.sb, s: 13, c: c.acc }),
  ]);
  const beforeAfter = card('Before / after', [
    T('Baseline cube not printed yet', { f: F.sb, s: 16, c: c.ink }),
    T('Unlocks after Extrusion: print the SD cube 3× and measure it. Every speed change is compared to this.', { s: 13, c: c.mute, w: 360 }),
    kv('Print time', '—  →  —'), kv('X / Y / Z (mm)', '—  →  —'), kv('Stringing / blobs / ringing', '—  →  —'),
  ]);
  const right = V({ n: 'Side', gap: 16, w: 400 }, [safety, evidence, beforeAfter]);
  const body = H({ n: 'Body', p: [24, 32], gap: 24, w: 1440 }, [left, right]);

  const next = H({ n: 'Next up', p: [16, 32], bg: c.surf, stroke: c.line, justify: 'SPACE_BETWEEN', align: 'CENTER', w: 1440 }, [
    T('Next up: full-bed first-layer test · ~12 min · ~0.4 m filament · you nudge Z live', { s: 15, c: c.ink }), btn('Preview test', false),
  ]);

  const screen = V({ n: 'Desktop — Calibration dashboard', bg: c.bg, w: 1440 }, [top, flow, body, next]);
  pg.appendChild(screen); screen.x = 0; screen.y = 0;
  return screen;
}

// ======================================================================
// 02 Maz Works: client-acquisition homepage (desktop)
// ======================================================================
async function mazworks() {
  const pg = await pageNamed('02 Maz Works');
  const c = { bg: '#FAFAF7', surf: '#FFFFFF', ink: '#0B0D12', mute: '#555D6C', line: '#E3E6EC', acc: '#2F5BFF', accbg: '#E3E9FF' };
  const shelf = shelfFrame(pg, 'Maz Works');
  const K = makeComponents('MW', shelf, {
    'Button/Primary': () => H({ p: [14, 22], r: 10, bg: c.acc, align: 'CENTER' }, [T('Get your free demo', { f: F.sb, s: 16, c: '#FFFFFF' })]),
    'Button/Secondary': () => H({ p: [14, 22], r: 10, bg: c.surf, stroke: c.line, align: 'CENTER' }, [T('See all prices', { f: F.sb, s: 16, c: c.ink })]),
    'Tag': () => H({ p: [6, 12], r: 999, bg: c.accbg, align: 'CENTER' }, [T('Tag', { f: F.mono, s: 12, c: c.acc })]),
    'Price card': () => V({ p: 24, r: 14, bg: c.surf, stroke: c.line, gap: 10, w: 300 }, [
      T('LABEL', { f: F.mono, s: 12, c: c.mute, ls: 8 }), T('£000', { f: F.b, s: 40, c: c.ink }), T('Detail', { s: 15, c: c.mute, w: 252, lh: 22 })]),
    'Proof card': () => V({ p: 28, r: 14, bg: c.surf, stroke: c.line, gap: 12, w: 620 }, [
      T('TYPE', { f: F.mono, s: 12, c: c.acc, ls: 8 }), T('Project', { f: F.b, s: 24, c: c.ink }), T('Result', { s: 16, c: c.mute, w: 560, lh: 24 }), T('View the work →', { f: F.sb, s: 15, c: c.acc })]),
  });
  const btn = (t, primary = true) => inst(primary ? K['Button/Primary'] : K['Button/Secondary'], [t]);
  const tag = t => inst(K.Tag, [t]);

  const nav = H({ n: 'Nav', p: [20, 80], justify: 'SPACE_BETWEEN', align: 'CENTER', w: 1440 }, [
    T('Maz Works', { f: F.b, s: 20, c: c.ink }),
    H({ gap: 32, align: 'CENTER' }, [T('Work', { s: 15, c: c.mute }), T('Objects', { s: 15, c: c.mute }), T('Prices', { s: 15, c: c.mute }), btn('Tell me the problem')]),
  ]);
  const heroL = V({ gap: 22, w: 700 }, [
    T('MAZ WORKS · MANAZIR HUSSAIN · DIRECT WITH THE BUILDER', { f: F.mono, s: 13, c: c.acc, ls: 4 }),
    T('Stop losing time and enquiries to jobs done by hand.', { f: F.b, s: 58, c: c.ink, lh: 62, w: 680 }),
    T('Websites, automations and small physical products for small businesses. Tell me the problem; I show you the direction before you commit. £0 first step.', { s: 20, c: c.mute, lh: 30, w: 640 }),
    H({ gap: 12 }, [btn('Tell me the problem'), btn('See real work', false)]),
    H({ gap: 8 }, [tag('£0 first step'), tag('Fixed scope and price'), tag('See the direction first'), tag('Direct with the builder')]),
  ]);
  const step = (n, a, b) => H({ gap: 16, grow: true }, [T(n, { f: F.mono, s: 14, c: c.acc }), V({ gap: 4, grow: true }, [T(a, { f: F.sb, s: 17, c: c.ink }), T(b, { s: 15, c: c.mute, grow: true })])]);
  const heroR = V({ n: 'How it works', p: 28, r: 16, bg: c.surf, stroke: c.line, gap: 20, w: 520 }, [
    T('HOW IT WORKS', { f: F.mono, s: 12, c: c.mute, ls: 8 }),
    step('01', "Tell me what's broken", 'Two lines by email: your site, booking flow or admin chore.'),
    step('02', 'I build a demo', 'Around your real business, usually within days.'),
    step('03', 'Pay only if it works', 'Fixed price agreed up front. No contract.'),
    T('Manazir Hussain · manazoid4@gmail.com', { f: F.mono, s: 13, c: c.mute }),
  ]);
  const hero = H({ n: 'Hero', p: [56, 80], gap: 60, align: 'CENTER', w: 1440 }, [heroL, heroR]);

  const prices = [
    ['QUICK WIN', '£150 fixed', 'One tightly scoped improvement. £75 to start, £75 on completion.'],
    ['WEBSITE LAUNCH', 'from £299', 'A focused small-business site with a clear enquiry route. Scope and price agreed first.'],
    ['GROWTH SYSTEM', 'from £499', 'Site or customer journey plus one useful automation. One workflow, not a department.'],
    ['SUPPORT', 'from £49/mo', 'Optional. No long contract.'],
  ];
  const priceRow = H({ gap: 16 }, prices.map(([a, b, d], k) => inst(K['Price card'], [a, b, d], k === 1 ? { stroke: c.acc } : {})));
  const pricing = V({ n: 'Prices', p: [40, 80], gap: 24, w: 1440 }, [
    H({ gap: 24, align: 'MAX' }, [T('The whole price list.', { f: F.b, s: 36, c: c.ink }), T('Scope and price agreed before any paid work. Physical Touch stands: see /3d-printing.', { s: 16, c: c.mute })]),
    priceRow,
  ]);
  const proof = V({ n: 'Proof', p: [40, 80], gap: 24, w: 1440 }, [
    T('Shipped, not promised.', { f: F.b, s: 36, c: c.ink }),
    H({ gap: 16 }, [
      inst(K['Proof card'], ['CLIENT WORK', 'Scrap Finance Partners', 'Full digital presence, lead journey, and guarded acquisition automation for a UK scrap-yard finance consultancy.']),
      inst(K['Proof card'], ['OWN PRODUCT', 'JobFilter', 'Procurement-scanning product for UK trades: opportunity detection, fit scoring, alerts, and a bid workflow.']),
    ]),
  ]);
  const cta = H({ n: 'CTA band', p: [40, 80], bg: c.ink, justify: 'SPACE_BETWEEN', align: 'CENTER', w: 1440 }, [
    T("Tell me the problem. I'll show you the direction first.", { f: F.b, s: 32, c: '#FFFFFF' }),
    inst(K['Button/Primary'], ['Tell me the problem'], { bg: '#FFFFFF', fg: c.ink }),
  ]);
  const screen = V({ n: 'Desktop — Home (client acquisition)', bg: c.bg, w: 1440 }, [nav, hero, pricing, proof, cta]);
  pg.appendChild(screen); screen.x = 0; screen.y = 0;
  return screen;
}

// ======================================================================
// 03 JobFilter: ranked opportunity board + evidence detail (desktop)
// ======================================================================
async function jobfilter() {
  const pg = await pageNamed('03 JobFilter');
  const c = { navy: '#0B1B3F', navy2: '#12275A', yellow: '#FFC400', paper: '#F7F5EF', surf: '#FFFFFF', ink: '#0A0A0A', mute: '#4B5563', line: '#D9D4C7', gold: '#FFC400', silver: '#C7CDD6', bronze: '#D39A62', ok: '#15803D' };
  const shelf = shelfFrame(pg, 'JobFilter');
  const K = makeComponents('JF', shelf, {
    'Button/Primary': () => H({ p: [12, 20], r: 4, bg: c.navy, align: 'CENTER' }, [T('ACTION', { f: F.cb, s: 16, c: '#FFFFFF', ls: 4 })]),
    'Button/Outline': () => H({ p: [12, 20], r: 4, bg: c.surf, stroke: c.navy, sw: 2, align: 'CENTER' }, [T('ACTION', { f: F.cb, s: 16, c: c.navy, ls: 4 })]),
    'Chip': () => H({ p: [6, 12], r: 4, bg: '#1C3268', align: 'CENTER' }, [T('Chip', { f: F.m, s: 13, c: '#FFFFFF' })]),
    'Lead card': () => H({ p: 14, r: 6, bg: c.surf, stroke: c.line, gap: 14, w: 460, align: 'MIN' }, [
      V({ p: [8, 10], r: 4, bg: c.gold, gap: 0, align: 'CENTER', w: 64 }, [T('86', { f: F.cb, s: 28, c: c.navy }), T('GOLD', { f: F.cb, s: 11, c: c.navy, ls: 6 })]),
      V({ gap: 4, w: 350 }, [T('Notice title', { f: F.cb, s: 18, c: c.ink, w: 350 }), T('Buyer · place · value', { s: 13, c: c.mute, w: 350 }), T('19 days left', { f: F.sb, s: 13, c: c.ok })]),
    ]),
    'Fit bar': () => V({ gap: 6, w: 600 }, [
      H({ gap: 8, w: 600, justify: 'SPACE_BETWEEN' }, [T('Factor', { f: F.sb, s: 14, c: c.ink }), T('00/00', { f: F.cb, s: 15, c: c.navy })]),
      H({ w: 600, bg: '#ECE8DD', r: 3, gap: 0 }, [H({ w: 480, bg: c.navy, r: 3, p: [4, 0] }, [])]),
      T('Evidence line', { s: 13, c: c.mute, w: 600 }),
    ]),
  });
  const chip = t => inst(K.Chip, [t]);

  const top = H({ n: 'Top bar', p: [14, 32], bg: c.navy, justify: 'SPACE_BETWEEN', align: 'CENTER', w: 1440 }, [
    H({ gap: 20, align: 'CENTER' }, [T('JOBFILTER', { f: F.ce, s: 28, c: c.yellow, ls: 2 }), chip('Trade: Electrical'), chip('Patch: West Midlands · 40 mi'), chip('Stage: Open tenders')]),
    inst(K['Button/Primary'], ['SCAN NOW'], { bg: c.yellow, fg: c.navy }),
  ]);
  const strip = H({ n: 'Source strip', p: [10, 32], bg: c.navy2, justify: 'SPACE_BETWEEN', align: 'CENTER', w: 1440 }, [
    T('Find a Tender · OCDS · scanned 07:12 today · 38 current notices read · 5 fit your trade and patch', { s: 13, c: '#E5E7EB' }),
    T('SAMPLE DATA', { f: F.cb, s: 12, c: c.yellow, ls: 8 }),
  ]);

  const leads = [
    ['86', 'GOLD', c.gold, 'Electrical testing & remedial works: 214 homes', 'Housing association · Wolverhampton · £180k–£250k', '19 days left'],
    ['79', 'GOLD', c.gold, 'Fire alarm upgrade: 3 primary schools', 'County council · Walsall · £90k–£120k', '12 days left'],
    ['71', 'SILVER', c.silver, 'Communal lighting LED replacement', 'Housing trust · Dudley · £40k–£60k', '26 days left'],
    ['64', 'SILVER', c.silver, 'EV charger install: council depot', 'Metropolitan council · Sandwell · £30k–£50k', '8 days left'],
    ['58', 'BRONZE', c.bronze, 'Minor electrical works framework (lot 2)', 'Consortium · West Midlands · framework', '33 days left'],
  ];
  const list = V({ n: 'Ranked list', gap: 10, w: 460 }, [
    T('5 FIT · RANKED BY FIT SCORE', { f: F.cb, s: 16, c: c.navy, ls: 6 }),
    ...leads.map(([s, band, col, t, m, d], k) => {
      const i = inst(K['Lead card'], [s, band, t, m, d], k === 0 ? { stroke: c.navy } : {});
      if (k === 0) i.strokeWeight = 2;
      const badge = i.children[0]; badge.fills = fill(col);
      return i;
    }),
  ]);

  const bar = (label, got, max, ev) => {
    const b = inst(K['Fit bar'], [label, `${got}/${max}`, ev], { grow: true });
    const track = b.children[1]; const inner = track.children[0]; inner.resize(Math.round(600 * got / max), inner.height);
    return b;
  };
  const scoreBlock = V({ p: [14, 18], r: 6, bg: c.gold, align: 'CENTER', gap: 0 }, [T('86', { f: F.ce, s: 56, c: c.navy }), T('GOLD FIT', { f: F.cb, s: 13, c: c.navy, ls: 8 })]);
  const detail = V({ n: 'Opportunity detail', p: 28, r: 8, bg: c.surf, stroke: c.line, gap: 22, grow: true }, [
    H({ gap: 20, align: 'MIN' }, [scoreBlock, V({ gap: 8, w: 700 }, [
      T('Electrical testing & remedial works: 214 homes', { f: F.cb, s: 32, c: c.ink, w: 700 }),
      T('Housing association · Wolverhampton WV10 · Open tender · £180k–£250k', { s: 15, c: c.mute }),
      H({ gap: 8 }, [chip('Published 22 Sep'), chip('Clarifications close 3 Oct'), inst(K.Chip, ['Tender deadline 14 Oct · 19 days'], { bg: c.yellow, fg: c.navy })]),
    ])]),
    T('WHY IT FITS', { f: F.cb, s: 16, c: c.navy, ls: 8 }),
    bar('Trade match', 30, 30, 'CPV 45310000 electrical installation; EICR testing in scope.'),
    bar('Location', 22, 25, 'Sites 6–18 mi inside your patch.'),
    bar('Stage', 16, 20, 'Open tender, not an award notice.'),
    bar('Deadline', 10, 15, '19 days: enough time to price and visit.'),
    bar('Buyer context', 8, 10, 'Buyer has used SME contractors for similar works.'),
    V({ n: 'Evidence', p: 16, r: 4, bg: c.paper, stroke: c.line, gap: 6, grow: true }, [
      T('EVIDENCE', { f: F.cb, s: 13, c: c.navy, ls: 8 }),
      T('Source: Find a Tender (FTS) · OCDS release · notice 2026/S 000-031472', { f: F.m, s: 14, c: c.ink }),
      T('Read from the official notice. JobFilter ranks fit; it does not promise an award.', { s: 13, c: c.mute }),
      T('Open original notice ↗', { f: F.sb, s: 14, c: c.navy }),
    ]),
    H({ n: 'Actions', gap: 10, align: 'CENTER' }, [
      inst(K['Button/Primary'], ['START BID CHECKLIST']), inst(K['Button/Outline'], ['SAVE TO SHORTLIST']), inst(K['Button/Outline'], ['NOT FOR US']),
      inst(K.Chip, ['WhatsApp alerts · needs setup'], { bg: '#E5E7EB', fg: '#6B7280' }),
    ]),
  ]);
  const body = H({ n: 'Body', p: [24, 32], gap: 24, w: 1440, align: 'MIN' }, [list, detail]);
  const screen = V({ n: 'Desktop — Opportunity board', bg: c.paper, w: 1440 }, [top, strip, body]);
  pg.appendChild(screen); screen.x = 0; screen.y = 0;

  const empty = V({ n: 'State — No verified match', p: 28, r: 8, bg: c.surf, stroke: c.line, gap: 14, w: 460 }, [
    T('NO VERIFIED MATCH THIS WEEK', { f: F.cb, s: 22, c: c.navy, ls: 4 }),
    T('We read 41 current notices. None fit Electrical in West Midlands closely enough to be worth your evening. Nothing is padded to fill the list.', { s: 15, c: c.mute, w: 404, lh: 22 }),
    H({ gap: 10 }, [inst(K['Button/Primary'], ['WIDEN TO 60 MI']), inst(K['Button/Outline'], ['ADD A TRADE'])]),
  ]);
  pg.appendChild(empty); empty.x = 1520; empty.y = 0;
  return screen;
}

// ======================================================================
(async () => {
  try {
    await Promise.all([
      font('r', 'Inter', 'Regular'), font('m', 'Inter', 'Medium'), font('sb', 'Inter', 'Semi Bold'), font('b', 'Inter', 'Bold'),
      font('mono', 'JetBrains Mono', 'Regular'),
      font('cb', 'Barlow Condensed', 'Bold'), font('ce', 'Barlow Condensed', 'ExtraBold'),
    ]);
    const saved = { ...F };
    await enderforge();
    await font('mono', 'IBM Plex Mono', 'Regular'); await mazworks();
    Object.assign(F, saved);
    await Promise.all([font('r', 'Barlow', 'Regular'), font('m', 'Barlow', 'Medium'), font('sb', 'Barlow', 'SemiBold'), font('b', 'Barlow', 'Bold')]);
    // JobFilter page skipped (owner, 2026-09-25); builder kept for later
    // await jobfilter();
    await figma.setCurrentPageAsync(figma.root.children[0]);
    figma.closePlugin('Built 2 pages: 01 EnderForge, 02 Maz Works');
  } catch (e) {
    figma.closePlugin('Sprint build failed: ' + (e && e.message ? e.message : e));
  }
})();
