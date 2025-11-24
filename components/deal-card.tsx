"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Eye, ExternalLink, Flame, Clock } from "lucide-react"
import type { Deal } from "@/lib/mock-data"
import { useState } from "react"

interface DealCardProps {
  deal: Deal
}

export function DealCard({ deal }: DealCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(deal.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        {/* Deal Image */}
        <div className="aspect-video relative overflow-hidden bg-gray-100">
          <img src={deal.image || "/placeholder.svg"} alt={deal.title} className="w-full h-full object-cover" />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {deal.isHot && (
              <Badge className="bg-red-500 text-white">
                <Flame className="h-3 w-3 mr-1" />
                EM ALTA
              </Badge>
            )}
            {deal.isFree && <Badge className="bg-green-500 text-white">Grátis</Badge>}
            {deal.isExpiring && (
              <Badge className="bg-orange-500 text-white">
                <Clock className="h-3 w-3 mr-1" />
                EM ALTA
              </Badge>
            )}
          </div>

          {/* Store Badge */}
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-white/90 text-gray-700">
              {deal.storeIcon} {deal.store}
            </Badge>
          </div>

          {/* Discount Badge */}
          {deal.discount > 0 && (
            <div className="absolute bottom-2 right-2">
              <Badge className="bg-[var(--primary)] text-white font-bold">-{deal.discount}%</Badge>
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="absolute bottom-2 left-2 flex items-center space-x-2">
          <Avatar className="h-6 w-6 border-2 border-white">
            <AvatarImage src={deal.postedBy.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-xs bg-[var(--primary)] text-white">
              {deal.postedBy.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <Badge variant="secondary" className="bg-white/90 text-xs">
            {deal.postedBy.name}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Title and Description */}
        <div className="space-y-2 mb-3">
          <h3 className="font-medium text-sm line-clamp-2 leading-tight">{deal.title}</h3>
          {deal.description && <p className="text-xs text-gray-600 line-clamp-1">{deal.description}</p>}
        </div>

        {/* Store and Category */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span>Loja: {deal.store}</span>
          <span>{deal.category}</span>
        </div>

        {/* Price */}
        {!deal.isFree ? (
          <div className="space-y-1 mb-4">
            {deal.originalPrice > deal.currentPrice && (
              <p className="text-xs text-gray-500 line-through">{formatPrice(deal.originalPrice)}</p>
            )}
            <p className="text-lg font-bold text-[var(--primary)]">{formatPrice(deal.currentPrice)}</p>
          </div>
        ) : (
          <div className="mb-4">
            <p className="text-lg font-bold text-green-600">Grátis</p>
            {deal.originalPrice > 0 && (
              <p className="text-xs text-gray-500 line-through">{formatPrice(deal.originalPrice)}</p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 hover:text-[var(--primary)] transition-colors ${isLiked ? "text-[var(--primary)]" : ""
                }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              <span>{likeCount}</span>
            </button>

            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{deal.comments}</span>
            </div>

            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{deal.views}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">{deal.postedAt}</span>
            <Button size="sm" className="bg-[var(--primary)] hover:bg-[var(--primary)]/90">
              <ExternalLink className="h-3 w-3 mr-1" />
              Ver
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
