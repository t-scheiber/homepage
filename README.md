# Thomas Scheiber - Portfolio Website

A modern, responsive portfolio website built with Next.js 16, React 19, and TypeScript.

## Features

- 🎨 Modern, responsive design optimized for all screen sizes (mobile to 4K)
- ⚡ Server-side rendering for optimal performance
- 🎭 Interactive particle background
- 📱 Mobile-first responsive design
- ♿ Accessible and SEO-optimized
- 🚀 Self-hosted on VPS with Coolify
- 💚 Health endpoint for monitoring

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: TSParticles
- **Font**: Inter (Google Fonts)
- **Package Manager**: Bun 1.3.1+
- **Deployment**: Coolify + Nixpacks

## Prerequisites

- **Bun 1.3.1+** (package manager and runtime)

## Development

```bash
# Install dependencies
bun install

# Run development server
bun run dev

# Build for production
bun run build

# Start production server
bun run start

# Run linter
bun run lint
```

## Deployment

This site uses Next.js server-side rendering and is optimized for deployment on Coolify with Nixpacks.

### Build Process

1. `bun install` - Install dependencies
2. `bun run build` - Create production build
3. `bun run start` - Start production server (or use process manager like PM2)

### Health Endpoint

The app includes a health check endpoint at `/api/health` for monitoring and deployment verification.

## Performance Optimizations

- Server-side rendering for optimal initial load
- Lazy-loaded particles component
- Optimized images with Next.js Image component
- Memoized React components
- Minimal JavaScript bundle
- Font optimization with `next/font`
- Compressed assets

## Screen Size Optimization

- **Mobile (< 1024px)**: Single column, full-width tiles
- **Desktop (1024px - 2800px)**: 4-column grid, max 1050px width
- **4K (≥ 2800px)**: 4-column grid, max 1600px width

## License

See LICENSE file for details.


## Maintenance validation

Use Node.js 22.23.2 (major 22) and Bun 1.4.2. Install with `bun install --frozen-lockfile`, then run:

```sh
bun run build
bun run typecheck
bun run lint
bun run test
```

The seven tests cover CV viewing and closing, link behavior, certificate downloads, the health response, all four production pages, image optimization and exact byte preservation of all 73 public assets, including all 10 PDFs. The production smoke test starts Next on loopback only and requires the build to exist.

Inter is bundled locally with its SIL Open Font License and publisher provenance under `app/fonts`, so production builds do not fetch fonts. The CV and certificate files remain unchanged; validation never runs the optional document or image optimization scripts.

Deployment keeps the existing Next server contract: `bun run build`, then `bun run start`. The health route and image optimizer require a server. The obsolete `next export` command was removed; see the [Next.js migration documentation](https://nextjs.org/docs/pages/guides/upgrading/version-14). The Node 22 requirement is now explicit in `package.json`. Hosting settings still need to select that runtime before deployment; local validation does not prove the current live deployment uses it.
