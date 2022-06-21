import { emailCodec } from './email'
import { pipe } from 'fp-ts/function'
import { mapAll, getErrorMessage } from '@/config/tests/fixtures'
import * as TE from 'fp-ts/TaskEither'

it('Should validate the email correctly', () => {
  pipe(
    'rharison@gmail.com',
    emailCodec.decode,
    TE.fromEither,
    mapAll(result => expect(result).toBe('rharison@gmail.com')),
  )
})

it('Should return an error when the email is invalid', () => {
  pipe(
    'rharison@',
    emailCodec.decode,
    TE.fromEither,
    mapAll(errors => {
      expect(getErrorMessage(errors)).toBe('Invalid email')
    }),
  )
})
