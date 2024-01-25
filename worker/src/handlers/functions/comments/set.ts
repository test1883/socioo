import { createKysely } from '../../../db/kysely'
import { Env } from '../../../env'
import { Comment } from '../../../models'
import { stringifyCommentForDb } from './utils'

export async function set(commentData: Comment, env: Env) {
  const db = createKysely(env)
  const body = stringifyCommentForDb(commentData)

  await db
    .insertInto('comments')
    .values(body)
    .onConflict((oc) => oc
        .column('commentId')
        .where('postId', '=', body.postId)
        .where('owner', '=', body.owner)
        .doUpdateSet(body)
    )
    .execute()
}
