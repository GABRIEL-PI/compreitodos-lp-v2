export interface Product {
    id: number
    title: string
    description?: string
    price: number
    original_price: number | null
    source: string
    image_url: string
    affiliate_url: string
    category: string
    created_at: string
}

export interface Category {
    id: number
    name: string
    slug: string
}

export interface Pagination {
    page: number
    limit: number
    total: number
}

export interface ApiResponse<T> {
    status: string
    message: string
    data: T
}

export interface PaginatedResponse<T> {
    data: T[]
    pagination: Pagination
}

const BASE_URL = "http://localhost:8000/public"

export async function fetchProducts(
    page = 1,
    limit = 20,
    category?: string,
    search?: string,
    sort?: string
): Promise<ApiResponse<PaginatedResponse<Product>>> {
    const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
    })

    if (category) params.append("category", category)
    if (search) params.append("search", search)
    if (sort) params.append("sort", sort)

    const response = await fetch(`${BASE_URL}/products?${params.toString()}`)
    if (!response.ok) {
        throw new Error("Failed to fetch products")
    }
    return response.json()
}

export async function fetchProductById(id: number): Promise<ApiResponse<Product>> {
    const response = await fetch(`${BASE_URL}/products/${id}`)
    if (!response.ok) {
        throw new Error("Failed to fetch product")
    }
    return response.json()
}

export async function fetchCategories(): Promise<ApiResponse<{ data: Category[] }>> {
    const response = await fetch(`${BASE_URL}/categories`)
    if (!response.ok) {
        throw new Error("Failed to fetch categories")
    }
    return response.json()
}
