/* ── SCS Carport Configurator — JS ────────────────────────────────────── */

// ── Pricing Data ──────────────────────────────────────────────────────────
const PRICING = {
  einzelcarport: {
    base: 4833.84,
    size: {
      standard: { label: 'Standard',  desc: 'bis 3,00 × 5,00 m',  delta: 0 },
      medium:   { label: 'Mittel',    desc: 'bis 3,50 × 5,50 m',  delta: 420 },
      large:    { label: 'Groß',      desc: 'bis 4,75 × 6,00 m',  delta: 890 },
    },
    roof: {
      flat:    { label: 'Flachdach',   desc: '5° Neigung',         delta: 0 },
      pitched: { label: 'Satteldach',  desc: '20° Neigung',        delta: 380 },
    },
    covering: {
      none:       { label: 'Ohne Eindeckung',             desc: 'Dachschalung inklusive',              delta: 0 },
      poly:       { label: 'Polycarbonat-Wellplatten',    desc: 'Transparent, inkl. Dachrinnenset',    delta: 190 },
      trapez:     { label: 'Trapezblech anthrazit',       desc: 'RAL 7016, inkl. Dachrinnenset',       delta: 290 },
      sandwich:   { label: 'Sandwichpaneel anthrazit',    desc: 'Lärmgedämmt, inkl. Dachrinnenset',    delta: 640 },
    },
    cladding: {
      none:   { label: 'Ohne Verkleidung',  desc: 'Offen an allen Seiten', delta: 0 },
      one:    { label: '1 Seite',           desc: 'Sichtschutz einseitig',  delta: 310 },
      two:    { label: '2 Seiten',          desc: 'Erhöhter Schutz',        delta: 590 },
      three:  { label: '3 Seiten',          desc: 'Maximal geschlossen',    delta: 840 },
    },
    addons: {
      gutter:  { label: 'Dachrinnenset',   desc: 'Verzinktes Blech', delta: 149 },
      led:     { label: 'LED-Beleuchtung', desc: '230V, IP44',       delta: 229 },
      loft:    { label: 'Abstellboden',    desc: 'Lagerfläche oben', delta: 399 },
    }
  },
  doppelcarport: {
    base: 6357.59,
    size: {
      standard: { label: 'Standard',  desc: 'bis 5,40 × 5,00 m',  delta: 0 },
      medium:   { label: 'Mittel',    desc: 'bis 5,90 × 5,50 m',  delta: 560 },
      large:    { label: 'Groß',      desc: 'bis 6,50 × 6,00 m',  delta: 1180 },
    },
    roof: {
      flat:    { label: 'Flachdach',   desc: '5° Neigung',         delta: 0 },
      pitched: { label: 'Satteldach',  desc: '20° Neigung',        delta: 520 },
    },
    covering: {
      none:       { label: 'Ohne Eindeckung',             desc: 'Dachschalung inklusive',              delta: 0 },
      poly:       { label: 'Polycarbonat-Wellplatten',    desc: 'Transparent, inkl. Dachrinnenset',    delta: 260 },
      trapez:     { label: 'Trapezblech anthrazit',       desc: 'RAL 7016, inkl. Dachrinnenset',       delta: 390 },
      sandwich:   { label: 'Sandwichpaneel anthrazit',    desc: 'Lärmgedämmt, inkl. Dachrinnenset',    delta: 850 },
    },
    cladding: {
      none:   { label: 'Ohne Verkleidung',  desc: 'Offen an allen Seiten', delta: 0 },
      one:    { label: '1 Seite',           desc: 'Sichtschutz einseitig',  delta: 420 },
      two:    { label: '2 Seiten',          desc: 'Erhöhter Schutz',        delta: 790 },
      three:  { label: '3 Seiten',          desc: 'Maximal geschlossen',    delta: 1120 },
    },
    addons: {
      gutter:  { label: 'Dachrinnenset',   desc: 'Verzinktes Blech', delta: 189 },
      led:     { label: 'LED-Beleuchtung', desc: '230V, IP44',       delta: 289 },
      loft:    { label: 'Abstellboden',    desc: 'Lagerfläche oben', delta: 499 },
    }
  }
};

// ── State ─────────────────────────────────────────────────────────────────
const state = {
  type:     'einzelcarport',
  size:     'standard',
  roof:     'flat',
  covering: 'none',
  cladding: 'none',
  addons:   new Set(),
};

// ── Helpers ───────────────────────────────────────────────────────────────
function fmt(n) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(n);
}

function fmtDelta(n) {
  if (n === 0) return 'Inklusive';
  return '+' + fmt(n);
}

function calcTotal() {
  const p = PRICING[state.type];
  let total = p.base;
  total += p.size[state.size].delta;
  total += p.roof[state.roof].delta;
  total += p.covering[state.covering].delta;
  total += p.cladding[state.cladding].delta;
  for (const addon of state.addons) {
    total += p.addons[addon].delta;
  }
  return total;
}

// ── Render ────────────────────────────────────────────────────────────────
function renderSidebar() {
  const p = PRICING[state.type];
  const total = calcTotal();

  // type badge
  document.getElementById('sidebar-type-badge').textContent =
    state.type === 'einzelcarport' ? 'Einzelcarport' : 'Doppelcarport';

  // rows
  const rows = [
    { cat: 'Basis', name: state.type === 'einzelcarport' ? 'Einzelcarport' : 'Doppelcarport', price: p.base, delta: null },
    { cat: 'Größe',         name: p.size[state.size].label,         price: p.size[state.size].delta,         delta: p.size[state.size].delta },
    { cat: 'Dachform',      name: p.roof[state.roof].label,         price: p.roof[state.roof].delta,         delta: p.roof[state.roof].delta },
    { cat: 'Dacheindeckung',name: p.covering[state.covering].label, price: p.covering[state.covering].delta, delta: p.covering[state.covering].delta },
    { cat: 'Verkleidung',   name: p.cladding[state.cladding].label, price: p.cladding[state.cladding].delta, delta: p.cladding[state.cladding].delta },
  ];

  for (const addon of state.addons) {
    rows.push({ cat: 'Zubehör', name: p.addons[addon].label, price: p.addons[addon].delta, delta: p.addons[addon].delta });
  }

  const rowsEl = document.getElementById('sidebar-rows');
  rowsEl.innerHTML = rows.map(r => {
    const isBase = r.delta === null;
    const priceClass = isBase ? '' : r.price === 0 ? ' zero' : ' positive';
    const priceText = isBase ? fmt(r.price) : r.price === 0 ? 'Inklusive' : '+' + fmt(r.price);
    return `
      <div class="sidebar-row">
        <div class="sidebar-row-left">
          <div class="sidebar-row-cat">${r.cat}</div>
          <div class="sidebar-row-name">${r.name}</div>
        </div>
        <div class="sidebar-row-price${priceClass}">${priceText}</div>
      </div>`;
  }).join('');

  // total with flash
  const totalEl = document.getElementById('sidebar-total-amount');
  const prev = totalEl.dataset.prev;
  const newVal = fmt(total);
  if (prev !== undefined && prev !== newVal) {
    totalEl.classList.remove('flash');
    void totalEl.offsetWidth; // reflow
    totalEl.classList.add('flash');
    setTimeout(() => totalEl.classList.remove('flash'), 500);
  }
  totalEl.textContent = newVal;
  totalEl.dataset.prev = newVal;
}

function renderOptions() {
  const p = PRICING[state.type];

  // Helper: render a radio section
  function renderSection(containerId, category, currentVal) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const opts = p[category];
    el.innerHTML = Object.entries(opts).map(([key, opt]) => {
      const selected = currentVal === key;
      const deltaText = opt.delta === 0 ? 'Inklusive' : fmtDelta(opt.delta);
      const deltaClass = opt.delta === 0 ? 'zero' : '';
      return `
        <div class="option-card${selected ? ' selected' : ''}" data-cat="${category}" data-key="${key}">
          <div class="option-check">
            <svg viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="option-card-name">${opt.label}</div>
          <div class="option-card-desc">${opt.desc}</div>
          <div class="option-card-delta ${deltaClass}">${deltaText}</div>
        </div>`;
    }).join('');
  }

  renderSection('options-size',     'size',     state.size);
  renderSection('options-roof',     'roof',     state.roof);
  renderSection('options-covering', 'covering', state.covering);
  renderSection('options-cladding', 'cladding', state.cladding);

  // Addons
  const addonsEl = document.getElementById('options-addons');
  if (addonsEl) {
    addonsEl.innerHTML = Object.entries(p.addons).map(([key, opt]) => {
      const selected = state.addons.has(key);
      return `
        <div class="addon-card${selected ? ' selected' : ''}" data-addon="${key}">
          <div class="addon-checkbox">
            <svg viewBox="0 0 12 12" fill="none" width="12" height="12"><polyline points="2,6 5,9 10,3" stroke="#F9F7F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="addon-info">
            <div class="addon-name">${opt.label}</div>
            <div class="addon-delta">${fmtDelta(opt.delta)}</div>
          </div>
        </div>`;
    }).join('');
  }
}

// ── Event delegation ──────────────────────────────────────────────────────
function initEvents() {
  // Type toggle
  document.querySelectorAll('.type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.type = btn.dataset.type;
      state.addons.clear();
      document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderOptions();
      renderSidebar();
    });
  });

  // Option cards (radio)
  document.addEventListener('click', e => {
    const card = e.target.closest('.option-card');
    if (card) {
      const cat = card.dataset.cat;
      const key = card.dataset.key;
      state[cat] = key;
      renderOptions();
      renderSidebar();
      return;
    }

    // Addon cards (checkbox)
    const addon = e.target.closest('.addon-card');
    if (addon) {
      const key = addon.dataset.addon;
      if (state.addons.has(key)) {
        state.addons.delete(key);
      } else {
        state.addons.add(key);
      }
      renderOptions();
      renderSidebar();
    }
  });

  // "Zur Zusammenfassung" button
  const toSummaryBtn = document.getElementById('to-summary');
  if (toSummaryBtn) {
    toSummaryBtn.addEventListener('click', () => {
      saveStateToSession();
      window.location.href = 'summary.html';
    });
  }
}

// ── Session storage ───────────────────────────────────────────────────────
function saveStateToSession() {
  sessionStorage.setItem('scs_config', JSON.stringify({
    type:     state.type,
    size:     state.size,
    roof:     state.roof,
    covering: state.covering,
    cladding: state.cladding,
    addons:   [...state.addons],
  }));
}

function loadStateFromSession() {
  const raw = sessionStorage.getItem('scs_config');
  if (!raw) return false;
  try {
    const saved = JSON.parse(raw);
    state.type     = saved.type     || 'einzelcarport';
    state.size     = saved.size     || 'standard';
    state.roof     = saved.roof     || 'flat';
    state.covering = saved.covering || 'none';
    state.cladding = saved.cladding || 'none';
    state.addons   = new Set(saved.addons || []);
    return true;
  } catch { return false; }
}

// ── Init ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // If on summary page
  if (document.getElementById('summary-content')) {
    loadStateFromSession();
    renderSummary();
    return;
  }
  // Configurator page
  loadStateFromSession();
  renderOptions();
  renderSidebar();
  initEvents();
});

// ── Summary render ────────────────────────────────────────────────────────
function renderSummary() {
  const p = PRICING[state.type];
  const total = calcTotal();

  const typeName = state.type === 'einzelcarport' ? 'Einzelcarport' : 'Doppelcarport';

  const rows = [
    { cat: 'Typ',           name: typeName,                             price: p.base,                           isBase: true },
    { cat: 'Größe',         name: p.size[state.size].label,             price: p.size[state.size].delta },
    { cat: 'Dachform',      name: p.roof[state.roof].label,             price: p.roof[state.roof].delta },
    { cat: 'Dacheindeckung',name: p.covering[state.covering].label,     price: p.covering[state.covering].delta },
    { cat: 'Verkleidung',   name: p.cladding[state.cladding].label,     price: p.cladding[state.cladding].delta },
  ];
  for (const addon of state.addons) {
    rows.push({ cat: 'Zubehör', name: p.addons[addon].label, price: p.addons[addon].delta });
  }

  const summaryEl = document.getElementById('summary-content');
  summaryEl.innerHTML = `
    <div class="summary-card">
      <div class="summary-card-header">Ihre Konfiguration</div>
      ${rows.map(r => {
        const isBase = r.isBase;
        const priceClass = isBase ? '' : r.price === 0 ? ' zero' : ' positive';
        const priceText  = isBase ? fmt(r.price) : r.price === 0 ? 'Inklusive' : '+' + fmt(r.price);
        return `
          <div class="summary-item">
            <span class="summary-item-label">${r.cat}</span>
            <span class="summary-item-value">${r.name}</span>
            <span class="summary-item-price${priceClass}">${priceText}</span>
          </div>`;
      }).join('')}
    </div>

    <div class="summary-total-card">
      <div class="label">Gesamtpreis inkl. 19% MwSt.</div>
      <div class="amount">${fmt(total)}</div>
      <div class="vat">Kostenlose Lieferung • Statik-Nachweis inklusive • Montageanleitungen inklusive</div>
    </div>

    <div class="inquiry-form">
      <h3>Jetzt unverbindlich anfragen</h3>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Vorname</label>
          <input class="form-input" type="text" placeholder="Max">
        </div>
        <div class="form-group">
          <label class="form-label">Nachname</label>
          <input class="form-input" type="text" placeholder="Mustermann">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">E-Mail</label>
          <input class="form-input" type="email" placeholder="max@beispiel.de">
        </div>
        <div class="form-group">
          <label class="form-label">Telefon (optional)</label>
          <input class="form-input" type="tel" placeholder="+49 ...">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group full">
          <label class="form-label">Anmerkungen (optional)</label>
          <textarea class="form-textarea" placeholder="Lieferadresse, Wunschtermin, besondere Anforderungen ..."></textarea>
        </div>
      </div>
      <button class="btn btn-primary" style="margin-top:8px" onclick="handleInquiry()">Anfrage absenden</button>
    </div>

    <div class="summary-actions">
      <a href="configurator.html" class="btn btn-outline">← Konfiguration ändern</a>
    </div>
  `;
}

function handleInquiry() {
  alert('Vielen Dank für Ihre Anfrage! Wir melden uns innerhalb von 24 Stunden bei Ihnen.\n\n(Demo-Funktion — keine echte Übermittlung)');
}
