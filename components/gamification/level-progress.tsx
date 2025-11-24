"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { GamificationSystem } from "@/lib/gamification"
import { TrendingUp, Crown } from "lucide-react"

interface LevelProgressProps {
  points: number
  level: number
  className?: string
}

export function LevelProgress({ points, level, className }: LevelProgressProps) {
  const currentLevel = GamificationSystem.calculateLevel(points)
  const nextLevel = GamificationSystem.getNextLevel(level)
  const pointsToNext = GamificationSystem.getPointsToNextLevel(points)
  const progressPercentage = GamificationSystem.getProgressPercentage(points)

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Current Level */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">Nível {level}</span>
              <Badge className={`${currentLevel.color} text-white`}>{currentLevel.name}</Badge>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{points.toLocaleString()} pontos</p>
            </div>
          </div>

          {/* Progress Bar */}
          {nextLevel && (
            <>
              <Progress value={progressPercentage} className="h-2" />
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{pointsToNext} pontos para o próximo nível</span>
                <span>Nível {nextLevel.level}</span>
              </div>
            </>
          )}

          {/* Level Benefits */}
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-700">Benefícios do seu nível:</p>
            <div className="flex flex-wrap gap-1">
              {currentLevel.benefits.map((benefit, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>

          {/* Next Level Preview */}
          {nextLevel && (
            <div className="pt-2 border-t">
              <p className="text-sm text-gray-600 mb-1">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                Próximo nível: <span className="font-medium">{nextLevel.name}</span>
              </p>
              <div className="flex flex-wrap gap-1">
                {nextLevel.benefits.slice(0, 2).map((benefit, index) => (
                  <Badge key={index} variant="secondary" className="text-xs opacity-60">
                    {benefit}
                  </Badge>
                ))}
                {nextLevel.benefits.length > 2 && (
                  <Badge variant="secondary" className="text-xs opacity-60">
                    +{nextLevel.benefits.length - 2} mais
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
