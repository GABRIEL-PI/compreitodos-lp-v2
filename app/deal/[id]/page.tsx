"use client"

import { useState, useEffect } from "react"
import { RightSidebar } from "@/components/right-sidebar"
import { CommentSection } from "@/components/comment-section"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, ExternalLink, Flame, Clock, Loader2 } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { fetchProductById, type Product } from "@/lib/api"
import type { Deal } from "@/lib/mock-data"

// Mock comments data
const mockComments = [
  {
    id: "1",
    user: {
      name: "@reniksonalva",
      avatar: "/placeholder.svg",
      level: 6,
    },
    content: "Achei um cupom dessa promo, quem quer?",
    likes: 12,
    isLiked: false,
    createdAt: "Agora mesmo",
    replies: [
      {
        id: "1-1",
        user: {
          name: "@leofabricio",
          avatar: "/placeholder.svg",
          level: 4,
        },
        content: "Encontrei outro mais barato: https://compreitodos.com",
        likes: 3,
        isLiked: false,
        createdAt: "há 3min",
      },
    ],
  },
]

// Helper to convert API Product to Deal interface
// Helper to convert API Product to Deal interface
const mapProductToDeal = (product: Product): Deal => {
  const hasDiscount = product.original_price && product.original_price > product.price
  const discount = hasDiscount
    ? Math.round(((product.original_price! - product.price) / product.original_price!) * 100)
    : 0

  const getStoreInfo = (source: string) => {
    const lowerSource = source.toLowerCase()
    if (lowerSource.includes("mercadolivre") || lowerSource.includes("mercado livre")) {
      return { name: "Mercado Livre", icon: "🤝" }
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

export default function DealPage() {
  const params = useParams()
  const router = useRouter()
  const [showComments, setShowComments] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(13)
  const [deal, setDeal] = useState<Deal | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDeal() {
      if (!params.id) return
      try {
        setLoading(true)
        const id = Array.isArray(params.id) ? params.id[0] : params.id
        const response = await fetchProductById(parseInt(id))
        setDeal(mapProductToDeal(response.data))
      } catch (error) {
        console.error("Failed to fetch deal:", error)
      } finally {
        setLoading(false)
      }
    }
    loadDeal()
  }, [params.id])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" />
      </div>
    )
  }

  if (!deal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Produto não encontrado</h1>
          <Button onClick={() => router.push("/")}>Voltar para a home</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <main className="flex-1 p-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                {/* Left side - Product Image */}
                <div className="space-y-4">
                  <div className="aspect-square relative overflow-hidden bg-gray-100 rounded-lg">
                    <img
                      src={deal.image || "/placeholder.svg?height=400&width=400"}
                      alt={deal.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Status Badges */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      {deal.isHot && (
                        <Badge className="bg-red-500 text-white">
                          <Flame className="h-3 w-3 mr-1" />
                          EM ALTA
                        </Badge>
                      )}
                      {deal.isFree && <Badge className="bg-green-500 text-white">Frete grátis</Badge>}
                      {deal.isExpiring && (
                        <Badge className="bg-orange-500 text-white">
                          <Clock className="h-3 w-3 mr-1" />
                          EXPIRANDO
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right side - Product Details */}
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{deal.title}</h1>
                    {deal.description && <p className="text-gray-600">{deal.description}</p>}
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    {deal.originalPrice > deal.currentPrice && (
                      <p className="text-lg text-gray-500 line-through">{formatPrice(deal.originalPrice)}</p>
                    )}
                    <p className="text-3xl font-bold text-[var(--primary)]">
                      {deal.isFree ? "Grátis" : formatPrice(deal.currentPrice)}
                    </p>
                    {deal.discount > 0 && (
                      <Badge className="bg-[var(--primary)] text-white">
                        -{deal.discount}% de desconto
                      </Badge>
                    )}
                  </div>

                  {/* Store Info */}
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl">{deal.storeIcon}</div>
                    <div>
                      <p className="font-medium">Promoção da loja</p>
                      <p className="text-sm text-gray-600">{deal.store}</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    size="lg"
                    className="w-full bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white"
                    onClick={() => window.open(deal.link, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Pegar promoção
                  </Button>

                  {/* Engagement Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={handleLike}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${isLiked ? "bg-red-50 text-[var(--primary)]" : "hover:bg-gray-50"
                          }`}
                      >
                        <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                        <span>{likeCount}</span>
                      </button>

                      <button
                        onClick={() => setShowComments(!showComments)}
                        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>{deal.comments}</span>
                      </button>

                      <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <Share2 className="h-4 w-4" />
                        <span>Compartilhar</span>
                      </button>
                    </div>

                    <span className="text-sm text-gray-500">{deal.postedAt}</span>
                  </div>

                  {/* Posted by */}
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={deal.postedBy.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-[var(--primary)] text-white">
                        {deal.postedBy.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">Postado por</p>
                      <p className="text-sm text-gray-600">{deal.postedBy.name}</p>
                    </div>
                    <Badge className="bg-[var(--primary)] text-white ml-auto">
                      Nv.{deal.postedBy.level}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              {showComments && (
                <div className="border-t p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Seja o primeiro a comentar</h3>
                  </div>
                  <CommentSection dealId={deal.id} comments={mockComments} />
                </div>
              )}
            </div>
          </div>
        </main>
        <RightSidebar />
      </div>
    </div>
  )
}
