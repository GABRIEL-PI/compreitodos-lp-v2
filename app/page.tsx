import { RightSidebar } from "@/components/right-sidebar"
import { DealFeed } from "@/components/deal-feed"
import { Suspense } from "react"


export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      <div className="container mx-auto flex gap-6 p-4">
        <main className="flex-1 min-w-0">
          <Suspense fallback={<div className="flex justify-center py-12">Loading...</div>}>
            <DealFeed />
          </Suspense>
        </main>
        <div className="hidden xl:block w-80 shrink-0">
          <RightSidebar />
        </div>
      </div>
    </div>
  )
}
