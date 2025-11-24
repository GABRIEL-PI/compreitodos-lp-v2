"use client"

import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp } from "lucide-react"
import type { PointsAction } from "@/lib/gamification"

interface PointsNotificationProps {
  action: PointsAction
  show: boolean
  onClose: () => void
}

export function PointsNotification({ action, show, onClose }: PointsNotificationProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-right-full">
      <Card className="bg-green-50 border-green-200 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-full">
              <Star className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-600 text-white">+{action.points} pontos</Badge>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-sm text-green-800 mt-1">{action.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
