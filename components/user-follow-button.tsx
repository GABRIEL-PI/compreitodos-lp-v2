"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { UserPlus, UserCheck } from "lucide-react"

interface UserFollowButtonProps {
  userId: string
  initialIsFollowing?: boolean
  followersCount?: number
  className?: string
}

export function UserFollowButton({
  userId,
  initialIsFollowing = false,
  followersCount = 0,
  className,
}: UserFollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
  const [followers, setFollowers] = useState(followersCount)
  const [isLoading, setIsLoading] = useState(false)

  const handleFollow = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    setIsFollowing(!isFollowing)
    setFollowers((prev) => (isFollowing ? prev - 1 : prev + 1))
    setIsLoading(false)
  }

  return (
    <Button
      onClick={handleFollow}
      disabled={isLoading}
      variant={isFollowing ? "outline" : "default"}
      size="sm"
      className={`${
        isFollowing
          ? "border-[var(--color-pechinchou-red)] text-[var(--color-pechinchou-red)] hover:bg-[var(--color-pechinchou-red)] hover:text-white"
          : "bg-[var(--color-pechinchou-red)] hover:bg-[var(--color-pechinchou-red)]/90"
      } ${className}`}
    >
      {isFollowing ? (
        <>
          <UserCheck className="h-4 w-4 mr-1" />
          Seguindo
        </>
      ) : (
        <>
          <UserPlus className="h-4 w-4 mr-1" />
          Seguir
        </>
      )}
    </Button>
  )
}
