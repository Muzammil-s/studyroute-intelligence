import {
  COUNTRY_PROFILES,
  PROGRAMS,
  convertCurrency,
  filterPrograms,
  formatCurrency,
  getProgramAnnualCostUSD
} from './studyLogic.js';

const state = {
  currency: 'USD',
  country: 'all',
  degree: 'all',
  maxBudgetUsd: 75000,
  q: '',
  applyScholarship: false,
  sort: 'total-asc',
  compareIds: JSON.parse(localStorage.getItem('studyroute_compare') || '["de-rwth-msc","uk-manchester-msc"]')
};

function saveCompare() {
  localStorage.setItem('studyroute_compare', JSON.stringify(state.compareIds));
}

function el(tag, className, text) {
  const n = document.createElement(tag);
  if (className) n.className = className;
  if (text !== undefined && text !== null) n.textContent = String(text);
  return n;
}

function fmtUsdInTarget(usdAmount) {
  const converted = convertCurrency(usdAmount, 'USD', state.currency);
  return formatCurrency(converted, state.currency);
}

function renderCountryCards() {
  const host = document.getElementById('country-cards');
  host.innerHTML = '';
  for (const cp of COUNTRY_PROFILES) {
    const progs = PROGRAMS.filter((p) => p.country === cp.country);
    const avgUsd = Math.round(progs.reduce((acc, p) => acc + getProgramAnnualCostUSD(p, state.applyScholarship).totalAnnualUsd, 0) / Math.max(1, progs.length));

    const card = el('div', `country-card ${state.country === cp.country ? 'active' : ''}`);
    card.append(
      el('strong', '', `${cp.country} (${progs.length})`),
      el('span', '', `Sample Avg / Yr: ${fmtUsdInTarget(avgUsd)}`)
    );
    const visaBtn = el('button', 'btn btn-secondary', 'Visa & Portal Info');
    visaBtn.type = 'button';
    visaBtn.style.padding = '5px 8px';
    visaBtn.style.fontSize = '0.74rem';
    visaBtn.style.marginTop = '4px';
    visaBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openCountryModal(cp);
    });
    card.appendChild(visaBtn);

    card.addEventListener('click', () => {
      state.country = state.country === cp.country ? 'all' : cp.country;
      document.getElementById('country-filter').value = state.country;
      renderAll();
    });
    host.appendChild(card);
  }
}

function openCountryModal(cp) {
  document.getElementById('country-modal-title').textContent = `${cp.country} — Official Portal & Benchmark Notes`;
  const body = document.getElementById('country-modal-body');
  body.innerHTML = '';
  body.append(
    el('p', '', `Post-Study & Part-Time Policy Summary: ${cp.visaWorkSummary}`),
    el('p', 'muted', `Fee & Living Context: ${cp.sampleNote}`)
  );
  const a = el('a', 'btn btn-primary', `Verify Official Rules on ${cp.officialPortal}`);
  a.href = cp.officialPortal;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.style.display = 'inline-block';
  a.style.marginTop = '10px';
  a.style.textDecoration = 'none';
  body.appendChild(a);
  document.getElementById('country-modal').hidden = false;
}

function renderPrograms() {
  const list = filterPrograms(PROGRAMS, state);
  document.getElementById('match-count').textContent = `${list.length} program${list.length === 1 ? '' : 's'} shown`;
  document.getElementById('compare-count').textContent = String(state.compareIds.length);

  const grid = document.getElementById('program-grid');
  grid.innerHTML = '';
  if (!list.length) {
    const empty = el('div', 'prog-card');
    empty.append(el('strong', '', 'No programs match the current budget or filter'), el('p', 'muted', 'Raise the max annual budget slider or clear filters.'));
    grid.appendChild(empty);
    return;
  }

  for (const p of list) {
    const cost = getProgramAnnualCostUSD(p, state.applyScholarship);
    const card = el('article', 'prog-card');

    const head = el('div', 'prog-head');
    const titleBox = el('div');
    titleBox.append(el('span', 'muted', `${p.university} • ${p.city}`), el('h3', '', p.program));
    head.append(titleBox, el('span', 'country-pill', `${p.country} · ${p.degree}`));

    const costGrid = el('div', 'cost-grid');
    const c1 = el('div');
    c1.append(el('small', '', 'Tuition / Yr'), el('strong', '', fmtUsdInTarget(cost.netTuitionUsd)));
    const c2 = el('div');
    c2.append(el('small', '', 'Living / Yr'), el('strong', '', fmtUsdInTarget(cost.livingUsd)));
    const c3 = el('div');
    c3.append(el('small', '', `${p.durationYears}y Full Est.`), el('strong', '', fmtUsdInTarget(cost.fullDegreeUsd)));
    costGrid.append(c1, c2, c3);

    const req = el('div', 'req-list', `Requirements: ${p.requirements.gpa} | ${p.requirements.english} | Deadline: ${p.requirements.deadline}`);

    const schols = el('div', 'schol-pills');
    for (const s of p.scholarships) schols.appendChild(el('span', 'schol-tag', s));

    const prov = el('div', 'provenance-tag', `Data Source: ${p.dataStatus}`);

    const foot = el('div', 'card-foot');
    const verifyLink = el('a', '', 'Official Admissions Portal');
    verifyLink.href = p.officialUrl;
    verifyLink.target = '_blank';
    verifyLink.rel = 'noopener noreferrer';

    const selected = state.compareIds.includes(p.id);
    const cmpBtn = el('button', `btn btn-secondary ${selected ? 'selected' : ''}`, selected ? 'In Compare' : '+ Compare');
    cmpBtn.type = 'button';
    cmpBtn.addEventListener('click', () => toggleCompare(p.id));
    foot.append(verifyLink, cmpBtn);

    card.append(head, costGrid, req, schols, prov, foot);
    grid.appendChild(card);
  }
}

function toggleCompare(id) {
  const idx = state.compareIds.indexOf(id);
  if (idx !== -1) state.compareIds.splice(idx, 1);
  else {
    if (state.compareIds.length >= 3) state.compareIds.shift();
    state.compareIds.push(id);
  }
  saveCompare();
  renderPrograms();
}

function openComparisonModal() {
  document.getElementById('cmp-currency-label').textContent = state.currency;
  const selected = state.compareIds.map((id) => PROGRAMS.find((p) => p.id === id)).filter(Boolean);
  const chartHost = document.getElementById('compare-chart');
  const tblHost = document.getElementById('compare-table-host');
  chartHost.innerHTML = '';
  tblHost.innerHTML = '';

  if (!selected.length) {
    chartHost.appendChild(el('p', 'muted', 'Select up to 3 programs using "+ Compare" to inspect side-by-side costs.'));
  } else {
    const costs = selected.map((p) => ({ p, c: getProgramAnnualCostUSD(p, state.applyScholarship) }));
    const maxAnnual = Math.max(...costs.map((x) => x.c.totalAnnualUsd), 1);

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 640 ${costs.length * 52 + 24}`);
    svg.style.width = '100%';
    costs.forEach(({ p, c }, idx) => {
      const y = idx * 52 + 10;
      const tW = Math.round((c.netTuitionUsd / maxAnnual) * 320);
      const lW = Math.round((c.livingUsd / maxAnnual) * 320);

      const lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      lbl.setAttribute('x', '0');
      lbl.setAttribute('y', String(y + 18));
      lbl.setAttribute('fill', '#e2e8f0');
      lbl.setAttribute('font-size', '12');
      lbl.textContent = p.university.slice(0, 26);

      const r1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      r1.setAttribute('x', '190');
      r1.setAttribute('y', String(y + 5));
      r1.setAttribute('width', String(Math.max(4, tW)));
      r1.setAttribute('height', '18');
      r1.setAttribute('fill', '#38bdf8');

      const r2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      r2.setAttribute('x', String(190 + Math.max(4, tW)));
      r2.setAttribute('y', String(y + 5));
      r2.setAttribute('width', String(Math.max(4, lW)));
      r2.setAttribute('height', '18');
      r2.setAttribute('fill', '#10b981');

      const tot = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      tot.setAttribute('x', String(200 + Math.max(4, tW) + Math.max(4, lW)));
      tot.setAttribute('y', String(y + 18));
      tot.setAttribute('fill', '#cbd5e1');
      tot.setAttribute('font-size', '12');
      tot.textContent = `${fmtUsdInTarget(c.totalAnnualUsd)} / yr`;

      svg.append(lbl, r1, r2, tot);
    });
    chartHost.append(el('div', 'muted', 'Stacked Annual Breakdown: Blue = Net Tuition | Green = Est. Living'), svg);

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const hRow = document.createElement('tr');
    hRow.appendChild(el('th', '', 'Metric'));
    selected.forEach((p) => hRow.appendChild(el('th', '', `${p.university} (${p.country})`)));
    thead.appendChild(hRow);

    const tbody = document.createElement('tbody');
    const rows = [
      ['Program', ...selected.map((p) => p.program)],
      ['Duration', ...selected.map((p) => `${p.durationYears} years`)],
      ['Annual Tuition (Net)', ...costs.map((x) => fmtUsdInTarget(x.c.netTuitionUsd))],
      ['Annual Living Est.', ...costs.map((x) => fmtUsdInTarget(x.c.livingUsd))],
      ['Annual Total Est.', ...costs.map((x) => fmtUsdInTarget(x.c.totalAnnualUsd))],
      ['Full Degree Est.', ...costs.map((x) => fmtUsdInTarget(x.c.fullDegreeUsd))],
      ['English / GPA', ...selected.map((p) => `${p.requirements.english} | ${p.requirements.gpa}`)]
    ];
    for (const r of rows) {
      const tr = document.createElement('tr');
      r.forEach((cell) => tr.appendChild(el('td', '', cell)));
      tbody.appendChild(tr);
    }
    table.append(thead, tbody);
    tblHost.appendChild(table);
  }
  document.getElementById('compare-modal').hidden = false;
}

function renderAll() {
  renderCountryCards();
  renderPrograms();
}

function bindEvents() {
  document.getElementById('currency-select').addEventListener('change', (e) => {
    state.currency = e.target.value;
    renderAll();
  });
  document.getElementById('search-input').addEventListener('input', (e) => {
    state.q = e.target.value.trim();
    renderPrograms();
  });
  document.getElementById('country-filter').addEventListener('change', (e) => {
    state.country = e.target.value;
    renderAll();
  });
  document.getElementById('degree-filter').addEventListener('change', (e) => {
    state.degree = e.target.value;
    renderPrograms();
  });
  document.getElementById('sort-select').addEventListener('change', (e) => {
    state.sort = e.target.value;
    renderPrograms();
  });
  document.getElementById('budget-slider').addEventListener('input', (e) => {
    state.maxBudgetUsd = Number(e.target.value);
    document.getElementById('budget-label').textContent = formatCurrency(state.maxBudgetUsd, 'USD');
    renderPrograms();
  });
  document.getElementById('scholarship-toggle').addEventListener('change', (e) => {
    state.applyScholarship = e.target.checked;
    renderAll();
  });
  document.getElementById('btn-open-compare').addEventListener('click', openComparisonModal);
  document.getElementById('close-compare').addEventListener('click', () => {
    document.getElementById('compare-modal').hidden = true;
  });
  document.getElementById('close-country-modal').addEventListener('click', () => {
    document.getElementById('country-modal').hidden = true;
  });
  document.getElementById('btn-export-compare').addEventListener('click', () => {
    const selected = state.compareIds.map((id) => {
      const p = PROGRAMS.find((x) => x.id === id);
      return p ? { ...p, calculatedUSD: getProgramAnnualCostUSD(p, state.applyScholarship) } : null;
    }).filter(Boolean);
    const blob = new Blob([JSON.stringify({ generatedAt: new Date().toISOString(), notice: 'Illustrative benchmarks only — verify on official portals.', programs: selected }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'studyroute-comparison.json';
    a.click();
  });
}

bindEvents();
renderAll();
