export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  category: "posting" | "engagement" | "community" | "milestone"
  requirement: {
    type: "deals_posted" | "likes_received" | "comments_made" | "days_active" | "points_earned" | "level_reached"
    value: number
  }
  reward: {
    points: number
    badge?: string
    title?: string
  }
  unlocked: boolean
  unlockedAt?: string
}

export interface LevelInfo {
  level: number
  name: string
  minPoints: number
  maxPoints: number
  color: string
  benefits: string[]
}

export interface PointsAction {
  action: "post_deal" | "receive_like" | "make_comment" | "deal_marked_hot" | "first_deal" | "daily_login"
  points: number
  description: string
}

// Points system configuration
export const POINTS_CONFIG: Record<string, PointsAction> = {
  post_deal: {
    action: "post_deal",
    points: 50,
    description: "Postou uma nova promoção",
  },
  receive_like: {
    action: "receive_like",
    points: 5,
    description: "Recebeu uma curtida",
  },
  make_comment: {
    action: "make_comment",
    points: 10,
    description: "Fez um comentário",
  },
  deal_marked_hot: {
    action: "deal_marked_hot",
    points: 100,
    description: 'Promoção marcada como "Em Alta"',
  },
  first_deal: {
    action: "first_deal",
    points: 100,
    description: "Primeira promoção postada",
  },
  daily_login: {
    action: "daily_login",
    points: 10,
    description: "Login diário",
  },
}

// Level system configuration
export const LEVELS: LevelInfo[] = [
  {
    level: 1,
    name: "Iniciante",
    minPoints: 0,
    maxPoints: 99,
    color: "bg-gray-500",
    benefits: ["Postar promoções", "Curtir e comentar"],
  },
  {
    level: 2,
    name: "Iniciante",
    minPoints: 100,
    maxPoints: 249,
    color: "bg-gray-500",
    benefits: ["Postar promoções", "Curtir e comentar"],
  },
  {
    level: 3,
    name: "Intermediário",
    minPoints: 250,
    maxPoints: 499,
    color: "bg-green-500",
    benefits: ["Destacar promoções", "Criar alertas personalizados"],
  },
  {
    level: 4,
    name: "Intermediário",
    minPoints: 500,
    maxPoints: 999,
    color: "bg-green-500",
    benefits: ["Destacar promoções", "Criar alertas personalizados"],
  },
  {
    level: 5,
    name: "Avançado",
    minPoints: 1000,
    maxPoints: 1999,
    color: "bg-blue-500",
    benefits: ["Moderação básica", "Badge especial", "Prioridade no suporte"],
  },
  {
    level: 6,
    name: "Avançado",
    minPoints: 2000,
    maxPoints: 3999,
    color: "bg-blue-500",
    benefits: ["Moderação básica", "Badge especial", "Prioridade no suporte"],
  },
  {
    level: 7,
    name: "Avançado",
    minPoints: 4000,
    maxPoints: 7999,
    color: "bg-blue-500",
    benefits: ["Moderação básica", "Badge especial", "Prioridade no suporte"],
  },
  {
    level: 8,
    name: "Expert",
    minPoints: 8000,
    maxPoints: 15999,
    color: "bg-purple-500",
    benefits: ["Moderação avançada", "Acesso antecipado", "Cupons exclusivos"],
  },
  {
    level: 9,
    name: "Expert",
    minPoints: 16000,
    maxPoints: 31999,
    color: "bg-purple-500",
    benefits: ["Moderação avançada", "Acesso antecipado", "Cupons exclusivos"],
  },
  {
    level: 10,
    name: "Lenda",
    minPoints: 32000,
    maxPoints: Number.POSITIVE_INFINITY,
    color: "bg-yellow-500",
    benefits: ["Todos os privilégios", "Badge dourado", "Programa VIP"],
  },
]

// Achievements configuration
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_deal",
    name: "Primeira Promoção",
    description: "Postou sua primeira oferta",
    icon: "🎯",
    category: "posting",
    requirement: { type: "deals_posted", value: 1 },
    reward: { points: 100, badge: "Estreante" },
    unlocked: false,
  },
  {
    id: "deal_master",
    name: "Mestre das Promoções",
    description: "Postou 50 promoções",
    icon: "🏆",
    category: "posting",
    requirement: { type: "deals_posted", value: 50 },
    reward: { points: 500, badge: "Mestre", title: "Caçador de Ofertas" },
    unlocked: false,
  },
  {
    id: "hundred_likes",
    name: "100 Curtidas",
    description: "Recebeu 100+ curtidas",
    icon: "❤️",
    category: "engagement",
    requirement: { type: "likes_received", value: 100 },
    reward: { points: 200, badge: "Popular" },
    unlocked: false,
  },
  {
    id: "thousand_likes",
    name: "Mil Curtidas",
    description: "Recebeu 1000+ curtidas",
    icon: "💖",
    category: "engagement",
    requirement: { type: "likes_received", value: 1000 },
    reward: { points: 1000, badge: "Influencer", title: "Queridinho da Comunidade" },
    unlocked: false,
  },
  {
    id: "active_commenter",
    name: "Comentarista",
    description: "Fez 100+ comentários",
    icon: "💬",
    category: "community",
    requirement: { type: "comments_made", value: 100 },
    reward: { points: 300, badge: "Comunicativo" },
    unlocked: false,
  },
  {
    id: "veteran",
    name: "Veterano",
    description: "Membro há mais de 365 dias",
    icon: "🎖️",
    category: "milestone",
    requirement: { type: "days_active", value: 365 },
    reward: { points: 500, badge: "Veterano", title: "Membro Fundador" },
    unlocked: false,
  },
  {
    id: "point_collector",
    name: "Colecionador",
    description: "Acumulou 10.000 pontos",
    icon: "💎",
    category: "milestone",
    requirement: { type: "points_earned", value: 10000 },
    reward: { points: 1000, badge: "Colecionador", title: "Rei dos Pontos" },
    unlocked: false,
  },
  {
    id: "level_master",
    name: "Nível Máximo",
    description: "Alcançou o nível 10",
    icon: "👑",
    category: "milestone",
    requirement: { type: "level_reached", value: 10 },
    reward: { points: 2000, badge: "Lenda", title: "Lenda do Pechinchou" },
    unlocked: false,
  },
]

// Gamification utility functions
export class GamificationSystem {
  static calculateLevel(points: number): LevelInfo {
    return LEVELS.find((level) => points >= level.minPoints && points <= level.maxPoints) || LEVELS[0]
  }

  static getNextLevel(currentLevel: number): LevelInfo | null {
    return LEVELS.find((level) => level.level === currentLevel + 1) || null
  }

  static getPointsToNextLevel(currentPoints: number): number {
    const currentLevel = this.calculateLevel(currentPoints)
    const nextLevel = this.getNextLevel(currentLevel.level)
    return nextLevel ? nextLevel.minPoints - currentPoints : 0
  }

  static awardPoints(action: keyof typeof POINTS_CONFIG): PointsAction {
    return POINTS_CONFIG[action]
  }

  static checkAchievements(userStats: {
    dealsPosted: number
    likesReceived: number
    commentsCount: number
    daysActive: number
    points: number
    level: number
  }): Achievement[] {
    return ACHIEVEMENTS.filter((achievement) => {
      if (achievement.unlocked) return false

      switch (achievement.requirement.type) {
        case "deals_posted":
          return userStats.dealsPosted >= achievement.requirement.value
        case "likes_received":
          return userStats.likesReceived >= achievement.requirement.value
        case "comments_made":
          return userStats.commentsCount >= achievement.requirement.value
        case "days_active":
          return userStats.daysActive >= achievement.requirement.value
        case "points_earned":
          return userStats.points >= achievement.requirement.value
        case "level_reached":
          return userStats.level >= achievement.requirement.value
        default:
          return false
      }
    })
  }

  static getProgressPercentage(currentPoints: number): number {
    const currentLevel = this.calculateLevel(currentPoints)
    const progress = currentPoints - currentLevel.minPoints
    const levelRange = currentLevel.maxPoints - currentLevel.minPoints
    return Math.min((progress / levelRange) * 100, 100)
  }
}
