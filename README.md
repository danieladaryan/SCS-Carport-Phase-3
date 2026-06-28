# SCS Carport Konfigurator — Phase 3

**Student:** Daniela Daryan | 1061903 | TH Rosenheim
**Project:** SCS E-Commerce — Phase 3: Build It
**Submission deadline:** 3 July 2026

---

## Project Description

This platform is a redesigned carport configurator for SCS Holzwerke, built as an individual submission for the TH Rosenheim e-commerce project. The central design thesis comes directly from Phase 2 Hypothesis 1: users of the original SCS configurator experience a disconnect between the option selection panel and the price widget, leading to confusion and manual price calculations.

This redesign addresses that by surfacing per-option price deltas directly on each option card and keeping a live, itemised price breakdown persistently visible in a sticky sidebar throughout the configuration process.

The platform covers four pages: a landing page, a dedicated products page with ready-made configurations, the interactive configurator, a summary page, and a full order page with payment options.

---

## Access & Setup Instructions

**Live URL:** https://danieladaryan.github.io/SCS-Carport-Phase-3/
**Password:** builditphase3

**Run locally:**
1. Unzip the archive.
2. Open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge).

All assets are self-contained. The only external dependency is Google Fonts, loaded via CDN — the site works without it but falls back to system fonts.

---

## Technology & Tool Choice

**Stack:** Plain HTML, CSS, JavaScript — no frameworks, no build tools.

**Rationale:** The submission requires a portable `.zip` that runs without proprietary tools. A plain HTML/CSS/JS stack is the most portable option available. It also meant every line of code directly reflects the UX decisions from Phases 1 and 2 without framework abstraction. JavaScript is used exclusively for the configurator logic: state management, price calculation, DOM rendering, the flash animation on price update, delivery date calculation, and postcode delivery checking.

**Hosting:** GitHub Pages — free, reliable, and live until at least 31 July 2026.

**Password protection:** Implemented via a JavaScript overlay on the entry page, using localStorage to persist authentication across page navigations.

---

## Platform Structure

The platform consists of 5 pages:

1. **index.html** — Landing page with hero, product cards showing price ranges, USP strip, benefits section, customer reviews, and contact strip.
2. **products.html** — "Meistgeliebte Carports" — four ready-made configurations with full price breakdowns, real product photos, customer reviews, delivery date, and one-click selection that pre-loads the summary page.
3. **configurator.html** — The interactive configurator with 5 configuration steps (size, roof type, covering, cladding, add-ons), per-option price deltas on every card, live sticky sidebar with itemised breakdown, flash animation on total price update, carport preview image that switches on roof type selection, and live delivery date.
4. **summary.html** — Full itemised price breakdown, postcode delivery checker, and inquiry form.
5. **order.html** — Complete order page with contact details, delivery address, payment method selection (invoice, prepayment, SEPA), and order confirmation screen.

---

## Concept & Deviations from Phase 2

### Implemented as planned

- Per-option price delta displayed on every option card (+€380, +€640, etc.)
- Live sidebar price breakdown, categorised by section, updating instantly on every selection
- Flash animation on the total price when it changes (yellow highlight, 0.5s)
- Delta toast notification showing the change amount (+€380) when an option is selected
- Both Einzelcarport and Doppelcarport supported with a type toggle
- Summary page with full itemised breakdown before order submission
- Pricing based on real SCS base prices (Einzelcarport: €4,833.84; Doppelcarport: €6,357.59) with realistic option deltas consistent with the documented price range from Phase 2 user research
- Progress bar across all steps showing current position in the flow
- Postcode delivery checker on the summary page
- Full order page with payment options (added beyond Phase 2 scope)
- Dedicated products page with ready-made configurations and reviews (added beyond Phase 2 scope)
- Price range displayed on product cards (min to max) to prevent price shock

### Deviations & reasoning

- **No real backend.** The order form is a UI demonstration; it does not submit data to a real backend. A real backend would require a server, a database, and GDPR-compliant data handling, which is out of scope for this academic project.
- **Cladding material options simplified.** The real SCS configurator offers many individual facade profiles. These were consolidated into four levels (none, 1 side, 2 sides, 3 sides) with representative pricing to keep the configurator focused on price transparency rather than exhaustive product listing.

---
## Future Work


Integration with a real backend for order processing and email confirmation
Google Analytics 4 with event tracking on configuration steps and summary page view
Postcode-based delivery zone pricing (Gebiet 1 vs. Gebiet 2)
Save and share configuration via URL parameters
Full per-option product photography

## AI Use Declaration

**Tools used:** Claude (Anthropic) for code generation and iterative development throughout Phase 3.

**What it produced:** The full HTML, CSS, and JavaScript codebase was generated with Claude as part of an iterative, step-by-step process. This included the CSS design system, the configurator rendering logic, the pricing data structure, the flash animation, the delivery date calculator, the postcode checker, the order page, the products page, and the password protection system.
