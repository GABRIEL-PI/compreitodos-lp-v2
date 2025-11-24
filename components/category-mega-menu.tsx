"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Grid3x3, Zap, Home, Smartphone, Tv, Sofa, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { fetchCategories, type Category } from "@/lib/api"

// Helper to map API category to icon
const getCategoryIcon = (slug: string) => {
  if (slug.includes("eletronicos")) return <Zap className="w-4 h-4" />
  if (slug.includes("casa")) return <Home className="w-4 h-4" />
  if (slug.includes("telefonia")) return <Smartphone className="w-4 h-4" />
  if (slug.includes("tv")) return <Tv className="w-4 h-4" />
  if (slug.includes("moveis")) return <Sofa className="w-4 h-4" />
  return <ShoppingBag className="w-4 h-4" />
}

interface MegaMenuCategory extends Category {
  icon: React.ReactNode
  subcategories: { name: string; icon: string }[]
}

export function CategoryMegaMenu() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)
  const [categories, setCategories] = useState<MegaMenuCategory[]>([])

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetchCategories()
        const mappedCategories = response.data.data.map(cat => ({
          ...cat,
          icon: getCategoryIcon(cat.slug),
          subcategories: [] // API doesn't support subcategories yet
        }))
        setCategories(mappedCategories)
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      }
    }
    loadCategories()
  }, [])

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
        <Grid3x3 className="w-4 h-4" />
        Categorias
        <ChevronRight className="w-3 h-3" />
      </button>

      {/* Main Dropdown */}
      <div className="absolute left-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-red-600 font-semibold">
              <Grid3x3 className="w-4 h-4" />
              Categorias
            </div>
            <Link href="/categorias" className="text-sm text-gray-600 hover:text-red-600">
              Ver todas →
            </Link>
          </div>

          <div className="space-y-1">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Link
                  href={`/categorias/${category.slug}`}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group/item"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-red-600 text-lg">{category.icon}</span>
                    <span className="text-gray-700 group-hover/item:text-gray-900">{category.name}</span>
                  </div>
                  {category.subcategories.length > 0 && (
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover/item:text-gray-600" />
                  )}
                </Link>

                {/* Subcategories Panel */}
                {category.subcategories.length > 0 && hoveredCategory === category.id && (
                  <div className="absolute left-full top-0 ml-2 w-96 bg-white rounded-lg shadow-xl p-4 z-50">
                    <div className="mb-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                          Receba promoções de <span className="font-semibold text-gray-900">{category.name}</span>
                        </p>
                        <button className="bg-green-600 hover:bg-green-700 text-white text-xs px-4 py-1.5 rounded-full flex items-center gap-1">
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                          Casa e {category.name}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.name}
                          href={`/categorias/${category.slug}/${sub.name.toLowerCase()}`}
                          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                            {sub.icon}
                          </div>
                          <span className="text-xs text-center text-gray-700">{sub.name}</span>
                        </Link>
                      ))}
                    </div>

                    <Link
                      href={`/categorias/${category.slug}`}
                      className="block mt-3 text-center text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Ver todas →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
