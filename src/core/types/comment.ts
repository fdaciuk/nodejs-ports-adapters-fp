import * as t from 'io-ts'
import { withMessage, NonEmptyString } from 'io-ts-types'
import { profileCodec } from './profile'
import { dateCodec } from './scalar'

export const commentCodec = t.type({
  id: t.number,
  createdAt: dateCodec,
  updatedAt: dateCodec,
  body: t.string,
  author: profileCodec,
})

export const createCommentCodec = t.type({
  body: withMessage(
    NonEmptyString,
    () => 'The body of the comment must not be empty.',
  ),
})

export type Comment = t.TypeOf<typeof commentCodec>
export type OutputComment = t.OutputOf<typeof commentCodec>
export type CreateComment = t.TypeOf<typeof createCommentCodec>
