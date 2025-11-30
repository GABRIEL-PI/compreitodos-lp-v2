import type { Deal } from "@/lib/mock-data"

const STORAGE_KEY = "recently_viewed_products"
const MAX_ITEMS = 5

export function addToRecentlyViewed(deal: Deal) {
    if (typeof window === "undefined") return

    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        let items: Deal[] = stored ? JSON.parse(stored) : []

        // Remove if already exists (to move to top)
        items = items.filter((item) => item.id !== deal.id)

        // Add to beginning
        items.unshift(deal)

        // Limit to MAX_ITEMS
        items = items.slice(0, MAX_ITEMS)

        localStorage.setItem(STORAGE_KEY, JSON.stringify(items))

        // Dispatch event for other components to update
        window.dispatchEvent(new Event("recentlyViewedUpdated"))
    } catch (error) {
        console.error("Failed to save recently viewed item:", error)
    }
}

export function getRecentlyViewed(): Deal[] {
    if (typeof window === "undefined") return []

    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? JSON.parse(stored) : []
    } catch (error) {
        console.error("Failed to get recently viewed items:", error)
        return []
    }
}
