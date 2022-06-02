import { positiveCodec } from './positive'
import { pipe } from 'fp-ts/function'
import { mapAll, getErrorMessage } from '@/config/tests/fixtures'
import * as TE from 'fp-ts/TaskEither'

it('Should validate positive number properly', () => {
  pipe(
    1,
    positiveCodec.decode,
    TE.fromEither,
    mapAll(result => expect(result).toBe(1)),
  )()
})

it('Should accept zero', () => {
  pipe(
    0,
    positiveCodec.decode,
    TE.fromEither,
    mapAll(result => expect(result).toBe(0)),
  )()
})

it('Should not accept a number less than zero', () => {
  pipe(
    -1,
    positiveCodec.decode,
    TE.fromEither,
    mapAll(errors => {
      expect(getErrorMessage(errors)).toBe('This number should be grater than zero.')
    }),
  )()
})
