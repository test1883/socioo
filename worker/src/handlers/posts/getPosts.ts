import { createKysely } from '../../db/kysely'
import { Env } from '../../env'
import { parsePostFromDb } from '../functions/posts/utils'

export async function getPosts(env: Env) {
  const db = createKysely(env)
  const posts = await db.selectFrom('posts').selectAll().execute()
  const parsedPosts = parsePostFromDb(posts)

  return Response.json(parsedPosts, {
    status: 200,
  })
}
