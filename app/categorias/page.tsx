"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { RightSidebar } from "@/components/right-sidebar"
import { CategoryBrowser } from "@/components/category-browser"
import { EnhancedDealCard } from "@/components/enhanced-deal-card"
import { mockDeals } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CategoriasPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const router = useRouter()

  // Filter deals by selected category
  const categoryDeals = selectedCategory
    ? mockDeals.filter(
        (deal) => deal.category.toLowerCase().includes(selectedCategory.toLowerCase()) || deal.id === selectedCategory,
      )
    : []

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  const handleDealClick = (dealId: string) => {
    router.push(`/deal/${dealId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4">
          <div className="max-w-6xl mx-auto">
            {!selectedCategory ? (
              <CategoryBrowser onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
            ) : (
              <div className="space-y-6">
                {/* Back Button */}
                <Button
                  variant="ghost"
                  onClick={() => setSelectedCategory("")}
                  className="hover:text-[var(--color-pechinchou-red)]"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar para categorias
                </Button>

                {/* Category Header */}
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Promoções em {selectedCategory}</h1>
                  <p className="text-gray-600">{categoryDeals.length} promoções encontradas</p>
                </div>

                {/* Deals Grid */}
                {categoryDeals.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryDeals.map((deal) => (
                      <div key={deal.id} onClick={() => handleDealClick(deal.id)}>
                        <EnhancedDealCard deal={deal} onCommentClick={() => handleDealClick(deal.id)} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma promoção encontrada</h3>
                    <p className="text-gray-600 mb-4">Não há promoções disponíveis nesta categoria no momento.</p>
                    <Button variant="outline" onClick={() => setSelectedCategory("")}>
                      Explorar outras categorias
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
        <RightSidebar />
      </div>
    </div>
  )
}
