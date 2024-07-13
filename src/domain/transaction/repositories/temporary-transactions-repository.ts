import { Transaction } from "../entities/transaction"

interface ICreateTemporaryTransactionRequest {
    id: string
    payerId: string
    payeeId: string
    amount: number
    createdAt: Date
}

export interface ITemporaryTransactionRepository {
    createTemporaryTransaction(transaction: ICreateTemporaryTransactionRequest): Promise<Transaction>
    getTemporaryTransactionById(transactionId: string): Promise<Transaction>
    updateTemporaryTransactionById(transactionId: string, transaction: Transaction): Promise<Transaction>
    deleteTemporaryTransactionById(transactionId: string): Promise<void>
}