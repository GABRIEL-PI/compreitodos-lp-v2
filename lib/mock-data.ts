export interface Deal {
  id: string
  title: string
  description: string
  originalPrice: number
  currentPrice: number
  discount: number
  store: string
  storeIcon: string
  image: string
  category: string
  likes: number
  comments: number
  views: number
  isHot: boolean
  isFree: boolean
  isExpiring: boolean
  postedBy: {
    name: string
    avatar: string
    level: number
  }
  postedAt: string
  link: string
  coupon?: string
  realImages?: string[]
}

export const mockDeals: Deal[] = [
  {
    id: "1",
    title: "Moleton Capuz Blusa De Frio Lisa Cordão Neon Canguru Macio",
    description: "Moletom masculino com capuz e cordão neon",
    originalPrice: 78.99,
    currentPrice: 53.99,
    discount: 32,
    store: "Mercado Livre",
    storeIcon: "🛒",
    image: "/black-hoodie-sweatshirt.jpg",
    category: "Moda",
    likes: 13,
    comments: 0,
    views: 245,
    isHot: false,
    isFree: false,
    isExpiring: false,
    postedBy: {
      name: "@DiogoSilva",
      avatar: "/placeholder.svg",
      level: 5,
    },
    postedAt: "Agora mesmo",
    link: "https://example.com",
  },
  {
    id: "2",
    title: "Replay Kids Carrinho Elétrico Infantil Mini Mercedes - Preto",
    description: "Carrinho elétrico infantil modelo Mercedes",
    originalPrice: 1399,
    currentPrice: 1180,
    discount: 16,
    store: "Amazon",
    storeIcon: "📦",
    image: "/kids-electric-car-mercedes-black.jpg",
    category: "Brinquedos",
    likes: 18,
    comments: 0,
    views: 890,
    isHot: false,
    isFree: true,
    isExpiring: false,
    postedBy: {
      name: "Amazon",
      avatar: "/placeholder.svg",
      level: 8,
    },
    postedAt: "há 5min",
    link: "https://example.com",
  },
  {
    id: "3",
    title: "Comunicado sobre os Grupos do Whatsapp",
    description: "Informações importantes sobre nossa comunidade",
    originalPrice: 399,
    currentPrice: 0,
    discount: 100,
    store: "Pechinchou",
    storeIcon: "📢",
    image: "/whatsapp-logo-green.jpg",
    category: "Comunicados",
    likes: 5539,
    comments: 125,
    views: 15000,
    isHot: true,
    isFree: true,
    isExpiring: false,
    postedBy: {
      name: "Pechinchou",
      avatar: "/placeholder.svg",
      level: 10,
    },
    postedAt: "há 2 meses",
    link: "https://example.com",
  },
  {
    id: "4",
    title: "Kit 4 Bermuda Masculina Short Moletom Leve Bermuda Masculina",
    description: "Kit com 4 bermudas masculinas em moletom",
    originalPrice: 139,
    currentPrice: 69.95,
    discount: 50,
    store: "Mercado Livre",
    storeIcon: "🛒",
    image: "/men-shorts-bermuda-kit-colorful.jpg",
    category: "Moda",
    likes: 114,
    comments: 4,
    views: 1240,
    isHot: false,
    isFree: false,
    isExpiring: true,
    postedBy: {
      name: "Mercado Livre",
      avatar: "/placeholder.svg",
      level: 8,
    },
    postedAt: "há 20h",
    link: "https://example.com",
  },
  {
    id: "5",
    title: 'Samsung Smart Tv 55" Oled 4k 55s90d - Processador Neural Quantum 4k',
    description: "Smart TV OLED 55 polegadas com tecnologia 4K",
    originalPrice: 6319,
    currentPrice: 0,
    discount: 100,
    store: "Amazon",
    storeIcon: "📦",
    image: "/samsung-oled-tv-55-inch-black.jpg",
    category: "Eletrônicos",
    likes: 0,
    comments: 0,
    views: 45,
    isHot: false,
    isFree: true,
    isExpiring: false,
    postedBy: {
      name: "Amazon",
      avatar: "/placeholder.svg",
      level: 9,
    },
    postedAt: "há 5min",
    link: "https://example.com",
  },
  {
    id: "6",
    title: "SoundPEATS Free2 classic Fones de Ouvido Sem Fio",
    description: "Fones de ouvido bluetooth sem fio",
    originalPrice: 299,
    currentPrice: 0,
    discount: 100,
    store: "Amazon",
    storeIcon: "📦",
    image: "/wireless-earbuds-black-case.jpg",
    category: "Eletrônicos",
    likes: 0,
    comments: 0,
    views: 23,
    isHot: false,
    isFree: true,
    isExpiring: false,
    postedBy: {
      name: "Amazon",
      avatar: "/placeholder.svg",
      level: 9,
    },
    postedAt: "há 7min",
    link: "https://example.com",
  },
  {
    id: "7",
    title: "Conjunto Blusa Tomara Que Caia Com Ajuste Na Lateral E Short",
    description: "Conjunto feminino blusa e short",
    originalPrice: 78.99,
    currentPrice: 0,
    discount: 100,
    store: "Mercado Livre",
    storeIcon: "🛒",
    image: "/women-brown-outfit-set.jpg",
    category: "Moda",
    likes: 0,
    comments: 0,
    views: 67,
    isHot: false,
    isFree: true,
    isExpiring: true,
    postedBy: {
      name: "Mercado Livre",
      avatar: "/placeholder.svg",
      level: 8,
    },
    postedAt: "há 1d",
    link: "https://example.com",
  },
  {
    id: "8",
    title: "Johnson's Baby Sabonete Líquido Glicerina Da Cabeça Aos Pés",
    description: "Sabonete líquido para bebês Johnson's",
    originalPrice: 37.79,
    currentPrice: 0,
    discount: 100,
    store: "Amazon",
    storeIcon: "📦",
    image: "/johnson-baby-soap-bottle-orange.jpg",
    category: "Bebês",
    likes: 0,
    comments: 0,
    views: 34,
    isHot: false,
    isFree: true,
    isExpiring: false,
    postedBy: {
      name: "Amazon",
      avatar: "/placeholder.svg",
      level: 9,
    },
    postedAt: "há 9min",
    link: "https://example.com",
  },
]
