import { outsideRegister, outsideRegisterArticle } from '@/ports/db-in-memory/db'
import { OutsideRegisterType } from '@/adapters/use-cases/user/register-user-adapter'
import { OutsideRegisterType as OutsideRegisterArticle } from '@/adapters/use-cases/article/register-article-adapter'

export const userRegister: OutsideRegisterType = async (data) => {
  return outsideRegister(data)
}

export const articleRegister: OutsideRegisterArticle = async (data) => {
  return outsideRegisterArticle(data)
}
