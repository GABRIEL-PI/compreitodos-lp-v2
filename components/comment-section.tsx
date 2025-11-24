"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, MoreHorizontal, Reply, Flag } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Comment {
  id: string
  user: {
    name: string
    avatar?: string
    level: number
  }
  content: string
  likes: number
  isLiked: boolean
  createdAt: string
  replies?: Comment[]
}

interface CommentSectionProps {
  dealId: string
  comments: Comment[]
}

export function CommentSection({ dealId, comments: initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      user: {
        name: "Você",
        avatar: "/placeholder.svg",
        level: 5,
      },
      content: newComment,
      likes: 0,
      isLiked: false,
      createdAt: "agora",
      replies: [],
    }

    setComments([comment, ...comments])
    setNewComment("")
  }

  const handleLikeComment = (commentId: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          }
        }
        return comment
      }),
    )
  }

  const handleReply = (commentId: string) => {
    if (!replyContent.trim()) return

    const reply: Comment = {
      id: Date.now().toString(),
      user: {
        name: "Você",
        avatar: "/placeholder.svg",
        level: 5,
      },
      content: replyContent,
      likes: 0,
      isLiked: false,
      createdAt: "agora",
    }

    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply],
          }
        }
        return comment
      }),
    )

    setReplyContent("")
    setReplyingTo(null)
  }

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`space-y-3 ${isReply ? "ml-8 border-l-2 border-gray-100 pl-4" : ""}`}>
      <div className="flex space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={comment.user.avatar || "/placeholder.svg"} />
          <AvatarFallback className="bg-[var(--color-pechinchou-red)] text-white text-xs">
            {comment.user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-sm">{comment.user.name}</span>
            <span className="text-xs bg-[var(--color-pechinchou-red)] text-white px-2 py-0.5 rounded-full">
              Nível {comment.user.level}
            </span>
            <span className="text-xs text-gray-500">{comment.createdAt}</span>
          </div>

          <p className="text-sm text-gray-700">{comment.content}</p>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleLikeComment(comment.id)}
              className={`flex items-center space-x-1 text-xs hover:text-[var(--color-pechinchou-red)] transition-colors ${
                comment.isLiked ? "text-[var(--color-pechinchou-red)]" : "text-gray-500"
              }`}
            >
              <Heart className={`h-3 w-3 ${comment.isLiked ? "fill-current" : ""}`} />
              <span>{comment.likes}</span>
            </button>

            {!isReply && (
              <button
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="flex items-center space-x-1 text-xs text-gray-500 hover:text-[var(--color-pechinchou-red)] transition-colors"
              >
                <Reply className="h-3 w-3" />
                <span>Responder</span>
              </button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-red-600">
                  <Flag className="h-3 w-3 mr-2" />
                  Denunciar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {replyingTo === comment.id && (
            <div className="space-y-2 mt-3">
              <Textarea
                placeholder="Escreva sua resposta..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[60px] text-sm"
              />
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() => handleReply(comment.id)}
                  className="bg-[var(--color-pechinchou-red)] hover:bg-[var(--color-pechinchou-red)]/90"
                >
                  Responder
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setReplyingTo(null)
                    setReplyContent("")
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply />
          ))}
        </div>
      )}
    </div>
  )

  return (
    <Card className="mt-4">
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <MessageCircle className="h-4 w-4 text-[var(--color-pechinchou-red)]" />
          <h3 className="font-medium">Comentários ({comments.length})</h3>
        </div>

        {/* Add Comment */}
        <div className="space-y-3 mb-6">
          <Textarea
            placeholder="Compartilhe sua opinião sobre esta promoção..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[80px]"
          />
          <div className="flex justify-end">
            <Button
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              className="bg-[var(--color-pechinchou-red)] hover:bg-[var(--color-pechinchou-red)]/90"
            >
              Comentar
            </Button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageCircle className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>Seja o primeiro a comentar!</p>
            </div>
          ) : (
            comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)
          )}
        </div>
      </CardContent>
    </Card>
  )
}
