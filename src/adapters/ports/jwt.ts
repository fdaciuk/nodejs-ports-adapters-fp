import * as jwt from '@/ports/jwt/jose'
import { JWTPayload } from 'jose'

export const generateToken = (payload: JWTPayload) => {
  return jwt.createJWT(payload)
}
