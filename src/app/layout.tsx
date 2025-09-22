import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider as NextThemeProvider } from 'next-themes'

import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

import { AuthProvider } from "@/context/use-auth"
import { ThemeProvider } from "@/context/use-theme"
import { ProfileProvider } from "@/context/use-profile"
import { QueryProvider } from "@/lib/query-provider"

import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

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
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/icon.ico" sizes="any" />
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <QueryProvider>
          <NextThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
            storageKey="theme"
          >
            <ThemeProvider>
              <AuthProvider>
                <ProfileProvider>
                  <Suspense fallback={null}>
                    {children}
                    <Analytics />
                    <Toaster />
                  </Suspense>
                </ProfileProvider>
              </AuthProvider>
            </ThemeProvider>
          </NextThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}