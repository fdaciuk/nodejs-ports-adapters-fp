import { pipe } from 'fp-ts/function'
import { getErrorMessage, mapAll } from '@/config/tests/fixtures'
import { dateCodec } from './date'
import * as TE from 'fp-ts/TaskEither'

it('Should validate date properly', () => {
  const date = new Date().toISOString()
  pipe(
    date,
    dateCodec.decode,
    TE.fromEither,
    mapAll(result => expect(result).toBe(date)),
  )
})

it('Should not accept a string different from date ISOString', async () => {
  return pipe(
    '11/12/1994',
    dateCodec.decode,
    TE.fromEither,
    mapAll(errors => expect(getErrorMessage(errors)).toBe('Invalid date. Please use date.toISOString().')),
  )()
})
