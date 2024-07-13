import { IUseCase } from "@/core/types/use-case";
import { Transaction } from "../../entities/transaction";
import { ITemporaryTransactionRepository } from "../../repositories/temporary-transactions-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found.error";

interface IGetAllTemporaryTransactionsByAccountIdUseCaseRequest {
    accountId: string
}

interface IGetAllTemporaryTransactionsByAccountIdUseCaseResponse {
    transactions: Transaction[]
}

export class GetAllTemporaryTransactionsByAccountIdUseCase implements IUseCase<IGetAllTemporaryTransactionsByAccountIdUseCaseRequest, Promise<IGetAllTemporaryTransactionsByAccountIdUseCaseResponse>> {
    constructor(private temporaryTransactionRepository: ITemporaryTransactionRepository) { }

    async execute({ accountId }: IGetAllTemporaryTransactionsByAccountIdUseCaseRequest): Promise<IGetAllTemporaryTransactionsByAccountIdUseCaseResponse> {
        const transactions = await this.temporaryTransactionRepository.getAllTemporaryTransactionsByAccountId(accountId)
        return { transactions }
    }
}