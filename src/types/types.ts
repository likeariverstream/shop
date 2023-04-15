export interface Regularprice {
    currency: string
    value: number
}

export interface Product {
    type: string
    id: number
    sku: string
    title: string
    regular_price: Regularprice
    image: string
    brand: number

}
export type Products = Array<Product>
export interface Brand {
    id: number
    title: string
    sort: string
    code: string
  }

export interface Active extends Brand {
    active?: boolean
}

export interface ProductWithCount extends Product {
    count?: number
}
