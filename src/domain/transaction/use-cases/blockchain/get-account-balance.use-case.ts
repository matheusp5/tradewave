import { IUseCase } from "@/core/types/use-case";
import { ITransactionContract } from "../../blockchain/transaction-contract";

interface IGetAccoutBalanceUseCaseRequest {
    accountId: string;
}

interface IGetAccountBalanceUseCaseResponse {
    transactionsNumber: number;
    balance: number;
}

export class GetAccountBalanceUseCase implements IUseCase<IGetAccoutBalanceUseCaseRequest, Promise<IGetAccountBalanceUseCaseResponse>> {
    constructor(
        private transactionContract: ITransactionContract
    ) { }

    async execute(request: IGetAccoutBalanceUseCaseRequest): Promise<IGetAccountBalanceUseCaseResponse> {
        const transactions = await this.transactionContract.getAllTransactionsByAccountId(request.accountId)
        const transactionsNumber = transactions.length

        const balance = transactions.reduce((acc, transaction) => {
            if (transaction.payer.id === request.accountId) {
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