import { ICreateTemporaryTransactionRequest } from "@/domain/transaction/dto/transaction.dto"
import { Transaction } from "@/domain/transaction/entities/transaction"
import { ITemporaryTransactionRepository } from "@/domain/transaction/repositories/temporary-transactions-repository"

export class InMemoryTemporaryTransactionRepository implements ITemporaryTransactionRepository {
    private transactions: Transaction[] = []

    async createTemporaryTransaction(transaction: ICreateTemporaryTransactionRequest): Promise<Transaction> {
        const newTransaction = Transaction.create(transaction.id, {
            amount: transaction.amount,
            createdAt: transaction.createdAt,
            payeeId: transaction.payeeId,
            payerId: transaction.payerId
        })

        this.transactions.push(newTransaction)

        return newTransaction
    }

    async getTemporaryTransactionById(transactionId: string): Promise<Transaction | null> {
        const transaction = this.transactions.find(transaction => transaction.id === transactionId)
        return transaction ?? null
    }

    async getAllTemporaryTransactionsByAccountId(accountId: string): Promise<Transaction[]> {
        const transactions = this.transactions.filter(transaction => transaction.payerId === accountId || transaction.payeeId === accountId)
        return transactions
    }

    async deleteTemporaryTransactionById(transactionId: string): Promise<void> {
        const transactionIndex = this.transactions.findIndex(transaction => transaction.id === transactionId)

        if (transactionIndex === -1) {
            throw new Error("Transaction not found")
        }

        this.transactions.splice(transactionIndex, 1)
    }
}