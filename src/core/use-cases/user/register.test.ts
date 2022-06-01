import { pipe } from 'fp-ts/function'
import { register, OutsideRegister } from './register'
import { CreateUser } from '../../types/user'
import { unsafeEmail, mapAllTE } from '@/config/tests/fixtures'

// Usamos Either quando temos algum valor síncrono que possivelmente vai disparar um erro
// type <Either<E, A> = Right<A> | Left<E>

// Usamos Task para funções que retornam uma promise que nunca quebra.
// type Task<A> = Lazy<Promise<A>>

// Usamos o TaskEither para funções uma promise que possivelmente dispara um erro.
// type TaskEither<E, A> = Either<E, Task<A>>

const registerOk: OutsideRegister<string> = async (data) => {
  return `Usuário ${data.username} cadastrado com sucesso!`
}

const data: CreateUser = {
  username: 'rharison',
  email: unsafeEmail('rharison.abreu@gmail.com'),
  password: '12345678',
}

it('Deveria cadastrar um usuário com sucesso', async () => {
  // const result = await register(registerOk)(data)()
  // if(E.isRight(result)) {
  //   expect(result.right).toBe(`Usuário ${data.username} cadastrado com sucesso!`)
  // }

  return pipe(
    data,
    register(registerOk),
    mapAllTE(result => expect(result).toBe(`Usuário ${data.username} cadastrado com sucesso!`)),
  )()
})
