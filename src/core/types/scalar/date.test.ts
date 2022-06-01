import { pipe } from 'fp-ts/function'
import { mapAllE } from '@/config/tests/fixtures'
import { dateCodec } from './date'

it('Should validate date properly', () => {
  const date = new Date().toISOString()
  pipe(
    date,
    dateCodec.decode,
    mapAllE(result => expect(result).toBe(date)),
  )
})
