# Portfolio hill climb

Completed. All four independent reviewers passed C3 with corrected evidence E2. Every category and overall scored 9/10. No unresolved blocking defect. Three implementation repair cycles and nine reviewer calls were used. No push, merge or deployment.

## Accepted candidate

- Branch: `improve/portfolio-hill-climb`.
- Reviewed implementation commit: `522b7c2cfa2f6a1902105314a54a4ae68e37b8eb`.
- Baseline: `d72312303cf9fcc45bdc70dd5cbbfe43b8636418`, origin `https://github.com/t-scheiber/homepage.git`.
- Implementation identity: `be27b5470a3c6553ee3ae5423c45e01181b6325e339bd58bf1139bbf3ee686c1`, sorted compact file-entry array with raw-byte SHA256 hashes. All 210 files verified after final review.
- Evidence: the locally retained `C3E2` evidence bundle. All 144 screenshot hashes verified after final review. Original C3 evidence and C0 anchors remain intact.
- Fixed contract: [rubric version 1](hill-climb-rubric.md), [review packet](hill-climb-packet.md). Target 9 in each category and overall, no blocker. Rubric SHA256 `A8E08B37C062B253412375C5E864582BFF09D849D38BEC925B5B5B2CD936E9D0`.
- Review documents and score visualization are excluded from implementation identity. Their final bookkeeping commit does not change the reviewed product source.

## Final independent scores

| Actual model | Task completion | Visual hierarchy | Consistency | Accessibility | Responsive behavior | Overall | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Claude Opus 5.5 | 9 | 9 | 9 | 9 | 9 | 9 | pass |
| GPT-6.1 Sol | 9 | 9 | 9 | 9 | 9 | 9 | pass |
| Gemini 4 Argon | 9 | 9 | 9 | 9 | 9 | 9 | pass |
| Kimi K3.1 Pro | 9 | 9 | 9 | 9 | 9 | 9 | pass |

## Review routes

| Reviewer | Provider | Model | Setting | Result |
| --- | --- | --- | --- | --- |
| Claude Opus 5.5 | Native Claude | claude-opus-5-5 | high effort | pass |
| GPT-6.1 Sol | Native Codex | gpt-6.1-sol | high reasoning | pass |
| Gemini 4 Argon | OpenCode Go | opencode-go/gemini-4-argon | high variant | pass |
| Kimi K3.1 Pro | OpenCode Go | opencode-go/kimi-k3.1-pro | high variant | pass |

The order was Opus, then Sol, then Argon and Kimi in parallel. Initial judgments did not receive other reviewers' scores. All four final reviews identify the same C3/E2 candidate and fixed rubric. Full task records and local evidence are retained privately.

## Changes and checks

Completed credential rows now show View PDF and external cues, with PDF/new-tab accessible names. Warning text keeps its intended color and honors reduced motion on direct homepage loads. Unsupported ARIA labels were removed. The native project picker retains focus while arrowing; explicit desktop actions move to the heading. Completed actions focus their nearby result. Selection and history changes clear stale announcements and use the current scenario instruction. Demo selector buttons form a named group. Footer email uses the shared arrow cue.

A committed browser keyboard script now runs in CI's existing Playwright verification step. It checks all eight demos at phone and desktop widths in both themes, with continuous arrows, state transitions, gates, focus, reset, stale-status rejection and Back/Forward.

- Production build, lint, TypeScript and all 27 tests passed on C3, zero failed and zero skipped.
- Six CV browser states passed, including fitting, text layers, zoom, scrolling, rotation, closing, focus and scroll restoration.
- All 32 real-browser keyboard demo flows passed, including history announcement checks.
- Forty route/viewport/theme axe scans and four settled CV scans report zero violations.
- All 54 route/demo layout states fit their viewports. Required route widths were 320, 390, 768 and 1440 in both themes.
- Final source/image hash checks and `git diff --check` passed. No new full-suite run was claimed after unchanged-source evidence revalidation.

E2 corrected capture timing without an implementation revision. Both PDF pages must have text layers and painted pixels; demo title, picker and pressed control must agree, and selection borders must settle before paint frames. Both native reviews were restarted after this screenshot change. Readiness helper SHA256 `3516da670acba76575a79d3e15a2ee7c24be0cdd9784faa69efe21d313624acf`. See `readiness-report.json` and [progress history](hill-climb-history.md).

## Review budget

Three coordinated implementation repairs produced five product commits, ending at `522b7c2`. No fourth implementation revision occurred. Nine review calls comprise five Opus reviews, two Sol reviews, one Argon review and one Kimi review. The final evidence-only correction retained the same source identity and required fresh native scores. No old score was applied to changed screenshots.

## Preserved work and limits

Pre-existing untracked background PNGs remain unmodified and uncommitted:

- `public/files/backgrounds/mineral-facets.png`: `AA805B4786C929F1724F02E758423D166D031CDA8FC000AF262F0F05D241EF58`.
- `public/files/backgrounds/slate-facets.png`: `3313AA3A2F5CE9194956EC12A2DF3867A95EA0500BE9AB479B5A6D9ED2CFADA2`.

Local validation used Node 24.21.0 and Bun 1.4.4, differing from CI pins 22.23.2 and 1.4.2. Chromium only. Image-background contrast incompletes remain unverified; no complete screen-reader, Safari/Firefox, physical-device, external-destination, performance or deployment verification. Reviews are scoped judgments, not proof of those untested properties.

Known nonblocking refinements remain: initial hash-less work-page Back behavior, homepage helper wording after inserting a valid sample, mobile introduction length, narrow status-list wrapping, Reset label wrapping, focus-ring/label-target consistency and a few secondary thumbnail states. They were not silently treated as fixed or blocking. No further changes were made after final passes.
