import vine from '@vinejs/vine'

const uniqueMatchQuery = async (db: any, value: string) => {
  const match = await db.from('users').where('email', value).first()
  return !match
}

export const registerValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail().unique(uniqueMatchQuery),
    password: vine.string().minLength(6),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine.string().minLength(6),
  })
)