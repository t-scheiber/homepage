# Work projects

The `/workprojects` page presents six professional projects with short summaries, individual contributions and fictional demo screenshots. The homepage links to it and the sitemap includes it.

## Content and confidentiality

The training platform uses Vue and TypeScript. Framework labels describe the original project, not this Next.js portfolio or the static demo generator.

Edit `lib/work-projects.ts` to change the copy. Describe contributions without implying sole ownership or claiming measured impact that has not been established.

All screenshots are original, simplified demo interfaces. They are not screenshots of company applications, and the page and images say so. The Git/deployment image is explicitly a conceptual overview, not a product UI.

Only fictional names, sample statuses, generic resources and reserved example email addresses belong in the demos. Do not add company branding, internal domains, repository paths, staff information, real counts, customer details, credentials, private source code or architecture diagrams. Research notes and original company materials must remain outside this repository.

## Regenerating the images

Run `node scripts/create-work-project-demos.mjs <local-output-directory>` to write six standalone HTML demos outside the site. Serve that directory on loopback and capture each page at a 1280 × 900 CSS-pixel desktop viewport. Save PNG screenshots in `public/files/work-projects/` using the matching HTML filename stem. Check the complete image, including its footer, before replacing an asset.

The generator contains only fictional content, has no dependencies, makes no network requests and does not connect to any work system. It does not modify or redact original company screenshots. The page provides larger image links and descriptive alternative text.

## Validation

Run the repository lint, type check, production build and test commands. The production smoke test includes `/workprojects` and follows its local asset references. Also check the homepage link, all six section links and image links, and mobile layouts at 390px and 768px.
