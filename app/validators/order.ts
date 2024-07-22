import vine from '@vinejs/vine'

export const createOrderValidator = vine.compile(
  vine.object({
    customerId: vine.string(),
    productId: vine.string(),
    quantity: vine.number(),
    unitPrice: vine.number().optional(),
  })
)
