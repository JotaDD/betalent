export interface PhoneInterface {
  id: number
  number: string
}

export interface CreatePhone {
  number: string
}

export interface PhoneResponse extends PhoneInterface {}

export interface UpdatePhone extends CreatePhone {}
