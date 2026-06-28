/* ── SCS Carport Konfigurator JS ──────────────────────────────────────── */

const PRICING = {
  einzelcarport: {
    base: 4833.84,
    baseLabel: 'Einzelcarport',
    size: {
      standard: { label: 'Standard',  dim: '270 × 500 cm', desc: 'Für kompakte Stellplätze',      delta: 0 },
      medium:   { label: 'Mittel',    dim: '350 × 550 cm', desc: 'Meistgewählte Größe',            delta: 420 },
      large:    { label: 'Groß',      dim: '475 × 600 cm', desc: 'Für größere Fahrzeuge & SUVs',   delta: 890 },
    },
    roof: {
      flat:    { label: 'Flachdach',  desc: '5° Neigung · klassisch & modern',       delta: 0,   img: 'flat.png' },
      pitched: { label: 'Satteldach', desc: '20° Neigung · maximaler Wasserablauf',  delta: 380, img: 'pitched.png' },
    },
    covering: {
      none:     { label: 'Ohne Eindeckung',          desc: 'Dachschalung aus Profilbrettern inklusive',        delta: 0 },
      poly:     { label: 'Polycarbonat-Wellplatten', desc: 'Transparent · inkl. Dachrinnenset',                delta: 190 },
      trapez:   { label: 'Trapezblech anthrazit',    desc: 'RAL 7016 · robust & wetterfest · inkl. Rinne',     delta: 290 },
      sandwich: { label: 'Sandwichpaneel anthrazit', desc: 'Wärmedämmend · leise · Premium · inkl. Rinne',     delta: 640 },
    },
    cladding: {
      none:  { label: 'Ohne Verkleidung', desc: 'Offen an allen Seiten',          delta: 0 },
      one:   { label: '1 Seite',          desc: 'Sichtschutz an einer Seite',     delta: 310 },
      two:   { label: '2 Seiten',         desc: 'Erhöhter Schutz links & rechts', delta: 590 },
      three: { label: '3 Seiten',         desc: 'Maximal geschlossen',            delta: 840 },
    },
    addons: {
      gutter: { label: 'Dachrinnenset zusätzlich', desc: 'Verzinktes Blech',       delta: 149 },
      led:    { label: 'LED-Beleuchtung',           desc: '230V, IP44, warmweiß',   delta: 229 },
      loft:   { label: 'Abstellboden',              desc: 'Lagerfläche im Dachraum',delta: 399 },
    }
  },
  doppelcarport: {
    base: 6357.59,
    baseLabel: 'Doppelcarport',
    size: {
      standard: { label: 'Standard',  dim: '540 × 500 cm', desc: 'Platz für 2 Standardfahrzeuge', delta: 0 },
      medium:   { label: 'Mittel',    dim: '590 × 550 cm', desc: 'Mehr Komfort beim Ein- & Aussteigen', delta: 560 },
      large:    { label: 'Groß',      dim: '650 × 600 cm', desc: 'SUVs, Transporter & Komfort',    delta: 1180 },
    },
    roof: {
      flat:    { label: 'Flachdach',  desc: '5° Neigung · klassisch & modern',       delta: 0,   img: 'flat.png' },
      pitched: { label: 'Satteldach', desc: '20° Neigung · maximaler Wasserablauf',  delta: 520, img: 'pitched.png' },
    },
    covering: {
      none:     { label: 'Ohne Eindeckung',          desc: 'Dachschalung aus Profilbrettern inklusive',        delta: 0 },
      poly:     { label: 'Polycarbonat-Wellplatten', desc: 'Transparent · inkl. Dachrinnenset',                delta: 260 },
      trapez:   { label: 'Trapezblech anthrazit',    desc: 'RAL 7016 · robust & wetterfest · inkl. Rinne',     delta: 390 },
      sandwich: { label: 'Sandwichpaneel anthrazit', desc: 'Wärmedämmend · leise · Premium · inkl. Rinne',     delta: 850 },
    },
    cladding: {
      none:  { label: 'Ohne Verkleidung', desc: 'Offen an allen Seiten',          delta: 0 },
      one:   { label: '1 Seite',          desc: 'Sichtschutz an einer Seite',     delta: 420 },
      two:   { label: '2 Seiten',         desc: 'Erhöhter Schutz links & rechts', delta: 790 },
      three: { label: '3 Seiten',         desc: 'Maximal geschlossen',            delta: 1120 },
    },
    addons: {
      gutter: { label: 'Dachrinnenset zusätzlich', desc: 'Verzinktes Blech',       delta: 189 },
      led:    { label: 'LED-Beleuchtung',           desc: '230V, IP44, warmweiß',   delta: 289 },
      loft:   { label: 'Abstellboden',              desc: 'Lagerfläche im Dachraum',delta: 499 },
    }
  }
};

// Delivery zones by postcode prefix
const DELIVERY_ZONES = {
  '0': true,'1': true,'2': true,'3': true,'4': true,
  '5': true,'6': true,'7': true,'8': true,'9': true,
};
const EXCLUDED_POSTCODES = ['99999','12345'];

// State
const state = {
  type: 'einzelcarport',
  size: 'standard',
  roof: 'flat',
  covering: 'none',
  cladding: 'none',
  addons: new Set(),
};

// Helpers
function fmt(n) {
  return new Intl.NumberFormat('de-DE', { style:'currency', currency:'EUR', minimumFractionDigits: 2 }).format(n);
}
function fmtDelta(n) {
  if (n === 0) return 'Inklusive';
  return '+' + fmt(n);
}
function deliveryDate() {
  const d = new Date();
  d.setDate(d.getDate() + 28);
  return d.toLocaleDateString('de-DE', { day:'numeric', month:'long', year:'numeric' });
}
function calcTotal() {
  const p = PRICING[state.type];
  let total = p.base;
  total += p.size[state.size].delta;
  total += p.roof[state.roof].delta;
  total += p.covering[state.covering].delta;
  total += p.cladding[state.cladding].delta;
  for (const a of state.addons) total += p.addons[a].delta;
  return total;
}

// Render options
function renderOptions() {
  const p = PRICING[state.type];

  function radioSection(id, cat, current) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = Object.entries(p[cat]).map(([key, opt]) => {
      const sel = current === key;
      const deltaText = fmtDelta(opt.delta);
      const deltaClass = opt.delta === 0 ? 'zero' : '';
      const imgHtml = opt.img
        ? `<div class="option-card-img"><img src="${opt.img}" alt="${opt.label}" onerror="this.parentElement.style.display='none'"></div>`
        : opt.dim
        ? `<div class="option-card-img"><div class="option-card-img-placeholder" style="display:flex;align-items:center;justify-content:center;height:100%;font-size:12px;color:var(--grey-mid);background:var(--grey-bg);">${opt.dim}</div></div>`
        : '';
      return `<div class="option-card${sel?' selected':''}" data-cat="${cat}" data-key="${key}">
        <div class="option-check"><svg viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        ${imgHtml}
        <div class="option-card-name">${opt.label}</div>
        ${opt.dim ? `<div class="option-card-desc">${opt.dim}</div>` : ''}
        <div class="option-card-desc">${opt.desc}</div>
        <div class="option-card-delta ${deltaClass}">${deltaText}</div>
      </div>`;
    }).join('');
  }

  radioSection('options-size',     'size',     state.size);
  radioSection('options-roof',     'roof',     state.roof);
  radioSection('options-covering', 'covering', state.covering);
  radioSection('options-cladding', 'cladding', state.cladding);

  const addonsEl = document.getElementById('options-addons');
  if (addonsEl) {
    const p2 = PRICING[state.type];
    addonsEl.innerHTML = Object.entries(p2.addons).map(([key, opt]) => {
      const sel = state.addons.has(key);
      return `<div class="addon-card${sel?' selected':''}" data-addon="${key}">
        <div class="addon-check"><svg viewBox="0 0 12 12" fill="none" width="12" height="12"><polyline points="2,6 5,9 10,3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <div class="addon-info">
          <div class="addon-name">${opt.label}</div>
          <div class="addon-desc">${opt.desc}</div>
          <div class="addon-delta">${fmtDelta(opt.delta)}</div>
        </div>
      </div>`;
    }).join('');
  }
}

// Render sidebar
let prevTotal = null;
function renderSidebar() {
  const p = PRICING[state.type];
  const total = calcTotal();

  // type badge
  const badge = document.getElementById('sidebar-type-badge');
  if (badge) badge.textContent = p.baseLabel;

  // base price hint
  const hint = document.getElementById('base-price-hint');
  if (hint) hint.textContent = fmt(p.base);

  // rows
  const rows = [
    { cat:'Basis', name: p.baseLabel, price: p.base, isBase: true },
    { cat:'Größe',          name: p.size[state.size].label,         price: p.size[state.size].delta },
    { cat:'Dachform',       name: p.roof[state.roof].label,         price: p.roof[state.roof].delta },
    { cat:'Dacheindeckung', name: p.covering[state.covering].label, price: p.covering[state.covering].delta },
    { cat:'Verkleidung',    name: p.cladding[state.cladding].label, price: p.cladding[state.cladding].delta },
  ];
  for (const a of state.addons) {
    rows.push({ cat:'Zubehör', name: p.addons[a].label, price: p.addons[a].delta });
  }

  const rowsEl = document.getElementById('sidebar-rows');
  if (rowsEl) {
    rowsEl.innerHTML = rows.map(r => {
      const cls = r.isBase ? 'base' : r.price === 0 ? 'zero' : 'positive';
      const txt = r.isBase ? fmt(r.price) : r.price === 0 ? 'Inklusive' : '+' + fmt(r.price);
      return `<div class="sidebar-row">
        <div><div class="sidebar-row-cat">${r.cat}</div><div class="sidebar-row-name">${r.name}</div></div>
        <div class="sidebar-row-price ${cls}">${txt}</div>
      </div>`;
    }).join('');
  }

  // total + flash
  const totalEl = document.getElementById('sidebar-total-amount');
  if (totalEl) {
    const newVal = fmt(total);
    if (prevTotal !== null && prevTotal !== total) {
      const diff = total - prevTotal;
      totalEl.classList.remove('flash');
      void totalEl.offsetWidth;
      totalEl.classList.add('flash');
      setTimeout(() => totalEl.classList.remove('flash'), 550);
      // delta toast
      const toast = document.getElementById('sidebar-delta-toast');
      if (toast) {
        toast.textContent = (diff > 0 ? '+' : '') + fmt(diff);
        toast.style.color = diff > 0 ? 'var(--price-green)' : 'var(--red)';
        toast.style.opacity = '1';
        setTimeout(() => { toast.style.opacity = '0'; }, 1800);
      }
    }
    totalEl.textContent = newVal;
    prevTotal = total;
  }

  // delivery date
  const dd = document.getElementById('sidebar-delivery-date');
  if (dd) dd.textContent = deliveryDate();

  // update preview image
  const previewImg = document.getElementById('preview-img');
  const previewLabel = document.getElementById('preview-label');
  if (previewImg) {
    const roofData = PRICING[state.type].roof[state.roof];
    if (roofData.img) previewImg.src = roofData.img;
  }
  if (previewLabel) {
    previewLabel.textContent = `${p.baseLabel} · ${p.roof[state.roof].label}`;
  }
}

// Events
function initEvents() {
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
    const addon = e.target.closest('.addon-card');
    if (addon) {
      const key = addon.dataset.addon;
      state.addons.has(key) ? state.addons.delete(key) : state.addons.add(key);
      renderOptions();
      renderSidebar();
    }
  });

  const toSummary = document.getElementById('to-summary');
  if (toSummary) {
    toSummary.addEventListener('click', () => {
      saveState();
      window.location.href = 'summary.html';
    });
  }
}

// Session storage
function saveState() {
  sessionStorage.setItem('scs_config', JSON.stringify({
    type: state.type, size: state.size, roof: state.roof,
    covering: state.covering, cladding: state.cladding,
    addons: [...state.addons],
  }));
}
function loadState() {
  const raw = sessionStorage.getItem('scs_config');
  if (!raw) return false;
  try {
    const s = JSON.parse(raw);
    state.type     = s.type     || 'einzelcarport';
    state.size     = s.size     || 'standard';
    state.roof     = s.roof     || 'flat';
    state.covering = s.covering || 'none';
    state.cladding = s.cladding || 'none';
    state.addons   = new Set(s.addons || []);
    // sync type buttons
    document.querySelectorAll('.type-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.type === state.type);
    });
    return true;
  } catch { return false; }
}

// ── Summary page ─────────────────────────────────────────────────────────
function renderSummary() {
  const p = PRICING[state.type];
  const total = calcTotal();
  const el = document.getElementById('summary-content');
  if (!el) return;

  const rows = [
    { cat:'Typ',            name: p.baseLabel,                              price: p.base,                             isBase: true },
    { cat:'Größe',          name: p.size[state.size].label,                 price: p.size[state.size].delta },
    { cat:'Dachform',       name: p.roof[state.roof].label,                 price: p.roof[state.roof].delta },
    { cat:'Dacheindeckung', name: p.covering[state.covering].label,         price: p.covering[state.covering].delta },
    { cat:'Verkleidung',    name: p.cladding[state.cladding].label,         price: p.cladding[state.cladding].delta },
  ];
  for (const a of state.addons) {
    rows.push({ cat:'Zubehör', name: p.addons[a].label, price: p.addons[a].delta });
  }

  el.innerHTML = `
    <div class="summary-card">
      <div class="summary-card-head">Ihre Konfiguration</div>
      ${rows.map(r => {
        const cls = r.isBase ? '' : r.price === 0 ? ' zero' : ' positive';
        const txt = r.isBase ? fmt(r.price) : r.price === 0 ? 'Inklusive' : '+' + fmt(r.price);
        return `<div class="summary-item">
          <span class="summary-item-label">${r.cat}</span>
          <span class="summary-item-value">${r.name}</span>
          <span class="summary-item-price${cls}">${txt}</span>
        </div>`;
      }).join('')}
    </div>

    <div class="summary-total-card">
      <div class="summary-total-label">Gesamtpreis inkl. 19% MwSt.</div>
      <div class="summary-total-amount">${fmt(total)}</div>
      <div class="summary-total-sub">Kostenlose Lieferung · Statik-Nachweis · Montageanleitungen inklusive · Lieferung ca. ${deliveryDate()}</div>
    </div>

    <div class="delivery-checker">
      <h3>🚚 Lieferung in Ihre Region prüfen</h3>
      <p>Geben Sie Ihre Postleitzahl ein, um zu prüfen, ob wir in Ihre Region liefern.</p>
      <div class="delivery-input-row">
        <input class="delivery-input" id="plz-input" type="text" maxlength="5" placeholder="z.B. 80331" oninput="this.value=this.value.replace(/[^0-9]/g,'')">
        <button class="btn btn-primary" onclick="checkDelivery()">Prüfen</button>
      </div>
      <div class="delivery-result" id="delivery-result"></div>
    </div>

    <div class="inquiry-form">
      <h3>Unverbindliche Anfrage senden</h3>
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Vorname <span class="req">*</span></label>
          <input class="form-input" type="text" placeholder="Max">
        </div>
        <div class="form-group">
          <label class="form-label">Nachname <span class="req">*</span></label>
          <input class="form-input" type="text" placeholder="Mustermann">
        </div>
        <div class="form-group">
          <label class="form-label">E-Mail <span class="req">*</span></label>
          <input class="form-input" type="email" placeholder="max@beispiel.de">
        </div>
        <div class="form-group">
          <label class="form-label">Telefon (optional)</label>
          <input class="form-input" type="tel" placeholder="+49 ...">
        </div>
        <div class="form-group">
          <label class="form-label">Postleitzahl <span class="req">*</span></label>
          <input class="form-input" type="text" maxlength="5" placeholder="80331">
        </div>
        <div class="form-group">
          <label class="form-label">Wunschtermin (optional)</label>
          <input class="form-input" type="date">
        </div>
        <div class="form-group full">
          <label class="form-label">Anmerkungen (optional)</label>
          <textarea class="form-textarea" placeholder="Besondere Anforderungen, Grundstückshinweise, Fragen zur Statik ..."></textarea>
        </div>
      </div>
      <button class="btn btn-primary btn-lg" style="margin-top:12px" onclick="submitInquiry()">
        Anfrage absenden
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="form-hint" style="margin-top:10px;">* Pflichtfelder · Ihre Daten werden nicht an Dritte weitergegeben.</div>
    </div>

    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:32px;">
      <button class="btn btn-primary btn-lg" onclick="window.location.href='order.html'">
        Zur Bestellung
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <a href="configurator.html" class="btn btn-ghost">← Konfiguration ändern</a>
    </div>
  `;
}

function checkDelivery() {
  const plz = document.getElementById('plz-input').value.trim();
  const result = document.getElementById('delivery-result');
  if (!result) return;
  result.className = 'delivery-result';

  if (plz.length !== 5) {
    result.textContent = 'Bitte geben Sie eine gültige 5-stellige Postleitzahl ein.';
    result.classList.add('error');
    return;
  }
  if (EXCLUDED_POSTCODES.includes(plz)) {
    result.innerHTML = '❌ Leider liefern wir nicht in diese Postleitzahl. Bitte kontaktieren Sie uns für eine individuelle Lösung.';
    result.classList.add('error');
    return;
  }
  if (DELIVERY_ZONES[plz[0]]) {
    result.innerHTML = `✅ Super! Wir liefern nach <strong>${plz}</strong>. Lieferung ca. ${deliveryDate()} · kostenlos.`;
    result.classList.add('success');
  } else {
    result.innerHTML = '❌ In diese Region liefern wir leider nicht. Kontaktieren Sie uns für eine individuelle Lösung.';
    result.classList.add('error');
  }
}

function submitInquiry() {
  alert('Vielen Dank für Ihre Anfrage!\n\nWir melden uns innerhalb von 24 Stunden bei Ihnen.\n\n(Demo-Funktion — keine echte Übermittlung)');
}

// ── Init ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('summary-content')) {
    loadState();
    renderSummary();
    return;
  }
  loadState();
  renderOptions();
  renderSidebar();
  initEvents();
});
