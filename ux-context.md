# Prevalent AI — UX Context

This file defines who uses Prevalent AI, what they need, and the UX laws that govern every interface decision. Read this alongside the design system spec before generating or reviewing any UI.

---

## 1. Product Overview

Prevalent AI is a **cybersecurity risk and exposure management platform** used by enterprise security teams. Users work with large volumes of asset data, vulnerability findings, scan results, and compliance reports. The UI must support fast, accurate decision-making under pressure — not casual browsing.

---

## 2. User Personas

### Persona 1 — The CISO

**Who they are**
A senior security leader who uses the platform for oversight, board reporting, and strategic decisions. Visits less frequently than operational users but needs instant comprehension. Not always a hands-on technical user. Accountable to the board for risk posture.

**Primary goals**
- Understand overall risk posture at a glance
- Track trend direction (are we improving or getting worse?)
- Get board-ready data without manual compilation
- Validate that the team is focused on the right priorities
- Communicate risk in business terms, not technical jargon

**Frustrations**
- Dashboards with too many numbers and no clear signal
- Metrics that don't connect to business impact
- Reports that require manual assembly from multiple screens
- Unclear trend direction — is a number good or bad?
- Being asked to interpret raw data rather than conclusions

**UI implications**
- Lead every summary view with KPI cards — large numbers, clear labels, explicit trend direction
- Trend indicators must show direction AND whether that direction is good or bad (colour-coded)
- Use donut/line charts for trend, not raw tables
- Reduce cognitive load — max 4–5 metrics per summary screen
- CTA prominence matters — CISO should know the one action to take
- Avoid jargon in labels on summary screens (use "Total Risk Score" not "CVSS aggregate")

---

### Persona 2 — GRC (Governance, Risk & Compliance)

**Who they are**
Responsible for compliance programme management, risk registers, policy governance, and audit readiness. Works closely with auditors and regulators. Needs to map security controls to compliance frameworks (SOC 2, ISO 27001, NIST CSF, CIS). Methodical and documentation-driven.

**Primary goals**
- Track compliance posture across multiple frameworks simultaneously
- Collect and organise audit evidence without chasing engineering teams
- Monitor control effectiveness and flag gaps before audits
- Generate compliance reports for regulators and leadership
- Maintain risk register with treatment status

**Frustrations**
- Security data that isn't mapped to compliance frameworks
- Having to manually cross-reference findings against controls
- Reports that require reformatting for regulatory submission
- No clear audit trail for who changed what and when
- Compliance scores with no drill-down to underlying evidence

**UI implications**
- Lead with compliance framework status — percentage complete per framework
- Tables of controls grouped by domain (e.g. Access Control, Incident Response)
- Control status must show: current state, last reviewed date, evidence attached Y/N
- Export to PDF/CSV is a primary action, not a buried option
- Risk register needs treatment columns: Accept / Mitigate / Transfer / Avoid
- Audit trail / changelog visible on every significant record
- Filter by framework, domain, owner, and status

---

### Persona 3 — Security Architect

**Who they are**
Designs and oversees the security architecture of the organisation. Focused on attack surface management, system topology, integration security, and threat modelling. Technically deep — prefers precision over simplicity. Evaluates the platform for technical accuracy and completeness.

**Primary goals**
- Map and understand the full attack surface
- Identify architectural weaknesses and exposure paths
- Evaluate integration security configurations
- Understand asset relationships and blast radius
- Drive security design decisions based on real data

**Frustrations**
- Oversimplified summaries that hide technical detail
- Findings without enough context to understand root cause
- No way to see relationships between assets or systems
- Integration configurations that can't be audited or validated
- UI that treats all vulnerabilities the same regardless of exposure

**UI implications**
- Show technical detail prominently — CVSSv3 vector string, exploit paths, affected configurations
- Asset relationship views — group by system, subnet, integration, or owner
- Findings must be filterable by exposure: internet-facing vs internal
- Configuration audit tables with exact values, not just pass/fail
- Technical metadata visible in default views without drilling in
- Avoid dumbing down labels — "Remote Code Execution" not "Critical Issue"

---

### Persona 4 — Security Engineer (Vulnerability / IT / SecOps)

**Who they are**
The operational hands of the security team. Covers vulnerability management engineers, IT operations, and SecOps practitioners. Responsible for running scans, managing asset inventory, configuring integrations, and tracking remediation. Spends the most time in the platform day-to-day. Detail-oriented and task-focused.

**Primary goals**
- Run scans and validate results without errors
- Track vulnerability remediation status and SLA compliance
- Keep asset inventory accurate and integration pipelines healthy
- Assign findings to engineering teams and track progress
- Resolve scan failures and integration errors quickly

**Frustrations**
- Integration errors with no actionable explanation
- Scan results that can't be filtered or bulk-assigned
- Asset data that's stale or missing source context
- Settings buried across multiple unrelated sections
- Remediation workflows that require leaving the platform

**UI implications**
- Dense operational tables: CVE ID, CVSS score, severity, affected asset, status, assignee, SLA date
- Severity and status always visible in default columns — never tooltip-only
- Bulk select + bulk assign/close/export in table toolbar
- Integration status shows: source name, last sync time, next sync, error reason if failed
- Form validation messages below each field (not just red borders)
- Settings grouped into labelled sections: Scans / Integrations / Assets / Users
- Destructive actions (delete, disconnect) require confirmation modals naming the item

---

### Persona 5 — SOC Analyst

**Who they are**
A front-line security operations analyst focused on alert triage, threat detection, and incident response. Works in real-time, high-pressure environments. Needs to move fast and maintain context across multiple open investigations. Shift-based, often handling dozens of events per session.

**Primary goals**
- Triage and prioritise alerts quickly — critical first
- Understand the full context of an alert without switching tools
- Track investigation status across active incidents
- Escalate or close findings with a clear audit trail
- Identify patterns across alerts (same asset, same threat actor)

**Frustrations**
- Dashboards that require multiple clicks to reach alert detail
- Severity information that's inconsistent or buried
- No way to see related alerts linked to the same asset or campaign
- Slow tables that can't be filtered at speed
- Investigation notes scattered or inaccessible mid-triage

**UI implications**
- Lead with alert/incident queue — severity sorted, most critical first
- Severity badge (colour + label) always visible in default column
- Row-level quick actions on hover: Acknowledge, Escalate, Close, Investigate
- Detail panel slides in from right without leaving the queue (no full-page navigation)
- Time context always visible: alert created, last updated, SLA remaining
- Bulk actions prominent: Acknowledge All, Assign to Me, Close Selected
- Filter bar always visible above the table: severity, status, source, asset, date range
- No modal-heavy flows during active triage — keep the queue in view

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
Prevalent AI users — especially SOC Analysts and Security Engineers — work with high volumes of data. Whitespace and decoration serve clarity, not aesthetics. Tables are preferred over cards for lists. Summary cards (KPI) are appropriate only for aggregate metrics, not for individual items.

**Rule:** Never replace a table with cards to "look cleaner." If an analyst needs to compare 50 findings, they need a table.

### Progressive Disclosure
Not every user needs every detail immediately. Structure content in layers: summary → list → detail. Lead with the number, let the user drill if they need the why.

**Rule:** Dashboards show aggregates. Lists show items. Detail pages show everything. Never dump all detail on the first level.

### Status Visibility at All Times
Security users need to know the state of things without hunting for it. Every asset, finding, scan, integration, and control must have a visible, consistently labelled status.

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
