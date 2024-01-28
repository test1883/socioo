import { Router, createCors } from 'itty-router'

import { Env } from './env'
import * as names from './handlers/names'
import * as profiles from './handlers/profiles'
import * as comments from './handlers/comments'
import * as posts from './handlers/posts'

const { preflight, corsify } = createCors()
const router = Router()

router
  .all('*', preflight)
  .get('/lookup/*', (request, env) => names.getCcipRead(request, env))
  .get('/get-name/:name', (request, env) => names.getName(request, env))
  .get('/names', (request, env) => names.getNames(env))
  .post('/set-name', (request, env) => names.setName(request, env))
  .get('/get-profile/:name', (request, env) => profiles.getProfile(request, env))
  .get('/profiles', (request, env) => profiles.getProfiles(env))
  .post('/set-profile', (request, env) => profiles.setProfile(request, env))
  .get('/comments/:postId', (request, env) => comments.getComments(request, env))
  .post('/set-comment', (request, env) => comments.setComment(request, env))
  .get('/get-posts/:name', (request, env) => posts.getUserPosts(request, env))
  .get('/posts', (request, env) => posts.getPosts(env))
  .post('/set-post', (request, env) => posts.setPost(request, env))
  .all('*', () => new Response('Not found', { status: 404 }))

// Handle requests to the Worker
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return router.handle(request, env).then(corsify)
  },
}
