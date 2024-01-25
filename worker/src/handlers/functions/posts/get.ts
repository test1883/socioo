import { createKysely } from '../../../db/kysely'
import { Env } from '../../../env'
import { Post } from '../../../models'
import { parsePostFromDb } from './utils'

export async function get(postId: number, env: Env): Promise<Post | null> {
  const db = createKysely(env)
  const record = await db
    .selectFrom('posts')
    .selectAll()
    .where('postId', '=', postId)
    .executeTakeFirst()

  if (!record) {
    return null
  }

  return parsePostFromDb(record)
}
