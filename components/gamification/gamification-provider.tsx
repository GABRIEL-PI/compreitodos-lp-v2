"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { GamificationSystem, type Achievement, type PointsAction } from "@/lib/gamification"
import { useAuth } from "@/lib/auth-context"
import { PointsNotification } from "./points-notification"
import { AchievementNotification } from "./achievement-notification"

interface GamificationContextType {
  awardPoints: (action: keyof typeof import("@/lib/gamification").POINTS_CONFIG) => void
  checkAndUnlockAchievements: () => Achievement[]
  showPointsNotification: (action: PointsAction) => void
  showAchievementNotification: (achievement: Achievement) => void
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined)

export function GamificationProvider({ children }: { children: ReactNode }) {
  const { user, updateProfile } = useAuth()
  const [pointsNotification, setPointsNotification] = useState<{ action: PointsAction; show: boolean } | null>(null)
  const [achievementNotification, setAchievementNotification] = useState<{
    achievement: Achievement
    show: boolean
  } | null>(null)

  const awardPoints = useCallback(
    (actionKey: keyof typeof import("@/lib/gamification").POINTS_CONFIG) => {
      if (!user) return

      const action = GamificationSystem.awardPoints(actionKey)
      const newPoints = user.points + action.points
      const newLevel = GamificationSystem.calculateLevel(newPoints)

      // Update user points and level
      updateProfile({
        points: newPoints,
        level: newLevel.level,
      })

      // Show points notification
      showPointsNotification(action)

      // Check for new achievements
      const newAchievements = checkAndUnlockAchievements()
      if (newAchievements.length > 0) {
        // Show first achievement notification
        showAchievementNotification(newAchievements[0])
      }
    },
    [user, updateProfile],
  )

  const checkAndUnlockAchievements = useCallback((): Achievement[] => {
    if (!user) return []

    const userStats = {
      dealsPosted: user.dealsPosted,
      likesReceived: user.likesReceived,
      commentsCount: user.commentsCount,
      daysActive: Math.floor((Date.now() - new Date(user.joinedAt).getTime()) / (1000 * 60 * 60 * 24)),
      points: user.points,
      level: user.level,
    }

    return GamificationSystem.checkAchievements(userStats)
  }, [user])

  const showPointsNotification = useCallback((action: PointsAction) => {
    setPointsNotification({ action, show: true })
  }, [])

  const showAchievementNotification = useCallback((achievement: Achievement) => {
    setAchievementNotification({ achievement, show: true })
  }, [])

  return (
    <GamificationContext.Provider
      value={{
        awardPoints,
        checkAndUnlockAchievements,
        showPointsNotification,
        showAchievementNotification,
      }}
    >
      {children}

      {/* Notifications */}
      {pointsNotification && (
        <PointsNotification
          action={pointsNotification.action}
          show={pointsNotification.show}
          onClose={() => setPointsNotification(null)}
        />
      )}

      {achievementNotification && (
        <AchievementNotification
          achievement={achievementNotification.achievement}
          show={achievementNotification.show}
          onClose={() => setAchievementNotification(null)}
        />
      )}
    </GamificationContext.Provider>
  )
}

export function useGamification() {
  const context = useContext(GamificationContext)
  if (context === undefined) {
    throw new Error("useGamification must be used within a GamificationProvider")
  }
  return context
}
