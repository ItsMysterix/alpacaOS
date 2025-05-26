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
  title: "AlpacaOS - Arka Gantait",
  description: "Portfolio website styled as an operating system",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js" strategy="beforeInteractive" />
      </head>
      <body className={`${vt323.variable} ${pressStart2P.variable}`}>{children}</body>
    </html>
  )
}
