import vine from '@vinejs/vine'

export const productValidator = vine.compile(
  vine.object({
    name: vine.string(),
    quantity: vine.number(),
    price: vine.number(),
    description: vine.string(),
  })
)