import type React from "react"
import type { Metadata } from "next"
import { VT323, Press_Start_2P } from "next/font/google"
import "./globals.css"
import Script from "next/script"

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
})

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
})

export const metadata: Metadata = {
  title: "Arkaparna Gantait | Personal Portfolio",
  description: "Official personal portfolio of Arkaparna Gantait, a Software Engineer and BS CS graduate from Georgia State University. Explore projects, skills, and experience in a unique retro Operating System interface (AlpacaOS).",
  keywords: ["Arkaparna Gantait", "Arkaparna", "Gantait", "Software Engineer", "Full Stack Developer", "Computer Science", "Georgia State University", "Portfolio", "AlpacaOS", "Web Developer", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Arkaparna Gantait" }],
  creator: "Arkaparna Gantait",
  publisher: "Arkaparna Gantait",
  openGraph: {
    title: "Arkaparna Gantait | Personal Portfolio",
    description: "Explore the interactive portfolio of Arkaparna Gantait, featuring a retro OS interface showcasing Full Stack projects and experience.",
    url: "https://www.alpacaos.info", // Assuming this is the domain based on previous context
    siteName: "Arkaparna Gantait Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arkaparna Gantait | Personal Portfolio",
    description: "Interactive portfolio of Arkaparna Gantait. Check out my projects and skills on AlpacaOS.",
    creator: "@ArkaparnaGantait", // Placeholder or if known
  },
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
  icons: {
    icon: "/fluffy-alpaca-icon.png",
    shortcut: "/fluffy-alpaca-icon.png",
    apple: "/fluffy-alpaca-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Arkaparna Gantait",
    "alternateName": ["AlpacaOS", "Arkaparna Gantait Portfolio"],
    "url": "https://www.alpacaos.info",
  }

  return (
    <html lang="en">
      <body className={`${vt323.variable} ${pressStart2P.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
