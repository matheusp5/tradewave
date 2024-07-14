import { TokenType } from '@/core/enums/token-type'
import { UnauthorizedError } from '@/core/errors/unauthorized.error'
import {
  IDecryptRequest,
  IDecryptResponse,
  IEncrypter,
  IEncryptResponse,
  IEncryptRequest
} from '@/domain/auth/cryptography/encrypter'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import env from '../env'

export class JwtEncrypter implements IEncrypter {
  private secret: string
  constructor() {
    this.secret = env.jwt.secret
  }

  private getExpirationTime(type: TokenType) {
    switch (type) {
      case TokenType.ACCESS:
        return 30 * 60 // 30 minutes in seconds
      case TokenType.REFRESH:
        return 7 * 24 * 60 * 60 // 7 days in seconds
      case TokenType.CONFIRM_TRANSACTION:
        return 1 * 60 * 60 // 1 hour in seconds
    }
  }

  encrypt({ sub, type }: IEncryptRequest): IEncryptResponse {
    const token = jwt.sign({ sub, type }, this.secret, {
      expiresIn: this.getExpirationTime(type)
    })
    return {
      token,
      expiresAt: moment().add(this.getExpirationTime(type), 'seconds').toDate()
    }
  }

  decrypt({ token }: IDecryptRequest): IDecryptResponse {
    try {
      const decryptedToken = jwt.verify(token, this.secret)

      if (!decryptedToken.sub) throw new UnauthorizedError('Token inválido')

      return decryptedToken as IDecryptResponse
    } catch (error) {
      throw new UnauthorizedError('Token inválido')
    }
  }
}
