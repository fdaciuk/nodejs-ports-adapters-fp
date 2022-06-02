import { pipe } from 'fp-ts/function'
import { mapAll, getErrorMessage } from '@/config/tests/fixtures'
import { slugCodec } from './slug'
import * as TE from 'fp-ts/TaskEither'

it('Should validate slug properly', () => {
  pipe(
    'valid-slug',
    slugCodec.decode,
    TE.fromEither,
    mapAll(result => expect(result).toBe('valid-slug')),
  )
})

it('Should accept 3 or more characters', () => {
  pipe(
    'val',
    slugCodec.decode,
    TE.fromEither,
    mapAll(result => expect(result).toBe('val')),
  )
})

it('Should not accept numbers at the begining of the slug', () => {
  pipe(
    '8ivalid-slug',
    slugCodec.decode,
    TE.fromEither,
    mapAll(errors => {
      expect(getErrorMessage(errors)).toBe('Invalid slug. Please, use alphanumeric characters, dash and/or numbers.')
    }),
  )
})

it('Should not accept dashes at the end of the slug', () => {
  pipe(
    'ivalid-slug-',
    slugCodec.decode,
    TE.fromEither,
    mapAll(errors => {
      expect(getErrorMessage(errors)).toBe('Invalid slug. Please, use alphanumeric characters, dash and/or numbers.')
    }),
  )
})

it('Should not accept less than 3 characters', () => {
  pipe(
    'iv',
    slugCodec.decode,
    TE.fromEither,
    mapAll(errors => {
      expect(getErrorMessage(errors)).toBe('Invalid slug. Please, use alphanumeric characters, dash and/or numbers.')
    }),
  )
})
