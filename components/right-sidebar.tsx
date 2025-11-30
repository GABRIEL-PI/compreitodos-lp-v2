"use client"

import { Button } from "@/components/ui/button"
import { QrCode, MessageCircle, ChevronRight, ChevronLeft, Heart } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { getRecentlyViewed } from "@/lib/recent-views"
import type { Deal } from "@/lib/mock-data"
import Link from "next/link"

export function RightSidebar() {
  const [recentDeals, setRecentDeals] = useState<Deal[]>([])

  useEffect(() => {
    // Initial load
    setRecentDeals(getRecentlyViewed())

    // Listen for updates
    const handleUpdate = () => {
      setRecentDeals(getRecentlyViewed())
    }

    window.addEventListener("recentlyViewedUpdated", handleUpdate)
    return () => window.removeEventListener("recentlyViewedUpdated", handleUpdate)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" })
    }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" })
    }
  }

  return (
    <aside className="flex flex-col space-y-4 sticky top-20">


      <div className="bg-transparent">
        <div className="mb-3 px-1">
          <h3 className="text-gray-900 font-bold text-lg">Vistos recentes</h3>
          <p className="text-xs text-gray-400">Suas últimas Pechinchas vistas</p>
        </div>

        {recentDeals.length === 0 ? (
          <p className="text-sm text-gray-500 italic px-1">Nenhum produto visto recentemente.</p>
        ) : (
          <div className="relative group">
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-3 pb-2"
            >
              {recentDeals.map((deal) => (
                <Link
                  href={`/deal/${deal.id}`}
                  key={deal.id}
                  className="min-w-[90%] snap-center flex items-center bg-white p-3 rounded-3xl shadow-sm border border-gray-100 transition-all hover:shadow-md"
                >
                  <div className="w-20 h-20 flex-shrink-0 bg-white rounded-xl overflow-hidden flex items-center justify-center">
                    <img
                      src={deal.image || "/placeholder.svg"}
                      alt={deal.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 ml-3 min-w-0">
                    <p className="text-sm font-bold text-[#0F1111] line-clamp-2 leading-tight mb-1">
                      {deal.title}
                    </p>
                    <div className="flex flex-col">
                      {deal.originalPrice > deal.currentPrice && (
                        <p className="text-xs text-gray-400 line-through">{formatPrice(deal.originalPrice)}</p>
                      )}
                      <p className="text-xl font-bold text-[#0F1111]">{formatPrice(deal.currentPrice)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {recentDeals.length > 1 && (
              <>
                <button
                  onClick={scrollLeft}
                  className="absolute -left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 border border-gray-100 z-10 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={scrollRight}
                  className="absolute -right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 border border-gray-100 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
        <h3 className="text-gray-900 font-medium text-center mb-2">Receba no WhatsApp</h3>
        <p className="text-sm text-gray-600 text-center mb-4">
          Não fique de fora! Entre agora no WhatsApp do Compreitodos.
        </p>
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-900 font-bold text-xs">
              1
            </div>
            <span className="flex-1">Escaneie o QR Code</span>
            <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-gray-700" />
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-900 font-bold text-xs">
              2
            </div>
            <span className="flex-1">Pronto! Já está no grupo</span>
            <Heart className="w-4 h-4 text-green-500 fill-green-500" />
          </div>
        </div>
        {/* QR Code removed as requested */}
        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full"
          onClick={() => window.open("https://chat.whatsapp.com/CLc8JVvk7KT838cWRQHeJF", "_blank")}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Entrar agora
        </Button>
      </div>

      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-900 font-medium flex items-center gap-2">
            <svg className="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
            </svg>
            Cupons de descontos
          </h3>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200 hover:border-gray-300 cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">ML</span>
              </div>
              <span className="text-sm text-gray-900">Mercado Livre</span>
            </div>
          </div>
        </div>
      </div>


    </aside>
  )
}
