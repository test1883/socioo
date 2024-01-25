import { CamelCasePlugin, Kysely } from 'kysely'
import { D1Dialect } from 'kysely-d1'

import { Env } from '../env'
import { CommentInKysely, NameInKysely, PostInKysely, ProfileInKysely } from '../models'

export interface Database {
  names: NameInKysely,
  profiles: ProfileInKysely,
  posts: PostInKysely,
  comments: CommentInKysely
}

export function createKysely(env: Env): Kysely<Database> {
  return new Kysely<Database>({
    dialect: new D1Dialect({ database: env.DB }),
    plugins: [new CamelCasePlugin()],
  })
}
