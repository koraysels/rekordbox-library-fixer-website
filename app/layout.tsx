import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata = {
  title: "Rekordbox Library Fixer - Clean Your DJ Library Effortlessly",
  description:
    "A free, open-source tool to fix duplicates, relocate missing tracks, and organize your Rekordbox DJ library. Made by DJs, for DJs.",
  keywords: [
    "rekordbox",
    "dj library",
    "music library manager",
    "duplicate tracks",
    "missing tracks",
    "dj tools",
    "pioneer dj",
    "music organization",
    "track relocation",
    "dj software",
    "music collection",
    "library cleanup",
    "open source dj tools",
    "rekordbox fixer",
    "dj library maintenance",
  ].join(", "),
  authors: [{ name: "koraysels", url: "https://github.com/koraysels" }],
  creator: "koraysels",
  publisher: "koraysels",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://koraysels.github.io/rekordbox-library-fixer",
    siteName: "Rekordbox Library Fixer",
    title: "Rekordbox Library Fixer - Clean Your DJ Library Effortlessly",
    description:
      "A free, open-source tool to fix duplicates, relocate missing tracks, and organize your Rekordbox DJ library. Made by DJs, for DJs.",
    images: [
      {
        url: "https://raw.githubusercontent.com/koraysels/rekordbox-library-fixer/main/assets/icon.png",
        width: 512,
        height: 512,
        alt: "Rekordbox Library Fixer Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rekordbox Library Fixer - Clean Your DJ Library Effortlessly",
    description:
      "A free, open-source tool to fix duplicates, relocate missing tracks, and organize your Rekordbox DJ library. Made by DJs, for DJs.",
    images: ["https://raw.githubusercontent.com/koraysels/rekordbox-library-fixer/main/assets/icon.png"],
  },
  alternates: {
    canonical: "https://koraysels.github.io/rekordbox-library-fixer",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="icon" href="/rekordbox-library-fixer-website/icons/icon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/rekordbox-library-fixer-website/icons/16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/rekordbox-library-fixer-website/icons/32x32.png" />
        <link rel="apple-touch-icon" sizes="128x128" href="/rekordbox-library-fixer-website/icons/128x128.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;900&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Rekordbox Library Fixer",
              description:
                "A free, open-source tool to fix duplicates, relocate missing tracks, and organize your Rekordbox DJ library. Made by DJs, for DJs.",
              url: "https://koraysels.github.io/rekordbox-library-fixer",
              downloadUrl: "https://github.com/koraysels/rekordbox-library-fixer/releases/latest",
              author: {
                "@type": "Person",
                name: "koraysels",
                url: "https://github.com/koraysels",
              },
              applicationCategory: "MultimediaApplication",
              operatingSystem: "Windows, macOS, Linux",
              softwareVersion: "Latest",
              license: "https://github.com/koraysels/rekordbox-library-fixer/blob/main/LICENSE",
              programmingLanguage: "JavaScript",
              codeRepository: "https://github.com/koraysels/rekordbox-library-fixer",
              keywords:
                "rekordbox, dj library, music library manager, duplicate tracks, missing tracks, dj tools, pioneer dj, music organization",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              screenshot: [
                "https://github.com/koraysels/rekordbox-library-fixer/blob/main/screenshots/01-main-interface.png?raw=true",
                "https://github.com/koraysels/rekordbox-library-fixer/blob/main/screenshots/03-duplicate-detection.png?raw=true",
                "https://github.com/koraysels/rekordbox-library-fixer/blob/main/screenshots/04-track-relocation.png?raw=true",
              ],
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
