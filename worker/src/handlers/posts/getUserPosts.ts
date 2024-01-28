import { IRequest } from 'itty-router'
import zod from 'zod'

import { createKysely } from '../../db/kysely'
import { Env } from '../../env'
import { parsePostFromDb } from '../functions/posts/utils'

export async function getUserPosts(request: IRequest ,env: Env) {

  const schema = zod.object({
    name: zod.string().regex(/^[a-z0-9-.]+$/),
  })
  const safeParse = schema.safeParse(request.params)

  if (!safeParse.success) {
    const response = { error: safeParse.error }
    return Response.json(response, { status: 400 })
  }

  const { name } = safeParse.data

  const db = createKysely(env)
  const posts = await db.selectFrom('posts').selectAll().where('name', '=', name).execute()
  const parsedPosts = parsePostFromDb(posts)

  return Response.json(parsedPosts, {
    status: 200,
  })
}
