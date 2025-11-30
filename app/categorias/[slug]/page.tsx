"use client"

import { DealFeed } from "@/components/deal-feed"
import { Suspense } from "react"
import { RightSidebar } from "@/components/right-sidebar"
import { useParams } from "next/navigation"

export default function CategoryPage() {
    const params = useParams()
    const slug = params.slug as string

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                <main className="flex-1 p-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900 capitalize">
                                {slug.replace(/-/g, " ")}
                            </h1>
                            <p className="text-gray-600">
                                As melhores ofertas de {slug.replace(/-/g, " ")}
                            </p>
                        </div>
                        <Suspense fallback={<div className="flex justify-center py-12">Loading...</div>}>
                            <DealFeed initialCategory={slug} />
                        </Suspense>
                    </div>
                </main>
                <RightSidebar />
            </div>
        </div>
    )
}
