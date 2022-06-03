import { outsideRegister } from '@/ports/db-in-memory/db'
import { OutsideRegisterType } from '@/adapters/use-cases/user/register-user-adapter'

export const userRegister: OutsideRegisterType = async (data) => {
  return outsideRegister(data)
}
