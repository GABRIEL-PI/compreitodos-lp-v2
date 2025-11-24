"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Filter,
  Star,
  Flame,
  Gift,
  Clock,
  TrendingUp,
  ShoppingBag,
  Zap,
  Home,
  Smartphone,
  Tv,
  Sofa,
} from "lucide-react"

interface FilterState {
  categories: string[]
  stores: string[]
  priceRange: [number, number]
  discount: [number, number]
  features: string[]
  sortBy: string
}

interface AdvancedFiltersProps {
  onFiltersChange: (filters: FilterState) => void
  dealCount: number
}

const categories = [
  { id: "eletronicos", name: "Eletrônicos", icon: Zap, count: 189 },
  { id: "eletrodomesticos", name: "Eletrodomésticos", icon: Home, count: 245 },
  { id: "telefonia", name: "Telefonia", icon: Smartphone, count: 98 },
  { id: "televisao", name: "Televisão", icon: Tv, count: 76 },
  { id: "moveis", name: "Móveis e Decoração", icon: Sofa, count: 65 },
  { id: "utilidades", name: "Utilidades Domésticas", icon: Home, count: 156 },
  { id: "cama-mesa-banho", name: "Cama, Mesa e Banho", icon: Home, count: 87 },
  { id: "moda", name: "Moda e Acessórios", icon: ShoppingBag, count: 134 },
  { id: "beleza", name: "Beleza e Cuidados", icon: Star, count: 92 },
  { id: "esportes", name: "Esportes e Lazer", icon: TrendingUp, count: 78 },
  { id: "livros", name: "Livros e Mídia", icon: Star, count: 45 },
  { id: "brinquedos", name: "Brinquedos", icon: Gift, count: 67 },
]

const stores = [
  { id: "amazon", name: "Amazon", count: 156 },
  { id: "mercado-livre", name: "Mercado Livre", count: 234 },
  { id: "magazine-luiza", name: "Magazine Luiza", count: 189 },
  { id: "americanas", name: "Americanas", count: 167 },
  { id: "casas-bahia", name: "Casas Bahia", count: 145 },
  { id: "extra", name: "Extra", count: 123 },
  { id: "submarino", name: "Submarino", count: 98 },
  { id: "kabum", name: "KaBuM!", count: 87 },
  { id: "netshoes", name: "Netshoes", count: 76 },
  { id: "zara", name: "Zara", count: 54 },
]

const features = [
  { id: "free", name: "Grátis", icon: Gift },
  { id: "hot", name: "Em Alta", icon: Flame },
  { id: "expiring", name: "Expirando", icon: Clock },
  { id: "free-shipping", name: "Frete Grátis", icon: ShoppingBag },
  { id: "cashback", name: "Cashback", icon: Star },
  { id: "coupon", name: "Com Cupom", icon: TrendingUp },
]

const sortOptions = [
  { id: "relevance", name: "Relevância" },
  { id: "newest", name: "Mais Recentes" },
  { id: "oldest", name: "Mais Antigos" },
  { id: "price-low", name: "Menor Preço" },
  { id: "price-high", name: "Maior Preço" },
  { id: "discount-high", name: "Maior Desconto" },
  { id: "most-liked", name: "Mais Curtidos" },
  { id: "most-commented", name: "Mais Comentados" },
]

export function AdvancedFilters({ onFiltersChange, dealCount }: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    stores: [],
    priceRange: [0, 5000],
    discount: [0, 100],
    features: [],
    sortBy: "relevance",
  })

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFiltersChange(updated)
  }

  const toggleCategory = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter((id) => id !== categoryId)
      : [...filters.categories, categoryId]
    updateFilters({ categories: newCategories })
  }

  const toggleStore = (storeId: string) => {
    const newStores = filters.stores.includes(storeId)
      ? filters.stores.filter((id) => id !== storeId)
      : [...filters.stores, storeId]
    updateFilters({ stores: newStores })
  }

  const toggleFeature = (featureId: string) => {
    const newFeatures = filters.features.includes(featureId)
      ? filters.features.filter((id) => id !== featureId)
      : [...filters.features, featureId]
    updateFilters({ features: newFeatures })
  }

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      categories: [],
      stores: [],
      priceRange: [0, 5000],
      discount: [0, 100],
      features: [],
      sortBy: "relevance",
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const activeFiltersCount =
    filters.categories.length +
    filters.stores.length +
    filters.features.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000 ? 1 : 0) +
    (filters.discount[0] > 0 || filters.discount[1] < 100 ? 1 : 0)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative bg-transparent">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
          {activeFiltersCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-[var(--color-pechinchou-red)] text-white text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-80 sm:w-96">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filtros</span>
            </SheetTitle>
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-[var(--color-pechinchou-red)] hover:text-[var(--color-pechinchou-red)]/80"
              >
                Limpar todos
              </Button>
            )}
          </div>
          <p className="text-sm text-gray-600">{dealCount} promoções encontradas</p>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-4">
          <div className="space-y-6">
            {/* Sort Options */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Ordenar por</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {sortOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={filters.sortBy === option.id}
                      onCheckedChange={() => updateFilters({ sortBy: option.id })}
                    />
                    <Label htmlFor={option.id} className="text-sm font-normal">
                      {option.name}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Categorias</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={category.id}
                        checked={filters.categories.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                      />
                      <Label htmlFor={category.id} className="text-sm font-normal flex items-center space-x-2">
                        <category.icon className="h-3 w-3" />
                        <span>{category.name}</span>
                      </Label>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Stores */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Lojas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {stores.map((store) => (
                  <div key={store.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={store.id}
                        checked={filters.stores.includes(store.id)}
                        onCheckedChange={() => toggleStore(store.id)}
                      />
                      <Label htmlFor={store.id} className="text-sm font-normal">
                        {store.name}
                      </Label>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {store.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Price Range */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Faixa de Preço</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
                    max={5000}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>R$ {filters.priceRange[0]}</span>
                    <span>R$ {filters.priceRange[1]}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="min-price" className="text-xs">
                      Mínimo
                    </Label>
                    <Input
                      id="min-price"
                      type="number"
                      value={filters.priceRange[0]}
                      onChange={(e) =>
                        updateFilters({
                          priceRange: [Number(e.target.value), filters.priceRange[1]],
                        })
                      }
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="max-price" className="text-xs">
                      Máximo
                    </Label>
                    <Input
                      id="max-price"
                      type="number"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        updateFilters({
                          priceRange: [filters.priceRange[0], Number(e.target.value)],
                        })
                      }
                      className="h-8"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Discount Range */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Desconto (%)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Slider
                    value={filters.discount}
                    onValueChange={(value) => updateFilters({ discount: value as [number, number] })}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{filters.discount[0]}%</span>
                    <span>{filters.discount[1]}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Características</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {features.map((feature) => (
                  <div key={feature.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature.id}
                      checked={filters.features.includes(feature.id)}
                      onCheckedChange={() => toggleFeature(feature.id)}
                    />
                    <Label htmlFor={feature.id} className="text-sm font-normal flex items-center space-x-2">
                      <feature.icon className="h-3 w-3" />
                      <span>{feature.name}</span>
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        {/* Apply Button */}
        <div className="border-t pt-4 mt-4">
          <Button
            className="w-full bg-[var(--color-pechinchou-red)] hover:bg-[var(--color-pechinchou-red)]/90"
            onClick={() => setIsOpen(false)}
          >
            Aplicar Filtros ({dealCount} resultados)
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
