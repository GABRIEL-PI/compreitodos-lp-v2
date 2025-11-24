"use client"

import { useState } from "react"
import { Copy, ExternalLink, Clock, Tag, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const coupons = [
  {
    id: 1,
    store: {
      name: "Amazon",
      logo: "/generic-online-marketplace-logo.png",
    },
    title: "FRETE GRÁTIS",
    description: "Frete grátis em compras acima de R$ 79",
    code: "FRETEGRATIS",
    discount: "Frete Grátis",
    expiresAt: "31/12/2024",
    category: "frete",
    isActive: true,
    usedCount: 1250,
  },
  {
    id: 2,
    store: {
      name: "Mercado Livre",
      logo: "/generic-online-marketplace-logo.png",
    },
    title: "10% OFF",
    description: "10% de desconto em eletrônicos",
    code: "ELETRO10",
    discount: "10%",
    expiresAt: "15/01/2025",
    category: "desconto",
    isActive: true,
    usedCount: 890,
  },
  {
    id: 3,
    store: {
      name: "Magazine Luiza",
      logo: "/generic-online-marketplace-logo.png",
    },
    title: "R$ 50 OFF",
    description: "R$ 50 de desconto em compras acima de R$ 300",
    code: "MAGALU50",
    discount: "R$ 50",
    expiresAt: "20/01/2025",
    category: "desconto",
    isActive: true,
    usedCount: 567,
  },
  {
    id: 4,
    store: {
      name: "Casas Bahia",
      logo: "/generic-online-marketplace-logo.png",
    },
    title: "PRIMEIRA COMPRA",
    description: "15% de desconto na primeira compra",
    code: "BEMVINDO15",
    discount: "15%",
    expiresAt: "28/01/2025",
    category: "primeiro-pedido",
    isActive: true,
    usedCount: 234,
  },
]

export default function CuponsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch =
      coupon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "todos" || coupon.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Tag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Cupons de Desconto</h1>
              <p className="text-muted-foreground">Encontre cupons e códigos promocionais das maiores lojas</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar cupons por loja ou categoria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              Filtros
            </Button>
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 flex-wrap">
            {["todos", "desconto", "frete", "primeiro-pedido", "cashback"].map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {category === "todos" && "Todos"}
                {category === "desconto" && "Desconto"}
                {category === "frete" && "Frete Grátis"}
                {category === "primeiro-pedido" && "Primeira Compra"}
                {category === "cashback" && "Cashback"}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Coupons Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCoupons.map((coupon) => (
            <Card key={coupon.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Store Header */}
              <div className="p-4 pb-2 border-b bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded border flex items-center justify-center">
                    <img
                      src={coupon.store.logo || "/placeholder.svg"}
                      alt={coupon.store.name}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{coupon.store.name}</h3>
                    <p className="text-xs text-muted-foreground">{coupon.usedCount} pessoas usaram</p>
                  </div>
                </div>
              </div>

              {/* Coupon Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-green-600 mb-1">{coupon.discount} OFF</h4>
                    <h5 className="font-semibold text-foreground mb-2">{coupon.title}</h5>
                    <p className="text-sm text-muted-foreground mb-3">{coupon.description}</p>
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground mb-1">Código do cupom:</p>
                      <p className="font-mono font-bold text-lg tracking-wider">{coupon.code}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleCopyCode(coupon.code)}
                      className={`gap-2 ${
                        copiedCode === coupon.code ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      <Copy className="w-4 h-4" />
                      {copiedCode === coupon.code ? "Copiado!" : "Copiar"}
                    </Button>
                  </div>
                </div>

                {/* Expiration and Action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    Válido até {coupon.expiresAt}
                  </div>
                  <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                    <ExternalLink className="w-3 h-3" />
                    Usar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCoupons.length === 0 && (
          <div className="text-center py-12">
            <Tag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum cupom encontrado</h3>
            <p className="text-muted-foreground">Tente ajustar os filtros ou buscar por outros termos</p>
          </div>
        )}
      </div>
    </div>
  )
}
