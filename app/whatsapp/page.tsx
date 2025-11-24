"use client"

import { useState } from "react"
import { MessageCircle, Bell, Users, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const whatsappGroups = [
  {
    id: 1,
    name: "🔥 Promoções Relâmpago",
    description: "As melhores ofertas em tempo real",
    members: 15420,
    category: "geral",
    isActive: true,
  },
  {
    id: 2,
    name: "📱 Tech & Eletrônicos",
    description: "Ofertas exclusivas de tecnologia",
    members: 8930,
    category: "tecnologia",
    isActive: true,
  },
  {
    id: 3,
    name: "👗 Moda & Beleza",
    description: "Descontos em roupas e cosméticos",
    members: 12340,
    category: "moda",
    isActive: true,
  },
  {
    id: 4,
    name: "🏠 Casa & Decoração",
    description: "Ofertas para sua casa",
    members: 6780,
    category: "casa",
    isActive: true,
  },
]

const benefits = [
  {
    icon: <Bell className="w-8 h-8 text-green-600" />,
    title: "Notificações Instantâneas",
    description: "Receba alertas das melhores promoções assim que elas são publicadas",
  },
  {
    icon: <Users className="w-8 h-8 text-blue-600" />,
    title: "Comunidade Ativa",
    description: "Mais de 50.000 pessoas compartilhando as melhores ofertas diariamente",
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-purple-600" />,
    title: "Ofertas Verificadas",
    description: "Todas as promoções são verificadas pela nossa equipe antes de serem enviadas",
  },
]

export default function WhatsAppPage() {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Receba as Melhores <span className="text-green-200">Promoções</span> no WhatsApp
          </h1>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Junte-se a mais de 50.000 pessoas que economizam todos os dias com nossas ofertas exclusivas
          </p>

          {/* Main CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-green-50 font-bold px-8 py-4 text-lg gap-3 animate-pulse"
            >
              <MessageCircle className="w-6 h-6" />
              Entrar no WhatsApp Agora
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 px-8 py-4 bg-transparent"
            >
              Ver Grupos Disponíveis
            </Button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Por que usar o WhatsApp do Compreitodos?</h2>
          <p className="text-muted-foreground text-lg">A forma mais rápida de não perder nenhuma promoção</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* WhatsApp Groups */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Escolha seu Grupo de Interesse</h2>
            <p className="text-muted-foreground text-lg">
              Grupos especializados para você receber apenas o que interessa
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {whatsappGroups.map((group) => (
              <Card
                key={group.id}
                className={`p-6 cursor-pointer transition-all hover:shadow-lg ${selectedGroup === group.id ? "ring-2 ring-green-500 bg-green-50" : ""
                  }`}
                onClick={() => setSelectedGroup(group.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{group.name}</h3>
                    <p className="text-muted-foreground mb-3">{group.description}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {group.members.toLocaleString()} membros
                      </div>
                      {group.isActive && <Badge className="bg-green-100 text-green-700">Ativo</Badge>}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                </div>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700 gap-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    // Handle WhatsApp group join
                  }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Entrar no Grupo
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Como Funciona?</h2>
        </div>

        <div className="space-y-8">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Escolha seus grupos de interesse</h3>
              <p className="text-muted-foreground">
                Selecione as categorias que mais te interessam para receber ofertas personalizadas
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Receba notificações instantâneas</h3>
              <p className="text-muted-foreground">
                Assim que uma nova promoção é encontrada, você recebe no WhatsApp em tempo real
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Aproveite as ofertas</h3>
              <p className="text-muted-foreground">
                Clique no link e aproveite a promoção antes que acabe. Simples assim!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-green-600 text-white py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Não perca mais nenhuma promoção!</h2>
          <p className="text-green-100 text-lg mb-8">Junte-se à maior comunidade de caçadores de promoções do Brasil</p>
          <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 font-bold px-12 py-4 text-lg gap-3">
            <MessageCircle className="w-6 h-6" />
            Começar Agora - É Grátis!
          </Button>
        </div>
      </div>
    </div>
  )
}
