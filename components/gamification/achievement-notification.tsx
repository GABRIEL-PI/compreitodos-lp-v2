"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, X, Star } from "lucide-react"
import type { Achievement } from "@/lib/gamification"

interface AchievementNotificationProps {
  achievement: Achievement
  show: boolean
  onClose: () => void
}

export function AchievementNotification({ achievement, show, onClose }: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 300) // Wait for animation to complete
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 ${isVisible ? "animate-in fade-in" : "animate-out fade-out"}`}
    >
      <Card className="w-96 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 shadow-2xl">
        <CardContent className="p-6 text-center">
          <Button variant="ghost" size="sm" onClick={onClose} className="absolute top-2 right-2 h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>

          {/* Achievement Icon */}
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-2">
              <Trophy className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="text-4xl mb-2">{achievement.icon}</div>
          </div>

          {/* Achievement Info */}
          <div className="space-y-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Conquista Desbloqueada!</h3>
              <h4 className="text-lg font-semibold text-yellow-700">{achievement.name}</h4>
              <p className="text-sm text-gray-600">{achievement.description}</p>
            </div>

            {/* Rewards */}
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <Badge className="bg-yellow-600 text-white">+{achievement.reward.points} pontos</Badge>
              </div>

              {achievement.reward.badge && (
                <Badge variant="outline" className="border-yellow-300 text-yellow-700">
                  Badge: {achievement.reward.badge}
                </Badge>
              )}

              {achievement.reward.title && (
                <Badge variant="outline" className="border-purple-300 text-purple-700">
                  Título: {achievement.reward.title}
                </Badge>
              )}
            </div>

            <Button onClick={onClose} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
              Continuar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
