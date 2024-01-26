import type { IRequest } from 'itty-router'
import zod from 'zod'

import { Env } from '../../env'
import { get } from '../functions/profiles/get'

export async function getProfile(request: IRequest, env: Env) {
  const schema = zod.object({
    name: zod.string().regex(/^[a-z0-9-.]+$/),
  })
  const safeParse = schema.safeParse(request.params)

  if (!safeParse.success) {
    const response = { error: safeParse.error }
    return Response.json(response, { status: 400 })
  }

  const { name } = safeParse.data
  const profileData = await get(name, env)

  if (profileData === null) {
    return new Response('Profile not found', { status: 404 })
  }

  return Response.json(profileData, {
    status: 200,
  })
}
