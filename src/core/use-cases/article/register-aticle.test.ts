import { pipe } from 'fp-ts/function'
import { CreateArticle } from '@/core/types/article'
import { registerArticle, OutsideRegister } from './register-article'
import { mapAll, unsafeSlug, unsafeString } from '@/config/tests/fixtures'

const data: CreateArticle = {
  title: 'Article title',
  body: 'Article body',
  description: 'Article description',
}

const dataWithTagList: CreateArticle = {
  title: 'Article title 2',
  body: 'Article body 2',
  description: 'Article description 2',
  tagList: [unsafeSlug('tag1'), unsafeSlug('tag2')],
}

const dataWithInvalidTagList: CreateArticle = {
  title: 'Article title 3',
  body: 'Article body 3',
  description: 'Article description 3',
  tagList: [unsafeSlug('Tag3'), unsafeSlug('5tag4')],
}

const dataWithInvalidTitle: CreateArticle = {
  title: unsafeString(2),
  body: 'Article body 4',
  description: 'Article description 4',
}

const dataWithInvalidBody: CreateArticle = {
  title: 'Article title 5',
  body: unsafeString(3),
  description: 'Article description 4',
}

const dataWithInvalidDescription: CreateArticle = {
  title: 'Article title 6',
  body: 'Article body 6',
  description: unsafeString(4),
}

const registerOk: OutsideRegister<string> = async (data: CreateArticle) => {
  return `Article ${data.title} successfully created!`
}

const registerFail: OutsideRegister<never> = async () => {
  throw new Error('External error!')
}

it('Should create an article', async () => {
  return pipe(
    data,
    registerArticle(registerOk),
    mapAll(result => expect(result).toBe(`Article ${data.title} successfully created!`)),
  )()
})

it('Should create an article with tagList properly', () => {
  return pipe(
    dataWithTagList,
    registerArticle(registerOk),
    mapAll(result => expect(result).toBe(`Article ${dataWithTagList.title} successfully created!`)),
  )()
})

it('Should note acecpt article register if tagList has invalid slugs', () => {
  return pipe(
    dataWithInvalidTagList,
    registerArticle(registerOk),
    mapAll(result => {
      expect(result).toEqual(new Error('Invalid slug. Please, use alphanumeric characters, dash and/or numbers.:::Invalid slug. Please, use alphanumeric characters, dash and/or numbers.'))
    }),
  )()
})

it('Should note accept article register if title is invalid', () => {
  return pipe(
    dataWithInvalidTitle,
    registerArticle(registerOk),
    mapAll(result => expect(result).toEqual(new Error('Invalid title'))),
  )()
})

it('Should note accept article register if body is invalid', () => {
  return pipe(
    dataWithInvalidBody,
    registerArticle(registerOk),
    mapAll(result => expect(result).toEqual(new Error('Invalid body'))),
  )()
})

it('Should note accept article register if description is invalid', () => {
  return pipe(
    dataWithInvalidDescription,
    registerArticle(registerOk),
    mapAll(result => expect(result).toEqual(new Error('Invalid description'))),
  )()
})

it('Should not register the article if outsideRegister functions throws an  error', async () => {
  return pipe(
    data,
    registerArticle(registerFail),
    mapAll(result => expect(result).toEqual(new Error('External error!'))),
  )()
})
