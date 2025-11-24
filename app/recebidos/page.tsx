"use client"

import { useState } from "react"
import { Heart, Send, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { RightSidebar } from "@/components/right-sidebar"

const receivedReviews = [
  {
    id: 1,
    user: {
      name: "maceu09",
      avatar: "/diverse-user-avatars.png",
      username: "@maceu09",
    },
    content: "Melhor preço que encontrei! Esse ramonboy me salvou kkk monstrooo",
    product: {
      store: "Samsung",
      price: "R$ 1.799",
      image: "/images/image.png",
    },
    likes: 1,
    timeAgo: "Agora mesmo",
    comments: [
      {
        id: 1,
        user: {
          name: "pedro_souza",
          avatar: "/diverse-user-avatars.png",
          username: "@pedro_souza",
        },
        content: "top, é boa?",
        timeAgo: "3sem",
        verified: true,
      },
    ],
  },
]

export default function RecebidosPage() {
  const [commentText, setCommentText] = useState("")

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto flex gap-6 px-4 py-6">
        {/* Left Profile Sidebar */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <Card className="overflow-hidden border-0 shadow-lg">
            {/* Purple gradient header */}
            <div className="h-32 bg-gradient-to-br from-purple-400 to-purple-600 relative">
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center border-4 border-white shadow-lg">
                  <div className="w-24 h-24 rounded-full bg-purple-700 flex items-center justify-center">
                    <span className="text-white text-5xl font-bold">P</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-20 pb-6 px-6 text-center bg-white">
              <h2 className="text-2xl font-light text-gray-800 mb-1">@</h2>
              <div className="flex items-center justify-center gap-2 text-gray-500">
                <Target className="w-4 h-4 text-pink-500" />
                <span className="text-sm">0 Avaliações</span>
              </div>
            </div>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-3xl">
          {/* Header Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">Ajude a comunidade a economizar</h1>
              <span className="text-2xl">🤚</span>
            </div>
            <p className="text-gray-500 mb-6">
              Gostou do produto? Avalie o seu recebido e ajude a comunidade na compra
            </p>

            {/* Comment Input */}
            <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-3 border border-gray-200">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-lg font-bold">P</span>
              </div>
              <Input
                placeholder="Comente sobre o seu recebido!"
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-gray-500"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </div>
          </div>

          {/* Reviews Feed */}
          <div className="space-y-6">
            {receivedReviews.map((review) => (
              <Card key={review.id} className="p-6 shadow-sm border border-gray-200">
                {/* User Header */}
                <div className="flex items-start gap-3 mb-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={review.user.avatar || "/placeholder.svg"} alt={review.user.name} />
                    <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{review.user.username}</span>
                    </div>
                    <p className="text-gray-700 mt-1">{review.content}</p>

                    {/* Product Info */}
                    <div className="mt-3 flex flex-col gap-1">
                      <div className="text-sm text-gray-600">
                        Loja: <span className="font-medium">{review.product.store}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Preço: <span className="font-semibold text-gray-900">{review.product.price}</span>
                      </div>
                    </div>

                    {/* Product Image */}
                    {review.product.image && (
                      <div className="mt-3">
                        <img
                          src={review.product.image || "/placeholder.svg"}
                          alt="Product"
                          className="rounded-lg w-64 h-64 object-cover border border-gray-200"
                        />
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                      <button className="hover:text-gray-700">Reagir</button>
                      <button className="hover:text-gray-700">Responder</button>
                    </div>

                    {/* Like Count */}
                    <div className="flex items-center gap-1 mt-3">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                        <Heart className="w-3 h-3 text-white fill-white" />
                      </div>
                      <span className="text-sm text-gray-700">{review.likes}</span>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                {review.comments && review.comments.length > 0 && (
                  <div className="ml-12 space-y-3 border-l-2 border-gray-200 pl-4">
                    {review.comments.map((comment) => (
                      <div key={comment.id} className="flex items-start gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                          <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-gray-900">{comment.user.username}</span>
                            {comment.verified && <span className="text-xs text-green-600">●</span>}
                            <span className="text-xs text-gray-500">{comment.timeAgo}</span>
                          </div>
                          <p className="text-sm text-gray-700">{comment.content}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                            <button className="hover:text-gray-700">Reagir</button>
                            <button className="hover:text-gray-700">Responder</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Comment Input */}
                <div className="ml-12 mt-4 flex items-center gap-2 border-t pt-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">P</span>
                  </div>
                  <Input
                    placeholder="Deixe o seu comentário"
                    className="flex-1 text-sm border-gray-200 focus-visible:ring-purple-500"
                  />
                  <Button size="sm" variant="ghost" className="text-purple-600 hover:text-purple-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </div>
  )
}
