import vine from '@vinejs/vine'

export const updateProductValidator = vine.compile(
  vine.object({
    name: vine.string(),
    quantity: vine.number(),
    price: vine.number(),
    description: vine.string(),
    isActive: vine.boolean(),
  })
)
export const createProductValidator = vine.compile(
  vine.object({
    name: vine.string(),
    quantity: vine.number(),
    price: vine.number(),
    description: vine.string(),
  })
)
