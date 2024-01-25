import { createKysely } from '../../../db/kysely'
import { Env } from '../../../env'
import { Comment } from '../../../models'
import { parseCommentFromDb } from './utils'

export async function get(name: string, postId: number, commentId: number, env: Env): Promise<Comment | null> {
  const db = createKysely(env)
  const record = await db
    .selectFrom('comments')
    .selectAll()
    .where('name', '=', name)
    .where('postId', '=', postId)
    .where('commentId', '=', commentId)
    .executeTakeFirst()

  if (!record) {
    return null
  }

  return parseCommentFromDb(record)
}
