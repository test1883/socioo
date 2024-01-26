import { verifyMessage } from 'ethers/lib/utils'
import { IRequest } from 'itty-router'

import { Env } from '../../env'
import { ZodProfileWithSignature } from '../../models'
import { get } from '../functions/names/get'
import { set } from '../functions/profiles/set'

export async function setProfile(request: IRequest, env: Env): Promise<Response> {
  const body = await request.json()
  const safeParse = ZodProfileWithSignature.safeParse(body)

  if (!safeParse.success) {
    const response = { success: false, error: safeParse.error }
    return Response.json(response, { status: 400 })
  }

  const { name, signature } = safeParse.data
  const nameData = await get(name, env)
  
  // Validate signature
  try {
    const signer = verifyMessage(signature.message, signature.hash)
    if (signer.toLowerCase() !== nameData?.owner.toLowerCase()) {
      throw new Error('Invalid signer')
    }
  } catch (err) {
    console.error(err)
    const response = { success: false, error: err }
    return Response.json(response, { status: 401 })
  }

  // Save the name
  try {
    await set(safeParse.data, env)
    const response = { success: true }
    return Response.json(response, { status: 201 })
  } catch (err) {
    console.error(err)
    const response = { success: false, error: 'Error setting profile' }
    return Response.json(response, { status: 500 })
  }
}
