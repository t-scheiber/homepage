# Work projects

The `/workprojects` page presents eight interactive workflow demos and eight further project summaries. Visitors choose a demo, explore a success or failure path, and read the contribution and engineering decision alongside it. The homepage and sitemap link to the page.

## Content and confidentiality

Edit `lib/work-projects.ts` for public copy. Contributions are grounded in project documentation and authored changes reviewed in GitLab. Repository presence alone does not establish ownership, adoption or impact. Do not imply sole ownership or add unverified impact claims. The Git/deployment platform remains a pilot.

Framework labels describe the original projects. For example, training uses Vue and TypeScript, although its portfolio reconstruction runs in React.

All demo interfaces are original, simplified reconstructions. They use fictional names, sample states, generic resources and reserved example email addresses. Do not include employer branding, internal domains, repository paths, staff information, real counts, customer details, credentials, private code or architecture diagrams. Research notes and company materials stay outside this repository.

## Interactive demos

`components/WorkShowcase.tsx` selects a demo through a shareable URL fragment. It offers desktop workflow buttons, a native mobile selector and a reset control. Each component in `components/work-demos/` keeps its own local state. Switching or resetting a demo clears that state. No demo calls a work API, AI provider, calendar, shipping carrier or identity service.

- Equipment: invalid address, corrected address, label confirmation and uncertain-response reconciliation without a second label.
- Support: active or reopened source, deterministic sample reply, editable draft and human review gate. Nothing is sent.
- Lifecycle: return, departure and future-start scenarios, partial failure and recovery.
- Scheduling: time-dependent room availability and a blocked conflicting booking.
- Guest access: separate submitted, approved and rejected states.
- Connections: connect, sample sync, revoke and clear prior results.
- Training: original Git questions, explanatory feedback and retry.
- Deployment: failing checks, repair, independent approval and simulated release.

Further projects use native disclosure elements for contribution details. Existing source imagery in `public/files/work-projects/` remains available, including the equipment preview on the homepage. `scripts/create-work-project-demos.mjs` is the legacy static preview generator, not the implementation of these interactive demos.

## Validation

Run lint, type check, production build and tests using the repository's Node 22 runtime. Component tests cover meaningful state transitions and approval gates. Inspect desktop and mobile layouts in light and dark themes, including 320px width. Check URL selection, reset, keyboard focus and native disclosures. Keep fictional data and local-only behavior intact when adding new scenarios.
