import { TokenType } from '@/core/enums/token-type'
import { IUseCase } from '@/core/types/use-case'
import { IEncrypter } from '../../cryptography/encrypter'

interface IGenerateTokenUseCaseRequest {
  sub: string
  type: TokenType
}

interface IGenerateTokenUseCaseResponse {
  token: string
  expiresAt: Date
}

export class GenerateTokenUseCase
  implements
    IUseCase<
      IGenerateTokenUseCaseRequest,
      Promise<IGenerateTokenUseCaseResponse>
    >
{
  constructor(private encrypter: IEncrypter) {}

  async execute({
    sub,
    type
  }: IGenerateTokenUseCaseRequest): Promise<IGenerateTokenUseCaseResponse> {
    const createTokenResult = this.encrypter.encrypt({ sub, type })
    return createTokenResult
  }
}
