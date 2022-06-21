import { emailCodec, urlCodec, slugCodec, passwordCodec } from '../types'
import * as t from 'io-ts'

const userCodecRequired = t.type({
  email: emailCodec,
  username: slugCodec,
})

const userCodecPartial = t.partial({
  token: t.string,
  bio: t.string,
  image: urlCodec,
})

export const userCodec = t.intersection([userCodecRequired, userCodecPartial])

export type User = t.TypeOf<typeof userCodec>
export type UserOutput = t.OutputOf<typeof userCodec>

export const createUserCodec = t.type({
  username: slugCodec,
  email: emailCodec,
  password: passwordCodec,
})

export type CreateUser = t.TypeOf<typeof createUserCodec>
