import { IUseCase } from "@/core/types/use-case"
import { ITransactionContract } from "../../blockchain/transaction-contract"
import { Transaction } from "../../entities/transaction"

interface IGetAllTransactionsByAccountIdUseCaseRequest {
    accountId: string
}

interface IGetAllTransactionsByAccountIdUseCaseResponse {
    transactions: Transaction[]
}

export class GetTransactionsByAccountIdUseCase implements IUseCase<IGetAllTransactionsByAccountIdUseCaseRequest, Promise<IGetAllTransactionsByAccountIdUseCaseResponse>> {
    constructor(
        private transactionContract: ITransactionContract
    ) { }

    async execute({ accountId }: IGetAllTransactionsByAccountIdUseCaseRequest): Promise<IGetAllTransactionsByAccountIdUseCaseResponse> {
        const transactions = await this.transactionContract.getAllTransactionsByAccountId(accountId)
        return { transactions }
    }
}