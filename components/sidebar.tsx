"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Flame, Zap, Gift, Smartphone, Home, Tv, Sofa, Star, ShoppingBag } from "lucide-react"
import { fetchCategories, type Category } from "@/lib/api"
import { useRouter } from "next/navigation"

const filters = [
  { name: "Meus Alertas", icon: Flame, badge: "Novo" },
  { name: "Destaques", icon: Star },
  { name: "Recentes", icon: Flame },
  { name: "Menor Preço", icon: Zap },
  { name: "Mais Pontuados", icon: Star },
  { name: "Ofertas", icon: Gift },
]

// Helper to map API category to component format
const getCategoryIcon = (slug: string) => {
  if (slug.includes("eletronicos")) return Zap
  if (slug.includes("casa")) return Home
  if (slug.includes("telefonia")) return Smartphone
  if (slug.includes("tv")) return Tv
  if (slug.includes("moveis")) return Sofa
  return ShoppingBag
}

interface SidebarCategory extends Category {
  icon: any
  count?: number
  special?: boolean
}

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState<SidebarCategory[]>([])
  const router = useRouter()

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetchCategories()
        const mappedCategories = response.data.data.map(cat => ({
          ...cat,
          icon: getCategoryIcon(cat.slug),
          count: Math.floor(Math.random() * 100) + 10, // Mock count
          special: cat.slug === 'gratis'
        }))
        setCategories(mappedCategories)
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      }
    }
    loadCategories()
  }, [])

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-white border-r h-[calc(100vh-4rem)] sticky top-16">
        <div className="p-4">
          <div className="space-y-4">
            {/* Filters */}
            <div>
              <nav className="space-y-1">
                {filters.map((filter) => (
                  <Button key={filter.name} variant="ghost" className="w-full justify-start hover:bg-gray-50">
                    <filter.icon className="h-4 w-4 mr-3 text-gray-500" />
                    <span className="flex-1 text-left">{filter.name}</span>
                    {filter.badge && (
                      <Badge variant="secondary" className="ml-2 bg-[var(--primary)] text-white">
                        {filter.badge}
                      </Badge>
                    )}
                  </Button>
                ))}
              </nav>
            </div>

            {/* Categories */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">Categorias</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[var(--primary)] hover:text-[var(--primary)]/80"
                >
                  Ver todas
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
              <nav className="space-y-1">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant="ghost"
                    className={`w-full justify-start hover:bg-gray-50 ${category.special ? "text-[var(--primary)]" : ""
                      }`}
                    onClick={() => router.push(`/categorias/${category.slug}`)}
                  >
                    <category.icon className="h-4 w-4 mr-3 text-gray-500" />
                    <span className="flex-1 text-left">{category.name}</span>
                    <ChevronRight className="h-3 w-3 text-gray-400" />
                  </Button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsOpen(false)}>
          <aside className="w-64 h-full bg-white">
            <div className="p-4">
              <div className="space-y-4">
                {/* Same content as desktop */}
                <div>
                  <nav className="space-y-1">
                    {filters.map((filter) => (
                      <Button key={filter.name} variant="ghost" className="w-full justify-start hover:bg-gray-50">
                        <filter.icon className="h-4 w-4 mr-3 text-gray-500" />
                        <span className="flex-1 text-left">{filter.name}</span>
                        {filter.badge && (
                          <Badge variant="secondary" className="ml-2 bg-[var(--primary)] text-white">
                            {filter.badge}
                          </Badge>
                        )}
                      </Button>
                    ))}
                  </nav>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-900">Categorias</h3>
                    <Button variant="ghost" size="sm" className="text-[var(--primary)]">
                      Ver todas
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                  <nav className="space-y-1">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant="ghost"
                        className={`w-full justify-start hover:bg-gray-50 ${category.special ? "text-[var(--primary)]" : ""
                          }`}
                        onClick={() => router.push(`/categorias/${category.slug}`)}
                      >
                        <category.icon className="h-4 w-4 mr-3 text-gray-500" />
                        <span className="flex-1 text-left">{category.name}</span>
                        <ChevronRight className="h-3 w-3 text-gray-400" />
                      </Button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
