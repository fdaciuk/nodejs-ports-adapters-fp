import {
  registerArticle as registerArticleCore,
  OutsideRegister,
  RegisterAticle,
} from '../../../core/use-cases/article/register-article'
import { ArticleOutput } from '../../../core/types/article'

export const registerArticleAdapter: RegisterAticle = (outsideRegister) => (data) =>
  registerArticleCore(outsideRegister)(data)

export type OutsideRegisterType = OutsideRegister<{article: ArticleOutput}>
