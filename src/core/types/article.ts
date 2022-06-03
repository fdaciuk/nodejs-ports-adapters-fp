import { profileCodec } from './profile'
import { tagCodec } from './tag'
import { slugCodec, dateCodec, positiveCodec } from './scalar'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

export const articleCodec = t.type({
  slug: slugCodec,
  title: t.string,
  description: t.string,
  body: t.string,
  tagList: t.array(tagCodec),
  createdAt: dateCodec,
  updatedAt: dateCodec,
  favorited: t.boolean,
  favoritesCount: positiveCodec,
  author: profileCodec,
})

export type Article = t.TypeOf<typeof articleCodec>

export const articlesCodec = t.type({
  articles: t.array(articleCodec),
  articlesCount: positiveCodec,
})

export type Articles = t.TypeOf<typeof articlesCodec>

const createArticleRequired = t.type({
  title: withMessage(t.string, () => 'Invalid title'),
  description: withMessage(t.string, () => 'Invalid description'),
  body: withMessage(t.string, () => 'Invalid body'),
})

const createArticleOptional = t.partial({
  tagList: t.array(tagCodec),
})

export const createArticleCodec = t.intersection([createArticleRequired, createArticleOptional])

export type CreateArticle = t.TypeOf<typeof createArticleCodec>
