"use client"

import { useState, useEffect } from "react"
import { RightSidebar } from "@/components/right-sidebar"
import { CommentSection } from "@/components/comment-section"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, ExternalLink, Flame, Clock, Loader2, LayoutGrid, ChevronRight, QrCode } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { fetchProductById, fetchProducts, fetchCategories, type Product, type Category } from "@/lib/api"
import { addToRecentlyViewed } from "@/lib/recent-views"
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
    coupon: product.coupon,
    realImages: product.real_images,
  }
}

export default function DealPage() {
  const params = useParams()
  const router = useRouter()
  const [showComments, setShowComments] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(13)
  const [deal, setDeal] = useState<Deal | null>(null)
  const [relatedDeals, setRelatedDeals] = useState<Deal[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDeal() {
      if (!params.id) return
      try {
        setLoading(true)
        const id = Array.isArray(params.id) ? params.id[0] : params.id
        const response = await fetchProductById(parseInt(id))
        const dealData = mapProductToDeal(response.data)
        setDeal(dealData)
        addToRecentlyViewed(dealData)

        // Fetch related products
        try {
          const relatedResponse = await fetchProducts(1, 6, dealData.category)
          setRelatedDeals(relatedResponse.data.data.map(mapProductToDeal).filter(d => d.id !== dealData.id))
        } catch (err) {
          console.error("Failed to fetch related products", err)
        }

        // Fetch categories
        try {
          const categoriesResponse = await fetchCategories()
          setCategories(categoriesResponse.data.data)
        } catch (err) {
          console.error("Failed to fetch categories", err)
        }

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
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="container mx-auto pt-6 px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-6">

            {/* Top Section: Product & Comments */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Product Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                    <Flame className="h-3 w-3 mr-1 text-red-500" />
                    MENOR PREÇO
                  </Badge>
                </div>

                <div className="flex-1 flex items-center justify-center mb-6 relative group">
                  <div className="aspect-square w-full max-w-[300px] relative">
                    <img
                      src={deal.image || "/placeholder.svg"}
                      alt={deal.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* Warning Banner */}
                  <div className="absolute bottom-0 left-0 right-0 bg-orange-50 text-orange-700 text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-2 border border-orange-100">
                    <span className="font-bold">⚠️</span>
                    Promoção {deal.store.toUpperCase()}
                  </div>
                </div>

                <div className="space-y-4">
                  <h1 className="text-xl font-bold text-gray-900 leading-tight">
                    {deal.title}
                  </h1>

                  <div className="flex items-end gap-3 flex-wrap">
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold text-red-600">{formatPrice(deal.currentPrice)}</span>
                      {deal.originalPrice > deal.currentPrice && (
                        <span className="text-sm text-gray-400 line-through">{formatPrice(deal.originalPrice)}</span>
                      )}
                    </div>

                    <div className="ml-auto flex flex-col items-end gap-2">
                      {/* Coupon Box */}
                      {deal.coupon && (
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-1.5 pr-3">
                          <div className="bg-gray-200 text-xs font-bold px-2 py-1 rounded text-gray-600">
                            Cupom disponível
                          </div>
                          <span className="text-sm font-medium text-gray-900">{deal.coupon}</span>
                          <Share2 className="h-3 w-3 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-medium">Loja:</span>
                      <span className="flex items-center gap-1 font-bold text-gray-900">
                        {deal.storeIcon} {deal.store}
                      </span>
                    </div>
                    <Button
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full h-12"
                      onClick={() => window.open(deal.link, "_blank")}
                    >
                      Pegar promoção <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    {/* <Button variant="outline" size="sm" className="rounded-full gap-2 text-gray-600">
                        <span className="font-bold">⚠️</span> Reportar
                      </Button> */}
                    <div className="flex items-center gap-2 ml-auto">
                      <Button variant="ghost" size="icon" className="text-green-500 hover:text-green-600 hover:bg-green-50 rounded-full">
                        <MessageCircle className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 rounded-full">
                        <Share2 className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 rounded-full" onClick={handleLike}>
                        <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                      </Button>
                      <span className="text-sm text-gray-500 font-medium">{likeCount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>Ordenar por: <strong>Mais recentes</strong></span>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 custom-scrollbar">
                  {/* Mock Comment */}
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>LF</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-gray-50 rounded-2xl rounded-tl-none p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-gray-900">@leofabricio</span>
                        <span className="text-xs text-gray-400">1h</span>
                      </div>
                      <div className="text-sm text-gray-700">
                        ⚠️ Promoção {deal.store.toUpperCase()}
                      </div>
                      <button className="text-xs text-gray-500 font-medium mt-2 hover:text-gray-700">Responder</button>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="relative">
                    <Avatar className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8">
                      <AvatarFallback className="bg-purple-600 text-white">P</AvatarFallback>
                    </Avatar>
                    <input
                      type="text"
                      placeholder="O que achou da promo?"
                      className="w-full bg-gray-50 border-none rounded-full py-3 pl-14 pr-12 text-sm focus:ring-1 focus:ring-gray-200"
                    />
                    <Button size="icon" variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400">
                      <Share2 className="h-4 w-4 rotate-45" />
                    </Button>
                  </div>
                  <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide">
                    {["Entendedores?", "Não consegui comprar", "Excelente preço"].map(tag => (
                      <Badge key={tag} variant="secondary" className="whitespace-nowrap bg-orange-50 text-orange-800 hover:bg-orange-100 cursor-pointer border-none">
                        🤔 {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Price History */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-green-500">📉</span> Menor Preço nos últimos 90 dias!
              </h3>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-xs text-gray-400">Baixou para:</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-gray-900">{formatPrice(deal.currentPrice)}</span>
                <div className="flex-1 mx-8 border border-gray-100 rounded-lg p-4 flex items-center gap-4 bg-gray-50">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm mb-1">Pechinchouuu! Menor preço hoje</h4>
                    <p className="text-xs text-gray-500">De acordo com os preços nos últimos 90 dias, consideramos <strong className="text-gray-900">{formatPrice(deal.currentPrice)}</strong> uma excelente compra!</p>
                  </div>
                </div>
              </div>
              <div className="h-1.5 w-full bg-gradient-to-r from-green-500 via-blue-500 to-orange-500 rounded-full relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-green-500 rounded-full shadow"></div>
              </div>
            </div>

            {/* Details & Info */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <Avatar>
                  <AvatarImage src={deal.postedBy.avatar} />
                  <AvatarFallback>{deal.postedBy.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-gray-500">Postado por</p>
                  <p className="text-sm font-bold text-gray-900 flex items-center gap-1">
                    {deal.postedBy.name} <Badge variant="secondary" className="h-4 px-1 text-[10px] bg-green-100 text-green-700">Verificada</Badge>
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-gray-600">
                {deal.coupon && (
                  <div className="flex items-center gap-2">
                    <span className="text-pink-500">🎟️</span> Cupom: <span className="font-medium text-gray-900">{deal.coupon}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-yellow-600">💰</span> Forma de pagamento: <span className="font-medium text-gray-900">Pix</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">📦</span> Frete Grátis todo o Brasil
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">⚠️</span> Promoção {deal.store.toUpperCase()}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">⭐</span> Avaliação do produto na loja: 4.8 de 5.
                </div>
              </div>

              {deal.realImages && deal.realImages.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    📷 Foto real do produto:
                  </h4>
                  <div className="rounded-xl overflow-hidden h-48 w-full relative">
                    <img src={deal.realImages[0]} className="w-full h-full object-cover" alt="Real photo" />
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-center">
                <Button variant="outline" className="rounded-full">
                  ver mais <ChevronRight className="h-4 w-4 rotate-90 ml-1" />
                </Button>
              </div>
            </div>

            {/* Removed Breadcrumb from here */}

          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 shrink-0 space-y-6">

            {/* WhatsApp Widget */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-2">Gostou dessa promoção?</h3>
              <p className="text-xs text-gray-500 mb-4">Não fique de fora! Entre agora no WhatsApp do Pechinchou.</p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">1</div>
                  <div className="flex-1 text-xs text-gray-700 font-medium">Acesse o link do grupo 📱</div>
                  {/* <QrCode className="h-8 w-8 text-gray-800" /> Removed QR Code */}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">2</div>
                  <div className="flex-1 text-xs text-gray-700 font-medium">Pronto! Já está no grupo 💚</div>
                </div>
              </div>

              <Button
                className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full gap-2"
                onClick={() => window.open("https://chat.whatsapp.com/CLc8JVvk7KT838cWRQHeJF", "_blank")}
              >
                <MessageCircle className="h-4 w-4" /> Entrar agora
              </Button>
            </div>

            {/* Price Alert */}
            <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                <img src={deal.image} className="w-8 h-8 object-contain mix-blend-multiply" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1">
                  <span className="text-red-500">🔔</span> Avisa quando baixar
                </h4>
                <p className="text-[10px] text-gray-500 leading-tight">Quando produtos como esse estiver mais barato!</p>
              </div>
            </div>
            <Button variant="secondary" className="w-full rounded-full bg-red-50 text-red-600 hover:bg-red-100 font-bold text-xs h-8">
              🔔 Ativar alerta
            </Button>

            {/* Sticky Price Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <div className="text-center mb-4">
                <span className="text-3xl font-black text-blue-600 block">{formatPrice(deal.currentPrice)}</span>
              </div>

              {deal.coupon && (
                <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between mb-4 border border-dashed border-gray-300">
                  <span className="text-xs font-bold text-gray-700">{deal.coupon}</span>
                  <Share2 className="h-3 w-3 text-red-500" />
                </div>
              )}

              <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold rounded-full h-10 gap-2 mb-4">
                Pegar promoção <ExternalLink className="h-3 w-3" />
              </Button>

              <div className="flex justify-center gap-4">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <MessageCircle className="h-3 w-3" /> 0
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Heart className="h-3 w-3" /> {likeCount}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Share2 className="h-3 w-3" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Categories Section */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
            <LayoutGrid className="h-4 w-4" />
            <span className="font-bold text-gray-900">Categoria</span>
            <ChevronRight className="h-3 w-3" />
            <span className="font-bold text-gray-900">{deal.category}</span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                className="rounded-lg bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 whitespace-nowrap h-12 px-4 gap-2"
                onClick={() => router.push(`/categorias/${category.slug}`)}
              >
                {/* We could add icons here if available in the category object */}
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Explore + Promos */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            🚀 Explore + Promos <span className="text-xs font-normal text-gray-400">produtos relacionados</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {relatedDeals.map(related => (
              <div key={related.id} className="space-y-2 cursor-pointer" onClick={() => router.push(`/deal/${related.id}`)}>
                <div className="aspect-square bg-gray-100 rounded-xl relative overflow-hidden">
                  <img src={related.image || "/placeholder.svg"} className="w-full h-full object-cover" alt={related.title} />
                  {related.likes > 0 && (
                    <Badge className="absolute top-2 right-2 bg-white text-gray-900 shadow-sm text-[10px] h-5 px-1">
                      ❤️ {related.likes}
                    </Badge>
                  )}
                </div>
                <p className="text-xs font-medium text-gray-700 line-clamp-2">{related.title}</p>
                <p className="text-sm font-bold text-gray-900">{formatPrice(related.currentPrice)}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
