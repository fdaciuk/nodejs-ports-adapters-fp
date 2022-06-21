import { passwordCodec } from './password'
import { pipe } from 'fp-ts/function'
import { mapAll, getErrorMessage } from '@/config/tests/fixtures'
import * as TE from 'fp-ts/TaskEither'

it('Should validate password properly', () => {
  pipe(
    '12345678',
    passwordCodec.decode,
    TE.fromEither,
    mapAll(result => expect(result).toBe('12345678')),
  )()
})

it('Should not accept a password less than 8 characters long', () => {
  pipe(
    '1234567',
    passwordCodec.decode,
    TE.fromEither,
    mapAll(errors => {
      expect(getErrorMessage(errors)).toBe('Password should be at least 8 characters.')
    }),
  )()
})
