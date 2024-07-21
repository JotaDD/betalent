import vine from '@vinejs/vine'

const uniqueMatchQuery = async (db: any, value: string) => {
  const match = await db.from('customers').where('cpf', value).first()
  return !match
}

export const customerValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(100),
    cpf: vine.string().maxLength(14).unique(uniqueMatchQuery),

    address: vine.object({
      street: vine.string().maxLength(100),
      number: vine.string().maxLength(20),
      complement: vine.string().maxLength(50),
      neighborhood: vine.string().maxLength(50),
      city: vine.string().maxLength(50),
      state: vine.string().maxLength(2),
      cep: vine.string().maxLength(20),
    }),

    phone: vine.object({
      number: vine.string().maxLength(20),
    }),
  })
)
