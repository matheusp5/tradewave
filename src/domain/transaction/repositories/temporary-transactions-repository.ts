import { ICreateTransactionRequest } from "../blockchain/transaction-contract"
import { Transaction } from "../entities/transaction"

export interface ITemporaryTransactionRepository {
    createTemporaryTransaction(transaction: ICreateTransactionRequest): Promise<Transaction>
    getTemporaryTransactionById(transactionId: string): Promise<Transaction>
    updateTemporaryTransactionById(transactionId: string, transaction: Transaction): Promise<Transaction>
    deleteTemporaryTransactionById(transactionId: string): Promise<void>
}