import { ColumnType, Generated } from 'kysely'
import z from 'zod'

export const ZodName = z.object({
  name: z.string().regex(/^[a-z0-9-.]+$/),
  owner: z.string(),
  addresses: z.record(z.string()).optional(),
  texts: z.record(z.string()).optional(),
  contenthash: z.string().optional(),
})

export const ZodProfile = z.object({
  name: z.string().regex(/^[a-z0-9-.]+$/),
  followers: z.record(z.string()).optional(),
  following: z.record(z.string()).optional()
})

export const ZodPost = z.object({
  name: z.string().regex(/^[a-z0-9-.]+$/),
  post_id: z.number(),
  mints: z.record(z.string()).optional(),
  files: z.record(z.string()),
})

export const ZodComment = z.object({
  owner: z.string().regex(/^[a-z0-9-.]+$/),
  name: z.string().regex(/^[a-z0-9-.]+$/),
  post_id: z.number(),
  comment: z.string(),
  comment_id: z.number(),
})

export const ZodNameWithSignature = ZodName.extend({
  signature: z.object({
    hash: z.string(),
    message: z.string(),
  }),
})

export const ZodProfileWithSignature = ZodProfile.extend({
  signature: z.object({
    hash: z.string(),
    message: z.string(),
  }),
})

export const ZodPostWithSignature = ZodPost.extend({
  signature: z.object({
    hash: z.string(),
    message: z.string(),
  }),
})

export const ZodCommentWithSignature = ZodComment.extend({
  signature: z.object({
    hash: z.string(),
    message: z.string(),
  }),
})

export type Name = z.infer<typeof ZodName>
export type Profile = z.infer<typeof ZodProfile>
export type Post = z.infer<typeof ZodPost>
export type Comment = z.infer<typeof ZodComment>

export type NameWithSignature = z.infer<typeof ZodNameWithSignature>
export type ProfileWithSignature = z.infer<typeof ZodProfileWithSignature>
export type PostWithSignature = z.infer<typeof ZodPostWithSignature>
export type CommentWithSignature = z.infer<typeof ZodCommentWithSignature>

export interface NameInKysely {
  name: string
  owner: string
  addresses: string | null // D1 doesn't support JSON yet, we'll have to parse it manually
  texts: string | null // D1 doesn't support JSON yet, we'll have to parse it manually
  contenthash: string | null
  createdAt: ColumnType<Date, never, never>
  updatedAt: ColumnType<Date, never, string | undefined>
}

export interface ProfileInKysely {
  name: string,
  followers: string | null,
  following: string | null
}

export interface PostInKysely {
  name: string,
  postId: number,
  mints: string | null,
  files: string,
  createdAt: ColumnType<Date, never, never>
  updatedAt: ColumnType<Date, never, string | undefined>
}

export interface CommentInKysely {
  owner: string,
  name: string,
  postId: number,
  comment: string,
  commentId: number,
  createdAt: ColumnType<Date, never, never>
  updatedAt: ColumnType<Date, never, string | undefined>
}