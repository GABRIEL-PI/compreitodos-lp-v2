"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Grid3X3,
  List,
  Zap,
  Home,
  Smartphone,
  Tv,
  Sofa,
  ShoppingBag,
  Star,
  TrendingUp,
  Gift,
  ChevronRight,
} from "lucide-react"
export interface Category {
  id: string
  name: string
  icon: any
  count: number
  subcategories?: Category[]
  image?: string
  description?: string
}



interface CategoryBrowserProps {
  categories: Category[]
  onCategorySelect: (categoryId: string) => void
  selectedCategory?: string
}

export function CategoryBrowser({ categories, onCategorySelect, selectedCategory }: CategoryBrowserProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.subcategories?.some((sub) => sub.name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const toggleExpanded = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Categorias</h2>
          <p className="text-sm text-gray-600">Explore produtos por categoria</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-[var(--color-pechinchou-red)]" : ""}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-[var(--color-pechinchou-red)]" : ""}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Buscar categoria..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Categories */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map((category) => (
            <Card
              key={category.id}
              className={`cursor-pointer hover:shadow-lg transition-all duration-200 ${selectedCategory === category.id ? "ring-2 ring-[var(--color-pechinchou-red)]" : ""
                }`}
              onClick={() => onCategorySelect(category.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <category.icon className="h-6 w-6 text-[var(--color-pechinchou-red)]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{category.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {category.count} produtos
                    </Badge>
                  </div>
                </div>
                {category.description && <p className="text-sm text-gray-600 mb-3">{category.description}</p>}
                {category.subcategories && (
                  <div className="space-y-1">
                    {category.subcategories.slice(0, 3).map((sub) => (
                      <div key={sub.id} className="flex items-center justify-between text-xs text-gray-500">
                        <span>{sub.name}</span>
                        <span>{sub.count}</span>
                      </div>
                    ))}
                    {category.subcategories.length > 3 && (
                      <div className="text-xs text-[var(--color-pechinchou-red)] font-medium">
                        +{category.subcategories.length - 3} mais
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredCategories.map((category) => (
            <Card key={category.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div
                  className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 ${selectedCategory === category.id ? "bg-red-50 border-l-4 border-[var(--color-pechinchou-red)]" : ""
                    }`}
                  onClick={() => onCategorySelect(category.id)}
                >
                  <div className="flex items-center space-x-3">
                    <category.icon className="h-5 w-5 text-[var(--color-pechinchou-red)]" />
                    <div>
                      <h3 className="font-medium text-gray-900">{category.name}</h3>
                      {category.description && <p className="text-sm text-gray-600">{category.description}</p>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{category.count} produtos</Badge>
                    {category.subcategories && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleExpanded(category.id)
                        }}
                        className="p-1"
                      >
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${expandedCategory === category.id ? "rotate-90" : ""
                            }`}
                        />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Subcategories */}
                {category.subcategories && expandedCategory === category.id && (
                  <div className="border-t bg-gray-50 p-4">
                    <div className="grid grid-cols-2 gap-2">
                      {category.subcategories.map((sub) => (
                        <div
                          key={sub.id}
                          className="flex items-center justify-between p-2 rounded hover:bg-white cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                            onCategorySelect(sub.id)
                          }}
                        >
                          <span className="text-sm text-gray-700">{sub.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {sub.count}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredCategories.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Search className="h-12 w-12 mx-auto mb-2 text-gray-300" />
          <p>Nenhuma categoria encontrada</p>
        </div>
      )}
    </div>
  )
}
