import * as user from '@/core/user/use-cases/register-user'
import { UserOutput } from '@/core/user/types'

export const registerUser: user.RegisterUser = (outsideRegister) => (data) =>
  user.registerUser(outsideRegister)(data)

export type OutsideRegisterUser = user.OutsideRegisterUser<{user: UserOutput}>
