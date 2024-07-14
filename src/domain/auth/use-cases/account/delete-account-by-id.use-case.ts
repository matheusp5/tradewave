import { IUseCase } from "@/core/types/use-case";
import { IAccountRepository } from "../../repositories/account-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found.error";

interface IDeleteAccountByIdUseCaseRequest {
    id: string
}

export class DeleteAccountByIdUseCase implements IUseCase<IDeleteAccountByIdUseCaseRequest, Promise<void>> {
    constructor(private accountRepository: IAccountRepository) { }

    async execute(request: { id: string }): Promise<void> {
        const accountExists = await this.accountRepository.getById(request.id) != null
        if (!accountExists) throw new ResourceNotFoundError('Conta não existente.')

        await this.accountRepository.deleteById(request.id)
    }
}