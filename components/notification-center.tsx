"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Bell, Heart, MessageCircle, UserPlus, Gift, Flame, X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface Notification {
  id: string
  type: "like" | "comment" | "follow" | "deal" | "system"
  title: string
  message: string
  user?: {
    name: string
    avatar?: string
  }
  createdAt: string
  isRead: boolean
  dealId?: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "like",
    title: "Nova curtida",
    message: "João Silva curtiu seu comentário na promoção do iPhone",
    user: { name: "João Silva", avatar: "/placeholder.svg" },
    createdAt: "2 min",
    isRead: false,
    dealId: "123",
  },
  {
    id: "2",
    type: "comment",
    title: "Novo comentário",
    message: "Maria comentou na promoção que você compartilhou",
    user: { name: "Maria Santos", avatar: "/placeholder.svg" },
    createdAt: "5 min",
    isRead: false,
    dealId: "456",
  },
  {
    id: "3",
    type: "follow",
    title: "Novo seguidor",
    message: "Pedro começou a te seguir",
    user: { name: "Pedro Costa", avatar: "/placeholder.svg" },
    createdAt: "1h",
    isRead: true,
  },
  {
    id: "4",
    type: "deal",
    title: "Promoção em alta",
    message: "Sua promoção do notebook está em destaque!",
    createdAt: "2h",
    isRead: true,
    dealId: "789",
  },
  {
    id: "5",
    type: "system",
    title: "Parabéns!",
    message: "Você alcançou o nível 6 no Pechinchou!",
    createdAt: "1d",
    isRead: true,
  },
]

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />
      case "comment":
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      case "follow":
        return <UserPlus className="h-4 w-4 text-green-500" />
      case "deal":
        return <Flame className="h-4 w-4 text-orange-500" />
      case "system":
        return <Gift className="h-4 w-4 text-purple-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-[var(--color-pechinchou-red)] text-white text-xs">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-80 sm:w-96">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notificações</span>
            </SheetTitle>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-[var(--color-pechinchou-red)] hover:text-[var(--color-pechinchou-red)]/80"
              >
                Marcar todas como lidas
              </Button>
            )}
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-4">
          <div className="space-y-1">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bell className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>Nenhuma notificação</p>
              </div>
            ) : (
              notifications.map((notification, index) => (
                <div key={notification.id}>
                  <Card
                    className={`cursor-pointer transition-colors hover:bg-gray-50 ${
                      !notification.isRead ? "bg-blue-50 border-blue-200" : ""
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex space-x-3">
                        <div className="flex-shrink-0">
                          {notification.user ? (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={notification.user.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-[var(--color-pechinchou-red)] text-white text-xs">
                                {notification.user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                              {getNotificationIcon(notification.type)}
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.createdAt}</p>
                            </div>

                            <div className="flex items-center space-x-1 ml-2">
                              {!notification.isRead && (
                                <div className="h-2 w-2 bg-[var(--color-pechinchou-red)] rounded-full" />
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeNotification(notification.id)
                                }}
                                className="h-6 w-6 p-0 hover:bg-gray-200"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  {index < notifications.length - 1 && <Separator className="my-1" />}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
