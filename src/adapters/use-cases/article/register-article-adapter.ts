import {
  registerArticle as registerArticleCore,
  OutsideRegister,
  RegisterAticle,
} from '../../../core/use-cases/article/register-article'
import { Article } from '../../../core/types/article'

export const registerArticleAdapter: RegisterAticle = (outsideRegister) => (data) =>
  registerArticleCore(outsideRegister)(data)

export type OutsideRegisterType = OutsideRegister<{article: Article}>
