import { TokenType } from "@/core/enums/token-type"
import { IUseCase } from "@/core/types/use-case"
import { IEncrypter } from "../../cryptography/encrypter"

interface IGenerateTokenUseCaseRequest {
    id: string
    type: TokenType
}

interface IGenerateTokenUseCaseResponse {
    token: string
    expiresAt: Date
}

export class GenerateTokenUseCase implements IUseCase<IGenerateTokenUseCaseRequest, Promise<IGenerateTokenUseCaseResponse>> {
    constructor(
        private encrypter: IEncrypter
    ) { }

    async execute({ id, type }: IGenerateTokenUseCaseRequest): Promise<IGenerateTokenUseCaseResponse> {
        const createTokenResult = this.encrypter.encrypt({ sub: id, type })
        return createTokenResult
    }
}