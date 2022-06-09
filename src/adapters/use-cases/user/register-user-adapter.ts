import { registerUser as registerUserCore, RegisterUser, OutsideRegister } from '@/core/use-cases/user/register-user'
import { User } from '@/core/types/user'

export const registerUser: RegisterUser = (outsideRegister) => (data) =>
  registerUserCore(outsideRegister)(data)

export type OutsideRegisterType = OutsideRegister<{user: User}>
