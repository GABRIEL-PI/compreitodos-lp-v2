"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Clock } from "lucide-react"
import type { Deal } from "@/lib/mock-data"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

interface EnhancedDealCardProps {
  deal: Deal
  onCommentClick?: () => void
  showActions?: boolean
}

export function EnhancedDealCard({ deal, onCommentClick, showActions = true }: EnhancedDealCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(deal.likes)
  const [isSaved, setIsSaved] = useState(false)

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))

    if (!isLiked) {
      toast({
        title: "Curtida adicionada!",
        description: "Você curtiu esta promoção.",
      })
    }
  }

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsSaved(!isSaved)
    toast({
      title: isSaved ? "Removido dos salvos" : "Salvo com sucesso!",
      description: isSaved
        ? "A promoção foi removida da sua lista de salvos."
        : "Você pode encontrar esta promoção na sua lista de salvos.",
    })
  }

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (navigator.share) {
      try {
        await navigator.share({
          title: deal.title,
          text: `Confira esta promoção: ${deal.title}`,
          url: window.location.href,
        })
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      await navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copiado!",
        description: "O link da promoção foi copiado para a área de transferência.",
      })
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-200 cursor-pointer group bg-white border-gray-200">
      <div className="relative">
        <div className="aspect-square relative overflow-hidden bg-gray-100">
          <img
            src={deal.image || "/placeholder.svg?height=300&width=300"}
            alt={deal.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />

          <div className="absolute top-1.5 left-1.5">
            <div className="flex items-center gap-1 bg-white/95 rounded px-1.5 py-0.5">
              <div className="w-3 h-3 rounded-full bg-gray-200 flex items-center justify-center text-[10px]">
                {deal.storeIcon}
              </div>
              <span className="text-[10px] font-medium text-gray-900">{deal.store}</span>
              {deal.isVerified && (
                <svg className="w-2.5 h-2.5 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              )}
            </div>
          </div>

          <div className="absolute top-1.5 right-1.5">
            <div className="flex items-center gap-0.5 bg-gray-900/80 rounded px-1.5 py-0.5">
              <Clock className="w-2.5 h-2.5 text-gray-300" />
              <span className="text-[10px] text-gray-300">{deal.postedAt}</span>
            </div>
          </div>

          <div className="absolute bottom-1.5 right-1.5 flex flex-col gap-1">
            {deal.isFree && (
              <Badge className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0">Frete grátis</Badge>
            )}
            {deal.isPrime && (
              <Badge className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0">PRIME150</Badge>
            )}
          </div>
        </div>
      </div>

      <CardContent className="p-2.5">
        <div className="space-y-1.5">
          <h3 className="font-medium text-xs line-clamp-2 leading-tight text-gray-900">{deal.title}</h3>

          {!deal.isFree ? (
            <div className="space-y-0.5">
              {deal.originalPrice > deal.currentPrice && (
                <p className="text-[10px] text-gray-500 line-through">{formatPrice(deal.originalPrice)}</p>
              )}
              <div className="flex items-baseline gap-1.5">
                <p className="text-xl font-bold text-red-600">{formatPrice(deal.currentPrice)}</p>
                {deal.discount > 0 && <span className="text-[10px] text-gray-500">-{deal.discount}%</span>}
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xl font-bold text-green-500">Grátis</p>
              {deal.originalPrice > 0 && (
                <p className="text-[10px] text-gray-500 line-through">{formatPrice(deal.originalPrice)}</p>
              )}
            </div>
          )}

          {showActions && (
            <div className="flex items-center justify-between pt-1.5 border-t border-gray-200">
              <div className="flex items-center space-x-3 text-sm text-gray-500">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-0.5 hover:text-red-500 transition-colors ${
                    isLiked ? "text-red-500" : ""
                  }`}
                >
                  <Heart className={`h-3.5 w-3.5 ${isLiked ? "fill-current" : ""}`} />
                  <span className="text-[10px]">{likeCount}</span>
                </button>

                <button
                  onClick={onCommentClick}
                  className="flex items-center space-x-0.5 hover:text-gray-900 transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span className="text-[10px]">{deal.comments}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
