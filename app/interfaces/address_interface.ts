export interface AddressInterface {
  id: number
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
  cep: string
  created_at?: string
  updated_at?: string
}

export interface CreateAddress {
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
  cep: string
}

export interface AddressResponse extends AddressInterface {}

export interface UpdateAddress extends CreateAddress {}
