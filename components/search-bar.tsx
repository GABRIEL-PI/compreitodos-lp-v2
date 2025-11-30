"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export function SearchBar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")

    useEffect(() => {
        setSearchQuery(searchParams.get("search") || "")
    }, [searchParams])

    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.push(`/?search=${encodeURIComponent(searchQuery)}`)
        } else {
            router.push("/")
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch()
        }
    }

    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
                placeholder="Busque por lojas e promoções"
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-white/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <Button
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-white/10"
                onClick={handleSearch}
            >
                <Search className="h-4 w-4 text-white" />
            </Button>
        </div>
    )
}
