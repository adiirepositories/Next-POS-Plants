export interface Product {
	id: number
	productName: string
	title: string
	description: string
	price: number
	discountPercentage: number
	rating: number
	stock: number
	brand: string
	category: string
	thumbnail: string
	images: string[]
	quantity?: number
}


export interface ProductList {
	id: number
	title: string
	description: string
	price: number
	discountPercentage: number
	rating: number
	stock: number
	brand: string
	category: string
	thumbnail: string
	// images: string[]
	// quantity?: number
}

export type DateType = Date | null | undefined


export type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
