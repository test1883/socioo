import { createKysely } from '../../../db/kysely'
import { Env } from '../../../env'
import { Post } from '../../../models'
import { stringifyPostForDb } from './utils'

export async function set(postData: Post, env: Env) {
  const db = createKysely(env)
  const body = stringifyPostForDb(postData)

  await db
    .insertInto('posts')
    .values(body)
    .onConflict((oc) => oc.column('postId').doUpdateSet(body))
    .execute()
}
