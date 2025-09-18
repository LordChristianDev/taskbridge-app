import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/next"

import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

import { ThemeProvider } from "@/context/useTheme"
import { QueryProvider } from "@/lib/query-provider"

import "./globals.css"

export const metadata: Metadata = {
  title: "Taskbridge",
  description: "Connect with people around you",
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/icon.ico" sizes="any" />
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <QueryProvider>
          <ThemeProvider>
            <Suspense fallback={null}>
              {children}
              <Analytics />
            </Suspense>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
