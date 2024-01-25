import { createKysely } from '../../../db/kysely'
import { Env } from '../../../env'
import { Profile } from '../../../models'
import { parseProfileFromDb } from './utils'

export async function get(name: string, env: Env): Promise<Profile | null> {
  const db = createKysely(env)
  const record = await db
    .selectFrom('profiles')
    .selectAll()
    .where('name', '=', name)
    .executeTakeFirst()

  if (!record) {
    return null
  }

  return parseProfileFromDb(record)
}
