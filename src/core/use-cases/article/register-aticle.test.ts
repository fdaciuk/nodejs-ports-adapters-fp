import { pipe } from 'fp-ts/function'
import { CreateArticle } from '@/core/types/article'
import { registerArticle, OutsideRegisterArticle } from './register-article'
import { mapAll, unsafe } from '@/config/tests/fixtures'

const data: CreateArticle = {
  title: 'Article title',
  body: 'Article body',
  description: 'Article description',
  authorId: unsafe('38359046-9c21-4a1a-b821-0a5ef30ea462'),
}

const dataWithTagList: CreateArticle = {
  title: 'Article title 2',
  body: 'Article body 2',
  description: 'Article description 2',
  tagList: [unsafe('tag1'), unsafe('tag2')],
  authorId: unsafe('38359046-9c21-4a1a-b821-0a5ef30ea462'),
}

const dataWithInvalidTagList: CreateArticle = {
  title: 'Article title 3',
  body: 'Article body 3',
  description: 'Article description 3',
  tagList: [unsafe('Tag3'), unsafe('5tag4')],
  authorId: unsafe('38359046-9c21-4a1a-b821-0a5ef30ea462'),
}

const dataWithInvalidTitle: CreateArticle = {
  title: unsafe(2),
  body: 'Article body 4',
  description: 'Article description 4',
  authorId: unsafe('38359046-9c21-4a1a-b821-0a5ef30ea462'),
}

const dataWithInvalidBody: CreateArticle = {
  title: 'Article title 5',
  body: unsafe(3),
  description: 'Article description 4',
  authorId: unsafe('38359046-9c21-4a1a-b821-0a5ef30ea462'),
}

const dataWithInvalidDescription: CreateArticle = {
  title: 'Article title 6',
  body: 'Article body 6',
  description: unsafe(4),
  authorId: unsafe('38359046-9c21-4a1a-b821-0a5ef30ea462'),
}

const dataWithInvalidAuthorId: CreateArticle = {
  title: 'Article title',
  body: 'Article body',
  description: 'Article description',
  authorId: unsafe('123'),
}

const registerOk: OutsideRegisterArticle<string> = async (data: CreateArticle) => {
  return `Article ${data.title} successfully created!`
}

const registerFail: OutsideRegisterArticle<never> = async () => {
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

it('Should not acecpt article register if tagList has invalid slugs', () => {
  return pipe(
    dataWithInvalidTagList,
    registerArticle(registerOk),
    mapAll(result => {
      expect(result).toEqual(new Error('Invalid slug. Please, use alphanumeric characters, dash and/or numbers.:::Invalid slug. Please, use alphanumeric characters, dash and/or numbers.'))
    }),
  )()
})

it('Should not accept article register if title is invalid', () => {
  return pipe(
    dataWithInvalidTitle,
    registerArticle(registerOk),
    mapAll(result => expect(result).toEqual(new Error('Invalid title'))),
  )()
})

it('Should not accept article register if body is invalid', () => {
  return pipe(
    dataWithInvalidBody,
    registerArticle(registerOk),
    mapAll(result => expect(result).toEqual(new Error('Invalid body'))),
  )()
})

it('Should not accept article register if description is invalid', () => {
  return pipe(
    dataWithInvalidDescription,
    registerArticle(registerOk),
    mapAll(result => expect(result).toEqual(new Error('Invalid description'))),
  )()
})

it('Should not accept article register if authorId is invalid', async () => {
  return pipe(
    dataWithInvalidAuthorId,
    registerArticle(registerOk),
    mapAll(result => expect(result).toEqual(new Error('Invalid authorId'))),
  )()
})

it('Should not register the article if outsideRegister functions throws an  error', async () => {
  return pipe(
    data,
    registerArticle(registerFail),
    mapAll(result => expect(result).toEqual(new Error('External error!'))),
  )()
})
