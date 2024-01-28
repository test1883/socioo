import { createKysely } from '../../db/kysely'
import { Env } from '../../env'
import { parseCommentFromDb } from '../functions/comments/utils'

export async function getComments(postId: number ,env: Env) {
  const db = createKysely(env)
  const comments = await db.selectFrom('comments').selectAll().where('postId', '=', postId).execute()
  const parsedComments = parseCommentFromDb(comments)

  return Response.json(parsedComments, {
    status: 200,
  })
}
