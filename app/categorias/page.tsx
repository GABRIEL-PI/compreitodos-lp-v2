"use client"

import { useState, useEffect } from "react"
import { RightSidebar } from "@/components/right-sidebar"
import { CategoryBrowser, type Category } from "@/components/category-browser"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Zap, Home, Tv, Sofa, Star, TrendingUp, Gift } from "lucide-react"
import { useRouter } from "next/navigation"
import { fetchCategories } from "@/lib/api"

export default function CategoriasPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetchCategories()
        const mappedCategories: Category[] = response.data.data.map((cat) => ({
          id: cat.slug, // Use slug as ID for navigation
          name: cat.name,
          icon: getCategoryIcon(cat.slug),
          count: Math.floor(Math.random() * 200) + 20, // Mock count as API doesn't provide it
          description: `Explore as melhores ofertas em ${cat.name}`,
          subcategories: [], // API doesn't provide subcategories structure yet
        }))
        setCategories(mappedCategories)
      } catch (error) {
        console.error("Failed to load categories:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  // Helper to assign icons based on slug
  const getCategoryIcon = (slug: string) => {
    if (slug.includes("eletronico") || slug.includes("celular") || slug.includes("informatica")) return Zap
    if (slug.includes("casa") || slug.includes("eletrodomestico")) return Home
    if (slug.includes("tv") || slug.includes("audio")) return Tv
    if (slug.includes("moveis") || slug.includes("decoracao")) return Sofa
    if (slug.includes("moda") || slug.includes("roupa") || slug.includes("bolsa")) return ShoppingBag
    if (slug.includes("beleza") || slug.includes("perfume")) return Star
    if (slug.includes("esporte") || slug.includes("fitness")) return TrendingUp
    if (slug.includes("brinquedo") || slug.includes("game")) return Gift
    return ShoppingBag // Default icon
  }

  const handleCategorySelect = (categoryId: string) => {
    router.push(`/categorias/${categoryId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto flex gap-6 p-4">
        <main className="flex-1 min-w-0">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <CategoryBrowser
                categories={categories}
                onCategorySelect={handleCategorySelect}
              />
            )}
          </div>
        </main>
        <div className="hidden xl:block w-80 shrink-0">
          <RightSidebar />
        </div>
      </div>
    </div>
  )
}
