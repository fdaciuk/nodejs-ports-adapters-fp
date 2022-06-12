import * as article from '../../../core/use-cases/article/register-article'
import { ArticleOutput } from '../../../core/types/article'

export const registerArticleAdapter: article.RegisterAticle = (outsideRegister) => (data) =>
  article.registerArticle(outsideRegister)(data)

export type OutsideRegisterArticle = article.OutsideRegisterArticle<{article: ArticleOutput}>
