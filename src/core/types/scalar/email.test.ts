import { emailCodec } from './email'
import { pipe } from 'fp-ts/function'
import { mapAllE } from '@/config/tests/fixtures'

it('Deveria validar o email corretamente', () => {
  pipe(
    'rharison@gmail.com',
    emailCodec.decode,
    mapAllE(result => expect(result).toBe('rharison@gmail.com')),
  )
})

it('Deveria validar um erro quando o email for inválido', () => {
  pipe(
    'rharison@',
    emailCodec.decode,
    mapAllE(error => {
      const errorMessage: string = Array.isArray(error) ? error[0]?.message : ''
      expect(errorMessage).toBe('Invalid email')
    }),
  )
})
