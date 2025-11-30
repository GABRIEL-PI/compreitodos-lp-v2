"use client"

import { useState } from "react"
import {
    LayoutGrid,
    Smartphone,
    Tv,
    Home,
    Laptop,
    Baby,
    SprayCan, // Using SprayCan as fallback for Perfume
    Apple,
    X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const categories = [
    { id: "smartphones", label: "Smartphones", icon: Smartphone, link: "https://chat.whatsapp.com/CLc8JVvk7KT838cWRQHeJF" },
    { id: "tv", label: "Smart Tv", icon: Tv, link: "https://chat.whatsapp.com/CLc8JVvk7KT838cWRQHeJF" },
    { id: "home", label: "Casa", icon: Home, link: "https://chat.whatsapp.com/CLc8JVvk7KT838cWRQHeJF" },
    { id: "tech", label: "Informática", icon: Laptop, link: "https://chat.whatsapp.com/CLc8JVvk7KT838cWRQHeJF" },
    { id: "kids", label: "Crianças", icon: Baby, link: "https://chat.whatsapp.com/CLc8JVvk7KT838cWRQHeJF" },
    { id: "perfumes", label: "Perfumes", icon: SprayCan, link: "https://chat.whatsapp.com/CLc8JVvk7KT838cWRQHeJF" }, // SprayCan might not exist in all versions, fallback to generic if needed
    { id: "market", label: "Supermercado", icon: Apple, link: "https://chat.whatsapp.com/CLc8JVvk7KT838cWRQHeJF" },
]

export function WhatsAppGroupsWidget() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <button
                        className="group flex items-center gap-3 bg-white pl-4 pr-1 py-1 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                    >
                        <span className="font-semibold text-gray-800 text-sm">Promoções especificas</span>
                        <div className="bg-[var(--primary)] text-white p-2 rounded-full group-hover:opacity-90 transition-opacity">
                            <LayoutGrid className="h-5 w-5" />
                        </div>
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-white border-none shadow-2xl p-0 overflow-hidden rounded-[2rem]">
                    <DialogTitle className="sr-only">Grupos de WhatsApp</DialogTitle>
                    <div className="relative p-8 flex flex-col items-center text-center">
                        {/* Header Icon */}
                        <div className="mb-6 relative">
                            <div className="bg-[var(--primary)] rounded-full p-5 shadow-xl shadow-red-100/50">
                                {/* WhatsApp Icon SVG */}
                                <svg viewBox="0 0 24 24" className="h-10 w-10 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-xl text-gray-800 mb-1 leading-tight">
                            <span className="font-bold">Promoções</span> <span className="font-normal text-gray-500">de produtos</span>
                        </h2>
                        <h2 className="text-xl mb-8 leading-tight">
                            <span className="font-normal text-gray-500">específicos</span> <span className="font-bold text-gray-800">no seu</span> <span className="font-bold text-[#25D366]">WhatsApp</span>.
                        </h2>

                        <p className="text-gray-800 font-bold mb-6 text-lg">
                            Você <span className="text-[var(--primary)]">quer receber</span> promos de que?
                        </p>

                        <div className="grid grid-cols-2 gap-3 w-full">
                            {categories.map((category) => (
                                <a
                                    key={category.id}
                                    href={category.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-2xl hover:border-[var(--primary)]/30 hover:shadow-lg hover:shadow-red-50 transition-all group/btn text-left"
                                >
                                    <div className="bg-[var(--primary)] p-2 rounded-xl text-white group-hover/btn:opacity-90 transition-opacity shadow-sm">
                                        <category.icon className="h-5 w-5" />
                                    </div>
                                    <span className="font-semibold text-gray-700 text-sm">{category.label}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
