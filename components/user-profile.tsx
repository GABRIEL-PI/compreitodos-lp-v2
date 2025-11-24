"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, MessageCircle, Trophy, Edit } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { DealCard } from "./deal-card"
import { mockDeals } from "@/lib/mock-data"
import { LevelProgress } from "./gamification/level-progress"
import { ACHIEVEMENTS } from "@/lib/gamification"

export function UserProfile() {
  const { user } = useAuth()

  if (!user) return null

  const userDeals = mockDeals.filter((deal) => deal.postedBy.name === user.name)
  const likedDeals = mockDeals.slice(0, 3) // Mock liked deals

  const getLevelColor = (level: number) => {
    if (level >= 8) return "bg-purple-500"
    if (level >= 5) return "bg-blue-500"
    if (level >= 3) return "bg-green-500"
    return "bg-gray-500"
  }

  const getLevelName = (level: number) => {
    if (level >= 8) return "Expert"
    if (level >= 5) return "Avançado"
    if (level >= 3) return "Intermediário"
    return "Iniciante"
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-2xl bg-[var(--color-pechinchou-red)] text-white">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Badge className={`absolute -bottom-2 -right-2 ${getLevelColor(user.level)} text-white`}>
                Nível {user.level}
              </Badge>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <Badge variant="secondary" className={`${getLevelColor(user.level)} text-white`}>
                  {getLevelName(user.level)}
                </Badge>
              </div>

              {user.bio && <p className="text-gray-600">{user.bio}</p>}

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                {user.location && (
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{user.location}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Membro desde {new Date(user.joinedAt).toLocaleDateString("pt-BR")}</span>
                </div>
              </div>

              <div className="flex items-center space-x-6 pt-2">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[var(--color-pechinchou-red)]">{user.points}</p>
                  <p className="text-sm text-gray-500">Pontos</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{user.dealsPosted}</p>
                  <p className="text-sm text-gray-500">Promoções</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{user.likesReceived}</p>
                  <p className="text-sm text-gray-500">Curtidas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{user.commentsCount}</p>
                  <p className="text-sm text-gray-500">Comentários</p>
                </div>
              </div>
            </div>

            <Button variant="outline" className="self-start bg-transparent">
              <Edit className="h-4 w-4 mr-2" />
              Editar Perfil
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Level Progress */}
      <LevelProgress points={user.points} level={user.level} />

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
            Conquistas ({ACHIEVEMENTS.filter((a) => a.unlocked).length}/{ACHIEVEMENTS.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ACHIEVEMENTS.map((achievement) => (
              <div
                key={achievement.id}
                className={`text-center p-4 rounded-lg ${
                  achievement.unlocked
                    ? "bg-yellow-50 border-2 border-yellow-200"
                    : "bg-gray-50 border-2 border-gray-200 opacity-60"
                }`}
              >
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <p className="font-medium text-sm">{achievement.name}</p>
                <p className="text-xs text-gray-500">{achievement.description}</p>
                {achievement.unlocked && achievement.reward.badge && (
                  <Badge className="mt-2 bg-yellow-600 text-white text-xs">{achievement.reward.badge}</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs defaultValue="deals" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="deals">Minhas Promoções ({userDeals.length})</TabsTrigger>
          <TabsTrigger value="liked">Curtidas ({likedDeals.length})</TabsTrigger>
          <TabsTrigger value="comments">Comentários ({user.commentsCount})</TabsTrigger>
        </TabsList>

        <TabsContent value="deals" className="space-y-4">
          {userDeals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500 mb-4">Você ainda não postou nenhuma promoção</p>
                <Button className="bg-[var(--color-pechinchou-red)] hover:bg-[var(--color-pechinchou-red)]/90">
                  Postar Primeira Promoção
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="liked" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {likedDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comments" className="space-y-4">
          <Card>
            <CardContent className="p-8 text-center">
              <MessageCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Seus comentários aparecerão aqui</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
