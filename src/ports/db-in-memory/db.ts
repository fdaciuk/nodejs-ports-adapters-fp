import { OutsideRegisterType } from '@/adapters/use-cases/user/register-user-adapter'
import { OutsideRegisterType as OutsideRegisterArticle } from '@/adapters/use-cases/article/register-article-adapter'
import { OutsideCreateCommentType } from '@/adapters/use-cases/article/add-comment-to-an-article-adapter'
import slugify from 'slugify'

export const outsideRegister: OutsideRegisterType = async (data) => {
  return {
    user: {
      email: data.email,
      token: '',
      username: data.username,
      bio: '',
      image: undefined,
    },
  }
}

export const outsideRegisterArticle: OutsideRegisterArticle = async (data) => {
  const date = new Date().toISOString()
  return {
    article: {
      slug: slugify(data.title, { lower: true }),
      title: data.title,
      description: data.description,
      body: data.body,
      tagList: data.tagList ?? [],
      createdAt: date,
      updatedAt: date,
      favorited: false,
      favoritesCount: 0,
    },
  }
}

export const outsideCreateComment: OutsideCreateCommentType = async (data) => {
  const date = new Date().toISOString()
  return {
    comment: {
      id: Math.random(),
      createdAt: date,
      updatedAt: date,
      body: data.body,
    },
  }
}
