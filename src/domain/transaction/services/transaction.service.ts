import { ITransactionContract } from "../blockchain/transaction-contract";
import { CreateTransactionUseCase } from "../use-cases/blockchain/create-transaction.use-case";
import { GetAccountBalanceUseCase } from "../use-cases/blockchain/get-account-balance.use-case";
import { GetTransactionsByAccountIdUseCase } from "../use-cases/blockchain/get-transactions-by-account-id.use-case";

export class TransactionService {
    private createTransactionUseCase: CreateTransactionUseCase
    private getAccountBalanceUseCase: GetAccountBalanceUseCase
    private getTransactionsByAccountIdUseCase: GetTransactionsByAccountIdUseCase

    constructor(
        private transactionContract: ITransactionContract
    ) {
        this.createTransactionUseCase = new CreateTransactionUseCase(transactionContract)
        this.getAccountBalanceUseCase = new GetAccountBalanceUseCase(transactionContract)
        this.getTransactionsByAccountIdUseCase = new GetTransactionsByAccountIdUseCase(transactionContract)
    }
}