import * as jwt from '@/ports/jwt/jose'

export type JWTPayload = {
  [id: string]: unknown
}

export const generateToken = (...args: [JWTPayload, string?]) => {
  return jwt.createJWT(...args)
}

export const verifyToken = async (token: string) => {
  const { payload } = await jwt.verifyJWT(token)
  return payload
}
