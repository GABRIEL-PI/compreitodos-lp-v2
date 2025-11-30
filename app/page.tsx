import { RightSidebar } from "@/components/right-sidebar"
import { DealFeed } from "@/components/deal-feed"
import { Suspense } from "react"


export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      <div className="flex">
        <main className="flex-1 p-4">
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={<div className="flex justify-center py-12">Loading...</div>}>
              <DealFeed />
            </Suspense>
          </div>
        </main>
        <RightSidebar />
      </div>
    </div>
  )
}
