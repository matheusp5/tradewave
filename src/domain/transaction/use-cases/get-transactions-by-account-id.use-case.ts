import { IUseCase } from "@/core/types/use-case"
import { ITransactionContract } from "../blockchain/transaction-contract"
import { Transaction } from "../entities/transaction"

interface IGetAllTransactionsByAccountIdUseCaseRequest {
    accountId: string
}

interface IGetAllTransactionsByAccountIdUseCaseResponse {
    transactions: Transaction[]
}

export class GetTransactionsByAccountId implements IUseCase<IGetAllTransactionsByAccountIdUseCaseRequest, Promise<IGetAllTransactionsByAccountIdUseCaseResponse>> {
    constructor(
        private transactionContract: ITransactionContract
    ) { }

    async execute(request: IGetAllTransactionsByAccountIdUseCaseRequest): Promise<IGetAllTransactionsByAccountIdUseCaseResponse> {
        const transactions = await this.transactionContract.getAllTransactionsByAccountId(request)
        return { transactions }
    }
}