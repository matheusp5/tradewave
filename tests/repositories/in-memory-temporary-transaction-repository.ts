import { Transaction } from "@/domain/transaction/entities/transaction"
import { ICreateTemporaryTransactionRequest, ITemporaryTransactionRepository } from "@/domain/transaction/repositories/temporary-transactions-repository"

export class InMemoryTemporaryTransactionRepository implements ITemporaryTransactionRepository {
    private transactions: Transaction[] = []

    async createTemporaryTransaction(transaction: ICreateTemporaryTransactionRequest): Promise<Transaction> {
        const newTransaction = Transaction.create({
            amount: transaction.amount,
            createdAt: transaction.createdAt,
            payeeId: transaction.payeeId,
            payerId: transaction.payerId
        }, transaction.id)

        this.transactions.push(newTransaction)

        return newTransaction
    }

    async getTemporaryTransactionById(transactionId: string): Promise<Transaction> {
        const transaction = this.transactions.find(transaction => transaction.id === transactionId)

        if (!transaction) {
            throw new Error("Transaction not found")
        }

        return transaction
    }

    async getAllTemporaryTransactionsByAccountId(accountId: string): Promise<Transaction[]> {
        const transactions = this.transactions.filter(transaction => transaction.payer === accountId || transaction.payee === accountId)
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