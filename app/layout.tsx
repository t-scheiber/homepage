import { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import "@/styles/portfolio.css";
import "@/styles/themes.css";
import "@/styles/pdf-viewer.css";
import ParticlesComponent from "@/components/Particles";
import StructuredData from "@/components/StructuredData";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { themeInitScript } from "@/lib/theme-init";

// Latin subset of the upstream Inter variable font (see app/fonts/provenance.json).
const inter = localFont({
  src: "./fonts/Inter-variable-latin.woff2",
  display: "swap",
  weight: "300 700",
  variable: "--font-inter",
});

// Viewport configuration for optimal mobile display
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#edf2ed" },
    { media: "(prefers-color-scheme: dark)", color: "#14232e" },
  ],
};

const description =
  "Thomas Scheiber builds internal tools, identity integrations and automation at Refurbed in Vienna, and freelance websites. Try interactive reconstructions of his work.";

export const metadata: Metadata = {
  metadataBase: new URL("https://thomasscheiber.com"),
  title: {
    default: "Thomas Scheiber, software development & automation",
    template: "%s | Thomas Scheiber",
  },
  description,
  authors: [{ name: "Thomas Scheiber", url: "https://thomasscheiber.com" }],
  creator: "Thomas Scheiber",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thomasscheiber.com",
    title: "Thomas Scheiber, software development & automation",
    description,
    siteName: "Thomas Scheiber",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thomas Scheiber, software development & automation",
    description,
  },
  icons: {
    icon: [
      {
        url: "/files/favicons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/files/favicons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/files/favicons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/files/favicons/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={inter.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <StructuredData />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={inter.className}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <Footer />
        <ParticlesComponent />
      </body>
    </html>
  );
}
