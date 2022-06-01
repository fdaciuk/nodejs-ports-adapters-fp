import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type EmailBrand = {
  readonly Email: unique symbol
}

export const Email = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, EmailBrand> => isEmail(value),
    'Email',
  ),
  () => 'Invalid email',
)

function isEmail (value: string) {
  return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(value)
}
