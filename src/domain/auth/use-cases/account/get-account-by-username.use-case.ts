import { IUseCase } from "@/core/types/use-case"
import { Account } from "../../entities/account"
import { IAccountRepository } from "../../repositories/account-repository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found.error"

interface IGetAccountByUsernameUseCaseRequest {
    username: string
}

interface IGetAccountByUsernameUseCaseResponse {
    account: Account
}

export class GetAccountByUsernameUseCase implements IUseCase<IGetAccountByUsernameUseCaseRequest, Promise<IGetAccountByUsernameUseCaseResponse>> {
    constructor(
        private accountRepository: IAccountRepository
    ) { }

    async execute({ username }: IGetAccountByUsernameUseCaseRequest): Promise<IGetAccountByUsernameUseCaseResponse> {
        const account = await this.accountRepository.getByUsername(username)
        if (!account) throw new ResourceNotFoundError('Conta não encontrada.')
        return { account }
    }

}
