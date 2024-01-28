import { createKysely } from '../../db/kysely'
import { Env } from '../../env'
import { parseProfileFromDb } from '../functions/profiles/utils'

export async function getProfiles(env: Env) {
  const db = createKysely(env)
  const profiles = await db.selectFrom('profiles').selectAll().execute()
  const parsedProfiles = parseProfileFromDb(profiles)

  // Simplify the response format
  const formattedProfiles = parsedProfiles.reduce((acc, profile) => {
    return {
      ...acc,
      [profile.name]: {
        followers: profile.followers,
        following: profile.following,
      },
    }
  }, {})

  return Response.json(formattedProfiles, {
    status: 200,
  })
}
