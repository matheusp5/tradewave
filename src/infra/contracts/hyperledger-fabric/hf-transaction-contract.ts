import { ITransactionContract } from '@/domain/transaction/blockchain/transaction-contract'
import { ICreateBlockchainTransactionRequest } from '@/domain/transaction/dto/transaction.dto'
import { Transaction } from '@/domain/transaction/entities/transaction'

export class HfTransactionContract implements ITransactionContract {
  private transactions: Transaction[] = []

  async createTransaction(
    data: ICreateBlockchainTransactionRequest
  ): Promise<Transaction> {
    const transaction = Transaction.create(data.id, data)
    this.transactions.push(transaction)
    return transaction
  }

  async getAllTransactionsByAccountId(
    accountId: string
  ): Promise<Transaction[]> {
    return this.transactions.filter(
      (transaction) =>
        transaction.payerId === accountId || transaction.payeeId === accountId
    )
  }
}
