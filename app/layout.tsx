import { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Raleway } from "next/font/google";
import "@/styles/globals.css";
import ParticlesComponent from "@/components/Particles";
import StructuredData from "@/components/StructuredData";

// Optimize font loading with next/font
const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "500", "600", "700"],
  variable: "--font-raleway",
});

// Viewport configuration for optimal mobile display
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://thomasscheiber.com"),
  title: {
    default: "Thomas Scheiber - Web Developer Portfolio",
    template: "%s | Thomas Scheiber",
  },
  description:
    "Professional web developer portfolio showcasing coding projects, certifications, and WordPress development work. Experienced in React, Next.js, TypeScript, and modern web technologies.",
  keywords: ["Web Developer", "Portfolio", "React", "Next.js", "TypeScript", "WordPress", "Frontend Developer", "Thomas Scheiber"],
  authors: [{ name: "Thomas Scheiber", url: "https://thomasscheiber.com" }],
  creator: "Thomas Scheiber",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thomasscheiber.com",
    title: "Thomas Scheiber - Web Developer Portfolio",
    description: "Professional web developer portfolio showcasing coding projects, certifications, and WordPress development work.",
    siteName: "Thomas Scheiber Portfolio",
    images: [
      {
        url: "/files/portrait.jpg",
        width: 800,
        height: 800,
        alt: "Thomas Scheiber",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thomas Scheiber - Web Developer Portfolio",
    description: "Professional web developer portfolio showcasing coding projects and certifications.",
    images: ["/files/portrait.jpg"],
  },
  icons: {
    icon: [
      { url: "/files/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/files/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/files/favicons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/files/favicons/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      "index": true,
      "follow": true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={raleway.variable}>
      <head>
        <StructuredData />
      </head>
      <body className={raleway.className}>
        {children}
        <ParticlesComponent />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
