import { IUseCase } from "@/core/types/use-case";
import { Transaction } from "../entities/transaction";
import { ITransactionContract } from "../blockchain/transaction-contract";

interface CreateTransactionUseCaseRequest {
    payer: string
    payee: string
    amount: number
}

interface CreateTransactionUseCaseResponse {
    transaction: Transaction
}

export class CreateTransactionUseCase implements IUseCase<CreateTransactionUseCaseRequest, Promise<CreateTransactionUseCaseResponse>> {
    constructor(
        private transactionContract: ITransactionContract
    ) { }

    async execute(request: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse> {
        const transaction = await this.transactionContract.createTransaction(request)
        return { transaction }
    }
}