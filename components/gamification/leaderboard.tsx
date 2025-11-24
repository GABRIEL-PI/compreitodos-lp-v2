"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Award, TrendingUp, Heart, MessageCircle } from "lucide-react"

interface LeaderboardUser {
  id: string
  name: string
  avatar: string
  level: number
  points: number
  dealsPosted: number
  likesReceived: number
  commentsCount: number
}

// Mock leaderboard data
const mockLeaderboard: LeaderboardUser[] = [
  {
    id: "1",
    name: "Ana Paula Vieira",
    avatar: "/user-profile-ana-paula.jpg",
    level: 8,
    points: 12450,
    dealsPosted: 89,
    likesReceived: 2340,
    commentsCount: 456,
  },
  {
    id: "2",
    name: "Carlos Silva",
    avatar: "/placeholder.svg",
    level: 7,
    points: 9870,
    dealsPosted: 67,
    likesReceived: 1890,
    commentsCount: 234,
  },
  {
    id: "3",
    name: "Maria Santos",
    avatar: "/placeholder.svg",
    level: 6,
    points: 8340,
    dealsPosted: 45,
    likesReceived: 1560,
    commentsCount: 189,
  },
  {
    id: "4",
    name: "João Oliveira",
    avatar: "/placeholder.svg",
    level: 6,
    points: 7890,
    dealsPosted: 56,
    likesReceived: 1234,
    commentsCount: 167,
  },
  {
    id: "5",
    name: "Fernanda Costa",
    avatar: "/placeholder.svg",
    level: 5,
    points: 6540,
    dealsPosted: 34,
    likesReceived: 987,
    commentsCount: 145,
  },
]

export function Leaderboard() {
  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-sm font-bold text-gray-500">#{position}</span>
    }
  }

  const getRankBadge = (position: number) => {
    switch (position) {
      case 1:
        return "bg-yellow-500 text-white"
      case 2:
        return "bg-gray-400 text-white"
      case 3:
        return "bg-amber-600 text-white"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const LeaderboardList = ({ users, sortBy }: { users: LeaderboardUser[]; sortBy: keyof LeaderboardUser }) => {
    const sortedUsers = [...users].sort((a, b) => {
      if (typeof a[sortBy] === "number" && typeof b[sortBy] === "number") {
        return (b[sortBy] as number) - (a[sortBy] as number)
      }
      return 0
    })

    return (
      <div className="space-y-3">
        {sortedUsers.map((user, index) => (
          <div key={user.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
            <div className="flex items-center justify-center w-8">{getRankIcon(index + 1)}</div>

            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="bg-[var(--color-pechinchou-red)] text-white">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <p className="font-medium text-sm">{user.name}</p>
                <Badge className={`text-xs ${getRankBadge(index + 1)}`}>Nv.{user.level}</Badge>
              </div>
              <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                <span>{user.points.toLocaleString()} pts</span>
                <span>{user.dealsPosted} deals</span>
                <span>{user.likesReceived} likes</span>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-[var(--color-pechinchou-red)]">
                {sortBy === "points" && user.points.toLocaleString()}
                {sortBy === "dealsPosted" && user.dealsPosted}
                {sortBy === "likesReceived" && user.likesReceived}
                {sortBy === "commentsCount" && user.commentsCount}
              </p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
          Ranking da Comunidade
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="points" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="points" className="text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              Pontos
            </TabsTrigger>
            <TabsTrigger value="deals" className="text-xs">
              <Award className="h-3 w-3 mr-1" />
              Deals
            </TabsTrigger>
            <TabsTrigger value="likes" className="text-xs">
              <Heart className="h-3 w-3 mr-1" />
              Likes
            </TabsTrigger>
            <TabsTrigger value="comments" className="text-xs">
              <MessageCircle className="h-3 w-3 mr-1" />
              Comentários
            </TabsTrigger>
          </TabsList>

          <TabsContent value="points" className="mt-4">
            <LeaderboardList users={mockLeaderboard} sortBy="points" />
          </TabsContent>

          <TabsContent value="deals" className="mt-4">
            <LeaderboardList users={mockLeaderboard} sortBy="dealsPosted" />
          </TabsContent>

          <TabsContent value="likes" className="mt-4">
            <LeaderboardList users={mockLeaderboard} sortBy="likesReceived" />
          </TabsContent>

          <TabsContent value="comments" className="mt-4">
            <LeaderboardList users={mockLeaderboard} sortBy="commentsCount" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
