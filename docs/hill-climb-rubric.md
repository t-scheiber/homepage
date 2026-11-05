# Portfolio hill-climb contract

Objective: help a visitor evaluate Thomas's automation and AI engineering work, try representative demonstrations, inspect projects and credentials, and contact him.

Scope: the existing portfolio at `/`, `/workprojects`, `/codingprojects`, `/otherprojects` and `/certifications`, including shared navigation, themes, CV viewer and local demos. Preserve PRODUCT.md constraints, approved Mineral and Slate treatments, factual source boundaries, existing documents and destinations. No deployment, publishing, merging, invented career claims or external work-system calls.

Target: at least 9/10 in each category and overall, with no unresolved blocking defect. Score the actual candidate independently. The threshold is not a request to award a score.

Fixed rubric, version 1:

| Category | A 9/10 requires |
| --- | --- |
| Task completion | A visitor understands Thomas's role and contribution, reaches representative evidence with one clear action, can operate the demos, inspect the CV and credentials, and find contact links. Claims remain supported and fictional demos remain explicit. |
| Visual hierarchy | Role, representative work, supporting detail and next action have clear reading order. Typography, spacing and density support scanning. Decoration preserves legibility. No prominent awkward gaps, competing headings or confusing affordances. |
| Consistency | Shared navigation, theme, buttons, links, statuses and content terminology behave predictably across all five routes. Preserve the existing visual direction recorded in DESIGN.md and PRODUCT.md. |
| Accessibility | Keyboard operation, visible focus, semantic names and structure, status announcements, usable contrast, reduced motion and modal focus behavior work in the supplied states. Automated scans supplement observed interaction evidence. Do not claim a complete screen-reader audit. |
| Responsive behavior | Content, controls and CV work at 320x568, 390x844, 768x1024 and 1440x900, in both approved themes. No horizontal page overflow or obscured essential controls. Preserve mobile reading order, touch targets and zoom/reflow. |

Scoring anchors: 7 is usable with material deficiencies; 8 is solid with a noticeable shortfall; 9 satisfies the category with only small optional refinements; 10 is exceptional within this scope. Overall is an independent judgment. A high average cannot compensate for a category below target. Missing required rendered evidence is unverified and cannot pass.

Visual anchors: the initial candidate screenshots and DESIGN.md define the existing visual direction. Compare future candidates using matching route, viewport, theme and interaction states. Do not change these anchors to force a pass.

Required checks: production build, ESLint, TypeScript, all repository tests, existing browser CV verification, rendered route/viewport/theme checks, accessibility scan and observed keyboard/demo flows. Local Node 24.21.0 and Bun 1.4.4 differ from the CI pins Node 22.23.2 and Bun 1.4.2; report that limit.

Budget: assess the initial candidate, then at most three coordinated repair cycles. Stop on a required unavailable reviewer, exhausted applicable allowance, or two consecutive repairs without measurable progress. Only the coordinator edits implementation. Reviewers must be read-only and must not delegate.

Order: Claude Opus 5.5 then GPT-6.1 Sol, followed only after both pass the unchanged candidate by Gemini 4 Argon and Kimi K3.1 Pro in parallel through OpenCode Go. Any material candidate change returns to the first native gate.
