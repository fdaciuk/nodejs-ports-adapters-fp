import { pipe } from 'fp-ts/function'
import { register, OutsideRegister } from './register'
import { CreateUser } from '../../types/user'
import { unsafeEmail, unsafeSlug, unsafePassword, mapAll } from '@/config/tests/fixtures'

// Usamos Either quando temos algum valor síncrono que possivelmente vai disparar um erro
// type <Either<E, A> = Right<A> | Left<E>

// Usamos Task para funções que retornam uma promise que nunca quebra.
// type Task<A> = Lazy<Promise<A>>

// Usamos o TaskEither para funções uma promise que possivelmente dispara um erro.
// type TaskEither<E, A> = Either<E, Task<A>>

const registerOk: OutsideRegister<string> = async (data) => {
  return `User ${data.username} successfully registered!`
}

const registerFail: OutsideRegister<never> = async () => {
  throw new Error('External error!')
}

const data: CreateUser = {
  username: unsafeSlug('rharison'),
  email: unsafeEmail('rharison.abreu@gmail.com'),
  password: unsafePassword('12345678'),
}

const dataWithWrongUsername: CreateUser = {
  username: unsafeSlug('r'),
  email: unsafeEmail('rharison.abreu@gmail.com'),
  password: unsafePassword('12345678'),
}

const dataWithWrongEmailAndPassword: CreateUser = {
  username: unsafeSlug('rharison'),
  email: unsafeEmail('rharison.abreu@'),
  password: unsafePassword('123456'),
}

it('Should successfully register a user', async () => {
  // const result = await register(registerOk)(data)()
  // if(E.isRight(result)) {
  //   expect(result.right).toBe(`Usuário ${data.username} cadastrado com sucesso!`)
  // }

  return pipe(
    data,
    register(registerOk),
    mapAll(result => expect(result).toBe(`User ${data.username} successfully registered!`)),
  )()
})

it('Should not accept a register from a user with invalid username', async () => {
  return pipe(
    dataWithWrongUsername,
    register(registerOk),
    mapAll(error => expect(error).toEqual(new Error('Invalid slug. Please, use alphanumeric characters, dash and/or numbers.'))),
  )()
})

it('Should not accept a register from a user with invalid email and/or password', async () => {
  return pipe(
    dataWithWrongEmailAndPassword,
    register(registerOk),
    mapAll(error => expect(error).toEqual(new Error('Invalid email:::Password should be at least 8 characters.'))),
  )()
})

it('Should return a Left if register function throws an error', async () => {
  return pipe(
    data,
    register(registerFail),
    mapAll(error => expect(error).toEqual(new Error('External error!'))),
  )()
})
