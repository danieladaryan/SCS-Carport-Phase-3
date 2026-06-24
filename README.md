# SCS Carport Konfigurator — Phase 3

**Student:** Daniela Daryan | 1061903 | TH Rosenheim  
**Project:** SCS E-Commerce — Phase 3: Build It  
**Submission deadline:** 3 July 2026

---

## Project Description

This platform is a redesigned carport configurator for SCS Holzwerke, built as an individual submission for the TH Rosenheim e-commerce project. The central design thesis comes directly from Phase 2 Hypothesis 1: users of the original SCS configurator experience a disconnect between the option selection panel and the price widget, leading to confusion and manual price calculations. This redesign addresses that by surfacing per-option price deltas directly on each option card and keeping a live, itemized price breakdown persistently visible in a sticky sidebar throughout the configuration process.

The platform covers three pages: a landing page, the configurator itself, and a summary/inquiry page.

---

## Access & Setup Instructions

**Live URL:** [to be added after GitHub Pages deployment]  
**Password:** [to be added if password protection is applied]

**Run locally:**
1. Unzip the archive.
2. Open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge).
3. No build step, no server, no dependencies required.

All assets are self-contained. The only external dependency is Google Fonts, loaded via CDN — the site works without it but falls back to system fonts.

---

## Technology & Tool Choice

**Stack:** Plain HTML, CSS, JavaScript — no frameworks, no build tools.

**Rationale:** The submission requires a portable `.zip` that runs without proprietary tools. A plain HTML/CSS/JS stack is the most portable option available. It also meant every line of code directly reflects the UX decisions from Phases 1 and 2 without framework abstraction. JavaScript is used exclusively for the configurator logic: state management, price calculation, DOM rendering, and the flash animation on price update.

**Hosting:** GitHub Pages — free, reliable, and consistent with the Phase 2 prototype approach already in use.

---

## Concept & Deviations from Phase 2

### Implemented as planned

- Per-option price delta displayed on every option card (+€380, +€640, etc.)
- Live sidebar price breakdown, categorized by section, updating instantly on every selection
- Flash animation on the total price when it changes (yellow highlight, 0.5s)
- Both Einzelcarport and Doppelcarport supported with a type toggle
- Summary page with full itemized breakdown before inquiry submission
- Pricing based on real SCS base prices (Einzelcarport: €4,833.84; Doppelcarport: €6,357.59) with realistic option deltas consistent with the documented price range from Phase 2 user research

### Deviations & reasoning

- **No real checkout or payment flow.** The inquiry form is a UI demonstration; it does not submit data to a real backend. A real backend would require a server, a database, and GDPR-compliant data handling, which is out of scope for this academic project.
- **No photorealistic carport preview images.** The Phase 2 prototype used Gemini-generated images. These were not included in Phase 3 to keep the submission self-contained and portable without external image assets. The design relies on the price sidebar as the primary UX element instead.
- **Cladding material options simplified.** The real SCS configurator offers a large number of individual facade profiles. These were consolidated into four levels (none, 1 side, 2 sides, 3 sides) with representative pricing to keep the configurator usable and focused on price transparency rather than exhaustive product listing.

---

## Future Work

- Integration with a real backend for inquiry submission and order processing
- Carport preview image that updates based on selected options
- Postal code check for delivery zone (Gebiet 1 vs. Gebiet 2) affecting delivery cost
- Save and share configuration via URL parameters
- Google Analytics 4 event tracking on option selections and summary page view

---

## AI Use Declaration

**Tools used:** Claude (Anthropic) for code generation and structure planning.

**What it produced:** The full HTML, CSS, and JavaScript codebase was generated with Claude as part of an iterative, step-by-step process. This included the CSS token system, the configurator rendering logic, the pricing data structure, the flash animation, and the three-page site structure.

**What I contributed and changed:**
- All pricing data was derived from my own Phase 2 research (real SCS base prices, option delta ranges consistent with documented price ranges)
- The UX concept — per-option price deltas, live sidebar, flash animation — comes entirely from my Phase 2 hypothesis and prototype work, not from AI suggestion
- I reviewed and confirmed each structural and design decision before it was implemented, including typography pairing, color use, layout approach, and option categorization
- I identified and directed deviations from the Phase 2 plan (e.g. simplified cladding options, no backend)
- All copy is in German and was reviewed for tone and accuracy

The AI functioned as a coding assistant executing a concept I had already developed. The analytical and design decisions driving the platform — which are the graded components of this project — originate from Phases 1 and 2.
