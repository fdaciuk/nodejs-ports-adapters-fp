import * as t from 'io-ts'
import { profileCodec } from './profile'
import { dateCodec } from './scalar'

export const commentCodec = t.type({
  id: t.number,
  createdAt: dateCodec,
  updatedAt: dateCodec,
  body: t.string,
  author: profileCodec,
})

export type Comment = t.TypeOf<typeof commentCodec>
