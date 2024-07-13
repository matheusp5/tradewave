import { TokenType } from "@/core/enums/token-type";
import { IUseCase } from "@/core/types/use-case";
import { IEncrypter } from "../../cryptography/encrypter";

interface IVerifyTokenUseCaseRequest {
    token: string
}

interface IVerifyTokenUseCaseResponse {
    sub: string
    type: TokenType
}

export class VerifyTokenUseCase implements IUseCase<IVerifyTokenUseCaseRequest, IVerifyTokenUseCaseResponse> {
    constructor(
        private encrypter: IEncrypter
    ) { }

    execute({ token }: IVerifyTokenUseCaseRequest): IVerifyTokenUseCaseResponse {
        return this.encrypter.decrypt({ token })
    }
}