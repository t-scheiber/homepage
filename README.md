# Thomas Scheiber portfolio

Source of [thomasscheiber.com](https://thomasscheiber.com), the personal portfolio and CV of Thomas Scheiber. It is a Next.js App Router site written in TypeScript. Visitors can read the CV in the browser, try interactive reconstructions of workplace automation projects, browse coding projects and websites, and open certificates.

## Pages

| Route | Content |
| --- | --- |
| `/` | Introduction, a small equipment-handover demo, the CV viewer, links to the other pages, contact and social links |
| `/workprojects` | Eight interactive demos and eight shorter project summaries |
| `/codingprojects` | Client platforms, personal tools, course projects and earlier paid work, each linked to its code and, where one exists, a live version |
| `/otherprojects` | Websites Thomas built or worked on, each with his part and the platform |
| `/certifications` | Degrees and certificates, each linking to its PDF |
| `/api/health` | JSON `{"status":"ok","message":"App is up and running"}` for uptime checks |

Every page has its own Open Graph image, and `public/sitemap.xml` lists the five pages.

## Stack

Versions come from `package.json`.

- Next.js 16.4 with React 19.3 and TypeScript 6.0
- Tailwind CSS 4.3, plus hand-written stylesheets in `styles/`
- `@tsparticles/slim` 4.5 for the background particles, switched off when the visitor prefers reduced motion
- `pdfjs-dist` 6.5 to draw the CV on canvas in a dialog on the home page
- Inter and JetBrains Mono, bundled under `app/fonts`, so builds do not fetch fonts
- ESLint 10, Prettier 3.10, and Node's built-in test runner with jsdom

Bun 1.4.2 is the package manager. Node must be `>=22.23.2 <23`, as `engines` in `package.json` says.

## How the content is organized

Copy and links live in data files, not in the components.

- `lib/projects.ts` holds the selected and personal coding projects, the course projects, the archived sites and the websites for `/otherprojects`.
- `lib/work-projects.ts` holds the text for the eight work demos and the eight further summaries.
- `lib/professional-profile.json` holds the public CV fields: name, email, location, links and employment. It is generated, see "CV pipeline".
- `lib/constants.ts` builds the social and contact links, taking the values from environment variables when set.
- `components/CertificatesList.tsx` lists the certificates and the PDF each one opens.

### Work demos

`/workprojects` presents reconstructions of internal applications. They use fictional data, run only in the browser and never call a work system, send a message or create a shipment. Each demo is a component in `components/work-demos/`, with its own local state. `components/WorkShowcase.tsx` picks the demo from the URL fragment, offers a button list on desktop and a native selector on phones, and resets the state when the demo changes.

The eight demos cover equipment handover, support drafts, employee lifecycle changes, meeting and room scheduling, guest access, tool connections, a Git training course and a deployment gate. [docs/work-projects.md](docs/work-projects.md) describes each scenario and the rules for public content.

### Themes

The header selector offers System, Light and Dark. System follows the device setting, including changes while the page is open. An explicit choice is saved in `localStorage` under `portfolio-theme` and applied by a small inline script before hydration. If storage is blocked, the choice still applies for the current visit. Light is called Mineral and Dark is called Slate. Their colors and background images are defined in `styles/themes.css`, and [DESIGN.md](DESIGN.md) records the design tokens.

### CV pipeline

The CV is not edited in this repository. A separate private career workspace builds it, then exports the PDF to `public/files/pdf/ScheiberThomasCV.pdf`, updates the asset manifest `tests/public-assets.json` and writes `lib/professional-profile.json`. That file records the source revision, a content fingerprint and the PDF checksum. `tests/master-cv.test.mjs` fails when the PDF no longer matches the export. [docs/master-cv.md](docs/master-cv.md) has the export commands.

## Run it locally

```sh
bun install --frozen-lockfile
bun run dev      # http://localhost:3000
bun run build
bun run start    # serves the production build
```

All variables are optional and read at build time. `.env.example` lists them, and local values go in `.env.local`.

| Variable | Used for |
| --- | --- |
| `NEXT_PUBLIC_EMAIL` | Contact email. Falls back to the address in `lib/professional-profile.json` |
| `NEXT_PUBLIC_PHONE` | Phone tile on the home page. The tile is omitted when empty |
| `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_GITHUB_URL` | Profile links. Fall back to the profile JSON |
| `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_FACEBOOK_URL` | Social links |
| `NEXT_PUBLIC_SITE_URL` | `url` field of the structured data. Defaults to `https://thomasscheiber.com` |

## Checks

```sh
bun run lint
bun run build
bun run typecheck
bun run test     # needs the build from the previous step
```

`bun run test` runs `node --test tests/*.test.mjs`. The tests cover:

- the CV dialog (open, close, fit to a phone screen, zoom, focus trap, load failure), tile links and certificate links, rendered in jsdom
- the equipment demo on the home page
- state changes in each work demo, including blocked actions, approval gates and recovery paths
- theme initialization with and without browser storage
- the production server, which serves all pages, the original PDFs, the health route and optimized images
- the CV checksum and the public asset manifest, which pins 84 files by hash

The component, theme, work demo and health tests transpile the TypeScript sources with the compiler API. TypeScript 7 does not ship that API, so the repository stays on TypeScript 6 until the harness is rewritten.

Two browser scripts check the built site with Playwright. The repository does not depend on Playwright, so install it in a separate folder and point `PLAYWRIGHT_MODULE` at its entry file. Run `next start` first and pass its address as `VERIFY_URL`, or let the scripts start their own server on a fixed port.

```sh
node scripts/verify-mobile.mjs         # CV viewer at 320, 390, 430, 844x390 and 1440 wide, no horizontal overflow
node scripts/verify-work-keyboard.mjs  # all eight demos by keyboard, at 390 and 1440 wide, in both themes
```

Set `HILL_EVIDENCE_DIR` to make the keyboard script write screenshots and a JSON report.

`bun run format:check` is not part of CI and currently reports unformatted files. `scripts/compress-cv.js`, `scripts/optimize-images.js` and `scripts/create-work-project-demos.mjs` are manual helpers that no check runs. Do not run `compress-cv.js` on the generated CV.

## Deployment

The repository contains no host configuration, no Dockerfile and no deploy script. It expects a Node 22 host that runs `bun run build` and then `bun run start`, because the health route and image optimization need a server. [docs/master-cv.md](docs/master-cv.md) says changes go out through the normal pull request and deployment checks.

`.github/workflows/portfolio-checks.yml` runs on pull requests and on pushes to `master`. It installs with `bun install --frozen-lockfile`, runs lint, build, typecheck and tests, then both browser scripts with Playwright 1.56.1 in Chromium. After a push to `master`, a second job waits up to ten minutes for the live site and runs `verify-mobile.mjs` against https://thomasscheiber.com. Renovate manages dependency updates, configured in `renovate.json`.

## Other documents

- [PRODUCT.md](PRODUCT.md) states the purpose and the content constraints.
- [DESIGN.md](DESIGN.md) describes typography, color and component styles.
- `docs/hill-climb*.md` records an AI-assisted review of the portfolio, with its rubric, scores and history.

## License

MIT, see [LICENSE](LICENSE).
