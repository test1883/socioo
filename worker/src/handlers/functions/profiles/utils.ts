import { Insertable, Selectable } from 'kysely'

import { Profile, ProfileInKysely } from '../../../models'

type SelectableKysely = Selectable<ProfileInKysely>
type InsertableKysely = Insertable<ProfileInKysely>

export function parseProfileFromDb(flatProfile: SelectableKysely): Profile
export function parseProfileFromDb(flatProfile: SelectableKysely[]): Profile[]
export function parseProfileFromDb(
  flatProfile: SelectableKysely | SelectableKysely[]
): Profile | Profile[] {
  if (Array.isArray(flatProfile)) {
    return flatProfile.map(parseProfile)
  }

  return parseProfile(flatProfile)

  function parseProfile(profile: SelectableKysely) {
    return {
      name: profile.name,
      followers: profile.followers ? JSON.parse(profile.followers) : undefined,
      following: profile.following ? JSON.parse(profile.following) : undefined,
      currentChallenge: profile.currentChallenge
    }
  }
}

export function stringifyProfileForDb(profile: Profile): InsertableKysely
export function stringifyProfileForDb(profile: Profile[]): InsertableKysely[]
export function stringifyProfileForDb(
  profile: Profile | Profile[]
): InsertableKysely | InsertableKysely[] {
  if (Array.isArray(profile)) {
    return profile.map(stringifyProfile)
  }

  return stringifyProfile(profile)

  function stringifyProfile(profile: Profile) {
    return {
        name: profile.name,
        followers: profile.followers ? JSON.stringify(profile.followers) : undefined,
        following: profile.following ? JSON.stringify(profile.following) : undefined,
        currentChallenge: profile.current_challenge
      }
  }
}
