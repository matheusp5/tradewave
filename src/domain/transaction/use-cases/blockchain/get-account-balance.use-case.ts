import { IUseCase } from "@/core/types/use-case";
import { ITransactionContract } from "../../blockchain/transaction-contract";

interface IGetAccountBalanceUseCaseRequest {
    accountId: string;
}

interface IGetAccountBalanceUseCaseResponse {
    transactionsNumber: number;
    balance: number;
}

export class GetAccountBalanceUseCase implements IUseCase<IGetAccountBalanceUseCaseRequest, Promise<IGetAccountBalanceUseCaseResponse>> {
    constructor(
        private transactionContract: ITransactionContract
    ) { }

    async execute(request: IGetAccountBalanceUseCaseRequest): Promise<IGetAccountBalanceUseCaseResponse> {
        const transactions = await this.transactionContract.getAllTransactionsByAccountId(request.accountId)
        const transactionsNumber = transactions.length

        const balance = transactions.reduce((acc, transaction) => {
            if (transaction.payerId === request.accountId) {
                return acc - transaction.amount
            }

            return acc + transaction.amount
        }, 0)

        return {
            transactionsNumber,
            balance
        }
    }
}