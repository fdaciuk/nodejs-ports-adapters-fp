import {
  SignJWT,
  jwtVerify,
  JWTPayload,
} from 'jose'
import { env } from '@/helpers/env'

const JWT_SECRET = env('JWT_SECRET')

export async function createJWT (payload: JWTPayload) {
  const secret = Buffer.from(JWT_SECRET)
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('10min')
    .sign(secret)
}

export async function verifyJWT (token: string) {
  const secret = Buffer.from(JWT_SECRET)
  return jwtVerify(token, secret)
}
