import { Insertable, Selectable } from 'kysely'

import { Comment, CommentInKysely } from '../../../models'

type SelectableKysely = Selectable<CommentInKysely>
type InsertableKysely = Insertable<CommentInKysely>

export function parseCommentFromDb(flatComment: SelectableKysely): Comment
export function parseCommentFromDb(flatComment: SelectableKysely[]): Comment[]
export function parseCommentFromDb(
  flatComment: SelectableKysely | SelectableKysely[]
): Comment | Comment[] {
  if (Array.isArray(flatComment)) {
    return flatComment.map(parseComment)
  }

  return parseComment(flatComment)

  function parseComment(comment: SelectableKysely) {
    return {
      name: comment.name,
      owner: comment.owner,
      post_id: comment.postId,
      comment: comment.comment,
      comment_id: comment.commentId,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt
    }
  }
}

export function stringifyCommentForDb(comment: Comment): InsertableKysely
export function stringifyCommentForDb(comment: Comment[]): InsertableKysely[]
export function stringifyCommentForDb(
  comment: Comment | Comment[]
): InsertableKysely | InsertableKysely[] {
  if (Array.isArray(comment)) {
    return comment.map(stringifyComment)
  }

  return stringifyComment(comment)

  function stringifyComment(comment: Comment) {
    return {
        name: comment.name,
        owner: comment.owner,
        postId: comment.post_id,
        comment: comment.comment,
        commentId: comment.comment_id,
        updatedAt: new Date().toISOString(),
      }
  }
}
