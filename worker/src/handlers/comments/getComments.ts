import { IRequest } from 'itty-router'
import zod from 'zod'

import { createKysely } from '../../db/kysely'
import { Env } from '../../env'
import { parseCommentFromDb } from '../functions/comments/utils'

export async function getComments(request: IRequest ,env: Env) {

  const schema = zod.object({
    postId: zod.number(),
  })
  const safeParse = schema.safeParse(request.params)

  if (!safeParse.success) {
    const response = { error: safeParse.error }
    return Response.json(response, { status: 400 })
  }

  const { postId } = safeParse.data

  const db = createKysely(env)
  const comments = await db.selectFrom('comments').selectAll().where('postId', '=', postId).execute()
  const parsedComments = parseCommentFromDb(comments)

  return Response.json(parsedComments, {
    status: 200,
  })
}
