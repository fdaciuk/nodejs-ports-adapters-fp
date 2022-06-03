import { register as registerCore, Register, OutsideRegister } from '@/core/use-cases/user/register-user'
import { User } from '@/core/types/user'

export const register: Register = (outsideRegister) => (data) =>
  registerCore(outsideRegister)(data)

export type OutsideRegisterType = OutsideRegister<{user: User}>
