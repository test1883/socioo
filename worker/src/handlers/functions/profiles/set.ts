import { createKysely } from '../../../db/kysely'
import { Env } from '../../../env'
import { Profile } from '../../../models'
import { stringifyProfileForDb } from './utils'

export async function set(profileData: Profile, env: Env) {
  const db = createKysely(env)
  const body = stringifyProfileForDb(profileData)

  await db
    .insertInto('profiles')
    .values(body)
    .onConflict((oc) => oc.column('name').doUpdateSet(body))
    .execute()
}
