"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Camera, Star, Tag, Grid3X3, MessageCircle, Clock, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    label: "Início",
    href: "/",
    icon: Home,
    description: "Página inicial com as melhores ofertas",
  },
  {
    label: "Recentes",
    href: "/recentes",
    icon: Clock,
    description: "Promoções mais recentes",
  },
  {
    label: "Explorar",
    href: "/explorar",
    icon: Camera,
    description: "Fotos reais da comunidade",
  },
  {
    label: "Recebidos",
    href: "/recebidos",
    icon: Star,
    description: "Avaliações de produtos",
  },
  {
    label: "Cupons",
    href: "/cupons",
    icon: Tag,
    description: "Códigos de desconto",
  },
  {
    label: "Categorias",
    href: "/categorias",
    icon: Grid3X3,
    description: "Todas as categorias",
  },
  {
    label: "WhatsApp",
    href: "/whatsapp",
    icon: MessageCircle,
    description: "Grupos do WhatsApp",
  },
  {
    label: "Fale Conosco",
    href: "/fale-conosco",
    icon: MessageCircle,
    description: "Entre em contato",
  },
]

export function NavigationMenu() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-1">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className={cn("gap-2 font-medium", isActive && "bg-red-600 hover:bg-red-700 text-white")}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Mobile Navigation Dropdown */}
      <div className="lg:hidden relative">
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="gap-2">
          Menu
          <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
        </Button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
            <div className="p-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                    <div
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors",
                        isActive && "bg-red-50 text-red-600",
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <div>
                        <p className="font-medium text-sm">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
