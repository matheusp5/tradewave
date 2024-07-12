import { TokenType } from "@/core/enums/token-type";
import { IUseCase } from "@/core/types/use-case";
import { IEncrypter } from "../../cryptography/encrypter";

interface IVerifyTokenUseCaseRequest {
    token: string
}

interface IVerifyTokenUseCaseResponse {
    accountId: string
    type: TokenType
}

export class VerifyTokenUseCase implements IUseCase<IVerifyTokenUseCaseRequest, IVerifyTokenUseCaseResponse> {
    constructor(
        private encrypter: IEncrypter
    ) { }

    execute({ token }: IVerifyTokenUseCaseRequest): IVerifyTokenUseCaseResponse {
        const { sub: accountId, type } = this.encrypter.decrypt({ token })
        return { accountId, type }
    }
}