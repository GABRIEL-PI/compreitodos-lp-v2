"use client"

import { Button } from "@/components/ui/button"
import { QrCode, MessageCircle, ChevronRight, Heart } from "lucide-react"

export function RightSidebar() {
  return (
    <aside className="hidden xl:flex w-80 flex-col space-y-4 p-4 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto bg-gray-50">


      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
        <div className="mb-3">
          <h3 className="text-gray-900 font-medium">Vistos recentes</h3>
          <p className="text-xs text-gray-500">Suas últimas ofertas vistas</p>
        </div>
        <div className="flex items-start gap-3">
          <img src="/aperitivo-bitter-campari.jpg" alt="Kit de Cuecas" className="w-16 h-16 rounded object-cover" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
              Kit 10 Cuecas Sandrini Boxer Polo 100%...
            </p>
            <p className="text-xs text-gray-500 line-through">R$ 89,90</p>
            <p className="text-lg font-bold text-red-600">R$ 59,99</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
        </div>
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
              <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm13-2h-2v2h2v-2zm-2 2h-2v2h2v-2zm2 2h-2v2h2v-2zm0-6h-2v2h2V9zm2 4h2v-2h-2v2zm0-4h2V7h-2v2zm-4-4h2V3h-2v2zm4 10h-2v2h2v-2zm-2 2h-2v2h2v-2z" />
              </svg>
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
        <div className="w-32 h-32 mx-auto bg-white rounded-lg p-2 mb-4 flex items-center justify-center border border-gray-200">
          <div className="w-full h-full border-2 border-gray-300 rounded flex items-center justify-center">
            <QrCode className="h-16 w-16 text-gray-800" />
          </div>
        </div>
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full">
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
