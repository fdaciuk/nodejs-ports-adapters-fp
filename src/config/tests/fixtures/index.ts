import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { Email } from '../../../core/types/scalar'

type Callback = (a: unknown) => unknown
type MapAllTE = (fn: Callback) => (data: TE.TaskEither<unknown, unknown>) => TE.TaskEither<unknown, unknown>
type MapAllE = (fn: Callback) => (data: E.Either<unknown, unknown>) => E.Either<unknown, unknown>

export function unsafeEmail (value: string): Email {
  return value as any
}

export const mapAllTE: MapAllTE = (fn) => (data) => {
  return pipe(
    data,
    TE.map(fn),
    TE.mapLeft(fn),
  )
}

export const mapAllE: MapAllE = (fn) => (data) => {
  return pipe(
    data,
    E.map(fn),
    E.mapLeft(fn),
  )
}
