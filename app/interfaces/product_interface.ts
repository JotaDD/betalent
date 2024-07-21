export interface CreateProduct {
  name: string
  quantity: number
  price: number
  description: string
}

export interface UpdateProduct extends CreateProduct {}

export interface ProductInterface {
  id: number
  name: string
  quantity: number
  price: number
  description: string
  created_at?: string
  updated_at?: string
}
