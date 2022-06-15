import {
  SignJWT,
  jwtVerify,
  JWTPayload,
} from 'jose'
import { env } from '@/helpers/env'

const JWT_SECRET = env('JWT_SECRET')

if (JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters long')
}

export async function createJWT (
  payload: JWTPayload,
  expirantionTime: string = '10m',
) {
  const secret = Buffer.from(JWT_SECRET)
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expirantionTime)
    .sign(secret)
}

export async function verifyJWT (token: string) {
  const secret = Buffer.from(JWT_SECRET)
  return jwtVerify(token, secret)
}
