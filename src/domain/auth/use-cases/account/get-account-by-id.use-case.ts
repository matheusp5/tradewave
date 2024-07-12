import { IUseCase } from "@/core/types/use-case";
import { Account } from "../../entities/account";
import { IAccountRepository } from "../../repositories/account-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found.error";

interface IGetAccountByIdUseCaseRequest {
    id: string
}

interface IGetAccountByIdUseCaseResponse {
    account: Account
}

export class GetAccountByIdUseCase implements IUseCase<IGetAccountByIdUseCaseRequest, Promise<IGetAccountByIdUseCaseResponse>> {
    constructor(
        private accountRepository: IAccountRepository
    ) { }

    async execute({ id }: IGetAccountByIdUseCaseRequest): Promise<IGetAccountByIdUseCaseResponse> {
        const account = await this.accountRepository.getById(id)
        if (!account) throw new ResourceNotFoundError('Conta não encontrada.')
        return { account }
    }
}