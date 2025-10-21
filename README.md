# Professional Portfolio Website 💼

**🌐 Live Site:** [thomasscheiber.com](https://thomasscheiber.com)

> A modern, responsive portfolio website built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Performance](#performance)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [License](#license)

## 🎯 Overview

This is a production-ready portfolio website showcasing modern web development practices, including:

- **Server-Side Rendering (SSR)** with Next.js 15 App Router
- **Type-Safe Development** with TypeScript
- **Modern UI/UX** with Tailwind CSS
- **SEO Optimization** with structured data and metadata
- **Responsive Design** optimized for all devices
- **Performance Monitoring** with Vercel Analytics

## ✨ Features

### Core Functionality

- 📄 **PDF CV Viewer** - In-browser CV preview with download option
- 🎨 **Interactive UI** - Glassmorphism design with particle background
- 💎 **Modern Design** - Semi-transparent glass effects with backdrop blur
- 📱 **Mobile-First Design** - Fully responsive across all devices
- 🎯 **Dynamic Content** - Project showcase, certifications, and social links
- 🔍 **SEO Optimized** - Complete metadata, Open Graph, and JSON-LD structured data

### Technical Features

- ⚡ **Optimized Performance** - Static generation, image optimization, font optimization
- 🛡️ **Type Safety** - Full TypeScript coverage with strict mode
- ♿ **Accessibility** - WCAG compliant, ARIA labels, keyboard navigation
- 🔒 **Security** - Security headers, environment variables for sensitive data
- 📊 **Analytics** - Vercel Analytics and Speed Insights integration
- 🗺️ **SEO** - Dynamic sitemap and robots.txt

## 🛠️ Tech Stack

### Frontend

- **Framework:** Next.js 15.0.3 (App Router)
- **UI Library:** React 19.0.0
- **Language:** TypeScript 5.7.2
- **Styling:** Tailwind CSS 3.4.17 (100% Tailwind - no CSS modules)
- **Font:** Raleway (Google Fonts via next/font, thin weight 100)
- **Design:** Glassmorphism UI with backdrop blur effects
- **Animations:** Framer Motion 11.15.0 + Custom Tailwind animations
- **Particles:** @tsparticles/react 3.0.0

### Development Tools

- **Linting:** ESLint 9.17.0
- **Type Checking:** TypeScript strict mode
- **Package Manager:** npm
- **Build Tool:** Next.js built-in (Turbopack)

### Deployment & Analytics

- **Hosting:** Vercel
- **Analytics:** Vercel Analytics & Speed Insights
- **Image Optimization:** Next.js Image with AVIF/WebP support

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your information:

   ```env
   NEXT_PUBLIC_EMAIL=your.email@example.com
   NEXT_PUBLIC_PHONE=+1234567890
   NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/your-profile/
   NEXT_PUBLIC_GITHUB_URL=https://github.com/your-username/
   # ... etc
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
portfolio/
├── app/                       # Next.js App Router
│   ├── layout.tsx            # Root layout with metadata
│   ├── page.tsx              # Home page
│   ├── error.tsx             # Error boundary
│   ├── not-found.tsx         # 404 page
│   ├── loading.tsx           # Loading state
│   ├── robots.ts             # SEO robots.txt
│   ├── sitemap.ts            # Dynamic sitemap
│   ├── certifications/       # Certifications page
│   ├── codingprojects/       # Projects page
│   └── otherprojects/        # Client work page
├── components/               # React components
│   ├── TileLink.tsx         # Reusable link component
│   ├── PDFViewer.tsx        # PDF modal viewer
│   ├── Particles.tsx        # Background particles
│   ├── Footer.tsx           # Footer component
│   ├── StructuredData.tsx   # JSON-LD SEO
│   └── *List.tsx            # Content list components
├── lib/                      # Utility libraries
│   ├── constants.ts         # App constants
│   ├── analytics.ts         # Analytics helpers
│   └── performance.ts       # Performance monitoring
├── types/                    # TypeScript types
│   └── index.ts             # Shared type definitions
├── styles/                   # Global styles
│   └── globals.css          # Tailwind base + utilities
├── public/                   # Static assets
│   └── files/               # Images, PDFs, icons
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore file
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── next.config.mjs          # Next.js configuration
└── package.json             # Dependencies
```

## 🎯 Key Features

### 1. PDF CV Viewer

- In-browser PDF preview modal (100% Tailwind styled)
- Download functionality
- Mobile-responsive design
- Keyboard navigation (ESC to close)
- Smooth fade-in and slide-up animations

### 2. SEO Optimization

- Complete metadata configuration
- Open Graph tags for social sharing
- Twitter Card support
- JSON-LD structured data (Person schema)
- Dynamic sitemap generation
- Robots.txt configuration

### 3. Performance

- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Automatic image optimization (AVIF/WebP)
- Self-hosted font optimization (Raleway via next/font)
- Code splitting and lazy loading
- Optimized bundle size
- Pure Tailwind CSS (no runtime CSS-in-JS overhead)

### 4. Responsive Design

- Mobile-first approach
- Breakpoints: 800px (mobile), 1200px (tablet)
- Touch-friendly interactions
- Optimized for all screen sizes
- Landscape orientation support
- Glassmorphism effects with backdrop-blur

### 5. Accessibility

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- High contrast text
- Focus indicators

## ⚡ Performance

### Core Web Vitals

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

### Optimizations

- Self-hosted fonts via next/font (Raleway Thin)
- Modern image formats (AVIF/WebP)
- Automatic code splitting
- Gzip/Brotli compression
- Security headers
- Minimal JavaScript
- 100% Tailwind CSS (no CSS modules or runtime styles)
- Custom Tailwind animations (fadeIn, slideUp)

### Build Output

```
Route (app)                 Size    First Load JS
┌ ○ /                       3.8 kB  114 kB
├ ○ /certifications         2.36 kB 113 kB
├ ○ /codingprojects         502 B   106 kB
├ ○ /otherprojects          515 B   111 kB
```

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**

   ```bash
   npx vercel
   ```

2. **Set environment variables** in Vercel dashboard

3. **Deploy**
   ```bash
   npx vercel --prod
   ```

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- **Netlify:** Add Next.js build plugin
- **AWS Amplify:** Use SSR configuration
- **Docker:** Use the included Dockerfile

## 🔐 Environment Variables

Required environment variables (copy from `.env.example`):

```env
# Contact Information
NEXT_PUBLIC_EMAIL=              # Your email address
NEXT_PUBLIC_PHONE=              # Your phone number

# Social Media Links
NEXT_PUBLIC_LINKEDIN_URL=       # LinkedIn profile URL
NEXT_PUBLIC_GITHUB_URL=         # GitHub profile URL
NEXT_PUBLIC_INSTAGRAM_URL=      # Instagram profile URL
NEXT_PUBLIC_FACEBOOK_URL=       # Facebook profile URL

# Site Configuration
NEXT_PUBLIC_SITE_URL=           # Your website URL
NEXT_PUBLIC_SITE_NAME=          # Your site name
```

**Note:** Never commit `.env.local` to version control. It's included in `.gitignore`.

## 🧪 Code Quality

### TypeScript

- Strict mode enabled
- Full type coverage
- No `any` types used
- Proper interfaces and types

### Linting

```bash
npm run lint
```

### Type Checking

```bash
npx tsc --noEmit
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is a personal portfolio project. However, if you find bugs or have suggestions:

1. Open an issue
2. Describe the problem or suggestion
3. Include screenshots if applicable

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

### How to Contribute

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

### Development Standards

- TypeScript strict mode (no `any` types)
- Prettier for formatting
- ESLint for linting
- Full type safety

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Thomas Scheiber**

- Website: [thomasscheiber.com](https://thomasscheiber.com)
- GitHub: [@t-scheiber](https://github.com/t-scheiber)
- LinkedIn: [thomas-scheiber](https://www.linkedin.com/in/thomas-scheiber-857006151/)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Vercel](https://vercel.com/) - Hosting and Analytics
- [Tailwind CSS](https://tailwindcss.com/) - Utility-First CSS Framework
- [tsParticles](https://particles.js.org/) - Particle animations
- [React](https://react.dev/) - UI Library
- [Raleway](https://fonts.google.com/specimen/Raleway) - Elegant thin (weight 100) sans-serif typeface

---

<div align="center">

**Built with ❤️ using Next.js 15, React 19, TypeScript, and Tailwind CSS**

[Live Demo](https://thomasscheiber.com) • [Report Bug](https://github.com/t-scheiber/portfolio/issues) • [Request Feature](https://github.com/t-scheiber/portfolio/issues)

</div>
