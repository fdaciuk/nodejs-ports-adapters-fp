import * as article from './register-article'
import { ArticleOutput } from '../types'

export const registerArticleAdapter: article.RegisterAticle = (outsideRegister) => (data) =>
  article.registerArticle(outsideRegister)(data)

export type OutsideRegisterArticle = article.OutsideRegisterArticle<{article: ArticleOutput}>
