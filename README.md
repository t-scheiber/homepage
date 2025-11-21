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

### Build Process:
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

