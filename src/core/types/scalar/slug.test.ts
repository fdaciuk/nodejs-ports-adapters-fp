import { pipe } from 'fp-ts/function'
import { mapAllE } from '@/config/tests/fixtures'
import { slugCodec } from './slug'

it('Should validate slug properly', () => {
  pipe(
    'valid-slug',
    slugCodec.decode,
    mapAllE(result => expect(result).toBe('valid-slug')),
  )
})

it('Should accept 3 or more characters', () => {
  pipe(
    'val',
    slugCodec.decode,
    mapAllE(result => expect(result).toBe('val')),
  )
})

it('Should not accept numbers at the begining of the slug', () => {
  pipe(
    '8ivalid-slug',
    slugCodec.decode,
    mapAllE(error => {
      const errorMessage: string = Array.isArray(error) ? error[0]?.message : ''
      expect(errorMessage).toBe('Invalid slug. Please, use alphanumeric characters, dash and/or numbers.')
    }),
  )
})

it('Should not accept dashes at the end of the slug', () => {
  pipe(
    'ivalid-slug-',
    slugCodec.decode,
    mapAllE(error => {
      const errorMessage: string = Array.isArray(error) ? error[0]?.message : ''
      expect(errorMessage).toBe('Invalid slug. Please, use alphanumeric characters, dash and/or numbers.')
    }),
  )
})

it('Should not accept less than 3 characters', () => {
  pipe(
    'iv',
    slugCodec.decode,
    mapAllE(error => {
      const errorMessage: string = Array.isArray(error) ? error[0]?.message : ''
      expect(errorMessage).toBe('Invalid slug. Please, use alphanumeric characters, dash and/or numbers.')
    }),
  )
})
