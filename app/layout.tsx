import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AuthProvider } from "@/lib/auth-context"
import { GamificationProvider } from "@/components/gamification/gamification-provider"
import { Header } from "@/components/header"
import { WhatsAppGroupsWidget } from "@/components/whatsapp-groups-widget"
import "./globals.css"

export const metadata: Metadata = {
  title: "Compreitodos - Promoções e Cupons de Desconto",
  description:
    "A maior comunidade de promoções do Brasil. Encontre as melhores ofertas, cupons de desconto e cashback.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AuthProvider>
          <GamificationProvider>
            <Header />
            <Suspense fallback={null}>{children}</Suspense>
            <WhatsAppGroupsWidget />
          </GamificationProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
