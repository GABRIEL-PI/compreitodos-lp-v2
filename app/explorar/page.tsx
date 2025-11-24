"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share2, Camera, Filter, Grid3X3, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const communityPhotos = [
  {
    id: 1,
    user: {
      name: "Maria Santos",
      avatar: "/diverse-user-avatars.png",
      username: "@maria_santos",
    },
    product: {
      title: "Basike Carregador Sem Fio 3 em 1 Magnético 2025",
      store: "Amazon",
      price: "R$ 152,10",
      originalPrice: "R$ 299,00",
    },
    image: "/wireless-charger-3-in-1.jpg",
    caption: "Chegou hoje! Funciona perfeitamente com iPhone e Apple Watch. Super recomendo! 📱⌚",
    likes: 24,
    comments: 8,
    timeAgo: "2h",
    verified: true,
    tags: ["eletrônicos", "carregador", "apple"],
  },
  {
    id: 2,
    user: {
      name: "João Pedro",
      avatar: "/diverse-user-avatars.png",
      username: "@joao_pedro",
    },
    product: {
      title: "Kit 4 Bermuda Masculina Short Moletom Leve",
      store: "Mercado Livre",
      price: "R$ 69,95",
      originalPrice: "R$ 120,00",
    },
    image: "/men-shorts-kit-4-pieces.jpg",
    caption: "Qualidade surpreendente pelo preço! Tecido macio e tamanho certinho. Já pedi mais! 👕",
    likes: 18,
    comments: 5,
    timeAgo: "4h",
    verified: true,
    tags: ["roupas", "masculino", "bermuda"],
  },
  {
    id: 3,
    user: {
      name: "Fernanda Lima",
      avatar: "/diverse-user-avatars.png",
      username: "@fer_lima",
    },
    product: {
      title: "Aparelho De Jantar Oxford Cerâmica Folk 20 Pç",
      store: "Amazon",
      price: "R$ 150,00",
      originalPrice: "R$ 280,00",
    },
    image: "/ceramic-dinner-set-oxford-folk.jpg",
    caption: "Lindíssimo! Chegou sem nenhuma peça quebrada, muito bem embalado. Mesa ficou um luxo! 🍽️",
    likes: 35,
    comments: 12,
    timeAgo: "6h",
    verified: true,
    tags: ["casa", "jantar", "cerâmica"],
  },
  {
    id: 4,
    user: {
      name: "Ricardo Oliveira",
      avatar: "/diverse-user-avatars.png",
      username: "@ricardo_tech",
    },
    product: {
      title: 'Samsung Vision AI Tv 43" Qled 4k QeT1 2025',
      store: "Amazon",
      price: "R$ 1.529",
      originalPrice: "R$ 2.199",
    },
    image: "/samsung-qled-tv-43-inch.jpg",
    caption: "TV incrível! Imagem 4K perfeita, smart TV rápida. Melhor compra do ano! 📺✨",
    likes: 67,
    comments: 23,
    timeAgo: "8h",
    verified: true,
    tags: ["eletrônicos", "tv", "samsung"],
  },
]

export default function ExplorarPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("todos")

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Explorar</h1>
              <p className="text-muted-foreground">Explore fotos reais postadas pela comunidade 📸</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {["todos", "eletrônicos", "casa", "roupas", "beleza"].map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-purple-600 hover:bg-purple-700" : ""}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
                {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Photos Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div
          className={`grid gap-6 ${
            viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-2xl mx-auto"
          }`}
        >
          {communityPhotos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden">
              {/* User Header */}
              <div className="p-4 pb-2">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={photo.user.avatar || "/placeholder.svg"} alt={photo.user.name} />
                    <AvatarFallback>
                      {photo.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm">{photo.user.name}</h3>
                      {photo.verified && (
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                          ✓
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{photo.timeAgo}</p>
                  </div>
                </div>
              </div>

              {/* Product Image */}
              <div className="aspect-square bg-gray-100 relative">
                <img
                  src={photo.image || "/placeholder.svg"}
                  alt={photo.product.title}
                  className="w-full h-full object-cover"
                />
                {/* Price Badge */}
                <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                  {photo.product.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Product Title */}
                <h4 className="font-medium text-sm mb-2 line-clamp-2">{photo.product.title}</h4>

                {/* Store and Price */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-muted-foreground">{photo.product.store}</span>
                  <div className="text-right">
                    {photo.product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">{photo.product.originalPrice}</span>
                    )}
                  </div>
                </div>

                {/* Caption */}
                <p className="text-sm text-foreground mb-3 leading-relaxed">{photo.caption}</p>

                {/* Tags */}
                <div className="flex gap-1 mb-3 flex-wrap">
                  {photo.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-red-600 p-0">
                      <Heart className="w-4 h-4" />
                      <span className="text-xs">{photo.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-blue-600 p-0">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-xs">{photo.comments}</span>
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-green-600 p-0">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-8">
          <Button variant="outline" className="gap-2 bg-transparent">
            Ver mais fotos da comunidade
            <Camera className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
