import { Email } from './email'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

it('Deveria validar o email corretamente', () => {
  pipe(
    'rharison@gmail.com',
    Email.decode,
    E.map(result => expect(result).toBe('rharison@gmail.com')),
  )
})

it('Deveria validat um erro quando o email for inválido', () => {
  pipe(
    'rharison@lucas',
    Email.decode,
    E.mapLeft(error => expect(error[0]?.message).toBe('Invalid email')),
  )
})
