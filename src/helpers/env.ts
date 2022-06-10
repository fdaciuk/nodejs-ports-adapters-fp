import * as E from 'fp-ts/Either'
import { failure } from 'io-ts/PathReporter'
import { pipe } from 'fp-ts/function'
import { withMessage, NonEmptyString } from 'io-ts-types'

export const env = (value: string) => {
  const envCodec = withMessage(
    NonEmptyString,
    () => `You must set the env var ${value}`,
  )
  return pipe(
    envCodec.decode(process.env[value]),
    E.fold(
      (errors) => { throw new Error(failure(errors).join(':::')) },
      (value) => value,
    ),
  )
}
