import { Insertable, Selectable } from 'kysely'

import { Post, PostInKysely } from '../../../models'

type SelectableKysely = Selectable<PostInKysely>
type InsertableKysely = Insertable<PostInKysely>

export function parsePostFromDb(flatPost: SelectableKysely): Post
export function parsePostFromDb(flatPost: SelectableKysely[]): Post[]
export function parsePostFromDb(
  flatPost: SelectableKysely | SelectableKysely[]
): Post | Post[] {
  if (Array.isArray(flatPost)) {
    return flatPost.map(parsePost)
  }

  return parsePost(flatPost)

  function parsePost(post: SelectableKysely) {
    return {
      name: post.name,
      post_id: post.postId,
      mints: post.mints ? JSON.parse(post.mints) : undefined,
      files: JSON.parse(post.files),
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }
  }
}

export function stringifyPostForDb(post: Post): InsertableKysely
export function stringifyPostForDb(post: Post[]): InsertableKysely[]
export function stringifyPostForDb(
  post: Post | Post[]
): InsertableKysely | InsertableKysely[] {
  if (Array.isArray(post)) {
    return post.map(stringifyPost)
  }

  return stringifyPost(post)

  function stringifyPost(post: Post) {
    return {
        name: post.name,
        postId: post.post_id,
        mints: post.mints ? JSON.stringify(post.mints) : undefined,
        files: JSON.stringify(post.files),
        updatedAt: new Date().toISOString(),
      }
  }
}
