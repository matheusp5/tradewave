import { Transaction } from "../entities/transaction"

export interface ICreateTemporaryTransactionRequest {
    id: string
    payerId: string
    payeeId: string
    amount: number
    createdAt: Date
}

export interface ITemporaryTransactionRepository {
    createTemporaryTransaction(transaction: ICreateTemporaryTransactionRequest): Promise<Transaction>
    getTemporaryTransactionById(transactionId: string): Promise<Transaction>
    getAllTemporaryTransactionsByAccountId(accountId: string): Promise<Transaction[]>
    deleteTemporaryTransactionById(transactionId: string): Promise<void>
}