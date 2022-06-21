import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import { mapAll, getErrorMessage } from '@/config/tests/fixtures'
import { urlCodec } from './url'

it('Should validate the url correctly', () => {
  pipe(
    'https://url.com',
    urlCodec.decode,
    TE.fromEither,
    mapAll(result => expect(result).toBe('https://url.com')),
  )
})

it('Should return an error when the url is invalid', () => {
  pipe(
    'invalid url',
    urlCodec.decode,
    TE.fromEither,
    mapAll(errors => {
      expect(getErrorMessage(errors)).toBe('Invalid url')
    }),
  )
})
