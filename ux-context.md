# Prevalent AI — UX Context

This file defines who uses Prevalent AI, what they need, and the UX laws that govern every interface decision. Read this alongside the design system spec before generating or reviewing any UI.

---

## 1. Product Overview

Prevalent AI is a **cybersecurity risk and exposure management platform** used by enterprise security teams. Users work with large volumes of asset data, vulnerability findings, scan results, and compliance reports. The UI must support fast, accurate decision-making under pressure — not casual browsing.

---

## 2. User Personas

### Persona 1 — The Security Analyst

**Who they are**
A hands-on security practitioner who spends most of their day inside the platform. They run scans, triage findings, investigate assets, and track remediation progress. Typically 2–6 years of experience. Detail-oriented and fast-moving.

**Primary goals**
- Quickly identify and prioritise critical and high findings
- Drill into asset details to understand blast radius
- Track remediation status without chasing developers
- Export findings for reporting

**Frustrations**
- Dashboards that hide data behind extra clicks
- Inconsistent severity labelling across screens
- Slow tables that don't sort or filter quickly
- Having to switch tools to get full context

**UI implications**
- Default to dense, tabular data layouts — cards hide too much
- Always show severity prominently (colour + label, never just colour)
- Tables must support sort, filter, and export without leaving the page
- Pagination with row counts — analysts need to know how much data exists
- Status badges must be immediately readable at a glance
- Avoid modal-heavy flows — keep context visible while acting

---

### Persona 2 — The CISO

**Who they are**
A senior security leader who uses the platform for oversight, board reporting, and strategic decisions. Visits less frequently than analysts but needs instant comprehension. Not always a hands-on technical user.

**Primary goals**
- Understand overall risk posture at a glance
- Track trend direction (are we improving or getting worse?)
- Get board-ready data without manual compilation
- Validate that the team is focused on the right priorities

**Frustrations**
- Dashboards with too many numbers and no clear signal
- Metrics that don't connect to business impact
- Reports that require manual assembly from multiple screens
- Unclear trend direction — is a number good or bad?

**UI implications**
- Lead every summary view with KPI cards — large numbers, clear labels, explicit trend direction
- Trend indicators must show direction AND whether that direction is good or bad (colour-coded)
- Use donut/line charts for trend, not raw tables
- Reduce cognitive load — max 4–5 metrics per summary screen
- CTA prominence matters — CISO should know the one action to take
- Avoid jargon in labels on summary screens (use "Total Risk Score" not "CVSS aggregate")

---

### Persona 3 — The IT Admin

**Who they are**
Responsible for asset inventory, integrations, scan configuration, and user management. Often the person who onboarded the platform. Technically capable but primarily operational — not a security analyst.

**Primary goals**
- Keep asset inventory accurate and up to date
- Configure and monitor integrations without errors
- Manage user access and permissions
- Resolve scan failures quickly

**Frustrations**
- Integration errors with no clear explanation
- Asset data that's stale or missing source context
- Unclear permission states — what can each role actually do?
- Settings buried across multiple sections

**UI implications**
- Form controls must have clear validation states and error messages (not just red borders)
- Status indicators for integrations must show source, last sync time, and error reason
- Settings screens benefit from grouped sections with clear headers — not a single long form
- Destructive actions (delete, disconnect) must have confirmation modals
- Empty states should explain why data is missing and what to do

---

## 3. UX Laws — Applied to Prevalent AI

These laws are baked into the design system spec. The AI must apply them on every generation without being asked.

### Hick's Law
**Principle:** The more options presented, the longer it takes to make a decision.

**Applied at Prevalent AI:**
- Navigation sections must be collapsed by default — show only the active section's children
- Filter panels should show the 4–6 most-used filters first; advanced filters are secondary
- Primary actions must be visually dominant; secondary and tertiary actions must be visually quieter
- Dropdowns with 10+ options must include a search field
- Never show more than one primary CTA per screen section

### Fitts's Law
**Principle:** The time to reach a target is a function of its size and distance.

**Applied at Prevalent AI:**
- All interactive row actions (edit, delete, view) must appear on row hover — not require right-click or a separate menu
- Primary action buttons (Add, Save, Apply) must be at minimum 32px height and placed at the natural resting point of the eye (top-right of content sub-header or bottom-right of modal)
- Filter and export controls must be in the top-right of table headers — not floating
- Mobile is not a target — but at 1024px minimum, touch targets still apply for trackpad users: min 32px height on all interactive controls

### Miller's Law
**Principle:** The average person can hold 7 ± 2 items in working memory.

**Applied at Prevalent AI:**
- KPI rows must contain 3–5 cards maximum — never more than 5
- Navigation sections must contain 5–7 items before being split or grouped
- Table columns visible by default must be 5–7 maximum; additional columns are opt-in via "Add Column"
- Wizard / multi-step flows must show progress — never exceed 5 steps without a summary checkpoint
- Severity levels are 4 (Critical, High, Medium, Low) — never add more without strong justification

### Jakob's Law
**Principle:** Users spend most of their time on other interfaces and expect yours to work the same way.

**Applied at Prevalent AI:**
- Table row selection uses checkboxes in the leftmost column — consistent with enterprise tools
- Pagination controls are always at the bottom-right of the table
- "Cancel" is always to the left of "Confirm/Save" in modal footers
- Search is triggered by typing, not requiring a button press
- Destructive actions (delete, disconnect) are always red

### Aesthetic-Usability Effect
**Principle:** Users perceive visually polished interfaces as easier to use and more trustworthy.

**Applied at Prevalent AI:**
- Spacing must be consistent — use the 4px base unit, never arbitrary values
- Alignment must be strict — all left edges in a column align exactly
- Icons must be from the design system set — never mix styles or sizes
- Empty states must have a brief message and a clear action — never just a blank area
- Loading states must use skeleton loaders, not spinners, for data-heavy sections

---

## 4. UX Principles — Prevalent AI Specific

These are product-level rules that shape every design decision.

### Data Density Over Decoration
Prevalent AI users — especially analysts — work with high volumes of data. Whitespace and decoration serve clarity, not aesthetics. Tables are preferred over cards for lists. Summary cards (KPI) are appropriate only for aggregate metrics, not for individual items.

**Rule:** Never replace a table with cards to "look cleaner." If an analyst needs to compare 50 findings, they need a table.

### Progressive Disclosure
Not every user needs every detail immediately. Structure content in layers: summary → list → detail. Lead with the number, let the user drill if they need the why.

**Rule:** Dashboards show aggregates. Lists show items. Detail pages show everything. Never dump all detail on the first level.

### Status Visibility at All Times
Security users need to know the state of things without hunting for it. Every asset, finding, scan, and integration must have a visible, consistently labelled status.

**Rule:** Status is never hidden in a tooltip or revealed only on hover. It must be visible in default table views.

### Confirmation Before Destruction
Irreversible actions — deleting assets, removing integrations, clearing findings — must always require explicit confirmation. The modal must name the specific item being affected and state consequences.

**Rule:** Destructive action modals must include: the item name, the consequence, and a red confirm button. "Are you sure?" alone is not enough.

### Errors Must Explain and Guide
Validation errors must tell the user what went wrong AND what to do. A red border with no message is not an error state — it's a failure.

**Rule:** Every error state must have a message below the field. Messages must be actionable: "Enter a valid email address" not "Invalid input."

---

## 5. Prompt Usage

To use this file with an AI tool:

```
Read our design system spec: https://anthu211.github.io/design-system-2.0/spec.md
Read our UX context: https://anthu211.github.io/design-system-2.0/ux-context.md

Now [describe what to build / review / check].
```

The AI will have full token definitions, component patterns, persona context, UX laws, and product principles before generating a single line of output.
