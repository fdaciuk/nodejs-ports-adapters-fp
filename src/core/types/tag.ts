import * as t from 'io-ts'
import { slugCodec } from './scalar'

export const tagCodec = slugCodec
export type Tag = t.TypeOf<typeof tagCodec>
