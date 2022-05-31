import { Profile } from './profile'
import { Tag } from './tag'

export type Article = {
  slug: string
  title: string
  description: string
  body: string
  tagList: Tag[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: Profile
}

export type Articles = {
  articles: Article[]
  articlesCount: number
}
