import { IUseCase } from "@/core/types/use-case"
import { Account } from "../../entities/account"
import { IAccountRepository } from "../../repositories/account-repository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found.error"

interface IGetAccountByEmailUseCaseRequest {
    email: string
}

interface IGetAccountByEmailUseCaseResponse {
    account: Account
}

export class GetAccountByEmailUseCase implements IUseCase<IGetAccountByEmailUseCaseRequest, Promise<IGetAccountByEmailUseCaseResponse>> {
    constructor(
        private accountRepository: IAccountRepository
    ) { }

    async execute({ email }: IGetAccountByEmailUseCaseRequest): Promise<IGetAccountByEmailUseCaseResponse> {
        const account = await this.accountRepository.getByEmail(email)
        if (!account) throw new ResourceNotFoundError('Conta não encontrada.')
        return { account }
    }

}
