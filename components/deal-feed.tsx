"use client"

import { EnhancedDealCard } from "./enhanced-deal-card"
import { AdvancedFilters } from "./advanced-filters"
import { Button } from "@/components/ui/button"
import { Flame, Clock, Star, TrendingUp, Grid3X3, List, Loader2, Search, RefreshCw } from "lucide-react"
import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { fetchProducts, type Product } from "@/lib/api"
import { Input } from "@/components/ui/input"
import { useInView } from "react-intersection-observer"
import type { Deal } from "@/lib/mock-data"

const quickFilters = [
  { id: "hot", label: "Destaques", icon: Star },
  { id: "recent", label: "Recentes", icon: Clock },
  { id: "price_asc", label: "Menor Preço", icon: TrendingUp },
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
// Helper to convert API Product to Deal interface expected by components
const mapProductToDeal = (product: Product): Deal => {
  const hasDiscount = product.original_price && product.original_price > product.price
  const discount = hasDiscount
    ? Math.round(((product.original_price! - product.price) / product.original_price!) * 100)
    : 0

  const getStoreInfo = (source: string) => {
    const lowerSource = source.toLowerCase()
    if (lowerSource.includes("mercadolivre") || lowerSource.includes("mercado livre")) {
      return { name: "Mercado Livre", icon: "🤝" } // Using a handshake or generic icon as placeholder, or specific if available
    }
    if (lowerSource.includes("amazon")) {
      return { name: "Amazon", icon: "📦" }
    }
    if (lowerSource.includes("shopee")) {
      return { name: "Shopee", icon: "🛍️" }
    }
    if (lowerSource.includes("magalu") || lowerSource.includes("magazine")) {
      return { name: "Magalu", icon: "🏬" }
    }
    return { name: source, icon: "🛍️" }
  }

  const storeInfo = getStoreInfo(product.source)

  return {
    id: product.id.toString(),
    title: product.title,
    description: product.description || "",
    originalPrice: hasDiscount ? product.original_price! : 0,
    currentPrice: product.price,
    discount: discount,
    store: storeInfo.name,
    storeIcon: storeInfo.icon,
    image: product.image_url,
    category: product.category,
    likes: 0,
    comments: 0,
    views: 0,
    isHot: discount > 40,
    isFree: product.price === 0,
    isExpiring: false,
    postedBy: {
      name: "Admin",
      avatar: "/placeholder.svg",
      level: 1,
    },
    postedAt: new Date(product.created_at).toLocaleDateString(),
    link: product.affiliate_url,
  }
}

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
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get("search") || ""
  const [hasNewDeals, setHasNewDeals] = useState(false)
  const { ref, inView } = useInView()
  const router = useRouter()

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1)
      loadDeals(1, true)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

  // New products timer
  useEffect(() => {
    const timer = setInterval(() => {
      // In a real app, we would check the API here
      // For now, just show the notification occasionally
      if (Math.random() > 0.7) {
        setHasNewDeals(true)
      }
    }, 180000) // 3 minutes

    return () => clearInterval(timer)
  }, [])

  // Infinite scroll
  useEffect(() => {
    if (inView && hasMore && !loading) {
      handleLoadMore()
    }
  }, [inView, hasMore, loading])

  const loadDeals = useCallback(async (pageNum: number, isNewFilter = false) => {
    try {
      setLoading(true)
      // Use the first category from filters if available
      const categoryFilter = filters.categories.length > 0 ? filters.categories[0] : undefined
      const response = await fetchProducts(pageNum, 12, categoryFilter, searchTerm, activeQuickFilter)

      const newDeals = response.data.data.map(mapProductToDeal)

      setDeals(prev => {
        const currentDeals = isNewFilter ? [] : prev
        // Deduplication logic
        const existingIds = new Set(currentDeals.map(d => d.id))
        const uniqueNewDeals = newDeals.filter(d => !existingIds.has(d.id))
        return [...currentDeals, ...uniqueNewDeals]
      })
      setHasMore(newDeals.length === 12) // Assuming limit is 12
    } catch (error) {
      console.error("Failed to fetch deals:", error)
    } finally {
      setLoading(false)
    }
  }, [filters.categories, searchTerm, activeQuickFilter]) // Add dependency on filters.categories, searchTerm and activeQuickFilter

  const handleRefresh = () => {
    setHasNewDeals(false)
    setPage(1)
    loadDeals(1, true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 flex-1">
            {/* Search Input - Removed as it's now in Header */}
            {/* <div className="relative min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Buscar promoções..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
            </div> */}
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
                {/* {option.badge && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] px-1 rounded">
                    {option.badge}
                  </span>
                )} */}
              </Button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            {/* <AdvancedFilters onFiltersChange={handleFiltersChange} dealCount={deals.length} />

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
            </div> */}
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
              <EnhancedDealCard deal={deal} onCommentClick={() => handleDealClick(deal.id)} />
            </div>
          ))}
        </div>
      )}

      {/* New Deals Notification */}
      {hasNewDeals && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40">
          <Button
            onClick={handleRefresh}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg rounded-full px-6 animate-bounce"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Novos produtos disponíveis
          </Button>
        </div>
      )}

      {/* Infinite Scroll Sentinel */}
      <div ref={ref} className="h-10 w-full flex justify-center items-center">
        {loading && hasMore && <Loader2 className="h-6 w-6 animate-spin text-[var(--primary)]" />}
      </div>

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
