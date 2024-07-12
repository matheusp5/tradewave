import { IUseCase } from "@/core/types/use-case";
import { IAccountRepository } from "../../repositories/account-repository";

interface IDeleteAccountByIdUseCaseRequest {
    id: string
}

export class DeleteAccountByIdUseCase implements IUseCase<IDeleteAccountByIdUseCaseRequest, Promise<void>> {
    constructor(private accountRepository: IAccountRepository) { }

    async execute(request: { id: string }): Promise<void> {
        await this.accountRepository.deleteById(request.id)
    }
}