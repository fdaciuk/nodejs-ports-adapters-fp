import express, { Request, Response } from 'express'
import { registerUser } from '@/adapters/use-cases/user/register-user-adapter'
import { registerArticle } from '@/core/use-cases/article/register-article'
import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import {
  createUserInDB,
  createArticleInDB,
  addCommentToAnArticleInDB,
} from '@/adapters/ports/db'
import { env } from '@/helpers/env'
import { addCommentToAnArticle } from '@/adapters/use-cases/article/add-comment-to-an-article-adapter'
import { verifyToken } from '@/adapters/ports/jwt'

const app = express()

const PORT = env('PORT')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.disable('x-powered-by').disable('etag')

app.post('/api/users', async (req: Request, res: Response) => {
  return pipe(
    req.body.user,
    registerUser(createUserInDB),
    TE.map(result => res.json(result)),
    TE.mapLeft(error => res.status(422).json(getError(error.message))),
  )()
})

app.post('/api/articles', async (req: Request, res: Response) => {
  const token = req.header('authorization')?.replace('Bearer ', '') ?? ''
  const payload = await verifyToken(token)
  const data = {
    ...req.body.article,
    authorId: payload,
  }
  return pipe(
    data,
    registerArticle(createArticleInDB),
    TE.map(result => res.json(result)),
    TE.mapLeft(error => res.status(422).json(getError(error.message))),
  )()
})

app.post('/api/articles/:slug/comments', async (req: Request, res: Response) => {
  return pipe(
    req.body.comment,
    addCommentToAnArticle(addCommentToAnArticleInDB),
    TE.map(result => res.json(result)),
    TE.mapLeft(error => res.status(422).json(getError(error.message))),
  )()
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

function getError (errors: string) {
  return {
    errors: {
      body: errors.split(':::'),
    },
  }
}
