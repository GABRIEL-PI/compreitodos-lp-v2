"use client"

import { EnhancedDealCard } from "./enhanced-deal-card"
import { AdvancedFilters } from "./advanced-filters"
import { Button } from "@/components/ui/button"
import { Flame, Clock, Star, TrendingUp, Grid3X3, List, Loader2 } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { fetchProducts, type Product } from "@/lib/api"
import type { Deal } from "@/lib/mock-data"

const quickFilters = [
  { id: "alerts", label: "Meus Alertas", icon: null, badge: "Novo" },
  { id: "hot", label: "Destaques", icon: Star },
  { id: "recent", label: "Recentes", icon: Clock },
  { id: "lowest", label: "Menor Preço", icon: TrendingUp },
  { id: "popular", label: "Mais Pontuados", icon: Flame },
  { id: "deals", label: "Ofertas", icon: null },
]

interface FilterState {
  categories: string[]
  stores: string[]
  priceRange: [number, number]
  discount: [number, number]
  features: string[]
  sortBy: string
}

// Helper to convert API Product to Deal interface expected by components
const mapProductToDeal = (product: Product): Deal => ({
  id: product.id.toString(),
  title: product.title,
  description: product.description || "",
  originalPrice: product.price * 1.2, // Mocking original price as API doesn't provide it yet
  currentPrice: product.price,
  discount: 20, // Mocking discount
  store: "Compreitodos",
  storeIcon: "🛍️",
  image: product.image_url,
  category: product.category,
  likes: 0,
  comments: 0,
  views: 0,
  isHot: false,
  isFree: product.price === 0,
  isExpiring: false,
  postedBy: {
    name: "Admin",
    avatar: "/placeholder.svg",
    level: 1,
  },
  postedAt: new Date(product.created_at).toLocaleDateString(),
  link: product.affiliate_url,
})

interface DealFeedProps {
  initialCategory?: string
}

export function DealFeed({ initialCategory }: DealFeedProps) {
  const [activeQuickFilter, setActiveQuickFilter] = useState("hot")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [filters, setFilters] = useState<FilterState>({
    categories: initialCategory ? [initialCategory] : [],
    stores: [],
    priceRange: [0, 5000],
    discount: [0, 100],
    features: [],
    sortBy: "relevance",
  })
  const router = useRouter()

  const loadDeals = useCallback(async (pageNum: number, isNewFilter = false) => {
    try {
      setLoading(true)
      // Use the first category from filters if available
      const categoryFilter = filters.categories.length > 0 ? filters.categories[0] : undefined
      const response = await fetchProducts(pageNum, 12, categoryFilter, undefined)

      const newDeals = response.data.data.map(mapProductToDeal)

      setDeals(prev => isNewFilter ? newDeals : [...prev, ...newDeals])
      setHasMore(newDeals.length === 12) // Assuming limit is 12
    } catch (error) {
      console.error("Failed to fetch deals:", error)
    } finally {
      setLoading(false)
    }
  }, [filters.categories]) // Add dependency on filters.categories

  useEffect(() => {
    loadDeals(1, true)
  }, [loadDeals, activeQuickFilter, filters]) // Reload when filters change

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    loadDeals(nextPage)
  }

  const handleDealClick = (dealId: string) => {
    router.push(`/deal/${dealId}`)
  }

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    setPage(1)
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {quickFilters.map((option) => (
              <Button
                key={option.id}
                variant={activeQuickFilter === option.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveQuickFilter(option.id)}
                className={`whitespace-nowrap relative ${activeQuickFilter === option.id
                  ? "bg-gray-900 text-white hover:bg-gray-800 font-medium"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                  }`}
              >
                {option.icon && <option.icon className="h-3 w-3 mr-1" />}
                {option.label}
                {option.badge && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] px-1 rounded">
                    {option.badge}
                  </span>
                )}
              </Button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <AdvancedFilters onFiltersChange={handleFiltersChange} dealCount={deals.length} />

            <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="18" x2="20" y2="18"></line>
                <circle cx="4" cy="6" r="1" fill="currentColor"></circle>
                <circle cx="4" cy="12" r="1" fill="currentColor"></circle>
                <circle cx="4" cy="18" r="1" fill="currentColor"></circle>
              </svg>
            </Button>

            <div className="flex items-center space-x-1 border border-gray-300 rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`rounded-r-none ${viewMode === "grid" ? "bg-[var(--primary)]" : ""}`}
              >
                <Grid3X3 className="h-3 w-3" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={`rounded-l-none ${viewMode === "list" ? "bg-[var(--primary)]" : ""}`}
              >
                <List className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {loading && deals.length === 0 ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {deals.map((deal, index) => (
            <div key={deal.id} onClick={() => handleDealClick(deal.id)}>
              {index === 0 && page === 1 ? (
                <div className="relative rounded-lg overflow-hidden cursor-pointer group h-full bg-gradient-to-b from-red-900 to-black">
                  <div className="absolute inset-0">
                    <div className="absolute top-4 left-4 right-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">OPERAÇÃO</span>
                        <span className="text-white text-xs">SECRETO</span>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-300">ARQUIVO</div>
                        <div className="text-sm text-gray-300">DESCLASSIFICADO</div>
                      </div>
                    </div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                      <h3 className="text-4xl font-bold text-white mb-2">
                        BLACK FRI<span className="text-red-600">D</span>AY
                      </h3>
                      <div className="flex items-center justify-center gap-4 text-white mt-6">
                        <div className="text-center">
                          <div className="bg-red-600 rounded-lg px-4 py-2 mb-1">
                            <span className="text-2xl font-bold">4d</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="bg-red-600 rounded-lg px-4 py-2 mb-1">
                            <span className="text-2xl font-bold">11h</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="bg-red-600 rounded-lg px-4 py-2 mb-1">
                            <span className="text-2xl font-bold">38m</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-400">ARQUIVO</div>
                        <div className="text-xs text-gray-400">SECRETO</div>
                      </div>
                      <div className="text-xs text-gray-400">DIA 28</div>
                    </div>
                  </div>
                  <div className="aspect-[3/4]"></div>
                </div>
              ) : (
                <EnhancedDealCard deal={deal} onCommentClick={() => handleDealClick(deal.id)} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && !loading && deals.length > 0 && (
        <div className="text-center pt-6">
          <Button variant="outline" size="lg" onClick={handleLoadMore}>
            Carregar mais promoções
          </Button>
        </div>
      )}

      {loading && deals.length > 0 && (
        <div className="flex justify-center pt-6">
          <Loader2 className="h-6 w-6 animate-spin text-[var(--primary)]" />
        </div>
      )}

      {/* No Results */}
      {!loading && deals.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Star className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma promoção encontrada</h3>
          <p className="text-gray-600 mb-4">Tente ajustar os filtros ou buscar por outros termos</p>
          <Button
            variant="outline"
            onClick={() => {
              setActiveQuickFilter("hot")
              setFilters({
                categories: [],
                stores: [],
                priceRange: [0, 5000],
                discount: [0, 100],
                features: [],
                sortBy: "relevance",
              })
            }}
          >
            Limpar filtros
          </Button>
        </div>
      )}
    </div>
  )
}
