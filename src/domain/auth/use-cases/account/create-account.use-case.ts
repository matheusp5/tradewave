import { IUseCase } from "@/core/types/use-case";
import { ICreateAccountRequest } from "../../dtos/account.dto";
import { Account } from "../../entities/account";
import { IAccountRepository } from "../../repositories/account-repository";
import { DuplicateResourceError } from "@/core/errors/duplicate-resource.error";

interface ICreateAccountUseCaseResponse {
    account: Account
}

export class CreateAccountUseCase implements IUseCase<ICreateAccountRequest, Promise<ICreateAccountUseCaseResponse>> {
    constructor(
        private accountRepository: IAccountRepository
    ) { }

    async execute(request: ICreateAccountRequest): Promise<ICreateAccountUseCaseResponse> {
        const accountAlreadyExists = await this.accountRepository.getByEmail(request.email)
        if (accountAlreadyExists) throw new DuplicateResourceError('Uma conta com este email já existe.')

        const account = await this.accountRepository.create(request)
        return { account }
    }
}