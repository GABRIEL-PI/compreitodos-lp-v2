"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, MessageCircle, Share2, Bookmark, Flag, ExternalLink } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"

interface DealActionsProps {
  dealId: string
  initialLikes: number
  initialComments: number
  initialIsSaved?: boolean
  initialIsLiked?: boolean
  onCommentClick?: () => void
}

export function DealActions({
  dealId,
  initialLikes,
  initialComments,
  initialIsSaved = false,
  initialIsLiked = false,
  onCommentClick,
}: DealActionsProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [isSaved, setIsSaved] = useState(initialIsSaved)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1))

    if (!isLiked) {
      toast({
        title: "Curtida adicionada!",
        description: "Você curtiu esta promoção.",
      })
    }
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    toast({
      title: isSaved ? "Removido dos salvos" : "Salvo com sucesso!",
      description: isSaved
        ? "A promoção foi removida da sua lista de salvos."
        : "Você pode encontrar esta promoção na sua lista de salvos.",
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Confira esta promoção no Pechinchou!",
          url: window.location.href,
        })
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copiado!",
        description: "O link da promoção foi copiado para a área de transferência.",
      })
    }
  }

  const handleReport = () => {
    toast({
      title: "Denúncia enviada",
      description: "Obrigado por nos ajudar a manter a comunidade segura.",
    })
  }

  return (
    <Card className="mt-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isLiked ? "bg-red-50 text-[var(--color-pechinchou-red)]" : "hover:bg-gray-50 text-gray-600"
              }`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
              <span className="font-medium">{likes}</span>
            </button>

            <button
              onClick={onCommentClick}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">{initialComments}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
            >
              <Share2 className="h-5 w-5" />
              <span className="font-medium">Compartilhar</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleSave}
              className={`p-2 rounded-lg transition-colors ${
                isSaved ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50 text-gray-600"
              }`}
            >
              <Bookmark className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Flag className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleReport} className="text-red-600">
                  <Flag className="h-4 w-4 mr-2" />
                  Denunciar promoção
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              className="bg-[var(--color-pechinchou-red)] hover:bg-[var(--color-pechinchou-red)]/90"
              onClick={() => window.open("#", "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Ver Oferta
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
