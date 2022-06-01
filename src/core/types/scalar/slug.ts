import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type SlugBrand = {
  readonly Slug: unique symbol
}

export const slugCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, SlugBrand> => isSlug(value),
    'Slug',
  ),
  () => 'Invalid slug. Please, use alphanumeric characters, dash and/or numbers.',
)

export type Slug = t.TypeOf<typeof slugCodec>

function isSlug (value: string) {
  return /^[a-z][a-z0-9-]+?[a-z0-9]$/.test(value)
}
